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
  { id: 'mining_company', name: 'شركة تعدين' }
];

export const consumptionPatterns = {
  ice_factory: { baseLoad: 50, peakLoad: 100 },
  company: { baseLoad: 10, peakLoad: 30 },
  farm: { baseLoad: 5, peakLoad: 20 },
  poultry_farm: { baseLoad: 15, peakLoad: 40 },
  greenhouse: { baseLoad: 5, peakLoad: 15 },
  factory: { baseLoad: 100, peakLoad: 300 },
  clinic: { baseLoad: 10, peakLoad: 25 },
  hospital: { baseLoad: 50, peakLoad: 150 },
  bakery: { baseLoad: 20, peakLoad: 60 },
  shop: { baseLoad: 2, peakLoad: 5 },
  workshop: { baseLoad: 15, peakLoad: 45 },
  water_pump: { baseLoad: 5, peakLoad: 15 },
  donkey_cart: { baseLoad: 0, peakLoad: 0 },
  mosque: { baseLoad: 2, peakLoad: 10 },
  printing_press: { baseLoad: 20, peakLoad: 50 },
  coffee_shop: { baseLoad: 5, peakLoad: 15 },
  restaurant: { baseLoad: 15, peakLoad: 40 },
  hotel: { baseLoad: 40, peakLoad: 100 },
  bank: { baseLoad: 10, peakLoad: 30 },
  supermarket: { baseLoad: 15, peakLoad: 40 },
  gas_station: { baseLoad: 5, peakLoad: 15 },
  mining_company: { baseLoad: 200, peakLoad: 500 }
};

export const calculateSolarRequirements = (facilityId, appliances) => {
  // Mock logic
  const pattern = consumptionPatterns[facilityId] || { baseLoad: 0, peakLoad: 0 };
  const applianceLoad = appliances.reduce((sum, app) => sum + (app.power || 0), 0);

  return {
    totalLoad: pattern.baseLoad + applianceLoad,
    peakLoad: pattern.peakLoad + applianceLoad,
    recommendedPanels: Math.ceil((pattern.peakLoad + applianceLoad) / 0.5), // Assuming 500W panels
  };
};
