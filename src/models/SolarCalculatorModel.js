export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    devices: [
      { id: 'dev_1', name: 'ماكينة ثلج', power: 5000, quantity: 2, hours: 24 },
      { id: 'dev_2', name: 'غرفة تبريد', power: 3000, quantity: 1, hours: 24 },
      { id: 'dev_3', name: 'إضاءة', power: 50, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    devices: [
      { id: 'dev_1', name: 'أجهزة كمبيوتر', power: 250, quantity: 20, hours: 10 },
      { id: 'dev_2', name: 'مكيفات', power: 2000, quantity: 5, hours: 10 },
      { id: 'dev_3', name: 'إضاءة', power: 40, quantity: 30, hours: 12 },
      { id: 'dev_4', name: 'طابعة / آلة تصوير', power: 500, quantity: 2, hours: 4 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    devices: [
      { id: 'dev_1', name: 'مضخة مياه (غطاس)', power: 2200, quantity: 1, hours: 8 },
      { id: 'dev_2', name: 'إضاءة محيطية', power: 100, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    devices: [
      { id: 'dev_1', name: 'مراوح شفط', power: 750, quantity: 6, hours: 24 },
      { id: 'dev_2', name: 'نظام تبريد', power: 1500, quantity: 2, hours: 24 },
      { id: 'dev_3', name: 'إضاءة', power: 20, quantity: 50, hours: 16 },
      { id: 'dev_4', name: 'مضخة مياه', power: 1100, quantity: 1, hours: 4 },
    ]
  },
  {
    id: 'greenhouses',
    name: 'بيوت محمية',
    devices: [
      { id: 'dev_1', name: 'مضخة ري', power: 1500, quantity: 1, hours: 6 },
      { id: 'dev_2', name: 'مراوح تهوية', power: 500, quantity: 4, hours: 12 },
      { id: 'dev_3', name: 'نظام تحكم', power: 100, quantity: 1, hours: 24 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    devices: [
      { id: 'dev_1', name: 'آلات إنتاج', power: 10000, quantity: 3, hours: 16 },
      { id: 'dev_2', name: 'مكيفات مركزية', power: 5000, quantity: 2, hours: 16 },
      { id: 'dev_3', name: 'إضاءة صناعية', power: 150, quantity: 40, hours: 16 },
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    devices: [
      { id: 'dev_1', name: 'أجهزة طبية', power: 1000, quantity: 5, hours: 8 },
      { id: 'dev_2', name: 'ثلاجة أدوية', power: 300, quantity: 2, hours: 24 },
      { id: 'dev_3', name: 'مكيفات', power: 1500, quantity: 6, hours: 12 },
      { id: 'dev_4', name: 'إضاءة', power: 40, quantity: 30, hours: 12 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    devices: [
      { id: 'dev_1', name: 'أجهزة عناية مركزة', power: 1000, quantity: 10, hours: 24 },
      { id: 'dev_2', name: 'أشعة / رنين', power: 50000, quantity: 1, hours: 4 },
      { id: 'dev_3', name: 'مكيفات مركزية', power: 20000, quantity: 3, hours: 24 },
      { id: 'dev_4', name: 'إضاءة', power: 40, quantity: 200, hours: 24 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    devices: [
      { id: 'dev_1', name: 'عجانة', power: 3000, quantity: 2, hours: 8 },
      { id: 'dev_2', name: 'فرن كهربائي', power: 15000, quantity: 1, hours: 12 },
      { id: 'dev_3', name: 'قطاعة', power: 1500, quantity: 1, hours: 6 },
      { id: 'dev_4', name: 'إضاءة', power: 50, quantity: 10, hours: 14 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    devices: [
      { id: 'dev_1', name: 'ثلاجة عرض', power: 600, quantity: 2, hours: 24 },
      { id: 'dev_2', name: 'مكيف', power: 1500, quantity: 1, hours: 12 },
      { id: 'dev_3', name: 'إضاءة', power: 40, quantity: 4, hours: 14 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    devices: [
      { id: 'dev_1', name: 'ماكينة لحام', power: 5000, quantity: 1, hours: 4 },
      { id: 'dev_2', name: 'صاروخ / دريل', power: 1500, quantity: 3, hours: 6 },
      { id: 'dev_3', name: 'كمبروسر هواء', power: 2200, quantity: 1, hours: 8 },
      { id: 'dev_4', name: 'إضاءة', power: 100, quantity: 6, hours: 10 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة مياه',
    devices: [
      { id: 'dev_1', name: 'مضخة غاطسة', power: 5500, quantity: 1, hours: 10 },
      { id: 'dev_2', name: 'لوحة تحكم', power: 100, quantity: 1, hours: 10 },
    ]
  },
  {
    id: 'donkey_pump',
    name: 'دونكي',
    devices: [
      { id: 'dev_1', name: 'مضخة بئر', power: 7500, quantity: 1, hours: 12 },
      { id: 'dev_2', name: 'مضخة توزيع', power: 2200, quantity: 2, hours: 8 },
      { id: 'dev_3', name: 'إضاءة', power: 50, quantity: 4, hours: 12 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    devices: [
      { id: 'dev_1', name: 'مكيفات', power: 2000, quantity: 10, hours: 6 },
      { id: 'dev_2', name: 'إضاءة', power: 40, quantity: 40, hours: 8 },
      { id: 'dev_3', name: 'نظام صوتي', power: 300, quantity: 1, hours: 5 },
      { id: 'dev_4', name: 'مضخة مياه', power: 750, quantity: 1, hours: 2 },
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    devices: [
      { id: 'dev_1', name: 'آلة طباعة رئيسية', power: 10000, quantity: 1, hours: 10 },
      { id: 'dev_2', name: 'مقص ورق', power: 2000, quantity: 1, hours: 4 },
      { id: 'dev_3', name: 'أجهزة كمبيوتر', power: 250, quantity: 5, hours: 10 },
      { id: 'dev_4', name: 'مكيفات', power: 2000, quantity: 3, hours: 10 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    devices: [
      { id: 'dev_1', name: 'ماكينة إسبريسو', power: 3500, quantity: 1, hours: 14 },
      { id: 'dev_2', name: 'طاحونة قهوة', power: 500, quantity: 2, hours: 4 },
      { id: 'dev_3', name: 'ثلاجة عرض', power: 800, quantity: 2, hours: 24 },
      { id: 'dev_4', name: 'مكيف', power: 2000, quantity: 2, hours: 14 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    devices: [
      { id: 'dev_1', name: 'ثلاجات تبريد/تجميد', power: 1200, quantity: 4, hours: 24 },
      { id: 'dev_2', name: 'شفاطات هواء', power: 1500, quantity: 2, hours: 14 },
      { id: 'dev_3', name: 'مكيفات', power: 2000, quantity: 4, hours: 14 },
      { id: 'dev_4', name: 'إضاءة وديكور', power: 50, quantity: 30, hours: 14 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    devices: [
      { id: 'dev_1', name: 'مكيفات غرف', power: 1500, quantity: 50, hours: 12 },
      { id: 'dev_2', name: 'سخانات مياه', power: 2000, quantity: 50, hours: 4 },
      { id: 'dev_3', name: 'إضاءة', power: 40, quantity: 200, hours: 12 },
      { id: 'dev_4', name: 'مصاعد', power: 11000, quantity: 2, hours: 6 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    devices: [
      { id: 'dev_1', name: 'أجهزة كمبيوتر', power: 250, quantity: 30, hours: 10 },
      { id: 'dev_2', name: 'خوادم (Servers)', power: 1500, quantity: 2, hours: 24 },
      { id: 'dev_3', name: 'مكيفات', power: 2000, quantity: 10, hours: 12 },
      { id: 'dev_4', name: 'صراف آلي (ATM)', power: 500, quantity: 3, hours: 24 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    devices: [
      { id: 'dev_1', name: 'ثلاجات عرض (ألبان ومشروبات)', power: 1500, quantity: 6, hours: 24 },
      { id: 'dev_2', name: 'فريزرات لحوم', power: 2000, quantity: 4, hours: 24 },
      { id: 'dev_3', name: 'مكيفات', power: 2000, quantity: 6, hours: 16 },
      { id: 'dev_4', name: 'إضاءة', power: 50, quantity: 50, hours: 16 },
    ]
  },
  {
    id: 'fuel_station',
    name: 'طرمبة وقود',
    devices: [
      { id: 'dev_1', name: 'مضخات وقود', power: 1500, quantity: 6, hours: 12 },
      { id: 'dev_2', name: 'إضاءة المظلة', power: 100, quantity: 20, hours: 12 },
      { id: 'dev_3', name: 'كمبروسر هواء', power: 2200, quantity: 1, hours: 4 },
      { id: 'dev_4', name: 'مكيفات للإدارة', power: 1500, quantity: 2, hours: 14 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    devices: [
      { id: 'dev_1', name: 'طواحين خام', power: 20000, quantity: 2, hours: 20 },
      { id: 'dev_2', name: 'مضخات مياه كبيرة', power: 11000, quantity: 2, hours: 12 },
      { id: 'dev_3', name: 'إضاءة كاشفة', power: 1000, quantity: 10, hours: 12 },
      { id: 'dev_4', name: 'سكن عمال (مكيفات وغيرها)', power: 2000, quantity: 10, hours: 12 },
    ]
  }
];

export function getFacilityTypes() {
  return FACILITY_TYPES.map(f => ({ id: f.id, name: f.name }));
}

export function getDevicesForFacility(facilityId) {
  const facility = FACILITY_TYPES.find(f => f.id === facilityId);
  if (!facility) return [];
  // Deep copy the devices to avoid mutation
  return facility.devices.map(d => ({ ...d }));
}

export function calculateSolarSystem(devices) {
  // 1. Total Daily Energy Consumption (Wh/day)
  const totalDailyEnergy = devices.reduce((sum, device) => {
    return sum + (device.power * device.quantity * device.hours);
  }, 0);

  // 2. Peak Power Load (W) - assuming all devices could be on simultaneously for a worst-case scenario
  const peakPowerLoad = devices.reduce((sum, device) => {
    return sum + (device.power * device.quantity);
  }, 0);

  // Peak Sun Hours (PSH) - Average for regions like Sudan/Saudi is around 5.5 to 6 hours
  const peakSunHours = 5.5;
  const panelEfficiencyFactor = 0.7; // Often used for realistic yield accounting for heat, dust, wiring losses

  // 3. Recommended Solar Panel Capacity (W)
  // Total Energy (Wh) / Peak Sun Hours / Panel Efficiency
  const recommendedPanelCapacity = totalDailyEnergy / peakSunHours / panelEfficiencyFactor;

  // 4. Inverter Size (W)
  // Peak Load + 25% safety margin
  const inverterSize = peakPowerLoad * 1.25;

  // 5. Battery Capacity (Wh)
  // Assuming 1 day of autonomy and Depth of Discharge (DoD) of 80% for Lithium, plus system efficiency of 95%
  const daysOfAutonomy = 1;
  const depthOfDischarge = 0.8;
  const batteryInverterEfficiency = 0.95;
  const recommendedBatteryCapacity = (totalDailyEnergy * daysOfAutonomy) / (depthOfDischarge * batteryInverterEfficiency);

  return {
    totalDailyEnergy: Math.ceil(totalDailyEnergy),
    peakPowerLoad: Math.ceil(peakPowerLoad),
    recommendedPanelCapacity: Math.ceil(recommendedPanelCapacity),
    inverterSize: Math.ceil(inverterSize),
    recommendedBatteryCapacity: Math.ceil(recommendedBatteryCapacity)
  };
}
