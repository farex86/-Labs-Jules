// src/models/SolarCalculatorModel.js

export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع تلج' },
  { id: 'company', name: 'شركة' },
  { id: 'farm', name: 'مزرعة' },
  { id: 'poultry_farm', name: 'مزرعة دواجن' },
  { id: 'greenhouses', name: 'بيوت محمية' },
  { id: 'factory', name: 'مصنع' },
  { id: 'clinic', name: 'مستوصف' },
  { id: 'hospital', name: 'مستشفي' },
  { id: 'bakery', name: 'مخبز' },
  { id: 'shop', name: 'دكان' },
  { id: 'workshop', name: 'ورشة' },
  { id: 'water_pump', name: 'مضخة موية' },
  { id: 'donkey_engine', name: 'دونكي' },
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

export const DEFAULT_APPLIANCES = {
  ice_factory: [
    { id: 'compressor', name: 'كمبروسر (Compressor)', power: 5000, qty: 1, hours: 24 },
    { id: 'pump', name: 'مضخة (Pump)', power: 1500, qty: 2, hours: 24 }
  ],
  company: [
    { id: 'ac', name: 'مكيف (AC)', power: 1500, qty: 5, hours: 8 },
    { id: 'pc', name: 'كمبيوتر (PC)', power: 200, qty: 10, hours: 8 },
    { id: 'lights', name: 'إضاءة (Lights)', power: 50, qty: 20, hours: 10 }
  ],
  farm: [
    { id: 'water_pump', name: 'مضخة مياه (Water Pump)', power: 2200, qty: 1, hours: 6 },
    { id: 'lights', name: 'إضاءة (Lights)', power: 100, qty: 5, hours: 12 }
  ],
  poultry_farm: [
    { id: 'heater', name: 'دفاية (Heater)', power: 1000, qty: 10, hours: 12 },
    { id: 'fan', name: 'مروحة (Fan)', power: 200, qty: 20, hours: 24 },
    { id: 'lights', name: 'إضاءة (Lights)', power: 50, qty: 30, hours: 24 }
  ],
  greenhouses: [
    { id: 'water_pump', name: 'مضخة مياه (Water Pump)', power: 1500, qty: 2, hours: 4 },
    { id: 'cooling_fan', name: 'مروحة تبريد (Cooling Fan)', power: 300, qty: 10, hours: 10 }
  ],
  factory: [
    { id: 'heavy_machinery', name: 'آلات ثقيلة (Heavy Machinery)', power: 10000, qty: 2, hours: 12 },
    { id: 'lights', name: 'إضاءة (Lights)', power: 100, qty: 50, hours: 12 }
  ],
  clinic: [
    { id: 'ac', name: 'مكيف (AC)', power: 1500, qty: 3, hours: 12 },
    { id: 'medical_equipment', name: 'معدات طبية (Medical Equip)', power: 2000, qty: 1, hours: 8 },
    { id: 'lights', name: 'إضاءة (Lights)', power: 50, qty: 15, hours: 12 }
  ],
  hospital: [
    { id: 'ac', name: 'مكيفات مركزية (Central AC)', power: 5000, qty: 5, hours: 24 },
    { id: 'medical_equipment', name: 'معدات طبية (Medical Equip)', power: 10000, qty: 1, hours: 24 },
    { id: 'lights', name: 'إضاءة (Lights)', power: 50, qty: 100, hours: 24 }
  ],
  bakery: [
    { id: 'oven', name: 'فرن كهربائي (Electric Oven)', power: 8000, qty: 2, hours: 12 },
    { id: 'mixer', name: 'عجانة (Mixer)', power: 2000, qty: 1, hours: 6 },
    { id: 'lights', name: 'إضاءة (Lights)', power: 50, qty: 10, hours: 14 }
  ],
  shop: [
    { id: 'fridge', name: 'ثلاجة عرض (Display Fridge)', power: 800, qty: 2, hours: 24 },
    { id: 'fan', name: 'مروحة (Fan)', power: 100, qty: 2, hours: 16 },
    { id: 'lights', name: 'إضاءة (Lights)', power: 40, qty: 4, hours: 16 }
  ],
  workshop: [
    { id: 'welding', name: 'ماكينة لحام (Welding Machine)', power: 3000, qty: 1, hours: 4 },
    { id: 'grinder', name: 'صاروخ (Grinder)', power: 1500, qty: 2, hours: 5 },
    { id: 'compressor', name: 'كمبروسر هواء (Air Compressor)', power: 2200, qty: 1, hours: 6 }
  ],
  water_pump: [
    { id: 'submersible_pump', name: 'طلمبة غاطسة (Submersible Pump)', power: 5500, qty: 1, hours: 10 }
  ],
  donkey_engine: [
    { id: 'engine_pump', name: 'محرك دونكي (Donkey Engine)', power: 4000, qty: 1, hours: 8 }
  ],
  mosque: [
    { id: 'ac', name: 'مكيف (AC)', power: 2000, qty: 6, hours: 5 },
    { id: 'fan', name: 'مروحة (Fan)', power: 100, qty: 15, hours: 8 },
    { id: 'lights', name: 'إضاءة (Lights)', power: 40, qty: 20, hours: 5 },
    { id: 'sound_system', name: 'مكبر صوت (Sound System)', power: 500, qty: 1, hours: 2 }
  ],
  printing_press: [
    { id: 'printer', name: 'طابعة كبيرة (Large Printer)', power: 3000, qty: 2, hours: 10 },
    { id: 'computer', name: 'كمبيوتر (PC)', power: 300, qty: 3, hours: 10 },
    { id: 'lights', name: 'إضاءة (Lights)', power: 50, qty: 10, hours: 10 }
  ],
  coffee_shop: [
    { id: 'espresso_machine', name: 'ماكينة قهوة (Espresso Machine)', power: 2500, qty: 1, hours: 12 },
    { id: 'blender', name: 'خلاط (Blender)', power: 1000, qty: 2, hours: 4 },
    { id: 'ac', name: 'مكيف (AC)', power: 1500, qty: 2, hours: 14 },
    { id: 'lights', name: 'إضاءة (Lights)', power: 40, qty: 15, hours: 14 }
  ],
  restaurant: [
    { id: 'oven', name: 'فرن (Oven)', power: 4000, qty: 1, hours: 8 },
    { id: 'fridge', name: 'ثلاجة (Fridge)', power: 1200, qty: 3, hours: 24 },
    { id: 'ac', name: 'مكيف (AC)', power: 2000, qty: 4, hours: 16 },
    { id: 'lights', name: 'إضاءة (Lights)', power: 50, qty: 20, hours: 16 }
  ],
  hotel: [
    { id: 'ac', name: 'مكيف (AC)', power: 1500, qty: 20, hours: 12 },
    { id: 'water_heater', name: 'سخان مياه (Water Heater)', power: 2000, qty: 10, hours: 4 },
    { id: 'fridge', name: 'ثلاجة صغيرة (Minibar)', power: 200, qty: 20, hours: 24 },
    { id: 'lights', name: 'إضاءة (Lights)', power: 40, qty: 100, hours: 12 }
  ],
  bank: [
    { id: 'ac', name: 'مكيف (AC)', power: 2000, qty: 10, hours: 10 },
    { id: 'pc', name: 'كمبيوتر (PC)', power: 200, qty: 20, hours: 10 },
    { id: 'server', name: 'سيرفر (Server)', power: 1500, qty: 1, hours: 24 },
    { id: 'lights', name: 'إضاءة (Lights)', power: 50, qty: 40, hours: 12 }
  ],
  supermarket: [
    { id: 'fridge', name: 'ثلاجة عرض (Display Fridge)', power: 1500, qty: 5, hours: 24 },
    { id: 'freezer', name: 'فريزر (Freezer)', power: 2000, qty: 3, hours: 24 },
    { id: 'ac', name: 'مكيف (AC)', power: 2500, qty: 2, hours: 16 },
    { id: 'lights', name: 'إضاءة (Lights)', power: 50, qty: 30, hours: 16 }
  ],
  gas_station: [
    { id: 'fuel_pump', name: 'مضخة وقود (Fuel Pump)', power: 1500, qty: 4, hours: 24 },
    { id: 'canopy_lights', name: 'إضاءة المظلة (Canopy Lights)', power: 200, qty: 10, hours: 12 },
    { id: 'shop_fridge', name: 'ثلاجة الدكان (Shop Fridge)', power: 1000, qty: 2, hours: 24 }
  ],
  mining_company: [
    { id: 'crusher', name: 'طاحونة (Crusher)', power: 15000, qty: 2, hours: 20 },
    { id: 'conveyor', name: 'سير ناقل (Conveyor)', power: 5000, qty: 1, hours: 20 },
    { id: 'pump', name: 'مضخة غاطسة (Submersible Pump)', power: 4000, qty: 2, hours: 24 }
  ]
};

