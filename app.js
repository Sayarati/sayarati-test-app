const SHOP_URL = "https://sayarati.online/";
const LOGO_URL = "https://dhgf5mcbrms62.cloudfront.net/43948359/header-L9QsQT/BDSbUBb-200x200.png";
const ECWID_STORE_ID = "43948359";
const ECWID_PUBLIC_TOKEN = "public_m7Uc3kWiEZRAV2yHGuVc2yEWqEfUdsw2";
const STORAGE_KEY = "sayarati-test-app";
const SHOP_CACHE_KEY = "sayarati-shop-cache-v4";
const SHOP_PAGE_SIZE = 24;

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
    overview: "Dashboard",
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
    totalExpenses: "Total expenses",
    expensesByCar: "Expenses by car",
    expenseFilter: "Expense filter",
    thisYear: "This year",
    thisMonth: "This month",
    lastYear: "Last year",
    lastMonth: "Last month",
    chooseYear: "Choose year",
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
    carPhoto: "Car photo",
    otherServiceDetails: "If Other, describe the service",
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
    addNewCar: "Add new car",
    editCar: "Edit car",
    updateCar: "Update car",
    carUpdated: "Vehicle updated.",
    close: "Close",
    serviceSummary: "Service summary",
    serviceDetails: "Service details",
    addAnotherService: "Add another service",
    createdNotification: "Created successfully.",
    redirectingShop: "Opening Sayarati.online...",
    shopInAppNote: "Browse Sayarati products inside the app. Your app navigation stays available.",
    shopLoading: "Loading Sayarati shop...",
    shopHome: "Shop home",
    shopBack: "Back",
    searchProducts: "Search products",
    allCategories: "All categories",
    chooseCategoryFirst: "Choose a category to browse products.",
    loadMore: "Load more",
    productDetails: "Product details",
    addToCart: "Add to cart",
    checkout: "Checkout",
    addedToCart: "Added to cart.",
    inStock: "In stock",
    outOfStock: "Out of stock",
    shopUpdated: "Shop updated.",
    shopError: "Could not load shop products. Try refresh.",
    noProducts: "No products found in this category.",
    refreshShop: "Refresh shop",
    addCarPhoto: "Add car photo",
  },
  ar: {
    appName: "سيارتي",
    subtitle: "دفتر صيانة رقمي للسيارة",
    loginTitle: "أهلاً بك في تطبيق التجربة",
    loginText: "استخدم أي اسم وبريد إلكتروني للدخول إلى العرض التجريبي.",
    name: "الاسم",
    email: "البريد الإلكتروني",
    enter: "دخول التطبيق",
    overview: "لوحة التحكم",
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
    totalExpenses: "إجمالي المصاريف",
    expensesByCar: "المصاريف حسب السيارة",
    expenseFilter: "فلتر المصاريف",
    thisYear: "هذه السنة",
    thisMonth: "هذا الشهر",
    lastYear: "السنة الماضية",
    lastMonth: "الشهر الماضي",
    chooseYear: "اختر السنة",
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
    carPhoto: "صورة السيارة",
    otherServiceDetails: "إذا اخترت أخرى، اكتب تفاصيل الخدمة",
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
    addNewCar: "إضافة سيارة جديدة",
    editCar: "تعديل السيارة",
    updateCar: "تحديث السيارة",
    carUpdated: "تم تحديث السيارة.",
    close: "إغلاق",
    serviceSummary: "ملخص الصيانة",
    serviceDetails: "تفاصيل الصيانة",
    addAnotherService: "إضافة خدمة أخرى",
    createdNotification: "تم الإنشاء بنجاح.",
    redirectingShop: "جارٍ فتح Sayarati.online...",
    shopInAppNote: "تصفح منتجات سيارتي داخل التطبيق مع بقاء أزرار التنقل متاحة.",
    shopLoading: "جارٍ تحميل متجر سيارتي...",
    shopHome: "الرئيسية",
    shopBack: "رجوع",
    searchProducts: "البحث عن منتجات",
    allCategories: "كل الفئات",
    chooseCategoryFirst: "اختر فئة لعرض المنتجات.",
    loadMore: "تحميل المزيد",
    productDetails: "تفاصيل المنتج",
    addToCart: "إضافة إلى السلة",
    checkout: "الدفع",
    addedToCart: "تمت الإضافة إلى السلة.",
    inStock: "متوفر",
    outOfStock: "غير متوفر",
    shopUpdated: "تم تحديث المتجر.",
    shopError: "تعذر تحميل منتجات المتجر. جرّب التحديث.",
    noProducts: "لا توجد منتجات في هذه الفئة.",
    refreshShop: "تحديث المتجر",
    addCarPhoto: "إضافة صورة السيارة",
  },
};

