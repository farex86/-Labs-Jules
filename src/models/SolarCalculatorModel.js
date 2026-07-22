export const FACILITY_TYPES = [
  { id: 'ice_factory', label: 'مصنع ثلج' },
  { id: 'company', label: 'شركة' },
  { id: 'farm', label: 'مزرعة' },
  { id: 'poultry_farm', label: 'مزرعة دواجن' },
  { id: 'greenhouse', label: 'بيوت محمية' },
  { id: 'factory', label: 'مصنع' },
  { id: 'clinic', label: 'مستوصف' },
  { id: 'hospital', label: 'مستشفى' },
  { id: 'bakery', label: 'مخبز' },
  { id: 'shop', label: 'دكان' },
  { id: 'workshop', label: 'ورشة' },
  { id: 'water_pump', label: 'مضخة مياه' },
  { id: 'donkey', label: 'دونكي (مضخة)' },
  { id: 'mosque', label: 'مسجد' },
  { id: 'printing_press', label: 'مطبعة' },
  { id: 'coffee_shop', label: 'كوفي شوب' },
  { id: 'restaurant', label: 'مطعم' },
  { id: 'hotel', label: 'فندق' },
  { id: 'bank', label: 'بنك' },
  { id: 'supermarket', label: 'سوبر ماركت' },
  { id: 'gas_station', label: 'طرمبة وقود' },
  { id: 'mining_company', label: 'شركة تعدين' }
];

