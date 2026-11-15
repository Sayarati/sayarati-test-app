import { bearerToken, dbQuery, hashValue, response, verifySession } from './shared.mjs';
import { cleanEvent, UUID } from './activity-validation.mjs';

export default async function handler(request) {
  if (request.method !== 'POST') return response(405, { error: 'Method not allowed' });
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return response(403, { error: 'Invalid origin' });
  try {
    const raw = await request.text();
    if (raw.length > 16000) return response(413, { error: 'Payload too large' });
    let body;
    try { body = JSON.parse(raw); } catch { return response(400, { error: 'Invalid JSON' }); }
    if (!body || !UUID.test(body.visitorId) || !UUID.test(body.sessionId) || !Array.isArray(body.events) || body.events.length > 20) return response(400, { error: 'Invalid activity batch' });
    const events = body.events.map(cleanEvent);
    if (!events.length || events.some(e => !e)) return response(400, { error: 'Invalid activity event' });
    let session = null;
    try { session = verifySession(bearerToken(request)); } catch { /* Invalid tokens remain anonymous. */ }
    const customer = UUID.test(session?.sub) ? session.sub : null;
    const visitor = hashValue('activity:' + body.visitorId);
    await dbQuery('insert into activity_visitors(id) values ($1) on conflict do nothing', [visitor]);
    // A bounded per-visitor ingestion rate; timestamps and customer identity come from the server.
    const result = await dbQuery(`
      insert into activity_events(id,visitor_id,session_id,customer_id,event_type,page,product_id,product_name,quantity,cart_items,cart_value)
      select e.id::uuid,$1,$2::uuid,(select id from customers where id=$3::uuid),e.type,e.page,e."productId",e."productName",e.quantity,e."cartItems",e."cartValue"
      from jsonb_to_recordset($4::jsonb) as e(id text,type text,page text,"productId" text,"productName" text,quantity int,"cartItems" int,"cartValue" numeric)
      where (select count(*) from activity_events where visitor_id=$1 and created_at > now()-interval '1 minute') < 120
      on conflict (id) do nothing returning id`, [visitor,body.sessionId,customer,JSON.stringify(events)]);
    return response(200, { ok: true, accepted: result.rowCount });
  } catch (error) {
    console.error('Activity collection failed:', error.message);
    return response(500, { error: 'Activity collection unavailable' });
  }
}
