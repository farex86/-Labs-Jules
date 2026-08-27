export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    appliances: [
      { name: 'آلة صنع الثلج', quantity: 1, power: 5000, hours: 24 },
      { name: 'غرفة تبريد', quantity: 1, power: 3000, hours: 24 },
      { name: 'إضاءة', quantity: 10, power: 40, hours: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    appliances: [
      { name: 'مكيف', quantity: 5, power: 1500, hours: 8 },
      { name: 'كمبيوتر', quantity: 15, power: 300, hours: 8 },
      { name: 'طابعة', quantity: 2, power: 500, hours: 2 },
      { name: 'إضاءة', quantity: 30, power: 20, hours: 10 },
      { name: 'ثلاجة صغيرة', quantity: 1, power: 200, hours: 24 }
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    appliances: [
      { name: 'مضخة ماء', quantity: 1, power: 2200, hours: 6 },
      { name: 'إضاءة محيطية', quantity: 10, power: 50, hours: 12 },
      { name: 'تلفزيون', quantity: 1, power: 100, hours: 4 },
      { name: 'ثلاجة', quantity: 1, power: 300, hours: 24 }
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    appliances: [
      { name: 'مراوح تهوية', quantity: 4, power: 750, hours: 16 },
      { name: 'إضاءة', quantity: 20, power: 40, hours: 12 },
      { name: 'مضخة ماء', quantity: 1, power: 1500, hours: 4 },
      { name: 'سخان حضانات', quantity: 4, power: 1000, hours: 8 }
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    appliances: [
      { name: 'مضخة ري', quantity: 1, power: 1500, hours: 4 },
      { name: 'مراوح تبريد', quantity: 2, power: 500, hours: 10 },
      { name: 'إضاءة', quantity: 10, power: 40, hours: 6 }
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    appliances: [
      { name: 'آلات تصنيع', quantity: 3, power: 5000, hours: 8 },
      { name: 'إضاءة', quantity: 40, power: 50, hours: 10 },
      { name: 'مكيف', quantity: 4, power: 2000, hours: 8 },
      { name: 'مكاتب (كمبيوترات)', quantity: 5, power: 300, hours: 8 }
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    appliances: [
      { name: 'إضاءة', quantity: 20, power: 40, hours: 12 },
      { name: 'مكيف', quantity: 6, power: 1500, hours: 12 },
      { name: 'أجهزة طبية', quantity: 4, power: 1000, hours: 6 },
      { name: 'ثلاجة أدوية', quantity: 2, power: 300, hours: 24 },
      { name: 'كمبيوتر', quantity: 5, power: 300, hours: 12 }
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    appliances: [
      { name: 'إضاءة', quantity: 100, power: 40, hours: 24 },
      { name: 'مكيف مركزي', quantity: 2, power: 15000, hours: 24 },
      { name: 'أجهزة طبية ثقيلة', quantity: 10, power: 2000, hours: 8 },
      { name: 'ثلاجة أدوية', quantity: 10, power: 300, hours: 24 },
      { name: 'كمبيوتر', quantity: 20, power: 300, hours: 24 }
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    appliances: [
      { name: 'عجانة', quantity: 2, power: 3000, hours: 6 },
      { name: 'فرن كهربائي', quantity: 2, power: 10000, hours: 8 },
      { name: 'إضاءة', quantity: 10, power: 40, hours: 12 },
      { name: 'مكيف', quantity: 1, power: 1500, hours: 10 }
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    appliances: [
      { name: 'إضاءة', quantity: 4, power: 20, hours: 10 },
      { name: 'ثلاجة عرض', quantity: 1, power: 500, hours: 24 },
      { name: 'مروحة', quantity: 1, power: 75, hours: 10 }
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    appliances: [
      { name: 'ماكينة لحام', quantity: 1, power: 4000, hours: 4 },
      { name: 'صاروخ جلخ', quantity: 2, power: 1200, hours: 3 },
      { name: 'شنيور', quantity: 2, power: 800, hours: 3 },
      { name: 'إضاءة', quantity: 6, power: 50, hours: 8 }
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة مياه',
    appliances: [
      { name: 'مضخة غاطسة', quantity: 1, power: 2200, hours: 8 }
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي', // Water station/well typical in some regions
    appliances: [
      { name: 'مضخة ماء بئر', quantity: 1, power: 3000, hours: 10 },
      { name: 'إضاءة', quantity: 2, power: 40, hours: 12 }
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    appliances: [
      { name: 'إضاءة', quantity: 20, power: 40, hours: 4 },
      { name: 'مكيف', quantity: 6, power: 2000, hours: 4 },
      { name: 'مروحة', quantity: 10, power: 75, hours: 4 },
      { name: 'مكبر صوت', quantity: 2, power: 200, hours: 2 },
      { name: 'مضخة ماء', quantity: 1, power: 750, hours: 2 }
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    appliances: [
      { name: 'ماكينة طباعة', quantity: 2, power: 5000, hours: 8 },
      { name: 'ماكينة قص ورق', quantity: 1, power: 1500, hours: 4 },
      { name: 'كمبيوتر', quantity: 3, power: 300, hours: 8 },
      { name: 'إضاءة', quantity: 15, power: 40, hours: 10 },
      { name: 'مكيف', quantity: 2, power: 2000, hours: 8 }
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    appliances: [
      { name: 'ماكينة قهوة إسببريسو', quantity: 1, power: 3000, hours: 8 },
      { name: 'طاحونة قهوة', quantity: 2, power: 350, hours: 4 },
      { name: 'ثلاجة عرض', quantity: 1, power: 600, hours: 24 },
      { name: 'إضاءة', quantity: 15, power: 30, hours: 12 },
      { name: 'مكيف', quantity: 2, power: 1500, hours: 12 }
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    appliances: [
      { name: 'ثلاجة كبيرة', quantity: 2, power: 800, hours: 24 },
      { name: 'فريزر', quantity: 1, power: 600, hours: 24 },
      { name: 'إضاءة', quantity: 20, power: 40, hours: 14 },
      { name: 'مكيف', quantity: 4, power: 2000, hours: 14 },
      { name: 'خلاط', quantity: 2, power: 500, hours: 2 }
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    appliances: [
      { name: 'مكيفات غرف', quantity: 20, power: 1200, hours: 12 },
      { name: 'إضاءة غرف وممرات', quantity: 100, power: 20, hours: 12 },
      { name: 'ثلاجات غرف صغيرة', quantity: 20, power: 100, hours: 24 },
      { name: 'مصعد', quantity: 1, power: 5000, hours: 4 },
      { name: 'مضخة ماء', quantity: 2, power: 1500, hours: 6 }
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    appliances: [
      { name: 'كمبيوتر', quantity: 15, power: 300, hours: 10 },
      { name: 'ماكينة صراف آلي (ATM)', quantity: 2, power: 500, hours: 24 },
      { name: 'إضاءة', quantity: 30, power: 40, hours: 12 },
      { name: 'مكيف', quantity: 5, power: 2000, hours: 12 },
      { name: 'سيرفر', quantity: 1, power: 800, hours: 24 }
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    appliances: [
      { name: 'ثلاجة عرض تبريد', quantity: 5, power: 1000, hours: 24 },
      { name: 'ثلاجة عرض تجميد', quantity: 3, power: 1200, hours: 24 },
      { name: 'إضاءة', quantity: 40, power: 40, hours: 14 },
      { name: 'مكيف', quantity: 4, power: 2000, hours: 14 },
      { name: 'كمبيوتر كاشير', quantity: 3, power: 200, hours: 14 }
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    appliances: [
      { name: 'مضخة وقود', quantity: 4, power: 1000, hours: 10 },
      { name: 'إضاءة خارجية', quantity: 10, power: 100, hours: 12 },
      { name: 'إضاءة مكاتب', quantity: 5, power: 40, hours: 12 },
      { name: 'مكيف مكتب', quantity: 1, power: 1500, hours: 12 }
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    appliances: [
      { name: 'آلات تعدين (كسارات/طواحين)', quantity: 2, power: 20000, hours: 12 },
      { name: 'مضخة سحب مياه', quantity: 2, power: 3000, hours: 12 },
      { name: 'إضاءة كاشفة', quantity: 10, power: 400, hours: 12 },
      { name: 'مكيفات مكاتب/سكن', quantity: 10, power: 1500, hours: 12 },
      { name: 'معدات ورشة صيانة', quantity: 1, power: 5000, hours: 4 }
    ]
  }
];
