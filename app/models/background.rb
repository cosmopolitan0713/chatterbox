class Background < ActiveHash::Base
  attr_accessor :image

  self.data = [
    { id: 1, name: 'Default Background', image_url: 'default_background.jpg' },
    { id: 2, name: '食堂' , image_url: '5919320i.jpg' },
    { id: 3, name: 'ラジオ室', image_url: '1688670i.jpg' },
    { id: 4, name: '港', image_url: '1988536i.jpg'},
    { id: 5, name: '部屋', image_url: '3122679i.jpg' },
    { id: 6, name: '駅', image_url: '5534443qz.jpg' },
    { id: 7, name: 'ラウンジ', image_url: '11069179i.jpg'}
  ]
  
  def self.default_background
    find(1)
  end
  
  def current_image_url
    self.image_path.to_s
  end
  
  def image_path
    "/images/backgrounds/#{image}"
  end
  
  def users
    User.where(background_id: self.id)
  end

end