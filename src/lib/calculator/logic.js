import { SYSTEM_DEFAULTS } from './constants';

/**
 * Calculates the total daily energy consumption in Watt-hours (Wh).
 * @param {Array} devices - Array of device objects { quantity, watts, hours }
 * @returns {number} Total daily energy in Wh
 */
export const calculateTotalDailyEnergy = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.quantity * device.watts * device.hours);
  }, 0);
};

/**
 * Calculates the total peak power demand in Watts (W).
 * @param {Array} devices - Array of device objects { quantity, watts }
 * @returns {number} Total peak power in W
 */
export const calculateTotalPeakPower = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.quantity * device.watts);
  }, 0);
};

/**
 * Calculates the required inverter capacity.
 * Adds a 25% safety margin to the total peak power.
 * @param {number} totalPeakPower - Total peak power in Watts
 * @returns {number} Required inverter capacity in kW
 */
export const calculateInverterCapacity = (totalPeakPower) => {
  const safetyMargin = 1.25;
  const capacityW = totalPeakPower * safetyMargin;
  return capacityW / 1000; // Convert to kW
};

/**
 * Calculates the required total battery capacity in Amp-hours (Ah).
 * Takes into account inverter efficiency and depth of discharge.
 * @param {number} totalDailyEnergyWh - Total daily energy in Watt-hours
 * @param {number} daysOfAutonomy - Number of days the system needs to run without sun (default 1)
 * @returns {number} Required battery capacity in Ah
 */
export const calculateBatteryCapacity = (totalDailyEnergyWh, daysOfAutonomy = 1) => {
  const { systemVoltage, inverterEfficiency, batteryDepthOfDischarge } = SYSTEM_DEFAULTS;

  // Total energy needed including inverter losses
  const totalEnergyNeededWh = totalDailyEnergyWh / inverterEfficiency;

  // Total capacity needed in Amp-hours for the system voltage
  const totalCapacityAh = (totalEnergyNeededWh * daysOfAutonomy) / systemVoltage;

  // Adjust for Depth of Discharge (DoD)
  const requiredCapacityAh = totalCapacityAh / batteryDepthOfDischarge;

  return requiredCapacityAh;
};

/**
 * Calculates the estimated number of solar panels required.
 * @param {number} totalDailyEnergyWh - Total daily energy in Watt-hours
 * @returns {number} Number of panels
 */
export const calculateNumberOfPanels = (totalDailyEnergyWh) => {
  const { peakSunHours, panelWattage, inverterEfficiency } = SYSTEM_DEFAULTS;

  // Total energy needed from panels per day
  const totalEnergyNeededWh = totalDailyEnergyWh / inverterEfficiency;

  // Total peak power required from panels (Watts)
  const totalPanelPowerRequiredW = totalEnergyNeededWh / peakSunHours;

  // Number of panels
  const numberOfPanels = Math.ceil(totalPanelPowerRequiredW / panelWattage);

  return numberOfPanels;
};

/**
 * Runs all calculations for a given set of devices.
 * @param {Array} devices - Array of device objects
 * @returns {Object} System requirements
 */
export const calculateSystemRequirements = (devices) => {
  const totalDailyEnergyWh = calculateTotalDailyEnergy(devices);
  const totalPeakPowerW = calculateTotalPeakPower(devices);

  return {
    totalDailyEnergyKWh: totalDailyEnergyWh / 1000,
    totalPeakPowerKW: totalPeakPowerW / 1000,
    inverterCapacityKW: calculateInverterCapacity(totalPeakPowerW),
    batteryCapacityAh: calculateBatteryCapacity(totalDailyEnergyWh),
    numberOfPanels: calculateNumberOfPanels(totalDailyEnergyWh),
    systemVoltage: SYSTEM_DEFAULTS.systemVoltage,
    panelWattage: SYSTEM_DEFAULTS.panelWattage
  };
};
