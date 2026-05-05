const SHOP_URL = "https://sayarati.online/";
const LOGO_URL = "https://dhgf5mcbrms62.cloudfront.net/43948359/header-L9QsQT/BDSbUBb-200x200.png";
const ECWID_STORE_ID = "43948359";
const ECWID_PUBLIC_TOKEN = "public_m7Uc3kWiEZRAV2yHGuVc2yEWqEfUdsw2";
const STORAGE_KEY = "sayarati-test-app";
const SHOP_CACHE_KEY = "sayarati-shop-cache-v10";
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

const oilViscosities = ["0W-20", "0W-30", "5W-20", "5W-30", "5W-40", "10W-30", "10W-40", "15W-40", "20W-50", "Other"];
const brakePadPositions = ["Front", "Rear", "Front and rear"];

const copy = {
  en: {
    appName: "Sayarati",
    subtitle: "Digital car service booklet",
    loginTitle: "Welcome to your Digital service booklet by Sayarati.online",
    loginText: "Enter your name and email to start.",
    name: "Name",
    email: "Email",
    enter: "Enter App",
    overview: "Dashboard",
    cars: "My Cars",
    booklet: "Service History",
    shop: "Shop",
    profile: "Profile",
    myDashboard: "My dashboard",
    myCars: "My cars",
    myServiceHistory: "My service history",
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
    oilDetails: "Oil details",
    oilViscosity: "Oil type / viscosity",
    chooseOilType: "Choose oil type",
    oilLiters: "Oil quantity (liters)",
    brakePadDetails: "Brake pad details",
    brakePadPosition: "Brake pads position",
    chooseBrakePosition: "Choose position",
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
    recordUpdated: "Service record updated.",
    editRecord: "Edit service",
    updateRecord: "Update record",
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
    backToCategories: "Back to categories",
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
    serviceFilter: "Service filter",
    allServiceRecords: "All services",
    beforeThisYear: "Year before",
    specificDate: "Certain date",
    specificMileage: "Mileage from",
    sortProducts: "Sort products",
    defaultSort: "Default order",
    priceLowHigh: "Price low to high",
    priceHighLow: "Price high to low",
    nameAZ: "Name A-Z",
    stockFilter: "Availability",
    allProducts: "All products",
    inStockOnly: "In stock only",
    outOfStockOnly: "Out of stock only",
    filterAll: "All",
    tourNext: "Next",
    tourBack: "Back",
    tourSkip: "Skip",
    tourDone: "Done",
    tourCount: "Step",
    tourWelcomeTitle: "Welcome to your digital service booklet",
    tourWelcomeText: "Let me give you a quick tour so you know how to use the app.",
    tour1Title: "Your garage",
    tour1Text: "This is where your saved cars appear with their photos and key details.",
    tour2Title: "Add a car",
    tour2Text: "Tap here to create a new vehicle profile with brand, model, mileage, plate, and photo.",
    tour3Title: "Open history",
    tour3Text: "Use View history to see all service records for a specific car.",
    tour4Title: "Add service",
    tour4Text: "Add oil changes, filters, repairs, costs, mileage, dates, and photos of changed parts.",
    tour5Title: "Dashboard totals",
    tour5Text: "These cards summarize your cars, service records, next service date, and total expenses.",
    tour6Title: "Expense filter",
    tour6Text: "Filter expenses by this month, this year, last year, or a selected year.",
    tour7Title: "Service History tab",
    tour7Text: "This tab lets you select a car and view or filter its full maintenance history.",
    tour8Title: "Shop tab",
    tour8Text: "Browse Sayarati products, categories, search, filters, product details, and checkout.",
    tour9Title: "Language",
    tour9Text: "Switch between English and Arabic from here.",
    tour10Title: "Profile",
    tour10Text: "Open your profile from the initial circle. You can reset demo data there.",
  },
  ar: {
    appName: "Ø³ÙŠØ§Ø±ØªÙŠ",
    subtitle: "Ø¯ÙØªØ± ØµÙŠØ§Ù†Ø© Ø±Ù‚Ù…ÙŠ Ù„Ù„Ø³ÙŠØ§Ø±Ø©",
    loginTitle: "Ø£Ù‡Ù„Ø§Ù‹ Ø¨Ùƒ ÙÙŠ ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„ØªØ¬Ø±Ø¨Ø©",
    loginText: "Ø§Ø³ØªØ®Ø¯Ù… Ø£ÙŠ Ø§Ø³Ù… ÙˆØ¨Ø±ÙŠØ¯ Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ Ù„Ù„Ø¯Ø®ÙˆÙ„ Ø¥Ù„Ù‰ Ø§Ù„Ø¹Ø±Ø¶ Ø§Ù„ØªØ¬Ø±ÙŠØ¨ÙŠ.",
    name: "Ø§Ù„Ø§Ø³Ù…",
    email: "Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ",
    enter: "Ø¯Ø®ÙˆÙ„ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚",
    overview: "Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ…",
    cars: "Ø³ÙŠØ§Ø±Ø§ØªÙŠ",
    booklet: "Ø¯ÙØªØ± Ø§Ù„ØµÙŠØ§Ù†Ø©",
    shop: "Ø§Ù„Ù…ØªØ¬Ø±",
    profile: "Ø§Ù„Ù…Ù„Ù Ø§Ù„Ø´Ø®ØµÙŠ",
    addCar: "Ø¥Ø¶Ø§ÙØ© Ø³ÙŠØ§Ø±Ø©",
    carDetails: "ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ø³ÙŠØ§Ø±Ø©",
    brand: "Ø§Ù„Ø´Ø±ÙƒØ©",
    model: "Ø§Ù„Ù…ÙˆØ¯ÙŠÙ„",
    year: "Ø§Ù„Ø³Ù†Ø©",
    plate: "Ø±Ù‚Ù… Ø§Ù„Ù„ÙˆØ­Ø©",
    mileage: "Ø¹Ø¯Ø§Ø¯ Ø§Ù„ÙƒÙŠÙ„ÙˆÙ…ØªØ±Ø§Øª (ÙƒÙ…)",
    vin: "Ø±Ù‚Ù… Ø§Ù„Ø´Ø§Ø³ÙŠÙ‡",
    notes: "Ù…Ù„Ø§Ø­Ø¸Ø§Øª",
    saveCar: "Ø­ÙØ¸ Ø§Ù„Ø³ÙŠØ§Ø±Ø©",
    addRecord: "Ø¥Ø¶Ø§ÙØ© Ø³Ø¬Ù„ ØµÙŠØ§Ù†Ø©",
    serviceType: "Ù†ÙˆØ¹ Ø§Ù„ØµÙŠØ§Ù†Ø©",
    date: "Ø§Ù„ØªØ§Ø±ÙŠØ®",
    parts: "Ø§Ù„Ù‚Ø·Ø¹ Ø§Ù„Ù…Ø³ØªØ¨Ø¯Ù„Ø©",
    cost: "Ø§Ù„ÙƒÙ„ÙØ©",
    nextDue: "Ù…ÙˆØ¹Ø¯ Ø§Ù„ØµÙŠØ§Ù†Ø© Ø§Ù„Ù‚Ø§Ø¯Ù…Ø©",
    invoice: "Ø§Ø³Ù… ØµÙˆØ±Ø© Ø§Ù„ÙØ§ØªÙˆØ±Ø©",
    saveRecord: "Ø­ÙØ¸ Ø§Ù„Ø³Ø¬Ù„",
    records: "Ø§Ù„Ø³Ø¬Ù„Ø§Øª",
    noCars: "Ù„Ø§ ØªÙˆØ¬Ø¯ Ø³ÙŠØ§Ø±Ø§Øª Ø¨Ø¹Ø¯. Ø£Ø¶Ù Ø£ÙˆÙ„ Ø³ÙŠØ§Ø±Ø©.",
    noRecords: "Ù„Ø§ ØªÙˆØ¬Ø¯ Ø³Ø¬Ù„Ø§Øª ØµÙŠØ§Ù†Ø© Ø¨Ø¹Ø¯.",
    selectedCar: "Ø§Ù„Ø³ÙŠØ§Ø±Ø© Ø§Ù„Ù…Ø®ØªØ§Ø±Ø©",
    openExternal: "ÙØªØ­ ÙÙŠ Ø§Ù„Ù…ØªØµÙØ­",
    shopHint: "ÙÙŠ Ù†Ø³Ø®Ø© Ø§Ù„ØªØ¬Ø±Ø¨Ø© Ø§ÙØªØ­ Ø§Ù„Ù…ØªØ¬Ø± Ù…Ù† Ø§Ù„Ø²Ø± Ø£Ø¯Ù†Ø§Ù‡. ÙÙŠ ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ù‡Ø§ØªÙ Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠ Ø³ØªØ¹Ù…Ù„ Ù‡Ø°Ù‡ Ø§Ù„ØµÙØ­Ø© Ù…Ù† Ø®Ù„Ø§Ù„ WebView Ù„ÙŠØ¨Ù‚Ù‰ Ø§Ù„Ø¹Ù…ÙŠÙ„ Ø¯Ø§Ø®Ù„ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚.",
    profileTitle: "Ù…Ù„Ù Ø§Ù„Ø¹Ù…ÙŠÙ„",
    reset: "Ù…Ø³Ø­ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„ØªØ¬Ø±Ø¨Ø©",
    totalCars: "Ø§Ù„Ø³ÙŠØ§Ø±Ø§Øª",
    totalRecords: "Ø³Ø¬Ù„Ø§Øª Ø§Ù„ØµÙŠØ§Ù†Ø©",
    nextService: "Ø§Ù„ØµÙŠØ§Ù†Ø© Ø§Ù„Ù‚Ø§Ø¯Ù…Ø©",
    totalExpenses: "Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ù…ØµØ§Ø±ÙŠÙ",
    expensesByCar: "Ø§Ù„Ù…ØµØ§Ø±ÙŠÙ Ø­Ø³Ø¨ Ø§Ù„Ø³ÙŠØ§Ø±Ø©",
    expenseFilter: "ÙÙ„ØªØ± Ø§Ù„Ù…ØµØ§Ø±ÙŠÙ",
    thisYear: "Ù‡Ø°Ù‡ Ø§Ù„Ø³Ù†Ø©",
    thisMonth: "Ù‡Ø°Ø§ Ø§Ù„Ø´Ù‡Ø±",
    lastYear: "Ø§Ù„Ø³Ù†Ø© Ø§Ù„Ù…Ø§Ø¶ÙŠØ©",
    lastMonth: "Ø§Ù„Ø´Ù‡Ø± Ø§Ù„Ù…Ø§Ø¶ÙŠ",
    chooseYear: "Ø§Ø®ØªØ± Ø§Ù„Ø³Ù†Ø©",
    dashboardTitle: "Ù…Ø±Ø¢Ø¨Ùƒ ÙÙŠ Ù„Ù…Ø­Ø©",
    dashboardText: "ØªØ§Ø¨Ø¹ Ø§Ù„Ø³ÙŠØ§Ø±Ø§Øª ÙˆØ³Ø¬Ù„ Ø§Ù„ØµÙŠØ§Ù†Ø© ÙˆØ§Ù„ÙÙˆØ§ØªÙŠØ± ÙˆÙ…ÙˆØ§Ø¹ÙŠØ¯ Ø§Ù„ØµÙŠØ§Ù†Ø© Ø§Ù„Ù‚Ø§Ø¯Ù…Ø© Ù…Ù† ØªØ·Ø¨ÙŠÙ‚ ÙˆØ§Ø­Ø¯.",
    sample: "Ø¥Ø¶Ø§ÙØ© Ø¨ÙŠØ§Ù†Ø§Øª ØªØ¬Ø±ÙŠØ¨ÙŠØ©",
    carSaved: "ØªÙ… Ø¥Ù†Ø´Ø§Ø¡ Ø³ÙŠØ§Ø±ØªÙƒ Ø¨Ù†Ø¬Ø§Ø­.",
    carRequired: "ÙŠØ±Ø¬Ù‰ Ø§Ø®ØªÙŠØ§Ø± Ø´Ø±ÙƒØ© Ø§Ù„Ø³ÙŠØ§Ø±Ø© ÙˆØ§Ù„Ù…ÙˆØ¯ÙŠÙ„.",
    recordSaved: "ØªÙ… Ø­ÙØ¸ Ø³Ø¬Ù„ Ø§Ù„ØµÙŠØ§Ù†Ø©.",
    delete: "Ø­Ø°Ù",
    deleteCarConfirm: "Ù‡Ù„ ØªØ±ÙŠØ¯ Ø­Ø°Ù Ù‡Ø°Ù‡ Ø§Ù„Ø³ÙŠØ§Ø±Ø© ÙˆÙƒÙ„ Ø³Ø¬Ù„Ø§Øª Ø§Ù„ØµÙŠØ§Ù†Ø© Ø§Ù„Ø®Ø§ØµØ© Ø¨Ù‡Ø§ØŸ",
    deleteRecordConfirm: "Ù‡Ù„ ØªØ±ÙŠØ¯ Ø­Ø°Ù Ø³Ø¬Ù„ Ø§Ù„ØµÙŠØ§Ù†Ø© Ù‡Ø°Ø§ØŸ",
    carDeleted: "ØªÙ… Ø­Ø°Ù Ø§Ù„Ø³ÙŠØ§Ø±Ø©.",
    recordDeleted: "ØªÙ… Ø­Ø°Ù Ø³Ø¬Ù„ Ø§Ù„ØµÙŠØ§Ù†Ø©.",
    partPhotos: "ØµÙˆØ± Ø§Ù„Ù‚Ø·Ø¹ Ø§Ù„Ù…Ø³ØªØ¨Ø¯Ù„Ø©",
    carPhoto: "ØµÙˆØ±Ø© Ø§Ù„Ø³ÙŠØ§Ø±Ø©",
    otherServiceDetails: "Ø¥Ø°Ø§ Ø§Ø®ØªØ±Øª Ø£Ø®Ø±Ù‰ØŒ Ø§ÙƒØªØ¨ ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ø®Ø¯Ù…Ø©",
    selectedServices: "Ø§Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ù…Ø®ØªØ§Ø±Ø©",
    chooseBrand: "Ø§Ø®ØªØ± Ø§Ù„Ø´Ø±ÙƒØ©",
    chooseModel: "Ø§Ø®ØªØ± Ø§Ù„Ù…ÙˆØ¯ÙŠÙ„",
    chooseService: "Ø§Ø®ØªØ± Ø§Ù„Ø®Ø¯Ù…Ø©",
    chooseCar: "Ø§Ø®ØªØ± Ø³ÙŠØ§Ø±Ø©",
    carGarage: "Ø³ÙŠØ§Ø±Ø§ØªÙƒ",
    selectedCarHelp: "Ø§Ø®ØªØ± Ø³ÙŠØ§Ø±Ø© Ø£ÙˆÙ„Ø§Ù‹ØŒ Ø«Ù… Ø´Ø§Ù‡Ø¯ Ø³Ø¬Ù„ Ø§Ù„ØµÙŠØ§Ù†Ø© Ø£Ùˆ Ø£Ø¶Ù Ø®Ø¯Ù…Ø© Ø¬Ø¯ÙŠØ¯Ø©.",
    viewHistory: "Ø¹Ø±Ø¶ Ø§Ù„Ø³Ø¬Ù„",
    addServiceHistory: "Ø¥Ø¶Ø§ÙØ© Ø®Ø¯Ù…Ø©",
    servicesFor: "Ø§Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ø®Ø§ØµØ© Ø¨Ù€",
    latestRecords: "Ø¢Ø®Ø± Ø³Ø¬Ù„Ø§Øª Ø§Ù„ØµÙŠØ§Ù†Ø©",
    addNewCar: "Ø¥Ø¶Ø§ÙØ© Ø³ÙŠØ§Ø±Ø© Ø¬Ø¯ÙŠØ¯Ø©",
    editCar: "ØªØ¹Ø¯ÙŠÙ„ Ø§Ù„Ø³ÙŠØ§Ø±Ø©",
    updateCar: "ØªØ­Ø¯ÙŠØ« Ø§Ù„Ø³ÙŠØ§Ø±Ø©",
    carUpdated: "ØªÙ… ØªØ­Ø¯ÙŠØ« Ø§Ù„Ø³ÙŠØ§Ø±Ø©.",
    close: "Ø¥ØºÙ„Ø§Ù‚",
    serviceSummary: "Ù…Ù„Ø®Øµ Ø§Ù„ØµÙŠØ§Ù†Ø©",
    serviceDetails: "ØªÙØ§ØµÙŠÙ„ Ø§Ù„ØµÙŠØ§Ù†Ø©",
    addAnotherService: "Ø¥Ø¶Ø§ÙØ© Ø®Ø¯Ù…Ø© Ø£Ø®Ø±Ù‰",
    createdNotification: "ØªÙ… Ø§Ù„Ø¥Ù†Ø´Ø§Ø¡ Ø¨Ù†Ø¬Ø§Ø­.",
    redirectingShop: "Ø¬Ø§Ø±Ù ÙØªØ­ Sayarati.online...",
    shopInAppNote: "ØªØµÙØ­ Ù…Ù†ØªØ¬Ø§Øª Ø³ÙŠØ§Ø±ØªÙŠ Ø¯Ø§Ø®Ù„ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ù…Ø¹ Ø¨Ù‚Ø§Ø¡ Ø£Ø²Ø±Ø§Ø± Ø§Ù„ØªÙ†Ù‚Ù„ Ù…ØªØ§Ø­Ø©.",
    shopLoading: "Ø¬Ø§Ø±Ù ØªØ­Ù…ÙŠÙ„ Ù…ØªØ¬Ø± Ø³ÙŠØ§Ø±ØªÙŠ...",
    shopHome: "Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©",
    shopBack: "Ø±Ø¬ÙˆØ¹",
    searchProducts: "Ø§Ù„Ø¨Ø­Ø« Ø¹Ù† Ù…Ù†ØªØ¬Ø§Øª",
    allCategories: "ÙƒÙ„ Ø§Ù„ÙØ¦Ø§Øª",
    chooseCategoryFirst: "Ø§Ø®ØªØ± ÙØ¦Ø© Ù„Ø¹Ø±Ø¶ Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª.",
    backToCategories: "Ø§Ù„Ø¹ÙˆØ¯Ø© Ø¥Ù„Ù‰ Ø§Ù„ÙØ¦Ø§Øª",
    loadMore: "ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…Ø²ÙŠØ¯",
    productDetails: "ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù…Ù†ØªØ¬",
    addToCart: "Ø¥Ø¶Ø§ÙØ© Ø¥Ù„Ù‰ Ø§Ù„Ø³Ù„Ø©",
    checkout: "Ø§Ù„Ø¯ÙØ¹",
    addedToCart: "ØªÙ…Øª Ø§Ù„Ø¥Ø¶Ø§ÙØ© Ø¥Ù„Ù‰ Ø§Ù„Ø³Ù„Ø©.",
    inStock: "Ù…ØªÙˆÙØ±",
    outOfStock: "ØºÙŠØ± Ù…ØªÙˆÙØ±",
    shopUpdated: "ØªÙ… ØªØ­Ø¯ÙŠØ« Ø§Ù„Ù…ØªØ¬Ø±.",
    shopError: "ØªØ¹Ø°Ø± ØªØ­Ù…ÙŠÙ„ Ù…Ù†ØªØ¬Ø§Øª Ø§Ù„Ù…ØªØ¬Ø±. Ø¬Ø±Ù‘Ø¨ Ø§Ù„ØªØ­Ø¯ÙŠØ«.",
    noProducts: "Ù„Ø§ ØªÙˆØ¬Ø¯ Ù…Ù†ØªØ¬Ø§Øª ÙÙŠ Ù‡Ø°Ù‡ Ø§Ù„ÙØ¦Ø©.",
    refreshShop: "ØªØ­Ø¯ÙŠØ« Ø§Ù„Ù…ØªØ¬Ø±",
    addCarPhoto: "Ø¥Ø¶Ø§ÙØ© ØµÙˆØ±Ø© Ø§Ù„Ø³ÙŠØ§Ø±Ø©",
  },
};

