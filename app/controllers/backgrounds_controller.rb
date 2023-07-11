class BackgroundsController < ApplicationController
  def index
    @backgrounds = Background.all
    @current_background = Background.first
  end
end
