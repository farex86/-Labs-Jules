// src/models/SolarCalculatorModel.js

/**
 * Solar Calculator Business Logic and Configuration
 *
 * Separates pure calculation formulas and constant configurations (like
 * facility types, default appliances) from UI components.
 */

// Basic Appliace definitions for reuse
const APPLIANCES = {
  AC: { name: "مكيف (AC)", power: 1500 }, // 1.5 tons AC approx
  FRIDGE: { name: "ثلاجة", power: 250 },
  LIGHT: { name: "إضاءة", power: 20 },
  TV: { name: "تلفزيون", power: 100 },
  WATER_PUMP: { name: "مضخة مياه", power: 750 }, // 1 HP
  COMPUTER: { name: "كمبيوتر", power: 200 },
  OVEN: { name: "فرن كهربائي", power: 2000 },
  WASHING_MACHINE: { name: "غسالة", power: 500 },
  FREEZER: { name: "فريزر", power: 300 },
  MACHINERY: { name: "معدات صناعية", power: 3000 },
  FAN: { name: "مروحة", power: 70 },
  COFFEE_MACHINE: { name: "ماكينة قهوة", power: 1200 },
  PRINTING_PRESS: { name: "مكبس طباعة / آلة طباعة", power: 1500 },
  INCUBATOR: { name: "حاضنة", power: 500 },
  MEDICAL_EQUIPMENT: { name: "معدات طبية", power: 1000 },
};

