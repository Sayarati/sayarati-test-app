const {
  adminPhones,
  bearerToken,
  methodOptions,
  response,
  supabaseAdmin,
  verifySession,
} = require("./_shared");

exports.handler = async (event) => {
  const options = methodOptions(event);
  if (options) return options;
  if (event.httpMethod !== "GET") return response(405, { error: "Method not allowed" });

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

    const [{ data: customers, error: customersError }, { data: cars, error: carsError }, { data: records, error: recordsError }, { data: messages, error: messagesError }] = await Promise.all([
      supabase.from("customers").select("*").order("created_at", { ascending: false }).limit(500),
      supabase.from("cars").select("*").order("created_at", { ascending: false }).limit(1000),
      supabase.from("service_records").select("*").order("created_at", { ascending: false }).limit(2000),
      supabase.from("admin_messages").select("*").order("created_at", { ascending: false }).limit(20),
    ]);

    if (customersError) throw customersError;
    if (carsError) throw carsError;
    if (recordsError) throw recordsError;
    if (messagesError) throw messagesError;

    return response(200, {
      ok: true,
      customers: customers || [],
      cars: cars || [],
      records: records || [],
      messages: messages || [],
    });
  } catch (error) {
    return response(500, { error: error.message || "Could not load admin data" });
  }
};
