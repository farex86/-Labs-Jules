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
  { id: 'mining_company', name: 'شركة تعدين' },
  { id: 'custom', name: 'أخرى (مخصص)' }
];

export const DEFAULT_DEVICES_BY_FACILITY = {
  ice_factory: [
    { id: '1', name: 'آلة صنع الثلج', quantity: 2, power: 5000, hours: 24 },
    { id: '2', name: 'إضاءة', quantity: 10, power: 20, hours: 12 },
    { id: '3', name: 'مضخة مياه', quantity: 1, power: 1500, hours: 8 },
  ],
  farm: [
    { id: '1', name: 'مضخة غاطسة', quantity: 1, power: 3000, hours: 8 },
    { id: '2', name: 'إضاءة محيطية', quantity: 5, power: 50, hours: 12 },
  ],
  poultry_farm: [
    { id: '1', name: 'مراوح تهوية', quantity: 10, power: 500, hours: 24 },
    { id: '2', name: 'إضاءة', quantity: 20, power: 20, hours: 24 },
    { id: '3', name: 'أنظمة تدفئة', quantity: 5, power: 2000, hours: 12 },
  ],
  mosque: [
    { id: '1', name: 'مكيفات', quantity: 4, power: 2000, hours: 6 },
    { id: '2', name: 'مراوح سقف', quantity: 10, power: 75, hours: 8 },
    { id: '3', name: 'إضاءة', quantity: 20, power: 20, hours: 8 },
    { id: '4', name: 'نظام صوتي', quantity: 1, power: 300, hours: 6 },
  ],
  shop: [
    { id: '1', name: 'ثلاجة عرض', quantity: 2, power: 500, hours: 24 },
    { id: '2', name: 'إضاءة', quantity: 5, power: 20, hours: 12 },
    { id: '3', name: 'مروحة/مكيف', quantity: 1, power: 1500, hours: 12 },
  ],
  restaurant: [
    { id: '1', name: 'ثلاجات كبيرة', quantity: 3, power: 800, hours: 24 },
    { id: '2', name: 'مكيفات', quantity: 4, power: 2000, hours: 14 },
    { id: '3', name: 'إضاءة', quantity: 20, power: 20, hours: 14 },
    { id: '4', name: 'أجهزة مطبخ متنوعة', quantity: 5, power: 1000, hours: 8 },
  ],
  hospital: [
    { id: '1', name: 'معدات طبية', quantity: 10, power: 1500, hours: 24 },
    { id: '2', name: 'مكيفات مركزية', quantity: 1, power: 10000, hours: 24 },
    { id: '3', name: 'إضاءة', quantity: 100, power: 20, hours: 24 },
    { id: '4', name: 'ثلاجات أدوية', quantity: 5, power: 300, hours: 24 },
  ],
  company: [
    { id: '1', name: 'أجهزة كمبيوتر', quantity: 20, power: 200, hours: 10 },
    { id: '2', name: 'مكيفات', quantity: 5, power: 2000, hours: 10 },
    { id: '3', name: 'إضاءة', quantity: 30, power: 20, hours: 10 },
    { id: '4', name: 'طابعة/آلة تصوير', quantity: 2, power: 500, hours: 4 },
  ]
};

export const SYSTEM_CONSTANTS = {
  INVERTER_EFFICIENCY: 0.9,
  SAFETY_MARGIN: 1.25, // 25% extra capacity for inverter
  PEAK_SUN_HOURS: 5.5, // Average for Sudan region
  BATTERY_DEPTH_OF_DISCHARGE: 0.8, // For Lithium (80%), if Lead-Acid change to 0.5
  SYSTEM_VOLTAGE: 48, // Standard 48V system for commercial
  PANEL_WATTAGE: 550, // Standard modern panel wattage
};
