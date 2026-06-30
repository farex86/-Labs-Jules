// src/config/solarConfig.js

// Facility types in Arabic (as requested)
export const FACILITY_TYPES = [
  { id: 'custom', name: 'تخصيص' }, // Custom
  { id: 'ice_factory', name: 'مصنع ثلج' },
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
  { id: 'donkey_pump', name: 'دونكي' }, // Donkey (traditional pump/well)
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

// Common appliances in Arabic to populate dropdowns or suggestions
export const COMMON_APPLIANCES = [
  { id: 'lamp', name: 'لمبة (إضاءة)', defaultPower: 15 },
  { id: 'fan', name: 'مروحة سقف', defaultPower: 75 },
  { id: 'tv', name: 'تلفزيون', defaultPower: 100 },
  { id: 'fridge', name: 'ثلاجة', defaultPower: 150 },
  { id: 'freezer', name: 'فريزر', defaultPower: 200 },
  { id: 'ac_split', name: 'مكيف سبليت (1 طن)', defaultPower: 1200 },
  { id: 'ac_window', name: 'مكيف شباك', defaultPower: 1500 },
  { id: 'water_pump_1hp', name: 'مضخة ماء (1 حصان)', defaultPower: 750 },
  { id: 'computer', name: 'كمبيوتر مكتبي', defaultPower: 250 },
  { id: 'laptop', name: 'لاب توب', defaultPower: 65 },
  { id: 'printer', name: 'طابعة', defaultPower: 500 },
  { id: 'washing_machine', name: 'غسالة ملابس', defaultPower: 500 },
  { id: 'iron', name: 'مكواة', defaultPower: 1000 },
  { id: 'heater', name: 'سخان ماء', defaultPower: 1500 },
  { id: 'oven', name: 'فرن كهربائي', defaultPower: 2000 }
];

// Pre-defined templates for facilities to help users get started quickly
export const DEFAULT_FACILITY_APPLIANCES = {
  custom: [],
  mosque: [
    { id: 'lamp1', name: 'لمبة', quantity: 20, power: 15, hours: 5 },
    { id: 'fan1', name: 'مروحة سقف', quantity: 10, power: 75, hours: 5 },
    { id: 'mic1', name: 'مكبر صوت', quantity: 1, power: 100, hours: 2 },
    { id: 'ac1', name: 'مكيف', quantity: 2, power: 1500, hours: 2 }
  ],
  shop: [
    { id: 'lamp1', name: 'لمبة', quantity: 4, power: 15, hours: 12 },
    { id: 'fan1', name: 'مروحة سقف', quantity: 2, power: 75, hours: 12 },
    { id: 'fridge1', name: 'ثلاجة عرض', quantity: 1, power: 300, hours: 24 }
  ],
  company: [
    { id: 'lamp1', name: 'لمبة', quantity: 10, power: 15, hours: 8 },
    { id: 'computer1', name: 'كمبيوتر', quantity: 5, power: 250, hours: 8 },
    { id: 'printer1', name: 'طابعة', quantity: 1, power: 500, hours: 2 },
    { id: 'ac1', name: 'مكيف', quantity: 2, power: 1200, hours: 8 }
  ],
  farm: [
    { id: 'pump1', name: 'مضخة ماء', quantity: 1, power: 1500, hours: 6 },
    { id: 'lamp1', name: 'إضاءة خارجية', quantity: 5, power: 30, hours: 10 }
  ],
  supermarket: [
    { id: 'lamp1', name: 'لمبة', quantity: 20, power: 15, hours: 16 },
    { id: 'fridge1', name: 'ثلاجة عرض', quantity: 3, power: 300, hours: 24 },
    { id: 'freezer1', name: 'فريزر', quantity: 2, power: 400, hours: 24 },
    { id: 'ac1', name: 'مكيف', quantity: 3, power: 1500, hours: 12 }
  ],
  clinic: [
     { id: 'lamp1', name: 'لمبة', quantity: 15, power: 15, hours: 10 },
     { id: 'ac1', name: 'مكيف', quantity: 4, power: 1200, hours: 8 },
     { id: 'fridge1', name: 'ثلاجة أدوية', quantity: 1, power: 150, hours: 24 },
     { id: 'computer1', name: 'كمبيوتر', quantity: 2, power: 250, hours: 8 }
  ]
};

// System calculation constants
export const SOLAR_CONSTANTS = {
  // Peak sun hours (average for the region, e.g., Sudan/Middle East)
  PEAK_SUN_HOURS: 5.5,

  // System efficiency (panels, wiring, dirt) - typical is 70-80%
  SYSTEM_EFFICIENCY: 0.75,

  // Inverter efficiency (typical 90-95%)
  INVERTER_EFFICIENCY: 0.90,

  // Inverter safety margin (to handle surge power of motors/compressors)
  INVERTER_SAFETY_MARGIN: 1.25,

  // Battery Depth of Discharge (DoD) - typical for Lead Acid is 50%, Lithium is 80%
  BATTERY_DOD_LEAD_ACID: 0.50,
  BATTERY_DOD_LITHIUM: 0.80,

  // Default system voltage based on total power
  // < 1000W -> 12V, 1000W-3000W -> 24V, > 3000W -> 48V
  VOLTAGE_THRESHOLDS: {
    LOW: 12,    // Up to 1000W
    MEDIUM: 24, // Up to 3000W
    HIGH: 48    // Above 3000W
  },

  // Days of autonomy (number of days the battery can supply power without sun)
  DAYS_OF_AUTONOMY: 1
};
