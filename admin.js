const ADMIN_TOKEN_KEY = "sayarati-admin-token";

let adminState = {
  token: localStorage.getItem(ADMIN_TOKEN_KEY) || "",
  step: "phone",
  phone: "",
  name: "",
  code: "",
  loading: false,
  error: "",
  data: null,
  search: "",
  messageTitle: "",
  messageBody: "",
  messageCtaLabel: "",
  messageCtaUrl: "",
  messageEndsAt: "",
};

render();
if (adminState.token) loadAdminData();

function render() {
  document.querySelector("#admin-app").innerHTML = `
    <header class="admin-top">
      <img src="assets/sayarati-logo-with-online.png" alt="SAYARATI.online" />
      ${adminState.token ? `<button data-logout>Logout</button>` : ""}
    </header>
    <section class="admin-wrap">
      ${adminState.token ? dashboardView() : loginView()}
    </section>
  `;
  bind();
}

function loginView() {
  return `
    <section class="panel login-panel">
      <h1>Admin login</h1>
      <p class="muted">Enter your WhatsApp number. Only approved admin numbers can open customer data.</p>
      ${adminState.error ? `<p class="error">${adminState.error}</p>` : ""}
      <form class="form" data-admin-login>
        <div class="field">
          <label for="phone">WhatsApp number</label>
          <input id="phone" name="phone" type="tel" inputmode="numeric" maxlength="15" value="${adminState.phone}" placeholder="96170123456" ${adminState.step === "code" ? "readonly" : ""} />
        </div>
        ${adminState.step === "code" ? `
          <div class="field">
            <label for="code">Verification code</label>
            <input id="code" name="code" type="tel" inputmode="numeric" maxlength="6" value="${adminState.code}" placeholder="123456" />
          </div>
        ` : ""}
        <button class="primary" type="submit">${adminState.loading ? "Please wait..." : adminState.step === "code" ? "Verify and open admin" : "Send WhatsApp code"}</button>
      </form>
    </section>
  `;
}

function dashboardView() {
  if (adminState.loading && !adminState.data) {
    return `<section class="panel"><h1>Admin dashboard</h1><p class="muted">Loading customer database...</p></section>`;
  }

  if (adminState.error) {
    return `<section class="panel"><h1>Admin dashboard</h1><p class="error">${adminState.error}</p></section>`;
  }

  const data = adminState.data || { customers: [], cars: [], records: [], messages: [] };
  const totalExpenses = data.records.reduce((sum, record) => sum + Number(record.cost || 0), 0);
  const filteredCustomers = filterCustomers(data);

  return `
    <h1>Admin dashboard</h1>
    <div class="stats">
      ${stat("Customers", data.customers.length)}
      ${stat("Cars", data.cars.length)}
      ${stat("Service records", data.records.length)}
      ${stat("Messages", data.messages.length)}
      ${stat("Total expenses", formatMoney(totalExpenses))}
    </div>
    ${messageComposer(data.messages)}
    <section class="panel">
      <div class="toolbar">
        <h2>Customer database</h2>
        <input data-search placeholder="Search by phone, name, car, plate, VIN" value="${adminState.search}" />
      </div>
      <div class="customer-list">
        ${filteredCustomers.length ? filteredCustomers.map(customerCard).join("") : `<p class="muted">No customers found yet.</p>`}
      </div>
    </section>
  `;
}

function messageComposer(messages = []) {
  return `
    <section class="panel message-panel">
      <h2>Send app notification</h2>
      <p class="muted">Create a small announcement or promotion that appears inside the customer app.</p>
      <form class="form message-form" data-create-message>
        <div class="field">
          <label for="messageTitle">Title</label>
          <input id="messageTitle" name="title" maxlength="90" placeholder="Special offer" value="${escapeHtml(adminState.messageTitle)}" />
        </div>
        <div class="field">
          <label for="messageBody">Message</label>
          <input id="messageBody" name="body" maxlength="500" placeholder="Get 10% off selected filters this week." value="${escapeHtml(adminState.messageBody)}" />
        </div>
        <div class="message-grid">
          <div class="field">
            <label for="messageCtaLabel">Button text</label>
            <input id="messageCtaLabel" name="ctaLabel" maxlength="40" placeholder="Shop now" value="${escapeHtml(adminState.messageCtaLabel)}" />
          </div>
          <div class="field">
            <label for="messageCtaUrl">Button link</label>
            <input id="messageCtaUrl" name="ctaUrl" maxlength="300" placeholder="https://app.sayarati.online" value="${escapeHtml(adminState.messageCtaUrl)}" />
          </div>
          <div class="field">
            <label for="messageEndsAt">End date</label>
            <input id="messageEndsAt" name="endsAt" type="date" value="${escapeHtml(adminState.messageEndsAt)}" />
          </div>
        </div>
        <button class="primary" type="submit">${adminState.loading ? "Please wait..." : "Publish message"}</button>
      </form>
      <div class="message-list">
        ${messages.length ? messages.slice(0, 5).map((message) => `
          <div class="mini">
            <strong>${escapeHtml(message.title)}</strong>
            <p class="muted">${escapeHtml(message.body)}</p>
          </div>
        `).join("") : `<p class="muted">No admin messages yet.</p>`}
      </div>
    </section>
  `;
}

function stat(label, value) {
  return `<div class="stat"><span>${label}</span><strong>${value}</strong></div>`;
}

