export const facilityTypes = [
  { id: 'ice_factory', nameAr: 'مصنع ثلج', defaultLoadKw: 50, recommendedInverterKw: 60, recommendedPanels: 120, defaultUsageHours: 12 },
  { id: 'company', nameAr: 'شركة', defaultLoadKw: 15, recommendedInverterKw: 20, recommendedPanels: 40, defaultUsageHours: 10 },
  { id: 'farm', nameAr: 'مزرعة', defaultLoadKw: 30, recommendedInverterKw: 40, recommendedPanels: 75, defaultUsageHours: 12 },
  { id: 'poultry_farm', nameAr: 'مزرعة دواجن', defaultLoadKw: 25, recommendedInverterKw: 30, recommendedPanels: 60, defaultUsageHours: 24 },
  { id: 'greenhouse', nameAr: 'بيوت محمية', defaultLoadKw: 10, recommendedInverterKw: 12, recommendedPanels: 25, defaultUsageHours: 12 },
  { id: 'factory', nameAr: 'مصنع', defaultLoadKw: 100, recommendedInverterKw: 120, recommendedPanels: 250, defaultUsageHours: 16 },
  { id: 'clinic', nameAr: 'مستوصف', defaultLoadKw: 20, recommendedInverterKw: 25, recommendedPanels: 50, defaultUsageHours: 24 },
  { id: 'hospital', nameAr: 'مستشفى', defaultLoadKw: 150, recommendedInverterKw: 180, recommendedPanels: 380, defaultUsageHours: 24 },
  { id: 'bakery', nameAr: 'مخبز', defaultLoadKw: 40, recommendedInverterKw: 50, recommendedPanels: 100, defaultUsageHours: 16 },
  { id: 'shop', nameAr: 'دكان', defaultLoadKw: 5, recommendedInverterKw: 8, recommendedPanels: 12, defaultUsageHours: 12 },
  { id: 'workshop', nameAr: 'ورشة', defaultLoadKw: 20, recommendedInverterKw: 25, recommendedPanels: 50, defaultUsageHours: 10 },
  { id: 'water_pump', nameAr: 'مضخة مياه', defaultLoadKw: 15, recommendedInverterKw: 20, recommendedPanels: 40, defaultUsageHours: 8 },
  { id: 'donkey_engine', nameAr: 'دونكي', defaultLoadKw: 10, recommendedInverterKw: 15, recommendedPanels: 25, defaultUsageHours: 8 },
  { id: 'mosque', nameAr: 'مسجد', defaultLoadKw: 10, recommendedInverterKw: 15, recommendedPanels: 25, defaultUsageHours: 6 },
  { id: 'printing_press', nameAr: 'مطبعة', defaultLoadKw: 30, recommendedInverterKw: 40, recommendedPanels: 75, defaultUsageHours: 10 },
  { id: 'coffee_shop', nameAr: 'كوفي شوب', defaultLoadKw: 15, recommendedInverterKw: 20, recommendedPanels: 40, defaultUsageHours: 16 },
  { id: 'restaurant', nameAr: 'مطعم', defaultLoadKw: 25, recommendedInverterKw: 30, recommendedPanels: 60, defaultUsageHours: 16 },
  { id: 'hotel', nameAr: 'فندق', defaultLoadKw: 80, recommendedInverterKw: 100, recommendedPanels: 200, defaultUsageHours: 24 },
  { id: 'bank', nameAr: 'بنك', defaultLoadKw: 30, recommendedInverterKw: 40, recommendedPanels: 75, defaultUsageHours: 10 },
  { id: 'supermarket', nameAr: 'سوبر ماركت', defaultLoadKw: 40, recommendedInverterKw: 50, recommendedPanels: 100, defaultUsageHours: 16 },
  { id: 'gas_station', nameAr: 'طرمبة وقود', defaultLoadKw: 15, recommendedInverterKw: 20, recommendedPanels: 40, defaultUsageHours: 24 },
  { id: 'mining_company', nameAr: 'شركة تعدين', defaultLoadKw: 200, recommendedInverterKw: 250, recommendedPanels: 500, defaultUsageHours: 24 },
];

export const calculateSolarRequirements = (loadKw, usageHours) => {
  // Simple estimation logic
  const dailyEnergyKwh = loadKw * usageHours;
  // Assuming 5 peak sun hours per day and 80% system efficiency
  const requiredSolarCapacityKw = dailyEnergyKwh / (5 * 0.8);

  const recommendedInverterKw = loadKw * 1.25; // 25% overhead

  // Assuming each panel is 500W (0.5kW)
  const recommendedPanels = Math.ceil(requiredSolarCapacityKw / 0.5);

  // Approximate battery capacity for full backup, assuming 50% Depth of Discharge for Lead-Acid, or 80% for Lithium
  const requiredBatteryCapacityKwh = dailyEnergyKwh / 0.8;

  return {
    dailyEnergyKwh: dailyEnergyKwh.toFixed(2),
    requiredSolarCapacityKw: requiredSolarCapacityKw.toFixed(2),
    recommendedInverterKw: recommendedInverterKw.toFixed(2),
    recommendedPanels,
    requiredBatteryCapacityKwh: requiredBatteryCapacityKwh.toFixed(2),
  };
};
