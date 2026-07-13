export const facilityTypes = [
  { id: 'ice_factory', name: 'مصنع تلج' },
  { id: 'company', name: 'شركة' },
  { id: 'farm', name: 'مزرعة' },
  { id: 'poultry_farm', name: 'مزرعة دواجن' },
  { id: 'greenhouses', name: 'بيوت محمية' },
  { id: 'factory', name: 'مصنع' },
  { id: 'clinic', name: 'مستوصف' },
  { id: 'hospital', name: 'مستشفي' },
  { id: 'bakery', name: 'مخبز' },
  { id: 'shop', name: 'دكان' },
  { id: 'workshop', name: 'ورشة' },
  { id: 'water_pump', name: 'مضخة موية' },
  { id: 'donkey', name: 'دونكي' },
  { id: 'mosque', name: 'مسجد' },
  { id: 'printing_press', name: 'مطبعة' },
  { id: 'coffee_shop', name: 'كوفي شوب' },
  { id: 'restaurant', name: 'مطعم' },
  { id: 'hotel', name: 'فندق' },
  { id: 'bank', name: 'بنك' },
  { id: 'supermarket', name: 'سوبر ماركت' },
  { id: 'gas_station', name: 'طرمبة وقود' },
  { id: 'mining_company', name: 'شركة تعدين' }
];

// Base structure for typical appliances (can be expanded later with mappings to facilityTypes)
export const typicalAppliances = [
  { id: 'light', name: 'إضاءة / لمبات', defaultWatts: 15, defaultHours: 8 },
  { id: 'fan', name: 'مروحة', defaultWatts: 70, defaultHours: 12 },
  { id: 'tv', name: 'تلفزيون', defaultWatts: 100, defaultHours: 6 },
  { id: 'fridge', name: 'ثلاجة', defaultWatts: 200, defaultHours: 24 },
  { id: 'ac', name: 'مكيف', defaultWatts: 1500, defaultHours: 8 },
  { id: 'water_pump', name: 'مضخة ماء', defaultWatts: 750, defaultHours: 2 },
  { id: 'computer', name: 'كمبيوتر', defaultWatts: 250, defaultHours: 8 },
  { id: 'other', name: 'جهاز آخر', defaultWatts: 100, defaultHours: 4 }
];
