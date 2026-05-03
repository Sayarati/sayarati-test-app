const SHOP_URL = "https://sayarati.online/";
const STORAGE_KEY = "sayarati-test-app";

const copy = {
  en: {
    appName: "Sayarati",
    subtitle: "Digital car service booklet",
    loginTitle: "Welcome to your test app",
    loginText: "Use any name and email to enter the demo.",
    name: "Name",
    email: "Email",
    enter: "Enter App",
    overview: "Overview",
    cars: "My Cars",
    booklet: "Service Booklet",
    shop: "Shop",
    profile: "Profile",
    addCar: "Add Car",
    carDetails: "Car Details",
    brand: "Brand",
    model: "Model",
    year: "Year",
    plate: "Plate Number",
    mileage: "Mileage",
    vin: "VIN / Chassis",
    notes: "Notes",
    saveCar: "Save Car",
    addRecord: "Add Service Record",
    serviceType: "Service Type",
    date: "Date",
    parts: "Parts Changed",
    cost: "Cost",
    nextDue: "Next Service Date",
    invoice: "Invoice Photo Name",
    saveRecord: "Save Record",
    records: "Records",
    noCars: "No cars yet. Add your first customer car.",
    noRecords: "No service records yet.",
    selectedCar: "Selected car",
    openExternal: "Open in browser",
    shopHint: "For this test version, open the shop with the button below. In the real phone app, this page will use a mobile WebView so customers stay inside the app.",
    profileTitle: "Customer Profile",
    reset: "Reset demo data",
    totalCars: "Cars",
    totalRecords: "Service records",
    nextService: "Next service",
    dashboardTitle: "Your garage at a glance",
    dashboardText: "Track cars, service history, invoices, and upcoming maintenance from one mobile app.",
    sample: "Add sample data",
    carSaved: "Car saved. You can see it in the list.",
    carRequired: "Please enter at least the brand or model.",
    recordSaved: "Service record saved.",
  },
  ar: {
    appName: "سيارتي",
    subtitle: "دفتر صيانة رقمي للسيارة",
    loginTitle: "أهلاً بك في تطبيق التجربة",
    loginText: "استخدم أي اسم وبريد إلكتروني للدخول إلى العرض التجريبي.",
    name: "الاسم",
    email: "البريد الإلكتروني",
    enter: "دخول التطبيق",
    overview: "الرئيسية",
    cars: "سياراتي",
    booklet: "دفتر الصيانة",
    shop: "المتجر",
    profile: "الملف الشخصي",
    addCar: "إضافة سيارة",
    carDetails: "تفاصيل السيارة",
    brand: "الشركة",
    model: "الموديل",
    year: "السنة",
    plate: "رقم اللوحة",
    mileage: "عداد الكيلومترات",
    vin: "رقم الشاسيه",
    notes: "ملاحظات",
    saveCar: "حفظ السيارة",
    addRecord: "إضافة سجل صيانة",
    serviceType: "نوع الصيانة",
    date: "التاريخ",
    parts: "القطع المستبدلة",
    cost: "الكلفة",
    nextDue: "موعد الصيانة القادمة",
    invoice: "اسم صورة الفاتورة",
    saveRecord: "حفظ السجل",
    records: "السجلات",
    noCars: "لا توجد سيارات بعد. أضف أول سيارة.",
    noRecords: "لا توجد سجلات صيانة بعد.",
    selectedCar: "السيارة المختارة",
    openExternal: "فتح في المتصفح",
    shopHint: "في نسخة التجربة افتح المتجر من الزر أدناه. في تطبيق الهاتف الحقيقي ستعمل هذه الصفحة من خلال WebView ليبقى العميل داخل التطبيق.",
    profileTitle: "ملف العميل",
    reset: "مسح بيانات التجربة",
    totalCars: "السيارات",
    totalRecords: "سجلات الصيانة",
    nextService: "الصيانة القادمة",
    dashboardTitle: "مرآبك في لمحة",
    dashboardText: "تابع السيارات وسجل الصيانة والفواتير ومواعيد الصيانة القادمة من تطبيق واحد.",
    sample: "إضافة بيانات تجريبية",
    carSaved: "تم حفظ السيارة. يمكنك رؤيتها في القائمة.",
    carRequired: "يرجى إدخال الشركة أو الموديل على الأقل.",
    recordSaved: "تم حفظ سجل الصيانة.",
  },
};

