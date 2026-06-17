/**
 * calculator.js
 * Business logic for the solar system calculations.
 */

// Safety factors and constants
const INVERTER_SAFETY_FACTOR = 1.25; // 25% safety margin
const SYSTEM_VOLTAGE = 48; // Assume 48V system for larger setups, could be dynamic
const DEPTH_OF_DISCHARGE = 0.8; // 80% DOD for Lithium (or 0.5 for Lead Acid)
const BATTERY_EFFICIENCY = 0.95; // 95% efficiency
const PANEL_WATTAGE = 550; // Standard 550W panel
const SUN_HOURS = 5.5; // Average peak sun hours in the region (e.g., Sudan/Middle East)

/**
 * Calculates total peak power (Watts)
 * @param {Array} devices - List of device objects { power, quantity }
 * @returns {number} - Total power in Watts
 */
export function calculateTotalPower(devices) {
  return devices.reduce((total, device) => total + (Number(device.power) * Number(device.quantity)), 0);
}

/**
 * Calculates daily energy consumption (Watt-hours)
 * @param {Array} devices - List of device objects { power, quantity, hours }
 * @returns {number} - Total daily energy in Wh
 */
export function calculateDailyEnergy(devices) {
  return devices.reduce((total, device) => total + (Number(device.power) * Number(device.quantity) * Number(device.hours)), 0);
}

/**
 * Estimates required inverter size (kW)
 * @param {number} totalPower - Total power in Watts
 * @returns {number} - Inverter size in kilowatts
 */
export function calculateInverterSize(totalPower) {
  const requiredWatts = totalPower * INVERTER_SAFETY_FACTOR;
  // Convert to kW and round up to next 0.5
  return Math.ceil((requiredWatts / 1000) * 2) / 2;
}

/**
 * Calculates required battery bank capacity (kWh)
 * @param {number} dailyEnergy - Total daily energy in Wh
 * @param {number} autonomyDays - Number of days without sun (default 1)
 * @returns {number} - Battery capacity in kWh
 */
export function calculateBatteryCapacity(dailyEnergy, autonomyDays = 1) {
  const totalWh = dailyEnergy * autonomyDays;
  const requiredWh = totalWh / (DEPTH_OF_DISCHARGE * BATTERY_EFFICIENCY);
  // Return in kWh rounded to 1 decimal place
  return Math.round((requiredWh / 1000) * 10) / 10;
}

/**
 * Calculates required number of solar panels
 * @param {number} dailyEnergy - Total daily energy in Wh
 * @returns {number} - Number of panels
 */
export function calculatePanelsCount(dailyEnergy) {
  // Energy required from panels per day (accounting for some system losses, ~15%)
  const dailyEnergyRequired = dailyEnergy / 0.85;

  // Total wattage required from array
  const arrayWattage = dailyEnergyRequired / SUN_HOURS;

  // Number of panels
  return Math.ceil(arrayWattage / PANEL_WATTAGE);
}

/**
 * Runs full calculation
 * @param {Array} devices - List of device objects
 * @returns {Object} - Complete system requirements
 */
export function calculateSystem(devices) {
  if (!devices || devices.length === 0) {
    return {
      totalPowerW: 0,
      dailyEnergyWh: 0,
      inverterSizeKW: 0,
      batteryCapacityKWh: 0,
      panelsCount: 0,
      panelWattage: PANEL_WATTAGE
    };
  }

  const totalPowerW = calculateTotalPower(devices);
  const dailyEnergyWh = calculateDailyEnergy(devices);
  const inverterSizeKW = calculateInverterSize(totalPowerW);
  const batteryCapacityKWh = calculateBatteryCapacity(dailyEnergyWh);
  const panelsCount = calculatePanelsCount(dailyEnergyWh);

  return {
    totalPowerW,
    dailyEnergyWh,
    inverterSizeKW,
    batteryCapacityKWh,
    panelsCount,
    panelWattage: PANEL_WATTAGE
  };
}
