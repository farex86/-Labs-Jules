export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع تلج' },
  { id: 'company', name: 'شركة' },
  { id: 'farm', name: 'مزرعة' },
  { id: 'poultry_farm', name: 'مزرعة دواجن' },
  { id: 'greenhouses', name: 'بيوت محمية' },
  { id: 'factory', name: 'مصنع' },
  { id: 'clinic', name: 'مستوصف' },
  { id: 'hospital', name: 'مستشفى' },
  { id: 'bakery', name: 'مخبز' },
  { id: 'shop', name: 'دكان' },
  { id: 'workshop', name: 'ورشة' },
  { id: 'water_pump', name: 'مضخة موية' },
  { id: 'donkey', name: 'دونكي' },
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

// Pre-defined typical devices for each facility type to aid users.
// quantities, hours_per_day, power_watts are default suggestions.
export const FACILITY_TYPICAL_DEVICES = {
  ice_factory: [
    { id: 'ice_maker_large', name: 'ماكينة ثلج كبيرة', quantity: 2, power_watts: 5000, hours_per_day: 12 },
    { id: 'freezer_room', name: 'غرفة تجميد', quantity: 1, power_watts: 8000, hours_per_day: 24 },
    { id: 'lighting', name: 'إضاءة', quantity: 10, power_watts: 40, hours_per_day: 12 }
  ],
  company: [
    { id: 'ac_split', name: 'مكيف سبليت', quantity: 5, power_watts: 1500, hours_per_day: 8 },
    { id: 'pc', name: 'جهاز كمبيوتر', quantity: 10, power_watts: 200, hours_per_day: 8 },
    { id: 'lighting', name: 'إضاءة', quantity: 20, power_watts: 20, hours_per_day: 8 },
    { id: 'printer', name: 'طابعة', quantity: 2, power_watts: 400, hours_per_day: 2 }
  ],
  farm: [
    { id: 'water_pump_agri', name: 'مضخة مياه زراعية', quantity: 1, power_watts: 3000, hours_per_day: 6 },
    { id: 'lighting', name: 'إضاءة خارجية', quantity: 5, power_watts: 50, hours_per_day: 10 },
    { id: 'worker_housing', name: 'سكن عمال (مراوح وإضاءة)', quantity: 1, power_watts: 500, hours_per_day: 8 }
  ],
  poultry_farm: [
    { id: 'ventilation_fans', name: 'مراوح تهوية', quantity: 6, power_watts: 750, hours_per_day: 24 },
    { id: 'lighting', name: 'إضاءة حظائر', quantity: 20, power_watts: 20, hours_per_day: 16 },
    { id: 'feed_motor', name: 'موتور علف', quantity: 2, power_watts: 1000, hours_per_day: 4 },
    { id: 'water_pump', name: 'مضخة مياه', quantity: 1, power_watts: 1500, hours_per_day: 6 }
  ],
  greenhouses: [
    { id: 'cooling_pads_pump', name: 'مضخة تبريد', quantity: 2, power_watts: 1100, hours_per_day: 10 },
    { id: 'ventilation_fans', name: 'مراوح سحب', quantity: 4, power_watts: 750, hours_per_day: 10 },
    { id: 'irrigation_pump', name: 'مضخة ري', quantity: 1, power_watts: 2200, hours_per_day: 4 }
  ],
  factory: [
    { id: 'heavy_machinery', name: 'ماكينات إنتاج', quantity: 3, power_watts: 10000, hours_per_day: 8 },
    { id: 'lighting', name: 'إضاءة مصنع', quantity: 50, power_watts: 100, hours_per_day: 10 },
    { id: 'ac_units', name: 'تكييف مكاتب', quantity: 4, power_watts: 2000, hours_per_day: 8 }
  ],
  clinic: [
    { id: 'ac_split', name: 'مكيف سبليت', quantity: 4, power_watts: 1500, hours_per_day: 10 },
    { id: 'lighting', name: 'إضاءة', quantity: 15, power_watts: 20, hours_per_day: 12 },
    { id: 'medical_fridge', name: 'ثلاجة أدوية', quantity: 1, power_watts: 200, hours_per_day: 24 },
    { id: 'lab_equipment', name: 'معدات معمل', quantity: 1, power_watts: 1000, hours_per_day: 6 }
  ],
  hospital: [
    { id: 'central_ac', name: 'تكييف مركزي', quantity: 1, power_watts: 50000, hours_per_day: 24 },
    { id: 'lighting', name: 'إضاءة عامة', quantity: 100, power_watts: 20, hours_per_day: 24 },
    { id: 'medical_equipment', name: 'معدات طبية (أشعة، الخ)', quantity: 5, power_watts: 5000, hours_per_day: 8 },
    { id: 'life_support', name: 'أجهزة عناية مركزة', quantity: 10, power_watts: 500, hours_per_day: 24 },
    { id: 'elevators', name: 'مصاعد', quantity: 2, power_watts: 15000, hours_per_day: 12 }
  ],
  bakery: [
    { id: 'electric_oven', name: 'فرن كهربائي', quantity: 1, power_watts: 15000, hours_per_day: 8 },
    { id: 'dough_mixer', name: 'عجانة', quantity: 2, power_watts: 3000, hours_per_day: 4 },
    { id: 'display_fridge', name: 'ثلاجة عرض', quantity: 1, power_watts: 800, hours_per_day: 24 },
    { id: 'lighting', name: 'إضاءة', quantity: 10, power_watts: 30, hours_per_day: 12 }
  ],
  shop: [
    { id: 'lighting', name: 'إضاءة', quantity: 4, power_watts: 20, hours_per_day: 10 },
    { id: 'fridge', name: 'ثلاجة', quantity: 1, power_watts: 300, hours_per_day: 24 },
    { id: 'fan', name: 'مروحة', quantity: 2, power_watts: 75, hours_per_day: 10 }
  ],
  workshop: [
    { id: 'welding_machine', name: 'ماكينة لحام', quantity: 1, power_watts: 5000, hours_per_day: 4 },
    { id: 'air_compressor', name: 'كمبريسور هواء', quantity: 1, power_watts: 2200, hours_per_day: 4 },
    { id: 'grinder', name: 'صاروخ جلخ', quantity: 2, power_watts: 800, hours_per_day: 3 },
    { id: 'lighting', name: 'إضاءة كشافات', quantity: 4, power_watts: 100, hours_per_day: 8 }
  ],
  water_pump: [
    { id: 'submersible_pump', name: 'مضخة غاطسة', quantity: 1, power_watts: 5500, hours_per_day: 6 }
  ],
  donkey: [ // Traditional water well setup in Sudan
    { id: 'well_pump', name: 'مضخة بئر', quantity: 1, power_watts: 4000, hours_per_day: 8 },
    { id: 'operator_room', name: 'غرفة العامل (إضاءة ومروحة)', quantity: 1, power_watts: 100, hours_per_day: 12 }
  ],
  mosque: [
    { id: 'ac_split', name: 'مكيفات', quantity: 6, power_watts: 2000, hours_per_day: 4 },
    { id: 'fans', name: 'مراوح', quantity: 15, power_watts: 75, hours_per_day: 4 },
    { id: 'lighting', name: 'إضاءة', quantity: 30, power_watts: 20, hours_per_day: 3 },
    { id: 'sound_system', name: 'مكبرات صوت', quantity: 1, power_watts: 300, hours_per_day: 2 },
    { id: 'water_cooler', name: 'برادة مياه', quantity: 2, power_watts: 250, hours_per_day: 24 }
  ],
  printing_press: [
    { id: 'printing_machine_large', name: 'ماكينة طباعة كبيرة', quantity: 1, power_watts: 12000, hours_per_day: 8 },
    { id: 'paper_cutter', name: 'مقص ورق كهربائي', quantity: 1, power_watts: 2000, hours_per_day: 4 },
    { id: 'ac_split', name: 'تكييف', quantity: 2, power_watts: 2000, hours_per_day: 8 },
    { id: 'lighting', name: 'إضاءة', quantity: 10, power_watts: 40, hours_per_day: 10 }
  ],
  coffee_shop: [
    { id: 'espresso_machine', name: 'ماكينة اسبريسو', quantity: 1, power_watts: 3500, hours_per_day: 12 },
    { id: 'coffee_grinder', name: 'طاحونة قهوة', quantity: 2, power_watts: 400, hours_per_day: 4 },
    { id: 'display_fridge', name: 'ثلاجة عرض', quantity: 1, power_watts: 600, hours_per_day: 24 },
    { id: 'blender', name: 'خلاط', quantity: 2, power_watts: 1000, hours_per_day: 2 },
    { id: 'ac_split', name: 'تكييف', quantity: 3, power_watts: 1500, hours_per_day: 12 },
    { id: 'lighting', name: 'إضاءة ديكور', quantity: 20, power_watts: 15, hours_per_day: 12 }
  ],
  restaurant: [
    { id: 'fridge_large', name: 'ثلاجات كبيرة', quantity: 3, power_watts: 1000, hours_per_day: 24 },
    { id: 'freezer', name: 'فريزر', quantity: 2, power_watts: 800, hours_per_day: 24 },
    { id: 'ac_split', name: 'تكييف الصالة', quantity: 6, power_watts: 2000, hours_per_day: 12 },
    { id: 'exhaust_fan', name: 'مراوح شفط', quantity: 2, power_watts: 500, hours_per_day: 12 },
    { id: 'lighting', name: 'إضاءة', quantity: 30, power_watts: 20, hours_per_day: 14 }
  ],
  hotel: [
    { id: 'room_ac', name: 'تكييف غرف', quantity: 20, power_watts: 1500, hours_per_day: 12 },
    { id: 'room_lighting', name: 'إضاءة غرف', quantity: 20, power_watts: 60, hours_per_day: 8 },
    { id: 'water_heater', name: 'سخانات مياه', quantity: 20, power_watts: 1500, hours_per_day: 3 },
    { id: 'laundry_washing', name: 'غسالات فندق', quantity: 2, power_watts: 3000, hours_per_day: 6 },
    { id: 'kitchen_equipment', name: 'معدات مطبخ', quantity: 1, power_watts: 10000, hours_per_day: 8 },
    { id: 'elevator', name: 'مصعد', quantity: 1, power_watts: 11000, hours_per_day: 10 }
  ],
  bank: [
    { id: 'central_ac', name: 'تكييف مركزي/مكيفات', quantity: 10, power_watts: 2000, hours_per_day: 10 },
    { id: 'pc', name: 'أجهزة كمبيوتر', quantity: 20, power_watts: 200, hours_per_day: 10 },
    { id: 'servers', name: 'سيرفرات', quantity: 2, power_watts: 800, hours_per_day: 24 },
    { id: 'atm', name: 'صراف آلي', quantity: 2, power_watts: 500, hours_per_day: 24 },
    { id: 'lighting', name: 'إضاءة', quantity: 50, power_watts: 20, hours_per_day: 12 }
  ],
  supermarket: [
    { id: 'display_fridge_open', name: 'ثلاجات عرض مفتوحة', quantity: 4, power_watts: 2500, hours_per_day: 24 },
    { id: 'freezer', name: 'فريزر', quantity: 4, power_watts: 800, hours_per_day: 24 },
    { id: 'ac_units', name: 'تكييف', quantity: 4, power_watts: 2500, hours_per_day: 14 },
    { id: 'lighting', name: 'إضاءة', quantity: 40, power_watts: 40, hours_per_day: 14 },
    { id: 'pos_system', name: 'كاشير', quantity: 3, power_watts: 150, hours_per_day: 14 }
  ],
  gas_station: [
    { id: 'fuel_pump', name: 'مضخات وقود', quantity: 4, power_watts: 1500, hours_per_day: 12 },
    { id: 'canopy_lighting', name: 'إضاءة المظلة', quantity: 10, power_watts: 100, hours_per_day: 12 },
    { id: 'office_ac', name: 'تكييف الإدارة', quantity: 2, power_watts: 1500, hours_per_day: 10 },
    { id: 'fridge_mart', name: 'ثلاجة البقالة', quantity: 2, power_watts: 500, hours_per_day: 24 }
  ],
  mining_company: [
    { id: 'crusher', name: 'كسارة', quantity: 1, power_watts: 30000, hours_per_day: 12 },
    { id: 'conveyor_belt', name: 'سير ناقل', quantity: 2, power_watts: 5000, hours_per_day: 12 },
    { id: 'water_pump', name: 'مضخة مياه كبيرة', quantity: 1, power_watts: 15000, hours_per_day: 8 },
    { id: 'camp_ac', name: 'تكييف سكن العمال', quantity: 10, power_watts: 1500, hours_per_day: 10 },
    { id: 'camp_lighting', name: 'إضاءة السكن والموقع', quantity: 50, power_watts: 50, hours_per_day: 12 }
  ]
};

