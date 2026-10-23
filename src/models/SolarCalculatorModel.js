// Business Logic and Configuration for Solar Calculator

// List of facility types with basic consumption patterns (example values for calculation purposes)
export const facilityTypes = [
  { id: 'ice_factory', name: 'مصنع تلج', baseLoadKw: 50, hoursPerDay: 24, recommendedSystemType: 'On-Grid / Hybrid' },
  { id: 'company', name: 'شركة', baseLoadKw: 20, hoursPerDay: 10, recommendedSystemType: 'On-Grid' },
  { id: 'farm', name: 'مزرعة', baseLoadKw: 15, hoursPerDay: 12, recommendedSystemType: 'Off-Grid' },
  { id: 'poultry_farm', name: 'مزرعة دواجن', baseLoadKw: 30, hoursPerDay: 24, recommendedSystemType: 'Hybrid' },
  { id: 'greenhouse', name: 'بيوت محمية', baseLoadKw: 10, hoursPerDay: 12, recommendedSystemType: 'Off-Grid' },
  { id: 'factory', name: 'مصنع', baseLoadKw: 100, hoursPerDay: 16, recommendedSystemType: 'On-Grid' },
  { id: 'clinic', name: 'مستوصف', baseLoadKw: 25, hoursPerDay: 24, recommendedSystemType: 'Hybrid' },
  { id: 'hospital', name: 'مستشفى', baseLoadKw: 200, hoursPerDay: 24, recommendedSystemType: 'Hybrid' },
  { id: 'bakery', name: 'مخبز', baseLoadKw: 40, hoursPerDay: 16, recommendedSystemType: 'On-Grid' },
  { id: 'shop', name: 'دكان', baseLoadKw: 5, hoursPerDay: 14, recommendedSystemType: 'Off-Grid' },
  { id: 'workshop', name: 'ورشة', baseLoadKw: 35, hoursPerDay: 10, recommendedSystemType: 'On-Grid' },
  { id: 'water_pump', name: 'مضخة موية', baseLoadKw: 15, hoursPerDay: 8, recommendedSystemType: 'Off-Grid (Solar Pump)' },
  { id: 'donkey', name: 'دونكي', baseLoadKw: 2, hoursPerDay: 6, recommendedSystemType: 'Off-Grid' },
  { id: 'mosque', name: 'مسجد', baseLoadKw: 15, hoursPerDay: 6, recommendedSystemType: 'On-Grid / Hybrid' },
  { id: 'printing_press', name: 'مطبعة', baseLoadKw: 60, hoursPerDay: 12, recommendedSystemType: 'On-Grid' },
  { id: 'coffee_shop', name: 'كوفي شوب', baseLoadKw: 15, hoursPerDay: 16, recommendedSystemType: 'On-Grid / Hybrid' },
  { id: 'restaurant', name: 'مطعم', baseLoadKw: 30, hoursPerDay: 16, recommendedSystemType: 'On-Grid / Hybrid' },
  { id: 'hotel', name: 'فندق', baseLoadKw: 150, hoursPerDay: 24, recommendedSystemType: 'On-Grid / Hybrid' },
  { id: 'bank', name: 'بنك', baseLoadKw: 40, hoursPerDay: 12, recommendedSystemType: 'Hybrid' },
  { id: 'supermarket', name: 'سوبر ماركت', baseLoadKw: 50, hoursPerDay: 24, recommendedSystemType: 'On-Grid / Hybrid' },
  { id: 'gas_station', name: 'طرمبة وقود', baseLoadKw: 20, hoursPerDay: 24, recommendedSystemType: 'Hybrid' },
  { id: 'mining_company', name: 'شركة تعدين', baseLoadKw: 500, hoursPerDay: 24, recommendedSystemType: 'Off-Grid / Hybrid' }
];

/**
 * Calculate the estimated solar system requirements.
 * @param {Object} facility - The selected facility type object.
 * @param {number} customLoadKw - Optional user-defined load in kW, overrides facility base load.
 * @param {number} customHours - Optional user-defined daily hours, overrides facility hours.
 * @returns {Object} Estimated requirements.
 */
export const calculateSolarRequirements = (facility, customLoadKw, customHours) => {
  if (!facility) return null;

  const loadKw = customLoadKw > 0 ? parseFloat(customLoadKw) : facility.baseLoadKw;
  const hours = customHours > 0 ? parseFloat(customHours) : facility.hoursPerDay;

  // Daily energy consumption in kWh
  const dailyConsumptionKwh = loadKw * hours;

  // Assuming an average of 5 peak sun hours per day
  const peakSunHours = 5;

  // System losses (inefficiency factor around 1.3 to 1.4, meaning 70-75% efficiency)
  const inefficiencyFactor = 1.35;

  // Required Solar Array Capacity (kW)
  const requiredCapacityKw = (dailyConsumptionKwh / peakSunHours) * inefficiencyFactor;

  // Assuming 550W (0.55kW) panels
  const panelWattageKw = 0.55;
  const estimatedPanels = Math.ceil(requiredCapacityKw / panelWattageKw);

  // Battery estimation (for 1 day of autonomy if off-grid or hybrid)
  // Assuming 48V 200Ah (9.6kWh) batteries with 50% Depth of Discharge
  const batteryCapacityKwh = 9.6;
  const usableBatteryKwh = batteryCapacityKwh * 0.5;
  const estimatedBatteries = Math.ceil(dailyConsumptionKwh / usableBatteryKwh);

  return {
    facilityName: facility.name,
    dailyConsumptionKwh: dailyConsumptionKwh.toFixed(2),
    requiredCapacityKw: requiredCapacityKw.toFixed(2),
    estimatedPanels,
    estimatedBatteries: facility.recommendedSystemType.includes('Off-Grid') || facility.recommendedSystemType.includes('Hybrid') ? estimatedBatteries : 0,
    recommendedSystemType: facility.recommendedSystemType
  };
};
