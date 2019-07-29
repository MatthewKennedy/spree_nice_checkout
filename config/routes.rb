Spree::Core::Engine.add_routes do
  put "/update_gdpr", controller: "users", action: "update_gdpr", as: :update_gdpr
  put "/update_marketing_preferences", controller: "checkout", action: "update_marketing_preferences", as: :update_marketing_preferences
  put "/update_terms_preferences", controller: "checkout", action: "update_terms_preferences", as: :update_terms_preferences
  delete "/checkout/remove_coupon", controller: "checkout", action: "remove_coupon", as: :remove_coupon
  get "/summary_adjustments", controller: "checkout", action: "summary_adjustments", as: :summary_adjustments
end
