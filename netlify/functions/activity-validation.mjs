export const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const TYPES = new Set(['page_view', 'product_view', 'add_to_cart', 'checkout_started', 'cart_updated']);
const PAGES = new Set(['login','overview','cars','booklet','service','shop','profile','install','other','product','category','cart']);
export function cleanEvent(value) {
  if (!value || !UUID.test(value.id) || !TYPES.has(value.type) || !PAGES.has(value.page)) return null;
  const integer = (v, max) => Math.max(0, Math.min(max, Math.floor(Number(v) || 0)));
  const productId = String(value.productId || '');
  if (['product_view','add_to_cart'].includes(value.type) && !/^\d{1,20}$/.test(productId)) return null;
  return { id: value.id, type: value.type, page: value.page,
    productId: /^\d{1,20}$/.test(productId) ? productId : null,
    productName: String(value.productName || '').slice(0, 200),
    quantity: integer(value.quantity, 9999), cartItems: integer(value.cartItems, 9999),
    cartValue: Math.round(Math.max(0, Math.min(999999, Number(value.cartValue) || 0)) * 100) / 100 };
}
export const REPORT_START = '2026-11-15';
export function reportRange(search, now = new Date()) {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Beirut', year:'numeric', month:'2-digit', day:'2-digit' }).format(now);
  const end = search.get('end') || today;
  const defaultStart = new Date(Date.parse(end + 'T12:00:00Z') - 29 * 86400000);
  const start = search.get('start') || (defaultStart > new Date(REPORT_START) ? defaultStart.toISOString().slice(0,10) : REPORT_START);
  const valid = v => /^\d{4}-\d{2}-\d{2}$/.test(v) && !isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0,10) === v;
  if (!valid(start) || !valid(end) || start > end || end > today || (Date.parse(end)-Date.parse(start))/86400000 > 365) throw new Error('Choose valid dates, up to 366 days, ending today or earlier.');
  if (start < REPORT_START) throw new Error('Reports start on November 15, 2026.');
  return { start, end };
}
