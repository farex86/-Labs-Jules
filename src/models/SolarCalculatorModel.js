// src/models/SolarCalculatorModel.js

// Constants for Arabic Facility Types and their default consumption patterns
export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج',
    appliances: [
      { id: 'compressor', name: 'كمبريسور تبريد', watts: 5000, hours: 24, quantity: 2 },
      { id: 'water_pump', name: 'مضخة مياه', watts: 1500, hours: 12, quantity: 1 },
      { id: 'lighting', name: 'إضاءة', watts: 50, hours: 12, quantity: 10 },
      { id: 'crusher', name: 'كسارة ثلج', watts: 2000, hours: 4, quantity: 1 },
    ],
  },
  {
    id: 'company',
    name: 'شركة',
    appliances: [
      { id: 'ac', name: 'مكيف', watts: 1500, hours: 8, quantity: 4 },
      { id: 'computer', name: 'كمبيوتر', watts: 200, hours: 8, quantity: 10 },
      { id: 'printer', name: 'طابعة', watts: 500, hours: 2, quantity: 2 },
      { id: 'lighting', name: 'إضاءة', watts: 40, hours: 8, quantity: 20 },
      { id: 'server', name: 'سيرفر', watts: 800, hours: 24, quantity: 1 },
    ],
  },
  {
    id: 'farm',
    name: 'مزرعة',
    appliances: [
      { id: 'submersible_pump', name: 'مضخة غاطسة', watts: 3000, hours: 10, quantity: 1 },
      { id: 'lighting', name: 'إضاءة', watts: 40, hours: 12, quantity: 5 },
      { id: 'worker_room_fan', name: 'مروحة غرف العمال', watts: 80, hours: 12, quantity: 2 },
    ],
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    appliances: [
      { id: 'ventilation_fan', name: 'مروحة تهوية', watts: 500, hours: 24, quantity: 6 },
      { id: 'heating', name: 'تدفئة', watts: 2000, hours: 12, quantity: 4 },
      { id: 'lighting', name: 'إضاءة', watts: 40, hours: 18, quantity: 20 },
      { id: 'water_pump', name: 'مضخة مياه', watts: 1000, hours: 6, quantity: 1 },
    ],
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    appliances: [
      { id: 'cooling_pad_pump', name: 'مضخة تبريد', watts: 1500, hours: 12, quantity: 2 },
      { id: 'exhaust_fan', name: 'مروحة شفط', watts: 750, hours: 12, quantity: 4 },
      { id: 'irrigation_pump', name: 'مضخة ري', watts: 2000, hours: 4, quantity: 1 },
    ],
  },
  {
    id: 'factory',
    name: 'مصنع',
    appliances: [
      { id: 'machine_1', name: 'ماكينة إنتاج', watts: 4000, hours: 16, quantity: 2 },
      { id: 'machine_2', name: 'ماكينة تعبئة', watts: 2500, hours: 16, quantity: 1 },
      { id: 'lighting', name: 'إضاءة قوية', watts: 100, hours: 16, quantity: 30 },
      { id: 'ac', name: 'مكيف', watts: 2000, hours: 16, quantity: 3 },
    ],
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    appliances: [
      { id: 'ac', name: 'مكيف', watts: 1500, hours: 12, quantity: 5 },
      { id: 'lighting', name: 'إضاءة', watts: 40, hours: 12, quantity: 30 },
      { id: 'sterilizer', name: 'جهاز تعقيم', watts: 1000, hours: 4, quantity: 2 },
      { id: 'fridge', name: 'ثلاجة أدوية', watts: 300, hours: 24, quantity: 2 },
      { id: 'computer', name: 'كمبيوتر', watts: 200, hours: 12, quantity: 5 },
    ],
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    appliances: [
      { id: 'ac_central', name: 'تكييف مركزي', watts: 10000, hours: 24, quantity: 2 },
      { id: 'medical_eq', name: 'أجهزة طبية', watts: 5000, hours: 12, quantity: 1 },
      { id: 'fridge', name: 'ثلاجة حفظ', watts: 500, hours: 24, quantity: 5 },
      { id: 'lighting', name: 'إضاءة', watts: 40, hours: 24, quantity: 100 },
      { id: 'elevator', name: 'مصعد', watts: 7000, hours: 8, quantity: 2 },
    ],
  },
  {
    id: 'bakery',
    name: 'مخبز',
    appliances: [
      { id: 'mixer', name: 'عجانة', watts: 3000, hours: 8, quantity: 2 },
      { id: 'oven_fan', name: 'مروحة فرن', watts: 1000, hours: 12, quantity: 1 },
      { id: 'lighting', name: 'إضاءة', watts: 40, hours: 14, quantity: 10 },
      { id: 'display_fridge', name: 'ثلاجة عرض', watts: 800, hours: 24, quantity: 1 },
    ],
  },
  {
    id: 'shop',
    name: 'دكان',
    appliances: [
      { id: 'fridge', name: 'ثلاجة', watts: 500, hours: 24, quantity: 2 },
      { id: 'freezer', name: 'ديب فريزر', watts: 600, hours: 24, quantity: 1 },
      { id: 'fan', name: 'مروحة سقف', watts: 80, hours: 12, quantity: 2 },
      { id: 'lighting', name: 'إضاءة', watts: 30, hours: 10, quantity: 4 },
    ],
  },
  {
    id: 'workshop',
    name: 'ورشة',
    appliances: [
      { id: 'welding_machine', name: 'ماكينة لحام', watts: 5000, hours: 4, quantity: 1 },
      { id: 'grinder', name: 'صاروخ جلخ', watts: 1000, hours: 3, quantity: 2 },
      { id: 'drill', name: 'شنيور', watts: 800, hours: 3, quantity: 1 },
      { id: 'compressor', name: 'كمبريسور هواء', watts: 2000, hours: 5, quantity: 1 },
      { id: 'lighting', name: 'إضاءة', watts: 50, hours: 10, quantity: 6 },
    ],
  },
  {
    id: 'water_pump_station',
    name: 'مضخة موية',
    appliances: [
      { id: 'pump_main', name: 'مضخة رئيسية', watts: 4000, hours: 8, quantity: 1 },
      { id: 'pump_sub', name: 'مضخة فرعية', watts: 2000, hours: 4, quantity: 1 },
    ],
  },
  {
    id: 'donkey',
    name: 'دونكي', // Water station/well in some dialects
    appliances: [
      { id: 'submersible_pump', name: 'طلمبة غاطسة', watts: 3000, hours: 10, quantity: 1 },
      { id: 'lighting', name: 'إضاءة', watts: 20, hours: 12, quantity: 2 },
    ],
  },
  {
    id: 'mosque',
    name: 'مسجد',
    appliances: [
      { id: 'ac', name: 'مكيف', watts: 2000, hours: 4, quantity: 6 },
      { id: 'fan', name: 'مروحة سقف', watts: 80, hours: 6, quantity: 15 },
      { id: 'lighting', name: 'إضاءة', watts: 40, hours: 5, quantity: 30 },
      { id: 'sound_system', name: 'نظام صوت', watts: 200, hours: 2, quantity: 1 },
      { id: 'water_cooler', name: 'مبرد مياه', watts: 500, hours: 24, quantity: 2 },
    ],
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    appliances: [
      { id: 'printer_large', name: 'ماكينة طباعة كبيرة', watts: 3000, hours: 8, quantity: 2 },
      { id: 'cutter', name: 'مقص ورق', watts: 1500, hours: 4, quantity: 1 },
      { id: 'computer', name: 'كمبيوتر تصميم', watts: 400, hours: 8, quantity: 3 },
      { id: 'ac', name: 'مكيف', watts: 1500, hours: 8, quantity: 2 },
      { id: 'lighting', name: 'إضاءة', watts: 50, hours: 10, quantity: 15 },
    ],
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    appliances: [
      { id: 'espresso_machine', name: 'ماكينة قهوة', watts: 3500, hours: 12, quantity: 1 },
      { id: 'grinder', name: 'طاحونة قهوة', watts: 500, hours: 4, quantity: 2 },
      { id: 'fridge', name: 'ثلاجة عرض', watts: 600, hours: 24, quantity: 1 },
      { id: 'ice_maker', name: 'صانعة ثلج', watts: 800, hours: 24, quantity: 1 },
      { id: 'ac', name: 'مكيف', watts: 2000, hours: 14, quantity: 2 },
      { id: 'lighting', name: 'إضاءة ديكور', watts: 30, hours: 14, quantity: 20 },
    ],
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    appliances: [
      { id: 'fridge', name: 'ثلاجة كبيرة', watts: 1000, hours: 24, quantity: 2 },
      { id: 'freezer', name: 'فريزر', watts: 800, hours: 24, quantity: 2 },
      { id: 'ac', name: 'مكيف', watts: 2500, hours: 12, quantity: 3 },
      { id: 'exhaust_hood', name: 'شفاط مطبخ', watts: 1500, hours: 10, quantity: 1 },
      { id: 'lighting', name: 'إضاءة', watts: 40, hours: 12, quantity: 25 },
      { id: 'blender', name: 'خلاط', watts: 800, hours: 2, quantity: 2 },
    ],
  },
  {
    id: 'hotel',
    name: 'فندق',
    appliances: [
      { id: 'ac_rooms', name: 'مكيفات غرف', watts: 1500, hours: 12, quantity: 20 },
      { id: 'fridge_rooms', name: 'ثلاجات غرف', watts: 150, hours: 24, quantity: 20 },
      { id: 'lighting', name: 'إضاءة', watts: 30, hours: 12, quantity: 100 },
      { id: 'elevator', name: 'مصعد', watts: 5000, hours: 6, quantity: 1 },
      { id: 'water_heater', name: 'سخان مياه مركزي', watts: 4000, hours: 6, quantity: 1 },
    ],
  },
  {
    id: 'bank',
    name: 'بنك',
    appliances: [
      { id: 'ac', name: 'مكيف', watts: 2000, hours: 10, quantity: 5 },
      { id: 'computer', name: 'كمبيوتر', watts: 200, hours: 10, quantity: 15 },
      { id: 'server', name: 'سيرفر', watts: 1000, hours: 24, quantity: 1 },
      { id: 'atm', name: 'صراف آلي', watts: 500, hours: 24, quantity: 2 },
      { id: 'lighting', name: 'إضاءة', watts: 40, hours: 12, quantity: 40 },
    ],
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    appliances: [
      { id: 'display_fridge', name: 'ثلاجة عرض ألبان', watts: 1500, hours: 24, quantity: 3 },
      { id: 'display_freezer', name: 'ثلاجة عرض مجمدات', watts: 1200, hours: 24, quantity: 2 },
      { id: 'ac', name: 'مكيف', watts: 2500, hours: 14, quantity: 4 },
      { id: 'pos', name: 'جهاز كاشير', watts: 150, hours: 14, quantity: 2 },
      { id: 'lighting', name: 'إضاءة', watts: 40, hours: 14, quantity: 30 },
    ],
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    appliances: [
      { id: 'fuel_pump', name: 'مضخة وقود', watts: 1500, hours: 6, quantity: 4 },
      { id: 'canopy_lighting', name: 'إضاءة المظلة', watts: 100, hours: 12, quantity: 10 },
      { id: 'office_ac', name: 'مكيف الإدارة', watts: 1500, hours: 12, quantity: 1 },
      { id: 'office_computer', name: 'كمبيوتر', watts: 200, hours: 12, quantity: 2 },
    ],
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    appliances: [
      { id: 'heavy_machinery', name: 'معدات ثقيلة', watts: 10000, hours: 12, quantity: 2 },
      { id: 'water_pump', name: 'مضخة مياه كبيرة', watts: 5000, hours: 10, quantity: 1 },
      { id: 'camp_ac', name: 'مكيفات السكن', watts: 1500, hours: 10, quantity: 10 },
      { id: 'lighting', name: 'كشافات إضاءة', watts: 400, hours: 12, quantity: 15 },
    ],
  }
];

