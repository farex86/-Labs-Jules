export const facilityTypes = [
  { id: 'ice_factory', label: 'مصنع تلج', defaultAppliances: [] },
  { id: 'company', label: 'شركة', defaultAppliances: [] },
  { id: 'farm', label: 'مزرعة', defaultAppliances: [] },
  { id: 'poultry_farm', label: 'مزرعة دواجن', defaultAppliances: [] },
  { id: 'greenhouses', label: 'بيوت محمية', defaultAppliances: [] },
  { id: 'factory', label: 'مصنع', defaultAppliances: [] },
  { id: 'clinic', label: 'مستوصف', defaultAppliances: [] },
  { id: 'hospital', label: 'مستشفي', defaultAppliances: [] },
  { id: 'bakery', label: 'مخبز', defaultAppliances: [] },
  { id: 'shop', label: 'دكان', defaultAppliances: [] },
  { id: 'workshop', label: 'ورشة', defaultAppliances: [] },
  { id: 'water_pump', label: 'مضخة موية', defaultAppliances: [] },
  { id: 'donkey', label: 'دونكي', defaultAppliances: [] },
  { id: 'mosque', label: 'مسجد', defaultAppliances: [] },
  { id: 'printing_press', label: 'مطبعة', defaultAppliances: [] },
  { id: 'coffee_shop', label: 'كوفي شوب', defaultAppliances: [] },
  { id: 'restaurant', label: 'مطعم', defaultAppliances: [] },
  { id: 'hotel', label: 'فندق', defaultAppliances: [] },
  { id: 'bank', label: 'بنك', defaultAppliances: [] },
  { id: 'supermarket', label: 'سوبر ماركت', defaultAppliances: [] },
  { id: 'gas_station', label: 'طرمبة وقود', defaultAppliances: [] },
  { id: 'mining_company', label: 'شركة تعدين', defaultAppliances: [] }
];

export const calculateTotalPower = (appliances) => {
  return appliances.reduce((total, app) => total + (app.qty * app.watts), 0);
};

export const calculateDailyConsumption = (appliances) => {
  return appliances.reduce((total, app) => total + (app.qty * app.watts * app.hours), 0);
};

// Simple estimation logic.  More complex logic could consider location, panel efficiency, battery depth of discharge, etc.
// This is a basic example assuming a standard solar hour day (e.g., 5 hours) and some system losses (e.g., 20%).
export const estimateSystemSize = (dailyConsumptionWh, peakSunHours = 5, systemEfficiency = 0.8) => {
  if (dailyConsumptionWh === 0) return { panelsKw: 0, batteryKwh: 0, inverterKw: 0 };

  // Calculate required solar array size in kW
  const requiredDailyGenerationWh = dailyConsumptionWh / systemEfficiency;
  const panelsKw = (requiredDailyGenerationWh / peakSunHours) / 1000;

  // Calculate required battery capacity for 1 day of autonomy (assuming 50% depth of discharge for lead acid or similar logic)
  const daysOfAutonomy = 1;
  const depthOfDischarge = 0.5;
  const batteryKwh = (dailyConsumptionWh * daysOfAutonomy) / depthOfDischarge / 1000;

  // Inverter size: Total peak power + 20% margin for surges
  // Let's assume the max power drawn at any one time could be the sum of all appliances (worst case).
  // This needs to be passed in, or we estimate based on daily consumption.  Let's add a parameter for peak power.

  return {
    panelsKw: Number(panelsKw.toFixed(2)),
    batteryKwh: Number(batteryKwh.toFixed(2))
  };
};

export const calculateSystemRequirements = (appliances, peakSunHours = 5, systemEfficiency = 0.8) => {
    const totalPowerW = calculateTotalPower(appliances);
    const dailyConsumptionWh = calculateDailyConsumption(appliances);

    if (dailyConsumptionWh === 0) return { panelsKw: 0, batteryKwh: 0, inverterKw: 0, totalPowerW, dailyConsumptionWh };

    const requiredDailyGenerationWh = dailyConsumptionWh / systemEfficiency;
    const panelsKw = (requiredDailyGenerationWh / peakSunHours) / 1000;

    const daysOfAutonomy = 1;
    const depthOfDischarge = 0.5; // Example for lead-acid. Lithium would be higher (e.g., 0.8)
    const batteryKwh = (dailyConsumptionWh * daysOfAutonomy) / (depthOfDischarge * 1000);

    const inverterKw = (totalPowerW * 1.25) / 1000; // 25% safety margin

    return {
        totalPowerW,
        dailyConsumptionWh,
        panelsKw: Number(panelsKw.toFixed(2)),
        batteryKwh: Number(batteryKwh.toFixed(2)),
        inverterKw: Number(inverterKw.toFixed(2))
    };
}
