export const SYSTEM_CONSTANTS = {
  INVERTER_SAFETY_FACTOR: 1.25, // 25% safety margin
  BATTERY_DEPTH_OF_DISCHARGE: 0.5, // 50% DoD for Lead-Acid (can make this configurable later)
  SYSTEM_VOLTAGE: 24, // Assuming 24V system by default (can be 12, 24, 48)
  PEAK_SUN_HOURS: 5.5, // Average peak sun hours (varies by location, setting to typical Middle East/Africa)
  PANEL_DERATING_FACTOR: 0.8, // 20% loss due to heat, dirt, wiring, etc.
};

export const CONSUMPTION_PATTERNS = [
  {
    id: 'custom',
    name: 'تخصيص حر (Custom)',
    devices: [],
  },
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    devices: [
      { id: '1', name: 'ماكينة تصنيع الثلج', power: 3000, quantity: 2, hoursPerDay: 12 },
      { id: '2', name: 'غرفة تبريد', power: 1500, quantity: 1, hoursPerDay: 24 },
      { id: '3', name: 'إضاءة', power: 20, quantity: 10, hoursPerDay: 12 },
    ],
  },
  {
    id: 'company',
    name: 'شركة',
    devices: [
      { id: '1', name: 'أجهزة كمبيوتر', power: 150, quantity: 10, hoursPerDay: 8 },
      { id: '2', name: 'مكيفات هواء', power: 1500, quantity: 4, hoursPerDay: 8 },
      { id: '3', name: 'إضاءة', power: 20, quantity: 20, hoursPerDay: 10 },
      { id: '4', name: 'طابعة/ماكينة تصوير', power: 500, quantity: 1, hoursPerDay: 4 },
      { id: '5', name: 'ثلاجة صغيرة', power: 100, quantity: 1, hoursPerDay: 24 },
    ],
  },
  {
    id: 'farm',
    name: 'مزرعة',
    devices: [
      { id: '1', name: 'مضخة مياه (غاطسة)', power: 2000, quantity: 1, hoursPerDay: 6 },
      { id: '2', name: 'إضاءة خارجية', power: 50, quantity: 10, hoursPerDay: 12 },
      { id: '3', name: 'تلفزيون', power: 100, quantity: 1, hoursPerDay: 4 },
      { id: '4', name: 'مروحة سقف', power: 75, quantity: 2, hoursPerDay: 8 },
    ],
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    devices: [
      { id: '1', name: 'مراوح شفط', power: 300, quantity: 4, hoursPerDay: 12 },
      { id: '2', name: 'إضاءة', power: 15, quantity: 30, hoursPerDay: 16 },
      { id: '3', name: 'مضخة مياه', power: 1000, quantity: 1, hoursPerDay: 4 },
      { id: '4', name: 'سخانات / دفايات', power: 2000, quantity: 2, hoursPerDay: 8 },
    ],
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    devices: [
      { id: '1', name: 'مضخة ري', power: 1500, quantity: 1, hoursPerDay: 4 },
      { id: '2', name: 'مراوح تبريد', power: 250, quantity: 4, hoursPerDay: 10 },
      { id: '3', name: 'إضاءة زراعية', power: 100, quantity: 20, hoursPerDay: 6 },
    ],
  },
  {
    id: 'factory',
    name: 'مصنع',
    devices: [
      { id: '1', name: 'آلات ومعدات', power: 5000, quantity: 3, hoursPerDay: 10 },
      { id: '2', name: 'إضاءة صناعية', power: 100, quantity: 30, hoursPerDay: 12 },
      { id: '3', name: 'مكيفات', power: 2000, quantity: 5, hoursPerDay: 10 },
    ],
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    devices: [
      { id: '1', name: 'معدات طبية', power: 1000, quantity: 2, hoursPerDay: 8 },
      { id: '2', name: 'ثلاجة أدوية', power: 150, quantity: 2, hoursPerDay: 24 },
      { id: '3', name: 'مكيفات', power: 1500, quantity: 5, hoursPerDay: 12 },
      { id: '4', name: 'إضاءة', power: 20, quantity: 30, hoursPerDay: 12 },
    ],
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    devices: [
      { id: '1', name: 'أجهزة طبية حيوية', power: 2000, quantity: 5, hoursPerDay: 24 },
      { id: '2', name: 'تكييف مركزي', power: 10000, quantity: 2, hoursPerDay: 24 },
      { id: '3', name: 'إضاءة عامة', power: 20, quantity: 100, hoursPerDay: 24 },
      { id: '4', name: 'مصاعد', power: 5000, quantity: 2, hoursPerDay: 12 },
    ],
  },
  {
    id: 'bakery',
    name: 'مخبز',
    devices: [
      { id: '1', name: 'عجانة كهربائية', power: 3000, quantity: 2, hoursPerDay: 6 },
      { id: '2', name: 'فرن كهربائي', power: 5000, quantity: 1, hoursPerDay: 8 },
      { id: '3', name: 'إضاءة', power: 20, quantity: 15, hoursPerDay: 12 },
      { id: '4', name: 'ثلاجة عرض', power: 400, quantity: 1, hoursPerDay: 24 },
    ],
  },
  {
    id: 'shop',
    name: 'دكان',
    devices: [
      { id: '1', name: 'إضاءة', power: 20, quantity: 5, hoursPerDay: 10 },
      { id: '2', name: 'ثلاجة عرض مشروبات', power: 300, quantity: 1, hoursPerDay: 24 },
      { id: '3', name: 'مروحة سقف', power: 75, quantity: 1, hoursPerDay: 10 },
      { id: '4', name: 'تلفزيون', power: 100, quantity: 1, hoursPerDay: 8 },
    ],
  },
  {
    id: 'workshop',
    name: 'ورشة',
    devices: [
      { id: '1', name: 'ماكينة لحام', power: 3000, quantity: 1, hoursPerDay: 4 },
      { id: '2', name: 'صاروخ جلخ', power: 800, quantity: 2, hoursPerDay: 3 },
      { id: '3', name: 'كمبروسر هواء', power: 1500, quantity: 1, hoursPerDay: 5 },
      { id: '4', name: 'إضاءة', power: 40, quantity: 10, hoursPerDay: 8 },
    ],
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    devices: [
      { id: '1', name: 'مضخة سطحية', power: 1000, quantity: 1, hoursPerDay: 5 },
    ],
  },
  {
    id: 'donkey',
    name: 'دونكي', // Water station/well
    devices: [
      { id: '1', name: 'مضخة غاطسة', power: 3000, quantity: 1, hoursPerDay: 8 },
      { id: '2', name: 'إضاءة', power: 20, quantity: 4, hoursPerDay: 12 },
    ],
  },
  {
    id: 'mosque',
    name: 'مسجد',
    devices: [
      { id: '1', name: 'مكيفات هواء', power: 2000, quantity: 4, hoursPerDay: 5 },
      { id: '2', name: 'إضاءة', power: 20, quantity: 40, hoursPerDay: 6 },
      { id: '3', name: 'مكبر صوت', power: 150, quantity: 1, hoursPerDay: 2 },
      { id: '4', name: 'مراوح', power: 75, quantity: 10, hoursPerDay: 5 },
    ],
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    devices: [
      { id: '1', name: 'ماكينة طباعة', power: 4000, quantity: 2, hoursPerDay: 8 },
      { id: '2', name: 'ماكينة قص ورق', power: 1500, quantity: 1, hoursPerDay: 4 },
      { id: '3', name: 'أجهزة كمبيوتر', power: 150, quantity: 3, hoursPerDay: 8 },
      { id: '4', name: 'مكيفات', power: 1500, quantity: 2, hoursPerDay: 10 },
      { id: '5', name: 'إضاءة', power: 40, quantity: 20, hoursPerDay: 10 },
    ],
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    devices: [
      { id: '1', name: 'ماكينة اسبريسو', power: 2500, quantity: 1, hoursPerDay: 12 },
      { id: '2', name: 'مطحنة قهوة', power: 300, quantity: 2, hoursPerDay: 4 },
      { id: '3', name: 'ثلاجة عرض حلويات', power: 400, quantity: 1, hoursPerDay: 24 },
      { id: '4', name: 'مكيفات', power: 1500, quantity: 2, hoursPerDay: 14 },
      { id: '5', name: 'إضاءة ديكور', power: 20, quantity: 30, hoursPerDay: 14 },
    ],
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    devices: [
      { id: '1', name: 'ثلاجات كبيرة', power: 800, quantity: 3, hoursPerDay: 24 },
      { id: '2', name: 'فريزر', power: 1000, quantity: 2, hoursPerDay: 24 },
      { id: '3', name: 'مكيفات', power: 2000, quantity: 4, hoursPerDay: 14 },
      { id: '4', name: 'إضاءة', power: 20, quantity: 50, hoursPerDay: 14 },
      { id: '5', name: 'مراوح شفط للمطبخ', power: 500, quantity: 2, hoursPerDay: 12 },
    ],
  },
  {
    id: 'hotel',
    name: 'فندق',
    devices: [
      { id: '1', name: 'مكيفات غرف', power: 1000, quantity: 20, hoursPerDay: 12 },
      { id: '2', name: 'إضاءة ممرات وغرف', power: 20, quantity: 150, hoursPerDay: 14 },
      { id: '3', name: 'ثلاجات صغيرة', power: 80, quantity: 20, hoursPerDay: 24 },
      { id: '4', name: 'تلفزيونات', power: 100, quantity: 20, hoursPerDay: 6 },
      { id: '5', name: 'مصعد', power: 5000, quantity: 1, hoursPerDay: 12 },
    ],
  },
  {
    id: 'bank',
    name: 'بنك',
    devices: [
      { id: '1', name: 'أجهزة كمبيوتر', power: 150, quantity: 15, hoursPerDay: 10 },
      { id: '2', name: 'صراف آلي (ATM)', power: 300, quantity: 2, hoursPerDay: 24 },
      { id: '3', name: 'مكيفات', power: 1500, quantity: 6, hoursPerDay: 12 },
      { id: '4', name: 'إضاءة', power: 20, quantity: 60, hoursPerDay: 12 },
      { id: '5', name: 'خوادم (سيرفرات)', power: 1000, quantity: 1, hoursPerDay: 24 },
    ],
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    devices: [
      { id: '1', name: 'ثلاجات عرض', power: 500, quantity: 8, hoursPerDay: 24 },
      { id: '2', name: 'فريزر عرض', power: 800, quantity: 4, hoursPerDay: 24 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 40, hoursPerDay: 16 },
      { id: '4', name: 'مكيفات', power: 2000, quantity: 4, hoursPerDay: 16 },
      { id: '5', name: 'أجهزة كاشير', power: 100, quantity: 3, hoursPerDay: 16 },
    ],
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    devices: [
      { id: '1', name: 'مضخات وقود', power: 750, quantity: 4, hoursPerDay: 12 },
      { id: '2', name: 'إضاءة خارجية', power: 100, quantity: 15, hoursPerDay: 12 },
      { id: '3', name: 'مكيفات (سوبر ماركت/مكتب)', power: 1500, quantity: 2, hoursPerDay: 24 },
      { id: '4', name: 'ثلاجات عرض', power: 500, quantity: 2, hoursPerDay: 24 },
    ],
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    devices: [
      { id: '1', name: 'معدات حفر وتكسير', power: 10000, quantity: 2, hoursPerDay: 10 },
      { id: '2', name: 'سيور ناقلة', power: 5000, quantity: 2, hoursPerDay: 12 },
      { id: '3', name: 'مضخات مياه ضخمة', power: 8000, quantity: 1, hoursPerDay: 8 },
      { id: '4', name: 'إضاءة كاشفة (كشافات)', power: 400, quantity: 20, hoursPerDay: 12 },
      { id: '5', name: 'مكاتب وسكن (مكيفات/إضاءة)', power: 10000, quantity: 1, hoursPerDay: 24 },
    ],
  },
];
