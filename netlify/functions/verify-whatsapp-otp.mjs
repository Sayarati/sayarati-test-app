import {
  dbOne,
  dbQuery,
  hashValue,
  methodOptions,
  readJson,
  response,
  sanitizePhone,
  signSession,
  validPhone,
} from "./shared.mjs";

export default async function handler(request) {
  const options = methodOptions(request);
  if (options) return options;
  if (request.method !== "POST") return response(405, { error: "Method not allowed" });

  const { phone, code, name, customerType } = await readJson(request);
  const cleanPhone = sanitizePhone(phone);
  const cleanCode = String(code || "").replace(/\D/g, "").slice(0, 6);
  if (!validPhone(cleanPhone) || cleanCode.length !== 6) {
    return response(400, { error: "Invalid verification details" });
  }

  try {
    const otp = await dbOne("select * from otp_codes where phone = $1", [cleanPhone]);

    if (!otp) return response(400, { error: "Code not found or expired" });
    if (new Date(otp.expires_at).getTime() < Date.now()) return response(400, { error: "Code expired" });
    if (otp.attempts >= 5) return response(429, { error: "Too many attempts" });

    const expected = hashValue(`${cleanPhone}:${cleanCode}`);
    if (expected !== otp.code_hash) {
      await dbQuery("update otp_codes set attempts = attempts + 1 where phone = $1", [cleanPhone]);
      return response(400, { error: "Incorrect code" });
    }

    const customer = await dbOne(`
      insert into customers (phone, name, customer_type, last_login_at)
      values ($1, $2, $3, now())
      on conflict (phone)
      do update set
        name = coalesce(excluded.name, customers.name),
        customer_type = coalesce(excluded.customer_type, customers.customer_type),
        last_login_at = now()
      returning id, phone, name, customer_type
    `, [cleanPhone, name || null, customerType || null]);

    await dbQuery("delete from otp_codes where phone = $1", [cleanPhone]);

    const token = signSession({
      sub: customer.id,
      phone: cleanPhone,
      exp: Date.now() + 1000 * 60 * 60 * 24 * 180,
    });

    return response(200, { ok: true, token, customer });
  } catch (error) {
    return response(500, { error: error.message || "Could not verify code" });
  }
}
