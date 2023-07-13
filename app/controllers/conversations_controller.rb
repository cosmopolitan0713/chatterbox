class ConversationsController < ApplicationController

  def index
    @conversations = Conversation.all.includes(:user)
    @conversation = Conversation.new
    @character = current_user&.character || Character.find_by(id: current_user&.character_id)
  end

  def new
    @conversation = Conversation.new
  end

  def create
  @conversation = Conversation.new(conversation_params)
    if @conversation.save
      redirect_to root_path, notice: "保存に成功しました"
    else
      render :new
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
  
  def update_background
    @conversation = Conversation.find(params[:id])
    if @conversation.update(conversation_params)
      redirect_to conversations_path, notice: "背景が更新されました。"
    else
      flash.now[:alert] = "背景の更新に失敗しました。"
      render :background_settings
    end
  end

  private
  
  def conversation_params
    paramu.require(:conversation).permit(:background_id)
  end

  def conversations_params
    params.require(:conversation).permit(:content, :user_id, :character_id, :background_id)
  end

end
