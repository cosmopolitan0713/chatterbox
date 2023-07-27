# spec/factories/characters.rb

FactoryBot.define do
  factory :character do
    name { 'ずんだもん' }
    # imageは画像ファイル名を指定する属性と仮定します
    image { 'metan1.png' }

    # profile1, profile2, profile3は適当なプロフィールを指定する属性と仮定します
    profile1 { 'プロフィール1の内容' }
    profile2 { 'プロフィール2の内容' }
    profile3 { 'プロフィール3の内容' }
  end
end
