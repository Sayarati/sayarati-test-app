import { bearerToken, dbRows, isAdminPhone, response, verifySession } from './shared.mjs';
import { REPORT_START, reportRange } from './activity-validation.mjs';

const totals = `select count(distinct e.visitor_id)::int visitors, count(distinct e.session_id)::int sessions,
 count(*) filter(where event_type='page_view')::int page_views,
 count(*) filter(where event_type='product_view')::int product_views,
 count(*) filter(where event_type='add_to_cart')::int cart_additions,
 count(*) filter(where event_type='checkout_started')::int checkouts,
 count(distinct e.visitor_id) filter(where e.customer_id is null)::int anonymous_visitors,
 count(distinct e.customer_id)::int customers,
 count(distinct e.visitor_id) filter(where v.first_seen_at >= b.lo)::int new_visitors,
 count(distinct e.visitor_id) filter(where v.first_seen_at < b.lo)::int returning_visitors
 from activity_events e join activity_visitors v on v.id=e.visitor_id cross join bounds b
 where e.created_at >= b.lo and e.created_at < b.hi`;
export default async function handler(request) {
  if (request.method !== 'GET') return response(405, { error:'Method not allowed' });
  try {
    let session;
    try { session = verifySession(bearerToken(request)); } catch { /* Reject malformed credentials. */ }
    if (!session?.phone) return response(401, { error:'Please sign in again' });
    if (!await isAdminPhone(session.phone)) return response(403, { error:'Admin access only' });
    let range;
    try { range = reportRange(new URL(request.url).searchParams); }
    catch (error) { return response(400, {error:error.message}); }
    const args = [range.start, range.end];
    const previousStart = 2 * Date.parse(range.start) - Date.parse(range.end) - 86400000;
    const bounds = `with bounds as (select $1::date::timestamp at time zone 'Asia/Beirut' lo, ($2::date+1)::timestamp at time zone 'Asia/Beirut' hi),`;
    const selected = bounds + ` selected as (select e.* from activity_events e cross join bounds b where e.created_at>=b.lo and e.created_at<b.hi) `;
    const [summary, previous, daily, pages, products, customers, recent, coverage] = await Promise.all([
      dbRows(bounds.slice(0,-1)+' '+totals,args),
      previousStart >= Date.parse(REPORT_START) ? dbRows(`with bounds as (select ($1::date-($2::date-$1::date+1))::timestamp at time zone 'Asia/Beirut' lo, $1::date::timestamp at time zone 'Asia/Beirut' hi) `+totals,args) : [],
      dbRows(selected+`select d::date::text as "day",count(distinct e.visitor_id)::int visitors,count(distinct e.session_id)::int sessions,
        count(e.id) filter(where event_type='page_view')::int page_views,
        count(e.id) filter(where event_type='product_view')::int product_views,
        count(e.id) filter(where event_type='add_to_cart')::int cart_additions,
        count(e.id) filter(where event_type='checkout_started')::int checkouts
        from generate_series($1::date::timestamp,$2::date::timestamp,interval '1 day') d
        left join selected e on (e.created_at at time zone 'Asia/Beirut')::date=d::date group by d order by d`,args),
      dbRows(selected+`select page,count(*)::int views,count(distinct visitor_id)::int visitors from selected where event_type='page_view' group by page order by views desc,page`,args),
      dbRows(selected+`select product_id,max(nullif(product_name,'')) product_name,
        count(*) filter(where event_type='product_view')::int views,
        count(distinct visitor_id) filter(where event_type='product_view')::int visitors,
        count(*) filter(where event_type='add_to_cart')::int additions,
        coalesce(sum(quantity) filter(where event_type='add_to_cart'),0)::int units_added
        from selected where product_id is not null group by product_id order by views desc,additions desc,product_id limit 1000`,args),
      dbRows(selected+`select c.id,c.name,c.phone,count(distinct e.session_id)::int sessions,
        count(*) filter(where event_type='page_view')::int page_views,
        count(*) filter(where event_type='product_view')::int product_views,
        count(*) filter(where event_type='add_to_cart')::int cart_additions,
        count(*) filter(where event_type='checkout_started')::int checkouts,max(e.created_at) last_activity,
        (array_agg(e.cart_value order by e.created_at desc) filter(where event_type in ('cart_updated','checkout_started','add_to_cart')))[1] last_cart_value
        from selected e join customers c on c.id=e.customer_id group by c.id,c.name,c.phone order by last_activity desc limit 1000`,args),
      dbRows(selected+`select e.event_type,e.page,e.product_id,e.product_name,e.cart_items,e.cart_value,e.created_at,c.name customer_name,c.phone
        from selected e left join customers c on c.id=e.customer_id order by e.created_at desc limit 200`,args),
      dbRows('select min(created_at) first_event from activity_events'),
    ]);
    return response(200,{ok:true,range,timeZone:'Asia/Beirut',summary:summary[0],previous:previous[0],daily,pages,products,customers,recent,firstEvent:coverage[0]?.first_event || null,limits:{products:1000,customers:1000,recent:200}});
  } catch (error) {
    console.error('Activity report failed:',error.message);
    return response(500,{error:'Reports are unavailable. Check that the activity database migration has been applied.'});
  }
}
