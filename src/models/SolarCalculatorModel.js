export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    appliances: [
      { id: 'ice_maker_large', name: 'ماكينة صنع ثلج كبيرة', power: 5000, quantity: 2, hours: 24 },
      { id: 'freezer_room', name: 'غرفة تجميد', power: 3000, quantity: 1, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 10, hours: 12 },
    ],
  },
  {
    id: 'company',
    name: 'شركة',
    appliances: [
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 4, hours: 8 },
      { id: 'computer', name: 'جهاز كمبيوتر', power: 250, quantity: 10, hours: 8 },
      { id: 'lighting', name: 'إضاءة', power: 30, quantity: 20, hours: 10 },
      { id: 'printer', name: 'طابعة', power: 500, quantity: 2, hours: 2 },
    ],
  },
  {
    id: 'farm',
    name: 'مزرعة',
    appliances: [
      { id: 'water_pump', name: 'مضخة مياه (غطاس)', power: 2200, quantity: 1, hours: 6 },
      { id: 'lighting', name: 'إضاءة خارجية', power: 100, quantity: 5, hours: 12 },
    ],
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    appliances: [
      { id: 'ventilation_fan', name: 'مروحة تهوية', power: 750, quantity: 6, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 20, hours: 16 },
      { id: 'heater', name: 'دفاية', power: 2000, quantity: 2, hours: 12 },
    ],
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    appliances: [
      { id: 'cooling_fan', name: 'مروحة تبريد', power: 500, quantity: 4, hours: 10 },
      { id: 'water_pump', name: 'مضخة ري', power: 1100, quantity: 1, hours: 4 },
      { id: 'lighting', name: 'إضاءة زراعية', power: 200, quantity: 10, hours: 8 },
    ],
  },
  {
    id: 'factory',
    name: 'مصنع',
    appliances: [
      { id: 'heavy_machinery', name: 'ماكينة صناعية', power: 10000, quantity: 2, hours: 12 },
      { id: 'conveyor', name: 'حزام ناقل', power: 3000, quantity: 1, hours: 12 },
      { id: 'lighting', name: 'إضاءة مصنع', power: 100, quantity: 30, hours: 14 },
    ],
  },
  {
    id: 'dispensary',
    name: 'مستوصف',
    appliances: [
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 5, hours: 12 },
      { id: 'lighting', name: 'إضاءة', power: 30, quantity: 30, hours: 14 },
      { id: 'fridge_medical', name: 'ثلاجة أدوية', power: 300, quantity: 2, hours: 24 },
      { id: 'medical_equipment', name: 'أجهزة طبية', power: 1000, quantity: 3, hours: 6 },
    ],
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    appliances: [
      { id: 'ac_central', name: 'تكييف مركزي', power: 15000, quantity: 2, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 100, hours: 24 },
      { id: 'fridge_medical', name: 'ثلاجات أدوية ودم', power: 500, quantity: 5, hours: 24 },
      { id: 'xray', name: 'جهاز أشعة', power: 5000, quantity: 1, hours: 4 },
      { id: 'medical_equipment', name: 'أجهزة طبية متنوعة', power: 2000, quantity: 10, hours: 24 },
    ],
  },
  {
    id: 'bakery',
    name: 'مخبز',
    appliances: [
      { id: 'mixer', name: 'عجانة', power: 3000, quantity: 2, hours: 8 },
      { id: 'oven', name: 'فرن كهربائي', power: 5000, quantity: 2, hours: 10 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 10, hours: 12 },
    ],
  },
  {
    id: 'shop',
    name: 'دكان',
    appliances: [
      { id: 'fridge', name: 'ثلاجة عرض', power: 600, quantity: 2, hours: 24 },
      { id: 'freezer', name: 'ديب فريزر', power: 400, quantity: 1, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 20, quantity: 6, hours: 12 },
      { id: 'fan', name: 'مروحة سقف', power: 80, quantity: 2, hours: 12 },
    ],
  },
  {
    id: 'workshop',
    name: 'ورشة',
    appliances: [
      { id: 'welding_machine', name: 'ماكينة لحام', power: 4000, quantity: 1, hours: 4 },
      { id: 'air_compressor', name: 'كمبروسر هواء', power: 2200, quantity: 1, hours: 6 },
      { id: 'grinder', name: 'صاروخ جلخ', power: 1000, quantity: 2, hours: 3 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 8, hours: 10 },
    ],
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    appliances: [
      { id: 'pump_large', name: 'مضخة مياه كبيرة', power: 5500, quantity: 1, hours: 8 },
    ],
  },
  {
    id: 'donkey',
    name: 'دونكي',
    appliances: [
      { id: 'pump', name: 'مضخة بئر (دونكي)', power: 3000, quantity: 1, hours: 10 },
    ],
  },
  {
    id: 'mosque',
    name: 'مسجد',
    appliances: [
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 6, hours: 4 },
      { id: 'fan', name: 'مروحة', power: 80, quantity: 10, hours: 6 },
      { id: 'lighting', name: 'إضاءة', power: 30, quantity: 20, hours: 4 },
      { id: 'sound_system', name: 'مكبر صوت', power: 200, quantity: 1, hours: 2 },
    ],
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    appliances: [
      { id: 'printer_large', name: 'ماكينة طباعة كبيرة', power: 6000, quantity: 1, hours: 8 },
      { id: 'cutter', name: 'مقص ورق كهربائي', power: 1500, quantity: 1, hours: 4 },
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 2, hours: 10 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 10, hours: 10 },
    ],
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    appliances: [
      { id: 'espresso_machine', name: 'ماكينة اسبريسو', power: 3500, quantity: 1, hours: 12 },
      { id: 'grinder', name: 'طاحونة قهوة', power: 500, quantity: 2, hours: 4 },
      { id: 'fridge', name: 'ثلاجة عرض', power: 600, quantity: 2, hours: 24 },
      { id: 'blender', name: 'خلاط', power: 800, quantity: 2, hours: 3 },
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 2, hours: 12 },
      { id: 'lighting', name: 'إضاءة', power: 30, quantity: 15, hours: 12 },
    ],
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    appliances: [
      { id: 'fridge', name: 'ثلاجة', power: 800, quantity: 3, hours: 24 },
      { id: 'freezer', name: 'فريزر', power: 600, quantity: 2, hours: 24 },
      { id: 'exhaust_fan', name: 'مروحة شفط', power: 500, quantity: 2, hours: 16 },
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 4, hours: 14 },
      { id: 'lighting', name: 'إضاءة', power: 30, quantity: 20, hours: 14 },
    ],
  },
  {
    id: 'hotel',
    name: 'فندق',
    appliances: [
      { id: 'ac', name: 'مكيف', power: 1200, quantity: 20, hours: 12 },
      { id: 'fridge_mini', name: 'ثلاجة صغيرة', power: 100, quantity: 20, hours: 24 },
      { id: 'tv', name: 'تلفزيون', power: 100, quantity: 20, hours: 6 },
      { id: 'water_heater', name: 'سخان مياه', power: 1500, quantity: 10, hours: 4 },
      { id: 'elevator', name: 'مصعد', power: 8000, quantity: 1, hours: 4 },
      { id: 'lighting', name: 'إضاءة', power: 20, quantity: 100, hours: 12 },
    ],
  },
  {
    id: 'bank',
    name: 'بنك',
    appliances: [
      { id: 'ac_central', name: 'تكييف مركزي', power: 10000, quantity: 1, hours: 10 },
      { id: 'computer', name: 'كمبيوتر', power: 250, quantity: 15, hours: 10 },
      { id: 'server', name: 'سيرفر', power: 800, quantity: 1, hours: 24 },
      { id: 'atm', name: 'صراف آلي', power: 500, quantity: 2, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 40, hours: 12 },
    ],
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    appliances: [
      { id: 'fridge_display', name: 'ثلاجة عرض كبيرة', power: 1200, quantity: 5, hours: 24 },
      { id: 'freezer_display', name: 'فريزر عرض', power: 1000, quantity: 3, hours: 24 },
      { id: 'ac', name: 'مكيف', power: 2000, quantity: 4, hours: 16 },
      { id: 'pos', name: 'جهاز كاشير', power: 100, quantity: 3, hours: 16 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 50, hours: 16 },
    ],
  },
  {
    id: 'fuel_station',
    name: 'طرمبة وقود',
    appliances: [
      { id: 'fuel_pump', name: 'مضخة وقود', power: 1500, quantity: 4, hours: 12 },
      { id: 'lighting_external', name: 'إضاءة خارجية', power: 200, quantity: 8, hours: 12 },
      { id: 'ac', name: 'مكيف (مكتب)', power: 1500, quantity: 1, hours: 12 },
      { id: 'fridge', name: 'ثلاجة', power: 500, quantity: 1, hours: 24 },
    ],
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    appliances: [
      { id: 'heavy_crusher', name: 'كسارة', power: 20000, quantity: 1, hours: 10 },
      { id: 'water_pump', name: 'مضخة مياه', power: 3000, quantity: 2, hours: 12 },
      { id: 'lighting_tower', name: 'برج إضاءة', power: 1000, quantity: 4, hours: 12 },
      { id: 'ac_camp', name: 'مكيفات (سكن العاملين)', power: 1500, quantity: 10, hours: 8 },
    ],
  }
];