function customerCard(customer) {
  const cars = carsFor(customer.id);
  const records = recordsFor(customer.id);
  const spent = records.reduce((sum, record) => sum + Number(record.cost || 0), 0);
  return `
    <article class="customer-card">
      <div class="customer-head">
        <div>
          <h3>${customer.name || "Customer"}</h3>
          <p class="muted">${customer.phone}</p>
          ${customer.customer_type ? `<p class="muted">${customerTypeLabel(customer.customer_type)}</p>` : ""}
        </div>
        <span class="pill">${cars.length} cars / ${records.length} records</span>
      </div>
      <div class="mini-grid">
        <div class="mini">
          <strong>Cars</strong>
          <p class="muted">${cars.length ? cars.map((car) => `${car.brand} ${car.model} ${car.year || ""}`).join(", ") : "No cars yet"}</p>
        </div>
        <div class="mini">
          <strong>Total spent</strong>
          <p class="muted">${formatMoney(spent)}</p>
        </div>
      </div>
    </article>
  `;
}

function bind() {
  document.querySelector("[data-logout]")?.addEventListener("click", () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    adminState = { ...adminState, token: "", data: null, error: "", step: "phone" };
    render();
  });

  document.querySelector("[data-admin-login]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const phone = sanitizePhone(form.get("phone"));
    const code = sanitizePhone(form.get("code")).slice(0, 6);
    if (adminState.step === "phone") return requestOtp(phone);
    return verifyOtp(phone, code);
  });

  document.querySelector("[data-search]")?.addEventListener("input", (event) => {
    adminState.search = event.target.value;
    render();
  });

  document.querySelector("[data-create-message]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await createMessage({
      title: form.get("title"),
      body: form.get("body"),
      ctaLabel: form.get("ctaLabel"),
      ctaUrl: form.get("ctaUrl"),
      endsAt: form.get("endsAt"),
    });
  });
}

async function requestOtp(phone) {
  if (!/^\d{8,15}$/.test(phone)) {
    adminState = { ...adminState, error: "Enter a valid phone number.", phone };
    render();
    return;
  }
  adminState = { ...adminState, loading: true, error: "", phone };
  render();
  const result = await api("/.netlify/functions/request-whatsapp-otp", { phone });
  adminState = { ...adminState, loading: false, error: result.error || "", step: result.error ? "phone" : "code" };
  render();
}

async function verifyOtp(phone, code) {
  if (!/^\d{6}$/.test(code)) {
    adminState = { ...adminState, error: "Enter the 6 digit code.", code };
    render();
    return;
  }
  adminState = { ...adminState, loading: true, error: "", phone, code };
  render();
  const result = await api("/.netlify/functions/verify-whatsapp-otp", { phone, code, name: "Sayarati Admin" });
  if (result.token) {
    localStorage.setItem(ADMIN_TOKEN_KEY, result.token);
    adminState = { ...adminState, token: result.token, loading: false, error: "" };
    render();
    loadAdminData();
    return;
  }
  adminState = { ...adminState, loading: false, error: result.error || "Could not verify code" };
  render();
}

async function loadAdminData() {
  adminState = { ...adminState, loading: true, error: "" };
  render();
  const result = await fetch("/.netlify/functions/admin-summary", {
    headers: { Authorization: `Bearer ${adminState.token}` },
  }).then((res) => res.json()).catch(() => ({ error: "Could not load admin data" }));

  adminState = { ...adminState, loading: false, error: result.error || "", data: result.ok ? result : null };
  render();
}

async function createMessage(message) {
  adminState = {
    ...adminState,
    loading: true,
    error: "",
    messageTitle: message.title || "",
    messageBody: message.body || "",
    messageCtaLabel: message.ctaLabel || "",
    messageCtaUrl: message.ctaUrl || "",
    messageEndsAt: message.endsAt || "",
  };
  render();

  const result = await fetch("/.netlify/functions/admin-create-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminState.token}`,
    },
    body: JSON.stringify(message),
  }).then((res) => res.json()).catch(() => ({ error: "Could not publish message" }));

  if (result.ok) {
    adminState = { ...adminState, loading: false, messageTitle: "", messageBody: "", messageCtaLabel: "", messageCtaUrl: "", messageEndsAt: "" };
    await loadAdminData();
    return;
  }

  adminState = { ...adminState, loading: false, error: result.error || "Could not publish message" };
  render();
}

async function api(url, body) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => res.json()).catch(() => ({ error: "Connection error" }));
}

function filterCustomers(data) {
  const term = adminState.search.trim().toLowerCase();
  if (!term) return data.customers;
  return data.customers.filter((customer) => {
    const cars = carsFor(customer.id);
    const text = [
      customer.name,
      customer.phone,
      customer.customer_type,
      ...cars.flatMap((car) => [car.brand, car.model, car.year, car.plate, car.vin]),
    ].join(" ").toLowerCase();
    return text.includes(term);
  });
}

function carsFor(customerId) {
  return (adminState.data?.cars || []).filter((car) => car.customer_id === customerId);
}

function recordsFor(customerId) {
  return (adminState.data?.records || []).filter((record) => record.customer_id === customerId);
}

function formatMoney(value) {
  return Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function customerTypeLabel(value) {
  const labels = {
    personal: "Personal car owner",
    garage: "Garage / workshop owner",
    company_fleet: "Company fleet owner",
    rental_company: "Rental company owner",
    car_dealer: "Car dealer / showroom",
    other: "Other",
  };
  return labels[value] || value;
}

function sanitizePhone(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 15);
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
