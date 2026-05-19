import {
  bearerToken,
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
    const body = await readJson(request);
    const subscription = body.subscription || {};
    const endpoint = String(subscription.endpoint || "");
    if (!endpoint) return response(400, { error: "Missing notification subscription" });

    await dbQuery(`
      insert into push_subscriptions (endpoint, customer_id, subscription, user_agent, updated_at)
      values ($1, $2, $3::jsonb, $4, now())
      on conflict (endpoint)
      do update set
        customer_id = excluded.customer_id,
        subscription = excluded.subscription,
        user_agent = excluded.user_agent,
        updated_at = now(),
        last_error = null
    `, [endpoint, session.sub, JSON.stringify(subscription), request.headers.get("user-agent") || null]);

    await dbQuery("update customers set notifications_enabled = true where id = $1", [session.sub]);

    return response(200, { ok: true });
  } catch (error) {
    return response(500, { error: error.message || "Could not enable notifications" });
  }
}
