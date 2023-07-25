# spec/factories/characters.rb

FactoryBot.define do
  factory :character do
    sequence(:name) { |n| "Character #{n}" } # 連番を持つ名前を生成する例
    # 他の属性を必要に応じて追加してください
    # 例：image, profile1, profile2, profile3など
    name { 'ずんだもん' }
    # imageは画像ファイル名を指定する属性と仮定します
    image { 'metan1.png' }

    # profile1, profile2, profile3は適当なプロフィールを指定する属性と仮定します
    profile1 { 'プロフィール1の内容' }
    profile2 { 'プロフィール2の内容' }
    profile3 { 'プロフィール3の内容' }
  end
end
