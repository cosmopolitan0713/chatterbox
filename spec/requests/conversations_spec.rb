require 'rails_helper'

RSpec.describe ConversationsController, type: :controller do
  include Devise::Test::ControllerHelpers

  before do
    @user = FactoryBot.create(:user)
    @character = FactoryBot.create(:character)
    sign_in @user
    @conversation = FactoryBot.create(:conversation, user: @user)
    @conversations = [@conversation]
  end

  describe 'GET #index' do
    it 'indexアクションにリクエストすると正常にレスポンスが返ってくる' do
      routes.draw do
        root 'conversations#index'
      end
      get :index
      expect(response).to have_http_status(200)
    end

    it 'indexアクションにリクエストすると@conversationsにデータが含まれている' do
      get :index
      conversations = assigns(:conversations)
      expect(conversations).to match_array([@conversation])
    end

    it 'indexアクションにリクエストすると@characterにcurrent_user.characterが割り当てられる' do
      expect(assigns(:character)).to be_nil
      @user.update(character: @character)
      get :index
      expect(assigns(:character)).to eq(@character)
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
      user.update(background:)
      get :index
      expect(assigns(:background)).to eq(background)
    end

    it '@userとcurrent_userが一致していることを確認' do
      get :index
      expect(assigns(:user)).to eq(@user)
    end
  end
end
