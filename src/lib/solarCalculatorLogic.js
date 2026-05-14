import { CALC_CONSTANTS } from './solarCalculatorConfig';

/**
 * Calculates the total daily energy consumption in Watt-hours (Wh)
 * @param {Array} devices - List of devices
 * @returns {number} Total Daily Wh
 */
export const calculateDailyEnergy = (devices) => {
  if (!devices || !devices.length) return 0;

  return devices.reduce((total, device) => {
    // power in watts * quantity * hours of operation per day
    return total + (device.power * device.quantity * device.hours);
  }, 0);
};

/**
 * Calculates the total peak power required if all devices run simultaneously
 * @param {Array} devices
 * @returns {number} Total peak power in Watts
 */
export const calculatePeakPower = (devices) => {
  if (!devices || !devices.length) return 0;

  return devices.reduce((total, device) => {
    return total + (device.power * device.quantity);
  }, 0);
};

/**
 * Recommends an inverter size based on peak power and a safety margin
 * @param {number} peakPowerW - Peak power in Watts
 * @param {number} margin - Safety margin multiplier (default 1.25 for 25% extra)
 * @returns {number} Recommended Inverter Capacity in kW
 */
export const calculateInverterSize = (peakPowerW, margin = 1.25) => {
  return (peakPowerW * margin) / 1000;
};

/**
 * Calculates the required solar array and battery storage
 * @param {number} dailyEnergyWh - Total daily energy consumption in Wh
 * @param {object} options - Optional overrides for sun hours, panel wattage, etc.
 * @returns {object} System sizing results
 */
export const calculateSolarSystem = (dailyEnergyWh, options = {}) => {
  const peakSunHours = options.peakSunHours || CALC_CONSTANTS.PEAK_SUN_HOURS;
  const panelWattage = options.panelWattage || CALC_CONSTANTS.PANEL_WATTAGE;
  const systemLosses = options.systemLosses || CALC_CONSTANTS.SYSTEM_LOSSES;
  const inverterEfficiency = options.inverterEfficiency || CALC_CONSTANTS.INVERTER_EFFICIENCY;
  const batteryType = options.batteryType || { depthOfDischarge: 0.8, efficiency: 0.95 }; // Default to Lithium
  const systemVoltage = options.systemVoltage || CALC_CONSTANTS.SYSTEM_VOLTAGE;

  // 1. Calculate Required Solar Array Size
  // Total Energy Needed = Daily Energy * System Losses / Inverter Efficiency
  const energyNeededWh = (dailyEnergyWh * systemLosses) / inverterEfficiency;

  // Array Size in Watts = Total Energy Needed / Peak Sun Hours
  const arraySizeW = energyNeededWh / peakSunHours;

  // Array Size in kW
  const arraySizeKW = arraySizeW / 1000;

  // Number of Panels
  const numberOfPanels = Math.ceil(arraySizeW / panelWattage);

  // 2. Calculate Battery Storage
  // Battery Capacity (Wh) = Daily Energy Needed / (Depth of Discharge * Battery Efficiency)
  // Assuming 1 day of autonomy for standard calculation, can be parameterized
  const daysOfAutonomy = options.daysOfAutonomy || 1;
  const requiredBatteryCapacityWh = (dailyEnergyWh * daysOfAutonomy) / (batteryType.depthOfDischarge * batteryType.efficiency * inverterEfficiency);

  // Battery Capacity in Amp-hours (Ah) based on system voltage
  const requiredBatteryAh = requiredBatteryCapacityWh / systemVoltage;

  return {
    dailyEnergyKWh: (dailyEnergyWh / 1000).toFixed(2),
    arraySizeKW: arraySizeKW.toFixed(2),
    numberOfPanels: numberOfPanels,
    panelWattage: panelWattage,
    batteryCapacityKWh: (requiredBatteryCapacityWh / 1000).toFixed(2),
    batteryAh: Math.round(requiredBatteryAh),
    systemVoltage: systemVoltage
  };
};
