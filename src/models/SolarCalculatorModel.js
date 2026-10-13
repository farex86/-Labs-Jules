export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج',
    defaultAppliances: [
      { id: '1', name: 'ماكينة ثلج', power: 5000, quantity: 2, hours: 24 },
      { id: '2', name: 'إضاءة', power: 40, quantity: 10, hours: 12 },
      { id: '3', name: 'مكيف', power: 1500, quantity: 1, hours: 12 },
    ],
  },
  {
    id: 'company',
    name: 'شركة',
    defaultAppliances: [
      { id: '1', name: 'كمبيوتر', power: 250, quantity: 10, hours: 8 },
      { id: '2', name: 'إضاءة', power: 40, quantity: 20, hours: 10 },
      { id: '3', name: 'مكيف', power: 2000, quantity: 2, hours: 8 },
      { id: '4', name: 'طابعة', power: 500, quantity: 1, hours: 2 },
    ],
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultAppliances: [
      { id: '1', name: 'طلمبة مياه', power: 3000, quantity: 1, hours: 6 },
      { id: '2', name: 'إضاءة', power: 40, quantity: 5, hours: 12 },
    ],
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultAppliances: [
      { id: '1', name: 'مراوح تهوية', power: 500, quantity: 6, hours: 24 },
      { id: '2', name: 'إضاءة', power: 40, quantity: 20, hours: 16 },
      { id: '3', name: 'دفايات', power: 2000, quantity: 4, hours: 12 },
    ],
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    defaultAppliances: [
      { id: '1', name: 'مراوح تبريد', power: 750, quantity: 4, hours: 12 },
      { id: '2', name: 'مضخة ري', power: 1500, quantity: 1, hours: 4 },
    ],
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultAppliances: [
      { id: '1', name: 'ماكينة إنتاج', power: 10000, quantity: 3, hours: 16 },
      { id: '2', name: 'إضاءة قوية', power: 100, quantity: 30, hours: 16 },
      { id: '3', name: 'مكيفات مركزية', power: 5000, quantity: 2, hours: 16 },
    ],
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultAppliances: [
      { id: '1', name: 'إضاءة', power: 40, quantity: 20, hours: 12 },
      { id: '2', name: 'مكيفات', power: 1500, quantity: 4, hours: 12 },
      { id: '3', name: 'أجهزة طبية', power: 1000, quantity: 3, hours: 8 },
      { id: '4', name: 'ثلاجة أدوية', power: 300, quantity: 2, hours: 24 },
    ],
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    defaultAppliances: [
      { id: '1', name: 'إضاءة', power: 40, quantity: 100, hours: 24 },
      { id: '2', name: 'مكيفات', power: 2000, quantity: 20, hours: 24 },
      { id: '3', name: 'أجهزة طبية (عناية، الخ)', power: 2000, quantity: 10, hours: 24 },
      { id: '4', name: 'ثلاجات', power: 500, quantity: 5, hours: 24 },
      { id: '5', name: 'مصاعد', power: 5000, quantity: 2, hours: 12 },
    ],
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultAppliances: [
      { id: '1', name: 'عجانة', power: 3000, quantity: 2, hours: 8 },
      { id: '2', name: 'فرن كهربائي', power: 8000, quantity: 1, hours: 10 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 10, hours: 12 },
    ],
  },
  {
    id: 'grocery',
    name: 'دكان',
    defaultAppliances: [
      { id: '1', name: 'ثلاجة عرض', power: 800, quantity: 2, hours: 24 },
      { id: '2', name: 'ديب فريزر', power: 600, quantity: 1, hours: 24 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 6, hours: 14 },
      { id: '4', name: 'مروحة', power: 75, quantity: 2, hours: 14 },
    ],
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultAppliances: [
      { id: '1', name: 'ماكينة لحام', power: 5000, quantity: 1, hours: 4 },
      { id: '2', name: 'صاروخ جلخ', power: 1500, quantity: 2, hours: 3 },
      { id: '3', name: 'شنيور', power: 800, quantity: 2, hours: 2 },
      { id: '4', name: 'إضاءة', power: 100, quantity: 4, hours: 10 },
    ],
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    defaultAppliances: [
      { id: '1', name: 'مضخة غاطسة', power: 2200, quantity: 1, hours: 8 },
    ],
  },
  {
    id: 'donkey',
    name: 'دونكي',
    defaultAppliances: [
      { id: '1', name: 'مضخة مياه صغيرة', power: 750, quantity: 1, hours: 5 },
    ],
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultAppliances: [
      { id: '1', name: 'مكيف', power: 2000, quantity: 4, hours: 4 },
      { id: '2', name: 'إضاءة', power: 40, quantity: 20, hours: 5 },
      { id: '3', name: 'مضخة وضوء', power: 750, quantity: 1, hours: 2 },
      { id: '4', name: 'مكبر صوت', power: 100, quantity: 1, hours: 3 },
    ],
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultAppliances: [
      { id: '1', name: 'ماكينة طباعة', power: 4000, quantity: 2, hours: 8 },
      { id: '2', name: 'ماكينة قص', power: 1500, quantity: 1, hours: 4 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 15, hours: 10 },
      { id: '4', name: 'مكيف', power: 1500, quantity: 2, hours: 10 },
    ],
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultAppliances: [
      { id: '1', name: 'ماكينة اسبريسو', power: 3000, quantity: 1, hours: 12 },
      { id: '2', name: 'خلاط/كسارة ثلج', power: 800, quantity: 2, hours: 4 },
      { id: '3', name: 'ثلاجة عرض', power: 600, quantity: 1, hours: 24 },
      { id: '4', name: 'إضاءة ديكور', power: 20, quantity: 30, hours: 12 },
      { id: '5', name: 'مكيف', power: 2000, quantity: 2, hours: 12 },
    ],
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultAppliances: [
      { id: '1', name: 'ثلاجات كبيرة', power: 1200, quantity: 3, hours: 24 },
      { id: '2', name: 'شفاط هواء', power: 1500, quantity: 2, hours: 14 },
      { id: '3', name: 'قلاية كهربائية', power: 2500, quantity: 2, hours: 6 },
      { id: '4', name: 'إضاءة', power: 40, quantity: 20, hours: 14 },
      { id: '5', name: 'مكيف', power: 2000, quantity: 3, hours: 14 },
    ],
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultAppliances: [
      { id: '1', name: 'مكيفات غرف', power: 1500, quantity: 50, hours: 16 },
      { id: '2', name: 'إضاءة غرف وممرات', power: 20, quantity: 200, hours: 12 },
      { id: '3', name: 'سخانات مياه', power: 2000, quantity: 20, hours: 4 },
      { id: '4', name: 'مصاعد', power: 7500, quantity: 2, hours: 12 },
      { id: '5', name: 'ثلاجات استقبال', power: 1000, quantity: 4, hours: 24 },
    ],
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultAppliances: [
      { id: '1', name: 'أجهزة كمبيوتر', power: 250, quantity: 30, hours: 10 },
      { id: '2', name: 'مكيفات مركزية', power: 10000, quantity: 2, hours: 10 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 50, hours: 10 },
      { id: '4', name: 'صراف آلي (ATM)', power: 500, quantity: 3, hours: 24 },
      { id: '5', name: 'سيرفرات', power: 1500, quantity: 2, hours: 24 },
    ],
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultAppliances: [
      { id: '1', name: 'ثلاجات عرض (ألبان ومشروبات)', power: 1500, quantity: 5, hours: 24 },
      { id: '2', name: 'فريزرات لحوم', power: 1200, quantity: 4, hours: 24 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 40, hours: 16 },
      { id: '4', name: 'مكيفات', power: 2500, quantity: 4, hours: 16 },
    ],
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultAppliances: [
      { id: '1', name: 'مضخات وقود', power: 1500, quantity: 4, hours: 24 },
      { id: '2', name: 'إضاءة خارجية', power: 200, quantity: 10, hours: 12 },
      { id: '3', name: 'مكيف مكتب', power: 1500, quantity: 1, hours: 12 },
    ],
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultAppliances: [
      { id: '1', name: 'كسارات/طواحين', power: 15000, quantity: 2, hours: 16 },
      { id: '2', name: 'مضخات مياه كبيرة', power: 5000, quantity: 2, hours: 12 },
      { id: '3', name: 'إضاءة مواقع الكشافات', power: 500, quantity: 20, hours: 12 },
      { id: '4', name: 'مكيفات مكاتب', power: 1500, quantity: 5, hours: 12 },
    ],
  },
];

