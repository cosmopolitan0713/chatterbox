require 'rails_helper'

RSpec.describe Conversation, type: :model do
  before do
    @conversation = FactoryBot.build(:conversation)
  end

  describe 'メッセージ投稿' do
    context 'メッセージが投稿できる場合' do
      it 'すべての値が存在していれば保存できる' do
        expect(@conversation).to be_valid
      end
    end

    context 'メッセージが投稿できない場合' do
      it 'contentが空では保存できない' do
        @conversation.content = ''
        @conversation.valid?
        expect(@conversation.errors.full_messages).to include("Contentを入力してください")
      end
      it 'userが紐付いてないと保存できない' do
        @conversation.user = nil
        @conversation.valid?
        expect(@conversation.errors.full_messages).to include("Userを入力してください")
      end
      it 'キャラクターが紐付いてないと保存できない' do
        @conversation.character = nil
        @conversation.valid?
        expect(@conversation.errors.full_messages).to include("Characterを入力してください")
      end
    end
  end

end
