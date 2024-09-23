// This is your test secret API key.
const stripe = require('stripe')('sk_test_51OtTziFV91ot5Yz8WmYztUztwJACVyvOfAj2BBzmqwsIKIEaEUPg1FryNmxHQ2CLKwBE15sTt4AWx0A79sWzTML3006hYR8RtJ');
const express = require('express');
const app = express();
app.use(express.static('public'));
// FIXME?
const YOUR_DOMAIN = 'http://127.0.0.1:5500/';

app.post('/create-checkout-session', async (req, res) => {
  // Create the shipping rate
  // placeholder values rn, follwing this: https://docs.stripe.com/payments/during-payment/charge-shipping?payment-ui=checkout
  const shippingRate = await stripe.shippingRates.create({
    display_name: 'Ground shipping',
    type: 'fixed_amount',
    fixed_amount: {
      amount: 500,
      currency: 'usd',
    },
    delivery_estimate: {
      minimum: {
        unit: 'business_day',
        value: 5,
      },
      maximum: {
        unit: 'business_day',
        value: 7,
      },
    },
  });

  // Create the checkout session and include the shipping rate
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    shipping_options: [
      {
        shipping_rate: shippingRate.id,
      },
    ],
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));
