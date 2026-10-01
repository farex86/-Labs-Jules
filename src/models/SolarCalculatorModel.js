export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    defaultAppliances: [
      { id: '1', name: 'ماكينة صنع الثلج', wattage: 5000, hours: 24, quantity: 2 },
      { id: '2', name: 'إضاءة', wattage: 20, hours: 12, quantity: 10 },
      { id: '3', name: 'مكيف هواء', wattage: 1500, hours: 12, quantity: 1 }
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    defaultAppliances: [
      { id: '1', name: 'جهاز كمبيوتر', wattage: 200, hours: 8, quantity: 10 },
      { id: '2', name: 'إضاءة', wattage: 20, hours: 8, quantity: 20 },
      { id: '3', name: 'مكيف هواء', wattage: 1500, hours: 8, quantity: 3 },
      { id: '4', name: 'طابعة', wattage: 500, hours: 2, quantity: 2 }
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultAppliances: [
      { id: '1', name: 'مضخة ماء', wattage: 2000, hours: 6, quantity: 1 },
      { id: '2', name: 'إضاءة خارجية', wattage: 50, hours: 12, quantity: 5 }
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultAppliances: [
      { id: '1', name: 'مراوح تهوية', wattage: 500, hours: 24, quantity: 4 },
      { id: '2', name: 'إضاءة', wattage: 20, hours: 16, quantity: 20 },
      { id: '3', name: 'سخانات', wattage: 1000, hours: 12, quantity: 2 }
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    defaultAppliances: [
      { id: '1', name: 'مضخة ماء', wattage: 1500, hours: 4, quantity: 1 },
      { id: '2', name: 'مراوح', wattage: 300, hours: 12, quantity: 4 },
      { id: '3', name: 'إضاءة', wattage: 40, hours: 8, quantity: 10 }
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultAppliances: [
      { id: '1', name: 'ماكينات تصنيع', wattage: 10000, hours: 8, quantity: 3 },
      { id: '2', name: 'إضاءة', wattage: 40, hours: 10, quantity: 30 },
      { id: '3', name: 'تهوية', wattage: 1000, hours: 10, quantity: 5 }
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultAppliances: [
      { id: '1', name: 'إضاءة', wattage: 20, hours: 12, quantity: 30 },
      { id: '2', name: 'مكيف هواء', wattage: 1500, hours: 12, quantity: 5 },
      { id: '3', name: 'ثلاجة أدوية', wattage: 300, hours: 24, quantity: 2 },
      { id: '4', name: 'أجهزة طبية', wattage: 1000, hours: 6, quantity: 3 }
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    defaultAppliances: [
      { id: '1', name: 'إضاءة', wattage: 20, hours: 24, quantity: 100 },
      { id: '2', name: 'مكيف هواء مركزي', wattage: 15000, hours: 24, quantity: 2 },
      { id: '3', name: 'أجهزة طبية حيوية', wattage: 2000, hours: 24, quantity: 10 },
      { id: '4', name: 'ثلاجات بنك الدم', wattage: 500, hours: 24, quantity: 3 }
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultAppliances: [
      { id: '1', name: 'عجانة', wattage: 3000, hours: 6, quantity: 2 },
      { id: '2', name: 'فرن كهربائي', wattage: 8000, hours: 8, quantity: 1 },
      { id: '3', name: 'إضاءة', wattage: 20, hours: 12, quantity: 10 },
      { id: '4', name: 'مراوح شفط', wattage: 500, hours: 12, quantity: 3 }
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultAppliances: [
      { id: '1', name: 'إضاءة', wattage: 20, hours: 12, quantity: 4 },
      { id: '2', name: 'ثلاجة عرض', wattage: 400, hours: 24, quantity: 2 },
      { id: '3', name: 'مروحة سقف', wattage: 80, hours: 12, quantity: 2 }
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultAppliances: [
      { id: '1', name: 'معدات لحام', wattage: 4000, hours: 4, quantity: 1 },
      { id: '2', name: 'مثقاب كهربائي', wattage: 800, hours: 3, quantity: 2 },
      { id: '3', name: 'إضاءة', wattage: 40, hours: 8, quantity: 5 },
      { id: '4', name: 'كمبروسر هواء', wattage: 2000, hours: 4, quantity: 1 }
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة مياه',
    defaultAppliances: [
      { id: '1', name: 'مضخة غاطسة', wattage: 3000, hours: 8, quantity: 1 }
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي (بئر مياه)',
    defaultAppliances: [
      { id: '1', name: 'مضخة بئر', wattage: 4000, hours: 10, quantity: 1 },
      { id: '2', name: 'إضاءة', wattage: 20, hours: 12, quantity: 2 }
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultAppliances: [
      { id: '1', name: 'إضاءة', wattage: 20, hours: 4, quantity: 30 },
      { id: '2', name: 'مكيف هواء', wattage: 1500, hours: 4, quantity: 4 },
      { id: '3', name: 'مراوح', wattage: 80, hours: 6, quantity: 10 },
      { id: '4', name: 'نظام صوتيات', wattage: 200, hours: 2, quantity: 1 }
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultAppliances: [
      { id: '1', name: 'ماكينة طباعة', wattage: 5000, hours: 8, quantity: 2 },
      { id: '2', name: 'ماكينة قص ورقة', wattage: 1500, hours: 4, quantity: 1 },
      { id: '3', name: 'إضاءة', wattage: 40, hours: 10, quantity: 15 },
      { id: '4', name: 'مكيف هواء', wattage: 2000, hours: 10, quantity: 2 }
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultAppliances: [
      { id: '1', name: 'ماكينة إسبريسو', wattage: 3000, hours: 12, quantity: 1 },
      { id: '2', name: 'ثلاجة عرض', wattage: 500, hours: 24, quantity: 2 },
      { id: '3', name: 'مكيف هواء', wattage: 1500, hours: 12, quantity: 2 },
      { id: '4', name: 'إضاءة', wattage: 20, hours: 14, quantity: 20 },
      { id: '5', name: 'خلاط', wattage: 800, hours: 2, quantity: 2 }
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultAppliances: [
      { id: '1', name: 'ثلاجة تبريد', wattage: 800, hours: 24, quantity: 3 },
      { id: '2', name: 'فريزر', wattage: 1000, hours: 24, quantity: 2 },
      { id: '3', name: 'مكيف هواء', wattage: 2000, hours: 14, quantity: 4 },
      { id: '4', name: 'إضاءة', wattage: 20, hours: 16, quantity: 30 },
      { id: '5', name: 'مراوح شفط', wattage: 500, hours: 14, quantity: 2 }
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultAppliances: [
      { id: '1', name: 'إضاءة غرف وممرات', wattage: 20, hours: 12, quantity: 200 },
      { id: '2', name: 'مكيفات هواء', wattage: 1200, hours: 10, quantity: 50 },
      { id: '3', name: 'ثلاجات صغيرة', wattage: 100, hours: 24, quantity: 50 },
      { id: '4', name: 'مصعد', wattage: 8000, hours: 4, quantity: 2 },
      { id: '5', name: 'سخانات مياه', wattage: 1500, hours: 4, quantity: 50 }
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultAppliances: [
      { id: '1', name: 'أجهزة كمبيوتر', wattage: 200, hours: 10, quantity: 20 },
      { id: '2', name: 'مكيف هواء', wattage: 2000, hours: 10, quantity: 5 },
      { id: '3', name: 'إضاءة', wattage: 20, hours: 12, quantity: 50 },
      { id: '4', name: 'صراف آلي (ATM)', wattage: 300, hours: 24, quantity: 2 },
      { id: '5', name: 'نظام كاميرات وسيرفرات', wattage: 500, hours: 24, quantity: 1 }
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultAppliances: [
      { id: '1', name: 'ثلاجات عرض', wattage: 800, hours: 24, quantity: 6 },
      { id: '2', name: 'فريزر لحوم ومجمدات', wattage: 1200, hours: 24, quantity: 4 },
      { id: '3', name: 'مكيف هواء', wattage: 2000, hours: 16, quantity: 4 },
      { id: '4', name: 'إضاءة', wattage: 20, hours: 16, quantity: 50 },
      { id: '5', name: 'أجهزة كاشير', wattage: 150, hours: 16, quantity: 3 }
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultAppliances: [
      { id: '1', name: 'مضخات وقود', wattage: 1000, hours: 10, quantity: 4 },
      { id: '2', name: 'إضاءة المظلة', wattage: 100, hours: 12, quantity: 10 },
      { id: '3', name: 'إضاءة المكتب', wattage: 20, hours: 24, quantity: 5 },
      { id: '4', name: 'مكيف مكتب', wattage: 1500, hours: 24, quantity: 1 }
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultAppliances: [
      { id: '1', name: 'معدات حفر وتكسير', wattage: 15000, hours: 10, quantity: 2 },
      { id: '2', name: 'مضخات مياه', wattage: 5000, hours: 12, quantity: 2 },
      { id: '3', name: 'إضاءة كاشفة', wattage: 500, hours: 12, quantity: 10 },
      { id: '4', name: 'مولدات ترحيل/شواحن', wattage: 3000, hours: 8, quantity: 1 },
      { id: '5', name: 'تجهيزات سكن العمال (مكيفات/إضاءة)', wattage: 5000, hours: 12, quantity: 1 }
    ]
  }
];

/**
 * Calculates solar requirements based on a list of appliances.
 * @param {Array} appliances - Array of appliance objects { wattage, hours, quantity }
 * @returns {Object} Calculation results
 */
export const calculateSolarRequirements = (appliances) => {
  let totalEnergyWh = 0;
  let maxPowerW = 0;

  appliances.forEach(app => {
    const power = (Number(app.wattage) || 0) * (Number(app.quantity) || 0);
    const energy = power * (Number(app.hours) || 0);
    totalEnergyWh += energy;
    maxPowerW += power;
  });

  // Assumptions for the calculation:
  // Peak Sun Hours (PSH) = 5 hours/day
  // System Efficiency = 80% (0.8)
  // Battery Autonomy = 1.5 days
  // Battery Depth of Discharge (DoD) = 50% (0.5)
  // System Voltage = 48V
  // Inverter Efficiency/Oversize factor = 1.25

  const PSH = 5;
  const SYSTEM_EFFICIENCY = 0.8;
  const BATTERY_AUTONOMY = 1.5;
  const BATTERY_DOD = 0.5;
  const SYSTEM_VOLTAGE = 48;
  const INVERTER_FACTOR = 1.25;

  // Required Panel Capacity (Watts)
  // Total Energy / PSH / Efficiency
  const panelCapacityW = totalEnergyWh > 0 ? (totalEnergyWh / PSH) / SYSTEM_EFFICIENCY : 0;
  const panelCapacityKW = panelCapacityW / 1000;

  // Battery Capacity (Ah) at 48V
  // (Total Energy * Autonomy) / (DoD * Voltage)
  const batteryCapacityAh = totalEnergyWh > 0 ? (totalEnergyWh * BATTERY_AUTONOMY) / (BATTERY_DOD * SYSTEM_VOLTAGE) : 0;
  const batteryCapacityKWh = (batteryCapacityAh * SYSTEM_VOLTAGE) / 1000;

  // Inverter Size (Watts)
  const inverterSizeW = maxPowerW * INVERTER_FACTOR;
  const inverterSizeKW = inverterSizeW / 1000;

  return {
    totalEnergyKWh: (totalEnergyWh / 1000).toFixed(2),
    maxPowerKW: (maxPowerW / 1000).toFixed(2),
    panelCapacityKW: panelCapacityKW.toFixed(2),
    batteryCapacityAh: Math.ceil(batteryCapacityAh),
    batteryCapacityKWh: batteryCapacityKWh.toFixed(2),
    inverterSizeKW: inverterSizeKW.toFixed(2),
    systemVoltage: SYSTEM_VOLTAGE
  };
};
