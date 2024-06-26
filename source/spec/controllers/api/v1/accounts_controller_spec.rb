require 'rails_helper'

RSpec.describe Api::V1::AccountsController, type: :controller do
  render_views

  let(:user)   { Fabricate(:user, account: Fabricate(:account, username: 'alice')) }
  let(:scopes) { '' }
  let(:token)  { Fabricate(:accessible_access_token, resource_owner_id: user.id, scopes: scopes) }

  before do
    allow(controller).to receive(:doorkeeper_token) { token }
  end

  shared_examples 'forbidden for wrong scope' do |wrong_scope|
    let(:scopes) { wrong_scope }

    it 'returns http forbidden' do
      expect(response).to have_http_status(403)
    end
  end

  describe 'GET #show' do
    let(:scopes) { 'read:accounts' }

    before do
      get :show, params: { id: user.account.id }
    end

    it 'returns http success' do
      expect(response).to have_http_status(200)
    end

    it 'returns pleroma.accepts_chat_messages' do
      expect(body_as_json[:pleroma][:accepts_chat_messages]).to be true
    end

    it_behaves_like 'forbidden for wrong scope', 'write:statuses'
  end

  describe 'POST #follow' do
    let(:scopes) { 'write:follows' }
    let(:other_account) { Fabricate(:user, email: 'bob@example.com', account: Fabricate(:account, username: 'bob', locked: locked)).account }

    context do
      before do
        post :follow, params: { id: other_account.id }
      end

      context 'with unlocked account' do
        let(:locked) { false }

        it 'returns http success' do
          expect(response).to have_http_status(200)
        end

        it 'returns JSON with following=true and requested=false' do
          json = body_as_json

          expect(json[:following]).to be true
          expect(json[:requested]).to be false
        end

        it 'creates a following relation between user and target user' do
          expect(user.account.following?(other_account)).to be true
        end

        it 'applies HostileRateLimiter to hostile accounts' do
          user.account.update!(trust_level: Account::TRUST_LEVELS[:hostile])
          expect(Follow.where(account_id: user.account_id).count).to eq(1)

          post :follow, params: { id: Fabricate(:account).id }
          expect(response).to have_http_status(200)
          expect(Follow.where(account_id: user.account_id).count).to eq(1)
        end

        it_behaves_like 'forbidden for wrong scope', 'read:accounts'
      end

      context 'with locked account' do
        let(:locked) { true }

        it 'returns http success' do
          expect(response).to have_http_status(200)
        end

        it 'returns JSON with following=false and requested=true' do
          json = body_as_json

          expect(json[:following]).to be false
          expect(json[:requested]).to be true
        end

        it 'creates a follow request relation between user and target user' do
          expect(user.account.requested?(other_account)).to be true
        end

        it 'respects rate limit' do
          299.times do
            post :follow, params: { id: Fabricate(:account).id }
          end
          post :follow, params: { id: Fabricate(:account).id }
          expect(response).to have_http_status(429)
        end

        it_behaves_like 'forbidden for wrong scope', 'read:accounts'
      end
    end

    context 'modifying follow options' do
      let(:locked) { false }

      before do
        user.account.follow!(other_account, reblogs: false, notify: false)
      end

      it 'changes reblogs option' do
        post :follow, params: { id: other_account.id, reblogs: true }

        json = body_as_json

        expect(json[:following]).to be true
        expect(json[:showing_reblogs]).to be true
        expect(json[:notifying]).to be false
      end

      it 'changes notify option' do
        post :follow, params: { id: other_account.id, notify: true }

        json = body_as_json

        expect(json[:following]).to be true
        expect(json[:showing_reblogs]).to be false
        expect(json[:notifying]).to be true
      end
    end
  end

  describe 'POST #unfollow' do
    let(:scopes) { 'write:follows' }
    let(:other_account) { Fabricate(:user, email: 'bob@example.com', account: Fabricate(:account, username: 'bob')).account }

    before do
      user.account.follow!(other_account)
      post :unfollow, params: { id: other_account.id }
    end

    it 'returns http success' do
      expect(response).to have_http_status(200)
    end

    it 'removes the following relation between user and target user' do
      expect(user.account.following?(other_account)).to be false
    end

    it_behaves_like 'forbidden for wrong scope', 'read:accounts'
  end

  describe 'POST #block' do
    let(:scopes) { 'write:blocks' }
    let(:other_account) { Fabricate(:user, email: 'bob@example.com', account: Fabricate(:account, username: 'bob')).account }

    before do
      user.account.follow!(other_account)
      post :block, params: { id: other_account.id }
    end

    it 'returns http success' do
      expect(response).to have_http_status(200)
    end

    it 'removes the following relation between user and target user' do
      expect(user.account.following?(other_account)).to be false
    end

    it 'creates a blocking relation' do
      expect(user.account.blocking?(other_account)).to be true
    end

    it_behaves_like 'forbidden for wrong scope', 'read:accounts'
  end

  describe 'POST #unblock' do
    let(:scopes) { 'write:blocks' }
    let(:other_account) { Fabricate(:user, email: 'bob@example.com', account: Fabricate(:account, username: 'bob')).account }

    before do
      user.account.block!(other_account)
      post :unblock, params: { id: other_account.id }
    end

    it 'returns http success' do
      expect(response).to have_http_status(200)
    end

    it 'removes the blocking relation between user and target user' do
      expect(user.account.blocking?(other_account)).to be false
    end

    it_behaves_like 'forbidden for wrong scope', 'read:accounts'
  end

  describe 'POST #mute' do
    let(:scopes) { 'write:mutes' }
    let(:other_account) { Fabricate(:user, email: 'bob@example.com', account: Fabricate(:account, username: 'bob')).account }

    before do
      user.account.follow!(other_account)
      post :mute, params: { id: other_account.id }
    end

    it 'returns http success' do
      expect(response).to have_http_status(200)
    end

    it 'does not remove the following relation between user and target user' do
      expect(user.account.following?(other_account)).to be true
    end

    it 'creates a muting relation' do
      expect(user.account.muting?(other_account)).to be true
    end

    it 'mutes notifications' do
      expect(user.account.muting_notifications?(other_account)).to be true
    end

    it_behaves_like 'forbidden for wrong scope', 'read:accounts'
  end

  describe 'POST #mute with notifications set to false' do
    let(:scopes) { 'write:mutes' }
    let(:other_account) { Fabricate(:user, email: 'bob@example.com', account: Fabricate(:account, username: 'bob')).account }

    before do
      user.account.follow!(other_account)
      post :mute, params: { id: other_account.id, notifications: false }
    end

    it 'returns http success' do
      expect(response).to have_http_status(200)
    end

    it 'does not remove the following relation between user and target user' do
      expect(user.account.following?(other_account)).to be true
    end

    it 'creates a muting relation' do
      expect(user.account.muting?(other_account)).to be true
    end

    it 'does not mute notifications' do
      expect(user.account.muting_notifications?(other_account)).to be false
    end

    it_behaves_like 'forbidden for wrong scope', 'read:accounts'
  end

  describe 'POST #mute with nonzero duration set' do
    let(:scopes) { 'write:mutes' }
    let(:other_account) { Fabricate(:user, email: 'bob@example.com', account: Fabricate(:account, username: 'bob')).account }

    before do
      user.account.follow!(other_account)
      post :mute, params: { id: other_account.id, duration: 300 }
    end

    it 'returns http success' do
      expect(response).to have_http_status(200)
    end

    it 'does not remove the following relation between user and target user' do
      expect(user.account.following?(other_account)).to be true
    end

    it 'creates a muting relation' do
      expect(user.account.muting?(other_account)).to be true
    end

    it 'mutes notifications' do
      expect(user.account.muting_notifications?(other_account)).to be true
    end

    it_behaves_like 'forbidden for wrong scope', 'read:accounts'
  end

  describe 'POST #unmute' do
    let(:scopes) { 'write:mutes' }
    let(:other_account) { Fabricate(:user, email: 'bob@example.com', account: Fabricate(:account, username: 'bob')).account }

    before do
      user.account.mute!(other_account)
      post :unmute, params: { id: other_account.id }
    end

    it 'returns http success' do
      expect(response).to have_http_status(200)
    end

    it 'removes the muting relation between user and target user' do
      expect(user.account.muting?(other_account)).to be false
    end

    it_behaves_like 'forbidden for wrong scope', 'read:accounts'
  end
end
