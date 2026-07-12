/**
 * Calculates the total daily energy consumption for a given list of devices.
 *
 * @param {Array} devices - List of device objects.
 * @returns {number} Total daily energy in Watt-hours (Wh).
 */
export const calculateTotalDailyEnergy = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.power * device.quantity * device.hours);
  }, 0);
};

/**
 * Estimates the required solar system size based on total daily energy.
 * Includes a safety margin for inefficiencies (e.g., system losses).
 *
 * @param {number} totalDailyEnergyWh - Total daily energy in Watt-hours.
 * @param {number} peakSunHours - Average peak sun hours per day (default 5 for sunny regions).
 * @param {number} systemEfficiency - Efficiency of the system (default 0.8 for 80%).
 * @returns {number} Estimated system size in kiloWatts (kW).
 */
export const estimateSystemSizeKW = (totalDailyEnergyWh, peakSunHours = 5, systemEfficiency = 0.8) => {
  if (totalDailyEnergyWh <= 0) return 0;

  // Total energy needed considering efficiency
  const requiredEnergyWh = totalDailyEnergyWh / systemEfficiency;

  // Required power capacity in Watts
  const requiredPowerW = requiredEnergyWh / peakSunHours;

  // Convert to kW
  return requiredPowerW / 1000;
};

/**
 * Estimates the number of solar panels required.
 *
 * @param {number} systemSizeKW - Estimated system size in kW.
 * @param {number} panelWattage - Wattage of a single panel (default 550W).
 * @returns {number} Number of panels.
 */
export const estimateNumberOfPanels = (systemSizeKW, panelWattage = 550) => {
  if (systemSizeKW <= 0) return 0;

  // Convert system size to Watts
  const systemSizeW = systemSizeKW * 1000;

  return Math.ceil(systemSizeW / panelWattage);
};

/**
 * Estimates the required battery capacity in kiloWatt-hours (kWh) for nighttime or backup usage.
 *
 * @param {number} totalDailyEnergyWh - Total daily energy in Watt-hours.
 * @param {number} daysOfAutonomy - Number of days to run without sun (default 1).
 * @param {number} depthOfDischarge - Safe depth of discharge for batteries (default 0.8 for Lithium).
 * @param {number} batteryEfficiency - Efficiency of batteries (default 0.95).
 * @returns {number} Battery capacity in kWh.
 */
export const estimateBatteryCapacityKWh = (totalDailyEnergyWh, daysOfAutonomy = 1, depthOfDischarge = 0.8, batteryEfficiency = 0.95) => {
  if (totalDailyEnergyWh <= 0) return 0;

  // We assume that half of the energy is used during the day (direct from solar)
  // and half is used at night (from batteries). Adjust if needed based on device specific usage.
  // For simplicity, we use total daily energy here.
  const requiredBatteryEnergyWh = (totalDailyEnergyWh * daysOfAutonomy) / (depthOfDischarge * batteryEfficiency);

  return requiredBatteryEnergyWh / 1000;
};

/**
 * Estimates the required inverter size.
 *
 * @param {Array} devices - List of device objects.
 * @param {number} safetyMargin - Safety margin (default 1.25 for 25% extra capacity).
 * @returns {number} Estimated inverter size in kiloVolt-Amperes (kVA).
 */
export const estimateInverterSizeKVA = (devices, safetyMargin = 1.25) => {
  // Calculate total concurrent power (assuming all devices might run at once)
  const totalPowerW = devices.reduce((total, device) => {
    return total + (device.power * device.quantity);
  }, 0);

  // Add safety margin for surge/starting currents
  const requiredPowerW = totalPowerW * safetyMargin;

  // Convert to kVA (assuming power factor of ~0.8 to 1, we use 1 for simplicity here as estimate)
  return requiredPowerW / 1000;
};

/**
 * Generates a complete solar estimation report.
 *
 * @param {Array} devices - List of device objects.
 * @returns {Object} Comprehensive estimation result.
 */
export const generateSolarEstimation = (devices) => {
  const totalDailyEnergyWh = calculateTotalDailyEnergy(devices);
  const systemSizeKW = estimateSystemSizeKW(totalDailyEnergyWh);
  const numberOfPanels = estimateNumberOfPanels(systemSizeKW);
  const batteryCapacityKWh = estimateBatteryCapacityKWh(totalDailyEnergyWh);
  const inverterSizeKVA = estimateInverterSizeKVA(devices);

  return {
    totalDailyEnergyKWh: totalDailyEnergyWh / 1000,
    systemSizeKW,
    numberOfPanels,
    batteryCapacityKWh,
    inverterSizeKVA
  };
};
