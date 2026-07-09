import { SOLAR_CONSTANTS } from '../config/solarConfig.js';

/**
 * Calculates total energy consumption per day in Watt-hours (Wh)
 */
export const calculateTotalConsumption = (devices) => {
  return devices.reduce((total, device) => {
    return total + (Number(device.power) * Number(device.qty) * Number(device.hours));
  }, 0);
};

/**
 * Calculates required inverter capacity in Watts (W)
 */
export const calculateInverterCapacity = (devices) => {
  const peakPower = devices.reduce((total, device) => {
    return total + (Number(device.power) * Number(device.qty));
  }, 0);

  return peakPower * SOLAR_CONSTANTS.SAFETY_FACTOR_INVERTER;
};

/**
 * Calculates required battery capacity in Ampere-hours (Ah)
 */
export const calculateBatteryCapacity = (totalConsumptionWh) => {
  if (totalConsumptionWh === 0) return 0;

  const totalRequiredWh = totalConsumptionWh * SOLAR_CONSTANTS.AUTONOMY_DAYS;
  const usableBatteryCapacityWh = totalRequiredWh / SOLAR_CONSTANTS.BATTERY_DOD;

  return usableBatteryCapacityWh / SOLAR_CONSTANTS.SYSTEM_VOLTAGE;
};

/**
 * Calculates required solar panel array capacity in Watts (W)
 */
export const calculatePanelCapacity = (totalConsumptionWh) => {
  if (totalConsumptionWh === 0) return 0;

  return (totalConsumptionWh * SOLAR_CONSTANTS.SYSTEM_LOSS_FACTOR) / SOLAR_CONSTANTS.PEAK_SUN_HOURS;
};

/**
 * Main function to calculate all solar system requirements
 */
export const calculateSystemRequirements = (devices) => {
  const totalConsumptionWh = calculateTotalConsumption(devices);
  const inverterCapacityW = calculateInverterCapacity(devices);
  const batteryCapacityAh = calculateBatteryCapacity(totalConsumptionWh);
  const panelCapacityW = calculatePanelCapacity(totalConsumptionWh);

  return {
    totalConsumptionWh,
    inverterCapacityW,
    batteryCapacityAh,
    panelCapacityW
  };
};
