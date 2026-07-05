// src/models/SolarCalculatorConfig.js

export const SOLAR_CONSTANTS = {
  SUNLIGHT_HOURS: 5.5, // Average peak sun hours
  SYSTEM_EFFICIENCY: 0.8, // 80% overall system efficiency
  PANEL_WATTAGE: 550, // Standard panel wattage (550W)
  BATTERY_VOLTAGE: 48, // Standard battery bank voltage
  BATTERY_CAPACITY_AH: 200, // Standard battery capacity in Ah
  BATTERY_DOD: 0.8, // Depth of discharge (80% for Li-ion/Deep cycle)
  INVERTER_SAFETY_MARGIN: 1.25 // 25% safety margin for inverter sizing
};

export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج',
    defaultAppliances: [
      { id: '1', name: 'ماكينة ثلج', watts: 15000, quantity: 1, hours: 24 },
      { id: '2', name: 'إضاءة', watts: 100, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    defaultAppliances: [
      { id: '1', name: 'مكيف هواء', watts: 1500, quantity: 4, hours: 8 },
      { id: '2', name: 'أجهزة كمبيوتر', watts: 200, quantity: 10, hours: 8 },
      { id: '3', name: 'إضاءة', watts: 40, quantity: 20, hours: 10 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultAppliances: [
      { id: '1', name: 'مضخة مياه', watts: 3000, quantity: 1, hours: 6 },
      { id: '2', name: 'إضاءة محيطية', watts: 100, quantity: 5, hours: 12 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultAppliances: [
      { id: '1', name: 'مراوح تهوية', watts: 750, quantity: 6, hours: 24 },
      { id: '2', name: 'دفايات', watts: 2000, quantity: 4, hours: 12 },
      { id: '3', name: 'إضاءة', watts: 50, quantity: 30, hours: 16 },
    ]
  },
  {
    id: 'greenhouses',
    name: 'بيوت محمية',
    defaultAppliances: [
      { id: '1', name: 'مضخات ري', watts: 1500, quantity: 2, hours: 4 },
      { id: '2', name: 'مراوح تبريد', watts: 500, quantity: 4, hours: 12 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultAppliances: [
      { id: '1', name: 'ماكينات إنتاج', watts: 5000, quantity: 5, hours: 12 },
      { id: '2', name: 'إضاءة', watts: 100, quantity: 20, hours: 12 },
    ]
  },
  {
    id: 'dispensary',
    name: 'مستوصف',
    defaultAppliances: [
      { id: '1', name: 'مكيفات', watts: 1500, quantity: 4, hours: 12 },
      { id: '2', name: 'ثلاجة أدوية', watts: 300, quantity: 2, hours: 24 },
      { id: '3', name: 'إضاءة', watts: 40, quantity: 15, hours: 12 },
      { id: '4', name: 'أجهزة طبية', watts: 1000, quantity: 2, hours: 6 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    defaultAppliances: [
      { id: '1', name: 'مكيفات مركزية', watts: 5000, quantity: 5, hours: 24 },
      { id: '2', name: 'أجهزة طبية (عناية، الخ)', watts: 2000, quantity: 10, hours: 24 },
      { id: '3', name: 'إضاءة', watts: 40, quantity: 100, hours: 24 },
      { id: '4', name: 'ثلاجات بنك الدم والأدوية', watts: 500, quantity: 5, hours: 24 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultAppliances: [
      { id: '1', name: 'عجانات', watts: 3000, quantity: 2, hours: 8 },
      { id: '2', name: 'أفران (كهربائية أو تحكم)', watts: 5000, quantity: 2, hours: 12 },
      { id: '3', name: 'إضاءة ومراوح', watts: 100, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultAppliances: [
      { id: '1', name: 'ثلاجة عرض', watts: 500, quantity: 2, hours: 24 },
      { id: '2', name: 'مروحة', watts: 70, quantity: 2, hours: 12 },
      { id: '3', name: 'إضاءة', watts: 40, quantity: 4, hours: 12 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultAppliances: [
      { id: '1', name: 'معدات لحام', watts: 4000, quantity: 1, hours: 4 },
      { id: '2', name: 'صاروخ / دريل', watts: 800, quantity: 3, hours: 6 },
      { id: '3', name: 'إضاءة', watts: 100, quantity: 5, hours: 10 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    defaultAppliances: [
      { id: '1', name: 'مضخة غاطسة', watts: 5500, quantity: 1, hours: 8 },
    ]
  },
  {
    id: 'donkey_pump',
    name: 'دونكي',
    defaultAppliances: [
      { id: '1', name: 'مضخة سحب', watts: 2200, quantity: 1, hours: 6 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultAppliances: [
      { id: '1', name: 'مكيفات', watts: 1500, quantity: 6, hours: 4 },
      { id: '2', name: 'مراوح', watts: 70, quantity: 10, hours: 4 },
      { id: '3', name: 'إضاءة', watts: 40, quantity: 20, hours: 4 },
      { id: '4', name: 'مكبرات صوت', watts: 200, quantity: 1, hours: 2 },
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultAppliances: [
      { id: '1', name: 'ماكينات طباعة', watts: 3000, quantity: 2, hours: 8 },
      { id: '2', name: 'أجهزة كمبيوتر', watts: 250, quantity: 4, hours: 8 },
      { id: '3', name: 'تكييف', watts: 1500, quantity: 2, hours: 8 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultAppliances: [
      { id: '1', name: 'ماكينة اسبريسو', watts: 4000, quantity: 1, hours: 12 },
      { id: '2', name: 'طاحونة قهوة', watts: 350, quantity: 2, hours: 12 },
      { id: '3', name: 'ثلاجة عرض', watts: 500, quantity: 1, hours: 24 },
      { id: '4', name: 'تكييف', watts: 1500, quantity: 2, hours: 12 },
      { id: '5', name: 'إضاءة', watts: 30, quantity: 15, hours: 12 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultAppliances: [
      { id: '1', name: 'ثلاجات ومجمدات', watts: 800, quantity: 4, hours: 24 },
      { id: '2', name: 'تكييف', watts: 2000, quantity: 4, hours: 14 },
      { id: '3', name: 'أجهزة مطبخ كهربائية', watts: 3000, quantity: 2, hours: 8 },
      { id: '4', name: 'إضاءة', watts: 40, quantity: 25, hours: 14 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultAppliances: [
      { id: '1', name: 'تكييف غرف', watts: 1200, quantity: 20, hours: 12 },
      { id: '2', name: 'سخانات مياه', watts: 1500, quantity: 20, hours: 3 },
      { id: '3', name: 'إضاءة وممرات', watts: 40, quantity: 100, hours: 12 },
      { id: '4', name: 'مصاعد', watts: 7000, quantity: 1, hours: 4 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultAppliances: [
      { id: '1', name: 'أجهزة كمبيوتر وسيرفرات', watts: 300, quantity: 30, hours: 10 },
      { id: '2', name: 'تكييف مركزي', watts: 5000, quantity: 2, hours: 10 },
      { id: '3', name: 'صراف آلي (ATM)', watts: 400, quantity: 2, hours: 24 },
      { id: '4', name: 'إضاءة', watts: 40, quantity: 50, hours: 10 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultAppliances: [
      { id: '1', name: 'ثلاجات عرض', watts: 1000, quantity: 5, hours: 24 },
      { id: '2', name: 'مجمدات', watts: 1200, quantity: 3, hours: 24 },
      { id: '3', name: 'تكييف', watts: 2000, quantity: 4, hours: 16 },
      { id: '4', name: 'إضاءة', watts: 40, quantity: 40, hours: 16 },
    ]
  },
  {
    id: 'fuel_station',
    name: 'طرمبة وقود',
    defaultAppliances: [
      { id: '1', name: 'مضخات وقود', watts: 750, quantity: 4, hours: 24 },
      { id: '2', name: 'إضاءة خارجية', watts: 150, quantity: 10, hours: 12 },
      { id: '3', name: 'تكييف المكتب', watts: 1500, quantity: 1, hours: 24 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultAppliances: [
      { id: '1', name: 'معدات حفر وتكسير', watts: 10000, quantity: 2, hours: 12 },
      { id: '2', name: 'مضخات مياه', watts: 4000, quantity: 2, hours: 12 },
      { id: '3', name: 'إضاءة كاشفة', watts: 400, quantity: 10, hours: 12 },
      { id: '4', name: 'مكيفات مكاتب وسكن', watts: 1500, quantity: 5, hours: 12 },
    ]
  }
];
