const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");

const jsonHeaders = {
  "content-type": "application/json",
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "content-type, authorization",
  "access-control-allow-methods": "GET, POST, OPTIONS",
};

function response(statusCode, body) {
  return { statusCode, headers: jsonHeaders, body: JSON.stringify(body) };
}

function methodOptions(event) {
  return event.httpMethod === "OPTIONS" ? response(200, { ok: true }) : null;
}

function readJson(event) {
  try {
    return JSON.parse(event.body || "{}");
  } catch {
    return {};
  }
}

function sanitizePhone(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 15);
}

function validPhone(phone) {
  return /^\d{8,15}$/.test(phone);
}

function env(name) {
  return process.env[name] || "";
}

function requireEnv(names) {
  const missing = names.filter((name) => !env(name));
  if (missing.length) {
    throw new Error(`Missing server setting: ${missing.join(", ")}`);
  }
}

function supabaseAdmin() {
  requireEnv(["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"]);
  return createClient(env("SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: { persistSession: false },
  });
}

function secret() {
  return env("SESSION_SECRET") || env("SUPABASE_SERVICE_ROLE_KEY") || "local-dev-secret";
}

function hashValue(value) {
  return crypto.createHmac("sha256", secret()).update(value).digest("hex");
}

function makeOtp() {
  return String(crypto.randomInt(100000, 1000000));
}

function signSession(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${signature}`;
}

function verifySession(token) {
  if (!token || !token.includes(".")) return null;
  const [body, signature] = token.split(".");
  const expected = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  if (payload.exp && Date.now() > payload.exp) return null;
  return payload;
}

function bearerToken(event) {
  const header = event.headers.authorization || event.headers.Authorization || "";
  return header.replace(/^Bearer\s+/i, "");
}

function adminPhones() {
  return env("ADMIN_PHONE_NUMBERS").split(",").map(sanitizePhone).filter(Boolean);
}

module.exports = {
  adminPhones,
  bearerToken,
  env,
  hashValue,
  jsonHeaders,
  makeOtp,
  methodOptions,
  readJson,
  response,
  sanitizePhone,
  signSession,
  supabaseAdmin,
  validPhone,
  verifySession,
};
