export const calculateSolarSystem = (appliances, dailySunlightHours = 5) => {
  // 1. Calculate total daily energy consumption (Wh)
  let totalDailyEnergyWh = 0;
  appliances.forEach(app => {
    totalDailyEnergyWh += (app.wattage * app.quantity * app.hoursPerDay);
  });

  // 2. Add system losses (system inefficiency, e.g., 20% loss -> divide by 0.8)
  const systemLossFactor = 0.8;
  const energyNeededWh = totalDailyEnergyWh / systemLossFactor;

  // 3. Calculate total solar panel capacity needed (W)
  const totalPanelCapacityW = energyNeededWh / dailySunlightHours;

  // 4. Calculate Battery Capacity (Ah)
  // Assuming 24V system for simplicity, and 50% Depth of Discharge (DoD) for lead-acid, or 80% for Lithium. Let's use 50% as safe generic.
  const systemVoltage = 24;
  const depthOfDischarge = 0.5;
  const daysOfAutonomy = 1; // Number of days the system can run without sun

  const batteryCapacityAh = (totalDailyEnergyWh * daysOfAutonomy) / (systemVoltage * depthOfDischarge);

  // 5. Inverter Size (W)
  // Sum of maximum simultaneous wattage + 25% safety margin
  let peakWattage = 0;
  appliances.forEach(app => {
    peakWattage += (app.wattage * app.quantity);
  });
  const inverterSizeW = peakWattage * 1.25;

  return {
    totalDailyEnergyWh: Math.round(totalDailyEnergyWh),
    energyNeededWh: Math.round(energyNeededWh),
    totalPanelCapacityW: Math.round(totalPanelCapacityW),
    batteryCapacityAh: Math.round(batteryCapacityAh),
    inverterSizeW: Math.round(inverterSizeW),
    systemVoltage
  };
};
