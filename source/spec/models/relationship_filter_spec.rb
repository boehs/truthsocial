# frozen_string_literal: true

require 'rails_helper'

describe RelationshipFilter do
  let(:account) { Fabricate(:account) }

  describe '#results' do
    context 'when default params are used' do
      let(:subject) do
        RelationshipFilter.new(account, 'order' => 'active').results
      end

      before do
        add_following_account_with(last_status_at: 7.days.ago)
        add_following_account_with(last_status_at: 1.day.ago)
        add_following_account_with(last_status_at: 3.days.ago)
      end

      it 'returns followings ordered by last activity' do
        expected_result = account.following.eager_load(:account_status).reorder(nil).by_recent_status

        expect(subject).to eq expected_result
      end
    end
  end

  def add_following_account_with(last_status_at:)
    following_account = Fabricate(:account)
    Fabricate(:status, account: following_account, created_at: last_status_at)
    Fabricate(:follow, account: account, target_account: following_account).account
  end
end
