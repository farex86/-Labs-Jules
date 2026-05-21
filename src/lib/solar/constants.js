export const CONSUMPTION_PATTERNS = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج',
    defaultDevices: [
      { id: '1', name: 'ماكينة ثلج كبيرة', power: 15000, quantity: 2, hours: 24 },
      { id: '2', name: 'فريزر تبريد', power: 3000, quantity: 4, hours: 24 },
      { id: '3', name: 'إضاءة', power: 100, quantity: 20, hours: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    defaultDevices: [
      { id: '1', name: 'كمبيوتر', power: 250, quantity: 15, hours: 8 },
      { id: '2', name: 'مكيف', power: 1500, quantity: 5, hours: 8 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 30, hours: 10 },
      { id: '4', name: 'طابعة/آلة تصوير', power: 500, quantity: 2, hours: 4 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultDevices: [
      { id: '1', name: 'مضخة مياه (غطاس)', power: 5000, quantity: 2, hours: 6 },
      { id: '2', name: 'إضاءة محيطية', power: 50, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultDevices: [
      { id: '1', name: 'مراوح تهوية', power: 750, quantity: 10, hours: 24 },
      { id: '2', name: 'دفايات', power: 2000, quantity: 5, hours: 12 },
      { id: '3', name: 'مضخة مياه', power: 1500, quantity: 1, hours: 4 },
      { id: '4', name: 'إضاءة', power: 40, quantity: 50, hours: 16 },
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    defaultDevices: [
      { id: '1', name: 'مراوح تهوية', power: 500, quantity: 4, hours: 12 },
      { id: '2', name: 'مضخة ري', power: 1500, quantity: 1, hours: 4 },
      { id: '3', name: 'مبرد صحراوي', power: 1000, quantity: 2, hours: 8 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultDevices: [
      { id: '1', name: 'ماكينات إنتاج', power: 10000, quantity: 3, hours: 16 },
      { id: '2', name: 'محركات', power: 5000, quantity: 4, hours: 16 },
      { id: '3', name: 'إضاءة مصنع', power: 200, quantity: 40, hours: 16 },
    ]
  },
  {
    id: 'dispensary',
    name: 'مستوصف',
    defaultDevices: [
      { id: '1', name: 'أجهزة طبية', power: 1000, quantity: 5, hours: 12 },
      { id: '2', name: 'ثلاجة أدوية', power: 300, quantity: 2, hours: 24 },
      { id: '3', name: 'مكيف', power: 1500, quantity: 6, hours: 12 },
      { id: '4', name: 'إضاءة', power: 40, quantity: 40, hours: 14 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    defaultDevices: [
      { id: '1', name: 'أجهزة عناية مركزة', power: 2000, quantity: 10, hours: 24 },
      { id: '2', name: 'أشعة/رنين', power: 15000, quantity: 2, hours: 8 },
      { id: '3', name: 'مكيفات مركزية', power: 10000, quantity: 5, hours: 24 },
      { id: '4', name: 'ثلاجات حفظ', power: 500, quantity: 10, hours: 24 },
      { id: '5', name: 'إضاءة', power: 50, quantity: 200, hours: 24 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultDevices: [
      { id: '1', name: 'عجانة', power: 3000, quantity: 2, hours: 6 },
      { id: '2', name: 'فرن كهربائي', power: 15000, quantity: 1, hours: 10 },
      { id: '3', name: 'ثلاجة عرض', power: 800, quantity: 2, hours: 24 },
      { id: '4', name: 'إضاءة', power: 40, quantity: 15, hours: 14 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultDevices: [
      { id: '1', name: 'ثلاجة', power: 400, quantity: 2, hours: 24 },
      { id: '2', name: 'مروحة/مكيف', power: 1500, quantity: 1, hours: 12 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 4, hours: 12 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultDevices: [
      { id: '1', name: 'ماكينة لحام', power: 5000, quantity: 1, hours: 4 },
      { id: '2', name: 'صاروخ/شنيور', power: 1000, quantity: 3, hours: 3 },
      { id: '3', name: 'كمبريسور هواء', power: 2000, quantity: 1, hours: 4 },
      { id: '4', name: 'إضاءة', power: 100, quantity: 6, hours: 10 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    defaultDevices: [
      { id: '1', name: 'مضخة غاطسة', power: 3000, quantity: 1, hours: 8 },
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي',
    defaultDevices: [
      { id: '1', name: 'مضخة رفع مياه', power: 1500, quantity: 1, hours: 10 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultDevices: [
      { id: '1', name: 'مكيفات', power: 2000, quantity: 4, hours: 5 },
      { id: '2', name: 'مراوح', power: 100, quantity: 10, hours: 8 },
      { id: '3', name: 'مكبرات صوت', power: 300, quantity: 1, hours: 3 },
      { id: '4', name: 'إضاءة', power: 40, quantity: 30, hours: 6 },
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultDevices: [
      { id: '1', name: 'ماكينات طباعة', power: 5000, quantity: 3, hours: 10 },
      { id: '2', name: 'ماكينة قص', power: 1500, quantity: 1, hours: 5 },
      { id: '3', name: 'كمبيوتر', power: 300, quantity: 5, hours: 10 },
      { id: '4', name: 'إضاءة', power: 60, quantity: 20, hours: 10 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultDevices: [
      { id: '1', name: 'ماكينة اسبريسو', power: 3500, quantity: 1, hours: 14 },
      { id: '2', name: 'طاحونة قهوة', power: 500, quantity: 2, hours: 4 },
      { id: '3', name: 'ثلاجة عرض', power: 800, quantity: 2, hours: 24 },
      { id: '4', name: 'مكيف', power: 2000, quantity: 2, hours: 14 },
      { id: '5', name: 'إضاءة ديكور', power: 200, quantity: 1, hours: 14 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultDevices: [
      { id: '1', name: 'ثلاجات/فريزرات', power: 1000, quantity: 4, hours: 24 },
      { id: '2', name: 'أفران/شوايات', power: 4000, quantity: 2, hours: 10 },
      { id: '3', name: 'مكيفات', power: 2000, quantity: 4, hours: 12 },
      { id: '4', name: 'إضاءة', power: 50, quantity: 40, hours: 12 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultDevices: [
      { id: '1', name: 'مكيفات غرف', power: 1500, quantity: 50, hours: 12 },
      { id: '2', name: 'مصاعد', power: 7500, quantity: 2, hours: 6 },
      { id: '3', name: 'مضخات مياه', power: 2000, quantity: 3, hours: 8 },
      { id: '4', name: 'ثلاجات', power: 150, quantity: 50, hours: 24 },
      { id: '5', name: 'إضاءة عامة', power: 2000, quantity: 1, hours: 24 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultDevices: [
      { id: '1', name: 'أجهزة كمبيوتر', power: 250, quantity: 30, hours: 10 },
      { id: '2', name: 'صراف آلي (ATM)', power: 800, quantity: 4, hours: 24 },
      { id: '3', name: 'مكيفات مركزية', power: 5000, quantity: 3, hours: 10 },
      { id: '4', name: 'إضاءة', power: 50, quantity: 100, hours: 12 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultDevices: [
      { id: '1', name: 'ثلاجات عرض', power: 1500, quantity: 10, hours: 24 },
      { id: '2', name: 'فريزرات', power: 2000, quantity: 5, hours: 24 },
      { id: '3', name: 'مكيفات', power: 2500, quantity: 4, hours: 16 },
      { id: '4', name: 'كاشير', power: 200, quantity: 4, hours: 16 },
      { id: '5', name: 'إضاءة', power: 50, quantity: 60, hours: 16 },
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultDevices: [
      { id: '1', name: 'مضخات وقود', power: 1000, quantity: 6, hours: 12 },
      { id: '2', name: 'إضاءة مظلة', power: 150, quantity: 20, hours: 12 },
      { id: '3', name: 'ثلاجة بقالة', power: 800, quantity: 2, hours: 24 },
      { id: '4', name: 'مكيف إدارة', power: 1500, quantity: 1, hours: 12 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultDevices: [
      { id: '1', name: 'كسارات/طواحين', power: 20000, quantity: 2, hours: 16 },
      { id: '2', name: 'أحزمة ناقلة', power: 5000, quantity: 4, hours: 16 },
      { id: '3', name: 'مضخات مياه', power: 4000, quantity: 2, hours: 10 },
      { id: '4', name: 'مخيم عاملين (تكييف وإنارة)', power: 15000, quantity: 1, hours: 24 },
    ]
  }
];

export const SYSTEM_CONSTANTS = {
  INVERTER_EFFICIENCY: 0.85,
  BATTERY_EFFICIENCY: 0.85,
  BATTERY_DOD: 0.5, // Depth of Discharge (50% for lead-acid/gel, 80%+ for lithium)
  SYSTEM_VOLTAGE: 48, // Common system voltage
  SUN_HOURS_PER_DAY: 5.5, // Average peak sun hours
  PANEL_WATTAGE: 550, // Standard modern solar panel wattage
};
