export const facilityTypes = [
  { id: 'ice_factory', name: 'مصنع تلج' },
  { id: 'company', name: 'شركة' },
  { id: 'farm', name: 'مزرعة' },
  { id: 'poultry_farm', name: 'مزرعة دواجن' },
  { id: 'greenhouse', name: 'بيوت محمية' },
  { id: 'factory', name: 'مصنع' },
  { id: 'clinic', name: 'مستوصف' },
  { id: 'hospital', name: 'مستشفي' },
  { id: 'bakery', name: 'مخبز' },
  { id: 'shop', name: 'دكان' },
  { id: 'workshop', name: 'ورشة' },
  { id: 'water_pump', name: 'مضخة موية' },
  { id: 'donkey_cart', name: 'دونكي' },
  { id: 'mosque', name: 'مسجد' },
  { id: 'printing_press', name: 'مطبعة' },
  { id: 'coffee_shop', name: 'كوفي شوب' },
  { id: 'restaurant', name: 'مطعم' },
  { id: 'hotel', name: 'فندق' },
  { id: 'bank', name: 'بنك' },
  { id: 'supermarket', name: 'سوبر ماركت' },
  { id: 'gas_station', name: 'طرمبة وقود' },
  { id: 'mining_company', name: 'شركة تعدين' },
  { id: 'residential', name: 'منزل / سكني' },
  { id: 'custom', name: 'أخرى (تخصيص)' }
];

// Default appliance templates for common facility types
export const facilityTemplates = {
  mosque: [
    { id: '1', name: 'مروحة سقف', quantity: 10, wattage: 75, hoursPerDay: 8 },
    { id: '2', name: 'مكيف ماء', quantity: 4, wattage: 250, hoursPerDay: 8 },
    { id: '3', name: 'إضاءة LED', quantity: 20, wattage: 18, hoursPerDay: 6 },
    { id: '4', name: 'مكبر صوت', quantity: 1, wattage: 150, hoursPerDay: 3 },
    { id: '5', name: 'مضخة ماء صغيرة', quantity: 1, wattage: 750, hoursPerDay: 1 },
  ],
  residential: [
    { id: '1', name: 'إضاءة', quantity: 8, wattage: 15, hoursPerDay: 6 },
    { id: '2', name: 'مروحة', quantity: 4, wattage: 70, hoursPerDay: 12 },
    { id: '3', name: 'ثلاجة', quantity: 1, wattage: 150, hoursPerDay: 24 },
    { id: '4', name: 'تلفزيون', quantity: 1, wattage: 80, hoursPerDay: 6 },
  ],
  shop: [
    { id: '1', name: 'إضاءة', quantity: 4, wattage: 20, hoursPerDay: 12 },
    { id: '2', name: 'مروحة', quantity: 2, wattage: 75, hoursPerDay: 12 },
    { id: '3', name: 'ثلاجة عرض', quantity: 1, wattage: 300, hoursPerDay: 24 },
  ],
  farm: [
    { id: '1', name: 'مضخة ماء غاطسة', quantity: 1, wattage: 1500, hoursPerDay: 6 },
    { id: '2', name: 'إضاءة محيطية', quantity: 5, wattage: 30, hoursPerDay: 10 },
  ],
  clinic: [
     { id: '1', name: 'إضاءة', quantity: 10, wattage: 20, hoursPerDay: 10 },
     { id: '2', name: 'مكيف اسبليت', quantity: 2, wattage: 1500, hoursPerDay: 8 },
     { id: '3', name: 'ثلاجة أدوية', quantity: 1, wattage: 200, hoursPerDay: 24 },
     { id: '4', name: 'أجهزة طبية صغيرة', quantity: 3, wattage: 100, hoursPerDay: 6 },
  ],
  restaurant: [
    { id: '1', name: 'إضاءة', quantity: 15, wattage: 20, hoursPerDay: 14 },
    { id: '2', name: 'مراوح شفط', quantity: 2, wattage: 150, hoursPerDay: 10 },
    { id: '3', name: 'ثلاجات كبيرة', quantity: 3, wattage: 400, hoursPerDay: 24 },
    { id: '4', name: 'مكيفات', quantity: 3, wattage: 1500, hoursPerDay: 10 },
  ]
};

// Returns a deep copy of the template to avoid mutating the original
export const getTemplateForFacility = (facilityId) => {
  if (facilityTemplates[facilityId]) {
    return facilityTemplates[facilityId].map(item => ({...item, id: crypto.randomUUID()}));
  }
  return [];
};
