FactoryBot.define do
  factory :conversation do
    content { Faker::Lorem.sentence }
    chatbot_reply { Faker::Lorem.sentence }
    character_id { 1 }
    
    association :user

    factory :invalid_conversation do
      content { nil }
    end

  end
end
