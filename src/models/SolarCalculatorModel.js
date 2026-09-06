export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    defaultAppliances: [
      { id: '1', name: 'آلة صنع الثلج', power: 5000, quantity: 2, hours: 24 },
      { id: '2', name: 'إضاءة', power: 40, quantity: 10, hours: 12 },
    ],
  },
  {
    id: 'company',
    name: 'شركة',
    defaultAppliances: [
      { id: '1', name: 'مكيف', power: 1500, quantity: 4, hours: 8 },
      { id: '2', name: 'كمبيوتر', power: 300, quantity: 10, hours: 8 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 20, hours: 10 },
    ],
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultAppliances: [
      { id: '1', name: 'مضخة مياه', power: 2200, quantity: 1, hours: 6 },
      { id: '2', name: 'إضاءة محيطة', power: 100, quantity: 5, hours: 12 },
    ],
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultAppliances: [
      { id: '1', name: 'مراوح تهوية', power: 750, quantity: 4, hours: 24 },
      { id: '2', name: 'سخانات', power: 2000, quantity: 2, hours: 12 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 20, hours: 16 },
    ],
  },
  {
    id: 'greenhouses',
    name: 'بيوت محمية',
    defaultAppliances: [
      { id: '1', name: 'مضخة ري', power: 1500, quantity: 1, hours: 4 },
      { id: '2', name: 'مراوح تبريد', power: 500, quantity: 4, hours: 10 },
    ],
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultAppliances: [
      { id: '1', name: 'آلات إنتاج', power: 10000, quantity: 2, hours: 16 },
      { id: '2', name: 'إضاءة صناعية', power: 150, quantity: 20, hours: 16 },
    ],
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultAppliances: [
      { id: '1', name: 'مكيفات', power: 1500, quantity: 5, hours: 12 },
      { id: '2', name: 'أجهزة طبية', power: 2000, quantity: 2, hours: 8 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 15, hours: 14 },
    ],
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    defaultAppliances: [
      { id: '1', name: 'مكيفات مركزية', power: 5000, quantity: 4, hours: 24 },
      { id: '2', name: 'أجهزة عناية مركزة', power: 3000, quantity: 5, hours: 24 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 100, hours: 24 },
    ],
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultAppliances: [
      { id: '1', name: 'فرن كهربائي', power: 8000, quantity: 1, hours: 12 },
      { id: '2', name: 'عجانة', power: 1500, quantity: 2, hours: 6 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 10, hours: 14 },
    ],
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultAppliances: [
      { id: '1', name: 'ثلاجة', power: 300, quantity: 2, hours: 24 },
      { id: '2', name: 'مكيف', power: 1500, quantity: 1, hours: 12 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 5, hours: 12 },
    ],
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultAppliances: [
      { id: '1', name: 'آلات قطع ولحام', power: 3000, quantity: 2, hours: 8 },
      { id: '2', name: 'ضاغط هواء (كمبروسر)', power: 2200, quantity: 1, hours: 6 },
      { id: '3', name: 'إضاءة', power: 100, quantity: 5, hours: 10 },
    ],
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    defaultAppliances: [
      { id: '1', name: 'مضخة غاطسة', power: 4000, quantity: 1, hours: 8 },
    ],
  },
  {
    id: 'donkey_engine',
    name: 'دونكي',
    defaultAppliances: [
      { id: '1', name: 'محرك سحب مياه', power: 2200, quantity: 1, hours: 6 },
    ],
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultAppliances: [
      { id: '1', name: 'مكيفات', power: 2000, quantity: 6, hours: 6 },
      { id: '2', name: 'مكبر صوت', power: 200, quantity: 1, hours: 3 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 20, hours: 5 },
    ],
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultAppliances: [
      { id: '1', name: 'آلة طباعة', power: 5000, quantity: 2, hours: 10 },
      { id: '2', name: 'مكيفات', power: 1500, quantity: 3, hours: 10 },
    ],
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultAppliances: [
      { id: '1', name: 'آلة إسبريسو', power: 3000, quantity: 1, hours: 14 },
      { id: '2', name: 'ثلاجة عرض', power: 500, quantity: 2, hours: 24 },
      { id: '3', name: 'مكيفات', power: 2000, quantity: 2, hours: 14 },
    ],
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultAppliances: [
      { id: '1', name: 'ثلاجات ومجمدات', power: 800, quantity: 4, hours: 24 },
      { id: '2', name: 'مكيفات', power: 2000, quantity: 4, hours: 16 },
      { id: '3', name: 'أفران ومعدات طبخ', power: 4000, quantity: 2, hours: 12 },
    ],
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultAppliances: [
      { id: '1', name: 'مكيفات غرف', power: 1200, quantity: 20, hours: 12 },
      { id: '2', name: 'سخانات مياه', power: 1500, quantity: 10, hours: 6 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 100, hours: 12 },
    ],
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultAppliances: [
      { id: '1', name: 'مكيفات', power: 2000, quantity: 8, hours: 10 },
      { id: '2', name: 'أجهزة صراف آلي', power: 500, quantity: 2, hours: 24 },
      { id: '3', name: 'كمبيوترات', power: 300, quantity: 15, hours: 9 },
    ],
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultAppliances: [
      { id: '1', name: 'ثلاجات عرض', power: 1000, quantity: 6, hours: 24 },
      { id: '2', name: 'مجمدات', power: 1200, quantity: 4, hours: 24 },
      { id: '3', name: 'مكيفات', power: 2000, quantity: 4, hours: 16 },
    ],
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultAppliances: [
      { id: '1', name: 'مضخات وقود', power: 750, quantity: 4, hours: 24 },
      { id: '2', name: 'إضاءة خارجية', power: 200, quantity: 10, hours: 12 },
    ],
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultAppliances: [
      { id: '1', name: 'آلات حفر وطحن', power: 15000, quantity: 2, hours: 16 },
      { id: '2', name: 'مضخات مياه ضخمة', power: 5000, quantity: 2, hours: 12 },
      { id: '3', name: 'إضاءة كاشفة', power: 400, quantity: 20, hours: 12 },
    ],
  }
];

