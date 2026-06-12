import { SOLAR_CONSTANTS } from './solarCalculatorConfig';

/**
 * Calculate total daily energy usage in Watt-Hours (Wh)
 */
export const calculateTotalDailyEnergy = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.power * device.quantity * device.hours);
  }, 0);
};

/**
 * Calculate total peak power load in Watts (W)
 */
export const calculatePeakLoad = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.power * device.quantity);
  }, 0);
};

/**
 * Calculate required inverter size in kiloWatts (kW)
 * Adds 25% safety margin for startup surges
 */
export const calculateInverterSize = (peakLoad) => {
  const peakLoadKW = peakLoad / 1000;
  // Recommend an inverter that is 25% larger than the peak continuous load
  return Math.ceil(peakLoadKW * 1.25);
};

/**
 * Calculate required number of solar panels
 */
export const calculatePanelsRequired = (totalDailyEnergy) => {
  // Total energy needed per day from panels, accounting for system losses
  const dailyEnergyNeeded = totalDailyEnergy * SOLAR_CONSTANTS.SYSTEM_LOSSES;

  // Energy produced by one panel per day in Watt-Hours
  const panelDailyEnergy = SOLAR_CONSTANTS.PANEL_WATTAGE * SOLAR_CONSTANTS.SUN_HOURS;

  return Math.ceil(dailyEnergyNeeded / panelDailyEnergy);
};

/**
 * Calculate required number of batteries
 */
export const calculateBatteriesRequired = (totalDailyEnergy) => {
  // Assuming we need enough battery capacity to power the system for 1 day without sun
  const batteryCapacityNeededWh = totalDailyEnergy / SOLAR_CONSTANTS.INVERTER_EFFICIENCY;

  // Account for Depth of Discharge (we don't want to drain the battery fully)
  const totalBatteryCapacityWh = batteryCapacityNeededWh / SOLAR_CONSTANTS.DEPTH_OF_DISCHARGE;

  // Capacity of one battery in Watt-Hours
  const singleBatteryCapacityWh = SOLAR_CONSTANTS.BATTERY_VOLTAGE * SOLAR_CONSTANTS.BATTERY_AMP_HOURS;

  return Math.ceil(totalBatteryCapacityWh / singleBatteryCapacityWh);
};

/**
 * Generate full solar system recommendation based on a list of devices
 */
export const calculateSystemRequirements = (devices) => {
  const totalDailyEnergy = calculateTotalDailyEnergy(devices);
  const peakLoad = calculatePeakLoad(devices);

  return {
    totalDailyEnergyWh: totalDailyEnergy,
    peakLoadW: peakLoad,
    recommendedInverterKW: calculateInverterSize(peakLoad),
    recommendedPanels: calculatePanelsRequired(totalDailyEnergy),
    recommendedBatteries: calculateBatteriesRequired(totalDailyEnergy),
  };
};
