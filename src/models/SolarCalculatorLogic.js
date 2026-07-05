// src/models/SolarCalculatorLogic.js
import { SOLAR_CONSTANTS } from './SolarCalculatorConfig';

/**
 * Calculates the solar system requirements based on a list of appliances.
 * @param {Array} appliances - Array of appliance objects {watts, quantity, hours}
 * @returns {Object} Requirements (totalEnergy, peakPower, panels, inverter, batteries)
 */
export const calculateSolarRequirements = (appliances) => {
  if (!appliances || appliances.length === 0) {
    return {
      totalEnergyWh: 0,
      peakPowerW: 0,
      panelsNeeded: 0,
      inverterCapacityW: 0,
      batteriesNeeded: 0,
      assumptions: {
        panelWattage: SOLAR_CONSTANTS.PANEL_WATTAGE,
        batteryAh: SOLAR_CONSTANTS.BATTERY_CAPACITY_AH,
        batteryVoltage: SOLAR_CONSTANTS.BATTERY_VOLTAGE
      }
    };
  }

  // 1. Calculate Total Daily Energy Consumption (Wh)
  const totalEnergyWh = appliances.reduce((total, app) => {
    return total + (app.watts * app.quantity * app.hours);
  }, 0);

  // 2. Calculate Peak Power Demand (W)
  const peakPowerW = appliances.reduce((total, app) => {
    return total + (app.watts * app.quantity);
  }, 0);

  // 3. Calculate Required Solar Panels
  // Energy to be generated = Total Energy / System Efficiency
  const energyToGenerateWh = totalEnergyWh / SOLAR_CONSTANTS.SYSTEM_EFFICIENCY;

  // Total panel capacity needed = Energy to generate / Sunlight Hours
  const totalPanelCapacityW = energyToGenerateWh / SOLAR_CONSTANTS.SUNLIGHT_HOURS;

  // Number of panels = Total panel capacity / Wattage per panel
  const panelsNeeded = Math.ceil(totalPanelCapacityW / SOLAR_CONSTANTS.PANEL_WATTAGE);

  // 4. Calculate Required Inverter Capacity (W)
  // Inverter must handle peak load + safety margin
  const inverterCapacityW = Math.ceil(peakPowerW * SOLAR_CONSTANTS.INVERTER_SAFETY_MARGIN);

  // 5. Calculate Battery Bank Requirements
  // Assuming we need to store enough energy for 1 day of non-sunlight hours (e.g., night usage).
  // For simplicity, we'll store 50% of the total daily energy in batteries.
  // This can be adjusted based on specific requirements.
  const energyToStoreWh = totalEnergyWh * 0.5;

  // Required battery capacity (Wh) accounting for Depth of Discharge
  const requiredBatteryCapacityWh = energyToStoreWh / SOLAR_CONSTANTS.BATTERY_DOD;

  // Battery capacity of one battery (Wh) = Voltage * Ah
  const singleBatteryCapacityWh = SOLAR_CONSTANTS.BATTERY_VOLTAGE * SOLAR_CONSTANTS.BATTERY_CAPACITY_AH;

  // Number of batteries
  const batteriesNeeded = Math.ceil(requiredBatteryCapacityWh / singleBatteryCapacityWh);

  return {
    totalEnergyWh,
    peakPowerW,
    panelsNeeded,
    inverterCapacityW,
    batteriesNeeded,
    assumptions: {
      panelWattage: SOLAR_CONSTANTS.PANEL_WATTAGE,
      batteryAh: SOLAR_CONSTANTS.BATTERY_CAPACITY_AH,
      batteryVoltage: SOLAR_CONSTANTS.BATTERY_VOLTAGE
    }
  };
};
