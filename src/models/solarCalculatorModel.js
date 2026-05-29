// src/models/solarCalculatorModel.js

// Constants for Facility Types
export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع تلج' },
  { id: 'company', name: 'شركة' },
  { id: 'farm', name: 'مزرعة' },
  { id: 'poultry_farm', name: 'مزرعة دواجن' },
  { id: 'greenhouses', name: 'بيوت محمية' },
  { id: 'factory', name: 'مصنع' },
  { id: 'dispensary', name: 'مستوصف' },
  { id: 'hospital', name: 'مستشفي' },
  { id: 'bakery', name: 'مخبز' },
  { id: 'shop', name: 'دكان' },
  { id: 'workshop', name: 'ورشة' },
  { id: 'water_pump', name: 'مضخة موية' },
  { id: 'donkey', name: 'دونكي' }, // Assuming this means a local water well/pump
  { id: 'mosque', name: 'مسجد' },
  { id: 'printing_press', name: 'مطبعة' },
  { id: 'coffee_shop', name: 'كوفي شوب' },
  { id: 'restaurant', name: 'مطعم' },
  { id: 'hotel', name: 'فندق' },
  { id: 'bank', name: 'بنك' },
  { id: 'supermarket', name: 'سوبر ماركت' },
  { id: 'fuel_station', name: 'طرمبة وقود' },
  { id: 'mining_company', name: 'شركة تعدين' }
];

