// src/models/SolarCalculatorModel.js

export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع ثلج' },
  { id: 'company', name: 'شركة' },
  { id: 'farm', name: 'مزرعة' },
  { id: 'poultry_farm', name: 'مزرعة دواجن' },
  { id: 'greenhouse', name: 'بيوت محمية' },
  { id: 'factory', name: 'مصنع' },
  { id: 'clinic', name: 'مستوصف' },
  { id: 'hospital', name: 'مستشفى' },
  { id: 'bakery', name: 'مخبز' },
  { id: 'shop', name: 'دكان' },
  { id: 'workshop', name: 'ورشة' },
  { id: 'water_pump', name: 'مضخة مياه' },
  { id: 'donkey', name: 'دونكي (مضخة)' },
  { id: 'mosque', name: 'مسجد' },
  { id: 'printing_press', name: 'مطبعة' },
  { id: 'coffee_shop', name: 'كوفي شوب' },
  { id: 'restaurant', name: 'مطعم' },
  { id: 'hotel', name: 'فندق' },
  { id: 'bank', name: 'بنك' },
  { id: 'supermarket', name: 'سوبر ماركت' },
  { id: 'gas_station', name: 'طرمبة وقود' },
  { id: 'mining_company', name: 'شركة تعدين' },
];

export const FACILITY_PATTERNS = {
  ice_factory: [
    { id: 'ice_maker', name: 'ماكينة صنع الثلج', qty: 2, power: 5000, hours: 24 },
    { id: 'freezer', name: 'فريزر تجميد', qty: 4, power: 2000, hours: 24 },
    { id: 'lights', name: 'إضاءة', qty: 20, power: 40, hours: 12 },
  ],
  company: [
    { id: 'ac', name: 'مكيف هواء', qty: 10, power: 1500, hours: 10 },
    { id: 'pc', name: 'كمبيوتر', qty: 20, power: 300, hours: 10 },
    { id: 'lights', name: 'إضاءة', qty: 50, power: 40, hours: 10 },
    { id: 'server', name: 'سيرفر', qty: 1, power: 800, hours: 24 },
  ],
  farm: [
    { id: 'water_pump', name: 'مضخة مياه', qty: 1, power: 3000, hours: 6 },
    { id: 'lights', name: 'إضاءة خارجية', qty: 10, power: 100, hours: 12 },
  ],
  poultry_farm: [
    { id: 'heaters', name: 'دفايات', qty: 10, power: 2000, hours: 12 },
    { id: 'fans', name: 'مراوح تهوية', qty: 15, power: 500, hours: 24 },
    { id: 'lights', name: 'إضاءة', qty: 30, power: 40, hours: 16 },
  ],
  greenhouse: [
    { id: 'fans', name: 'مراوح', qty: 5, power: 500, hours: 12 },
    { id: 'irrigation', name: 'نظام ري', qty: 1, power: 1500, hours: 4 },
  ],
  factory: [
    { id: 'machinery', name: 'آلات إنتاج', qty: 5, power: 10000, hours: 16 },
    { id: 'lights', name: 'إضاءة مصنع', qty: 100, power: 100, hours: 16 },
    { id: 'ac', name: 'مكيفات مركزية', qty: 2, power: 15000, hours: 16 },
  ],
  clinic: [
    { id: 'ac', name: 'مكيف', qty: 5, power: 1500, hours: 12 },
    { id: 'lights', name: 'إضاءة', qty: 30, power: 40, hours: 12 },
    { id: 'medical_eq', name: 'معدات طبية', qty: 3, power: 2000, hours: 8 },
    { id: 'fridge', name: 'ثلاجة أدوية', qty: 2, power: 300, hours: 24 },
  ],
  hospital: [
    { id: 'ac_central', name: 'تكييف مركزي', qty: 1, power: 50000, hours: 24 },
    { id: 'lights', name: 'إضاءة شاملة', qty: 300, power: 40, hours: 24 },
    { id: 'medical_heavy', name: 'أجهزة طبية ثقيلة', qty: 5, power: 5000, hours: 24 },
    { id: 'fridge', name: 'ثلاجات', qty: 20, power: 400, hours: 24 },
  ],
  bakery: [
    { id: 'oven', name: 'فرن كهربائي', qty: 2, power: 8000, hours: 14 },
    { id: 'mixer', name: 'عجانة', qty: 3, power: 3000, hours: 8 },
    { id: 'lights', name: 'إضاءة', qty: 15, power: 40, hours: 14 },
  ],
  shop: [
    { id: 'ac', name: 'مكيف', qty: 1, power: 1500, hours: 12 },
    { id: 'fridge', name: 'ثلاجة عرض', qty: 2, power: 600, hours: 24 },
    { id: 'lights', name: 'إضاءة', qty: 8, power: 40, hours: 12 },
  ],
  workshop: [
    { id: 'tools', name: 'عدد كهربائية', qty: 5, power: 2000, hours: 8 },
    { id: 'compressor', name: 'كمبروسر هواء', qty: 1, power: 3000, hours: 8 },
    { id: 'lights', name: 'إضاءة', qty: 10, power: 100, hours: 10 },
  ],
  water_pump: [
    { id: 'pump_large', name: 'مضخة غاطسة', qty: 1, power: 7500, hours: 10 },
  ],
  donkey: [
    { id: 'pump_small', name: 'مضخة مياه (دونكي)', qty: 1, power: 2200, hours: 12 },
  ],
  mosque: [
    { id: 'ac', name: 'مكيفات', qty: 6, power: 1500, hours: 8 },
    { id: 'lights', name: 'إضاءة', qty: 40, power: 40, hours: 6 },
    { id: 'sound', name: 'نظام صوتيات', qty: 1, power: 500, hours: 5 },
  ],
  printing_press: [
    { id: 'printer', name: 'ماكينة طباعة', qty: 3, power: 4000, hours: 10 },
    { id: 'cutter', name: 'مقص ورق', qty: 1, power: 2000, hours: 8 },
    { id: 'ac', name: 'مكيف', qty: 2, power: 1500, hours: 10 },
  ],
  coffee_shop: [
    { id: 'espresso', name: 'ماكينة اسبريسو', qty: 1, power: 3500, hours: 16 },
    { id: 'grinder', name: 'مطحنة قهوة', qty: 2, power: 500, hours: 16 },
    { id: 'ac', name: 'مكيف', qty: 3, power: 1500, hours: 16 },
    { id: 'fridge', name: 'ثلاجة', qty: 3, power: 500, hours: 24 },
  ],
  restaurant: [
    { id: 'oven', name: 'أفران', qty: 2, power: 5000, hours: 16 },
    { id: 'fridge', name: 'ثلاجات وتجميد', qty: 4, power: 800, hours: 24 },
    { id: 'ac', name: 'مكيفات', qty: 4, power: 2000, hours: 16 },
    { id: 'lights', name: 'إضاءة', qty: 30, power: 40, hours: 16 },
  ],
  hotel: [
    { id: 'ac_rooms', name: 'مكيفات غرف', qty: 50, power: 1200, hours: 14 },
    { id: 'lights', name: 'إضاءة', qty: 200, power: 20, hours: 12 },
    { id: 'elevator', name: 'مصاعد', qty: 2, power: 10000, hours: 24 },
    { id: 'water_heater', name: 'سخانات مياه', qty: 50, power: 1500, hours: 4 },
  ],
  bank: [
    { id: 'ac_central', name: 'تكييف مركزي', qty: 1, power: 20000, hours: 12 },
    { id: 'pc', name: 'كمبيوترات', qty: 30, power: 250, hours: 10 },
    { id: 'atm', name: 'صراف آلي', qty: 3, power: 1000, hours: 24 },
    { id: 'lights', name: 'إضاءة', qty: 100, power: 40, hours: 12 },
  ],
  supermarket: [
    { id: 'open_fridge', name: 'ثلاجات عرض مفتوحة', qty: 5, power: 2000, hours: 24 },
    { id: 'freezer', name: 'فريزرات', qty: 4, power: 1500, hours: 24 },
    { id: 'ac', name: 'مكيفات', qty: 6, power: 2000, hours: 16 },
    { id: 'lights', name: 'إضاءة', qty: 50, power: 40, hours: 16 },
  ],
  gas_station: [
    { id: 'pump', name: 'مضخة وقود', qty: 4, power: 1500, hours: 24 },
    { id: 'lights_canopy', name: 'إضاءة المظلة', qty: 20, power: 150, hours: 12 },
    { id: 'shop_fridge', name: 'ثلاجات البقالة', qty: 3, power: 600, hours: 24 },
  ],
  mining_company: [
    { id: 'heavy_machinery', name: 'آلات طحن', qty: 2, power: 20000, hours: 16 },
    { id: 'water_pump', name: 'مضخات مياه', qty: 3, power: 5000, hours: 24 },
    { id: 'camp_ac', name: 'مكيفات السكن', qty: 20, power: 1200, hours: 12 },
    { id: 'lights', name: 'كشافات', qty: 50, power: 200, hours: 12 },
  ],
};

