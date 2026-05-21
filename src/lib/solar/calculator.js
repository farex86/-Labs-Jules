import { SYSTEM_CONSTANTS } from './constants';

/**
 * Calculates the required solar system specifications based on a list of devices.
 * @param {Array<{power: number, quantity: number, hours: number}>} devices
 * @returns {Object} System calculations
 */
export const calculateSolarSystem = (devices) => {
  if (!devices || devices.length === 0) {
    return {
      totalPowerW: 0,
      totalEnergyWh: 0,
      inverterCapacityW: 0,
      batteryCapacityAh: 0,
      numberOfPanels: 0,
      totalPanelCapacityW: 0,
      assumptions: {
        voltage: SYSTEM_CONSTANTS.SYSTEM_VOLTAGE,
        panelWattage: SYSTEM_CONSTANTS.PANEL_WATTAGE,
        sunHours: SYSTEM_CONSTANTS.SUN_HOURS_PER_DAY
      }
    };
  }

  // 1. Calculate Total Power (Watts)
  // This dictates the minimum inverter size.
  const totalPowerW = devices.reduce((total, device) => {
    const power = Number(device.power) || 0;
    const qty = Number(device.quantity) || 0;
    return total + (power * qty);
  }, 0);

  // 2. Calculate Total Daily Energy Consumption (Watt-hours)
  const totalEnergyWh = devices.reduce((total, device) => {
    const power = Number(device.power) || 0;
    const qty = Number(device.quantity) || 0;
    const hours = Number(device.hours) || 0;
    return total + (power * qty * hours);
  }, 0);

  // 3. Inverter Sizing (Watts)
  // Total power + 25% safety margin
  const inverterCapacityW = Math.ceil(totalPowerW * 1.25);

  // 4. Battery Sizing (Amp-hours)
  // Energy needed from batteries considering efficiency, DOD, and system voltage
  const requiredBatteryCapacityWh = totalEnergyWh / (SYSTEM_CONSTANTS.BATTERY_EFFICIENCY * SYSTEM_CONSTANTS.BATTERY_DOD);
  const batteryCapacityAh = Math.ceil(requiredBatteryCapacityWh / SYSTEM_CONSTANTS.SYSTEM_VOLTAGE);

  // 5. Solar Panel Array Sizing
  // Energy to generate per day considering inverter efficiency
  const requiredEnergyFromPanelsWh = totalEnergyWh / SYSTEM_CONSTANTS.INVERTER_EFFICIENCY;

  // Total panel capacity needed (Watts)
  const totalPanelCapacityW = Math.ceil(requiredEnergyFromPanelsWh / SYSTEM_CONSTANTS.SUN_HOURS_PER_DAY);

  // Number of panels
  const numberOfPanels = Math.ceil(totalPanelCapacityW / SYSTEM_CONSTANTS.PANEL_WATTAGE);

  return {
    totalPowerW,
    totalEnergyWh,
    inverterCapacityW,
    batteryCapacityAh,
    numberOfPanels,
    totalPanelCapacityW,
    assumptions: {
      voltage: SYSTEM_CONSTANTS.SYSTEM_VOLTAGE,
      panelWattage: SYSTEM_CONSTANTS.PANEL_WATTAGE,
      sunHours: SYSTEM_CONSTANTS.SUN_HOURS_PER_DAY
    }
  };
};
