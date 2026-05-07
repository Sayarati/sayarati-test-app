const { methodOptions, response, supabaseAdmin } = require("./_shared");

exports.handler = async (event) => {
  const options = methodOptions(event);
  if (options) return options;
  if (event.httpMethod !== "GET") return response(405, { error: "Method not allowed" });

  try {
    const now = new Date().toISOString();
    const supabase = supabaseAdmin();
    const { data, error } = await supabase
      .from("admin_messages")
      .select("id, title, body, cta_label, cta_url, starts_at, ends_at")
      .eq("is_active", true)
      .lte("starts_at", now)
      .or(`ends_at.is.null,ends_at.gte.${now}`)
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) throw error;
    return response(200, { ok: true, messages: data || [] });
  } catch (error) {
    return response(200, { ok: false, messages: [] });
  }
};
