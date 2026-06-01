// Business logic and formulas for Solar Calculator

/**
 * Calculates the total daily energy consumption in Watt-hours (Wh).
 * @param {Array} appliances - List of appliance objects.
 * @returns {number} - Total energy consumption in Wh.
 */
export const calculateTotalEnergy = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (app.power * app.quantity * app.hours);
  }, 0);
};

/**
 * Calculates the total peak power required by all appliances in Watts (W).
 * @param {Array} appliances - List of appliance objects.
 * @returns {number} - Total peak power in Watts.
 */
export const calculatePeakPower = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (app.power * app.quantity);
  }, 0);
};

/**
 * Calculates the required solar panel array capacity in Watts (W).
 * Formula: (Total Daily Energy Wh / Average Sun Hours) * System Efficiency Loss Factor
 * Assuming 5 Peak Sun Hours and 20% system losses (Efficiency factor of 1.2)
 * @param {number} totalEnergyWh - Total daily energy consumption in Wh.
 * @param {number} peakSunHours - Average peak sun hours per day (default 5).
 * @param {number} efficiencyFactor - Efficiency loss multiplier (default 1.2 for 20% loss).
 * @returns {number} - Required solar panel capacity in Watts.
 */
export const calculatePanelCapacity = (totalEnergyWh, peakSunHours = 5, efficiencyFactor = 1.2) => {
  if (totalEnergyWh === 0) return 0;
  return (totalEnergyWh / peakSunHours) * efficiencyFactor;
};

/**
 * Calculates the recommended inverter size in Watts (W).
 * Formula: Total Peak Power * Safety Factor
 * Assuming 25% safety margin for startup surges.
 * @param {number} peakPowerW - Total peak power of all appliances in Watts.
 * @param {number} safetyFactor - Safety margin multiplier (default 1.25).
 * @returns {number} - Recommended inverter size in Watts.
 */
export const calculateInverterSize = (peakPowerW, safetyFactor = 1.25) => {
  if (peakPowerW === 0) return 0;
  return peakPowerW * safetyFactor;
};

/**
 * Calculates the required battery capacity in Ampere-hours (Ah).
 * Formula: (Total Daily Energy Wh * Days of Autonomy) / (Battery Voltage * Depth of Discharge)
 * Assuming 1 day autonomy, 24V or 48V system (default 24V), and 50% DoD for Lead-Acid.
 * @param {number} totalEnergyWh - Total daily energy consumption in Wh.
 * @param {number} systemVoltage - Battery system voltage (default 24V).
 * @param {number} daysOfAutonomy - Number of days the battery needs to supply power without sun (default 1).
 * @param {number} depthOfDischarge - Maximum depth of discharge (default 0.5 for 50%).
 * @returns {number} - Required battery capacity in Ah.
 */
export const calculateBatteryCapacity = (totalEnergyWh, systemVoltage = 24, daysOfAutonomy = 1, depthOfDischarge = 0.5) => {
  if (totalEnergyWh === 0) return 0;
  return (totalEnergyWh * daysOfAutonomy) / (systemVoltage * depthOfDischarge);
};
