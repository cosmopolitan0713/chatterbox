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
  validates :character_id, presence: { message: 'を選択してください' }

  PASSWORD_REGEX = /\A(?=.*?[a-z])(?=.*?\d)[a-z\d]+\z/i
  validates_format_of :password, with: PASSWORD_REGEX, message: 'is invalid. Include both letters and numbers', on: :registration

  # showページに記述するため
  def hobbies_name
    Hobbies.find_by(id: hobbies_id)&.name
  end

  def interests_name
    Interests.find_by(id: interests_id)&.name
  end

  def character_name
    Character.find_by(id: character_id)&.name
  end
  # ここまで

  def background
    Background.find_by(id: background_id)
  end

  def user_background
    background || Background.default_background
  end

  # 更新時、パスワードを除外
  def update_without_current_password(params, *options)
    params.delete(:current_password)

    if params[:password].blank? && params[:password_confirmation].blank?
      params.delete(:password)
      params.delete(:password_confirmation)
    end

    result = update_attributes(params, *options)
    clean_up_passwords
    result
  end
end
