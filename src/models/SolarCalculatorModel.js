// Constant Data and Business Logic for the Solar Calculator

export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع ثلج', icon: 'snowflake' },
  { id: 'company', name: 'شركة', icon: 'building' },
  { id: 'farm', name: 'مزرعة', icon: 'tractor' },
  { id: 'poultry_farm', name: 'مزرعة دواجن', icon: 'bird' },
  { id: 'greenhouse', name: 'بيوت محمية', icon: 'leaf' },
  { id: 'factory', name: 'مصنع', icon: 'factory' },
  { id: 'clinic', name: 'مستوصف', icon: 'stethoscope' },
  { id: 'hospital', name: 'مستشفى', icon: 'hospital' },
  { id: 'bakery', name: 'مخبز', icon: 'croissant' },
  { id: 'shop', name: 'دكان', icon: 'store' },
  { id: 'workshop', name: 'ورشة', icon: 'wrench' },
  { id: 'water_pump', name: 'مضخة مياه', icon: 'droplet' },
  { id: 'donkey', name: 'دونكي (محطة مياه)', icon: 'waves' },
  { id: 'mosque', name: 'مسجد', icon: 'moon' },
  { id: 'printing_press', name: 'مطبعة', icon: 'printer' },
  { id: 'coffee_shop', name: 'كوفي شوب', icon: 'coffee' },
  { id: 'restaurant', name: 'مطعم', icon: 'utensils' },
  { id: 'hotel', name: 'فندق', icon: 'hotel' },
  { id: 'bank', name: 'بنك', icon: 'landmark' },
  { id: 'supermarket', name: 'سوبر ماركت', icon: 'shopping-cart' },
  { id: 'gas_station', name: 'طرمبة وقود', icon: 'fuel' },
  { id: 'mining_company', name: 'شركة تعدين', icon: 'pickaxe' }
];

