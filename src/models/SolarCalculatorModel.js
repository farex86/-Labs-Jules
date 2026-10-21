// src/models/SolarCalculatorModel.js

export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج',
    defaultDevices: [
      { id: '1', name: 'ماكينة ثلج', power: 5000, hours: 24, quantity: 1 },
      { id: '2', name: 'إضاءة', power: 100, hours: 12, quantity: 10 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    defaultDevices: [
      { id: '1', name: 'مكيف', power: 1500, hours: 8, quantity: 4 },
      { id: '2', name: 'كمبيوتر', power: 250, hours: 8, quantity: 10 },
      { id: '3', name: 'إضاءة', power: 40, hours: 10, quantity: 20 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultDevices: [
      { id: '1', name: 'مضخة مياه', power: 2000, hours: 6, quantity: 1 },
      { id: '2', name: 'إضاءة خارجية', power: 100, hours: 12, quantity: 5 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultDevices: [
      { id: '1', name: 'مراوح تهوية', power: 500, hours: 24, quantity: 4 },
      { id: '2', name: 'إضاءة', power: 40, hours: 16, quantity: 20 },
      { id: '3', name: 'دفايات', power: 2000, hours: 12, quantity: 2 },
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    defaultDevices: [
      { id: '1', name: 'نظام تبريد', power: 1500, hours: 12, quantity: 2 },
      { id: '2', name: 'مضخة ري', power: 1000, hours: 4, quantity: 1 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultDevices: [
      { id: '1', name: 'آلات إنتاج', power: 10000, hours: 12, quantity: 2 },
      { id: '2', name: 'إضاءة', power: 100, hours: 12, quantity: 50 },
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultDevices: [
      { id: '1', name: 'مكيف', power: 1500, hours: 12, quantity: 5 },
      { id: '2', name: 'أجهزة طبية', power: 2000, hours: 8, quantity: 2 },
      { id: '3', name: 'إضاءة', power: 40, hours: 24, quantity: 20 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    defaultDevices: [
      { id: '1', name: 'مكيف مركزي', power: 20000, hours: 24, quantity: 1 },
      { id: '2', name: 'أجهزة طبية', power: 5000, hours: 24, quantity: 5 },
      { id: '3', name: 'إضاءة', power: 40, hours: 24, quantity: 100 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultDevices: [
      { id: '1', name: 'عجانة', power: 3000, hours: 8, quantity: 1 },
      { id: '2', name: 'فرن كهربائي', power: 5000, hours: 12, quantity: 1 },
      { id: '3', name: 'إضاءة', power: 50, hours: 14, quantity: 10 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultDevices: [
      { id: '1', name: 'ثلاجة عرض', power: 800, hours: 24, quantity: 2 },
      { id: '2', name: 'مكيف', power: 1500, hours: 12, quantity: 1 },
      { id: '3', name: 'إضاءة', power: 40, hours: 12, quantity: 4 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultDevices: [
      { id: '1', name: 'معدات لحام', power: 4000, hours: 6, quantity: 1 },
      { id: '2', name: 'كمبروسر هواء', power: 2000, hours: 4, quantity: 1 },
      { id: '3', name: 'إضاءة', power: 100, hours: 10, quantity: 5 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    defaultDevices: [
      { id: '1', name: 'مضخة غاطسة', power: 5000, hours: 10, quantity: 1 },
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي',
    defaultDevices: [
      { id: '1', name: 'مضخة مياه', power: 3000, hours: 8, quantity: 1 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultDevices: [
      { id: '1', name: 'مكيف', power: 1500, hours: 6, quantity: 4 },
      { id: '2', name: 'مكبر صوت', power: 200, hours: 3, quantity: 1 },
      { id: '3', name: 'إضاءة', power: 40, hours: 8, quantity: 20 },
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultDevices: [
      { id: '1', name: 'آلة طباعة', power: 5000, hours: 8, quantity: 2 },
      { id: '2', name: 'مكيف', power: 1500, hours: 8, quantity: 3 },
      { id: '3', name: 'إضاءة', power: 50, hours: 10, quantity: 15 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultDevices: [
      { id: '1', name: 'ماكينة قهوة', power: 2500, hours: 12, quantity: 1 },
      { id: '2', name: 'ثلاجة', power: 500, hours: 24, quantity: 2 },
      { id: '3', name: 'مكيف', power: 1500, hours: 12, quantity: 2 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultDevices: [
      { id: '1', name: 'ثلاجة تجميد', power: 1000, hours: 24, quantity: 2 },
      { id: '2', name: 'مكيف', power: 1500, hours: 14, quantity: 4 },
      { id: '3', name: 'مروحة شفط', power: 300, hours: 14, quantity: 2 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultDevices: [
      { id: '1', name: 'مكيفات غرف', power: 1500, hours: 12, quantity: 20 },
      { id: '2', name: 'سخان مياه', power: 1200, hours: 4, quantity: 20 },
      { id: '3', name: 'إضاءة', power: 40, hours: 16, quantity: 100 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultDevices: [
      { id: '1', name: 'كمبيوتر', power: 250, hours: 10, quantity: 20 },
      { id: '2', name: 'مكيف مركزي', power: 10000, hours: 10, quantity: 1 },
      { id: '3', name: 'صراف آلي', power: 500, hours: 24, quantity: 2 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultDevices: [
      { id: '1', name: 'ثلاجة عرض', power: 1000, hours: 24, quantity: 5 },
      { id: '2', name: 'ثلاجة تجميد', power: 1200, hours: 24, quantity: 2 },
      { id: '3', name: 'مكيف', power: 2000, hours: 16, quantity: 3 },
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultDevices: [
      { id: '1', name: 'مضخة وقود', power: 1500, hours: 12, quantity: 4 },
      { id: '2', name: 'إضاءة خارجية', power: 200, hours: 12, quantity: 10 },
      { id: '3', name: 'ثلاجة عرض', power: 800, hours: 24, quantity: 1 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultDevices: [
      { id: '1', name: 'كسارة', power: 20000, hours: 12, quantity: 1 },
      { id: '2', name: 'مضخة مياه', power: 5000, hours: 12, quantity: 2 },
      { id: '3', name: 'إضاءة موقع', power: 500, hours: 12, quantity: 20 },
    ]
  },
];

/**
 * Calculates the total daily energy consumption in Watt-hours (Wh).
 * @param {Array} devices - List of devices with power, hours, and quantity.
 * @returns {number} - Total daily consumption in Wh.
 */
export const calculateTotalConsumption = (devices) => {
  return devices.reduce((total, device) => {
    return total + (Number(device.power) * Number(device.hours) * Number(device.quantity));
  }, 0);
};

/**
 * Calculates the required system size (kW) given total daily consumption.
 * Adds a safety margin and considers peak sun hours and system efficiency.
 * @param {number} totalConsumptionWh - Total daily consumption in Wh.
 * @param {number} peakSunHours - Average peak sun hours per day (default 5.5).
 * @param {number} efficiency - Overall system efficiency (default 0.75).
 * @returns {number} - Recommended solar panel capacity in kW.
 */
export const calculateSystemSize = (totalConsumptionWh, peakSunHours = 5.5, efficiency = 0.75) => {
  if (totalConsumptionWh <= 0) return 0;

  // Add a 20% safety margin
  const consumptionWithMargin = totalConsumptionWh * 1.2;

  // Calculate required kW
  const requiredPowerW = consumptionWithMargin / (peakSunHours * efficiency);

  return requiredPowerW / 1000;
};
