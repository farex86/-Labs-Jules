// Constant definitions for solar calculation formulas
export const SYSTEM_LOSS_FACTOR = 1.3; // 30% system losses
export const PEAK_SUN_HOURS = 5; // Average peak sun hours in the region
export const BATTERY_EFFICIENCY = 0.85; // Battery efficiency factor
export const DEPTH_OF_DISCHARGE = 0.5; // Depth of discharge for Lead Acid/Gel, adjust for Lithium if needed
export const SYSTEM_VOLTAGE = 48; // Default system voltage for larger systems

// Device catalog to allow custom additions
export const DEVICE_CATALOG = [
  { id: 'light', name: 'لمبة (إضاءة)', defaultPower: 15, defaultHours: 8 },
  { id: 'ac', name: 'مكيف هواء', defaultPower: 1500, defaultHours: 6 },
  { id: 'fridge', name: 'ثلاجة', defaultPower: 200, defaultHours: 24 },
  { id: 'freezer', name: 'فريزر', defaultPower: 300, defaultHours: 24 },
  { id: 'tv', name: 'تلفزيون', defaultPower: 100, defaultHours: 5 },
  { id: 'fan', name: 'مروحة', defaultPower: 60, defaultHours: 8 },
  { id: 'pc', name: 'كمبيوتر', defaultPower: 150, defaultHours: 6 },
  { id: 'printer', name: 'طابعة', defaultPower: 30, defaultHours: 2 },
  { id: 'water_pump_small', name: 'مضخة مياه صغيرة', defaultPower: 750, defaultHours: 2 },
  { id: 'coffee_machine', name: 'ماكينة قهوة', defaultPower: 1000, defaultHours: 3 },
  { id: 'oven', name: 'فرن كهربائي', defaultPower: 2000, defaultHours: 2 },
  { id: 'mixer', name: 'عجانة/خلاط', defaultPower: 800, defaultHours: 2 },
  { id: 'ice_maker', name: 'صانعة ثلج', defaultPower: 500, defaultHours: 24 },
  { id: 'medical_eq', name: 'أجهزة طبية', defaultPower: 500, defaultHours: 12 },
  { id: 'mining_eq', name: 'أجهزة تعدين', defaultPower: 3000, defaultHours: 24 },
  { id: 'gas_pump', name: 'مضخة وقود', defaultPower: 1500, defaultHours: 12 },
  { id: 'pos', name: 'نقاط بيع (POS)', defaultPower: 20, defaultHours: 16 },
  { id: 'heater', name: 'سخان مياه', defaultPower: 1500, defaultHours: 2 },
];

