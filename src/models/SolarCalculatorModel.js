/**
 * SolarCalculatorModel.js
 * Centralized business logic, constants, and formulas for calculating solar system requirements.
 */

// Define Arabic localized facility types
export const FACILITY_TYPES = [
  { id: 'ice_factory', label: 'مصنع تلج' },
  { id: 'company', label: 'شركة' },
  { id: 'farm', label: 'مزرعة' },
  { id: 'poultry_farm', label: 'مزرعة دواجن' },
  { id: 'greenhouse', label: 'بيوت محمية' },
  { id: 'factory', label: 'مصنع' },
  { id: 'clinic', label: 'مستوصف' },
  { id: 'hospital', label: 'مستشفي' },
  { id: 'bakery', label: 'مخبز' },
  { id: 'shop', label: 'دكان' },
  { id: 'workshop', label: 'ورشة' },
  { id: 'water_pump', label: 'مضخة موية' },
  { id: 'donkey_cart_pump', label: 'دونكي' },
  { id: 'mosque', label: 'مسجد' },
  { id: 'printing_press', label: 'مطبعة' },
  { id: 'coffee_shop', label: 'كوفي شوب' },
  { id: 'restaurant', label: 'مطعم' },
  { id: 'hotel', label: 'فندق' },
  { id: 'bank', label: 'بنك' },
  { id: 'supermarket', label: 'سوبر ماركت' },
  { id: 'gas_station', label: 'طرمبة وقود' },
  { id: 'mining_company', label: 'شركة تعدين' }
];

