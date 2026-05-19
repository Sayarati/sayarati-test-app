import {
  bearerToken,
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

    const { messageId } = await readJson(request);
    if (!messageId) return response(400, { error: "Missing message" });

    await dbQuery("delete from admin_messages where id = $1", [messageId]);

    return response(200, { ok: true });
  } catch (error) {
    return response(500, { error: error.message || "Could not delete message" });
  }
}
