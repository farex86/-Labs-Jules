// src/models/SolarCalculatorModel.js

// List of available facility types (in Arabic)
export const FACILITY_TYPES = [
  'مصنع تلج',
  'شركة',
  'مزرعة',
  'مزرعة دواجن',
  'بيوت محمية',
  'مصنع',
  'مستوصف',
  'مستشفي',
  'مخبز',
  'دكان',
  'ورشة',
  'مضخة موية',
  'دونكي',
  'مسجد',
  'مطبعة',
  'كوفي شوب',
  'مطعم',
  'فندق',
  'بنك',
  'سوبر ماركت',
  'طرمبة وقود',
  'شركة تعدين',
];

// Constants for solar calculations
export const SOLAR_CONSTANTS = {
  SUNLIGHT_HOURS_PER_DAY: 5, // Average peak sunlight hours
  PANEL_WATTAGE: 550, // Standard panel wattage in W
  INVERTER_EFFICIENCY: 0.9, // 90% efficiency
  SYSTEM_LOSSES: 0.8, // 20% system losses (derating factor)
  BATTERY_VOLTAGE: 48, // Standard battery bank voltage
  BATTERY_DEPTH_OF_DISCHARGE: 0.8, // 80% DoD for Lithium
  DAYS_OF_AUTONOMY: 1, // Battery backup days
};

/**
 * Calculates solar requirements based on total daily energy consumption.
 * @param {Array} devices - List of devices with power (W), hours (h), and quantity.
 * @returns {Object} Calculation results including system size, panels, battery capacity.
 */
export const calculateSolarRequirements = (devices) => {
  if (!devices || devices.length === 0) {
    return {
      totalDailyEnergyWh: 0,
      totalPowerW: 0,
      systemSizeKw: 0,
      panelsNeeded: 0,
      inverterSizeKw: 0,
      batteryCapacityAh: 0,
    };
  }

  // 1. Calculate total daily energy consumption (Wh) and peak power (W)
  let totalDailyEnergyWh = 0;
  let totalPowerW = 0;

  devices.forEach((device) => {
    const power = parseFloat(device.power) || 0;
    const hours = parseFloat(device.hours) || 0;
    const quantity = parseInt(device.quantity, 10) || 1;

    totalPowerW += power * quantity;
    totalDailyEnergyWh += power * hours * quantity;
  });

  if (totalDailyEnergyWh === 0) {
    return {
        totalDailyEnergyWh: 0,
        totalPowerW: 0,
        systemSizeKw: 0,
        panelsNeeded: 0,
        inverterSizeKw: 0,
        batteryCapacityAh: 0,
      };
  }

  // 2. Calculate required solar array size (kW)
  // Daily Energy = Array Size * Sunlight Hours * System Losses
  const arraySizeW = totalDailyEnergyWh / (SOLAR_CONSTANTS.SUNLIGHT_HOURS_PER_DAY * SOLAR_CONSTANTS.SYSTEM_LOSSES);
  const systemSizeKw = arraySizeW / 1000;

  // 3. Calculate number of panels needed
  const panelsNeeded = Math.ceil(arraySizeW / SOLAR_CONSTANTS.PANEL_WATTAGE);

  // 4. Calculate Inverter Size (kW)
  // Should handle peak power with a 25% safety margin
  const inverterSizeW = (totalPowerW / SOLAR_CONSTANTS.INVERTER_EFFICIENCY) * 1.25;
  const inverterSizeKw = inverterSizeW / 1000;

  // 5. Calculate Battery Capacity (Ah)
  // Battery Capacity (Wh) = Total Daily Energy * Days of Autonomy / DoD
  const batteryCapacityWh = (totalDailyEnergyWh * SOLAR_CONSTANTS.DAYS_OF_AUTONOMY) / SOLAR_CONSTANTS.BATTERY_DEPTH_OF_DISCHARGE;
  const batteryCapacityAh = batteryCapacityWh / SOLAR_CONSTANTS.BATTERY_VOLTAGE;

  return {
    totalDailyEnergyWh: Math.round(totalDailyEnergyWh),
    totalDailyEnergyKwh: (totalDailyEnergyWh / 1000).toFixed(2),
    totalPowerW: Math.round(totalPowerW),
    systemSizeKw: systemSizeKw.toFixed(2),
    panelsNeeded,
    inverterSizeKw: inverterSizeKw.toFixed(2),
    batteryCapacityAh: Math.round(batteryCapacityAh),
  };
};
