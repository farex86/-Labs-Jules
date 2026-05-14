export const CONSUMPTION_PATTERNS = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    defaultDevices: [
      { id: 'device_1', name: 'ماكينة تصنيع الثلج', power: 5000, quantity: 2, hours: 24 },
      { id: 'device_2', name: 'غرفة تبريد', power: 3000, quantity: 1, hours: 24 },
      { id: 'device_3', name: 'إضاءة', power: 50, quantity: 20, hours: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    defaultDevices: [
      { id: 'device_1', name: 'مكيفات هواء', power: 1500, quantity: 5, hours: 10 },
      { id: 'device_2', name: 'أجهزة كمبيوتر', power: 250, quantity: 15, hours: 10 },
      { id: 'device_3', name: 'إضاءة', power: 40, quantity: 30, hours: 10 },
      { id: 'device_4', name: 'ماكينة تصوير', power: 1000, quantity: 1, hours: 4 },
      { id: 'device_5', name: 'ثلاجة صغيرة', power: 150, quantity: 1, hours: 24 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultDevices: [
      { id: 'device_1', name: 'مضخة مياه زراعية', power: 3000, quantity: 2, hours: 8 },
      { id: 'device_2', name: 'إضاءة خارجية', power: 100, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultDevices: [
      { id: 'device_1', name: 'مراوح تهوية', power: 500, quantity: 10, hours: 24 },
      { id: 'device_2', name: 'إضاءة', power: 20, quantity: 50, hours: 24 },
      { id: 'device_3', name: 'دفايات', power: 2000, quantity: 4, hours: 12 },
      { id: 'device_4', name: 'مضخة مياه', power: 750, quantity: 1, hours: 6 },
    ]
  },
  {
    id: 'greenhouses',
    name: 'بيوت محمية',
    defaultDevices: [
      { id: 'device_1', name: 'مضخات تبريد', power: 1500, quantity: 3, hours: 12 },
      { id: 'device_2', name: 'مراوح', power: 300, quantity: 6, hours: 12 },
      { id: 'device_3', name: 'مضخة ري', power: 1000, quantity: 1, hours: 4 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultDevices: [
      { id: 'device_1', name: 'آلات إنتاج', power: 10000, quantity: 3, hours: 16 },
      { id: 'device_2', name: 'إضاءة المصنع', power: 100, quantity: 50, hours: 16 },
      { id: 'device_3', name: 'مكيفات مكاتب', power: 1500, quantity: 4, hours: 10 },
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultDevices: [
      { id: 'device_1', name: 'أجهزة طبية', power: 500, quantity: 5, hours: 8 },
      { id: 'device_2', name: 'مكيفات', power: 1500, quantity: 4, hours: 12 },
      { id: 'device_3', name: 'إضاءة', power: 40, quantity: 20, hours: 12 },
      { id: 'device_4', name: 'ثلاجة أدوية', power: 200, quantity: 2, hours: 24 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    defaultDevices: [
      { id: 'device_1', name: 'أجهزة طبية ثقيلة (أشعة وغيرها)', power: 5000, quantity: 2, hours: 6 },
      { id: 'device_2', name: 'أجهزة عناية مركزة', power: 800, quantity: 10, hours: 24 },
      { id: 'device_3', name: 'مكيفات مركزية', power: 15000, quantity: 2, hours: 24 },
      { id: 'device_4', name: 'إضاءة', power: 40, quantity: 200, hours: 24 },
      { id: 'device_5', name: 'مصاعد', power: 8000, quantity: 2, hours: 12 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultDevices: [
      { id: 'device_1', name: 'عجانات', power: 2000, quantity: 2, hours: 6 },
      { id: 'device_2', name: 'أفران كهربائية', power: 8000, quantity: 2, hours: 8 },
      { id: 'device_3', name: 'إضاءة', power: 40, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultDevices: [
      { id: 'device_1', name: 'ثلاجة عرض', power: 800, quantity: 2, hours: 24 },
      { id: 'device_2', name: 'فريزر', power: 600, quantity: 1, hours: 24 },
      { id: 'device_3', name: 'مروحة / مكيف', power: 1000, quantity: 1, hours: 14 },
      { id: 'device_4', name: 'إضاءة', power: 20, quantity: 5, hours: 12 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultDevices: [
      { id: 'device_1', name: 'ماكينة لحام', power: 4000, quantity: 1, hours: 4 },
      { id: 'device_2', name: 'صاروخ جلخ / قطعية', power: 1500, quantity: 2, hours: 3 },
      { id: 'device_3', name: 'كومبريسور هواء', power: 2200, quantity: 1, hours: 4 },
      { id: 'device_4', name: 'إضاءة كشافات', power: 100, quantity: 4, hours: 8 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة مياه',
    defaultDevices: [
      { id: 'device_1', name: 'مضخة غاطسة', power: 2200, quantity: 1, hours: 10 },
    ]
  },
  {
    id: 'donkey_well',
    name: 'دونكي',
    defaultDevices: [
      { id: 'device_1', name: 'مضخة بئر عميق', power: 5500, quantity: 1, hours: 12 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultDevices: [
      { id: 'device_1', name: 'مكيفات', power: 2000, quantity: 6, hours: 6 },
      { id: 'device_2', name: 'مراوح', power: 80, quantity: 15, hours: 8 },
      { id: 'device_3', name: 'إضاءة', power: 40, quantity: 30, hours: 8 },
      { id: 'device_4', name: 'مكبرات صوت', power: 200, quantity: 1, hours: 3 },
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultDevices: [
      { id: 'device_1', name: 'ماكينات طباعة كبيرة', power: 5000, quantity: 2, hours: 10 },
      { id: 'device_2', name: 'ماكينات قص', power: 1500, quantity: 1, hours: 8 },
      { id: 'device_3', name: 'أجهزة كمبيوتر', power: 300, quantity: 4, hours: 10 },
      { id: 'device_4', name: 'إضاءة', power: 50, quantity: 20, hours: 10 },
      { id: 'device_5', name: 'مكيفات', power: 1500, quantity: 3, hours: 10 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultDevices: [
      { id: 'device_1', name: 'ماكينة إسبريسو', power: 3500, quantity: 1, hours: 12 },
      { id: 'device_2', name: 'ثلاجات عرض', power: 800, quantity: 2, hours: 24 },
      { id: 'device_3', name: 'صانعة ثلج', power: 600, quantity: 1, hours: 24 },
      { id: 'device_4', name: 'خلاطات', power: 1000, quantity: 2, hours: 3 },
      { id: 'device_5', name: 'مكيفات', power: 1500, quantity: 3, hours: 14 },
      { id: 'device_6', name: 'إضاءة وديكور', power: 50, quantity: 30, hours: 14 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultDevices: [
      { id: 'device_1', name: 'ثلاجات وفريزرات', power: 1000, quantity: 4, hours: 24 },
      { id: 'device_2', name: 'شفاطات هواء كبيرة', power: 1500, quantity: 2, hours: 14 },
      { id: 'device_3', name: 'أفران ومايكروويف', power: 2500, quantity: 2, hours: 6 },
      { id: 'device_4', name: 'مكيفات صالة', power: 2000, quantity: 4, hours: 14 },
      { id: 'device_5', name: 'إضاءة', power: 40, quantity: 40, hours: 14 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultDevices: [
      { id: 'device_1', name: 'مكيفات غرف', power: 1200, quantity: 20, hours: 12 },
      { id: 'device_2', name: 'إضاءة غرف وممرات', power: 20, quantity: 200, hours: 16 },
      { id: 'device_3', name: 'ثلاجات غرف صغيرة', power: 100, quantity: 20, hours: 24 },
      { id: 'device_4', name: 'سخانات مياه', power: 1500, quantity: 20, hours: 4 },
      { id: 'device_5', name: 'مصاعد', power: 8000, quantity: 1, hours: 12 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultDevices: [
      { id: 'device_1', name: 'أجهزة كمبيوتر', power: 250, quantity: 20, hours: 10 },
      { id: 'device_2', name: 'خوادم (سيرفرات)', power: 1500, quantity: 2, hours: 24 },
      { id: 'device_3', name: 'مكيفات مركزية', power: 10000, quantity: 2, hours: 12 },
      { id: 'device_4', name: 'صراف آلي (ATM)', power: 500, quantity: 2, hours: 24 },
      { id: 'device_5', name: 'إضاءة', power: 40, quantity: 50, hours: 12 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultDevices: [
      { id: 'device_1', name: 'ثلاجات عرض (ألبان ومشروبات)', power: 1200, quantity: 6, hours: 24 },
      { id: 'device_2', name: 'فريزرات لحوم ومجمدات', power: 1500, quantity: 4, hours: 24 },
      { id: 'device_3', name: 'مكيفات', power: 2000, quantity: 4, hours: 16 },
      { id: 'device_4', name: 'أجهزة كاشير', power: 200, quantity: 3, hours: 16 },
      { id: 'device_5', name: 'إضاءة قوية', power: 40, quantity: 50, hours: 16 },
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultDevices: [
      { id: 'device_1', name: 'مضخات وقود', power: 1000, quantity: 4, hours: 10 },
      { id: 'device_2', name: 'إضاءة خارجية وكشافات', power: 200, quantity: 15, hours: 12 },
      { id: 'device_3', name: 'مكيف مكاتب', power: 1500, quantity: 2, hours: 14 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultDevices: [
      { id: 'device_1', name: 'معدات حفر وتكسير', power: 20000, quantity: 2, hours: 10 },
      { id: 'device_2', name: 'مضخات مياه ضخمة', power: 10000, quantity: 2, hours: 12 },
      { id: 'device_3', name: 'إضاءة مواقع', power: 1000, quantity: 10, hours: 12 },
      { id: 'device_4', name: 'مكيفات كرفانات الإقامة', power: 1500, quantity: 10, hours: 14 },
    ]
  }
];

export const BATTERY_TYPES = [
  { id: 'lithium', name: 'Lithium-ion', depthOfDischarge: 0.8, efficiency: 0.95 },
  { id: 'lead_acid', name: 'Lead Acid (Gel/AGM)', depthOfDischarge: 0.5, efficiency: 0.85 }
];

// Standard constants for calculations
export const CALC_CONSTANTS = {
  SYSTEM_VOLTAGE: 48, // typical for larger systems, 12 or 24 for smaller ones, using 48 as default base
  INVERTER_EFFICIENCY: 0.9,
  SYSTEM_LOSSES: 1.3, // safety factor / losses margin
  PEAK_SUN_HOURS: 5.5, // average for sunny regions like MENA
  PANEL_WATTAGE: 550, // Standard modern panel wattage
};
