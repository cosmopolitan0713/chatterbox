class UsersController < ApplicationController
  
  def show
    @user = current_user
    @character = current_user.character
  end
  
  def edit
    @user = current_user
  end 
  
  def edit_character
    @character = current_user.character
  end

  def update
    @user = current_user
    if @user.update(user_params)
      redirect_to @user, notice: 'ユーザー情報が更新されました。'
    else
      render :edit
    end
  end
  
  private
  
  def user_params
    params.require(:user).permit(:username, :email, :date_of_birth, :hobbies_id, :interests_id, :character_id)
  end

end
