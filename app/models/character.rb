class Character < ActiveHash::Base

  self.data = [
    { id: 0, name: 'めたん'    , image: 'metan1.png' ,profile1: '何も考えていない' },
    { id: 1, name: 'ずんだもん', image: 'zunda1.png' ,profile1: '何も考えていない' },
    { id: 2, name: 'つむぎ'    , image: 'tumugi1.png' ,profile1: '何も考えていない' },
    { id: 8, name: '冥鳴'      , image: 'meimei1.png' ,profile1: '何も考えていない' },
    { id: 10, name: 'いたこ'    , image: 'itako1.png' ,profile1: '何も考えていない' }

  ]
  def self.default
    find(1)
  end
  
  def image_url
    "/assets/#{image}"
  end
end