export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    appliances: [
      { id: '1', name: 'ماكينة صنع الثلج', power: 5000, quantity: 2, hours: 24 },
      { id: '2', name: 'إضاءة', power: 100, quantity: 10, hours: 12 },
      { id: '3', name: 'مكيف', power: 1500, quantity: 1, hours: 12 }
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    appliances: [
      { id: '1', name: 'حاسوب', power: 250, quantity: 10, hours: 8 },
      { id: '2', name: 'إضاءة', power: 40, quantity: 20, hours: 10 },
      { id: '3', name: 'مكيف', power: 1500, quantity: 4, hours: 8 },
      { id: '4', name: 'طابعة', power: 500, quantity: 2, hours: 2 }
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    appliances: [
      { id: '1', name: 'مضخة ماء', power: 2000, quantity: 1, hours: 6 },
      { id: '2', name: 'إضاءة خارجية', power: 100, quantity: 5, hours: 12 }
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    appliances: [
      { id: '1', name: 'مراوح تهوية', power: 500, quantity: 4, hours: 24 },
      { id: '2', name: 'إضاءة', power: 40, quantity: 20, hours: 16 },
      { id: '3', name: 'دفايات', power: 2000, quantity: 2, hours: 12 },
      { id: '4', name: 'نظام تغذية آلي', power: 1000, quantity: 1, hours: 4 }
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    appliances: [
      { id: '1', name: 'مراوح', power: 300, quantity: 2, hours: 12 },
      { id: '2', name: 'مضخة ري', power: 1500, quantity: 1, hours: 4 },
      { id: '3', name: 'إضاءة زراعية', power: 200, quantity: 10, hours: 8 }
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    appliances: [
      { id: '1', name: 'آلات صناعية', power: 10000, quantity: 2, hours: 12 },
      { id: '2', name: 'إضاءة', power: 100, quantity: 50, hours: 12 },
      { id: '3', name: 'مكيفات', power: 2000, quantity: 5, hours: 12 }
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    appliances: [
      { id: '1', name: 'مكيفات', power: 1500, quantity: 5, hours: 12 },
      { id: '2', name: 'إضاءة', power: 40, quantity: 30, hours: 12 },
      { id: '3', name: 'ثلاجة أدوية', power: 300, quantity: 2, hours: 24 },
      { id: '4', name: 'أجهزة طبية', power: 1000, quantity: 3, hours: 8 }
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    appliances: [
      { id: '1', name: 'أجهزة طبية ثقيلة', power: 5000, quantity: 5, hours: 24 },
      { id: '2', name: 'مكيفات مركزية', power: 10000, quantity: 2, hours: 24 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 200, hours: 24 },
      { id: '4', name: 'ثلاجات', power: 500, quantity: 10, hours: 24 }
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    appliances: [
      { id: '1', name: 'فرن كهربائي', power: 5000, quantity: 2, hours: 10 },
      { id: '2', name: 'عجانة', power: 2000, quantity: 2, hours: 6 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 10, hours: 12 },
      { id: '4', name: 'ثلاجة عرض', power: 800, quantity: 1, hours: 24 }
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    appliances: [
      { id: '1', name: 'ثلاجة', power: 400, quantity: 2, hours: 24 },
      { id: '2', name: 'إضاءة', power: 40, quantity: 4, hours: 12 },
      { id: '3', name: 'مروحة', power: 80, quantity: 1, hours: 12 }
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    appliances: [
      { id: '1', name: 'ماكينة لحام', power: 3000, quantity: 1, hours: 4 },
      { id: '2', name: 'صاروخ جلخ', power: 1000, quantity: 2, hours: 4 },
      { id: '3', name: 'إضاءة', power: 100, quantity: 5, hours: 10 }
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة مياه',
    appliances: [
      { id: '1', name: 'مضخة مياه غاطسة', power: 2200, quantity: 1, hours: 8 }
    ]
  },
  {
    id: 'donkey_pump',
    name: 'دونكي',
    appliances: [
      { id: '1', name: 'مضخة بئر', power: 1500, quantity: 1, hours: 10 }
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    appliances: [
      { id: '1', name: 'مكيف', power: 2000, quantity: 4, hours: 4 },
      { id: '2', name: 'مراوح', power: 80, quantity: 10, hours: 4 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 20, hours: 4 },
      { id: '4', name: 'مكبر صوت', power: 100, quantity: 1, hours: 2 }
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    appliances: [
      { id: '1', name: 'آلة طباعة', power: 3000, quantity: 2, hours: 8 },
      { id: '2', name: 'حاسوب', power: 250, quantity: 3, hours: 8 },
      { id: '3', name: 'مكيف', power: 1500, quantity: 2, hours: 8 },
      { id: '4', name: 'إضاءة', power: 40, quantity: 15, hours: 8 }
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    appliances: [
      { id: '1', name: 'آلة إسبريسو', power: 3500, quantity: 1, hours: 12 },
      { id: '2', name: 'طاحونة قهوة', power: 500, quantity: 2, hours: 4 },
      { id: '3', name: 'ثلاجة عرض', power: 600, quantity: 1, hours: 24 },
      { id: '4', name: 'مكيف', power: 1500, quantity: 2, hours: 12 },
      { id: '5', name: 'إضاءة', power: 40, quantity: 15, hours: 12 }
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    appliances: [
      { id: '1', name: 'ثلاجة كبيرة', power: 1000, quantity: 2, hours: 24 },
      { id: '2', name: 'فريزر', power: 800, quantity: 2, hours: 24 },
      { id: '3', name: 'مكيف', power: 2000, quantity: 4, hours: 14 },
      { id: '4', name: 'إضاءة', power: 40, quantity: 30, hours: 14 }
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    appliances: [
      { id: '1', name: 'مكيفات غرف', power: 1200, quantity: 20, hours: 12 },
      { id: '2', name: 'إضاءة', power: 40, quantity: 100, hours: 12 },
      { id: '3', name: 'ثلاجات غرف', power: 100, quantity: 20, hours: 24 },
      { id: '4', name: 'مصعد', power: 5000, quantity: 1, hours: 4 }
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    appliances: [
      { id: '1', name: 'حواسيب', power: 250, quantity: 15, hours: 10 },
      { id: '2', name: 'صراف آلي (ATM)', power: 300, quantity: 2, hours: 24 },
      { id: '3', name: 'مكيفات', power: 2000, quantity: 4, hours: 10 },
      { id: '4', name: 'إضاءة', power: 40, quantity: 40, hours: 10 }
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    appliances: [
      { id: '1', name: 'ثلاجة عرض', power: 1200, quantity: 5, hours: 24 },
      { id: '2', name: 'فريزر', power: 1000, quantity: 3, hours: 24 },
      { id: '3', name: 'مكيف', power: 2000, quantity: 4, hours: 16 },
      { id: '4', name: 'إضاءة', power: 40, quantity: 50, hours: 16 },
      { id: '5', name: 'كاشير', power: 150, quantity: 3, hours: 16 }
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    appliances: [
      { id: '1', name: 'مضخة وقود', power: 1500, quantity: 4, hours: 10 },
      { id: '2', name: 'إضاءة خارجية', power: 200, quantity: 6, hours: 12 },
      { id: '3', name: 'مكيف بقالة', power: 1500, quantity: 1, hours: 24 }
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    appliances: [
      { id: '1', name: 'آلات حفر/طحن', power: 15000, quantity: 2, hours: 12 },
      { id: '2', name: 'مضخة مياه', power: 5000, quantity: 1, hours: 12 },
      { id: '3', name: 'إضاءة كاشفة', power: 1000, quantity: 5, hours: 12 },
      { id: '4', name: 'مكيف كرفان', power: 1500, quantity: 4, hours: 12 }
    ]
  }
];
