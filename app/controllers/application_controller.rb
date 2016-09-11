class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

   # Overwriting the sign_out redirect path method
  def after_sign_out_path_for(resource_or_scope)
    new_admin_session_path
  end


end
