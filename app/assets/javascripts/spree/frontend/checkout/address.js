Spree.ready(function ($) {
  Spree.onAddress = function () {
    if ($('#checkout_form_address').length) {
      Spree.updateState = function (region) {
        var countryId = getCountryId(region)
        if (countryId != null) {
          if (Spree.Checkout[countryId] == null) {
            $.get(Spree.routes.states_search, {
              country_id: countryId
            }).done(function (data) {
              Spree.Checkout[countryId] = {
                states: data.states,
                states_required: data.states_required
              }
              Spree.fillStates(Spree.Checkout[countryId], region)
            })
          } else {
            Spree.fillStates(Spree.Checkout[countryId], region)
          }
        }
      }
      Spree.fillStates = function (data, region) {
        var selected, statesWithBlank
        var statesRequired = data.states_required
        var states = data.states
        var statePara = $('#' + region + 'state')
        var stateSelect = statePara.find('select')
        var stateInput = statePara.find('input')
        var stateSpanRequired = statePara.find('[id$="state-required"]')
        var countryStateDiv = document.getElementById("country_conatiner")
        if (states.length > 0) {
          selected = parseInt(stateSelect.val())
          stateSelect.html('')
          statesWithBlank = [
            {
              name: '',
              id: ''
            }
          ].concat(states)
          $.each(statesWithBlank, function (idx, state) {
            var opt = $(document.createElement('option')).attr('value', state.id).html(state.name)
            if (selected === state.id) {
              opt.prop('selected', true)
            }
            stateSelect.append(opt)
          })
          stateSelect.prop('disabled', false).show()
          stateInput.hide().prop('disabled', true)
          statePara.show()
          stateSpanRequired.show()
          if (statesRequired) {
            stateSelect.addClass('required')
          }
          stateSelect.removeClass('hidden')
          stateInput.removeClass('required')
          countryStateDiv.classList.add("with-state");
          countryStateDiv.classList.remove("without-state");
        } else {
          stateSelect.hide().prop('disabled', true)
          stateInput.show()
          if (statesRequired) {
            stateSpanRequired.show()
            stateInput.addClass('required')
          } else {
            stateInput.val('')
            stateSpanRequired.hide()
            stateInput.removeClass('required')
            countryStateDiv.classList.add("without-state");
            countryStateDiv.classList.remove("with-state");
          }
          statePara.toggle(!!statesRequired)
          stateInput.prop('disabled', !statesRequired)
          stateInput.removeClass('hidden')
          stateSelect.removeClass('required')
        }
      }
      $('#bcountry select').change(function () {
        Spree.updateState('b')
      })
      $('#scountry select').change(function () {
        Spree.updateState('s')
      })
      Spree.updateState('b')

      var orderUseBilling = $('input#order_use_billing')
      orderUseBilling.change(function () {
        updateShippingFormState(orderUseBilling)
      })
      updateShippingFormState(orderUseBilling)
    }
    function updateShippingFormState (orderUseBilling) {
      if (orderUseBilling.is(':checked')) {
        $('#shipping .inner').hide()
        $('#shipping .inner input, #shipping .inner select').prop('disabled', true)
      } else {
        $('#shipping .inner').show()
        $('#shipping .inner input, #shipping .inner select').prop('disabled', false)
        Spree.updateState('s')
      }
    }

    function getCountryId (region) {
      return $('#' + region + 'country select').val()
    }
  }
  Spree.onAddress()

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function validate() {
    var $result = $("#result");
    var email = $("#email").val();
    $result.text("");

    if (validateEmail(email)) {
    } else {
      $result.text(email + " is not a valid email address");
      $result.css("color", "red");
      return false;
    }

  }
  $("#address-form-button").on("click", validate);

})
