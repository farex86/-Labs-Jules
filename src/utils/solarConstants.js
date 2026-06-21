// Solar System Default Parameters
export const SOLAR_PARAMETERS = {
  systemLossFactor: 1.3, // 30% losses (inverter, wiring, dust, temperature)
  peakSunHours: 6, // Average PSH in many regions (can be made configurable)
  batteryDepthOfDischarge: 0.5, // 50% DoD for Lead Acid (or could be 0.8 for Lithium)
  batterySystemVoltage: 48, // 48V standard for larger systems
  inverterSafetyMargin: 1.25 // 25% safety margin for inverter sizing
};

// Facility Types with Default Appliances
// Each appliance: { id: string, name: string, powerW: number, quantity: number, hours: number }
export const FACILITY_TYPES = [
  {
    id: 'ice-factory',
    name: 'مصنع تلج',
    appliances: [
      { id: '1', name: 'ماكينة ثلج', powerW: 15000, quantity: 2, hours: 24 },
      { id: '2', name: 'إضاءة', powerW: 100, quantity: 10, hours: 12 },
      { id: '3', name: 'مكيف', powerW: 2000, quantity: 2, hours: 8 }
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    appliances: [
      { id: '1', name: 'كمبيوتر', powerW: 250, quantity: 20, hours: 8 },
      { id: '2', name: 'إضاءة', powerW: 40, quantity: 50, hours: 10 },
      { id: '3', name: 'مكيف', powerW: 1500, quantity: 5, hours: 8 },
      { id: '4', name: 'طابعة', powerW: 500, quantity: 2, hours: 2 },
      { id: '5', name: 'سيرفر', powerW: 800, quantity: 1, hours: 24 }
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    appliances: [
      { id: '1', name: 'مضخة ماء', powerW: 3000, quantity: 1, hours: 6 },
      { id: '2', name: 'إضاءة', powerW: 40, quantity: 15, hours: 12 },
      { id: '3', name: 'ثلاجة', powerW: 300, quantity: 1, hours: 24 }
    ]
  },
  {
    id: 'poultry-farm',
    name: 'مزرعة دواجن',
    appliances: [
      { id: '1', name: 'مراوح تهوية', powerW: 1000, quantity: 10, hours: 24 },
      { id: '2', name: 'إضاءة', powerW: 40, quantity: 40, hours: 16 },
      { id: '3', name: 'مضخة ماء', powerW: 1500, quantity: 2, hours: 4 },
      { id: '4', name: 'دفايات', powerW: 2000, quantity: 5, hours: 12 }
    ]
  },
  {
    id: 'greenhouses',
    name: 'بيوت محمية',
    appliances: [
      { id: '1', name: 'مراوح تبريد', powerW: 750, quantity: 6, hours: 10 },
      { id: '2', name: 'مضخة ري', powerW: 1500, quantity: 1, hours: 4 },
      { id: '3', name: 'إضاءة', powerW: 100, quantity: 10, hours: 8 }
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    appliances: [
      { id: '1', name: 'ماكينات إنتاج', powerW: 10000, quantity: 5, hours: 12 },
      { id: '2', name: 'إضاءة', powerW: 100, quantity: 50, hours: 12 },
      { id: '3', name: 'مكيفات', powerW: 2000, quantity: 10, hours: 12 }
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    appliances: [
      { id: '1', name: 'إضاءة', powerW: 40, quantity: 30, hours: 12 },
      { id: '2', name: 'مكيف', powerW: 1500, quantity: 5, hours: 10 },
      { id: '3', name: 'ثلاجة أدوية', powerW: 200, quantity: 2, hours: 24 },
      { id: '4', name: 'أجهزة فحص', powerW: 500, quantity: 3, hours: 6 },
      { id: '5', name: 'كمبيوتر', powerW: 250, quantity: 5, hours: 8 }
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    appliances: [
      { id: '1', name: 'أجهزة طبية', powerW: 5000, quantity: 5, hours: 24 },
      { id: '2', name: 'إضاءة', powerW: 40, quantity: 200, hours: 24 },
      { id: '3', name: 'مكيفات', powerW: 2000, quantity: 30, hours: 24 },
      { id: '4', name: 'ثلاجات دواء', powerW: 300, quantity: 10, hours: 24 },
      { id: '5', name: 'مصاعد', powerW: 15000, quantity: 2, hours: 12 }
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    appliances: [
      { id: '1', name: 'عجانة', powerW: 3000, quantity: 2, hours: 6 },
      { id: '2', name: 'فرن كهربائي', powerW: 10000, quantity: 1, hours: 8 },
      { id: '3', name: 'إضاءة', powerW: 40, quantity: 10, hours: 12 },
      { id: '4', name: 'مراوح', powerW: 100, quantity: 4, hours: 12 }
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    appliances: [
      { id: '1', name: 'إضاءة', powerW: 40, quantity: 5, hours: 12 },
      { id: '2', name: 'ثلاجة عرض', powerW: 800, quantity: 2, hours: 24 },
      { id: '3', name: 'مروحة', powerW: 75, quantity: 2, hours: 12 }
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    appliances: [
      { id: '1', name: 'ماكينة لحام', powerW: 5000, quantity: 1, hours: 4 },
      { id: '2', name: 'صاروخ قطع', powerW: 2000, quantity: 2, hours: 3 },
      { id: '3', name: 'شنيور', powerW: 800, quantity: 2, hours: 2 },
      { id: '4', name: 'إضاءة', powerW: 100, quantity: 5, hours: 8 }
    ]
  },
  {
    id: 'water-pump',
    name: 'مضخة موية',
    appliances: [
      { id: '1', name: 'مضخة', powerW: 4000, quantity: 1, hours: 8 }
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي',
    appliances: [
      { id: '1', name: 'مضخة غاطسة', powerW: 5500, quantity: 1, hours: 10 }
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    appliances: [
      { id: '1', name: 'مكيفات', powerW: 2000, quantity: 6, hours: 6 },
      { id: '2', name: 'إضاءة', powerW: 40, quantity: 30, hours: 6 },
      { id: '3', name: 'مكبرات صوت', powerW: 300, quantity: 1, hours: 3 },
      { id: '4', name: 'مراوح', powerW: 75, quantity: 10, hours: 6 }
    ]
  },
  {
    id: 'printing-press',
    name: 'مطبعة',
    appliances: [
      { id: '1', name: 'ماكينة طباعة', powerW: 5000, quantity: 2, hours: 10 },
      { id: '2', name: 'مقص ورق', powerW: 2000, quantity: 1, hours: 4 },
      { id: '3', name: 'إضاءة', powerW: 40, quantity: 20, hours: 10 },
      { id: '4', name: 'مكيفات', powerW: 1500, quantity: 4, hours: 10 }
    ]
  },
  {
    id: 'coffee-shop',
    name: 'كوفي شوب',
    appliances: [
      { id: '1', name: 'ماكينة قهوة', powerW: 3500, quantity: 1, hours: 12 },
      { id: '2', name: 'ثلاجة عرض', powerW: 800, quantity: 1, hours: 24 },
      { id: '3', name: 'إضاءة', powerW: 40, quantity: 20, hours: 12 },
      { id: '4', name: 'مكيف', powerW: 1500, quantity: 2, hours: 12 },
      { id: '5', name: 'خلاط', powerW: 1000, quantity: 2, hours: 2 }
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    appliances: [
      { id: '1', name: 'ثلاجات', powerW: 1000, quantity: 4, hours: 24 },
      { id: '2', name: 'شفاط هواء', powerW: 1500, quantity: 2, hours: 12 },
      { id: '3', name: 'إضاءة', powerW: 40, quantity: 30, hours: 12 },
      { id: '4', name: 'مكيفات', powerW: 2000, quantity: 4, hours: 12 }
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    appliances: [
      { id: '1', name: 'مكيفات (غرف)', powerW: 1500, quantity: 50, hours: 12 },
      { id: '2', name: 'إضاءة (غرف وممرات)', powerW: 40, quantity: 200, hours: 12 },
      { id: '3', name: 'ثلاجات صغيرة', powerW: 100, quantity: 50, hours: 24 },
      { id: '4', name: 'مصعد', powerW: 15000, quantity: 1, hours: 8 },
      { id: '5', name: 'مضخات مياه', powerW: 3000, quantity: 2, hours: 6 }
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    appliances: [
      { id: '1', name: 'كمبيوترات', powerW: 250, quantity: 30, hours: 10 },
      { id: '2', name: 'سيرفرات', powerW: 1500, quantity: 2, hours: 24 },
      { id: '3', name: 'إضاءة', powerW: 40, quantity: 100, hours: 12 },
      { id: '4', name: 'مكيفات مركزية', powerW: 10000, quantity: 2, hours: 12 },
      { id: '5', name: 'أجهزة صراف آلي', powerW: 500, quantity: 3, hours: 24 }
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    appliances: [
      { id: '1', name: 'ثلاجات عرض', powerW: 1200, quantity: 10, hours: 24 },
      { id: '2', name: 'فريزرات', powerW: 1500, quantity: 5, hours: 24 },
      { id: '3', name: 'إضاءة', powerW: 40, quantity: 50, hours: 16 },
      { id: '4', name: 'مكيفات', powerW: 2000, quantity: 4, hours: 16 },
      { id: '5', name: 'كاشير', powerW: 200, quantity: 3, hours: 16 }
    ]
  },
  {
    id: 'fuel-station',
    name: 'طرمبة وقود',
    appliances: [
      { id: '1', name: 'مضخات وقود', powerW: 1000, quantity: 6, hours: 24 },
      { id: '2', name: 'إضاءة خارجية', powerW: 200, quantity: 10, hours: 12 },
      { id: '3', name: 'إضاءة داخلية', powerW: 40, quantity: 10, hours: 24 },
      { id: '4', name: 'مكيف (مكتب)', powerW: 1500, quantity: 1, hours: 24 }
    ]
  },
  {
    id: 'mining-company',
    name: 'شركة تعدين',
    appliances: [
      { id: '1', name: 'معدات حفر وتكسير', powerW: 20000, quantity: 2, hours: 10 },
      { id: '2', name: 'مضخات غسيل', powerW: 5000, quantity: 3, hours: 12 },
      { id: '3', name: 'إضاءة قوية', powerW: 1000, quantity: 10, hours: 12 },
      { id: '4', name: 'كمب سكن', powerW: 10000, quantity: 1, hours: 24 }
    ]
  }
];
