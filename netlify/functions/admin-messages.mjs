import { dbRows, methodOptions, response } from "./shared.mjs";

export default async function handler(request) {
  const options = methodOptions(request);
  if (options) return options;
  if (request.method !== "GET") return response(405, { error: "Method not allowed" });

  try {
    const now = new Date().toISOString();
    const messages = await dbRows(`
      select id, title, body, cta_label, cta_url, starts_at, ends_at
      from admin_messages
      where is_active = true
        and starts_at <= $1
        and (ends_at is null or ends_at >= $1)
      order by created_at desc
      limit 3
    `, [now]);

    return response(200, { ok: true, messages });
  } catch {
    return response(200, { ok: false, messages: [] });
  }
}
