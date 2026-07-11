/**
 * Calculates the total daily energy consumption in Watt-hours.
 * @param {Array} devices - List of devices, each with { power: number, hours: number, quantity: number }
 * @returns {number} Total daily energy in Watt-hours
 */
export const calculateTotalEnergy = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.power * device.hours * device.quantity);
  }, 0);
};

/**
 * Calculates the required solar panel array size in Watts.
 * Assumes 5 peak sun hours and an efficiency factor of 0.8 (losses).
 * @param {number} totalEnergyWh - Total daily energy in Watt-hours
 * @param {number} peakSunHours - Average peak sun hours per day
 * @param {number} systemEfficiency - System efficiency factor (e.g., 0.8)
 * @returns {number} Required solar array size in Watts
 */
export const calculateSolarArraySize = (totalEnergyWh, peakSunHours = 5, systemEfficiency = 0.8) => {
  if (totalEnergyWh === 0) return 0;
  return totalEnergyWh / (peakSunHours * systemEfficiency);
};

/**
 * Calculates the required battery capacity in Amp-hours (Ah).
 * @param {number} totalEnergyWh - Total daily energy in Watt-hours
 * @param {number} batteryVoltage - System battery voltage (e.g., 12, 24, 48)
 * @param {number} daysOfAutonomy - Number of days the system needs to run without sun
 * @param {number} depthOfDischarge - Allowed depth of discharge for batteries (e.g., 0.5 for Lead-Acid)
 * @returns {number} Required battery capacity in Ah
 */
export const calculateBatteryCapacity = (totalEnergyWh, batteryVoltage = 24, daysOfAutonomy = 1, depthOfDischarge = 0.5) => {
  if (totalEnergyWh === 0) return 0;
  return (totalEnergyWh * daysOfAutonomy) / (batteryVoltage * depthOfDischarge);
};

/**
 * Calculates the recommended inverter size in Watts.
 * Assumes an additional safety factor (e.g., 1.25 for 25% extra capacity).
 * @param {Array} devices - List of devices to calculate peak power surge
 * @param {number} safetyFactor - Extra capacity multiplier
 * @returns {number} Recommended inverter size in Watts
 */
export const calculateInverterSize = (devices, safetyFactor = 1.25) => {
  const totalPower = devices.reduce((total, device) => {
    return total + (device.power * device.quantity);
  }, 0);
  return totalPower * safetyFactor;
};

/**
 * Generates a complete system recommendation based on the provided devices.
 * @param {Array} devices - List of devices
 * @returns {Object} Full system recommendations
 */
export const calculateSystemRecommendation = (devices) => {
  const totalEnergyWh = calculateTotalEnergy(devices);
  const solarArrayW = calculateSolarArraySize(totalEnergyWh);
  const batteryCapacityAh = calculateBatteryCapacity(totalEnergyWh);
  const inverterSizeW = calculateInverterSize(devices);

  return {
    totalEnergyWh,
    solarArrayW,
    batteryCapacityAh,
    inverterSizeW,
  };
};
