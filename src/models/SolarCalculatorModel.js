export const facilityTypes = [
  { id: 'ice_factory', name: 'مصنع تلج', baseConsumption: 15000 },
  { id: 'company', name: 'شركة', baseConsumption: 5000 },
  { id: 'farm', name: 'مزرعة', baseConsumption: 8000 },
  { id: 'poultry_farm', name: 'مزرعة دواجن', baseConsumption: 12000 },
  { id: 'greenhouse', name: 'بيوت محمية', baseConsumption: 6000 },
  { id: 'factory', name: 'مصنع', baseConsumption: 25000 },
  { id: 'clinic', name: 'مستوصف', baseConsumption: 4000 },
  { id: 'hospital', name: 'مستشفي', baseConsumption: 30000 },
  { id: 'bakery', name: 'مخبز', baseConsumption: 10000 },
  { id: 'shop', name: 'دكان', baseConsumption: 1500 },
  { id: 'workshop', name: 'ورشة', baseConsumption: 7000 },
  { id: 'water_pump', name: 'مضخة موية', baseConsumption: 4500 },
  { id: 'donkey_cart', name: 'دونكي', baseConsumption: 500 },
  { id: 'mosque', name: 'مسجد', baseConsumption: 2000 },
  { id: 'printing_press', name: 'مطبعة', baseConsumption: 8000 },
  { id: 'coffee_shop', name: 'كوفي شوب', baseConsumption: 3500 },
  { id: 'restaurant', name: 'مطعم', baseConsumption: 9000 },
  { id: 'hotel', name: 'فندق', baseConsumption: 20000 },
  { id: 'bank', name: 'بنك', baseConsumption: 6000 },
  { id: 'supermarket', name: 'سوبر ماركت', baseConsumption: 12000 },
  { id: 'gas_station', name: 'طرمبة وقود', baseConsumption: 5000 },
  { id: 'mining_company', name: 'شركة تعدين', baseConsumption: 40000 }
];

export const calculateSolarRequirements = (state) => {
  const selectedFacility = facilityTypes.find(f => f.id === state.facilityType);
  const baseConsumption = selectedFacility ? selectedFacility.baseConsumption : 0;
  const customConsumption = state.customConsumption ? parseFloat(state.customConsumption) : 0;

  // Total daily consumption in Watt-hours
  const totalDailyConsumption = (baseConsumption + customConsumption) * (state.hoursOfOperation || 1);

  // Assuming 5 peak sun hours per day
  const peakSunHours = 5;

  // System losses factor (e.g., 20% loss -> 0.8 efficiency)
  const systemEfficiency = 0.8;

  // Required solar array capacity in Watts
  const requiredCapacity = totalDailyConsumption / (peakSunHours * systemEfficiency);

  // Assuming each panel is 500W
  const panelCapacity = 500;
  const numberOfPanels = Math.ceil(requiredCapacity / panelCapacity);

  // Battery capacity (assuming 2 days of autonomy and 50% depth of discharge, 48V system)
  // Total capacity required in Watt-hours for 2 days
  const requiredBatteryCapacityWh = (totalDailyConsumption * 2) / 0.5;
  // Ah required at 48V
  const requiredBatteryCapacityAh = requiredBatteryCapacityWh / 48;

  return {
    totalDailyConsumption,
    requiredCapacity,
    numberOfPanels,
    requiredBatteryCapacityAh
  };
};
