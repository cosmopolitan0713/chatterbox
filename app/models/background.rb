class Background < ActiveHash::Base
  self.data = [
    { id: 1, name: '食堂' , image: '5919320i.jpg' },
    { id: 2, name: 'ラジオ室', image: '1688670i.jpg' },
    { id: 3, name: '港', image: '1988536i.jpg'},
    { id: 4, name: '部屋', image: '3122679i.jpg' },
    { id: 5, name: '駅', image: '5534443qz.jpg' },
    { id: 6, name: 'ラウンジ', image: '11069179i.jpg'}
  ]
  
  def self.default
    find(1)
  end
  
  def current_image_url
    self.image_path.to_s
  end
  
  def image_path
    "/images/backgrounds/#{image}"
  end

end