let state = loadState();

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  return {
    lang: "en",
    view: "overview",
    user: null,
    selectedCarId: null,
    cars: [],
    records: [],
    notice: "",
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, notice: "" }));
}

function t(key) {
  return copy[state.lang][key] || copy.en[key] || key;
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 1000)}`;
}

function setState(update) {
  state = { ...state, ...update };
  saveState();
  render();
}

function setView(view) {
  setState({ view });
}

function selectedCar() {
  return state.cars.find((car) => car.id === state.selectedCarId) || state.cars[0];
}

function carRecords(carId) {
  return state.records
    .filter((record) => record.carId === carId)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

function nextServiceDate() {
  const dates = state.records
    .map((record) => record.nextDue)
    .filter(Boolean)
    .sort();
  return dates[0] || "-";
}

function render() {
  document.documentElement.lang = state.lang;
  const app = document.querySelector("#app");
  app.className = state.lang === "ar" ? "rtl" : "";

  if (!state.user) {
    app.innerHTML = loginView();
    bindLogin();
    return;
  }

  app.innerHTML = `
    <div class="shell">
      <aside class="sidebar">
        <div class="brand">
          <div class="mark">S</div>
          <div>
            <strong>${t("appName")}</strong>
            <span>${t("subtitle")}</span>
          </div>
        </div>
        <nav class="nav">
          ${navButton("overview", "⌂", t("overview"))}
          ${navButton("cars", "▣", t("cars"))}
          ${navButton("booklet", "✎", t("booklet"))}
          ${navButton("shop", "◱", t("shop"))}
        </nav>
        <div class="language">
          <button class="${state.lang === "en" ? "active" : ""}" data-lang="en">EN</button>
          <button class="${state.lang === "ar" ? "active" : ""}" data-lang="ar">AR</button>
        </div>
      </aside>
      <main class="main">
        ${header()}
        ${state.notice ? `<div class="notice">${state.notice}</div>` : ""}
        ${currentView()}
      </main>
    </div>
  `;

  bindApp();
}

function loginView() {
  return `
    <section class="login-wrap">
      <form class="login-card" id="login-form">
        <div class="brand" style="margin-bottom: 20px;">
          <div class="mark">S</div>
          <div>
            <strong>${t("appName")}</strong>
            <span>${t("subtitle")}</span>
          </div>
        </div>
        <h1>${t("loginTitle")}</h1>
        <p class="muted">${t("loginText")}</p>
        <div class="form">
          ${field("name", t("name"), "text", "Cedric")}
          ${field("email", t("email"), "email", "customer@example.com")}
          <button class="primary" type="submit">${t("enter")}</button>
          <div class="language">
            <button type="button" class="${state.lang === "en" ? "active" : ""}" data-lang="en">EN</button>
            <button type="button" class="${state.lang === "ar" ? "active" : ""}" data-lang="ar">AR</button>
          </div>
        </div>
      </form>
    </section>
  `;
}

function navButton(view, icon, label) {
  return `
    <button class="${state.view === view ? "active" : ""}" data-view="${view}">
      <span class="nav-icon">${icon}</span>
      <span>${label}</span>
    </button>
  `;
}

function header() {
  return `
    <div class="topbar">
      <div>
        <div class="eyebrow">${t("appName")}</div>
        <h1>${pageTitle()}</h1>
        <p class="muted">${pageText()}</p>
      </div>
      <button class="ghost" data-view="profile">${t("profile")}</button>
    </div>
  `;
}

function pageTitle() {
  if (state.view === "cars") return t("cars");
  if (state.view === "booklet") return t("booklet");
  if (state.view === "shop") return t("shop");
  if (state.view === "profile") return t("profileTitle");
  return t("dashboardTitle");
}

function pageText() {
  if (state.view === "shop") return t("shopHint");
  return t("dashboardText");
}

function currentView() {
  if (state.view === "cars") return carsView();
  if (state.view === "booklet") return bookletView();
  if (state.view === "shop") return shopView();
  if (state.view === "profile") return profileView();
  return overviewView();
}

function overviewView() {
  return `
    <section class="grid dashboard-grid">
      <div class="panel stat"><span>${t("totalCars")}</span><strong>${state.cars.length}</strong></div>
      <div class="panel stat"><span>${t("totalRecords")}</span><strong>${state.records.length}</strong></div>
      <div class="panel stat"><span>${t("nextService")}</span><strong style="font-size: 24px;">${nextServiceDate()}</strong></div>
    </section>
    <section class="panel" style="margin-top: 16px;">
      <div class="row">
        <div>
          <h2>${t("selectedCar")}</h2>
          <p class="muted">${selectedCar() ? carLabel(selectedCar()) : t("noCars")}</p>
        </div>
        <div class="actions">
          <button class="ghost" data-sample>${t("sample")}</button>
          <button class="primary" data-view="cars">${t("addCar")}</button>
        </div>
      </div>
    </section>
  `;
}

function carsView() {
  return `
    <section class="grid two-col">
      <div class="panel">
        <h2>${t("addCar")}</h2>
        <form class="form" id="car-form">
          ${field("brand", t("brand"), "text", "Toyota")}
          ${field("model", t("model"), "text", "RAV4")}
          ${field("year", t("year"), "number", "2022")}
          ${field("plate", t("plate"), "text", "123456")}
          ${field("mileage", t("mileage"), "number", "45000")}
          ${field("vin", t("vin"), "text", "")}
          ${textarea("notes", t("notes"), "")}
          <button class="primary" type="submit">${t("saveCar")}</button>
        </form>
      </div>
      <div class="panel">
        <h2>${t("carDetails")}</h2>
        <div class="list">
          ${state.cars.length ? state.cars.map(carCard).join("") : `<p class="muted">${t("noCars")}</p>`}
        </div>
      </div>
    </section>
  `;
}

function bookletView() {
  const car = selectedCar();
  return `
    <section class="grid two-col">
      <div class="panel">
        <h2>${t("addRecord")}</h2>
        ${car ? `
          <p><span class="pill green">${carLabel(car)}</span></p>
          <form class="form" id="record-form">
            ${field("date", t("date"), "date", new Date().toISOString().slice(0, 10))}
            ${field("mileage", t("mileage"), "number", car.mileage || "")}
            ${field("serviceType", t("serviceType"), "text", "Oil change")}
            ${field("parts", t("parts"), "text", "Oil filter, engine oil")}
            ${field("cost", t("cost"), "number", "")}
            ${field("nextDue", t("nextDue"), "date", "")}
            ${field("invoice", t("invoice"), "text", "")}
            ${textarea("notes", t("notes"), "")}
            <button class="primary" type="submit">${t("saveRecord")}</button>
          </form>
        ` : `<p class="muted">${t("noCars")}</p><button class="primary" data-view="cars">${t("addCar")}</button>`}
      </div>
      <div class="panel">
        <h2>${t("records")}</h2>
        <div class="list">
          ${car ? renderRecords(car.id) : `<p class="muted">${t("noRecords")}</p>`}
        </div>
      </div>
    </section>
  `;
}

function shopView() {
  return `
    <section class="panel">
      <div class="shop-tools">
        <strong>${SHOP_URL}</strong>
        <div class="actions">
          <button class="primary" data-open-shop>${t("shop")}</button>
          <a class="ghost" href="${SHOP_URL}" target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;text-decoration:none;">${t("openExternal")}</a>
        </div>
      </div>
      <div class="shop-launcher">
        <div class="shop-logo">S</div>
        <h2>${t("shop")}</h2>
        <p>${t("shopHint")}</p>
        <button class="primary" data-open-shop>${t("shop")}</button>
        <span>${SHOP_URL}</span>
      </div>
    </section>
  `;
}

function profileView() {
  return `
    <section class="panel">
      <h2>${state.user.name}</h2>
      <p class="muted">${state.user.email}</p>
      <div class="actions">
        <button class="ghost" data-reset>${t("reset")}</button>
      </div>
    </section>
  `;
}

function field(name, label, type, value) {
  return `
    <div class="field">
      <label for="${name}">${label}</label>
      <input id="${name}" name="${name}" type="${type}" value="${value || ""}" />
    </div>
  `;
}

function textarea(name, label, value) {
  return `
    <div class="field">
      <label for="${name}">${label}</label>
      <textarea id="${name}" name="${name}">${value || ""}</textarea>
    </div>
  `;
}

function carLabel(car) {
  return `${car.brand || ""} ${car.model || ""} ${car.year || ""}`.trim();
}

function carCard(car) {
  const records = carRecords(car.id).length;
  return `
    <article class="car-card ${selectedCar()?.id === car.id ? "selected" : ""}" data-select-car="${car.id}">
      <div class="row">
        <strong>${carLabel(car)}</strong>
        <span class="pill">${records} ${t("records")}</span>
      </div>
      <div class="muted">${t("plate")}: ${car.plate || "-"} | ${t("mileage")}: ${car.mileage || "-"} km</div>
      <div class="muted">${t("vin")}: ${car.vin || "-"}</div>
      ${car.notes ? `<div>${car.notes}</div>` : ""}
    </article>
  `;
}

function renderRecords(carId) {
  const records = carRecords(carId);
  if (!records.length) return `<p class="muted">${t("noRecords")}</p>`;
  return records.map((record) => `
    <article class="record">
      <div class="row">
        <strong>${record.serviceType}</strong>
        <span class="pill gold">${record.date || "-"}</span>
      </div>
      <p class="muted">${t("mileage")}: ${record.mileage || "-"} km | ${t("cost")}: ${record.cost || "-"}</p>
      <p>${record.parts || ""}</p>
      ${record.invoice ? `<p><span class="pill">${record.invoice}</span></p>` : ""}
      ${record.nextDue ? `<p><span class="pill green">${t("nextDue")}: ${record.nextDue}</span></p>` : ""}
      ${record.notes ? `<p class="muted">${record.notes}</p>` : ""}
    </article>
  `).join("");
}

function formData(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function bindLogin() {
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => setState({ lang: button.dataset.lang }));
  });

  document.querySelector("#login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = formData(event.currentTarget);
    setState({ user: { name: data.name || "Customer", email: data.email || "customer@example.com" } });
  });
}

function bindApp() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => setState({ lang: button.dataset.lang }));
  });

  document.querySelectorAll("[data-select-car]").forEach((card) => {
    card.addEventListener("click", () => setState({ selectedCarId: card.dataset.selectCar }));
  });

  const carForm = document.querySelector("#car-form");
  if (carForm) {
    carForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = formData(carForm);
      if (!String(data.brand || data.model || "").trim()) {
        setState({ notice: t("carRequired") });
        return;
      }
      const car = { id: uid("car"), ...data };
      setState({
        cars: [car, ...state.cars],
        selectedCarId: car.id,
        view: "cars",
        notice: t("carSaved"),
      });
    });
  }

  const recordForm = document.querySelector("#record-form");
  if (recordForm) {
    recordForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const car = selectedCar();
      const record = { id: uid("record"), carId: car.id, ...formData(recordForm) };
      setState({ records: [record, ...state.records], notice: t("recordSaved") });
    });
  }

  const reset = document.querySelector("[data-reset]");
  if (reset) {
    reset.addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY);
      state = loadState();
      render();
    });
  }

  const sample = document.querySelector("[data-sample]");
  if (sample) {
    sample.addEventListener("click", addSampleData);
  }

  document.querySelectorAll("[data-open-shop]").forEach((shopButton) => {
    shopButton.addEventListener("click", () => {
      window.open(SHOP_URL, "_blank", "noopener,noreferrer");
    });
  });
}

function addSampleData() {
  const carId = uid("car");
  setState({
    selectedCarId: carId,
    cars: [
      {
        id: carId,
        brand: "Mercedes-Benz",
        model: "C-Class",
        year: "2021",
        plate: "B 245678",
        mileage: "62000",
        vin: "WDD205...",
        notes: "Customer prefers genuine filters.",
      },
      ...state.cars,
    ],
    records: [
      {
        id: uid("record"),
        carId,
        date: "2026-04-20",
        mileage: "62000",
        serviceType: "Oil change",
        parts: "Engine oil, oil filter, cabin filter",
        cost: "95",
        nextDue: "2026-08-20",
        invoice: "invoice-62000.jpg",
        notes: "Next check after 8,000 km.",
      },
      ...state.records,
    ],
  });
}

render();
