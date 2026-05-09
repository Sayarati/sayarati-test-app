const {
  dbQuery,
  env,
  hashValue,
  makeOtp,
  methodOptions,
  readJson,
  response,
  sanitizePhone,
  validPhone,
} = require("./_shared");

exports.handler = async (event) => {
  const options = methodOptions(event);
  if (options) return options;
  if (event.httpMethod !== "POST") return response(405, { error: "Method not allowed" });

  const { phone } = readJson(event);
  const cleanPhone = sanitizePhone(phone);
  if (!validPhone(cleanPhone)) return response(400, { error: "Invalid phone number" });

  try {
    const code = makeOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    await dbQuery(`
      insert into otp_codes (phone, code_hash, expires_at, attempts)
      values ($1, $2, $3, 0)
      on conflict (phone)
      do update set code_hash = excluded.code_hash, expires_at = excluded.expires_at, attempts = 0, created_at = now()
    `, [cleanPhone, hashValue(`${cleanPhone}:${code}`), expiresAt]);

    if (env("WATI_SKIP_SEND") !== "true") {
      await sendWatiOtp(cleanPhone, code);
    }

    return response(200, { ok: true, message: "Verification code sent" });
  } catch (error) {
    return response(500, { error: error.message || "Could not send verification code" });
  }
};

async function sendWatiOtp(phone, code) {
  const endpoint = env("WATI_API_ENDPOINT").replace(/\/$/, "");
  const token = env("WATI_API_TOKEN");
  const templateName = env("WATI_OTP_TEMPLATE_NAME");
  const broadcastName = env("WATI_BROADCAST_NAME") || "sayarati_otp";
  const channelNumber = env("WATI_CHANNEL_NUMBER");

  if (!endpoint || !token || !templateName) {
    throw new Error("Missing WATI settings");
  }

  const payload = {
    template_name: templateName,
    broadcast_name: broadcastName,
    channel_number: channelNumber,
    parameters: [
      { name: "1", value: code },
      { name: "code", value: code },
      { name: "VERIFICATION_CODE", value: code },
    ],
  };

  const result = await fetch(`${endpoint}/api/v1/sendTemplateMessage?whatsappNumber=${phone}`, {
    method: "POST",
    headers: {
      Authorization: token.toLowerCase().startsWith("bearer ") ? token : `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!result.ok) {
    const text = await result.text();
    throw new Error(`WATI failed: ${text || result.status}`);
  }
}
