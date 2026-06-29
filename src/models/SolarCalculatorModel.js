// src/models/SolarCalculatorModel.js

// Predefined devices for facility types (Consumption Patterns in Arabic)
const FACILITY_TYPES = [
  {
    id: "ice_factory",
    name: "مصنع تلج", // Ice Factory
    devices: [
      { id: "1", name: "ماكينة صنع الثلج", powerWatts: 5000, quantity: 2, hoursPerDay: 12 },
      { id: "2", name: "غرفة تبريد", powerWatts: 3000, quantity: 1, hoursPerDay: 24 },
      { id: "3", name: "إضاءة", powerWatts: 100, quantity: 10, hoursPerDay: 12 },
    ],
  },
  {
    id: "company",
    name: "شركة", // Company
    devices: [
      { id: "1", name: "مكيف هواء", powerWatts: 1500, quantity: 5, hoursPerDay: 8 },
      { id: "2", name: "أجهزة كمبيوتر", powerWatts: 300, quantity: 20, hoursPerDay: 8 },
      { id: "3", name: "إضاءة", powerWatts: 40, quantity: 50, hoursPerDay: 10 },
      { id: "4", name: "طابعة/ماكينة تصوير", powerWatts: 500, quantity: 2, hoursPerDay: 4 },
    ],
  },
  {
    id: "farm",
    name: "مزرعة", // Farm
    devices: [
      { id: "1", name: "مضخة مياه", powerWatts: 2200, quantity: 1, hoursPerDay: 6 },
      { id: "2", name: "إضاءة خارجية", powerWatts: 150, quantity: 10, hoursPerDay: 12 },
      { id: "3", name: "معدات زراعية صغيرة", powerWatts: 1000, quantity: 2, hoursPerDay: 4 },
    ],
  },
  {
    id: "poultry_farm",
    name: "مزرعة دواجن", // Poultry Farm
    devices: [
      { id: "1", name: "مراوح تهوية", powerWatts: 750, quantity: 6, hoursPerDay: 24 },
      { id: "2", name: "سخانات", powerWatts: 2000, quantity: 4, hoursPerDay: 12 },
      { id: "3", name: "إضاءة", powerWatts: 40, quantity: 30, hoursPerDay: 16 },
      { id: "4", name: "مضخة مياه صغيرة", powerWatts: 750, quantity: 1, hoursPerDay: 4 },
    ],
  },
  {
    id: "greenhouses",
    name: "بيوت محمية", // Greenhouses
    devices: [
      { id: "1", name: "مراوح تهوية", powerWatts: 500, quantity: 4, hoursPerDay: 12 },
      { id: "2", name: "مضخة ري", powerWatts: 1500, quantity: 1, hoursPerDay: 4 },
      { id: "3", name: "أجهزة تحكم", powerWatts: 100, quantity: 2, hoursPerDay: 24 },
    ],
  },
  {
    id: "factory",
    name: "مصنع", // Factory (General)
    devices: [
      { id: "1", name: "ماكينات إنتاج", powerWatts: 10000, quantity: 3, hoursPerDay: 10 },
      { id: "2", name: "سيور ناقلة", powerWatts: 2000, quantity: 2, hoursPerDay: 10 },
      { id: "3", name: "إضاءة صناعية", powerWatts: 200, quantity: 40, hoursPerDay: 12 },
    ],
  },
  {
    id: "clinic",
    name: "مستوصف", // Clinic
    devices: [
      { id: "1", name: "مكيف هواء", powerWatts: 1500, quantity: 4, hoursPerDay: 10 },
      { id: "2", name: "معدات طبية صغيرة", powerWatts: 500, quantity: 5, hoursPerDay: 6 },
      { id: "3", name: "ثلاجة أدوية", powerWatts: 300, quantity: 2, hoursPerDay: 24 },
      { id: "4", name: "إضاءة", powerWatts: 40, quantity: 30, hoursPerDay: 12 },
    ],
  },
  {
    id: "hospital",
    name: "مستشفي", // Hospital
    devices: [
      { id: "1", name: "أجهزة تكييف مركزية", powerWatts: 15000, quantity: 2, hoursPerDay: 24 },
      { id: "2", name: "أشعة مقطعية/رنين", powerWatts: 50000, quantity: 1, hoursPerDay: 4 },
      { id: "3", name: "معدات غرف عمليات", powerWatts: 3000, quantity: 4, hoursPerDay: 8 },
      { id: "4", name: "ثلاجات بنك الدم", powerWatts: 800, quantity: 3, hoursPerDay: 24 },
      { id: "5", name: "إضاءة ومصاعد", powerWatts: 10000, quantity: 1, hoursPerDay: 24 },
    ],
  },
  {
    id: "bakery",
    name: "مخبز", // Bakery
    devices: [
      { id: "1", name: "فرن كهربائي", powerWatts: 8000, quantity: 2, hoursPerDay: 12 },
      { id: "2", name: "عجانة", powerWatts: 3000, quantity: 2, hoursPerDay: 6 },
      { id: "3", name: "ثلاجة عرض", powerWatts: 1000, quantity: 2, hoursPerDay: 24 },
      { id: "4", name: "إضاءة", powerWatts: 100, quantity: 10, hoursPerDay: 14 },
    ],
  },
  {
    id: "shop",
    name: "دكان", // Shop/Store
    devices: [
      { id: "1", name: "ثلاجة مشروبات", powerWatts: 800, quantity: 2, hoursPerDay: 24 },
      { id: "2", name: "مروحة سقف", powerWatts: 80, quantity: 2, hoursPerDay: 12 },
      { id: "3", name: "إضاءة", powerWatts: 40, quantity: 5, hoursPerDay: 12 },
    ],
  },
  {
    id: "workshop",
    name: "ورشة", // Workshop
    devices: [
      { id: "1", name: "ماكينة لحام", powerWatts: 5000, quantity: 1, hoursPerDay: 4 },
      { id: "2", name: "صاروخ تقطيع", powerWatts: 2000, quantity: 2, hoursPerDay: 3 },
      { id: "3", name: "كمبروسر هواء", powerWatts: 3000, quantity: 1, hoursPerDay: 4 },
      { id: "4", name: "إضاءة كاشفة", powerWatts: 200, quantity: 4, hoursPerDay: 6 },
    ],
  },
  {
    id: "water_pump",
    name: "مضخة موية", // Water Pump
    devices: [
      { id: "1", name: "مضخة غاطسة", powerWatts: 3000, quantity: 1, hoursPerDay: 8 },
    ],
  },
  {
    id: "donkey",
    name: "دونكي", // Donkey (Water station usually in Sudan context)
    devices: [
      { id: "1", name: "مضخة مياه كبيرة", powerWatts: 5000, quantity: 1, hoursPerDay: 10 },
    ],
  },
  {
    id: "mosque",
    name: "مسجد", // Mosque
    devices: [
      { id: "1", name: "مكيفات هواء", powerWatts: 2000, quantity: 6, hoursPerDay: 5 },
      { id: "2", name: "مراوح سقف", powerWatts: 80, quantity: 15, hoursPerDay: 8 },
      { id: "3", name: "مكبرات صوت", powerWatts: 300, quantity: 1, hoursPerDay: 3 },
      { id: "4", name: "إضاءة", powerWatts: 40, quantity: 40, hoursPerDay: 6 },
    ],
  },
  {
    id: "printing_press",
    name: "مطبعة", // Printing Press
    devices: [
      { id: "1", name: "ماكينة طباعة", powerWatts: 6000, quantity: 2, hoursPerDay: 8 },
      { id: "2", name: "ماكينة قص ورق", powerWatts: 1500, quantity: 1, hoursPerDay: 4 },
      { id: "3", name: "أجهزة كمبيوتر", powerWatts: 300, quantity: 3, hoursPerDay: 8 },
      { id: "4", name: "إضاءة", powerWatts: 100, quantity: 15, hoursPerDay: 10 },
    ],
  },
  {
    id: "coffee_shop",
    name: "كوفي شوب", // Coffee Shop
    devices: [
      { id: "1", name: "ماكينة اسبريسو", powerWatts: 3500, quantity: 1, hoursPerDay: 10 },
      { id: "2", name: "ثلاجة عرض", powerWatts: 800, quantity: 1, hoursPerDay: 24 },
      { id: "3", name: "مكيف هواء", powerWatts: 2000, quantity: 2, hoursPerDay: 12 },
      { id: "4", name: "خلاط/طاحونة", powerWatts: 500, quantity: 2, hoursPerDay: 4 },
      { id: "5", name: "إضاءة ديكور", powerWatts: 20, quantity: 30, hoursPerDay: 12 },
    ],
  },
  {
    id: "restaurant",
    name: "مطعم", // Restaurant
    devices: [
      { id: "1", name: "ثلاجات ومجمدات", powerWatts: 1500, quantity: 4, hoursPerDay: 24 },
      { id: "2", name: "أفران/شوايات كهربائية", powerWatts: 5000, quantity: 2, hoursPerDay: 10 },
      { id: "3", name: "مكيفات هواء", powerWatts: 2500, quantity: 3, hoursPerDay: 12 },
      { id: "4", name: "شفاطات هواء", powerWatts: 1000, quantity: 2, hoursPerDay: 12 },
      { id: "5", name: "إضاءة", powerWatts: 60, quantity: 40, hoursPerDay: 14 },
    ],
  },
  {
    id: "hotel",
    name: "فندق", // Hotel
    devices: [
      { id: "1", name: "مكيفات غرف", powerWatts: 1500, quantity: 30, hoursPerDay: 12 },
      { id: "2", name: "سخانات مياه", powerWatts: 2000, quantity: 30, hoursPerDay: 4 },
      { id: "3", name: "ثلاجات غرف صغيرة", powerWatts: 150, quantity: 30, hoursPerDay: 24 },
      { id: "4", name: "مصاعد", powerWatts: 8000, quantity: 2, hoursPerDay: 10 },
      { id: "5", name: "معدات مطبخ الفندق", powerWatts: 15000, quantity: 1, hoursPerDay: 12 },
      { id: "6", name: "إضاءة", powerWatts: 40, quantity: 150, hoursPerDay: 12 },
    ],
  },
  {
    id: "bank",
    name: "بنك", // Bank
    devices: [
      { id: "1", name: "أجهزة كمبيوتر", powerWatts: 300, quantity: 30, hoursPerDay: 10 },
      { id: "2", name: "صرافات آلية (ATM)", powerWatts: 500, quantity: 3, hoursPerDay: 24 },
      { id: "3", name: "مكيفات هواء مركزية", powerWatts: 10000, quantity: 2, hoursPerDay: 10 },
      { id: "4", name: "إضاءة", powerWatts: 40, quantity: 80, hoursPerDay: 12 },
    ],
  },
  {
    id: "supermarket",
    name: "سوبر ماركت", // Supermarket
    devices: [
      { id: "1", name: "ثلاجات عرض مفتوحة", powerWatts: 2000, quantity: 5, hoursPerDay: 24 },
      { id: "2", name: "مجمدات (فريزر)", powerWatts: 1500, quantity: 4, hoursPerDay: 24 },
      { id: "3", name: "مكيفات هواء", powerWatts: 3000, quantity: 4, hoursPerDay: 14 },
      { id: "4", name: "أجهزة كاشير", powerWatts: 200, quantity: 3, hoursPerDay: 14 },
      { id: "5", name: "إضاءة", powerWatts: 60, quantity: 60, hoursPerDay: 16 },
    ],
  },
  {
    id: "gas_station",
    name: "طرمبة وقود", // Gas Station
    devices: [
      { id: "1", name: "مضخات وقود", powerWatts: 1500, quantity: 6, hoursPerDay: 10 },
      { id: "2", name: "إضاءة مظلة (كشافات)", powerWatts: 250, quantity: 12, hoursPerDay: 12 },
      { id: "3", name: "ثلاجات ماركت صغير", powerWatts: 1000, quantity: 2, hoursPerDay: 24 },
      { id: "4", name: "أجهزة كمبيوتر/كاشير", powerWatts: 300, quantity: 2, hoursPerDay: 24 },
    ],
  },
  {
    id: "mining_company",
    name: "شركة تعدين", // Mining Company
    devices: [
      { id: "1", name: "كسارات", powerWatts: 25000, quantity: 2, hoursPerDay: 12 },
      { id: "2", name: "مضخات مياه/طين", powerWatts: 10000, quantity: 3, hoursPerDay: 12 },
      { id: "3", name: "سيور ناقلة", powerWatts: 5000, quantity: 4, hoursPerDay: 12 },
      { id: "4", name: "إضاءة أبراج", powerWatts: 1000, quantity: 10, hoursPerDay: 12 },
      { id: "5", name: "معدات معسكر (تكييف/مطبخ)", powerWatts: 15000, quantity: 1, hoursPerDay: 12 },
    ],
  },
];