// Default consumption patterns/devices for each facility type
export const DEFAULT_CONSUMPTION_PATTERNS = {
  ice_factory: [
    { id: 'ice_machine', name: 'ماكينة ثلج', powerWatts: 5000, qty: 2, hoursPerDay: 12 },
    { id: 'freezer', name: 'فريزر', powerWatts: 2000, qty: 3, hoursPerDay: 24 },
    { id: 'lighting', name: 'إضاءة', powerWatts: 20, qty: 20, hoursPerDay: 10 }
  ],
  company: [
    { id: 'ac', name: 'مكيف هواء', powerWatts: 1500, qty: 5, hoursPerDay: 8 },
    { id: 'computer', name: 'جهاز كمبيوتر', powerWatts: 250, qty: 10, hoursPerDay: 8 },
    { id: 'printer', name: 'طابعة', powerWatts: 500, qty: 2, hoursPerDay: 2 },
    { id: 'lighting', name: 'إضاءة', powerWatts: 20, qty: 30, hoursPerDay: 10 }
  ],
  farm: [
    { id: 'water_pump', name: 'مضخة مياه', powerWatts: 3000, qty: 2, hoursPerDay: 6 },
    { id: 'lighting', name: 'إضاءة خارجية', powerWatts: 50, qty: 10, hoursPerDay: 12 }
  ],
  poultry_farm: [
    { id: 'ventilation', name: 'مراوح تهوية', powerWatts: 1000, qty: 10, hoursPerDay: 24 },
    { id: 'heater', name: 'دفاية', powerWatts: 2000, qty: 5, hoursPerDay: 12 },
    { id: 'lighting', name: 'إضاءة', powerWatts: 20, qty: 50, hoursPerDay: 16 }
  ],
  greenhouse: [
    { id: 'water_pump', name: 'مضخة ري', powerWatts: 2000, qty: 1, hoursPerDay: 4 },
    { id: 'ventilation', name: 'مروحة تبريد', powerWatts: 800, qty: 4, hoursPerDay: 10 }
  ],
  factory: [
    { id: 'heavy_machinery', name: 'ماكينة إنتاج', powerWatts: 10000, qty: 3, hoursPerDay: 16 },
    { id: 'lighting', name: 'إضاءة', powerWatts: 40, qty: 100, hoursPerDay: 16 }
  ],
  clinic: [
    { id: 'ac', name: 'مكيف هواء', powerWatts: 1500, qty: 4, hoursPerDay: 12 },
    { id: 'medical_eq', name: 'أجهزة طبية', powerWatts: 2000, qty: 2, hoursPerDay: 6 },
    { id: 'lighting', name: 'إضاءة', powerWatts: 20, qty: 20, hoursPerDay: 12 }
  ],
  hospital: [
    { id: 'ac', name: 'مكيف مركزي', powerWatts: 20000, qty: 2, hoursPerDay: 24 },
    { id: 'medical_eq_heavy', name: 'أجهزة طبية ثقيلة (أشعة، غسيل)', powerWatts: 5000, qty: 5, hoursPerDay: 10 },
    { id: 'lighting', name: 'إضاءة', powerWatts: 20, qty: 200, hoursPerDay: 24 }
  ],
  bakery: [
    { id: 'oven', name: 'فرن كهربائي', powerWatts: 8000, qty: 2, hoursPerDay: 12 },
    { id: 'mixer', name: 'عجانة', powerWatts: 3000, qty: 2, hoursPerDay: 8 },
    { id: 'lighting', name: 'إضاءة', powerWatts: 20, qty: 15, hoursPerDay: 14 }
  ],
  shop: [
    { id: 'fridge', name: 'ثلاجة عرض', powerWatts: 800, qty: 2, hoursPerDay: 24 },
    { id: 'ac', name: 'مكيف', powerWatts: 1500, qty: 1, hoursPerDay: 10 },
    { id: 'lighting', name: 'إضاءة', powerWatts: 20, qty: 8, hoursPerDay: 12 }
  ],
  workshop: [
    { id: 'welding', name: 'ماكينة لحام', powerWatts: 4000, qty: 2, hoursPerDay: 4 },
    { id: 'compressor', name: 'كمبروسر هواء', powerWatts: 2500, qty: 1, hoursPerDay: 6 },
    { id: 'lighting', name: 'إضاءة', powerWatts: 40, qty: 10, hoursPerDay: 10 }
  ],
  water_pump: [
    { id: 'pump_large', name: 'مضخة غاطسة', powerWatts: 5500, qty: 1, hoursPerDay: 8 }
  ],
  donkey_cart_pump: [
    { id: 'pump_small', name: 'مضخة سطحية', powerWatts: 1500, qty: 1, hoursPerDay: 6 }
  ],
  mosque: [
    { id: 'ac', name: 'مكيف', powerWatts: 2000, qty: 6, hoursPerDay: 6 },
    { id: 'audio', name: 'مكبر صوت', powerWatts: 300, qty: 1, hoursPerDay: 3 },
    { id: 'lighting', name: 'إضاءة', powerWatts: 20, qty: 30, hoursPerDay: 8 }
  ],
  printing_press: [
    { id: 'printer_large', name: 'ماكينة طباعة', powerWatts: 6000, qty: 2, hoursPerDay: 10 },
    { id: 'cutter', name: 'مقص ورق', powerWatts: 1500, qty: 1, hoursPerDay: 5 },
    { id: 'lighting', name: 'إضاءة', powerWatts: 40, qty: 15, hoursPerDay: 12 }
  ],
  coffee_shop: [
    { id: 'espresso_machine', name: 'ماكينة اسبريسو', powerWatts: 3500, qty: 1, hoursPerDay: 16 },
    { id: 'grinder', name: 'طاحونة بن', powerWatts: 800, qty: 2, hoursPerDay: 8 },
    { id: 'ac', name: 'مكيف', powerWatts: 2000, qty: 2, hoursPerDay: 16 },
    { id: 'lighting', name: 'إضاءة', powerWatts: 20, qty: 25, hoursPerDay: 16 }
  ],
  restaurant: [
    { id: 'fridge', name: 'ثلاجة/فريزر', powerWatts: 1500, qty: 4, hoursPerDay: 24 },
    { id: 'ac', name: 'مكيف', powerWatts: 2000, qty: 4, hoursPerDay: 16 },
    { id: 'exhaust', name: 'شفاط هواء', powerWatts: 800, qty: 2, hoursPerDay: 16 },
    { id: 'lighting', name: 'إضاءة', powerWatts: 20, qty: 40, hoursPerDay: 16 }
  ],
  hotel: [
    { id: 'ac', name: 'مكيف', powerWatts: 1500, qty: 20, hoursPerDay: 12 },
    { id: 'fridge', name: 'ثلاجة صغيرة', powerWatts: 150, qty: 20, hoursPerDay: 24 },
    { id: 'elevator', name: 'مصعد', powerWatts: 5000, qty: 1, hoursPerDay: 4 },
    { id: 'lighting', name: 'إضاءة', powerWatts: 20, qty: 100, hoursPerDay: 24 }
  ],
  bank: [
    { id: 'ac', name: 'مكيف مركزي', powerWatts: 15000, qty: 1, hoursPerDay: 10 },
    { id: 'computer', name: 'جهاز كمبيوتر', powerWatts: 250, qty: 30, hoursPerDay: 10 },
    { id: 'atm', name: 'صراف آلي', powerWatts: 500, qty: 3, hoursPerDay: 24 },
    { id: 'lighting', name: 'إضاءة', powerWatts: 20, qty: 60, hoursPerDay: 12 }
  ],
  supermarket: [
    { id: 'fridge_display', name: 'ثلاجة عرض', powerWatts: 1200, qty: 6, hoursPerDay: 24 },
    { id: 'freezer', name: 'فريزر', powerWatts: 1500, qty: 4, hoursPerDay: 24 },
    { id: 'ac', name: 'مكيف', powerWatts: 2500, qty: 4, hoursPerDay: 16 },
    { id: 'lighting', name: 'إضاءة', powerWatts: 40, qty: 50, hoursPerDay: 16 }
  ],
  gas_station: [
    { id: 'pump_dispenser', name: 'طرمبة وقود', powerWatts: 1000, qty: 4, hoursPerDay: 24 },
    { id: 'lighting_canopy', name: 'إضاءة المظلة', powerWatts: 100, qty: 10, hoursPerDay: 12 },
    { id: 'ac_office', name: 'مكيف مكتب', powerWatts: 1500, qty: 2, hoursPerDay: 24 }
  ],
  mining_company: [
    { id: 'heavy_machinery', name: 'معدات حفر', powerWatts: 15000, qty: 2, hoursPerDay: 12 },
    { id: 'pump', name: 'مضخة مياه/سوائل', powerWatts: 5000, qty: 3, hoursPerDay: 24 },
    { id: 'lighting_flood', name: 'إضاءة كاشفة', powerWatts: 400, qty: 10, hoursPerDay: 12 }
  ]
};

