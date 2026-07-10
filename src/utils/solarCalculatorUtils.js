import { SYSTEM_LOSS_FACTOR, DEFAULT_SUN_HOURS } from './solarCalculatorConstants';

export const calculateSolarSystem = (appliances, customSunHours) => {
  const sunHours = customSunHours || DEFAULT_SUN_HOURS;

  // Total daily energy required in Watt-hours
  const dailyEnergyWh = appliances.reduce((total, app) => {
    return total + (app.defaultPower * app.defaultHours * app.defaultQuantity);
  }, 0);

  // Total peak power required in Watts
  const peakPowerW = appliances.reduce((total, app) => {
    return total + (app.defaultPower * app.defaultQuantity);
  }, 0);

  // Accounting for system losses
  const dailyEnergyWithLossesWh = dailyEnergyWh * SYSTEM_LOSS_FACTOR;

  // Required solar panel capacity in Watts
  const requiredSolarCapacityW = dailyEnergyWithLossesWh / sunHours;

  // Number of 550W panels (common standard)
  const PANEL_WATTAGE = 550;
  const numberOfPanels = Math.ceil(requiredSolarCapacityW / PANEL_WATTAGE);

  // Required inverter capacity (Watts), adding 25% safety margin
  const INVERTER_SAFETY_MARGIN = 1.25;
  const inverterCapacityW = peakPowerW * INVERTER_SAFETY_MARGIN;

  // Battery capacity required for 1 day of autonomy
  // Battery bank size in Ah (assuming 48V system and 50% Depth of Discharge for Lead Acid, or 80% for Lithium)
  // Let's calculate for Lithium (80% DoD) on a 48V system
  const SYSTEM_VOLTAGE = 48;
  const DEPTH_OF_DISCHARGE = 0.8;
  const batteryCapacityAh = dailyEnergyWh / (SYSTEM_VOLTAGE * DEPTH_OF_DISCHARGE);

  // Number of 100Ah 48V Lithium batteries
  const BATTERY_SIZE_AH = 100;
  const numberOfBatteries = Math.ceil(batteryCapacityAh / BATTERY_SIZE_AH);

  return {
    dailyEnergyKWh: (dailyEnergyWh / 1000).toFixed(2),
    peakPowerKW: (peakPowerW / 1000).toFixed(2),
    solarCapacityKW: (requiredSolarCapacityW / 1000).toFixed(2),
    numberOfPanels,
    inverterCapacityKW: (inverterCapacityW / 1000).toFixed(2),
    batteryCapacityAh: Math.ceil(batteryCapacityAh),
    numberOfBatteries,
    systemVoltage: SYSTEM_VOLTAGE
  };
};
