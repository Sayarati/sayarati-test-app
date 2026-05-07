const {
  adminPhones,
  bearerToken,
  methodOptions,
  readJson,
  response,
  supabaseAdmin,
  verifySession,
} = require("./_shared");

exports.handler = async (event) => {
  const options = methodOptions(event);
  if (options) return options;
  if (event.httpMethod !== "POST") return response(405, { error: "Method not allowed" });

  const session = verifySession(bearerToken(event));
  if (!session?.phone) return response(401, { error: "Please sign in again" });

  try {
    const supabase = supabaseAdmin();
    const allowedByEnv = adminPhones().includes(session.phone);
    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("phone")
      .eq("phone", session.phone)
      .maybeSingle();

    if (!allowedByEnv && !adminUser) return response(403, { error: "Admin access only" });

    const body = readJson(event);
    const title = String(body.title || "").trim().slice(0, 90);
    const message = String(body.body || "").trim().slice(0, 500);
    const ctaLabel = String(body.ctaLabel || "").trim().slice(0, 40);
    const ctaUrl = String(body.ctaUrl || "").trim().slice(0, 300);
    const endsAt = body.endsAt ? new Date(body.endsAt).toISOString() : null;

    if (!title || !message) return response(400, { error: "Title and message are required" });

    const { data, error } = await supabase
      .from("admin_messages")
      .insert({
        title,
        body: message,
        cta_label: ctaLabel || null,
        cta_url: ctaUrl || null,
        ends_at: endsAt,
        created_by_phone: session.phone,
      })
      .select("*")
      .single();

    if (error) throw error;
    return response(200, { ok: true, message: data });
  } catch (error) {
    return response(500, { error: error.message || "Could not create message" });
  }
};
