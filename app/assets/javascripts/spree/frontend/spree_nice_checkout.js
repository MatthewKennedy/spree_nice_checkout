//= require spree/frontend/badger_accordion
//= require spree/frontend/micromodal

// ToDo -> Not best pleased with this hack for coupn code
Spree.ready(function ($) {
  $('#coupon_code').submit(function (event) {
    var input = {
      couponCodeField: $('#coupon_box'),
      couponStatus: $('#coupon_status')
    }
    if ($.trim(input.couponCodeField.val()).length > 0) {
      // eslint-disable-next-line no-undef
      if (new CouponManager(input).applyCoupon()) {
        return true
      } else {
        Spree.enableSave()
        event.preventDefault()
        return false
      }
    }
  });

  $('#coupon_code_pay').submit(function (event) {
    var input = {
      couponCodeField: $('#coupon_box_pay'),
      couponStatus: $('#coupon_status_pay')
    }
    if ($.trim(input.couponCodeField.val()).length > 0) {
      // eslint-disable-next-line no-undef
      if (new CouponManager(input).applyCoupon()) {
        return true
      } else {
        Spree.enableSave()
        event.preventDefault()
        return false
      }
    }
  })
})
