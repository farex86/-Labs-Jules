// src/lib/solarCalculator.js
import { SOLAR_CONSTANTS } from '../config/solarConfig.js';

/**
 * Calculates the total daily energy consumption in Watt-hours (Wh).
 * @param {Array} appliances - Array of appliance objects { quantity, power, hours }.
 * @returns {number} Total daily energy (Wh/day).
 */
export function calculateTotalDailyEnergy(appliances) {
  return appliances.reduce((total, appliance) => {
    const qty = parseInt(appliance.quantity, 10) || 0;
    const pwr = parseFloat(appliance.power) || 0;
    const hrs = parseFloat(appliance.hours) || 0;
    return total + (qty * pwr * hrs);
  }, 0);
}

/**
 * Calculates the total peak power demand (assuming all appliances run at once).
 * @param {Array} appliances - Array of appliance objects { quantity, power }.
 * @returns {number} Total peak power (Watts).
 */
export function calculatePeakPower(appliances) {
  return appliances.reduce((total, appliance) => {
    const qty = parseInt(appliance.quantity, 10) || 0;
    const pwr = parseFloat(appliance.power) || 0;
    return total + (qty * pwr);
  }, 0);
}

/**
 * Calculates the required inverter size in Watts.
 * @param {number} peakPower - The total peak power demand.
 * @returns {number} Required inverter size (Watts).
 */
export function calculateInverterSize(peakPower) {
  return peakPower * SOLAR_CONSTANTS.INVERTER_SAFETY_MARGIN;
}

/**
 * Calculates the required total solar panel capacity in Watts.
 * @param {number} dailyEnergy - Total daily energy (Wh/day).
 * @returns {number} Required solar panel capacity (Watts).
 */
export function calculateSolarPanelCapacity(dailyEnergy) {
  // Energy required from panels = Daily Energy / System Efficiency
  const energyRequired = dailyEnergy / SOLAR_CONSTANTS.SYSTEM_EFFICIENCY;
  // Panel Capacity = Energy Required / Peak Sun Hours
  return energyRequired / SOLAR_CONSTANTS.PEAK_SUN_HOURS;
}

/**
 * Determines the system voltage based on peak power demand.
 * @param {number} peakPower - Total peak power demand in Watts.
 * @returns {number} System voltage (12, 24, or 48).
 */
export function determineSystemVoltage(peakPower) {
  if (peakPower < 1000) return SOLAR_CONSTANTS.VOLTAGE_THRESHOLDS.LOW;
  if (peakPower <= 3000) return SOLAR_CONSTANTS.VOLTAGE_THRESHOLDS.MEDIUM;
  return SOLAR_CONSTANTS.VOLTAGE_THRESHOLDS.HIGH;
}

/**
 * Calculates required battery capacity in Ampere-hours (Ah).
 * @param {number} dailyEnergy - Total daily energy (Wh/day).
 * @param {number} systemVoltage - System voltage (V).
 * @param {string} batteryType - 'lead_acid' or 'lithium'.
 * @returns {number} Required battery capacity (Ah).
 */
export function calculateBatteryCapacity(dailyEnergy, systemVoltage, batteryType = 'lead_acid') {
  const dod = batteryType === 'lithium'
    ? SOLAR_CONSTANTS.BATTERY_DOD_LITHIUM
    : SOLAR_CONSTANTS.BATTERY_DOD_LEAD_ACID;

  // Energy to store = Daily Energy * Days of Autonomy / Inverter Efficiency
  const energyToStore = (dailyEnergy * SOLAR_CONSTANTS.DAYS_OF_AUTONOMY) / SOLAR_CONSTANTS.INVERTER_EFFICIENCY;

  // Total battery capacity needed (Wh) = Energy to store / DoD
  const totalBatteryWh = energyToStore / dod;

  // Capacity in Ah = Total Wh / System Voltage
  return totalBatteryWh / systemVoltage;
}

/**
 * Full calculation wrapper that returns all sizing parameters.
 * @param {Array} appliances - Array of appliance objects.
 * @param {string} batteryType - 'lead_acid' or 'lithium'.
 * @returns {Object} Sizing results.
 */
export function calculateSystemSize(appliances, batteryType = 'lead_acid') {
  if (!appliances || appliances.length === 0) {
    return {
      dailyEnergy: 0,
      peakPower: 0,
      inverterSize: 0,
      panelCapacity: 0,
      systemVoltage: 12,
      batteryCapacityAh: 0,
      batteryCapacityKWh: 0
    };
  }

  const dailyEnergy = calculateTotalDailyEnergy(appliances);
  const peakPower = calculatePeakPower(appliances);
  const inverterSize = calculateInverterSize(peakPower);
  const panelCapacity = calculateSolarPanelCapacity(dailyEnergy);
  const systemVoltage = determineSystemVoltage(peakPower);
  const batteryCapacityAh = calculateBatteryCapacity(dailyEnergy, systemVoltage, batteryType);
  const batteryCapacityKWh = (batteryCapacityAh * systemVoltage) / 1000;

  return {
    dailyEnergy: Math.ceil(dailyEnergy),
    peakPower: Math.ceil(peakPower),
    inverterSize: Math.ceil(inverterSize),
    panelCapacity: Math.ceil(panelCapacity),
    systemVoltage,
    batteryCapacityAh: Math.ceil(batteryCapacityAh),
    batteryCapacityKWh: batteryCapacityKWh.toFixed(1)
  };
}
