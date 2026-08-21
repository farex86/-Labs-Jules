// src/models/SolarCalculatorModel.js

/**
 * Predefined facility types in Arabic with their typical appliances.
 * Each appliance has a default quantity, power (in Watts), and hours of usage per day.
 */
export const facilityTypes = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    appliances: [
      { id: 'ice_maker', name: 'آلة صنع الثلج', quantity: 1, power: 5000, hours: 24 },
      { id: 'freezer', name: 'فريزر', quantity: 2, power: 1500, hours: 24 },
      { id: 'lighting', name: 'إضاءة', quantity: 10, power: 50, hours: 12 },
    ],
  },
  {
    id: 'company',
    name: 'شركة',
    appliances: [
      { id: 'ac', name: 'مكيف', quantity: 5, power: 2000, hours: 8 },
      { id: 'computer', name: 'كمبيوتر', quantity: 10, power: 200, hours: 8 },
      { id: 'printer', name: 'طابعة', quantity: 2, power: 500, hours: 2 },
      { id: 'lighting', name: 'إضاءة', quantity: 20, power: 40, hours: 10 },
    ],
  },
  {
    id: 'farm',
    name: 'مزرعة',
    appliances: [
      { id: 'water_pump', name: 'مضخة مياه', quantity: 1, power: 3000, hours: 6 },
      { id: 'lighting', name: 'إضاءة', quantity: 5, power: 40, hours: 12 },
    ],
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    appliances: [
      { id: 'ventilation', name: 'مراوح تهوية', quantity: 4, power: 1000, hours: 24 },
      { id: 'heating', name: 'تدفئة', quantity: 2, power: 2000, hours: 12 },
      { id: 'lighting', name: 'إضاءة', quantity: 20, power: 30, hours: 24 },
    ],
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    appliances: [
      { id: 'cooling_pad', name: 'وسادات تبريد', quantity: 2, power: 1500, hours: 12 },
      { id: 'ventilation', name: 'مراوح', quantity: 4, power: 500, hours: 12 },
      { id: 'water_pump', name: 'مضخة مياه', quantity: 1, power: 1500, hours: 4 },
    ],
  },
  {
    id: 'factory',
    name: 'مصنع',
    appliances: [
      { id: 'machinery', name: 'آلات', quantity: 5, power: 5000, hours: 10 },
      { id: 'lighting', name: 'إضاءة', quantity: 30, power: 100, hours: 12 },
      { id: 'ac', name: 'تكييف', quantity: 4, power: 3000, hours: 10 },
    ],
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    appliances: [
      { id: 'medical_equipment', name: 'معدات طبية', quantity: 5, power: 1000, hours: 8 },
      { id: 'fridge', name: 'ثلاجة أدوية', quantity: 2, power: 300, hours: 24 },
      { id: 'ac', name: 'مكيف', quantity: 3, power: 1500, hours: 12 },
      { id: 'lighting', name: 'إضاءة', quantity: 15, power: 40, hours: 12 },
    ],
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    appliances: [
      { id: 'medical_equipment', name: 'معدات طبية ثقيلة', quantity: 10, power: 3000, hours: 24 },
      { id: 'ac_central', name: 'تكييف مركزي', quantity: 2, power: 15000, hours: 24 },
      { id: 'lighting', name: 'إضاءة', quantity: 100, power: 40, hours: 24 },
      { id: 'fridge', name: 'ثلاجات', quantity: 10, power: 400, hours: 24 },
    ],
  },
  {
    id: 'bakery',
    name: 'مخبز',
    appliances: [
      { id: 'oven', name: 'فرن كهربائي', quantity: 2, power: 6000, hours: 12 },
      { id: 'mixer', name: 'عجانة', quantity: 2, power: 1500, hours: 8 },
      { id: 'fridge', name: 'ثلاجة عرض', quantity: 1, power: 800, hours: 24 },
      { id: 'lighting', name: 'إضاءة', quantity: 10, power: 50, hours: 14 },
    ],
  },
  {
    id: 'shop',
    name: 'دكان',
    appliances: [
      { id: 'fridge', name: 'ثلاجة عرض', quantity: 2, power: 600, hours: 24 },
      { id: 'ac', name: 'مكيف', quantity: 1, power: 1500, hours: 12 },
      { id: 'lighting', name: 'إضاءة', quantity: 4, power: 40, hours: 12 },
    ],
  },
  {
    id: 'workshop',
    name: 'ورشة',
    appliances: [
      { id: 'tools', name: 'عدد كهربائية', quantity: 5, power: 1000, hours: 6 },
      { id: 'compressor', name: 'كمبروسر هواء', quantity: 1, power: 2500, hours: 4 },
      { id: 'lighting', name: 'إضاءة', quantity: 6, power: 100, hours: 10 },
    ],
  },
  {
    id: 'water_pump_station',
    name: 'مضخة موية',
    appliances: [
      { id: 'large_pump', name: 'مضخة غاطسة', quantity: 1, power: 5000, hours: 8 },
    ],
  },
  {
    id: 'donkey',
    name: 'دونكي',
    appliances: [
      { id: 'water_pump', name: 'مضخة مياه', quantity: 1, power: 2000, hours: 5 },
      { id: 'lighting', name: 'إضاءة', quantity: 2, power: 30, hours: 12 },
    ],
  },
  {
    id: 'mosque',
    name: 'مسجد',
    appliances: [
      { id: 'ac', name: 'مكيف', quantity: 4, power: 2000, hours: 6 },
      { id: 'sound_system', name: 'مكبر صوت', quantity: 1, power: 300, hours: 2 },
      { id: 'lighting', name: 'إضاءة', quantity: 20, power: 40, hours: 6 },
      { id: 'water_cooler', name: 'برادة مياه', quantity: 2, power: 400, hours: 24 },
    ],
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    appliances: [
      { id: 'printer', name: 'آلة طباعة', quantity: 3, power: 3000, hours: 10 },
      { id: 'computer', name: 'كمبيوتر', quantity: 3, power: 200, hours: 10 },
      { id: 'ac', name: 'مكيف', quantity: 2, power: 2000, hours: 10 },
    ],
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    appliances: [
      { id: 'espresso_machine', name: 'آلة اسبريسو', quantity: 1, power: 3500, hours: 12 },
      { id: 'blender', name: 'خلاط', quantity: 2, power: 1500, hours: 4 },
      { id: 'fridge', name: 'ثلاجة عرض', quantity: 1, power: 600, hours: 24 },
      { id: 'ac', name: 'مكيف', quantity: 2, power: 2000, hours: 14 },
      { id: 'lighting', name: 'إضاءة', quantity: 15, power: 30, hours: 14 },
    ],
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    appliances: [
      { id: 'fridge', name: 'ثلاجات كبيرة', quantity: 3, power: 1000, hours: 24 },
      { id: 'oven', name: 'أفران', quantity: 2, power: 4000, hours: 8 },
      { id: 'ac', name: 'مكيف', quantity: 4, power: 2500, hours: 14 },
      { id: 'lighting', name: 'إضاءة', quantity: 30, power: 40, hours: 14 },
    ],
  },
  {
    id: 'hotel',
    name: 'فندق',
    appliances: [
      { id: 'ac', name: 'مكيفات غرف', quantity: 20, power: 1500, hours: 12 },
      { id: 'lighting', name: 'إضاءة', quantity: 100, power: 30, hours: 16 },
      { id: 'elevator', name: 'مصعد', quantity: 1, power: 5000, hours: 4 },
      { id: 'water_heater', name: 'سخان مياه', quantity: 10, power: 2000, hours: 6 },
    ],
  },
  {
    id: 'bank',
    name: 'بنك',
    appliances: [
      { id: 'computer', name: 'كمبيوتر', quantity: 15, power: 200, hours: 10 },
      { id: 'server', name: 'سيرفر', quantity: 2, power: 800, hours: 24 },
      { id: 'ac', name: 'تكييف', quantity: 6, power: 2500, hours: 12 },
      { id: 'atm', name: 'صراف آلي', quantity: 2, power: 500, hours: 24 },
      { id: 'lighting', name: 'إضاءة', quantity: 40, power: 40, hours: 12 },
    ],
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    appliances: [
      { id: 'fridge_display', name: 'ثلاجة عرض', quantity: 6, power: 800, hours: 24 },
      { id: 'freezer', name: 'فريزر', quantity: 4, power: 1000, hours: 24 },
      { id: 'ac', name: 'مكيف', quantity: 4, power: 2500, hours: 16 },
      { id: 'lighting', name: 'إضاءة', quantity: 50, power: 40, hours: 16 },
    ],
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    appliances: [
      { id: 'fuel_pump', name: 'مضخة وقود', quantity: 4, power: 1500, hours: 24 },
      { id: 'lighting', name: 'إضاءة خارجية', quantity: 10, power: 150, hours: 12 },
      { id: 'shop_ac', name: 'مكيف البقالة', quantity: 1, power: 2000, hours: 24 },
    ],
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    appliances: [
      { id: 'heavy_machinery', name: 'معدات ثقيلة', quantity: 5, power: 10000, hours: 12 },
      { id: 'lighting', name: 'كشافات إضاءة', quantity: 20, power: 500, hours: 12 },
      { id: 'water_pump', name: 'مضخة مياه', quantity: 2, power: 5000, hours: 12 },
    ],
  },
];

