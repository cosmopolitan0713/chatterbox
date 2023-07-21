class Character < ActiveHash::Base
  self.data = [
    { id: 1, name: 'めたん', image: 'metan1.png', profile1: '何も考えていない' },
    { id: 2, name: 'ずんだもん', image: 'zunda1.png', profile1: '何も考えていない' }, 
    { id: 3, name: 'つむぎ', image: 'tumugi1.png', profile1: '何も考えていない' },
    { id: 9, name: '冥鳴', image: 'meimei1.png', profile1: '何も考えていない' },
    { id: 11, name: 'いたこ', image: 'itako1.png', profile1: '何も考えていない' }

  ]

  def image_url
    "/assets/#{image}"
  end

  def self.default
    find(1)
  end

end
