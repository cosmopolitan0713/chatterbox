Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions' }

  root to: "conversations#index"
  
  resources :conversations, only: [:index, :new, :create] 
  resources :users, only: [:show, :edit, :update, :destroy]
  resources :backgrounds, only: [:edit, :update]
  resources :characters, only: [:edit, :update]

  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end


end
