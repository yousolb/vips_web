// This is your public API key.
const stripe = Stripe("pk_live_51OtTziFV91ot5Yz84YA5iMOCaOMRZEIPIex8VBFEbooI2bSb30eExeNyzVRwIarhMNr6ErUKv0R7FULyNYToQfEp00VHT7KM44");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("http://localhost:4242/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: [
          {
            price: 'price_1QAfCMFV91ot5Yz8AoZocJmR',
            quantity: 1
          },
          {
            price: 'price_1QAfCMFV91ot5Yz8AoZocJmR',
            quantity: 1
          }
        ]
      })
    });
    if (!response.ok) {
      throw new Error("Failed to fetch client secret");
    }
    const { clientSecret } = await response.json();
    if (!clientSecret) {
      console.log("Oops!")
      throw new Error("Client secret is undefined");
    }
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}
