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
  
  
  PASSWORD_REGEX = /\A(?=.*?[a-z])(?=.*?\d)[a-z\d]+\z/i
  validates_format_of :password, with: PASSWORD_REGEX, message: 'is invalid. Include both letters and numbers', on: :registration

  with_options numericality: { other_than: 0, message: "を選択してください" } do
    validates :character_id
  end
  # showページに記述するため
  def hobbies_name
    Hobbies.find_by(id: self.hobbies_id)&.name
  end

  def interests_name
    Interests.find_by(id: self.interests_id)&.name
  end

  def character_name
    Character.find_by(id: self.character_id)&.name
  end
  # ここまで

  def background
    Background.find_by(id: self.background_id)
  end
  
  def user_background
    background || Background.default_background
  end
  
  # 追加
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
