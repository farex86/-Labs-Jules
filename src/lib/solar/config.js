// System constants for solar calculations
export const SOLAR_CONSTANTS = {
  // Average peak sun hours per day (varies by region, setting a reasonable default for MENA/Africa)
  PEAK_SUN_HOURS: 5.5,
  // System losses (wiring, dust, temperature) - typically 20%
  SYSTEM_LOSS_FACTOR: 0.8,
  // Inverter efficiency - typically 90-95%
  INVERTER_EFFICIENCY: 0.9,
  // Inverter safety margin (oversizing inverter for surge/startup loads) - 25%
  INVERTER_SAFETY_MARGIN: 1.25,
  // Battery Depth of Discharge (DoD) - For Lead Acid usually 50%, for Lithium 80%
  // Using 80% as lithium is becoming standard
  BATTERY_DOD: 0.8,
  // Battery system voltage (typically 12V, 24V, or 48V)
  // Can be calculated dynamically, but defaulting to 48V for larger systems
  DEFAULT_BATTERY_VOLTAGE: 48,
  // Days of autonomy (how many days the battery can supply power without sun)
  DAYS_OF_AUTONOMY: 1.5,
  // Battery efficiency (losses during charge/discharge)
  BATTERY_EFFICIENCY: 0.9,
};

// Common devices to prepopulate lists
export const COMMON_DEVICES = {
  LIGHT_LED: { name: 'لمبة ليد (LED Light)', power: 10, hours: 8 },
  FAN: { name: 'مروحة سقف (Ceiling Fan)', power: 75, hours: 10 },
  TV: { name: 'تلفزيون (TV)', power: 100, hours: 5 },
  FRIDGE: { name: 'ثلاجة (Refrigerator)', power: 150, hours: 24 }, // Compressor doesn't run 24/7, but we average or use 24h * lower power
  AC_1_TON: { name: 'مكيف 1 طن (AC 1 Ton)', power: 1200, hours: 8 },
  AC_1_5_TON: { name: 'مكيف 1.5 طن (AC 1.5 Ton)', power: 1800, hours: 8 },
  WATER_PUMP: { name: 'مضخة ماء (Water Pump 1HP)', power: 750, hours: 2 },
  COMPUTER: { name: 'كمبيوتر (Computer)', power: 250, hours: 8 },
  LAPTOP: { name: 'لابتوب (Laptop)', power: 65, hours: 6 },
  ROUTER: { name: 'راوتر انترنت (WiFi Router)', power: 15, hours: 24 },
  CCTV: { name: 'كاميرات مراقبة (CCTV)', power: 30, hours: 24 },
};

