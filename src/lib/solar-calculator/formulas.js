/**
 * Calculates the total daily energy consumption and total peak power.
 * @param {Array} appliances - Array of appliance objects { power, quantity, hours }
 * @returns {Object} { totalEnergyWh, totalPowerW }
 */
export const calculateTotalEnergy = (appliances) => {
  let totalEnergyWh = 0;
  let totalPowerW = 0;

  appliances.forEach(app => {
    const power = Number(app.power) || 0;
    const quantity = Number(app.quantity) || 0;
    const hours = Number(app.hours) || 0;

    totalPowerW += power * quantity;
    totalEnergyWh += power * quantity * hours;
  });

  return { totalEnergyWh, totalPowerW };
};

/**
 * Calculates system requirements based on energy consumption and peak power.
 * @param {number} totalEnergyWh - Total daily energy consumption in Watt-hours
 * @param {number} totalPowerW - Total peak power in Watts
 * @param {Object} options - Configuration options for efficiency and solar hours
 * @returns {Object} System requirements (inverter, battery, panels)
 */
export const calculateSystemRequirements = (totalEnergyWh, totalPowerW, options = {}) => {
  const {
    inverterSafetyFactor = 1.25, // 25% safety margin
    batteryAutonomyDays = 1, // Number of days the battery should last without sun
    batteryDepthOfDischarge = 0.5, // 50% DoD for Lead-Acid / Gel (can adjust for Lithium)
    systemVoltage = 48, // 48V system is standard for larger setups
    solarPeakSunHours = 5, // Average peak sun hours in the region
    systemLossFactor = 1.3 // 30% system losses (wiring, inverter efficiency, temperature)
  } = options;

  // 1. Inverter Sizing (W)
  const recommendedInverterW = totalPowerW * inverterSafetyFactor;
  // Round up to nearest 1000 for standard sizing, or return exact
  const inverterSizeKw = Math.ceil(recommendedInverterW / 1000) * 1000;

  // 2. Battery Sizing (Ah)
  // Total Energy required per day * days of autonomy / (Depth of Discharge * System Voltage)
  const requiredBatteryCapacityAh = (totalEnergyWh * batteryAutonomyDays) / (batteryDepthOfDischarge * systemVoltage);

  // 3. Solar Panel Sizing (W)
  // Total Energy * System Losses / Peak Sun Hours
  const requiredPanelPowerW = (totalEnergyWh * systemLossFactor) / solarPeakSunHours;

  return {
    inverterSizeKw: inverterSizeKw / 1000, // Return in kW for easier reading
    inverterSizeW: recommendedInverterW,
    batteryCapacityAh: Math.ceil(requiredBatteryCapacityAh),
    systemVoltage,
    panelPowerW: Math.ceil(requiredPanelPowerW),
    panelPowerKw: (requiredPanelPowerW / 1000).toFixed(2)
  };
};
