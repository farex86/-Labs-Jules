// src/models/SolarCalculatorModel.js

export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج',
    defaultAppliances: [
      { name: 'آلة صنع الثلج', quantity: 2, powerW: 5000, hoursPerDay: 24 },
      { name: 'ثلاجة تبريد كبيرة', quantity: 1, powerW: 3000, hoursPerDay: 24 },
      { name: 'إضاءة', quantity: 10, powerW: 50, hoursPerDay: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    defaultAppliances: [
      { name: 'مكيف هواء', quantity: 4, powerW: 1500, hoursPerDay: 8 },
      { name: 'كمبيوتر', quantity: 10, powerW: 200, hoursPerDay: 8 },
      { name: 'إضاءة', quantity: 20, powerW: 30, hoursPerDay: 10 },
      { name: 'طابعة', quantity: 2, powerW: 300, hoursPerDay: 2 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultAppliances: [
      { name: 'مضخة مياه (صغيرة)', quantity: 1, powerW: 2000, hoursPerDay: 6 },
      { name: 'إضاءة محيطة', quantity: 10, powerW: 40, hoursPerDay: 12 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultAppliances: [
      { name: 'مراوح تهوية', quantity: 5, powerW: 500, hoursPerDay: 24 },
      { name: 'نظام تدفئة', quantity: 2, powerW: 2000, hoursPerDay: 12 },
      { name: 'إضاءة', quantity: 20, powerW: 30, hoursPerDay: 18 },
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    defaultAppliances: [
      { name: 'مضخة ري', quantity: 1, powerW: 1500, hoursPerDay: 4 },
      { name: 'مراوح تهوية', quantity: 4, powerW: 400, hoursPerDay: 10 },
      { name: 'إضاءة', quantity: 15, powerW: 40, hoursPerDay: 8 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultAppliances: [
      { name: 'آلات إنتاج', quantity: 3, powerW: 10000, hoursPerDay: 12 },
      { name: 'مكيفات مركزية', quantity: 2, powerW: 5000, hoursPerDay: 12 },
      { name: 'إضاءة صناعية', quantity: 30, powerW: 100, hoursPerDay: 14 },
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultAppliances: [
      { name: 'مكيف هواء', quantity: 5, powerW: 1500, hoursPerDay: 12 },
      { name: 'أجهزة طبية صغيرة', quantity: 10, powerW: 300, hoursPerDay: 6 },
      { name: 'ثلاجة أدوية', quantity: 2, powerW: 300, hoursPerDay: 24 },
      { name: 'إضاءة', quantity: 20, powerW: 30, hoursPerDay: 12 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    defaultAppliances: [
      { name: 'مكيفات مركزية', quantity: 5, powerW: 10000, hoursPerDay: 24 },
      { name: 'أجهزة طبية (أشعة، غسيل)', quantity: 5, powerW: 3000, hoursPerDay: 8 },
      { name: 'ثلاجات بنك الدم/أدوية', quantity: 5, powerW: 500, hoursPerDay: 24 },
      { name: 'إضاءة', quantity: 100, powerW: 30, hoursPerDay: 24 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultAppliances: [
      { name: 'فرن كهربائي', quantity: 2, powerW: 8000, hoursPerDay: 12 },
      { name: 'عجانة', quantity: 2, powerW: 3000, hoursPerDay: 8 },
      { name: 'ثلاجة تبريد', quantity: 1, powerW: 1000, hoursPerDay: 24 },
      { name: 'إضاءة', quantity: 10, powerW: 40, hoursPerDay: 14 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultAppliances: [
      { name: 'ثلاجة عرض', quantity: 2, powerW: 500, hoursPerDay: 24 },
      { name: 'مكيف هواء', quantity: 1, powerW: 1500, hoursPerDay: 12 },
      { name: 'إضاءة', quantity: 5, powerW: 30, hoursPerDay: 12 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultAppliances: [
      { name: 'ماكينة لحام', quantity: 1, powerW: 4000, hoursPerDay: 4 },
      { name: 'منشار كهربائي/معدات', quantity: 3, powerW: 1500, hoursPerDay: 6 },
      { name: 'إضاءة كاشفة', quantity: 5, powerW: 100, hoursPerDay: 8 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    defaultAppliances: [
      { name: 'مضخة غاطسة', quantity: 1, powerW: 5500, hoursPerDay: 8 },
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي', // Water station/well
    defaultAppliances: [
      { name: 'مضخة مياه كبيرة', quantity: 1, powerW: 7500, hoursPerDay: 10 },
      { name: 'إضاءة محيطة', quantity: 2, powerW: 50, hoursPerDay: 12 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultAppliances: [
      { name: 'مكيف هواء', quantity: 6, powerW: 2000, hoursPerDay: 6 },
      { name: 'نظام صوت', quantity: 1, powerW: 500, hoursPerDay: 2 },
      { name: 'مراوح سقف', quantity: 10, powerW: 80, hoursPerDay: 8 },
      { name: 'إضاءة', quantity: 30, powerW: 30, hoursPerDay: 6 },
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultAppliances: [
      { name: 'ماكينة طباعة', quantity: 2, powerW: 5000, hoursPerDay: 10 },
      { name: 'معدات قص وتغليف', quantity: 2, powerW: 2000, hoursPerDay: 8 },
      { name: 'مكيف هواء', quantity: 2, powerW: 2000, hoursPerDay: 10 },
      { name: 'إضاءة', quantity: 15, powerW: 40, hoursPerDay: 12 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultAppliances: [
      { name: 'ماكينة قهوة اسبريسو', quantity: 1, powerW: 3500, hoursPerDay: 16 },
      { name: 'ثلاجة عرض/تبريد', quantity: 2, powerW: 500, hoursPerDay: 24 },
      { name: 'مكيف هواء', quantity: 2, powerW: 2000, hoursPerDay: 16 },
      { name: 'إضاءة ديكور', quantity: 20, powerW: 20, hoursPerDay: 16 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultAppliances: [
      { name: 'ثلاجات وتجميد', quantity: 3, powerW: 800, hoursPerDay: 24 },
      { name: 'أفران/معدات طهي', quantity: 2, powerW: 4000, hoursPerDay: 12 },
      { name: 'مكيف هواء', quantity: 4, powerW: 2000, hoursPerDay: 14 },
      { name: 'إضاءة', quantity: 30, powerW: 30, hoursPerDay: 14 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultAppliances: [
      { name: 'مكيفات غرف', quantity: 20, powerW: 1200, hoursPerDay: 12 },
      { name: 'سخانات مياه', quantity: 10, powerW: 2000, hoursPerDay: 4 },
      { name: 'ثلاجات صغيرة', quantity: 20, powerW: 100, hoursPerDay: 24 },
      { name: 'إضاءة ومرافق', quantity: 50, powerW: 20, hoursPerDay: 24 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultAppliances: [
      { name: 'مكيفات مركزية', quantity: 3, powerW: 5000, hoursPerDay: 10 },
      { name: 'أجهزة صراف آلي (ATM)', quantity: 2, powerW: 500, hoursPerDay: 24 },
      { name: 'كمبيوترات وسيرفرات', quantity: 20, powerW: 250, hoursPerDay: 10 },
      { name: 'إضاءة', quantity: 40, powerW: 30, hoursPerDay: 10 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultAppliances: [
      { name: 'ثلاجات عرض', quantity: 6, powerW: 1000, hoursPerDay: 24 },
      { name: 'مكيف هواء', quantity: 4, powerW: 2000, hoursPerDay: 16 },
      { name: 'أجهزة كاشير', quantity: 3, powerW: 150, hoursPerDay: 16 },
      { name: 'إضاءة', quantity: 50, powerW: 30, hoursPerDay: 16 },
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultAppliances: [
      { name: 'مضخات وقود', quantity: 4, powerW: 1000, hoursPerDay: 24 },
      { name: 'إضاءة كاشفة/مظلة', quantity: 10, powerW: 150, hoursPerDay: 12 },
      { name: 'مكيف هواء (مكتب)', quantity: 1, powerW: 1500, hoursPerDay: 24 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultAppliances: [
      { name: 'معدات حفر وتكسير', quantity: 2, powerW: 15000, hoursPerDay: 10 },
      { name: 'ناقلات ومضخات', quantity: 3, powerW: 5000, hoursPerDay: 12 },
      { name: 'إضاءة صناعية وكشافات', quantity: 20, powerW: 200, hoursPerDay: 12 },
      { name: 'مكيفات مكاتب', quantity: 4, powerW: 1500, hoursPerDay: 10 },
    ]
  }
];

export const calculateSolarRequirements = (appliances) => {
  let totalDailyEnergyWh = 0;
  let peakPowerW = 0;

  appliances.forEach(app => {
    const power = (parseFloat(app.powerW) || 0);
    const qty = (parseInt(app.quantity) || 0);
    const hrs = (parseFloat(app.hoursPerDay) || 0);

    const appPeakPower = power * qty;
    peakPowerW += appPeakPower;
    totalDailyEnergyWh += (appPeakPower * hrs);
  });

  // System Losses and Efficiency Factors
  const SYSTEM_EFFICIENCY = 0.8; // 80%
  const INVERTER_SAFETY_MARGIN = 1.25; // 25% extra capacity
  const PEAK_SUN_HOURS = 5; // Average PSH
  const BATTERY_DEPTH_OF_DISCHARGE = 0.5; // 50% DoD for Lead-Acid, can be adjusted for Lithium (0.8)
  const BATTERY_VOLTAGE = 48; // Standard 48V system

  // Calculate required solar panel capacity (Watts)
  const requiredPanelCapacityW = totalDailyEnergyWh / (PEAK_SUN_HOURS * SYSTEM_EFFICIENCY);

  // Calculate required inverter capacity (Watts or VA)
  const requiredInverterCapacityW = peakPowerW * INVERTER_SAFETY_MARGIN;

  // Calculate battery bank capacity (Ah) for 1 day of autonomy
  const batteryBankCapacityAh = totalDailyEnergyWh / (BATTERY_VOLTAGE * BATTERY_DEPTH_OF_DISCHARGE * SYSTEM_EFFICIENCY);

  return {
    totalDailyEnergyWh,
    peakPowerW,
    requiredPanelCapacityW,
    requiredInverterCapacityW,
    batteryBankCapacityAh: batteryBankCapacityAh,
    batteryVoltage: BATTERY_VOLTAGE
  };
};
