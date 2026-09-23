export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج',
    defaultAppliances: [
      { id: 'ice_machine', name: 'ماكينة ثلج', quantity: 2, watts: 5000, hours: 12 },
      { id: 'freezer', name: 'فريزر', quantity: 4, watts: 1000, hours: 24 },
      { id: 'lighting', name: 'إضاءة', quantity: 10, watts: 50, hours: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    defaultAppliances: [
      { id: 'ac', name: 'مكيف', quantity: 5, watts: 1500, hours: 8 },
      { id: 'pc', name: 'كمبيوتر', quantity: 10, watts: 200, hours: 8 },
      { id: 'printer', name: 'طابعة', quantity: 2, watts: 500, hours: 2 },
      { id: 'lighting', name: 'إضاءة', quantity: 20, watts: 20, hours: 10 },
      { id: 'fridge', name: 'ثلاجة', quantity: 1, watts: 250, hours: 24 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultAppliances: [
      { id: 'water_pump', name: 'مضخة مياه', quantity: 1, watts: 3000, hours: 6 },
      { id: 'lighting', name: 'إضاءة', quantity: 5, watts: 20, hours: 12 },
      { id: 'fridge', name: 'ثلاجة', quantity: 1, watts: 300, hours: 24 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultAppliances: [
      { id: 'heater', name: 'دفاية', quantity: 5, watts: 2000, hours: 12 },
      { id: 'fan', name: 'مروحة شفط', quantity: 4, watts: 500, hours: 24 },
      { id: 'lighting', name: 'إضاءة', quantity: 20, watts: 20, hours: 14 },
      { id: 'feeder', name: 'ماكينة علف', quantity: 2, watts: 1000, hours: 4 },
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    defaultAppliances: [
      { id: 'cooling_pad', name: 'نظام تبريد', quantity: 2, watts: 1500, hours: 10 },
      { id: 'fan', name: 'مروحة', quantity: 4, watts: 300, hours: 12 },
      { id: 'pump', name: 'مضخة ري', quantity: 1, watts: 1000, hours: 4 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultAppliances: [
      { id: 'heavy_machine', name: 'ماكينة إنتاج', quantity: 3, watts: 10000, hours: 8 },
      { id: 'ac', name: 'تكييف مركزي', quantity: 1, watts: 5000, hours: 8 },
      { id: 'lighting', name: 'إضاءة', quantity: 50, watts: 50, hours: 10 },
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultAppliances: [
      { id: 'ac', name: 'مكيف', quantity: 6, watts: 1500, hours: 12 },
      { id: 'lighting', name: 'إضاءة', quantity: 30, watts: 20, hours: 12 },
      { id: 'medical_eq', name: 'أجهزة طبية', quantity: 4, watts: 1000, hours: 8 },
      { id: 'fridge', name: 'ثلاجة أدوية', quantity: 2, watts: 300, hours: 24 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    defaultAppliances: [
      { id: 'central_ac', name: 'تكييف مركزي', quantity: 2, watts: 20000, hours: 24 },
      { id: 'lighting', name: 'إضاءة', quantity: 200, watts: 20, hours: 24 },
      { id: 'medical_eq', name: 'أجهزة طبية متقدمة', quantity: 20, watts: 1500, hours: 12 },
      { id: 'elevator', name: 'مصعد', quantity: 2, watts: 5000, hours: 10 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultAppliances: [
      { id: 'mixer', name: 'عجانة', quantity: 2, watts: 3000, hours: 6 },
      { id: 'oven_fan', name: 'مروحة فرن', quantity: 2, watts: 500, hours: 10 },
      { id: 'fridge', name: 'ثلاجة عرض', quantity: 2, watts: 800, hours: 24 },
      { id: 'lighting', name: 'إضاءة', quantity: 10, watts: 40, hours: 14 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultAppliances: [
      { id: 'fridge', name: 'ثلاجة', quantity: 2, watts: 400, hours: 24 },
      { id: 'freezer', name: 'فريزر', quantity: 1, watts: 500, hours: 24 },
      { id: 'fan', name: 'مروحة سقف', quantity: 2, watts: 80, hours: 14 },
      { id: 'lighting', name: 'إضاءة', quantity: 4, watts: 20, hours: 8 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultAppliances: [
      { id: 'welder', name: 'ماكينة لحام', quantity: 1, watts: 4000, hours: 4 },
      { id: 'grinder', name: 'صاروخ', quantity: 2, watts: 800, hours: 3 },
      { id: 'compressor', name: 'كمبروسر هواء', quantity: 1, watts: 2000, hours: 4 },
      { id: 'lighting', name: 'إضاءة', quantity: 6, watts: 50, hours: 10 },
    ]
  },
  {
    id: 'water_pump_station',
    name: 'مضخة موية',
    defaultAppliances: [
      { id: 'main_pump', name: 'مضخة غاطسة', quantity: 1, watts: 5500, hours: 8 },
      { id: 'lighting', name: 'إضاءة كشاف', quantity: 2, watts: 100, hours: 12 },
    ]
  },
  {
    id: 'donkey_water_station',
    name: 'دونكي',
    defaultAppliances: [
      { id: 'pump', name: 'طلمبة مياه', quantity: 1, watts: 2200, hours: 10 },
      { id: 'lighting', name: 'إضاءة', quantity: 2, watts: 20, hours: 12 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultAppliances: [
      { id: 'ac', name: 'مكيف', quantity: 6, watts: 2000, hours: 4 },
      { id: 'fan', name: 'مروحة', quantity: 10, watts: 80, hours: 6 },
      { id: 'lighting', name: 'إضاءة', quantity: 30, watts: 20, hours: 5 },
      { id: 'sound_system', name: 'مكبر صوت', quantity: 1, watts: 300, hours: 2 },
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultAppliances: [
      { id: 'printer_large', name: 'ماكينة طباعة كبيرة', quantity: 2, watts: 5000, hours: 8 },
      { id: 'cutter', name: 'مقص ورق', quantity: 1, watts: 1500, hours: 4 },
      { id: 'ac', name: 'مكيف', quantity: 3, watts: 1500, hours: 10 },
      { id: 'lighting', name: 'إضاءة', quantity: 20, watts: 40, hours: 10 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultAppliances: [
      { id: 'espresso', name: 'ماكينة اسبريسو', quantity: 1, watts: 3500, hours: 12 },
      { id: 'grinder', name: 'طاحونة بن', quantity: 2, watts: 400, hours: 4 },
      { id: 'fridge', name: 'ثلاجة عرض', quantity: 2, watts: 500, hours: 24 },
      { id: 'ac', name: 'مكيف', quantity: 2, watts: 2000, hours: 14 },
      { id: 'lighting', name: 'إضاءة', quantity: 15, watts: 20, hours: 14 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultAppliances: [
      { id: 'fridge', name: 'ثلاجة', quantity: 3, watts: 600, hours: 24 },
      { id: 'freezer', name: 'فريزر', quantity: 2, watts: 800, hours: 24 },
      { id: 'ac', name: 'مكيف', quantity: 4, watts: 2000, hours: 14 },
      { id: 'extractor', name: 'شفاط مطبخ', quantity: 2, watts: 1000, hours: 12 },
      { id: 'lighting', name: 'إضاءة', quantity: 30, watts: 20, hours: 14 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultAppliances: [
      { id: 'ac', name: 'مكيف', quantity: 20, watts: 1500, hours: 12 },
      { id: 'tv', name: 'تلفزيون', quantity: 20, watts: 100, hours: 6 },
      { id: 'fridge_small', name: 'ثلاجة صغيرة', quantity: 20, watts: 100, hours: 24 },
      { id: 'elevator', name: 'مصعد', quantity: 1, watts: 5000, hours: 8 },
      { id: 'lighting', name: 'إضاءة', quantity: 100, watts: 20, hours: 12 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultAppliances: [
      { id: 'ac', name: 'تكييف مركزي', quantity: 1, watts: 10000, hours: 10 },
      { id: 'pc', name: 'كمبيوتر', quantity: 15, watts: 200, hours: 9 },
      { id: 'atm', name: 'صراف آلي', quantity: 2, watts: 500, hours: 24 },
      { id: 'server', name: 'سيرفر', quantity: 1, watts: 800, hours: 24 },
      { id: 'lighting', name: 'إضاءة', quantity: 40, watts: 20, hours: 10 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultAppliances: [
      { id: 'fridge_display', name: 'ثلاجة عرض', quantity: 5, watts: 800, hours: 24 },
      { id: 'freezer', name: 'فريزر', quantity: 3, watts: 600, hours: 24 },
      { id: 'ac', name: 'مكيف', quantity: 3, watts: 2000, hours: 16 },
      { id: 'pos', name: 'نقطة بيع', quantity: 2, watts: 100, hours: 16 },
      { id: 'lighting', name: 'إضاءة', quantity: 30, watts: 40, hours: 16 },
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultAppliances: [
      { id: 'fuel_pump', name: 'مضخة وقود', quantity: 4, watts: 750, hours: 10 },
      { id: 'lighting_canopy', name: 'إضاءة المظلة', quantity: 8, watts: 150, hours: 12 },
      { id: 'ac', name: 'مكيف مكتب', quantity: 1, watts: 1500, hours: 14 },
      { id: 'fridge', name: 'ثلاجة', quantity: 2, watts: 400, hours: 24 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultAppliances: [
      { id: 'crusher', name: 'كسارة', quantity: 1, watts: 15000, hours: 10 },
      { id: 'generator_aux', name: 'معدات مساعدة', quantity: 1, watts: 5000, hours: 10 },
      { id: 'lighting', name: 'كشافات إضاءة', quantity: 10, watts: 200, hours: 12 },
      { id: 'camp_ac', name: 'مكيفات السكن', quantity: 5, watts: 1500, hours: 12 },
    ]
  }
];

/**
 * Calculates total daily energy consumption and required solar system capacity.
 *
 * @param {Array} appliances - Array of appliance objects { quantity, watts, hours }
 * @returns {Object} { totalDailyWh, systemSizeKw, inverterSizeKw, recommendedPanels, recommendedBatteries }
 */
export const calculateSolarRequirements = (appliances) => {
  if (!appliances || appliances.length === 0) {
    return { totalDailyWh: 0, systemSizeKw: 0, inverterSizeKw: 0, recommendedPanels: 0, recommendedBatteries: 0 };
  }

  let totalDailyWh = 0;
  let maxHourlyW = 0;

  appliances.forEach(app => {
    const qty = Number(app.quantity) || 0;
    const watts = Number(app.watts) || 0;
    const hours = Number(app.hours) || 0;

    const powerW = qty * watts;
    const energyWh = powerW * hours;

    totalDailyWh += energyWh;
    maxHourlyW += powerW;
  });

  // Basic solar math assumptions
  const peakSunHours = 5.5; // Average in many sunny regions
  const systemEfficiency = 0.8; // 80% efficiency

  // Required daily generation = Consumption / Efficiency
  const requiredDailyGenerationWh = totalDailyWh / systemEfficiency;

  // Solar array size required (kW)
  const systemSizeKw = requiredDailyGenerationWh / peakSunHours / 1000;

  // Inverter should handle max hourly wattage + 20% safety margin
  const inverterSizeKw = (maxHourlyW * 1.2) / 1000;

  // Typical panel size 550W
  const panelWattage = 550;
  const recommendedPanels = Math.ceil((systemSizeKw * 1000) / panelWattage);

  // Batteries (assuming 48V, 200Ah Lithium = ~9600Wh per battery)
  // Let's aim for 1 day of autonomy (ignoring daytime usage for simplicity in this basic calc)
  const batteryCapacityWh = 9600;
  const recommendedBatteries = Math.ceil(totalDailyWh / batteryCapacityWh);

  return {
    totalDailyWh,
    systemSizeKw,
    inverterSizeKw,
    recommendedPanels,
    recommendedBatteries
  };
};