// System constants
const SUN_HOURS_PER_DAY = 5.5; // Average peak sun hours
const SYSTEM_EFFICIENCY = 0.8; // System efficiency factor (inverter, wiring losses)
const BATTERY_EFFICIENCY = 0.85; // Battery discharge efficiency
const DEPTH_OF_DISCHARGE = 0.5; // 50% DoD for Lead-Acid / Gel by default. Lithium can be higher, but 0.5 is safe default.
const INVERTER_SAFETY_MARGIN = 1.25; // 25% extra capacity for startup surges
const PANEL_WATTAGE = 550; // Standard panel wattage for calculation
const BATTERY_VOLTAGE = 48; // Standard battery bank voltage (48V)
const BATTERY_AH = 200; // Standard battery capacity (Ah)

export const calculateSystemRequirements = (devices) => {
  let totalDailyEnergyWh = 0;
  let maxConcurrentPowerWatts = 0;

  devices.forEach(device => {
    const power = Number(device.power_watts) || 0;
    const qty = Number(device.quantity) || 0;
    const hours = Number(device.hours_per_day) || 0;

    const deviceTotalPower = power * qty;
    totalDailyEnergyWh += deviceTotalPower * hours;

    // Simplistic assumption: all devices could potentially run at the same time
    maxConcurrentPowerWatts += deviceTotalPower;
  });

  // 1. Inverter Calculation
  const requiredInverterWatts = maxConcurrentPowerWatts * INVERTER_SAFETY_MARGIN;
  const recommendedInverterKva = Math.ceil((requiredInverterWatts / 1000) / 0.8); // Assuming 0.8 power factor for KVA

  // 2. Solar Panels Calculation
  const dailyEnergyRequiredFromPanels = totalDailyEnergyWh / SYSTEM_EFFICIENCY;
  const totalPanelWattageRequired = dailyEnergyRequiredFromPanels / SUN_HOURS_PER_DAY;
  const recommendedPanelsCount = Math.ceil(totalPanelWattageRequired / PANEL_WATTAGE);

  // 3. Batteries Calculation
  // Total Energy to store = total daily energy (assume worst case need full day backup, or split it)
  // For standard sizing, let's assume we need to store 50% of daily energy for night time use.
  // This is a simplistic model. A more advanced model would ask for daytime vs nighttime usage.
  const nightTimeEnergyWh = totalDailyEnergyWh * 0.6; // Assume 60% of usage is outside peak sun
  const requiredBatteryCapacityWh = nightTimeEnergyWh / (BATTERY_EFFICIENCY * DEPTH_OF_DISCHARGE);

  // Calculate how many 48V 200Ah batteries are needed
  const energyPerBatteryWh = BATTERY_VOLTAGE * BATTERY_AH;
  const recommendedBatteriesCount = Math.ceil(requiredBatteryCapacityWh / energyPerBatteryWh);

  return {
    totalDailyEnergyKwh: (totalDailyEnergyWh / 1000).toFixed(2),
    maxConcurrentPowerKw: (maxConcurrentPowerWatts / 1000).toFixed(2),
    recommendedInverterKva,
    recommendedPanelsCount,
    recommendedBatteriesCount,
    assumptions: {
      panelWattage: PANEL_WATTAGE,
      batteryAh: BATTERY_AH,
      batteryVoltage: BATTERY_VOLTAGE
    }
  };
};
