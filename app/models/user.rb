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

  validates :username,     presence: true
  validates :character_id, presence: true

  PASSWORD_REGEX = /\A(?=.*?[a-z])(?=.*?\d)[a-z\d]+\z/i
  validates_format_of :password, with: PASSWORD_REGEX, message: 'is invalid. Include both letters and numbers'  

  with_options numericality: { other_than: 0, message: "を選択してください" } do
    validates :character_id
  end

end
