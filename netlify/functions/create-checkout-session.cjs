// netlify/functions/create-checkout-session.cjs
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const siteUrl = process.env.SITE_URL; // EJ: https://laptelligence.netlify.app
    const priceId = process.env.STRIPE_PRICE_ID;

    if (!siteUrl || !priceId) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Faltan SITE_URL o STRIPE_PRICE_ID en variables de entorno.' }),
      };
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/?session_id={CHECKOUT_SESSION_ID}#scan-upload`,
      cancel_url: `${siteUrl}/?canceled=1`,
      allow_promotion_codes: true,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error creando Checkout Session.' }),
    };
  }
};
