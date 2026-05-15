/**
 * Calculates the Total Daily Energy consumption in Watt-hours (Wh)
 * @param {Array} devices Array of device objects { quantity, power, hours }
 * @returns {number} Total Watt-hours per day
 */
export const calculateTotalDailyEnergy = (devices) => {
  return devices.reduce((total, device) => {
    const qty = Number(device.quantity) || 0;
    const pwr = Number(device.power) || 0;
    const hrs = Number(device.hours) || 0;
    return total + (qty * pwr * hrs);
  }, 0);
};

/**
 * Calculates the Peak Power required in Watts (W)
 * @param {Array} devices Array of device objects { quantity, power }
 * @returns {number} Peak power in Watts
 */
export const calculatePeakPower = (devices) => {
  return devices.reduce((total, device) => {
    const qty = Number(device.quantity) || 0;
    const pwr = Number(device.power) || 0;
    return total + (qty * pwr);
  }, 0);
};

/**
 * Calculates Required Inverter Capacity (W)
 * Adds a safety margin (typically 20-30%) to handle surges.
 * @param {number} peakPower Peak power calculated from devices
 * @param {number} margin Safety margin percentage (default 0.25 = 25%)
 * @returns {number} Inverter capacity in Watts
 */
export const calculateInverterCapacity = (peakPower, margin = 0.25) => {
  return Math.ceil(peakPower * (1 + margin));
};

/**
 * Calculates Total Panel Capacity (W)
 * Considers total daily energy, average peak sun hours, and system efficiency.
 * @param {number} totalDailyEnergy Total daily energy in Wh
 * @param {number} peakSunHours Average peak sun hours (default 5.5 for high solar regions)
 * @param {number} efficiency System efficiency factor (default 0.75 for 25% losses)
 * @returns {number} Panel capacity in Watts
 */
export const calculatePanelCapacity = (totalDailyEnergy, peakSunHours = 5.5, efficiency = 0.75) => {
  if (totalDailyEnergy === 0) return 0;
  return Math.ceil(totalDailyEnergy / (peakSunHours * efficiency));
};

/**
 * Calculates Battery Storage Capacity (kWh)
 * Considers daily energy to store, days of autonomy, and Depth of Discharge (DoD).
 * Note: Typically you don't store 100% of daily energy if using solar during the day,
 * but for a general calculator we often size for 1 day of total autonomy.
 * @param {number} energyToStoreWh Daily energy in Wh
 * @param {number} daysOfAutonomy Number of days system needs to run without sun (default 1)
 * @param {number} depthOfDischarge Max battery DoD (default 0.8 for Lithium, 0.5 for Lead Acid)
 * @returns {number} Battery capacity in kWh
 */
export const calculateBatteryCapacity = (energyToStoreWh, daysOfAutonomy = 1, depthOfDischarge = 0.8) => {
  if (energyToStoreWh === 0) return 0;
  const capacityWh = (energyToStoreWh * daysOfAutonomy) / depthOfDischarge;
  return Number((capacityWh / 1000).toFixed(1)); // Convert to kWh and round
};

/**
 * Main calculation wrapper
 */
export const performSolarCalculations = (devices) => {
  const dailyEnergyWh = calculateTotalDailyEnergy(devices);
  const peakPowerW = calculatePeakPower(devices);

  const inverterSizeW = calculateInverterCapacity(peakPowerW);
  const panelSizeW = calculatePanelCapacity(dailyEnergyWh);

  // Assuming 60% of usage is at night for battery sizing, or sizing for full day autonomy
  // We'll use full day energy for a conservative sizing
  const batterySizeKwh = calculateBatteryCapacity(dailyEnergyWh);

  return {
    dailyEnergyWh,
    dailyEnergyKwh: Number((dailyEnergyWh / 1000).toFixed(1)),
    peakPowerW,
    inverterSizeW,
    inverterSizeKw: Number((inverterSizeW / 1000).toFixed(1)),
    panelSizeW,
    panelSizeKw: Number((panelSizeW / 1000).toFixed(1)),
    batterySizeKwh
  };
};
