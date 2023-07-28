class ApplicationController < ActionController::Base
  before_action :basic_auth
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

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      username == ENV['BASIC_AUTH_USER'] && password == ENV['BASIC_AUTH_PASSWORD']
    end
  end
end
