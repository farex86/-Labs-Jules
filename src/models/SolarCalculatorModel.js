export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع تلج' },
  { id: 'company', name: 'شركة' },
  { id: 'farm', name: 'مزرعة' },
  { id: 'poultry_farm', name: 'مزرعة دواجن' },
  { id: 'greenhouse', name: 'بيوت محمية' },
  { id: 'factory', name: 'مصنع' },
  { id: 'clinic', name: 'مستوصف' },
  { id: 'hospital', name: 'مستشفي' },
  { id: 'bakery', name: 'مخبز' },
  { id: 'shop', name: 'دكان' },
  { id: 'workshop', name: 'ورشة' },
  { id: 'water_pump', name: 'مضخة موية' },
  { id: 'donkey', name: 'دونكي' },
  { id: 'mosque', name: 'مسجد' },
  { id: 'printing_press', name: 'مطبعة' },
  { id: 'coffee_shop', name: 'كوفي شوب' },
  { id: 'restaurant', name: 'مطعم' },
  { id: 'hotel', name: 'فندق' },
  { id: 'bank', name: 'بنك' },
  { id: 'supermarket', name: 'سوبر ماركت' },
  { id: 'gas_station', name: 'طرمبة وقود' },
  { id: 'mining_company', name: 'شركة تعدين' }
];

export const calculateSolarRequirements = (appliances) => {
  // appliances: [{ name, quantity, powerWatts, hoursPerDay }]
  let totalDailyEnergyWh = 0;
  let maxPowerW = 0;

  appliances.forEach(app => {
    const totalPower = (app.quantity || 1) * (app.powerWatts || 0);
    totalDailyEnergyWh += totalPower * (app.hoursPerDay || 0);
    maxPowerW += totalPower;
  });

  // Basic solar calculation logic
  // Assume 5 peak sun hours per day
  const peakSunHours = 5;
  // System efficiency ~ 80%
  const systemEfficiency = 0.8;

  const requiredSolarPanelCapacityW = totalDailyEnergyWh / (peakSunHours * systemEfficiency);
  const requiredInverterCapacityW = maxPowerW * 1.2; // 20% buffer

  return {
    totalDailyEnergyWh,
    maxPowerW,
    requiredSolarPanelCapacityW,
    requiredInverterCapacityW
  };
};
