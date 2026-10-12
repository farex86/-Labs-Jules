export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع تلج', appliances: [{ name: 'ماكينة ثلج', power: 5000, hours: 24 }] },
  { id: 'company', name: 'شركة', appliances: [{ name: 'مكيفات', power: 2000, hours: 10 }, { name: 'حواسيب', power: 300, hours: 10 }] },
  { id: 'farm', name: 'مزرعة', appliances: [{ name: 'مضخة زراعية', power: 3000, hours: 8 }] },
  { id: 'poultry_farm', name: 'مزرعة دواجن', appliances: [{ name: 'مراوح تهوية', power: 1500, hours: 24 }, { name: 'إضاءة', power: 500, hours: 12 }] },
  { id: 'greenhouse', name: 'بيوت محمية', appliances: [{ name: 'مضخة ري', power: 2000, hours: 6 }, { name: 'مراوح', power: 1000, hours: 12 }] },
  { id: 'factory', name: 'مصنع', appliances: [{ name: 'آلات', power: 10000, hours: 16 }] },
  { id: 'dispensary', name: 'مستوصف', appliances: [{ name: 'إضاءة', power: 1000, hours: 24 }, { name: 'معدات طبية', power: 2000, hours: 24 }, { name: 'مكيفات', power: 2000, hours: 24 }] },
  { id: 'hospital', name: 'مستشفي', appliances: [{ name: 'إضاءة', power: 5000, hours: 24 }, { name: 'معدات طبية', power: 10000, hours: 24 }, { name: 'مكيفات', power: 10000, hours: 24 }] },
  { id: 'bakery', name: 'مخبز', appliances: [{ name: 'عجانات', power: 3000, hours: 8 }, { name: 'أفران', power: 5000, hours: 12 }] },
  { id: 'shop', name: 'دكان', appliances: [{ name: 'ثلاجة', power: 500, hours: 24 }, { name: 'إضاءة', power: 100, hours: 12 }] },
  { id: 'workshop', name: 'ورشة', appliances: [{ name: 'معدات ورشة', power: 4000, hours: 8 }] },
  { id: 'water_pump', name: 'مضخة موية', appliances: [{ name: 'مضخة غاطسة', power: 2200, hours: 6 }] },
  { id: 'donkey', name: 'دونكي', appliances: [{ name: 'مضخة', power: 1500, hours: 8 }] },
  { id: 'mosque', name: 'مسجد', appliances: [{ name: 'مكيفات', power: 2000, hours: 6 }, { name: 'إضاءة ومكبرات', power: 500, hours: 6 }] },
  { id: 'printing_press', name: 'مطبعة', appliances: [{ name: 'آلات طباعة', power: 5000, hours: 12 }] },
  { id: 'coffee_shop', name: 'كوفي شوب', appliances: [{ name: 'ماكينة قهوة', power: 3000, hours: 16 }, { name: 'ثلاجات', power: 1000, hours: 24 }] },
  { id: 'restaurant', name: 'مطعم', appliances: [{ name: 'ثلاجات ومجمدات', power: 2000, hours: 24 }, { name: 'أفران', power: 3000, hours: 12 }] },
  { id: 'hotel', name: 'فندق', appliances: [{ name: 'مكيفات', power: 5000, hours: 24 }, { name: 'إضاءة', power: 2000, hours: 24 }] },
  { id: 'bank', name: 'بنك', appliances: [{ name: 'أجهزة كمبيوتر', power: 2000, hours: 10 }, { name: 'مكيفات', power: 4000, hours: 12 }] },
  { id: 'supermarket', name: 'سوبر ماركت', appliances: [{ name: 'ثلاجات عرض', power: 4000, hours: 24 }, { name: 'إضاءة', power: 1000, hours: 16 }] },
  { id: 'gas_station', name: 'طرمبة وقود', appliances: [{ name: 'مضخات وقود', power: 2000, hours: 24 }, { name: 'إضاءة', power: 500, hours: 12 }] },
  { id: 'mining_company', name: 'شركة تعدين', appliances: [{ name: 'معدات ثقيلة', power: 15000, hours: 24 }] }
];

export const calculateTotalDailyEnergy = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (app.power * app.hours * (app.quantity || 1));
  }, 0);
};

export const calculateSystemRequirements = (dailyEnergyWh) => {
  // Rough estimate: Assume 5 hours of peak sun
  const PEAK_SUN_HOURS = 5;
  const SYSTEM_EFFICIENCY = 0.8;

  const requiredSolarCapacityW = dailyEnergyWh / (PEAK_SUN_HOURS * SYSTEM_EFFICIENCY);
  const requiredBatteryCapacityWh = dailyEnergyWh * 1.5; // 1.5 days autonomy

  return {
    requiredSolarCapacitykW: requiredSolarCapacityW / 1000,
    requiredBatteryCapacitykWh: requiredBatteryCapacityWh / 1000
  };
};
