import webpush from "web-push";
import {
  bearerToken,
  dbOne,
  dbQuery,
  dbRows,
  env,
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

    const body = await readJson(request);
    const title = String(body.title || "").trim().slice(0, 90);
    const message = String(body.body || "").trim().slice(0, 500);
    const ctaLabel = String(body.ctaLabel || "").trim().slice(0, 40);
    const ctaUrl = String(body.ctaUrl || "").trim().slice(0, 300);
    const endsAt = body.endsAt ? new Date(body.endsAt).toISOString() : null;

    if (!title || !message) return response(400, { error: "Title and message are required" });

    const data = await dbOne(`
      insert into admin_messages (title, body, cta_label, cta_url, ends_at, created_by_phone)
      values ($1, $2, $3, $4, $5, $6)
      returning *
    `, [title, message, ctaLabel || null, ctaUrl || null, endsAt, session.phone]);

    const push = await sendPushToSubscribers({
      title,
      body: message,
      url: ctaUrl || "/",
    });

    return response(200, { ok: true, message: data, push });
  } catch (error) {
    return response(500, { error: error.message || "Could not create message" });
  }
}

async function sendPushToSubscribers(payload) {
  const publicKey = env("WEB_PUSH_PUBLIC_KEY") || env("VAPID_PUBLIC_KEY");
  const privateKey = env("WEB_PUSH_PRIVATE_KEY") || env("VAPID_PRIVATE_KEY");
  if (!publicKey || !privateKey) return { ok: false, sent: 0, skipped: "Missing Web Push keys" };

  webpush.setVapidDetails(
    env("WEB_PUSH_SUBJECT") || "mailto:info@sayarati.online",
    publicKey,
    privateKey,
  );

  const subscriptions = await dbRows(`
    select endpoint, subscription
    from push_subscriptions
    order by updated_at desc
    limit 5000
  `);

  let sent = 0;
  let failed = 0;

  await Promise.all(subscriptions.map(async (item) => {
    try {
      await webpush.sendNotification(item.subscription, JSON.stringify(payload));
      sent += 1;
      await dbQuery("update push_subscriptions set last_success_at = now(), last_error = null where endpoint = $1", [item.endpoint]);
    } catch (error) {
      failed += 1;
      const statusCode = error?.statusCode || 0;
      if (statusCode === 404 || statusCode === 410) {
        await dbQuery("delete from push_subscriptions where endpoint = $1", [item.endpoint]);
        return;
      }
      await dbQuery("update push_subscriptions set last_error = $2 where endpoint = $1", [item.endpoint, error?.message || "Push failed"]);
    }
  }));

  return { ok: true, sent, failed };
}
