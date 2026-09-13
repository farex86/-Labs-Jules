export const FACILITY_TYPES = [
  {
    id: "ice_factory",
    name: "مصنع تلج",
    defaultAppliances: [
      { id: "1", name: "ماكينة ثلج", power: 5000, quantity: 2, hours: 24 },
      { id: "2", name: "مبرد", power: 2000, quantity: 2, hours: 24 },
      { id: "3", name: "إضاءة", power: 100, quantity: 10, hours: 12 },
    ],
  },
  {
    id: "company",
    name: "شركة",
    defaultAppliances: [
      { id: "1", name: "مكيف هواء", power: 1500, quantity: 4, hours: 8 },
      { id: "2", name: "جهاز كمبيوتر", power: 200, quantity: 10, hours: 8 },
      { id: "3", name: "طابعة", power: 300, quantity: 2, hours: 2 },
      { id: "4", name: "إضاءة", power: 50, quantity: 20, hours: 10 },
      { id: "5", name: "ثلاجة صغيرة", power: 150, quantity: 1, hours: 24 },
    ],
  },
  {
    id: "farm",
    name: "مزرعة",
    defaultAppliances: [
      { id: "1", name: "مضخة مياه", power: 3000, quantity: 1, hours: 6 },
      { id: "2", name: "إضاءة خارجية", power: 100, quantity: 5, hours: 12 },
    ],
  },
  {
    id: "poultry_farm",
    name: "مزرعة دواجن",
    defaultAppliances: [
      { id: "1", name: "مراوح تهوية", power: 500, quantity: 6, hours: 24 },
      { id: "2", name: "إضاءة", power: 60, quantity: 20, hours: 24 },
      { id: "3", name: "سخانات", power: 2000, quantity: 4, hours: 12 },
      { id: "4", name: "مضخة مياه", power: 1500, quantity: 1, hours: 4 },
    ],
  },
  {
    id: "greenhouse",
    name: "بيوت محمية",
    defaultAppliances: [
      { id: "1", name: "مراوح تبريد", power: 750, quantity: 4, hours: 10 },
      { id: "2", name: "مضخة ري", power: 1500, quantity: 1, hours: 4 },
      { id: "3", name: "إضاءة نمو", power: 400, quantity: 10, hours: 12 },
    ],
  },
  {
    id: "factory",
    name: "مصنع",
    defaultAppliances: [
      { id: "1", name: "آلات صناعية", power: 10000, quantity: 3, hours: 16 },
      { id: "2", name: "إضاءة مستودع", power: 200, quantity: 20, hours: 16 },
      { id: "3", name: "مكيفات مكاتب", power: 2000, quantity: 5, hours: 10 },
    ],
  },
  {
    id: "clinic",
    name: "مستوصف",
    defaultAppliances: [
      { id: "1", name: "مكيف هواء", power: 1500, quantity: 6, hours: 12 },
      { id: "2", name: "ثلاجة أدوية", power: 300, quantity: 2, hours: 24 },
      { id: "3", name: "أجهزة طبية", power: 1000, quantity: 3, hours: 8 },
      { id: "4", name: "إضاءة", power: 40, quantity: 30, hours: 14 },
    ],
  },
  {
    id: "hospital",
    name: "مستشفي",
    defaultAppliances: [
      { id: "1", name: "مكيف مركزي", power: 50000, quantity: 1, hours: 24 },
      { id: "2", name: "إضاءة", power: 40, quantity: 200, hours: 24 },
      { id: "3", name: "أجهزة طبية حيوية", power: 2000, quantity: 10, hours: 24 },
      { id: "4", name: "ثلاجات حفظ", power: 500, quantity: 10, hours: 24 },
      { id: "5", name: "أجهزة أشعة", power: 5000, quantity: 2, hours: 8 },
    ],
  },
  {
    id: "bakery",
    name: "مخبز",
    defaultAppliances: [
      { id: "1", name: "عجانة", power: 3000, quantity: 2, hours: 6 },
      { id: "2", name: "فرن كهربائي", power: 8000, quantity: 2, hours: 10 },
      { id: "3", name: "ثلاجة", power: 1000, quantity: 2, hours: 24 },
      { id: "4", name: "إضاءة", power: 50, quantity: 10, hours: 16 },
    ],
  },
  {
    id: "shop",
    name: "دكان",
    defaultAppliances: [
      { id: "1", name: "ثلاجة عرض", power: 600, quantity: 2, hours: 24 },
      { id: "2", name: "إضاءة", power: 40, quantity: 4, hours: 12 },
      { id: "3", name: "مروحة", power: 75, quantity: 2, hours: 12 },
    ],
  },
  {
    id: "workshop",
    name: "ورشة",
    defaultAppliances: [
      { id: "1", name: "ماكينة لحام", power: 4000, quantity: 1, hours: 4 },
      { id: "2", name: "صاروخ قص", power: 2000, quantity: 2, hours: 3 },
      { id: "3", name: "كمبروسر هواء", power: 3000, quantity: 1, hours: 5 },
      { id: "4", name: "إضاءة كاشفة", power: 200, quantity: 4, hours: 8 },
    ],
  },
  {
    id: "water_pump",
    name: "مضخة موية",
    defaultAppliances: [
      { id: "1", name: "مضخة غاطسة", power: 4000, quantity: 1, hours: 8 },
    ],
  },
  {
    id: "donkey",
    name: "دونكي", // Assuming 'Donkey' refers to a specific local type of water point or station
    defaultAppliances: [
      { id: "1", name: "مضخة", power: 2200, quantity: 1, hours: 6 },
    ],
  },
  {
    id: "mosque",
    name: "مسجد",
    defaultAppliances: [
      { id: "1", name: "مكيف هواء", power: 2000, quantity: 6, hours: 4 },
      { id: "2", name: "مراوح", power: 75, quantity: 15, hours: 6 },
      { id: "3", name: "إضاءة", power: 40, quantity: 30, hours: 6 },
      { id: "4", name: "مكبر صوت", power: 200, quantity: 1, hours: 2 },
    ],
  },
  {
    id: "printing_press",
    name: "مطبعة",
    defaultAppliances: [
      { id: "1", name: "آلة طباعة", power: 5000, quantity: 2, hours: 8 },
      { id: "2", name: "قاطعة ورق", power: 1500, quantity: 1, hours: 4 },
      { id: "3", name: "مكيف هواء", power: 2000, quantity: 3, hours: 10 },
      { id: "4", name: "إضاءة", power: 60, quantity: 20, hours: 10 },
    ],
  },
  {
    id: "coffee_shop",
    name: "كوفي شوب",
    defaultAppliances: [
      { id: "1", name: "ماكينة اسبريسو", power: 3500, quantity: 1, hours: 12 },
      { id: "2", name: "طاحونة قهوة", power: 500, quantity: 2, hours: 4 },
      { id: "3", name: "ثلاجة عرض", power: 800, quantity: 1, hours: 24 },
      { id: "4", name: "صانع ثلج", power: 600, quantity: 1, hours: 24 },
      { id: "5", name: "مكيف هواء", power: 2000, quantity: 2, hours: 16 },
      { id: "6", name: "إضاءة", power: 40, quantity: 15, hours: 16 },
    ],
  },
  {
    id: "restaurant",
    name: "مطعم",
    defaultAppliances: [
      { id: "1", name: "ثلاجات وتجميد", power: 1500, quantity: 4, hours: 24 },
      { id: "2", name: "أفران/شوايات كهربائية", power: 5000, quantity: 2, hours: 10 },
      { id: "3", name: "مكيف هواء", power: 2500, quantity: 4, hours: 14 },
      { id: "4", name: "إضاءة", power: 50, quantity: 30, hours: 14 },
      { id: "5", name: "شفاطات", power: 800, quantity: 2, hours: 12 },
    ],
  },
  {
    id: "hotel",
    name: "فندق",
    defaultAppliances: [
      { id: "1", name: "مكيفات غرف", power: 1500, quantity: 50, hours: 12 },
      { id: "2", name: "إضاءة عامة", power: 50, quantity: 150, hours: 24 },
      { id: "3", name: "مصاعد", power: 15000, quantity: 2, hours: 4 },
      { id: "4", name: "ثلاجات صغيرة", power: 100, quantity: 50, hours: 24 },
      { id: "5", name: "مغسلة مركزية", power: 8000, quantity: 1, hours: 8 },
    ],
  },
  {
    id: "bank",
    name: "بنك",
    defaultAppliances: [
      { id: "1", name: "مكيف مركزي", power: 20000, quantity: 1, hours: 12 },
      { id: "2", name: "أجهزة كمبيوتر", power: 200, quantity: 30, hours: 10 },
      { id: "3", name: "إضاءة", power: 40, quantity: 80, hours: 12 },
      { id: "4", name: "خوادم (Servers)", power: 1500, quantity: 2, hours: 24 },
      { id: "5", name: "ماكينات صراف آلي", power: 500, quantity: 3, hours: 24 },
    ],
  },
  {
    id: "supermarket",
    name: "سوبر ماركت",
    defaultAppliances: [
      { id: "1", name: "ثلاجات عرض", power: 1200, quantity: 10, hours: 24 },
      { id: "2", name: "فريزرات", power: 1500, quantity: 6, hours: 24 },
      { id: "3", name: "مكيف هواء", power: 3000, quantity: 4, hours: 16 },
      { id: "4", name: "إضاءة", power: 50, quantity: 60, hours: 16 },
      { id: "5", name: "كاشير", power: 150, quantity: 4, hours: 16 },
    ],
  },
  {
    id: "gas_station",
    name: "طرمبة وقود",
    defaultAppliances: [
      { id: "1", name: "مضخات وقود", power: 1500, quantity: 4, hours: 10 },
      { id: "2", name: "إضاءة المظلة", power: 200, quantity: 8, hours: 12 },
      { id: "3", name: "مكيف مكتب", power: 1500, quantity: 1, hours: 24 },
      { id: "4", name: "ثلاجة ماركت", power: 800, quantity: 2, hours: 24 },
    ],
  },
  {
    id: "mining_company",
    name: "شركة تعدين",
    defaultAppliances: [
      { id: "1", name: "كسارات", power: 25000, quantity: 2, hours: 12 },
      { id: "2", name: "مضخات مياه/طين", power: 10000, quantity: 3, hours: 12 },
      { id: "3", name: "إضاءة كاشفة", power: 1000, quantity: 10, hours: 12 },
      { id: "4", name: "مكيفات الكامب", power: 1500, quantity: 20, hours: 10 },
    ],
  },
];

