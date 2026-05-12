import { systemDefaults } from './config';

/**
 * Calculates the total energy consumption per day in Watt-hours (Wh) for a list of devices.
 * @param {Array} devices - Array of device objects { power_watts, quantity, hours_per_day }
 * @returns {number} Total daily consumption in Wh
 */
export const calculateDailyConsumptionWh = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.power_watts * device.quantity * device.hours_per_day);
  }, 0);
};

/**
 * Calculates the total peak power required in Watts (W) if all devices run simultaneously.
 * @param {Array} devices - Array of device objects { power_watts, quantity }
 * @returns {number} Total peak power in Watts
 */
export const calculatePeakPowerWatts = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.power_watts * device.quantity);
  }, 0);
};

/**
 * Calculates the required size of the solar array in Watts (W).
 * @param {number} dailyConsumptionWh - Total daily consumption in Wh
 * @param {number} peakSunHours - Average peak sun hours (default from config)
 * @param {number} systemLosses - Factor for system losses (default from config)
 * @returns {number} Required solar array size in Watts
 */
export const calculateRequiredSolarArrayWatts = (
  dailyConsumptionWh,
  peakSunHours = systemDefaults.peakSunHours,
  systemLosses = systemDefaults.systemLosses
) => {
  if (dailyConsumptionWh === 0) return 0;
  return (dailyConsumptionWh / peakSunHours) * systemLosses;
};

/**
 * Calculates the number of solar panels required.
 * @param {number} requiredArrayWatts - Required solar array size in Watts
 * @param {number} panelCapacityWatts - Capacity of a single solar panel in Watts (default from config)
 * @returns {number} Number of panels
 */
export const calculateNumberOfPanels = (
  requiredArrayWatts,
  panelCapacityWatts = systemDefaults.panelCapacityWatts
) => {
  if (requiredArrayWatts === 0) return 0;
  return Math.ceil(requiredArrayWatts / panelCapacityWatts);
};

/**
 * Calculates the required battery bank capacity in Watt-hours (Wh) for a given days of autonomy.
 * @param {number} dailyConsumptionWh - Total daily consumption in Wh
 * @param {number} daysOfAutonomy - Number of days the system needs to run without sun
 * @param {number} depthOfDischarge - Maximum depth of discharge for batteries (default from config)
 * @returns {number} Required battery capacity in Wh
 */
export const calculateBatteryCapacityWh = (
  dailyConsumptionWh,
  daysOfAutonomy = 1,
  depthOfDischarge = systemDefaults.batteryDod
) => {
  if (dailyConsumptionWh === 0) return 0;
  return (dailyConsumptionWh * daysOfAutonomy) / depthOfDischarge;
};

/**
 * Calculates the number of batteries required.
 * @param {number} requiredBatteryCapacityWh - Required battery capacity in Wh
 * @param {number} singleBatteryCapacityWh - Capacity of a single battery in Wh (default from config)
 * @returns {number} Number of batteries
 */
export const calculateNumberOfBatteries = (
  requiredBatteryCapacityWh,
  singleBatteryCapacityWh = systemDefaults.batteryCapacityWh
) => {
  if (requiredBatteryCapacityWh === 0) return 0;
  return Math.ceil(requiredBatteryCapacityWh / singleBatteryCapacityWh);
};

/**
 * Calculates the required inverter size in Watts (W).
 * @param {number} peakPowerWatts - Total peak power if all devices run simultaneously
 * @param {number} safetyMargin - Safety margin multiplier (e.g., 1.25 for 25% extra capacity)
 * @returns {number} Recommended inverter size in Watts
 */
export const calculateInverterSizeWatts = (
  peakPowerWatts,
  safetyMargin = 1.25
) => {
  return Math.ceil(peakPowerWatts * safetyMargin);
};

/**
 * Performs all solar system calculations based on a list of devices.
 * @param {Array} devices - List of devices
 * @param {number} daysOfAutonomy - Number of days without sun
 * @returns {Object} Complete solar system sizing requirements
 */
export const calculateFullSystem = (devices, daysOfAutonomy = 1) => {
  const dailyConsumptionWh = calculateDailyConsumptionWh(devices);
  const dailyConsumptionKWh = dailyConsumptionWh / 1000;
  const peakPowerWatts = calculatePeakPowerWatts(devices);

  const requiredArrayWatts = calculateRequiredSolarArrayWatts(dailyConsumptionWh);
  const requiredArrayKW = requiredArrayWatts / 1000;
  const numPanels = calculateNumberOfPanels(requiredArrayWatts);

  const requiredBatteryCapacityWh = calculateBatteryCapacityWh(dailyConsumptionWh, daysOfAutonomy);
  const requiredBatteryCapacityKWh = requiredBatteryCapacityWh / 1000;
  const numBatteries = calculateNumberOfBatteries(requiredBatteryCapacityWh);

  const inverterSizeWatts = calculateInverterSizeWatts(peakPowerWatts);
  const inverterSizeKW = inverterSizeWatts / 1000;

  return {
    dailyConsumptionWh,
    dailyConsumptionKWh,
    peakPowerWatts,
    requiredArrayWatts,
    requiredArrayKW,
    numPanels,
    requiredBatteryCapacityWh,
    requiredBatteryCapacityKWh,
    numBatteries,
    inverterSizeWatts,
    inverterSizeKW
  };
};