export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    defaultDevices: [
      { ...DEVICE_CATALOG.find(d => d.id === 'ice_maker'), quantity: 5 },
      { ...DEVICE_CATALOG.find(d => d.id === 'freezer'), quantity: 2 },
      { ...DEVICE_CATALOG.find(d => d.id === 'light'), quantity: 10 }
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    defaultDevices: [
      { ...DEVICE_CATALOG.find(d => d.id === 'pc'), quantity: 10 },
      { ...DEVICE_CATALOG.find(d => d.id === 'printer'), quantity: 2 },
      { ...DEVICE_CATALOG.find(d => d.id === 'ac'), quantity: 4 },
      { ...DEVICE_CATALOG.find(d => d.id === 'light'), quantity: 20 },
      { ...DEVICE_CATALOG.find(d => d.id === 'fridge'), quantity: 1 }
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultDevices: [
      { ...DEVICE_CATALOG.find(d => d.id === 'water_pump_small'), quantity: 2 },
      { ...DEVICE_CATALOG.find(d => d.id === 'light'), quantity: 5 },
      { ...DEVICE_CATALOG.find(d => d.id === 'fridge'), quantity: 1 }
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultDevices: [
      { ...DEVICE_CATALOG.find(d => d.id === 'fan'), quantity: 10, defaultHours: 24 },
      { ...DEVICE_CATALOG.find(d => d.id === 'light'), quantity: 20, defaultHours: 12 },
      { ...DEVICE_CATALOG.find(d => d.id === 'water_pump_small'), quantity: 1 },
      { ...DEVICE_CATALOG.find(d => d.id === 'heater'), quantity: 5 }
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    defaultDevices: [
      { ...DEVICE_CATALOG.find(d => d.id === 'fan'), quantity: 5, defaultHours: 24 },
      { ...DEVICE_CATALOG.find(d => d.id === 'water_pump_small'), quantity: 2 }
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultDevices: [
      { id: 'heavy_machinery', name: 'آلات تصنيع', defaultPower: 5000, defaultHours: 10, quantity: 3 },
      { ...DEVICE_CATALOG.find(d => d.id === 'light'), quantity: 30 },
      { ...DEVICE_CATALOG.find(d => d.id === 'ac'), quantity: 5 }
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultDevices: [
      { ...DEVICE_CATALOG.find(d => d.id === 'medical_eq'), quantity: 3 },
      { ...DEVICE_CATALOG.find(d => d.id === 'fridge'), quantity: 2 }, // Vaccine fridges
      { ...DEVICE_CATALOG.find(d => d.id === 'light'), quantity: 15 },
      { ...DEVICE_CATALOG.find(d => d.id === 'ac'), quantity: 4 }
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    defaultDevices: [
      { ...DEVICE_CATALOG.find(d => d.id === 'medical_eq'), quantity: 20 },
      { ...DEVICE_CATALOG.find(d => d.id === 'fridge'), quantity: 10 },
      { ...DEVICE_CATALOG.find(d => d.id === 'light'), quantity: 100 },
      { ...DEVICE_CATALOG.find(d => d.id === 'ac'), quantity: 30 },
      { id: 'elevator', name: 'مصعد', defaultPower: 8000, defaultHours: 4, quantity: 2 }
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultDevices: [
      { ...DEVICE_CATALOG.find(d => d.id === 'oven'), quantity: 3, defaultHours: 10 },
      { ...DEVICE_CATALOG.find(d => d.id === 'mixer'), quantity: 2, defaultHours: 6 },
      { ...DEVICE_CATALOG.find(d => d.id === 'fridge'), quantity: 2 },
      { ...DEVICE_CATALOG.find(d => d.id === 'light'), quantity: 10 }
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultDevices: [
      { ...DEVICE_CATALOG.find(d => d.id === 'fridge'), quantity: 2 },
      { ...DEVICE_CATALOG.find(d => d.id === 'light'), quantity: 4 },
      { ...DEVICE_CATALOG.find(d => d.id === 'fan'), quantity: 1 }
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultDevices: [
      { id: 'welding_machine', name: 'ماكينة لحام', defaultPower: 3000, defaultHours: 4, quantity: 1 },
      { id: 'air_compressor', name: 'كمبروسر هواء', defaultPower: 2000, defaultHours: 3, quantity: 1 },
      { ...DEVICE_CATALOG.find(d => d.id === 'light'), quantity: 5 }
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة مياه',
    defaultDevices: [
      { ...DEVICE_CATALOG.find(d => d.id === 'water_pump_small'), quantity: 1, defaultHours: 6 }
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي',
    defaultDevices: [
      { id: 'well_pump', name: 'مضخة بئر غاطسة', defaultPower: 2000, defaultHours: 8, quantity: 1 }
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultDevices: [
      { ...DEVICE_CATALOG.find(d => d.id === 'ac'), quantity: 6, defaultHours: 4 },
      { ...DEVICE_CATALOG.find(d => d.id === 'light'), quantity: 20, defaultHours: 4 },
      { id: 'sound_system', name: 'نظام صوت', defaultPower: 200, defaultHours: 4, quantity: 1 }
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultDevices: [
      { id: 'printing_machine', name: 'آلة طباعة', defaultPower: 4000, defaultHours: 8, quantity: 2 },
      { ...DEVICE_CATALOG.find(d => d.id === 'pc'), quantity: 3 },
      { ...DEVICE_CATALOG.find(d => d.id === 'ac'), quantity: 2 },
      { ...DEVICE_CATALOG.find(d => d.id === 'light'), quantity: 10 }
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultDevices: [
      { ...DEVICE_CATALOG.find(d => d.id === 'coffee_machine'), quantity: 2, defaultHours: 10 },
      { ...DEVICE_CATALOG.find(d => d.id === 'fridge'), quantity: 2 },
      { ...DEVICE_CATALOG.find(d => d.id === 'ac'), quantity: 2 },
      { ...DEVICE_CATALOG.find(d => d.id === 'light'), quantity: 15 },
      { ...DEVICE_CATALOG.find(d => d.id === 'pos'), quantity: 1 }
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultDevices: [
      { ...DEVICE_CATALOG.find(d => d.id === 'fridge'), quantity: 4 },
      { ...DEVICE_CATALOG.find(d => d.id === 'freezer'), quantity: 2 },
      { ...DEVICE_CATALOG.find(d => d.id === 'ac'), quantity: 4 },
      { ...DEVICE_CATALOG.find(d => d.id === 'light'), quantity: 20 },
      { id: 'exhaust_fan', name: 'شفاط هواء', defaultPower: 500, defaultHours: 12, quantity: 2 }
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultDevices: [
      { ...DEVICE_CATALOG.find(d => d.id === 'ac'), quantity: 20 },
      { ...DEVICE_CATALOG.find(d => d.id === 'light'), quantity: 60 },
      { ...DEVICE_CATALOG.find(d => d.id === 'fridge'), quantity: 5 },
      { id: 'elevator', name: 'مصعد', defaultPower: 8000, defaultHours: 4, quantity: 1 }
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultDevices: [
      { ...DEVICE_CATALOG.find(d => d.id === 'pc'), quantity: 15 },
      { ...DEVICE_CATALOG.find(d => d.id === 'ac'), quantity: 6 },
      { ...DEVICE_CATALOG.find(d => d.id === 'light'), quantity: 30 },
      { id: 'atm', name: 'صراف آلي (ATM)', defaultPower: 300, defaultHours: 24, quantity: 2 }
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultDevices: [
      { ...DEVICE_CATALOG.find(d => d.id === 'fridge'), quantity: 10 }, // Display fridges
      { ...DEVICE_CATALOG.find(d => d.id === 'freezer'), quantity: 5 },
      { ...DEVICE_CATALOG.find(d => d.id === 'ac'), quantity: 5 },
      { ...DEVICE_CATALOG.find(d => d.id === 'light'), quantity: 40 },
      { ...DEVICE_CATALOG.find(d => d.id === 'pos'), quantity: 3 }
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultDevices: [
      { ...DEVICE_CATALOG.find(d => d.id === 'gas_pump'), quantity: 4 },
      { ...DEVICE_CATALOG.find(d => d.id === 'light'), quantity: 20, defaultHours: 12 }, // Outdoor canopy lights
      { ...DEVICE_CATALOG.find(d => d.id === 'fridge'), quantity: 2 } // Minimart
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultDevices: [
      { ...DEVICE_CATALOG.find(d => d.id === 'mining_eq'), quantity: 10 },
      { ...DEVICE_CATALOG.find(d => d.id === 'ac'), quantity: 10, defaultHours: 24 } // Heavy cooling
    ]
  }
];

/**
 * Calculates the solar system requirements based on a list of devices.
 *
 * @param {Array} devices - Array of objects containing { name, defaultPower (W), defaultHours, quantity }
 * @returns {Object} Calculated metrics
 */
export const calculateSolarSystem = (devices) => {
  if (!devices || devices.length === 0) {
    return {
      dailyEnergyNeededWh: 0,
      totalPowerW: 0,
      recommendedSolarKw: 0,
      batteryCapacityKwh: 0,
      estimatedPanelsCount: 0, // Assuming 500W panels
      estimatedBatteriesCount: 0 // Assuming 200Ah 12V batteries (2.4kWh)
    };
  }

  // 1. Calculate Total Daily Energy Required (Watt-hours)
  const dailyEnergyNeededWh = devices.reduce((total, device) => {
    return total + (device.defaultPower * device.defaultHours * device.quantity);
  }, 0);

  // 2. Calculate Total Power Peak (Watts) - If everything is on at once
  const totalPowerW = devices.reduce((total, device) => {
    return total + (device.defaultPower * device.quantity);
  }, 0);

  // 3. Calculate Recommended Solar Array Size (kW)
  // (Daily Energy / Peak Sun Hours) * System Loss Factor
  const recommendedSolarKw = ((dailyEnergyNeededWh / PEAK_SUN_HOURS) * SYSTEM_LOSS_FACTOR) / 1000;

  // 4. Calculate Battery Capacity (kWh)
  // (Daily Energy / Battery Efficiency) / Depth of Discharge
  // Note: This covers 1 day of autonomy.
  const batteryCapacityKwh = ((dailyEnergyNeededWh / BATTERY_EFFICIENCY) / DEPTH_OF_DISCHARGE) / 1000;

  // Estimates
  const PANEL_WATTAGE = 500;
  const estimatedPanelsCount = Math.ceil((recommendedSolarKw * 1000) / PANEL_WATTAGE);

  const BATTERY_KWH = 2.4; // 12V 200Ah
  const estimatedBatteriesCount = Math.ceil(batteryCapacityKwh / BATTERY_KWH);

  return {
    dailyEnergyNeededWh: dailyEnergyNeededWh,
    totalPowerW: totalPowerW,
    recommendedSolarKw: Number(recommendedSolarKw.toFixed(2)),
    batteryCapacityKwh: Number(batteryCapacityKwh.toFixed(2)),
    estimatedPanelsCount: estimatedPanelsCount,
    estimatedBatteriesCount: estimatedBatteriesCount
  };
};
