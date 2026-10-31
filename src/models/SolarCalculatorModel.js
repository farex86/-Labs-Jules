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

export const FACILITY_APPLIANCES = {
  ice_factory: [
    { id: '1', name: 'ماكينة ثلج', power: 5000, quantity: 2, hours: 24 },
    { id: '2', name: 'إضاءة', power: 40, quantity: 10, hours: 12 },
    { id: '3', name: 'مكيف', power: 1500, quantity: 1, hours: 12 }
  ],
  company: [
    { id: '1', name: 'أجهزة كمبيوتر', power: 250, quantity: 10, hours: 8 },
    { id: '2', name: 'إضاءة', power: 40, quantity: 20, hours: 8 },
    { id: '3', name: 'مكيفات', power: 1500, quantity: 4, hours: 8 },
    { id: '4', name: 'طابعة', power: 500, quantity: 2, hours: 2 },
    { id: '5', name: 'ثلاجة صغيرة', power: 150, quantity: 1, hours: 24 }
  ],
  farm: [
    { id: '1', name: 'مضخة مياه', power: 2200, quantity: 1, hours: 6 },
    { id: '2', name: 'إضاءة', power: 40, quantity: 5, hours: 12 },
    { id: '3', name: 'ثلاجة', power: 200, quantity: 1, hours: 24 }
  ],
  poultry_farm: [
    { id: '1', name: 'مراوح', power: 750, quantity: 4, hours: 24 },
    { id: '2', name: 'إضاءة', power: 40, quantity: 20, hours: 16 },
    { id: '3', name: 'دفايات', power: 2000, quantity: 2, hours: 12 },
    { id: '4', name: 'فقاسات', power: 1000, quantity: 2, hours: 24 }
  ],
  greenhouses: [
    { id: '1', name: 'مراوح', power: 750, quantity: 4, hours: 12 },
    { id: '2', name: 'مضخة مياه', power: 1500, quantity: 1, hours: 4 },
    { id: '3', name: 'إضاءة', power: 40, quantity: 10, hours: 12 }
  ],
  factory: [
    { id: '1', name: 'آلات إنتاج', power: 10000, quantity: 3, hours: 12 },
    { id: '2', name: 'إضاءة', power: 100, quantity: 30, hours: 12 },
    { id: '3', name: 'مكيفات', power: 2000, quantity: 5, hours: 12 }
  ],
  clinic: [
    { id: '1', name: 'إضاءة', power: 40, quantity: 15, hours: 12 },
    { id: '2', name: 'مكيفات', power: 1500, quantity: 5, hours: 12 },
    { id: '3', name: 'أجهزة طبية', power: 1000, quantity: 3, hours: 6 },
    { id: '4', name: 'ثلاجة أدوية', power: 200, quantity: 2, hours: 24 }
  ],
  hospital: [
    { id: '1', name: 'إضاءة', power: 40, quantity: 100, hours: 24 },
    { id: '2', name: 'مكيفات', power: 2000, quantity: 20, hours: 24 },
    { id: '3', name: 'أجهزة طبية', power: 2000, quantity: 15, hours: 12 },
    { id: '4', name: 'ثلاجات', power: 300, quantity: 10, hours: 24 }
  ],
  bakery: [
    { id: '1', name: 'عجانة', power: 3000, quantity: 2, hours: 8 },
    { id: '2', name: 'إضاءة', power: 40, quantity: 10, hours: 12 },
    { id: '3', name: 'مراوح', power: 100, quantity: 4, hours: 12 },
    { id: '4', name: 'ثلاجة', power: 300, quantity: 1, hours: 24 }
  ],
  shop: [
    { id: '1', name: 'ثلاجة', power: 300, quantity: 2, hours: 24 },
    { id: '2', name: 'إضاءة', power: 40, quantity: 5, hours: 12 },
    { id: '3', name: 'مروحة', power: 75, quantity: 1, hours: 12 }
  ],
  workshop: [
    { id: '1', name: 'معدات لحام', power: 5000, quantity: 1, hours: 4 },
    { id: '2', name: 'إضاءة', power: 100, quantity: 5, hours: 10 },
    { id: '3', name: 'مراوح', power: 150, quantity: 2, hours: 10 },
    { id: '4', name: 'صاروخ قص', power: 2000, quantity: 2, hours: 3 }
  ],
  water_pump: [
    { id: '1', name: 'مضخة مياه', power: 3000, quantity: 1, hours: 8 }
  ],
  donkey: [
    { id: '1', name: 'مضخة غاطسة', power: 1500, quantity: 1, hours: 6 },
    { id: '2', name: 'إضاءة', power: 40, quantity: 2, hours: 12 }
  ],
  mosque: [
    { id: '1', name: 'مكيفات', power: 2000, quantity: 6, hours: 6 },
    { id: '2', name: 'مراوح', power: 75, quantity: 10, hours: 6 },
    { id: '3', name: 'إضاءة', power: 40, quantity: 15, hours: 6 },
    { id: '4', name: 'مكبر صوت', power: 100, quantity: 1, hours: 3 }
  ],
  printing_press: [
    { id: '1', name: 'آلات طباعة', power: 3000, quantity: 2, hours: 10 },
    { id: '2', name: 'أجهزة كمبيوتر', power: 250, quantity: 4, hours: 10 },
    { id: '3', name: 'مكيفات', power: 1500, quantity: 2, hours: 10 },
    { id: '4', name: 'إضاءة', power: 60, quantity: 10, hours: 10 }
  ],
  coffee_shop: [
    { id: '1', name: 'ماكينة قهوة', power: 2500, quantity: 1, hours: 12 },
    { id: '2', name: 'ثلاجة', power: 300, quantity: 2, hours: 24 },
    { id: '3', name: 'مكيف', power: 1500, quantity: 2, hours: 12 },
    { id: '4', name: 'إضاءة', power: 40, quantity: 15, hours: 12 }
  ],
  restaurant: [
    { id: '1', name: 'ثلاجات', power: 500, quantity: 3, hours: 24 },
    { id: '2', name: 'إضاءة', power: 40, quantity: 20, hours: 12 },
    { id: '3', name: 'مكيفات', power: 2000, quantity: 4, hours: 12 },
    { id: '4', name: 'شفاطات', power: 500, quantity: 2, hours: 12 }
  ],
  hotel: [
    { id: '1', name: 'مكيفات', power: 1500, quantity: 30, hours: 12 },
    { id: '2', name: 'إضاءة', power: 40, quantity: 100, hours: 12 },
    { id: '3', name: 'ثلاجات', power: 150, quantity: 30, hours: 24 },
    { id: '4', name: 'مصاعد', power: 5000, quantity: 1, hours: 12 }
  ],
  bank: [
    { id: '1', name: 'أجهزة كمبيوتر', power: 250, quantity: 20, hours: 10 },
    { id: '2', name: 'إضاءة', power: 40, quantity: 50, hours: 10 },
    { id: '3', name: 'مكيفات', power: 2000, quantity: 5, hours: 10 },
    { id: '4', name: 'ماكينة صراف آلي', power: 500, quantity: 2, hours: 24 }
  ],
  supermarket: [
    { id: '1', name: 'ثلاجات عرض', power: 800, quantity: 5, hours: 24 },
    { id: '2', name: 'مكيفات', power: 2000, quantity: 4, hours: 16 },
    { id: '3', name: 'إضاءة', power: 40, quantity: 30, hours: 16 },
    { id: '4', name: 'كاشير', power: 150, quantity: 3, hours: 16 }
  ],
  gas_station: [
    { id: '1', name: 'طلمبات وقود', power: 1500, quantity: 4, hours: 24 },
    { id: '2', name: 'إضاءة', power: 100, quantity: 15, hours: 12 },
    { id: '3', name: 'ثلاجة', power: 300, quantity: 1, hours: 24 }
  ],
  mining_company: [
    { id: '1', name: 'معدات ثقيلة', power: 15000, quantity: 2, hours: 12 },
    { id: '2', name: 'إضاءة كاشفة', power: 500, quantity: 10, hours: 12 },
    { id: '3', name: 'مكيفات', power: 1500, quantity: 5, hours: 12 }
  ]
};

/**
 * Calculates the total daily energy consumption.
 * @param {Array} appliances - List of appliance objects { power, quantity, hours }.
 * @returns {number} Total Daily Energy in Watt-hours (Wh).
 */
export const calculateDailyEnergy = (appliances) => {
  return appliances.reduce((total, appliance) => {
    return total + (appliance.power * appliance.quantity * appliance.hours);
  }, 0);
};

/**
 * Estimates the required solar system size based on daily energy consumption.
 * Assumes a conservative 4 peak sun hours and 80% system efficiency.
 * @param {number} dailyEnergyWh - Total Daily Energy in Watt-hours (Wh).
 * @returns {number} Estimated System Size in kiloWatts (kW).
 */
export const calculateSystemSize = (dailyEnergyWh) => {
  const PEAK_SUN_HOURS = 4;
  const SYSTEM_EFFICIENCY = 0.8;
  const requiredEnergyWh = dailyEnergyWh / SYSTEM_EFFICIENCY;
  const systemSizeW = requiredEnergyWh / PEAK_SUN_HOURS;
  return systemSizeW / 1000; // Convert to kW
};
