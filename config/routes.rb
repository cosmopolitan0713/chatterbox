Rails.application.routes.draw do
  devise_for :users

  root to: "conversations#index"
  
  resources :conversations, only: [:index, :new, :create] do
    collection do
      get 'character_select'
    end
    member do
      get 'background_settings'
      patch 'update_background'
    end
  end
  
  resources :users, only: [:show, :edit, :update]
  resources :backgrounds, only: [:edit, :update]
  resources :characters, only: [:edit, :update]

  get '/conversations/character_select', to: 'conversations#character_select', as: 'character_select_conversation'
  get 'edit_character', to: 'users#edit_character'

end
