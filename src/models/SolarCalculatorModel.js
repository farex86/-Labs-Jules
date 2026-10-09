// src/models/SolarCalculatorModel.js

// 1. Constant Configuration Data
export const FACILITY_TYPES = [
  'مصنع تلج',
  'شركة',
  'مزرعة',
  'مزرعة دواجن',
  'بيوت محمية',
  'مصنع',
  'مستوصف',
  'مستشفي',
  'مخبز',
  'دكان',
  'ورشة',
  'مضخة موية',
  'دونكي',
  'مسجد',
  'مطبعة',
  'كوفي شوب',
  'مطعم',
  'فندق',
  'بنك',
  'سوبر ماركت',
  'طرمبة وقود',
  'شركة تعدين'
];

export const APPLIANCE_DEFAULTS = {
  'مصنع تلج': [
    { id: '1', name: 'ماكينة ثلج كبيرة', watts: 5000, quantity: 2, hours: 12 },
    { id: '2', name: 'فريزر', watts: 1500, quantity: 4, hours: 24 },
    { id: '3', name: 'إضاءة', watts: 50, quantity: 10, hours: 12 },
  ],
  'شركة': [
    { id: '1', name: 'مكيف', watts: 1500, quantity: 5, hours: 8 },
    { id: '2', name: 'كمبيوتر', watts: 200, quantity: 10, hours: 8 },
    { id: '3', name: 'إضاءة', watts: 20, quantity: 20, hours: 10 },
  ],
  'مزرعة': [
    { id: '1', name: 'مضخة ري', watts: 2200, quantity: 1, hours: 6 },
    { id: '2', name: 'إضاءة محيطة', watts: 100, quantity: 5, hours: 12 },
  ],
  'مزرعة دواجن': [
    { id: '1', name: 'مراوح تهوية', watts: 500, quantity: 4, hours: 24 },
    { id: '2', name: 'إضاءة', watts: 40, quantity: 20, hours: 16 },
    { id: '3', name: 'نظام تدفئة', watts: 2000, quantity: 2, hours: 12 },
  ],
  'بيوت محمية': [
    { id: '1', name: 'مضخة ري', watts: 1500, quantity: 1, hours: 4 },
    { id: '2', name: 'مراوح', watts: 300, quantity: 6, hours: 10 },
  ],
  'مصنع': [
    { id: '1', name: 'آلات تصنيع', watts: 10000, quantity: 2, hours: 8 },
    { id: '2', name: 'إضاءة صناعية', watts: 200, quantity: 20, hours: 10 },
  ],
  'مستوصف': [
    { id: '1', name: 'مكيفات', watts: 1500, quantity: 8, hours: 12 },
    { id: '2', name: 'أجهزة طبية', watts: 800, quantity: 5, hours: 8 },
    { id: '3', name: 'إضاءة', watts: 40, quantity: 30, hours: 14 },
    { id: '4', name: 'ثلاجة أدوية', watts: 300, quantity: 2, hours: 24 },
  ],
  'مستشفي': [
    { id: '1', name: 'مكيفات مركزية', watts: 5000, quantity: 10, hours: 24 },
    { id: '2', name: 'أجهزة طبية ثقيلة', watts: 2000, quantity: 10, hours: 12 },
    { id: '3', name: 'إضاءة', watts: 40, quantity: 100, hours: 24 },
    { id: '4', name: 'ثلاجات بنك الدم', watts: 500, quantity: 4, hours: 24 },
  ],
  'مخبز': [
    { id: '1', name: 'فرن كهربائي', watts: 8000, quantity: 2, hours: 10 },
    { id: '2', name: 'عجانة', watts: 2000, quantity: 2, hours: 6 },
    { id: '3', name: 'إضاءة', watts: 50, quantity: 10, hours: 12 },
  ],
  'دكان': [
    { id: '1', name: 'ثلاجة عرض', watts: 800, quantity: 2, hours: 24 },
    { id: '2', name: 'إضاءة', watts: 30, quantity: 5, hours: 14 },
    { id: '3', name: 'مروحة', watts: 70, quantity: 2, hours: 14 },
  ],
  'ورشة': [
    { id: '1', name: 'معدات لحام', watts: 3000, quantity: 1, hours: 4 },
    { id: '2', name: 'ماكينات قطع', watts: 2000, quantity: 2, hours: 6 },
    { id: '3', name: 'إضاءة', watts: 100, quantity: 8, hours: 10 },
  ],
  'مضخة موية': [
    { id: '1', name: 'مضخة غاطسة', watts: 4000, quantity: 1, hours: 8 },
  ],
  'دونكي': [
    { id: '1', name: 'مضخة مياه', watts: 2200, quantity: 1, hours: 10 },
  ],
  'مسجد': [
    { id: '1', name: 'مكيفات', watts: 1500, quantity: 4, hours: 6 },
    { id: '2', name: 'مراوح', watts: 70, quantity: 10, hours: 6 },
    { id: '3', name: 'إضاءة', watts: 40, quantity: 20, hours: 6 },
    { id: '4', name: 'مكبرات صوت', watts: 200, quantity: 1, hours: 4 },
  ],
  'مطبعة': [
    { id: '1', name: 'ماكينات طباعة', watts: 3000, quantity: 3, hours: 8 },
    { id: '2', name: 'كمبيوترات', watts: 300, quantity: 5, hours: 8 },
    { id: '3', name: 'إضاءة', watts: 50, quantity: 15, hours: 10 },
  ],
  'كوفي شوب': [
    { id: '1', name: 'ماكينة قهوة', watts: 2500, quantity: 2, hours: 12 },
    { id: '2', name: 'ثلاجة عرض', watts: 600, quantity: 2, hours: 24 },
    { id: '3', name: 'مكيف', watts: 1500, quantity: 2, hours: 12 },
    { id: '4', name: 'إضاءة ديكور', watts: 30, quantity: 20, hours: 12 },
  ],
  'مطعم': [
    { id: '1', name: 'ثلاجات كبيرة', watts: 1200, quantity: 4, hours: 24 },
    { id: '2', name: 'مكيفات', watts: 2000, quantity: 4, hours: 14 },
    { id: '3', name: 'معدات مطبخ', watts: 3000, quantity: 2, hours: 10 },
    { id: '4', name: 'إضاءة', watts: 50, quantity: 30, hours: 14 },
  ],
  'فندق': [
    { id: '1', name: 'مكيفات غرف', watts: 1200, quantity: 30, hours: 12 },
    { id: '2', name: 'إضاءة', watts: 40, quantity: 150, hours: 14 },
    { id: '3', name: 'ثلاجات صغيرة', watts: 100, quantity: 30, hours: 24 },
    { id: '4', name: 'مصعد', watts: 5000, quantity: 1, hours: 10 },
  ],
  'بنك': [
    { id: '1', name: 'مكيفات مركزية', watts: 4000, quantity: 3, hours: 10 },
    { id: '2', name: 'أجهزة كمبيوتر', watts: 250, quantity: 20, hours: 10 },
    { id: '3', name: 'إضاءة', watts: 40, quantity: 50, hours: 12 },
    { id: '4', name: 'صراف آلي', watts: 500, quantity: 3, hours: 24 },
  ],
  'سوبر ماركت': [
    { id: '1', name: 'ثلاجات عرض منتجات', watts: 1500, quantity: 6, hours: 24 },
    { id: '2', name: 'فريزرات', watts: 2000, quantity: 4, hours: 24 },
    { id: '3', name: 'مكيفات', watts: 2500, quantity: 3, hours: 14 },
    { id: '4', name: 'إضاءة قوية', watts: 60, quantity: 40, hours: 14 },
  ],
  'طرمبة وقود': [
    { id: '1', name: 'مضخات وقود', watts: 1000, quantity: 4, hours: 16 },
    { id: '2', name: 'إضاءة خارجية', watts: 200, quantity: 10, hours: 12 },
    { id: '3', name: 'مكيفات إدارة', watts: 1500, quantity: 2, hours: 10 },
  ],
  'شركة تعدين': [
    { id: '1', name: 'معدات ثقيلة (كهربائية)', watts: 15000, quantity: 2, hours: 12 },
    { id: '2', name: 'مضخات مياه', watts: 5000, quantity: 3, hours: 12 },
    { id: '3', name: 'إضاءة مواقع', watts: 500, quantity: 20, hours: 12 },
    { id: '4', name: 'سكن عمال (مكيفات+إضاءة)', watts: 1000, quantity: 10, hours: 10 },
  ],
};

