export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع ثلج' },
  { id: 'company', name: 'شركة' },
  { id: 'farm', name: 'مزرعة' },
  { id: 'poultry_farm', name: 'مزرعة دواجن' },
  { id: 'greenhouse', name: 'بيوت محمية' },
  { id: 'factory', name: 'مصنع' },
  { id: 'clinic', name: 'مستوصف' },
  { id: 'hospital', name: 'مستشفى' },
  { id: 'bakery', name: 'مخبز' },
  { id: 'shop', name: 'دكان' },
  { id: 'workshop', name: 'ورشة' },
  { id: 'water_pump', name: 'مضخة مياه' },
  { id: 'water_station', name: 'دونكي' },
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
  ice_factory: [
    { id: 'd_1', name: 'ماكينة صنع ثلج', power: 5000, quantity: 2, hours: 24 },
    { id: 'd_2', name: 'غرفة تبريد', power: 3000, quantity: 1, hours: 24 },
    { id: 'd_3', name: 'إضاءة', power: 50, quantity: 10, hours: 12 },
  ],
  company: [
    { id: 'd_1', name: 'مكيف هواء', power: 1500, quantity: 5, hours: 8 },
    { id: 'd_2', name: 'حاسوب', power: 250, quantity: 10, hours: 8 },
    { id: 'd_3', name: 'إضاءة', power: 40, quantity: 20, hours: 8 },
    { id: 'd_4', name: 'طابعة', power: 500, quantity: 1, hours: 2 },
  ],
  farm: [
    { id: 'd_1', name: 'مضخة مياه زراعية', power: 3000, quantity: 1, hours: 6 },
    { id: 'd_2', name: 'إضاءة محيطة', power: 100, quantity: 5, hours: 12 },
  ],
  poultry_farm: [
    { id: 'd_1', name: 'مراوح تهوية', power: 500, quantity: 10, hours: 24 },
    { id: 'd_2', name: 'دفايات', power: 2000, quantity: 5, hours: 12 },
    { id: 'd_3', name: 'نظام تغذية آلي', power: 1000, quantity: 2, hours: 4 },
    { id: 'd_4', name: 'إضاءة', power: 40, quantity: 20, hours: 16 },
  ],
  greenhouse: [
    { id: 'd_1', name: 'مراوح تهوية', power: 500, quantity: 4, hours: 12 },
    { id: 'd_2', name: 'مضخة ري', power: 1000, quantity: 1, hours: 4 },
    { id: 'd_3', name: 'نظام تبريد صحراوي', power: 1500, quantity: 2, hours: 10 },
  ],
  factory: [
    { id: 'd_1', name: 'محركات صناعية', power: 10000, quantity: 3, hours: 12 },
    { id: 'd_2', name: 'إضاءة صناعية', power: 200, quantity: 20, hours: 12 },
    { id: 'd_3', name: 'نظام تبريد/تهوية', power: 5000, quantity: 2, hours: 12 },
  ],
  clinic: [
    { id: 'd_1', name: 'مكيف هواء', power: 1500, quantity: 4, hours: 12 },
    { id: 'd_2', name: 'معدات طبية (متنوعة)', power: 2000, quantity: 1, hours: 8 },
    { id: 'd_3', name: 'ثلاجة أدوية', power: 300, quantity: 2, hours: 24 },
    { id: 'd_4', name: 'إضاءة', power: 40, quantity: 15, hours: 12 },
  ],
  hospital: [
    { id: 'd_1', name: 'أجهزة طبية حيوية', power: 5000, quantity: 5, hours: 24 },
    { id: 'd_2', name: 'مكيفات مركزية', power: 10000, quantity: 3, hours: 24 },
    { id: 'd_3', name: 'ثلاجات بنك الدم والأدوية', power: 1000, quantity: 5, hours: 24 },
    { id: 'd_4', name: 'إضاءة ومرافق', power: 2000, quantity: 1, hours: 24 },
  ],
  bakery: [
    { id: 'd_1', name: 'فرن كهربائي/ميكانيكي', power: 8000, quantity: 2, hours: 12 },
    { id: 'd_2', name: 'عجانة', power: 3000, quantity: 2, hours: 6 },
    { id: 'd_3', name: 'مراوح شفط', power: 1000, quantity: 2, hours: 12 },
    { id: 'd_4', name: 'إضاءة', power: 50, quantity: 10, hours: 12 },
  ],
  shop: [
    { id: 'd_1', name: 'ثلاجة عرض', power: 600, quantity: 2, hours: 24 },
    { id: 'd_2', name: 'مروحة سقف', power: 80, quantity: 2, hours: 14 },
    { id: 'd_3', name: 'إضاءة', power: 40, quantity: 4, hours: 14 },
  ],
  workshop: [
    { id: 'd_1', name: 'ماكينة لحام', power: 4000, quantity: 1, hours: 4 },
    { id: 'd_2', name: 'صاروخ / دريل', power: 1000, quantity: 3, hours: 4 },
    { id: 'd_3', name: 'كمبروسر هواء', power: 2500, quantity: 1, hours: 4 },
    { id: 'd_4', name: 'إضاءة', power: 100, quantity: 5, hours: 10 },
  ],
  water_pump: [
    { id: 'd_1', name: 'مضخة مياه سطحية / غاطسة', power: 2000, quantity: 1, hours: 8 },
  ],
  water_station: [
    { id: 'd_1', name: 'مضخة غاطسة (بير)', power: 5500, quantity: 1, hours: 10 },
    { id: 'd_2', name: 'مضخة رفع', power: 2200, quantity: 2, hours: 10 },
    { id: 'd_3', name: 'إضاءة', power: 50, quantity: 4, hours: 12 },
  ],
  mosque: [
    { id: 'd_1', name: 'مكيف هواء', power: 2000, quantity: 6, hours: 6 },
    { id: 'd_2', name: 'مراوح', power: 80, quantity: 15, hours: 6 },
    { id: 'd_3', name: 'نظام صوت', power: 300, quantity: 1, hours: 4 },
    { id: 'd_4', name: 'إضاءة', power: 40, quantity: 20, hours: 6 },
  ],
  printing_press: [
    { id: 'd_1', name: 'ماكينة طباعة', power: 5000, quantity: 2, hours: 10 },
    { id: 'd_2', name: 'ماكينة قص ورقة', power: 1500, quantity: 1, hours: 4 },
    { id: 'd_3', name: 'مكيف هواء', power: 2000, quantity: 2, hours: 10 },
    { id: 'd_4', name: 'حواسيب وإضاءة', power: 1000, quantity: 1, hours: 10 },
  ],
  coffee_shop: [
    { id: 'd_1', name: 'ماكينة اسبريسو', power: 3500, quantity: 1, hours: 16 },
    { id: 'd_2', name: 'مطحنة بن', power: 400, quantity: 2, hours: 4 },
    { id: 'd_3', name: 'ثلاجة عرض', power: 800, quantity: 2, hours: 24 },
    { id: 'd_4', name: 'مكيف هواء', power: 2000, quantity: 2, hours: 16 },
    { id: 'd_5', name: 'إضاءة ديكور', power: 200, quantity: 1, hours: 16 },
  ],
  restaurant: [
    { id: 'd_1', name: 'ثلاجات وتجميد', power: 2000, quantity: 3, hours: 24 },
    { id: 'd_2', name: 'مكيف هواء', power: 3000, quantity: 4, hours: 16 },
    { id: 'd_3', name: 'أفران كهربائية وميكروويف', power: 4000, quantity: 2, hours: 8 },
    { id: 'd_4', name: 'إضاءة ومراوح شفط', power: 1500, quantity: 1, hours: 16 },
  ],
  hotel: [
    { id: 'd_1', name: 'مكيفات غرف', power: 1500, quantity: 20, hours: 12 },
    { id: 'd_2', name: 'إضاءة ومرافق', power: 3000, quantity: 1, hours: 24 },
    { id: 'd_3', name: 'مصاعد', power: 7500, quantity: 1, hours: 8 },
    { id: 'd_4', name: 'ثلاجات وتلفزيونات', power: 150, quantity: 20, hours: 12 },
  ],
  bank: [
    { id: 'd_1', name: 'مكيف مركزي/سبليت', power: 3000, quantity: 6, hours: 10 },
    { id: 'd_2', name: 'حواسيب وأنظمة سيرفرات', power: 5000, quantity: 1, hours: 24 },
    { id: 'd_3', name: 'صراف آلي (ATM)', power: 800, quantity: 2, hours: 24 },
    { id: 'd_4', name: 'إضاءة', power: 50, quantity: 30, hours: 12 },
  ],
  supermarket: [
    { id: 'd_1', name: 'ثلاجات عرض منتجات', power: 1500, quantity: 5, hours: 24 },
    { id: 'd_2', name: 'ثلاجات تجميد (فريزر)', power: 2000, quantity: 3, hours: 24 },
    { id: 'd_3', name: 'مكيف هواء', power: 3000, quantity: 4, hours: 16 },
    { id: 'd_4', name: 'إضاءة ونقاط بيع', power: 1000, quantity: 1, hours: 16 },
  ],
  gas_station: [
    { id: 'd_1', name: 'مضخة وقود', power: 1000, quantity: 4, hours: 12 },
    { id: 'd_2', name: 'إضاءة سقفية قوية', power: 150, quantity: 10, hours: 12 },
    { id: 'd_3', name: 'مكيفات إدارة وماركت', power: 2000, quantity: 2, hours: 24 },
  ],
  mining_company: [
    { id: 'd_1', name: 'معدات استخلاص وطحن', power: 15000, quantity: 2, hours: 16 },
    { id: 'd_2', name: 'مضخات مياه ضخمة', power: 7500, quantity: 2, hours: 12 },
    { id: 'd_3', name: 'أنظمة تهوية', power: 5000, quantity: 4, hours: 24 },
    { id: 'd_4', name: 'إضاءة ومرافق عمال', power: 4000, quantity: 1, hours: 24 },
  ]
};

