// Consumption Patterns with default devices
export const CONSUMPTION_PATTERNS = [
  {
    id: 'ice_factory',
    nameAr: 'مصنع ثلج',
    nameEn: 'Ice Factory',
    devices: [
      { id: '1', nameAr: 'ماكينة صنع الثلج', nameEn: 'Ice Making Machine', watts: 5000, quantity: 2, hours: 24 },
      { id: '2', nameAr: 'غرفة تبريد', nameEn: 'Cold Room', watts: 3000, quantity: 1, hours: 24 },
      { id: '3', nameAr: 'إضاءة', nameEn: 'Lighting', watts: 50, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'company',
    nameAr: 'شركة',
    nameEn: 'Company',
    devices: [
      { id: '1', nameAr: 'مكيف هواء', nameEn: 'Air Conditioner', watts: 1500, quantity: 5, hours: 8 },
      { id: '2', nameAr: 'جهاز كمبيوتر', nameEn: 'Computer', watts: 200, quantity: 10, hours: 8 },
      { id: '3', nameAr: 'إضاءة', nameEn: 'Lighting', watts: 40, quantity: 20, hours: 8 },
      { id: '4', nameAr: 'طابعة', nameEn: 'Printer', watts: 500, quantity: 2, hours: 2 },
    ]
  },
  {
    id: 'farm',
    nameAr: 'مزرعة',
    nameEn: 'Farm',
    devices: [
      { id: '1', nameAr: 'مضخة مياه', nameEn: 'Water Pump', watts: 2200, quantity: 1, hours: 6 },
      { id: '2', nameAr: 'إضاءة خارجية', nameEn: 'Outdoor Lighting', watts: 100, quantity: 5, hours: 12 },
    ]
  },
  {
    id: 'poultry_farm',
    nameAr: 'مزرعة دواجن',
    nameEn: 'Poultry Farm',
    devices: [
      { id: '1', nameAr: 'مراوح تهوية', nameEn: 'Ventilation Fans', watts: 750, quantity: 4, hours: 24 },
      { id: '2', nameAr: 'نظام تدفئة', nameEn: 'Heating System', watts: 2000, quantity: 2, hours: 12 },
      { id: '3', nameAr: 'إضاءة', nameEn: 'Lighting', watts: 40, quantity: 20, hours: 16 },
      { id: '4', nameAr: 'نظام تغذية آلي', nameEn: 'Automated Feeding', watts: 500, quantity: 1, hours: 4 },
    ]
  },
  {
    id: 'greenhouse',
    nameAr: 'بيوت محمية',
    nameEn: 'Greenhouses',
    devices: [
      { id: '1', nameAr: 'مضخة ري', nameEn: 'Irrigation Pump', watts: 1100, quantity: 1, hours: 4 },
      { id: '2', nameAr: 'مراوح تبريد', nameEn: 'Cooling Fans', watts: 500, quantity: 4, hours: 8 },
      { id: '3', nameAr: 'نظام تحكم', nameEn: 'Control System', watts: 100, quantity: 1, hours: 24 },
    ]
  },
  {
    id: 'factory',
    nameAr: 'مصنع',
    nameEn: 'Factory',
    devices: [
      { id: '1', nameAr: 'آلات تصنيع', nameEn: 'Manufacturing Machinery', watts: 10000, quantity: 2, hours: 8 },
      { id: '2', nameAr: 'إضاءة صناعية', nameEn: 'Industrial Lighting', watts: 100, quantity: 50, hours: 10 },
      { id: '3', nameAr: 'مكيفات مركزية', nameEn: 'Central AC', watts: 5000, quantity: 2, hours: 10 },
    ]
  },
  {
    id: 'clinic',
    nameAr: 'مستوصف',
    nameEn: 'Clinic',
    devices: [
      { id: '1', nameAr: 'مكيف هواء', nameEn: 'Air Conditioner', watts: 1500, quantity: 4, hours: 12 },
      { id: '2', nameAr: 'ثلاجة أدوية', nameEn: 'Medicine Refrigerator', watts: 300, quantity: 1, hours: 24 },
      { id: '3', nameAr: 'معدات طبية', nameEn: 'Medical Equipment', watts: 1000, quantity: 2, hours: 4 },
      { id: '4', nameAr: 'إضاءة', nameEn: 'Lighting', watts: 40, quantity: 20, hours: 12 },
    ]
  },
  {
    id: 'hospital',
    nameAr: 'مستشفى',
    nameEn: 'Hospital',
    devices: [
      { id: '1', nameAr: 'تكييف مركزي', nameEn: 'Central AC', watts: 15000, quantity: 2, hours: 24 },
      { id: '2', nameAr: 'أجهزة عناية مركزة', nameEn: 'ICU Equipment', watts: 1000, quantity: 10, hours: 24 },
      { id: '3', nameAr: 'إضاءة', nameEn: 'Lighting', watts: 40, quantity: 200, hours: 24 },
      { id: '4', nameAr: 'مصاعد', nameEn: 'Elevators', watts: 10000, quantity: 2, hours: 12 },
    ]
  },
  {
    id: 'bakery',
    nameAr: 'مخبز',
    nameEn: 'Bakery',
    devices: [
      { id: '1', nameAr: 'فرن كهربائي', nameEn: 'Electric Oven', watts: 5000, quantity: 2, hours: 8 },
      { id: '2', nameAr: 'عجانة', nameEn: 'Dough Mixer', watts: 1500, quantity: 2, hours: 4 },
      { id: '3', nameAr: 'ثلاجة عرض', nameEn: 'Display Fridge', watts: 800, quantity: 1, hours: 24 },
    ]
  },
  {
    id: 'shop',
    nameAr: 'دكان',
    nameEn: 'Shop',
    devices: [
      { id: '1', nameAr: 'ثلاجة', nameEn: 'Refrigerator', watts: 500, quantity: 2, hours: 24 },
      { id: '2', nameAr: 'مكيف هواء', nameEn: 'Air Conditioner', watts: 1500, quantity: 1, hours: 12 },
      { id: '3', nameAr: 'إضاءة', nameEn: 'Lighting', watts: 40, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'workshop',
    nameAr: 'ورشة',
    nameEn: 'Workshop',
    devices: [
      { id: '1', nameAr: 'ماكينة لحام', nameEn: 'Welding Machine', watts: 4000, quantity: 1, hours: 4 },
      { id: '2', nameAr: 'صاروخ جلخ', nameEn: 'Grinder', watts: 800, quantity: 2, hours: 3 },
      { id: '3', nameAr: 'كمبروسر هواء', nameEn: 'Air Compressor', watts: 2000, quantity: 1, hours: 2 },
    ]
  },
  {
    id: 'water_pump',
    nameAr: 'مضخة موية',
    nameEn: 'Water Pump Station',
    devices: [
      { id: '1', nameAr: 'مضخة غاطسة', nameEn: 'Submersible Pump', watts: 5500, quantity: 1, hours: 6 },
    ]
  },
  {
    id: 'donkey_engine',
    nameAr: 'دونكي',
    nameEn: 'Donkey Engine (Water Well)',
    devices: [
      { id: '1', nameAr: 'مضخة مياه بئر', nameEn: 'Well Pump', watts: 3000, quantity: 1, hours: 5 },
    ]
  },
  {
    id: 'mosque',
    nameAr: 'مسجد',
    nameEn: 'Mosque',
    devices: [
      { id: '1', nameAr: 'مكيف هواء', nameEn: 'Air Conditioner', watts: 2000, quantity: 6, hours: 6 },
      { id: '2', nameAr: 'مكبر صوت', nameEn: 'Loudspeaker', watts: 100, quantity: 4, hours: 2 },
      { id: '3', nameAr: 'مراوح', nameEn: 'Fans', watts: 80, quantity: 10, hours: 6 },
      { id: '4', nameAr: 'إضاءة', nameEn: 'Lighting', watts: 40, quantity: 30, hours: 6 },
    ]
  },
  {
    id: 'printing_press',
    nameAr: 'مطبعة',
    nameEn: 'Printing Press',
    devices: [
      { id: '1', nameAr: 'آلة طباعة', nameEn: 'Printing Press Machine', watts: 6000, quantity: 2, hours: 8 },
      { id: '2', nameAr: 'آلة قص ورق', nameEn: 'Paper Cutter', watts: 1500, quantity: 1, hours: 4 },
      { id: '3', nameAr: 'إضاءة', nameEn: 'Lighting', watts: 50, quantity: 20, hours: 10 },
    ]
  },
  {
    id: 'coffee_shop',
    nameAr: 'كوفي شوب',
    nameEn: 'Coffee Shop',
    devices: [
      { id: '1', nameAr: 'آلة إسبريسو', nameEn: 'Espresso Machine', watts: 3500, quantity: 1, hours: 12 },
      { id: '2', nameAr: 'ثلاجة عرض', nameEn: 'Display Fridge', watts: 800, quantity: 2, hours: 24 },
      { id: '3', nameAr: 'مكيف هواء', nameEn: 'Air Conditioner', watts: 2000, quantity: 2, hours: 14 },
      { id: '4', nameAr: 'صانعة ثلج', nameEn: 'Ice Maker', watts: 500, quantity: 1, hours: 24 },
    ]
  },
  {
    id: 'restaurant',
    nameAr: 'مطعم',
    nameEn: 'Restaurant',
    devices: [
      { id: '1', nameAr: 'ثلاجة/فريزر', nameEn: 'Fridge/Freezer', watts: 1000, quantity: 4, hours: 24 },
      { id: '2', nameAr: 'مكيف هواء', nameEn: 'Air Conditioner', watts: 2000, quantity: 4, hours: 12 },
      { id: '3', nameAr: 'إضاءة', nameEn: 'Lighting', watts: 40, quantity: 30, hours: 14 },
      { id: '4', nameAr: 'شفاط هواء', nameEn: 'Exhaust Hood', watts: 1500, quantity: 1, hours: 12 },
    ]
  },
  {
    id: 'hotel',
    nameAr: 'فندق',
    nameEn: 'Hotel',
    devices: [
      { id: '1', nameAr: 'مكيف غرف', nameEn: 'Room AC', watts: 1500, quantity: 50, hours: 12 },
      { id: '2', nameAr: 'ثلاجة صغيرة', nameEn: 'Mini Fridge', watts: 100, quantity: 50, hours: 24 },
      { id: '3', nameAr: 'سخان مياه', nameEn: 'Water Heater', watts: 2000, quantity: 10, hours: 4 },
      { id: '4', nameAr: 'إضاءة ومصاعد', nameEn: 'Lighting & Elevators', watts: 15000, quantity: 1, hours: 24 },
    ]
  },
  {
    id: 'bank',
    nameAr: 'بنك',
    nameEn: 'Bank',
    devices: [
      { id: '1', nameAr: 'مكيف هواء مركزي', nameEn: 'Central AC', watts: 10000, quantity: 1, hours: 10 },
      { id: '2', nameAr: 'أجهزة كمبيوتر', nameEn: 'Computers', watts: 200, quantity: 30, hours: 10 },
      { id: '3', nameAr: 'صراف آلي (ATM)', nameEn: 'ATM', watts: 500, quantity: 3, hours: 24 },
      { id: '4', nameAr: 'سيرفرات', nameEn: 'Servers', watts: 2000, quantity: 1, hours: 24 },
    ]
  },
  {
    id: 'supermarket',
    nameAr: 'سوبر ماركت',
    nameEn: 'Supermarket',
    devices: [
      { id: '1', nameAr: 'ثلاجات عرض', nameEn: 'Display Fridges', watts: 1500, quantity: 10, hours: 24 },
      { id: '2', nameAr: 'فريزر', nameEn: 'Freezers', watts: 2000, quantity: 5, hours: 24 },
      { id: '3', nameAr: 'مكيف هواء', nameEn: 'Air Conditioner', watts: 3000, quantity: 4, hours: 16 },
      { id: '4', nameAr: 'إضاءة', nameEn: 'Lighting', watts: 50, quantity: 60, hours: 16 },
    ]
  },
  {
    id: 'gas_station',
    nameAr: 'طرمبة وقود',
    nameEn: 'Gas Station',
    devices: [
      { id: '1', nameAr: 'مضخة وقود', nameEn: 'Fuel Pump', watts: 1500, quantity: 4, hours: 10 },
      { id: '2', nameAr: 'مكيف البقالة', nameEn: 'Mart AC', watts: 2000, quantity: 2, hours: 24 },
      { id: '3', nameAr: 'إضاءة المظلة', nameEn: 'Canopy Lighting', watts: 200, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'mining_company',
    nameAr: 'شركة تعدين',
    nameEn: 'Mining Company',
    devices: [
      { id: '1', nameAr: 'كسارة', nameEn: 'Crusher', watts: 15000, quantity: 1, hours: 10 },
      { id: '2', nameAr: 'سيور ناقلة', nameEn: 'Conveyor Belts', watts: 5000, quantity: 2, hours: 10 },
      { id: '3', nameAr: 'طواحين', nameEn: 'Mills', watts: 20000, quantity: 1, hours: 10 },
      { id: '4', nameAr: 'إضاءة المخيم', nameEn: 'Camp Lighting', watts: 5000, quantity: 1, hours: 12 },
    ]
  }
];

// Calculation Logic
export const calculateTotalConsumption = (devices) => {
  let totalWatts = 0;
  let totalDailyWattHours = 0;

  devices.forEach(device => {
    const power = (Number(device.watts) || 0) * (Number(device.quantity) || 0);
    totalWatts += power;
    totalDailyWattHours += power * (Number(device.hours) || 0);
  });

  return {
    totalWatts,
    totalDailyWattHours
  };
};

export const calculateSystemRequirements = (totalWatts, totalDailyWattHours) => {
  // Constants for typical solar calculations
  const PEAK_SUN_HOURS = 5; // Average peak sun hours
  const SYSTEM_EFFICIENCY = 0.8; // System losses (20%)
  const BATTERY_DOD = 0.5; // Depth of Discharge for Lead Acid (or use 0.8 for Lithium)
  const BATTERY_VOLTAGE = 48; // System voltage
  const INVERTER_SAFETY_FACTOR = 1.25; // 25% safety margin

  // 1. Solar Panel Capacity Required (Watts)
  const recommendedSolarCapacity = (totalDailyWattHours / PEAK_SUN_HOURS) / SYSTEM_EFFICIENCY;

  // 2. Battery Capacity Required (Amp-Hours)
  // To cover 1 day of autonomy
  const recommendedBatteryCapacityAh = (totalDailyWattHours / BATTERY_VOLTAGE) / BATTERY_DOD;

  // 3. Inverter Size Required (Watts)
  const recommendedInverterSize = totalWatts * INVERTER_SAFETY_FACTOR;

  return {
    recommendedSolarCapacity: Math.ceil(recommendedSolarCapacity),
    recommendedBatteryCapacityAh: Math.ceil(recommendedBatteryCapacityAh),
    recommendedInverterSize: Math.ceil(recommendedInverterSize),
    batteryVoltage: BATTERY_VOLTAGE
  };
};
