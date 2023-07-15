module ApplicationHelper
  def background_image_url(background_id)
    if background_id.present?
      background = Background.find(background_id)
      asset_url(background.image)
    else
      asset_url('default_background.jpg')
    end
  end
end
