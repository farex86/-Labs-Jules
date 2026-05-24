export const CONSUMPTION_PATTERNS = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج',
    defaultDevices: [
      { id: 1, name: 'ماكينة ثلج كبيرة', power: 5000, quantity: 2, hours: 24 },
      { id: 2, name: 'غرفة تبريد', power: 3000, quantity: 1, hours: 24 },
      { id: 3, name: 'إضاءة', power: 100, quantity: 10, hours: 12 },
    ],
  },
  {
    id: 'company',
    name: 'شركة',
    defaultDevices: [
      { id: 1, name: 'مكيف', power: 1500, quantity: 4, hours: 10 },
      { id: 2, name: 'كمبيوتر', power: 250, quantity: 10, hours: 10 },
      { id: 3, name: 'طابعة', power: 500, quantity: 2, hours: 2 },
      { id: 4, name: 'إضاءة', power: 40, quantity: 20, hours: 10 },
    ],
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultDevices: [
      { id: 1, name: 'طلمبة ري', power: 3000, quantity: 1, hours: 6 },
      { id: 2, name: 'إضاءة محيطية', power: 100, quantity: 5, hours: 12 },
    ],
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultDevices: [
      { id: 1, name: 'مراوح تهوية', power: 500, quantity: 10, hours: 24 },
      { id: 2, name: 'نظام تدفئة/تبريد', power: 2000, quantity: 2, hours: 12 },
      { id: 3, name: 'إضاءة', power: 40, quantity: 20, hours: 18 },
    ],
  },
  {
    id: 'greenhouses',
    name: 'بيوت محمية',
    defaultDevices: [
      { id: 1, name: 'مضخة مياه', power: 1500, quantity: 2, hours: 4 },
      { id: 2, name: 'مراوح تهوية', power: 400, quantity: 8, hours: 12 },
    ],
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultDevices: [
      { id: 1, name: 'ماكينات إنتاج', power: 10000, quantity: 3, hours: 12 },
      { id: 2, name: 'إضاءة', power: 100, quantity: 30, hours: 12 },
    ],
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultDevices: [
      { id: 1, name: 'مكيف', power: 1500, quantity: 6, hours: 12 },
      { id: 2, name: 'أجهزة طبية', power: 2000, quantity: 3, hours: 8 },
      { id: 3, name: 'ثلاجة أدوية', power: 300, quantity: 2, hours: 24 },
      { id: 4, name: 'إضاءة', power: 40, quantity: 30, hours: 14 },
    ],
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    defaultDevices: [
      { id: 1, name: 'مكيف مركزي', power: 15000, quantity: 2, hours: 24 },
      { id: 2, name: 'أجهزة عناية مركزة', power: 3000, quantity: 10, hours: 24 },
      { id: 3, name: 'ثلاجات دماء وأدوية', power: 500, quantity: 5, hours: 24 },
      { id: 4, name: 'مصاعد', power: 5000, quantity: 2, hours: 12 },
    ],
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultDevices: [
      { id: 1, name: 'فرن كهربائي', power: 8000, quantity: 1, hours: 10 },
      { id: 2, name: 'عجانة', power: 3000, quantity: 2, hours: 6 },
      { id: 3, name: 'إضاءة', power: 60, quantity: 10, hours: 12 },
    ],
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultDevices: [
      { id: 1, name: 'ثلاجة عرض', power: 600, quantity: 2, hours: 24 },
      { id: 2, name: 'مكيف', power: 1500, quantity: 1, hours: 12 },
      { id: 3, name: 'إضاءة', power: 40, quantity: 5, hours: 12 },
    ],
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultDevices: [
      { id: 1, name: 'ماكينة لحام', power: 4000, quantity: 1, hours: 4 },
      { id: 2, name: 'صاروخ جلخ', power: 1000, quantity: 2, hours: 4 },
      { id: 3, name: 'كمبريسور هواء', power: 2000, quantity: 1, hours: 6 },
    ],
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    defaultDevices: [
      { id: 1, name: 'غاطس مياه', power: 2500, quantity: 1, hours: 8 },
    ],
  },
  {
    id: 'donkey_engine',
    name: 'دونكي', // Water station/well in some Arabic dialects
    defaultDevices: [
      { id: 1, name: 'مضخة مياه كبيرة', power: 5000, quantity: 1, hours: 10 },
    ],
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultDevices: [
      { id: 1, name: 'مكيف', power: 1500, quantity: 6, hours: 5 },
      { id: 2, name: 'مكبر صوت', power: 200, quantity: 1, hours: 2 },
      { id: 3, name: 'إضاءة', power: 40, quantity: 30, hours: 5 },
      { id: 4, name: 'مروحة', power: 80, quantity: 15, hours: 5 },
    ],
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultDevices: [
      { id: 1, name: 'ماكينة طباعة', power: 5000, quantity: 2, hours: 8 },
      { id: 2, name: 'ماكينة قص', power: 1500, quantity: 1, hours: 4 },
      { id: 3, name: 'مكيف', power: 1500, quantity: 2, hours: 10 },
    ],
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultDevices: [
      { id: 1, name: 'ماكينة اسبريسو', power: 3000, quantity: 1, hours: 14 },
      { id: 2, name: 'ثلاجة عرض', power: 500, quantity: 2, hours: 24 },
      { id: 3, name: 'مكيف', power: 1500, quantity: 2, hours: 14 },
      { id: 4, name: 'إضاءة', power: 40, quantity: 15, hours: 14 },
    ],
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultDevices: [
      { id: 1, name: 'مكيف', power: 1500, quantity: 4, hours: 14 },
      { id: 2, name: 'ثلاجة كبيرة', power: 800, quantity: 3, hours: 24 },
      { id: 3, name: 'شفاط هواء', power: 1000, quantity: 2, hours: 14 },
      { id: 4, name: 'إضاءة', power: 40, quantity: 20, hours: 14 },
    ],
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultDevices: [
      { id: 1, name: 'مكيفات غرف', power: 1500, quantity: 50, hours: 12 },
      { id: 2, name: 'إضاءة ممرات', power: 40, quantity: 100, hours: 24 },
      { id: 3, name: 'ثلاجات غرف', power: 100, quantity: 50, hours: 24 },
      { id: 4, name: 'مصعد', power: 5000, quantity: 2, hours: 12 },
    ],
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultDevices: [
      { id: 1, name: 'مكيف مركزي', power: 10000, quantity: 1, hours: 10 },
      { id: 2, name: 'كمبيوتر', power: 250, quantity: 20, hours: 10 },
      { id: 3, name: 'ماكينة صراف آلي', power: 400, quantity: 3, hours: 24 },
      { id: 4, name: 'إضاءة', power: 40, quantity: 40, hours: 10 },
    ],
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultDevices: [
      { id: 1, name: 'ثلاجة عرض ألبان', power: 1200, quantity: 4, hours: 24 },
      { id: 2, name: 'فريزر', power: 800, quantity: 5, hours: 24 },
      { id: 3, name: 'مكيف', power: 1500, quantity: 4, hours: 16 },
      { id: 4, name: 'إضاءة', power: 60, quantity: 30, hours: 16 },
    ],
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultDevices: [
      { id: 1, name: 'مضخة وقود', power: 1000, quantity: 6, hours: 12 },
      { id: 2, name: 'إضاءة مظلة', power: 150, quantity: 10, hours: 12 },
      { id: 3, name: 'مكيف مكتب', power: 1500, quantity: 1, hours: 16 },
    ],
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultDevices: [
      { id: 1, name: 'كسارة', power: 20000, quantity: 1, hours: 12 },
      { id: 2, name: 'مضخة غسيل', power: 5000, quantity: 2, hours: 10 },
      { id: 3, name: 'إضاءة كشافات', power: 500, quantity: 10, hours: 12 },
    ],
  },
];
