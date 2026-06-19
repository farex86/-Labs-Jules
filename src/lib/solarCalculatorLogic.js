// Assumptions and constant configurations for the formulas
const INVERTER_EFFICIENCY = 0.9;
const SYSTEM_VOLTAGE = 48; // standard for larger systems, or calculate based on load
const BATTERY_DOD = 0.5; // Depth of Discharge (50% for lead acid/gel, higher for lithium)
const PEAK_SUN_HOURS = 5.5; // Average in many sunny regions (e.g. Sudan/MENA)
const PANEL_WATTAGE = 550; // standard modern panel wattage

/**
 * Calculates the total daily energy consumption based on a list of devices.
 *
 * @param {Array} devices - Array of objects containing power (W), qty, and hours.
 * @returns {Object} Total energy (Wh), Total Power (W)
 */
export const calculateTotalEnergy = (devices) => {
  let totalWh = 0;
  let totalPowerW = 0;

  devices.forEach(device => {
    const qty = device.qty || 0;
    const power = device.power || 0;
    const hours = device.hours || 0;

    totalPowerW += (power * qty);
    totalWh += (power * qty * hours);
  });

  return { totalWh, totalPowerW };
};

/**
 * Calculates the required solar system components based on daily energy demand.
 *
 * @param {number} totalWh - Total daily energy consumption in Watt-hours.
 * @param {number} totalPowerW - Total peak power consumption in Watts.
 * @returns {Object} System size in kW, Battery Capacity Ah, Inverter size kW, Panel count
 */
export const calculateSystemRequirements = (totalWh, totalPowerW) => {
  // Account for inverter efficiency and system losses
  const actualDailyEnergyNeeded = totalWh / INVERTER_EFFICIENCY;

  // Required Array Size (Watts) = Daily Energy / Peak Sun Hours
  const requiredArrayW = actualDailyEnergyNeeded / PEAK_SUN_HOURS;

  // Calculate Number of Panels
  const numberOfPanels = Math.ceil(requiredArrayW / PANEL_WATTAGE);

  // System Size (kW)
  const systemSizeKW = (numberOfPanels * PANEL_WATTAGE) / 1000;

  // Battery Bank Capacity (Ah)
  // Capacity = Total Energy / (System Voltage * Depth of Discharge)
  const batteryCapacityAh = Math.ceil(totalWh / (SYSTEM_VOLTAGE * BATTERY_DOD));

  // Inverter Size (kW)
  // Usually sized to handle peak load + 25-30% buffer
  const inverterSizeKW = Math.ceil((totalPowerW * 1.3) / 1000);

  return {
    systemSizeKW: systemSizeKW.toFixed(2),
    batteryCapacityAh,
    inverterSizeKW,
    numberOfPanels,
    systemVoltage: SYSTEM_VOLTAGE
  };
};
