export const SYSTEM_CONSTANTS = {
  INVERTER_EFFICIENCY: 0.9,
  CONCURRENCY_FACTOR: 0.8, // Assumes 80% of appliances run at the same time
  PEAK_SUN_HOURS: 5, // Average for sunny regions
  SYSTEM_EFFICIENCY: 0.8, // Losses from wiring, dust, etc.
  BATTERY_VOLTAGE: 48, // Standard system voltage
  BATTERY_DOD: 0.5, // Depth of Discharge (50% for Lead Acid/Gel, can be 0.8 for Lithium)
  DAYS_OF_AUTONOMY: 1 // Days system can run without sun
};

/**
 * Calculates the total daily energy consumption in Watt-hours (Wh)
 */
export const calculateTotalDailyEnergy = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (app.powerWatts * app.quantity * app.hoursPerDay);
  }, 0);
};

/**
 * Calculates the total peak load in Watts (W)
 */
export const calculatePeakLoad = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (app.powerWatts * app.quantity);
  }, 0);
};

/**
 * Calculates the required Inverter size in kVA
 */
export const calculateInverterSize = (peakLoadW) => {
  // Add safety margin and concurrency, convert to VA assuming 0.8 Power Factor
  const requiredVA = (peakLoadW * SYSTEM_CONSTANTS.CONCURRENCY_FACTOR) / 0.8;
  return Math.ceil(requiredVA / 1000); // Return in kVA
};

/**
 * Calculates the required Battery Capacity in Amp-hours (Ah)
 */
export const calculateBatteryCapacity = (dailyEnergyWh) => {
  const requiredWh = (dailyEnergyWh * SYSTEM_CONSTANTS.DAYS_OF_AUTONOMY) / SYSTEM_CONSTANTS.BATTERY_DOD;
  return Math.ceil(requiredWh / SYSTEM_CONSTANTS.BATTERY_VOLTAGE);
};

/**
 * Calculates the required Solar Array size in Watts (W)
 */
export const calculateSolarArraySize = (dailyEnergyWh) => {
  return Math.ceil(dailyEnergyWh / (SYSTEM_CONSTANTS.PEAK_SUN_HOURS * SYSTEM_CONSTANTS.SYSTEM_EFFICIENCY));
};

/**
 * Computes all solar system requirements based on a list of appliances
 */
export const calculateSystemRequirements = (appliances) => {
  const dailyEnergyWh = calculateTotalDailyEnergy(appliances);
  const peakLoadW = calculatePeakLoad(appliances);

  return {
    dailyEnergyWh,
    dailyEnergyKWh: (dailyEnergyWh / 1000).toFixed(2),
    peakLoadW,
    inverterSizeKVA: calculateInverterSize(peakLoadW),
    batteryCapacityAh: calculateBatteryCapacity(dailyEnergyWh),
    solarArraySizeW: calculateSolarArraySize(dailyEnergyWh),
    suggestedPanels: Math.ceil(calculateSolarArraySize(dailyEnergyWh) / 550), // Assuming 550W panels
    suggestedBatteries: Math.ceil(calculateBatteryCapacity(dailyEnergyWh) / 200) // Assuming 200Ah/48V batteries
  };
};
