export const FACILITY_TYPES = {
  ICE_FACTORY: {
    id: 'ice_factory',
    name: 'مصنع تلج',
    defaultAppliances: [
      { id: 'ice_maker', name: 'ماكينة تصنيع ثلج', power: 5000, quantity: 1, hours: 24 },
      { id: 'freezer_room', name: 'غرفة تجميد', power: 3000, quantity: 1, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 100, quantity: 10, hours: 12 },
    ]
  },
  COMPANY: {
    id: 'company',
    name: 'شركة',
    defaultAppliances: [
      { id: 'ac', name: 'مكيف هواء', power: 1500, quantity: 4, hours: 8 },
      { id: 'computer', name: 'كمبيوتر', power: 250, quantity: 10, hours: 8 },
      { id: 'printer', name: 'طابعة', power: 500, quantity: 1, hours: 2 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 20, hours: 10 },
    ]
  },
  FARM: {
    id: 'farm',
    name: 'مزرعة',
    defaultAppliances: [
      { id: 'water_pump', name: 'مضخة مياه', power: 2200, quantity: 1, hours: 6 },
      { id: 'lighting', name: 'إضاءة خارجية', power: 150, quantity: 5, hours: 12 },
    ]
  },
  POULTRY_FARM: {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultAppliances: [
      { id: 'ventilation', name: 'مراوح تهوية', power: 750, quantity: 4, hours: 24 },
      { id: 'heater', name: 'دفايات', power: 2000, quantity: 2, hours: 12 },
      { id: 'feeder', name: 'نظام تغذية', power: 500, quantity: 1, hours: 4 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 10, hours: 16 },
    ]
  },
  GREENHOUSE: {
    id: 'greenhouse',
    name: 'بيوت محمية',
    defaultAppliances: [
      { id: 'cooling_pad', name: 'نظام تبريد', power: 1000, quantity: 2, hours: 10 },
      { id: 'water_pump', name: 'مضخة ري', power: 1500, quantity: 1, hours: 4 },
    ]
  },
  FACTORY: {
    id: 'factory',
    name: 'مصنع',
    defaultAppliances: [
      { id: 'heavy_machinery', name: 'معدات ثقيلة', power: 10000, quantity: 2, hours: 8 },
      { id: 'lighting', name: 'إضاءة صناعية', power: 200, quantity: 20, hours: 12 },
    ]
  },
  CLINIC: {
    id: 'clinic',
    name: 'مستوصف',
    defaultAppliances: [
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 3, hours: 12 },
      { id: 'medical_eq', name: 'معدات طبية', power: 1000, quantity: 2, hours: 8 },
      { id: 'fridge', name: 'ثلاجة أدوية', power: 300, quantity: 1, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 15, hours: 14 },
    ]
  },
  HOSPITAL: {
    id: 'hospital',
    name: 'مستشفي',
    defaultAppliances: [
      { id: 'central_ac', name: 'تكييف مركزي', power: 15000, quantity: 1, hours: 24 },
      { id: 'medical_scanner', name: 'أجهزة أشعة', power: 5000, quantity: 2, hours: 8 },
      { id: 'icu_eq', name: 'معدات عناية', power: 2000, quantity: 5, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 100, hours: 24 },
    ]
  },
  BAKERY: {
    id: 'bakery',
    name: 'مخبز',
    defaultAppliances: [
      { id: 'mixer', name: 'عجانة', power: 3000, quantity: 2, hours: 6 },
      { id: 'oven', name: 'فرن كهربائي', power: 8000, quantity: 1, hours: 10 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 10, hours: 12 },
    ]
  },
  SHOP: {
    id: 'shop',
    name: 'دكان',
    defaultAppliances: [
      { id: 'fridge', name: 'ثلاجة عرض', power: 500, quantity: 2, hours: 24 },
      { id: 'fan', name: 'مروحة', power: 100, quantity: 2, hours: 12 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 4, hours: 12 },
    ]
  },
  WORKSHOP: {
    id: 'workshop',
    name: 'ورشة',
    defaultAppliances: [
      { id: 'welding', name: 'ماكينة لحام', power: 4000, quantity: 1, hours: 4 },
      { id: 'grinder', name: 'صاروخ / جلخ', power: 1500, quantity: 2, hours: 3 },
      { id: 'compressor', name: 'كمبريسور هواء', power: 2200, quantity: 1, hours: 5 },
      { id: 'lighting', name: 'إضاءة', power: 100, quantity: 5, hours: 10 },
    ]
  },
  WATER_PUMP: {
    id: 'water_pump_station',
    name: 'مضخة موية',
    defaultAppliances: [
      { id: 'main_pump', name: 'مضخة غاطسة', power: 5500, quantity: 1, hours: 8 },
    ]
  },
  DONKEY: {
    // Note: Donkey typically refers to a water drawing system in some regions, but could just be a rural setup.
    id: 'donkey',
    name: 'دونكي',
    defaultAppliances: [
      { id: 'rural_pump', name: 'مضخة دونكي', power: 3000, quantity: 1, hours: 10 },
    ]
  },
  MOSQUE: {
    id: 'mosque',
    name: 'مسجد',
    defaultAppliances: [
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 4, hours: 6 },
      { id: 'sound_sys', name: 'نظام صوت', power: 200, quantity: 1, hours: 5 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 20, hours: 8 },
    ]
  },
  PRESS: {
    id: 'press',
    name: 'مطبعة',
    defaultAppliances: [
      { id: 'printing_press', name: 'آلة طباعة', power: 5000, quantity: 1, hours: 8 },
      { id: 'computer', name: 'كمبيوتر تصميم', power: 400, quantity: 3, hours: 8 },
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 2, hours: 8 },
    ]
  },
  COFFEE_SHOP: {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultAppliances: [
      { id: 'espresso', name: 'ماكينة قهوة', power: 3500, quantity: 1, hours: 12 },
      { id: 'grinder', name: 'طاحونة قهوة', power: 400, quantity: 2, hours: 4 },
      { id: 'fridge', name: 'ثلاجة عرض', power: 600, quantity: 1, hours: 24 },
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 2, hours: 14 },
    ]
  },
  RESTAURANT: {
    id: 'restaurant',
    name: 'مطعم',
    defaultAppliances: [
      { id: 'fridge', name: 'ثلاجات', power: 800, quantity: 3, hours: 24 },
      { id: 'freezer', name: 'فريزر', power: 1000, quantity: 2, hours: 24 },
      { id: 'exhaust', name: 'شفاط هواء', power: 750, quantity: 2, hours: 12 },
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 4, hours: 12 },
    ]
  },
  HOTEL: {
    id: 'hotel',
    name: 'فندق',
    defaultAppliances: [
      { id: 'ac', name: 'مكيفات غرف', power: 1000, quantity: 20, hours: 12 },
      { id: 'elevator', name: 'مصعد', power: 7500, quantity: 1, hours: 5 },
      { id: 'water_heater', name: 'سخان مركزي', power: 4000, quantity: 2, hours: 6 },
      { id: 'lighting', name: 'إضاءة ممرات', power: 50, quantity: 50, hours: 24 },
    ]
  },
  BANK: {
    id: 'bank',
    name: 'بنك',
    defaultAppliances: [
      { id: 'ac', name: 'تكييف مركزي', power: 10000, quantity: 1, hours: 10 },
      { id: 'computer', name: 'كمبيوترات', power: 250, quantity: 15, hours: 10 },
      { id: 'server', name: 'سيرفر', power: 1000, quantity: 1, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 40, hours: 12 },
    ]
  },
  SUPERMARKET: {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultAppliances: [
      { id: 'display_fridge', name: 'ثلاجة عرض', power: 800, quantity: 5, hours: 24 },
      { id: 'freezer', name: 'فريزر', power: 1000, quantity: 3, hours: 24 },
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 4, hours: 16 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 30, hours: 16 },
    ]
  },
  GAS_STATION: {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultAppliances: [
      { id: 'fuel_pump', name: 'مضخة وقود', power: 1000, quantity: 4, hours: 8 },
      { id: 'lighting', name: 'إضاءة خارجية', power: 150, quantity: 10, hours: 12 },
    ]
  },
  MINING_COMPANY: {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultAppliances: [
      { id: 'crusher', name: 'كسارة', power: 15000, quantity: 1, hours: 10 },
      { id: 'mill', name: 'طاحونة', power: 10000, quantity: 2, hours: 10 },
      { id: 'water_pump', name: 'مضخة مياه', power: 4000, quantity: 2, hours: 12 },
    ]
  }
};

