module Spree
  CheckoutController.class_eval do
    before_action :update_marketing_preferences, only: :update

    def update_marketing_preferences
      return unless params[:state] == "address"
      @user ||= try_spree_current_user
      @user.update_attributes(email_marketing) if @user
    end

    def summary_adjustments
      render partial: "spree/checkout/summary_adjustments", locals: { order: simple_current_order }
      fresh_when(simple_current_order)
    end

    def remove_coupon
      adjustment = Spree::Adjustment.find(params[:id])
      code = adjustment.source&.promotion&.code
      coupon_handler = Spree::PromotionHandler::Coupon.new(current_order)
      @status = coupon_handler.remove(code)
      respond_to do |format|
        format.js { }
      end
    end

    private

    def email_marketing
      params.require(:user).permit(:accepts_marketing_emails)
    end
  end
end