// Default equipment configurations for each facility type
export const DEFAULT_EQUIPMENT_BY_FACILITY = {
  ice_factory: [
    { id: '1', name: 'ماكينة ثلج كبيرة', power: 5000, quantity: 2, hoursPerDay: 24 },
    { id: '2', name: 'إضاءة', power: 40, quantity: 20, hoursPerDay: 12 },
  ],
  company: [
    { id: '1', name: 'مكيف هواء', power: 1500, quantity: 5, hours: 10 },
    { id: '2', name: 'حاسب آلي', power: 250, quantity: 20, hoursPerDay: 10 },
    { id: '3', name: 'إضاءة', power: 20, quantity: 50, hoursPerDay: 10 },
  ],
  farm: [
    { id: '1', name: 'مضخة ري', power: 3000, quantity: 1, hoursPerDay: 6 },
    { id: '2', name: 'إضاءة', power: 30, quantity: 10, hoursPerDay: 12 },
  ],
  poultry_farm: [
    { id: '1', name: 'مراوح تهوية', power: 500, quantity: 10, hoursPerDay: 24 },
    { id: '2', name: 'إضاءة', power: 40, quantity: 50, hoursPerDay: 14 },
    { id: '3', name: 'سخانات', power: 1000, quantity: 5, hoursPerDay: 12 },
  ],
  greenhouses: [
    { id: '1', name: 'مراوح سحب', power: 400, quantity: 4, hoursPerDay: 12 },
    { id: '2', name: 'مضخة ري', power: 1500, quantity: 1, hoursPerDay: 4 },
  ],
  factory: [
    { id: '1', name: 'ماكينة إنتاج', power: 10000, quantity: 3, hoursPerDay: 16 },
    { id: '2', name: 'إضاءة', power: 100, quantity: 50, hoursPerDay: 16 },
  ],
  dispensary: [
    { id: '1', name: 'مكيف هواء', power: 1500, quantity: 4, hoursPerDay: 12 },
    { id: '2', name: 'ثلاجة أدوية', power: 300, quantity: 2, hoursPerDay: 24 },
    { id: '3', name: 'معدات طبية', power: 1000, quantity: 3, hoursPerDay: 6 },
  ],
  hospital: [
    { id: '1', name: 'مكيف مركزي', power: 20000, quantity: 2, hoursPerDay: 24 },
    { id: '2', name: 'ثلاجة بنك الدم', power: 500, quantity: 4, hoursPerDay: 24 },
    { id: '3', name: 'أجهزة أشعة', power: 5000, quantity: 2, hoursPerDay: 8 },
  ],
  bakery: [
    { id: '1', name: 'فرن كهربائي', power: 8000, quantity: 2, hoursPerDay: 12 },
    { id: '2', name: 'عجانة', power: 3000, quantity: 2, hoursPerDay: 6 },
    { id: '3', name: 'إضاءة', power: 40, quantity: 15, hoursPerDay: 14 },
  ],
  shop: [
    { id: '1', name: 'ثلاجة عرض', power: 500, quantity: 2, hoursPerDay: 24 },
    { id: '2', name: 'إضاءة', power: 30, quantity: 10, hoursPerDay: 12 },
    { id: '3', name: 'مروحة', power: 80, quantity: 2, hoursPerDay: 12 },
  ],
  workshop: [
    { id: '1', name: 'ماكينة لحام', power: 4000, quantity: 2, hoursPerDay: 6 },
    { id: '2', name: 'صاروخ قطع', power: 1500, quantity: 3, hoursPerDay: 4 },
    { id: '3', name: 'إضاءة قوية', power: 100, quantity: 10, hoursPerDay: 10 },
  ],
  water_pump: [
    { id: '1', name: 'مضخة غاطسة', power: 5000, quantity: 1, hoursPerDay: 10 },
  ],
  donkey: [
    { id: '1', name: 'مضخة مياه صغيرة', power: 1500, quantity: 1, hoursPerDay: 12 },
  ],
  mosque: [
    { id: '1', name: 'مكيف هواء', power: 1500, quantity: 6, hoursPerDay: 6 },
    { id: '2', name: 'إضاءة', power: 40, quantity: 40, hoursPerDay: 8 },
    { id: '3', name: 'مكبر صوت', power: 200, quantity: 1, hoursPerDay: 4 },
  ],
  printing_press: [
    { id: '1', name: 'ماكينة طباعة', power: 5000, quantity: 2, hoursPerDay: 10 },
    { id: '2', name: 'مكيف هواء', power: 1500, quantity: 3, hoursPerDay: 10 },
    { id: '3', name: 'حاسب آلي', power: 300, quantity: 5, hoursPerDay: 10 },
  ],
  coffee_shop: [
    { id: '1', name: 'ماكينة اسبريسو', power: 3500, quantity: 1, hoursPerDay: 14 },
    { id: '2', name: 'ثلاجة عرض', power: 600, quantity: 2, hoursPerDay: 24 },
    { id: '3', name: 'مكيف هواء', power: 1500, quantity: 2, hoursPerDay: 14 },
  ],
  restaurant: [
    { id: '1', name: 'ثلاجة تجميد', power: 1000, quantity: 3, hoursPerDay: 24 },
    { id: '2', name: 'مكيف هواء', power: 2000, quantity: 4, hoursPerDay: 16 },
    { id: '3', name: 'إضاءة', power: 50, quantity: 30, hoursPerDay: 16 },
  ],
  hotel: [
    { id: '1', name: 'مكيفات غرف', power: 1200, quantity: 50, hoursPerDay: 14 },
    { id: '2', name: 'ثلاجات غرف', power: 150, quantity: 50, hoursPerDay: 24 },
    { id: '3', name: 'إضاءة ممرات', power: 20, quantity: 100, hoursPerDay: 24 },
  ],
  bank: [
    { id: '1', name: 'تكييف مركزي', power: 15000, quantity: 1, hoursPerDay: 10 },
    { id: '2', name: 'أجهزة صراف آلي', power: 500, quantity: 4, hoursPerDay: 24 },
    { id: '3', name: 'حاسب آلي', power: 250, quantity: 30, hoursPerDay: 10 },
  ],
  supermarket: [
    { id: '1', name: 'ثلاجة عرض كبيرة', power: 1200, quantity: 10, hoursPerDay: 24 },
    { id: '2', name: 'تكييف مركزي', power: 10000, quantity: 2, hoursPerDay: 16 },
    { id: '3', name: 'إضاءة', power: 40, quantity: 100, hoursPerDay: 16 },
  ],
  fuel_station: [
    { id: '1', name: 'مضخة وقود', power: 750, quantity: 6, hoursPerDay: 24 },
    { id: '2', name: 'إضاءة مظلة', power: 100, quantity: 20, hoursPerDay: 12 },
    { id: '3', name: 'مكيف إدارة', power: 1500, quantity: 2, hoursPerDay: 12 },
  ],
  mining_company: [
    { id: '1', name: 'حفارة كهربائية', power: 50000, quantity: 2, hoursPerDay: 20 },
    { id: '2', name: 'مضخة نزح مياه', power: 10000, quantity: 4, hoursPerDay: 24 },
    { id: '3', name: 'كشافات إضاءة', power: 1000, quantity: 20, hoursPerDay: 12 },
  ]
};