// Common appliances to show by default per facility
export const DEFAULT_APPLIANCES_BY_FACILITY = {
  ice_factory: [
    { id: 'ice_maker', name: 'ماكينة صنع الثلج', power: 5000, qty: 2, hours: 24 },
    { id: 'freezer_room', name: 'غرفة تجميد', power: 3000, qty: 1, hours: 24 },
    { id: 'lights', name: 'إضاءة', power: 50, qty: 10, hours: 12 },
  ],
  company: [
    { id: 'ac', name: 'مكيف هواء', power: 1500, qty: 4, hours: 10 },
    { id: 'pc', name: 'حاسب آلي', power: 250, qty: 10, hours: 10 },
    { id: 'printer', name: 'طابعة', power: 500, qty: 2, hours: 2 },
    { id: 'lights', name: 'إضاءة', power: 40, qty: 20, hours: 10 },
  ],
  farm: [
    { id: 'water_pump', name: 'مضخة مياه غاطسة', power: 3000, qty: 1, hours: 8 },
    { id: 'lights', name: 'إضاءة', power: 50, qty: 5, hours: 12 },
  ],
  poultry_farm: [
    { id: 'ventilation', name: 'مراوح تهوية', power: 750, qty: 6, hours: 24 },
    { id: 'feeder', name: 'معالف آلية', power: 500, qty: 2, hours: 6 },
    { id: 'lights', name: 'إضاءة', power: 40, qty: 15, hours: 16 },
    { id: 'heater', name: 'دفاية', power: 2000, qty: 4, hours: 12 },
  ],
  greenhouse: [
    { id: 'cooling_pad', name: 'نظام تبريد (مضخة + مراوح)', power: 1500, qty: 2, hours: 12 },
    { id: 'irrigation', name: 'مضخة ري', power: 1000, qty: 1, hours: 4 },
  ],
  factory: [
    { id: 'motor', name: 'محركات صناعية', power: 7500, qty: 3, hours: 12 },
    { id: 'lights', name: 'إضاءة كشافة', power: 200, qty: 10, hours: 12 },
  ],
  clinic: [
    { id: 'ac', name: 'مكيف', power: 1500, qty: 3, hours: 12 },
    { id: 'fridge', name: 'ثلاجة أدوية', power: 300, qty: 2, hours: 24 },
    { id: 'lights', name: 'إضاءة', power: 40, qty: 15, hours: 12 },
    { id: 'medical_eq', name: 'أجهزة طبية صغيرة', power: 500, qty: 3, hours: 6 },
  ],
  hospital: [
    { id: 'ac', name: 'مكيف مركزي/وحدات', power: 2000, qty: 20, hours: 24 },
    { id: 'medical_eq', name: 'أجهزة طبية (أشعة، وغيرها)', power: 5000, qty: 5, hours: 8 },
    { id: 'fridge', name: 'ثلاجات حفظ', power: 500, qty: 5, hours: 24 },
    { id: 'lights', name: 'إضاءة', power: 50, qty: 100, hours: 24 },
    { id: 'elevator', name: 'مصعد', power: 7500, qty: 2, hours: 24 },
  ],
  bakery: [
    { id: 'oven', name: 'فرن كهربائي', power: 6000, qty: 2, hours: 16 },
    { id: 'mixer', name: 'عجانة', power: 2000, qty: 2, hours: 8 },
    { id: 'fridge', name: 'ثلاجة/فريزر', power: 1000, qty: 2, hours: 24 },
    { id: 'lights', name: 'إضاءة', power: 50, qty: 10, hours: 16 },
  ],
  shop: [
    { id: 'fridge', name: 'ثلاجة عرض', power: 800, qty: 2, hours: 24 },
    { id: 'freezer', name: 'فريزر', power: 600, qty: 1, hours: 24 },
    { id: 'ac', name: 'مكيف', power: 1500, qty: 1, hours: 12 },
    { id: 'lights', name: 'إضاءة', power: 40, qty: 6, hours: 14 },
  ],
  workshop: [
    { id: 'welder', name: 'ماكينة لحام', power: 4000, qty: 1, hours: 6 },
    { id: 'grinder', name: 'صاروخ/مجلخة', power: 1500, qty: 2, hours: 4 },
    { id: 'compressor', name: 'كمبروسر هواء', power: 2200, qty: 1, hours: 8 },
    { id: 'lights', name: 'إضاءة', power: 100, qty: 5, hours: 10 },
  ],
  water_pump: [
    { id: 'pump_large', name: 'مضخة مياه كبيرة', power: 5500, qty: 1, hours: 10 },
  ],
  donkey: [
    { id: 'pump_medium', name: 'مضخة غاطسة', power: 3000, qty: 1, hours: 12 },
  ],
  mosque: [
    { id: 'ac', name: 'مكيف', power: 1500, qty: 6, hours: 6 },
    { id: 'fans', name: 'مراوح', power: 80, qty: 10, hours: 8 },
    { id: 'lights', name: 'إضاءة', power: 40, qty: 20, hours: 6 },
    { id: 'sound', name: 'نظام صوتي', power: 300, qty: 1, hours: 3 },
  ],
  printing_press: [
    { id: 'printer_large', name: 'طابعة صناعية', power: 3000, qty: 2, hours: 10 },
    { id: 'cutter', name: 'مقص ورق كهربائي', power: 1500, qty: 1, hours: 5 },
    { id: 'ac', name: 'مكيف', power: 2000, qty: 2, hours: 10 },
    { id: 'lights', name: 'إضاءة', power: 60, qty: 15, hours: 12 },
  ],
  coffee_shop: [
    { id: 'espresso', name: 'ماكينة اسبريسو', power: 3500, qty: 1, hours: 16 },
    { id: 'grinder', name: 'طاحونة قهوة', power: 800, qty: 2, hours: 8 },
    { id: 'fridge', name: 'ثلاجة عرض/مشروبات', power: 600, qty: 3, hours: 24 },
    { id: 'ac', name: 'مكيف', power: 2000, qty: 2, hours: 16 },
    { id: 'lights', name: 'إضاءة', power: 40, qty: 15, hours: 16 },
  ],
  restaurant: [
    { id: 'fridge', name: 'ثلاجة', power: 800, qty: 4, hours: 24 },
    { id: 'freezer', name: 'فريزر', power: 1000, qty: 2, hours: 24 },
    { id: 'ac', name: 'مكيف', power: 2000, qty: 4, hours: 16 },
    { id: 'exhaust', name: 'شفاط مطبخ', power: 1500, qty: 1, hours: 16 },
    { id: 'lights', name: 'إضاءة', power: 50, qty: 20, hours: 16 },
  ],
  hotel: [
    { id: 'ac_rooms', name: 'مكيفات غرف', power: 1500, qty: 30, hours: 16 },
    { id: 'elevator', name: 'مصعد', power: 5500, qty: 1, hours: 24 },
    { id: 'water_heater', name: 'سخان مياه مركزي', power: 6000, qty: 2, hours: 6 },
    { id: 'lights', name: 'إضاءة عامة', power: 50, qty: 100, hours: 12 },
  ],
  bank: [
    { id: 'ac', name: 'مكيف مركزي', power: 5000, qty: 4, hours: 12 },
    { id: 'pc', name: 'حاسب آلي', power: 250, qty: 20, hours: 10 },
    { id: 'server', name: 'خوادم (سيرفرات)', power: 1500, qty: 2, hours: 24 },
    { id: 'atm', name: 'صراف آلي', power: 500, qty: 2, hours: 24 },
    { id: 'lights', name: 'إضاءة', power: 40, qty: 40, hours: 12 },
  ],
  supermarket: [
    { id: 'chiller', name: 'ثلاجات عرض مفتوحة', power: 2500, qty: 4, hours: 24 },
    { id: 'freezer', name: 'فريزر جزيرة', power: 1500, qty: 3, hours: 24 },
    { id: 'ac', name: 'مكيف مركزي', power: 5000, qty: 2, hours: 16 },
    { id: 'lights', name: 'إضاءة', power: 50, qty: 40, hours: 16 },
  ],
  gas_station: [
    { id: 'fuel_pump', name: 'طرمبة وقود', power: 1000, qty: 4, hours: 24 },
    { id: 'lights', name: 'إضاءة مظلة', power: 100, qty: 10, hours: 12 },
    { id: 'shop_fridge', name: 'ثلاجات البقالة', power: 600, qty: 3, hours: 24 },
  ],
  mining_company: [
    { id: 'crusher', name: 'كسارة', power: 15000, qty: 1, hours: 12 },
    { id: 'mill', name: 'طاحونة', power: 10000, qty: 2, hours: 12 },
    { id: 'water_pump', name: 'مضخة مياه', power: 4000, qty: 2, hours: 16 },
    { id: 'camp_ac', name: 'مكيفات السكن', power: 1500, qty: 10, hours: 10 },
    { id: 'lights', name: 'إضاءة كشافة', power: 400, qty: 10, hours: 12 },
  ]
};

