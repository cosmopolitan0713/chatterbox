class ConversationsController < ApplicationController
  
  def index
    @conversations = Conversation.all.includes(:user)
    @conversation = Conversation.new
    @character = current_user&.character || Character.find_by(id: current_user&.character_id)
    @background = current_user&.user_background
  end

  def new
    @conversation = Conversation.new
  end

  def create
  @conversation = Conversation.new(conversations_params)
    if @conversation.save
      redirect_to root_path, notice: "保存に成功しました"
    else
      render :index
    end
  end

  def show
  end
  
  def character_select
    @conversation = Conversation.new
    @characters = Character.all
  end

  def update_character
    current_user.update(character_id: params[:user][:character_id])
    redirect_to conversations_path
  end

  def background_settings
    @conversation = Conversation.find(params[:id])
    @backgrounds = Background.all
  end
  

  private
  
  def conversations_params
    params.require(:conversation).permit(:content, :user_id, :character_id)
  end

end
