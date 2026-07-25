export const FACILITY_TYPES = [
  {
    id: "ice_factory",
    name: "مصنع تلج",
    appliances: [
      { name: "ماكينة ثلج", watts: 5000, qty: 2, hours: 24 },
      { name: "غرفة تبريد", watts: 3000, qty: 1, hours: 24 },
      { name: "إضاءة", watts: 100, qty: 10, hours: 12 },
    ]
  },
  {
    id: "company",
    name: "شركة",
    appliances: [
      { name: "مكيفات", watts: 1500, qty: 4, hours: 10 },
      { name: "حواسيب", watts: 200, qty: 10, hours: 10 },
      { name: "طابعات", watts: 500, qty: 2, hours: 4 },
      { name: "إضاءة", watts: 50, qty: 20, hours: 10 },
    ]
  },
  {
    id: "farm",
    name: "مزرعة",
    appliances: [
      { name: "مضخة مياه غاطسة", watts: 7500, qty: 1, hours: 8 },
      { name: "إضاءة خارجية", watts: 100, qty: 5, hours: 12 },
    ]
  },
  {
    id: "poultry_farm",
    name: "مزرعة دواجن",
    appliances: [
      { name: "مراوح تهوية", watts: 750, qty: 10, hours: 24 },
      { name: "دفايات", watts: 2000, qty: 4, hours: 12 },
      { name: "إضاءة", watts: 50, qty: 20, hours: 24 },
    ]
  },
  {
    id: "greenhouses",
    name: "بيوت محمية",
    appliances: [
      { name: "مضخات ري", watts: 2200, qty: 2, hours: 4 },
      { name: "مراوح تبريد", watts: 500, qty: 4, hours: 10 },
      { name: "إضاءة", watts: 100, qty: 10, hours: 8 },
    ]
  },
  {
    id: "factory",
    name: "مصنع",
    appliances: [
      { name: "آلات إنتاج", watts: 15000, qty: 2, hours: 16 },
      { name: "مكيفات صناعية", watts: 5000, qty: 3, hours: 16 },
      { name: "إضاءة", watts: 100, qty: 50, hours: 16 },
    ]
  },
  {
    id: "clinic",
    name: "مستوصف",
    appliances: [
      { name: "مكيفات", watts: 1500, qty: 6, hours: 14 },
      { name: "ثلاجة أدوية", watts: 300, qty: 2, hours: 24 },
      { name: "أجهزة طبية", watts: 1000, qty: 4, hours: 8 },
      { name: "إضاءة", watts: 50, qty: 30, hours: 14 },
    ]
  },
  {
    id: "hospital",
    name: "مستشفي",
    appliances: [
      { name: "مكيفات مركزية", watts: 20000, qty: 2, hours: 24 },
      { name: "أشعة مقطعية", watts: 50000, qty: 1, hours: 8 },
      { name: "أجهزة عناية مركزة", watts: 2000, qty: 10, hours: 24 },
      { name: "ثلاجات أدوية وبنك دم", watts: 1000, qty: 5, hours: 24 },
      { name: "إضاءة", watts: 50, qty: 200, hours: 24 },
    ]
  },
  {
    id: "bakery",
    name: "مخبز",
    appliances: [
      { name: "عجانات", watts: 3000, qty: 2, hours: 8 },
      { name: "أفران كهربائية", watts: 10000, qty: 2, hours: 12 },
      { name: "إضاءة", watts: 100, qty: 10, hours: 16 },
    ]
  },
  {
    id: "shop",
    name: "دكان",
    appliances: [
      { name: "ثلاجة عرض", watts: 800, qty: 2, hours: 24 },
      { name: "فريزر", watts: 500, qty: 1, hours: 24 },
      { name: "إضاءة", watts: 50, qty: 6, hours: 12 },
      { name: "مروحة سقف", watts: 80, qty: 2, hours: 12 },
    ]
  },
  {
    id: "workshop",
    name: "ورشة",
    appliances: [
      { name: "ماكينة لحام", watts: 5000, qty: 1, hours: 6 },
      { name: "صاروخ تقطيع", watts: 2000, qty: 2, hours: 4 },
      { name: "كمبروسر هواء", watts: 3000, qty: 1, hours: 8 },
      { name: "إضاءة", watts: 150, qty: 8, hours: 10 },
    ]
  },
  {
    id: "water_pump",
    name: "مضخة موية",
    appliances: [
      { name: "مضخة 10 حصان", watts: 7500, qty: 1, hours: 10 },
    ]
  },
  {
    id: "donkey",
    name: "دونكي",
    appliances: [
      { name: "مضخة بئر غاطسة", watts: 11000, qty: 1, hours: 12 },
      { name: "إضاءة محيطة", watts: 100, qty: 4, hours: 12 },
    ]
  },
  {
    id: "mosque",
    name: "مسجد",
    appliances: [
      { name: "مكيفات", watts: 2000, qty: 6, hours: 5 },
      { name: "مراوح سقف", watts: 80, qty: 15, hours: 5 },
      { name: "مضخة مياه", watts: 1500, qty: 1, hours: 3 },
      { name: "نظام صوتي", watts: 500, qty: 1, hours: 5 },
      { name: "إضاءة", watts: 50, qty: 30, hours: 5 },
    ]
  },
  {
    id: "printing_press",
    name: "مطبعة",
    appliances: [
      { name: "ماكينات طباعة", watts: 8000, qty: 2, hours: 10 },
      { name: "مقص ورق كهربائي", watts: 1500, qty: 1, hours: 4 },
      { name: "حواسيب تصميم", watts: 400, qty: 3, hours: 10 },
      { name: "مكيفات", watts: 2000, qty: 2, hours: 10 },
      { name: "إضاءة", watts: 100, qty: 15, hours: 10 },
    ]
  },
  {
    id: "coffee_shop",
    name: "كوفي شوب",
    appliances: [
      { name: "ماكينة اسبريسو", watts: 3500, qty: 1, hours: 12 },
      { name: "مطحنة بن", watts: 500, qty: 2, hours: 4 },
      { name: "ثلاجة عرض", watts: 800, qty: 1, hours: 24 },
      { name: "مكيفات", watts: 1500, qty: 3, hours: 14 },
      { name: "إضاءة وديكور", watts: 50, qty: 30, hours: 14 },
    ]
  },
  {
    id: "restaurant",
    name: "مطعم",
    appliances: [
      { name: "ثلاجات ومجمدات", watts: 1000, qty: 4, hours: 24 },
      { name: "أفران ومايكروويف", watts: 3000, qty: 2, hours: 10 },
      { name: "مكيفات", watts: 2000, qty: 4, hours: 14 },
      { name: "شفاطات هواء", watts: 1500, qty: 2, hours: 14 },
      { name: "إضاءة", watts: 50, qty: 40, hours: 14 },
    ]
  },
  {
    id: "hotel",
    name: "فندق",
    appliances: [
      { name: "مكيفات غرف", watts: 1500, qty: 30, hours: 12 },
      { name: "مصاعد", watts: 10000, qty: 2, hours: 6 },
      { name: "سخانات مياه", watts: 2000, qty: 10, hours: 6 },
      { name: "ثلاجات صغيرة", watts: 150, qty: 30, hours: 24 },
      { name: "إضاءة ممرات وغرف", watts: 50, qty: 150, hours: 12 },
    ]
  },
  {
    id: "bank",
    name: "بنك",
    appliances: [
      { name: "مكيفات مركزية", watts: 15000, qty: 1, hours: 10 },
      { name: "حواسيب وشاشات", watts: 200, qty: 25, hours: 10 },
      { name: "سيرفرات", watts: 2000, qty: 1, hours: 24 },
      { name: "صرافات آلية (ATM)", watts: 1000, qty: 3, hours: 24 },
      { name: "إضاءة", watts: 50, qty: 60, hours: 10 },
    ]
  },
  {
    id: "supermarket",
    name: "سوبر ماركت",
    appliances: [
      { name: "ثلاجات عرض منتجات", watts: 1200, qty: 8, hours: 24 },
      { name: "مجمدات (فريزرات)", watts: 1500, qty: 4, hours: 24 },
      { name: "مكيفات", watts: 2000, qty: 4, hours: 16 },
      { name: "كاشير وحواسيب", watts: 200, qty: 4, hours: 16 },
      { name: "إضاءة قوية", watts: 50, qty: 80, hours: 16 },
    ]
  },
  {
    id: "gas_station",
    name: "طرمبة وقود",
    appliances: [
      { name: "مضخات وقود", watts: 1500, qty: 6, hours: 12 },
      { name: "مكيفات (سوبرماركت وإدارة)", watts: 1500, qty: 3, hours: 16 },
      { name: "ثلاجات عرض", watts: 800, qty: 3, hours: 24 },
      { name: "إضاءة مظلات (كشافات)", watts: 200, qty: 15, hours: 12 },
    ]
  },
  {
    id: "mining_company",
    name: "شركة تعدين",
    appliances: [
      { name: "طواحين وخلاطات", watts: 25000, qty: 2, hours: 12 },
      { name: "مضخات مياه كبيرة", watts: 15000, qty: 2, hours: 12 },
      { name: "أجهزة فصل ومعالجة", watts: 10000, qty: 3, hours: 10 },
      { name: "مكيفات كرفانات سكنية", watts: 1500, qty: 20, hours: 12 },
      { name: "إضاءة خارجية كاشفة", watts: 400, qty: 30, hours: 12 },
    ]
  },
];

