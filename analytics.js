// First-party activity only: no contact details, IP addresses, search text or external trackers.
window.SayaratiAnalytics = (() => {
  let queue = [], timer, context = '', blocked = false;
  const memoryVisitor = crypto.randomUUID();
  const read = (key) => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
  const write = (key,value) => { try { localStorage.setItem(key,JSON.stringify(value)); } catch { /* Session remains usable without storage. */ } };
  let visitor = read('sayarati-analytics-visitor');
  if (!visitor?.id) { visitor = {id:memoryVisitor}; write('sayarati-analytics-visitor',visitor); }
  let visit = null;
  function session() {
    const stored = read('sayarati-analytics-session');
    if (stored && Date.now()-stored.last < 30*60*1000) visit = stored;
    if (!visit || Date.now()-visit.last >= 30*60*1000) { visit={id:crypto.randomUUID(),last:Date.now()}; context=''; }
    visit.last=Date.now(); write('sayarati-analytics-session',visit);
    return visit.id;
  }
  function enabled() { return !blocked && navigator.doNotTrack !== '1' && !navigator.globalPrivacyControl && read('sayarati-analytics-disabled') !== true; }
  async function flush() {
    clearTimeout(timer);
    if (!enabled() || !queue.length) { queue=[]; return; }
    const pending=queue.splice(0,20);
    // Events keep their original session and authentication context, including during logout.
    const first=pending[0];
    const batch=pending.filter(e=>e.sessionId===first.sessionId && e.token===first.token);
    queue.unshift(...pending.filter(e=>!batch.includes(e)));
    try {
      await fetch('/.netlify/functions/track-activity',{method:'POST',keepalive:true,
        headers:{'Content-Type':'application/json',...(first.token?{Authorization:`Bearer ${first.token}`}:{})},
        body:JSON.stringify({visitorId:visitor.id,sessionId:first.sessionId,events:batch.map(({sessionId,token,...event})=>event)})});
    } catch { /* Reporting never blocks the app; offline events are not replayed as today's activity. */ }
    if(queue.length) timer=setTimeout(flush,500);
  }
  function event(type,details={},token='') {
    if(!enabled()) return;
    if(queue.length>=100) return;
    queue.push({...details,id:crypto.randomUUID(),type,sessionId:session(),token});
    clearTimeout(timer); timer=setTimeout(flush,800);
  }
  function page(details,token) {
    const sessionId=session();
    const key=JSON.stringify([sessionId,Boolean(token),details.page,details.productId,details.categoryId]);
    if(key===context) return;
    context=key;
    event('page_view',details,token);
    if(details.page==='product') event('product_view',details,token);
  }
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden') flush();});
  window.addEventListener('pagehide',flush);
  return {event,page,flush,optOut(){blocked=true;queue=[];write('sayarati-analytics-disabled',true);}};
})();
