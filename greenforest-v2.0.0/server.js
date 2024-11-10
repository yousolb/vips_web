require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
console.log(process.env.STRIPE_SECRET_KEY)
const express = require('express');
const cors = require('cors');  // Import CORS middleware

const app = express();

app.use(cors());  // Enable CORS
app.use(express.json());

// Replace this with your actual domain
const YOUR_DOMAIN = 'http://127.0.0.1:5501';

app.post('/create-checkout-session', async (req, res) => {
  try {
    console.log(req.body);
    const { items } = req.body;

    // console.log(req)
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      submit_type: 'pay',
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      line_items: items,
      mode: 'payment',
      return_url: `${YOUR_DOMAIN}/return.html?session_id={CHECKOUT_SESSION_ID}`,
    });

    console.log("Session created:", session);

    // Send the session client secret to the client
    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send({ error: "Failed to create checkout session" });
  }
});

app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});


app.listen(4242, () => console.log("Listening on port 4242"))
