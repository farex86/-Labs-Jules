export const facilityTypes = [
  { id: 'ice_factory', name: 'مصنع ثلج', defaultLoadKw: 50 },
  { id: 'company', name: 'شركة', defaultLoadKw: 20 },
  { id: 'farm', name: 'مزرعة', defaultLoadKw: 15 },
  { id: 'poultry_farm', name: 'مزرعة دواجن', defaultLoadKw: 30 },
  { id: 'greenhouses', name: 'بيوت محمية', defaultLoadKw: 10 },
  { id: 'factory', name: 'مصنع', defaultLoadKw: 100 },
  { id: 'clinic', name: 'مستوصف', defaultLoadKw: 15 },
  { id: 'hospital', name: 'مستشفى', defaultLoadKw: 150 },
  { id: 'bakery', name: 'مخبز', defaultLoadKw: 25 },
  { id: 'shop', name: 'دكان', defaultLoadKw: 5 },
  { id: 'workshop', name: 'ورشة', defaultLoadKw: 15 },
  { id: 'water_pump', name: 'مضخة مياه', defaultLoadKw: 10 },
  { id: 'donkey', name: 'دونكي', defaultLoadKw: 5 }, // Note: Keeping 'دونكي' as requested, though it typically means 'donkey engine' (water pump) in Sudanese context.
  { id: 'mosque', name: 'مسجد', defaultLoadKw: 10 },
  { id: 'printing_press', name: 'مطبعة', defaultLoadKw: 35 },
  { id: 'coffee_shop', name: 'كوفي شوب', defaultLoadKw: 12 },
  { id: 'restaurant', name: 'مطعم', defaultLoadKw: 20 },
  { id: 'hotel', name: 'فندق', defaultLoadKw: 80 },
  { id: 'bank', name: 'بنك', defaultLoadKw: 40 },
  { id: 'supermarket', name: 'سوبر ماركت', defaultLoadKw: 30 },
  { id: 'gas_station', name: 'طرمبة وقود', defaultLoadKw: 15 },
  { id: 'mining_company', name: 'شركة تعدين', defaultLoadKw: 200 },
];

export const calculateSolarNeeds = (facilityId, customLoadKw) => {
  const facility = facilityTypes.find(f => f.id === facilityId) || facilityTypes[0];
  const loadKw = customLoadKw > 0 ? customLoadKw : facility.defaultLoadKw;

  // Very basic mock calculation for demonstration purposes
  const systemSizeKw = loadKw * 1.2; // 20% margin
  const panelPowerWatts = 550; // Assume 550W panels
  const numberOfPanels = Math.ceil((systemSizeKw * 1000) / panelPowerWatts);
  const batteryCapacityKwh = systemSizeKw * 4; // Assume 4 hours of battery backup
  const estimatedCostUsd = systemSizeKw * 1000; // Roughly $1000 per kW installed

  return {
    facilityName: facility.name,
    systemSizeKw: systemSizeKw.toFixed(1),
    numberOfPanels,
    batteryCapacityKwh: batteryCapacityKwh.toFixed(1),
    estimatedCostUsd: estimatedCostUsd.toLocaleString(),
  };
};