/**
 * Calculates the total daily consumption in Watt-hours.
 * @param {Array} appliances - Array of appliance objects { power, quantity, hours }
 * @returns {number} Total daily consumption in Wh
 */
export const calculateTotalDailyWh = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (Number(app.power) * Number(app.quantity) * Number(app.hours));
  }, 0);
};

/**
 * Calculates the recommended solar system size and components.
 * @param {number} dailyWh - Total daily Watt-hours
 * @returns {Object} Recommended system specifications
 */
export const calculateSolarSystemSize = (dailyWh) => {
  // Peak sun hours (average for sunny regions like MENA)
  const PEAK_SUN_HOURS = 5.5;
  // System losses (inefficiency in panels, inverter, wiring, dust, heat) - approx 25% loss
  const SYSTEM_EFFICIENCY = 0.75;
  // Inverter efficiency
  const INVERTER_EFFICIENCY = 0.95;
  // Battery Depth of Discharge (DoD) - assuming Lithium at 80% or Gel at 50%
  // We'll use 80% for modern systems, and 1 day of autonomy
  const BATTERY_DOD = 0.8;
  const BATTERY_VOLTAGE = 48; // Standard 48V system

  // Required Daily Generation including losses
  const requiredDailyGenerationWh = dailyWh / SYSTEM_EFFICIENCY;

  // Total Solar Panel Capacity required in Watts (W)
  const solarPanelCapacityW = requiredDailyGenerationWh / PEAK_SUN_HOURS;

  // Convert to Kilowatts (kW)
  const systemSizeKw = solarPanelCapacityW / 1000;

  // Inverter Size: Should be able to handle peak load.
  // We estimate peak load as roughly equal to solar capacity for basic estimation,
  // plus 20% margin. In real life, it depends on concurrent appliance usage.
  const inverterSizeKw = systemSizeKw * 1.2;

  // Battery Capacity Required (Amp-hours, Ah)
  // To cover 1 full day of consumption with DoD limit
  const batteryCapacityWh = dailyWh / BATTERY_DOD;
  const batteryCapacityAh = batteryCapacityWh / BATTERY_VOLTAGE;

  // Number of 550W panels (Standard large panel size)
  const PANEL_WATTAGE = 550;
  const numberOfPanels = Math.ceil(solarPanelCapacityW / PANEL_WATTAGE);

  return {
    dailyConsumptionKwh: (dailyWh / 1000).toFixed(2),
    systemSizeKw: systemSizeKw.toFixed(2),
    inverterSizeKw: inverterSizeKw.toFixed(2),
    batteryCapacityAh: Math.ceil(batteryCapacityAh),
    numberOfPanels: numberOfPanels,
    panelWattage: PANEL_WATTAGE,
  };
};
