window.SayaratiReports = (() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const date = () => new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Beirut',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const shift = (day,n) => new Date(Date.parse(day+'T12:00:00Z')+n*86400000).toISOString().slice(0,10);
  const firstReportDay = '2026-11-15';
  const clampStart = day => day < firstReportDay ? firstReportDay : day;
  let start=clampStart(shift(date(),-29)), end=date(), data=null, error='', loading=false, auth='', generation=0;
  const labels={visitors:'Unique visitors',sessions:'Visits',page_views:'Page views',product_views:'Product views',cart_additions:'Cart additions',checkouts:'Checkouts started',new_visitors:'New visitors',returning_visitors:'Returning visitors',anonymous_visitors:'Anonymous visitors',customers:'Signed-in customers'};
  const pretty = value => String(value || '').replace(/_/g,' ').replace(/^./,c=>c.toUpperCase());
  const when = value => value ? new Date(value).toLocaleString('en-GB',{timeZone:'Asia/Beirut'}) : '—';
  function table(rows,columns) {
    if(!rows.length) return '<p class="muted">No activity in this period.</p>';
    return `<div class="report-table-wrap"><table class="report-table"><thead><tr>${columns.map(([key,label])=>`<th scope="col">${esc(label || pretty(key))}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${columns.map(([key,label,format])=>`<td>${esc(format?format(row[key],row):row[key] ?? '—')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function chart() {
    const rows=data.daily, max=Math.max(1,...rows.map(r=>r.visitors));
    return `<div class="visitor-chart" role="img" aria-label="Daily unique visitors in Beirut time. Exact values are in the daily report below.">${rows.map(row=>`<div class="visitor-day" title="${esc(row.day)}: ${row.visitors} visitors"><div class="visitor-bar" style="height:${Math.max(0,Number(row.visitors)/max*100)}%"></div><span>${esc(row.day.slice(5))}</span></div>`).join('')}</div>`;
  }
  function contents() {
    if(loading) return '<p role="status">Loading reports…</p>';
    if(error) return `<p class="error" role="alert">${esc(error)}</p>`;
    if(!data) return '<p class="muted">Select a period and load reports.</p>';
    return `<p class="muted">${esc(data.range.start)} to ${esc(data.range.end)} · Beirut time · First recorded activity: ${esc(when(data.firstEvent))}</p>
      <div class="stats">${Object.entries(labels).map(([key,label])=>{
        const value=Number(data.summary[key] || 0), previous=Number(data.previous?.[key] || 0);
        const change=previous ? `${value>=previous?'+':''}${Math.round((value-previous)/previous*100)}%` : value ? 'No previous baseline' : 'No change';
        return `<div class="stat"><span>${label}</span><strong>${value.toLocaleString()}</strong>${data.previous ? `<small>${change} vs previous ${data.daily.length} days (${previous})</small>` : ''}</div>`;
      }).join('')}</div>
      <h3>Daily visitors</h3>${chart()}
      <details><summary>Daily figures and shopping activity</summary>${table(data.daily,[['day','Date'],['visitors','Visitors'],['sessions','Visits'],['page_views','Page views'],['product_views','Product views'],['cart_additions','Cart additions'],['checkouts','Checkouts started']])}</details>
      <h3>Sections visited</h3>${table(data.pages,[['page','Section',pretty],['views','Views'],['visitors','Visitors']])}
      <h3>Product interest</h3><p class="muted">Top ${data.limits.products} products by views. Additions count actions; units added count quantities.</p>
      ${table(data.products,[['product_name','Product',(v,r)=>v || `Product ${r.product_id}`],['product_id','Product ID'],['views','Views'],['visitors','Visitors'],['additions','Cart additions'],['units_added','Units added']])}
      <h3>Customer activity</h3><p class="muted">Most recent ${data.limits.customers} signed-in customers active in the period. Latest cart value is a snapshot in the selected period, not sales.</p>
      ${table(data.customers,[['name','Customer'],['phone','Phone'],['sessions','Visits'],['page_views','Page views'],['product_views','Product views'],['cart_additions','Cart additions'],['checkouts','Checkouts'],['last_cart_value','Latest cart value'],['last_activity','Last activity',when]])}
      <h3>Recent activity</h3><p class="muted">Latest ${data.limits.recent} events. Anonymous activity has no customer identity.</p>
      ${table(data.recent,[['created_at','Time',when],['customer_name','Customer',v=>v || 'Anonymous'],['phone','Phone'],['event_type','Activity',pretty],['page','Section',pretty],['product_name','Product'],['cart_items','Cart items'],['cart_value','Cart value']])}`;
  }
  function view() {
    return `<section class="panel reports-panel" id="activity-reports"><h2>Reports</h2>
      <p class="muted">Traffic, product interest and shopping activity. Paid orders and revenue require Ecwid order integration.</p>
      <form class="report-filters" data-report-filters>
        <label for="report-period">Period<select id="report-period" name="preset" data-report-preset><option value="custom">Custom dates</option><option value="1">Today</option><option value="7">Last 7 days</option><option value="30">Last 30 days</option></select></label>
        <label for="report-start">From<input id="report-start" type="date" name="start" min="${firstReportDay}" max="${date()}" value="${esc(start)}" required></label>
        <label for="report-end">To<input id="report-end" type="date" name="end" min="${firstReportDay}" max="${date()}" value="${esc(end)}" required></label>
        <button class="primary" ${loading?'disabled':''}>Load reports</button>
        <button class="secondary" type="button" data-report-export ${!data || loading || error?'disabled':''}>Export Excel workbook</button>
      </form>
      <p class="muted report-definitions">Visitors are estimated browsers/devices, not people. A visit ends after 30 minutes of inactivity. New means first recorded visit; returning means seen before the selected period. Daily uniques do not add up to period uniques. Anonymous and signed-in counts can overlap after login. Browser privacy settings, cleared storage, offline use and bots can affect counts. Tracking starts after this feature is published.</p>
      <p class="muted">Reports start on November 15, 2026.</p>
      <div data-report-results aria-live="polite">${contents()}</div></section>`;
  }
  function draw() {
    const host=document.querySelector('#activity-reports');
    if(!host) return;
    host.outerHTML=view(); bind(auth);
  }
  async function load() {
    if(!auth || loading) return;
    const request=++generation, token=auth;
    loading=true;error='';draw();
    try {
      const response=await fetch(`/.netlify/functions/admin-reports?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`,{headers:{Authorization:`Bearer ${token}`}});
      const result=await response.json();
      if(!response.ok || !result.ok) throw new Error(result.error || 'Could not load reports');
      if(request===generation && auth===token) data=result;
    } catch(e) { if(request===generation) error=e.message; }
    finally { if(request===generation){loading=false;draw();} }
  }
  function bind(token) {
    if(token!==auth) { auth=token;data=null;error='';loading=false;generation++; }
    const form=document.querySelector('[data-report-filters]');
    if(!form) return;
    form.onsubmit=e=>{e.preventDefault();const values=new FormData(form);start=values.get('start');end=values.get('end');load();};
    form.querySelector('[data-report-preset]').onchange=e=>{
      if(e.target.value==='custom') return;
      form.elements.end.value=date();form.elements.start.value=clampStart(shift(date(),1-Number(e.target.value)));
    };
    document.querySelector('[data-report-export]').onclick=exportWorkbook;
    if(auth && !data && !loading && !error) load();
  }
  function exportWorkbook() {
    if(!data) return;
    const xml=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
    const sheets={
      'Read me':[{item:'Period',value:`${data.range.start} to ${data.range.end}`},{item:'Timezone',value:'Asia/Beirut'},{item:'First event',value:when(data.firstEvent)},{item:'Definition',value:'Visitors estimate browsers/devices. Visit timeout: 30 minutes. Tracking is not retroactive. Daily unique counts are not additive.'},{item:'Sales',value:'Cart additions and checkout starts are interest, not paid orders or revenue.'},{item:'Limits',value:'Products: top 1000; customers: latest 1000; recent activity: latest 200. Summary and daily totals use all events in period.'}],
      Summary:Object.entries(labels).map(([key,metric])=>({metric,current:Number(data.summary[key] || 0),previous:data.previous ? Number(data.previous[key] || 0) : 'Unavailable'})),
      Daily:data.daily,Sections:data.pages,Products:data.products,Customers:data.customers,
      Activity:data.recent.map(row=>({...row,created_at:when(row.created_at)}))
    };
    const workbook='<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">'+Object.entries(sheets).map(([name,rows])=>{
      const keys=Object.keys(rows[0]||{message:''});
      const cells=values=>'<Row>'+values.map(v=>`<Cell><Data ss:Type="${typeof v==='number'&&Number.isFinite(v)?'Number':'String'}">${xml(v)}</Data></Cell>`).join('')+'</Row>';
      return `<Worksheet ss:Name="${xml(name)}"><Table>${cells(keys.map(pretty))}${rows.map(row=>cells(keys.map(key=>row[key]))).join('')}</Table></Worksheet>`;
    }).join('')+'</Workbook>';
    const url=URL.createObjectURL(new Blob([workbook],{type:'application/vnd.ms-excel'}));
    const link=document.createElement('a');link.href=url;link.download=`sayarati-reports-${data.range.start}-${data.range.end}.xml`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  return {view,bind};
})();
