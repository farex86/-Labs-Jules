import { SOLAR_CONSTANTS } from './config';

/**
 * Calculates the total daily energy consumption in Watt-hours (Wh/day)
 * @param {Array} devices - Array of device objects { power, quantity, hours }
 * @returns {number} Total daily energy (Wh/day)
 */
export const calculateTotalDailyEnergy = (devices) => {
  if (!devices || devices.length === 0) return 0;
  return devices.reduce((total, device) => {
    return total + (device.power * device.quantity * device.hours);
  }, 0);
};

/**
 * Calculates the peak power demand in Watts (W)
 * Assumes all devices could potentially run at the same time for sizing purposes.
 * @param {Array} devices - Array of device objects { power, quantity }
 * @returns {number} Peak power demand (W)
 */
export const calculatePeakPowerDemand = (devices) => {
  if (!devices || devices.length === 0) return 0;
  return devices.reduce((total, device) => {
    return total + (device.power * device.quantity);
  }, 0);
};

/**
 * Calculates the recommended inverter size in Watts (W)
 * @param {number} peakPowerDemand - Peak power demand in Watts
 * @returns {number} Recommended inverter size (W)
 */
export const calculateInverterSize = (peakPowerDemand) => {
  return peakPowerDemand * SOLAR_CONSTANTS.INVERTER_SAFETY_MARGIN;
};

/**
 * Calculates the total required solar panel capacity in Watts (W)
 * @param {number} totalDailyEnergy - Total daily energy consumption in Wh/day
 * @param {Object} customConstants - Optional custom constants to override defaults
 * @returns {number} Required solar panel capacity (W)
 */
export const calculateRequiredSolarCapacity = (totalDailyEnergy, customConstants = {}) => {
  const peakSunHours = customConstants.peakSunHours || SOLAR_CONSTANTS.PEAK_SUN_HOURS;
  const systemLossFactor = customConstants.systemLossFactor || SOLAR_CONSTANTS.SYSTEM_LOSS_FACTOR;

  // Total Energy / (Peak Sun Hours * System Efficiency)
  return totalDailyEnergy / (peakSunHours * systemLossFactor);
};

/**
 * Calculates the required battery capacity
 * @param {number} totalDailyEnergy - Total daily energy consumption in Wh/day
 * @param {Object} customConstants - Optional custom constants to override defaults
 * @returns {Object} Battery requirements { capacityWh, capacityAhAtDefaultVoltage }
 */
export const calculateRequiredBatteryCapacity = (totalDailyEnergy, customConstants = {}) => {
  const daysOfAutonomy = customConstants.daysOfAutonomy || SOLAR_CONSTANTS.DAYS_OF_AUTONOMY;
  const batteryDod = customConstants.batteryDod || SOLAR_CONSTANTS.BATTERY_DOD;
  const inverterEfficiency = customConstants.inverterEfficiency || SOLAR_CONSTANTS.INVERTER_EFFICIENCY;
  const batteryEfficiency = customConstants.batteryEfficiency || SOLAR_CONSTANTS.BATTERY_EFFICIENCY;
  const systemVoltage = customConstants.systemVoltage || SOLAR_CONSTANTS.DEFAULT_BATTERY_VOLTAGE;

  // Total Wh needed from battery = (Daily Energy * Days of Autonomy) / (Inverter Eff * Battery Eff)
  const totalEnergyRequiredFromBatteryWh = (totalDailyEnergy * daysOfAutonomy) / (inverterEfficiency * batteryEfficiency);

  // Actual Battery Capacity Needed (accounting for Depth of Discharge)
  const requiredBatteryCapacityWh = totalEnergyRequiredFromBatteryWh / batteryDod;

  // Convert to Amp-hours (Ah) at the system voltage
  const requiredBatteryCapacityAh = requiredBatteryCapacityWh / systemVoltage;

  return {
    capacityWh: requiredBatteryCapacityWh,
    capacityAh: requiredBatteryCapacityAh,
    systemVoltage: systemVoltage
  };
};

/**
 * Main calculation function that takes devices and returns full system sizing
 * @param {Array} devices - Array of device objects
 * @param {Object} customConstants - Optional custom constants
 * @returns {Object} Complete system sizing results
 */
export const calculateSolarSystem = (devices, customConstants = {}) => {
  const totalDailyEnergy = calculateTotalDailyEnergy(devices);
  const peakPowerDemand = calculatePeakPowerDemand(devices);
  const inverterSize = calculateInverterSize(peakPowerDemand);
  const solarCapacity = calculateRequiredSolarCapacity(totalDailyEnergy, customConstants);
  const batteryRequirements = calculateRequiredBatteryCapacity(totalDailyEnergy, customConstants);

  return {
    totalDailyEnergy,     // Wh/day
    peakPowerDemand,      // W
    inverterSize,         // W
    solarCapacity,        // W
    batteryRequirements,  // { capacityWh, capacityAh, systemVoltage }
  };
};
