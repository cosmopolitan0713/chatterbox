class CharactersController < ApplicationController

  def edit 
    @characters = Character.all
    @user = current_user
    @character = Character.find_by(id: @user.character_id)
  end

  def update
    puts current_user.character_id
    current_user.update(character_id: params[:user][:character_id])
    redirect_to root_url, notice: 'キャラクターが更新されました。'
    puts current_user.character_id
    @character = Character.find(current_user.character_id)
    puts current_user.character_id
  end

end  