// Facility types (انماط استهلاك)
export const FACILITY_PATTERNS = [
  {
    id: 'custom',
    name: 'تخصيص يدوي (Custom)',
    description: 'أضف أجهزتك الخاصة',
    devices: [],
  },
  {
    id: 'mosque',
    name: 'مسجد (Mosque)',
    description: 'إضاءة، مراوح، مكبرات صوت، ومكيفات تعمل وقت الصلوات',
    devices: [
      { id: '1', ...COMMON_DEVICES.LIGHT_LED, quantity: 20, hours: 6 },
      { id: '2', ...COMMON_DEVICES.FAN, quantity: 10, hours: 6 },
      { id: '3', name: 'مكبر صوت (Amplifier)', power: 200, quantity: 1, hours: 5 },
      { id: '4', ...COMMON_DEVICES.AC_1_5_TON, quantity: 4, hours: 4 },
      { id: '5', ...COMMON_DEVICES.WATER_PUMP, quantity: 1, hours: 1 },
    ],
  },
  {
    id: 'farm',
    name: 'مزرعة (Farm)',
    description: 'مضخات مياه وإنارة ليلية',
    devices: [
      { id: '1', name: 'غطاس/مضخة ري (Irrigation Pump 3HP)', power: 2200, quantity: 1, hours: 6 },
      { id: '2', ...COMMON_DEVICES.LIGHT_LED, name: 'كشافات إنارة خارجية (Flood lights)', power: 50, quantity: 10, hours: 12 },
      { id: '3', name: 'غرفة الحارس (Guard Room - Mixed)', power: 300, quantity: 1, hours: 12 },
    ],
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن (Poultry Farm)',
    description: 'تهوية مستمرة، تدفئة/تبريد وإنارة',
    devices: [
      { id: '1', name: 'مراوح شفط كبيرة (Exhaust Fans)', power: 500, quantity: 4, hours: 24 },
      { id: '2', name: 'أنظمة تبريد صحراوي (Evaporative Cooling)', power: 750, quantity: 2, hours: 12 },
      { id: '3', ...COMMON_DEVICES.LIGHT_LED, quantity: 30, hours: 14 },
      { id: '4', name: 'مضخة مياه صغيرة (Small Water Pump)', power: 375, quantity: 1, hours: 4 },
    ],
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية (Greenhouses)',
    description: 'مراوح تبريد ومضخات ري',
    devices: [
      { id: '1', name: 'مراوح شفط (Exhaust Fans)', power: 400, quantity: 4, hours: 10 },
      { id: '2', name: 'مضخة تبريد (Cooling Pump)', power: 500, quantity: 1, hours: 10 },
      { id: '3', name: 'مضخة ري وتسميد (Irrigation Pump)', power: 750, quantity: 1, hours: 4 },
    ],
  },
  {
    id: 'clinic',
    name: 'مستوصف (Clinic)',
    description: 'أجهزة طبية، ثلاجات أدوية، تكييف وإضاءة',
    devices: [
      { id: '1', ...COMMON_DEVICES.LIGHT_LED, quantity: 40, hours: 16 },
      { id: '2', ...COMMON_DEVICES.AC_1_5_TON, quantity: 6, hours: 12 },
      { id: '3', name: 'ثلاجة أدوية (Medicine Fridge)', power: 200, quantity: 2, hours: 24 },
      { id: '4', ...COMMON_DEVICES.COMPUTER, quantity: 4, hours: 12 },
      { id: '5', name: 'أجهزة طبية متنوعة (Medical Equipment)', power: 1500, quantity: 1, hours: 6 },
    ],
  },
  {
    id: 'hospital',
    name: 'مستشفى (Hospital)',
    description: 'أحمال عالية ومستمرة على مدار الساعة',
    devices: [
      { id: '1', ...COMMON_DEVICES.LIGHT_LED, quantity: 200, hours: 24 },
      { id: '2', ...COMMON_DEVICES.AC_1_5_TON, quantity: 30, hours: 24 },
      { id: '3', name: 'أجهزة طبية ثقيلة (Heavy Medical Eq.)', power: 5000, quantity: 1, hours: 10 },
      { id: '4', name: 'ثلاجات دماء وأدوية (Blood/Med Fridges)', power: 300, quantity: 5, hours: 24 },
      { id: '5', ...COMMON_DEVICES.COMPUTER, quantity: 20, hours: 24 },
    ],
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت (Supermarket)',
    description: 'ثلاجات تبريد وتجميد، تكييف مركزي',
    devices: [
      { id: '1', name: 'ثلاجات عرض تبريد (Display Fridges)', power: 800, quantity: 4, hours: 24 },
      { id: '2', name: 'فريزر عرض (Display Freezers)', power: 1200, quantity: 3, hours: 24 },
      { id: '3', ...COMMON_DEVICES.AC_1_5_TON, quantity: 4, hours: 16 },
      { id: '4', ...COMMON_DEVICES.LIGHT_LED, quantity: 30, hours: 16 },
      { id: '5', name: 'نقاط بيع (POS Terminals)', power: 100, quantity: 2, hours: 16 },
    ],
  },
  {
    id: 'restaurant',
    name: 'مطعم (Restaurant)',
    description: 'ثلاجات، إضاءة، مراوح شفط، وأجهزة مطبخ',
    devices: [
      { id: '1', name: 'فريزر كبير (Deep Freezer)', power: 1500, quantity: 2, hours: 24 },
      { id: '2', name: 'ثلاجة عرض/تبريد (Fridge)', power: 800, quantity: 2, hours: 24 },
      { id: '3', name: 'مراوح شفط دخان (Heavy Exhaust)', power: 1000, quantity: 2, hours: 14 },
      { id: '4', ...COMMON_DEVICES.LIGHT_LED, quantity: 40, hours: 14 },
      { id: '5', ...COMMON_DEVICES.AC_1_5_TON, quantity: 4, hours: 14 },
      { id: '6', name: 'عجانات وأجهزة كهربائية (Mixers/Etc)', power: 1200, quantity: 1, hours: 4 },
    ],
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب (Coffee Shop)',
    description: 'ماكينة قهوة، ثلاجات عرض، وتكييف',
    devices: [
      { id: '1', name: 'ماكينة إسبريسو (Espresso Machine)', power: 3000, quantity: 1, hours: 12 },
      { id: '2', name: 'طاحونة قهوة (Coffee Grinder)', power: 350, quantity: 2, hours: 4 },
      { id: '3', name: 'ثلاجة عرض حلى (Dessert Fridge)', power: 600, quantity: 1, hours: 24 },
      { id: '4', name: 'صانعة ثلج (Ice Maker)', power: 500, quantity: 1, hours: 24 },
      { id: '5', ...COMMON_DEVICES.AC_1_5_TON, quantity: 2, hours: 16 },
      { id: '6', ...COMMON_DEVICES.LIGHT_LED, quantity: 20, hours: 16 },
    ],
  },
  {
    id: 'bakery',
    name: 'مخبز (Bakery)',
    description: 'عجانات، ثلاجات، ومراوح',
    devices: [
      { id: '1', name: 'عجانة كبيرة (Large Mixer)', power: 2200, quantity: 2, hours: 6 },
      { id: '2', name: 'قطاعة عجين (Dough Divider)', power: 750, quantity: 1, hours: 4 },
      { id: '3', name: 'مراوح شفط (Exhaust Fans)', power: 500, quantity: 2, hours: 16 },
      { id: '4', ...COMMON_DEVICES.LIGHT_LED, quantity: 15, hours: 16 },
      // Note: Ovens are usually gas or diesel, electric ovens draw massive power (e.g. 15kW+)
    ],
  },
  {
    id: 'ice_factory',
    name: 'مصنع ثلج (Ice Factory)',
    description: 'كمبروسرات ضخمة تعمل لفترات طويلة',
    devices: [
      { id: '1', name: 'ماكينة صنع ثلج رئيسية (Main Ice Machine)', power: 15000, quantity: 1, hours: 20 },
      { id: '2', name: 'غرفة تبريد (Cold Room)', power: 4000, quantity: 1, hours: 24 },
      { id: '3', name: 'مضخات مياه (Water Pumps)', power: 1500, quantity: 2, hours: 10 },
      { id: '4', ...COMMON_DEVICES.LIGHT_LED, quantity: 10, hours: 12 },
    ],
  },
  {
    id: 'factory',
    name: 'مصنع (Factory)',
    description: 'محركات سيور، ماكينات، إنارة وإدارة',
    devices: [
      { id: '1', name: 'خط إنتاج/محركات (Production Line/Motors)', power: 20000, quantity: 1, hours: 10 },
      { id: '2', name: 'كمبروسر هواء (Air Compressor)', power: 5000, quantity: 1, hours: 8 },
      { id: '3', name: 'إنارة المصنع (High Bay Lights)', power: 150, quantity: 20, hours: 10 },
      { id: '4', ...COMMON_DEVICES.AC_1_5_TON, name: 'تكييف المكاتب', quantity: 3, hours: 10 },
      { id: '5', ...COMMON_DEVICES.COMPUTER, name: 'كمبيوترات الإدارة', quantity: 5, hours: 10 },
    ],
  },
  {
    id: 'workshop',
    name: 'ورشة (Workshop)',
    description: 'آلات لحام، كمبروسر، ومعدات يدوية',
    devices: [
      { id: '1', name: 'ماكينة لحام (Welding Machine)', power: 4000, quantity: 1, hours: 4 },
      { id: '2', name: 'كمبروسر هواء (Air Compressor)', power: 2200, quantity: 1, hours: 6 },
      { id: '3', name: 'صاروخ/معدات قطع (Grinders/Cutters)', power: 1200, quantity: 2, hours: 3 },
      { id: '4', ...COMMON_DEVICES.LIGHT_LED, quantity: 10, hours: 10 },
    ],
  },
  {
    id: 'company',
    name: 'شركة (Company/Office)',
    description: 'تكييف، كمبيوترات، سيرفرات، وطابعات',
    devices: [
      { id: '1', ...COMMON_DEVICES.COMPUTER, quantity: 10, hours: 9 },
      { id: '2', ...COMMON_DEVICES.AC_1_5_TON, quantity: 4, hours: 9 },
      { id: '3', name: 'سيرفر إنترنت/شبكة (Server/Network)', power: 500, quantity: 1, hours: 24 },
      { id: '4', name: 'طابعة وتصوير (Printer/Copier)', power: 800, quantity: 1, hours: 2 },
      { id: '5', ...COMMON_DEVICES.LIGHT_LED, quantity: 30, hours: 9 },
    ],
  },
  {
    id: 'printing_press',
    name: 'مطبعة (Printing Press)',
    description: 'ماكينات طباعة، قص ورق، وتكييف',
    devices: [
      { id: '1', name: 'ماكينة طباعة رئيسية (Main Printing Press)', power: 5000, quantity: 1, hours: 8 },
      { id: '2', name: 'مقص ورق كهربائي (Paper Guillotine)', power: 1500, quantity: 1, hours: 4 },
      { id: '3', ...COMMON_DEVICES.COMPUTER, quantity: 3, hours: 10 },
      { id: '4', ...COMMON_DEVICES.AC_1_5_TON, quantity: 2, hours: 10 },
      { id: '5', ...COMMON_DEVICES.LIGHT_LED, quantity: 15, hours: 10 },
    ],
  },
  {
    id: 'hotel',
    name: 'فندق (Hotel)',
    description: 'غرف متعددة، مصاعد، إضاءة مستمرة ومطابخ',
    devices: [
      { id: '1', ...COMMON_DEVICES.AC_1_TON, name: 'تكييف غرف (Room ACs)', quantity: 20, hours: 12 },
      { id: '2', name: 'مصعد كهربائي (Elevator)', power: 5000, quantity: 1, hours: 4 }, // Intermittent use
      { id: '3', ...COMMON_DEVICES.LIGHT_LED, quantity: 100, hours: 14 },
      { id: '4', name: 'معدات مطبخ (Kitchen Eq.)', power: 3000, quantity: 1, hours: 8 },
      { id: '5', name: 'مضخات مياه (Water Pumps)', power: 1500, quantity: 2, hours: 8 },
    ],
  },
  {
    id: 'bank',
    name: 'بنك (Bank)',
    description: 'أجهزة صراف، سيرفرات، كاميرات، وتكييف مركزي',
    devices: [
      { id: '1', name: 'أجهزة صراف آلي (ATMs)', power: 400, quantity: 3, hours: 24 },
      { id: '2', name: 'سيرفرات البنك (Bank Servers)', power: 2000, quantity: 1, hours: 24 },
      { id: '3', ...COMMON_DEVICES.COMPUTER, quantity: 15, hours: 10 },
      { id: '4', ...COMMON_DEVICES.AC_1_5_TON, quantity: 6, hours: 12 },
      { id: '5', ...COMMON_DEVICES.LIGHT_LED, quantity: 50, hours: 12 },
      { id: '6', ...COMMON_DEVICES.CCTV, name: 'نظام كاميرات (CCTV System)', quantity: 2, hours: 24 }, // Assuming system includes DVR/NVR
    ],
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود (Gas Station)',
    description: 'مضخات وقود، بقالة صغيرة، وإضاءة خارجية قوية',
    devices: [
      { id: '1', name: 'مضخات وقود (Fuel Dispensers)', power: 750, quantity: 4, hours: 10 },
      { id: '2', name: 'إضاءة مظلة الطرمبة (Canopy Lights)', power: 100, quantity: 10, hours: 12 },
      { id: '3', name: 'ثلاجات البقالة (Mart Fridges)', power: 800, quantity: 2, hours: 24 },
      { id: '4', ...COMMON_DEVICES.AC_1_5_TON, quantity: 1, hours: 14 },
      { id: '5', ...COMMON_DEVICES.CCTV, quantity: 1, hours: 24 },
    ],
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين (Mining Company)',
    description: 'معدات ثقيلة، طواحين، وإعاشة',
    devices: [
      { id: '1', name: 'طواحين كسارات (Mills/Crushers)', power: 15000, quantity: 2, hours: 12 },
      { id: '2', name: 'مضخات غسيل (Washing Pumps)', power: 5000, quantity: 2, hours: 10 },
      { id: '3', name: 'معدات ورشة وسحب (Workshop/Hoist)', power: 3000, quantity: 1, hours: 6 },
      { id: '4', ...COMMON_DEVICES.AC_1_5_TON, name: 'تكييف سكن عمال', quantity: 5, hours: 10 },
      { id: '5', ...COMMON_DEVICES.LIGHT_LED, name: 'إضاءة معسكر', quantity: 40, hours: 12 },
    ],
  },
  {
    id: 'shop',
    name: 'دكان / بقالة (Small Shop)',
    description: 'إضاءة، مروحة، وثلاجة عرض',
    devices: [
      { id: '1', ...COMMON_DEVICES.LIGHT_LED, quantity: 4, hours: 14 },
      { id: '2', ...COMMON_DEVICES.FAN, quantity: 1, hours: 14 },
      { id: '3', name: 'ثلاجة عرض (Display Fridge)', power: 400, quantity: 1, hours: 24 },
    ],
  },
  {
    id: 'water_pump_station',
    name: 'مضخة مياه / دونكي (Water Pump Station)',
    description: 'مضخات غاطسة لاستخراج المياه',
    devices: [
      { id: '1', name: 'غطاس مياه كبير (Submersible Pump 10HP)', power: 7500, quantity: 1, hours: 8 },
      { id: '2', name: 'إضاءة غرفة تحكم (Control Room Light)', power: 15, quantity: 2, hours: 4 },
    ],
  },
];
