// Business logic and constant configuration data for Solar Calculator

export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع ثلج', defaultDevices: ['ice_machine', 'freezer', 'lighting', 'ac'] },
  { id: 'company', name: 'شركة', defaultDevices: ['computer', 'printer', 'lighting', 'ac', 'server'] },
  { id: 'farm', name: 'مزرعة', defaultDevices: ['water_pump', 'lighting'] },
  { id: 'poultry_farm', name: 'مزرعة دواجن', defaultDevices: ['ventilation_fan', 'heater', 'lighting', 'water_pump'] },
  { id: 'greenhouse', name: 'بيوت محمية', defaultDevices: ['water_pump', 'ventilation_fan', 'grow_lights'] },
  { id: 'factory', name: 'مصنع', defaultDevices: ['heavy_machinery', 'lighting', 'ac', 'conveyor'] },
  { id: 'clinic', name: 'مستوصف', defaultDevices: ['medical_equipment', 'lighting', 'ac', 'refrigerator'] },
  { id: 'hospital', name: 'مستشفي', defaultDevices: ['medical_equipment', 'lighting', 'ac', 'refrigerator', 'elevator'] },
  { id: 'bakery', name: 'مخبز', defaultDevices: ['dough_mixer', 'electric_oven', 'lighting', 'exhaust_fan'] },
  { id: 'shop', name: 'دكان', defaultDevices: ['refrigerator', 'lighting', 'fan', 'tv'] },
  { id: 'workshop', name: 'ورشة', defaultDevices: ['welding_machine', 'air_compressor', 'drill', 'lighting'] },
  { id: 'water_pump_station', name: 'مضخة موية', defaultDevices: ['large_water_pump', 'lighting'] },
  { id: 'donkey_pump', name: 'دونكي', defaultDevices: ['submersible_pump'] },
  { id: 'mosque', name: 'مسجد', defaultDevices: ['ac', 'fan', 'lighting', 'sound_system'] },
  { id: 'printing_press', name: 'مطبعة', defaultDevices: ['printing_machine', 'computer', 'lighting', 'ac'] },
  { id: 'coffee_shop', name: 'كوفي شوب', defaultDevices: ['espresso_machine', 'blender', 'refrigerator', 'lighting', 'ac'] },
  { id: 'restaurant', name: 'مطعم', defaultDevices: ['refrigerator', 'freezer', 'electric_oven', 'lighting', 'ac'] },
  { id: 'hotel', name: 'فندق', defaultDevices: ['ac', 'lighting', 'tv', 'refrigerator', 'water_heater', 'elevator'] },
  { id: 'bank', name: 'بنك', defaultDevices: ['computer', 'atm', 'lighting', 'ac', 'server'] },
  { id: 'supermarket', name: 'سوبر ماركت', defaultDevices: ['display_fridge', 'freezer', 'lighting', 'ac', 'cash_register'] },
  { id: 'fuel_station', name: 'طرمبة وقود', defaultDevices: ['fuel_pump', 'lighting', 'refrigerator', 'ac'] },
  { id: 'mining_company', name: 'شركة تعدين', defaultDevices: ['heavy_machinery', 'water_pump', 'lighting', 'generator'] },
];

