/**
 * Solar Calculator Logic
 * Separates business logic and formulas from UI components.
 */

// Constants for solar calculations
const SYSTEM_LOSS_FACTOR = 1.3; // Accounts for inefficiencies (heat, wiring, dust, etc.) ~30% loss
const BATTERY_DEPTH_OF_DISCHARGE = 0.5; // Lead-acid 50% DoD. Lithium could be 0.8
const BATTERY_SYSTEM_VOLTAGE = 48; // Default system voltage (48V is common for larger setups)
const INVERTER_SAFETY_MARGIN = 1.25; // 25% safety margin for surge/starting power
const PEAK_SUN_HOURS = 5; // Average peak sun hours (e.g., in Sudan/Middle East)

/**
 * Calculates total energy consumption (Watt-hours per day) for a list of devices.
 * @param {Array} devices - List of devices { power_watts, quantity, hours_per_day }
 * @returns {Number} Total Watt-hours per day
 */
export const calculateDailyEnergyConsumption = (devices) => {
  return devices.reduce((total, device) => {
    const power = Number(device.power_watts) || 0;
    const qty = Number(device.quantity) || 0;
    const hours = Number(device.hours_per_day) || 0;
    return total + (power * qty * hours);
  }, 0);
};

/**
 * Calculates total peak power requirement (Watts) if all devices run simultaneously.
 * @param {Array} devices - List of devices { power_watts, quantity }
 * @returns {Number} Total Watts
 */
export const calculateTotalPeakPower = (devices) => {
  return devices.reduce((total, device) => {
    const power = Number(device.power_watts) || 0;
    const qty = Number(device.quantity) || 0;
    return total + (power * qty);
  }, 0);
};

/**
 * Calculates the recommended solar system requirements based on energy needs.
 * @param {Array} devices - List of devices
 * @returns {Object} Recommended system specs
 */
export const calculateSolarSystem = (devices) => {
  if (!devices || devices.length === 0) {
    return {
      dailyEnergyWh: 0,
      totalPeakPowerW: 0,
      recommendedSolarPanelCapacityW: 0,
      recommendedInverterW: 0,
      recommendedBatteryCapacityAh: 0,
      estimatedPanelsNeeded: 0,
      estimatedBatteriesNeeded: 0
    };
  }

  const dailyEnergyWh = calculateDailyEnergyConsumption(devices);
  const totalPeakPowerW = calculateTotalPeakPower(devices);

  // 1. Solar Panel Capacity
  // Energy needed from panels = Daily Energy * System Loss Factor
  const energyNeededWh = dailyEnergyWh * SYSTEM_LOSS_FACTOR;
  // Panel Capacity = Energy Needed / Peak Sun Hours
  const recommendedSolarPanelCapacityW = energyNeededWh / PEAK_SUN_HOURS;

  // 2. Inverter Size
  // Inverter should handle total peak power + safety margin
  const recommendedInverterW = totalPeakPowerW * INVERTER_SAFETY_MARGIN;

  // 3. Battery Capacity
  // Assume we want to store enough energy for 1 full day of usage without sun
  // Total Battery Capacity (Wh) needed = Daily Energy / Depth of Discharge
  const requiredBatteryEnergyWh = dailyEnergyWh / BATTERY_DEPTH_OF_DISCHARGE;
  // Convert Wh to Amp-hours (Ah) based on system voltage
  const recommendedBatteryCapacityAh = requiredBatteryEnergyWh / BATTERY_SYSTEM_VOLTAGE;

  // Simplified estimations for visual UI
  const panelSizeW = 550; // Assume 550W panels
  const estimatedPanelsNeeded = Math.ceil(recommendedSolarPanelCapacityW / panelSizeW);

  const batterySizeAh = 200; // Assume 200Ah 12V batteries
  // To get a 48V 200Ah bank, you need 4 x 12V 200Ah batteries in series.
  // Total Ah needed / 200Ah = number of 48V strings needed.
  // Number of batteries = strings * 4
  const batteryStrings = Math.ceil(recommendedBatteryCapacityAh / batterySizeAh);
  const estimatedBatteriesNeeded = batteryStrings * (BATTERY_SYSTEM_VOLTAGE / 12);


  return {
    dailyEnergyWh: Math.round(dailyEnergyWh),
    totalPeakPowerW: Math.round(totalPeakPowerW),
    recommendedSolarPanelCapacityW: Math.round(recommendedSolarPanelCapacityW),
    recommendedInverterW: Math.round(recommendedInverterW),
    recommendedBatteryCapacityAh: Math.round(recommendedBatteryCapacityAh),
    estimatedPanelsNeeded,
    estimatedBatteriesNeeded,
    assumptions: {
      peakSunHours: PEAK_SUN_HOURS,
      batteryVoltage: BATTERY_SYSTEM_VOLTAGE,
      panelSizeW,
      batterySizeAh
    }
  };
};