/**
 * Calculates the solar system requirements based on the list of appliances.
 *
 * @param {Array} appliances - Array of objects { quantity, power, hours }
 * @returns {Object} - Object containing the calculation results.
 */
export const calculateSolarSystem = (appliances) => {
  // 1. Total Daily Energy Consumption (Wh/day)
  let totalDailyConsumption = 0;

  // 2. Total Peak Power (W) - Max power if all appliances run at once
  let totalPeakPower = 0;

  appliances.forEach(app => {
    const qty = parseInt(app.quantity, 10) || 0;
    const power = parseFloat(app.power) || 0;
    const hours = parseFloat(app.hours) || 0;

    const itemTotalPower = qty * power;
    totalPeakPower += itemTotalPower;
    totalDailyConsumption += itemTotalPower * hours;
  });

  // Convert to kWh for display
  const totalDailyConsumptionKWh = totalDailyConsumption / 1000;

  // Constants for calculation
  const SUN_HOURS = 5; // Average peak sun hours
  const SYSTEM_EFFICIENCY = 0.8; // System losses (20%)

  // 3. Recommended Solar Panels Size (kW)
  // Formula: (Daily Consumption / System Efficiency) / Peak Sun Hours
  const requiredSolarSizeKW = (totalDailyConsumption / SYSTEM_EFFICIENCY) / SUN_HOURS / 1000;

  // 4. Inverter Size (kW)
  // Should handle the total peak power + 25% safety margin
  const inverterSafetyMargin = 1.25;
  const recommendedInverterSizeKW = (totalPeakPower * inverterSafetyMargin) / 1000;

  // 5. Battery Capacity (Ah)
  // Assuming a 48V system, 50% Depth of Discharge for lead acid or reasonable for lithium, and 1 day of autonomy.
  const SYSTEM_VOLTAGE = 48;
  const DOD = 0.5; // Depth of discharge 50%
  const DAYS_OF_AUTONOMY = 1;
  const batteryEfficiency = 0.85;

  const requiredBatteryCapacityAh = (totalDailyConsumption * DAYS_OF_AUTONOMY) / (SYSTEM_VOLTAGE * DOD * batteryEfficiency);

  return {
    totalDailyConsumption: totalDailyConsumption,
    totalDailyConsumptionKWh: totalDailyConsumptionKWh.toFixed(2),
    totalPeakPower: totalPeakPower,
    recommendedSolarSizeKW: requiredSolarSizeKW.toFixed(2),
    recommendedInverterSizeKW: recommendedInverterSizeKW.toFixed(2),
    requiredBatteryCapacityAh: requiredBatteryCapacityAh.toFixed(0),
    systemVoltage: SYSTEM_VOLTAGE
  };
};
