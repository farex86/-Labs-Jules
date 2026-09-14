// Constants for typical appliances
const APPLIANCE = {
  AC: { name: 'مكيف', power: 1500, quantity: 1, hoursPerDay: 12 },
  LIGHT: { name: 'إضاءة', power: 20, quantity: 10, hoursPerDay: 8 },
  FRIDGE: { name: 'ثلاجة', power: 300, quantity: 1, hoursPerDay: 24 },
  COMPUTER: { name: 'كمبيوتر', power: 250, quantity: 1, hoursPerDay: 8 },
  TV: { name: 'تلفزيون', power: 100, quantity: 1, hoursPerDay: 5 },
  WATER_PUMP: { name: 'مضخة مياه', power: 750, quantity: 1, hoursPerDay: 2 },
  HEAVY_MACHINERY: { name: 'معدات ثقيلة', power: 5000, quantity: 1, hoursPerDay: 8 },
  MEDICAL_EQUIPMENT: { name: 'أجهزة طبية', power: 1000, quantity: 1, hoursPerDay: 24 },
  OVEN: { name: 'فرن كهربائي', power: 2000, quantity: 1, hoursPerDay: 6 },
  COFFEE_MACHINE: { name: 'ماكينة قهوة', power: 1500, quantity: 1, hoursPerDay: 8 },
  MINING_RIG: { name: 'أجهزة تعدين', power: 3000, quantity: 5, hoursPerDay: 24 },
  ICE_MACHINE: { name: 'ماكينة ثلج', power: 2000, quantity: 2, hoursPerDay: 24 },
  INCUBATOR: { name: 'فقاسة', power: 500, quantity: 5, hoursPerDay: 24 },
  GREENHOUSE_FANS: { name: 'مراوح تبريد', power: 800, quantity: 4, hoursPerDay: 12 },
};

