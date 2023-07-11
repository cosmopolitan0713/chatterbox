class Conversation < ApplicationRecord
  belongs_to :user

  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :character
  belongs_to :background

  validates :content, presence: true
  validates :character_id, numericality: { other_than: 0, message: "を選択してください" }
  validates :background_id, numericality: { allow_nil: true, other_than: 0, message: "を選択してください" }

end
