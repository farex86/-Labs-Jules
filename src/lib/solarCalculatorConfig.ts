export interface Device {
  id: string;
  name: string;
  powerWatts: number;
  quantity: number;
  hoursPerDay: number;
}

export interface FacilityPattern {
  id: string;
  name: string;
  icon?: string;
  defaultDevices: Device[];
}

export const FACILITY_PATTERNS: FacilityPattern[] = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    defaultDevices: [
      { id: 'ice_maker_large', name: 'ماكينة صنع ثلج كبيرة', powerWatts: 5000, quantity: 2, hoursPerDay: 24 },
      { id: 'freezer_room', name: 'غرفة تجميد', powerWatts: 3000, quantity: 1, hoursPerDay: 24 },
      { id: 'water_pump', name: 'مضخة مياه', powerWatts: 1500, quantity: 1, hoursPerDay: 12 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 50, quantity: 10, hoursPerDay: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    defaultDevices: [
      { id: 'computer', name: 'حاسوب مكتبي', powerWatts: 250, quantity: 10, hoursPerDay: 8 },
      { id: 'ac', name: 'مكيف هواء', powerWatts: 1500, quantity: 4, hoursPerDay: 8 },
      { id: 'printer', name: 'طابعة', powerWatts: 500, quantity: 2, hoursPerDay: 2 },
      { id: 'server', name: 'خادم شبكة', powerWatts: 400, quantity: 1, hoursPerDay: 24 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 40, quantity: 20, hoursPerDay: 9 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultDevices: [
      { id: 'surface_pump', name: 'مضخة مياه سطحية', powerWatts: 2200, quantity: 1, hoursPerDay: 6 },
      { id: 'lighting', name: 'إضاءة خارجية', powerWatts: 100, quantity: 5, hoursPerDay: 12 },
      { id: 'guard_room', name: 'أجهزة غرفة الحارس', powerWatts: 500, quantity: 1, hoursPerDay: 12 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultDevices: [
      { id: 'exhaust_fan', name: 'مروحة شفط', powerWatts: 750, quantity: 6, hoursPerDay: 24 },
      { id: 'feeder_motor', name: 'موتور علف', powerWatts: 1100, quantity: 2, hoursPerDay: 4 },
      { id: 'lighting', name: 'إضاءة حظيرة', powerWatts: 20, quantity: 50, hoursPerDay: 16 },
      { id: 'heater', name: 'دفاية (شتاء)', powerWatts: 2000, quantity: 4, hoursPerDay: 12 },
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    defaultDevices: [
      { id: 'cooling_pad_pump', name: 'مضخة تبريد', powerWatts: 750, quantity: 2, hoursPerDay: 10 },
      { id: 'exhaust_fan', name: 'مروحة تهوية', powerWatts: 1100, quantity: 4, hoursPerDay: 10 },
      { id: 'irrigation_pump', name: 'مضخة ري', powerWatts: 1500, quantity: 1, hoursPerDay: 4 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultDevices: [
      { id: 'heavy_machinery', name: 'آلات ثقيلة', powerWatts: 10000, quantity: 3, hoursPerDay: 12 },
      { id: 'conveyor_belt', name: 'سير ناقل', powerWatts: 2000, quantity: 2, hoursPerDay: 12 },
      { id: 'lighting', name: 'إضاءة صناعية', powerWatts: 150, quantity: 20, hoursPerDay: 12 },
      { id: 'office_equip', name: 'معدات مكتبية', powerWatts: 1000, quantity: 1, hoursPerDay: 8 },
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultDevices: [
      { id: 'medical_fridge', name: 'ثلاجة أدوية', powerWatts: 300, quantity: 2, hoursPerDay: 24 },
      { id: 'ac', name: 'مكيف هواء', powerWatts: 1500, quantity: 3, hoursPerDay: 12 },
      { id: 'sterilizer', name: 'جهاز تعقيم', powerWatts: 2000, quantity: 1, hoursPerDay: 3 },
      { id: 'ultrasound', name: 'جهاز موجات صوتية', powerWatts: 500, quantity: 1, hoursPerDay: 4 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 40, quantity: 15, hoursPerDay: 14 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    defaultDevices: [
      { id: 'icu_equip', name: 'أجهزة عناية مركزة', powerWatts: 1000, quantity: 5, hoursPerDay: 24 },
      { id: 'xray', name: 'جهاز أشعة', powerWatts: 5000, quantity: 1, hoursPerDay: 2 },
      { id: 'medical_fridge', name: 'ثلاجة بنك الدم/أدوية', powerWatts: 500, quantity: 4, hoursPerDay: 24 },
      { id: 'ac_central', name: 'تكييف مركزي', powerWatts: 20000, quantity: 1, hoursPerDay: 24 },
      { id: 'lighting', name: 'إضاءة عامة', powerWatts: 50, quantity: 100, hoursPerDay: 24 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultDevices: [
      { id: 'dough_mixer', name: 'عجانة', powerWatts: 3000, quantity: 2, hoursPerDay: 6 },
      { id: 'electric_oven', name: 'فرن كهربائي', powerWatts: 10000, quantity: 1, hoursPerDay: 10 },
      { id: 'proofer', name: 'خمارة عجين', powerWatts: 1500, quantity: 1, hoursPerDay: 8 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 50, quantity: 6, hoursPerDay: 14 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultDevices: [
      { id: 'fridge', name: 'ثلاجة عرض', powerWatts: 600, quantity: 2, hoursPerDay: 24 },
      { id: 'fan', name: 'مروحة', powerWatts: 75, quantity: 2, hoursPerDay: 14 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 20, quantity: 4, hoursPerDay: 14 },
      { id: 'tv', name: 'تلفاز', powerWatts: 100, quantity: 1, hoursPerDay: 10 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultDevices: [
      { id: 'welding_machine', name: 'ماكينة لحام', powerWatts: 4000, quantity: 1, hoursPerDay: 4 },
      { id: 'air_compressor', name: 'كمبروسر هواء', powerWatts: 2200, quantity: 1, hoursPerDay: 3 },
      { id: 'grinder', name: 'صاروخ جلخ', powerWatts: 800, quantity: 2, hoursPerDay: 2 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 100, quantity: 4, hoursPerDay: 10 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة مياه',
    defaultDevices: [
      { id: 'submersible_pump', name: 'مضخة غاطسة', powerWatts: 5500, quantity: 1, hoursPerDay: 8 },
    ]
  },
  {
    id: 'donkey_pump',
    name: 'دونكي (بئر مياه)',
    defaultDevices: [
      { id: 'deep_well_pump', name: 'مضخة بئر عميق', powerWatts: 7500, quantity: 1, hoursPerDay: 10 },
      { id: 'lighting', name: 'إضاءة ليلية', powerWatts: 50, quantity: 2, hoursPerDay: 12 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultDevices: [
      { id: 'ac', name: 'مكيف هواء', powerWatts: 2000, quantity: 4, hoursPerDay: 5 },
      { id: 'fans', name: 'مراوح سقف', powerWatts: 75, quantity: 10, hoursPerDay: 6 },
      { id: 'sound_system', name: 'نظام صوتي', powerWatts: 300, quantity: 1, hoursPerDay: 2 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 40, quantity: 20, hoursPerDay: 6 },
      { id: 'water_cooler', name: 'برادة مياه', powerWatts: 400, quantity: 2, hoursPerDay: 24 },
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultDevices: [
      { id: 'offset_printer', name: 'ماكينة طباعة أوفست', powerWatts: 7000, quantity: 1, hoursPerDay: 8 },
      { id: 'cutting_machine', name: 'مقص ورق كهربائي', powerWatts: 2000, quantity: 1, hoursPerDay: 4 },
      { id: 'ac', name: 'مكيف هواء', powerWatts: 1500, quantity: 2, hoursPerDay: 10 },
      { id: 'computers', name: 'حواسيب تصميم', powerWatts: 350, quantity: 3, hoursPerDay: 8 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultDevices: [
      { id: 'espresso_machine', name: 'ماكينة إسبريسو', powerWatts: 3500, quantity: 1, hoursPerDay: 12 },
      { id: 'coffee_grinder', name: 'مطحنة قهوة', powerWatts: 500, quantity: 2, hoursPerDay: 4 },
      { id: 'fridge', name: 'ثلاجة عرض', powerWatts: 600, quantity: 1, hoursPerDay: 24 },
      { id: 'ice_maker', name: 'صانعة ثلج', powerWatts: 400, quantity: 1, hoursPerDay: 12 },
      { id: 'ac', name: 'مكيف هواء', powerWatts: 2000, quantity: 2, hoursPerDay: 14 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultDevices: [
      { id: 'freezer', name: 'فريزر', powerWatts: 800, quantity: 2, hoursPerDay: 24 },
      { id: 'fridge', name: 'ثلاجة', powerWatts: 600, quantity: 2, hoursPerDay: 24 },
      { id: 'exhaust_hood', name: 'شفاط مطبخ', powerWatts: 1000, quantity: 1, hoursPerDay: 12 },
      { id: 'ac', name: 'مكيف هواء', powerWatts: 2000, quantity: 3, hoursPerDay: 12 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 50, quantity: 20, hoursPerDay: 12 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultDevices: [
      { id: 'room_ac', name: 'مكيفات غرف', powerWatts: 1200, quantity: 20, hoursPerDay: 12 },
      { id: 'water_heater', name: 'سخانات مياه', powerWatts: 1500, quantity: 20, hoursPerDay: 4 },
      { id: 'elevator', name: 'مصعد', powerWatts: 7000, quantity: 1, hoursPerDay: 6 },
      { id: 'laundry_machine', name: 'غسالة صناعية', powerWatts: 3000, quantity: 2, hoursPerDay: 8 },
      { id: 'lighting', name: 'إضاءة عامة وغرف', powerWatts: 40, quantity: 100, hoursPerDay: 14 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultDevices: [
      { id: 'ac_central', name: 'تكييف مركزي', powerWatts: 10000, quantity: 1, hoursPerDay: 10 },
      { id: 'computers', name: 'حواسيب', powerWatts: 250, quantity: 15, hoursPerDay: 9 },
      { id: 'server', name: 'خادم', powerWatts: 500, quantity: 1, hoursPerDay: 24 },
      { id: 'atm', name: 'صراف آلي', powerWatts: 400, quantity: 2, hoursPerDay: 24 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 40, quantity: 30, hoursPerDay: 10 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultDevices: [
      { id: 'display_fridge', name: 'ثلاجة عرض مفتوحة', powerWatts: 1200, quantity: 4, hoursPerDay: 24 },
      { id: 'freezer', name: 'فريزر لحوم/آيسكريم', powerWatts: 800, quantity: 3, hoursPerDay: 24 },
      { id: 'ac', name: 'مكيف هواء', powerWatts: 2500, quantity: 4, hoursPerDay: 16 },
      { id: 'pos', name: 'نقاط بيع (كاشير)', powerWatts: 150, quantity: 3, hoursPerDay: 16 },
      { id: 'lighting', name: 'إضاءة قوية', powerWatts: 60, quantity: 30, hoursPerDay: 16 },
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultDevices: [
      { id: 'fuel_dispenser', name: 'ماكينة تعبئة وقود', powerWatts: 750, quantity: 4, hoursPerDay: 24 },
      { id: 'canopy_lighting', name: 'إضاءة المظلة', powerWatts: 150, quantity: 8, hoursPerDay: 12 },
      { id: 'office_ac', name: 'مكيف الإدارة', powerWatts: 1500, quantity: 1, hoursPerDay: 12 },
      { id: 'air_compressor', name: 'منفاخ هواء إطارات', powerWatts: 2000, quantity: 1, hoursPerDay: 4 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultDevices: [
      { id: 'crusher', name: 'كسارة أحجار', powerWatts: 15000, quantity: 1, hoursPerDay: 10 },
      { id: 'water_pump_large', name: 'مضخة مياه كبيرة', powerWatts: 7500, quantity: 2, hoursPerDay: 12 },
      { id: 'extractor_fan', name: 'مراوح تهوية أنفاق', powerWatts: 3000, quantity: 4, hoursPerDay: 24 },
      { id: 'camp_lighting', name: 'إضاءة المعسكر', powerWatts: 100, quantity: 20, hoursPerDay: 12 },
      { id: 'camp_ac', name: 'مكيفات سكن العمال', powerWatts: 1500, quantity: 10, hoursPerDay: 10 },
    ]
  }
];

export interface SolarCalculationResult {
  totalDailyEnergyWh: number;
  totalPowerWatts: number;
  recommendedInverterWatts: number;
  recommendedBatteryCapacityWh: number;
  recommendedSolarPanelsWatts: number;
}

export function calculateSolarSystem(devices: Device[]): SolarCalculationResult {
  let totalDailyEnergyWh = 0;
  let totalPowerWatts = 0;

  devices.forEach(device => {
    const devicePower = device.powerWatts * device.quantity;
    totalPowerWatts += devicePower;
    totalDailyEnergyWh += devicePower * device.hoursPerDay;
  });

  // Calculate inverter size with 25% safety margin
  const recommendedInverterWatts = totalPowerWatts * 1.25;

  // Calculate battery capacity for 1 day of autonomy (system voltage usually 24V or 48V, here we just output Wh)
  // Allow for 50% depth of discharge for Lead Acid, or 80% for Lithium. Let's assume Lithium (divide by 0.8)
  const recommendedBatteryCapacityWh = totalDailyEnergyWh / 0.8;

  // Calculate solar panels required assuming average 5 peak sun hours per day
  const recommendedSolarPanelsWatts = totalDailyEnergyWh / 5;

  return {
    totalDailyEnergyWh,
    totalPowerWatts,
    recommendedInverterWatts,
    recommendedBatteryCapacityWh,
    recommendedSolarPanelsWatts
  };
}