// Facility Types with localized Arabic names and default consumption patterns
export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    defaultAppliances: [
      { ...APPLIANCES.MACHINERY, name: "ماكينة صنع الثلج الكبيرة", power: 5000, quantity: 2, hours: 24 },
      { ...APPLIANCES.FREEZER, name: "غرفة تجميد", power: 2000, quantity: 3, hours: 24 },
      { ...APPLIANCES.LIGHT, quantity: 10, hours: 12 }
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    defaultAppliances: [
      { ...APPLIANCES.AC, quantity: 4, hours: 10 },
      { ...APPLIANCES.COMPUTER, quantity: 10, hours: 10 },
      { ...APPLIANCES.LIGHT, quantity: 20, hours: 10 },
      { ...APPLIANCES.FRIDGE, quantity: 1, hours: 24 }
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultAppliances: [
      { ...APPLIANCES.WATER_PUMP, name: "مضخة ري", power: 2200, quantity: 2, hours: 8 }, // ~3HP
      { ...APPLIANCES.LIGHT, quantity: 5, hours: 12 }
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultAppliances: [
      { ...APPLIANCES.FAN, name: "مراوح تهوية", quantity: 10, hours: 24 },
      { ...APPLIANCES.LIGHT, quantity: 20, hours: 16 },
      { ...APPLIANCES.WATER_PUMP, quantity: 1, hours: 4 },
      { ...APPLIANCES.INCUBATOR, quantity: 2, hours: 24 }
    ]
  },
  {
    id: 'greenhouses',
    name: 'بيوت محمية',
    defaultAppliances: [
      { ...APPLIANCES.WATER_PUMP, name: "مضخة ري وتبريد", quantity: 2, hours: 12 },
      { ...APPLIANCES.FAN, name: "مراوح شفط", quantity: 6, hours: 12 },
      { ...APPLIANCES.LIGHT, quantity: 10, hours: 8 }
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultAppliances: [
      { ...APPLIANCES.MACHINERY, quantity: 5, hours: 16 },
      { ...APPLIANCES.LIGHT, quantity: 30, hours: 16 },
      { ...APPLIANCES.AC, quantity: 2, hours: 16 }
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultAppliances: [
      { ...APPLIANCES.AC, quantity: 3, hours: 12 },
      { ...APPLIANCES.LIGHT, quantity: 15, hours: 12 },
      { ...APPLIANCES.MEDICAL_EQUIPMENT, quantity: 2, hours: 8 },
      { ...APPLIANCES.FRIDGE, name: "ثلاجة أدوية", quantity: 1, hours: 24 },
      { ...APPLIANCES.COMPUTER, quantity: 3, hours: 12 }
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    defaultAppliances: [
      { ...APPLIANCES.AC, quantity: 20, hours: 24 },
      { ...APPLIANCES.LIGHT, quantity: 100, hours: 24 },
      { ...APPLIANCES.MEDICAL_EQUIPMENT, name: "معدات طبية ثقيلة", power: 3000, quantity: 5, hours: 12 },
      { ...APPLIANCES.FRIDGE, name: "ثلاجات أدوية ودم", quantity: 5, hours: 24 },
      { ...APPLIANCES.COMPUTER, quantity: 15, hours: 24 }
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultAppliances: [
      { ...APPLIANCES.MACHINERY, name: "عجانة", power: 2000, quantity: 2, hours: 8 },
      { ...APPLIANCES.OVEN, name: "فرن كهربائي (إذا لم يكن غاز)", power: 5000, quantity: 1, hours: 8 },
      { ...APPLIANCES.LIGHT, quantity: 10, hours: 16 },
      { ...APPLIANCES.FAN, quantity: 4, hours: 16 }
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultAppliances: [
      { ...APPLIANCES.LIGHT, quantity: 5, hours: 12 },
      { ...APPLIANCES.FRIDGE, quantity: 1, hours: 24 },
      { ...APPLIANCES.FAN, quantity: 2, hours: 12 }
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultAppliances: [
      { ...APPLIANCES.MACHINERY, name: "معدات لحام/قطع", power: 3500, quantity: 2, hours: 6 },
      { ...APPLIANCES.LIGHT, quantity: 8, hours: 10 },
      { ...APPLIANCES.FAN, quantity: 2, hours: 10 }
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    defaultAppliances: [
      { ...APPLIANCES.WATER_PUMP, name: "مضخة رئيسية", power: 2200, quantity: 1, hours: 10 }
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي', // Water station/well (common term in some Arab regions like Sudan)
    defaultAppliances: [
      { ...APPLIANCES.WATER_PUMP, name: "مضخة بئر غاطسة", power: 1500, quantity: 1, hours: 8 },
      { ...APPLIANCES.LIGHT, quantity: 2, hours: 12 }
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultAppliances: [
      { ...APPLIANCES.AC, quantity: 4, hours: 4 },
      { ...APPLIANCES.LIGHT, quantity: 20, hours: 4 },
      { ...APPLIANCES.FAN, quantity: 10, hours: 4 },
      { ...APPLIANCES.MACHINERY, name: "مكبر صوت", power: 200, quantity: 1, hours: 4 }
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultAppliances: [
      { ...APPLIANCES.PRINTING_PRESS, quantity: 2, hours: 10 },
      { ...APPLIANCES.COMPUTER, quantity: 3, hours: 10 },
      { ...APPLIANCES.LIGHT, quantity: 10, hours: 10 },
      { ...APPLIANCES.AC, quantity: 2, hours: 10 }
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultAppliances: [
      { ...APPLIANCES.COFFEE_MACHINE, quantity: 1, hours: 12 },
      { ...APPLIANCES.AC, quantity: 2, hours: 16 },
      { ...APPLIANCES.LIGHT, quantity: 15, hours: 16 },
      { ...APPLIANCES.FRIDGE, quantity: 2, hours: 24 },
      { ...APPLIANCES.OVEN, name: "ميكروويف/سخان", power: 1500, quantity: 1, hours: 2 }
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultAppliances: [
      { ...APPLIANCES.AC, quantity: 4, hours: 16 },
      { ...APPLIANCES.LIGHT, quantity: 25, hours: 16 },
      { ...APPLIANCES.FRIDGE, quantity: 3, hours: 24 },
      { ...APPLIANCES.FREEZER, quantity: 2, hours: 24 },
      { ...APPLIANCES.FAN, name: "شفاط مطبخ", power: 400, quantity: 2, hours: 16 }
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultAppliances: [
      { ...APPLIANCES.AC, quantity: 15, hours: 20 },
      { ...APPLIANCES.LIGHT, quantity: 50, hours: 24 },
      { ...APPLIANCES.FRIDGE, name: "ثلاجات غرف", power: 100, quantity: 15, hours: 24 },
      { ...APPLIANCES.TV, quantity: 15, hours: 6 },
      { ...APPLIANCES.WATER_PUMP, quantity: 2, hours: 8 }
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultAppliances: [
      { ...APPLIANCES.AC, quantity: 6, hours: 10 },
      { ...APPLIANCES.COMPUTER, quantity: 15, hours: 10 },
      { ...APPLIANCES.LIGHT, quantity: 40, hours: 10 },
      { ...APPLIANCES.MACHINERY, name: "ماكينات صراف آلي", power: 400, quantity: 2, hours: 24 }
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultAppliances: [
      { ...APPLIANCES.AC, quantity: 4, hours: 16 },
      { ...APPLIANCES.LIGHT, quantity: 30, hours: 16 },
      { ...APPLIANCES.FRIDGE, name: "ثلاجات عرض", power: 600, quantity: 5, hours: 24 },
      { ...APPLIANCES.FREEZER, quantity: 3, hours: 24 },
      { ...APPLIANCES.COMPUTER, name: "كاشير", power: 150, quantity: 3, hours: 16 }
    ]
  },
  {
    id: 'fuel_station',
    name: 'طرمبة وقود',
    defaultAppliances: [
      { ...APPLIANCES.MACHINERY, name: "مضخات وقود", power: 1000, quantity: 4, hours: 24 },
      { ...APPLIANCES.LIGHT, name: "إضاءة مظلة", power: 100, quantity: 10, hours: 12 },
      { ...APPLIANCES.AC, name: "مكيف البقالة/المكتب", quantity: 1, hours: 24 },
      { ...APPLIANCES.FRIDGE, quantity: 2, hours: 24 }
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultAppliances: [
      { ...APPLIANCES.MACHINERY, name: "معدات طحن/كسارات", power: 10000, quantity: 2, hours: 12 },
      { ...APPLIANCES.WATER_PUMP, name: "مضخات مياه كبيرة", power: 4000, quantity: 2, hours: 12 },
      { ...APPLIANCES.LIGHT, name: "كشافات إضاءة", power: 400, quantity: 20, hours: 12 },
      { ...APPLIANCES.AC, name: "مكيفات مكاتب وسكن", quantity: 5, hours: 12 }
    ]
  }
];

/**
 * Pure function to calculate solar system requirements based on appliances
 *
 * @param {Array} appliances - List of appliance objects { name, power, quantity, hours }
 * @returns {Object} Calculated system sizes
 */
export function calculateSolarSystem(appliances) {
  if (!appliances || appliances.length === 0) {
    return {
      totalPowerW: 0,
      totalEnergyWh: 0,
      inverterSizeKW: 0,
      batteryCapacityAh: 0,
      panelsCount: 0,
      panelSizeW: 450 // Default panel size for calculation
    };
  }

  // 1. Total Power (Watts) - What's running at the same time
  // Sum of (power * quantity)
  const totalPowerW = appliances.reduce((sum, app) => sum + (app.power * app.quantity), 0);

  // 2. Total Energy (Watt-hours) per day
  // Sum of (power * quantity * hours)
  const totalEnergyWh = appliances.reduce((sum, app) => sum + (app.power * app.quantity * app.hours), 0);

  // Constants for calculation
  const SYSTEM_VOLTAGE = 48; // 48V battery system is standard for commercial
  const INVERTER_EFFICIENCY = 0.85; // 85% efficiency
  const BATTERY_DOD = 0.5; // Depth of Discharge (50% for lead acid/gel, though lithium is higher, 50% is safe for generic)
  const BATTERY_DAYS_AUTONOMY = 1; // 1 day of backup
  const PEAK_SUN_HOURS = 5; // Average PSH
  const PANEL_SIZE_W = 450; // 450W panels are common

  // 3. Inverter Size (kW)
  // Needs to handle total peak power + 25% safety margin
  // In reality, not all run at once, but this is a safe maximum estimate
  const inverterSizeW = (totalPowerW * 1.25);
  const inverterSizeKW = Math.ceil(inverterSizeW / 1000);

  // 4. Battery Capacity (Ah)
  // Total Energy / (System Voltage * Inverter Efficiency * Depth of Discharge)
  const batteryCapacityAh = Math.ceil((totalEnergyWh * BATTERY_DAYS_AUTONOMY) / (SYSTEM_VOLTAGE * INVERTER_EFFICIENCY * BATTERY_DOD));

  // 5. Number of Solar Panels
  // Total Energy / (Peak Sun Hours * Panel Wattage * System Efficiency)
  // System efficiency ~ 0.8 (losses from heat, dust, wiring)
  const panelsCount = Math.ceil(totalEnergyWh / (PEAK_SUN_HOURS * PANEL_SIZE_W * 0.8));

  return {
    totalPowerW,
    totalEnergyWh,
    inverterSizeKW,
    batteryCapacityAh,
    panelsCount,
    panelSizeW: PANEL_SIZE_W
  };
}
