import crypto from "crypto";
import { getDatabase } from "@netlify/database";

export const jsonHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "content-type, authorization",
  "access-control-allow-methods": "GET, POST, OPTIONS",
};

export function response(status, body) {
  return Response.json(body, { status, headers: jsonHeaders });
}

export function methodOptions(request) {
  return request.method === "OPTIONS" ? response(200, { ok: true }) : null;
}

export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

export function sanitizePhone(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 15);
}

export function validPhone(phone) {
  return /^\d{8,15}$/.test(phone);
}

export function env(name) {
  const fromGlobal = globalThis.Netlify?.env?.get?.(name);
  return fromGlobal || process.env[name] || "";
}

function secret() {
  return env("SESSION_SECRET") || env("NETLIFY_DATABASE_URL") || "local-dev-secret";
}

export function hashValue(value) {
  return crypto.createHmac("sha256", secret()).update(value).digest("hex");
}

export function makeOtp() {
  return String(crypto.randomInt(100000, 1000000));
}

export function signSession(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${signature}`;
}

export function verifySession(token) {
  if (!token || !token.includes(".")) return null;
  const [body, signature] = token.split(".");
  const expected = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  if (payload.exp && Date.now() > payload.exp) return null;
  return payload;
}

export function bearerToken(request) {
  return (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
}

export function adminPhones() {
  return env("ADMIN_PHONE_NUMBERS").split(",").map(sanitizePhone).filter(Boolean);
}

function database() {
  return getDatabase();
}

export async function dbQuery(text, params = []) {
  return database().pool.query(text, params);
}

export async function dbRows(text, params = []) {
  const result = await dbQuery(text, params);
  return result.rows || [];
}

export async function dbOne(text, params = []) {
  const rows = await dbRows(text, params);
  return rows[0] || null;
}

export async function isAdminPhone(phone) {
  if (adminPhones().includes(phone)) return true;
  const admin = await dbOne("select phone from admin_users where phone = $1", [phone]);
  return Boolean(admin);
}
