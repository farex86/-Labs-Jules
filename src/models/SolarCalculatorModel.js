export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج',
    defaultDevices: [
      { id: '1', name: 'آلة صنع الثلج', quantity: 1, powerWatts: 5000, hoursPerDay: 24 },
      { id: '2', name: 'إضاءة', quantity: 10, powerWatts: 20, hoursPerDay: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    defaultDevices: [
      { id: '1', name: 'مكيف هواء', quantity: 4, powerWatts: 1500, hoursPerDay: 8 },
      { id: '2', name: 'حاسب آلي', quantity: 10, powerWatts: 200, hoursPerDay: 8 },
      { id: '3', name: 'إضاءة', quantity: 20, powerWatts: 18, hoursPerDay: 10 },
      { id: '4', name: 'طابعة', quantity: 2, powerWatts: 500, hoursPerDay: 2 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultDevices: [
      { id: '1', name: 'مضخة مياه زراعية', quantity: 1, powerWatts: 2200, hoursPerDay: 6 },
      { id: '2', name: 'إضاءة محيطية', quantity: 5, powerWatts: 50, hoursPerDay: 12 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultDevices: [
      { id: '1', name: 'مراوح تهوية', quantity: 6, powerWatts: 500, hoursPerDay: 24 },
      { id: '2', name: 'إضاءة', quantity: 20, powerWatts: 15, hoursPerDay: 16 },
      { id: '3', name: 'مضخة مياه', quantity: 1, powerWatts: 1100, hoursPerDay: 4 },
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    defaultDevices: [
      { id: '1', name: 'مراوح تبريد', quantity: 4, powerWatts: 300, hoursPerDay: 10 },
      { id: '2', name: 'مضخة مياه صغيرة', quantity: 1, powerWatts: 750, hoursPerDay: 4 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultDevices: [
      { id: '1', name: 'آلات إنتاج', quantity: 3, powerWatts: 4000, hoursPerDay: 8 },
      { id: '2', name: 'إضاءة عالية', quantity: 15, powerWatts: 100, hoursPerDay: 10 },
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultDevices: [
      { id: '1', name: 'مكيف هواء', quantity: 5, powerWatts: 1500, hoursPerDay: 12 },
      { id: '2', name: 'ثلاجة أدوية', quantity: 2, powerWatts: 250, hoursPerDay: 24 },
      { id: '3', name: 'إضاءة', quantity: 15, powerWatts: 20, hoursPerDay: 12 },
      { id: '4', name: 'معدات طبية', quantity: 3, powerWatts: 800, hoursPerDay: 4 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    defaultDevices: [
      { id: '1', name: 'مكيف مركزي', quantity: 2, powerWatts: 5000, hoursPerDay: 24 },
      { id: '2', name: 'أجهزة طبية حيوية', quantity: 10, powerWatts: 1000, hoursPerDay: 24 },
      { id: '3', name: 'إضاءة', quantity: 100, powerWatts: 20, hoursPerDay: 24 },
      { id: '4', name: 'ثلاجات حفظ', quantity: 5, powerWatts: 300, hoursPerDay: 24 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultDevices: [
      { id: '1', name: 'فرن كهربائي', quantity: 2, powerWatts: 6000, hoursPerDay: 10 },
      { id: '2', name: 'عجانة', quantity: 2, powerWatts: 1500, hoursPerDay: 6 },
      { id: '3', name: 'إضاءة', quantity: 8, powerWatts: 20, hoursPerDay: 14 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultDevices: [
      { id: '1', name: 'ثلاجة عرض', quantity: 1, powerWatts: 500, hoursPerDay: 24 },
      { id: '2', name: 'مروحة / مكيف صغير', quantity: 1, powerWatts: 1000, hoursPerDay: 12 },
      { id: '3', name: 'إضاءة', quantity: 4, powerWatts: 20, hoursPerDay: 12 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultDevices: [
      { id: '1', name: 'ماكينة لحام', quantity: 1, powerWatts: 3000, hoursPerDay: 4 },
      { id: '2', name: 'صاروخ جلخ', quantity: 2, powerWatts: 800, hoursPerDay: 3 },
      { id: '3', name: 'إضاءة كاشفة', quantity: 4, powerWatts: 100, hoursPerDay: 8 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    defaultDevices: [
      { id: '1', name: 'مضخة غاطسة', quantity: 1, powerWatts: 3000, hoursPerDay: 8 },
    ]
  },
  {
    id: 'donkey_pump',
    name: 'دونكي', // Note: Interpreted as local well/pump mechanism
    defaultDevices: [
      { id: '1', name: 'مضخة بئر صغيرة', quantity: 1, powerWatts: 1500, hoursPerDay: 6 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultDevices: [
      { id: '1', name: 'مكيف هواء', quantity: 4, powerWatts: 2000, hoursPerDay: 6 },
      { id: '2', name: 'مراوح', quantity: 6, powerWatts: 80, hoursPerDay: 6 },
      { id: '3', name: 'مكبر صوت', quantity: 1, powerWatts: 150, hoursPerDay: 3 },
      { id: '4', name: 'إضاءة', quantity: 15, powerWatts: 20, hoursPerDay: 6 },
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultDevices: [
      { id: '1', name: 'آلة طباعة كبيرة', quantity: 1, powerWatts: 5000, hoursPerDay: 8 },
      { id: '2', name: 'ماكينة قص', quantity: 1, powerWatts: 1500, hoursPerDay: 4 },
      { id: '3', name: 'حاسب آلي', quantity: 3, powerWatts: 200, hoursPerDay: 8 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultDevices: [
      { id: '1', name: 'ماكينة إسبريسو', quantity: 1, powerWatts: 3500, hoursPerDay: 12 },
      { id: '2', name: 'مطحنة قهوة', quantity: 1, powerWatts: 300, hoursPerDay: 4 },
      { id: '3', name: 'ثلاجة عرض', quantity: 1, powerWatts: 600, hoursPerDay: 24 },
      { id: '4', name: 'مكيف هواء', quantity: 2, powerWatts: 1500, hoursPerDay: 14 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultDevices: [
      { id: '1', name: 'ثلاجة / فريزر', quantity: 3, powerWatts: 600, hoursPerDay: 24 },
      { id: '2', name: 'مكيف هواء', quantity: 3, powerWatts: 1500, hoursPerDay: 14 },
      { id: '3', name: 'شفاط هواء', quantity: 2, powerWatts: 400, hoursPerDay: 10 },
      { id: '4', name: 'إضاءة', quantity: 20, powerWatts: 20, hoursPerDay: 14 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultDevices: [
      { id: '1', name: 'مكيف هواء غرف', quantity: 20, powerWatts: 1200, hoursPerDay: 12 },
      { id: '2', name: 'ثلاجات صغيرة', quantity: 20, powerWatts: 100, hoursPerDay: 24 },
      { id: '3', name: 'سخان مياه', quantity: 5, powerWatts: 2000, hoursPerDay: 6 },
      { id: '4', name: 'مصعد', quantity: 1, powerWatts: 5000, hoursPerDay: 4 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultDevices: [
      { id: '1', name: 'مكيف مركزي', quantity: 1, powerWatts: 5000, hoursPerDay: 10 },
      { id: '2', name: 'أجهزة صراف آلي', quantity: 2, powerWatts: 500, hoursPerDay: 24 },
      { id: '3', name: 'حواسيب', quantity: 15, powerWatts: 200, hoursPerDay: 9 },
      { id: '4', name: 'أنظمة أمنية', quantity: 1, powerWatts: 300, hoursPerDay: 24 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultDevices: [
      { id: '1', name: 'ثلاجات عرض', quantity: 8, powerWatts: 800, hoursPerDay: 24 },
      { id: '2', name: 'فريزر', quantity: 4, powerWatts: 1000, hoursPerDay: 24 },
      { id: '3', name: 'مكيف هواء', quantity: 4, powerWatts: 2000, hoursPerDay: 16 },
      { id: '4', name: 'إضاءة', quantity: 40, powerWatts: 20, hoursPerDay: 16 },
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultDevices: [
      { id: '1', name: 'مضخات وقود', quantity: 4, powerWatts: 1500, hoursPerDay: 8 },
      { id: '2', name: 'إضاءة مظلة', quantity: 12, powerWatts: 100, hoursPerDay: 12 },
      { id: '3', name: 'مكيف مكتب', quantity: 1, powerWatts: 1500, hoursPerDay: 24 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultDevices: [
      { id: '1', name: 'معدات حفر / تكسير كهربائية', quantity: 2, powerWatts: 10000, hoursPerDay: 10 },
      { id: '2', name: 'مضخات مياه كبيرة', quantity: 2, powerWatts: 5000, hoursPerDay: 12 },
      { id: '3', name: 'إضاءة كاشفة', quantity: 10, powerWatts: 500, hoursPerDay: 12 },
    ]
  },
];

/**
 * Calculates the total daily energy consumption in Watt-hours.
 * @param {Array} devices - List of device objects.
 * @returns {number} Total Watt-hours per day.
 */
export const calculateDailyConsumption = (devices) => {
  return devices.reduce((total, device) => {
    const qty = Number(device.quantity) || 0;
    const power = Number(device.powerWatts) || 0;
    const hours = Number(device.hoursPerDay) || 0;
    return total + (qty * power * hours);
  }, 0);
};

/**
 * Recommends solar system specifications based on daily consumption.
 * @param {number} dailyWh - Total daily energy consumption in Watt-hours.
 * @param {number} peakSunHours - Average peak sun hours (default 5 for many sunny regions).
 * @param {number} systemEfficiency - Overall system efficiency (default 0.8 to account for losses).
 * @param {number} batteryDaysOfAutonomy - Days of autonomy for batteries (default 1).
 * @param {number} batteryDepthOfDischarge - DoD for batteries (default 0.5 for Lead-Acid, 0.8 for Lithium).
 * @param {number} systemVoltage - Battery bank voltage (e.g., 24V or 48V).
 * @returns {Object} Recommended specs.
 */
export const calculateSystemRecommendation = (
  dailyWh,
  peakSunHours = 5.5, // e.g., Sudan/MENA region average
  systemEfficiency = 0.75,
  batteryDaysOfAutonomy = 1,
  batteryDepthOfDischarge = 0.8, // Assuming Lithium by default for modern systems
  systemVoltage = 48
) => {
  if (dailyWh <= 0) {
    return {
      requiredSolarKw: 0,
      requiredBatteryAh: 0,
      recommendedInverterKw: 0,
    };
  }

  // 1. Solar Panels Required
  // Total daily Wh to generate = dailyWh / systemEfficiency
  const requiredDailyGeneration = dailyWh / systemEfficiency;

  // Total Solar Panel capacity (Watts) = requiredDailyGeneration / peakSunHours
  const requiredSolarWatts = requiredDailyGeneration / peakSunHours;
  const requiredSolarKw = requiredSolarWatts / 1000;

  // 2. Battery Bank Required
  // Total Battery Capacity (Wh) = (dailyWh * daysOfAutonomy) / DoD
  const requiredBatteryWh = (dailyWh * batteryDaysOfAutonomy) / batteryDepthOfDischarge;

  // Total Battery Capacity (Ah) = Wh / System Voltage
  const requiredBatteryAh = requiredBatteryWh / systemVoltage;

  // 3. Inverter Sizing (Rough estimate based on a percentage of daily Wh or peak concurrent load, here we just use a multiple of average load)
  // A better way is to sum the max power of all devices, but for simple calculator we estimate based on generation size
  const recommendedInverterKw = Math.max(requiredSolarKw * 1.2, 1); // 20% headroom

  return {
    requiredSolarKw: Number(requiredSolarKw.toFixed(2)),
    requiredBatteryAh: Number(requiredBatteryAh.toFixed(0)),
    recommendedInverterKw: Number(recommendedInverterKw.toFixed(2)),
    systemVoltage,
  };
};
