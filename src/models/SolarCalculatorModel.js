export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع تلج', baseLoad: 50, avgHours: 12 },
  { id: 'company', name: 'شركة', baseLoad: 15, avgHours: 8 },
  { id: 'farm', name: 'مزرعة', baseLoad: 10, avgHours: 10 },
  { id: 'poultry_farm', name: 'مزرعة دواجن', baseLoad: 20, avgHours: 24 },
  { id: 'greenhouses', name: 'بيوت محمية', baseLoad: 5, avgHours: 12 },
  { id: 'factory', name: 'مصنع', baseLoad: 100, avgHours: 16 },
  { id: 'clinic', name: 'مستوصف', baseLoad: 25, avgHours: 24 },
  { id: 'hospital', name: 'مستشفي', baseLoad: 200, avgHours: 24 },
  { id: 'bakery', name: 'مخبز', baseLoad: 40, avgHours: 12 },
  { id: 'shop', name: 'دكان', baseLoad: 5, avgHours: 12 },
  { id: 'workshop', name: 'ورشة', baseLoad: 30, avgHours: 8 },
  { id: 'water_pump', name: 'مضخة موية', baseLoad: 15, avgHours: 6 },
  { id: 'donkey_cart', name: 'دونكي', baseLoad: 2, avgHours: 4 }, // Assuming a small electric assist or similar, adapt as needed
  { id: 'mosque', name: 'مسجد', baseLoad: 10, avgHours: 6 },
  { id: 'printing_press', name: 'مطبعة', baseLoad: 50, avgHours: 10 },
  { id: 'coffee_shop', name: 'كوفي شوب', baseLoad: 20, avgHours: 16 },
  { id: 'restaurant', name: 'مطعم', baseLoad: 40, avgHours: 16 },
  { id: 'hotel', name: 'فندق', baseLoad: 150, avgHours: 24 },
  { id: 'bank', name: 'بنك', baseLoad: 30, avgHours: 10 },
  { id: 'supermarket', name: 'سوبر ماركت', baseLoad: 60, avgHours: 16 },
  { id: 'gas_station', name: 'طرمبة وقود', baseLoad: 25, avgHours: 24 },
  { id: 'mining_company', name: 'شركة تعدين', baseLoad: 500, avgHours: 24 }
];

export const calculateSolarNeeds = (facilityId, customLoad = null, customHours = null) => {
  const facility = FACILITY_TYPES.find(f => f.id === facilityId);
  if (!facility) return null;

  const load = customLoad !== null ? customLoad : facility.baseLoad;
  const hours = customHours !== null ? customHours : facility.avgHours;

  const dailyEnergyConsumptionWh = load * hours * 1000; // Wh
  const dailyEnergyConsumptionKWh = load * hours; // kWh

  // Assume average of 5 peak sun hours per day
  const PEAK_SUN_HOURS = 5;
  // System efficiency (inverter losses, wiring, etc) ~ 80%
  const SYSTEM_EFFICIENCY = 0.8;

  const requiredSolarCapacityKW = dailyEnergyConsumptionKWh / (PEAK_SUN_HOURS * SYSTEM_EFFICIENCY);

  // Assume a standard solar panel is 500W (0.5kW)
  const PANEL_CAPACITY_KW = 0.5;
  const numberOfPanels = Math.ceil(requiredSolarCapacityKW / PANEL_CAPACITY_KW);

  // Battery sizing - assume we need 1 day of autonomy
  // Battery voltage 48V, Depth of Discharge (DoD) 80%
  const BATTERY_VOLTAGE = 48;
  const BATTERY_DOD = 0.8;

  const batteryCapacityAh = (dailyEnergyConsumptionWh) / (BATTERY_VOLTAGE * BATTERY_DOD);

  return {
    dailyConsumption: dailyEnergyConsumptionKWh,
    requiredCapacity: requiredSolarCapacityKW,
    numberOfPanels: numberOfPanels,
    batteryCapacityAh: batteryCapacityAh,
    estimatedCost: requiredSolarCapacityKW * 1000 // Very rough estimate: $1000 per kW installed
  };
};