export const APPLIANCES_BY_FACILITY = {
  ice_factory: [
    { id: '1', name: 'آلة صنع الثلج', power: 5000, hours: 24, quantity: 2 },
    { id: '2', name: 'إضاءة', power: 100, hours: 12, quantity: 10 },
    { id: '3', name: 'مكيف', power: 1500, hours: 8, quantity: 1 }
  ],
  company: [
    { id: '1', name: 'أجهزة كمبيوتر', power: 250, hours: 10, quantity: 10 },
    { id: '2', name: 'إضاءة', power: 40, hours: 10, quantity: 20 },
    { id: '3', name: 'مكيفات', power: 1500, hours: 10, quantity: 4 },
    { id: '4', name: 'طابعة', power: 500, hours: 2, quantity: 2 }
  ],
  farm: [
    { id: '1', name: 'مضخة غاطسة', power: 3000, hours: 6, quantity: 1 },
    { id: '2', name: 'إضاءة خارجية', power: 100, hours: 12, quantity: 5 }
  ],
  poultry_farm: [
    { id: '1', name: 'مراوح تهوية', power: 500, hours: 24, quantity: 4 },
    { id: '2', name: 'إضاءة', power: 40, hours: 24, quantity: 20 },
    { id: '3', name: 'نظام تدفئة', power: 2000, hours: 12, quantity: 2 }
  ],
  greenhouse: [
    { id: '1', name: 'مضخة ري', power: 1500, hours: 4, quantity: 1 },
    { id: '2', name: 'مراوح تبريد', power: 750, hours: 8, quantity: 2 },
    { id: '3', name: 'إضاءة نمو', power: 200, hours: 6, quantity: 10 }
  ],
  factory: [
    { id: '1', name: 'آلات إنتاج', power: 10000, hours: 16, quantity: 2 },
    { id: '2', name: 'إضاءة صناعية', power: 200, hours: 16, quantity: 20 },
    { id: '3', name: 'مكيفات مركزية', power: 5000, hours: 16, quantity: 2 }
  ],
  clinic: [
    { id: '1', name: 'إضاءة', power: 40, hours: 12, quantity: 15 },
    { id: '2', name: 'مكيفات', power: 1500, hours: 12, quantity: 5 },
    { id: '3', name: 'أجهزة طبية صغيرة', power: 500, hours: 6, quantity: 4 },
    { id: '4', name: 'ثلاجة أدوية', power: 300, hours: 24, quantity: 1 }
  ],
  hospital: [
    { id: '1', name: 'مكيفات مركزية', power: 10000, hours: 24, quantity: 4 },
    { id: '2', name: 'إضاءة', power: 40, hours: 24, quantity: 100 },
    { id: '3', name: 'أجهزة طبية (أشعة، الخ)', power: 5000, hours: 8, quantity: 3 },
    { id: '4', name: 'ثلاجات بنك الدم', power: 800, hours: 24, quantity: 2 }
  ],
  bakery: [
    { id: '1', name: 'فرن كهربائي', power: 8000, hours: 10, quantity: 2 },
    { id: '2', name: 'عجانة', power: 3000, hours: 6, quantity: 1 },
    { id: '3', name: 'إضاءة', power: 40, hours: 12, quantity: 10 }
  ],
  shop: [
    { id: '1', name: 'إضاءة', power: 40, hours: 12, quantity: 5 },
    { id: '2', name: 'مروحة سقف', power: 75, hours: 12, quantity: 2 },
    { id: '3', name: 'ثلاجة عرض صغيرة', power: 300, hours: 24, quantity: 1 }
  ],
  workshop: [
    { id: '1', name: 'ماكينة لحام', power: 4000, hours: 4, quantity: 1 },
    { id: '2', name: 'صاروخ / مثقاب', power: 800, hours: 4, quantity: 3 },
    { id: '3', name: 'إضاءة', power: 100, hours: 10, quantity: 5 }
  ],
  water_pump: [
    { id: '1', name: 'مضخة مياه سطحية', power: 1500, hours: 6, quantity: 1 }
  ],
  donkey: [
    { id: '1', name: 'مضخة مياه بئر غاطسة', power: 5500, hours: 8, quantity: 1 }
  ],
  mosque: [
    { id: '1', name: 'مكيفات', power: 2000, hours: 6, quantity: 6 },
    { id: '2', name: 'إضاءة', power: 40, hours: 8, quantity: 20 },
    { id: '3', name: 'مكبرات صوت', power: 200, hours: 4, quantity: 1 },
    { id: '4', name: 'مراوح', power: 80, hours: 8, quantity: 10 }
  ],
  printing_press: [
    { id: '1', name: 'ماكينة طباعة', power: 5000, hours: 8, quantity: 2 },
    { id: '2', name: 'مكيفات', power: 2000, hours: 10, quantity: 2 },
    { id: '3', name: 'إضاءة', power: 100, hours: 10, quantity: 10 }
  ],
  coffee_shop: [
    { id: '1', name: 'ماكينة اسبريسو', power: 3500, hours: 12, quantity: 1 },
    { id: '2', name: 'خلاط', power: 1000, hours: 4, quantity: 2 },
    { id: '3', name: 'مكيفات', power: 2000, hours: 16, quantity: 2 },
    { id: '4', name: 'إضاءة ديكور', power: 500, hours: 16, quantity: 1 }
  ],
  restaurant: [
    { id: '1', name: 'ثلاجات حفظ', power: 1000, hours: 24, quantity: 4 },
    { id: '2', name: 'شفاط هواء', power: 500, hours: 12, quantity: 2 },
    { id: '3', name: 'مكيفات', power: 2500, hours: 14, quantity: 4 },
    { id: '4', name: 'إضاءة', power: 40, hours: 14, quantity: 30 }
  ],
  hotel: [
    { id: '1', name: 'مكيفات الغرف', power: 1200, hours: 12, quantity: 50 },
    { id: '2', name: 'إضاءة', power: 40, hours: 12, quantity: 100 },
    { id: '3', name: 'مصاعد', power: 10000, hours: 4, quantity: 2 },
    { id: '4', name: 'غسالات ومجففات', power: 3000, hours: 8, quantity: 4 }
  ],
  bank: [
    { id: '1', name: 'أجهزة كمبيوتر', power: 250, hours: 10, quantity: 30 },
    { id: '2', name: 'مكيفات مركزية', power: 10000, hours: 10, quantity: 2 },
    { id: '3', name: 'إضاءة', power: 40, hours: 10, quantity: 50 },
    { id: '4', name: 'صراف آلي (ATM)', power: 300, hours: 24, quantity: 3 }
  ],
  supermarket: [
    { id: '1', name: 'ثلاجات عرض', power: 1200, hours: 24, quantity: 10 },
    { id: '2', name: 'فريزرات', power: 1500, hours: 24, quantity: 5 },
    { id: '3', name: 'مكيفات', power: 2500, hours: 16, quantity: 4 },
    { id: '4', name: 'إضاءة', power: 40, hours: 16, quantity: 40 }
  ],
  gas_station: [
    { id: '1', name: 'مضخات وقود', power: 1000, hours: 24, quantity: 6 },
    { id: '2', name: 'إضاءة مظلة', power: 200, hours: 12, quantity: 10 },
    { id: '3', name: 'سوبر ماركت صغير', power: 3000, hours: 24, quantity: 1 }
  ],
  mining_company: [
    { id: '1', name: 'كسارات / طواحين', power: 50000, hours: 16, quantity: 2 },
    { id: '2', name: 'مضخات مياه كبيرة', power: 15000, hours: 12, quantity: 2 },
    { id: '3', name: 'إضاءة كاشفة', power: 1000, hours: 12, quantity: 10 },
    { id: '4', name: 'مكيفات كرفانات', power: 1500, hours: 12, quantity: 10 }
  ]
};