export const DEVICE_CATALOG = {
  ice_machine: { id: 'ice_machine', name: 'ماكينة ثلج', powerWatts: 5000, defaultHours: 12 },
  freezer: { id: 'freezer', name: 'فريزر', powerWatts: 400, defaultHours: 24 },
  lighting: { id: 'lighting', name: 'إضاءة (لمبة)', powerWatts: 20, defaultHours: 8 },
  ac: { id: 'ac', name: 'مكيف هواء', powerWatts: 1500, defaultHours: 8 },
  computer: { id: 'computer', name: 'جهاز كمبيوتر', powerWatts: 250, defaultHours: 8 },
  printer: { id: 'printer', name: 'طابعة', powerWatts: 500, defaultHours: 2 },
  server: { id: 'server', name: 'سيرفر', powerWatts: 800, defaultHours: 24 },
  water_pump: { id: 'water_pump', name: 'مضخة مياه (1 حصان)', powerWatts: 746, defaultHours: 4 },
  large_water_pump: { id: 'large_water_pump', name: 'مضخة مياه كبيرة (3 حصان)', powerWatts: 2238, defaultHours: 6 },
  submersible_pump: { id: 'submersible_pump', name: 'طلمبة غاطسة', powerWatts: 1500, defaultHours: 6 },
  ventilation_fan: { id: 'ventilation_fan', name: 'مروحة تهوية', powerWatts: 200, defaultHours: 12 },
  heater: { id: 'heater', name: 'دفاية', powerWatts: 2000, defaultHours: 8 },
  grow_lights: { id: 'grow_lights', name: 'إضاءة زراعية', powerWatts: 100, defaultHours: 12 },
  heavy_machinery: { id: 'heavy_machinery', name: 'معدات ثقيلة', powerWatts: 10000, defaultHours: 8 },
  conveyor: { id: 'conveyor', name: 'سير ناقل', powerWatts: 2000, defaultHours: 8 },
  medical_equipment: { id: 'medical_equipment', name: 'معدات طبية', powerWatts: 1000, defaultHours: 8 },
  refrigerator: { id: 'refrigerator', name: 'ثلاجة', powerWatts: 300, defaultHours: 24 },
  elevator: { id: 'elevator', name: 'مصعد', powerWatts: 5000, defaultHours: 4 },
  dough_mixer: { id: 'dough_mixer', name: 'عجانة', powerWatts: 1500, defaultHours: 4 },
  electric_oven: { id: 'electric_oven', name: 'فرن كهربائي', powerWatts: 4000, defaultHours: 6 },
  exhaust_fan: { id: 'exhaust_fan', name: 'مروحة شفط', powerWatts: 150, defaultHours: 10 },
  fan: { id: 'fan', name: 'مروحة سقف', powerWatts: 75, defaultHours: 12 },
  tv: { id: 'tv', name: 'تلفزيون', powerWatts: 100, defaultHours: 8 },
  welding_machine: { id: 'welding_machine', name: 'ماكينة لحام', powerWatts: 3000, defaultHours: 4 },
  air_compressor: { id: 'air_compressor', name: 'كمبروسر هواء', powerWatts: 2000, defaultHours: 4 },
  drill: { id: 'drill', name: 'شنيور/دريل', powerWatts: 800, defaultHours: 2 },
  sound_system: { id: 'sound_system', name: 'مكبر صوت', powerWatts: 200, defaultHours: 2 },
  printing_machine: { id: 'printing_machine', name: 'ماكينة طباعة', powerWatts: 2500, defaultHours: 8 },
  espresso_machine: { id: 'espresso_machine', name: 'ماكينة اسبريسو', powerWatts: 1500, defaultHours: 8 },
  blender: { id: 'blender', name: 'خلاط', powerWatts: 500, defaultHours: 2 },
  water_heater: { id: 'water_heater', name: 'سخان مياه', powerWatts: 1500, defaultHours: 4 },
  atm: { id: 'atm', name: 'صراف آلي', powerWatts: 400, defaultHours: 24 },
  display_fridge: { id: 'display_fridge', name: 'ثلاجة عرض', powerWatts: 800, defaultHours: 24 },
  cash_register: { id: 'cash_register', name: 'كاشير', powerWatts: 50, defaultHours: 16 },
  fuel_pump: { id: 'fuel_pump', name: 'مضخة وقود', powerWatts: 1000, defaultHours: 12 },
  generator: { id: 'generator', name: 'مولد كهربائي (استهلاك مساعد)', powerWatts: 500, defaultHours: 24 },
};

// System calculation constants
const SUNLIGHT_HOURS = 5; // Average daily peak sunlight hours
const SYSTEM_EFFICIENCY = 0.8; // 80% efficiency (losses from inverter, wiring, etc.)
const BATTERY_EFFICIENCY = 0.85; // Lead-acid/Gel typically 85%, Lithium 95%. Using a safe average.
const BATTERY_DEPTH_OF_DISCHARGE = 0.5; // 50% for standard deep cycle batteries
const SYSTEM_VOLTAGE = 48; // Standard voltage for medium/large systems

/**
 * Calculates the solar system requirements based on device consumption.
 * @param {Array} devices - Array of device objects { id, quantity, hours }
 * @returns {Object} - Calculation results
 */
export const calculateSolarSystem = (devices) => {
  if (!devices || devices.length === 0) {
    return {
      totalDailyEnergyWh: 0,
      totalPowerW: 0,
      recommendedSolarCapacityW: 0,
      recommendedBatteryCapacityAh: 0,
      recommendedInverterW: 0,
    };
  }

  let totalDailyEnergyWh = 0;
  let totalPowerW = 0;

  devices.forEach(device => {
    const catalogDevice = DEVICE_CATALOG[device.id];
    if (catalogDevice) {
      const quantity = device.quantity || 1;
      const hours = device.hours || catalogDevice.defaultHours;
      const power = catalogDevice.powerWatts;

      totalPowerW += power * quantity;
      totalDailyEnergyWh += power * quantity * hours;
    }
  });

  // Calculate Required Solar Panel Capacity (W)
  // Formula: (Total Daily Energy / Sunlight Hours) / System Efficiency
  const requiredSolarCapacityW = (totalDailyEnergyWh / SUNLIGHT_HOURS) / SYSTEM_EFFICIENCY;

  // Calculate Required Battery Capacity (Ah) for 1 day of autonomy
  // Formula: (Total Daily Energy / Battery Efficiency / Depth of Discharge) / System Voltage
  const requiredBatteryCapacityAh = (totalDailyEnergyWh / BATTERY_EFFICIENCY / BATTERY_DEPTH_OF_DISCHARGE) / SYSTEM_VOLTAGE;

  // Calculate Recommended Inverter Size (W)
  // Formula: Total Power * 1.25 (25% safety margin for surges)
  const recommendedInverterW = totalPowerW * 1.25;

  return {
    totalDailyEnergyWh: Math.round(totalDailyEnergyWh),
    totalPowerW: Math.round(totalPowerW),
    recommendedSolarCapacityW: Math.round(requiredSolarCapacityW),
    recommendedBatteryCapacityAh: Math.round(requiredBatteryCapacityAh),
    recommendedInverterW: Math.round(recommendedInverterW),
    systemVoltage: SYSTEM_VOLTAGE
  };
};