// Calculation Functions
const calculateSolarSystemRequirements = function(devices) {
  let totalDailyEnergyWh = 0;
  let peakPowerWatts = 0;

  devices.forEach((device) => {
    const power = Number(device.powerWatts) || 0;
    const qty = Number(device.quantity) || 0;
    const hours = Number(device.hoursPerDay) || 0;

    const deviceTotalPower = power * qty;
    peakPowerWatts += deviceTotalPower;
    totalDailyEnergyWh += deviceTotalPower * hours;
  });

  // Safety factors and efficiencies
  const inverterSafetyFactor = 1.25; // 25% overhead
  const solarPanelEfficiency = 0.8; // Derating factor for real-world vs STC
  const averageSunHours = 5; // Average peak sun hours
  const batteryDepthOfDischarge = 0.5; // 50% DoD for Lead Acid (can be adjusted for Lithium)
  const systemVoltage = 48; // Assuming 48V battery bank for medium/large systems

  // Calculations
  const requiredInverterCapacityW = peakPowerWatts * inverterSafetyFactor;

  // Total daily energy needed from panels = Total Consumption / Efficiency
  const energyRequiredFromPanelsWh = totalDailyEnergyWh / solarPanelEfficiency;

  // Solar Array Capacity = Daily Energy needed / Sun Hours
  const requiredSolarArrayCapacityW = energyRequiredFromPanelsWh / averageSunHours;

  // Battery Capacity
  // Capacity needed to run everything for 1 day without sun, accounting for DoD
  const requiredBatteryCapacityWh = totalDailyEnergyWh / batteryDepthOfDischarge;
  const requiredBatteryCapacityAh = requiredBatteryCapacityWh / systemVoltage;

  return {
    totalDailyEnergyWh,
    peakPowerWatts,
    requiredInverterCapacityW,
    requiredSolarArrayCapacityW,
    requiredBatteryCapacityWh,
    requiredBatteryCapacityAh,
    systemVoltage
  };
}
export { FACILITY_TYPES, calculateSolarSystemRequirements };