// Default appliances for empty state
export const DEFAULT_APPLIANCES = [
  { id: '1', name: 'إضاءة', power: 40, hours: 6, quantity: 5 },
  { id: '2', name: 'تلفزيون', power: 100, hours: 5, quantity: 1 },
  { id: '3', name: 'ثلاجة', power: 200, hours: 24, quantity: 1 },
  { id: '4', name: 'مروحة', power: 75, hours: 8, quantity: 2 }
];

/**
 * Calculates total daily energy consumption in Watt-hours (Wh)
 */
export const calculateDailyEnergy = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (app.power * app.hours * app.quantity);
  }, 0);
};

/**
 * Calculates total instant power (peak wattage) in Watts (W)
 */
export const calculatePeakPower = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (app.power * app.quantity);
  }, 0);
};

/**
 * Calculates recommended Solar System Size (kW)
 * Assumes an average of 5 hours of peak sun and a system efficiency of 80% (0.8)
 */
export const calculateSystemSize = (dailyEnergyWh) => {
  const peakSunHours = 5;
  const efficiency = 0.8;
  const systemSizeW = dailyEnergyWh / (peakSunHours * efficiency);
  return systemSizeW / 1000; // Convert to kW
};

/**
 * Calculates recommended Battery Storage Size (kWh)
 * Assumes a 1-day autonomy and 50% Depth of Discharge (DoD) for Lead-Acid / GEL batteries
 * or adjusted for Lithium if needed (we'll stick to a generic safe 50% DoD standard or 80% for Lithium)
 * We'll use 80% DoD typical for Lithium and 90% inverter efficiency.
 */
export const calculateBatteryStorage = (dailyEnergyWh) => {
  const depthOfDischarge = 0.8;
  const inverterEfficiency = 0.9;
  const batteryStorageWh = dailyEnergyWh / (depthOfDischarge * inverterEfficiency);
  return batteryStorageWh / 1000; // Convert to kWh
};

/**
 * Calculates recommended Inverter Size (kW)
 * Usually sized 20-25% larger than the peak power to handle surge loads
 */
export const calculateInverterSize = (peakPowerW) => {
  const safetyFactor = 1.25;
  const inverterSizeW = peakPowerW * safetyFactor;
  return inverterSizeW / 1000; // Convert to kW
};
