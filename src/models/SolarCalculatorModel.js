export const FACILITY_TYPES = [
  { id: 'ice_factory', label: 'مصنع تلج' },
  { id: 'company', label: 'شركة' },
  { id: 'farm', label: 'مزرعة' },
  { id: 'poultry_farm', label: 'مزرعة دواجن' },
  { id: 'greenhouse', label: 'بيوت محمية' },
  { id: 'factory', label: 'مصنع' },
  { id: 'clinic', label: 'مستوصف' },
  { id: 'hospital', label: 'مستشفي' },
  { id: 'bakery', label: 'مخبز' },
  { id: 'shop', label: 'دكان' },
  { id: 'workshop', label: 'ورشة' },
  { id: 'water_pump', label: 'مضخة موية' },
  { id: 'donkey_engine', label: 'دونكي' },
  { id: 'mosque', label: 'مسجد' },
  { id: 'printing_press', label: 'مطبعة' },
  { id: 'coffee_shop', label: 'كوفي شوب' },
  { id: 'restaurant', label: 'مطعم' },
  { id: 'hotel', label: 'فندق' },
  { id: 'bank', label: 'بنك' },
  { id: 'supermarket', label: 'سوبر ماركت' },
  { id: 'gas_station', label: 'طرمبة وقود' },
  { id: 'mining_company', label: 'شركة تعدين' },
];

export const COMMON_DEVICES = [
  { id: 'light_bulb', label: 'لمبة إضاءة', defaultPower: 15 },
  { id: 'fan', label: 'مروحة سقف', defaultPower: 75 },
  { id: 'ac_split_12', label: 'مكيف اسبليت 12 ألف وحدة', defaultPower: 1200 },
  { id: 'ac_split_18', label: 'مكيف اسبليت 18 ألف وحدة', defaultPower: 1800 },
  { id: 'ac_split_24', label: 'مكيف اسبليت 24 ألف وحدة', defaultPower: 2400 },
  { id: 'fridge_small', label: 'ثلاجة صغيرة', defaultPower: 150 },
  { id: 'fridge_large', label: 'ثلاجة كبيرة', defaultPower: 400 },
  { id: 'freezer', label: 'فريزر', defaultPower: 500 },
  { id: 'tv_led', label: 'شاشة تلفزيون', defaultPower: 100 },
  { id: 'computer', label: 'جهاز كمبيوتر', defaultPower: 250 },
  { id: 'laptop', label: 'لابتوب', defaultPower: 65 },
  { id: 'printer', label: 'طابعة', defaultPower: 500 },
  { id: 'water_pump_05', label: 'مضخة ماء نص حصان', defaultPower: 375 },
  { id: 'water_pump_1', label: 'مضخة ماء 1 حصان', defaultPower: 750 },
  { id: 'washing_machine', label: 'غسالة ملابس', defaultPower: 500 },
  { id: 'iron', label: 'مكواة', defaultPower: 1000 },
  { id: 'microwave', label: 'مايكرويف', defaultPower: 1200 },
  { id: 'water_heater', label: 'سخان ماء', defaultPower: 1500 },
];

export const calculateSolarRequirements = (devices, sunHours = 5.5, batteryDays = 1, systemVoltage = 24) => {
  // 1. Calculate Total Daily Energy Required (Wh/day)
  let totalDailyEnergy = 0;
  let totalPeakPower = 0;

  devices.forEach(device => {
    const power = device.power || 0;
    const qty = device.quantity || 1;
    const hours = device.hoursPerDay || 0;

    totalDailyEnergy += power * qty * hours;
    totalPeakPower += power * qty;
  });

  // If no devices, return zeros
  if (totalDailyEnergy === 0) {
    return {
      totalDailyEnergy: 0,
      totalPeakPower: 0,
      systemSizeKw: 0,
      batteryCapacityAh: 0,
      inverterSizeW: 0
    };
  }

  // 2. Add System Losses (approx 30% loss, so multiply by 1.3)
  const totalEnergyWithLosses = totalDailyEnergy * 1.3;

  // 3. Calculate Required Solar Panel System Size (kW)
  // System Size (W) = Daily Energy / Sun Hours
  const systemSizeW = totalEnergyWithLosses / sunHours;
  const systemSizeKw = systemSizeW / 1000;

  // 4. Calculate Battery Bank Capacity (Ah)
  // Battery Capacity (Wh) = Daily Energy * Days of Autonomy / Depth of Discharge (0.5 for Lead Acid, 0.8 for Lithium)
  // Let's assume standard Lead Acid/Gel 50% DoD for safe generic calculation
  const batteryCapacityWh = (totalDailyEnergy * batteryDays) / 0.5;
  // Battery Capacity (Ah) = Battery Capacity (Wh) / System Voltage
  const batteryCapacityAh = batteryCapacityWh / systemVoltage;

  // 5. Calculate Inverter Size (W)
  // Inverter should handle total peak power + 25% safety margin
  const inverterSizeW = totalPeakPower * 1.25;

  return {
    totalDailyEnergy: Math.ceil(totalDailyEnergy),
    totalPeakPower: Math.ceil(totalPeakPower),
    systemSizeKw: Number(systemSizeKw.toFixed(2)),
    batteryCapacityAh: Math.ceil(batteryCapacityAh),
    inverterSizeW: Math.ceil(inverterSizeW)
  };
};
