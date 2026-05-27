import { SOLAR_SYSTEM_DEFAULTS } from './constants';

/**
 * Calculates the total load based on an array of devices.
 * @param {Array} devices - Array of objects { name, power: number, hours: number, quantity: number }
 * @returns {Object} { totalPowerW: number, totalDailyWh: number }
 */
export function calculateLoad(devices) {
  let totalPowerW = 0;
  let totalDailyWh = 0;

  devices.forEach(device => {
    const power = Number(device.power) || 0;
    const hours = Number(device.hours) || 0;
    const quantity = Number(device.quantity) || 1;

    const deviceTotalPower = power * quantity;
    const deviceDailyEnergy = deviceTotalPower * hours;

    totalPowerW += deviceTotalPower;
    totalDailyWh += deviceDailyEnergy;
  });

  return { totalPowerW, totalDailyWh };
}

/**
 * Calculates the required solar system size based on total load and config.
 * @param {number} totalDailyWh - Total daily energy consumption in Watt-hours
 * @param {number} totalPowerW - Total peak power consumption in Watts
 * @param {Object} customConfig - Optional overrides for SOLAR_SYSTEM_DEFAULTS
 * @returns {Object} System size recommendations
 */
export function calculateSystemSize(totalDailyWh, totalPowerW, customConfig = {}) {
  const config = { ...SOLAR_SYSTEM_DEFAULTS, ...customConfig };

  // 1. Calculate Required Solar Array Size
  // Energy required from panels = Daily Consumption * System Loss Factor
  const requiredDailyWhFromPanels = totalDailyWh * config.systemLossFactor;
  // Total Solar Array Watts = Required Energy / Peak Sun Hours
  const requiredArrayW = requiredDailyWhFromPanels / config.peakSunHours;
  const requiredArrayKw = requiredArrayW / 1000;

  // 2. Calculate Number of Panels
  const numberOfPanels = Math.ceil(requiredArrayW / config.panelWattage);

  // 3. Calculate Inverter Size
  // Inverter Size = Total Peak Power * Safety Margin
  const requiredInverterW = totalPowerW * config.inverterSafetyMargin;
  const requiredInverterKw = requiredInverterW / 1000;

  // 4. Calculate Battery Capacity
  // Total Battery Wh = (Daily Consumption * Days of Autonomy) / Depth of Discharge
  const requiredBatteryWh = (totalDailyWh * config.daysOfAutonomy) / config.batteryDepthOfDischarge;
  // Battery Ah = Total Battery Wh / System Voltage
  const requiredBatteryAh = requiredBatteryWh / config.batteryVoltage;

  return {
    arraySizeKw: requiredArrayKw,
    numberOfPanels: numberOfPanels,
    inverterSizeKw: requiredInverterKw,
    batteryCapacityAh: requiredBatteryAh,
    batteryVoltage: config.batteryVoltage,
  };
}
