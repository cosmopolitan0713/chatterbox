Rails.application.routes.draw do
  devise_for :users
  
  root to: "conversations#index"
  resources :conversations , only: :index

end
