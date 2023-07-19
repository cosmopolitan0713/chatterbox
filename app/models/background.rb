class Background < ActiveHash::Base

  self.data = [
    { id: 1, name: '草原', image_url: 'default_background.jpg' },
    { id: 2, name: '食堂' , image_url: '5919320i.jpg' },
    { id: 3, name: 'ラジオ室', image_url: '1688670i.jpg' },
    { id: 4, name: '港', image_url: '1988536i.jpg'},
    { id: 5, name: '部屋', image_url: '3122679i.jpg' },
    { id: 6, name: '森', image_url: '森.jpg' },
    { id: 7, name: 'ラウンジ', image_url: '11069179i.jpg'}
  ]
  
end