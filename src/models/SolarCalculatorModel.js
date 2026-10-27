// src/models/SolarCalculatorModel.js

/**
 * Solar Calculator Data Models and Logic.
 * Contains constants for facility types, typical consumption in Arabic,
 * and calculation functions to keep the UI clean.
 */

export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع ثلج', icon: 'snow', defaultHours: 24, load: 'High' },
  { id: 'company', name: 'شركة', icon: 'building', defaultHours: 8, load: 'Medium' },
  { id: 'farm', name: 'مزرعة', icon: 'tractor', defaultHours: 12, load: 'High' },
  { id: 'poultry_farm', name: 'مزرعة دواجن', icon: 'egg', defaultHours: 24, load: 'High' },
  { id: 'greenhouse', name: 'بيوت محمية', icon: 'leaf', defaultHours: 12, load: 'Medium' },
  { id: 'factory', name: 'مصنع', icon: 'factory', defaultHours: 16, load: 'Very High' },
  { id: 'clinic', name: 'مستوصف', icon: 'stethoscope', defaultHours: 16, load: 'Medium' },
  { id: 'hospital', name: 'مستشفى', icon: 'hospital', defaultHours: 24, load: 'Very High' },
  { id: 'bakery', name: 'مخبز', icon: 'croissant', defaultHours: 18, load: 'High' },
  { id: 'shop', name: 'دكان', icon: 'store', defaultHours: 12, load: 'Low' },
  { id: 'workshop', name: 'ورشة', icon: 'wrench', defaultHours: 10, load: 'High' },
  { id: 'water_pump', name: 'مضخة مياه', icon: 'droplets', defaultHours: 8, load: 'High' },
  { id: 'donkey_cart', name: 'دونكي', icon: 'wagon', defaultHours: 6, load: 'Low' },
  { id: 'mosque', name: 'مسجد', icon: 'moon', defaultHours: 6, load: 'Medium' },
  { id: 'printing_press', name: 'مطبعة', icon: 'printer', defaultHours: 12, load: 'High' },
  { id: 'coffee_shop', name: 'كوفي شوب', icon: 'coffee', defaultHours: 16, load: 'Medium' },
  { id: 'restaurant', name: 'مطعم', icon: 'utensils', defaultHours: 18, load: 'High' },
  { id: 'hotel', name: 'فندق', icon: 'bed', defaultHours: 24, load: 'Very High' },
  { id: 'bank', name: 'بنك', icon: 'landmark', defaultHours: 10, load: 'Medium' },
  { id: 'supermarket', name: 'سوبر ماركت', icon: 'shopping-cart', defaultHours: 16, load: 'High' },
  { id: 'gas_station', name: 'طرمبة وقود', icon: 'fuel', defaultHours: 24, load: 'Medium' },
  { id: 'mining_company', name: 'شركة تعدين', icon: 'pickaxe', defaultHours: 24, load: 'Very High' },
];

export const COMMON_APPLIANCES = [
  { id: 'light', name: 'لمبة إضاءة', powerWatt: 10, hoursPerDay: 8, category: 'lighting' },
  { id: 'ac_split_1.5', name: 'مكيف اسبليت 1.5 طن', powerWatt: 1500, hoursPerDay: 10, category: 'cooling' },
  { id: 'ac_split_2', name: 'مكيف اسبليت 2 طن', powerWatt: 2000, hoursPerDay: 10, category: 'cooling' },
  { id: 'ac_window', name: 'مكيف شباك', powerWatt: 1800, hoursPerDay: 10, category: 'cooling' },
  { id: 'water_cooler', name: 'مبرد مياه (ثلاجة مياه)', powerWatt: 150, hoursPerDay: 24, category: 'cooling' },
  { id: 'fridge_small', name: 'ثلاجة صغيرة', powerWatt: 150, hoursPerDay: 24, category: 'cooling' },
  { id: 'fridge_large', name: 'ثلاجة كبيرة', powerWatt: 300, hoursPerDay: 24, category: 'cooling' },
  { id: 'freezer', name: 'ديب فريزر', powerWatt: 400, hoursPerDay: 24, category: 'cooling' },
  { id: 'tv_led', name: 'تلفزيون LED', powerWatt: 80, hoursPerDay: 6, category: 'electronics' },
  { id: 'pc', name: 'كمبيوتر مكتبي', powerWatt: 250, hoursPerDay: 8, category: 'electronics' },
  { id: 'laptop', name: 'لابتوب', powerWatt: 65, hoursPerDay: 8, category: 'electronics' },
  { id: 'printer', name: 'طابعة', powerWatt: 50, hoursPerDay: 2, category: 'electronics' },
  { id: 'fan_ceiling', name: 'مروحة سقف', powerWatt: 70, hoursPerDay: 12, category: 'cooling' },
  { id: 'fan_stand', name: 'مروحة استاند', powerWatt: 60, hoursPerDay: 12, category: 'cooling' },
  { id: 'water_pump_1hp', name: 'مضخة مياه 1 حصان', powerWatt: 750, hoursPerDay: 2, category: 'heavy' },
  { id: 'water_pump_2hp', name: 'مضخة مياه 2 حصان', powerWatt: 1500, hoursPerDay: 2, category: 'heavy' },
  { id: 'ice_maker', name: 'صانعة ثلج', powerWatt: 500, hoursPerDay: 24, category: 'heavy' },
  { id: 'oven_elec', name: 'فرن كهربائي', powerWatt: 2000, hoursPerDay: 2, category: 'heavy' },
  { id: 'coffee_machine', name: 'ماكينة قهوة', powerWatt: 1200, hoursPerDay: 4, category: 'heavy' },
  { id: 'welding_machine', name: 'ماكينة لحام', powerWatt: 3000, hoursPerDay: 4, category: 'heavy' },
];

