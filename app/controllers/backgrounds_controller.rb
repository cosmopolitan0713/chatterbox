class BackgroundsController < ApplicationController
  before_action :authenticate_user!, only: [:edit, :update]

  def edit
    @user = current_user
    @backgrounds = Background.all
  end

  def update
    @user = current_user
    if @user.update(user_params)
      sign_in @user, bypass: true
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:background_id)
  end
end
