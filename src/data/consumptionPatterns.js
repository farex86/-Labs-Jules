export const SYSTEM_CONSTANTS = {
  INVERTER_EFFICIENCY: 0.9,
  BATTERY_EFFICIENCY: 0.85,
  BATTERY_DOD: 0.5, // Depth of Discharge
  SYSTEM_LOSSES: 0.2, // 20% system losses
  PEAK_SUN_HOURS: 5, // Default average peak sun hours
  SYSTEM_VOLTAGE: 48, // Default system voltage (V)
};

export const CONSUMPTION_PATTERNS = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج (Ice Factory)',
    defaultDevices: [
      { name: 'صانعة ثلج (Ice Maker)', quantity: 2, powerW: 5000, hoursPerDay: 24 },
      { name: 'ثلاجة تبريد (Cooler)', quantity: 4, powerW: 1000, hoursPerDay: 24 },
      { name: 'إضاءة (Lighting)', quantity: 10, powerW: 40, hoursPerDay: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة (Company)',
    defaultDevices: [
      { name: 'مكيف (AC)', quantity: 5, powerW: 1500, hoursPerDay: 8 },
      { name: 'حاسوب (Computer)', quantity: 10, powerW: 200, hoursPerDay: 8 },
      { name: 'إضاءة (Lighting)', quantity: 20, powerW: 40, hoursPerDay: 10 },
      { name: 'طابعة (Printer)', quantity: 2, powerW: 500, hoursPerDay: 2 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة (Farm)',
    defaultDevices: [
      { name: 'مضخة مياه (Water Pump)', quantity: 1, powerW: 3000, hoursPerDay: 6 },
      { name: 'إضاءة محيطة (Outdoor Lighting)', quantity: 10, powerW: 50, hoursPerDay: 12 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن (Poultry Farm)',
    defaultDevices: [
      { name: 'مروحة تهوية (Ventilation Fan)', quantity: 10, powerW: 300, hoursPerDay: 24 },
      { name: 'إضاءة (Lighting)', quantity: 20, powerW: 40, hoursPerDay: 18 },
      { name: 'نظام تدفئة (Heating System)', quantity: 2, powerW: 2000, hoursPerDay: 12 },
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية (Greenhouses)',
    defaultDevices: [
      { name: 'مضخة ري (Irrigation Pump)', quantity: 2, powerW: 1500, hoursPerDay: 4 },
      { name: 'مروحة تهوية (Ventilation Fan)', quantity: 4, powerW: 300, hoursPerDay: 10 },
      { name: 'إضاءة (Lighting)', quantity: 10, powerW: 50, hoursPerDay: 8 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع (Factory)',
    defaultDevices: [
      { name: 'آلة صناعية (Industrial Machine)', quantity: 5, powerW: 5000, hoursPerDay: 12 },
      { name: 'مكيف مركزي (Central AC)', quantity: 2, powerW: 10000, hoursPerDay: 12 },
      { name: 'إضاءة (Lighting)', quantity: 50, powerW: 40, hoursPerDay: 14 },
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف (Clinic)',
    defaultDevices: [
      { name: 'مكيف (AC)', quantity: 5, powerW: 1500, hoursPerDay: 10 },
      { name: 'ثلاجة أدوية (Medical Fridge)', quantity: 2, powerW: 300, hoursPerDay: 24 },
      { name: 'معدات طبية (Medical Equipment)', quantity: 3, powerW: 1000, hoursPerDay: 8 },
      { name: 'إضاءة (Lighting)', quantity: 20, powerW: 40, hoursPerDay: 12 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفي (Hospital)',
    defaultDevices: [
      { name: 'مكيف (AC)', quantity: 30, powerW: 1500, hoursPerDay: 24 },
      { name: 'ثلاجة أدوية (Medical Fridge)', quantity: 10, powerW: 300, hoursPerDay: 24 },
      { name: 'معدات طبية (Medical Equipment)', quantity: 20, powerW: 2000, hoursPerDay: 12 },
      { name: 'إضاءة (Lighting)', quantity: 100, powerW: 40, hoursPerDay: 24 },
      { name: 'مصعد (Elevator)', quantity: 2, powerW: 10000, hoursPerDay: 10 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز (Bakery)',
    defaultDevices: [
      { name: 'فرن كهربائي (Electric Oven)', quantity: 2, powerW: 10000, hoursPerDay: 10 },
      { name: 'عجانة (Mixer)', quantity: 2, powerW: 1500, hoursPerDay: 6 },
      { name: 'ثلاجة (Fridge)', quantity: 2, powerW: 800, hoursPerDay: 24 },
      { name: 'إضاءة (Lighting)', quantity: 10, powerW: 40, hoursPerDay: 12 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان (Shop)',
    defaultDevices: [
      { name: 'ثلاجة (Fridge)', quantity: 2, powerW: 500, hoursPerDay: 24 },
      { name: 'مكيف (AC)', quantity: 1, powerW: 1500, hoursPerDay: 12 },
      { name: 'إضاءة (Lighting)', quantity: 5, powerW: 40, hoursPerDay: 12 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة (Workshop)',
    defaultDevices: [
      { name: 'آلة لحام (Welding Machine)', quantity: 1, powerW: 4000, hoursPerDay: 4 },
      { name: 'صاروخ جلخ (Grinder)', quantity: 2, powerW: 1000, hoursPerDay: 4 },
      { name: 'كمبروسر هواء (Air Compressor)', quantity: 1, powerW: 2000, hoursPerDay: 6 },
      { name: 'إضاءة (Lighting)', quantity: 10, powerW: 40, hoursPerDay: 10 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية (Water Pump)',
    defaultDevices: [
      { name: 'مضخة غاطسة (Submersible Pump)', quantity: 1, powerW: 5000, hoursPerDay: 8 },
    ]
  },
  {
    id: 'donkey_pump',
    name: 'دونكي (Donkey Pump)',
    defaultDevices: [
      { name: 'مضخة مياه (Water Pump)', quantity: 1, powerW: 2000, hoursPerDay: 10 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد (Mosque)',
    defaultDevices: [
      { name: 'مكيف (AC)', quantity: 4, powerW: 1500, hoursPerDay: 6 },
      { name: 'إضاءة (Lighting)', quantity: 20, powerW: 40, hoursPerDay: 6 },
      { name: 'مكبر صوت (Speaker)', quantity: 1, powerW: 200, hoursPerDay: 5 },
      { name: 'مروحة (Fan)', quantity: 10, powerW: 100, hoursPerDay: 8 },
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة (Printing Press)',
    defaultDevices: [
      { name: 'آلة طباعة (Printing Machine)', quantity: 2, powerW: 5000, hoursPerDay: 8 },
      { name: 'حاسوب (Computer)', quantity: 3, powerW: 200, hoursPerDay: 8 },
      { name: 'مكيف (AC)', quantity: 2, powerW: 1500, hoursPerDay: 8 },
      { name: 'إضاءة (Lighting)', quantity: 15, powerW: 40, hoursPerDay: 10 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب (Coffee Shop)',
    defaultDevices: [
      { name: 'ماكينة إسبريسو (Espresso Machine)', quantity: 1, powerW: 3000, hoursPerDay: 12 },
      { name: 'ثلاجة عرض (Display Fridge)', quantity: 2, powerW: 600, hoursPerDay: 24 },
      { name: 'مكيف (AC)', quantity: 2, powerW: 1500, hoursPerDay: 14 },
      { name: 'إضاءة (Lighting)', quantity: 15, powerW: 40, hoursPerDay: 14 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم (Restaurant)',
    defaultDevices: [
      { name: 'ثلاجة (Fridge/Freezer)', quantity: 4, powerW: 800, hoursPerDay: 24 },
      { name: 'مكيف (AC)', quantity: 4, powerW: 1500, hoursPerDay: 14 },
      { name: 'إضاءة (Lighting)', quantity: 20, powerW: 40, hoursPerDay: 14 },
      { name: 'شفاط هواء (Exhaust Fan)', quantity: 2, powerW: 500, hoursPerDay: 14 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق (Hotel)',
    defaultDevices: [
      { name: 'مكيف (AC)', quantity: 20, powerW: 1500, hoursPerDay: 16 },
      { name: 'إضاءة (Lighting)', quantity: 100, powerW: 40, hoursPerDay: 12 },
      { name: 'تلفزيون (TV)', quantity: 20, powerW: 100, hoursPerDay: 6 },
      { name: 'مصعد (Elevator)', quantity: 1, powerW: 8000, hoursPerDay: 10 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك (Bank)',
    defaultDevices: [
      { name: 'مكيف (AC)', quantity: 10, powerW: 1500, hoursPerDay: 10 },
      { name: 'حاسوب (Computer)', quantity: 20, powerW: 200, hoursPerDay: 10 },
      { name: 'إضاءة (Lighting)', quantity: 40, powerW: 40, hoursPerDay: 12 },
      { name: 'صراف آلي (ATM)', quantity: 2, powerW: 300, hoursPerDay: 24 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت (Supermarket)',
    defaultDevices: [
      { name: 'ثلاجة عرض (Display Fridge)', quantity: 10, powerW: 800, hoursPerDay: 24 },
      { name: 'مكيف (AC)', quantity: 5, powerW: 1500, hoursPerDay: 16 },
      { name: 'إضاءة (Lighting)', quantity: 40, powerW: 40, hoursPerDay: 16 },
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود (Gas Station)',
    defaultDevices: [
      { name: 'مضخة وقود (Fuel Dispenser)', quantity: 4, powerW: 1000, hoursPerDay: 24 },
      { name: 'إضاءة خارجية (Outdoor Lighting)', quantity: 10, powerW: 100, hoursPerDay: 12 },
      { name: 'مكيف (AC)', quantity: 2, powerW: 1500, hoursPerDay: 24 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين (Mining Company)',
    defaultDevices: [
      { name: 'معدات تعدين (Mining Equipment)', quantity: 5, powerW: 5000, hoursPerDay: 24 },
      { name: 'إضاءة كاشفة (Floodlights)', quantity: 20, powerW: 400, hoursPerDay: 12 },
      { name: 'مكيف (AC)', quantity: 5, powerW: 1500, hoursPerDay: 24 },
      { name: 'مضخة مياه (Water Pump)', quantity: 2, powerW: 3000, hoursPerDay: 12 },
    ]
  }
];
