// This is your test secret API key.
// const stripe = Stripe("sk_test_51OtTziFV91ot5Yz8WmYztUztwJACVyvOfAj2BBzmqwsIKIEaEUPg1FryNmxHQ2CLKwBE15sTt4AWx0A79sWzTML3006hYR8RtJ");
const stripe = Stripe("sk_test_51OtTziFV91ot5Yz8WmYztUztwJACVyvOfAj2BBzmqwsIKIEaEUPg1FryNmxHQ2CLKwBE15sTt4AWx0A79sWzTML3006hYR8RtJ");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const email = document.getElementById('email').value; // Get the email from input field
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}}