import { SOLAR_CONSTANTS } from '../lib/solarConstants';

class SolarCalculatorModel {
  /**
   * Calculates total daily energy consumption in Watt-hours (Wh).
   * @param {Array} devices Array of device objects { powerW, hours, quantity }
   * @returns {number} Total daily Wh
   */
  static calculateTotalDailyEnergy(devices) {
    return devices.reduce((total, device) => {
      return total + (device.powerW * device.hours * device.quantity);
    }, 0);
  }

  /**
   * Calculates total peak power required in Watts (W).
   * @param {Array} devices Array of device objects { powerW, quantity }
   * @returns {number} Total peak W
   */
  static calculateTotalPeakPower(devices) {
    return devices.reduce((total, device) => {
      return total + (device.powerW * device.quantity);
    }, 0);
  }

  /**
   * Generates a solar system recommendation based on devices.
   * @param {Array} devices Array of device objects { powerW, hours, quantity }
   * @returns {Object} System recommendation details
   */
  static generateRecommendation(devices) {
    const totalDailyWh = this.calculateTotalDailyEnergy(devices);
    const peakPowerW = this.calculateTotalPeakPower(devices);

    if (totalDailyWh === 0) {
      return {
        dailyEnergyKwh: 0,
        inverterSizeKw: 0,
        panelsRequired: 0,
        batteryBankKwh: 0,
        estimatedCost: 0
      };
    }

    // 1. Calculate Required Energy Production (accounting for efficiency)
    const requiredDailyWh = totalDailyWh / SOLAR_CONSTANTS.SYSTEM_EFFICIENCY;

    // 2. Calculate Panel Requirements
    const requiredSolarArrayW = requiredDailyWh / SOLAR_CONSTANTS.PEAK_SUN_HOURS;
    const panelsRequired = Math.ceil(requiredSolarArrayW / SOLAR_CONSTANTS.AVERAGE_PANEL_WATTAGE);

    // 3. Calculate Inverter Size (accounting for surge margin)
    // Needs to handle total peak power + margin
    const inverterSizeW = peakPowerW * SOLAR_CONSTANTS.INVERTER_SURGE_MARGIN;
    const inverterSizeKw = Math.ceil(inverterSizeW / 1000); // Round up to nearest kW

    // 4. Calculate Battery Requirements (Assuming 1 day of autonomy for now)
    // Battery Bank Wh = Total Daily Wh / DoD
    const requiredBatteryBankWh = totalDailyWh / SOLAR_CONSTANTS.BATTERY_DOD;
    const batteryBankKwh = Math.ceil(requiredBatteryBankWh / 1000);

    // Rough estimation function (these are highly variable market prices)
    // Panels: $0.3/W, Inverter: $150/kW, Batteries: $200/kWh, + Install cost
    const panelCost = panelsRequired * SOLAR_CONSTANTS.AVERAGE_PANEL_WATTAGE * 0.3;
    const inverterCost = inverterSizeKw * 150;
    const batteryCost = batteryBankKwh * 200;
    const estimatedCostUsd = panelCost + inverterCost + batteryCost + (panelCost * 0.2); // 20% install buffer

    return {
      dailyEnergyKwh: (totalDailyWh / 1000).toFixed(2),
      inverterSizeKw: inverterSizeKw,
      panelsRequired: panelsRequired,
      batteryBankKwh: batteryBankKwh,
      estimatedCostUsd: Math.round(estimatedCostUsd)
    };
  }
}

export default SolarCalculatorModel;
