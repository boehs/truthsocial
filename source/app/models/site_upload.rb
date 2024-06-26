# frozen_string_literal: true
# == Schema Information
#
# Table name: site_uploads
#
#  id                :bigint(8)        not null, primary key
#  var               :string           default(""), not null
#  file_file_name    :string
#  file_content_type :string
#  file_file_size    :integer
#  file_updated_at   :datetime
#  meta              :json
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  file_s3_host      :string(64)
#

class SiteUpload < ApplicationRecord
  has_attached_file :file

  validates_attachment_content_type :file, content_type: /\Aimage\/.*\z/
  validates :file, presence: true
  validates :var, presence: true, uniqueness: true

  before_save :set_meta
  before_save :set_file_s3_host
  after_commit :clear_cache

  def cache_key
    "site_uploads/#{var}"
  end

  private

  def set_meta
    tempfile = file.queued_for_write[:original]

    return if tempfile.nil?

    width, height = FastImage.size(tempfile.path)
    self.meta = { width: width, height: height }
  end

  def clear_cache
    Rails.cache.delete(cache_key)
  end


  def set_file_s3_host
    self.file_s3_host = Paperclip::Attachment.default_options[:s3_host_name]
  end
end
