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

export const DEFAULT_APPLIANCES = {
  mosque: [
    { id: '1', name: 'مكيف', power_watts: 1500, quantity: 4, hours_per_day: 5 },
    { id: '2', name: 'مراوح', power_watts: 80, quantity: 10, hours_per_day: 5 },
    { id: '3', name: 'لمبات', power_watts: 20, quantity: 20, hours_per_day: 5 },
    { id: '4', name: 'مكبر صوت', power_watts: 100, quantity: 1, hours_per_day: 1 },
  ],
  company: [
    { id: '1', name: 'مكيف', power_watts: 1500, quantity: 5, hours_per_day: 8 },
    { id: '2', name: 'كمبيوتر', power_watts: 200, quantity: 10, hours_per_day: 8 },
    { id: '3', name: 'لمبات', power_watts: 20, quantity: 30, hours_per_day: 8 },
    { id: '4', name: 'طابعة', power_watts: 500, quantity: 2, hours_per_day: 2 },
  ],
  clinic: [
    { id: '1', name: 'مكيف', power_watts: 1500, quantity: 6, hours_per_day: 12 },
    { id: '2', name: 'إضاءة', power_watts: 30, quantity: 40, hours_per_day: 12 },
    { id: '3', name: 'ثلاجة أدوية', power_watts: 300, quantity: 2, hours_per_day: 24 },
    { id: '4', name: 'أجهزة طبية', power_watts: 2000, quantity: 1, hours_per_day: 4 },
  ],
  bakery: [
    { id: '1', name: 'عجانة', power_watts: 3000, quantity: 1, hours_per_day: 6 },
    { id: '2', name: 'إضاءة', power_watts: 20, quantity: 15, hours_per_day: 12 },
    { id: '3', name: 'مراوح', power_watts: 80, quantity: 4, hours_per_day: 12 },
    { id: '4', name: 'ثلاجة عرض', power_watts: 500, quantity: 2, hours_per_day: 24 },
  ],
  shop: [
    { id: '1', name: 'إضاءة', power_watts: 20, quantity: 10, hours_per_day: 10 },
    { id: '2', name: 'ثلاجة', power_watts: 300, quantity: 2, hours_per_day: 24 },
    { id: '3', name: 'مروحة سقف', power_watts: 80, quantity: 2, hours_per_day: 10 },
  ],
  water_pump: [
    { id: '1', name: 'مضخة غاطسة', power_watts: 2200, quantity: 1, hours_per_day: 6 },
  ]
};

export const getAppliancesForFacility = (facilityId) => {
    return DEFAULT_APPLIANCES[facilityId] || [
        { id: '1', name: 'إضاءة', power_watts: 20, quantity: 10, hours_per_day: 12 },
        { id: '2', name: 'أجهزة متنوعة', power_watts: 1000, quantity: 1, hours_per_day: 8 }
    ];
};

export const calculateSolarSystem = (appliances) => {
  // Total Daily Energy (Wh)
  const totalDailyEnergy = appliances.reduce((sum, app) => sum + (app.power_watts * app.quantity * app.hours_per_day), 0);

  // Total Peak Power (W)
  const totalPower = appliances.reduce((sum, app) => sum + (app.power_watts * app.quantity), 0);

  // System losses and efficiency (assuming 30% loss)
  const requiredEnergy = totalDailyEnergy * 1.3;

  // Assuming 5 peak sun hours per day
  const peakSunHours = 5;
  const solarPanelCapacityRequired = requiredEnergy / peakSunHours;

  // Battery calculation (assuming 50% depth of discharge)
  // Let's use 48V system for scaling
  const batteryVoltage = 48;
  const daysOfAutonomy = 1;
  const batteryCapacityAh = (totalDailyEnergy * daysOfAutonomy) / (batteryVoltage * 0.5);

  // Inverter sizing (Total power + 20% safety margin)
  const inverterCapacity = totalPower * 1.2;

  return {
    totalDailyEnergy,
    totalPower,
    recommendedPanelsCapacity: Math.ceil(solarPanelCapacityRequired), // In Watts
    recommendedInverter: Math.ceil(inverterCapacity), // In Watts
    recommendedBatteryCapacity: Math.ceil(batteryCapacityAh), // In Ah
    systemVoltage: batteryVoltage
  };
};
