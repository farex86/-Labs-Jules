export const facilityTypes = [
  {
    id: "ice_factory",
    name: "مصنع ثلج",
    devices: [
      { id: 1, name: "ماكينة صنع الثلج", power: 5000, quantity: 2, hours: 24 },
      { id: 2, name: "غرفة تبريد", power: 3000, quantity: 1, hours: 24 },
      { id: 3, name: "إضاءة", power: 40, quantity: 10, hours: 12 },
    ]
  },
  {
    id: "company",
    name: "شركة",
    devices: [
      { id: 1, name: "مكيف هواء", power: 1500, quantity: 5, hours: 8 },
      { id: 2, name: "جهاز كمبيوتر", power: 250, quantity: 20, hours: 8 },
      { id: 3, name: "إضاءة", power: 40, quantity: 30, hours: 10 },
      { id: 4, name: "طابعة", power: 500, quantity: 2, hours: 2 },
    ]
  },
  {
    id: "farm",
    name: "مزرعة",
    devices: [
      { id: 1, name: "مضخة مياه سطحية", power: 2200, quantity: 1, hours: 6 },
      { id: 2, name: "إضاءة خارجية", power: 100, quantity: 5, hours: 12 },
    ]
  },
  {
    id: "poultry_farm",
    name: "مزرعة دواجن",
    devices: [
      { id: 1, name: "مراوح تهوية", power: 750, quantity: 6, hours: 24 },
      { id: 2, name: "نظام تدفئة", power: 2000, quantity: 2, hours: 12 },
      { id: 3, name: "إضاءة", power: 40, quantity: 20, hours: 16 },
      { id: 4, name: "نظام تغذية آلي", power: 1500, quantity: 1, hours: 4 },
    ]
  },
  {
    id: "greenhouse",
    name: "بيوت محمية",
    devices: [
      { id: 1, name: "مراوح شفط", power: 500, quantity: 4, hours: 12 },
      { id: 2, name: "مضخة ري", power: 1500, quantity: 1, hours: 4 },
      { id: 3, name: "نظام تبريد (خلايا)", power: 750, quantity: 2, hours: 10 },
    ]
  },
  {
    id: "factory",
    name: "مصنع",
    devices: [
      { id: 1, name: "ماكينة إنتاج رئيسية", power: 10000, quantity: 2, hours: 16 },
      { id: 2, name: "محرك كهربائي", power: 5000, quantity: 4, hours: 16 },
      { id: 3, name: "إضاءة صناعية", power: 150, quantity: 40, hours: 16 },
      { id: 4, name: "مكيف هواء مكاتب", power: 2000, quantity: 3, hours: 8 },
    ]
  },
  {
    id: "clinic",
    name: "مستوصف",
    devices: [
      { id: 1, name: "مكيف هواء", power: 1500, quantity: 6, hours: 12 },
      { id: 2, name: "ثلاجة أدوية", power: 300, quantity: 2, hours: 24 },
      { id: 3, name: "جهاز أشعة", power: 3000, quantity: 1, hours: 2 },
      { id: 4, name: "إضاءة", power: 40, quantity: 30, hours: 14 },
    ]
  },
  {
    id: "hospital",
    name: "مستشفى",
    devices: [
      { id: 1, name: "مكيف هواء مركزي", power: 20000, quantity: 2, hours: 24 },
      { id: 2, name: "أجهزة طبية (عناية)", power: 1000, quantity: 20, hours: 24 },
      { id: 3, name: "ثلاجة بنك الدم", power: 500, quantity: 3, hours: 24 },
      { id: 4, name: "مصعد", power: 7500, quantity: 2, hours: 24 },
      { id: 5, name: "إضاءة", power: 40, quantity: 200, hours: 24 },
    ]
  },
  {
    id: "bakery",
    name: "مخبز",
    devices: [
      { id: 1, name: "عجانة", power: 3000, quantity: 2, hours: 6 },
      { id: 2, name: "فرن كهربائي", power: 15000, quantity: 1, hours: 10 },
      { id: 3, name: "قطاعة عجين", power: 1500, quantity: 1, hours: 4 },
      { id: 4, name: "إضاءة", power: 40, quantity: 15, hours: 12 },
    ]
  },
  {
    id: "shop",
    name: "دكان",
    devices: [
      { id: 1, name: "ثلاجة عرض", power: 800, quantity: 2, hours: 24 },
      { id: 2, name: "فريزر", power: 600, quantity: 1, hours: 24 },
      { id: 3, name: "مروحة سقف", power: 80, quantity: 2, hours: 14 },
      { id: 4, name: "إضاءة", power: 40, quantity: 4, hours: 8 },
    ]
  },
  {
    id: "workshop",
    name: "ورشة",
    devices: [
      { id: 1, name: "ماكينة لحام", power: 4000, quantity: 2, hours: 4 },
      { id: 2, name: "صاروخ قطعية", power: 2000, quantity: 2, hours: 3 },
      { id: 3, name: "كمبروسر هواء", power: 3000, quantity: 1, hours: 5 },
      { id: 4, name: "إضاءة", power: 100, quantity: 6, hours: 8 },
    ]
  },
  {
    id: "water_pump",
    name: "مضخة مياه",
    devices: [
      { id: 1, name: "غاطس مياه", power: 5500, quantity: 1, hours: 8 },
    ]
  },
  {
    id: "donkey",
    name: "دونكي (محطة مياه)",
    devices: [
      { id: 1, name: "مضخة رئيسية", power: 7500, quantity: 1, hours: 10 },
      { id: 2, name: "إضاءة", power: 50, quantity: 2, hours: 12 },
    ]
  },
  {
    id: "mosque",
    name: "مسجد",
    devices: [
      { id: 1, name: "مكيف هواء", power: 2000, quantity: 6, hours: 4 },
      { id: 2, name: "مراوح", power: 80, quantity: 20, hours: 6 },
      { id: 3, name: "نظام صوتي", power: 300, quantity: 1, hours: 3 },
      { id: 4, name: "إضاءة", power: 40, quantity: 40, hours: 6 },
    ]
  },
  {
    id: "printing_press",
    name: "مطبعة",
    devices: [
      { id: 1, name: "ماكينة طباعة رئيسية", power: 8000, quantity: 1, hours: 10 },
      { id: 2, name: "ماكينة قص ورق", power: 3000, quantity: 1, hours: 4 },
      { id: 3, name: "مكيف هواء", power: 2000, quantity: 3, hours: 10 },
      { id: 4, name: "إضاءة", power: 60, quantity: 20, hours: 12 },
    ]
  },
  {
    id: "coffee_shop",
    name: "كوفي شوب",
    devices: [
      { id: 1, name: "ماكينة اسبريسو", power: 3500, quantity: 1, hours: 12 },
      { id: 2, name: "ثلاجة عرض حلويات", power: 800, quantity: 1, hours: 24 },
      { id: 3, name: "مكيف هواء", power: 2000, quantity: 2, hours: 14 },
      { id: 4, name: "خلاط/طاحونة", power: 1000, quantity: 2, hours: 3 },
      { id: 5, name: "إضاءة", power: 40, quantity: 20, hours: 14 },
    ]
  },
  {
    id: "restaurant",
    name: "مطعم",
    devices: [
      { id: 1, name: "ثلاجة/فريزر", power: 1200, quantity: 3, hours: 24 },
      { id: 2, name: "فرن/شواية كهربائية", power: 5000, quantity: 1, hours: 8 },
      { id: 3, name: "مكيف هواء", power: 2500, quantity: 4, hours: 14 },
      { id: 4, name: "إضاءة", power: 40, quantity: 30, hours: 16 },
      { id: 5, name: "مروحة شفط", power: 1000, quantity: 2, hours: 14 },
    ]
  },
  {
    id: "hotel",
    name: "فندق",
    devices: [
      { id: 1, name: "مكيفات الغرف", power: 1500, quantity: 30, hours: 12 },
      { id: 2, name: "إضاءة الغرف والممرات", power: 20, quantity: 150, hours: 12 },
      { id: 3, name: "مصعد", power: 5500, quantity: 1, hours: 24 },
      { id: 4, name: "ثلاجات صغيرة", power: 100, quantity: 30, hours: 24 },
      { id: 5, name: "معدات مطبخ الفندق", power: 10000, quantity: 1, hours: 10 },
    ]
  },
  {
    id: "bank",
    name: "بنك",
    devices: [
      { id: 1, name: "مكيف هواء مركزي", power: 15000, quantity: 1, hours: 10 },
      { id: 2, name: "أجهزة كمبيوتر", power: 250, quantity: 30, hours: 10 },
      { id: 3, name: "صراف آلي (ATM)", power: 500, quantity: 3, hours: 24 },
      { id: 4, name: "إضاءة", power: 40, quantity: 80, hours: 12 },
      { id: 5, name: "سيرفرات", power: 2000, quantity: 2, hours: 24 },
    ]
  },
  {
    id: "supermarket",
    name: "سوبر ماركت",
    devices: [
      { id: 1, name: "ثلاجة عرض منتجات ألبان", power: 1500, quantity: 4, hours: 24 },
      { id: 2, name: "فريزر لحوم", power: 2000, quantity: 3, hours: 24 },
      { id: 3, name: "مكيف هواء", power: 3000, quantity: 3, hours: 16 },
      { id: 4, name: "إضاءة", power: 40, quantity: 60, hours: 16 },
      { id: 5, name: "نقاط بيع (كاشير)", power: 200, quantity: 4, hours: 16 },
    ]
  },
  {
    id: "gas_station",
    name: "طرمبة وقود",
    devices: [
      { id: 1, name: "مضخة وقود", power: 1500, quantity: 6, hours: 24 },
      { id: 2, name: "إضاءة المظلة", power: 150, quantity: 10, hours: 12 },
      { id: 3, name: "مكيف هواء (الإدارة/البقالة)", power: 2000, quantity: 2, hours: 24 },
      { id: 4, name: "ثلاجة عرض (البقالة)", power: 800, quantity: 2, hours: 24 },
    ]
  },
  {
    id: "mining_company",
    name: "شركة تعدين",
    devices: [
      { id: 1, name: "معدات طحن وتكسير", power: 50000, quantity: 1, hours: 16 },
      { id: 2, name: "مضخات مياه كبيرة", power: 15000, quantity: 2, hours: 24 },
      { id: 3, name: "إضاءة كاشفة", power: 1000, quantity: 10, hours: 12 },
      { id: 4, name: "مكيفات الكامبات", power: 1500, quantity: 20, hours: 12 },
    ]
  }
];

