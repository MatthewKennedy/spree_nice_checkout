var activeItem = $('#shipping_methods').find(':checked')
activeItem.closest('li').addClass('active_shipping_method')

$("#shipping_methods li label").on('click', function(){

  $('li').removeClass("active_shipping_method");
  $(this).closest('li').toggleClass("active_shipping_method");
});
