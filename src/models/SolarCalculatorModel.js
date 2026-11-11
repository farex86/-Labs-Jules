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

export const getDefaultDevicesForFacility = (facilityId) => {
  // A simplified set of default devices to start with.
  // We can customize based on facility if needed, but for now a generic template or few specific ones.
  const baseDevices = [
    { id: 1, name: 'إضاءة', quantity: 5, powerWatts: 10, hours: 8 },
    { id: 2, name: 'مكيف', quantity: 1, powerWatts: 1500, hours: 8 }
  ];

  switch(facilityId) {
    case 'mosque':
      return [
        { id: 1, name: 'مروحة سقف', quantity: 10, powerWatts: 75, hours: 5 },
        { id: 2, name: 'مكيف', quantity: 2, powerWatts: 2000, hours: 5 },
        { id: 3, name: 'مكبر صوت', quantity: 1, powerWatts: 100, hours: 5 },
        { id: 4, name: 'إضاءة', quantity: 15, powerWatts: 20, hours: 6 }
      ];
    case 'farm':
    case 'water_pump':
    case 'donkey':
      return [
        { id: 1, name: 'مضخة غاطسة', quantity: 1, powerWatts: 2200, hours: 10 },
        { id: 2, name: 'إضاءة خارجية', quantity: 4, powerWatts: 50, hours: 12 }
      ];
    default:
      return baseDevices;
  }
};

export const calculateSolarRequirements = (devices) => {
  let totalDailyEnergyWh = 0;
  let maxPowerWatts = 0;

  devices.forEach(device => {
    const power = (Number(device.powerWatts) || 0) * (Number(device.quantity) || 0);
    const energy = power * (Number(device.hours) || 0);
    totalDailyEnergyWh += energy;
    maxPowerWatts += power;
  });

  // Basic calculations (can be tweaked)
  const systemVoltage = 48; // Assume 48V system for larger setups
  const peakSunHours = 5.5; // Average sun hours
  const inverterEfficiency = 0.85;

  const requiredInverterWatts = maxPowerWatts / inverterEfficiency;

  // Total Solar Array needed (adding 20% for losses)
  const requiredSolarArrayWatts = (totalDailyEnergyWh / peakSunHours) * 1.2;

  // Battery capacity for 1 day of autonomy (50% Depth of Discharge)
  const requiredBatteryCapacityAh = (totalDailyEnergyWh / systemVoltage) * 2;

  return {
    totalDailyEnergyWh,
    maxPowerWatts,
    requiredInverterWatts,
    requiredSolarArrayWatts,
    requiredBatteryCapacityAh,
    systemVoltage
  };
};
