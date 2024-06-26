require 'rails_helper'

RSpec.describe Status, type: :model do
  let(:alice) { Fabricate(:account, username: 'alice') }
  let(:bob)   { Fabricate(:account, username: 'bob') }
  let(:other) { Fabricate(:status, account: bob, text: 'Skulls for the skull god! The enemy\'s gates are sideways!') }

  subject { Fabricate(:status, account: alice) }

  describe '#local?' do
    it 'returns true when no remote URI is set' do
      expect(subject.local?).to be true
    end

    it 'returns false if a remote URI is set' do
      alice.update(domain: 'example.com')
      subject.save
      expect(subject.local?).to be false
    end

    it 'returns true if a URI is set and `local` is true' do
      subject.update(uri: 'example.com', local: true)
      expect(subject.local?).to be true
    end
  end

  describe '#reblog?' do
    it 'returns true when the status reblogs another status' do
      subject.reblog = other
      expect(subject.reblog?).to be true
    end

    it 'returns false if the status is self-contained' do
      expect(subject.reblog?).to be false
    end
  end

  describe '#reply?' do
    it 'returns true if the status references another' do
      subject.thread = other
      expect(subject.reply?).to be true
    end

    it 'returns false if the status is self-contained' do
      expect(subject.reply?).to be false
    end
  end

  describe '#verb' do
    context 'if destroyed?' do
      it 'returns :delete' do
        subject.destroy!
        expect(subject.verb).to be :delete
      end
    end

    context 'unless destroyed?' do
      context 'if reblog?' do
        it 'returns :share' do
          subject.reblog = other
          expect(subject.verb).to be :share
        end
      end

      context 'unless reblog?' do
        it 'returns :post' do
          subject.reblog = nil
          expect(subject.verb).to be :post
        end
      end
    end
  end

  describe '#object_type' do
    it 'is note when the status is self-contained' do
      expect(subject.object_type).to be :note
    end

    it 'is comment when the status replies to another' do
      subject.thread = other
      expect(subject.object_type).to be :comment
    end
  end

  describe '#hidden?' do
    context 'if private_visibility?' do
      it 'returns true' do
        subject.visibility = :private
        expect(subject.hidden?).to be true
      end
    end

    context 'if direct_visibility?' do
      it 'returns true' do
        subject.visibility = :direct
        expect(subject.hidden?).to be true
      end
    end

    context 'if public_visibility?' do
      it 'returns false' do
        subject.visibility = :public
        expect(subject.hidden?).to be false
      end
    end

    context 'if unlisted_visibility?' do
      it 'returns false' do
        subject.visibility = :unlisted
        expect(subject.hidden?).to be false
      end
    end

  end

  describe '#content' do
    it 'returns the text of the status if it is not a reblog' do
      expect(subject.content).to eql subject.text
    end

    it 'returns the text of the reblogged status' do
      subject.reblog = other
      expect(subject.content).to eql other.text
    end
  end

  describe '#target' do
    it 'returns nil if the status is self-contained' do
      expect(subject.target).to be_nil
    end

    it 'returns nil if the status is a reply' do
      subject.thread = other
      expect(subject.target).to be_nil
    end

    it 'returns the reblogged status' do
      subject.reblog = other
      expect(subject.target).to eq other
    end
  end

  describe '#reblogs_count' do
    it 'is the number of reblogs' do
      Fabricate(:status, account: bob, reblog: subject)
      Fabricate(:status, account: alice, reblog: subject)
      Procedure.process_status_reblog_statistics_queue

      expect(subject.reblogs_count).to eq 2
    end

    it 'is decremented when reblog is removed' do
      reblog = Fabricate(:status, account: bob, reblog: subject)
      Procedure.process_status_reblog_statistics_queue
      expect(subject.reblogs_count).to eq 1
      reblog.destroy
      Procedure.process_status_reblog_statistics_queue
      expect(subject.reload.reblogs_count).to eq 0
    end

    it 'does not fail when original is deleted before reblog' do
      reblog = Fabricate(:status, account: bob, reblog: subject)
      Procedure.process_status_reblog_statistics_queue
      expect(subject.reblogs_count).to eq 1
      expect { subject.destroy }.to_not raise_error
      expect(Status.find_by(id: reblog.id)).to be_nil
    end
  end

  describe '#replies_count' do
    it 'is the number of replies' do
      reply = Fabricate(:status, account: bob, thread: subject)
      Procedure.process_status_reply_statistics_queue
      expect(subject.replies_count).to eq 1
    end

    it 'is decremented when reply is removed' do
      reply = Fabricate(:status, account: bob, thread: subject)
      Procedure.process_status_reply_statistics_queue
      expect(subject.replies_count).to eq 1
      reply.destroy
      Procedure.process_status_reply_statistics_queue
      expect(subject.reload.replies_count).to eq 0
    end
  end

  describe '#favourites_count' do
    it 'is the number of favorites' do
      Fabricate(:favourite, account: bob, status: subject)
      Fabricate(:favourite, account: alice, status: subject)
      Procedure.process_status_favourite_statistics_queue

      expect(subject.favourites_count).to eq 2
    end

    it 'is decremented when favourite is removed' do
      favourite = Fabricate(:favourite, account: bob, status: subject)
      Procedure.process_status_favourite_statistics_queue
      expect(subject.favourites_count).to eq 1
      favourite.destroy
      Procedure.process_status_favourite_statistics_queue
      expect(subject.reload.favourites_count).to eq 0
    end
  end

  describe '#privatize' do
    it 'updates visibility, decrements status count' do
      expect(subject.visibility).to eq('public')
      Procedure.process_account_status_statistics_queue
      expect(AccountStatusStatistic.count).to eq(1)
      expect(subject.account.statuses_count).to eq(1)

      subject.privatize(-99, false)

      Procedure.process_account_status_statistics_queue

      expect(subject.visibility).to eq('self')
      expect(subject.account.reload.statuses_count).to eq(0)
    end
  end

  describe '#publicize' do
    it 'updates visibility, increments status count' do
      expect(subject.visibility).to eq('public')

      subject.privatize(-99, false)
      Procedure.process_account_status_statistics_queue
      expect(subject.visibility).to eq('self')
      expect(subject.account.statuses_count).to eq(0)

      subject.publicize

      Procedure.process_account_status_statistics_queue

      expect(subject.visibility).to eq('public')
      expect(subject.account.reload.statuses_count).to eq(1)
    end
  end

  describe '#proper' do
    it 'is itself for original statuses' do
      expect(subject.proper).to eq subject
    end

    it 'is the source status for reblogs' do
      subject.reblog = other
      expect(subject.proper).to eq other
    end
  end

  describe '.mutes_map' do
    let(:status)  { Fabricate(:status) }
    let(:account) { Fabricate(:account) }

    subject { Status.mutes_map([status.conversation.id], account) }

    it 'returns a hash' do
      expect(subject).to be_a Hash
    end

    it 'contains true value' do
      account.mute_conversation!(status.conversation)
      expect(subject[status.conversation.id]).to be true
    end
  end

  describe '.favourites_map' do
    let(:status)  { Fabricate(:status) }
    let(:account) { Fabricate(:account) }

    subject { Status.favourites_map([status], account) }

    it 'returns a hash' do
      expect(subject).to be_a Hash
    end

    it 'contains true value' do
      Fabricate(:favourite, status: status, account: account)
      expect(subject[status.id]).to be true
    end
  end

  describe '.reblogs_map' do
    let(:status)  { Fabricate(:status) }
    let(:account) { Fabricate(:account) }

    subject { Status.reblogs_map([status], account) }

    it 'returns a hash' do
      expect(subject).to be_a Hash
    end

    it 'contains true value' do
      Fabricate(:status, account: account, reblog: status)
      expect(subject[status.id]).to be true
    end
  end

  describe '.in_chosen_languages' do
    context 'for accounts with language filters' do
      let(:user) { Fabricate(:user, chosen_languages: ['en']) }

      it 'does not include statuses in not in chosen languages' do
        status = Fabricate(:status, language: 'de')
        expect(Status.in_chosen_languages(user.account)).not_to include status
      end

      it 'includes status with unknown language' do
        status = Fabricate(:status, language: nil)
        expect(Status.in_chosen_languages(user.account)).to include status
      end
    end
  end

  describe '.permitted_for' do
    subject { described_class.permitted_for(target_account, account).pluck(:visibility) }

    let(:target_account) { alice }
    let(:account) { bob }
    let!(:public_status) { Fabricate(:status, account: target_account, visibility: 'public') }
    let!(:unlisted_status) { Fabricate(:status, account: target_account, visibility: 'unlisted') }
    let!(:private_status) { Fabricate(:status, account: target_account, visibility: 'private') }

    let!(:direct_status) do
      Fabricate(:status, account: target_account, visibility: 'direct').tap do |status|
        Fabricate(:mention, status: status, account: account)
      end
    end

    let!(:other_direct_status) do
      Fabricate(:status, account: target_account, visibility: 'direct').tap do |status|
        Fabricate(:mention, status: status)
      end
    end

    context 'given nil' do
      let(:account) { nil }
      let(:direct_status) { nil }
      it { is_expected.to eq(%w(unlisted public)) }
    end

    context 'given blocked account' do
      before do
        target_account.block!(account)
      end

      it { is_expected.to be_empty }
    end

    context 'given same account' do
      let(:account) { target_account }
      it { is_expected.to eq(%w(direct direct private unlisted public)) }
    end

    context 'given followed account' do
      before do
        account.follow!(target_account)
      end

      it { is_expected.to eq(%w(direct private unlisted public)) }
    end

    context 'given unfollowed account' do
      it { is_expected.to eq(%w(direct unlisted public)) }
    end
  end

  describe 'before_validation' do
    it 'sets account being replied to correctly over intermediary nodes' do
      first_status = Fabricate(:status, account: bob)
      intermediary = Fabricate(:status, thread: first_status, account: alice)
      final        = Fabricate(:status, thread: intermediary, account: alice)

      expect(final.in_reply_to_account_id).to eq bob.id
    end

    it 'creates new conversation for stand-alone status' do
      expect(Status.create(account: alice, text: 'First').conversation_id).to_not be_nil
    end

    it 'keeps conversation of parent node' do
      parent = Fabricate(:status, text: 'First')
      expect(Status.create(account: alice, thread: parent, text: 'Response').conversation_id).to eq parent.conversation_id
    end

    it 'sets `local` to true for status by local account' do
      expect(Status.create(account: alice, text: 'foo').local).to be true
    end

    it 'sets `local` to false for status by remote account' do
      alice.update(domain: 'example.com')
      expect(Status.create(account: alice, text: 'foo').local).to be false
    end
  end

  describe 'validation' do
    it 'disallow empty uri for remote status' do
      alice.update(domain: 'example.com')
      status = Fabricate.build(:status, uri: '', account: alice)
      expect(status).to model_have_error_on_field(:uri)
    end
  end

  describe 'after_create' do
    it 'saves ActivityPub uri as uri for local status' do
      status = Status.create(account: alice, text: 'foo')
      status.reload
      expect(status.uri).to start_with('https://')
    end

    it 'should increment the reblogs_count' do
      quote = Fabricate(:status, account: bob)
      Status.create(account: alice, text: 'foo', quote_id: quote.id)
      Procedure.process_status_reblog_statistics_queue
      quote.reload
      expect(quote.reblogs_count).to eq(1)
    end
  end

  describe 'after_destroy' do
    it 'should decrement the reblogs_count' do
      quote = Fabricate(:status, account: bob)
      status = Fabricate(:status, account: alice, quote_id: quote.id)
      status.destroy!
      Procedure.process_status_reblog_statistics_queue
      quote.reload
      expect(quote.reblogs_count).to eq(0)
    end
  end

  describe 'text_hash' do
    it 'hashes text for indexing' do
      expect(subject.text_hash).to eq(Digest::SHA2.hexdigest(subject.text))
    end

    it 'strips whitespace before hashing' do
      subject.update!(text: " " + subject.text + " ")
      expect(subject.text_hash).to eq(Digest::SHA2.hexdigest(subject.text.strip))
    end
  end

  describe 'skip_indexing?' do
    it 'skips indexing if a reblog or the retruths + counts is not a multiple of 20' do
      subject.reblog = other
      expect(subject.skip_indexing?).to be true
    end
    it 'do not skip indexing if a reblog or the retruths + counts is not a multiple of 20' do
      expect(subject.skip_indexing?).to be false
    end
    it 'do skip indexing not a reblog and the retruths + counts is not a multiple of 20' do
      Fabricate(:favourite, account: bob, status: subject)
      Fabricate(:favourite, account: alice, status: subject)
      Procedure.process_status_favourite_statistics_queue

      expect(subject.skip_indexing?).to be true
    end
  end

  describe '#cache_last_status_at' do

    it "doesn't cache it if it's a group truth" do
      group = Fabricate(:group, display_name: 'Lorem Ipsum', note: 'Note', statuses_visibility: 'everyone', owner_account: bob )
      group.memberships.create!(account: bob, role: :owner)

      Status.create!(text: 'First', group: group, visibility: :group, account: bob)

      expect(Redis.current.get("last_status_at:#{bob.id}")).to be_nil
    end

    it "doesn't cache it if it's a reply" do
      Status.create!(text: 'reply', account: bob, thread: subject)

      expect(Redis.current.get("last_status_at:#{bob.id}")).to be_nil
    end
  end

  describe '#excluding_unauthorized_tv_statuses' do
    it "should filter out tv statuses if the account does not have tv enabled" do
      start_time = Time.now.to_i * 1000
      end_time = (Time.now.to_i + 3600) * 1000
      program_name = 'Test program'
      image_name = 'test.jpg'
      tv_channel = Fabricate(:tv_channel)
      tv_channel.update(enabled: true)
      tv_feature = Configuration::FeatureFlag.create!(name: 'tv', status: 'account_based')
      Fabricate(:tv_channel_account, account: bob, tv_channel: tv_channel)
      tv_program = TvProgram.create!(channel_id: tv_channel.id, name: program_name, image_url: image_name, start_time:  Time.zone.at(start_time.to_i / 1000).to_datetime, end_time:  Time.zone.at(end_time.to_i / 1000).to_datetime)
      tv_status = Fabricate(:status, account: bob, tv_program_status?: true)
      TvProgramStatus.create!(tv_program: tv_program, tv_channel: tv_channel, status: tv_status)
      Configuration::AccountEnabledFeature.create!(feature_flag_id: tv_feature.id, account_id: alice.id)

      expect(Status.excluding_unauthorized_tv_statuses(alice).pluck(:id)).to match_array tv_status.id
      expect(Status.excluding_unauthorized_tv_statuses(bob).pluck(:id)).to be_empty
    end
  end
end
