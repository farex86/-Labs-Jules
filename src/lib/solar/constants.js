export const CONSUMPTION_PATTERNS = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    appliances: [
      { id: '1', name: 'ماكينة صنع الثلج', watts: 5000, quantity: 2, hours: 24 },
      { id: '2', name: 'إضاءة', watts: 20, quantity: 10, hours: 12 },
      { id: '3', name: 'ثلاجة حفظ', watts: 2000, quantity: 1, hours: 24 }
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    appliances: [
      { id: '1', name: 'مكيف هواء', watts: 1500, quantity: 4, hours: 8 },
      { id: '2', name: 'كمبيوتر', watts: 250, quantity: 10, hours: 8 },
      { id: '3', name: 'إضاءة', watts: 20, quantity: 20, hours: 10 },
      { id: '4', name: 'طابعة', watts: 500, quantity: 1, hours: 2 },
      { id: '5', name: 'ثلاجة صغيرة', watts: 150, quantity: 1, hours: 24 }
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    appliances: [
      { id: '1', name: 'مضخة غاطسة', watts: 2200, quantity: 1, hours: 6 },
      { id: '2', name: 'إضاءة محيطة', watts: 50, quantity: 10, hours: 10 },
      { id: '3', name: 'ثلاجة', watts: 300, quantity: 1, hours: 24 }
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    appliances: [
      { id: '1', name: 'مراوح شفط', watts: 750, quantity: 4, hours: 24 },
      { id: '2', name: 'إضاءة', watts: 20, quantity: 30, hours: 16 },
      { id: '3', name: 'نظام تغذية آلي', watts: 1000, quantity: 1, hours: 4 },
      { id: '4', name: 'دفاية', watts: 2000, quantity: 2, hours: 12 }
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    appliances: [
      { id: '1', name: 'مراوح تبريد', watts: 500, quantity: 4, hours: 12 },
      { id: '2', name: 'مضخة ري', watts: 1100, quantity: 1, hours: 4 },
      { id: '3', name: 'نظام ضباب', watts: 750, quantity: 1, hours: 4 }
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    appliances: [
      { id: '1', name: 'آلات تصنيع', watts: 10000, quantity: 2, hours: 16 },
      { id: '2', name: 'إضاءة صناعية', watts: 100, quantity: 40, hours: 16 },
      { id: '3', name: 'مكيفات مركزية', watts: 5000, quantity: 2, hours: 16 }
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    appliances: [
      { id: '1', name: 'مكيف هواء', watts: 1500, quantity: 6, hours: 12 },
      { id: '2', name: 'إضاءة', watts: 20, quantity: 30, hours: 12 },
      { id: '3', name: 'ثلاجة أدوية', watts: 200, quantity: 2, hours: 24 },
      { id: '4', name: 'أجهزة فحص', watts: 500, quantity: 4, hours: 8 }
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    appliances: [
      { id: '1', name: 'أجهزة طبية حيوية', watts: 1000, quantity: 10, hours: 24 },
      { id: '2', name: 'إضاءة', watts: 20, quantity: 200, hours: 24 },
      { id: '3', name: 'تكييف مركزي', watts: 20000, quantity: 1, hours: 24 },
      { id: '4', name: 'ثلاجات حفظ', watts: 500, quantity: 5, hours: 24 }
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    appliances: [
      { id: '1', name: 'فرن كهربائي', watts: 8000, quantity: 2, hours: 12 },
      { id: '2', name: 'عجانة', watts: 1500, quantity: 2, hours: 8 },
      { id: '3', name: 'إضاءة', watts: 20, quantity: 15, hours: 14 }
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    appliances: [
      { id: '1', name: 'إضاءة', watts: 20, quantity: 6, hours: 12 },
      { id: '2', name: 'ثلاجة عرض', watts: 400, quantity: 2, hours: 24 },
      { id: '3', name: 'مروحة/مكيف صغير', watts: 1000, quantity: 1, hours: 10 }
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    appliances: [
      { id: '1', name: 'ماكينة لحام', watts: 3000, quantity: 1, hours: 4 },
      { id: '2', name: 'صاروخ جلخ', watts: 800, quantity: 2, hours: 3 },
      { id: '3', name: 'إضاءة', watts: 50, quantity: 10, hours: 10 },
      { id: '4', name: 'كومبريسور هواء', watts: 2200, quantity: 1, hours: 5 }
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    appliances: [
      { id: '1', name: 'مضخة سطحية/غاطسة', watts: 1500, quantity: 1, hours: 8 }
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي',
    appliances: [
      { id: '1', name: 'مضخة بئر', watts: 2200, quantity: 1, hours: 10 }
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    appliances: [
      { id: '1', name: 'مكيف هواء', watts: 2000, quantity: 4, hours: 4 },
      { id: '2', name: 'مكبر صوت', watts: 200, quantity: 1, hours: 3 },
      { id: '3', name: 'إضاءة', watts: 20, quantity: 30, hours: 6 },
      { id: '4', name: 'برادة مياه', watts: 300, quantity: 2, hours: 24 }
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    appliances: [
      { id: '1', name: 'آلة طباعة', watts: 5000, quantity: 2, hours: 10 },
      { id: '2', name: 'مقص ورق كهربائي', watts: 1500, quantity: 1, hours: 4 },
      { id: '3', name: 'كمبيوتر', watts: 250, quantity: 3, hours: 10 },
      { id: '4', name: 'إضاءة', watts: 40, quantity: 20, hours: 10 }
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    appliances: [
      { id: '1', name: 'ماكينة اسبريسو', watts: 3500, quantity: 1, hours: 12 },
      { id: '2', name: 'مطحنة قهوة', watts: 400, quantity: 2, hours: 4 },
      { id: '3', name: 'ثلاجة عرض حلويات', watts: 500, quantity: 1, hours: 24 },
      { id: '4', name: 'مكيف هواء', watts: 2000, quantity: 2, hours: 14 },
      { id: '5', name: 'إضاءة ديكور', watts: 10, quantity: 40, hours: 14 }
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    appliances: [
      { id: '1', name: 'ثلاجة تجميد', watts: 1000, quantity: 2, hours: 24 },
      { id: '2', name: 'شفاط مطبخ', watts: 800, quantity: 2, hours: 14 },
      { id: '3', name: 'مكيف هواء', watts: 2500, quantity: 3, hours: 14 },
      { id: '4', name: 'إضاءة', watts: 20, quantity: 40, hours: 14 }
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    appliances: [
      { id: '1', name: 'مكيفات غرف', watts: 1500, quantity: 20, hours: 12 },
      { id: '2', name: 'إضاءة ممرات وغرف', watts: 20, quantity: 150, hours: 14 },
      { id: '3', name: 'سخان مياه', watts: 2000, quantity: 10, hours: 4 },
      { id: '4', name: 'مصعد', watts: 5000, quantity: 1, hours: 3 }
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    appliances: [
      { id: '1', name: 'كمبيوتر', watts: 250, quantity: 20, hours: 10 },
      { id: '2', name: 'صراف آلي (ATM)', watts: 300, quantity: 2, hours: 24 },
      { id: '3', name: 'تكييف مركزي', watts: 10000, quantity: 1, hours: 10 },
      { id: '4', name: 'إضاءة', watts: 20, quantity: 80, hours: 12 },
      { id: '5', name: 'خوادم (Servers)', watts: 1000, quantity: 1, hours: 24 }
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    appliances: [
      { id: '1', name: 'ثلاجة عرض ألبان', watts: 1200, quantity: 4, hours: 24 },
      { id: '2', name: 'فريزر آيس كريم/لحوم', watts: 800, quantity: 4, hours: 24 },
      { id: '3', name: 'مكيف هواء', watts: 3000, quantity: 4, hours: 16 },
      { id: '4', name: 'إضاءة', watts: 40, quantity: 50, hours: 16 },
      { id: '5', name: 'أجهزة كاشير', watts: 150, quantity: 3, hours: 16 }
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    appliances: [
      { id: '1', name: 'مضخة وقود', watts: 750, quantity: 4, hours: 6 },
      { id: '2', name: 'إضاءة مظلة', watts: 100, quantity: 12, hours: 12 },
      { id: '3', name: 'مكيف كابينة', watts: 1500, quantity: 1, hours: 12 }
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    appliances: [
      { id: '1', name: 'معدات حفر وتكسير كهربائية', watts: 15000, quantity: 2, hours: 10 },
      { id: '2', name: 'إضاءة كاشفة', watts: 500, quantity: 20, hours: 12 },
      { id: '3', name: 'مضخات مياه كبيرة', watts: 5000, quantity: 2, hours: 8 },
      { id: '4', name: 'مكيفات مكاتب', watts: 2000, quantity: 5, hours: 12 }
    ]
  }
];

export const SYSTEM_DEFAULTS = {
  inverterEfficiency: 0.85, // 85%
  systemVoltage: 48, // typical for medium-large systems, can be 12/24/48
  batteryDepthOfDischarge: 0.5, // 50% for Lead Acid, could be 0.8 for Lithium
  peakSunHours: 5, // typical average for sunny regions
  safetyMargin: 1.25 // 25% safety margin
};
