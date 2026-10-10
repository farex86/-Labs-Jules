export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج', // Ice Factory
    appliances: [
      { id: '1', name: 'آلة صنع الثلج', powerW: 5000, qty: 2, hours: 24 }, // Ice machine
      { id: '2', name: 'غرفة تبريد', powerW: 3000, qty: 1, hours: 24 }, // Cold room
      { id: '3', name: 'إضاءة', powerW: 50, qty: 10, hours: 12 }, // Lighting
    ],
  },
  {
    id: 'company',
    name: 'شركة', // Company/Office
    appliances: [
      { id: '1', name: 'مكيف هواء', powerW: 1500, qty: 4, hours: 10 },
      { id: '2', name: 'جهاز كمبيوتر', powerW: 300, qty: 10, hours: 8 },
      { id: '3', name: 'إضاءة', powerW: 40, qty: 20, hours: 10 },
      { id: '4', name: 'طابعة', powerW: 500, qty: 2, hours: 2 },
    ],
  },
  {
    id: 'farm',
    name: 'مزرعة', // Farm
    appliances: [
      { id: '1', name: 'مضخة ماء (متوسطة)', powerW: 2200, qty: 1, hours: 6 },
      { id: '2', name: 'إضاءة خارجية', powerW: 100, qty: 5, hours: 12 },
    ],
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن', // Poultry Farm
    appliances: [
      { id: '1', name: 'مراوح تهوية', powerW: 750, qty: 4, hours: 24 },
      { id: '2', name: 'نظام تدفئة', powerW: 2000, qty: 2, hours: 12 },
      { id: '3', name: 'إضاءة', powerW: 40, qty: 20, hours: 16 },
      { id: '4', name: 'مضخة ماء', powerW: 1500, qty: 1, hours: 4 },
    ],
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية', // Greenhouses
    appliances: [
      { id: '1', name: 'مضخة ري', powerW: 1500, qty: 1, hours: 4 },
      { id: '2', name: 'مراوح تبريد', powerW: 500, qty: 4, hours: 8 },
      { id: '3', name: 'إضاءة زراعية', powerW: 100, qty: 10, hours: 6 },
    ],
  },
  {
    id: 'factory',
    name: 'مصنع', // General Factory
    appliances: [
      { id: '1', name: 'آلات إنتاج', powerW: 5000, qty: 3, hours: 12 },
      { id: '2', name: 'مكيفات مركزية', powerW: 4000, qty: 2, hours: 12 },
      { id: '3', name: 'إضاءة صناعية', powerW: 150, qty: 20, hours: 12 },
    ],
  },
  {
    id: 'clinic',
    name: 'مستوصف', // Clinic
    appliances: [
      { id: '1', name: 'مكيف هواء', powerW: 1500, qty: 5, hours: 12 },
      { id: '2', name: 'ثلاجة أدوية', powerW: 300, qty: 2, hours: 24 },
      { id: '3', name: 'إضاءة', powerW: 40, qty: 30, hours: 12 },
      { id: '4', name: 'أجهزة طبية صغيرة', powerW: 500, qty: 3, hours: 6 },
    ],
  },
  {
    id: 'hospital',
    name: 'مستشفى', // Hospital
    appliances: [
      { id: '1', name: 'تكييف مركزي', powerW: 10000, qty: 2, hours: 24 },
      { id: '2', name: 'أجهزة طبية (عناية، أشعة)', powerW: 3000, qty: 5, hours: 24 },
      { id: '3', name: 'ثلاجات حفظ الدم والأدوية', powerW: 500, qty: 10, hours: 24 },
      { id: '4', name: 'إضاءة شاملة', powerW: 40, qty: 100, hours: 24 },
    ],
  },
  {
    id: 'bakery',
    name: 'مخبز', // Bakery
    appliances: [
      { id: '1', name: 'فرن كهربائي', powerW: 6000, qty: 2, hours: 10 },
      { id: '2', name: 'عجانة', powerW: 1500, qty: 2, hours: 4 },
      { id: '3', name: 'ثلاجة عرض', powerW: 800, qty: 2, hours: 24 },
      { id: '4', name: 'إضاءة', powerW: 50, qty: 10, hours: 12 },
    ],
  },
  {
    id: 'shop',
    name: 'دكان', // Small Shop
    appliances: [
      { id: '1', name: 'ثلاجة', powerW: 400, qty: 2, hours: 24 },
      { id: '2', name: 'مكيف هواء', powerW: 1500, qty: 1, hours: 14 },
      { id: '3', name: 'إضاءة', powerW: 40, qty: 6, hours: 14 },
    ],
  },
  {
    id: 'workshop',
    name: 'ورشة', // Workshop
    appliances: [
      { id: '1', name: 'ماكينة لحام', powerW: 3500, qty: 1, hours: 4 },
      { id: '2', name: 'كمبروسر هواء', powerW: 2000, qty: 1, hours: 6 },
      { id: '3', name: 'صاروخ جلخ', powerW: 800, qty: 2, hours: 3 },
      { id: '4', name: 'إضاءة', powerW: 100, qty: 5, hours: 10 },
    ],
  },
  {
    id: 'water_pump',
    name: 'مضخة موية', // Water Pump station
    appliances: [
      { id: '1', name: 'مضخة غاطسة كبيرة', powerW: 5500, qty: 1, hours: 8 },
      { id: '2', name: 'إضاءة', powerW: 50, qty: 2, hours: 12 },
    ],
  },
  {
    id: 'donkey',
    name: 'دونكي', // Donkey (Water station usually)
    appliances: [
      { id: '1', name: 'مضخة ماء (دونكي)', powerW: 4000, qty: 1, hours: 10 },
    ],
  },
  {
    id: 'mosque',
    name: 'مسجد', // Mosque
    appliances: [
      { id: '1', name: 'مكيف هواء', powerW: 2000, qty: 6, hours: 6 },
      { id: '2', name: 'مراوح', powerW: 80, qty: 10, hours: 8 },
      { id: '3', name: 'نظام صوتيات', powerW: 300, qty: 1, hours: 3 },
      { id: '4', name: 'إضاءة', powerW: 40, qty: 30, hours: 8 },
    ],
  },
  {
    id: 'printing_press',
    name: 'مطبعة', // Printing Press
    appliances: [
      { id: '1', name: 'ماكينة طباعة كبيرة', powerW: 4000, qty: 2, hours: 8 },
      { id: '2', name: 'مكيف هواء', powerW: 2000, qty: 2, hours: 10 },
      { id: '3', name: 'أجهزة كمبيوتر', powerW: 300, qty: 5, hours: 8 },
      { id: '4', name: 'إضاءة', powerW: 50, qty: 15, hours: 10 },
    ],
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب', // Coffee Shop
    appliances: [
      { id: '1', name: 'ماكينة اسبريسو', powerW: 3500, qty: 1, hours: 12 },
      { id: '2', name: 'مكيف هواء', powerW: 2000, qty: 2, hours: 14 },
      { id: '3', name: 'ثلاجة عرض', powerW: 500, qty: 2, hours: 24 },
      { id: '4', name: 'خلاط/طاحونة', powerW: 800, qty: 2, hours: 4 },
      { id: '5', name: 'إضاءة ديكور', powerW: 20, qty: 20, hours: 14 },
    ],
  },
  {
    id: 'restaurant',
    name: 'مطعم', // Restaurant
    appliances: [
      { id: '1', name: 'ثلاجة/فريزر', powerW: 800, qty: 4, hours: 24 },
      { id: '2', name: 'مكيف هواء', powerW: 2500, qty: 4, hours: 16 },
      { id: '3', name: 'شفاط هواء', powerW: 1000, qty: 2, hours: 12 },
      { id: '4', name: 'أفران/مايكروويف', powerW: 2000, qty: 2, hours: 6 },
      { id: '5', name: 'إضاءة', powerW: 50, qty: 40, hours: 16 },
    ],
  },
  {
    id: 'hotel',
    name: 'فندق', // Hotel
    appliances: [
      { id: '1', name: 'تكييف غرف', powerW: 1500, qty: 30, hours: 12 },
      { id: '2', name: 'سخانات مياه', powerW: 2000, qty: 30, hours: 4 },
      { id: '3', name: 'ثلاجات غرف صغيرة', powerW: 150, qty: 30, hours: 24 },
      { id: '4', name: 'إضاءة غرف وممرات', powerW: 20, qty: 200, hours: 12 },
      { id: '5', name: 'مصعد', powerW: 5000, qty: 1, hours: 3 },
    ],
  },
  {
    id: 'bank',
    name: 'بنك', // Bank
    appliances: [
      { id: '1', name: 'مكيف هواء مركزي', powerW: 6000, qty: 2, hours: 10 },
      { id: '2', name: 'أجهزة كمبيوتر', powerW: 300, qty: 20, hours: 10 },
      { id: '3', name: 'صراف آلي (ATM)', powerW: 500, qty: 3, hours: 24 },
      { id: '4', name: 'إضاءة', powerW: 40, qty: 50, hours: 10 },
    ],
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت', // Supermarket
    appliances: [
      { id: '1', name: 'ثلاجات عرض', powerW: 1200, qty: 6, hours: 24 },
      { id: '2', name: 'فريزرات', powerW: 1500, qty: 4, hours: 24 },
      { id: '3', name: 'مكيف هواء مركزي', powerW: 5000, qty: 2, hours: 16 },
      { id: '4', name: 'إضاءة', powerW: 40, qty: 40, hours: 16 },
    ],
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود', // Gas Station
    appliances: [
      { id: '1', name: 'مضخات وقود', powerW: 1000, qty: 4, hours: 12 },
      { id: '2', name: 'إضاءة مظلة ومحيط', powerW: 200, qty: 10, hours: 12 },
      { id: '3', name: 'مكيف هواء (إدارة)', powerW: 1500, qty: 2, hours: 12 },
    ],
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين', // Mining Company
    appliances: [
      { id: '1', name: 'معدات معالجة/تكسير', powerW: 15000, qty: 2, hours: 12 },
      { id: '2', name: 'مضخات مياه ضخمة', powerW: 7500, qty: 2, hours: 10 },
      { id: '3', name: 'كشافات إضاءة قوية', powerW: 500, qty: 20, hours: 12 },
      { id: '4', name: 'مكيفات مكاتب ومخيمات', powerW: 1500, qty: 10, hours: 12 },
    ],
  },
];

