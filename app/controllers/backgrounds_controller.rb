class BackgroundsController < ApplicationController
  
  def index
    @background = Background.all
  end
    
  def edit
    @backgrounds = Background.all
    @background = Background.find_by(id: @conversation.background_id)
  end

  def update
    background = Background.find_by(id: params[:background_id])
    if background
      current_user.update(background_id: background.id)
      redirect_to root_url, notice: '背景が更新されました。'
    else
      redirect_to root_url, alert: '背景の更新に失敗しました。'
    end
  end
end