let state = loadState();
let shopState = loadShopCache();

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
    carFormOpen: false,
    serviceMode: "summary",
    selectedRecordId: null,
    expenseFilter: "thisYear",
    expenseYear: String(new Date().getFullYear()),
    editingCarId: null,
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, notice: "" }));
}

function loadShopCache() {
  const empty = {
    categories: [],
    products: [],
    total: 0,
    offset: 0,
    keyword: "",
    categoryId: "",
    loading: false,
    error: "",
    selectedProduct: null,
    cartCount: 0,
    lastLoaded: "",
  };

  try {
    return { ...empty, ...JSON.parse(localStorage.getItem(SHOP_CACHE_KEY) || "{}") };
  } catch {
    return empty;
  }
}

function saveShopCache() {
  localStorage.setItem(SHOP_CACHE_KEY, JSON.stringify({
    categories: shopState.categories,
    products: shopState.products,
    total: shopState.total,
    offset: shopState.offset,
    keyword: shopState.keyword,
    categoryId: shopState.categoryId,
    lastLoaded: shopState.lastLoaded,
  }));
}

function updateShopState(update) {
  shopState = { ...shopState, ...update };
  saveShopCache();
  render();
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

function notify(message) {
  setState({ notice: message });
  clearTimeout(window.sayaratiNoticeTimer);
  window.sayaratiNoticeTimer = setTimeout(() => {
    state = { ...state, notice: "" };
    saveState();
    render();
  }, 2600);
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

function parseCost(value) {
  const number = Number(String(value || "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(number) ? number : 0;
}

function totalExpenses(carId) {
  const records = carId ? state.records.filter((record) => record.carId === carId) : state.records;
  return records
    .filter(recordMatchesExpenseFilter)
    .reduce((sum, record) => sum + parseCost(record.cost), 0);
}

function formatMoney(value) {
  return value ? `$${value.toFixed(2)}` : "$0.00";
}

function recordMatchesExpenseFilter(record) {
  if (!record.date) return false;
  const date = new Date(`${record.date}T00:00:00`);
  const now = new Date();
  const filter = state.expenseFilter || "thisYear";

  if (filter === "thisMonth") {
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
  }
  if (filter === "lastMonth") {
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return date.getFullYear() === lastMonth.getFullYear() && date.getMonth() === lastMonth.getMonth();
  }
  if (filter === "lastYear") return date.getFullYear() === now.getFullYear() - 1;
  if (filter === "year") return String(date.getFullYear()) === String(state.expenseYear || now.getFullYear());
  return date.getFullYear() === now.getFullYear();
}

function availableYears() {
  const years = new Set([new Date().getFullYear()]);
  state.records.forEach((record) => {
    if (record.date) years.add(new Date(`${record.date}T00:00:00`).getFullYear());
  });
  return Array.from(years).sort((a, b) => b - a);
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
  return `
    <section class="panel" style="margin-top: 16px;">
      <div class="row section-head">
        <div>
          <h2>${t("carGarage")}</h2>
          <p class="muted">${t("dashboardText")}</p>
        </div>
        <div class="actions">
          <button class="ghost" data-sample>${t("sample")}</button>
        </div>
      </div>
      <div class="list garage-list">
        ${state.cars.length ? state.cars.map(dashboardCarCard).join("") : `<p class="muted">${t("noCars")}</p>`}
      </div>
      <div class="actions bottom-actions">
        <button class="primary" data-view="cars">${t("addNewCar")}</button>
      </div>
    </section>
    <section class="grid dashboard-grid">
      <div class="panel stat"><span>${t("totalCars")}</span><strong>${state.cars.length}</strong></div>
      <div class="panel stat"><span>${t("totalRecords")}</span><strong>${state.records.length}</strong></div>
      <div class="panel stat"><span>${t("nextService")}</span><strong style="font-size: 24px;">${nextServiceDate()}</strong></div>
      <div class="panel stat"><span>${t("totalExpenses")}</span><strong style="font-size: 24px;">${formatMoney(totalExpenses())}</strong></div>
    </section>
    <section class="panel">
      <div class="row section-head">
        <div>
          <h2>${t("expensesByCar")}</h2>
          <p class="muted">${t("expenseFilter")}</p>
        </div>
        <div class="expense-filter">
          <select data-expense-filter>
            <option value="thisYear" ${state.expenseFilter === "thisYear" ? "selected" : ""}>${t("thisYear")}</option>
            <option value="thisMonth" ${state.expenseFilter === "thisMonth" ? "selected" : ""}>${t("thisMonth")}</option>
            <option value="lastYear" ${state.expenseFilter === "lastYear" ? "selected" : ""}>${t("lastYear")}</option>
            <option value="lastMonth" ${state.expenseFilter === "lastMonth" ? "selected" : ""}>${t("lastMonth")}</option>
            <option value="year" ${state.expenseFilter === "year" ? "selected" : ""}>${t("chooseYear")}</option>
          </select>
          <select data-expense-year ${state.expenseFilter === "year" ? "" : "disabled"}>
            ${availableYears().map((year) => `<option value="${year}" ${String(state.expenseYear) === String(year) ? "selected" : ""}>${year}</option>`).join("")}
          </select>
        </div>
      </div>
      <div class="expense-list">
        ${state.cars.length ? state.cars.map((car) => `
          <div>
            <span>${carLabel(car)}</span>
            <strong>${formatMoney(totalExpenses(car.id))}</strong>
          </div>
        `).join("") : `<p class="muted">${t("noCars")}</p>`}
      </div>
    </section>
  `;
}

function carsView() {
  const editingCar = state.cars.find((car) => car.id === state.editingCarId);
  const formCar = editingCar || {};
  const formBrand = formCar.brand || "Toyota";
  const formModel = formCar.model || modelsForBrand(formBrand)[0] || "";
  return `
    <section class="grid">
      <div class="panel">
        <div class="row section-head">
          <div>
            <h2>${t("carGarage")}</h2>
            <p class="muted">${t("selectedCarHelp")}</p>
          </div>
          <button class="primary" data-toggle-car-form>${state.carFormOpen ? t("close") : t("addNewCar")}</button>
        </div>
        <div class="list">
          ${state.cars.length ? state.cars.map(carCard).join("") : `<p class="muted">${t("noCars")}</p>`}
        </div>
      </div>
      ${state.carFormOpen ? `
        <div class="panel" id="car-form-panel">
          <h2>${editingCar ? t("editCar") : t("addCar")}</h2>
          <form class="form" id="car-form">
            ${selectField("brand", t("brand"), carCatalog.map((item) => item.brand), formBrand, t("chooseBrand"))}
            ${selectField("model", t("model"), modelsForBrand(formBrand), formModel, t("chooseModel"))}
            ${field("year", t("year"), "number", formCar.year || "2022")}
            ${field("plate", t("plate"), "text", formCar.plate || "123456")}
            ${field("mileage", t("mileage"), "number", formCar.mileage || "45000")}
            ${field("vin", t("vin"), "text", formCar.vin || "")}
            ${fileField("carPhoto", t("carPhoto"))}
            ${textarea("notes", t("notes"), formCar.notes || "")}
            <button class="primary" type="submit" data-submit-car>${editingCar ? t("updateCar") : t("saveCar")}</button>
          </form>
        </div>
      ` : ""}
    </section>
  `;
}

function bookletView() {
  const car = selectedCar();
  const record = selectedRecord(car?.id);
  return `
    <section class="grid">
      <div class="panel">
        <div class="field car-picker">
          <label for="bookletCarSelect">${t("chooseCar")}</label>
          <select id="bookletCarSelect" data-booklet-car>
            ${state.cars.length ? state.cars.map((item) => `<option value="${item.id}" ${item.id === car?.id ? "selected" : ""}>${carLabel(item)}</option>`).join("") : `<option value="">${t("noCars")}</option>`}
          </select>
        </div>
        <div class="row section-head">
          <div>
            <h2>${car ? `${t("servicesFor")} ${carLabel(car)}` : t("records")}</h2>
            <p class="muted">${car ? `${t("mileage")}: ${car.mileage || "-"} | ${t("records")}: ${carRecords(car.id).length}` : t("noCars")}</p>
          </div>
          <div class="actions">
            ${car ? `<button class="primary" data-add-service="${car.id}">${t("addServiceHistory")}</button>` : `<button class="primary" data-view="cars">${t("addCar")}</button>`}
          </div>
        </div>
        <div class="list">
          ${car ? renderRecordSummaries(car.id) : `<p class="muted">${t("noRecords")}</p>`}
        </div>
      </div>
      ${state.serviceMode === "detail" && record ? serviceDetailView(record) : ""}
      ${state.serviceMode === "add" ? serviceFormView(car) : ""}
    </section>
  `;
}

function serviceFormView(car) {
  return `
    <div class="panel" id="service-form-panel">
      <div class="row section-head">
        <div>
          <h2>${t("addRecord")}</h2>
          ${car ? `<p><span class="pill green">${carLabel(car)}</span></p>` : ""}
        </div>
        <button class="ghost" data-service-summary>${t("close")}</button>
      </div>
      ${car ? `
        <form class="form" id="record-form">
          ${field("date", t("date"), "date", new Date().toISOString().slice(0, 10))}
          ${field("mileage", t("mileage"), "number", car.mileage || "")}
          ${serviceCheckboxes()}
          ${field("otherServiceDetails", t("otherServiceDetails"), "text", "")}
          ${field("parts", t("parts"), "text", "Oil filter, engine oil")}
          ${field("cost", t("cost"), "number", "")}
          ${field("nextDue", t("nextDue"), "date", "")}
          ${field("invoice", t("invoice"), "text", "")}
          ${fileField("partPhotos", t("partPhotos"))}
          ${textarea("notes", t("notes"), "")}
          <button class="primary" type="submit" data-submit-record>${t("saveRecord")}</button>
        </form>
      ` : `<p class="muted">${t("noCars")}</p>`}
    </div>
  `;
}

function shopView() {
  setTimeout(() => ensureShopLoaded(), 80);
  const activeCategory = shopState.categories.find((category) => String(category.id) === String(shopState.categoryId));

  return `
    <section class="panel">
      <div class="shop-tools">
        <strong>${SHOP_URL}</strong>
        <div class="actions">
          <button class="ghost" data-shop-home>${t("shopHome")}</button>
          <button class="ghost" data-refresh-shop>${t("refreshShop")}</button>
          <button class="primary" data-shop-checkout>${t("checkout")} ${shopState.cartCount ? `(${shopState.cartCount})` : ""}</button>
          <a class="ghost" href="${SHOP_URL}" target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;text-decoration:none;">${t("openExternal")}</a>
        </div>
      </div>
      <div class="custom-shop">
        <div class="shop-filters">
          <input type="search" value="${escapeAttr(shopState.keyword)}" placeholder="${t("searchProducts")}" data-shop-search />
          <select data-shop-category>
            <option value="">${t("allCategories")}</option>
            ${shopState.categories.map((category) => `<option value="${category.id}" ${String(shopState.categoryId) === String(category.id) ? "selected" : ""}>${escapeHtml(category.name)}</option>`).join("")}
          </select>
        </div>
        ${shopState.error ? `<div class="notice shop-error">${shopState.error}</div>` : ""}
        ${shopState.selectedProduct ? productDetailView(shopState.selectedProduct) : shopState.categoryId ? productGridView() : categoryLandingView(activeCategory)}
      </div>
    </section>
  `;
}

function categoryLandingView() {
  if (shopState.loading && !shopState.categories.length) return `<p class="muted">${t("shopLoading")}</p>`;
  return `
    <div class="category-landing">
      <p class="muted">${t("chooseCategoryFirst")}</p>
      <div class="category-grid">
        ${shopState.categories.map((category) => `
          <button class="category-tile" data-category-tile="${category.id}">
            ${categoryImage(category) ? `<img src="${categoryImage(category)}" alt="${escapeAttr(category.name)}" />` : `<span>${escapeHtml(category.name).slice(0, 1)}</span>`}
            <strong>${escapeHtml(category.name)}</strong>
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function categoryImage(category) {
  return category.thumbnailUrl
    || category.imageUrl
    || category.originalImageUrl
    || category.hdThumbnailUrl
    || category.thumbnail?.url
    || category.originalImage?.url
    || category.hdThumbnail?.url
    || "";
}

function productGridView() {
  if (shopState.loading && !shopState.products.length) return `<p class="muted">${t("shopLoading")}</p>`;
  return `
    ${shopState.products.length ? `
      <div class="product-grid">
        ${shopState.products.map(productCard).join("")}
      </div>
    ` : `<p class="muted">${shopState.loading ? t("shopLoading") : t("noProducts")}</p>`}
    <div class="shop-footer-actions">
      <span class="muted">${shopState.products.length} / ${shopState.total || shopState.products.length}</span>
      ${shopState.products.length < shopState.total ? `<button class="primary" data-load-more-products ${shopState.loading ? "disabled" : ""}>${shopState.loading ? t("shopLoading") : t("loadMore")}</button>` : ""}
    </div>
  `;
}

function productCard(product) {
  return `
    <article class="product-card" data-product-id="${product.id}">
      <img src="${product.thumbnailUrl || product.imageUrl || LOGO_URL}" alt="${escapeAttr(product.name)}" />
      <div>
        <strong>${escapeHtml(product.name)}</strong>
        <span>${product.defaultDisplayedPriceFormatted || product.priceInProductList || product.price || ""}</span>
        <small class="${product.inStock === false ? "stock-out" : "stock-in"}">${product.inStock === false ? t("outOfStock") : t("inStock")}</small>
      </div>
    </article>
  `;
}

function productDetailView(product) {
  const images = product.galleryImages?.length ? product.galleryImages : [{ url: product.imageUrl || product.thumbnailUrl || LOGO_URL }];
  return `
    <div class="product-detail" id="shop-detail">
      <button class="ghost back-to-products" data-close-product>← ${t("shopBack")}</button>
      <div class="product-detail-grid">
        <div class="product-images">
          ${images.slice(0, 4).map((image) => `<img src="${image.url || image.thumbnailUrl}" alt="${escapeAttr(product.name)}" />`).join("")}
        </div>
        <div>
          <span class="${product.inStock === false ? "stock-out" : "stock-in"}">${product.inStock === false ? t("outOfStock") : t("inStock")}</span>
          <h2>${escapeHtml(product.name)}</h2>
          <strong class="product-price">${product.defaultDisplayedPriceFormatted || product.price || ""}</strong>
          <div class="product-description">${product.description || ""}</div>
          <div class="actions">
            <button class="primary" data-add-product="${product.id}" ${product.inStock === false ? "disabled" : ""}>${t("addToCart")}</button>
            <button class="ghost" data-shop-checkout>${t("checkout")}</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;",
  })[char]);
}

function escapeAttr(value = "") {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

async function ensureShopLoaded() {
  if (state.view !== "shop" || shopState.loading) return;
  loadEcwidCartScript();
  if (!shopState.categories.length) await loadShopCategories();
  if (shopState.categoryId && !shopState.products.length && !shopState.error) await loadShopProducts({ reset: true });
}

async function ecwidFetch(path, params = {}) {
  const url = new URL(`https://app.ecwid.com/api/v3/${ECWID_STORE_ID}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) url.searchParams.set(key, value);
  });
  const response = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${ECWID_PUBLIC_TOKEN}` },
  });
  if (!response.ok) throw new Error(`Ecwid API error ${response.status}`);
  return response.json();
}

async function loadShopCategories() {
  try {
    const [data, sortData] = await Promise.all([
      ecwidFetch("/categories", {
      limit: 100,
        parent: 0,
        responseFields: "items(id,name,enabled,productCount,parentId,thumbnailUrl,imageUrl,originalImageUrl,hdThumbnailUrl,thumbnail(url),originalImage(url),hdThumbnail(url),orderBy),total",
      }),
      ecwidFetch("/categories/sort", {
        parentCategory: 0,
      }).catch(() => null),
    ]);

    const orderedIds = sortData?.categoryIds || sortData?.ids || [];
    const orderMap = new Map(orderedIds.map((id, index) => [String(id), index]));
    const categories = (data.items || [])
      .filter((category) => category.enabled !== false)
      .filter((category) => Number(category.productCount || 0) > 0)
      .filter((category) => !category.parentId || Number(category.parentId) === 0)
      .sort((a, b) => {
        const aOrder = orderMap.has(String(a.id)) ? orderMap.get(String(a.id)) : Number(a.orderBy ?? 999999);
        const bOrder = orderMap.has(String(b.id)) ? orderMap.get(String(b.id)) : Number(b.orderBy ?? 999999);
        return aOrder - bOrder;
      });
    updateShopState({ categories, error: "" });
  } catch {
    updateShopState({ error: t("shopError") });
  }
}

async function loadShopProducts({ reset = false } = {}) {
  if (shopState.loading) return;
  const offset = reset ? 0 : shopState.products.length;
  updateShopState({ loading: true, error: "" });
  try {
    const data = await ecwidFetch("/products", {
      offset,
      limit: SHOP_PAGE_SIZE,
      keyword: shopState.keyword ? `${shopState.keyword}*` : "",
      category: shopState.categoryId || undefined,
      enabled: true,
      responseFields: "total,count,items(id,sku,name,thumbnailUrl,imageUrl,price,priceInProductList,defaultDisplayedPrice,defaultDisplayedPriceFormatted,inStock,url)",
    });
    updateShopState({
      products: reset ? (data.items || []) : [...shopState.products, ...(data.items || [])],
      total: data.total || 0,
      offset,
      loading: false,
      selectedProduct: null,
      lastLoaded: new Date().toISOString(),
      error: "",
    });
  } catch {
    updateShopState({ loading: false, products: reset ? [] : shopState.products, total: reset ? 0 : shopState.total, error: t("shopError") });
  }
}

async function openProductDetails(productId) {
  updateShopState({ loading: true, error: "" });
  try {
    const product = await ecwidFetch(`/products/${productId}`);
    updateShopState({ selectedProduct: product, loading: false, error: "" });
    scrollAfterRender("shop-detail");
  } catch {
    updateShopState({ loading: false, error: t("shopError") });
  }
}

function loadEcwidCartScript() {
  if (document.getElementById("ecwid-script")) return;
  window.ecwid_script_defer = true;
  const script = document.createElement("script");
  script.id = "ecwid-script";
  script.charset = "utf-8";
  script.type = "text/javascript";
  script.src = `https://app.ecwid.com/script.js?${ECWID_STORE_ID}&data_platform=code`;
  document.body.appendChild(script);
}

function addEcwidProduct(productId) {
  loadEcwidCartScript();
  const add = () => {
    if (!window.Ecwid?.Cart?.addProduct) {
      window.open(`${SHOP_URL}#!/~/cart/create=${encodeURIComponent(JSON.stringify({ products: [{ id: Number(productId), quantity: 1 }] }))}`, "_blank", "noopener,noreferrer");
      return;
    }
    window.Ecwid.Cart.addProduct({
      id: Number(productId),
      quantity: 1,
      callback: (success, product, cart) => {
        updateShopState({ cartCount: cart?.items?.length || shopState.cartCount + 1 });
        notify(success ? t("addedToCart") : t("shopError"));
      },
    });
  };
  setTimeout(add, 300);
}

function openCheckout() {
  window.open(`${SHOP_URL}#!/~/cart`, "_blank", "noopener,noreferrer");
}

function resetShopHome() {
  shopState = { ...shopState, keyword: "", categoryId: "", selectedProduct: null, products: [], total: 0 };
  saveShopCache();
  render();
  if (!shopState.categories.length) loadShopCategories();
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

function carPhoto(car) {
  if (car.photo?.dataUrl) {
    return `<img class="car-photo" src="${car.photo.dataUrl}" alt="${carLabel(car)}" />`;
  }
  return `<div class="car-photo placeholder-car"><span>⌁</span><small>${t("addCarPhoto")}</small></div>`;
}

function dashboardCarCard(car) {
  const records = carRecords(car.id).length;
  return `
    <article class="car-card dashboard-car">
      <div class="car-card-head">
        <label class="photo-upload-trigger" title="${t("addCarPhoto")}">
          ${carPhoto(car)}
          <input type="file" accept="image/*" data-update-car-photo="${car.id}" />
        </label>
        <div>
          <div class="row">
            <strong>${carLabel(car)}</strong>
            <span class="pill">${records} ${t("records")}</span>
          </div>
          <div class="muted">${t("mileage")}: ${car.mileage || "-"} km</div>
          <div class="muted">${t("totalExpenses")}: ${formatMoney(totalExpenses(car.id))}</div>
        </div>
      </div>
    </article>
  `;
}

function carCard(car) {
  const records = carRecords(car.id).length;
  return `
    <article class="car-card ${selectedCar()?.id === car.id ? "selected" : ""}" data-select-car="${car.id}">
      <div class="car-card-head">
        <label class="photo-upload-trigger" title="${t("addCarPhoto")}">
          ${carPhoto(car)}
          <input type="file" accept="image/*" data-update-car-photo="${car.id}" />
        </label>
        <div>
      <div class="row">
        <strong>${carLabel(car)}</strong>
        <span class="pill">${records} ${t("records")}</span>
      </div>
      <div class="muted">${t("plate")}: ${car.plate || "-"} | ${t("mileage")}: ${car.mileage || "-"} km</div>
      <div class="muted">${t("vin")}: ${car.vin || "-"}</div>
        </div>
      </div>
      <div class="actions">
        <button class="ghost" data-open-history="${car.id}">${t("viewHistory")}</button>
        <button class="primary" data-add-service="${car.id}">${t("addServiceHistory")}</button>
        <button class="ghost" data-edit-car="${car.id}">${t("editCar")}</button>
        <button class="danger" data-delete-car="${car.id}">${t("delete")}</button>
      </div>
      ${car.notes ? `<div>${car.notes}</div>` : ""}
    </article>
  `;
}

function renderRecordSummaries(carId) {
  const records = carRecords(carId);
  if (!records.length) return `<p class="muted">${t("noRecords")}</p>`;
  return records.map((record) => `
    <article class="record summary-record" data-view-record="${record.id}">
      <div class="row">
        <strong>${formatServices(record)}</strong>
        <span class="pill gold">${record.date || "-"}</span>
      </div>
      <p class="muted">${t("mileage")}: ${record.mileage || "-"} km | ${t("cost")}: ${record.cost || "-"}</p>
      ${record.nextDue ? `<p><span class="pill green">${t("nextDue")}: ${record.nextDue}</span></p>` : ""}
    </article>
  `).join("");
}

function serviceDetailView(record) {
  return `
    <div class="panel" id="service-detail-panel">
      <div class="row section-head">
        <div>
          <h2>${t("serviceDetails")}</h2>
          <p class="muted">${record.date || "-"} | ${t("mileage")}: ${record.mileage || "-"} km</p>
        </div>
        <div class="actions">
          <button class="ghost" data-service-summary>${t("close")}</button>
          <button class="danger" data-delete-record="${record.id}">${t("delete")}</button>
        </div>
      </div>
      <div class="detail-grid">
        <div><span>${t("selectedServices")}</span><strong>${formatServices(record)}</strong></div>
        <div><span>${t("parts")}</span><strong>${record.parts || "-"}</strong></div>
        <div><span>${t("cost")}</span><strong>${record.cost || "-"}</strong></div>
        <div><span>${t("nextDue")}</span><strong>${record.nextDue || "-"}</strong></div>
        <div><span>${t("invoice")}</span><strong>${record.invoice || "-"}</strong></div>
      </div>
      ${record.notes ? `<p class="muted detail-notes">${record.notes}</p>` : ""}
      ${renderPhotos(record.partPhotos)}
    </div>
  `;
}

function selectedRecord(carId) {
  if (!carId) return null;
  const records = carRecords(carId);
  return records.find((record) => record.id === state.selectedRecordId) || records[0] || null;
}

function formatServices(record) {
  const services = record.serviceTypes?.length ? record.serviceTypes : [record.serviceType].filter(Boolean);
  const namedServices = services.map((service) => {
    if (service === "Other" && record.otherServiceDetails) return `Other: ${record.otherServiceDetails}`;
    return service;
  });
  return namedServices.length ? namedServices.join(", ") : "-";
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

  document.querySelectorAll("[data-toggle-car-form]").forEach((button) => {
    button.addEventListener("click", () => {
      setState({ carFormOpen: !state.carFormOpen, view: "cars", editingCarId: state.carFormOpen ? null : state.editingCarId });
      if (!state.carFormOpen) scrollAfterRender("car-form-panel");
    });
  });

  document.querySelectorAll("[data-edit-car]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      setState({
        selectedCarId: button.dataset.editCar,
        editingCarId: button.dataset.editCar,
        carFormOpen: true,
        view: "cars",
      });
      scrollAfterRender("car-form-panel");
    });
  });

  document.querySelectorAll("[data-open-history]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      setState({
        selectedCarId: button.dataset.openHistory,
        view: "booklet",
        serviceMode: "summary",
        selectedRecordId: null,
      });
    });
  });

  document.querySelectorAll("[data-add-service]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      setState({
        selectedCarId: button.dataset.addService,
        view: "booklet",
        serviceMode: "add",
        selectedRecordId: null,
      });
      scrollAfterRender("service-form-panel");
    });
  });

  document.querySelectorAll("[data-update-car-photo]").forEach((input) => {
    input.addEventListener("click", (event) => event.stopPropagation());
    input.addEventListener("change", async (event) => {
      event.stopPropagation();
      const photos = await readImageFiles(input);
      if (!photos[0]) return;
      setState({
        cars: state.cars.map((car) => car.id === input.dataset.updateCarPhoto ? { ...car, photo: photos[0] } : car),
      });
      notify(t("carSaved"));
    });
  });

  document.querySelectorAll("[data-view-record]").forEach((record) => {
    record.addEventListener("click", () => {
      setState({ selectedRecordId: record.dataset.viewRecord, serviceMode: "detail" });
      scrollAfterRender("service-detail-panel");
    });
  });

  document.querySelectorAll("[data-booklet-car]").forEach((select) => {
    select.addEventListener("change", () => {
      setState({
        selectedCarId: select.value,
        serviceMode: "summary",
        selectedRecordId: null,
      });
    });
  });

  document.querySelectorAll("[data-service-summary]").forEach((button) => {
    button.addEventListener("click", () => setState({ serviceMode: "summary", selectedRecordId: null }));
  });

  document.querySelectorAll("[data-expense-filter]").forEach((select) => {
    select.addEventListener("change", () => setState({ expenseFilter: select.value }));
  });

  document.querySelectorAll("[data-expense-year]").forEach((select) => {
    select.addEventListener("change", () => setState({ expenseFilter: "year", expenseYear: select.value }));
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
        serviceMode: "summary",
        selectedRecordId: null,
      });
      notify(t("carDeleted"));
    });
  });

  document.querySelectorAll("[data-delete-record]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const recordId = button.dataset.deleteRecord;
      if (!confirm(t("deleteRecordConfirm"))) return;
      setState({
        records: state.records.filter((record) => record.id !== recordId),
      });
      notify(t("recordDeleted"));
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

    carForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = formData(carForm);
      if (!String(data.brand || "").trim() || !String(data.model || "").trim()) {
        setState({ notice: t("carRequired") });
        return;
      }
      const submit = carForm.querySelector("[data-submit-car]");
      if (submit?.disabled) return;
      if (submit) submit.disabled = true;
      const photos = await readImageFiles(carForm.querySelector("#carPhoto"));
      delete data.carPhoto;
      const car = { id: uid("car"), ...data, photo: photos[0] || null };
      if (state.editingCarId) {
        setState({
          cars: state.cars.map((existingCar) => existingCar.id === state.editingCarId
            ? { ...existingCar, ...data, photo: photos[0] || existingCar.photo || null }
            : existingCar),
          selectedCarId: state.editingCarId,
          view: "cars",
          carFormOpen: false,
          editingCarId: null,
        });
        notify(t("carUpdated"));
      } else {
        setState({
          cars: [car, ...state.cars],
          selectedCarId: car.id,
          view: "overview",
          carFormOpen: false,
          editingCarId: null,
        });
        notify(t("carSaved"));
      }
      scrollAfterRender("app");
    });
  }

  const recordForm = document.querySelector("#record-form");
  if (recordForm) {
    recordForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const car = selectedCar();
      const submit = recordForm.querySelector("[data-submit-record]");
      if (submit?.disabled) return;
      if (submit) submit.disabled = true;
      const data = formData(recordForm);
      const services = checkedValues(recordForm, "serviceTypes");
      const partPhotos = await readImageFiles(recordForm.querySelector("#partPhotos"));
      delete data.partPhotos;
      delete data.serviceTypes;
      const record = {
        id: uid("record"),
        carId: car.id,
        ...data,
        serviceType: services[0] || "",
        serviceTypes: services,
        partPhotos,
      };
      setState({
        records: [record, ...state.records],
        serviceMode: "summary",
        selectedRecordId: record.id,
      });
      notify(t("recordSaved"));
      scrollAfterRender("app");
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

  document.querySelectorAll("[data-shop-home]").forEach((shopButton) => {
    shopButton.addEventListener("click", resetShopHome);
  });

  document.querySelectorAll("[data-refresh-shop]").forEach((shopButton) => {
    shopButton.addEventListener("click", async () => {
      shopState = {
        ...shopState,
        categories: [],
        products: [],
        total: 0,
        categoryId: "",
        selectedProduct: null,
        error: "",
      };
      saveShopCache();
      render();
      await loadShopCategories();
      notify(t("shopUpdated"));
    });
  });

  document.querySelectorAll("[data-shop-checkout]").forEach((shopButton) => {
    shopButton.addEventListener("click", openCheckout);
  });

  document.querySelectorAll("[data-shop-search]").forEach((input) => {
    input.addEventListener("input", () => {
      clearTimeout(window.sayaratiShopSearchTimer);
      window.sayaratiShopSearchTimer = setTimeout(() => {
        shopState = { ...shopState, keyword: input.value, products: [], total: 0, selectedProduct: null };
        saveShopCache();
        loadShopProducts({ reset: true });
      }, 420);
    });
  });

  document.querySelectorAll("[data-shop-category]").forEach((select) => {
    select.addEventListener("change", () => {
      shopState = { ...shopState, categoryId: select.value, products: [], total: 0, selectedProduct: null, error: "", loading: false };
      saveShopCache();
      if (select.value) loadShopProducts({ reset: true });
      else render();
    });
  });

  document.querySelectorAll("[data-category-tile]").forEach((button) => {
    button.addEventListener("click", () => {
      shopState = { ...shopState, categoryId: button.dataset.categoryTile, products: [], total: 0, selectedProduct: null, error: "", loading: false };
      saveShopCache();
      render();
      loadShopProducts({ reset: true });
    });
  });

  document.querySelectorAll("[data-load-more-products]").forEach((button) => {
    button.addEventListener("click", () => loadShopProducts());
  });

  document.querySelectorAll("[data-product-id]").forEach((card) => {
    card.addEventListener("click", () => openProductDetails(card.dataset.productId));
  });

  document.querySelectorAll("[data-close-product]").forEach((button) => {
    button.addEventListener("click", () => updateShopState({ selectedProduct: null }));
  });

  document.querySelectorAll("[data-add-product]").forEach((button) => {
    button.addEventListener("click", () => addEcwidProduct(button.dataset.addProduct));
  });
}

function scrollAfterRender(id) {
  setTimeout(() => {
    const target = id === "app" ? document.querySelector(".main") : document.getElementById(id);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 60);
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
