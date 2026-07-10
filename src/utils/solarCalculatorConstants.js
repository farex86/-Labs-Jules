export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج',
    description: 'Ice Factory',
    appliances: [
      { id: 'compressor', name: 'ضاغط تبريد (Compressor)', defaultPower: 5000, defaultHours: 24, defaultQuantity: 2 },
      { id: 'water_pump', name: 'مضخة مياه', defaultPower: 1500, defaultHours: 12, defaultQuantity: 1 },
      { id: 'cooling_fan', name: 'مروحة تبريد', defaultPower: 500, defaultHours: 24, defaultQuantity: 4 }
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    description: 'Company/Office',
    appliances: [
      { id: 'ac', name: 'مكيف هواء', defaultPower: 1500, defaultHours: 10, defaultQuantity: 4 },
      { id: 'computer', name: 'جهاز كمبيوتر', defaultPower: 250, defaultHours: 10, defaultQuantity: 10 },
      { id: 'printer', name: 'طابعة', defaultPower: 500, defaultHours: 2, defaultQuantity: 2 },
      { id: 'lighting', name: 'إضاءة', defaultPower: 40, defaultHours: 12, defaultQuantity: 20 },
      { id: 'server', name: 'خادم شبكة (Server)', defaultPower: 800, defaultHours: 24, defaultQuantity: 1 }
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    description: 'Farm',
    appliances: [
      { id: 'irrigation_pump', name: 'مضخة ري', defaultPower: 3000, defaultHours: 6, defaultQuantity: 1 },
      { id: 'lighting', name: 'إضاءة خارجية', defaultPower: 100, defaultHours: 12, defaultQuantity: 10 }
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    description: 'Poultry Farm',
    appliances: [
      { id: 'exhaust_fan', name: 'مروحة شفط', defaultPower: 750, defaultHours: 24, defaultQuantity: 6 },
      { id: 'heater', name: 'دفاية', defaultPower: 2000, defaultHours: 12, defaultQuantity: 4 },
      { id: 'feeding_machine', name: 'آلة علف', defaultPower: 1000, defaultHours: 4, defaultQuantity: 2 },
      { id: 'lighting', name: 'إضاءة', defaultPower: 40, defaultHours: 16, defaultQuantity: 30 }
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    description: 'Greenhouses',
    appliances: [
      { id: 'cooling_pad_pump', name: 'مضخة تبريد', defaultPower: 1100, defaultHours: 12, defaultQuantity: 2 },
      { id: 'exhaust_fan', name: 'مروحة شفط', defaultPower: 750, defaultHours: 12, defaultQuantity: 4 },
      { id: 'lighting', name: 'إضاءة نمو', defaultPower: 600, defaultHours: 8, defaultQuantity: 10 }
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    description: 'Factory',
    appliances: [
      { id: 'heavy_machinery', name: 'آلات تصنيع', defaultPower: 10000, defaultHours: 16, defaultQuantity: 2 },
      { id: 'conveyor_belt', name: 'حزام ناقل', defaultPower: 2000, defaultHours: 16, defaultQuantity: 1 },
      { id: 'lighting', name: 'إضاءة مصنع', defaultPower: 150, defaultHours: 16, defaultQuantity: 50 },
      { id: 'ac', name: 'مكيفات مركزية', defaultPower: 5000, defaultHours: 16, defaultQuantity: 2 }
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    description: 'Dispensary/Clinic',
    appliances: [
      { id: 'ac', name: 'مكيف هواء', defaultPower: 1500, defaultHours: 12, defaultQuantity: 5 },
      { id: 'lighting', name: 'إضاءة', defaultPower: 40, defaultHours: 12, defaultQuantity: 30 },
      { id: 'medical_fridge', name: 'ثلاجة أدوية', defaultPower: 300, defaultHours: 24, defaultQuantity: 2 },
      { id: 'sterilizer', name: 'جهاز تعقيم', defaultPower: 1500, defaultHours: 4, defaultQuantity: 1 },
      { id: 'computer', name: 'جهاز كمبيوتر', defaultPower: 250, defaultHours: 12, defaultQuantity: 4 }
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    description: 'Hospital',
    appliances: [
      { id: 'central_ac', name: 'تكييف مركزي', defaultPower: 20000, defaultHours: 24, defaultQuantity: 1 },
      { id: 'lighting', name: 'إضاءة', defaultPower: 40, defaultHours: 24, defaultQuantity: 200 },
      { id: 'xray', name: 'جهاز أشعة', defaultPower: 5000, defaultHours: 4, defaultQuantity: 1 },
      { id: 'life_support', name: 'أجهزة عناية مركزة', defaultPower: 1000, defaultHours: 24, defaultQuantity: 10 },
      { id: 'large_fridge', name: 'ثلاجة كبيرة', defaultPower: 800, defaultHours: 24, defaultQuantity: 5 }
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    description: 'Bakery',
    appliances: [
      { id: 'electric_oven', name: 'فرن كهربائي', defaultPower: 15000, defaultHours: 12, defaultQuantity: 2 },
      { id: 'dough_mixer', name: 'عجانة', defaultPower: 3000, defaultHours: 8, defaultQuantity: 2 },
      { id: 'display_fridge', name: 'ثلاجة عرض', defaultPower: 600, defaultHours: 24, defaultQuantity: 2 },
      { id: 'lighting', name: 'إضاءة', defaultPower: 40, defaultHours: 16, defaultQuantity: 15 }
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    description: 'Shop',
    appliances: [
      { id: 'fridge', name: 'ثلاجة', defaultPower: 400, defaultHours: 24, defaultQuantity: 2 },
      { id: 'lighting', name: 'إضاءة', defaultPower: 40, defaultHours: 14, defaultQuantity: 5 },
      { id: 'fan', name: 'مروحة سقف', defaultPower: 80, defaultHours: 14, defaultQuantity: 2 },
      { id: 'pos', name: 'جهاز كاشير', defaultPower: 150, defaultHours: 14, defaultQuantity: 1 }
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    description: 'Workshop',
    appliances: [
      { id: 'welding_machine', name: 'ماكينة لحام', defaultPower: 4000, defaultHours: 6, defaultQuantity: 1 },
      { id: 'air_compressor', name: 'كمبروسر هواء', defaultPower: 2200, defaultHours: 8, defaultQuantity: 1 },
      { id: 'power_tools', name: 'معدات يدوية كهربائية', defaultPower: 1000, defaultHours: 4, defaultQuantity: 3 },
      { id: 'lighting', name: 'إضاءة ورشة', defaultPower: 100, defaultHours: 10, defaultQuantity: 8 }
    ]
  },
  {
    id: 'water_pump_station',
    name: 'مضخة موية',
    description: 'Water Pump',
    appliances: [
      { id: 'surface_pump', name: 'مضخة سطحية', defaultPower: 2200, defaultHours: 8, defaultQuantity: 1 }
    ]
  },
  {
    id: 'donkey_well',
    name: 'دونكي',
    description: 'Donkey (Water Well)',
    appliances: [
      { id: 'submersible_pump', name: 'مضخة غاطسة', defaultPower: 5500, defaultHours: 10, defaultQuantity: 1 },
      { id: 'booster_pump', name: 'مضخة رفع', defaultPower: 2200, defaultHours: 6, defaultQuantity: 1 },
      { id: 'lighting', name: 'إضاءة', defaultPower: 100, defaultHours: 12, defaultQuantity: 2 }
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    description: 'Mosque',
    appliances: [
      { id: 'ac', name: 'مكيف هواء', defaultPower: 2000, defaultHours: 6, defaultQuantity: 6 },
      { id: 'fan', name: 'مروحة', defaultPower: 80, defaultHours: 8, defaultQuantity: 15 },
      { id: 'lighting', name: 'إضاءة', defaultPower: 40, defaultHours: 6, defaultQuantity: 40 },
      { id: 'sound_system', name: 'نظام صوتي', defaultPower: 300, defaultHours: 5, defaultQuantity: 1 },
      { id: 'water_cooler', name: 'برادة مياه', defaultPower: 400, defaultHours: 24, defaultQuantity: 2 }
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    description: 'Printing Press',
    appliances: [
      { id: 'printing_machine', name: 'ماكينة طباعة', defaultPower: 5000, defaultHours: 10, defaultQuantity: 2 },
      { id: 'cutting_machine', name: 'مقص ورق', defaultPower: 1500, defaultHours: 4, defaultQuantity: 1 },
      { id: 'computer', name: 'جهاز كمبيوتر للتصميم', defaultPower: 400, defaultHours: 10, defaultQuantity: 3 },
      { id: 'ac', name: 'مكيف هواء', defaultPower: 2000, defaultHours: 10, defaultQuantity: 2 },
      { id: 'lighting', name: 'إضاءة', defaultPower: 60, defaultHours: 10, defaultQuantity: 20 }
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    description: 'Coffee Shop',
    appliances: [
      { id: 'espresso_machine', name: 'ماكينة اسبريسو', defaultPower: 3500, defaultHours: 16, defaultQuantity: 1 },
      { id: 'coffee_grinder', name: 'طاحونة قهوة', defaultPower: 400, defaultHours: 4, defaultQuantity: 2 },
      { id: 'fridge', name: 'ثلاجة عرض', defaultPower: 500, defaultHours: 24, defaultQuantity: 1 },
      { id: 'ice_maker', name: 'صانعة ثلج', defaultPower: 800, defaultHours: 24, defaultQuantity: 1 },
      { id: 'ac', name: 'مكيف هواء', defaultPower: 2000, defaultHours: 16, defaultQuantity: 2 },
      { id: 'lighting', name: 'إضاءة', defaultPower: 40, defaultHours: 16, defaultQuantity: 30 }
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    description: 'Restaurant',
    appliances: [
      { id: 'fridge', name: 'ثلاجة', defaultPower: 600, defaultHours: 24, defaultQuantity: 3 },
      { id: 'freezer', name: 'فريزر', defaultPower: 800, defaultHours: 24, defaultQuantity: 2 },
      { id: 'electric_stove', name: 'موقد كهربائي', defaultPower: 5000, defaultHours: 12, defaultQuantity: 2 },
      { id: 'exhaust_fan', name: 'مروحة شفط كبيرة', defaultPower: 1500, defaultHours: 16, defaultQuantity: 1 },
      { id: 'ac', name: 'مكيف هواء', defaultPower: 2500, defaultHours: 16, defaultQuantity: 4 },
      { id: 'lighting', name: 'إضاءة', defaultPower: 40, defaultHours: 16, defaultQuantity: 40 }
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    description: 'Hotel',
    appliances: [
      { id: 'ac', name: 'مكيف هواء', defaultPower: 1500, defaultHours: 12, defaultQuantity: 30 },
      { id: 'mini_fridge', name: 'ثلاجة صغيرة', defaultPower: 100, defaultHours: 24, defaultQuantity: 30 },
      { id: 'water_heater', name: 'سخان مياه', defaultPower: 1500, defaultHours: 4, defaultQuantity: 30 },
      { id: 'elevator', name: 'مصعد', defaultPower: 7500, defaultHours: 6, defaultQuantity: 1 },
      { id: 'lighting', name: 'إضاءة', defaultPower: 40, defaultHours: 12, defaultQuantity: 100 }
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    description: 'Bank',
    appliances: [
      { id: 'computer', name: 'جهاز كمبيوتر', defaultPower: 250, defaultHours: 10, defaultQuantity: 20 },
      { id: 'ac', name: 'مكيف هواء', defaultPower: 2000, defaultHours: 12, defaultQuantity: 6 },
      { id: 'atm', name: 'صراف آلي', defaultPower: 500, defaultHours: 24, defaultQuantity: 2 },
      { id: 'server', name: 'خادم شبكة', defaultPower: 1000, defaultHours: 24, defaultQuantity: 1 },
      { id: 'lighting', name: 'إضاءة', defaultPower: 40, defaultHours: 12, defaultQuantity: 60 }
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    description: 'Supermarket',
    appliances: [
      { id: 'display_fridge', name: 'ثلاجة عرض', defaultPower: 800, defaultHours: 24, defaultQuantity: 6 },
      { id: 'chest_freezer', name: 'فريزر عرض', defaultPower: 1000, defaultHours: 24, defaultQuantity: 4 },
      { id: 'ac', name: 'مكيف هواء', defaultPower: 2500, defaultHours: 16, defaultQuantity: 4 },
      { id: 'pos', name: 'جهاز كاشير', defaultPower: 200, defaultHours: 16, defaultQuantity: 3 },
      { id: 'lighting', name: 'إضاءة', defaultPower: 40, defaultHours: 16, defaultQuantity: 80 }
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    description: 'Gas Station',
    appliances: [
      { id: 'fuel_dispenser', name: 'مضخة وقود', defaultPower: 1500, defaultHours: 24, defaultQuantity: 4 },
      { id: 'canopy_lighting', name: 'إضاءة المظلة', defaultPower: 150, defaultHours: 12, defaultQuantity: 12 },
      { id: 'shop_fridge', name: 'ثلاجة عرض بالمتجر', defaultPower: 600, defaultHours: 24, defaultQuantity: 2 },
      { id: 'pos', name: 'جهاز كاشير', defaultPower: 150, defaultHours: 24, defaultQuantity: 1 }
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    description: 'Mining Company',
    appliances: [
      { id: 'crusher', name: 'كسارة', defaultPower: 30000, defaultHours: 12, defaultQuantity: 1 },
      { id: 'driller', name: 'حفار', defaultPower: 15000, defaultHours: 8, defaultQuantity: 2 },
      { id: 'heavy_pump', name: 'مضخة مياه كبيرة', defaultPower: 11000, defaultHours: 12, defaultQuantity: 2 },
      { id: 'ventilation_fan', name: 'مروحة تهوية منجم', defaultPower: 5000, defaultHours: 24, defaultQuantity: 4 },
      { id: 'lighting', name: 'إضاءة كاشفة', defaultPower: 1000, defaultHours: 12, defaultQuantity: 20 }
    ]
  }
];

export const SYSTEM_LOSS_FACTOR = 1.3; // 30% system losses
export const DEFAULT_SUN_HOURS = 5.5; // Average peak sun hours
