export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    appliances: [
      { id: '1', name: 'ماكينة صنع ثلج', power: 5000, quantity: 2, hours: 24 },
      { id: '2', name: 'مكيف', power: 2000, quantity: 1, hours: 24 },
      { id: '3', name: 'إضاءة', power: 100, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    appliances: [
      { id: '1', name: 'مكيف', power: 1500, quantity: 4, hours: 10 },
      { id: '2', name: 'كمبيوتر', power: 200, quantity: 10, hours: 10 },
      { id: '3', name: 'طابعة', power: 500, quantity: 2, hours: 2 },
      { id: '4', name: 'إضاءة', power: 50, quantity: 20, hours: 10 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    appliances: [
      { id: '1', name: 'مضخة ماء سطحية', power: 2000, quantity: 1, hours: 6 },
      { id: '2', name: 'إضاءة', power: 100, quantity: 5, hours: 12 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    appliances: [
      { id: '1', name: 'مراوح تهوية', power: 500, quantity: 6, hours: 24 },
      { id: '2', name: 'إضاءة', power: 50, quantity: 20, hours: 16 },
      { id: '3', name: 'دفايات', power: 2000, quantity: 4, hours: 12 },
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    appliances: [
      { id: '1', name: 'مراوح تبريد', power: 750, quantity: 4, hours: 12 },
      { id: '2', name: 'مضخة ري', power: 1500, quantity: 1, hours: 4 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    appliances: [
      { id: '1', name: 'ماكينات تصنيع', power: 10000, quantity: 3, hours: 16 },
      { id: '2', name: 'إضاءة صناعية', power: 200, quantity: 30, hours: 16 },
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    appliances: [
      { id: '1', name: 'مكيف', power: 1500, quantity: 6, hours: 14 },
      { id: '2', name: 'ثلاجة أدوية', power: 300, quantity: 2, hours: 24 },
      { id: '3', name: 'أجهزة طبية', power: 1000, quantity: 3, hours: 8 },
      { id: '4', name: 'إضاءة', power: 50, quantity: 20, hours: 14 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    appliances: [
      { id: '1', name: 'مكيف مركزي', power: 20000, quantity: 2, hours: 24 },
      { id: '2', name: 'غرفة عمليات', power: 5000, quantity: 2, hours: 24 },
      { id: '3', name: 'إضاءة', power: 50, quantity: 100, hours: 24 },
      { id: '4', name: 'أجهزة طبية', power: 2000, quantity: 10, hours: 24 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    appliances: [
      { id: '1', name: 'عجانة', power: 3000, quantity: 2, hours: 8 },
      { id: '2', name: 'فرن كهربائي', power: 15000, quantity: 1, hours: 10 },
      { id: '3', name: 'إضاءة', power: 100, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    appliances: [
      { id: '1', name: 'ثلاجة عرض', power: 800, quantity: 2, hours: 24 },
      { id: '2', name: 'مكيف', power: 1500, quantity: 1, hours: 14 },
      { id: '3', name: 'إضاءة', power: 50, quantity: 6, hours: 14 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    appliances: [
      { id: '1', name: 'ماكينة لحام', power: 5000, quantity: 1, hours: 4 },
      { id: '2', name: 'صاروخ قطع', power: 2000, quantity: 2, hours: 6 },
      { id: '3', name: 'كمبروسر هواء', power: 3000, quantity: 1, hours: 8 },
      { id: '4', name: 'إضاءة', power: 100, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    appliances: [
      { id: '1', name: 'مضخة غاطسة', power: 5500, quantity: 1, hours: 8 },
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي',
    appliances: [
      { id: '1', name: 'مضخة بئر', power: 4000, quantity: 1, hours: 10 },
      { id: '2', name: 'إضاءة', power: 50, quantity: 2, hours: 12 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    appliances: [
      { id: '1', name: 'مكيف', power: 2000, quantity: 4, hours: 5 },
      { id: '2', name: 'مكبر صوت', power: 300, quantity: 1, hours: 3 },
      { id: '3', name: 'إضاءة', power: 100, quantity: 20, hours: 5 },
      { id: '4', name: 'برادة ماء', power: 500, quantity: 2, hours: 24 },
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    appliances: [
      { id: '1', name: 'ماكينة طباعة', power: 8000, quantity: 2, hours: 10 },
      { id: '2', name: 'مكيف', power: 2000, quantity: 2, hours: 10 },
      { id: '3', name: 'كمبيوتر', power: 300, quantity: 4, hours: 10 },
      { id: '4', name: 'إضاءة', power: 100, quantity: 15, hours: 10 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    appliances: [
      { id: '1', name: 'ماكينة اسبريسو', power: 3500, quantity: 1, hours: 16 },
      { id: '2', name: 'مطحنة بن', power: 500, quantity: 2, hours: 4 },
      { id: '3', name: 'مكيف', power: 2000, quantity: 2, hours: 16 },
      { id: '4', name: 'ثلاجة عرض', power: 800, quantity: 1, hours: 24 },
      { id: '5', name: 'إضاءة ديكور', power: 200, quantity: 5, hours: 16 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    appliances: [
      { id: '1', name: 'ثلاجة تجميد', power: 1500, quantity: 3, hours: 24 },
      { id: '2', name: 'مكيف', power: 2500, quantity: 4, hours: 16 },
      { id: '3', name: 'شفاط مطبخ', power: 1000, quantity: 2, hours: 14 },
      { id: '4', name: 'إضاءة', power: 100, quantity: 30, hours: 16 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    appliances: [
      { id: '1', name: 'مكيفات غرف', power: 1500, quantity: 20, hours: 12 },
      { id: '2', name: 'إضاءة', power: 50, quantity: 100, hours: 12 },
      { id: '3', name: 'مصعد', power: 10000, quantity: 1, hours: 4 },
      { id: '4', name: 'مضخة ماء', power: 2000, quantity: 2, hours: 8 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    appliances: [
      { id: '1', name: 'مكيف مركزي', power: 15000, quantity: 1, hours: 10 },
      { id: '2', name: 'كمبيوتر', power: 200, quantity: 30, hours: 10 },
      { id: '3', name: 'صراف آلي', power: 500, quantity: 4, hours: 24 },
      { id: '4', name: 'إضاءة', power: 50, quantity: 50, hours: 12 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    appliances: [
      { id: '1', name: 'ثلاجات عرض', power: 1200, quantity: 10, hours: 24 },
      { id: '2', name: 'مكيف مركزي', power: 10000, quantity: 2, hours: 18 },
      { id: '3', name: 'كاشير', power: 200, quantity: 5, hours: 18 },
      { id: '4', name: 'إضاءة', power: 100, quantity: 40, hours: 18 },
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    appliances: [
      { id: '1', name: 'مضخة وقود', power: 1500, quantity: 6, hours: 24 },
      { id: '2', name: 'إضاءة مظلة', power: 200, quantity: 15, hours: 12 },
      { id: '3', name: 'مكيف مكتب', power: 1500, quantity: 1, hours: 24 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    appliances: [
      { id: '1', name: 'كسارة', power: 50000, quantity: 1, hours: 12 },
      { id: '2', name: 'مضخة سحب مياه', power: 10000, quantity: 2, hours: 12 },
      { id: '3', name: 'إضاءة موقع', power: 1000, quantity: 10, hours: 12 },
    ]
  }
];

export const calculateTotalEnergy = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (app.power * app.quantity * app.hours);
  }, 0);
};

export const calculateTotalPower = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (app.power * app.quantity);
  }, 0);
};

export const calculateSystemSizing = (totalEnergyWh, totalPowerW) => {
  // Safety factors and efficiency losses
  const INVERTER_EFFICIENCY = 0.9;
  const SYSTEM_LOSSES = 1.3; // 30% losses (dust, temperature, wiring)
  const SUN_HOURS = 5; // Average peak sun hours
  const BATTERY_DEPTH_OF_DISCHARGE = 0.8; // 80% DoD for Lithium

  // 1. Inverter Sizing (kW) - Needs to handle total peak power + 20% safety margin
  const inverterSizeKW = (totalPowerW * 1.2) / 1000;

  // 2. Solar Panels (kW) - Needs to generate total energy considering losses and sun hours
  const solarPanelsKW = (totalEnergyWh * SYSTEM_LOSSES) / (SUN_HOURS * 1000);

  // 3. Battery Capacity (kWh) - Needs to store energy for night time (assuming 60% of usage is during night/no sun)
  // For standalone systems, usually 1-2 days of autonomy. We'll use 1 day.
  const nightEnergyWh = totalEnergyWh * 0.6;
  const batteryCapacityKWh = nightEnergyWh / (BATTERY_DEPTH_OF_DISCHARGE * INVERTER_EFFICIENCY * 1000);

  return {
    inverterSizeKW: Math.ceil(inverterSizeKW),
    solarPanelsKW: Math.ceil(solarPanelsKW * 10) / 10, // Round to 1 decimal
    batteryCapacityKWh: Math.ceil(batteryCapacityKWh * 10) / 10
  };
};
