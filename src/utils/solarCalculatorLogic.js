import { SYSTEM_CONSTANTS } from './solarCalculatorConfig.js';

/**
 * Calculates the total power and total daily energy consumption.
 * @param {Array} devices - List of devices {quantity, power, hours}
 * @returns {Object} { totalPower, totalEnergy }
 */
export const calculateLoad = (devices) => {
  let totalPower = 0; // in Watts
  let totalEnergy = 0; // in Watt-hours (Wh)

  devices.forEach((device) => {
    const q = Number(device.quantity) || 0;
    const p = Number(device.power) || 0;
    const h = Number(device.hours) || 0;

    const devicePower = q * p;
    totalPower += devicePower;
    totalEnergy += devicePower * h;
  });

  return {
    totalPower, // Watts
    totalEnergy, // Wh
  };
};

/**
 * Calculates the recommended system components (Inverter, Solar Array, Battery).
 * @param {number} totalPower - Total power in Watts
 * @param {number} totalEnergy - Total daily energy in Watt-hours
 * @returns {Object} System requirements recommendations
 */
export const calculateSystemRequirements = (totalPower, totalEnergy) => {
  const {
    INVERTER_EFFICIENCY,
    SAFETY_MARGIN,
    PEAK_SUN_HOURS,
    BATTERY_DEPTH_OF_DISCHARGE,
    SYSTEM_VOLTAGE,
    PANEL_WATTAGE,
  } = SYSTEM_CONSTANTS;

  // 1. Inverter Sizing
  // The inverter should be able to handle the total power of all appliances running simultaneously
  // Plus a safety margin (e.g., 25%) to handle starting surges
  const requiredInverterVA = (totalPower / INVERTER_EFFICIENCY) * SAFETY_MARGIN;
  const recommendedInverterKVA = Math.ceil(requiredInverterVA / 1000); // Round up to nearest kVA

  // 2. Solar Array Sizing
  // The solar panels need to generate enough energy for the daily load, factoring in system losses.
  // We assume a generic system loss factor of ~1.3 (30% loss in wiring, temp, dust, etc.)
  const requiredDailyEnergyWh = totalEnergy * 1.3;
  const requiredSolarArrayPowerW = requiredDailyEnergyWh / PEAK_SUN_HOURS;
  const recommendedSolarArrayKW = (requiredSolarArrayPowerW / 1000).toFixed(2);

  // Calculate number of panels
  const numberOfPanels = Math.ceil(requiredSolarArrayPowerW / PANEL_WATTAGE);

  // 3. Battery Sizing
  // Assuming 1 day of autonomy (backup) for the daily energy consumption.
  // Energy required = Total Daily Energy / (Inverter Efficiency * Depth of Discharge)
  const requiredBatteryCapacityWh = totalEnergy / (INVERTER_EFFICIENCY * BATTERY_DEPTH_OF_DISCHARGE);

  // Convert to Amp-hours at system voltage
  const requiredBatteryAh = requiredBatteryCapacityWh / SYSTEM_VOLTAGE;

  // Convert to standard battery blocks (e.g., assuming 48V 100Ah standard Lithium modules which is ~4.8kWh)
  const standardBatteryModuleKWh = 4.8;
  const numberOfBatteries = Math.ceil((requiredBatteryCapacityWh / 1000) / standardBatteryModuleKWh);
  const totalBatteryKWh = (requiredBatteryCapacityWh / 1000).toFixed(2);

  return {
    inverter: {
      powerKVA: recommendedInverterKVA,
      description: `${recommendedInverterKVA} kVA`,
    },
    panels: {
      totalKW: recommendedSolarArrayKW,
      count: numberOfPanels,
      description: `${numberOfPanels} × ${PANEL_WATTAGE}W panels (${recommendedSolarArrayKW} kW)`,
    },
    battery: {
      capacityAh: Math.ceil(requiredBatteryAh),
      capacityKWh: totalBatteryKWh,
      count: numberOfBatteries,
      voltage: SYSTEM_VOLTAGE,
      description: `${numberOfBatteries} × (48V 100Ah) modules [~${totalBatteryKWh} kWh]`,
    },
  };
};
