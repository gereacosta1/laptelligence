// netlify/functions/download-assistant.cjs
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function sign(payloadB64, secret) {
  return crypto.createHmac("sha256", secret).update(payloadB64).digest("base64url");
}

function timingSafeEqual(a, b) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

exports.handler = async (event) => {
  try {
    const auth = event.headers?.authorization || event.headers?.Authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : null;

    if (!token) {
      return { statusCode: 401, body: "Missing access token." };
    }

    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      return { statusCode: 500, body: "Missing ACCESS_TOKEN_SECRET." };
    }

    const parts = token.split(".");
    if (parts.length !== 2) {
      return { statusCode: 401, body: "Invalid token format." };
    }

    const [payloadB64, sig] = parts;
    const expected = sign(payloadB64, secret);

    if (!timingSafeEqual(sig, expected)) {
      return { statusCode: 401, body: "Invalid token signature." };
    }

    const payloadJson = Buffer.from(payloadB64, "base64url").toString("utf8");
    const payload = JSON.parse(payloadJson);

    if (!payload?.paid) {
      return { statusCode: 401, body: "Token not authorized." };
    }

    // TTL opcional (recomendado). Por defecto: 30 días.
    const ttlMs = Number(process.env.ACCESS_TOKEN_TTL_MS || 30 * 24 * 60 * 60 * 1000);
    if (payload?.ts && Date.now() - payload.ts > ttlMs) {
      return { statusCode: 401, body: "Token expired." };
    }

    const filePath = path.join(__dirname, "assets", "laptelligence_scan.ps1");

    if (!fs.existsSync(filePath)) {
      return { statusCode: 500, body: "Assistant file not found on server." };
    }

    const content = fs.readFileSync(filePath, "utf8");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": 'attachment; filename="laptelligence_scan.ps1"',
        "Cache-Control": "no-store",
      },
      body: content,
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: "Download failed." };
  }
};
