# frozen_string_literal: true

class REST::Admin::AccountSerializer < ActiveModel::Serializer
  attributes :id, :username, :domain, :created_at, :deleted,
             :email, :ip, :role, :confirmed, :suspended,
             :silenced, :disabled, :approved, :locale,
             :invite_request, :verified, :location, :website, :sms, :sms_reverification_required, :updated_at, :advertiser

  attribute :created_by_application_id, if: :created_by_application?
  attribute :invited_by_account_id, if: :invited?

  has_one :account, serializer: REST::AccountSerializer

  def id
    object.id.to_s
  end

  delegate :verified?, to: :object

  delegate :location, to: :object

  delegate :website, to: :object

  def deleted
    object.deleted?
  end

  def email
    object.user_email
  end

  def sms
    object.user_sms
  end

  def ip
    object.user_current_sign_in_ip.to_s.presence
  end

  def role
    object.user_role
  end

  def suspended
    object.suspended?
  end

  def silenced
    object.silenced?
  end

  def confirmed
    object.user_confirmed?
  end

  def disabled
    object.user_disabled?
  end

  def approved
    object.user_approved?
  end

  def account
    object
  end

  def locale
    object.user_locale
  end

  def created_by_application_id
    object.user&.created_by_application_id&.to_s&.presence
  end

  def invite_request
    object.user&.invite_request&.text
  end

  def invited_by_account_id
    object.user&.invite&.user&.account_id&.to_s&.presence
  end

  def invited?
    object.user&.invited?
  end

  def created_by_application?
    object.user&.created_by_application_id&.present?
  end

  def sms_reverification_required
    !!object.user&.user_sms_reverification_required&.user_id
  end

  def updated_at
    object.updated_at
  end

  def advertiser
    !!object.recent_ads.presence
  end
end