/**
 * Calculates the required solar system size based on appliance consumption.
 * @param {Array} appliances - Array of appliance objects { power, quantity, hours }
 * @returns {Object} - Calculated system requirements
 */
export function calculateSolarSystem(appliances) {
  // Total daily energy consumption in Watt-hours (Wh)
  const totalDailyEnergyWh = appliances.reduce((acc, curr) => {
    return acc + (Number(curr.power) * Number(curr.quantity) * Number(curr.hours));
  }, 0);

  // Total instantaneous power in Watts (W) to size the inverter
  const totalPowerW = appliances.reduce((acc, curr) => {
    return acc + (Number(curr.power) * Number(curr.quantity));
  }, 0);

  // System Losses Factor (Inefficiencies in wiring, dust, temperature, inverter efficiency)
  const systemLossFactor = 1.3;

  // Average Peak Sun Hours (PSH) for typical sunny regions (e.g., Middle East/Africa)
  const peakSunHours = 5.5;

  // 1. Solar Panels Array Size (kW)
  const requiredSolarArrayKw = (totalDailyEnergyWh * systemLossFactor) / (peakSunHours * 1000);

  // Number of 550W panels needed
  const panelWattage = 550;
  const numberOfPanels = Math.ceil((requiredSolarArrayKw * 1000) / panelWattage);

  // 2. Inverter Size (kW)
  // Multiply by 1.25 for safety margin (surge power)
  const requiredInverterKw = (totalPowerW * 1.25) / 1000;

  // 3. Battery Capacity
  // Assuming 48V system, 50% Depth of Discharge (DoD) for Lead-Acid or 80% for Lithium.
  // Let's use 80% DoD (Lithium) and 1 day of autonomy.
  const systemVoltage = 48;
  const depthOfDischarge = 0.8;
  const daysOfAutonomy = 1;
  const requiredBatteryAh = (totalDailyEnergyWh * daysOfAutonomy) / (systemVoltage * depthOfDischarge);

  // Number of 48V 100Ah Lithium batteries
  const batteryUnitAh = 100;
  const numberOfBatteries = Math.ceil(requiredBatteryAh / batteryUnitAh);

  return {
    totalDailyEnergyKwh: (totalDailyEnergyWh / 1000).toFixed(2),
    totalPowerKw: (totalPowerW / 1000).toFixed(2),
    requiredSolarArrayKw: requiredSolarArrayKw.toFixed(2),
    numberOfPanels,
    panelWattage,
    requiredInverterKw: requiredInverterKw.toFixed(2),
    requiredBatteryAh: requiredBatteryAh.toFixed(0),
    numberOfBatteries,
    systemVoltage,
    batteryUnitAh
  };
}
