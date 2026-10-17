// Constants for default facility types and their appliances
export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    defaultAppliances: [
      { id: 1, name: 'ماكينة صنع الثلج', powerWatts: 5000, quantity: 2, hoursPerDay: 24 },
      { id: 2, name: 'إضاءة', powerWatts: 50, quantity: 10, hoursPerDay: 12 },
      { id: 3, name: 'مكيف', powerWatts: 2000, quantity: 1, hoursPerDay: 8 }
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    defaultAppliances: [
      { id: 1, name: 'كمبيوتر', powerWatts: 150, quantity: 10, hoursPerDay: 8 },
      { id: 2, name: 'إضاءة', powerWatts: 40, quantity: 20, hoursPerDay: 10 },
      { id: 3, name: 'مكيف', powerWatts: 1500, quantity: 3, hoursPerDay: 8 },
      { id: 4, name: 'طابعة', powerWatts: 300, quantity: 2, hoursPerDay: 2 }
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultAppliances: [
      { id: 1, name: 'مضخة مياه صغيرة', powerWatts: 750, quantity: 1, hoursPerDay: 6 },
      { id: 2, name: 'إضاءة', powerWatts: 40, quantity: 5, hoursPerDay: 12 }
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultAppliances: [
      { id: 1, name: 'مراوح تهوية', powerWatts: 300, quantity: 4, hoursPerDay: 24 },
      { id: 2, name: 'إضاءة', powerWatts: 20, quantity: 20, hoursPerDay: 16 },
      { id: 3, name: 'نظام تدفئة', powerWatts: 2000, quantity: 2, hoursPerDay: 10 }
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    defaultAppliances: [
      { id: 1, name: 'مضخة ري', powerWatts: 500, quantity: 1, hoursPerDay: 4 },
      { id: 2, name: 'مراوح تهوية', powerWatts: 250, quantity: 2, hoursPerDay: 12 }
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultAppliances: [
      { id: 1, name: 'آلات صناعية', powerWatts: 10000, quantity: 3, hoursPerDay: 16 },
      { id: 2, name: 'إضاءة', powerWatts: 100, quantity: 50, hoursPerDay: 16 }
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultAppliances: [
      { id: 1, name: 'أجهزة طبية', powerWatts: 500, quantity: 5, hoursPerDay: 8 },
      { id: 2, name: 'إضاءة', powerWatts: 40, quantity: 20, hoursPerDay: 24 },
      { id: 3, name: 'مكيف', powerWatts: 1500, quantity: 4, hoursPerDay: 12 },
      { id: 4, name: 'ثلاجة أدوية', powerWatts: 200, quantity: 2, hoursPerDay: 24 }
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    defaultAppliances: [
      { id: 1, name: 'أجهزة طبية كبيرة', powerWatts: 2000, quantity: 10, hoursPerDay: 12 },
      { id: 2, name: 'إضاءة', powerWatts: 40, quantity: 100, hoursPerDay: 24 },
      { id: 3, name: 'تكييف مركزي', powerWatts: 20000, quantity: 1, hoursPerDay: 24 },
      { id: 4, name: 'مصاعد', powerWatts: 5000, quantity: 2, hoursPerDay: 12 }
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultAppliances: [
      { id: 1, name: 'عجانة', powerWatts: 1500, quantity: 2, hoursPerDay: 6 },
      { id: 2, name: 'فرن كهربائي', powerWatts: 5000, quantity: 2, hoursPerDay: 12 },
      { id: 3, name: 'إضاءة', powerWatts: 50, quantity: 10, hoursPerDay: 16 }
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultAppliances: [
      { id: 1, name: 'إضاءة', powerWatts: 20, quantity: 5, hoursPerDay: 12 },
      { id: 2, name: 'ثلاجة عرض', powerWatts: 400, quantity: 1, hoursPerDay: 24 },
      { id: 3, name: 'مروحة', powerWatts: 75, quantity: 1, hoursPerDay: 12 }
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultAppliances: [
      { id: 1, name: 'ماكينة لحام', powerWatts: 3000, quantity: 1, hoursPerDay: 4 },
      { id: 2, name: 'معدات يدوية كهربائية', powerWatts: 800, quantity: 3, hoursPerDay: 6 },
      { id: 3, name: 'إضاءة', powerWatts: 50, quantity: 8, hoursPerDay: 10 }
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة مياه',
    defaultAppliances: [
      { id: 1, name: 'مضخة', powerWatts: 1500, quantity: 1, hoursPerDay: 8 }
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي',
    defaultAppliances: [
      { id: 1, name: 'مضخة مياه', powerWatts: 1100, quantity: 1, hoursPerDay: 6 }
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultAppliances: [
      { id: 1, name: 'مكيف', powerWatts: 2000, quantity: 6, hoursPerDay: 4 },
      { id: 2, name: 'إضاءة', powerWatts: 40, quantity: 20, hoursPerDay: 6 },
      { id: 3, name: 'مكبر صوت', powerWatts: 100, quantity: 1, hoursPerDay: 2 }
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultAppliances: [
      { id: 1, name: 'ماكينة طباعة', powerWatts: 3000, quantity: 2, hoursPerDay: 10 },
      { id: 2, name: 'كمبيوتر', powerWatts: 200, quantity: 3, hoursPerDay: 10 },
      { id: 3, name: 'إضاءة', powerWatts: 50, quantity: 15, hoursPerDay: 12 }
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultAppliances: [
      { id: 1, name: 'ماكينة قهوة', powerWatts: 3000, quantity: 1, hoursPerDay: 12 },
      { id: 2, name: 'ثلاجة عرض', powerWatts: 500, quantity: 2, hoursPerDay: 24 },
      { id: 3, name: 'مكيف', powerWatts: 1500, quantity: 2, hoursPerDay: 14 },
      { id: 4, name: 'إضاءة', powerWatts: 30, quantity: 15, hoursPerDay: 14 }
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultAppliances: [
      { id: 1, name: 'ثلاجة كبيرة', powerWatts: 800, quantity: 3, hoursPerDay: 24 },
      { id: 2, name: 'مكيف', powerWatts: 2000, quantity: 4, hoursPerDay: 16 },
      { id: 3, name: 'إضاءة', powerWatts: 40, quantity: 30, hoursPerDay: 16 },
      { id: 4, name: 'معدات مطبخ كهربائية', powerWatts: 3000, quantity: 2, hoursPerDay: 10 }
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultAppliances: [
      { id: 1, name: 'مكيفات غرف', powerWatts: 1200, quantity: 20, hoursPerDay: 12 },
      { id: 2, name: 'إضاءة', powerWatts: 20, quantity: 100, hoursPerDay: 12 },
      { id: 3, name: 'سخانات مياه', powerWatts: 1500, quantity: 20, hoursPerDay: 4 },
      { id: 4, name: 'ثلاجات غرف', powerWatts: 100, quantity: 20, hoursPerDay: 24 }
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultAppliances: [
      { id: 1, name: 'كمبيوتر', powerWatts: 150, quantity: 30, hoursPerDay: 10 },
      { id: 2, name: 'تكييف مركزي', powerWatts: 15000, quantity: 1, hoursPerDay: 10 },
      { id: 3, name: 'إضاءة', powerWatts: 40, quantity: 50, hoursPerDay: 12 },
      { id: 4, name: 'صراف آلي', powerWatts: 300, quantity: 3, hoursPerDay: 24 }
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultAppliances: [
      { id: 1, name: 'ثلاجات عرض', powerWatts: 800, quantity: 10, hoursPerDay: 24 },
      { id: 2, name: 'فريزر', powerWatts: 1000, quantity: 5, hoursPerDay: 24 },
      { id: 3, name: 'مكيف', powerWatts: 2000, quantity: 4, hoursPerDay: 16 },
      { id: 4, name: 'إضاءة', powerWatts: 40, quantity: 40, hoursPerDay: 16 }
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultAppliances: [
      { id: 1, name: 'مضخة وقود', powerWatts: 1000, quantity: 4, hoursPerDay: 24 },
      { id: 2, name: 'إضاءة خارجية', powerWatts: 200, quantity: 6, hoursPerDay: 12 },
      { id: 3, name: 'مكيف مكتب', powerWatts: 1500, quantity: 1, hoursPerDay: 24 }
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultAppliances: [
      { id: 1, name: 'معدات تعدين ثقيلة', powerWatts: 20000, quantity: 2, hoursPerDay: 12 },
      { id: 2, name: 'إضاءة كاشفة', powerWatts: 1000, quantity: 10, hoursPerDay: 12 },
      { id: 3, name: 'مضخة مياه', powerWatts: 5000, quantity: 2, hoursPerDay: 12 }
    ]
  }
];

// Calculation Functions
export const calculateTotalDailyEnergyWh = (appliances) => {
  return appliances.reduce((total, appliance) => {
    return total + (appliance.powerWatts * appliance.quantity * appliance.hoursPerDay);
  }, 0);
};

export const calculateRecommendedSolarSizeKW = (totalDailyEnergyWh, peakSunHours = 5, systemEfficiency = 0.8) => {
  if (totalDailyEnergyWh === 0) return 0;
  // Total Energy / (Peak Sun Hours * System Efficiency) / 1000 to convert to kW
  return totalDailyEnergyWh / (peakSunHours * systemEfficiency) / 1000;
};