// Business Logic / Formulas

/**
 * Calculates the total daily energy consumption in Watt-hours (Wh).
 * @param {Array} equipmentList - Array of equipment objects { power, quantity, hoursPerDay }
 * @returns {number} Total daily consumption in Wh
 */
export const calculateTotalDailyConsumption = (equipmentList) => {
  return equipmentList.reduce((total, item) => {
    // some might have .hours instead of .hoursPerDay due to a typo in defaults above, let's normalize
    const hours = item.hoursPerDay || item.hours || 0;
    return total + (item.power * item.quantity * hours);
  }, 0);
};

/**
 * Calculates the peak power requirement in Watts (W).
 * @param {Array} equipmentList - Array of equipment objects { power, quantity }
 * @returns {number} Peak power in W
 */
export const calculatePeakPower = (equipmentList) => {
  return equipmentList.reduce((total, item) => {
    return total + (item.power * item.quantity);
  }, 0);
};

/**
 * Estimates the required Solar PV System size.
 * @param {number} dailyConsumptionWh - Total daily consumption in Wh
 * @param {number} sunHours - Average daily peak sun hours (default 5.5 for typical sunny regions)
 * @param {number} efficiency - System efficiency factor (default 0.8 for 20% losses)
 * @returns {number} Recommended PV Array size in Watts (W)
 */
export const calculateRequiredPVSize = (dailyConsumptionWh, sunHours = 5.5, efficiency = 0.8) => {
  if (dailyConsumptionWh === 0) return 0;
  return dailyConsumptionWh / (sunHours * efficiency);
};

/**
 * Estimates the required Inverter size.
 * @param {number} peakPowerW - Total peak power of all running equipment in W
 * @param {number} safetyMargin - Safety margin for startup surges (default 1.25 for 25% margin)
 * @returns {number} Recommended Inverter size in Watts (W)
 */
export const calculateRequiredInverterSize = (peakPowerW, safetyMargin = 1.25) => {
  if (peakPowerW === 0) return 0;
  return peakPowerW * safetyMargin;
};

/**
 * Estimates the required Battery Bank capacity.
 * @param {number} dailyConsumptionWh - Total daily consumption in Wh
 * @param {number} daysOfAutonomy - Days the system needs to run without sun (default 1)
 * @param {number} batteryVoltage - System DC voltage (default 48V)
 * @param {number} depthOfDischarge - Allowed depth of discharge (default 0.5 for Lead-Acid, 0.8 for Lithium. Using 0.8 as default)
 * @returns {number} Recommended Battery capacity in Ampere-hours (Ah)
 */
export const calculateRequiredBatteryCapacity = (dailyConsumptionWh, daysOfAutonomy = 1, batteryVoltage = 48, depthOfDischarge = 0.8) => {
  if (dailyConsumptionWh === 0) return 0;
  return (dailyConsumptionWh * daysOfAutonomy) / (batteryVoltage * depthOfDischarge);
};
