const crypto = require("crypto");

let cachedDb;

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

function secret() {
  return env("SESSION_SECRET") || env("NETLIFY_DATABASE_URL") || "local-dev-secret";
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

async function database() {
  if (!cachedDb) {
    const { getDatabase } = await import("@netlify/database");
    cachedDb = getDatabase();
  }
  return cachedDb;
}

async function dbQuery(text, params = []) {
  const db = await database();
  return db.pool.query(text, params);
}

async function dbRows(text, params = []) {
  const result = await dbQuery(text, params);
  return result.rows || [];
}

async function dbOne(text, params = []) {
  const rows = await dbRows(text, params);
  return rows[0] || null;
}

async function isAdminPhone(phone) {
  if (adminPhones().includes(phone)) return true;
  const admin = await dbOne("select phone from admin_users where phone = $1", [phone]);
  return Boolean(admin);
}

module.exports = {
  adminPhones,
  bearerToken,
  dbOne,
  dbQuery,
  dbRows,
  env,
  hashValue,
  isAdminPhone,
  jsonHeaders,
  makeOtp,
  methodOptions,
  readJson,
  response,
  sanitizePhone,
  signSession,
  validPhone,
  verifySession,
};
