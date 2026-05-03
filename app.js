const SHOP_URL = "https://sayarati.online/";
const LOGO_URL = "https://dhgf5mcbrms62.cloudfront.net/43948359/header-L9QsQT/BDSbUBb-200x200.png";
const STORAGE_KEY = "sayarati-test-app";

const carCatalog = [
  { brand: "Acura", models: ["ILX", "Integra", "MDX", "RDX", "TLX"] },
  { brand: "Alfa Romeo", models: ["Giulia", "Giulietta", "Stelvio", "Tonale"] },
  { brand: "Aston Martin", models: ["DB11", "DB12", "DBX", "Vantage"] },
  { brand: "Audi", models: ["A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "e-tron"] },
  { brand: "BMW", models: ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X6", "X7", "iX"] },
  { brand: "BYD", models: ["Atto 3", "Dolphin", "Han", "Seal", "Song Plus", "Tang"] },
  { brand: "Cadillac", models: ["CT4", "CT5", "Escalade", "XT4", "XT5", "XT6"] },
  { brand: "Chery", models: ["Arrizo 5", "Tiggo 2", "Tiggo 4", "Tiggo 7", "Tiggo 8"] },
  { brand: "Chevrolet", models: ["Aveo", "Camaro", "Captiva", "Corvette", "Cruze", "Malibu", "Silverado", "Spark", "Tahoe", "Trailblazer"] },
  { brand: "Citroen", models: ["C3", "C3 Aircross", "C4", "C5 Aircross", "Berlingo"] },
  { brand: "Dacia", models: ["Duster", "Logan", "Sandero", "Stepway"] },
  { brand: "Dodge", models: ["Challenger", "Charger", "Durango", "Ram"] },
  { brand: "Ferrari", models: ["296", "812", "F8", "Portofino", "Purosangue", "Roma"] },
  { brand: "Fiat", models: ["500", "500X", "Doblo", "Panda", "Tipo"] },
  { brand: "Ford", models: ["Bronco", "EcoSport", "Edge", "Escape", "Explorer", "F-150", "Fiesta", "Focus", "Mustang", "Ranger", "Territory"] },
  { brand: "Geely", models: ["Azkarra", "Coolray", "Emgrand", "Geometry C", "Monjaro", "Okavango"] },
  { brand: "GMC", models: ["Acadia", "Sierra", "Terrain", "Yukon"] },
  { brand: "Honda", models: ["Accord", "City", "Civic", "CR-V", "HR-V", "Jazz", "Pilot"] },
  { brand: "Hyundai", models: ["Accent", "Creta", "Elantra", "i10", "i20", "Kona", "Santa Fe", "Sonata", "Tucson", "Venue"] },
  { brand: "Infiniti", models: ["Q30", "Q50", "Q60", "QX50", "QX55", "QX60", "QX80"] },
  { brand: "Isuzu", models: ["D-Max", "MU-X"] },
  { brand: "Jaguar", models: ["E-Pace", "F-Pace", "F-Type", "I-Pace", "XE", "XF"] },
  { brand: "Jeep", models: ["Cherokee", "Compass", "Gladiator", "Grand Cherokee", "Renegade", "Wrangler"] },
  { brand: "Kia", models: ["Carnival", "Cerato", "K5", "Picanto", "Rio", "Seltos", "Sorento", "Sportage", "Telluride"] },
  { brand: "Land Rover", models: ["Defender", "Discovery", "Discovery Sport", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar"] },
  { brand: "Lexus", models: ["ES", "GS", "GX", "IS", "LC", "LS", "LX", "NX", "RX", "UX"] },
  { brand: "Maserati", models: ["Ghibli", "GranTurismo", "Grecale", "Levante", "Quattroporte"] },
  { brand: "Mazda", models: ["2", "3", "6", "CX-3", "CX-30", "CX-5", "CX-9", "MX-5"] },
  { brand: "Mercedes-Benz", models: ["A-Class", "C-Class", "CLA", "CLS", "E-Class", "G-Class", "GLA", "GLB", "GLC", "GLE", "GLS", "S-Class", "V-Class"] },
  { brand: "MG", models: ["3", "5", "6", "GT", "HS", "RX5", "ZS", "ZS EV"] },
  { brand: "Mini", models: ["Clubman", "Cooper", "Countryman"] },
  { brand: "Mitsubishi", models: ["ASX", "Attrage", "Eclipse Cross", "L200", "Mirage", "Montero", "Outlander", "Pajero"] },
  { brand: "Nissan", models: ["Altima", "Armada", "Juke", "Kicks", "Micra", "Murano", "Navara", "Patrol", "Qashqai", "Sentra", "Sunny", "X-Trail"] },
  { brand: "Opel", models: ["Astra", "Corsa", "Crossland", "Grandland", "Mokka"] },
  { brand: "Peugeot", models: ["2008", "208", "3008", "301", "308", "5008", "Partner"] },
  { brand: "Porsche", models: ["718", "911", "Cayenne", "Macan", "Panamera", "Taycan"] },
  { brand: "Renault", models: ["Captur", "Clio", "Duster", "Koleos", "Megane", "Symbol", "Trafic"] },
  { brand: "Seat", models: ["Arona", "Ateca", "Ibiza", "Leon", "Tarraco"] },
  { brand: "Skoda", models: ["Fabia", "Kamiq", "Karoq", "Kodiaq", "Octavia", "Superb"] },
  { brand: "Subaru", models: ["BRZ", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "WRX", "XV"] },
  { brand: "Suzuki", models: ["Baleno", "Ciaz", "Ertiga", "Jimny", "Swift", "Vitara"] },
  { brand: "Tesla", models: ["Model 3", "Model S", "Model X", "Model Y"] },
  { brand: "Toyota", models: ["4Runner", "Camry", "Corolla", "C-HR", "Fortuner", "Hilux", "Land Cruiser", "Prado", "Prius", "RAV4", "Rush", "Yaris"] },
  { brand: "Volkswagen", models: ["Arteon", "Golf", "ID.4", "Jetta", "Passat", "Polo", "T-Cross", "Tiguan", "Touareg"] },
  { brand: "Volvo", models: ["S60", "S90", "V60", "XC40", "XC60", "XC90"] },
  { brand: "Other", models: ["Other"] },
];

const serviceTypes = [
  "Oil change",
  "Oil filter",
  "Air filter",
  "Cabin filter",
  "Brake pads",
  "Brake discs",
  "Tires",
  "Battery",
  "Spark plugs",
  "Transmission service",
  "Coolant service",
  "AC service",
  "Wheel alignment",
  "Inspection",
  "Repair",
  "Other",
];

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
    mileage: "Mileage (km)",
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
    carSaved: "Your car was successfully created.",
    carRequired: "Please choose the car brand and model.",
    recordSaved: "Service record saved.",
    delete: "Delete",
    deleteCarConfirm: "Delete this vehicle and all its service records?",
    deleteRecordConfirm: "Delete this service record?",
    carDeleted: "Vehicle deleted.",
    recordDeleted: "Service record deleted.",
    partPhotos: "Photos of changed parts",
    selectedServices: "Selected services",
    chooseBrand: "Choose brand",
    chooseModel: "Choose model",
    chooseService: "Choose service",
    chooseCar: "Choose a car",
    carGarage: "Your cars",
    selectedCarHelp: "Select a car first, then view its service history or add a new service.",
    viewHistory: "View history",
    addServiceHistory: "Add service",
    servicesFor: "Services for",
    latestRecords: "Latest service records",
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
    mileage: "عداد الكيلومترات (كم)",
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
    carSaved: "تم إنشاء سيارتك بنجاح.",
    carRequired: "يرجى اختيار شركة السيارة والموديل.",
    recordSaved: "تم حفظ سجل الصيانة.",
    delete: "حذف",
    deleteCarConfirm: "هل تريد حذف هذه السيارة وكل سجلات الصيانة الخاصة بها؟",
    deleteRecordConfirm: "هل تريد حذف سجل الصيانة هذا؟",
    carDeleted: "تم حذف السيارة.",
    recordDeleted: "تم حذف سجل الصيانة.",
    partPhotos: "صور القطع المستبدلة",
    selectedServices: "الخدمات المختارة",
    chooseBrand: "اختر الشركة",
    chooseModel: "اختر الموديل",
    chooseService: "اختر الخدمة",
    chooseCar: "اختر سيارة",
    carGarage: "سياراتك",
    selectedCarHelp: "اختر سيارة أولاً، ثم شاهد سجل الصيانة أو أضف خدمة جديدة.",
    viewHistory: "عرض السجل",
    addServiceHistory: "إضافة خدمة",
    servicesFor: "الخدمات الخاصة بـ",
    latestRecords: "آخر سجلات الصيانة",
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

function nextServiceDate(carId) {
  const records = carId ? state.records.filter((record) => record.carId === carId) : state.records;
  const dates = records
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
          <div class="logo-box"><img src="${LOGO_URL}" alt="SAYARATI.online" /></div>
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
          <div class="logo-box"><img src="${LOGO_URL}" alt="SAYARATI.online" /></div>
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
  const car = selectedCar();
  return `
    <section class="grid dashboard-grid">
      <div class="panel stat"><span>${t("totalCars")}</span><strong>${state.cars.length}</strong></div>
      <div class="panel stat"><span>${t("totalRecords")}</span><strong>${state.records.length}</strong></div>
      <div class="panel stat"><span>${t("nextService")}</span><strong style="font-size: 24px;">${nextServiceDate(car?.id)}</strong></div>
    </section>
    <section class="panel" style="margin-top: 16px;">
      <div class="row section-head">
        <div>
          <h2>${t("chooseCar")}</h2>
          <p class="muted">${t("selectedCarHelp")}</p>
        </div>
        <div class="actions">
          <button class="ghost" data-sample>${t("sample")}</button>
          <button class="primary" data-view="cars">${t("addCar")}</button>
        </div>
      </div>
      <div class="list garage-list">
        ${state.cars.length ? state.cars.map(carCard).join("") : `<p class="muted">${t("noCars")}</p>`}
      </div>
      ${car ? `
        <div class="selected-car-panel">
          <div>
            <span class="pill green">${t("selectedCar")}</span>
            <h3>${carLabel(car)}</h3>
            <p class="muted">${t("mileage")}: ${car.mileage || "-"} | ${t("records")}: ${carRecords(car.id).length}</p>
          </div>
          <div class="actions">
            <button class="ghost" data-view="booklet">${t("viewHistory")}</button>
            <button class="primary" data-view="booklet">${t("addServiceHistory")}</button>
          </div>
        </div>
      ` : ""}
    </section>
  `;
}

function carsView() {
  return `
    <section class="grid two-col">
      <div class="panel">
        <h2>${t("addCar")}</h2>
        <form class="form" id="car-form">
          ${selectField("brand", t("brand"), carCatalog.map((item) => item.brand), "Toyota", t("chooseBrand"))}
          ${selectField("model", t("model"), modelsForBrand("Toyota"), "RAV4", t("chooseModel"))}
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
          ${serviceCheckboxes()}
          ${field("parts", t("parts"), "text", "Oil filter, engine oil")}
          ${field("cost", t("cost"), "number", "")}
          ${field("nextDue", t("nextDue"), "date", "")}
          ${field("invoice", t("invoice"), "text", "")}
          ${fileField("partPhotos", t("partPhotos"))}
          ${textarea("notes", t("notes"), "")}
            <button class="primary" type="submit">${t("saveRecord")}</button>
          </form>
        ` : `<p class="muted">${t("noCars")}</p><button class="primary" data-view="cars">${t("addCar")}</button>`}
      </div>
      <div class="panel">
        <h2>${car ? `${t("servicesFor")} ${carLabel(car)}` : t("records")}</h2>
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
        <div class="shop-logo"><img src="${LOGO_URL}" alt="SAYARATI.online" /></div>
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

function selectField(name, label, options, value, placeholder) {
  return `
    <div class="field">
      <label for="${name}">${label}</label>
      <select id="${name}" name="${name}">
        <option value="">${placeholder}</option>
        ${options.map((option) => `<option value="${option}" ${option === value ? "selected" : ""}>${option}</option>`).join("")}
      </select>
    </div>
  `;
}

function serviceCheckboxes() {
  return `
    <div class="field">
      <label>${t("serviceType")}</label>
      <div class="checkbox-grid">
        ${serviceTypes.map((service) => `
          <label class="check-option">
            <input type="checkbox" name="serviceTypes" value="${service}" ${service === "Oil change" ? "checked" : ""} />
            <span>${service}</span>
          </label>
        `).join("")}
      </div>
    </div>
  `;
}

function fileField(name, label) {
  return `
    <div class="field">
      <label for="${name}">${label}</label>
      <input id="${name}" name="${name}" type="file" accept="image/*" multiple />
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

function modelsForBrand(brand) {
  return (carCatalog.find((item) => item.brand === brand) || carCatalog[0]).models;
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
      <div class="actions">
        <button class="ghost" data-select-car="${car.id}" data-view="booklet">${t("viewHistory")}</button>
        <button class="primary" data-select-car="${car.id}" data-view="booklet">${t("addServiceHistory")}</button>
        <button class="danger" data-delete-car="${car.id}">${t("delete")}</button>
      </div>
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
        <strong>${formatServices(record)}</strong>
        <span class="pill gold">${record.date || "-"}</span>
      </div>
      <p class="muted">${t("mileage")}: ${record.mileage || "-"} km | ${t("cost")}: ${record.cost || "-"}</p>
      <p>${record.parts || ""}</p>
      ${renderPhotos(record.partPhotos)}
      ${record.invoice ? `<p><span class="pill">${record.invoice}</span></p>` : ""}
      ${record.nextDue ? `<p><span class="pill green">${t("nextDue")}: ${record.nextDue}</span></p>` : ""}
      ${record.notes ? `<p class="muted">${record.notes}</p>` : ""}
      <div class="actions">
        <button class="danger" data-delete-record="${record.id}">${t("delete")}</button>
      </div>
    </article>
  `).join("");
}

function formatServices(record) {
  const services = record.serviceTypes?.length ? record.serviceTypes : [record.serviceType].filter(Boolean);
  return services.length ? services.join(", ") : "-";
}

function renderPhotos(photos = []) {
  if (!photos.length) return "";
  return `
    <div class="photo-grid">
      ${photos.map((photo) => `
        <figure>
          <img src="${photo.dataUrl}" alt="${photo.name}" />
          <figcaption>${photo.name}</figcaption>
        </figure>
      `).join("")}
    </div>
  `;
}

function formData(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function checkedValues(form, name) {
  return Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
}

function readImageFiles(input) {
  const files = Array.from(input?.files || []);
  return Promise.all(files.map((file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ name: file.name, dataUrl: reader.result });
    reader.onerror = () => resolve({ name: file.name, dataUrl: "" });
    reader.readAsDataURL(file);
  }))).then((photos) => photos.filter((photo) => photo.dataUrl));
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

  document.querySelectorAll("[data-delete-car]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const carId = button.dataset.deleteCar;
      if (!confirm(t("deleteCarConfirm"))) return;
      const remainingCars = state.cars.filter((car) => car.id !== carId);
      setState({
        cars: remainingCars,
        records: state.records.filter((record) => record.carId !== carId),
        selectedCarId: remainingCars[0]?.id || null,
        view: "overview",
        notice: t("carDeleted"),
      });
    });
  });

  document.querySelectorAll("[data-delete-record]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const recordId = button.dataset.deleteRecord;
      if (!confirm(t("deleteRecordConfirm"))) return;
      setState({
        records: state.records.filter((record) => record.id !== recordId),
        notice: t("recordDeleted"),
      });
    });
  });

  const carForm = document.querySelector("#car-form");
  if (carForm) {
    const brandSelect = carForm.querySelector("#brand");
    const modelSelect = carForm.querySelector("#model");
    if (brandSelect && modelSelect) {
      brandSelect.addEventListener("change", () => {
        const models = modelsForBrand(brandSelect.value);
        modelSelect.innerHTML = `<option value="">${t("chooseModel")}</option>${models.map((model) => `<option value="${model}">${model}</option>`).join("")}`;
      });
    }

    carForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = formData(carForm);
      if (!String(data.brand || "").trim() || !String(data.model || "").trim()) {
        setState({ notice: t("carRequired") });
        return;
      }
      const car = { id: uid("car"), ...data };
      setState({
        cars: [car, ...state.cars],
        selectedCarId: car.id,
        view: "overview",
        notice: t("carSaved"),
      });
    });
  }

  const recordForm = document.querySelector("#record-form");
  if (recordForm) {
    recordForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const car = selectedCar();
      const data = formData(recordForm);
      const services = checkedValues(recordForm, "serviceTypes");
      const partPhotos = await readImageFiles(recordForm.querySelector("#partPhotos"));
      const record = {
        id: uid("record"),
        carId: car.id,
        ...data,
        serviceType: services[0] || "",
        serviceTypes: services,
        partPhotos,
      };
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
        serviceTypes: ["Oil change", "Oil filter", "Cabin filter"],
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