/**
 * Calculates total daily energy consumption in Watt-hours (Wh)
 */
export function calculateTotalConsumption(appliances) {
  return appliances.reduce((total, appliance) => {
    return total + (appliance.power * appliance.quantity * appliance.hours);
  }, 0);
}

/**
 * Calculates max simultaneous power load in Watts (W)
 */
export function calculatePeakLoad(appliances) {
  return appliances.reduce((total, appliance) => {
    return total + (appliance.power * appliance.quantity);
  }, 0);
}

/**
 * Calculates recommended inverter size in Watts
 * Includes a safety margin (e.g., 25% extra capacity)
 */
export function calculateInverterSize(peakLoad, safetyMargin = 1.25) {
  return Math.ceil(peakLoad * safetyMargin);
}

/**
 * Calculates recommended solar panel total capacity in Watts
 * Assuming an average of 5 peak sun hours per day and system efficiency of 80%
 */
export function calculatePanelCapacity(dailyConsumptionWh, peakSunHours = 5, systemEfficiency = 0.8) {
  if (dailyConsumptionWh === 0) return 0;
  return Math.ceil(dailyConsumptionWh / (peakSunHours * systemEfficiency));
}

/**
 * Calculates recommended battery capacity in Ampere-hours (Ah)
 * Assuming system voltage (e.g., 48V), depth of discharge (e.g., 50% for Lead Acid or 80% for Lithium),
 * and days of autonomy.
 */
export function calculateBatteryCapacity(dailyConsumptionWh, systemVoltage = 48, depthOfDischarge = 0.8, daysOfAutonomy = 1) {
  if (dailyConsumptionWh === 0) return 0;
  // Battery Capacity (Ah) = (Daily Consumption (Wh) * Days of Autonomy) / (System Voltage * DoD)
  return Math.ceil((dailyConsumptionWh * daysOfAutonomy) / (systemVoltage * depthOfDischarge));
}
