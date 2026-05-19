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
    const openedAsApp = Boolean(body.openedAsApp);
    await dbQuery(`
      update customers
      set
        app_installed = app_installed or $2,
        last_app_opened_at = case when $2 then now() else last_app_opened_at end,
        last_browser_opened_at = case when $2 then last_browser_opened_at else now() end
      where id = $1
    `, [session.sub, openedAsApp]);

    return response(200, { ok: true });
  } catch (error) {
    return response(500, { error: error.message || "Could not update app status" });
  }
}
