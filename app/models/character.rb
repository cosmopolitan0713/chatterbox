class Character < ActiveHash::Base
  self.data = [
    { id: 1,
       name: '四国めたん', 
       image: 'metan1-5fce643c5d71b7c566acf697b27f4bd0da82db5e2a7302626564b888f43e4cf9.png', 
       profile1: '若干ツンデレ気味',
       profile2:'趣味は中二病妄想。',
       profile3:'高等部二年生。常に金欠。' },
    { id: 2, 
      name: 'ずんだもん', 
      image: 'zunda1-5881d5aa1a1daa4eefe9ca6639864a4f1d3b1a9aaece0d4af870222806bb4d1f.png', 
      profile1: '優しくフレンドリー',
      profile2: 'ずんだ餅にかかわることはだいたい好き',
      profile3: 'ずんだ餅の精。'
    }, 
    { id: 3, 
      name: '春日部つむぎ', 
      image: 'tumugi1-c48380e6d2ade86055b1e9c8a2bce83ccc90eca97b58ef97fe7066268a094915.png', 
      profile1: 'やんちゃに見えて実は真面目な一面もある',
      profile2: 'カレー',
      profile3: '埼玉県内の高校に通うギャルの女の子。'
    },
    { id: 9, name: '冥鳴ひまり', image: 'meimei1.png', profile1: '何も考えていない' },
    { id: 11, name: '東北イタコ', image: 'itako1.png', profile1: '何も考えていない' }

  ]

  def image_url
    "/assets/#{image}"
  end

  def self.default
    find(1)
  end

end
