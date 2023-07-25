class ConversationsController < ApplicationController
  before_action :load_conversations, only: [:index, :character_conversations]
  before_action :set_conversation, only: [:background_settings]
  before_action :build_conversation, only: [:index, :new, :character_select]

  def index
    @character = current_user&.character || Character.find_by(id: current_user&.character_id)
    @background = current_user&.user_background
    @user = current_user
  end

  def new
  end

  def create
    @conversation = Conversation.new(conversation_params)
    @character = Character.find(@conversation.character_id)

    # 返信テキストを保存
    @conversation.chatbot_reply = params[:conversation][:response_text]
  
    if @conversation.save
      render json: { status: "success", message: "会話が保存されました。"}
    else
      render json: { status: "error", message: "保存に失敗しました。" }
    end
  end

  def character_select
    @characters = Character.all
  end

  def update_character
    current_user.update(character_id: params[:user][:character_id])
    redirect_to conversations_path
  end

  def background_settings
    @backgrounds = Background.all
  end
  
  private

  def conversation_params
    params.require(:conversation).permit(:content, :chatbot_reply, :character_id, :user_id)
  end

  def load_conversations
    @conversations = Conversation.all.includes(:user)
  end

  def set_conversation
    @conversation = Conversation.find(params[:id])
  end

  def build_conversation
    @conversation = Conversation.new
  end

end
