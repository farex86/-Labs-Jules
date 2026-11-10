export const facilityTypes = [
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

export const calculateDeviceDailyConsumption = (device) => {
  return (device.quantity || 0) * (device.wattage || 0) * (device.hoursPerDay || 0);
};

export const calculateTotalDailyConsumption = (devices) => {
  return devices.reduce((total, device) => total + calculateDeviceDailyConsumption(device), 0);
};

export const calculateRecommendedSystemSize = (totalDailyConsumptionWh) => {
  // Add a 20% safety margin and assume 5 peak sun hours for calculation
  const safetyMargin = 1.2;
  const peakSunHours = 5;
  const totalDailyConsumptionKWh = totalDailyConsumptionWh / 1000;

  return (totalDailyConsumptionKWh * safetyMargin) / peakSunHours; // Returns value in kW
};

export const defaultDevices = [
  { id: 'light', name: 'لمبة', wattage: 10, hoursPerDay: 8, quantity: 1 },
  { id: 'fan', name: 'مروحة', wattage: 70, hoursPerDay: 8, quantity: 1 },
  { id: 'fridge', name: 'ثلاجة', wattage: 200, hoursPerDay: 24, quantity: 1 },
  { id: 'tv', name: 'تلفزيون', wattage: 100, hoursPerDay: 6, quantity: 1 },
];