/**
 * Calculates the total daily energy consumption in Watt-hours (Wh).
 * @param {Array} devices - Array of device objects { power, quantity, hours }.
 * @returns {number} Total daily energy in Wh.
 */
export const calculateTotalDailyEnergy = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.power * device.quantity * device.hours);
  }, 0);
};

/**
 * Calculates the total peak power in Watts (W).
 * @param {Array} devices - Array of device objects { power, quantity }.
 * @returns {number} Total peak power in W.
 */
export const calculateTotalPeakPower = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.power * device.quantity);
  }, 0);
};

/**
 * Calculates the required system size in kiloWatts (kW) based on peak sun hours.
 * @param {number} totalDailyEnergyWh - Total daily energy in Wh.
 * @param {number} peakSunHours - Average peak sun hours per day (default 5 for Sudan/region).
 * @param {number} systemEfficiency - Overall system efficiency (default 0.7 or 70%).
 * @returns {number} Required solar array size in kW.
 */
export const calculateSystemSizeKW = (totalDailyEnergyWh, peakSunHours = 5, systemEfficiency = 0.7) => {
  const systemSizeW = totalDailyEnergyWh / (peakSunHours * systemEfficiency);
  return systemSizeW / 1000;
};

/**
 * Calculates the required battery capacity in Ampere-hours (Ah).
 * @param {number} totalDailyEnergyWh - Total daily energy in Wh.
 * @param {number} daysOfAutonomy - Number of days the system needs to run without sun (default 1).
 * @param {number} depthOfDischarge - Maximum allowed depth of discharge for batteries (default 0.5 or 50% for Lead-Acid).
 * @param {number} systemVoltage - Battery bank voltage (default 48V for larger systems).
 * @returns {number} Required battery capacity in Ah.
 */
