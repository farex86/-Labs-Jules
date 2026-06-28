export function calculateSolarSystem(appliances, constants) {
  if (!appliances || appliances.length === 0) {
    return {
      totalDailyEnergyWh: 0,
      totalPowerW: 0,
      solarArrayCapacityW: 0,
      numberOfPanels: 0,
      inverterSizeW: 0,
      batteryCapacityAh: 0
    };
  }

  // 1. Calculate Total Daily Energy (Wh) and Total Peak Power (W)
  let totalDailyEnergyWh = 0;
  let totalPowerW = 0;

  appliances.forEach(app => {
    const power = Number(app.power_w) || 0;
    const quantity = Number(app.quantity) || 0;
    const hours = Number(app.hours) || 0;

    totalPowerW += power * quantity;
    totalDailyEnergyWh += power * quantity * hours;
  });

  // 2. Calculate Required Solar Array Capacity (W)
  // Total Energy / Peak Sun Hours * System Loss Factor
  const solarArrayCapacityW = (totalDailyEnergyWh / constants.PEAK_SUN_HOURS) * constants.SYSTEM_LOSS_FACTOR;

  // 3. Calculate Number of Panels
  const numberOfPanels = Math.ceil(solarArrayCapacityW / constants.PANEL_WATTAGE);

  // 4. Calculate Inverter Size (W)
  // Total Peak Power * Safety Margin / Inverter Efficiency
  const inverterSizeW = (totalPowerW * constants.INVERTER_SAFETY_MARGIN) / constants.INVERTER_EFFICIENCY;

  // 5. Calculate Battery Capacity (Ah)
  // (Total Daily Energy * Days of Autonomy) / (Battery Voltage * Depth of Discharge)
  const batteryCapacityAh = (totalDailyEnergyWh * constants.DAYS_OF_AUTONOMY) /
                            (constants.BATTERY_VOLTAGE * constants.BATTERY_DEPTH_OF_DISCHARGE);

  return {
    totalDailyEnergyWh: Math.round(totalDailyEnergyWh),
    totalPowerW: Math.round(totalPowerW),
    solarArrayCapacityW: Math.round(solarArrayCapacityW),
    numberOfPanels: numberOfPanels,
    inverterSizeW: Math.round(inverterSizeW),
    batteryCapacityAh: Math.round(batteryCapacityAh)
  };
}
