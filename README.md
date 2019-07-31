# Spree Nice Checkout

This Spree extension adds a Shopify style checkout to your Spree 3.7 store. Why?
- If you have recently moved from Shopify your existing customers won't notice a huge change.
- Shopify is so wieldy used, so much so that a large percentage of people recognise the Shopify checkout flow and feel reassured to see it.
- Bypass the default spree registration step that interrupts the checkout flow from cart to checkout.

## Benefits
- Auto set country at address stage from the visitors geo location, this defaults to use the geocoder gem, but if you use CloudFlare you can use the geo location header, there is no delay using the CloudFlare method where as the geocoder gem occasionally has a delay loading data.
- Ajax discount codes, allows user to add/remove discount codes with ease.

## Things To Be Aware Of
- Overrides the default spree merge cart behaviour, with this checkout the current cart is respected if the user logs in at checkout.
- Built using css grid, the desktop view might not display great on old browsers.

## ToDos
1. Add Ajax shipping method selection auto.


## Installation

1. Add this extension to your Gemfile with this line:
  ```ruby
  gem 'spree_nice_checkout', github: 'matthewkennedy/spree_nice_checkout'
  ```

2. Install the gem using Bundler:
  ```ruby
  bundle install
  ```

3. Copy & run migrations
  ```ruby
  bundle exec rails g spree_nice_checkout:install
  ```

4. Delete checkout and address folder from your spree views folder so the extension views will override.

  If your server was running, restart it so that it can find the assets properly.

## Testing

First bundle your dependencies, then run `rake`. `rake` will default to building the dummy app if it does not exist, then it will run specs. The dummy app can be regenerated by using `rake test_app`.

```shell
bundle
bundle exec rake
```

When testing your applications integration with this extension you may use it's factories.
Simply add this require statement to your spec_helper:

```ruby
require 'spree_nice_checkout/factories'
```


## Contributing

If you'd like to contribute, please take a look at the
[instructions](CONTRIBUTING.md) for installing dependencies and crafting a good
pull request.

Copyright (c) 2019 [name of extension creator], released under the New BSD License
