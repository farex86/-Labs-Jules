import { SYSTEM_CONSTANTS } from './solarConstants';

/**
 * Calculates the total power (Watts) for a list of devices.
 * Formula: sum(power * quantity)
 * @param {Array} devices - Array of device objects { power, quantity }
 * @returns {number} Total Power in Watts
 */
export const calculateTotalPower = (devices) => {
  return devices.reduce((total, device) => total + (device.power * device.quantity), 0);
};

/**
 * Calculates the total daily energy consumption (Watt-hours).
 * Formula: sum(power * quantity * hoursPerDay)
 * @param {Array} devices - Array of device objects { power, quantity, hoursPerDay }
 * @returns {number} Total Energy in Watt-hours
 */
export const calculateDailyEnergy = (devices) => {
  return devices.reduce((total, device) => total + (device.power * device.quantity * device.hoursPerDay), 0);
};

/**
 * Calculates the required inverter size (Watts).
 * Formula: totalPower * safetyFactor
 * @param {number} totalPower - Total power in Watts
 * @returns {number} Required inverter size in Watts
 */
export const calculateRequiredInverter = (totalPower) => {
  return totalPower * SYSTEM_CONSTANTS.INVERTER_SAFETY_FACTOR;
};

/**
 * Calculates the required battery capacity (Ampere-hours).
 * Formula: (totalDailyEnergy) / (systemVoltage * depthOfDischarge)
 * @param {number} totalDailyEnergy - Total daily energy in Watt-hours
 * @returns {number} Required battery capacity in Ah
 */
export const calculateRequiredBatteryCapacity = (totalDailyEnergy) => {
  if (totalDailyEnergy === 0) return 0;
  return totalDailyEnergy / (SYSTEM_CONSTANTS.SYSTEM_VOLTAGE * SYSTEM_CONSTANTS.BATTERY_DEPTH_OF_DISCHARGE);
};

/**
 * Calculates the required total solar panel wattage (Watts).
 * Formula: (totalDailyEnergy) / (peakSunHours * deratingFactor)
 * @param {number} totalDailyEnergy - Total daily energy in Watt-hours
 * @returns {number} Required solar array size in Watts
 */
export const calculateRequiredSolarArray = (totalDailyEnergy) => {
  if (totalDailyEnergy === 0) return 0;
  return totalDailyEnergy / (SYSTEM_CONSTANTS.PEAK_SUN_HOURS * SYSTEM_CONSTANTS.PANEL_DERATING_FACTOR);
};

/**
 * Main calculation function that takes a list of devices and returns all requirements.
 * @param {Array} devices - The list of configured devices.
 * @returns {Object} An object containing all calculated metrics.
 */
export const calculateSolarRequirements = (devices) => {
  if (!devices || devices.length === 0) {
    return {
      totalPower: 0,
      dailyEnergy: 0,
      requiredInverter: 0,
      requiredBatteryCapacity: 0,
      requiredSolarArray: 0,
    };
  }

  const totalPower = calculateTotalPower(devices);
  const dailyEnergy = calculateDailyEnergy(devices);

  return {
    totalPower,
    dailyEnergy,
    requiredInverter: calculateRequiredInverter(totalPower),
    requiredBatteryCapacity: calculateRequiredBatteryCapacity(dailyEnergy),
    requiredSolarArray: calculateRequiredSolarArray(dailyEnergy),
  };
};
