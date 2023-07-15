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
  end

  def update
    @user = current_user
    if @user.update(user_params)
      sign_in @user, bypass: true
      redirect_to '/conversations', notice: 'ユーザー情報が更新されました。'
    else
      render :edit
    end
  end
  
  def destroy
    @user = current_user
    sign_out @user
    redirect_to root_path
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :date_of_birth, :hobbies_id, :interests_id, :character_id)
  end

end
