Spree::FrontendHelper.class_eval do

  def checkout_progress(numbers: false)
      states = @order.checkout_steps
      items = states.each_with_index.map do |state, i|
        text = Spree.t("order_state.#{state}").titleize
        text.prepend("#{i.succ}. ") if numbers

        css_classes = []
        current_index = states.index(@order.state)
        state_index = states.index(state)

        if state_index < current_index
          css_classes << 'completed'
          text = link_to text, checkout_state_path(state)
        end
        css_classes << 'cart-progress'
        css_classes << 'next' if state_index == current_index + 1
        css_classes << 'active' if state == @order.state
        css_classes << 'first' if state_index == 0
        css_classes << 'pay' if state_index == 2
        css_classes << 'last' if state_index == states.length - 1
        # No more joined classes. IE6 is not a target browser.
        # Hack: Stops <a> being wrapped round previous items twice.
        if state_index < current_index
          content_tag('span', text, class: css_classes.join(' '))
        else
          content_tag('span', content_tag('a', text), class: css_classes.join(' '))
        end
      end
        content_tag('div', raw("<span class='cart-progress completed'><a href='#{ spree.cart_path }'>#{Spree.t(:cart)}</a></span>" + (items.join("\n"))), class: 'steps-container text-center', id: "checkout-step-#{@order.state}")
    end

end
