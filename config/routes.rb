Rails.application.routes.draw do
  devise_for :users

  root to: "conversations#index"
  resources :conversations, only: [:index,:new, :create] do
    get 'character_select', on: :collection
    get 'background_settings', on: :member
  end
  
  resources :backgrounds, only: [:index, :edit, :update]
  resources :characters, only: [:index]

  get '/conversations/character_select', to: 'conversations#character_select', as: 'character_select_conversation'
end
