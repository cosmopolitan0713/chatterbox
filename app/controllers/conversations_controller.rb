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
    @character = Character.find(@conversation.character_id)

    puts "Conversation Params: #{conversations_params}" # デバッグ用のログ


    respond_to do |format|
      if @conversation.save
        format.html { redirect_to root_path, notice: '保存に成功しました' }
        format.json { render json: { status: 'success', message: '保存に成功しました' } }
      else
        format.html do
          @conversations = Conversation.all
          logger.error(@conversation.errors.full_messages)
          render :index
        end
        format.json { render json: { status: 'error', errors: @conversation.errors.full_messages } }
      end
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

  private

  def conversations_params
    params.require(:conversation).permit(:content, :user_id, :character_id)
  end
end
