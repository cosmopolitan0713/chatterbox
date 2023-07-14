class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  has_many :conversations

  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :hobbies
  belongs_to :interests
  belongs_to :character
  belongs_to :background


  validates :username,     presence: true
  validates :character_id, presence: true
  validates :background_id, numericality: { allow_nil: true, other_than: 0, message: "を選択してください" }
  
  validates :password, presence: true, on: :update
  PASSWORD_REGEX = /\A(?=.*?[a-z])(?=.*?\d)[a-z\d]+\z/i
  validates_format_of :password, with: PASSWORD_REGEX, message: 'is invalid. Include both letters and numbers'  

  with_options numericality: { other_than: 0, message: "を選択してください" } do
    validates :character_id
  end
  
  def hobbies_name
    Hobbies.find_by(id: self.hobbies_id)&.name
  end

  def interests_name
    Interests.find_by(id: self.interests_id)&.name
  end

  def character_name
    Character.find_by(id: self.character_id)&.name
  end

  def background
    Background.find_by(id: self.background_id)
  end
  
  def user_background
    background || Background.default_background
  end
  
end
