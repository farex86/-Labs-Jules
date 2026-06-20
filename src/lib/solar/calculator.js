import { SYSTEM_DEFAULTS } from './constants';

/**
 * Calculates the total daily energy consumption in Watt-hours (Wh).
 * @param {Array} appliances - Array of appliance objects {watts, quantity, hours}
 * @returns {number} Total Wh per day
 */
export const calculateTotalDailyWh = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (app.watts * app.quantity * app.hours);
  }, 0);
};

/**
 * Calculates the total simultaneous load in Watts.
 * This assumes all appliances could potentially run at the same time.
 * @param {Array} appliances - Array of appliance objects {watts, quantity}
 * @returns {number} Total Watts
 */
export const calculateTotalWatts = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (app.watts * app.quantity);
  }, 0);
};

/**
 * Estimates the required Inverter Size in Watts.
 * Accounts for safety margin and surge.
 * @param {number} totalWatts - Total simultaneous load in Watts
 * @param {number} margin - Safety margin multiplier (e.g., 1.25 for 25%)
 * @returns {number} Inverter size in Watts
 */
export const estimateInverterSize = (totalWatts, margin = SYSTEM_DEFAULTS.safetyMargin) => {
  return totalWatts * margin;
};

/**
 * Estimates the required Solar Array Size in Watts.
 * Accounts for inverter efficiency and peak sun hours.
 * @param {number} totalDailyWh - Total daily consumption in Wh
 * @param {number} peakSunHours - Average peak sun hours per day
 * @param {number} efficiency - Inverter efficiency
 * @param {number} margin - Safety margin multiplier
 * @returns {number} Total Solar Array size in Watts
 */
export const estimateSolarArraySize = (
  totalDailyWh,
  peakSunHours = SYSTEM_DEFAULTS.peakSunHours,
  efficiency = SYSTEM_DEFAULTS.inverterEfficiency,
  margin = SYSTEM_DEFAULTS.safetyMargin
) => {
  const adjustedWh = totalDailyWh / efficiency;
  return (adjustedWh / peakSunHours) * margin;
};

/**
 * Estimates the required Battery Bank Capacity.
 * @param {number} totalDailyWh - Total daily consumption in Wh
 * @param {number} daysOfAutonomy - Number of days the system needs to run without sun
 * @param {number} systemVoltage - Battery bank voltage (e.g., 12, 24, 48)
 * @param {number} depthOfDischarge - DoD limit (e.g., 0.5 for 50%)
 * @param {number} efficiency - Inverter efficiency
 * @returns {Object} { kWh: total capacity in kWh, Ah: total capacity in Amp-hours }
 */
export const estimateBatteryCapacity = (
  totalDailyWh,
  daysOfAutonomy = 1,
  systemVoltage = SYSTEM_DEFAULTS.systemVoltage,
  depthOfDischarge = SYSTEM_DEFAULTS.batteryDepthOfDischarge,
  efficiency = SYSTEM_DEFAULTS.inverterEfficiency
) => {
  // Total energy needed from battery to cover loads considering efficiency
  const requiredWh = (totalDailyWh * daysOfAutonomy) / efficiency;

  // Total capacity needed considering Depth of Discharge
  const totalCapacityWh = requiredWh / depthOfDischarge;

  return {
    kWh: totalCapacityWh / 1000,
    Ah: totalCapacityWh / systemVoltage
  };
};

/**
 * Main calculation wrapper that returns all estimates based on an appliance list.
 * @param {Array} appliances - The current list of appliances
 * @returns {Object} Complete system sizing summary
 */
export const calculateSystemRequirements = (appliances) => {
  if (!appliances || appliances.length === 0) {
    return {
      totalWatts: 0,
      totalDailyWh: 0,
      inverterSizeW: 0,
      solarArraySizeW: 0,
      batteryCapacityKWh: 0,
      batteryCapacityAh: 0
    };
  }

  const totalWatts = calculateTotalWatts(appliances);
  const totalDailyWh = calculateTotalDailyWh(appliances);

  const inverterSizeW = estimateInverterSize(totalWatts);
  const solarArraySizeW = estimateSolarArraySize(totalDailyWh);
  const battery = estimateBatteryCapacity(totalDailyWh);

  return {
    totalWatts,
    totalDailyWh,
    inverterSizeW,
    solarArraySizeW,
    batteryCapacityKWh: battery.kWh,
    batteryCapacityAh: battery.Ah
  };
};
