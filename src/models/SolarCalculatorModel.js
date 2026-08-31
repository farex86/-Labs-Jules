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

export const DEFAULT_DEVICES = {
  shop: [
    { id: '1', name: 'لمبة', power: 10, quantity: 4, hours: 12 },
    { id: '2', name: 'مروحة سقف', power: 75, quantity: 2, hours: 12 },
    { id: '3', name: 'ثلاجة', power: 200, quantity: 1, hours: 24 }
  ],
  mosque: [
    { id: '1', name: 'لمبة', power: 15, quantity: 20, hours: 6 },
    { id: '2', name: 'مروحة سقف', power: 75, quantity: 10, hours: 8 },
    { id: '3', name: 'مكبر صوت', power: 100, quantity: 1, hours: 2 }
  ],
  company: [
    { id: '1', name: 'لمبة', power: 18, quantity: 15, hours: 10 },
    { id: '2', name: 'جهاز كمبيوتر', power: 150, quantity: 5, hours: 10 },
    { id: '3', name: 'مكيف هواء', power: 1500, quantity: 2, hours: 8 },
    { id: '4', name: 'طابعة', power: 50, quantity: 1, hours: 2 }
  ]
};

/**
 * Calculates the required solar system size based on devices.
 *
 * @param {Array} devices - List of devices with power, quantity, and hours.
 * @returns {Object} Calculated system specifications.
 */
export const calculateSolarSystem = (devices) => {
  let totalDailyEnergyWh = 0;
  let maxPowerW = 0;

  devices.forEach(device => {
    const power = Number(device.power) || 0;
    const quantity = Number(device.quantity) || 0;
    const hours = Number(device.hours) || 0;

    const deviceTotalPower = power * quantity;
    maxPowerW += deviceTotalPower;
    totalDailyEnergyWh += deviceTotalPower * hours;
  });

  // Safety margin of 25% for Inverter
  const inverterSizeW = maxPowerW * 1.25;

  // Solar Panels: Assume 5 peak sun hours. 20% system loss.
  const peakSunHours = 5;
  const panelArraySizeW = (totalDailyEnergyWh / peakSunHours) * 1.2;

  // Assume 450W standard panel
  const panelPowerW = 450;
  const numberOfPanels = Math.ceil(panelArraySizeW / panelPowerW);

  // Battery: 48V system, 50% depth of discharge
  const systemVoltage = 48;
  const batteryCapacityAh = (totalDailyEnergyWh / systemVoltage) / 0.5;

  return {
    totalDailyEnergyWh,
    maxPowerW,
    inverterSizeW: Math.ceil(inverterSizeW),
    panelArraySizeW: Math.ceil(panelArraySizeW),
    numberOfPanels,
    batteryCapacityAh: Math.ceil(batteryCapacityAh),
    batteryVoltage: systemVoltage,
    panelPowerW
  };
};
