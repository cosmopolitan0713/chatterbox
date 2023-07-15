class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  
  

  
  private
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(
      :sign_up,
      keys: [
        :username,
        :date_of_birth,
        :hobbies_id,
        :interests_id,
        :character_id,
        :background_id
        ]
      )
    devise_parameter_sanitizer.permit(
        :account_update,
         keys: [
        :username,
        :date_of_birth,
        :hobbies_id,
        :interests_id,
        :character_id,
        :background_id
        ]
      )  
  end
end