export const calculateSolarSystem = (appliances) => {
  let totalDailyEnergyWh = 0;
  let maxPowerW = 0;

  appliances.forEach((app) => {
    const power = Number(app.power) || 0;
    const qty = Number(app.quantity) || 0;
    const hours = Number(app.hours) || 0;

    const applianceMaxPower = power * qty;
    const applianceDailyEnergy = applianceMaxPower * hours;

    maxPowerW += applianceMaxPower;
    totalDailyEnergyWh += applianceDailyEnergy;
  });

  // Calculate Inverter Size (VA) - Add 25% safety margin
  const inverterSizeVA = maxPowerW * 1.25;
  const inverterSizeKVA = inverterSizeVA / 1000;

  // Calculate Battery Capacity
  // Assume 48V system, 1 day of autonomy, 80% Depth of Discharge (DoD)
  const batteryVoltage = 48;
  const dod = 0.8;
  const batteryCapacityAh = (totalDailyEnergyWh / batteryVoltage) / dod;

  // Calculate Solar Panels
  // Assume 5 Peak Sun Hours (PSH), 80% system efficiency
  const psh = 5;
  const systemEfficiency = 0.8;
  const totalPanelWattage = totalDailyEnergyWh / (psh * systemEfficiency);
  const panelWattage = 550; // Example: 550W panels
  const numberOfPanels = Math.ceil(totalPanelWattage / panelWattage);

  return {
    totalDailyEnergyKWh: (totalDailyEnergyWh / 1000).toFixed(2),
    maxPowerKW: (maxPowerW / 1000).toFixed(2),
    recommendedInverterKVA: inverterSizeKVA.toFixed(2),
    batteryCapacityAh: Math.ceil(batteryCapacityAh),
    batteryVoltage,
    totalPanelWattageKW: (totalPanelWattage / 1000).toFixed(2),
    numberOfPanels,
    panelWattage
  };
};