/**
 * Calculates total daily energy consumption in Watt-hours (Wh).
 * @param {Array} appliances - Array of appliance objects { powerW, qty, hours }
 * @returns {number} Total daily Watt-hours
 */
export function calculateTotalConsumption(appliances) {
  if (!appliances || !Array.isArray(appliances)) return 0;
  return appliances.reduce((total, app) => {
    return total + (app.powerW * app.qty * app.hours);
  }, 0);
}

/**
 * Estimates basic solar system requirements based on daily consumption.
 * @param {number} dailyWh - Total daily energy consumption in Watt-hours
 * @returns {Object} Estimated system requirements
 */
export function estimateSystemRequirements(dailyWh) {
  // Assuming 5 hours of effective peak sun hours (average for sunny regions)
  const peakSunHours = 5;
  // System inefficiency factor (wiring, dust, inverter losses, temp derating)
  const efficiencyFactor = 0.75;

  // Required solar array size in Watts
  const requiredSolarWatts = dailyWh / (peakSunHours * efficiencyFactor);
  // Convert to kiloWatts (kW)
  const requiredKw = requiredSolarWatts / 1000;

  // Assuming 50% depth of discharge for batteries, 1 day autonomy, 48V system
  const batteryVoltage = 48;
  const batteryAhRequired = (dailyWh / batteryVoltage) / 0.5;

  return {
    dailyKwh: (dailyWh / 1000).toFixed(2),
    recommendedInverterKw: (requiredKw * 1.25).toFixed(2), // 25% overhead for inverter
    recommendedSolarKw: requiredKw.toFixed(2),
    estimatedPanels500w: Math.ceil(requiredSolarWatts / 500), // Number of 500W panels
    batteryCapacityAh: Math.ceil(batteryAhRequired),
    batteryVoltage: batteryVoltage
  };
}