copy.ar = {
  ...copy.en,
  appName: "سيارتي",
  subtitle: "دفتر صيانة رقمي للسيارة",
  loginTitle: "أهلا بك في دفتر الصيانة الرقمي من Sayarati.online",
  loginText: "أدخل اسمك وبريدك الإلكتروني للبدء.",
  name: "الاسم",
  email: "البريد الإلكتروني",
  enter: "دخول التطبيق",
  overview: "لوحة التحكم",
  cars: "سياراتي",
  booklet: "سجل الصيانة",
  shop: "المتجر",
  profile: "الملف الشخصي",
  myDashboard: "لوحة التحكم",
  myCars: "سياراتي",
  myServiceHistory: "سجل الصيانة",
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
  cost: "التكلفة",
  nextDue: "موعد الصيانة القادمة",
  invoice: "اسم صورة الفاتورة",
  saveRecord: "حفظ السجل",
  oilDetails: "تفاصيل الزيت",
  oilViscosity: "نوع الزيت / اللزوجة",
  chooseOilType: "اختر نوع الزيت",
  oilLiters: "كمية الزيت (ليتر)",
  brakePadDetails: "تفاصيل فحمات الفرامل",
  brakePadPosition: "مكان فحمات الفرامل",
  chooseBrakePosition: "اختر المكان",
  records: "السجلات",
  noCars: "لا توجد سيارات بعد. أضف أول سيارة.",
  noRecords: "لا توجد سجلات صيانة بعد.",
  selectedCar: "السيارة المختارة",
  openExternal: "فتح في المتصفح",
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
  dashboardTitle: "لوحة التحكم",
  dashboardText: "تابع السيارات وسجل الصيانة والفواتير ومواعيد الصيانة القادمة.",
  sample: "إضافة بيانات تجريبية",
  carSaved: "تم إنشاء السيارة بنجاح.",
  carRequired: "يرجى اختيار شركة السيارة والموديل.",
  recordSaved: "تم حفظ سجل الصيانة.",
  recordUpdated: "تم تحديث سجل الصيانة.",
  editRecord: "تعديل الخدمة",
  updateRecord: "تحديث السجل",
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
  selectedCarHelp: "اختر سيارة أولا، ثم شاهد سجل الصيانة أو أضف خدمة جديدة.",
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
  redirectingShop: "جاري فتح Sayarati.online...",
  shopInAppNote: "تصفح منتجات سيارتي داخل التطبيق.",
  shopLoading: "جاري تحميل متجر سيارتي...",
  shopHome: "الرئيسية",
  shopBack: "رجوع",
  searchProducts: "البحث عن منتجات",
  allCategories: "كل الفئات",
  chooseCategoryFirst: "اختر فئة لعرض المنتجات.",
  backToCategories: "العودة إلى الفئات",
  loadMore: "تحميل المزيد",
  productDetails: "تفاصيل المنتج",
  addToCart: "إضافة إلى السلة",
  checkout: "الدفع",
  addedToCart: "تمت الإضافة إلى السلة.",
  inStock: "متوفر",
  outOfStock: "غير متوفر",
  shopUpdated: "تم تحديث المتجر.",
  shopError: "تعذر تحميل منتجات المتجر. جرب التحديث.",
  noProducts: "لا توجد منتجات في هذه الفئة.",
  refreshShop: "تحديث المتجر",
  addCarPhoto: "إضافة صورة السيارة",
  serviceFilter: "فلتر الصيانة",
  allServiceRecords: "كل الخدمات",
  beforeThisYear: "السنة السابقة",
  specificDate: "تاريخ محدد",
  specificMileage: "من عداد",
  sortProducts: "ترتيب المنتجات",
  defaultSort: "الترتيب الافتراضي",
  priceLowHigh: "السعر من الأقل إلى الأعلى",
  priceHighLow: "السعر من الأعلى إلى الأقل",
  nameAZ: "الاسم أ-ي",
  stockFilter: "التوفر",
  allProducts: "كل المنتجات",
  inStockOnly: "المتوفر فقط",
  outOfStockOnly: "غير المتوفر فقط",
  filterAll: "الكل",
  tourNext: "التالي",
  tourBack: "رجوع",
  tourSkip: "تخطي",
  tourDone: "تم",
  tourCount: "خطوة",
  tourWelcomeTitle: "أهلا بك في دفتر الصيانة الرقمي",
  tourWelcomeText: "دعني أعطيك جولة سريعة لتعرف كيف تستخدم التطبيق.",
  tour1Title: "مرآب سياراتك",
  tour1Text: "هنا تظهر سياراتك المحفوظة مع الصور والتفاصيل الأساسية.",
  tour2Title: "إضافة سيارة",
  tour2Text: "اضغط هنا لإنشاء ملف سيارة جديد مع الشركة والموديل والعداد واللوحة والصورة.",
  tour3Title: "عرض السجل",
  tour3Text: "استخدم عرض السجل لمشاهدة كل سجلات الصيانة الخاصة بسيارة معينة.",
  tour4Title: "إضافة خدمة",
  tour4Text: "أضف تغيير الزيت والفلاتر والتصليحات والتكلفة والعداد والتاريخ وصور القطع.",
  tour5Title: "ملخص لوحة التحكم",
  tour5Text: "هذه البطاقات تلخص عدد السيارات والسجلات وموعد الصيانة القادم وإجمالي المصاريف.",
  tour6Title: "فلتر المصاريف",
  tour6Text: "يمكنك فلترة المصاريف حسب هذا الشهر أو هذه السنة أو السنة الماضية أو سنة محددة.",
  tour7Title: "سجل الصيانة",
  tour7Text: "من هذا التبويب تختار السيارة وتشاهد أو تفلتر سجل الصيانة الكامل.",
  tour8Title: "المتجر",
  tour8Text: "تصفح منتجات سيارتي والفئات والبحث والفلاتر وتفاصيل المنتج والدفع.",
  tour9Title: "اللغة",
  tour9Text: "بدل بين الإنجليزية والعربية من هنا.",
  tour10Title: "الملف الشخصي",
  tour10Text: "افتح ملفك من دائرة الحرف. يمكنك مسح بيانات التجربة من هناك.",
};

