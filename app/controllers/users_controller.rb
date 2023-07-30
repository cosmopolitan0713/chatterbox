class UsersController < ApplicationController
  before_action :check_ownership, only: [:show, :edit]

  def show
    if user_signed_in?
      @user = current_user
      @character = current_user.character
    else
      redirect_to new_user_session_path, alert: 'ログインしてください。'
    end
  end

  def edit
    @user = current_user
    @character = current_user.character || current_user.build_character

    # ユーザーが存在しない場合は404エラーを返す
    render_not_found if @user.nil?
  end

  def update
    @user = current_user
    @character = current_user.character
    if @user.update(user_params)
      sign_in @user, bypass: true
      redirect_to root_path
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find(params[:id])
    conversations = @user.conversations
    conversations.each do |conversation|
      conversation.destroy
    end
    if @user.destroy
      conversations.destroy_all
      # 削除成功時の処理
      flash[:notice] = 'アカウントが削除されました'
      redirect_to root_path
    else
      # 削除失敗時の処理
      flash[:alert] = 'アカウントの削除に失敗しました'
      redirect_to user_path(@user)
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :date_of_birth, :hobbies_id, :interests_id, :character_id)
  end

  def check_ownership
    # ログイン中のユーザーと表示するユーザーが異なる場合はリダイレクト
    return if current_user.id == params[:id].to_i

    redirect_to root_path, alert: '他のユーザーのページにはアクセスできません。'
  end
end
