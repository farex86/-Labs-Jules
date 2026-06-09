export const SYSTEM_DEFAULTS = {
  peakSunHours: 5, // Average peak sun hours
  systemVoltage: 48, // Standard system voltage for medium/large setups
  inverterEfficiency: 0.85, // 85% efficiency
  batteryDepthOfDischarge: 0.5, // 50% DoD for Lead-Acid (can adjust based on type)
  batteryVoltage: 12, // Standard battery voltage
  panelWattage: 550, // Standard panel wattage
};

export const CONSUMPTION_PATTERNS = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج',
    defaultDevices: [
      { id: '1', name: 'ماكينة تصنيع الثلج', quantity: 2, watts: 5000, hours: 24 },
      { id: '2', name: 'غرفة تبريد', quantity: 1, watts: 3000, hours: 24 },
      { id: '3', name: 'إضاءة', quantity: 10, watts: 40, hours: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    defaultDevices: [
      { id: '1', name: 'مكيف', quantity: 5, watts: 1500, hours: 8 },
      { id: '2', name: 'جهاز كمبيوتر', quantity: 15, watts: 300, hours: 8 },
      { id: '3', name: 'طابعة', quantity: 2, watts: 500, hours: 2 },
      { id: '4', name: 'إضاءة', quantity: 30, watts: 40, hours: 10 },
      { id: '5', name: 'ثلاجة صغيرة', quantity: 1, watts: 200, hours: 24 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultDevices: [
      { id: '1', name: 'مضخة مياه', quantity: 1, watts: 2000, hours: 6 },
      { id: '2', name: 'إضاءة محيطية', quantity: 10, watts: 50, hours: 12 },
      { id: '3', name: 'تلفزيون', quantity: 1, watts: 100, hours: 5 },
      { id: '4', name: 'ثلاجة', quantity: 1, watts: 300, hours: 24 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultDevices: [
      { id: '1', name: 'مراوح تهوية', quantity: 10, watts: 500, hours: 24 },
      { id: '2', name: 'إضاءة', quantity: 20, watts: 40, hours: 18 },
      { id: '3', name: 'نظام تغذية', quantity: 2, watts: 1000, hours: 4 },
      { id: '4', name: 'مضخة مياه', quantity: 1, watts: 1500, hours: 4 },
    ]
  },
  {
    id: 'greenhouses',
    name: 'بيوت محمية',
    defaultDevices: [
      { id: '1', name: 'مضخة ري', quantity: 2, watts: 1500, hours: 4 },
      { id: '2', name: 'نظام تبريد/تدفئة', quantity: 4, watts: 2000, hours: 12 },
      { id: '3', name: 'إضاءة نمو', quantity: 50, watts: 100, hours: 10 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultDevices: [
      { id: '1', name: 'آلات رئيسية', quantity: 3, watts: 10000, hours: 16 },
      { id: '2', name: 'إضاءة صناعية', quantity: 40, watts: 100, hours: 16 },
      { id: '3', name: 'تكييف مكاتب', quantity: 4, watts: 1500, hours: 8 },
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultDevices: [
      { id: '1', name: 'مكيف', quantity: 6, watts: 1500, hours: 12 },
      { id: '2', name: 'أجهزة طبية', quantity: 5, watts: 800, hours: 8 },
      { id: '3', name: 'ثلاجة أدوية', quantity: 2, watts: 300, hours: 24 },
      { id: '4', name: 'إضاءة', quantity: 30, watts: 40, hours: 12 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    defaultDevices: [
      { id: '1', name: 'تكييف مركزي', quantity: 2, watts: 15000, hours: 24 },
      { id: '2', name: 'أجهزة عناية مركزة', quantity: 10, watts: 1000, hours: 24 },
      { id: '3', name: 'إضاءة', quantity: 100, watts: 40, hours: 24 },
      { id: '4', name: 'مصاعد', quantity: 2, watts: 5000, hours: 12 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultDevices: [
      { id: '1', name: 'عجانة', quantity: 2, watts: 2000, hours: 8 },
      { id: '2', name: 'فرن كهربائي', quantity: 2, watts: 5000, hours: 10 },
      { id: '3', name: 'ثلاجة عرض', quantity: 2, watts: 800, hours: 24 },
      { id: '4', name: 'إضاءة', quantity: 15, watts: 40, hours: 14 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultDevices: [
      { id: '1', name: 'ثلاجة', quantity: 2, watts: 400, hours: 24 },
      { id: '2', name: 'إضاءة', quantity: 5, watts: 40, hours: 12 },
      { id: '3', name: 'مروحة', quantity: 2, watts: 70, hours: 12 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultDevices: [
      { id: '1', name: 'ماكينة لحام', quantity: 1, watts: 4000, hours: 4 },
      { id: '2', name: 'صاروخ جلخ', quantity: 2, watts: 1000, hours: 3 },
      { id: '3', name: 'كمبروسر هواء', quantity: 1, watts: 2000, hours: 5 },
      { id: '4', name: 'إضاءة', quantity: 10, watts: 50, hours: 10 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    defaultDevices: [
      { id: '1', name: 'مضخة غاطسة', quantity: 1, watts: 3000, hours: 8 },
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي',
    defaultDevices: [
      { id: '1', name: 'مضخة سحب', quantity: 1, watts: 1500, hours: 6 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultDevices: [
      { id: '1', name: 'مكيف', quantity: 4, watts: 2000, hours: 6 },
      { id: '2', name: 'مراوح', quantity: 10, watts: 70, hours: 8 },
      { id: '3', name: 'إضاءة', quantity: 20, watts: 40, hours: 6 },
      { id: '4', name: 'مكبر صوت', quantity: 1, watts: 200, hours: 4 },
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultDevices: [
      { id: '1', name: 'ماكينة طباعة', quantity: 2, watts: 3000, hours: 10 },
      { id: '2', name: 'جهاز كمبيوتر', quantity: 4, watts: 300, hours: 10 },
      { id: '3', name: 'تكييف', quantity: 2, watts: 1500, hours: 10 },
      { id: '4', name: 'إضاءة', quantity: 15, watts: 40, hours: 10 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultDevices: [
      { id: '1', name: 'ماكينة اسبريسو', quantity: 1, watts: 3000, hours: 12 },
      { id: '2', name: 'ثلاجة عرض', quantity: 2, watts: 500, hours: 24 },
      { id: '3', name: 'مكيف', quantity: 2, watts: 1500, hours: 14 },
      { id: '4', name: 'إضاءة ديكور', quantity: 20, watts: 30, hours: 14 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultDevices: [
      { id: '1', name: 'ثلاجة/فريزر', quantity: 4, watts: 800, hours: 24 },
      { id: '2', name: 'شفاط هواء', quantity: 2, watts: 1000, hours: 14 },
      { id: '3', name: 'تكييف', quantity: 4, watts: 1500, hours: 14 },
      { id: '4', name: 'إضاءة', quantity: 30, watts: 40, hours: 14 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultDevices: [
      { id: '1', name: 'تكييف غرف', quantity: 20, watts: 1500, hours: 12 },
      { id: '2', name: 'سخانات مياه', quantity: 20, watts: 1000, hours: 4 },
      { id: '3', name: 'إضاءة', quantity: 100, watts: 30, hours: 12 },
      { id: '4', name: 'مصاعد', quantity: 1, watts: 5000, hours: 12 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultDevices: [
      { id: '1', name: 'تكييف مركزي', quantity: 1, watts: 10000, hours: 10 },
      { id: '2', name: 'أجهزة كمبيوتر', quantity: 20, watts: 300, hours: 10 },
      { id: '3', name: 'إضاءة', quantity: 50, watts: 40, hours: 10 },
      { id: '4', name: 'صراف آلي (ATM)', quantity: 2, watts: 500, hours: 24 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultDevices: [
      { id: '1', name: 'ثلاجات عرض', quantity: 10, watts: 800, hours: 24 },
      { id: '2', name: 'فريزر', quantity: 5, watts: 1000, hours: 24 },
      { id: '3', name: 'تكييف', quantity: 4, watts: 2000, hours: 16 },
      { id: '4', name: 'إضاءة', quantity: 50, watts: 40, hours: 16 },
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultDevices: [
      { id: '1', name: 'مضخة وقود', quantity: 4, watts: 1000, hours: 12 },
      { id: '2', name: 'إضاءة مظلة', quantity: 20, watts: 100, hours: 12 },
      { id: '3', name: 'ثلاجة ميني ماركت', quantity: 2, watts: 500, hours: 24 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultDevices: [
      { id: '1', name: 'كسارة', quantity: 2, watts: 15000, hours: 12 },
      { id: '2', name: 'سيور ناقلة', quantity: 4, watts: 5000, hours: 12 },
      { id: '3', name: 'إضاءة كاشفة', quantity: 20, watts: 400, hours: 12 },
      { id: '4', name: 'مضخات مياه', quantity: 2, watts: 3000, hours: 12 },
    ]
  }
];
