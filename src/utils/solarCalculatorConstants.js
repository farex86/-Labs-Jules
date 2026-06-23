export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع تلج', defaultAppliances: [
    { id: '1', name: 'ماكينة تصنيع ثلج', power: 5000, quantity: 2, hours: 24 },
    { id: '2', name: 'إضاءة', power: 50, quantity: 10, hours: 12 },
    { id: '3', name: 'تكييف مكتب', power: 1500, quantity: 1, hours: 8 }
  ]},
  { id: 'company', name: 'شركة', defaultAppliances: [
    { id: '1', name: 'أجهزة كمبيوتر', power: 250, quantity: 10, hours: 8 },
    { id: '2', name: 'إضاءة', power: 40, quantity: 20, hours: 8 },
    { id: '3', name: 'مكيفات', power: 1500, quantity: 5, hours: 8 },
    { id: '4', name: 'طابعة', power: 300, quantity: 2, hours: 2 }
  ]},
  { id: 'farm', name: 'مزرعة', defaultAppliances: [
    { id: '1', name: 'مضخة ماء', power: 2000, quantity: 1, hours: 6 },
    { id: '2', name: 'إضاءة خارجية', power: 100, quantity: 5, hours: 12 }
  ]},
  { id: 'poultry_farm', name: 'مزرعة دواجن', defaultAppliances: [
    { id: '1', name: 'مراوح تهوية', power: 500, quantity: 10, hours: 24 },
    { id: '2', name: 'دفايات', power: 1000, quantity: 5, hours: 12 },
    { id: '3', name: 'إضاءة', power: 40, quantity: 20, hours: 24 }
  ]},
  { id: 'greenhouses', name: 'بيوت محمية', defaultAppliances: [
    { id: '1', name: 'مضخة ري', power: 1500, quantity: 2, hours: 4 },
    { id: '2', name: 'مراوح تهوية', power: 400, quantity: 4, hours: 12 }
  ]},
  { id: 'factory', name: 'مصنع', defaultAppliances: [
    { id: '1', name: 'آلات إنتاج', power: 10000, quantity: 3, hours: 16 },
    { id: '2', name: 'إضاءة المصنع', power: 100, quantity: 30, hours: 16 }
  ]},
  { id: 'clinic', name: 'مستوصف', defaultAppliances: [
    { id: '1', name: 'إضاءة', power: 40, quantity: 30, hours: 12 },
    { id: '2', name: 'مكيفات', power: 1500, quantity: 10, hours: 12 },
    { id: '3', name: 'ثلاجة أدوية', power: 200, quantity: 2, hours: 24 },
    { id: '4', name: 'أجهزة طبية', power: 1000, quantity: 5, hours: 8 }
  ]},
  { id: 'hospital', name: 'مستشفي', defaultAppliances: [
    { id: '1', name: 'إضاءة', power: 40, quantity: 100, hours: 24 },
    { id: '2', name: 'مكيفات مركزية', power: 5000, quantity: 10, hours: 24 },
    { id: '3', name: 'أجهزة عناية مركزة', power: 500, quantity: 20, hours: 24 },
    { id: '4', name: 'ثلاجات', power: 300, quantity: 10, hours: 24 }
  ]},
  { id: 'bakery', name: 'مخبز', defaultAppliances: [
    { id: '1', name: 'فرن كهربائي', power: 8000, quantity: 2, hours: 16 },
    { id: '2', name: 'عجانة', power: 3000, quantity: 2, hours: 8 },
    { id: '3', name: 'إضاءة', power: 40, quantity: 10, hours: 16 }
  ]},
  { id: 'shop', name: 'دكان', defaultAppliances: [
    { id: '1', name: 'ثلاجة عرض', power: 400, quantity: 2, hours: 24 },
    { id: '2', name: 'إضاءة', power: 40, quantity: 6, hours: 12 },
    { id: '3', name: 'مروحة سقف', power: 75, quantity: 2, hours: 12 }
  ]},
  { id: 'workshop', name: 'ورشة', defaultAppliances: [
    { id: '1', name: 'ماكينة لحام', power: 4000, quantity: 2, hours: 6 },
    { id: '2', name: 'صاروخ قطع', power: 1000, quantity: 2, hours: 4 },
    { id: '3', name: 'كومبريسور هواء', power: 2000, quantity: 1, hours: 6 },
    { id: '4', name: 'إضاءة', power: 100, quantity: 5, hours: 10 }
  ]},
  { id: 'water_pump', name: 'مضخة موية', defaultAppliances: [
    { id: '1', name: 'مضخة غاطسة', power: 3000, quantity: 1, hours: 8 }
  ]},
  { id: 'donkey', name: 'دونكي', defaultAppliances: [
    { id: '1', name: 'مضخة بئر', power: 4000, quantity: 1, hours: 10 }
  ]},
  { id: 'mosque', name: 'مسجد', defaultAppliances: [
    { id: '1', name: 'مكيفات', power: 2000, quantity: 6, hours: 5 },
    { id: '2', name: 'إضاءة', power: 40, quantity: 20, hours: 6 },
    { id: '3', name: 'مكبرات صوت', power: 150, quantity: 1, hours: 5 },
    { id: '4', name: 'مراوح', power: 75, quantity: 10, hours: 5 }
  ]},
  { id: 'printing_press', name: 'مطبعة', defaultAppliances: [
    { id: '1', name: 'ماكينة طباعة', power: 5000, quantity: 2, hours: 10 },
    { id: '2', name: 'مكيفات', power: 2000, quantity: 3, hours: 10 },
    { id: '3', name: 'إضاءة', power: 100, quantity: 15, hours: 10 }
  ]},
  { id: 'coffee_shop', name: 'كوفي شوب', defaultAppliances: [
    { id: '1', name: 'ماكينة اسبريسو', power: 3500, quantity: 1, hours: 14 },
    { id: '2', name: 'ثلاجة عرض', power: 500, quantity: 2, hours: 24 },
    { id: '3', name: 'مكيفات', power: 2000, quantity: 2, hours: 14 },
    { id: '4', name: 'إضاءة', power: 40, quantity: 15, hours: 14 }
  ]},
  { id: 'restaurant', name: 'مطعم', defaultAppliances: [
    { id: '1', name: 'ثلاجات', power: 500, quantity: 4, hours: 24 },
    { id: '2', name: 'مكيفات', power: 2000, quantity: 4, hours: 14 },
    { id: '3', name: 'شفاطات هواء', power: 1000, quantity: 2, hours: 14 },
    { id: '4', name: 'إضاءة', power: 40, quantity: 30, hours: 14 }
  ]},
  { id: 'hotel', name: 'فندق', defaultAppliances: [
    { id: '1', name: 'مكيفات غرف', power: 1500, quantity: 50, hours: 12 },
    { id: '2', name: 'إضاءة', power: 40, quantity: 150, hours: 12 },
    { id: '3', name: 'مصاعد', power: 10000, quantity: 2, hours: 4 },
    { id: '4', name: 'ثلاجات غرف', power: 100, quantity: 50, hours: 24 }
  ]},
  { id: 'bank', name: 'بنك', defaultAppliances: [
    { id: '1', name: 'أجهزة كمبيوتر', power: 250, quantity: 30, hours: 10 },
    { id: '2', name: 'مكيفات مركزية', power: 5000, quantity: 3, hours: 10 },
    { id: '3', name: 'إضاءة', power: 40, quantity: 50, hours: 10 },
    { id: '4', name: 'ماكينات صراف آلي', power: 500, quantity: 4, hours: 24 }
  ]},
  { id: 'supermarket', name: 'سوبر ماركت', defaultAppliances: [
    { id: '1', name: 'ثلاجات عرض منتجات', power: 800, quantity: 10, hours: 24 },
    { id: '2', name: 'مكيفات', power: 2500, quantity: 5, hours: 16 },
    { id: '3', name: 'إضاءة', power: 50, quantity: 40, hours: 16 },
    { id: '4', name: 'أجهزة كاشير', power: 150, quantity: 5, hours: 16 }
  ]},
  { id: 'gas_station', name: 'طرمبة وقود', defaultAppliances: [
    { id: '1', name: 'مضخات وقود', power: 1500, quantity: 6, hours: 10 },
    { id: '2', name: 'إضاءة المظلة', power: 150, quantity: 10, hours: 12 },
    { id: '3', name: 'تكييف الإدارة', power: 1500, quantity: 2, hours: 12 }
  ]},
  { id: 'mining_company', name: 'شركة تعدين', defaultAppliances: [
    { id: '1', name: 'آلات تكسير', power: 20000, quantity: 2, hours: 12 },
    { id: '2', name: 'سيور ناقلة', power: 5000, quantity: 4, hours: 12 },
    { id: '3', name: 'مضخات مياه', power: 10000, quantity: 2, hours: 12 },
    { id: '4', name: 'إضاءة كاشفة', power: 1000, quantity: 20, hours: 12 }
  ]}
];

// Constants for solar calculations
export const SYSTEM_CONSTANTS = {
  // Peak sun hours for the region (average)
  PEAK_SUN_HOURS: 5.5,
  // System efficiency (losses due to heat, dust, wiring, etc.) - typical 0.8
  SYSTEM_EFFICIENCY: 0.8,
  // Inverter efficiency
  INVERTER_EFFICIENCY: 0.95,
  // Safety margin for inverter (multiply peak load by this)
  INVERTER_SAFETY_MARGIN: 1.25,
  // Battery Depth of Discharge (DoD) - typical 50% for lead acid, 80% for Lithium
  // Assuming a mix or average standard, we use 0.6
  BATTERY_DOD: 0.6,
  // Battery efficiency
  BATTERY_EFFICIENCY: 0.9,
  // Default days of autonomy
  DEFAULT_AUTONOMY_DAYS: 1,
  // Default system voltage
  SYSTEM_VOLTAGE: 48
};
