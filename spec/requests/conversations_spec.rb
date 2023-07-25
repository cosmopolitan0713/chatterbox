require 'rails_helper'

RSpec.describe ConversationsController, type: :controller do
  include Devise::Test::ControllerHelpers
  
  before do
    @conversation = FactoryBot.create(:conversation) 
    @conversation1 = FactoryBot.create(:conversation)
    @conversation2 = FactoryBot.create(:conversation)
  end

  describe "GET #index" do
    it 'indexアクションにリクエストすると正常にレスポンスが返ってくる' do
      routes.draw do
        root "conversations#index"
      end
      get :index
      expect(response).to have_http_status(200)
    end
    it 'indexアクションにリクエストすると@conversationsにデータが含まれている' do
      get :index
      conversations = assigns(:conversations)
      expect(conversations).to match_array([@conversation,@conversation1, @conversation2])
    end
    it 'indexアクションにリクエストすると@characterにcurrent_user.characterが割り当てられる' do
      user = FactoryBot.create(:user)
      sign_in(user)
      expect(assigns(:character)).to be_nil
      character = FactoryBot.create(:character)
      user.update(character: character)
      get :index
      expect(assigns(:character)).to eq(character)
    end

    it 'indexアクションにリクエストすると@characterにcurrent_user.characterが存在しない場合、current_user.character_idを使ってCharacterを検索して割り当てる' do
      user = FactoryBot.create(:user)
      sign_in(user)
      expect(assigns(:character)).to be_nil
      get :index
      expect(assigns(:character)).to eq(Character.find_by(id: user.character_id))
    end

    it 'indexアクションにリクエストするとレスポンスに@backgroundにデータが含まれている' do
      user = FactoryBot.create(:user)
      sign_in(user)
      background = FactoryBot.create(:background)
      user.update(background: background)
      get :index
      expect(assigns(:background)).to eq(background)
    end

    it '@userとcurrent_userが一致していることを確認' do
      user = FactoryBot.create(:user)
      sign_in(user)
      get :index
      expect(assigns(:user)).to eq(user)
    end
  end

  describe 'POST #create' do
    it '保存に成功した場合、新しいConversationオブジェクトが作成されること' do
      user = FactoryBot.create(:user)
      character = FactoryBot.create(:character)

      puts "user_id: #{user.id}"
      puts "character_id: #{character.id}"

      sign_in(user)

      post :create, params: {
        conversation: {
          content: "テストメッセージ",
          chatbot_reply: "チャットボットの応答メッセージ",
          character_id: character.id
        },
        user_id: user.id
      }

      expect(Conversation.last).to be_present
    end

    it '保存に成功した場合、JSON形式の成功メッセージが返されること' do
    end

    it '保存に失敗した場合、新しいConversationオブジェクトが作成されないこと' do
    end

    it '保存に失敗した場合、JSON形式のエラーメッセージが返されること' do
    end
  end
end
  

