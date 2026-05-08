const {
  bearerToken,
  dbRows,
  isAdminPhone,
  methodOptions,
  response,
  verifySession,
} = require("./_shared");

exports.handler = async (event) => {
  const options = methodOptions(event);
  if (options) return options;
  if (event.httpMethod !== "GET") return response(405, { error: "Method not allowed" });

  const session = verifySession(bearerToken(event));
  if (!session?.phone) return response(401, { error: "Please sign in again" });

  try {
    if (!(await isAdminPhone(session.phone))) return response(403, { error: "Admin access only" });

    const [customers, cars, records, messages] = await Promise.all([
      dbRows("select * from customers order by created_at desc limit 500"),
      dbRows("select * from cars order by created_at desc limit 1000"),
      dbRows("select * from service_records order by created_at desc limit 2000"),
      dbRows("select * from admin_messages order by created_at desc limit 20"),
    ]);

    return response(200, {
      ok: true,
      customers,
      cars,
      records,
      messages,
    });
  } catch (error) {
    return response(500, { error: error.message || "Could not load admin data" });
  }
};