/**
 * Calculates the solar system requirements based on a list of appliances.
 * @param {Array} appliances - Array of objects: { power: number, quantity: number, hours: number }
 * @returns {Object} Calculated requirements.
 */
export function calculateSolarRequirements(appliances) {
  let totalPowerW = 0; // Peak power requirement (W)
  let dailyEnergyWh = 0; // Total daily energy consumption (Wh)

  appliances.forEach(app => {
    const p = Number(app.power) || 0;
    const q = Number(app.quantity) || 0;
    const h = Number(app.hours) || 0;

    totalPowerW += p * q;
    dailyEnergyWh += p * q * h;
  });

  // Constants for estimation
  const INVERTER_SAFETY_FACTOR = 1.25; // 25% extra capacity for surges
  const SYSTEM_EFFICIENCY = 0.8; // System losses (20%)
  const SUN_HOURS = 5; // Average daily peak sun hours
  const PANEL_WATTAGE = 550; // Standard solar panel wattage (W)
  const BATTERY_VOLTAGE = 48; // System voltage (V)
  const BATTERY_DOD = 0.8; // Depth of discharge (80% for Lithium, change to 0.5 for Lead-Acid)

  // Inverter Size (W)
  const inverterSizeW = totalPowerW * INVERTER_SAFETY_FACTOR;

  // Total Energy required from panels (Wh) considering losses
  const requiredEnergyWh = dailyEnergyWh / SYSTEM_EFFICIENCY;

  // Solar Array Size (W)
  const arraySizeW = requiredEnergyWh / SUN_HOURS;

  // Number of Panels
  const numberOfPanels = Math.ceil(arraySizeW / PANEL_WATTAGE);

  // Battery Bank Capacity (Ah) needed for 1 day of autonomy
  const batteryCapacityAh = dailyEnergyWh / (BATTERY_VOLTAGE * BATTERY_DOD);

  return {
    totalPowerW,
    dailyEnergyWh,
    inverterSizeW,
    arraySizeW,
    numberOfPanels,
    panelWattage: PANEL_WATTAGE,
    batteryCapacityAh,
    batteryVoltage: BATTERY_VOLTAGE,
  };
}