export const calculateSolarSystemRequirements = (appliances) => {
  let totalDailyEnergyWh = 0;
  let maxPowerW = 0;

  appliances.forEach(app => {
    const power = Number(app.power) || 0;
    const qty = Number(app.qty) || 0;
    const hours = Number(app.hours) || 0;

    const appliancePower = power * qty;
    totalDailyEnergyWh += appliancePower * hours;

    // In a real scenario, not all appliances run simultaneously.
    // This is a simplified peak power estimation.
    maxPowerW += appliancePower;
  });

  // Calculate required system components
  // Assuming 5 peak sun hours per day, 80% system efficiency
  const PEAK_SUN_HOURS = 5;
  const SYSTEM_EFFICIENCY = 0.8;
  const PANEL_WATTAGE = 500; // 500W standard panels
  const INVERTER_SAFETY_MARGIN = 1.25; // 25% safety margin

  // Battery calculation (assuming 48V system, 50% Depth of Discharge for Lead Acid/Gel or general safe margin)
  const SYSTEM_VOLTAGE = 48;
  const DAYS_OF_AUTONOMY = 1;
  const DOD = 0.5;

  const requiredSolarCapacityW = totalDailyEnergyWh / (PEAK_SUN_HOURS * SYSTEM_EFFICIENCY);
  const numberOfPanels = Math.ceil(requiredSolarCapacityW / PANEL_WATTAGE);

  const recommendedInverterW = maxPowerW * INVERTER_SAFETY_MARGIN;

  // Total Ah required for the battery bank
  const requiredBatteryCapacityAh = (totalDailyEnergyWh * DAYS_OF_AUTONOMY) / (SYSTEM_VOLTAGE * DOD);

  return {
    totalDailyEnergyWh,
    totalDailyEnergyKWh: totalDailyEnergyWh / 1000,
    maxPowerW,
    maxPowerKW: maxPowerW / 1000,
    requiredSolarCapacityW,
    requiredSolarCapacityKW: requiredSolarCapacityW / 1000,
    numberOfPanels,
    recommendedInverterW,
    recommendedInverterKW: recommendedInverterW / 1000,
    requiredBatteryCapacityAh
  };
};
