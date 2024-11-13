// This is your public API key.
const stripe = Stripe("pk_live_51OtTziFV91ot5Yz84YA5iMOCaOMRZEIPIex8VBFEbooI2bSb30eExeNyzVRwIarhMNr6ErUKv0R7FULyNYToQfEp00VHT7KM44");

<<<<<<< HEAD
const params = new URLSearchParams(window.location.search);
=======
const donateOptions = {
  "donate-once-1": {
    price: "price_1QIHS0FV91ot5Yz8upssMn0D",
    quantity: 1
  },
  "donate-once-5": {
    price: "price_1QJhkUFV91ot5Yz8MZjEiA6V",
    quantity: 1
  },
  "donate-once-10": {
    price: "price_1QJhkhFV91ot5Yz86LexvQku",
    quantity: 1
  },
  "donate-once-custom": {
    price: "price_1QJhnOFV91ot5Yz8I8ZHezZf",
    quantity: 1
  },
  "donate-monthly-1": {
    price: "price_1QJhzHFV91ot5Yz8FhTn4iLa",
    quantity: 1
  },
  "donate-monthly-5": {
    price: "price_1QJhzYFV91ot5Yz8cEgfWEOp",
    quantity: 1
  },
  "donate-monthly-10": {
    price: "price_1QJhzmFV91ot5Yz8mylkjmTh",
    quantity: 1
  },
  "donate-monthly-custom": {
    price: "price_1QAg1cFV91ot5Yz8Q32xYYTg",
    quantity: 1
  }
}

const params = new URLSearchParams(window.location.search)
>>>>>>> 48f90a61e8b859c935bdb92f1fa3ed3c04fdb82d
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
<<<<<<< HEAD
          {
            price: 'price_1QAfCMFV91ot5Yz8AoZocJmR',
            quantity: 1
          },
          {
            price: 'price_1QAfCMFV91ot5Yz8AoZocJmR',
            quantity: 1
          }
        ]
=======
          donateOptions[option]
        ],
>>>>>>> 48f90a61e8b859c935bdb92f1fa3ed3c04fdb82d
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
