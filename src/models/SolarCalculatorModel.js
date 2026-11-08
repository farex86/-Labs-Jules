export const facilityTypes = [
  { id: 'ice_factory', label: 'مصنع ثلج' },
  { id: 'company', label: 'شركة' },
  { id: 'farm', label: 'مزرعة' },
  { id: 'poultry_farm', label: 'مزرعة دواجن' },
  { id: 'greenhouses', label: 'بيوت محمية' },
  { id: 'factory', label: 'مصنع' },
  { id: 'clinic', label: 'مستوصف' },
  { id: 'hospital', label: 'مستشفى' },
  { id: 'bakery', label: 'مخبز' },
  { id: 'shop', label: 'دكان' },
  { id: 'workshop', label: 'ورشة' },
  { id: 'water_pump', label: 'مضخة مياه' },
  { id: 'donkey', label: 'دونكي' },
  { id: 'mosque', label: 'مسجد' },
  { id: 'printing_press', label: 'مطبعة' },
  { id: 'coffee_shop', label: 'كوفي شوب' },
  { id: 'restaurant', label: 'مطعم' },
  { id: 'hotel', label: 'فندق' },
  { id: 'bank', label: 'بنك' },
  { id: 'supermarket', label: 'سوبر ماركت' },
  { id: 'gas_station', label: 'طرمبة وقود' },
  { id: 'mining_company', label: 'شركة تعدين' }
];

export const calculateSolarRequirements = (consumptionKw) => {
  // Constants for calculation (example values, replace with actual business logic)
  const systemLosses = 1.25; // 25% losses
  const dailySunHours = 5; // average peak sun hours
  const panelCapacityW = 500; // typical 500W panel
  const batteryCapacityWh = 2400; // 12V * 200Ah
  const depthOfDischarge = 0.5; // 50% DoD for batteries
  const inverterEfficiency = 0.95; // 95% efficiency

  // Adjusted for a more typical "monthly" or "daily" input
  // Let's assume consumptionKw is daily consumption in kWh
  const totalDailyEnergyWh = (consumptionKw * 1000) * systemLosses;

  // Solar Panels Required
  const totalSolarArrayW = totalDailyEnergyWh / dailySunHours;
  const numberOfPanels = Math.ceil(totalSolarArrayW / panelCapacityW);

  // Battery Bank Required (assuming 1 day of autonomy)
  const requiredBatteryCapacityWh = totalDailyEnergyWh / depthOfDischarge;
  const numberOfBatteries = Math.ceil(requiredBatteryCapacityWh / batteryCapacityWh);

  // Inverter Size
  const inverterSizeKw = Math.ceil((consumptionKw / inverterEfficiency) * 1.2); // 20% safety margin

  // Estimated Cost (arbitrary example values)
  const panelCost = numberOfPanels * 150; // $150 per panel
  const batteryCost = numberOfBatteries * 300; // $300 per battery
  const inverterCost = inverterSizeKw * 200; // $200 per kW
  const totalCost = panelCost + batteryCost + inverterCost + 1000; // adding $1000 for installation/misc

  return {
    numberOfPanels,
    totalSolarArrayKw: (totalSolarArrayW / 1000).toFixed(2),
    numberOfBatteries,
    inverterSizeKw,
    estimatedCostUsd: totalCost,
    totalDailyEnergyKwh: (totalDailyEnergyWh / 1000).toFixed(2)
  };
};
