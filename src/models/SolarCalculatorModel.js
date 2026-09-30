// src/models/SolarCalculatorModel.js

// Predefined facility types with default devices, wattages, quantities, and hours per day
export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    devices: [
      { id: 'ice_maker_large', name: 'ماكينة ثلج كبيرة', watts: 5000, quantity: 2, hours: 24 },
      { id: 'freezer_room', name: 'غرفة تجميد', watts: 3000, quantity: 1, hours: 24 },
      { id: 'lighting', name: 'إضاءة', watts: 100, quantity: 10, hours: 12 },
    ],
  },
  {
    id: 'company',
    name: 'شركة',
    devices: [
      { id: 'ac_split', name: 'مكيف سبليت', watts: 1500, quantity: 5, hours: 10 },
      { id: 'computer', name: 'جهاز كمبيوتر', watts: 200, quantity: 20, hours: 10 },
      { id: 'lighting', name: 'إضاءة', watts: 50, quantity: 30, hours: 10 },
      { id: 'printer', name: 'طابعة', watts: 500, quantity: 2, hours: 2 },
      { id: 'server', name: 'سيرفر', watts: 800, quantity: 1, hours: 24 },
    ],
  },
  {
    id: 'farm',
    name: 'مزرعة',
    devices: [
      { id: 'water_pump', name: 'مضخة مياه', watts: 2200, quantity: 1, hours: 6 },
      { id: 'lighting_ext', name: 'إضاءة خارجية', watts: 100, quantity: 5, hours: 12 },
      { id: 'tv', name: 'تلفزيون', watts: 150, quantity: 1, hours: 4 },
      { id: 'fridge', name: 'ثلاجة', watts: 300, quantity: 1, hours: 24 },
    ],
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    devices: [
      { id: 'ventilation_fan', name: 'مروحة تهوية', watts: 750, quantity: 4, hours: 24 },
      { id: 'lighting', name: 'إضاءة', watts: 50, quantity: 20, hours: 16 },
      { id: 'heater', name: 'دفاية', watts: 2000, quantity: 2, hours: 10 },
      { id: 'water_pump', name: 'مضخة مياه', watts: 1500, quantity: 1, hours: 4 },
    ],
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    devices: [
      { id: 'cooling_pad_pump', name: 'مضخة تبريد', watts: 1000, quantity: 2, hours: 10 },
      { id: 'exhaust_fan', name: 'مروحة سحب', watts: 1500, quantity: 2, hours: 10 },
      { id: 'irrigation_pump', name: 'مضخة ري', watts: 1500, quantity: 1, hours: 4 },
    ],
  },
  {
    id: 'factory',
    name: 'مصنع',
    devices: [
      { id: 'heavy_machinery', name: 'آلات ثقيلة', watts: 10000, quantity: 2, hours: 12 },
      { id: 'lighting', name: 'إضاءة صناعية', watts: 200, quantity: 20, hours: 14 },
      { id: 'compressor', name: 'كمبروسر هواء', watts: 5000, quantity: 1, hours: 8 },
    ],
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    devices: [
      { id: 'ac', name: 'مكيف', watts: 1500, quantity: 4, hours: 12 },
      { id: 'lighting', name: 'إضاءة', watts: 50, quantity: 20, hours: 12 },
      { id: 'fridge_med', name: 'ثلاجة أدوية', watts: 200, quantity: 2, hours: 24 },
      { id: 'sterilizer', name: 'جهاز تعقيم', watts: 1000, quantity: 1, hours: 4 },
      { id: 'dental_chair', name: 'كرسي أسنان', watts: 800, quantity: 1, hours: 6 },
    ],
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    devices: [
      { id: 'central_ac', name: 'تكييف مركزي', watts: 20000, quantity: 1, hours: 24 },
      { id: 'lighting', name: 'إضاءة', watts: 50, quantity: 100, hours: 24 },
      { id: 'mri', name: 'جهاز رنين', watts: 15000, quantity: 1, hours: 8 },
      { id: 'xray', name: 'أشعة سينية', watts: 5000, quantity: 2, hours: 8 },
      { id: 'life_support', name: 'أجهزة عناية مركزة', watts: 1000, quantity: 10, hours: 24 },
    ],
  },
  {
    id: 'bakery',
    name: 'مخبز',
    devices: [
      { id: 'electric_oven', name: 'فرن كهربائي', watts: 8000, quantity: 2, hours: 12 },
      { id: 'dough_mixer', name: 'عجانة', watts: 2000, quantity: 2, hours: 6 },
      { id: 'proofer', name: 'خمارة', watts: 1500, quantity: 1, hours: 8 },
      { id: 'lighting', name: 'إضاءة', watts: 100, quantity: 10, hours: 14 },
    ],
  },
  {
    id: 'shop',
    name: 'دكان',
    devices: [
      { id: 'fridge', name: 'ثلاجة عرض', watts: 400, quantity: 2, hours: 24 },
      { id: 'freezer', name: 'فريزر', watts: 500, quantity: 1, hours: 24 },
      { id: 'lighting', name: 'إضاءة', watts: 50, quantity: 5, hours: 14 },
      { id: 'fan', name: 'مروحة', watts: 70, quantity: 2, hours: 14 },
    ],
  },
  {
    id: 'workshop',
    name: 'ورشة',
    devices: [
      { id: 'welding_machine', name: 'ماكينة لحام', watts: 4000, quantity: 1, hours: 6 },
      { id: 'grinder', name: 'صاروخ جلخ', watts: 800, quantity: 2, hours: 4 },
      { id: 'air_compressor', name: 'كمبروسر هواء', watts: 2000, quantity: 1, hours: 8 },
      { id: 'lighting', name: 'إضاءة كشافات', watts: 150, quantity: 4, hours: 10 },
    ],
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    devices: [
      { id: 'submersible_pump', name: 'غاطسة', watts: 3000, quantity: 1, hours: 8 },
      { id: 'surface_pump', name: 'مضخة سطحية', watts: 1500, quantity: 1, hours: 4 },
    ],
  },
  {
    id: 'donkey',
    name: 'دونكي', // Water well distribution point
    devices: [
      { id: 'deep_well_pump', name: 'مضخة بئر عميق', watts: 5500, quantity: 1, hours: 10 },
      { id: 'lighting', name: 'إضاءة', watts: 50, quantity: 2, hours: 12 },
    ],
  },
  {
    id: 'mosque',
    name: 'مسجد',
    devices: [
      { id: 'ac', name: 'مكيف', watts: 2000, quantity: 6, hours: 6 },
      { id: 'lighting', name: 'إضاءة', watts: 50, quantity: 30, hours: 6 },
      { id: 'sound_system', name: 'نظام صوتي', watts: 300, quantity: 1, hours: 5 },
      { id: 'water_cooler', name: 'برادة مياه', watts: 200, quantity: 2, hours: 24 },
    ],
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    devices: [
      { id: 'printing_machine', name: 'ماكينة طباعة', watts: 5000, quantity: 2, hours: 10 },
      { id: 'paper_cutter', name: 'مقص ورق', watts: 1500, quantity: 1, hours: 4 },
      { id: 'computer', name: 'كمبيوتر', watts: 300, quantity: 3, hours: 10 },
      { id: 'lighting', name: 'إضاءة', watts: 100, quantity: 10, hours: 10 },
    ],
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    devices: [
      { id: 'espresso_machine', name: 'ماكينة اسبريسو', watts: 3500, quantity: 1, hours: 14 },
      { id: 'grinder', name: 'طاحونة قهوة', watts: 500, quantity: 2, hours: 6 },
      { id: 'fridge', name: 'ثلاجة عرض', watts: 400, quantity: 1, hours: 24 },
      { id: 'ice_maker', name: 'صانعة ثلج', watts: 600, quantity: 1, hours: 24 },
      { id: 'ac', name: 'مكيف', watts: 2000, quantity: 2, hours: 14 },
      { id: 'lighting', name: 'إضاءة', watts: 50, quantity: 15, hours: 14 },
    ],
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    devices: [
      { id: 'fridge', name: 'ثلاجة', watts: 600, quantity: 3, hours: 24 },
      { id: 'freezer', name: 'فريزر', watts: 800, quantity: 2, hours: 24 },
      { id: 'oven', name: 'فرن كهربائي', watts: 4000, quantity: 1, hours: 8 },
      { id: 'fryer', name: 'قلاية', watts: 3000, quantity: 2, hours: 10 },
      { id: 'ac', name: 'مكيف', watts: 2000, quantity: 4, hours: 16 },
      { id: 'lighting', name: 'إضاءة', watts: 50, quantity: 20, hours: 16 },
    ],
  },
  {
    id: 'hotel',
    name: 'فندق',
    devices: [
      { id: 'room_ac', name: 'مكيفات غرف', watts: 1500, quantity: 50, hours: 12 },
      { id: 'elevator', name: 'مصعد', watts: 10000, quantity: 2, hours: 10 },
      { id: 'water_heater', name: 'سخان مياه مركزي', watts: 8000, quantity: 1, hours: 8 },
      { id: 'lighting', name: 'إضاءة', watts: 50, quantity: 200, hours: 14 },
      { id: 'laundry', name: 'غسالات ومجففات', watts: 5000, quantity: 3, hours: 8 },
    ],
  },
  {
    id: 'bank',
    name: 'بنك',
    devices: [
      { id: 'computer', name: 'كمبيوتر', watts: 200, quantity: 30, hours: 10 },
      { id: 'server', name: 'سيرفر', watts: 1000, quantity: 2, hours: 24 },
      { id: 'ac', name: 'مكيف', watts: 2000, quantity: 8, hours: 12 },
      { id: 'lighting', name: 'إضاءة', watts: 50, quantity: 50, hours: 12 },
      { id: 'atm', name: 'صراف آلي', watts: 300, quantity: 3, hours: 24 },
    ],
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    devices: [
      { id: 'display_fridge', name: 'ثلاجة عرض', watts: 800, quantity: 10, hours: 24 },
      { id: 'freezer_island', name: 'فريزر عرض', watts: 1200, quantity: 5, hours: 24 },
      { id: 'ac', name: 'مكيف مركزي', watts: 10000, quantity: 2, hours: 16 },
      { id: 'lighting', name: 'إضاءة', watts: 60, quantity: 40, hours: 16 },
      { id: 'pos', name: 'كاشير', watts: 150, quantity: 4, hours: 16 },
    ],
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    devices: [
      { id: 'fuel_dispenser', name: 'مضخة وقود', watts: 1500, quantity: 6, hours: 12 },
      { id: 'lighting_canopy', name: 'إضاءة المظلة', watts: 200, quantity: 10, hours: 12 },
      { id: 'shop_fridge', name: 'ثلاجة البقالة', watts: 500, quantity: 3, hours: 24 },
      { id: 'ac', name: 'مكيف', watts: 1500, quantity: 2, hours: 16 },
    ],
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    devices: [
      { id: 'crusher', name: 'كسارة', watts: 15000, quantity: 2, hours: 10 },
      { id: 'conveyor', name: 'سير ناقل', watts: 5000, quantity: 3, hours: 10 },
      { id: 'water_pump', name: 'مضخة مياه كبيرة', watts: 7500, quantity: 2, hours: 12 },
      { id: 'camp_ac', name: 'مكيفات السكن', watts: 1500, quantity: 20, hours: 10 },
      { id: 'lighting_tower', name: 'برج إضاءة', watts: 2000, quantity: 4, hours: 12 },
    ],
  },
];