// Generic list of appliances to add
export const ALL_APPLIANCES = [
  { id: 'ac_window', name: 'مكيف شباك', power: 1500 },
  { id: 'ac_split_18', name: 'مكيف سبليت 18 وحدة', power: 1800 },
  { id: 'ac_split_24', name: 'مكيف سبليت 24 وحدة', power: 2500 },
  { id: 'fridge', name: 'ثلاجة عادية', power: 400 },
  { id: 'freezer', name: 'فريزر', power: 500 },
  { id: 'tv', name: 'تلفزيون', power: 150 },
  { id: 'light_bulb', name: 'لمبة ليد', power: 15 },
  { id: 'fan', name: 'مروحة سقف/استاند', power: 80 },
  { id: 'pc', name: 'حاسب آلي مكتبي', power: 250 },
  { id: 'laptop', name: 'لابتوب', power: 60 },
  { id: 'water_pump_05', name: 'مضخة مياه نصف حصان', power: 375 },
  { id: 'water_pump_1', name: 'مضخة مياه 1 حصان', power: 750 },
  { id: 'water_heater', name: 'سخان مياه', power: 1500 },
  { id: 'washing_machine', name: 'غسالة ملابس', power: 500 },
  { id: 'iron', name: 'مكواة', power: 1200 },
  { id: 'microwave', name: 'مايكروويف', power: 1000 },
];

