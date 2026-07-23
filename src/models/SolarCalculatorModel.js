export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع ثلج', consumptionMultiplier: 1.5 },
  { id: 'company', name: 'شركة', consumptionMultiplier: 1.0 },
  { id: 'farm', name: 'مزرعة', consumptionMultiplier: 1.2 },
  { id: 'poultry_farm', name: 'مزرعة دواجن', consumptionMultiplier: 1.3 },
  { id: 'greenhouse', name: 'بيوت محمية', consumptionMultiplier: 1.1 },
  { id: 'factory', name: 'مصنع', consumptionMultiplier: 2.0 },
  { id: 'clinic', name: 'مستوصف', consumptionMultiplier: 1.4 },
  { id: 'hospital', name: 'مستشفى', consumptionMultiplier: 1.8 },
  { id: 'bakery', name: 'مخبز', consumptionMultiplier: 1.6 },
  { id: 'shop', name: 'دكان', consumptionMultiplier: 0.8 },
  { id: 'workshop', name: 'ورشة', consumptionMultiplier: 1.5 },
  { id: 'water_pump', name: 'مضخة مياه', consumptionMultiplier: 1.7 },
  { id: 'donkey_engine', name: 'دونكي', consumptionMultiplier: 1.2 },
  { id: 'mosque', name: 'مسجد', consumptionMultiplier: 0.9 },
  { id: 'printing_press', name: 'مطبعة', consumptionMultiplier: 1.4 },
  { id: 'coffee_shop', name: 'كوفي شوب', consumptionMultiplier: 1.1 },
  { id: 'restaurant', name: 'مطعم', consumptionMultiplier: 1.3 },
  { id: 'hotel', name: 'فندق', consumptionMultiplier: 1.5 },
  { id: 'bank', name: 'بنك', consumptionMultiplier: 1.2 },
  { id: 'supermarket', name: 'سوبر ماركت', consumptionMultiplier: 1.3 },
  { id: 'gas_station', name: 'طرمبة وقود', consumptionMultiplier: 1.1 },
  { id: 'mining_company', name: 'شركة تعدين', consumptionMultiplier: 2.5 }
];

export const calculateSolarRequirements = (consumption, facilityTypeId) => {
  const facility = FACILITY_TYPES.find(f => f.id === facilityTypeId);
  const multiplier = facility ? facility.consumptionMultiplier : 1.0;

  // Basic calculation logic (can be expanded later)
  const adjustedConsumption = consumption * multiplier;

  // Assuming 1 kW solar panel generates ~4 kWh per day on average in the region
  const requiredCapacityKw = adjustedConsumption / 4;

  // Estimate number of panels (assuming 500W panels)
  const estimatedPanels = Math.ceil((requiredCapacityKw * 1000) / 500);

  // Estimate battery capacity (assuming 1.5 days autonomy and 50% depth of discharge)
  const estimatedBatteryKwh = adjustedConsumption * 1.5 * 2;

  return {
    adjustedDailyConsumption: adjustedConsumption.toFixed(2),
    requiredCapacityKw: requiredCapacityKw.toFixed(2),
    estimatedPanels,
    estimatedBatteryKwh: estimatedBatteryKwh.toFixed(2)
  };
};