/**
 * Calculates total daily energy consumption in Watt-hours (Wh).
 * @param {Array} devices - Array of device objects (qty, power, hours)
 * @returns {number} Total Wh
 */
export const calculateTotalConsumption = (devices) => {
  return devices.reduce((total, device) => {
    const qty = Number(device.qty) || 0;
    const power = Number(device.power) || 0;
    const hours = Number(device.hours) || 0;
    return total + (qty * power * hours);
  }, 0);
};

/**
 * Calculates estimated solar system requirements.
 * @param {number} dailyEnergyWh - Total daily energy in Wh
 * @param {number} peakSunHours - Estimated peak sun hours (default 5.5 for high sun regions)
 * @param {number} systemLossesFactor - Factor to account for system losses (default 1.3 for 30% loss)
 * @returns {object} Calculated requirements
 */
export const calculateSystemRequirements = (dailyEnergyWh, peakSunHours = 5.5, systemLossesFactor = 1.3) => {
  // Required daily energy generation accounting for losses
  const requiredDailyGenerationWh = dailyEnergyWh * systemLossesFactor;

  // Required solar array size in Watts
  const requiredSolarArrayW = requiredDailyGenerationWh / peakSunHours;

  // Required solar array size in kiloWatts (kW)
  const requiredSolarArrayKw = requiredSolarArrayW / 1000;

  return {
    dailyEnergyKwh: dailyEnergyWh / 1000,
    requiredGenerationKwh: requiredDailyGenerationWh / 1000,
    recommendedSystemKw: requiredSolarArrayKw,
  };
};
