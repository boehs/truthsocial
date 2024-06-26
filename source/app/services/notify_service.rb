# frozen_string_literal: true

class NotifyService < BaseService
  include NotifyConcern

  GROUP_NOTIFICATION_TYPES = %i(
    mention
    reblog
    follow
    favourite
  ).freeze

  def call(recipient, type, activity)
    @recipient    = recipient
    @activity     = activity
    @type         = type
    @notification = Notification.new(account: @recipient, type: type, activity: @activity)

    return if recipient.user.nil? || blocked?

    @target_status = target_status
    if group_notification?
      group_notifications_service.call(recipient.id, @notification.from_account_id, type, @target_status)
      return false
    end

    create_notification!
    push_notification!(@notification, @recipient)
    push_to_conversation! if direct_message?
    send_email! if email_enabled? && !verify_sms_prompt?
  rescue ActiveRecord::RecordInvalid
    nil
  end

  private

  def blocked_mention?
    FeedManager.instance.filter?(:mentions, @notification.mention.status, @recipient)
  end

  def blocked_status?
    false
  end

  def blocked_favourite?
    false
  end

  def blocked_follow?
    false
  end

  def blocked_reblog?
    false
  end

  def blocked_follow_request?
    false
  end

  def blocked_poll?
    false
  end

  def blocked_chat?
    false
  end

  def blocked_chat_message_deleted?
    false
  end

  def blocked_group_mention?
    FeedManager.instance.filter?(:mentions, @notification.mention.status, @recipient)
  end

  def blocked_group_reblog?
    false
  end

  def blocked_group_follow?
    false
  end

  def blocked_group_favourite?
    false
  end

  def blocked_group_delete?
    false
  end

  def blocked_group_approval?
    false
  end

  def blocked_group_request?
    false
  end

  def blocked_group_promoted?
    false
  end

  def blocked_group_demoted?
    false
  end

  def following_sender?
    return @following_sender if defined?(@following_sender)
    @following_sender = @recipient.following?(@notification.from_account) || @recipient.requested?(@notification.from_account)
  end

  def optional_non_follower?
    @recipient.user.settings.interactions['must_be_follower']  && !@notification.from_account.following?(@recipient)
  end

  def optional_non_following?
    @recipient.user.settings.interactions['must_be_following'] && !following_sender?
  end

  def message?
    @notification.type == :mention
  end

  def invite?
    @notification.type == :invite
  end

  def user_approved?
    @notification.type == :user_approved
  end

  def verify_sms_prompt?
    @notification.type == :verify_sms_prompt
  end

  def direct_message?
    message? && target_status.direct_visibility?
  end

  def chat?
    @notification.type == :chat
  end

  def response_to_recipient?
    target_status.in_reply_to_account_id == @recipient.id && target_status.thread&.direct_visibility?
  end

  def from_staff?
    @notification.from_account.local? && @notification.from_account.user.present? && @notification.from_account.user.staff?
  end

  def optional_non_following_and_direct?
    direct_message? &&
      @recipient.user.settings.interactions['must_be_following_dm'] &&
      !following_sender? &&
      !response_to_recipient?
  end

  def hellbanned?
    @notification.from_account.silenced? && !following_sender?
  end

  def from_self?
    @recipient.id == @notification.from_account.id
  end

  def domain_blocking?
    @recipient.domain_blocking?(@notification.from_account.domain) && !following_sender?
  end

  def blocked?
    return false if invite? || user_approved? || verify_sms_prompt? # Skip if invite or user_approved or verify_sms_prompt notification

    blocked   = @recipient.suspended?                            # Skip if the recipient account is suspended anyway
    blocked ||= from_self? && @notification.type != :poll        # Skip for interactions with self

    return blocked if message? && from_staff?

    blocked ||= domain_blocking?                                 # Skip for domain blocked accounts
    blocked ||= @recipient.blocking?(@notification.from_account) # Skip for blocked accounts
    blocked ||= @notification.from_account.blocking?(@recipient) # Skip for blocked accounts - the other direction
    blocked ||= @recipient.muting_notifications?(@notification.from_account)
    blocked ||= hellbanned?                                      # Hellban
    blocked ||= optional_non_follower?                           # Options
    blocked ||= optional_non_following?                          # Options
    blocked ||= optional_non_following_and_direct?               # Options
    blocked ||= conversation_muted?
    blocked ||= send("blocked_#{@notification.type}?")           # Type-dependent filters
    blocked
  end

  def conversation_muted?
    if target_status
      @recipient.muting_conversation?(target_status.conversation)
    else
      false
    end
  end

  def create_notification!
    @notification.save!
  end

  def push_to_conversation!
    return if @notification.activity.nil?
    AccountConversation.add_status(@recipient, target_status)
  end

  def send_email!
    return if @notification.activity.nil?

    NotificationMailer.public_send(@notification.type, @recipient, @notification).deliver_later(wait: 2.minutes)
  end

  def email_enabled?
    @recipient.user.settings.notification_emails[@notification.type.to_s]
  end

  def group_notification?
    return unless (GROUP_NOTIFICATION_TYPES.include? @notification.type) && @recipient.whale?
    if @notification.type == :mention
      return unless @target_status.reply?

      if (!(@target_status = whale_thread))
        return false
      end

    elsif @notification.type == :follow
      @target_status = nil
    end

    true
  end

  def whale_thread
    if @target_status&.thread&.account_id == @recipient.id && @target_status&.thread&.reply? == false
      return @target_status.thread
    end

    root_status = Status.with_discarded.select("*").from(Status.where(conversation_id: @target_status.conversation_id)&.reorder(id: :desc)).reorder(id: :asc)&.first

    if root_status&.account_id == @recipient.id
      return root_status
    end

    false
  end

  def group_notifications_service
    GroupNotificationsService.new
  end

  def target_status
    return @activity.status if %i[mention favourite].include? @type
    @notification.target_status
  end

end
