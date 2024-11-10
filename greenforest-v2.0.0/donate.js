// This is your public API key.
const stripe = Stripe("pk_live_51OtTziFV91ot5Yz84YA5iMOCaOMRZEIPIex8VBFEbooI2bSb30eExeNyzVRwIarhMNr6ErUKv0R7FULyNYToQfEp00VHT7KM44");

const donateOptions = {
  "donate-once-1": {
    price: "price_1QIHS0FV91ot5Yz8upssMn0D",
    quantity: 1
  },
  "donate-monthly-custom": {
    price: "price_1QAg1cFV91ot5Yz8Q32xYYTg",
    quntity: 1
  }
}

const params = new URLSearchParams(window.location.search)
const option = params.get("val")
console.log(option)

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
          donateOptions[option]
        ],
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
