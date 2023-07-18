class Conversation < ApplicationRecord
  belongs_to :user

  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :character

  validates :content, presence: true
  validates :character_id, numericality: { other_than: 0, message: "を選択してください" }, presence: true
  
end
