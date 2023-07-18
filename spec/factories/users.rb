FactoryBot.define do
  factory :user do
    username              {'test'}
    email                 { Faker::Internet.email }
    password              {'abc123'}
    password_confirmation {password}
    character_id             { 1 }
    hobbies_id               { 1 }
    interests_id             { 1 }
    background_id            { 1 }
    date_of_birth         { '1992-08-31' }

    factory :user_without_password do
      password { nil }
      password_confirmation { nil }
    end

  end
end