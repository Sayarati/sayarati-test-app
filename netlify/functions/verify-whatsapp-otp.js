const {
  hashValue,
  methodOptions,
  readJson,
  response,
  sanitizePhone,
  signSession,
  supabaseAdmin,
  validPhone,
} = require("./_shared");

exports.handler = async (event) => {
  const options = methodOptions(event);
  if (options) return options;
  if (event.httpMethod !== "POST") return response(405, { error: "Method not allowed" });

  const { phone, code, name } = readJson(event);
  const cleanPhone = sanitizePhone(phone);
  const cleanCode = String(code || "").replace(/\D/g, "").slice(0, 6);
  if (!validPhone(cleanPhone) || cleanCode.length !== 6) {
    return response(400, { error: "Invalid verification details" });
  }

  try {
    const supabase = supabaseAdmin();
    const { data: otp, error: otpError } = await supabase
      .from("otp_codes")
      .select("*")
      .eq("phone", cleanPhone)
      .single();

    if (otpError || !otp) return response(400, { error: "Code not found or expired" });
    if (new Date(otp.expires_at).getTime() < Date.now()) return response(400, { error: "Code expired" });
    if (otp.attempts >= 5) return response(429, { error: "Too many attempts" });

    const expected = hashValue(`${cleanPhone}:${cleanCode}`);
    if (expected !== otp.code_hash) {
      await supabase.from("otp_codes").update({ attempts: otp.attempts + 1 }).eq("phone", cleanPhone);
      return response(400, { error: "Incorrect code" });
    }

    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .upsert({
        phone: cleanPhone,
        name: name || null,
        last_login_at: new Date().toISOString(),
      }, { onConflict: "phone" })
      .select("id, phone, name")
      .single();

    if (customerError) throw customerError;
    await supabase.from("otp_codes").delete().eq("phone", cleanPhone);

    const token = signSession({
      sub: customer.id,
      phone: cleanPhone,
      exp: Date.now() + 1000 * 60 * 60 * 24 * 30,
    });

    return response(200, { ok: true, token, customer });
  } catch (error) {
    return response(500, { error: error.message || "Could not verify code" });
  }
};
