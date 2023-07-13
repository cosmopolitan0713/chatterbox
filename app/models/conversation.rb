class Conversation < ApplicationRecord
  belongs_to :user

  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :character
  belongs_to :background, optional: true

  validates :content, presence: true
  validates :character_id, numericality: { other_than: 0, message: "を選択してください" }
  validates :background_id, numericality: { allow_nil: true, other_than: 0, message: "を選択してください" }
  
  def background_image
    if background_id.present?
      background = Background.find_by(id: background_id)
      background.image_url if background
    else
      'default_background.jpg'
    end
  end  

end
