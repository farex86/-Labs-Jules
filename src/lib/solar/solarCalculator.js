/**
 * Pure functions for solar system calculations
 */

// Constants for calculations
const SYSTEM_LOSS_FACTOR = 1.3; // 30% system loss (wiring, dust, temperature, inverter efficiency)
const INVERTER_SAFETY_MARGIN = 1.25; // 25% safety margin for inverter surge/startup
const PANEL_WATTAGE = 550; // Default panel wattage (can be parameterized later)
const BATTERY_VOLTAGE = 48; // System voltage (usually 24V or 48V for larger systems)
const BATTERY_DEPTH_OF_DISCHARGE = 0.8; // 80% DoD for Lithium, or 50% for Lead-Acid (using 80% as default modern standard)
const PEAK_SUN_HOURS = 5; // Average peak sun hours (depends on location, 5 is a good average for sunny regions)

/**
 * Calculates the total daily energy consumption in Watt-hours (Wh)
 * @param {Array} devices - List of devices with power, quantity, and hours
 * @returns {number} Total Daily Energy (Wh)
 */
export const calculateTotalDailyEnergy = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.power * device.quantity * device.hours);
  }, 0);
};

/**
 * Calculates the total peak power demand in Watts (W)
 * Assumes all devices might run at the same time for sizing the inverter.
 * @param {Array} devices - List of devices with power and quantity
 * @returns {number} Total Peak Power (W)
 */
export const calculatePeakPower = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.power * device.quantity);
  }, 0);
};

/**
 * Calculates the required inverter size in Watts (W)
 * Includes a safety margin for startup surges (especially for motors/compressors)
 * @param {number} peakPowerW - Total peak power in Watts
 * @returns {number} Required Inverter Size (W)
 */
export const calculateInverterSize = (peakPowerW) => {
  return peakPowerW * INVERTER_SAFETY_MARGIN;
};

/**
 * Calculates the required total solar array size in Watts (W)
 * @param {number} totalDailyEnergyWh - Total daily energy consumption in Wh
 * @returns {number} Required Array Size (W)
 */
export const calculateArraySize = (totalDailyEnergyWh) => {
  // Energy needed to generate per day, factoring in system losses
  const requiredGenerationWh = totalDailyEnergyWh * SYSTEM_LOSS_FACTOR;

  // Divide by peak sun hours to get the continuous power needed from panels
  return requiredGenerationWh / PEAK_SUN_HOURS;
};

/**
 * Calculates the number of solar panels needed
 * @param {number} arraySizeW - Required array size in Watts
 * @param {number} panelWattage - Wattage of a single panel (default 550W)
 * @returns {number} Number of panels (rounded up)
 */
export const calculateNumberOfPanels = (arraySizeW, panelWattage = PANEL_WATTAGE) => {
  return Math.ceil(arraySizeW / panelWattage);
};

/**
 * Calculates the required battery capacity in Amp-hours (Ah)
 * Assumes 1 day of autonomy.
 * @param {number} totalDailyEnergyWh - Total daily energy consumption in Wh
 * @param {number} batteryVoltage - System battery voltage (default 48V)
 * @param {number} depthOfDischarge - Allowed depth of discharge (default 0.8)
 * @returns {number} Required Battery Capacity (Ah)
 */
export const calculateBatteryCapacity = (
  totalDailyEnergyWh,
  batteryVoltage = BATTERY_VOLTAGE,
  depthOfDischarge = BATTERY_DEPTH_OF_DISCHARGE
) => {
  // Total usable energy needed divided by system voltage gives Ah
  const requiredUsableAh = totalDailyEnergyWh / batteryVoltage;

  // Factor in Depth of Discharge to find total required capacity
  return requiredUsableAh / depthOfDischarge;
};

/**
 * Main calculation runner that returns a complete system sizing object
 * @param {Array} devices - List of device objects
 * @returns {Object} Complete system sizing results
 */
export const calculateSolarSystem = (devices) => {
  if (!devices || devices.length === 0) {
    return {
      dailyEnergyWh: 0,
      peakPowerW: 0,
      inverterSizeW: 0,
      arraySizeW: 0,
      numberOfPanels: 0,
      batteryCapacityAh: 0,
      systemVoltage: BATTERY_VOLTAGE
    };
  }

  const dailyEnergyWh = calculateTotalDailyEnergy(devices);
  const peakPowerW = calculatePeakPower(devices);

  const inverterSizeW = calculateInverterSize(peakPowerW);
  const arraySizeW = calculateArraySize(dailyEnergyWh);
  const numberOfPanels = calculateNumberOfPanels(arraySizeW);
  const batteryCapacityAh = calculateBatteryCapacity(dailyEnergyWh);

  return {
    dailyEnergyWh,
    peakPowerW,
    inverterSizeW,
    arraySizeW,
    numberOfPanels,
    batteryCapacityAh,
    systemVoltage: BATTERY_VOLTAGE
  };
};
