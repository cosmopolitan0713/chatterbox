require 'rails_helper'

RSpec.describe CharactersController, type: :controller do
  include Devise::Test::ControllerHelpers

  describe "GET #edit" do
    it "リクエストが成功し、@characterと@charactersが適切に割り当てられること" do
      # 事前にCharacterレコードを作成する
      character = FactoryBot.create(:character)
      user = FactoryBot.create(:user)
      sign_in user
      # editアクションにGETリクエストを送信
      get :edit, params: { id: character.id }
      
      # リクエストに対するレスポンスとして成功(200)を期待する
      expect(response).to have_http_status(200)
      
      # @characterと@charactersが適切に割り当てられていることを確認する
      expect(assigns(:character)).to eq(character)
      expect(assigns(:characters)).to eq(Character.all)
    end

    it "編集ページが開けること" do
      character = FactoryBot.create(:character)
      user = FactoryBot.create(:user)
      sign_in user
      get :edit, params: { id: character.id} 
      expect(response).to have_http_status(200)
    end
  end
end

