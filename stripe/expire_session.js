const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function expireSession(sessionId) {
  try {
    const session = await stripe.checkout.sessions.expire(sessionId);
    console.log('Session expired:', session);
  } catch (error) {
    console.error('Error expiring session:', error);
  }
}

// Replace 'YOUR_SESSION_ID' with your actual session ID
expireSession('cs_test_a1duF...');