/**
 * Calculates the total daily consumption in Watt-hours (Wh) for a list of appliances.
 * @param {Array} appliances - Array of appliance objects { quantity, watts, hours }
 * @returns {number} Total Wh
 */
export const calculateTotalDailyWh = (appliances) => {
  return appliances.reduce((total, appliance) => {
    return total + (appliance.quantity * appliance.watts * appliance.hours);
  }, 0);
};

/**
 * Calculates basic solar system requirements based on daily consumption.
 * @param {number} totalDailyWh - Total daily consumption in Watt-hours
 * @param {number} peakSunHours - Average peak sun hours (default ~5 hours for many sunny regions)
 * @param {number} systemEfficiency - System efficiency factor (default 0.8 for 80%)
 * @returns {Object} System recommendations
 */
export const calculateSystemRequirements = (totalDailyWh, peakSunHours = 5, systemEfficiency = 0.8) => {
  // Total energy needed per day including efficiency losses
  const dailyEnergyRequiredWh = totalDailyWh / systemEfficiency;

  // Total Solar Array Capacity needed in Watts
  const arrayCapacityW = dailyEnergyRequiredWh / peakSunHours;

  // Battery capacity (assuming 1 day of autonomy, 50% Depth of Discharge, 48V system)
  // Wh needed / 48V / 0.5 DoD
  const batteryBankAh = dailyEnergyRequiredWh / 48 / 0.5;

  return {
    totalDailyWh,
    dailyEnergyRequiredWh,
    recommendedArrayCapacitykW: (arrayCapacityW / 1000).toFixed(2),
    recommendedInverterkW: ((totalDailyWh / 24) * 2 / 1000).toFixed(2), // Rough estimate: 2x average hourly load
    estimatedBatteryBankAh_48V: Math.ceil(batteryBankAh)
  };
};
