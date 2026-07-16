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
    const eventType = String(body.eventType || "shop_view").slice(0, 40);
    const cartItems = Math.max(0, Math.min(9999, Number(body.cartItems) || 0));
    const cartValue = Math.max(0, Math.min(999999, Number(body.cartValue) || 0));
    const checkoutStarted = eventType === "checkout_started";

    await dbQuery(`
      update customers
      set
        shop_visit_count = shop_visit_count + case when $2 = 'shop_view' then 1 else 0 end,
        last_shop_opened_at = case when $2 = 'shop_view' then now() else coalesce(last_shop_opened_at, now()) end,
        last_shop_action_at = now(),
        last_shop_event = $2,
        last_shop_cart_items = $3,
        last_shop_cart_value = $4,
        last_checkout_started_at = case when $5 then now() else last_checkout_started_at end
      where id = $1
    `, [session.sub, eventType, cartItems, cartValue, checkoutStarted]);

    return response(200, { ok: true });
  } catch (error) {
    return response(500, { error: error.message || "Could not update shop activity" });
  }
}
