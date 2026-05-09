import {
  bearerToken,
  dbOne,
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

    return response(200, { ok: true, message: data });
  } catch (error) {
    return response(500, { error: error.message || "Could not create message" });
  }
}
