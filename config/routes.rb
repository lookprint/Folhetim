Rails.application.routes.draw do

  devise_for :admins, controllers: {
    sessions: 'admin/auth/sessions',
    confirmations: 'admin/auth/confirmations',
    passwords: 'admin/auth/passwords'
  },
  path: 'admin', 
  path_names: { 
  	sign_in: 'login', 
  	sign_out: 'logout', 
  	password: 'secret', 
  	onfirmation: 'verification', 
  	unlock: 'unblock', 
  	registration: 'register', 
  	sign_up: 'cmon_let_me_in' 
  }

  
  namespace :admin do
  	
  	authenticated :admin do
       resources :murals	
       resources :departments
    end

   unauthenticated :admin do
   	  
   end

   	 root 'murals#index'
  end


  	

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
