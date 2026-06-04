/**
 * Calculates the total daily energy consumption in Watt-hours (Wh).
 * @param {Array} devices - List of devices.
 * @returns {number} Total daily consumption in Wh.
 */
export const calculateDailyConsumption = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.power * device.quantity * device.hours);
  }, 0);
};

/**
 * Calculates the total peak power demand in Watts (W).
 * @param {Array} devices - List of devices.
 * @returns {number} Peak power in W.
 */
export const calculatePeakPower = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.power * device.quantity);
  }, 0);
};

/**
 * Calculates the required solar panel capacity.
 * Assumes 5 peak sun hours per day and an overall system efficiency of 80% (0.8).
 * @param {number} dailyConsumptionWh - Total daily consumption in Wh.
 * @param {number} peakSunHours - Average peak sun hours per day (default 5).
 * @param {number} systemEfficiency - Overall system efficiency (default 0.8).
 * @returns {number} Required solar array size in Watts.
 */
export const calculateSolarCapacity = (dailyConsumptionWh, peakSunHours = 5, systemEfficiency = 0.8) => {
  if (dailyConsumptionWh === 0) return 0;
  return dailyConsumptionWh / (peakSunHours * systemEfficiency);
};

/**
 * Calculates the required inverter size.
 * Adds a safety margin of 25% (multiply by 1.25) to the peak power demand.
 * @param {number} peakPowerW - Total peak power demand in Watts.
 * @param {number} safetyFactor - Safety factor (default 1.25).
 * @returns {number} Required inverter size in Watts.
 */
export const calculateInverterSize = (peakPowerW, safetyFactor = 1.25) => {
  if (peakPowerW === 0) return 0;
  return peakPowerW * safetyFactor;
};

/**
 * Calculates the required battery capacity.
 * Assumes 1 day of autonomy and a maximum Depth of Discharge (DoD) of 50% for lead-acid/gel or 80% for Lithium.
 * We'll use 50% DoD as a safer generic default.
 * @param {number} dailyConsumptionWh - Total daily consumption in Wh.
 * @param {number} daysOfAutonomy - Number of days the system can run without sun (default 1).
 * @param {number} depthOfDischarge - Maximum allowable DoD (default 0.5).
 * @param {number} batteryEfficiency - Battery efficiency (default 0.85).
 * @returns {number} Required battery capacity in Watt-hours (Wh).
 */
export const calculateBatteryCapacity = (dailyConsumptionWh, daysOfAutonomy = 1, depthOfDischarge = 0.5, batteryEfficiency = 0.85) => {
  if (dailyConsumptionWh === 0) return 0;
  return (dailyConsumptionWh * daysOfAutonomy) / (depthOfDischarge * batteryEfficiency);
};

/**
 * Main calculator function that returns all results.
 * @param {Array} devices - List of devices.
 * @returns {Object} Calculation results.
 */
export const calculateSystemRequirements = (devices) => {
  const dailyConsumptionWh = calculateDailyConsumption(devices);
  const peakPowerW = calculatePeakPower(devices);

  return {
    dailyConsumptionWh,
    peakPowerW,
    solarCapacityW: calculateSolarCapacity(dailyConsumptionWh),
    inverterSizeW: calculateInverterSize(peakPowerW),
    batteryCapacityWh: calculateBatteryCapacity(dailyConsumptionWh)
  };
};
