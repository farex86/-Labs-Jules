/**
 * facilityPatterns.js
 * Contains the consumption patterns and default devices for various facility types.
 * Separates the configuration data from the UI component.
 */

export const facilityPatterns = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج (Ice Factory)',
    devices: [
      { id: '1', name: 'ماكينة تصنيع الثلج', power: 5000, quantity: 2, hours: 24 },
      { id: '2', name: 'غرفة تبريد', power: 3000, quantity: 1, hours: 24 },
      { id: '3', name: 'إضاءة', power: 50, quantity: 10, hours: 12 },
    ],
  },
  {
    id: 'company',
    name: 'شركة (Company)',
    devices: [
      { id: '1', name: 'أجهزة كمبيوتر', power: 150, quantity: 10, hours: 8 },
      { id: '2', name: 'مكيفات', power: 1500, quantity: 4, hours: 8 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 20, hours: 10 },
      { id: '4', name: 'طابعة', power: 300, quantity: 1, hours: 2 },
    ],
  },
  {
    id: 'farm',
    name: 'مزرعة (Farm)',
    devices: [
      { id: '1', name: 'مضخة مياه سطحية', power: 1500, quantity: 1, hours: 6 },
      { id: '2', name: 'إضاءة محيطية', power: 100, quantity: 10, hours: 12 },
    ],
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن (Poultry Farm)',
    devices: [
      { id: '1', name: 'مراوح تهوية', power: 500, quantity: 4, hours: 24 },
      { id: '2', name: 'نظام تدفئة', power: 2000, quantity: 2, hours: 12 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 15, hours: 16 },
      { id: '4', name: 'مضخة مياه', power: 750, quantity: 1, hours: 4 },
    ],
  },
  {
    id: 'greenhouses',
    name: 'بيوت محمية (Greenhouses)',
    devices: [
      { id: '1', name: 'مضخة ري', power: 1100, quantity: 1, hours: 4 },
      { id: '2', name: 'مراوح تبريد', power: 750, quantity: 2, hours: 8 },
    ],
  },
  {
    id: 'factory',
    name: 'مصنع (Factory)',
    devices: [
      { id: '1', name: 'ماكينات إنتاج', power: 10000, quantity: 2, hours: 12 },
      { id: '2', name: 'إضاءة صناعية', power: 150, quantity: 20, hours: 12 },
    ],
  },
  {
    id: 'clinic',
    name: 'مستوصف (Clinic)',
    devices: [
      { id: '1', name: 'إضاءة', power: 40, quantity: 15, hours: 12 },
      { id: '2', name: 'مكيفات', power: 1500, quantity: 3, hours: 10 },
      { id: '3', name: 'ثلاجة أدوية', power: 300, quantity: 1, hours: 24 },
      { id: '4', name: 'أجهزة طبية صغيرة', power: 500, quantity: 2, hours: 6 },
    ],
  },
  {
    id: 'hospital',
    name: 'مستشفي (Hospital)',
    devices: [
      { id: '1', name: 'أجهزة طبية (عناية مركزة)', power: 2000, quantity: 5, hours: 24 },
      { id: '2', name: 'مكيفات مركزية', power: 15000, quantity: 2, hours: 24 },
      { id: '3', name: 'ثلاجات بنك الدم', power: 500, quantity: 2, hours: 24 },
      { id: '4', name: 'إضاءة', power: 40, quantity: 100, hours: 24 },
      { id: '5', name: 'مصاعد', power: 5000, quantity: 2, hours: 12 },
    ],
  },
  {
    id: 'bakery',
    name: 'مخبز (Bakery)',
    devices: [
      { id: '1', name: 'فرن كهربائي', power: 8000, quantity: 1, hours: 12 },
      { id: '2', name: 'عجانة', power: 1500, quantity: 2, hours: 8 },
      { id: '3', name: 'ثلاجة عرض', power: 600, quantity: 1, hours: 24 },
      { id: '4', name: 'إضاءة', power: 40, quantity: 10, hours: 14 },
    ],
  },
  {
    id: 'shop',
    name: 'دكان (Shop)',
    devices: [
      { id: '1', name: 'إضاءة', power: 20, quantity: 5, hours: 12 },
      { id: '2', name: 'ثلاجة', power: 300, quantity: 1, hours: 24 },
      { id: '3', name: 'مروحة', power: 75, quantity: 2, hours: 12 },
    ],
  },
  {
    id: 'workshop',
    name: 'ورشة (Workshop)',
    devices: [
      { id: '1', name: 'ماكينة لحام', power: 4000, quantity: 1, hours: 4 },
      { id: '2', name: 'صاروخ / دريل', power: 800, quantity: 2, hours: 6 },
      { id: '3', name: 'إضاءة', power: 100, quantity: 4, hours: 10 },
    ],
  },
  {
    id: 'water_pump',
    name: 'مضخة موية (Water Pump)',
    devices: [
      { id: '1', name: 'مضخة غاطسة', power: 2200, quantity: 1, hours: 8 },
    ],
  },
  {
    id: 'donkey',
    name: 'دونكي (Donkey - Water Station)',
    devices: [
      { id: '1', name: 'مضخة مياه', power: 3000, quantity: 1, hours: 10 },
      { id: '2', name: 'إضاءة بسيطة', power: 50, quantity: 2, hours: 12 },
    ],
  },
  {
    id: 'mosque',
    name: 'مسجد (Mosque)',
    devices: [
      { id: '1', name: 'مكيفات', power: 2000, quantity: 4, hours: 4 },
      { id: '2', name: 'مراوح', power: 80, quantity: 10, hours: 6 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 20, hours: 6 },
      { id: '4', name: 'مكبر صوت', power: 150, quantity: 1, hours: 3 },
    ],
  },
  {
    id: 'printing_press',
    name: 'مطبعة (Printing Press)',
    devices: [
      { id: '1', name: 'ماكينة طباعة', power: 3000, quantity: 2, hours: 10 },
      { id: '2', name: 'ماكينة قص', power: 1500, quantity: 1, hours: 6 },
      { id: '3', name: 'إضاءة', power: 80, quantity: 10, hours: 10 },
    ],
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب (Coffee Shop)',
    devices: [
      { id: '1', name: 'ماكينة قهوة إكسبرسو', power: 3500, quantity: 1, hours: 12 },
      { id: '2', name: 'ثلاجة عرض', power: 500, quantity: 2, hours: 24 },
      { id: '3', name: 'مكيف', power: 1500, quantity: 2, hours: 12 },
      { id: '4', name: 'إضاءة', power: 40, quantity: 15, hours: 12 },
    ],
  },
  {
    id: 'restaurant',
    name: 'مطعم (Restaurant)',
    devices: [
      { id: '1', name: 'ثلاجات', power: 600, quantity: 3, hours: 24 },
      { id: '2', name: 'فريزر', power: 800, quantity: 2, hours: 24 },
      { id: '3', name: 'مكيفات', power: 1500, quantity: 4, hours: 14 },
      { id: '4', name: 'إضاءة', power: 40, quantity: 20, hours: 14 },
    ],
  },
  {
    id: 'hotel',
    name: 'فندق (Hotel)',
    devices: [
      { id: '1', name: 'مكيفات', power: 1500, quantity: 20, hours: 16 },
      { id: '2', name: 'إضاءة غرف وممرات', power: 40, quantity: 50, hours: 12 },
      { id: '3', name: 'ثلاجات صغيرة', power: 100, quantity: 20, hours: 24 },
      { id: '4', name: 'سخانات مياه', power: 1500, quantity: 10, hours: 4 },
      { id: '5', name: 'مصعد', power: 5000, quantity: 1, hours: 12 },
    ],
  },
  {
    id: 'bank',
    name: 'بنك (Bank)',
    devices: [
      { id: '1', name: 'أجهزة كمبيوتر', power: 150, quantity: 15, hours: 9 },
      { id: '2', name: 'مكيفات', power: 1500, quantity: 5, hours: 9 },
      { id: '3', name: 'سيرفرات', power: 1000, quantity: 2, hours: 24 },
      { id: '4', name: 'إضاءة', power: 40, quantity: 30, hours: 10 },
      { id: '5', name: 'صراف آلي (ATM)', power: 300, quantity: 2, hours: 24 },
    ],
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت (Supermarket)',
    devices: [
      { id: '1', name: 'ثلاجات عرض', power: 800, quantity: 6, hours: 24 },
      { id: '2', name: 'فريزرات', power: 1000, quantity: 4, hours: 24 },
      { id: '3', name: 'مكيفات', power: 2000, quantity: 4, hours: 16 },
      { id: '4', name: 'إضاءة', power: 60, quantity: 30, hours: 16 },
      { id: '5', name: 'أجهزة كاشير', power: 100, quantity: 3, hours: 16 },
    ],
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود (Gas Station)',
    devices: [
      { id: '1', name: 'مضخات وقود', power: 1500, quantity: 4, hours: 18 },
      { id: '2', name: 'إضاءة خارجية', power: 200, quantity: 10, hours: 12 },
      { id: '3', name: 'مكيف مكتب', power: 1500, quantity: 1, hours: 12 },
    ],
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين (Mining Company)',
    devices: [
      { id: '1', name: 'كسارات', power: 15000, quantity: 1, hours: 10 },
      { id: '2', name: 'سيور ناقلة', power: 5000, quantity: 2, hours: 10 },
      { id: '3', name: 'مضخات مياه كبيرة', power: 7500, quantity: 1, hours: 8 },
      { id: '4', name: 'إضاءة كاشفة', power: 500, quantity: 10, hours: 12 },
    ],
  },
];
