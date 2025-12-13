// netlify/functions/verify-session.cjs
const Stripe = require('stripe');
const crypto = require('crypto');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function sign(payloadB64, secret) {
  return crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');
}

exports.handler = async (event) => {
  try {
    const sessionId = event.queryStringParameters?.session_id;
    if (!sessionId) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        body: JSON.stringify({ ok: false, error: 'Missing session_id' }),
      };
    }

    const tokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!tokenSecret) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        body: JSON.stringify({ ok: false, error: 'Missing ACCESS_TOKEN_SECRET' }),
      };
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid' || session.mode !== 'payment') {
      return {
        statusCode: 402,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        body: JSON.stringify({ ok: false, error: 'Not paid' }),
      };
    }

    const payload = {
      sid: session.id,
      paid: true,
      ts: Date.now(),
      email: session.customer_details?.email || null,
    };

    const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const sig = sign(payloadB64, tokenSecret);
    const accessToken = `${payloadB64}.${sig}`;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({ ok: true, accessToken }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({ ok: false, error: 'Verify failed' }),
    };
  }
};
