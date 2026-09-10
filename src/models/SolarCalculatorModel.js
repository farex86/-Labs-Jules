export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع ثلج' },
  { id: 'company', name: 'شركة' },
  { id: 'farm', name: 'مزرعة' },
  { id: 'poultry_farm', name: 'مزرعة دواجن' },
  { id: 'greenhouse', name: 'بيوت محمية' },
  { id: 'factory', name: 'مصنع' },
  { id: 'clinic', name: 'مستوصف' },
  { id: 'hospital', name: 'مستشفى' },
  { id: 'bakery', name: 'مخبز' },
  { id: 'shop', name: 'دكان' },
  { id: 'workshop', name: 'ورشة' },
  { id: 'water_pump', name: 'مضخة مياه' },
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
  let totalDailyEnergyWH = 0;
  let maxPowerW = 0;

  appliances.forEach(app => {
    const power = Number(app.power) || 0;
    const hours = Number(app.hours) || 0;
    const quantity = Number(app.quantity) || 1;

    const totalAppliancePower = power * quantity;
    maxPowerW += totalAppliancePower;
    totalDailyEnergyWH += totalAppliancePower * hours;
  });

  // Basic solar sizing logic placeholders based on typical rough estimates:
  // Sun hours per day (roughly 5 hours for calculation)
  const sunHours = 5;
  // System losses (approx 30% loss)
  const systemEfficiency = 0.7;

  // Panel capacity needed (in Watts)
  const panelCapacityW = Math.ceil(totalDailyEnergyWH / (sunHours * systemEfficiency));

  // Inverter size needed (in Watts, approx 20-25% overhead on max load)
  const inverterSizeW = Math.ceil(maxPowerW * 1.25);

  // Battery capacity (assuming 50% Depth of Discharge, 1 day of autonomy, 12V system)
  const systemVoltage = 12;
  const batteryCapacityAH = Math.ceil((totalDailyEnergyWH / systemVoltage) * 2);

  return {
    totalDailyEnergyWH,
    maxPowerW,
    panelCapacityW,
    inverterSizeW,
    batteryCapacityAH
  };
};
