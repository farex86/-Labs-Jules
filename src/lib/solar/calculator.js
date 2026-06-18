import { SOLAR_CONSTANTS } from './constants';

/**
 * Calculates the total power required by all devices running simultaneously.
 * @param {Array} devices - Array of device objects { power, quantity }
 * @returns {number} - Total power in Watts
 */
export const calculateTotalPower = (devices) => {
  if (!devices || !Array.isArray(devices)) return 0;
  return devices.reduce((total, device) => {
    const power = Number(device.power) || 0;
    const quantity = Number(device.quantity) || 0;
    return total + (power * quantity);
  }, 0);
};

/**
 * Calculates the total daily energy consumption of all devices.
 * @param {Array} devices - Array of device objects { power, quantity, hours }
 * @returns {number} - Total daily energy in Watt-hours (Wh)
 */
export const calculateDailyEnergy = (devices) => {
  if (!devices || !Array.isArray(devices)) return 0;
  return devices.reduce((total, device) => {
    const power = Number(device.power) || 0;
    const quantity = Number(device.quantity) || 0;
    const hours = Number(device.hours) || 0;
    return total + (power * quantity * hours);
  }, 0);
};

/**
 * Calculates the required solar system components based on power and energy needs.
 * @param {number} totalPower - Total power in Watts
 * @param {number} dailyEnergy - Total daily energy in Watt-hours (Wh)
 * @returns {Object} - Required inverter size (kW), battery capacity (kWh), and solar array size (kW)
 */
export const calculateSystemRequirements = (totalPower, dailyEnergy) => {
  // Inverter Size (kW)
  // Multiply total power by the efficiency margin factor, then convert to kW
  const inverterSizeW = totalPower * SOLAR_CONSTANTS.INVERTER_EFFICIENCY_FACTOR;
  const inverterSizeKW = inverterSizeW / 1000;

  // Battery Storage Capacity (kWh)
  // Calculate raw storage needed for 1 day, account for Depth of Discharge limit, then convert to kWh
  const batteryStorageWh = dailyEnergy / SOLAR_CONSTANTS.BATTERY_DOD;
  const batteryStorageKWh = batteryStorageWh / 1000;

  // Solar Panel Array Size (kW)
  // Daily energy needed divided by peak sun hours gives required power generation.
  // Multiply by system loss factor to account for inefficiencies, then convert to kW.
  const requiredSolarGenerationW = (dailyEnergy / SOLAR_CONSTANTS.PEAK_SUN_HOURS) * SOLAR_CONSTANTS.SYSTEM_LOSS_FACTOR;
  const solarArraySizeKW = requiredSolarGenerationW / 1000;

  return {
    inverterSizeKW: Number(inverterSizeKW.toFixed(2)),
    batteryStorageKWh: Number(batteryStorageKWh.toFixed(2)),
    solarArraySizeKW: Number(solarArraySizeKW.toFixed(2)),
  };
};
