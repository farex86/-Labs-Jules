export const FACILITY_TYPES = [
  'مصنع ثلج',
  'شركة',
  'مزرعة',
  'مزرعة دواجن',
  'بيوت محمية',
  'مصنع',
  'مستوصف',
  'مستشفى',
  'مخبز',
  'دكان',
  'ورشة',
  'مضخة مياه',
  'دونكي',
  'مسجد',
  'مطبعة',
  'مقهى (كوفي شوب)',
  'مطعم',
  'فندق',
  'بنك',
  'سوبر ماركت',
  'محطة وقود',
  'شركة تعدين'
];

/**
 * Calculates solar system requirements based on appliances
 * @param {Array} appliances - Array of appliance objects { power, hours, quantity }
 * @returns {Object} Calculation results
 */
export const calculateSolarRequirements = (appliances) => {
  if (!appliances || appliances.length === 0) {
    return {
      dailyConsumptionWh: 0,
      peakPowerW: 0,
      panelCapacityW: 0,
      inverterCapacityW: 0,
      batteryCapacityWh: 0
    };
  }

  let totalDailyConsumptionWh = 0;
  let totalPeakPowerW = 0;

  appliances.forEach(appliance => {
    const power = Number(appliance.power) || 0;
    const hours = Number(appliance.hours) || 0;
    const quantity = Number(appliance.quantity) || 0;

    const appliancePeakPower = power * quantity;
    const applianceDailyConsumption = appliancePeakPower * hours;

    totalPeakPowerW += appliancePeakPower;
    totalDailyConsumptionWh += applianceDailyConsumption;
  });

  // Basic solar calculation formulas (can be adjusted based on real-world factors)
  // Panel Capacity (W): Needs to cover daily consumption over effective sun hours (e.g., ~5 hours) + 20% system losses
  const effectiveSunHours = 5;
  const panelLossFactor = 1.2;
  const panelCapacityW = Math.ceil((totalDailyConsumptionWh / effectiveSunHours) * panelLossFactor);

  // Inverter Capacity (W): Needs to handle peak power + 25% safety margin
  const inverterSafetyMargin = 1.25;
  const inverterCapacityW = Math.ceil(totalPeakPowerW * inverterSafetyMargin);

  // Battery Capacity (Wh): Needs to store daily consumption for days without sun (e.g., 1 day autonomy) + 50% max depth of discharge
  const daysOfAutonomy = 1;
  const depthOfDischarge = 0.5;
  const batteryCapacityWh = Math.ceil((totalDailyConsumptionWh * daysOfAutonomy) / depthOfDischarge);

  return {
    dailyConsumptionWh: totalDailyConsumptionWh,
    peakPowerW: totalPeakPowerW,
    panelCapacityW,
    inverterCapacityW,
    batteryCapacityWh
  };
};