/**
 * Calculate the total daily energy consumption (Wh)
 * @param {Array} devices - Array of device objects { power, quantity, hours }
 * @returns {number} Total Wh per day
 */
export const calculateTotalDailyConsumption = (devices) => {
  return devices.reduce((total, device) => {
    return total + (Number(device.power) * Number(device.quantity) * Number(device.hours));
  }, 0);
};

/**
 * Recommend system size based on total consumption
 * @param {number} totalDailyWh
 * @returns {Object} Recommendation containing required solar panels (W) and battery capacity (Wh)
 */
export const calculateSystemRequirements = (totalDailyWh) => {
  const peakSunHours = 5;
  const efficiencyFactor = 0.8;

  const requiredSolarArray = totalDailyWh / (peakSunHours * efficiencyFactor);
  const requiredBatteryCapacity = totalDailyWh * 2; // Roughly 1 day autonomy at 50% DoD

  return {
    solarArrayW: Math.ceil(requiredSolarArray),
    solarArrayKW: (requiredSolarArray / 1000).toFixed(2),
    batteryCapacityWh: Math.ceil(requiredBatteryCapacity),
    batteryCapacityKWh: (requiredBatteryCapacity / 1000).toFixed(2),
    dailyConsumptionKWh: (totalDailyWh / 1000).toFixed(2)
  };
};

/**
 * Calculate the max simultaneous load and inverter size
 * @param {Array} devices
 * @returns {Object} Max load and inverter size
 */
export const calculateMaxSimultaneousLoad = (devices) => {
    const maxLoad = devices.reduce((total, device) => {
        return total + (Number(device.power) * Number(device.quantity));
    }, 0);

    const inverterSize = maxLoad * 1.2; // 20% safety margin

    return {
        maxLoadW: Math.ceil(maxLoad),
        maxLoadKW: (maxLoad / 1000).toFixed(2),
        inverterSizeW: Math.ceil(inverterSize),
        inverterSizeKW: (inverterSize / 1000).toFixed(2)
    };
};