// 2. Business Logic / Formulas
export const calculateSystemRequirements = (appliances) => {
  if (!appliances || appliances.length === 0) {
    return {
      totalWatts: 0,
      dailyEnergyWh: 0,
      recommendedPanels: 0,
      recommendedInverterKw: 0,
      recommendedBatteriesAh: 0,
    };
  }

  // Calculate total connected load (Watts)
  const totalWatts = appliances.reduce((sum, item) => sum + (item.watts * item.quantity), 0);

  // Calculate daily energy consumption (Watt-hours)
  const dailyEnergyWh = appliances.reduce((sum, item) => sum + (item.watts * item.quantity * item.hours), 0);

  // System Losses & Safety Margins
  const INVERTER_EFFICIENCY = 0.85; // 85% efficiency
  const BATTERY_DOD = 0.50;         // Depth of Discharge 50% for typical Lead-Acid / Gel
  const SYSTEM_LOSSES = 1.3;        // 30% overall system losses for panel sizing
  const PEAK_SUN_HOURS = 5;         // Average peak sun hours

  // Recommended Inverter (kW) - adding 25% safety margin
  let recommendedInverterKw = (totalWatts * 1.25) / 1000;
  // Round to nearest logical size (e.g., 1, 3, 5, 8, 10...)
  if (recommendedInverterKw < 1) recommendedInverterKw = 1;
  else if (recommendedInverterKw <= 3) recommendedInverterKw = 3;
  else if (recommendedInverterKw <= 5) recommendedInverterKw = 5;
  else recommendedInverterKw = Math.ceil(recommendedInverterKw);

  // Recommended Panels (Assuming 500W panels)
  const requiredSolarArrayW = (dailyEnergyWh * SYSTEM_LOSSES) / PEAK_SUN_HOURS;
  const recommendedPanels = Math.ceil(requiredSolarArrayW / 500);

  // Recommended Batteries (Assuming 12V system, calculating total Ah required for 1 day autonomy)
  // Total Energy / Inverter Efficiency = Energy needed from batteries
  // Energy from batteries / Battery Voltage (let's use standard 48V system for scaling) = Ah
  // Ah / DOD = Total Ah capacity needed
  const SYSTEM_VOLTAGE = 48;
  const energyNeededFromBatteries = dailyEnergyWh / INVERTER_EFFICIENCY;
  const ahRequired = energyNeededFromBatteries / SYSTEM_VOLTAGE;
  const recommendedBatteriesAh = Math.ceil(ahRequired / BATTERY_DOD);

  return {
    totalWatts,
    dailyEnergyWh,
    recommendedPanels,
    recommendedInverterKw,
    recommendedBatteriesAh,
  };
};
