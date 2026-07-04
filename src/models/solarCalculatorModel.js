// Facility types and default consumption patterns in Arabic
export const facilityTypes = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    defaultDevices: [
      { id: 'ice_maker', name: 'ماكينة ثلج', powerW: 5000, hoursPerDay: 24, quantity: 2 },
      { id: 'freezer_room', name: 'غرفة تجميد', powerW: 3000, hoursPerDay: 24, quantity: 1 },
      { id: 'lighting', name: 'إضاءة', powerW: 100, hoursPerDay: 12, quantity: 10 }
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    defaultDevices: [
      { id: 'ac', name: 'مكيف هواء', powerW: 1500, hoursPerDay: 8, quantity: 4 },
      { id: 'computer', name: 'كمبيوتر', powerW: 200, hoursPerDay: 8, quantity: 10 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, hoursPerDay: 10, quantity: 20 },
      { id: 'printer', name: 'طابعة', powerW: 500, hoursPerDay: 2, quantity: 2 }
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultDevices: [
      { id: 'water_pump', name: 'مضخة مياه', powerW: 2200, hoursPerDay: 6, quantity: 1 },
      { id: 'lighting', name: 'إضاءة خارجية', powerW: 100, hoursPerDay: 12, quantity: 5 }
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultDevices: [
      { id: 'ventilation', name: 'مراوح تهوية', powerW: 500, hoursPerDay: 24, quantity: 4 },
      { id: 'heating', name: 'تدفئة', powerW: 2000, hoursPerDay: 12, quantity: 2 },
      { id: 'lighting', name: 'إضاءة', powerW: 50, hoursPerDay: 16, quantity: 20 }
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    defaultDevices: [
      { id: 'irrigation', name: 'نظام ري', powerW: 1000, hoursPerDay: 4, quantity: 1 },
      { id: 'cooling_pad', name: 'نظام تبريد', powerW: 750, hoursPerDay: 10, quantity: 2 }
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultDevices: [
      { id: 'machine_1', name: 'آلة إنتاج 1', powerW: 5000, hoursPerDay: 12, quantity: 2 },
      { id: 'lighting', name: 'إضاءة', powerW: 100, hoursPerDay: 12, quantity: 30 }
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultDevices: [
      { id: 'ac', name: 'مكيف', powerW: 1500, hoursPerDay: 12, quantity: 5 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, hoursPerDay: 16, quantity: 20 },
      { id: 'medical_eq', name: 'معدات طبية', powerW: 1000, hoursPerDay: 8, quantity: 3 },
      { id: 'fridge', name: 'ثلاجة أدوية', powerW: 300, hoursPerDay: 24, quantity: 2 }
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    defaultDevices: [
      { id: 'central_ac', name: 'تكييف مركزي', powerW: 15000, hoursPerDay: 24, quantity: 1 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, hoursPerDay: 24, quantity: 100 },
      { id: 'medical_eq', name: 'معدات طبية ثقيلة', powerW: 5000, hoursPerDay: 12, quantity: 5 }
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultDevices: [
      { id: 'oven', name: 'فرن كهربائي', powerW: 6000, hoursPerDay: 10, quantity: 2 },
      { id: 'mixer', name: 'عجانة', powerW: 2000, hoursPerDay: 6, quantity: 1 },
      { id: 'lighting', name: 'إضاءة', powerW: 50, hoursPerDay: 14, quantity: 10 }
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultDevices: [
      { id: 'fridge', name: 'ثلاجة عرض', powerW: 500, hoursPerDay: 24, quantity: 2 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, hoursPerDay: 14, quantity: 6 },
      { id: 'ac', name: 'مكيف', powerW: 1500, hoursPerDay: 12, quantity: 1 }
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultDevices: [
      { id: 'welding', name: 'ماكينة لحام', powerW: 3500, hoursPerDay: 4, quantity: 1 },
      { id: 'drill', name: 'دريل كبير', powerW: 1500, hoursPerDay: 4, quantity: 2 },
      { id: 'lighting', name: 'إضاءة', powerW: 100, hoursPerDay: 10, quantity: 5 }
    ]
  },
  {
    id: 'water_pump_station',
    name: 'مضخة موية',
    defaultDevices: [
      { id: 'pump_large', name: 'مضخة غاطسة', powerW: 5500, hoursPerDay: 8, quantity: 1 }
    ]
  },
  {
    id: 'donkey_engine',
    name: 'دونكي',
    defaultDevices: [
      { id: 'engine_replacement', name: 'بديل محرك ديزل (مضخة)', powerW: 7500, hoursPerDay: 8, quantity: 1 }
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultDevices: [
      { id: 'ac', name: 'مكيف', powerW: 1500, hoursPerDay: 5, quantity: 4 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, hoursPerDay: 5, quantity: 20 },
      { id: 'sound', name: 'نظام صوتي', powerW: 300, hoursPerDay: 2, quantity: 1 }
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultDevices: [
      { id: 'printer_large', name: 'ماكينة طباعة', powerW: 4000, hoursPerDay: 10, quantity: 2 },
      { id: 'lighting', name: 'إضاءة', powerW: 100, hoursPerDay: 12, quantity: 10 }
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultDevices: [
      { id: 'espresso', name: 'ماكينة اسبريسو', powerW: 3000, hoursPerDay: 12, quantity: 1 },
      { id: 'fridge', name: 'ثلاجة عرض', powerW: 500, hoursPerDay: 24, quantity: 1 },
      { id: 'ac', name: 'مكيف', powerW: 1500, hoursPerDay: 14, quantity: 2 },
      { id: 'lighting', name: 'ديكور وإضاءة', powerW: 200, hoursPerDay: 14, quantity: 1 }
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultDevices: [
      { id: 'fridge', name: 'ثلاجة لحوم', powerW: 800, hoursPerDay: 24, quantity: 2 },
      { id: 'ac', name: 'مكيف', powerW: 2000, hoursPerDay: 14, quantity: 3 },
      { id: 'lighting', name: 'إضاءة', powerW: 100, hoursPerDay: 14, quantity: 15 }
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultDevices: [
      { id: 'ac', name: 'مكيفات غرف', powerW: 1200, hoursPerDay: 12, quantity: 20 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, hoursPerDay: 12, quantity: 100 },
      { id: 'elevator', name: 'مصعد', powerW: 5000, hoursPerDay: 4, quantity: 1 }
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultDevices: [
      { id: 'ac', name: 'تكييف مركزي', powerW: 10000, hoursPerDay: 10, quantity: 1 },
      { id: 'computer', name: 'أجهزة كمبيوتر', powerW: 200, hoursPerDay: 10, quantity: 30 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, hoursPerDay: 10, quantity: 50 },
      { id: 'atm', name: 'صراف آلي', powerW: 400, hoursPerDay: 24, quantity: 2 }
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultDevices: [
      { id: 'fridge_display', name: 'ثلاجات عرض', powerW: 800, hoursPerDay: 24, quantity: 5 },
      { id: 'freezer', name: 'فريزر', powerW: 600, hoursPerDay: 24, quantity: 3 },
      { id: 'ac', name: 'مكيف', powerW: 2000, hoursPerDay: 16, quantity: 4 },
      { id: 'lighting', name: 'إضاءة', powerW: 50, hoursPerDay: 16, quantity: 40 }
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultDevices: [
      { id: 'pump', name: 'مضخة وقود', powerW: 750, hoursPerDay: 12, quantity: 4 },
      { id: 'lighting', name: 'إضاءة خارجية قوية', powerW: 200, hoursPerDay: 12, quantity: 10 }
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultDevices: [
      { id: 'crusher', name: 'كسارة', powerW: 15000, hoursPerDay: 10, quantity: 1 },
      { id: 'pump', name: 'مضخات', powerW: 5000, hoursPerDay: 12, quantity: 2 },
      { id: 'lighting', name: 'كشافات إضاءة', powerW: 500, hoursPerDay: 12, quantity: 20 }
    ]
  }
];

// Constants for formulas
const PERFORMANCE_RATIO = 0.8; // System losses (20%)
const PEAK_SUN_HOURS = 5.5; // Average peak sun hours
const BATTERY_EFFICIENCY = 0.85; // Battery efficiency
const DEPTH_OF_DISCHARGE = 0.5; // For Lead-Acid/Gel, or adjust for Lithium
const INVERTER_EFFICIENCY = 0.9;

// Business Logic Formulas
export const calculateSolarRequirements = (devices) => {
  // 1. Total Daily Energy (Wh)
  let totalDailyEnergyWh = 0;
  // 2. Max Peak Power (W)
  let maxPowerW = 0;

  devices.forEach(device => {
    const power = Number(device.powerW) || 0;
    const hours = Number(device.hoursPerDay) || 0;
    const qty = Number(device.quantity) || 0;

    totalDailyEnergyWh += (power * hours * qty);
    maxPowerW += (power * qty);
  });

  // Calculate required Solar Array Size (kW)
  // Required daily energy generated = totalDailyEnergyWh / PERFORMANCE_RATIO
  // Array Size (W) = Required daily energy generated / PEAK_SUN_HOURS
  const requiredSolarArrayW = (totalDailyEnergyWh / PERFORMANCE_RATIO) / PEAK_SUN_HOURS;
  const recommendedSolarPanelsKw = (requiredSolarArrayW / 1000).toFixed(2);

  // Calculate Inverter Size (W)
  // Needs to handle max power + ~20% safety margin
  const inverterSizeW = maxPowerW * 1.2;
  const recommendedInverterKw = (inverterSizeW / 1000).toFixed(2);

  // Calculate Battery Bank Size (Wh)
  // Need enough capacity to provide total daily energy considering DoD and efficiency
  // Often, we size batteries for 1-2 days of autonomy. Let's assume 1 day.
  const requiredBatteryCapacityWh = totalDailyEnergyWh / (DEPTH_OF_DISCHARGE * BATTERY_EFFICIENCY);
  const recommendedBatteryKwh = (requiredBatteryCapacityWh / 1000).toFixed(2);

  return {
    totalDailyEnergyKwh: (totalDailyEnergyWh / 1000).toFixed(2),
    maxPowerKw: (maxPowerW / 1000).toFixed(2),
    recommendedSolarPanelsKw,
    recommendedInverterKw,
    recommendedBatteryKwh
  };
};
