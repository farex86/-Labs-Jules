export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    appliances: [
      { id: 'app1', name: 'ماكينة ثلج كبيرة', power: 5000, hours: 24, count: 1 },
      { id: 'app2', name: 'غرفة تبريد', power: 3000, hours: 24, count: 1 },
      { id: 'app3', name: 'إضاءة', power: 100, hours: 12, count: 10 }
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    appliances: [
      { id: 'app1', name: 'مكيف', power: 1500, hours: 8, count: 4 },
      { id: 'app2', name: 'كمبيوتر', power: 250, hours: 8, count: 10 },
      { id: 'app3', name: 'إضاءة', power: 20, hours: 10, count: 20 },
      { id: 'app4', name: 'طابعة/ماكينة تصوير', power: 500, hours: 2, count: 2 }
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    appliances: [
      { id: 'app1', name: 'مضخة غاطسة', power: 2200, hours: 6, count: 1 },
      { id: 'app2', name: 'إضاءة خارجية', power: 100, hours: 12, count: 10 },
      { id: 'app3', name: 'ثلاجة', power: 300, hours: 24, count: 1 }
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    appliances: [
      { id: 'app1', name: 'مراوح تهوية', power: 500, hours: 24, count: 6 },
      { id: 'app2', name: 'نظام تدفئة', power: 2000, hours: 12, count: 2 },
      { id: 'app3', name: 'إضاءة', power: 50, hours: 24, count: 30 }
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    appliances: [
      { id: 'app1', name: 'نظام تبريد/مراوح', power: 1000, hours: 12, count: 2 },
      { id: 'app2', name: 'مضخة ري', power: 1500, hours: 4, count: 1 },
      { id: 'app3', name: 'إضاءة', power: 50, hours: 12, count: 10 }
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    appliances: [
      { id: 'app1', name: 'آلات تصنيع', power: 10000, hours: 12, count: 2 },
      { id: 'app2', name: 'إضاءة', power: 200, hours: 12, count: 20 },
      { id: 'app3', name: 'مكيفات', power: 2000, hours: 12, count: 5 }
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    appliances: [
      { id: 'app1', name: 'مكيف', power: 1500, hours: 12, count: 6 },
      { id: 'app2', name: 'ثلاجة أدوية', power: 300, hours: 24, count: 2 },
      { id: 'app3', name: 'معدات طبية', power: 1000, hours: 8, count: 3 },
      { id: 'app4', name: 'إضاءة', power: 20, hours: 16, count: 30 }
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    appliances: [
      { id: 'app1', name: 'أجهزة طبية حيوية', power: 5000, hours: 24, count: 5 },
      { id: 'app2', name: 'تكييف مركزي', power: 20000, hours: 24, count: 1 },
      { id: 'app3', name: 'ثلاجات حفظ الدم/الأدوية', power: 500, hours: 24, count: 10 },
      { id: 'app4', name: 'إضاءة عامة', power: 50, hours: 24, count: 100 }
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    appliances: [
      { id: 'app1', name: 'فرن كهربائي', power: 8000, hours: 16, count: 1 },
      { id: 'app2', name: 'عجانة', power: 2000, hours: 8, count: 2 },
      { id: 'app3', name: 'ثلاجة عرض', power: 800, hours: 24, count: 1 },
      { id: 'app4', name: 'إضاءة', power: 40, hours: 16, count: 10 }
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    appliances: [
      { id: 'app1', name: 'ثلاجة', power: 500, hours: 24, count: 2 },
      { id: 'app2', name: 'مكيف', power: 1500, hours: 12, count: 1 },
      { id: 'app3', name: 'إضاءة', power: 20, hours: 12, count: 6 }
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    appliances: [
      { id: 'app1', name: 'ماكينة لحام', power: 4000, hours: 4, count: 1 },
      { id: 'app2', name: 'كمبروسر هواء', power: 2000, hours: 6, count: 1 },
      { id: 'app3', name: 'آلات قطع', power: 1500, hours: 5, count: 2 },
      { id: 'app4', name: 'إضاءة', power: 100, hours: 10, count: 5 }
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة مياه',
    appliances: [
      { id: 'app1', name: 'مضخة مياه رئيسية', power: 3000, hours: 8, count: 1 }
    ]
  },
  {
    id: 'donkey_pump',
    name: 'دونكي',
    appliances: [
      { id: 'app1', name: 'محرك سحب/مضخة', power: 1500, hours: 6, count: 1 }
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    appliances: [
      { id: 'app1', name: 'مكيف', power: 1500, hours: 6, count: 4 },
      { id: 'app2', name: 'مكبر صوت', power: 200, hours: 2, count: 1 },
      { id: 'app3', name: 'إضاءة', power: 40, hours: 8, count: 20 }
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    appliances: [
      { id: 'app1', name: 'ماكينة طباعة رئيسية', power: 5000, hours: 12, count: 1 },
      { id: 'app2', name: 'ماكينة قص/تجليد', power: 2000, hours: 6, count: 1 },
      { id: 'app3', name: 'أجهزة كمبيوتر', power: 300, hours: 12, count: 4 },
      { id: 'app4', name: 'تكييف', power: 1500, hours: 12, count: 2 }
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    appliances: [
      { id: 'app1', name: 'ماكينة قهوة اسبريسو', power: 3000, hours: 14, count: 1 },
      { id: 'app2', name: 'ثلاجة عرض', power: 600, hours: 24, count: 1 },
      { id: 'app3', name: 'مكيف', power: 1500, hours: 14, count: 2 },
      { id: 'app4', name: 'إضاءة ديكور', power: 100, hours: 14, count: 10 }
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    appliances: [
      { id: 'app1', name: 'ثلاجات/فريزرات', power: 800, hours: 24, count: 4 },
      { id: 'app2', name: 'أفران/معدات طبخ', power: 4000, hours: 12, count: 2 },
      { id: 'app3', name: 'تكييف', power: 2000, hours: 14, count: 3 },
      { id: 'app4', name: 'إضاءة', power: 50, hours: 14, count: 20 }
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    appliances: [
      { id: 'app1', name: 'مكيفات غرف', power: 1200, hours: 12, count: 20 },
      { id: 'app2', name: 'سخان مياه', power: 1500, hours: 4, count: 20 },
      { id: 'app3', name: 'إضاءة مبنى', power: 20, hours: 12, count: 100 },
      { id: 'app4', name: 'معدات مطبخ/غسيل', power: 5000, hours: 8, count: 2 }
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    appliances: [
      { id: 'app1', name: 'أجهزة كمبيوتر/سيرفرات', power: 300, hours: 10, count: 30 },
      { id: 'app2', name: 'تكييف مركزي/مكيفات', power: 10000, hours: 10, count: 1 },
      { id: 'app3', name: 'صراف آلي (ATM)', power: 500, hours: 24, count: 2 },
      { id: 'app4', name: 'إضاءة', power: 40, hours: 10, count: 50 }
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    appliances: [
      { id: 'app1', name: 'ثلاجات عرض', power: 1500, hours: 24, count: 8 },
      { id: 'app2', name: 'تكييف', power: 2000, hours: 16, count: 4 },
      { id: 'app3', name: 'أجهزة الكاشير', power: 200, hours: 16, count: 3 },
      { id: 'app4', name: 'إضاءة ساطعة', power: 50, hours: 16, count: 40 }
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    appliances: [
      { id: 'app1', name: 'مضخات وقود', power: 1000, hours: 10, count: 4 },
      { id: 'app2', name: 'إضاءة المظلة', power: 200, hours: 12, count: 10 },
      { id: 'app3', name: 'ثلاجة البقالة', power: 600, hours: 24, count: 2 }
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    appliances: [
      { id: 'app1', name: 'آلات طحن/تكسير', power: 20000, hours: 12, count: 2 },
      { id: 'app2', name: 'مضخات مياه كبيرة', power: 5000, hours: 12, count: 2 },
      { id: 'app3', name: 'إضاءة كاشفة', power: 1000, hours: 12, count: 10 },
      { id: 'app4', name: 'معدات سكن العمال', power: 3000, hours: 12, count: 1 }
    ]
  }
];

export const getFacilityTypes = () => {
  return FACILITY_TYPES.map(facility => ({
    ...facility,
    appliances: facility.appliances.map(app => ({ ...app })) // Deep copy appliances
  }));
};

/**
 * Calculates the total daily consumption in Watt-hours (Wh)
 * @param {Array} appliances - Array of appliance objects { power, hours, count }
 * @returns {number} Total Wh per day
 */
export const calculateTotalConsumption = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (Number(app.power) * Number(app.hours) * Number(app.count));
  }, 0);
};

/**
 * Calculates the recommended solar panel system size (kW)
 * Assumes an average of 5 hours of peak sun and a 20% system loss factor.
 * @param {number} dailyConsumptionWh - Total daily consumption in Wh
 * @returns {number} Required solar array size in kilowatts (kW)
 */
export const calculateSystemSize = (dailyConsumptionWh) => {
  const peakSunHours = 5;
  const efficiencyLossFactor = 1.2; // 20% loss
  const requiredWhFromPanels = dailyConsumptionWh * efficiencyLossFactor;
  const systemSizeW = requiredWhFromPanels / peakSunHours;
  return Number((systemSizeW / 1000).toFixed(2)); // Return in kW
};

/**
 * Calculates the required battery capacity in Amp-hours (Ah) for a given system voltage.
 * Assumes 1 day of autonomy and a 50% depth of discharge (DoD) for lead-acid/gel batteries.
 * @param {number} dailyConsumptionWh - Total daily consumption in Wh
 * @param {number} systemVoltage - Battery bank voltage (e.g., 12, 24, 48)
 * @returns {number} Required battery capacity in Ah
 */
export const calculateBatteryCapacity = (dailyConsumptionWh, systemVoltage = 48) => {
  const depthOfDischarge = 0.5; // 50% max discharge
  const requiredWh = dailyConsumptionWh / depthOfDischarge;
  const capacityAh = requiredWh / systemVoltage;
  return Number(capacityAh.toFixed(0));
};

export const calculateInverterSize = (appliances) => {
  // Peak power is simply the sum of all appliances if they run simultaneously
  // A safety margin of 25% is added
  const peakPower = appliances.reduce((total, app) => {
    return total + (Number(app.power) * Number(app.count));
  }, 0);
  const safetyMargin = 1.25;
  return Number(((peakPower * safetyMargin) / 1000).toFixed(2)); // Return in kW
}
