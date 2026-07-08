/**
 * Calculates the total daily energy consumption and recommended solar system size.
 *
 * @param {Array} appliances - Array of objects containing { appliance (from APPLIANCES list), quantity, hoursPerDay }
 * @returns {Object} Calculated system specifications
 */
export const calculateSystemSize = (appliances) => {
  // 1. Calculate Total Daily Consumption (Wh) and Total Power (W)
  let totalDailyConsumptionWh = 0;
  let totalPowerW = 0;
  let maxSurgePowerW = 0; // For inverter sizing (startup surge for motors/compressors)

  appliances.forEach((item) => {
    if (item.appliance && item.quantity > 0 && item.hoursPerDay > 0) {
      const itemPowerW = item.appliance.powerWatt * item.quantity;
      totalPowerW += itemPowerW;
      totalDailyConsumptionWh += itemPowerW * item.hoursPerDay;

      // Rough estimate for surge power (motors/compressors have higher startup current)
      // We assume ACs, fridges, pumps have a ~3x surge
      const hasMotor = item.appliance.id.includes('ac') || item.appliance.id.includes('fridge') || item.appliance.id.includes('pump');
      const itemSurgeW = hasMotor ? itemPowerW * 3 : itemPowerW;

      if (itemSurgeW > maxSurgePowerW) {
        maxSurgePowerW = itemSurgeW; // The inverter must at least handle the largest single surge
      }
    }
  });

  if (totalDailyConsumptionWh === 0) {
    return {
      dailyConsumptionKWh: 0,
      panelsCapacityKw: 0,
      inverterSizeKw: 0,
      batteryCapacityKwh: 0,
      numberOfPanels: 0,
      numberOfBatteries: 0
    };
  }

  // 2. Solar Panel Capacity (kW)
  // Assume ~5 hours of effective peak sun hours (typical for many sunny regions like Sudan)
  // System losses (dust, heat, wiring, inverter efficiency) ~30% -> Divide by 0.7
  const PEAK_SUN_HOURS = 5;
  const SYSTEM_EFFICIENCY = 0.7;

  const requiredSolarArrayWh = totalDailyConsumptionWh / SYSTEM_EFFICIENCY;
  const panelsCapacityW = requiredSolarArrayWh / PEAK_SUN_HOURS;
  const panelsCapacityKw = (panelsCapacityW / 1000).toFixed(2);

  // Calculate rough number of panels (assuming 550W panels)
  const PANEL_WATTAGE = 550;
  const numberOfPanels = Math.ceil(panelsCapacityW / PANEL_WATTAGE);

  // 3. Inverter Size (kW)
  // Inverter should handle total continuous power + some margin (e.g., 25% margin)
  // It should also handle the maximum surge
  const inverterContinuousW = totalPowerW * 1.25;
  const requiredInverterW = Math.max(inverterContinuousW, maxSurgePowerW);
  const inverterSizeKw = (requiredInverterW / 1000).toFixed(2);

  // 4. Battery Capacity (kWh)
  // Assume 1 day of autonomy (backup for nighttime/cloudy day)
  // Depth of Discharge (DoD) for Lithium-ion batteries is typically 80% (0.8)
  // For Lead-Acid / Gel it would be 50% (0.5), we'll assume Lithium for modern setups
  const DOD = 0.8;
  const batteryEfficiency = 0.95; // Inverter/Battery loss
  const requiredBatteryCapacityWh = totalDailyConsumptionWh / (DOD * batteryEfficiency);
  const batteryCapacityKwh = (requiredBatteryCapacityWh / 1000).toFixed(2);

  // Calculate rough number of batteries (assuming 48V 100Ah standard Lithium battery = 4.8kWh)
  const BATTERY_SIZE_KWH = 4.8;
  const numberOfBatteries = Math.ceil((requiredBatteryCapacityWh / 1000) / BATTERY_SIZE_KWH);

  return {
    dailyConsumptionKWh: (totalDailyConsumptionWh / 1000).toFixed(2),
    totalPowerKw: (totalPowerW / 1000).toFixed(2),
    panelsCapacityKw,
    inverterSizeKw,
    batteryCapacityKwh,
    numberOfPanels,
    numberOfBatteries,
    assumedPanelWattage: PANEL_WATTAGE,
    assumedBatterySizeKwh: BATTERY_SIZE_KWH
  };
};