let state = loadState();
let shopState = loadShopCache();

function defaultState() {
  return {
    lang: "en",
    view: "cars",
    user: null,
    selectedCarId: null,
    cars: [],
    records: [],
    notice: "",
    carFormOpen: false,
    serviceMode: "summary",
    selectedRecordId: null,
    serviceFilter: "all",
    serviceFilterDate: "",
    serviceFilterMileage: "",
    expenseFilter: "thisYear",
    expenseYear: String(new Date().getFullYear()),
    editingCarId: null,
    tourActive: false,
    tourStep: 0,
    tourSeen: false,
  };
}

function loadState() {
  const defaults = defaultState();
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = { ...defaults, ...JSON.parse(saved) };
      return { ...parsed, view: parsed.view === "overview" ? "cars" : parsed.view };
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  return defaults;
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
    parentCategoryId: 0,
    categoryTrail: [],
    sortBy: "default",
    stockFilter: "all",
    facets: {},
    appliedFacets: {},
    filterFields: [],
    loading: false,
    error: "",
    selectedProduct: null,
    cartCount: 0,
    lastLoaded: "",
  };

  try {
    return { ...empty, ...JSON.parse(localStorage.getItem(shopCacheKey()) || "{}") };
  } catch {
    return empty;
  }
}

function saveShopCache() {
  localStorage.setItem(shopCacheKey(), JSON.stringify({
    categories: shopState.categories,
    products: shopState.products,
    total: shopState.total,
    offset: shopState.offset,
    keyword: shopState.keyword,
    categoryId: shopState.categoryId,
    parentCategoryId: shopState.parentCategoryId,
    categoryTrail: shopState.categoryTrail,
    sortBy: shopState.sortBy,
    stockFilter: shopState.stockFilter,
    facets: shopState.facets,
    appliedFacets: shopState.appliedFacets,
    filterFields: shopState.filterFields,
    cartCount: shopState.cartCount,
    lastLoaded: shopState.lastLoaded,
  }));
}

