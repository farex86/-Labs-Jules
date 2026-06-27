// Pre-defined consumption patterns for different facility types (in Arabic)

export const FACILITY_TEMPLATES = {
  ice_factory: {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    appliances: [
      { id: '1', name: 'ماكينة تصنيع الثلج', powerWatts: 5000, quantity: 2, hoursPerDay: 20 },
      { id: '2', name: 'غرفة تبريد', powerWatts: 3000, quantity: 1, hoursPerDay: 24 },
      { id: '3', name: 'إضاءة', powerWatts: 50, quantity: 10, hoursPerDay: 12 },
    ]
  },
  company: {
    id: 'company',
    name: 'شركة',
    appliances: [
      { id: '1', name: 'مكيفات اسبليت', powerWatts: 1500, quantity: 5, hoursPerDay: 8 },
      { id: '2', name: 'أجهزة كمبيوتر', powerWatts: 200, quantity: 20, hoursPerDay: 8 },
      { id: '3', name: 'إضاءة', powerWatts: 40, quantity: 30, hoursPerDay: 10 },
      { id: '4', name: 'طابعة/آلة تصوير', powerWatts: 800, quantity: 2, hoursPerDay: 2 },
    ]
  },
  farm: {
    id: 'farm',
    name: 'مزرعة',
    appliances: [
      { id: '1', name: 'مضخة غاطسة', powerWatts: 2200, quantity: 1, hoursPerDay: 6 },
      { id: '2', name: 'إضاءة محيطية', powerWatts: 100, quantity: 10, hoursPerDay: 12 },
      { id: '3', name: 'سكن العمال (مراوح وإضاءة)', powerWatts: 500, quantity: 1, hoursPerDay: 12 },
    ]
  },
  poultry_farm: {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    appliances: [
      { id: '1', name: 'مراوح شفط', powerWatts: 750, quantity: 6, hoursPerDay: 24 },
      { id: '2', name: 'نظام تبريد صحراوي', powerWatts: 1500, quantity: 2, hoursPerDay: 24 },
      { id: '3', name: 'إضاءة', powerWatts: 40, quantity: 50, hoursPerDay: 16 },
      { id: '4', name: 'محركات خطوط العلف', powerWatts: 500, quantity: 2, hoursPerDay: 4 },
    ]
  },
  greenhouse: {
    id: 'greenhouse',
    name: 'بيوت محمية',
    appliances: [
      { id: '1', name: 'مراوح شفط', powerWatts: 750, quantity: 4, hoursPerDay: 12 },
      { id: '2', name: 'مضخات ري', powerWatts: 1500, quantity: 1, hoursPerDay: 4 },
      { id: '3', name: 'نظام تبريد', powerWatts: 1000, quantity: 2, hoursPerDay: 12 },
    ]
  },
  factory: {
    id: 'factory',
    name: 'مصنع',
    appliances: [
      { id: '1', name: 'آلات إنتاج', powerWatts: 10000, quantity: 3, hoursPerDay: 16 },
      { id: '2', name: 'إضاءة المصنع', powerWatts: 100, quantity: 50, hoursPerDay: 16 },
      { id: '3', name: 'مكيفات مكاتب', powerWatts: 1500, quantity: 4, hoursPerDay: 8 },
    ]
  },
  clinic: {
    id: 'clinic',
    name: 'مستوصف',
    appliances: [
      { id: '1', name: 'إضاءة', powerWatts: 40, quantity: 40, hoursPerDay: 16 },
      { id: '2', name: 'مكيفات', powerWatts: 1500, quantity: 8, hoursPerDay: 16 },
      { id: '3', name: 'ثلاجة أدوية', powerWatts: 300, quantity: 2, hoursPerDay: 24 },
      { id: '4', name: 'أجهزة طبية (متوسط)', powerWatts: 1000, quantity: 3, hoursPerDay: 6 },
    ]
  },
  hospital: {
    id: 'hospital',
    name: 'مستشفى',
    appliances: [
      { id: '1', name: 'نظام تكييف مركزي', powerWatts: 20000, quantity: 2, hoursPerDay: 24 },
      { id: '2', name: 'إضاءة', powerWatts: 40, quantity: 200, hoursPerDay: 24 },
      { id: '3', name: 'أجهزة طبية حيوية', powerWatts: 5000, quantity: 1, hoursPerDay: 24 },
      { id: '4', name: 'ثلاجات بنك الدم/أدوية', powerWatts: 500, quantity: 5, hoursPerDay: 24 },
    ]
  },
  bakery: {
    id: 'bakery',
    name: 'مخبز',
    appliances: [
      { id: '1', name: 'عجانات', powerWatts: 3000, quantity: 2, hoursPerDay: 8 },
      { id: '2', name: 'أفران كهربائية (إذا وجدت)', powerWatts: 5000, quantity: 2, hoursPerDay: 12 },
      { id: '3', name: 'إضاءة', powerWatts: 50, quantity: 10, hoursPerDay: 14 },
    ]
  },
  shop: {
    id: 'shop',
    name: 'دكان',
    appliances: [
      { id: '1', name: 'إضاءة', powerWatts: 40, quantity: 6, hoursPerDay: 12 },
      { id: '2', name: 'ثلاجة عرض', powerWatts: 500, quantity: 2, hoursPerDay: 24 },
      { id: '3', name: 'مروحة سقف', powerWatts: 80, quantity: 2, hoursPerDay: 12 },
    ]
  },
  workshop: {
    id: 'workshop',
    name: 'ورشة',
    appliances: [
      { id: '1', name: 'ماكينة لحام', powerWatts: 4000, quantity: 1, hoursPerDay: 4 },
      { id: '2', name: 'كمبروسر هواء', powerWatts: 2000, quantity: 1, hoursPerDay: 4 },
      { id: '3', name: 'صواريخ قطعية/جلخ', powerWatts: 1000, quantity: 2, hoursPerDay: 3 },
      { id: '4', name: 'إضاءة كاشفة', powerWatts: 150, quantity: 4, hoursPerDay: 6 },
    ]
  },
  water_pump: {
    id: 'water_pump',
    name: 'مضخة موية',
    appliances: [
      { id: '1', name: 'مضخة سطحية/غاطسة', powerWatts: 1500, quantity: 1, hoursPerDay: 8 },
    ]
  },
  donkey: {
    id: 'donkey',
    name: 'دونكي (محطة مياه)',
    appliances: [
      { id: '1', name: 'مضخة رئيسية', powerWatts: 5500, quantity: 1, hoursPerDay: 10 },
      { id: '2', name: 'إضاءة محيطية', powerWatts: 100, quantity: 4, hoursPerDay: 12 },
    ]
  },
  mosque: {
    id: 'mosque',
    name: 'مسجد',
    appliances: [
      { id: '1', name: 'إضاءة', powerWatts: 40, quantity: 30, hoursPerDay: 6 },
      { id: '2', name: 'مراوح', powerWatts: 80, quantity: 20, hoursPerDay: 6 },
      { id: '3', name: 'مكيفات', powerWatts: 1500, quantity: 6, hoursPerDay: 4 },
      { id: '4', name: 'نظام صوتي', powerWatts: 200, quantity: 1, hoursPerDay: 2 },
    ]
  },
  printing_press: {
    id: 'printing_press',
    name: 'مطبعة',
    appliances: [
      { id: '1', name: 'آلات طباعة', powerWatts: 5000, quantity: 2, hoursPerDay: 8 },
      { id: '2', name: 'آلات قص وتجليد', powerWatts: 2000, quantity: 1, hoursPerDay: 4 },
      { id: '3', name: 'إضاءة', powerWatts: 50, quantity: 20, hoursPerDay: 10 },
      { id: '4', name: 'مكيفات', powerWatts: 1500, quantity: 3, hoursPerDay: 10 },
    ]
  },
  coffee_shop: {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    appliances: [
      { id: '1', name: 'ماكينة إسبريسو', powerWatts: 3000, quantity: 1, hoursPerDay: 12 },
      { id: '2', name: 'ثلاجات عرض', powerWatts: 600, quantity: 2, hoursPerDay: 24 },
      { id: '3', name: 'مكيفات', powerWatts: 1500, quantity: 2, hoursPerDay: 14 },
      { id: '4', name: 'إضاءة ديكور', powerWatts: 200, quantity: 1, hoursPerDay: 14 },
    ]
  },
  restaurant: {
    id: 'restaurant',
    name: 'مطعم',
    appliances: [
      { id: '1', name: 'ثلاجات وفريزرات', powerWatts: 800, quantity: 4, hoursPerDay: 24 },
      { id: '2', name: 'مراوح شفط مطبخ', powerWatts: 1000, quantity: 2, hoursPerDay: 14 },
      { id: '3', name: 'مكيفات صالة الطعام', powerWatts: 2000, quantity: 4, hoursPerDay: 14 },
      { id: '4', name: 'إضاءة', powerWatts: 50, quantity: 40, hoursPerDay: 14 },
    ]
  },
  hotel: {
    id: 'hotel',
    name: 'فندق',
    appliances: [
      { id: '1', name: 'مكيفات غرف', powerWatts: 1200, quantity: 20, hoursPerDay: 12 },
      { id: '2', name: 'إضاءة عامة وغرف', powerWatts: 40, quantity: 100, hoursPerDay: 12 },
      { id: '3', name: 'مصاعد', powerWatts: 7500, quantity: 1, hoursPerDay: 6 },
      { id: '4', name: 'ثلاجات صغيرة', powerWatts: 150, quantity: 20, hoursPerDay: 24 },
    ]
  },
  bank: {
    id: 'bank',
    name: 'بنك',
    appliances: [
      { id: '1', name: 'تكييف مركزي/اسبليت', powerWatts: 10000, quantity: 1, hoursPerDay: 10 },
      { id: '2', name: 'أجهزة كمبيوتر وسيرفرات', powerWatts: 3000, quantity: 1, hoursPerDay: 24 },
      { id: '3', name: 'إضاءة', powerWatts: 40, quantity: 60, hoursPerDay: 10 },
      { id: '4', name: 'صراف آلي (ATM)', powerWatts: 500, quantity: 2, hoursPerDay: 24 },
    ]
  },
  supermarket: {
    id: 'supermarket',
    name: 'سوبر ماركت',
    appliances: [
      { id: '1', name: 'ثلاجات عرض (ألبان/لحوم)', powerWatts: 1500, quantity: 5, hoursPerDay: 24 },
      { id: '2', name: 'فريزرات', powerWatts: 1000, quantity: 3, hoursPerDay: 24 },
      { id: '3', name: 'مكيفات', powerWatts: 2000, quantity: 4, hoursPerDay: 16 },
      { id: '4', name: 'إضاءة', powerWatts: 50, quantity: 50, hoursPerDay: 16 },
    ]
  },
  gas_station: {
    id: 'gas_station',
    name: 'طرمبة وقود',
    appliances: [
      { id: '1', name: 'مضخات وقود', powerWatts: 1000, quantity: 4, hoursPerDay: 10 },
      { id: '2', name: 'إضاءة المظلة', powerWatts: 150, quantity: 10, hoursPerDay: 12 },
      { id: '3', name: 'مكيفات (سوبرماركت/إدارة)', powerWatts: 1500, quantity: 2, hoursPerDay: 14 },
      { id: '4', name: 'ثلاجات العرض', powerWatts: 500, quantity: 3, hoursPerDay: 24 },
    ]
  },
  mining_company: {
    id: 'mining_company',
    name: 'شركة تعدين',
    appliances: [
      { id: '1', name: 'آلات التكسير/طواحين', powerWatts: 15000, quantity: 2, hoursPerDay: 16 },
      { id: '2', name: 'مضخات مياه كبيرة', powerWatts: 5000, quantity: 2, hoursPerDay: 12 },
      { id: '3', name: 'إضاءة كاشفة محيطية', powerWatts: 400, quantity: 20, hoursPerDay: 12 },
      { id: '4', name: 'سكن عمال وإدارة', powerWatts: 5000, quantity: 1, hoursPerDay: 24 },
    ]
  }
};
