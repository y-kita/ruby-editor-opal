Rails.application.routes.draw do
  root "editors#index"

  namespace 'api' do
    namespace 'v1' do
      resources :posts
    end
  end
end
