export const facilityTypes = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج',
    defaultAppliances: [
      { id: '1', name: 'ماكينة صنع ثلج', qty: 2, watts: 5000, hours: 24 },
      { id: '2', name: 'إضاءة', qty: 10, watts: 20, hours: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    defaultAppliances: [
      { id: '1', name: 'كمبيوتر', qty: 10, watts: 200, hours: 8 },
      { id: '2', name: 'مكيف هواء', qty: 4, watts: 1500, hours: 8 },
      { id: '3', name: 'إضاءة', qty: 20, watts: 20, hours: 10 },
      { id: '4', name: 'طابعة', qty: 2, watts: 500, hours: 2 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultAppliances: [
      { id: '1', name: 'مضخة مياه صغيرة', qty: 1, watts: 2000, hours: 6 },
      { id: '2', name: 'إضاءة', qty: 5, watts: 30, hours: 12 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultAppliances: [
      { id: '1', name: 'مراوح تهوية', qty: 6, watts: 500, hours: 24 },
      { id: '2', name: 'إضاءة', qty: 20, watts: 20, hours: 16 },
      { id: '3', name: 'سخان', qty: 4, watts: 2000, hours: 12 },
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    defaultAppliances: [
      { id: '1', name: 'مضخة ري', qty: 2, watts: 1500, hours: 4 },
      { id: '2', name: 'مراوح', qty: 4, watts: 300, hours: 12 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultAppliances: [
      { id: '1', name: 'ماكينات إنتاج', qty: 5, watts: 10000, hours: 16 },
      { id: '2', name: 'إضاءة', qty: 50, watts: 40, hours: 16 },
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultAppliances: [
      { id: '1', name: 'مكيف هواء', qty: 6, watts: 1500, hours: 12 },
      { id: '2', name: 'ثلاجة أدوية', qty: 2, watts: 300, hours: 24 },
      { id: '3', name: 'أجهزة فحص', qty: 3, watts: 1000, hours: 8 },
      { id: '4', name: 'إضاءة', qty: 20, watts: 20, hours: 12 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    defaultAppliances: [
      { id: '1', name: 'تكييف مركزي', qty: 1, watts: 50000, hours: 24 },
      { id: '2', name: 'أجهزة طبية', qty: 20, watts: 1000, hours: 12 },
      { id: '3', name: 'ثلاجات', qty: 10, watts: 400, hours: 24 },
      { id: '4', name: 'إضاءة', qty: 100, watts: 20, hours: 24 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultAppliances: [
      { id: '1', name: 'عجانة', qty: 2, watts: 3000, hours: 8 },
      { id: '2', name: 'إضاءة', qty: 10, watts: 20, hours: 12 },
      { id: '3', name: 'ثلاجة عرض', qty: 1, watts: 500, hours: 24 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultAppliances: [
      { id: '1', name: 'ثلاجة', qty: 2, watts: 300, hours: 24 },
      { id: '2', name: 'مروحة', qty: 2, watts: 100, hours: 12 },
      { id: '3', name: 'إضاءة', qty: 4, watts: 20, hours: 12 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultAppliances: [
      { id: '1', name: 'ماكينة لحام', qty: 1, watts: 4000, hours: 4 },
      { id: '2', name: 'صاروخ قطع', qty: 2, watts: 1000, hours: 4 },
      { id: '3', name: 'إضاءة', qty: 6, watts: 40, hours: 10 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    defaultAppliances: [
      { id: '1', name: 'مضخة غاطسة', qty: 1, watts: 5500, hours: 8 },
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي',
    defaultAppliances: [
      { id: '1', name: 'مضخة مياه الدونكي', qty: 1, watts: 3000, hours: 8 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultAppliances: [
      { id: '1', name: 'مكيف هواء', qty: 4, watts: 2000, hours: 6 },
      { id: '2', name: 'مراوح', qty: 10, watts: 80, hours: 6 },
      { id: '3', name: 'إضاءة', qty: 20, watts: 20, hours: 6 },
      { id: '4', name: 'مكبر صوت', qty: 1, watts: 200, hours: 3 },
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultAppliances: [
      { id: '1', name: 'ماكينة طباعة', qty: 2, watts: 5000, hours: 10 },
      { id: '2', name: 'كمبيوتر', qty: 4, watts: 200, hours: 10 },
      { id: '3', name: 'مكيف هواء', qty: 3, watts: 1500, hours: 10 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultAppliances: [
      { id: '1', name: 'ماكينة قهوة', qty: 1, watts: 3000, hours: 12 },
      { id: '2', name: 'ثلاجة عرض', qty: 2, watts: 500, hours: 24 },
      { id: '3', name: 'مكيف هواء', qty: 2, watts: 1500, hours: 12 },
      { id: '4', name: 'إضاءة ديكور', qty: 20, watts: 15, hours: 12 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultAppliances: [
      { id: '1', name: 'ثلاجة كبيرة', qty: 3, watts: 800, hours: 24 },
      { id: '2', name: 'مكيف هواء', qty: 4, watts: 2000, hours: 14 },
      { id: '3', name: 'شفاط هواء', qty: 2, watts: 500, hours: 14 },
      { id: '4', name: 'إضاءة', qty: 30, watts: 20, hours: 14 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultAppliances: [
      { id: '1', name: 'مكيفات غرف', qty: 20, watts: 1200, hours: 12 },
      { id: '2', name: 'ثلاجات غرف', qty: 20, watts: 100, hours: 24 },
      { id: '3', name: 'إضاءة عامة', qty: 100, watts: 20, hours: 12 },
      { id: '4', name: 'مصعد', qty: 1, watts: 10000, hours: 5 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultAppliances: [
      { id: '1', name: 'تكييف مركزي', qty: 1, watts: 15000, hours: 10 },
      { id: '2', name: 'كمبيوترات', qty: 15, watts: 200, hours: 10 },
      { id: '3', name: 'صراف آلي', qty: 2, watts: 500, hours: 24 },
      { id: '4', name: 'إضاءة', qty: 40, watts: 20, hours: 10 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultAppliances: [
      { id: '1', name: 'ثلاجة عرض كبيرة', qty: 5, watts: 1000, hours: 24 },
      { id: '2', name: 'فريزر', qty: 3, watts: 1200, hours: 24 },
      { id: '3', name: 'مكيف هواء', qty: 4, watts: 2000, hours: 16 },
      { id: '4', name: 'إضاءة', qty: 50, watts: 30, hours: 16 },
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultAppliances: [
      { id: '1', name: 'مضخة وقود', qty: 4, watts: 1500, hours: 24 },
      { id: '2', name: 'إضاءة مظلة', qty: 10, watts: 100, hours: 12 },
      { id: '3', name: 'مكيف بقالة', qty: 1, watts: 1500, hours: 24 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultAppliances: [
      { id: '1', name: 'طاحونة كسارة', qty: 2, watts: 20000, hours: 16 },
      { id: '2', name: 'مضخة مياه كبيرة', qty: 1, watts: 10000, hours: 12 },
      { id: '3', name: 'إضاءة كشافات', qty: 10, watts: 500, hours: 12 },
      { id: '4', name: 'مكيفات مكاتب', qty: 5, watts: 1500, hours: 10 },
    ]
  }
];

/**
 * Calculates the total daily energy consumption in Watt-hours (Wh).
 * @param {Array} appliances - Array of appliances { qty, watts, hours }
 * @returns {number} Total daily energy in Wh
 */
export function calculateDailyEnergy(appliances) {
  return appliances.reduce((total, app) => {
    const qty = Number(app.qty) || 0;
    const watts = Number(app.watts) || 0;
    const hours = Number(app.hours) || 0;
    return total + (qty * watts * hours);
  }, 0);
}

/**
 * Calculates the required solar system size in kiloWatts (kW).
 * Assumes a default of 5 peak sun hours and 20% system losses (efficiency 0.8).
 * @param {number} dailyEnergyWh - Total daily energy in Watt-hours
 * @param {number} sunHours - Average peak sun hours (default 5)
 * @param {number} efficiency - System efficiency (default 0.8)
 * @returns {number} Recommended system size in kW
 */
export function calculateSystemSize(dailyEnergyWh, sunHours = 5, efficiency = 0.8) {
  if (!dailyEnergyWh || dailyEnergyWh <= 0) return 0;

  const dailyEnergyKWh = dailyEnergyWh / 1000;
  const systemSizeKW = dailyEnergyKWh / (sunHours * efficiency);

  return Number(systemSizeKW.toFixed(2));
}
