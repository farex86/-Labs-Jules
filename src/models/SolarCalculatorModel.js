// src/models/SolarCalculatorModel.js

export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع ثلج', icon: 'Factory' },
  { id: 'company', name: 'شركة', icon: 'Building' },
  { id: 'farm', name: 'مزرعة', icon: 'Tractor' },
  { id: 'poultry_farm', name: 'مزرعة دواجن', icon: 'Bird' },
  { id: 'greenhouses', name: 'بيوت محمية', icon: 'Leaf' },
  { id: 'factory', name: 'مصنع', icon: 'Factory' },
  { id: 'clinic', name: 'مستوصف', icon: 'Stethoscope' },
  { id: 'hospital', name: 'مستشفى', icon: 'Hospital' },
  { id: 'bakery', name: 'مخبز', icon: 'Croissant' },
  { id: 'shop', name: 'دكان', icon: 'Store' },
  { id: 'workshop', name: 'ورشة', icon: 'Wrench' },
  { id: 'water_pump', name: 'مضخة موية', icon: 'Droplet' },
  { id: 'donki', name: 'دونكي', icon: 'Waves' },
  { id: 'mosque', name: 'مسجد', icon: 'BookOpen' },
  { id: 'printing_press', name: 'مطبعة', icon: 'Printer' },
  { id: 'coffee_shop', name: 'كوفي شوب', icon: 'Coffee' },
  { id: 'restaurant', name: 'مطعم', icon: 'Utensils' },
  { id: 'hotel', name: 'فندق', icon: 'Hotel' },
  { id: 'bank', name: 'بنك', icon: 'Landmark' },
  { id: 'supermarket', name: 'سوبر ماركت', icon: 'ShoppingCart' },
  { id: 'gas_station', name: 'طرمبة وقود', icon: 'Fuel' },
  { id: 'mining_company', name: 'شركة تعدين', icon: 'Pickaxe' },
];

export const APPLIANCE_DEFAULTS = {
  'mosque': [
    { name: 'لمبات إضاءة', power: 20, hours: 12, quantity: 20 },
    { name: 'مراوح سقف', power: 75, hours: 12, quantity: 10 },
    { name: 'مكيف', power: 1500, hours: 4, quantity: 2 },
    { name: 'ميكروفون / ساوند', power: 100, hours: 2, quantity: 1 },
  ],
  'shop': [
    { name: 'إضاءة', power: 20, hours: 12, quantity: 4 },
    { name: 'ثلاجة عرض', power: 400, hours: 24, quantity: 1 },
    { name: 'مروحة', power: 60, hours: 12, quantity: 1 },
  ],
  'clinic': [
    { name: 'إضاءة', power: 20, hours: 12, quantity: 15 },
    { name: 'مكيف', power: 1500, hours: 8, quantity: 3 },
    { name: 'ثلاجة أدوية', power: 250, hours: 24, quantity: 1 },
    { name: 'معدات طبية', power: 1000, hours: 6, quantity: 2 },
  ],
  'farm': [
    { name: 'مضخة مياه', power: 1500, hours: 6, quantity: 1 },
    { name: 'إضاءة خارجية', power: 50, hours: 12, quantity: 4 },
  ],
  'poultry_farm': [
    { name: 'مراوح تهوية', power: 500, hours: 24, quantity: 4 },
    { name: 'إضاءة', power: 20, hours: 16, quantity: 20 },
    { name: 'مضخة مياه', power: 1000, hours: 4, quantity: 1 },
  ]
};

export const COMMON_APPLIANCES = [
  { name: 'لمبة', power: 20 },
  { name: 'مروحة سقف', power: 75 },
  { name: 'تلفزيون', power: 100 },
  { name: 'ثلاجة', power: 250 },
  { name: 'مكيف شباك', power: 1500 },
  { name: 'مكيف اسبليت', power: 2000 },
  { name: 'موتور مياه', power: 750 },
  { name: 'كمبيوتر', power: 250 },
  { name: 'طابعة', power: 500 },
  { name: 'مكواة', power: 1000 },
];

export const SYSTEM_CONSTANTS = {
  SUNLIGHT_HOURS: 5.5,
  SYSTEM_LOSS_FACTOR: 1.3,
  BATTERY_EFFICIENCY: 0.85,
  INVERTER_EFFICIENCY: 0.95,
  BATTERY_VOLTAGE: 48,
  DOD: 0.5,
};

let _idCounter = 0;
function generateId() {
  _idCounter += 1;
  return 'app_' + _idCounter;
}

export function calculateSolarSystem(appliances) {
  let totalDailyEnergyWH = 0;
  let totalPeakPowerW = 0;

  appliances.forEach(app => {
    const power = Number(app.power) || 0;
    const hours = Number(app.hours) || 0;
    const qty = Number(app.quantity) || 0;

    const devicePeakPower = power * qty;
    const deviceDailyEnergy = devicePeakPower * hours;

    totalPeakPowerW += devicePeakPower;
    totalDailyEnergyWH += deviceDailyEnergy;
  });

  const requiredDailyGeneration = totalDailyEnergyWH * SYSTEM_CONSTANTS.SYSTEM_LOSS_FACTOR;
  const solarArrayCapacityW = requiredDailyGeneration / SYSTEM_CONSTANTS.SUNLIGHT_HOURS;
  const inverterCapacityW = totalPeakPowerW * 1.2;
  const requiredBatteryEnergyWH = totalDailyEnergyWH / SYSTEM_CONSTANTS.BATTERY_EFFICIENCY;
  const batteryCapacityAhTotal = requiredBatteryEnergyWH / SYSTEM_CONSTANTS.BATTERY_VOLTAGE;
  const requiredBatteryCapacityAh = batteryCapacityAhTotal / SYSTEM_CONSTANTS.DOD;

  return {
    totalDailyEnergyWH: Math.round(totalDailyEnergyWH),
    totalPeakPowerW: Math.round(totalPeakPowerW),
    solarArrayCapacityW: Math.round(solarArrayCapacityW),
    inverterCapacityW: Math.round(inverterCapacityW),
    batteryCapacityAh: Math.round(requiredBatteryCapacityAh),
    batteryVoltage: SYSTEM_CONSTANTS.BATTERY_VOLTAGE
  };
}

export function getDefaultAppliancesForFacility(facilityId) {
  if (APPLIANCE_DEFAULTS[facilityId]) {
    return APPLIANCE_DEFAULTS[facilityId].map(app => ({
      id: generateId(),
      name: app.name,
      power: app.power,
      hours: app.hours,
      quantity: app.quantity
    }));
  }
  return [];
}

export function createEmptyAppliance() {
  return {
    id: generateId(),
    name: 'جهاز جديد',
    power: 0,
    hours: 0,
    quantity: 1
  };
}
