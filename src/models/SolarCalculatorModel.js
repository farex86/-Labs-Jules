// Constants for specific calculations
const SUN_HOURS_PER_DAY = 6;
const SYSTEM_LOSS_FACTOR = 1.3; // 30% system losses (inverter, wiring, temp)
const BATTERY_EFFICIENCY = 0.85; // 85% battery efficiency
const BATTERY_DOD = 0.5; // 50% Depth of Discharge for Lead-Acid, can be adjusted for Lithium

export const facilityTypes = [
  { id: 'ice_factory', name: 'مصنع تلج', defaultPowerKW: 50, defaultHours: 24, description: 'Ice Factory' },
  { id: 'company', name: 'شركة', defaultPowerKW: 10, defaultHours: 8, description: 'Company/Office' },
  { id: 'farm', name: 'مزرعة', defaultPowerKW: 15, defaultHours: 10, description: 'Farm' },
  { id: 'poultry_farm', name: 'مزرعة دواجن', defaultPowerKW: 20, defaultHours: 24, description: 'Poultry Farm' },
  { id: 'greenhouse', name: 'بيوت محمية', defaultPowerKW: 8, defaultHours: 12, description: 'Greenhouse' },
  { id: 'factory', name: 'مصنع', defaultPowerKW: 100, defaultHours: 16, description: 'General Factory' },
  { id: 'clinic', name: 'مستوصف', defaultPowerKW: 12, defaultHours: 12, description: 'Clinic' },
  { id: 'hospital', name: 'مستشفى', defaultPowerKW: 150, defaultHours: 24, description: 'Hospital' },
  { id: 'bakery', name: 'مخبز', defaultPowerKW: 30, defaultHours: 14, description: 'Bakery' },
  { id: 'shop', name: 'دكان', defaultPowerKW: 3, defaultHours: 12, description: 'Small Shop' },
  { id: 'workshop', name: 'ورشة', defaultPowerKW: 15, defaultHours: 10, description: 'Workshop' },
  { id: 'water_pump', name: 'مضخة موية', defaultPowerKW: 5, defaultHours: 8, description: 'Water Pump' },
  { id: 'donkey', name: 'دونكي', defaultPowerKW: 2, defaultHours: 6, description: 'Donkey (Small pump/mill)' },
  { id: 'mosque', name: 'مسجد', defaultPowerKW: 8, defaultHours: 6, description: 'Mosque' },
  { id: 'printing_press', name: 'مطبعة', defaultPowerKW: 25, defaultHours: 10, description: 'Printing Press' },
  { id: 'coffee_shop', name: 'كوفي شوب', defaultPowerKW: 10, defaultHours: 16, description: 'Coffee Shop' },
  { id: 'restaurant', name: 'مطعم', defaultPowerKW: 20, defaultHours: 16, description: 'Restaurant' },
  { id: 'hotel', name: 'فندق', defaultPowerKW: 80, defaultHours: 24, description: 'Hotel' },
  { id: 'bank', name: 'بنك', defaultPowerKW: 40, defaultHours: 10, description: 'Bank' },
  { id: 'supermarket', name: 'سوبر ماركت', defaultPowerKW: 30, defaultHours: 18, description: 'Supermarket' },
  { id: 'gas_station', name: 'طرمبة وقود', defaultPowerKW: 15, defaultHours: 24, description: 'Gas Station' },
  { id: 'mining_company', name: 'شركة تعدين', defaultPowerKW: 200, defaultHours: 24, description: 'Mining Company' }
];

/**
 * Calculate the estimated solar system requirements
 * @param {number} totalDailyEnergyKWh - Total daily energy consumption in kWh
 * @returns {Object} Estimated system requirements
 */
export const calculateSolarSystem = (totalDailyEnergyKWh) => {
  // Required daily generation to cover consumption + losses
  const requiredDailyGeneration = totalDailyEnergyKWh * SYSTEM_LOSS_FACTOR;

  // Solar array size in kW
  const recommendedSolarArrayKW = requiredDailyGeneration / SUN_HOURS_PER_DAY;

  // Recommended Inverter size (usually slightly larger than max expected load, simplified here)
  // Assuming average load is distributed, we estimate peak load as a factor of daily energy
  // For a more accurate inverter size, peak load in kW needs to be provided.
  // We'll use a conservative estimate: 20% of daily KWh as peak kW load.
  const estimatedPeakLoadKW = totalDailyEnergyKWh * 0.2;
  const recommendedInverterKW = estimatedPeakLoadKW * 1.25; // 25% safety margin

  // Battery storage calculation (Assuming 1 day of autonomy)
  // Required capacity = (Daily Energy / Battery Efficiency) / Depth of Discharge
  const requiredBatteryCapacityKWh = (totalDailyEnergyKWh / BATTERY_EFFICIENCY) / BATTERY_DOD;

  return {
    dailyEnergyKWh: totalDailyEnergyKWh.toFixed(2),
    solarArrayKW: recommendedSolarArrayKW.toFixed(2),
    inverterKW: recommendedInverterKW.toFixed(2),
    batteryCapacityKWh: requiredBatteryCapacityKWh.toFixed(2),
    panelsRequired: Math.ceil((recommendedSolarArrayKW * 1000) / 500) // Assuming 500W panels
  };
};

export const getFacilityDetails = (facilityId) => {
    return facilityTypes.find(f => f.id === facilityId);
};
