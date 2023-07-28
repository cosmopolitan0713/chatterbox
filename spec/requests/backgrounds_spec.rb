require 'rails_helper'

RSpec.describe BackgroundsController, type: :controller do
  include Devise::Test::ControllerHelpers
  before do
    @user = FactoryBot.create(:user)
    sign_in @user
    @background = FactoryBot.create(:background)
    @backgroun_id = @background.id
  end

  describe 'GET #edit' do
    it '正常なリクエストが行われた場合、編集ページを表示すること' do
      get :edit, params: { id: @background.id }
      expect(response).to have_http_status(200)
      expect(response).to render_template(:edit)
    end

    it '適切な@userが取得されること' do
      get :edit, params: { id: @background.id }
      expect(assigns(:user)).to eq(@user)
    end
  end

  describe 'PATCH #update' do
    context '正常なリクエストが行われた場合' do
      it 'ユーザーの情報が更新されること' do
        background_id = 1 # ここに適切な背景のIDを入れる
        patch :update, params: { id: @user.id, user: { background_id: } }
        @user.reload
        expect(@user.background_id).to eq(background_id)
      end

      it 'ルートパスにリダイレクトされること' do
        background_id = 1 # ここに適切な背景のIDを入れる
        patch :update, params: { id: @user.id, user: { background_id: } }
        expect(response).to redirect_to(root_path)
      end
    end
  end
end
