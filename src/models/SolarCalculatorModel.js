export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع ثلج' },
  { id: 'company', name: 'شركة' },
  { id: 'farm', name: 'مزرعة' },
  { id: 'poultry_farm', name: 'مزرعة دواجن' },
  { id: 'greenhouses', name: 'بيوت محمية' },
  { id: 'factory', name: 'مصنع' },
  { id: 'clinic', name: 'مستوصف' },
  { id: 'hospital', name: 'مستشفى' },
  { id: 'bakery', name: 'مخبز' },
  { id: 'shop', name: 'دكان' },
  { id: 'workshop', name: 'ورشة' },
  { id: 'water_pump', name: 'مضخة مياه' },
  { id: 'donkey', name: 'دونكي (بئر مياه)' },
  { id: 'mosque', name: 'مسجد' },
  { id: 'printing_press', name: 'مطبعة' },
  { id: 'coffee_shop', name: 'كوفي شوب' },
  { id: 'restaurant', name: 'مطعم' },
  { id: 'hotel', name: 'فندق' },
  { id: 'bank', name: 'بنك' },
  { id: 'supermarket', name: 'سوبر ماركت' },
  { id: 'fuel_station', name: 'طرمبة وقود' },
  { id: 'mining_company', name: 'شركة تعدين' }
];

// Optional default devices for some common facilities to pre-fill or suggest
export const FACILITY_DEVICES = {
  mosque: [
    { id: 1, name: 'مكيف', power: 1500, quantity: 4, hours: 4 },
    { id: 2, name: 'مروحة', power: 75, quantity: 10, hours: 10 },
    { id: 3, name: 'إضاءة', power: 20, quantity: 20, hours: 8 },
    { id: 4, name: 'مكبر صوت', power: 100, quantity: 1, hours: 2 },
  ],
  house: [ // though house wasn't strictly in the list, just as an example
    { id: 1, name: 'ثلاجة', power: 200, quantity: 1, hours: 24 },
    { id: 2, name: 'مروحة', power: 75, quantity: 3, hours: 12 },
    { id: 3, name: 'تلفزيون', power: 100, quantity: 1, hours: 8 },
    { id: 4, name: 'إضاءة', power: 20, quantity: 10, hours: 8 },
  ],
  shop: [
    { id: 1, name: 'ثلاجة عرض', power: 400, quantity: 1, hours: 24 },
    { id: 2, name: 'إضاءة', power: 20, quantity: 5, hours: 12 },
    { id: 3, name: 'مروحة', power: 75, quantity: 2, hours: 12 },
  ]
};

// Returns default devices for a facility type, or an empty list if none defined
export function getDefaultDevices(facilityId) {
  return FACILITY_DEVICES[facilityId] || [];
}

// Calculate total daily energy consumption (Wh)
export function calculateTotalEnergy(devices) {
  return devices.reduce((total, device) => {
    return total + (Number(device.power) * Number(device.quantity) * Number(device.hours));
  }, 0);
}

// Calculate required solar panels (assuming 400W panel, 5 peak sun hours, 80% efficiency)
export function calculateRequiredPanels(totalEnergyWh) {
  const systemLosses = 0.8;
  const peakSunHours = 5;
  const panelPower = 400;

  const dailyGenerationPerPanel = panelPower * peakSunHours * systemLosses;
  const requiredPanels = Math.ceil(totalEnergyWh / dailyGenerationPerPanel);

  return requiredPanels;
}

// Calculate required inverter capacity (W) (Sum of power * quantity of all devices running simultaneously + 20% margin)
export function calculateInverterCapacity(devices) {
  const maxPower = devices.reduce((total, device) => {
    return total + (Number(device.power) * Number(device.quantity));
  }, 0);

  return maxPower * 1.2; // 20% safety margin
}

// Calculate required battery capacity (Ah) for 12V system (assuming 1 day autonomy, 50% depth of discharge)
export function calculateBatteryCapacity(totalEnergyWh) {
  const batteryVoltage = 12;
  const depthOfDischarge = 0.5; // 50%
  const inverterEfficiency = 0.9;

  const requiredBatteryWh = totalEnergyWh / (depthOfDischarge * inverterEfficiency);
  const requiredBatteryAh = requiredBatteryWh / batteryVoltage;

  return requiredBatteryAh;
}
