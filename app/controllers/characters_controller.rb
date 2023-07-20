class CharactersController < ApplicationController
  before_action :authenticate_user!, only: [:edit, :update]

  def edit
    @character = Character.find(params[:id])
    @characters = Character.all
  end

  def update
    if current_user.update(user_params)
      redirect_to conversations_index_path(current_user)
    else
      render :edit
    end
  end
end
