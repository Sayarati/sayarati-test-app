import {
  bearerToken,
  dbOne,
  dbQuery,
  isAdminPhone,
  methodOptions,
  readJson,
  response,
  verifySession,
} from "./shared.mjs";

export default async function handler(request) {
  const options = methodOptions(request);
  if (options) return options;
  if (request.method !== "POST") return response(405, { error: "Method not allowed" });

  const session = verifySession(bearerToken(request));
  if (!session?.phone) return response(401, { error: "Please sign in again" });

  try {
    if (!(await isAdminPhone(session.phone))) return response(403, { error: "Admin access only" });

    const { customerId } = await readJson(request);
    if (!customerId) return response(400, { error: "Missing customer" });

    const customer = await dbOne("select id, phone from customers where id = $1", [customerId]);
    if (!customer) return response(404, { error: "Customer not found" });

    await dbQuery("delete from otp_codes where phone = $1", [customer.phone]);
    await dbQuery("delete from customers where id = $1", [customer.id]);

    return response(200, { ok: true });
  } catch (error) {
    return response(500, { error: error.message || "Could not delete customer" });
  }
}
