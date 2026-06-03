import { SOLAR_CONSTANTS } from './constants.js';

export function calculateSolarSystem(devices) {
  let totalDailyEnergyWh = 0;
  let totalPowerW = 0;

  devices.forEach(device => {
    const power = Number(device.powerW) || 0;
    const qty = Number(device.qty) || 0;
    const hours = Number(device.hoursPerDay) || 0;

    const deviceTotalPower = power * qty;
    totalPowerW += deviceTotalPower;
    totalDailyEnergyWh += deviceTotalPower * hours;
  });

  // Calculate System Requirements

  // 1. Inverter Size (W)
  // Needs to handle total peak power, plus safety factor
  const inverterSizeW = totalPowerW * SOLAR_CONSTANTS.SAFETY_FACTOR;

  // 2. Total Daily Energy requirement from panels (considering inverter efficiency)
  const requiredEnergyWh = totalDailyEnergyWh / SOLAR_CONSTANTS.INVERTER_EFFICIENCY;

  // 3. Solar Panel Array Size (W)
  const panelArrayW = requiredEnergyWh / SOLAR_CONSTANTS.PEAK_SUN_HOURS;

  // 4. Battery Bank Capacity (Wh and Ah)
  // Need to cover daily energy with safe depth of discharge
  const requiredBatteryCapacityWh = requiredEnergyWh / SOLAR_CONSTANTS.BATTERY_DEPTH_OF_DISCHARGE;
  const requiredBatteryCapacityAh = requiredBatteryCapacityWh / SOLAR_CONSTANTS.SYSTEM_VOLTAGE;

  return {
    totalDailyEnergyWh,
    totalPowerW,
    inverterSizeW,
    panelArrayW,
    requiredBatteryCapacityWh,
    requiredBatteryCapacityAh,
    systemVoltage: SOLAR_CONSTANTS.SYSTEM_VOLTAGE,
  };
}
