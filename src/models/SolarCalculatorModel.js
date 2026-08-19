export const facilityTypes = [
  { id: 'ice_factory', name: 'مصنع ثلج', defaultConsumption: 5000 },
  { id: 'company', name: 'شركة', defaultConsumption: 2000 },
  { id: 'farm', name: 'مزرعة', defaultConsumption: 1500 },
  { id: 'poultry_farm', name: 'مزرعة دواجن', defaultConsumption: 3000 },
  { id: 'greenhouse', name: 'بيوت محمية', defaultConsumption: 800 },
  { id: 'factory', name: 'مصنع', defaultConsumption: 10000 },
  { id: 'clinic', name: 'مستوصف', defaultConsumption: 2500 },
  { id: 'hospital', name: 'مستشفى', defaultConsumption: 8000 },
  { id: 'bakery', name: 'مخبز', defaultConsumption: 4000 },
  { id: 'shop', name: 'دكان', defaultConsumption: 500 },
  { id: 'workshop', name: 'ورشة', defaultConsumption: 1200 },
  { id: 'water_pump', name: 'مضخة مياه', defaultConsumption: 1000 },
  { id: 'donkey', name: 'دونكي', defaultConsumption: 200 },
  { id: 'mosque', name: 'مسجد', defaultConsumption: 600 },
  { id: 'printing_press', name: 'مطبعة', defaultConsumption: 3500 },
  { id: 'coffee_shop', name: 'كوفي شوب', defaultConsumption: 1800 },
  { id: 'restaurant', name: 'مطعم', defaultConsumption: 4500 },
  { id: 'hotel', name: 'فندق', defaultConsumption: 7000 },
  { id: 'bank', name: 'بنك', defaultConsumption: 2500 },
  { id: 'supermarket', name: 'سوبر ماركت', defaultConsumption: 3500 },
  { id: 'gas_station', name: 'محطة وقود (طرمبة وقود)', defaultConsumption: 1500 },
  { id: 'mining_company', name: 'شركة تعدين', defaultConsumption: 15000 },
  { id: 'other', name: 'أخرى', defaultConsumption: 0 },
];

export const calculateSolarSystem = (monthlyConsumptionKWh) => {
  if (!monthlyConsumptionKWh || isNaN(monthlyConsumptionKWh) || monthlyConsumptionKWh <= 0) {
    return null;
  }

  // 1. Daily Consumption in kWh
  const dailyConsumption = monthlyConsumptionKWh / 30;

  // 2. Solar System Capacity (kW) - Assuming 5 peak sun hours per day and 80% efficiency
  const systemCapacityKW = (dailyConsumption / 5) / 0.8;

  // 3. Number of Panels - Assuming 500W (0.5kW) panels
  const panelWattageKW = 0.5;
  const numberOfPanels = Math.ceil(systemCapacityKW / panelWattageKW);

  // 4. Inverter Size - Usually 120-125% of the total solar array capacity for safety
  const inverterCapacityKW = systemCapacityKW * 1.25;

  // 5. Battery Capacity (kWh) - Assuming 1 day of autonomy, 50% Depth of Discharge for Lead-Acid, or 80% for Lithium
  // Let's use a general 60% usable capacity for estimation
  const batteryCapacityKWh = dailyConsumption / 0.6;

  return {
    dailyConsumption: parseFloat(dailyConsumption.toFixed(2)),
    systemCapacityKW: parseFloat(systemCapacityKW.toFixed(2)),
    numberOfPanels,
    inverterCapacityKW: parseFloat(inverterCapacityKW.toFixed(2)),
    batteryCapacityKWh: parseFloat(batteryCapacityKWh.toFixed(2)),
    estimatedCostRange: {
      min: Math.round(systemCapacityKW * 800), // Very rough estimate: $800 - $1200 per kW installed
      max: Math.round(systemCapacityKW * 1200)
    }
  };
};