export const calculateBatteryCapacityAh = (totalDailyEnergyWh, daysOfAutonomy = 1, depthOfDischarge = 0.5, systemVoltage = 48) => {
  const totalWhRequired = totalDailyEnergyWh * daysOfAutonomy;
  const usableBatteryCapacityWh = totalWhRequired / depthOfDischarge;
  return usableBatteryCapacityWh / systemVoltage;
};

/**
 * Calculates the required inverter size in Watts (W).
 * @param {number} totalPeakPowerW - Total peak power of all devices running simultaneously.
 * @param {number} safetyFactor - Safety factor to account for surge and future expansion (default 1.25 or 25% extra).
 * @returns {number} Required inverter size in W.
 */
export const calculateInverterSizeW = (totalPeakPowerW, safetyFactor = 1.25) => {
  return totalPeakPowerW * safetyFactor;
};

/**
 * Calculates the number of solar panels required.
 * @param {number} systemSizeKW - Required system size in kW.
 * @param {number} panelRatingW - Wattage rating of a single panel (default 500W).
 * @returns {number} Number of panels required (rounded up).
 */
export const calculatePanelCount = (systemSizeKW, panelRatingW = 500) => {
  const systemSizeW = systemSizeKW * 1000;
  return Math.ceil(systemSizeW / panelRatingW);
};