/**
 * Calculates solar system requirements based on a list of devices.
 *
 * @param {Array} devices - List of device objects: { powerWatts, qty, hoursPerDay }
 * @returns {Object} System requirements (daily energy, peak power, panels needed, inverter size, battery capacity)
 */
export const calculateSystemRequirements = (devices) => {
  if (!devices || devices.length === 0) {
    return {
      dailyEnergyWh: 0,
      peakPowerW: 0,
      solarCapacityW: 0,
      panelsNeeded: 0,
      inverterSizeW: 0,
      batteryCapacityWh: 0
    };
  }

  let totalDailyEnergyWh = 0;
  let maxPeakPowerW = 0;

  devices.forEach(device => {
    const power = Number(device.powerWatts) || 0;
    const qty = Number(device.qty) || 0;
    const hours = Number(device.hoursPerDay) || 0;

    const deviceTotalPower = power * qty;

    totalDailyEnergyWh += deviceTotalPower * hours;
    maxPeakPowerW += deviceTotalPower;
  });

  // System Losses and Efficiency Assumptions
  const SYSTEM_EFFICIENCY = 0.8; // 20% system losses
  const SUN_HOURS_PER_DAY = 5; // Average peak sun hours
  const INVERTER_SAFETY_MARGIN = 1.25; // 25% safety margin for surges
  const PANEL_WATTAGE = 550; // Assume 550W panels as standard

  // For battery sizing, assume we need to store 50% of daily energy for night use
  // with a 50% Depth of Discharge (DoD) for lead-acid/gel, or 80% for Lithium.
  // We'll calculate a general required storage capacity based on a day of autonomy
  // with a 0.6 overall battery efficiency/DoD factor to be safe.
  const BATTERY_AUTONOMY_FACTOR = 0.5; // Storing 50% of daily needs
  const BATTERY_EFFICIENCY_DOD = 0.6; // Assuming 60% usable capacity

  const requiredDailyGenerationWh = totalDailyEnergyWh / SYSTEM_EFFICIENCY;
  const solarCapacityW = requiredDailyGenerationWh / SUN_HOURS_PER_DAY;
  const panelsNeeded = Math.ceil(solarCapacityW / PANEL_WATTAGE);
  const inverterSizeW = maxPeakPowerW * INVERTER_SAFETY_MARGIN;

  const batteryCapacityWh = (totalDailyEnergyWh * BATTERY_AUTONOMY_FACTOR) / BATTERY_EFFICIENCY_DOD;

  return {
    dailyEnergyWh: totalDailyEnergyWh,
    peakPowerW: maxPeakPowerW,
    solarCapacityW: solarCapacityW,
    panelsNeeded: panelsNeeded,
    panelWattage: PANEL_WATTAGE,
    inverterSizeW: inverterSizeW,
    batteryCapacityWh: batteryCapacityWh
  };
};