function shopCacheKey() {
  return `${SHOP_CACHE_KEY}-${state.lang || "en"}`;
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
  syncTourHighlight();
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

function switchLanguage(lang) {
  setState({ lang });
  shopState = loadShopCache();
  if (state.view === "shop") {
    render();
    ensureShopLoaded();
  }
}

function setView(view) {
  setState({ view: view === "overview" ? "cars" : view });
}

function selectedCar() {
  return state.cars.find((car) => car.id === state.selectedCarId) || state.cars[0];
}

function carRecords(carId) {
  return state.records
    .filter((record) => record.carId === carId)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

function filteredCarRecords(carId) {
  return carRecords(carId).filter(matchesServiceFilter);
}

function matchesServiceFilter(record) {
  const filter = state.serviceFilter || "all";
  if (filter === "all") return true;
  const now = new Date();
  const recordDate = record.date ? new Date(`${record.date}T00:00:00`) : null;
  if (filter === "thisYear") return recordDate && recordDate.getFullYear() === now.getFullYear();
  if (filter === "lastYear") return recordDate && recordDate.getFullYear() === now.getFullYear() - 1;
  if (filter === "date") return !!state.serviceFilterDate && record.date === state.serviceFilterDate;
  if (filter === "mileage") return Number(record.mileage || 0) >= Number(state.serviceFilterMileage || 0);
  return true;
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
        <div class="sidebar-top">
          <div class="brand-wordmark">
            <img src="assets/sayarati-logo-with-online.png?v=1" alt="SAYARATI.online" />
          </div>
          <div class="top-controls">
            <div class="language" data-tour="language">
              <button class="${state.lang === "en" ? "active" : ""}" data-lang="en">EN</button>
              <button class="${state.lang === "ar" ? "active" : ""}" data-lang="ar">AR</button>
            </div>
            <button class="profile-chip" data-view="profile" data-tour="profile" title="${t("profile")}">
              ${userInitials()}
            </button>
          </div>
        </div>
        <nav class="nav">
          ${navButton("cars", "cars", t("cars"))}
          ${navButton("booklet", "booklet", t("booklet"), "service-tab")}
          ${navButton("shop", "shop", t("shop"), "shop-tab")}
        </nav>
      </aside>
      <main class="main">
        ${header()}
        ${state.notice ? `<div class="notice">${state.notice}</div>` : ""}
        ${currentView()}
        ${tourOverlay()}
      </main>
    </div>
  `;

  bindApp();
  syncTourHighlight();
}

function loginView() {
  return `
    <section class="login-wrap">
      <form class="login-card" id="login-form">
        <div class="login-logo">
          <img src="assets/sayarati-logo-with-online.png?v=1" alt="SAYARATI.online" />
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

function navButton(view, icon, label, tourId = "") {
  return `
    <button class="${state.view === view ? "active" : ""}" data-view="${view}" ${tourId ? `data-tour="${tourId}"` : ""}>
      <span class="nav-icon">${navIcon(icon)}</span>
      <span>${label}</span>
    </button>
  `;
}

function navIcon(icon) {
  const icons = {
    cars: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 11l1.4-3.7A2 2 0 0 1 8.3 6h7.4a2 2 0 0 1 1.9 1.3L19 11m-15 0h16v6H4v-6Zm2 6v1.5M18 17v1.5M7 14h.1M17 14h.1" /></svg>`,
    booklet: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h9a3 3 0 0 1 3 3v13H8a2 2 0 0 1-2-2V4Zm0 14a2 2 0 0 1 2-2h10M9 8h5M9 11h6" /></svg>`,
    shop: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10h14l-1 10H6L5 10Zm2.5 0V7a4.5 4.5 0 0 1 9 0v3M8 14h8" /></svg>`,
  };
  return icons[icon] || "";
}

function header() {
  return `
    <div class="topbar">
      <div>
        <h1>${pageTitle()}</h1>
      </div>
    </div>
  `;
}

function pageTitle() {
  if (state.view === "cars" || state.view === "overview") return t("overview");
  if (state.view === "booklet") return t("myServiceHistory");
  if (state.view === "shop") return t("shop");
  if (state.view === "profile") return t("profileTitle");
  return t("myDashboard");
}

function userInitials() {
  const name = String(state.user?.name || t("appName") || "S").trim();
  return escapeHtml(name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "S");
}

function currentView() {
  if (state.view === "cars" || state.view === "overview") return carsView();
  if (state.view === "booklet") return bookletView();
  if (state.view === "shop") return shopView();
  if (state.view === "profile") return profileView();
  return carsView();
}

function tourSteps() {
  const carActionTarget = state.cars.length ? "view-history" : "add-car";
  return [
    { target: "", title: t("tourWelcomeTitle"), text: t("tourWelcomeText"), placement: "center" },
    { target: "garage-list", title: t("tour1Title"), text: t("tour1Text") },
    { target: "add-car", title: t("tour2Title"), text: t("tour2Text") },
    { target: carActionTarget, title: t("tour3Title"), text: t("tour3Text") },
    { target: "dashboard-totals", title: t("tour5Title"), text: t("tour5Text") },
    { target: "expense-filter", title: t("tour6Title"), text: t("tour6Text"), placement: "top" },
    { target: "service-tab", title: t("tour7Title"), text: t("tour7Text"), placement: "top" },
    { target: "shop-tab", title: t("tour8Title"), text: t("tour8Text"), placement: "top" },
    { target: "language", title: t("tour9Title"), text: t("tour9Text"), placement: "bottom" },
    { target: "profile", title: t("tour10Title"), text: t("tour10Text"), placement: "bottom" },
  ];
}

function tourOverlay() {
  if (!state.tourActive) return "";
  const steps = tourSteps();
  const stepIndex = Math.min(state.tourStep || 0, steps.length - 1);
  const step = steps[stepIndex];
  return `
    <div class="tour-overlay">
      <button class="tour-dim" data-tour-next aria-label="${t("tourNext")}"></button>
      <div class="tour-card ${tourCardClass(step)}" role="dialog" aria-live="polite">
        <span class="pill gold">${t("tourCount")} ${stepIndex + 1} / ${steps.length}</span>
        <h2>${step.title}</h2>
        <p class="muted">${step.text}</p>
        <div class="tour-actions">
          <button class="ghost" data-tour-skip>${t("tourSkip")}</button>
          ${stepIndex > 0 ? `<button class="ghost" data-tour-back>${t("tourBack")}</button>` : ""}
          <button class="primary" data-tour-next>${stepIndex === steps.length - 1 ? t("tourDone") : t("tourNext")}</button>
        </div>
      </div>
    </div>
  `;
}

function tourCardClass(step) {
  if (step.placement === "center") return "tour-card-center";
  if (step.placement === "top") return "tour-card-top";
  return "tour-card-bottom";
}

function syncTourHighlight() {
  document.querySelectorAll(".tour-highlight").forEach((item) => item.classList.remove("tour-highlight"));
  if (!state.tourActive) return;
  const step = tourSteps()[Math.min(state.tourStep || 0, tourSteps().length - 1)];
  if (!step.target) return;
  const target = document.querySelector(`[data-tour="${step.target}"]`);
  if (!target) return;
  target.classList.add("tour-highlight");
  setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" }), 80);
}

function nextTourStep() {
  const lastStep = tourSteps().length - 1;
  if ((state.tourStep || 0) >= lastStep) {
    setState({ tourActive: false, tourSeen: true, tourStep: 0 });
    return;
  }
  setState({ tourStep: (state.tourStep || 0) + 1 });
}

function previousTourStep() {
  setState({ tourStep: Math.max(0, (state.tourStep || 0) - 1) });
}

function skipTour() {
  setState({ tourActive: false, tourSeen: true, tourStep: 0 });
}

function overviewView() {
  return `
    <section class="panel" style="margin-top: 16px;">
      <div class="row section-head">
        <div>
          <h2>${t("carGarage")}</h2>
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
      <div class="panel" data-tour="garage-list">
        <div class="row section-head">
          <div></div>
          <button class="primary" data-toggle-car-form data-tour="add-car">${state.carFormOpen ? t("close") : t("addNewCar")}</button>
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
    ${dashboardSummaryView()}
  `;
}

function dashboardSummaryView() {
  return `
    <section class="grid dashboard-grid" data-tour="dashboard-totals">
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
        <div class="expense-filter" data-tour="expense-filter">
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
        ${car ? serviceHistoryFilters() : ""}
        <div class="row section-head">
          <div>
            <h2>${car ? `${t("servicesFor")} ${carLabel(car)}` : t("records")}</h2>
            <p class="muted">${car ? `${t("mileage")}: ${car.mileage || "-"} | ${t("records")}: ${filteredCarRecords(car.id).length}` : t("noCars")}</p>
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
      ${(state.serviceMode === "add" || state.serviceMode === "edit") ? serviceFormView(car) : ""}
    </section>
  `;
}

function serviceHistoryFilters() {
  return `
    <div class="service-filters">
      <div class="field">
        <label for="serviceFilter">${t("serviceFilter")}</label>
        <select id="serviceFilter" data-service-filter>
          <option value="all" ${state.serviceFilter === "all" ? "selected" : ""}>${t("allServiceRecords")}</option>
          <option value="thisYear" ${state.serviceFilter === "thisYear" ? "selected" : ""}>${t("thisYear")}</option>
          <option value="lastYear" ${state.serviceFilter === "lastYear" ? "selected" : ""}>${t("beforeThisYear")}</option>
          <option value="date" ${state.serviceFilter === "date" ? "selected" : ""}>${t("specificDate")}</option>
          <option value="mileage" ${state.serviceFilter === "mileage" ? "selected" : ""}>${t("specificMileage")}</option>
        </select>
      </div>
      ${state.serviceFilter === "date" ? field("serviceFilterDate", t("specificDate"), "date", state.serviceFilterDate || "") : ""}
      ${state.serviceFilter === "mileage" ? field("serviceFilterMileage", t("specificMileage"), "number", state.serviceFilterMileage || "") : ""}
    </div>
  `;
}

function serviceFormView(car) {
  const editingRecord = state.serviceMode === "edit" ? selectedRecord(car?.id) : null;
  const selectedServices = editingRecord?.serviceTypes?.length ? editingRecord.serviceTypes : [editingRecord?.serviceType].filter(Boolean);
  return `
    <div class="panel" id="service-form-panel">
      <div class="row section-head">
        <div>
          <h2>${editingRecord ? t("editRecord") : t("addRecord")}</h2>
          ${car ? `<p><span class="pill green">${carLabel(car)}</span></p>` : ""}
        </div>
        <button class="ghost" data-service-summary>${t("close")}</button>
      </div>
      ${car ? `
        <form class="form" id="record-form">
          ${field("date", t("date"), "date", editingRecord?.date || new Date().toISOString().slice(0, 10))}
          ${field("mileage", t("mileage"), "number", editingRecord?.mileage || car.mileage || "")}
          ${serviceCheckboxes(selectedServices, editingRecord)}
          ${field("otherServiceDetails", t("otherServiceDetails"), "text", editingRecord?.otherServiceDetails || "")}
          ${field("parts", t("parts"), "text", editingRecord?.parts || "Oil filter, engine oil")}
          ${field("cost", t("cost"), "number", editingRecord?.cost || "")}
          ${field("nextDue", t("nextDue"), "date", editingRecord?.nextDue || "")}
          ${field("invoice", t("invoice"), "text", editingRecord?.invoice || "")}
          ${fileField("partPhotos", t("partPhotos"))}
          ${editingRecord?.partPhotos?.length ? renderPhotos(editingRecord.partPhotos) : ""}
          ${textarea("notes", t("notes"), editingRecord?.notes || "")}
          <button class="primary" type="submit" data-submit-record>${editingRecord ? t("updateRecord") : t("saveRecord")}</button>
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
            <option value="">${shopState.categoryTrail.length ? t("backToCategories") : t("allCategories")}</option>
            ${shopState.categories.map((category) => `<option value="${category.id}" ${String(shopState.categoryId) === String(category.id) ? "selected" : ""}>${escapeHtml(translatedText(category, "name"))}</option>`).join("")}
          </select>
          ${shopState.categoryId ? `
            <select data-shop-stock>
              <option value="all" ${shopState.stockFilter === "all" ? "selected" : ""}>${t("allProducts")}</option>
              <option value="in" ${shopState.stockFilter === "in" ? "selected" : ""}>${t("inStockOnly")}</option>
              <option value="out" ${shopState.stockFilter === "out" ? "selected" : ""}>${t("outOfStockOnly")}</option>
            </select>
            <select data-shop-sort>
              <option value="default" ${shopState.sortBy === "default" ? "selected" : ""}>${t("defaultSort")}</option>
              <option value="priceAsc" ${shopState.sortBy === "priceAsc" ? "selected" : ""}>${t("priceLowHigh")}</option>
              <option value="priceDesc" ${shopState.sortBy === "priceDesc" ? "selected" : ""}>${t("priceHighLow")}</option>
              <option value="nameAsc" ${shopState.sortBy === "nameAsc" ? "selected" : ""}>${t("nameAZ")}</option>
            </select>
          ` : ""}
        </div>
        ${(shopState.categoryId || shopState.keyword) ? shopFacetControls() : ""}
        ${shopState.categoryTrail.length ? `<button class="ghost category-back" data-category-back>${t("backToCategories")}</button>` : ""}
        ${shopState.error ? `<div class="notice shop-error">${shopState.error}</div>` : ""}
        ${shopState.selectedProduct ? productDetailView(shopState.selectedProduct) : (shopState.categoryId || shopState.keyword) ? productGridView() : categoryLandingView(activeCategory)}
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
            ${categoryImage(category) ? `<img src="${categoryImage(category)}" alt="${escapeAttr(translatedText(category, "name"))}" />` : `<span>${escapeHtml(translatedText(category, "name")).slice(0, 1)}</span>`}
            <strong>${escapeHtml(translatedText(category, "name"))}</strong>
            ${Number(category.productCount || 0) ? `<small>${category.productCount}</small>` : ""}
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
  const products = displayedShopProducts();
  return `
    ${products.length ? `
      <div class="product-grid">
        ${products.map(productCard).join("")}
      </div>
    ` : `<p class="muted">${shopState.loading ? t("shopLoading") : t("noProducts")}</p>`}
    <div class="shop-footer-actions">
      <span class="muted">${products.length} / ${shopState.total || shopState.products.length}</span>
      ${shopState.products.length < shopState.total ? `<button class="primary" data-load-more-products ${shopState.loading ? "disabled" : ""}>${shopState.loading ? t("shopLoading") : t("loadMore")}</button>` : ""}
    </div>
  `;
}

function shopFacetControls() {
  const facets = Object.entries(shopState.facets || {})
    .filter(([key, facet]) => (key.startsWith("attribute_") || key.startsWith("option_")) && Array.isArray(facet.values) && facet.values.length > 1)
    .filter(([key, facet]) => !isHiddenShopFacet(key, facet))
    .slice(0, 8);
  if (!facets.length) return "";
  return `
    <div class="facet-filters">
      ${facets.map(([key, facet]) => `
        <label>
          <span>${escapeHtml(facet.title || cleanFilterName(key))}</span>
          <select data-shop-facet="${escapeAttr(key)}">
            <option value="">${t("filterAll")}</option>
            ${facet.values.map((value) => {
              const label = value.title || value.name || value.id || "";
              return `<option value="${escapeAttr(label)}" ${shopState.appliedFacets?.[key] === label ? "selected" : ""}>${escapeHtml(label)}${value.productCount ? ` (${value.productCount})` : ""}</option>`;
            }).join("")}
          </select>
        </label>
      `).join("")}
    </div>
  `;
}

function isHiddenShopFacet(key, facet) {
  const label = `${key} ${facet?.title || ""}`.toLowerCase();
  return label.includes("upc");
}

function cleanFilterName(key) {
  return key.replace(/^attribute_/, "").replace(/^option_/, "").replace(/_/g, " ");
}

function displayedShopProducts() {
  let products = [...shopState.products];
  if (shopState.stockFilter === "in") products = products.filter((product) => product.inStock !== false);
  if (shopState.stockFilter === "out") products = products.filter((product) => product.inStock === false);
  products = products.filter(productMatchesAppliedFacets);
  if (shopState.sortBy === "priceAsc") products.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
  if (shopState.sortBy === "priceDesc") products.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
  if (shopState.sortBy === "nameAsc") products.sort((a, b) => translatedText(a, "name").localeCompare(translatedText(b, "name")));
  return products;
}

function productMatchesAppliedFacets(product) {
  return Object.entries(shopState.appliedFacets || {}).every(([key, selected]) => {
    if (!selected) return true;
    if (key.startsWith("attribute_")) {
      const name = key.replace(/^attribute_/, "");
      return (product.attributes || []).some((attribute) => attribute.name === name && translatedValue(attribute) === selected);
    }
    if (key.startsWith("option_")) {
      const name = key.replace(/^option_/, "");
      return (product.options || []).some((option) => option.name === name && (option.choices || []).some((choice) => (translatedText(choice, "text") || choice.text) === selected));
    }
    return true;
  });
}

function translatedValue(item) {
  const lang = state.lang || "en";
  const translated = item?.valueTranslated;
  if (translated && typeof translated === "object") {
    return translated[lang] || translated[lang.split("-")[0]] || translated.en || item?.value || "";
  }
  return item?.value || "";
}

function productCard(product) {
  const productName = translatedText(product, "name");
  return `
    <article class="product-card" data-product-id="${product.id}">
      <img src="${product.thumbnailUrl || product.imageUrl || LOGO_URL}" alt="${escapeAttr(productName)}" />
      <div>
        <strong>${escapeHtml(productName)}</strong>
        <span>${product.defaultDisplayedPriceFormatted || product.priceInProductList || product.price || ""}</span>
        <small class="${product.inStock === false ? "stock-out" : "stock-in"}">${product.inStock === false ? t("outOfStock") : t("inStock")}</small>
      </div>
    </article>
  `;
}

function productDetailView(product) {
  const images = product.galleryImages?.length ? product.galleryImages : [{ url: product.imageUrl || product.thumbnailUrl || LOGO_URL }];
  const productName = translatedText(product, "name");
  const productDescription = translatedText(product, "description");
  return `
    <div class="product-detail" id="shop-detail">
      <button class="ghost back-to-products" data-close-product>&larr; ${t("shopBack")}</button>
      <div class="product-detail-grid">
        <div class="product-images">
          ${images.slice(0, 4).map((image) => `<img src="${image.url || image.thumbnailUrl}" alt="${escapeAttr(product.name)}" />`).join("")}
        </div>
        <div>
          <span class="${product.inStock === false ? "stock-out" : "stock-in"}">${product.inStock === false ? t("outOfStock") : t("inStock")}</span>
          <h2>${escapeHtml(productName)}</h2>
          <strong class="product-price">${product.defaultDisplayedPriceFormatted || product.price || ""}</strong>
          <div class="product-description">${productDescription || ""}</div>
          <div class="actions">
            <button class="primary" data-add-product="${product.id}" ${product.inStock === false ? "disabled" : ""}>${t("addToCart")}</button>
            <button class="ghost" data-shop-checkout>${t("checkout")}</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function translatedText(item, field) {
  const lang = state.lang || "en";
  const translated = item?.[`${field}Translated`];
  if (translated && typeof translated === "object") {
    return translated[lang] || translated[lang.split("-")[0]] || translated.en || item?.[field] || "";
  }
  if (typeof translated === "string" && translated) return translated;
  return item?.[field] || "";
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
  if (!shopState.categories.length) await loadShopCategories(shopState.parentCategoryId || 0);
  if ((shopState.categoryId || shopState.keyword) && !shopState.products.length && !shopState.error) {
    await loadShopProducts({ reset: true });
    loadShopFacets();
  }
}

async function ecwidFetch(path, params = {}) {
  const url = new URL(`https://app.ecwid.com/api/v3/${ECWID_STORE_ID}${path}`);
  const lang = state.lang || "en";
  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) url.searchParams.set(key, value);
  });
  url.searchParams.set("lang", lang);
  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${ECWID_PUBLIC_TOKEN}`,
      "Accept-Language": lang,
    },
  });
  if (!response.ok) throw new Error(`Ecwid API error ${response.status}`);
  return response.json();
}

async function ecwidPost(path, params = {}, body = {}) {
  const url = new URL(`https://app.ecwid.com/api/v3/${ECWID_STORE_ID}${path}`);
  const lang = state.lang || "en";
  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) url.searchParams.set(key, value);
  });
  url.searchParams.set("lang", lang);
  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ECWID_PUBLIC_TOKEN}`,
      "Accept-Language": lang,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Ecwid API error ${response.status}`);
  return response.json();
}

