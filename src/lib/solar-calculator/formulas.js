import { SOLAR_CONSTANTS } from './constants';

/**
 * Calculates the total daily energy consumption in Watt-hours (Wh)
 */
export const calculateTotalDailyEnergy = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.powerW * device.hours * device.quantity);
  }, 0);
};

/**
 * Calculates the total instantaneous power in Watts (W)
 */
export const calculateTotalPower = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.powerW * device.quantity);
  }, 0);
};

/**
 * Calculates the recommended solar system specifications.
 * @param {Array} devices - List of devices
 * @returns {Object} System specifications (inverter, panels, batteries)
 */
export const calculateSolarSystem = (devices) => {
  if (!devices || devices.length === 0) return null;

  const totalDailyEnergyWh = calculateTotalDailyEnergy(devices);
  const totalPowerW = calculateTotalPower(devices);

  // 1. Inverter Size (VA or W) - Requires adding a safety factor (e.g., 25%)
  const inverterSizeW = totalPowerW * SOLAR_CONSTANTS.inverterSafetyFactor;
  const inverterSizeKVA = inverterSizeW / 1000;

  // 2. Solar Panels Needed
  // Total Energy needed per day = totalDailyEnergyWh * systemLosses
  const totalEnergyNeededWh = totalDailyEnergyWh * SOLAR_CONSTANTS.systemLosses;
  const totalSolarCapacityW = totalEnergyNeededWh / SOLAR_CONSTANTS.peakSunHours;
  const panelsNeeded = Math.ceil(totalSolarCapacityW / SOLAR_CONSTANTS.panelWattage);

  // 3. Battery Capacity (Ah)
  // Capacity = (Total Energy) / (System Voltage * Depth of Discharge)
  const batteryCapacityAh = totalDailyEnergyWh / (SOLAR_CONSTANTS.batteryVoltage * SOLAR_CONSTANTS.batteryDepthOfDischarge);

  return {
    totalPowerW,
    totalDailyEnergyWh,
    inverterSizeKVA: Math.ceil(inverterSizeKVA),
    panelsNeeded,
    panelWattage: SOLAR_CONSTANTS.panelWattage,
    batteryCapacityAh: Math.ceil(batteryCapacityAh),
    batteryVoltage: SOLAR_CONSTANTS.batteryVoltage,
  };
};