// Constant configuration data for Arabic facility types and their default consumption patterns
export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج',
    defaultAppliances: [
      { id: '1', ...APPLIANCE.ICE_MACHINE },
      { id: '2', ...APPLIANCE.LIGHT, quantity: 20 },
      { id: '3', ...APPLIANCE.WATER_PUMP, quantity: 2, hoursPerDay: 6 }
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    defaultAppliances: [
      { id: '1', ...APPLIANCE.COMPUTER, quantity: 20 },
      { id: '2', ...APPLIANCE.AC, quantity: 5, hoursPerDay: 10 },
      { id: '3', ...APPLIANCE.LIGHT, quantity: 50, hoursPerDay: 10 },
      { id: '4', ...APPLIANCE.COFFEE_MACHINE }
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultAppliances: [
      { id: '1', ...APPLIANCE.WATER_PUMP, power: 3000, quantity: 2, hoursPerDay: 8 },
      { id: '2', ...APPLIANCE.LIGHT, quantity: 15, hoursPerDay: 12 }
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultAppliances: [
      { id: '1', ...APPLIANCE.INCUBATOR },
      { id: '2', ...APPLIANCE.LIGHT, quantity: 30, hoursPerDay: 16 },
      { id: '3', ...APPLIANCE.GREENHOUSE_FANS, quantity: 6, hoursPerDay: 24 }
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    defaultAppliances: [
      { id: '1', ...APPLIANCE.WATER_PUMP, quantity: 2, hoursPerDay: 4 },
      { id: '2', ...APPLIANCE.GREENHOUSE_FANS, quantity: 4, hoursPerDay: 12 },
      { id: '3', ...APPLIANCE.LIGHT, quantity: 20, hoursPerDay: 8 }
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultAppliances: [
      { id: '1', ...APPLIANCE.HEAVY_MACHINERY, quantity: 3 },
      { id: '2', ...APPLIANCE.LIGHT, quantity: 100, hoursPerDay: 12 },
      { id: '3', ...APPLIANCE.AC, quantity: 4, hoursPerDay: 12 }
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultAppliances: [
      { id: '1', ...APPLIANCE.MEDICAL_EQUIPMENT, quantity: 2, hoursPerDay: 12 },
      { id: '2', ...APPLIANCE.AC, quantity: 6, hoursPerDay: 12 },
      { id: '3', ...APPLIANCE.LIGHT, quantity: 30, hoursPerDay: 12 },
      { id: '4', ...APPLIANCE.COMPUTER, quantity: 5, hoursPerDay: 12 }
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    defaultAppliances: [
      { id: '1', ...APPLIANCE.MEDICAL_EQUIPMENT, quantity: 10, hoursPerDay: 24 },
      { id: '2', ...APPLIANCE.AC, quantity: 20, hoursPerDay: 24 },
      { id: '3', ...APPLIANCE.LIGHT, quantity: 150, hoursPerDay: 24 },
      { id: '4', ...APPLIANCE.COMPUTER, quantity: 20, hoursPerDay: 24 }
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultAppliances: [
      { id: '1', ...APPLIANCE.OVEN, quantity: 3, hoursPerDay: 12 },
      { id: '2', ...APPLIANCE.LIGHT, quantity: 20, hoursPerDay: 12 },
      { id: '3', ...APPLIANCE.FRIDGE, quantity: 2, hoursPerDay: 24 }
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultAppliances: [
      { id: '1', ...APPLIANCE.LIGHT, quantity: 6, hoursPerDay: 12 },
      { id: '2', ...APPLIANCE.FRIDGE, quantity: 2, hoursPerDay: 24 },
      { id: '3', ...APPLIANCE.AC, quantity: 1, hoursPerDay: 12 }
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultAppliances: [
      { id: '1', ...APPLIANCE.HEAVY_MACHINERY, power: 2000, quantity: 4, hoursPerDay: 6 },
      { id: '2', ...APPLIANCE.LIGHT, quantity: 15, hoursPerDay: 10 }
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    defaultAppliances: [
      { id: '1', ...APPLIANCE.WATER_PUMP, power: 5000, quantity: 1, hoursPerDay: 10 }
    ]
  },
  {
    id: 'donkey', // Referring to an engine-driven water pump/well common in some Arabic regions
    name: 'دونكي',
    defaultAppliances: [
      { id: '1', name: 'مضخة آبار', power: 7500, quantity: 1, hoursPerDay: 8 },
      { id: '2', ...APPLIANCE.LIGHT, quantity: 2, hoursPerDay: 12 }
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultAppliances: [
      { id: '1', ...APPLIANCE.AC, quantity: 4, hoursPerDay: 4 },
      { id: '2', ...APPLIANCE.LIGHT, quantity: 20, hoursPerDay: 5 },
      { id: '3', name: 'مكبر صوت', power: 200, quantity: 1, hoursPerDay: 2 }
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultAppliances: [
      { id: '1', name: 'آلة طباعة', power: 3000, quantity: 2, hoursPerDay: 8 },
      { id: '2', ...APPLIANCE.COMPUTER, quantity: 3, hoursPerDay: 8 },
      { id: '3', ...APPLIANCE.LIGHT, quantity: 25, hoursPerDay: 10 },
      { id: '4', ...APPLIANCE.AC, quantity: 2, hoursPerDay: 10 }
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultAppliances: [
      { id: '1', ...APPLIANCE.COFFEE_MACHINE, quantity: 2, hoursPerDay: 16 },
      { id: '2', ...APPLIANCE.FRIDGE, quantity: 3, hoursPerDay: 24 },
      { id: '3', ...APPLIANCE.AC, quantity: 3, hoursPerDay: 16 },
      { id: '4', ...APPLIANCE.LIGHT, quantity: 30, hoursPerDay: 16 }
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultAppliances: [
      { id: '1', ...APPLIANCE.FRIDGE, quantity: 4, hoursPerDay: 24 },
      { id: '2', ...APPLIANCE.OVEN, quantity: 2, hoursPerDay: 10 },
      { id: '3', ...APPLIANCE.AC, quantity: 5, hoursPerDay: 14 },
      { id: '4', ...APPLIANCE.LIGHT, quantity: 40, hoursPerDay: 14 }
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultAppliances: [
      { id: '1', ...APPLIANCE.AC, quantity: 30, hoursPerDay: 12 },
      { id: '2', ...APPLIANCE.LIGHT, quantity: 100, hoursPerDay: 12 },
      { id: '3', ...APPLIANCE.FRIDGE, quantity: 10, hoursPerDay: 24 },
      { id: '4', name: 'مصعد', power: 5000, quantity: 1, hoursPerDay: 4 }
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultAppliances: [
      { id: '1', ...APPLIANCE.COMPUTER, quantity: 15, hoursPerDay: 10 },
      { id: '2', ...APPLIANCE.AC, quantity: 8, hoursPerDay: 10 },
      { id: '3', ...APPLIANCE.LIGHT, quantity: 50, hoursPerDay: 12 },
      { id: '4', name: 'صراف آلي (ATM)', power: 300, quantity: 2, hoursPerDay: 24 }
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultAppliances: [
      { id: '1', name: 'ثلاجة عرض', power: 800, quantity: 10, hoursPerDay: 24 },
      { id: '2', ...APPLIANCE.AC, quantity: 6, hoursPerDay: 16 },
      { id: '3', ...APPLIANCE.LIGHT, quantity: 60, hoursPerDay: 16 }
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultAppliances: [
      { id: '1', name: 'مضخة وقود', power: 1500, quantity: 4, hoursPerDay: 24 },
      { id: '2', ...APPLIANCE.LIGHT, quantity: 40, hoursPerDay: 12 },
      { id: '3', ...APPLIANCE.AC, quantity: 2, hoursPerDay: 12 }
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultAppliances: [
      { id: '1', ...APPLIANCE.HEAVY_MACHINERY, power: 10000, quantity: 2, hoursPerDay: 10 },
      { id: '2', ...APPLIANCE.WATER_PUMP, power: 4000, quantity: 2, hoursPerDay: 12 },
      { id: '3', ...APPLIANCE.LIGHT, quantity: 30, hoursPerDay: 12 },
      { id: '4', ...APPLIANCE.AC, quantity: 2, hoursPerDay: 12 }
    ]
  },
  {
    id: 'custom',
    name: 'مخصص',
    defaultAppliances: []
  }
];

/**
 * Calculates total daily energy consumption in Watt-hours (Wh)
 * @param {Array} appliances - Array of appliance objects
 * @returns {number} Total Wh per day
 */
export const calculateDailyConsumption = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (Number(app.power) * Number(app.quantity) * Number(app.hoursPerDay));
  }, 0);
};

/**
 * Estimates the required solar system size in kiloWatts (kW)
 * taking into account typical system losses.
 * @param {number} dailyConsumptionWh - Total daily Wh consumption
 * @param {number} peakSunHours - Average daily peak sun hours (default ~5.5 for ME region)
 * @param {number} systemEfficiency - Overall system efficiency (default ~80% or 0.8)
 * @returns {number} Required solar PV capacity in kW
 */
export const estimateSystemSize = (dailyConsumptionWh, peakSunHours = 5.5, systemEfficiency = 0.8) => {
  if (dailyConsumptionWh <= 0) return 0;

  // Convert Wh to kWh
  const dailyConsumptionKWh = dailyConsumptionWh / 1000;

  // Calculate required PV capacity
  // PV Capacity (kW) = Daily Consumption (kWh) / (Peak Sun Hours * System Efficiency)
  const systemSizeKW = dailyConsumptionKWh / (peakSunHours * systemEfficiency);

  return Number(systemSizeKW.toFixed(2));
};

/**
 * Helper to get facility type by ID
 */
export const getFacilityById = (id) => {
  return FACILITY_TYPES.find(f => f.id === id) || FACILITY_TYPES[0];
};

/**
 * Deep copy of default appliances for a facility to avoid mutating constants
 */
export const getDefaultAppliancesForFacility = (id) => {
  const facility = getFacilityById(id);
  return facility.defaultAppliances.map(app => ({ ...app }));
};
