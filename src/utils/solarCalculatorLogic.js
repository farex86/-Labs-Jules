/**
 * Calculates the total daily energy consumption in Watt-hours.
 * @param {Array} devices - List of devices with power, qty, and hours properties.
 * @returns {number} Total daily energy (Wh).
 */
export const calculateTotalDailyEnergy = (devices) => {
  return devices.reduce((total, device) => {
    return total + (Number(device.power) * Number(device.qty) * Number(device.hours));
  }, 0);
};

/**
 * Calculates the total power demand in Watts (if all devices run simultaneously).
 * @param {Array} devices - List of devices.
 * @returns {number} Total power (W).
 */
export const calculateTotalPower = (devices) => {
  return devices.reduce((total, device) => {
    return total + (Number(device.power) * Number(device.qty));
  }, 0);
};

/**
 * Estimates the required solar system components.
 * @param {number} dailyEnergyWh - Total daily energy consumption in Watt-hours.
 * @param {number} totalPowerW - Total peak power demand in Watts.
 * @returns {Object} Estimated system requirements.
 */
export const estimateSolarSystem = (dailyEnergyWh, totalPowerW) => {
  // Assumptions:
  // Peak Sun Hours (PSH) = 5 hours/day (average for sunny regions like Sudan/Middle East)
  const peakSunHours = 5;

  // System inefficiency factor (losses from inverter, wiring, dust, temperature, etc. ~ 30% loss)
  const efficiencyFactor = 0.7;

  // Battery Depth of Discharge (DoD) & efficiency (e.g., Lead Acid or Lithium - assuming 80% usable)
  const batteryEfficiency = 0.8;
  const systemVoltage = 48; // Assume 48V system for commercial sizes

  // 1. Required Solar Array Capacity (Watts)
  // To generate the required daily energy considering losses
  const requiredSolarArrayW = dailyEnergyWh / (peakSunHours * efficiencyFactor);

  // Example Panel Size: 550W
  const panelWattage = 550;
  const numberOfPanels = Math.ceil(requiredSolarArrayW / panelWattage);

  // 2. Inverter Size (Watts)
  // Needs to handle the peak load + 25% safety margin
  const inverterSizeW = totalPowerW * 1.25;
  const inverterSizeKW = Math.ceil(inverterSizeW / 1000);

  // 3. Battery Capacity (Ah)
  // To cover 1 day of autonomy (backup for night/cloudy day)
  const requiredBatteryCapacityWh = dailyEnergyWh / batteryEfficiency;
  const requiredBatteryCapacityAh = requiredBatteryCapacityWh / systemVoltage;

  // Example Battery Size: 48V 200Ah (9600Wh) Lithium
  const batteryUnitAh = 200;
  const numberOfBatteries = Math.ceil(requiredBatteryCapacityAh / batteryUnitAh);

  return {
    dailyEnergyKWh: (dailyEnergyWh / 1000).toFixed(2),
    totalPowerKW: (totalPowerW / 1000).toFixed(2),
    requiredSolarArrayKW: (requiredSolarArrayW / 1000).toFixed(2),
    numberOfPanels: numberOfPanels,
    panelWattage: panelWattage,
    inverterSizeKW: inverterSizeKW,
    numberOfBatteries: numberOfBatteries,
    batteryVoltage: systemVoltage,
    batteryAh: batteryUnitAh,
    requiredBatteryCapacityKWh: (requiredBatteryCapacityWh / 1000).toFixed(2)
  };
};
