module Spree
  CheckoutController.class_eval do
    before_action :update_marketing_preferences, only: :update

    def before_address
      default_country = Spree::Country.find_by(iso: country_iso_lookup) if country_iso_lookup.present?
      # if the user has a default address, a callback takes care of setting
      # that; but if he doesn't, we need to build an empty one here
      @order.bill_address ||= default_country ? Address.new(country: default_country) : Address.build_default
      @order.ship_address ||= default_country ? Address.new(country: default_country) : Address.build_default if @order.checkout_steps.include?("delivery")
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

    def summary_adjustments
      render partial: "spree/checkout/summary_adjustments", locals: { order: simple_current_order }
      fresh_when(simple_current_order)
    end

    def update_marketing_preferences
      return unless params[:state] == "address"
      @user ||= try_spree_current_user
      @user.update_attributes(email_marketing) if @user
    end

    private

    def country_iso_lookup
      return request.headers["CF-IPCountry"] if request.headers["CF-IPCountry"].present?

      request.location.country
    end

    def email_marketing
      params.require(:user).permit(:accepts_marketing_emails)
    end
  end
end