/**
 * Calculates the total daily energy consumption.
 * @param {Array} appliances - Array of appliance objects { powerWatt, hoursPerDay, quantity }
 * @returns {Number} - Total daily consumption in Watt-hours (Wh)
 */
export const calculateTotalDailyConsumption = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (app.powerWatt * app.hoursPerDay * (app.quantity || 1));
  }, 0);
};

/**
 * Calculates the required solar system size.
 * Assumes an average of 5 peak sun hours per day and a 20% system loss (efficiency 0.8).
 * @param {Number} dailyConsumptionWh - Total daily consumption in Watt-hours
 * @param {Number} peakSunHours - Average peak sun hours (default 5)
 * @param {Number} efficiency - System efficiency factor (default 0.8)
 * @returns {Number} - Required system size in kiloWatts (kW)
 */
export const calculateSystemSizeKW = (dailyConsumptionWh, peakSunHours = 5, efficiency = 0.8) => {
  if (dailyConsumptionWh <= 0) return 0;
  const requiredWh = dailyConsumptionWh / efficiency;
  const systemSizeW = requiredWh / peakSunHours;
  return Number((systemSizeW / 1000).toFixed(2));
};

/**
 * Calculates the number of solar panels needed.
 * @param {Number} systemSizeKW - Required system size in kW
 * @param {Number} panelWattage - Wattage of a single panel (default 500W)
 * @returns {Number} - Number of panels
 */
export const calculatePanelsNeeded = (systemSizeKW, panelWattage = 500) => {
  if (systemSizeKW <= 0) return 0;
  const systemSizeW = systemSizeKW * 1000;
  return Math.ceil(systemSizeW / panelWattage);
};

/**
 * Calculates the required battery capacity.
 * Assumes 1 days of autonomy and 50% depth of discharge (DoD) for lead-acid/gel or 80% for Lithium.
 * We'll use 80% DoD (Lithium) as standard modern default, and a 48V system.
 * @param {Number} dailyConsumptionWh - Total daily consumption in Watt-hours
 * @param {Number} daysOfAutonomy - Number of days the system needs to run without sun (default 1)
 * @param {Number} depthOfDischarge - DoD factor (default 0.8 for Lithium)
 * @param {Number} systemVoltage - Battery bank voltage (default 48V)
 * @returns {Number} - Required battery capacity in Ampere-hours (Ah)
 */
export const calculateBatteryCapacityAh = (
  dailyConsumptionWh,
  daysOfAutonomy = 1,
  depthOfDischarge = 0.8,
  systemVoltage = 48
) => {
  if (dailyConsumptionWh <= 0) return 0;
  const requiredWh = dailyConsumptionWh * daysOfAutonomy / depthOfDischarge;
  return Math.ceil(requiredWh / systemVoltage);
};

export const calculateInverterSize = (appliances) => {
  // Simple sum of all wattages assuming everything runs at once, +20% buffer
  const maxLoadW = appliances.reduce((total, app) => total + (app.powerWatt * (app.quantity || 1)), 0);
  return Number(((maxLoadW * 1.2) / 1000).toFixed(2)); // in kW
};
