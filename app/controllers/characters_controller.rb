class CharactersController < ApplicationController
  before_action :authenticate_user!, only: [:edit, :update]

  def edit
    @character = Character.find(params[:id])
    @characters = Character.all
  end

  def update
  end
end
