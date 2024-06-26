# frozen_string_literal: true

module Admin
  class AccountsController < BaseController
    before_action :set_account, except: [:index]
    before_action :require_remote_account!, only: [:redownload]
    before_action :require_local_account!, only: [:enable, :memorialize, :approve, :reject]

    def index
      authorize :account, :index?
      @accounts = filtered_accounts.page(params[:page])
    end

    def show
      authorize @account, :show?

      @deletion_request        = @account.deletion_request
      @account_moderation_note = current_account.account_moderation_notes.new(target_account: @account)
      @moderation_notes        = @account.targeted_moderation_notes.latest
      @warnings                = @account.targeted_account_warnings.latest.custom
      @domain_block            = DomainBlock.rule_for(@account.domain)
    end

    def memorialize
      authorize @account, :memorialize?
      @account.memorialize!
      log_action :memorialize, @account
      redirect_to admin_account_path(@account.id), notice: I18n.t('admin.accounts.memorialized_msg', username: @account.acct)
    end

    def enable
      authorize @account.user, :enable?
      @account.user.enable!
      log_action :enable, @account.user
      redirect_to admin_account_path(@account.id), notice: I18n.t('admin.accounts.enabled_msg', username: @account.acct)
    end

    def approve
      authorize @account.user, :approve?
      @account.user.approve!(true)
      redirect_to admin_pending_accounts_path, notice: I18n.t('admin.accounts.approved_msg', username: @account.acct)
    end

    def reject
      authorize @account.user, :reject?
      DeleteAccountService.new.call(
        @account,
        @current_account.id,
        deletion_type: 'admin_reject',
        reserve_email: false,
        reserve_username: false,
        skip_activitypub: true,
      )
      redirect_to admin_pending_accounts_path, notice: I18n.t('admin.accounts.rejected_msg', username: @account.acct)
    end

    def destroy
      authorize @account, :destroy?
      Admin::AccountDeletionWorker.perform_async(@account.id, @current_account.id)
      redirect_to admin_account_path(@account.id), notice: I18n.t('admin.accounts.destroyed_msg', username: @account.acct)
    end

    def unsensitive
      authorize @account, :unsensitive?
      @account.unsensitize!
      log_action :unsensitive, @account
      redirect_to admin_account_path(@account.id)
    end

    def unsilence
      authorize @account, :unsilence?
      @account.unsilence!
      log_action :unsilence, @account
      redirect_to admin_account_path(@account.id), notice: I18n.t('admin.accounts.unsilenced_msg', username: @account.acct)
    end

    def unsuspend
      authorize @account, :unsuspend?
      @account.unsuspend!
      Admin::UnsuspensionWorker.perform_async(@account.id)
      log_action :unsuspend, @account
      redirect_to admin_account_path(@account.id), notice: I18n.t('admin.accounts.unsuspended_msg', username: @account.acct)
    end

    def unverify
      authorize @account, :unverify?
      @account.unverify!
      log_action :unverify, @account
      redirect_to admin_account_path(@account.id), notice: I18n.t('admin.accounts.unverified_msg', username: @account.acct)
    end

    def bot
      authorize @account, :bot?
      @account.bot = true
      @account.save
      log_action :bot, @account
      redirect_to admin_account_path(@account.id), notice: I18n.t('admin.accounts.bot_msg', username: @account.acct)
    end

    def unbot
      authorize @account, :unbot?
      @account.bot = false
      @account.save
      redirect_to admin_account_path(@account.id), notice: I18n.t('admin.accounts.unbot_msg', username: @account.acct)
    end

    def redownload
      authorize @account, :redownload?

      @account.update!(last_webfingered_at: nil)
      ResolveAccountService.new.call(@account)

      redirect_to admin_account_path(@account.id), notice: I18n.t('admin.accounts.redownloaded_msg', username: @account.acct)
    end

    def remove_avatar
      authorize @account, :remove_avatar?

      @account.avatar = nil
      @account.save!

      log_action :remove_avatar, @account.user

      redirect_to admin_account_path(@account.id), notice: I18n.t('admin.accounts.removed_avatar_msg', username: @account.acct)
    end

    def remove_header
      authorize @account, :remove_header?

      @account.header = nil
      @account.save!

      log_action :remove_header, @account.user

      redirect_to admin_account_path(@account.id), notice: I18n.t('admin.accounts.removed_header_msg', username: @account.acct)
    end

    private

    def set_account
      @account = Account.find(params[:id])
    end

    def require_remote_account!
      redirect_to admin_account_path(@account.id) if @account.local?
    end

    def require_local_account!
      redirect_to admin_account_path(@account.id) unless @account.local? && @account.user.present?
    end

    def filtered_accounts
      AccountFilter.new(filter_params).results
    end

    def filter_params
      params.slice(*AccountFilter::KEYS).permit(*AccountFilter::KEYS)
    end
  end
end