async function loadShopCategories(parentCategoryId = 0) {
  try {
    const [data, sortData] = await Promise.all([
      ecwidFetch("/categories", {
      limit: 100,
        parent: parentCategoryId,
        responseFields: "items(id,name,nameTranslated,enabled,productCount,parentId,thumbnailUrl,imageUrl,originalImageUrl,hdThumbnailUrl,thumbnail(url),originalImage(url),hdThumbnail(url),orderBy),total",
      }),
      ecwidFetch("/categories/sort", {
        parentCategory: parentCategoryId,
      }).catch(() => null),
    ]);

    const rawOrder = Array.isArray(sortData) ? sortData : sortData?.categoryIds || sortData?.ids || sortData?.categories || [];
    const orderedIds = rawOrder.map((item) => typeof item === "object" ? item.id || item.categoryId : item).filter(Boolean);
    const orderMap = new Map(orderedIds.map((id, index) => [String(id), index]));
    const categories = (data.items || [])
      .filter((category) => category.enabled !== false)
      .filter((category) => Number(category.parentId || 0) === Number(parentCategoryId || 0))
      .sort((a, b) => {
        const aOrder = orderMap.has(String(a.id)) ? orderMap.get(String(a.id)) : Number(a.orderBy ?? 999999);
        const bOrder = orderMap.has(String(b.id)) ? orderMap.get(String(b.id)) : Number(b.orderBy ?? 999999);
        return aOrder - bOrder;
      });
    updateShopState({ categories, parentCategoryId, loading: false, error: "" });
  } catch {
    updateShopState({ loading: false, error: t("shopError") });
  }
}

