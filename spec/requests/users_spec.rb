require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  include Devise::Test::ControllerHelpers
  before do
    @user = FactoryBot.create(:user)
    sign_in @user
  end


  describe "GET #show" do
    context "正常なリクエストが行われた場合" do
      it "リクエストが成功すること" do
        get :show, params: { id: @user.id }
        expect(response).to have_http_status(200)
      end

      it "適切なユーザーが取得されること" do
        get :show, params: { id: @user.id }
        expect(assigns(:user)).to eq(@user)
      end
    end
  end

  describe "GET #edit" do
    context "正常なリクエストが行われた場合" do
      it "リクエストが成功すること" do
        get :edit, params: { id: @user.id }
        expect(response).to have_http_status(200)
      end

      it "適切なユーザーが取得されること" do
        get :edit, params: { id: @user.id }
        expect(assigns(:user)).to eq(@user)
      end

      it "正しいテンプレートを描画すること" do
        get :edit, params: { id: @user.id }
        expect(response).to render_template(:edit)
      end
    end

    describe "PATCH #update" do  
      context "正常なリクエストが行われた場合" do
        it "ユーザーの情報が更新されること" do
          patch :update, params: { id: @user.id, user: { username: "new_username" } }
          @user.reload
          expect(@user.username).to eq("new_username")
        end
  
        it "リダイレクトが適切に行われること" do
          patch :update, params: { id: @user.id, user: { username: "new_username" } }
          expect(response).to redirect_to root_path
        end
      end
  
      context "無効なリクエストが行われた場合" do        
        it "編集ページにリダイレクトされること" do
          patch :update, params: { id: @user.id, user: { username: nil } }
          expect(response).to render_template(:edit)
        end
      end
    end
    describe "DELETE #destroy" do
      context "正常なリクエストが行われた場合" do
        it "ユーザーが削除されること" do
          expect {
            delete :destroy, params: { id: @user.id }
          }.to change(User, :count).by(-1)
        end
  
        it "ルートパスにリダイレクトされること" do
          delete :destroy, params: { id: @user.id }
          expect(response).to redirect_to(root_path)
        end
      end
    end
  end
end