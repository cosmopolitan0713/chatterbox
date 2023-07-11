class ConversationsController < ApplicationController

  def index
    @conversations = Conversation.all.includes(:user)
    @background = Background.all.sample
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

  def background_settings
    @conversation = Conversation.find(params[:id])
    @backgrounds = Background.all
  end

  private

  def conversation_params
    params.require(:conversation).permit(:content, :user_id, :character_id, :background_id)
  end

end