/**
 * Calculate total energy consumption per day in Watt-hours (Wh)
 */
export const calculateTotalConsumption = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (Number(app.watts) * Number(app.qty) * Number(app.hours));
  }, 0);
};

/**
 * Calculate required System Size (Inverter capacity) in Kilowatts (kW)
 * Adds 20% margin for surge and inefficiency.
 */
export const calculateSystemSizeKW = (appliances) => {
  const totalWatts = appliances.reduce((total, app) => total + (Number(app.watts) * Number(app.qty)), 0);
  // Add 20% safety margin and convert to kW
  return (totalWatts * 1.2) / 1000;
};

/**
 * Calculate number of solar panels required
 * Assumes 550W panels and 5 peak sun hours per day.
 * Includes a 20% system loss factor.
 */
export const calculatePanelsCount = (dailyConsumptionWh, panelWattage = 550, peakSunHours = 5) => {
  const dailyGenerationPerPanel = panelWattage * peakSunHours * 0.8; // 80% efficiency
  if (dailyGenerationPerPanel === 0) return 0;
  return Math.ceil(dailyConsumptionWh / dailyGenerationPerPanel);
};

/**
 * Calculate Battery Capacity in Ampere-hours (Ah)
 * Assumes 48V system, 50% Depth of Discharge (DoD) for Lead-Acid, or 80% for Lithium
 * Defaulting to 80% DoD (Lithium), and 1 day of autonomy.
 */
export const calculateBatteryCapacityAh = (dailyConsumptionWh, systemVoltage = 48, daysOfAutonomy = 1, depthOfDischarge = 0.8) => {
  // Total Wh needed from batteries
  const requiredWh = (dailyConsumptionWh * daysOfAutonomy) / depthOfDischarge;
  return Math.ceil(requiredWh / systemVoltage);
};
