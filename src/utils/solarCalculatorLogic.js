import { SYSTEM_CONSTANTS } from '../data/consumptionPatterns';

/**
 * Calculates the total daily energy consumption based on a list of devices.
 * @param {Array} devices - List of device objects { name, quantity, powerW, hoursPerDay }
 * @returns {number} Total daily energy in Watt-hours (Wh)
 */
export const calculateTotalDailyEnergy = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.quantity * device.powerW * device.hoursPerDay);
  }, 0);
};

/**
 * Calculates the total peak power required if all devices are turned on simultaneously.
 * @param {Array} devices - List of device objects
 * @returns {number} Total peak power in Watts (W)
 */
export const calculatePeakPower = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.quantity * device.powerW);
  }, 0);
};

/**
 * Calculates the required inverter size based on peak power.
 * Assumes a 20% safety margin.
 * @param {number} peakPowerW - Peak power in Watts
 * @returns {number} Recommended inverter size in Watts (W)
 */
export const calculateInverterSize = (peakPowerW) => {
  return peakPowerW * 1.2; // 20% safety margin
};

/**
 * Calculates the required solar array size.
 * @param {number} dailyEnergyWh - Total daily energy in Wh
 * @param {object} constants - Overridable system constants
 * @returns {number} Recommended solar array size in Watts (W)
 */
export const calculateSolarArraySize = (dailyEnergyWh, constants = SYSTEM_CONSTANTS) => {
  const energyRequiredFromPanels = dailyEnergyWh / (1 - constants.SYSTEM_LOSSES);
  return energyRequiredFromPanels / constants.PEAK_SUN_HOURS;
};

/**
 * Calculates the required battery capacity.
 * @param {number} dailyEnergyWh - Total daily energy in Wh
 * @param {number} daysOfAutonomy - Number of days the system should run without sun
 * @param {object} constants - Overridable system constants
 * @returns {number} Recommended battery capacity in Amp-hours (Ah)
 */
export const calculateBatteryCapacity = (dailyEnergyWh, daysOfAutonomy = 1, constants = SYSTEM_CONSTANTS) => {
  const totalEnergyRequiredWh = dailyEnergyWh * daysOfAutonomy;
  const batteryCapacityWh = totalEnergyRequiredWh / (constants.BATTERY_DOD * constants.BATTERY_EFFICIENCY * constants.INVERTER_EFFICIENCY);
  return batteryCapacityWh / constants.SYSTEM_VOLTAGE; // Returns Ah
};

/**
 * Runs all calculations for a given set of devices.
 * @param {Array} devices - List of device objects
 * @param {number} daysOfAutonomy - Number of days without sun
 * @returns {object} Object containing all calculated requirements
 */
export const runSolarCalculations = (devices, daysOfAutonomy = 1) => {
  if (!devices || devices.length === 0) return null;

  const totalDailyEnergyWh = calculateTotalDailyEnergy(devices);
  const peakPowerW = calculatePeakPower(devices);

  const inverterSizeW = calculateInverterSize(peakPowerW);
  const solarArraySizeW = calculateSolarArraySize(totalDailyEnergyWh);
  const batteryCapacityAh = calculateBatteryCapacity(totalDailyEnergyWh, daysOfAutonomy);

  return {
    totalDailyEnergyWh,
    totalDailyEnergyKWh: totalDailyEnergyWh / 1000,
    peakPowerW,
    inverterSizeW,
    inverterSizeKW: inverterSizeW / 1000,
    solarArraySizeW,
    solarArraySizeKW: solarArraySizeW / 1000,
    batteryCapacityAh,
    systemVoltage: SYSTEM_CONSTANTS.SYSTEM_VOLTAGE,
  };
};
