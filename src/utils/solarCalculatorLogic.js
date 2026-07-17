/**
 * Calculates the total power and total daily energy consumption based on a list of devices.
 * @param {Array} devices - List of devices with properties: power, quantity, hours.
 * @returns {Object} An object containing totalPower (Watts) and totalEnergy (Watt-hours).
 */
export const calculateTotalConsumption = (devices) => {
  let totalPower = 0;
  let totalEnergy = 0;

  devices.forEach(device => {
    const power = Number(device.power) || 0;
    const quantity = Number(device.quantity) || 0;
    const hours = Number(device.hours) || 0;

    totalPower += power * quantity;
    totalEnergy += power * quantity * hours;
  });

  return { totalPower, totalEnergy };
};

/**
 * Calculates the solar system requirements based on energy needs.
 * @param {number} totalEnergy - Total daily energy consumption in Watt-hours.
 * @param {number} totalPower - Total power in Watts.
 * @param {Object} options - Configuration options for calculation.
 * @param {number} options.sunHours - Average daily sun hours (default: 5.5 for high sun areas).
 * @param {number} options.systemLoss - System loss percentage (default: 1.25 for 25% loss).
 * @param {number} options.panelRating - Rating of a single solar panel in Watts (default: 550W).
 * @param {number} options.batteryVoltage - Voltage of the battery system (default: 48V).
 * @param {number} options.daysOfAutonomy - Number of days the system needs to run without sun (default: 1).
 * @param {number} options.depthOfDischarge - Depth of discharge for batteries (default: 0.8 for Lithium, 0.5 for Lead-acid).
 * @returns {Object} Calculated solar system requirements.
 */
export const calculateSolarRequirements = (
  totalEnergy,
  totalPower,
  options = {}
) => {
  const {
    sunHours = 5.5,
    systemLoss = 1.25,
    panelRating = 550,
    batteryVoltage = 48,
    daysOfAutonomy = 1,
    depthOfDischarge = 0.8 // Assuming Lithium batteries for modern setups
  } = options;

  // Total energy required from solar panels considering system losses
  const requiredSolarEnergy = totalEnergy * systemLoss;

  // Total solar array capacity required in Watts
  const requiredSolarCapacity = requiredSolarEnergy / sunHours;

  // Number of panels needed
  const numberOfPanels = Math.ceil(requiredSolarCapacity / panelRating);

  // Inverter Size (should be at least 20-30% larger than total peak power)
  // Converting totalPower to kW and adding 25% margin, rounding up to nearest whole number
  const inverterSizeKW = Math.ceil((totalPower * 1.25) / 1000);

  // Battery Bank Capacity required in Amp-hours (Ah)
  const totalBatteryCapacityRequired = (totalEnergy * daysOfAutonomy) / (batteryVoltage * depthOfDischarge);

  // Calculate recommended number of standard 100Ah or 200Ah batteries
  // Defaulting to 200Ah for larger systems, 100Ah for smaller
  const batteryUnitAh = totalBatteryCapacityRequired > 400 ? 200 : 100;
  const numberOfBatteries = Math.ceil(totalBatteryCapacityRequired / batteryUnitAh);

  return {
    requiredSolarCapacityW: Math.round(requiredSolarCapacity),
    requiredSolarCapacityKW: (requiredSolarCapacity / 1000).toFixed(2),
    numberOfPanels,
    panelRating,
    inverterSizeKW: inverterSizeKW < 1 ? 1 : inverterSizeKW, // Minimum 1kW inverter
    totalBatteryCapacityAh: Math.round(totalBatteryCapacityRequired),
    batteryUnitAh,
    numberOfBatteries,
    batteryVoltage
  };
};
