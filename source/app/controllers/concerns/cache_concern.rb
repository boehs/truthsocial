# frozen_string_literal: true

module CacheConcern
  extend ActiveSupport::Concern

  def render_with_cache(**options)
    raise ArgumentError, 'only JSON render calls are supported' unless options.key?(:json) || block_given?

    key        = options.delete(:key) || [[params[:controller], params[:action]].join('/'), options[:json].respond_to?(:cache_key) ? options[:json].cache_key : nil, options[:fields].nil? ? nil : options[:fields].join(',')].compact.join(':')
    expires_in = options.delete(:expires_in) || 3.minutes
    body       = Rails.cache.read(key, raw: true)

    if body
      render(options.except(:json, :serializer, :each_serializer, :adapter, :fields).merge(json: body))
    else
      if block_given?
        options[:json] = yield
      elsif options[:json].is_a?(Symbol)
        options[:json] = send(options[:json])
      end

      render(options)
      Rails.cache.write(key, response.body, expires_in: expires_in, raw: true)
    end
  end

  def set_cache_headers
    response.headers['Vary'] = public_fetch_mode? ? 'Accept' : 'Accept, Signature'
  end

  def cache_collection(raw, klass, include_removed = false)
    return raw unless klass.respond_to?(:with_includes)

    raw = raw.cache_ids.to_a if raw.is_a?(ActiveRecord::Relation)
    return [] if raw.empty?

    cached_keys_with_value = Rails.cache.read_multi(*raw).transform_keys(&:id)
    uncached_ids           = raw.map(&:id) - cached_keys_with_value.keys

    raw_hash = raw.index_by(&:id)

    if klass.has_attribute?(:tombstone)
      cached_keys_with_value = reload_tombstone_value(cached_keys_with_value, raw_hash)
    end

    klass.reload_stale_associations!(cached_keys_with_value.values) if klass.respond_to?(:reload_stale_associations!)

    unless uncached_ids.empty?
      uncached = klass
      uncached = uncached.with_discarded if include_removed
      uncached = uncached.where(id: uncached_ids).with_includes.index_by(&:id)

      if klass.has_attribute?(:tombstone)
        uncached = reload_tombstone_value(uncached, raw_hash)
      end

      uncached.each_value do |item|
        Rails.cache.write(item, item, expires_in: 1.hour)
      end
    end

    raw.filter_map { |item| cached_keys_with_value[item.id] || uncached[item.id] }
  end

  def cache_collection_paginated_by_id(raw, klass, limit, options)
    cache_collection raw.cache_ids.to_a_paginated_by_id(limit, options), klass
  end

  def reload_tombstone_value(collection, raw_hash)
    collection.each_with_object({}) do |(k, v), hash|
      next unless v.has_attribute?(:tombstone) && raw_hash[k].has_attribute?(:tombstone)
      hash[k] = [v.tombstone = raw_hash[k].tombstone]
    end
    collection
  end
end
