import { SOLAR_PARAMETERS } from './solarConstants.js';

/**
 * Calculate the total daily energy requirement in Watt-hours (Wh)
 * @param {Array} appliances - Array of appliance objects { powerW, quantity, hours }
 * @returns {number} Total Wh per day
 */
export const calculateTotalDailyEnergy = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (app.powerW * app.quantity * app.hours);
  }, 0);
};

/**
 * Calculate the total peak power required in Watts (W)
 * @param {Array} appliances - Array of appliance objects { powerW, quantity, hours }
 * @returns {number} Total peak power in Watts
 */
export const calculateTotalPower = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (app.powerW * app.quantity);
  }, 0);
};

/**
 * Calculate the recommended inverter size in Watts (W)
 * Includes a safety margin to handle surges
 * @param {number} totalPower - Total peak power in Watts
 * @param {number} safetyMargin - Safety margin multiplier (e.g., 1.25 for 25%)
 * @returns {number} Recommended inverter size in Watts
 */
export const calculateInverterSize = (totalPower, safetyMargin = SOLAR_PARAMETERS.inverterSafetyMargin) => {
  return totalPower * safetyMargin;
};

/**
 * Calculate the total solar array capacity required in Watts (W)
 * @param {number} totalDailyEnergy - Total daily energy in Wh
 * @param {number} systemLossFactor - Multiplier for system losses (e.g., 1.3 for 30% loss)
 * @param {number} peakSunHours - Average peak sun hours per day
 * @returns {number} Required solar array capacity in Watts
 */
export const calculateSolarArrayCapacity = (
  totalDailyEnergy,
  systemLossFactor = SOLAR_PARAMETERS.systemLossFactor,
  peakSunHours = SOLAR_PARAMETERS.peakSunHours
) => {
  if (peakSunHours === 0) return 0;
  return (totalDailyEnergy * systemLossFactor) / peakSunHours;
};

/**
 * Calculate the required battery bank capacity in Amp-hours (Ah)
 * @param {number} totalDailyEnergy - Total daily energy in Wh
 * @param {number} daysOfAutonomy - Number of days the system needs to run without sun
 * @param {number} systemVoltage - Battery system voltage (e.g., 12, 24, 48)
 * @param {number} depthOfDischarge - Allowed depth of discharge (e.g., 0.5 for 50%)
 * @returns {number} Battery bank capacity in Ah
 */
export const calculateBatteryCapacity = (
  totalDailyEnergy,
  daysOfAutonomy = 1,
  systemVoltage = SOLAR_PARAMETERS.batterySystemVoltage,
  depthOfDischarge = SOLAR_PARAMETERS.batteryDepthOfDischarge
) => {
  if (systemVoltage === 0 || depthOfDischarge === 0) return 0;
  return (totalDailyEnergy * daysOfAutonomy) / (systemVoltage * depthOfDischarge);
};

/**
 * Complete solar system sizing calculation
 * @param {Array} appliances - Array of appliances
 * @param {number} daysOfAutonomy - Required days without sun (default 1)
 * @returns {Object} Complete sizing results
 */
export const calculateSolarSystem = (appliances, daysOfAutonomy = 1) => {
  const totalEnergyWh = calculateTotalDailyEnergy(appliances);
  const totalPowerW = calculateTotalPower(appliances);

  const inverterSizeW = calculateInverterSize(totalPowerW);
  const solarArrayCapacityW = calculateSolarArrayCapacity(totalEnergyWh);
  const batteryCapacityAh = calculateBatteryCapacity(totalEnergyWh, daysOfAutonomy);

  return {
    totalEnergyWh,
    totalPowerW,
    inverterSizeW,
    solarArrayCapacityW,
    batteryCapacityAh,
    // Provide some practical recommendations based on common component sizes
    recommendedPanels: Math.ceil(solarArrayCapacityW / 550), // Assuming 550W panels
    recommendedBatteries: Math.ceil(batteryCapacityAh / 200) // Assuming 200Ah batteries per string (simplification)
  };
};