async function loadShopProducts({ reset = false } = {}) {
  if (shopState.loading) return;
  const offset = reset ? 0 : shopState.products.length;
  updateShopState({ loading: true, error: "" });
  try {
    const params = shopProductParams({ offset });
    const data = await ecwidFetch("/products", {
      ...params,
      offset,
      limit: SHOP_PAGE_SIZE,
      responseFields: "total,count,items(id,sku,name,nameTranslated,thumbnailUrl,imageUrl,price,priceInProductList,defaultDisplayedPrice,defaultDisplayedPriceFormatted,inStock,url,attributes(name,nameTranslated,value,valueTranslated),options(name,nameTranslated,choices(text,textTranslated)))",
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

function shopProductParams({ offset = 0 } = {}) {
  const params = {
    offset,
    limit: SHOP_PAGE_SIZE,
    keyword: shopState.keyword ? `${shopState.keyword}*` : "",
    category: shopState.categoryId || undefined,
    includeProductsFromSubcategories: true,
    enabled: true,
  };
  if (shopState.stockFilter === "in") params.inStock = true;
  if (shopState.stockFilter === "out") params.inStock = false;
  if (shopState.sortBy === "priceAsc") params.sortBy = "PRICE_ASC";
  if (shopState.sortBy === "priceDesc") params.sortBy = "PRICE_DESC";
  if (shopState.sortBy === "nameAsc") params.sortBy = "NAME_ASC";
  Object.entries(shopState.appliedFacets || {}).forEach(([key, value]) => {
    if (value) params[key] = value;
  });
  return params;
}

async function loadShopFilterFields() {
  if (shopState.filterFields?.length) return shopState.filterFields;
  try {
    const classes = await ecwidFetch("/classes");
    const attributes = new Set();
    (classes || []).forEach((productClass) => {
      (productClass.attributes || []).forEach((attribute) => {
        if (attribute.name) attributes.add(`attribute_${attribute.name}`);
      });
    });
    const fields = ["price", "inventory", "onsale", "categories", ...Array.from(attributes)];
    shopState = { ...shopState, filterFields: fields };
    saveShopCache();
    return fields;
  } catch {
    const fields = inferFilterFieldsFromProducts(shopState.products);
    if (fields.length) {
      shopState = { ...shopState, filterFields: fields };
      saveShopCache();
    }
    return fields;
  }
}

function inferFilterFieldsFromProducts(products = []) {
  const fields = new Set(["price", "inventory", "onsale", "categories"]);
  products.forEach((product) => {
    (product.attributes || []).forEach((attribute) => {
      if (attribute.name) fields.add(`attribute_${attribute.name}`);
    });
    (product.options || []).forEach((option) => {
      if (option.name) fields.add(`option_${option.name}`);
    });
  });
  return Array.from(fields);
}

function filterFieldParam(field) {
  return String(field).replace(/\\/g, "\\\\").replace(/,/g, "\\,");
}

async function loadShopFacets() {
  if (!shopState.categoryId && !shopState.keyword) return;
  try {
    const fields = await loadShopFilterFields();
    if (!fields.length) return;
    const filterFields = fields.map(filterFieldParam).join(",");
    const params = {
      ...shopProductParams({ offset: 0 }),
      filterFields,
      filterFacetLimit: 200,
      lang: state.lang || "en",
    };
    if (params.inStock === true) {
      delete params.inStock;
      params.inventory = "instock";
    }
    if (params.inStock === false) {
      delete params.inStock;
      params.inventory = "outofstock";
    }
    delete params.offset;
    delete params.limit;
    const data = await ecwidPost("/products/filters", { filterFields }, { params });
    shopState = { ...shopState, facets: data.filters || {} };
    saveShopCache();
    render();
  } catch {
    shopState = { ...shopState, facets: facetsFromProducts(shopState.products) };
    saveShopCache();
    render();
  }
}

function facetsFromProducts(products = []) {
  const facets = {};
  products.forEach((product) => {
    (product.attributes || []).forEach((attribute) => {
      const key = `attribute_${attribute.name}`;
      const label = translatedText(attribute, "name") || attribute.name;
      const value = translatedValue(attribute);
      if (!key || !value) return;
      if (!facets[key]) facets[key] = { title: label, values: [] };
      addFacetValue(facets[key], value);
    });
    (product.options || []).forEach((option) => {
      const key = `option_${option.name}`;
      const label = translatedText(option, "name") || option.name;
      if (!facets[key]) facets[key] = { title: label, values: [] };
      (option.choices || []).forEach((choice) => addFacetValue(facets[key], translatedText(choice, "text") || choice.text));
    });
  });
  return facets;
}

function addFacetValue(facet, title) {
  const value = String(title || "").trim();
  if (!value) return;
  const existing = facet.values.find((item) => item.title === value);
  if (existing) existing.productCount = (existing.productCount || 0) + 1;
  else facet.values.push({ title: value, productCount: 1 });
}

async function openShopCategory(categoryId) {
  if (!categoryId) {
    shopState = { ...shopState, categoryId: "", parentCategoryId: 0, categoryTrail: [], products: [], total: 0, selectedProduct: null, appliedFacets: {}, facets: {}, error: "", loading: false };
    saveShopCache();
    render();
    await loadShopCategories(0);
    return;
  }

  const category = shopState.categories.find((item) => String(item.id) === String(categoryId));
  updateShopState({ loading: true, error: "" });
  try {
    const subData = await ecwidFetch("/categories", {
      parent: categoryId,
      limit: 100,
      responseFields: "items(id,name,nameTranslated,enabled,productCount,parentId,thumbnailUrl,imageUrl,originalImageUrl,hdThumbnailUrl,thumbnail(url),originalImage(url),hdThumbnail(url),orderBy),total",
    });
    const subcategories = (subData.items || []).filter((item) => item.enabled !== false);
    if (subcategories.length) {
      shopState = {
        ...shopState,
        categories: [],
        parentCategoryId: categoryId,
        categoryTrail: [...shopState.categoryTrail, { id: categoryId, name: translatedText(category, "name") || "" }],
        categoryId: "",
        products: [],
        total: 0,
        selectedProduct: null,
        loading: true,
      };
      saveShopCache();
      render();
      await loadShopCategories(categoryId);
      return;
    }

    shopState = { ...shopState, categoryId, products: [], total: 0, selectedProduct: null, loading: false, appliedFacets: {}, facets: {} };
    saveShopCache();
    render();
    await loadShopProducts({ reset: true });
    loadShopFacets();
  } catch {
    updateShopState({ loading: false, error: t("shopError") });
  }
}

async function backShopCategory() {
  shopState = { ...shopState, categoryId: "", parentCategoryId: 0, categoryTrail: [], products: [], total: 0, selectedProduct: null, appliedFacets: {}, facets: {}, error: "", loading: false };
  saveShopCache();
  render();
  await loadShopCategories(0);
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
  shopState = { ...shopState, keyword: "", categoryId: "", parentCategoryId: 0, categoryTrail: [], sortBy: "default", stockFilter: "all", appliedFacets: {}, facets: {}, selectedProduct: null, products: [], total: 0, categories: [] };
  saveShopCache();
  render();
  loadShopCategories(0);
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

function serviceCheckboxes(selectedServices = [], record = {}) {
  return `
    <div class="field">
      <label>${t("serviceType")}</label>
      <div class="checkbox-grid">
        ${serviceTypes.map((service) => `
          <label class="check-option">
            <input type="checkbox" name="serviceTypes" value="${service}" ${selectedServices.includes(service) ? "checked" : ""} />
            <span>${service}</span>
          </label>
          ${service === "Oil change" ? oilServiceFields(record, selectedServices.includes("Oil change")) : ""}
          ${service === "Brake pads" ? brakePadServiceFields(record, selectedServices.includes("Brake pads")) : ""}
        `).join("")}
      </div>
    </div>
  `;
}

function oilServiceFields(record = {}, isVisible = false) {
  return `
    <div class="service-extra service-extra-inline ${isVisible ? "" : "is-hidden"}" data-service-extra="oil">
      <h3>${t("oilDetails")}</h3>
      <div class="service-extra-grid">
        ${selectField("oilViscosity", t("oilViscosity"), oilViscosities, record?.oilViscosity || "5W-30", t("chooseOilType"))}
        ${field("oilLiters", t("oilLiters"), "number", record?.oilLiters || "")}
      </div>
    </div>
  `;
}

function brakePadServiceFields(record = {}, isVisible = false) {
  return `
    <div class="service-extra service-extra-inline ${isVisible ? "" : "is-hidden"}" data-service-extra="brakePads">
      <h3>${t("brakePadDetails")}</h3>
      ${selectField("brakePadPosition", t("brakePadPosition"), brakePadPositions, record?.brakePadPosition || "", t("chooseBrakePosition"))}
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
  return `<div class="car-photo placeholder-car"><span>${navIcon("cars")}</span><small>${t("addCarPhoto")}</small></div>`;
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
        <button class="ghost" data-open-history="${car.id}" data-tour="view-history">${t("viewHistory")}</button>
        <button class="ghost" data-edit-car="${car.id}">${t("editCar")}</button>
        <button class="danger" data-delete-car="${car.id}">${t("delete")}</button>
      </div>
      ${car.notes ? `<div>${car.notes}</div>` : ""}
    </article>
  `;
}

function renderRecordSummaries(carId) {
  const records = filteredCarRecords(carId);
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
          <button class="ghost" data-edit-record="${record.id}">${t("editRecord")}</button>
          <button class="ghost" data-service-summary>${t("close")}</button>
          <button class="danger" data-delete-record="${record.id}">${t("delete")}</button>
        </div>
      </div>
      <div class="detail-grid">
        <div><span>${t("selectedServices")}</span><strong>${formatServices(record)}</strong></div>
        ${record.oilViscosity || record.oilLiters ? `<div><span>${t("oilDetails")}</span><strong>${formatOilDetails(record)}</strong></div>` : ""}
        ${record.brakePadPosition ? `<div><span>${t("brakePadDetails")}</span><strong>${record.brakePadPosition}</strong></div>` : ""}
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
  const records = filteredCarRecords(carId);
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

function formatOilDetails(record) {
  const details = [];
  if (record.oilViscosity) details.push(record.oilViscosity);
  if (record.oilLiters) details.push(`${record.oilLiters} L`);
  return details.length ? details.join(" / ") : "-";
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
    button.addEventListener("click", () => switchLanguage(button.dataset.lang));
  });

  document.querySelector("#login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = formData(event.currentTarget);
    const shouldStartTour = !state.tourSeen;
    setState({
      user: { name: data.name || "Customer", email: data.email || "customer@example.com" },
      view: "cars",
      tourActive: shouldStartTour,
      tourStep: 0,
    });
  });
}

function bindApp() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  document.querySelectorAll("[data-tour-next]").forEach((button) => {
    button.addEventListener("click", nextTourStep);
  });

  document.querySelectorAll("[data-tour-back]").forEach((button) => {
    button.addEventListener("click", previousTourStep);
  });

  document.querySelectorAll("[data-tour-skip]").forEach((button) => {
    button.addEventListener("click", skipTour);
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

  document.querySelectorAll("[data-edit-record]").forEach((button) => {
    button.addEventListener("click", () => {
      setState({ selectedRecordId: button.dataset.editRecord, serviceMode: "edit" });
      scrollAfterRender("service-form-panel");
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

  document.querySelectorAll("[data-service-filter]").forEach((select) => {
    select.addEventListener("change", () => setState({
      serviceFilter: select.value,
      serviceMode: "summary",
      selectedRecordId: null,
    }));
  });

  const serviceFilterDate = document.querySelector("#serviceFilterDate");
  if (serviceFilterDate) {
    serviceFilterDate.addEventListener("change", () => setState({
      serviceFilter: "date",
      serviceFilterDate: serviceFilterDate.value,
      serviceMode: "summary",
      selectedRecordId: null,
    }));
  }

  const serviceFilterMileage = document.querySelector("#serviceFilterMileage");
  if (serviceFilterMileage) {
    serviceFilterMileage.addEventListener("input", () => {
      clearTimeout(window.sayaratiServiceFilterTimer);
      window.sayaratiServiceFilterTimer = setTimeout(() => setState({
        serviceFilter: "mileage",
        serviceFilterMileage: serviceFilterMileage.value,
        serviceMode: "summary",
        selectedRecordId: null,
      }), 250);
    });
  }

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
    button.addEventListener("click", () => switchLanguage(button.dataset.lang));
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
        view: "cars",
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
          view: "cars",
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
    const updateServiceExtras = () => {
      const selected = checkedValues(recordForm, "serviceTypes");
      recordForm.querySelector('[data-service-extra="oil"]')?.classList.toggle("is-hidden", !selected.includes("Oil change"));
      recordForm.querySelector('[data-service-extra="brakePads"]')?.classList.toggle("is-hidden", !selected.includes("Brake pads"));
    };
    recordForm.querySelectorAll('input[name="serviceTypes"]').forEach((input) => {
      input.addEventListener("change", updateServiceExtras);
    });
    updateServiceExtras();

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
      if (!services.includes("Oil change")) {
        delete data.oilViscosity;
        delete data.oilLiters;
      }
      if (!services.includes("Brake pads")) {
        delete data.brakePadPosition;
      }
      const existingRecord = state.serviceMode === "edit" ? selectedRecord(car.id) : null;
      const record = {
        ...(existingRecord || {}),
        id: existingRecord?.id || uid("record"),
        carId: car.id,
        ...data,
        serviceType: services[0] || "",
        serviceTypes: services,
        partPhotos: partPhotos.length ? partPhotos : existingRecord?.partPhotos || [],
      };
      setState({
        records: existingRecord
          ? state.records.map((item) => item.id === existingRecord.id ? record : item)
          : [record, ...state.records],
        serviceMode: "detail",
        selectedRecordId: record.id,
      });
      notify(existingRecord ? t("recordUpdated") : t("recordSaved"));
      scrollAfterRender("app");
    });
  }

  const reset = document.querySelector("[data-reset]");
  if (reset) {
    reset.addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY);
      state = loadState();
      render();
      syncTourHighlight();
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
        parentCategoryId: 0,
        categoryTrail: [],
        appliedFacets: {},
        facets: {},
        selectedProduct: null,
        error: "",
      };
      saveShopCache();
      render();
      await loadShopCategories(0);
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
        shopState = { ...shopState, keyword: input.value, products: [], total: 0, selectedProduct: null, appliedFacets: {}, facets: {} };
        saveShopCache();
        if (shopState.keyword || shopState.categoryId) {
          loadShopProducts({ reset: true }).then(() => loadShopFacets());
        } else {
          render();
        }
      }, 420);
    });
  });

  document.querySelectorAll("[data-shop-category]").forEach((select) => {
    select.addEventListener("change", () => {
      openShopCategory(select.value);
    });
  });

  document.querySelectorAll("[data-shop-stock]").forEach((select) => {
    select.addEventListener("change", () => {
      shopState = { ...shopState, stockFilter: select.value, products: [], total: 0, selectedProduct: null };
      saveShopCache();
      loadShopProducts({ reset: true }).then(() => loadShopFacets());
    });
  });

  document.querySelectorAll("[data-shop-sort]").forEach((select) => {
    select.addEventListener("change", () => {
      shopState = { ...shopState, sortBy: select.value, products: [], total: 0, selectedProduct: null };
      saveShopCache();
      loadShopProducts({ reset: true });
    });
  });

  document.querySelectorAll("[data-shop-facet]").forEach((select) => {
    select.addEventListener("change", () => {
      const appliedFacets = { ...(shopState.appliedFacets || {}) };
      if (select.value) appliedFacets[select.dataset.shopFacet] = select.value;
      else delete appliedFacets[select.dataset.shopFacet];
      shopState = { ...shopState, appliedFacets, products: [], total: 0, selectedProduct: null };
      saveShopCache();
      loadShopProducts({ reset: true }).then(() => loadShopFacets());
    });
  });

  document.querySelectorAll("[data-category-tile]").forEach((button) => {
    button.addEventListener("click", () => {
      openShopCategory(button.dataset.categoryTile);
    });
  });

  document.querySelectorAll("[data-category-back]").forEach((button) => {
    button.addEventListener("click", backShopCategory);
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
