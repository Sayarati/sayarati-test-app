import {
  bearerToken,
  dbOne,
  dbQuery,
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
  if (!session?.sub) return response(401, { error: "Please sign in again" });

  try {
    const { endpoint } = await readJson(request);
    if (endpoint) {
      await dbQuery("delete from push_subscriptions where customer_id = $1 and endpoint = $2", [session.sub, endpoint]);
    }

    const remaining = await dbOne("select endpoint from push_subscriptions where customer_id = $1 limit 1", [session.sub]);
    if (!remaining) {
      await dbQuery("update customers set notifications_enabled = false where id = $1", [session.sub]);
    }

    return response(200, { ok: true, notificationsEnabled: Boolean(remaining) });
  } catch (error) {
    return response(500, { error: error.message || "Could not disable notifications" });
  }
}
