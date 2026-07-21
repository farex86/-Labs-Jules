export const facilityTypes = [
  {
    id: 'custom',
    name: 'تخصيص',
    appliances: []
  },
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    appliances: [
      { id: 1, name: 'ماكينة صنع الثلج', power: 5000, quantity: 2, hours: 24 },
      { id: 2, name: 'إضاءة', power: 40, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    appliances: [
      { id: 1, name: 'مكيف', power: 1500, quantity: 4, hours: 8 },
      { id: 2, name: 'جهاز كمبيوتر', power: 250, quantity: 10, hours: 8 },
      { id: 3, name: 'إضاءة', power: 40, quantity: 20, hours: 8 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    appliances: [
      { id: 1, name: 'مضخة مياه', power: 3000, quantity: 1, hours: 6 },
      { id: 2, name: 'إضاءة خارجية', power: 100, quantity: 5, hours: 12 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    appliances: [
      { id: 1, name: 'مراوح تهوية', power: 1000, quantity: 4, hours: 24 },
      { id: 2, name: 'إضاءة', power: 40, quantity: 30, hours: 16 },
      { id: 3, name: 'نظام تدفئة', power: 2000, quantity: 2, hours: 12 },
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    appliances: [
      { id: 1, name: 'مراوح تهوية', power: 750, quantity: 4, hours: 12 },
      { id: 2, name: 'مضخة مياه', power: 1500, quantity: 1, hours: 4 },
      { id: 3, name: 'نظام تبريد', power: 2000, quantity: 1, hours: 8 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    appliances: [
      { id: 1, name: 'ماكينات تصنيع', power: 10000, quantity: 2, hours: 16 },
      { id: 2, name: 'إضاءة صناعية', power: 200, quantity: 20, hours: 16 },
      { id: 3, name: 'مكيفات', power: 2000, quantity: 5, hours: 16 },
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    appliances: [
      { id: 1, name: 'مكيف', power: 1500, quantity: 6, hours: 12 },
      { id: 2, name: 'ثلاجة أدوية', power: 300, quantity: 2, hours: 24 },
      { id: 3, name: 'أجهزة طبية', power: 1000, quantity: 3, hours: 8 },
      { id: 4, name: 'إضاءة', power: 40, quantity: 30, hours: 12 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    appliances: [
      { id: 1, name: 'مكيف', power: 2000, quantity: 20, hours: 24 },
      { id: 2, name: 'ثلاجة أدوية', power: 300, quantity: 5, hours: 24 },
      { id: 3, name: 'أجهزة طبية (أشعة، غسيل كلى، الخ)', power: 5000, quantity: 5, hours: 12 },
      { id: 4, name: 'إضاءة', power: 40, quantity: 100, hours: 24 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    appliances: [
      { id: 1, name: 'عجانة', power: 3000, quantity: 2, hours: 8 },
      { id: 2, name: 'فرن كهربائي', power: 10000, quantity: 1, hours: 12 },
      { id: 3, name: 'إضاءة', power: 40, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    appliances: [
      { id: 1, name: 'ثلاجة عرض', power: 500, quantity: 2, hours: 24 },
      { id: 2, name: 'مروحة سقف', power: 80, quantity: 1, hours: 12 },
      { id: 3, name: 'إضاءة', power: 40, quantity: 4, hours: 8 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    appliances: [
      { id: 1, name: 'ماكينة لحام', power: 5000, quantity: 1, hours: 4 },
      { id: 2, name: 'صاروخ جلخ', power: 1200, quantity: 2, hours: 4 },
      { id: 3, name: 'كمبروسر هواء', power: 2000, quantity: 1, hours: 6 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    appliances: [
      { id: 1, name: 'مضخة غاطسة', power: 5000, quantity: 1, hours: 8 },
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي',
    appliances: [
      { id: 1, name: 'مضخة مياه سطحية', power: 2000, quantity: 1, hours: 6 },
      { id: 2, name: 'مضخة مياه غاطسة', power: 3000, quantity: 1, hours: 6 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    appliances: [
      { id: 1, name: 'مكيف', power: 2000, quantity: 4, hours: 5 },
      { id: 2, name: 'مراوح سقف', power: 80, quantity: 10, hours: 5 },
      { id: 3, name: 'مكبر صوت', power: 200, quantity: 1, hours: 2 },
      { id: 4, name: 'إضاءة', power: 40, quantity: 20, hours: 5 },
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    appliances: [
      { id: 1, name: 'ماكينة طباعة', power: 4000, quantity: 2, hours: 10 },
      { id: 2, name: 'ماكينة قص', power: 1500, quantity: 1, hours: 8 },
      { id: 3, name: 'مكيف', power: 2000, quantity: 2, hours: 12 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    appliances: [
      { id: 1, name: 'ماكينة قهوة', power: 3000, quantity: 1, hours: 14 },
      { id: 2, name: 'مكيف', power: 2000, quantity: 3, hours: 14 },
      { id: 3, name: 'ثلاجة عرض', power: 600, quantity: 2, hours: 24 },
      { id: 4, name: 'إضاءة ديكور', power: 20, quantity: 30, hours: 14 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    appliances: [
      { id: 1, name: 'ثلاجة حفظ', power: 1000, quantity: 2, hours: 24 },
      { id: 2, name: 'فريزر', power: 800, quantity: 2, hours: 24 },
      { id: 3, name: 'مكيف', power: 2000, quantity: 5, hours: 12 },
      { id: 4, name: 'شفاط هواء', power: 1500, quantity: 1, hours: 12 },
      { id: 5, name: 'إضاءة', power: 40, quantity: 30, hours: 12 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    appliances: [
      { id: 1, name: 'مكيف غرف', power: 1500, quantity: 20, hours: 12 },
      { id: 2, name: 'سخان مياه', power: 2000, quantity: 20, hours: 2 },
      { id: 3, name: 'ثلاجة غرف', power: 100, quantity: 20, hours: 24 },
      { id: 4, name: 'إضاءة', power: 40, quantity: 100, hours: 12 },
      { id: 5, name: 'مصعد', power: 5000, quantity: 1, hours: 4 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    appliances: [
      { id: 1, name: 'مكيف', power: 2000, quantity: 10, hours: 10 },
      { id: 2, name: 'جهاز كمبيوتر', power: 250, quantity: 20, hours: 9 },
      { id: 3, name: 'إضاءة', power: 40, quantity: 50, hours: 10 },
      { id: 4, name: 'ماكينة صراف آلي (ATM)', power: 500, quantity: 2, hours: 24 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    appliances: [
      { id: 1, name: 'ثلاجة عرض ألبان', power: 1500, quantity: 2, hours: 24 },
      { id: 2, name: 'فريزر لحوم', power: 1200, quantity: 3, hours: 24 },
      { id: 3, name: 'مكيف', power: 2500, quantity: 4, hours: 16 },
      { id: 4, name: 'إضاءة', power: 40, quantity: 40, hours: 16 },
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    appliances: [
      { id: 1, name: 'مضخة وقود', power: 1000, quantity: 4, hours: 12 },
      { id: 2, name: 'إضاءة خارجية', power: 200, quantity: 8, hours: 12 },
      { id: 3, name: 'مكيف (للإدارة)', power: 1500, quantity: 2, hours: 12 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    appliances: [
      { id: 1, name: 'طاحونة', power: 7500, quantity: 2, hours: 16 },
      { id: 2, name: 'مضخة مياه', power: 3000, quantity: 2, hours: 12 },
      { id: 3, name: 'مولد لحام', power: 5000, quantity: 1, hours: 6 },
      { id: 4, name: 'إضاءة كاشفة', power: 500, quantity: 10, hours: 12 },
    ]
  }
];

export function calculateSolarSystem(appliances) {
  let totalPowerWatts = 0;
  let totalDailyEnergyWh = 0;

  appliances.forEach(appliance => {
    const p = parseFloat(appliance.power) || 0;
    const q = parseFloat(appliance.quantity) || 0;
    const h = parseFloat(appliance.hours) || 0;

    const appliancePower = p * q;
    const applianceDailyEnergy = appliancePower * h;

    totalPowerWatts += appliancePower;
    totalDailyEnergyWh += applianceDailyEnergy;
  });

  // Business logic formulas for Solar System
  // Safety factor for inverter: 1.25 (25% extra)
  const inverterSizeVA = totalPowerWatts * 1.25;
  const inverterSizeKVA = inverterSizeVA / 1000;

  // Panel calculations: Assume average 5 sun hours per day
  // Account for system losses (efficiency ~ 80%)
  const dailyEnergyRequiredWh = totalDailyEnergyWh / 0.8;
  const totalPanelWattage = dailyEnergyRequiredWh / 5;

  // Assume we are using 500W panels
  const panelWattage = 500;
  const numberOfPanels = Math.ceil(totalPanelWattage / panelWattage);

  // Battery calculations: Assume 1 day of autonomy
  // System voltage typical: 48V for larger systems
  const systemVoltage = 48;
  // Lead-acid DoD 50%, Lithium DoD 80% (let's assume 80% for modern systems)
  const depthOfDischarge = 0.8;
  const batteryCapacityAh = dailyEnergyRequiredWh / (systemVoltage * depthOfDischarge);

  return {
    totalPowerWatts,
    totalDailyEnergyWh,
    inverterSizeKVA,
    totalPanelWattage,
    numberOfPanels,
    panelWattage,
    batteryCapacityAh,
    systemVoltage,
  };
}
