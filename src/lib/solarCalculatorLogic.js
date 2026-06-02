/**
 * Calculates the total daily energy consumption in Watt-hours (Wh)
 * @param {Array} appliances - List of appliances with powerW, quantity, and hoursPerDay
 * @returns {number} Total Wh/day
 */
export const calculateTotalDailyEnergy = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (app.powerW * app.quantity * app.hoursPerDay);
  }, 0);
};

/**
 * Calculates the total peak power in Watts (W)
 * @param {Array} appliances - List of appliances
 * @returns {number} Total Peak Power (W)
 */
export const calculateTotalPeakPower = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (app.powerW * app.quantity);
  }, 0);
};

/**
 * Calculates the required system components size based on load
 * @param {number} totalDailyEnergyWh - Total energy consumed per day in Wh
 * @param {number} totalPeakPowerW - Peak power demand in Watts
 * @param {object} options - Optional parameters like sunHours, systemLoss, batteryAutonomy, depthOfDischarge, systemVoltage
 * @returns {object} Required system sizing details
 */
export const calculateSystemSize = (totalDailyEnergyWh, totalPeakPowerW, options = {}) => {
  const {
    sunHours = 5.5, // Average peak sun hours per day
    systemLoss = 1.3, // 30% loss factor for inefficiencies
    batteryAutonomy = 1.5, // Days of autonomy for batteries
    depthOfDischarge = 0.5, // 50% DoD for lead-acid (adjust to 0.8 for Lithium)
    systemVoltage = 48 // Default system voltage for calculations (can be 12, 24, 48)
  } = options;

  // 1. Solar Panel Array Sizing
  // Daily energy required from panels considering losses
  const dailyEnergyRequiredWh = totalDailyEnergyWh * systemLoss;
  // Total Solar Array capacity required in Watts
  const requiredSolarArrayW = dailyEnergyRequiredWh / sunHours;

  // 2. Inverter Sizing
  // Inverter should be at least 25-30% larger than total peak power to handle surges
  const requiredInverterW = totalPeakPowerW * 1.3;

  // 3. Battery Bank Sizing
  // Total battery capacity needed in Wh considering autonomy and Depth of Discharge (DoD)
  const requiredBatteryCapacityWh = (totalDailyEnergyWh * batteryAutonomy) / depthOfDischarge;
  // Convert to Amp-hours (Ah) based on system voltage
  const requiredBatteryCapacityAh = requiredBatteryCapacityWh / systemVoltage;

  return {
    dailyEnergyRequiredWh: Math.ceil(dailyEnergyRequiredWh),
    requiredSolarArrayW: Math.ceil(requiredSolarArrayW),
    requiredInverterW: Math.ceil(requiredInverterW),
    requiredBatteryCapacityWh: Math.ceil(requiredBatteryCapacityWh),
    requiredBatteryCapacityAh: Math.ceil(requiredBatteryCapacityAh),
    systemVoltage
  };
};
