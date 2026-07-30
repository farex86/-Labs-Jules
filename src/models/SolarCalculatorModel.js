export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    appliances: [
      { id: '1', name: 'ماكينة تصنيع ثلج', quantity: 2, watts: 5000, hours: 12 },
      { id: '2', name: 'غرفة تبريد', quantity: 1, watts: 3000, hours: 24 },
      { id: '3', name: 'إضاءة', quantity: 10, watts: 50, hours: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    appliances: [
      { id: '1', name: 'مكيف', quantity: 5, watts: 1500, hours: 8 },
      { id: '2', name: 'كمبيوتر', quantity: 10, watts: 300, hours: 8 },
      { id: '3', name: 'إضاءة', quantity: 20, watts: 40, hours: 10 },
      { id: '4', name: 'طابعة', quantity: 2, watts: 500, hours: 2 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    appliances: [
      { id: '1', name: 'مضخة مياه', quantity: 1, watts: 2200, hours: 6 },
      { id: '2', name: 'إضاءة خارجية', quantity: 5, watts: 100, hours: 12 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    appliances: [
      { id: '1', name: 'مراوح تهوية', quantity: 6, watts: 750, hours: 24 },
      { id: '2', name: 'إضاءة', quantity: 20, watts: 20, hours: 16 },
      { id: '3', name: 'دفايات', quantity: 4, watts: 2000, hours: 10 },
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    appliances: [
      { id: '1', name: 'مراوح تبريد', quantity: 4, watts: 500, hours: 12 },
      { id: '2', name: 'مضخة ري', quantity: 1, watts: 1500, hours: 4 },
      { id: '3', name: 'إضاءة', quantity: 10, watts: 40, hours: 8 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    appliances: [
      { id: '1', name: 'ماكينات إنتاج', quantity: 5, watts: 4000, hours: 10 },
      { id: '2', name: 'إضاءة', quantity: 30, watts: 100, hours: 12 },
      { id: '3', name: 'تكييف مركزي', quantity: 2, watts: 5000, hours: 10 },
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    appliances: [
      { id: '1', name: 'مكيف', quantity: 6, watts: 1500, hours: 12 },
      { id: '2', name: 'أجهزة طبية', quantity: 3, watts: 800, hours: 8 },
      { id: '3', name: 'إضاءة', quantity: 15, watts: 40, hours: 14 },
      { id: '4', name: 'ثلاجة أدوية', quantity: 2, watts: 300, hours: 24 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    appliances: [
      { id: '1', name: 'أجهزة طبية كبرى', quantity: 10, watts: 2000, hours: 12 },
      { id: '2', name: 'تكييف', quantity: 30, watts: 1500, hours: 24 },
      { id: '3', name: 'إضاءة', quantity: 100, watts: 40, hours: 24 },
      { id: '4', name: 'ثلاجات', quantity: 10, watts: 400, hours: 24 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    appliances: [
      { id: '1', name: 'عجانة', quantity: 2, watts: 3000, hours: 6 },
      { id: '2', name: 'فرن كهربائي', quantity: 1, watts: 6000, hours: 8 },
      { id: '3', name: 'إضاءة', quantity: 10, watts: 50, hours: 12 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    appliances: [
      { id: '1', name: 'ثلاجة عرض', quantity: 2, watts: 500, hours: 24 },
      { id: '2', name: 'مروحة / مكيف', quantity: 1, watts: 1000, hours: 12 },
      { id: '3', name: 'إضاءة', quantity: 4, watts: 40, hours: 12 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    appliances: [
      { id: '1', name: 'ماكينة لحام', quantity: 1, watts: 4000, hours: 4 },
      { id: '2', name: 'صاروخ / دريل', quantity: 3, watts: 800, hours: 3 },
      { id: '3', name: 'إضاءة', quantity: 6, watts: 100, hours: 10 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة مياه',
    appliances: [
      { id: '1', name: 'غاطس / مضخة', quantity: 1, watts: 3000, hours: 8 },
    ]
  },
  {
    id: 'donkey_cart',
    name: 'دونكي (محطة مياه)',
    appliances: [
      { id: '1', name: 'مضخة مياه كبيرة', quantity: 1, watts: 5500, hours: 10 },
      { id: '2', name: 'إضاءة', quantity: 2, watts: 50, hours: 12 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    appliances: [
      { id: '1', name: 'مكيف', quantity: 4, watts: 2000, hours: 4 },
      { id: '2', name: 'مراوح', quantity: 10, watts: 80, hours: 6 },
      { id: '3', name: 'إضاءة', quantity: 20, watts: 40, hours: 6 },
      { id: '4', name: 'مكبر صوت', quantity: 1, watts: 200, hours: 3 },
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    appliances: [
      { id: '1', name: 'ماكينة طباعة', quantity: 2, watts: 3500, hours: 8 },
      { id: '2', name: 'كمبيوتر', quantity: 4, watts: 300, hours: 8 },
      { id: '3', name: 'مكيف', quantity: 2, watts: 1500, hours: 8 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    appliances: [
      { id: '1', name: 'ماكينة قهوة', quantity: 2, watts: 2500, hours: 12 },
      { id: '2', name: 'ثلاجة عرض', quantity: 2, watts: 600, hours: 24 },
      { id: '3', name: 'مكيف', quantity: 3, watts: 1500, hours: 14 },
      { id: '4', name: 'إضاءة ديكورية', quantity: 15, watts: 30, hours: 14 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    appliances: [
      { id: '1', name: 'ثلاجات وتجميد', quantity: 4, watts: 800, hours: 24 },
      { id: '2', name: 'مكيفات', quantity: 5, watts: 2000, hours: 16 },
      { id: '3', name: 'إضاءة', quantity: 20, watts: 50, hours: 16 },
      { id: '4', name: 'أجهزة مطبخ كهربائية', quantity: 3, watts: 1500, hours: 10 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    appliances: [
      { id: '1', name: 'تكييف غرف', quantity: 20, watts: 1200, hours: 12 },
      { id: '2', name: 'إضاءة', quantity: 50, watts: 40, hours: 12 },
      { id: '3', name: 'ثلاجات صغيرة', quantity: 20, watts: 100, hours: 24 },
      { id: '4', name: 'مصعد', quantity: 1, watts: 7500, hours: 4 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    appliances: [
      { id: '1', name: 'تكييف مركزي', quantity: 2, watts: 5000, hours: 10 },
      { id: '2', name: 'أجهزة كمبيوتر', quantity: 20, watts: 300, hours: 10 },
      { id: '3', name: 'إضاءة', quantity: 40, watts: 40, hours: 12 },
      { id: '4', name: 'صراف آلي', quantity: 2, watts: 400, hours: 24 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    appliances: [
      { id: '1', name: 'ثلاجات عرض', quantity: 6, watts: 800, hours: 24 },
      { id: '2', name: 'فريزرات', quantity: 4, watts: 600, hours: 24 },
      { id: '3', name: 'تكييف', quantity: 4, watts: 2000, hours: 16 },
      { id: '4', name: 'إضاءة', quantity: 30, watts: 40, hours: 16 },
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    appliances: [
      { id: '1', name: 'مضخة وقود', quantity: 4, watts: 1000, hours: 12 },
      { id: '2', name: 'إضاءة خارجية', quantity: 10, watts: 150, hours: 12 },
      { id: '3', name: 'مكيف مكتب', quantity: 1, watts: 1500, hours: 12 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    appliances: [
      { id: '1', name: 'معدات حفر وتكسير', quantity: 2, watts: 10000, hours: 8 },
      { id: '2', name: 'إضاءة كاشفة', quantity: 10, watts: 500, hours: 12 },
      { id: '3', name: 'مكيفات كرفانات', quantity: 5, watts: 1500, hours: 12 },
    ]
  }
];

export const calculateTotalConsumption = (appliances) => {
  let totalDailyWh = 0;
  let maxPowerW = 0;

  appliances.forEach((app) => {
    const qty = parseInt(app.quantity, 10) || 0;
    const watts = parseFloat(app.watts) || 0;
    const hours = parseFloat(app.hours) || 0;

    const power = qty * watts;
    const energy = power * hours;

    totalDailyWh += energy;
    if (power > maxPowerW) {
      maxPowerW = power; // Track max surge/running power roughly
    }
  });

  return { totalDailyWh, maxPowerW };
};

export const calculateSystemSize = (totalDailyWh, maxPowerW) => {
  // Constants for rough sizing
  const SUN_HOURS = 5; // Average peak sun hours
  const SYSTEM_EFFICIENCY = 0.8; // 80% efficiency
  const BATTERY_VOLTAGE = 48; // Assuming 48V battery bank for larger systems, 24V for small
  const BATTERY_DOD = 0.5; // Depth of Discharge (50% for lead acid/gel, maybe higher for lithium but 50% is safe)

  // 1. Calculate Required Panel Array (Watts)
  // Panel Size W = (Daily Wh) / (Sun Hours * Efficiency)
  const requiredPanelW = totalDailyWh > 0 ? totalDailyWh / (SUN_HOURS * SYSTEM_EFFICIENCY) : 0;

  // Number of 500W panels
  const panelCapacityW = 500;
  const numberOfPanels = Math.ceil(requiredPanelW / panelCapacityW);
  const totalArraySizekW = (numberOfPanels * panelCapacityW) / 1000;

  // 2. Calculate Inverter Size (Watts)
  // Inverter should be at least 1.25x the max power or required panel size, whichever is larger.
  // We'll use a simple buffer on maxPowerW but also consider total array size.
  let recommendedInverterW = Math.max(maxPowerW * 1.25, requiredPanelW);

  // Round up to nearest standard inverter sizes (e.g. 1k, 3k, 5k, 8k, 10k, etc)
  let inverterSizekW = Math.ceil(recommendedInverterW / 1000);
  if (inverterSizekW === 0) inverterSizekW = 1;

  // 3. Calculate Battery Storage (Ah)
  // Required Capacity Wh = Total Daily Wh / DOD
  const requiredBatteryCapacityWh = totalDailyWh > 0 ? totalDailyWh / BATTERY_DOD : 0;

  // Decide battery voltage based on inverter size
  const voltage = inverterSizekW > 3 ? 48 : 24;

  const requiredBatteryAh = requiredBatteryCapacityWh / voltage;

  // Number of 200Ah batteries
  const batteryAhPerUnit = 200;
  const numberOfBatteries = Math.ceil(requiredBatteryAh / batteryAhPerUnit);

  return {
    totalDailykWh: (totalDailyWh / 1000).toFixed(2),
    numberOfPanels,
    panelCapacityW,
    totalArraySizekW: totalArraySizekW.toFixed(2),
    inverterSizekW,
    batteryVoltage: voltage,
    numberOfBatteries,
    batteryAhPerUnit
  };
};
