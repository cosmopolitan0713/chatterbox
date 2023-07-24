class ConversationsController < ApplicationController
  def index
    @conversations = Conversation.all.includes(:user)
    @conversation = Conversation.new
    @character = current_user&.character || Character.find_by(id: current_user&.character_id)
    @background = current_user&.user_background
    @user = current_user
  end

  def new
    @conversation = Conversation.new
  end

  def create
    @conversation = Conversation.new(conversations_params)
    @character = Character.find(@conversation.character_id)

    # ChatGPTの返答内容を取得
  response_text = params[:conversation][:response_text]

  # 返信テキストを保存
  @conversation.chatbot_reply = response_text
  
    if @conversation.save
      render json: { status: "success", message: "会話が保存されました。" }
    else
      render json: { status: "error", message: "保存に失敗しました。" }
    end
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
  
  # 特定のキャラクターの会話履歴を取得する
  def character_conversations
    @character = Character.find(params[:character_id])
    @conversations = @character.conversations.order(created_at: :desc)
  end

  private

  def conversations_params
    params.require(:conversation).permit(:content, :chatbot_reply, :character_id, :user_id)
  end

end
