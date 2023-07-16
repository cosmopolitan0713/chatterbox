class UsersController < ApplicationController
  
  def show
    if user_signed_in?
      @user = current_user
      @character = current_user.character
    else
      redirect_to new_user_session_path, alert: "ログインしてください。"
    end
  end

  def edit
    @user = current_user
    @character = current_user.character
  end

  def update
    @user = current_user
    if @user.update(user_params)
      sign_in @user, bypass: true
      redirect_to user_path(current_user), notice: 'ユーザー情報が更新されました。'
    else
      render :edit
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

end