/**
 * Calculates total daily energy consumption (Wh) and peak load (W).
 * @param {Array} devices - Array of device objects { watts, quantity, hours }
 * @returns {Object} { dailyEnergyWh, peakLoadW }
 */
export function calculateTotalConsumption(devices) {
  let dailyEnergyWh = 0;
  let peakLoadW = 0;

  for (const device of devices) {
    const watts = Number(device.watts) || 0;
    const quantity = Number(device.quantity) || 0;
    const hours = Number(device.hours) || 0;

    const deviceTotalWatts = watts * quantity;
    peakLoadW += deviceTotalWatts;
    dailyEnergyWh += deviceTotalWatts * hours;
  }

  return { dailyEnergyWh, peakLoadW };
}

/**
 * Calculates the required solar system components based on consumption.
 * @param {number} dailyEnergyWh - Total daily energy requirement in Watt-hours
 * @param {number} peakLoadW - Peak load in Watts
 * @returns {Object} System specifications
 */
export function calculateSolarSystem(dailyEnergyWh, peakLoadW) {
  // Constants for calculation
  const PANEL_WATTAGE = 550; // Standard 550W panel
  const SUN_HOURS = 5; // Average daily sun hours
  const SYSTEM_LOSS_FACTOR = 1.3; // 30% loss factor for inefficiencies
  const BATTERY_VOLTAGE = 48; // Assuming 48V battery bank
  const BATTERY_DEPTH_OF_DISCHARGE = 0.8; // 80% DoD for Lithium, adjust if Lead Acid (0.5)
  const DAYS_OF_AUTONOMY = 1; // 1 day of backup

  // 1. Calculate Required Daily Generation (accounting for losses)
  const requiredDailyGenerationWh = dailyEnergyWh * SYSTEM_LOSS_FACTOR;

  // 2. Calculate Required Solar Array Size (in Watts)
  const requiredSolarArrayW = requiredDailyGenerationWh / SUN_HOURS;

  // 3. Calculate Number of Panels
  const numberOfPanels = Math.ceil(requiredSolarArrayW / PANEL_WATTAGE);
  const totalSolarCapacitykW = (numberOfPanels * PANEL_WATTAGE) / 1000;

  // 4. Calculate Battery Bank Size (in Ah)
  const batteryCapacityWh = (dailyEnergyWh * DAYS_OF_AUTONOMY) / BATTERY_DEPTH_OF_DISCHARGE;
  const batteryCapacityAh = batteryCapacityWh / BATTERY_VOLTAGE;

  // 5. Calculate Inverter Size (in kVA)
  // Inverter should handle peak load + a 20-30% safety margin
  const INVERTER_SAFETY_MARGIN = 1.25;
  const inverterCapacityW = peakLoadW * INVERTER_SAFETY_MARGIN;
  const inverterCapacitykW = inverterCapacityW / 1000;

  // Standardizing inverter size to common values (3, 5, 8, 10, 15, 20, 30, 50, etc)
  const standardInverters = [3, 5, 8, 10, 15, 20, 30, 50, 100, 250, 500];
  let recommendedInverterkW = standardInverters.find(size => size >= inverterCapacitykW) || Math.ceil(inverterCapacitykW);


  return {
    dailyEnergykWh: (dailyEnergyWh / 1000).toFixed(2),
    peakLoadkW: (peakLoadW / 1000).toFixed(2),
    panels: {
      count: numberOfPanels,
      wattage: PANEL_WATTAGE,
      totalCapacitykW: totalSolarCapacitykW.toFixed(2),
    },
    battery: {
      voltage: BATTERY_VOLTAGE,
      capacityAh: Math.ceil(batteryCapacityAh),
      capacitykWh: (batteryCapacityWh / 1000).toFixed(2),
    },
    inverter: {
      capacitykW: recommendedInverterkW,
    }
  };
}
