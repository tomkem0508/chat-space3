Rails.application.routes.draw do
  devise_for :users
  root to: 'groups#index'
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
    resources :users, only: [:index]
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
end
