/**
 * Constants used in the solar calculation.
 * These can be tweaked based on the specific location (e.g., Sudan).
 */
export const SOLAR_CONSTANTS = {
  // Average peak sun hours per day (Sudan has high sun hours, typically 6-7)
  PEAK_SUN_HOURS: 6.5,

  // System energy efficiency (accounting for losses in inverter, wiring, dust, heat)
  // Usually around 0.7 to 0.8. We'll use 0.75 for a conservative estimate.
  SYSTEM_EFFICIENCY: 0.75,

  // Depth of Discharge (DoD) for batteries.
  // Lead-acid is typically 0.5 (50%), Lithium-ion is typically 0.8 (80%).
  // We assume Lithium-ion as default for modern systems.
  BATTERY_DOD: 0.8,

  // System Voltage (DC). Typical values are 12V, 24V, 48V.
  // We'll calculate it based on total load, but 48V is common for larger systems.
  DEFAULT_SYSTEM_VOLTAGE: 48,

  // Number of days of autonomy (battery backup days without sun)
  DAYS_OF_AUTONOMY: 1,

  // Inverter efficiency (typical 0.9 to 0.95)
  INVERTER_EFFICIENCY: 0.9,
};

/**
 * Calculates the total daily energy consumption in Watt-hours (Wh)
 * @param {Array} appliances - Array of appliance objects { quantity, wattage, hoursPerDay }
 * @returns {number} Total Wh per day
 */
export const calculateTotalDailyEnergy = (appliances) => {
  if (!appliances || !Array.isArray(appliances)) return 0;

  return appliances.reduce((total, app) => {
    const qty = Number(app.quantity) || 0;
    const watts = Number(app.wattage) || 0;
    const hours = Number(app.hoursPerDay) || 0;
    return total + (qty * watts * hours);
  }, 0);
};

/**
 * Calculates the maximum simultaneous power demand (Total Wattage)
 * This determines the minimum Inverter size.
 * @param {Array} appliances
 * @returns {number} Total Watts
 */
export const calculateMaxPowerDemand = (appliances) => {
  if (!appliances || !Array.isArray(appliances)) return 0;

  return appliances.reduce((total, app) => {
    const qty = Number(app.quantity) || 0;
    const watts = Number(app.wattage) || 0;
    return total + (qty * watts);
  }, 0);
};

/**
 * Calculates the required Solar Array size in Watts
 * @param {number} dailyEnergyWh - Total daily energy consumption in Wh
 * @returns {number} Required solar array size in Watts
 */
export const calculateRequiredSolarArray = (dailyEnergyWh) => {
  if (dailyEnergyWh <= 0) return 0;

  // Total energy required from panels = Daily Energy / System Efficiency
  const energyFromPanels = dailyEnergyWh / SOLAR_CONSTANTS.SYSTEM_EFFICIENCY;

  // Array Size (W) = Energy from panels / Peak Sun Hours
  const arraySizeW = energyFromPanels / SOLAR_CONSTANTS.PEAK_SUN_HOURS;

  return arraySizeW;
};

/**
 * Calculates the required battery capacity in Ampere-hours (Ah)
 * @param {number} dailyEnergyWh - Total daily energy consumption in Wh
 * @param {number} systemVoltage - DC System Voltage (12, 24, 48)
 * @returns {number} Battery capacity in Ah
 */
export const calculateBatteryCapacity = (dailyEnergyWh, systemVoltage = SOLAR_CONSTANTS.DEFAULT_SYSTEM_VOLTAGE) => {
  if (dailyEnergyWh <= 0) return 0;

  // Total energy required in batteries = (Daily Energy * Days of Autonomy) / (Inverter Efficiency * DoD)
  const totalEnergyReq = (dailyEnergyWh * SOLAR_CONSTANTS.DAYS_OF_AUTONOMY) /
                         (SOLAR_CONSTANTS.INVERTER_EFFICIENCY * SOLAR_CONSTANTS.BATTERY_DOD);

  // Capacity in Ah = Total Energy (Wh) / System Voltage (V)
  const capacityAh = totalEnergyReq / systemVoltage;

  return capacityAh;
};

/**
 * Main calculation function that takes appliances and optional overrides
 * and returns all necessary system specifications.
 * @param {Array} appliances
 * @param {number} panelRatingW - Wattage of a single solar panel chosen by user (e.g., 550W)
 * @returns {Object} System specifications
 */
export const calculateSolarSystem = (appliances, panelRatingW = 550) => {
  const dailyEnergyWh = calculateTotalDailyEnergy(appliances);
  const maxPowerDemandW = calculateMaxPowerDemand(appliances);

  // If no energy consumed, return zeros
  if (dailyEnergyWh === 0) {
    return {
      dailyEnergyWh: 0,
      dailyEnergyKWh: 0,
      maxPowerDemandW: 0,
      maxPowerDemandKW: 0,
      recommendedInverterKW: 0,
      requiredSolarArrayW: 0,
      requiredSolarArrayKW: 0,
      numberOfPanels: 0,
      batteryCapacityAh: 0,
      systemVoltage: SOLAR_CONSTANTS.DEFAULT_SYSTEM_VOLTAGE
    };
  }

  const requiredSolarArrayW = calculateRequiredSolarArray(dailyEnergyWh);

  // Recommended Inverter size: Max power + 20-30% safety margin
  const recommendedInverterW = maxPowerDemandW * 1.25;

  // Number of panels = Required Array Size / Panel Rating
  const panelRatingNum = Number(panelRatingW) || 550;
  const numberOfPanels = Math.ceil(requiredSolarArrayW / panelRatingNum);

  // Determine system voltage based on load
  let systemVoltage = 12;
  if (recommendedInverterW > 1000 && recommendedInverterW <= 3000) systemVoltage = 24;
  else if (recommendedInverterW > 3000) systemVoltage = 48;

  const batteryCapacityAh = calculateBatteryCapacity(dailyEnergyWh, systemVoltage);

  return {
    dailyEnergyWh,
    dailyEnergyKWh: dailyEnergyWh / 1000,
    maxPowerDemandW,
    maxPowerDemandKW: maxPowerDemandW / 1000,
    recommendedInverterKW: recommendedInverterW / 1000,
    requiredSolarArrayW,
    requiredSolarArrayKW: requiredSolarArrayW / 1000,
    numberOfPanels,
    panelRatingW: panelRatingNum,
    batteryCapacityAh,
    systemVoltage
  };
};
