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
  brandFilter: "",
  modelFilter: "",
  customerTypeFilter: "",
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
  const installedCount = data.customers.filter((customer) => customer.app_installed).length;
  const notificationCount = data.customers.filter((customer) => customer.notifications_enabled).length;
  const filteredCustomers = filterCustomers(data);
  const brandOptions = uniqueValues(data.cars.map((car) => car.brand));
  const modelOptions = uniqueValues(data.cars
    .filter((car) => !adminState.brandFilter || car.brand === adminState.brandFilter)
    .map((car) => car.model));

  return `
    <h1>Admin dashboard</h1>
    <div class="stats">
      ${stat("Customers", data.customers.length)}
      ${stat("Cars", data.cars.length)}
      ${stat("Service records", data.records.length)}
      ${stat("Messages", data.messages.length)}
      ${stat("Total expenses", formatMoney(totalExpenses))}
      ${stat("Home Screen", installedCount)}
      ${stat("Notifications", notificationCount)}
    </div>
    ${messageComposer(data.messages)}
    <section class="panel">
      <div class="toolbar">
        <h2>Customer database</h2>
        <div class="toolbar-actions">
          <input data-search placeholder="Search by phone, name, customer category, car, plate, VIN" value="${adminState.search}" />
          <select data-filter-type>
            <option value="">All customer types</option>
            ${customerTypeOptions().map((type) => `<option value="${type.value}" ${adminState.customerTypeFilter === type.value ? "selected" : ""}>${type.label}</option>`).join("")}
          </select>
          <select data-filter-brand>
            <option value="">All brands</option>
            ${brandOptions.map((brand) => `<option value="${escapeHtml(brand)}" ${adminState.brandFilter === brand ? "selected" : ""}>${escapeHtml(brand)}</option>`).join("")}
          </select>
          <select data-filter-model>
            <option value="">All models</option>
            ${modelOptions.map((model) => `<option value="${escapeHtml(model)}" ${adminState.modelFilter === model ? "selected" : ""}>${escapeHtml(model)}</option>`).join("")}
          </select>
          <button class="secondary" type="button" data-export-excel>Export Excel</button>
        </div>
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
      <p class="muted">Create a small announcement or promotion. It appears inside the app and is sent as a phone notification to customers who enabled notifications.</p>
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
          <h3>${escapeHtml(customer.name || "Customer")}</h3>
          <p class="muted">${escapeHtml(customer.phone || "")}</p>
          <p class="muted">Category: ${customerTypeLabel(customer.customer_type || "personal")}</p>
          <p class="muted">Home Screen: ${customer.app_installed ? "Yes" : "No"}${customer.last_app_opened_at ? ` · Last app open: ${formatDateTime(customer.last_app_opened_at)}` : ""}</p>
          <p class="muted">Notifications: ${customer.notifications_enabled ? "Enabled" : "Not enabled"}</p>
        </div>
        <span class="pill">${cars.length} cars / ${records.length} records</span>
      </div>
      <div class="mini-grid">
        <div class="mini">
          <strong>Cars</strong>
          <p class="muted">${cars.length ? cars.map((car) => escapeHtml(`${car.brand} ${car.model} ${car.year || ""}`)).join(", ") : "No cars yet"}</p>
        </div>
        <div class="mini">
          <strong>Total spent</strong>
          <p class="muted">${formatMoney(spent)}</p>
        </div>
      </div>
      <div class="card-actions">
        <button class="danger" type="button" data-delete-customer="${customer.id}" data-customer-name="${escapeHtml(customer.name || customer.phone || "Customer")}">Delete customer</button>
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

  document.querySelector("[data-filter-type]")?.addEventListener("change", (event) => {
    adminState.customerTypeFilter = event.target.value;
    render();
  });

  document.querySelector("[data-filter-brand]")?.addEventListener("change", (event) => {
    adminState.brandFilter = event.target.value;
    adminState.modelFilter = "";
    render();
  });

  document.querySelector("[data-filter-model]")?.addEventListener("change", (event) => {
    adminState.modelFilter = event.target.value;
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

  document.querySelector("[data-export-excel]")?.addEventListener("click", exportAdminData);

  document.querySelectorAll("[data-delete-customer]").forEach((button) => {
    button.addEventListener("click", () => deleteCustomer(button.dataset.deleteCustomer, button.dataset.customerName));
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

async function deleteCustomer(customerId, customerName) {
  const name = customerName || "this customer";
  const confirmed = confirm(`Delete ${name} completely?\n\nThis will permanently delete the customer, their cars, and all service history from the database.`);
  if (!confirmed) return;

  adminState = { ...adminState, loading: true, error: "" };
  render();

  const result = await fetch("/.netlify/functions/admin-delete-customer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminState.token}`,
    },
    body: JSON.stringify({ customerId }),
  }).then((res) => res.json()).catch(() => ({ error: "Could not delete customer" }));

  if (result.ok) {
    await loadAdminData();
    return;
  }

  adminState = { ...adminState, loading: false, error: result.error || "Could not delete customer" };
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
  return data.customers.filter((customer) => {
    const cars = carsFor(customer.id);
    const customerType = customer.customer_type || "personal";
    const matchesType = !adminState.customerTypeFilter || customerType === adminState.customerTypeFilter;
    const matchesBrand = !adminState.brandFilter || cars.some((car) => car.brand === adminState.brandFilter);
    const matchesModel = !adminState.modelFilter || cars.some((car) => car.model === adminState.modelFilter);
    if (!matchesType || !matchesBrand || !matchesModel) return false;
    if (!term) return true;
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
  return customerTypeOptions().find((type) => type.value === value)?.label || value;
}

function customerTypeOptions() {
  return [
    { value: "personal", label: "Personal car owner" },
    { value: "garage", label: "Garage / workshop owner" },
    { value: "company_fleet", label: "Company fleet owner" },
    { value: "rental_company", label: "Rental company owner" },
    { value: "car_dealer", label: "Car dealer / showroom" },
    { value: "other", label: "Other" },
  ];
}

function uniqueValues(values) {
  return Array.from(new Set(values.map((value) => String(value || "").trim()).filter(Boolean)))
    .sort((a, b) => a.localeCompare(b));
}

function exportAdminData() {
  const data = adminState.data || { customers: [], cars: [], records: [] };
  const rows = [[
    "Customer name",
    "Phone",
    "Customer category",
    "Home Screen installed/opened",
    "Last app open",
    "Last browser open",
    "Notifications enabled",
    "Car brand",
    "Car model",
    "Car year",
    "Plate",
    "Mileage",
    "VIN",
    "Service date",
    "Mechanic name",
    "Service types",
    "Service mileage",
    "Cost",
    "Next service date",
    "Next service note",
    "Service notes",
  ]];

  data.customers.forEach((customer) => {
    const cars = carsFor(customer.id);
    if (!cars.length) {
      rows.push(customerExportRow(customer));
      return;
    }
    cars.forEach((car) => {
      const records = (data.records || []).filter((record) => record.car_id === car.id);
      if (!records.length) {
        rows.push(customerExportRow(customer, car));
        return;
      }
      records.forEach((record) => rows.push(customerExportRow(customer, car, record)));
    });
  });

  const csv = `\uFEFF${rows.map((row) => row.map(csvCell).join(",")).join("\n")}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `sayarati-admin-export-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function customerExportRow(customer, car = {}, record = {}) {
  return [
    customer.name || "Customer",
    customer.phone || "",
    customerTypeLabel(customer.customer_type || "personal"),
    customer.app_installed ? "Yes" : "No",
    formatDateTime(customer.last_app_opened_at),
    formatDateTime(customer.last_browser_opened_at),
    customer.notifications_enabled ? "Yes" : "No",
    car.brand || "",
    car.model || "",
    car.year || "",
    car.plate || "",
    car.mileage || "",
    car.vin || "",
    formatDate(record.service_date),
    record.mechanic_name || "",
    Array.isArray(record.service_types) ? record.service_types.join(" / ") : "",
    record.mileage || "",
    record.cost || "",
    formatDate(record.next_due),
    record.next_service_note || "",
    record.notes || "",
  ];
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function formatDate(value) {
  if (!value) return "";
  return String(value).slice(0, 10);
}

function formatDateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString();
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
