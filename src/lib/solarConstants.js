export const SOLAR_CONSTANTS = {
  PEAK_SUN_HOURS: 5, // Average peak sun hours per day
  SYSTEM_LOSS_FACTOR: 1.3, // Accounting for inefficiencies (inverter, wiring, dust, etc.)
  PANEL_WATTAGE: 550, // Standard panel wattage for calculation
  BATTERY_VOLTAGE: 48, // Standard system voltage
  BATTERY_DEPTH_OF_DISCHARGE: 0.8, // DoD for Lithium batteries
  DAYS_OF_AUTONOMY: 1, // Number of days the system can run without sun
  INVERTER_EFFICIENCY: 0.95, // 95% efficiency
  INVERTER_SAFETY_MARGIN: 1.25 // 25% extra capacity for surges
};

export const FACILITY_TYPES = [
  { id: 'ice_factory', label: 'مصنع ثلج' },
  { id: 'company', label: 'شركة' },
  { id: 'farm', label: 'مزرعة' },
  { id: 'poultry_farm', label: 'مزرعة دواجن' },
  { id: 'greenhouse', label: 'بيوت محمية' },
  { id: 'factory', label: 'مصنع' },
  { id: 'clinic', label: 'مستوصف' },
  { id: 'hospital', label: 'مستشفى' },
  { id: 'bakery', label: 'مخبز' },
  { id: 'shop', label: 'دكان' },
  { id: 'workshop', label: 'ورشة' },
  { id: 'water_pump', label: 'مضخة مياه' },
  { id: 'donkey', label: 'دونكي (مضخة)' },
  { id: 'mosque', label: 'مسجد' },
  { id: 'printing_press', label: 'مطبعة' },
  { id: 'coffee_shop', label: 'كوفي شوب' },
  { id: 'restaurant', label: 'مطعم' },
  { id: 'hotel', label: 'فندق' },
  { id: 'bank', label: 'بنك' },
  { id: 'supermarket', label: 'سوبر ماركت' },
  { id: 'gas_station', label: 'طرمبة وقود' },
  { id: 'mining_company', label: 'شركة تعدين' }
];

export const DEVICE_CATALOG = [
  { id: 'light', name: 'لمبة إضاءة', power_w: 15 },
  { id: 'fan', name: 'مروحة سقف', power_w: 75 },
  { id: 'ac_split_12', name: 'مكيف سبليت 12 ألف وحدة', power_w: 1200 },
  { id: 'ac_split_18', name: 'مكيف سبليت 18 ألف وحدة', power_w: 1800 },
  { id: 'ac_split_24', name: 'مكيف سبليت 24 ألف وحدة', power_w: 2400 },
  { id: 'fridge_small', name: 'ثلاجة صغيرة', power_w: 150 },
  { id: 'fridge_large', name: 'ثلاجة كبيرة', power_w: 400 },
  { id: 'freezer', name: 'فريزر', power_w: 500 },
  { id: 'tv', name: 'شاشة تلفزيون', power_w: 100 },
  { id: 'computer', name: 'جهاز كمبيوتر', power_w: 250 },
  { id: 'printer', name: 'طابعة', power_w: 500 },
  { id: 'water_pump_1hp', name: 'مضخة مياه 1 حصان', power_w: 750 },
  { id: 'water_pump_2hp', name: 'مضخة مياه 2 حصان', power_w: 1500 },
  { id: 'water_pump_5hp', name: 'مضخة غاطسة 5 حصان', power_w: 3750 },
  { id: 'ice_maker', name: 'ماكينة صنع الثلج', power_w: 3000 },
  { id: 'oven', name: 'فرن كهربائي', power_w: 2000 },
  { id: 'microwave', name: 'ميكروويف', power_w: 1000 },
  { id: 'cash_register', name: 'جهاز كاشير', power_w: 50 },
  { id: 'pos_machine', name: 'جهاز نقاط بيع', power_w: 20 },
  { id: 'security_cameras', name: 'نظام كاميرات مراقبة', power_w: 100 },
  { id: 'server', name: 'سيرفر', power_w: 800 },
  { id: 'heavy_machinery', name: 'ماكينات ثقيلة', power_w: 5000 },
  { id: 'welding_machine', name: 'ماكينة لحام', power_w: 4000 }
];

