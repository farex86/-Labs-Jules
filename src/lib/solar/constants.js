export const CONSUMPTION_PATTERNS = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    devices: [
      { id: 'ice_maker', name: 'ماكينة صنع الثلج', power: 5000, quantity: 2, hours: 24 },
      { id: 'freezer', name: 'فريزر تجميد', power: 2000, quantity: 4, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 100, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    devices: [
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 4, hours: 8 },
      { id: 'computer', name: 'حاسوب', power: 250, quantity: 10, hours: 8 },
      { id: 'printer', name: 'طابعة', power: 400, quantity: 2, hours: 2 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 20, hours: 10 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    devices: [
      { id: 'water_pump', name: 'مضخة مياه', power: 3000, quantity: 1, hours: 6 },
      { id: 'lighting', name: 'إضاءة', power: 100, quantity: 5, hours: 12 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    devices: [
      { id: 'heater', name: 'دفاية', power: 2000, quantity: 5, hours: 12 },
      { id: 'ventilation', name: 'مروحة تهوية', power: 500, quantity: 4, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 60, quantity: 10, hours: 14 },
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    devices: [
      { id: 'water_pump', name: 'مضخة مياه', power: 2000, quantity: 1, hours: 4 },
      { id: 'cooling', name: 'نظام تبريد', power: 1500, quantity: 2, hours: 10 },
      { id: 'lighting', name: 'إضاءة', power: 100, quantity: 10, hours: 8 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    devices: [
      { id: 'machine', name: 'آلة تصنيع', power: 10000, quantity: 2, hours: 8 },
      { id: 'lighting', name: 'إضاءة', power: 100, quantity: 30, hours: 10 },
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    devices: [
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 6, hours: 12 },
      { id: 'fridge', name: 'ثلاجة أدوية', power: 300, quantity: 2, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 30, hours: 12 },
      { id: 'medical_eq', name: 'معدات طبية', power: 1000, quantity: 3, hours: 6 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    devices: [
      { id: 'ac', name: 'تكييف مركزي', power: 20000, quantity: 1, hours: 24 },
      { id: 'medical_eq', name: 'أجهزة طبية', power: 5000, quantity: 10, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 100, hours: 24 },
      { id: 'fridge', name: 'ثلاجات', power: 500, quantity: 10, hours: 24 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    devices: [
      { id: 'mixer', name: 'عجانة', power: 3000, quantity: 2, hours: 8 },
      { id: 'oven', name: 'فرن كهربائي', power: 15000, quantity: 1, hours: 10 },
      { id: 'lighting', name: 'إضاءة', power: 100, quantity: 5, hours: 12 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    devices: [
      { id: 'fridge', name: 'ثلاجة', power: 400, quantity: 2, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 4, hours: 12 },
      { id: 'fan', name: 'مروحة', power: 75, quantity: 2, hours: 12 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    devices: [
      { id: 'welding', name: 'ماكينة لحام', power: 5000, quantity: 1, hours: 4 },
      { id: 'drill', name: 'شنيور', power: 800, quantity: 2, hours: 3 },
      { id: 'lighting', name: 'إضاءة', power: 100, quantity: 4, hours: 8 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة مياه',
    devices: [
      { id: 'pump', name: 'مضخة مياه', power: 5500, quantity: 1, hours: 8 },
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي',
    devices: [
      { id: 'pump', name: 'مضخة صغيرة', power: 1500, quantity: 1, hours: 4 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    devices: [
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 6, hours: 5 },
      { id: 'fan', name: 'مروحة', power: 75, quantity: 10, hours: 5 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 20, hours: 6 },
      { id: 'sound', name: 'مكبر صوت', power: 200, quantity: 1, hours: 3 },
    ]
  },
  {
    id: 'printing',
    name: 'مطبعة',
    devices: [
      { id: 'printer_large', name: 'طابعة كبيرة', power: 5000, quantity: 2, hours: 10 },
      { id: 'cutting', name: 'مقص ورق', power: 1500, quantity: 1, hours: 4 },
      { id: 'lighting', name: 'إضاءة', power: 100, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    devices: [
      { id: 'espresso', name: 'ماكينة قهوة', power: 3500, quantity: 1, hours: 12 },
      { id: 'grinder', name: 'مطحنة', power: 800, quantity: 2, hours: 4 },
      { id: 'fridge', name: 'ثلاجة عرض', power: 500, quantity: 2, hours: 24 },
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 2, hours: 14 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 15, hours: 14 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    devices: [
      { id: 'fridge', name: 'ثلاجة/فريزر', power: 800, quantity: 4, hours: 24 },
      { id: 'ac', name: 'مكيف', power: 2000, quantity: 4, hours: 14 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 30, hours: 14 },
      { id: 'exhaust', name: 'شفاط', power: 1000, quantity: 2, hours: 12 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    devices: [
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 50, hours: 12 },
      { id: 'tv', name: 'تلفزيون', power: 100, quantity: 50, hours: 5 },
      { id: 'fridge_small', name: 'ثلاجة صغيرة', power: 150, quantity: 50, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 200, hours: 10 },
      { id: 'elevator', name: 'مصعد', power: 10000, quantity: 2, hours: 24 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    devices: [
      { id: 'ac', name: 'تكييف', power: 2000, quantity: 10, hours: 10 },
      { id: 'computer', name: 'حاسوب', power: 250, quantity: 20, hours: 9 },
      { id: 'server', name: 'سيرفر', power: 1000, quantity: 2, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 50, hours: 10 },
      { id: 'atm', name: 'صراف آلي', power: 500, quantity: 3, hours: 24 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    devices: [
      { id: 'fridge_display', name: 'ثلاجة عرض', power: 1500, quantity: 10, hours: 24 },
      { id: 'freezer', name: 'فريزر', power: 2000, quantity: 5, hours: 24 },
      { id: 'ac', name: 'مكيف', power: 2000, quantity: 6, hours: 16 },
      { id: 'lighting', name: 'إضاءة', power: 60, quantity: 40, hours: 16 },
      { id: 'pos', name: 'نقطة بيع', power: 150, quantity: 4, hours: 16 },
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    devices: [
      { id: 'pump', name: 'مضخة وقود', power: 1000, quantity: 6, hours: 8 },
      { id: 'lighting_external', name: 'كشافات', power: 400, quantity: 10, hours: 12 },
      { id: 'ac', name: 'مكيف مكتب', power: 1500, quantity: 2, hours: 12 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    devices: [
      { id: 'crusher', name: 'كسارة', power: 20000, quantity: 2, hours: 12 },
      { id: 'conveyor', name: 'سير ناقل', power: 5000, quantity: 4, hours: 12 },
      { id: 'pump', name: 'مضخة غاطسة', power: 10000, quantity: 2, hours: 24 },
      { id: 'lighting', name: 'إضاءة موقع', power: 1000, quantity: 20, hours: 12 },
    ]
  }
];
