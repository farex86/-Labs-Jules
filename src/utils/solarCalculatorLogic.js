import { SYSTEM_CONSTANTS } from './solarCalculatorConstants';

/**
 * Calculates the total daily energy consumption (in Watt-hours)
 * @param {Array} appliances - Array of appliance objects { power, quantity, hours }
 * @returns {number} Total daily energy in Wh
 */
export const calculateDailyEnergy = (appliances) => {
  return appliances.reduce((total, appliance) => {
    return total + (Number(appliance.power) * Number(appliance.quantity) * Number(appliance.hours));
  }, 0);
};

/**
 * Calculates the total peak power demand (in Watts)
 * @param {Array} appliances - Array of appliance objects { power, quantity }
 * @returns {number} Total peak power in Watts
 */
export const calculatePeakPower = (appliances) => {
  return appliances.reduce((total, appliance) => {
    return total + (Number(appliance.power) * Number(appliance.quantity));
  }, 0);
};

/**
 * Calculates the recommended inverter size (in Watts)
 * Includes a safety margin to handle surge currents and future expansion
 * @param {number} peakPower - The total peak power in Watts
 * @returns {number} Recommended inverter size in Watts
 */
export const calculateInverterSize = (peakPower) => {
  return peakPower * SYSTEM_CONSTANTS.INVERTER_SAFETY_MARGIN;
};

/**
 * Calculates the required solar array size (in Watts)
 * @param {number} dailyEnergyWh - Total daily energy consumption in Wh
 * @returns {number} Recommended solar array size in Watts
 */
export const calculateSolarArraySize = (dailyEnergyWh) => {
  // Energy to generate = Daily Energy / System Efficiency
  const energyNeeded = dailyEnergyWh / SYSTEM_CONSTANTS.SYSTEM_EFFICIENCY;

  // Solar Array Size = Energy Needed / Peak Sun Hours
  const solarArraySizeW = energyNeeded / SYSTEM_CONSTANTS.PEAK_SUN_HOURS;

  return solarArraySizeW;
};

/**
 * Calculates the required battery bank capacity (in Watt-hours)
 * @param {number} dailyEnergyWh - Total daily energy consumption in Wh
 * @param {number} autonomyDays - Days the system needs to run without sun
 * @returns {number} Recommended battery capacity in Wh
 */
export const calculateBatteryCapacity = (dailyEnergyWh, autonomyDays = SYSTEM_CONSTANTS.DEFAULT_AUTONOMY_DAYS) => {
  // Battery Capacity = (Daily Energy * Autonomy Days) / (DoD * Battery Efficiency)
  const capacityWh = (dailyEnergyWh * autonomyDays) / (SYSTEM_CONSTANTS.BATTERY_DOD * SYSTEM_CONSTANTS.BATTERY_EFFICIENCY);
  return capacityWh;
};

/**
 * Main calculation function that orchestrates all calculations
 * @param {Array} appliances - List of selected appliances
 * @param {number} autonomyDays - User selected autonomy days (optional)
 * @returns {Object} Complete sizing results
 */
export const calculateSystemSize = (appliances, autonomyDays = SYSTEM_CONSTANTS.DEFAULT_AUTONOMY_DAYS) => {
  if (!appliances || appliances.length === 0) {
    return {
      dailyEnergyWh: 0,
      peakPowerW: 0,
      inverterSizeW: 0,
      solarArraySizeW: 0,
      batteryCapacityWh: 0
    };
  }

  const dailyEnergyWh = calculateDailyEnergy(appliances);
  const peakPowerW = calculatePeakPower(appliances);
  const inverterSizeW = calculateInverterSize(peakPowerW);
  const solarArraySizeW = calculateSolarArraySize(dailyEnergyWh);
  const batteryCapacityWh = calculateBatteryCapacity(dailyEnergyWh, autonomyDays);

  return {
    dailyEnergyWh,
    dailyEnergyKWh: dailyEnergyWh / 1000,
    peakPowerW,
    peakPowerKW: peakPowerW / 1000,
    inverterSizeW,
    inverterSizeKW: inverterSizeW / 1000,
    solarArraySizeW,
    solarArraySizeKW: solarArraySizeW / 1000,
    batteryCapacityWh,
    batteryCapacityKWh: batteryCapacityWh / 1000
  };
};