/**
 * Calculations for Solar System
 */

// Factors and Constants
const SYSTEM_LOSS_FACTOR = 1.3; // 30% loss in inverters, wires, etc.
const AVERAGE_SUN_HOURS = 5.5; // Average daily peak sun hours
const BATTERY_DOD = 0.5; // Depth of Discharge for lead-acid/gel (50%). Can be 0.8 for Lithium.
const BATTERY_VOLTAGE = 48; // System voltage (usually 24V or 48V for larger systems)

/**
 * Calculates total daily energy consumption in Watt-hours
 * @param {Array} appliances - Array of { power: number, qty: number, hours: number }
 * @returns {number} Daily consumption in Wh
 */
export const calculateDailyConsumption = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (Number(app.power) * Number(app.qty) * Number(app.hours));
  }, 0);
};

/**
 * Calculates peak power load in Watts
 * @param {Array} appliances - Array of { power: number, qty: number }
 * @returns {number} Peak load in W
 */
export const calculatePeakLoad = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (Number(app.power) * Number(app.qty));
  }, 0);
};

/**
 * Calculates the required system size and specifications
 * @param {Array} appliances
 * @returns {Object} System requirements
 */
export const calculateSolarSystem = (appliances) => {
  const dailyConsumptionWh = calculateDailyConsumption(appliances);
  const dailyConsumptionKWh = dailyConsumptionWh / 1000;

  const peakLoadW = calculatePeakLoad(appliances);
  const peakLoadKW = peakLoadW / 1000;

  // Inverter Size (Peak Load + 25% safety margin)
  const inverterSizeKW = peakLoadKW * 1.25;

  // Total Energy required per day considering system losses
  const requiredDailyEnergyWh = dailyConsumptionWh * SYSTEM_LOSS_FACTOR;

  // Solar Array Capacity required (Watts)
  const solarArrayCapacityW = requiredDailyEnergyWh / AVERAGE_SUN_HOURS;
  const solarArrayCapacityKW = solarArrayCapacityW / 1000;

  // Number of Solar Panels (assuming 550W panels)
  const PANEL_WATTAGE = 550;
  const numberOfPanels = Math.ceil(solarArrayCapacityW / PANEL_WATTAGE);

  // Battery Storage Capacity Required
  // To cover 1 day of autonomy (without sun)
  // Capacity (Ah) = (Daily Consumption Wh) / (Battery Voltage * DoD)
  const batteryCapacityAh = dailyConsumptionWh / (BATTERY_VOLTAGE * BATTERY_DOD);
  const batteryStorageKWh = (batteryCapacityAh * BATTERY_VOLTAGE) / 1000;

  // Number of 200Ah, 12V Batteries (assuming standard Gel/AGM)
  const BATTERY_AH = 200;
  const BATTERY_V = 12;
  const singleBatteryCapacityWh = BATTERY_AH * BATTERY_V * BATTERY_DOD;
  const numberOfBatteries = Math.ceil(dailyConsumptionWh / singleBatteryCapacityWh);

  // Rough Cost Estimation (USD)
  // Inverter: ~$150 per kW
  // Panels: ~$0.30 per Watt
  // Batteries: ~$250 per 200Ah 12V battery
  // Installation & accessories: ~30% of hardware cost

  const costInverter = inverterSizeKW * 150;
  const costPanels = solarArrayCapacityW * 0.30;
  const costBatteries = numberOfBatteries * 250;
  const hardwareCost = costInverter + costPanels + costBatteries;
  const estimatedCostUSD = hardwareCost * 1.30;

  return {
    dailyConsumptionKWh: dailyConsumptionKWh.toFixed(2),
    peakLoadKW: peakLoadKW.toFixed(2),
    inverterSizeKW: inverterSizeKW.toFixed(2),
    solarArrayCapacityKW: solarArrayCapacityKW.toFixed(2),
    numberOfPanels,
    batteryStorageKWh: batteryStorageKWh.toFixed(2),
    numberOfBatteries,
    estimatedCostUSD: Math.round(estimatedCostUSD)
  };
};
