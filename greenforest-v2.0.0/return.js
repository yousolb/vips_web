// initialize();

// async function initialize() {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   const sessionId = urlParams.get('session_id');
  
//   const response = await fetch(`/session-status?session_id=${sessionId}`);
//   const session = await response.json();
//   console.log("Session Status:", session); // Add this to inspect session

//   if (session.status == 'open') {
//     window.location.replace('http://localhost:4242/checkout.html'); // Corrected
//   } else if (session.status == 'complete') {
//     document.getElementById('success').classList.remove('hidden');
//     // document.getElementById('customer-email').textContent = session.customer_email;
//   }
// }

// // Call the initialize function when the page loads
// initialize();

// async function initialize() {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   const sessionId = urlParams.get('session_id');
//   const response = await fetch(`/session-status?session_id=${sessionId}`);
//   const session = await response.json();

//   if (session.status == 'open') {
//     window.replace('http://localhost:4242/checkout.html')
//   } else if (session.status == 'complete') {
//     document.getElementById('success').classList.remove('hidden');
//     // document.getElementById('customer-email').textContent = session.customer_email
//   }
// }