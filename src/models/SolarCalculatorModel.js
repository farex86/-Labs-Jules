// src/models/SolarCalculatorModel.js

/**
 * Array of facility types in Arabic with default appliances.
 */
export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج',
    defaultAppliances: [
      { id: 'ice_maker', name: 'ماكينة ثلج', power: 5000, quantity: 2, hours: 24 },
      { id: 'freezer', name: 'فريزر', power: 1500, quantity: 4, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    defaultAppliances: [
      { id: 'computer', name: 'كمبيوتر', power: 250, quantity: 10, hours: 10 },
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 4, hours: 10 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 20, hours: 10 },
      { id: 'printer', name: 'طابعة', power: 500, quantity: 2, hours: 2 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultAppliances: [
      { id: 'water_pump', name: 'مضخة مياه (صغيرة)', power: 2000, quantity: 1, hours: 8 },
      { id: 'lighting', name: 'إضاءة محيطية', power: 100, quantity: 10, hours: 12 },
      { id: 'house_appliances', name: 'أجهزة استراحة', power: 1000, quantity: 1, hours: 10 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultAppliances: [
      { id: 'ventilation', name: 'مراوح تهوية', power: 750, quantity: 6, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 20, hours: 24 },
      { id: 'feeder', name: 'معالف آلية', power: 1000, quantity: 2, hours: 6 },
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    defaultAppliances: [
      { id: 'cooling_pad', name: 'نظام تبريد', power: 1500, quantity: 2, hours: 12 },
      { id: 'water_pump', name: 'مضخة ري', power: 1000, quantity: 1, hours: 4 },
      { id: 'lighting', name: 'إضاءة نمو', power: 200, quantity: 10, hours: 8 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultAppliances: [
      { id: 'machinery', name: 'آلات إنتاج', power: 10000, quantity: 2, hours: 12 },
      { id: 'lighting', name: 'إضاءة صناعية', power: 150, quantity: 30, hours: 12 },
      { id: 'ventilation', name: 'نظام تهوية', power: 2000, quantity: 4, hours: 12 },
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultAppliances: [
      { id: 'medical_equipment', name: 'أجهزة طبية', power: 2000, quantity: 2, hours: 8 },
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 6, hours: 12 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 30, hours: 12 },
      { id: 'fridge', name: 'ثلاجة أدوية', power: 300, quantity: 2, hours: 24 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    defaultAppliances: [
      { id: 'icu_equipment', name: 'أجهزة عناية مركزة', power: 5000, quantity: 5, hours: 24 },
      { id: 'ac_central', name: 'تكييف مركزي', power: 20000, quantity: 2, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 100, hours: 24 },
      { id: 'medical_imaging', name: 'أجهزة أشعة', power: 10000, quantity: 1, hours: 8 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultAppliances: [
      { id: 'mixer', name: 'عجانة', power: 3000, quantity: 2, hours: 8 },
      { id: 'oven', name: 'فرن كهربائي', power: 5000, quantity: 2, hours: 10 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultAppliances: [
      { id: 'fridge', name: 'ثلاجة عرض', power: 400, quantity: 2, hours: 24 },
      { id: 'freezer', name: 'فريزر', power: 500, quantity: 1, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 4, hours: 12 },
      { id: 'fan', name: 'مروحة', power: 75, quantity: 2, hours: 12 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultAppliances: [
      { id: 'welding', name: 'ماكينة لحام', power: 4000, quantity: 1, hours: 4 },
      { id: 'compressor', name: 'كمبروسر هواء', power: 2000, quantity: 1, hours: 6 },
      { id: 'grinder', name: 'صاروخ / دريل', power: 800, quantity: 3, hours: 4 },
      { id: 'lighting', name: 'إضاءة', power: 100, quantity: 6, hours: 8 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    defaultAppliances: [
      { id: 'pump_motor', name: 'موتور مضخة', power: 5500, quantity: 1, hours: 10 },
      { id: 'controller', name: 'لوحة تحكم', power: 100, quantity: 1, hours: 10 },
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي',
    defaultAppliances: [
      { id: 'water_pump', name: 'مضخة غاطسة', power: 3000, quantity: 1, hours: 8 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 2, hours: 4 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultAppliances: [
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 6, hours: 6 },
      { id: 'fans', name: 'مراوح', power: 75, quantity: 10, hours: 6 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 20, hours: 6 },
      { id: 'sound_system', name: 'مكبر صوت', power: 200, quantity: 1, hours: 4 },
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultAppliances: [
      { id: 'printer_large', name: 'ماكينة طباعة كبيرة', power: 4000, quantity: 2, hours: 10 },
      { id: 'cutter', name: 'مقص ورق كهربائي', power: 1500, quantity: 1, hours: 6 },
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 3, hours: 10 },
      { id: 'lighting', name: 'إضاءة', power: 100, quantity: 10, hours: 10 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultAppliances: [
      { id: 'espresso_machine', name: 'ماكينة اسبريسو', power: 3500, quantity: 1, hours: 12 },
      { id: 'grinder', name: 'طاحونة قهوة', power: 500, quantity: 2, hours: 6 },
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 2, hours: 12 },
      { id: 'fridge', name: 'ثلاجة عرض', power: 400, quantity: 1, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 15, hours: 12 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultAppliances: [
      { id: 'fridge', name: 'ثلاجة', power: 500, quantity: 3, hours: 24 },
      { id: 'freezer', name: 'فريزر', power: 600, quantity: 2, hours: 24 },
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 4, hours: 14 },
      { id: 'fryer_oven', name: 'قلاية / فرن كهربائي', power: 3000, quantity: 2, hours: 8 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 20, hours: 14 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultAppliances: [
      { id: 'ac', name: 'مكيفات غرف', power: 1200, quantity: 20, hours: 12 },
      { id: 'fridge_mini', name: 'ثلاجة صغيرة', power: 100, quantity: 20, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 100, hours: 12 },
      { id: 'elevator', name: 'مصعد', power: 5000, quantity: 1, hours: 4 },
      { id: 'water_heater', name: 'سخان مياه', power: 1500, quantity: 5, hours: 6 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultAppliances: [
      { id: 'computer', name: 'كمبيوتر', power: 250, quantity: 15, hours: 10 },
      { id: 'ac_central', name: 'تكييف مركزي', power: 10000, quantity: 1, hours: 10 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 40, hours: 10 },
      { id: 'atm', name: 'صراف آلي', power: 300, quantity: 2, hours: 24 },
      { id: 'server', name: 'سيرفر', power: 1000, quantity: 1, hours: 24 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultAppliances: [
      { id: 'fridge_display', name: 'ثلاجة عرض', power: 800, quantity: 5, hours: 24 },
      { id: 'freezer_display', name: 'فريزر عرض', power: 1000, quantity: 3, hours: 24 },
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 4, hours: 16 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 30, hours: 16 },
      { id: 'pos', name: 'كاشير', power: 150, quantity: 3, hours: 16 },
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultAppliances: [
      { id: 'fuel_pump', name: 'مضخة وقود', power: 1500, quantity: 4, hours: 8 },
      { id: 'lighting_canopy', name: 'إضاءة المظلة', power: 150, quantity: 10, hours: 12 },
      { id: 'office_ac', name: 'مكيف المكتب', power: 1500, quantity: 1, hours: 24 },
      { id: 'office_pc', name: 'كمبيوتر', power: 250, quantity: 2, hours: 24 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultAppliances: [
      { id: 'heavy_machinery', name: 'آلات ثقيلة', power: 20000, quantity: 2, hours: 10 },
      { id: 'water_pump', name: 'مضخة مياه كبيرة', power: 5000, quantity: 2, hours: 12 },
      { id: 'lighting_flood', name: 'كشافات إضاءة', power: 400, quantity: 20, hours: 12 },
      { id: 'camp_ac', name: 'مكيفات سكن', power: 1500, quantity: 10, hours: 10 },
    ]
  },
];

/**
 * Calculates the recommended solar system size based on the provided appliances.
 * @param {Array} appliances - Array of appliance objects { power, quantity, hours }
 * @returns {Object} Calculated system specifications
 */
export const calculateSolarSystem = (appliances) => {
  let totalPowerW = 0; // Total Wattage (for inverter sizing)
  let totalEnergyWh = 0; // Total Watt-hours per day

  appliances.forEach(app => {
    const power = parseFloat(app.power) || 0;
    const quantity = parseInt(app.quantity) || 0;
    const hours = parseFloat(app.hours) || 0;

    const itemPower = power * quantity;
    totalPowerW += itemPower;
    totalEnergyWh += itemPower * hours;
  });

  // Business logic for system sizing
  const safetyFactor = 1.25; // 25% safety margin for inverter
  const systemVoltage = totalPowerW > 5000 ? 48 : (totalPowerW > 2000 ? 24 : 12);
  const batteryDepthOfDischarge = 0.5; // 50% DoD for standard lead-acid/gel batteries
  const peakSunHours = 5.5; // Average peak sun hours
  const systemEfficiency = 0.8; // Panel + controller losses (80% efficiency)

  // Inverter Size (Watts)
  const inverterSizeW = Math.ceil(totalPowerW * safetyFactor);

  // Total Solar Panel Capacity (Watts)
  // Required Daily Energy / (Peak Sun Hours * System Efficiency)
  const totalSolarCapacityW = Math.ceil(totalEnergyWh / (peakSunHours * systemEfficiency));

  // Battery Bank Capacity (Ampere-hours)
  // Total Energy / (System Voltage * Depth of Discharge)
  const batteryCapacityAh = Math.ceil(totalEnergyWh / (systemVoltage * batteryDepthOfDischarge));

  return {
    totalPowerW,
    totalEnergyWh,
    inverterSizeW,
    inverterSizeKVA: (inverterSizeW / 800).toFixed(1), // Assuming 0.8 Power Factor
    totalSolarCapacityW,
    totalSolarCapacityKW: (totalSolarCapacityW / 1000).toFixed(1),
    batteryCapacityAh,
    systemVoltage,
  };
};
