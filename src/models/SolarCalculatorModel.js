export const FACILITY_TYPES = [
  { id: 'ice_factory', label: 'مصنع ثلج' },
  { id: 'company', label: 'شركة' },
  { id: 'farm', label: 'مزرعة' },
  { id: 'poultry_farm', label: 'مزرعة دواجن' },
  { id: 'greenhouse', label: 'بيوت محمية' },
  { id: 'factory', label: 'مصنع' },
  { id: 'clinic', label: 'مستوصف' },
  { id: 'hospital', label: 'مستشفى' },
  { id: 'bakery', label: 'مخبز' },
  { id: 'shop', label: 'دكان' },
  { id: 'workshop', label: 'ورشة' },
  { id: 'water_pump', label: 'مضخة مياه' },
  { id: 'donkey', label: 'دونكي (بئر مياه)' },
  { id: 'mosque', label: 'مسجد' },
  { id: 'printing_press', label: 'مطبعة' },
  { id: 'coffee_shop', label: 'كوفي شوب' },
  { id: 'restaurant', label: 'مطعم' },
  { id: 'hotel', label: 'فندق' },
  { id: 'bank', label: 'بنك' },
  { id: 'supermarket', label: 'سوبر ماركت' },
  { id: 'gas_station', label: 'طرمبة وقود' },
  { id: 'mining_company', label: 'شركة تعدين' },
  { id: 'custom', label: 'مخصص' }
];

export const DEFAULT_APPLIANCES = {
  mosque: [
    { id: 'm1', name: 'مكيفات', quantity: 4, watts: 1500, hours: 6 },
    { id: 'm2', name: 'إضاءة', quantity: 20, watts: 20, hours: 8 },
    { id: 'm3', name: 'مراوح', quantity: 10, watts: 80, hours: 6 },
    { id: 'm4', name: 'مكبر صوت', quantity: 1, watts: 200, hours: 2 },
  ],
  company: [
    { id: 'c1', name: 'أجهزة كمبيوتر', quantity: 10, watts: 250, hours: 8 },
    { id: 'c2', name: 'إضاءة', quantity: 15, watts: 20, hours: 10 },
    { id: 'c3', name: 'مكيفات', quantity: 3, watts: 1500, hours: 8 },
    { id: 'c4', name: 'طابعة', quantity: 2, watts: 500, hours: 2 },
  ],
  shop: [
    { id: 's1', name: 'ثلاجة عرض', quantity: 2, watts: 800, hours: 24 },
    { id: 's2', name: 'إضاءة', quantity: 5, watts: 20, hours: 12 },
    { id: 's3', name: 'مروحة', quantity: 2, watts: 80, hours: 12 },
  ],
  clinic: [
    { id: 'cl1', name: 'مكيفات', quantity: 4, watts: 1500, hours: 12 },
    { id: 'cl2', name: 'إضاءة', quantity: 20, watts: 20, hours: 12 },
    { id: 'cl3', name: 'أجهزة طبية صغيرة', quantity: 5, watts: 300, hours: 6 },
    { id: 'cl4', name: 'ثلاجة أدوية', quantity: 1, watts: 200, hours: 24 },
  ],
  restaurant: [
    { id: 'r1', name: 'ثلاجات كبيرة', quantity: 3, watts: 1000, hours: 24 },
    { id: 'r2', name: 'إضاءة', quantity: 20, watts: 20, hours: 12 },
    { id: 'r3', name: 'مكيفات', quantity: 5, watts: 2000, hours: 12 },
    { id: 'r4', name: 'مراوح شفط', quantity: 2, watts: 300, hours: 8 },
  ],
  farm: [
    { id: 'f1', name: 'مضخة مياه صغيرة', quantity: 1, watts: 1500, hours: 6 },
    { id: 'f2', name: 'إضاءة', quantity: 10, watts: 20, hours: 10 },
  ],
  water_pump: [
    { id: 'wp1', name: 'مضخة مياه كبيرة', quantity: 1, watts: 5500, hours: 8 },
  ],
  supermarket: [
    { id: 'sm1', name: 'ثلاجات عرض', quantity: 6, watts: 1000, hours: 24 },
    { id: 'sm2', name: 'مكيفات مركزي', quantity: 2, watts: 3500, hours: 16 },
    { id: 'sm3', name: 'إضاءة', quantity: 40, watts: 20, hours: 16 },
    { id: 'sm4', name: 'أجهزة كاشير', quantity: 3, watts: 200, hours: 16 },
  ]
};

export const calculateSolarSystem = (appliances) => {
  // Total Daily Energy (Wh)
  const totalDailyEnergy = appliances.reduce((sum, item) => {
    return sum + (item.quantity * item.watts * item.hours);
  }, 0);

  // Peak Power (W)
  const totalPeakPower = appliances.reduce((sum, item) => {
    return sum + (item.quantity * item.watts);
  }, 0);

  // Inverter Sizing (Assume 25% safety margin)
  const inverterSizeW = totalPeakPower * 1.25;
  const inverterSizeKW = (inverterSizeW / 1000).toFixed(1);

  // Battery Sizing
  // Assume 12V system for small, 24V for medium, 48V for large
  // Assume 50% Depth of Discharge for Lead Acid or 80% for Lithium. Let's use 80% for Lithium standard
  // Assume 1 day of autonomy
  const systemVoltage = inverterSizeW > 5000 ? 48 : (inverterSizeW > 2000 ? 24 : 12);
  const batteryCapacityAh = (totalDailyEnergy / systemVoltage) / 0.8;

  // Solar Panel Sizing
  // Assume average 5 Peak Sun Hours
  const peakSunHours = 5;
  // System efficiency ~ 80%
  const requiredPanelCapacityW = totalDailyEnergy / (peakSunHours * 0.8);
  const requiredPanelCapacityKW = (requiredPanelCapacityW / 1000).toFixed(1);

  // Number of 550W panels
  const panelWattage = 550;
  const numberOfPanels = Math.ceil(requiredPanelCapacityW / panelWattage);

  return {
    totalDailyEnergy,
    totalDailyEnergyKWh: (totalDailyEnergy / 1000).toFixed(1),
    totalPeakPower,
    totalPeakPowerKW: (totalPeakPower / 1000).toFixed(1),
    inverterSizeW,
    inverterSizeKW,
    batteryCapacityAh: Math.ceil(batteryCapacityAh),
    systemVoltage,
    requiredPanelCapacityW,
    requiredPanelCapacityKW,
    numberOfPanels,
    panelWattage
  };
};
