module Spree
  CheckoutController.class_eval do
    before_action :update_marketing_preferences, only: :update

    def update_marketing_preferences
      return unless params[:state] == 'address'
      @user ||= try_spree_current_user
      @user.update_attributes(email_marketing) if @user
    end

    private

    def email_marketing
      params.require(:user).permit(:accepts_marketing_emails)
    end

  end
end
