class CharactersController < ApplicationController

  def index 
    @characters = Character.all
    @conversation = Conversation.new
  end
end
