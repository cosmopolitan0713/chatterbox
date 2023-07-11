class Character < ActiveHash::Base
  self.data = [
    { id: 1, name: 'ずんだもん', image: '1.png' },
    { id: 2, name: 'ずんだもん', image: '2.png' },
    { id: 3, name: 'ずんだもん', image: '3.png' },
    { id: 4, name: 'めたん'    , image: 'metan1.png' }

  ]
  def self.default
    find(1)
  end
  
  def image_url
    image
  end

end