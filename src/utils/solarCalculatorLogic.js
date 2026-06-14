import { solarConfigOptions } from '../data/solarConsumptionPatterns';

/**
 * Calculates total daily energy consumption in Watt-hours (Wh)
 * @param {Array} devices - Array of objects {power: number, quantity: number, hours: number}
 * @returns {number} Total Daily Energy (Wh)
 */
export const calculateDailyEnergy = (devices) => {
  if (!devices || devices.length === 0) return 0;
  return devices.reduce((total, device) => {
    return total + (Number(device.power) * Number(device.quantity) * Number(device.hours));
  }, 0);
};

/**
 * Calculates the required inverter capacity in Watts (W)
 * @param {Array} devices - Array of objects {power: number, quantity: number}
 * @param {number} safetyFactor - Additional margin (default 1.25 for 25% extra)
 * @returns {number} Inverter Capacity (W)
 */
export const calculateInverterCapacity = (devices, safetyFactor = solarConfigOptions.inverterSafetyFactor) => {
  if (!devices || devices.length === 0) return 0;
  // Determine total peak power if all devices run simultaneously
  const totalPeakPower = devices.reduce((total, device) => {
    return total + (Number(device.power) * Number(device.quantity));
  }, 0);
  return totalPeakPower * safetyFactor;
};

/**
 * Calculates the total number of solar panels required
 * @param {number} dailyEnergyWh - Total daily energy required in Wh
 * @param {Object} config - System configuration options
 * @returns {number} Number of panels
 */
export const calculateSolarPanels = (dailyEnergyWh, config = solarConfigOptions) => {
  if (dailyEnergyWh === 0) return 0;
  // Energy to be generated per day considering system efficiency
  const totalEnergyRequiredWh = dailyEnergyWh / config.efficiency;

  // Total Solar Array Capacity required (W)
  const totalArrayCapacityW = totalEnergyRequiredWh / config.sunlightHours;

  // Number of panels
  return Math.ceil(totalArrayCapacityW / config.panelPowerW);
};

/**
 * Calculates the total number of batteries required
 * @param {number} dailyEnergyWh - Total daily energy required in Wh
 * @param {Object} config - System configuration options
 * @returns {number} Number of batteries
 */
export const calculateBatteries = (dailyEnergyWh, config = solarConfigOptions) => {
  if (dailyEnergyWh === 0) return 0;
  // Note: For grid-tied systems batteries might not be needed, but this assumes off-grid or hybrid sizing.
  // Assuming autonomy of 1 day (can be parameterized later)
  const autonomyDays = 1;

  // Total battery capacity required (Wh)
  const totalBatteryCapacityWh = (dailyEnergyWh * autonomyDays) / (config.dod * config.efficiency);

  // Capacity of a single battery (Wh)
  const singleBatteryCapacityWh = config.batteryVoltageV * config.batteryCapacityAh;

  // Total batteries
  const totalBatteries = Math.ceil(totalBatteryCapacityWh / singleBatteryCapacityWh);

  // Ensure the battery bank matches system voltage (e.g., 48V system with 12V batteries requires multiples of 4)
  const batteriesInSeries = config.systemVoltage / config.batteryVoltageV;

  // If total batteries is less than the series string, default to at least one string
  if (totalBatteries < batteriesInSeries) {
      return batteriesInSeries;
  }

  // Otherwise, round up to the nearest multiple of batteriesInSeries
  return Math.ceil(totalBatteries / batteriesInSeries) * batteriesInSeries;
};

/**
 * Main function to calculate all solar system requirements
 * @param {Array} devices - List of devices
 * @param {Object} customConfig - Optional overrides for config
 * @returns {Object} Comprehensive calculation result
 */
export const calculateSolarSystem = (devices, customConfig = {}) => {
  const config = { ...solarConfigOptions, ...customConfig };

  const dailyEnergyWh = calculateDailyEnergy(devices);
  const inverterCapacityW = calculateInverterCapacity(devices, config.inverterSafetyFactor);
  const numberOfPanels = calculateSolarPanels(dailyEnergyWh, config);
  const numberOfBatteries = calculateBatteries(dailyEnergyWh, config);

  return {
    dailyEnergyWh,
    dailyEnergyKWh: (dailyEnergyWh / 1000).toFixed(2),
    inverterCapacityW,
    inverterCapacityKW: (inverterCapacityW / 1000).toFixed(2),
    numberOfPanels,
    numberOfBatteries,
    totalPanelCapacityKW: ((numberOfPanels * config.panelPowerW) / 1000).toFixed(2)
  };
};
