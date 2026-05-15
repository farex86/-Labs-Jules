// Consumption Patterns Configuration (أنماط الاستهلاك)
export const consumptionPatterns = [
  { id: 'ice_factory', name: 'مصنع ثلج', nameEn: 'Ice Factory' },
  { id: 'company', name: 'شركة', nameEn: 'Company' },
  { id: 'farm', name: 'مزرعة', nameEn: 'Farm' },
  { id: 'poultry_farm', name: 'مزرعة دواجن', nameEn: 'Poultry Farm' },
  { id: 'greenhouses', name: 'بيوت محمية', nameEn: 'Greenhouses' },
  { id: 'factory', name: 'مصنع', nameEn: 'Factory' },
  { id: 'clinic', name: 'مستوصف', nameEn: 'Clinic' },
  { id: 'hospital', name: 'مستشفى', nameEn: 'Hospital' },
  { id: 'bakery', name: 'مخبز', nameEn: 'Bakery' },
  { id: 'shop', name: 'دكان', nameEn: 'Shop' },
  { id: 'workshop', name: 'ورشة', nameEn: 'Workshop' },
  { id: 'water_pump', name: 'مضخة مياه', nameEn: 'Water Pump' },
  { id: 'donkey_pump', name: 'دونكي', nameEn: 'Donkey (Traditional Pump)' },
  { id: 'mosque', name: 'مسجد', nameEn: 'Mosque' },
  { id: 'printing_press', name: 'مطبعة', nameEn: 'Printing Press' },
  { id: 'coffee_shop', name: 'كوفي شوب', nameEn: 'Coffee Shop' },
  { id: 'restaurant', name: 'مطعم', nameEn: 'Restaurant' },
  { id: 'hotel', name: 'فندق', nameEn: 'Hotel' },
  { id: 'bank', name: 'بنك', nameEn: 'Bank' },
  { id: 'supermarket', name: 'سوبر ماركت', nameEn: 'Supermarket' },
  { id: 'gas_station', name: 'طرمبة وقود', nameEn: 'Gas Station' },
  { id: 'mining_company', name: 'شركة تعدين', nameEn: 'Mining Company' }
];

// Default devices mapped to consumption patterns to kickstart calculations
export const defaultDevicesForPatterns = {
  mosque: [
    { id: 1, name: 'مكيفات', quantity: 4, power: 1500, hours: 5 },
    { id: 2, name: 'مراوح', quantity: 10, power: 75, hours: 8 },
    { id: 3, name: 'إضاءة', quantity: 20, power: 20, hours: 8 },
    { id: 4, name: 'مكبرات صوت', quantity: 1, power: 300, hours: 5 }
  ],
  farm: [
    { id: 1, name: 'مضخة غاطسة', quantity: 1, power: 5500, hours: 8 }, // 7.5 HP
    { id: 2, name: 'إضاءة محيطية', quantity: 10, power: 50, hours: 12 }
  ],
  clinic: [
    { id: 1, name: 'مكيفات', quantity: 6, power: 1500, hours: 12 },
    { id: 2, name: 'ثلاجة أدوية', quantity: 2, power: 300, hours: 24 },
    { id: 3, name: 'أجهزة طبية', quantity: 4, power: 500, hours: 8 },
    { id: 4, name: 'إضاءة', quantity: 30, power: 20, hours: 12 },
    { id: 5, name: 'كمبيوترات', quantity: 5, power: 200, hours: 10 }
  ],
  bakery: [
    { id: 1, name: 'عجانة كهربائية', quantity: 2, power: 2000, hours: 6 },
    { id: 2, name: 'فرن كهربائي', quantity: 1, power: 5000, hours: 8 },
    { id: 3, name: 'إضاءة', quantity: 10, power: 30, hours: 12 },
    { id: 4, name: 'مراوح', quantity: 4, power: 100, hours: 12 }
  ],
  supermarket: [
    { id: 1, name: 'ثلاجات عرض', quantity: 5, power: 800, hours: 24 },
    { id: 2, name: 'مكيفات', quantity: 4, power: 2000, hours: 16 },
    { id: 3, name: 'كاشير', quantity: 2, power: 150, hours: 16 },
    { id: 4, name: 'إضاءة', quantity: 40, power: 25, hours: 16 }
  ],
  shop: [
    { id: 1, name: 'ثلاجة', quantity: 2, power: 400, hours: 24 },
    { id: 2, name: 'مروحة سقف', quantity: 2, power: 75, hours: 12 },
    { id: 3, name: 'إضاءة', quantity: 6, power: 20, hours: 8 }
  ]
};

// Fallback empty device list if pattern not configured with defaults
export const getPatternDevices = (patternId) => {
  if (!patternId) return [];
  // Return deep copy to prevent mutating the defaults
  return defaultDevicesForPatterns[patternId]
    ? JSON.parse(JSON.stringify(defaultDevicesForPatterns[patternId]))
    : [{ id: 1, name: 'جهاز جديد', quantity: 1, power: 100, hours: 5 }];
};
