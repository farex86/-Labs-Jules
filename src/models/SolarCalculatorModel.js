export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع تلج' },
  { id: 'company', name: 'شركة' },
  { id: 'farm', name: 'مزرعة' },
  { id: 'poultry_farm', name: 'مزرعة دواجن' },
  { id: 'greenhouse', name: 'بيوت محمية' },
  { id: 'factory', name: 'مصنع' },
  { id: 'clinic', name: 'مستوصف' },
  { id: 'hospital', name: 'مستشفي' },
  { id: 'bakery', name: 'مخبز' },
  { id: 'shop', name: 'دكان' },
  { id: 'workshop', name: 'ورشة' },
  { id: 'water_pump', name: 'مضخة موية' },
  { id: 'donkey_pump', name: 'دونكي' },
  { id: 'mosque', name: 'مسجد' },
  { id: 'printing_press', name: 'مطبعة' },
  { id: 'coffee_shop', name: 'كوفي شوب' },
  { id: 'restaurant', name: 'مطعم' },
  { id: 'hotel', name: 'فندق' },
  { id: 'bank', name: 'بنك' },
  { id: 'supermarket', name: 'سوبر ماركت' },
  { id: 'gas_station', name: 'طرمبة وقود' },
  { id: 'mining_company', name: 'شركة تعدين' }
];

export const COMMON_DEVICES = [
  { id: 'light_bulb_led', name: 'لمبة ليد', defaultWatts: 15, defaultQty: 10, defaultHours: 12 },
  { id: 'ceiling_fan', name: 'مروحة سقف', defaultWatts: 80, defaultQty: 4, defaultHours: 12 },
  { id: 'ac_split_1_5', name: 'مكيف اسبليت 1.5 طن', defaultWatts: 1500, defaultQty: 1, defaultHours: 8 },
  { id: 'ac_window', name: 'مكيف شباك', defaultWatts: 1800, defaultQty: 1, defaultHours: 8 },
  { id: 'refrigerator', name: 'ثلاجة', defaultWatts: 200, defaultQty: 1, defaultHours: 24 },
  { id: 'deep_freezer', name: 'ديب فريزر', defaultWatts: 300, defaultQty: 1, defaultHours: 24 },
  { id: 'tv_led', name: 'شاشة تلفزيون', defaultWatts: 100, defaultQty: 1, defaultHours: 8 },
  { id: 'water_pump_1hp', name: 'موتور موية 1 حصان', defaultWatts: 750, defaultQty: 1, defaultHours: 2 },
  { id: 'computer', name: 'كمبيوتر / لابتوب', defaultWatts: 250, defaultQty: 1, defaultHours: 8 },
  { id: 'printer', name: 'طابعة', defaultWatts: 500, defaultQty: 1, defaultHours: 2 },
  { id: 'coffee_machine', name: 'ماكينة قهوة', defaultWatts: 1500, defaultQty: 1, defaultHours: 4 },
  { id: 'industrial_motor', name: 'محرك صناعي (3 حصان)', defaultWatts: 2200, defaultQty: 1, defaultHours: 8 },
];

export const FACILITY_PRESETS = {
  mosque: ['light_bulb_led', 'ceiling_fan', 'ac_split_1_5'],
  shop: ['light_bulb_led', 'ceiling_fan', 'refrigerator'],
  coffee_shop: ['light_bulb_led', 'ceiling_fan', 'coffee_machine', 'refrigerator'],
  restaurant: ['light_bulb_led', 'ceiling_fan', 'refrigerator', 'deep_freezer', 'ac_split_1_5'],
  company: ['light_bulb_led', 'ac_split_1_5', 'computer', 'printer'],
  water_pump: ['water_pump_1hp'],
  farm: ['water_pump_1hp', 'light_bulb_led'],
  poultry_farm: ['light_bulb_led', 'ceiling_fan', 'water_pump_1hp'],
};

// Pure function to calculate requirements
export function calculateSolarSystemRequirements(devicesList) {
  let totalDailyWattHours = 0;
  let maxConcurrentWatts = 0;

  devicesList.forEach(device => {
    const power = (Number(device.watts) || 0) * (Number(device.qty) || 0);
    const dailyEnergy = power * (Number(device.hours) || 0);

    totalDailyWattHours += dailyEnergy;
    maxConcurrentWatts += power;
  });

  // Calculate Inverter Size
  // Add 25% safety margin for inverter to handle surge
  const inverterSizeWatt = Math.ceil(maxConcurrentWatts * 1.25);
  // Convert to kVA (assuming 0.8 power factor)
  const inverterSizeKVA = (inverterSizeWatt / 0.8 / 1000).toFixed(1);

  // Calculate Panels
  // Assume average 5 sun hours per day and 20% system losses
  const dailyEnergyRequiredFromPanels = totalDailyWattHours * 1.2;
  const totalPanelWattageRequired = dailyEnergyRequiredFromPanels / 5;

  // Assume standard 550W panels
  const panelWattage = 550;
  const numberOfPanels = Math.ceil(totalPanelWattageRequired / panelWattage);

  // Calculate Batteries
  // Assume 1 day of autonomy, 50% Depth of Discharge (DoD) for Lead Acid / Gel, or 80% for Lithium
  // We'll calculate based on Lithium (48V, 100Ah = 4800Wh) as it's standard now.
  // DoD 80% means usable energy is 4800 * 0.8 = 3840Wh per battery
  const batteryUsableCapacityWh = 48 * 100 * 0.8;
  const numberOfBatteries = Math.ceil(totalDailyWattHours / batteryUsableCapacityWh);

  return {
    totalDailyWattHours,
    maxConcurrentWatts,
    inverterSizeKVA: Number(inverterSizeKVA),
    numberOfPanels: numberOfPanels > 0 ? numberOfPanels : 0,
    numberOfBatteries: numberOfBatteries > 0 ? numberOfBatteries : 0,
    systemVoltage: maxConcurrentWatts > 3000 ? 48 : 24, // Simple logic for system voltage
  };
}