export const FACILITY_PRESETS = {
  mosque: [
    { device: 'لمبة إضاءة', power_w: 15, quantity: 20, hours: 8 },
    { device: 'مروحة سقف', power_w: 75, quantity: 15, hours: 8 },
    { device: 'مكيف سبليت 24 ألف وحدة', power_w: 2400, quantity: 4, hours: 5 },
    { device: 'مضخة مياه 1 حصان', power_w: 750, quantity: 1, hours: 2 },
  ],
  shop: [
    { device: 'لمبة إضاءة', power_w: 15, quantity: 4, hours: 12 },
    { device: 'مروحة سقف', power_w: 75, quantity: 2, hours: 12 },
    { device: 'ثلاجة عرض', power_w: 500, quantity: 1, hours: 24 },
  ],
  supermarket: [
    { device: 'لمبة إضاءة', power_w: 15, quantity: 30, hours: 16 },
    { device: 'ثلاجة عرض', power_w: 500, quantity: 5, hours: 24 },
    { device: 'فريزر', power_w: 500, quantity: 3, hours: 24 },
    { device: 'مكيف سبليت 24 ألف وحدة', power_w: 2400, quantity: 3, hours: 16 },
    { device: 'جهاز كاشير', power_w: 50, quantity: 2, hours: 16 },
    { device: 'نظام كاميرات مراقبة', power_w: 100, quantity: 1, hours: 24 },
  ],
  clinic: [
    { device: 'لمبة إضاءة', power_w: 15, quantity: 15, hours: 12 },
    { device: 'مكيف سبليت 18 ألف وحدة', power_w: 1800, quantity: 4, hours: 10 },
    { device: 'ثلاجة صغيرة (للأدوية)', power_w: 150, quantity: 2, hours: 24 },
    { device: 'جهاز كمبيوتر', power_w: 250, quantity: 3, hours: 10 },
    { device: 'طابعة', power_w: 500, quantity: 1, hours: 2 },
  ],
  restaurant: [
    { device: 'لمبة إضاءة', power_w: 15, quantity: 25, hours: 14 },
    { device: 'مكيف سبليت 24 ألف وحدة', power_w: 2400, quantity: 4, hours: 12 },
    { device: 'ثلاجة كبيرة', power_w: 400, quantity: 2, hours: 24 },
    { device: 'فريزر', power_w: 500, quantity: 2, hours: 24 },
    { device: 'جهاز كاشير', power_w: 50, quantity: 1, hours: 14 },
    { device: 'نظام كاميرات مراقبة', power_w: 100, quantity: 1, hours: 24 },
  ],
  farm: [
    { device: 'لمبة إضاءة', power_w: 15, quantity: 10, hours: 12 },
    { device: 'مضخة مياه 2 حصان', power_w: 1500, quantity: 1, hours: 6 },
    { device: 'ثلاجة صغيرة', power_w: 150, quantity: 1, hours: 24 },
  ],
  poultry_farm: [
    { device: 'لمبة إضاءة', power_w: 15, quantity: 50, hours: 16 },
    { device: 'مروحة شفط', power_w: 200, quantity: 10, hours: 24 },
    { device: 'مضخة مياه 1 حصان', power_w: 750, quantity: 1, hours: 4 },
  ],
  ice_factory: [
    { device: 'لمبة إضاءة', power_w: 15, quantity: 20, hours: 12 },
    { device: 'ماكينة صنع الثلج', power_w: 3000, quantity: 4, hours: 20 },
    { device: 'فريزر كبير', power_w: 1000, quantity: 2, hours: 24 },
    { device: 'مضخة مياه 2 حصان', power_w: 1500, quantity: 1, hours: 4 },
  ],
  company: [
    { device: 'لمبة إضاءة', power_w: 15, quantity: 40, hours: 10 },
    { device: 'جهاز كمبيوتر', power_w: 250, quantity: 20, hours: 9 },
    { device: 'مكيف سبليت 18 ألف وحدة', power_w: 1800, quantity: 6, hours: 9 },
    { device: 'سيرفر', power_w: 800, quantity: 1, hours: 24 },
    { device: 'طابعة', power_w: 500, quantity: 2, hours: 2 },
  ],
  workshop: [
    { device: 'لمبة إضاءة', power_w: 15, quantity: 10, hours: 10 },
    { device: 'ماكينة لحام', power_w: 4000, quantity: 1, hours: 4 },
    { device: 'معدات ثقيلة', power_w: 2000, quantity: 2, hours: 6 },
  ]
};
