Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: "users/registrations" 
  }

  root to: "conversations#index"
  
  resources :conversations, only: [:index, :new, :create, :destroy] 
  resources :users, only: [:show, :edit, :update, :destroy] 
  resources :characters, only: [:edit, :update]
  resources :backgrounds, only: [:edit, :update]
  
  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end


end
