export const SOLAR_CONSTANTS = {
  // Peak sun hours for calculation (average value, can be adjusted)
  PEAK_SUN_HOURS: 5.0,

  // Inverter efficiency factor (e.g., 1.25 means adding 25% margin to peak power)
  INVERTER_EFFICIENCY_FACTOR: 1.25,

  // System losses (wiring, dust, temperature, inverter conversion) - typical is 20-30% loss
  // So we multiply solar array requirement by e.g. 1.3
  SYSTEM_LOSS_FACTOR: 1.3,

  // Battery depth of discharge (DoD) safe limit (e.g., 0.5 for Lead-Acid, 0.8 for Lithium)
  BATTERY_DOD: 0.8,

  // Battery system voltage (typical 24V or 48V depending on size, default 48V for larger systems)
  BATTERY_VOLTAGE: 48,
};

export const FACILITY_TYPES = [
  { id: 'custom', label: 'مخصص (Custom)' },
  { id: 'ice_factory', label: 'مصنع تلج' },
  { id: 'company', label: 'شركة' },
  { id: 'farm', label: 'مزرعة' },
  { id: 'poultry_farm', label: 'مزرعة دواجن' },
  { id: 'greenhouse', label: 'بيوت محمية' },
  { id: 'factory', label: 'مصنع' },
  { id: 'dispensary', label: 'مستوصف' },
  { id: 'hospital', label: 'مستشفي' },
  { id: 'bakery', label: 'مخبز' },
  { id: 'shop', label: 'دكان' },
  { id: 'workshop', label: 'ورشة' },
  { id: 'water_pump', label: 'مضخة موية' },
  { id: 'donkey_pump', label: 'دونكي' },
  { id: 'mosque', label: 'مسجد' },
  { id: 'printing_press', label: 'مطبعة' },
  { id: 'coffee_shop', label: 'كوفي شوب' },
  { id: 'restaurant', label: 'مطعم' },
  { id: 'hotel', label: 'فندق' },
  { id: 'bank', label: 'بنك' },
  { id: 'supermarket', label: 'سوبر ماركت' },
  { id: 'fuel_station', label: 'طرمبة وقود' },
  { id: 'mining_company', label: 'شركة تعدين' }
];

export const DEVICE_PRESETS = {
  custom: [],
  ice_factory: [
    { id: '1', name: 'ماكينة ثلج (Ice Machine)', power: 5000, quantity: 2, hours: 24 },
    { id: '2', name: 'إضاءة (Lighting)', power: 20, quantity: 10, hours: 12 },
    { id: '3', name: 'مكيف هواء (AC)', power: 1500, quantity: 1, hours: 8 },
  ],
  company: [
    { id: '1', name: 'كمبيوتر (Computer)', power: 200, quantity: 10, hours: 8 },
    { id: '2', name: 'إضاءة (Lighting)', power: 18, quantity: 20, hours: 10 },
    { id: '3', name: 'مكيف هواء (AC)', power: 1500, quantity: 3, hours: 8 },
    { id: '4', name: 'طابعة (Printer)', power: 500, quantity: 2, hours: 2 },
  ],
  farm: [
    { id: '1', name: 'مضخة ماء (Water Pump)', power: 2200, quantity: 1, hours: 6 },
    { id: '2', name: 'إضاءة خارجية (Outdoor Lighting)', power: 50, quantity: 5, hours: 12 },
  ],
  poultry_farm: [
    { id: '1', name: 'مراوح تهوية (Ventilation Fans)', power: 300, quantity: 6, hours: 24 },
    { id: '2', name: 'إضاءة (Lighting)', power: 18, quantity: 30, hours: 16 },
    { id: '3', name: 'سخانات (Heaters)', power: 2000, quantity: 2, hours: 12 },
    { id: '4', name: 'مضخة ماء (Water Pump)', power: 1100, quantity: 1, hours: 4 },
  ],
  greenhouse: [
    { id: '1', name: 'مراوح تهوية (Ventilation Fans)', power: 200, quantity: 4, hours: 12 },
    { id: '2', name: 'مضخة ري (Irrigation Pump)', power: 1500, quantity: 1, hours: 4 },
    { id: '3', name: 'إضاءة نمو (Grow Lights)', power: 100, quantity: 20, hours: 8 },
  ],
  factory: [
    { id: '1', name: 'آلات تصنيع (Manufacturing Machinery)', power: 10000, quantity: 2, hours: 8 },
    { id: '2', name: 'إضاءة صناعية (Industrial Lighting)', power: 100, quantity: 20, hours: 10 },
    { id: '3', name: 'مكيفات (ACs)', power: 2000, quantity: 4, hours: 10 },
  ],
  dispensary: [
    { id: '1', name: 'ثلاجة أدوية (Medicine Refrigerator)', power: 300, quantity: 2, hours: 24 },
    { id: '2', name: 'أجهزة طبية (Medical Equipment)', power: 1000, quantity: 3, hours: 6 },
    { id: '3', name: 'إضاءة (Lighting)', power: 18, quantity: 15, hours: 12 },
    { id: '4', name: 'مكيف هواء (AC)', power: 1500, quantity: 2, hours: 10 },
  ],
  hospital: [
    { id: '1', name: 'أجهزة العناية المركزة (ICU Equipment)', power: 2000, quantity: 5, hours: 24 },
    { id: '2', name: 'ثلاجات حفظ (Refrigerators)', power: 500, quantity: 10, hours: 24 },
    { id: '3', name: 'تكييف مركزي (Central AC)', power: 10000, quantity: 2, hours: 24 },
    { id: '4', name: 'إضاءة (Lighting)', power: 18, quantity: 100, hours: 24 },
  ],
  bakery: [
    { id: '1', name: 'عجانة (Dough Mixer)', power: 3000, quantity: 2, hours: 8 },
    { id: '2', name: 'فرن كهربائي (Electric Oven)', power: 5000, quantity: 1, hours: 10 },
    { id: '3', name: 'إضاءة (Lighting)', power: 18, quantity: 10, hours: 12 },
    { id: '4', name: 'مكيف هواء (AC)', power: 1500, quantity: 1, hours: 10 },
  ],
  shop: [
    { id: '1', name: 'ثلاجة عرض (Display Fridge)', power: 800, quantity: 2, hours: 24 },
    { id: '2', name: 'إضاءة (Lighting)', power: 18, quantity: 6, hours: 12 },
    { id: '3', name: 'مروحة سقف (Ceiling Fan)', power: 75, quantity: 2, hours: 12 },
  ],
  workshop: [
    { id: '1', name: 'آلة لحام (Welding Machine)', power: 4000, quantity: 1, hours: 4 },
    { id: '2', name: 'صاروخ جلخ (Grinder)', power: 1000, quantity: 2, hours: 3 },
    { id: '3', name: 'شنيور (Drill)', power: 800, quantity: 2, hours: 2 },
    { id: '4', name: 'إضاءة (Lighting)', power: 36, quantity: 4, hours: 8 },
  ],
  water_pump: [
    { id: '1', name: 'مضخة غاطسة (Submersible Pump)', power: 4000, quantity: 1, hours: 8 },
  ],
  donkey_pump: [
    { id: '1', name: 'طلمبة دونكي (Donkey Pump)', power: 1500, quantity: 1, hours: 6 },
  ],
  mosque: [
    { id: '1', name: 'إضاءة (Lighting)', power: 18, quantity: 20, hours: 6 },
    { id: '2', name: 'مراوح (Fans)', power: 75, quantity: 10, hours: 6 },
    { id: '3', name: 'مكيفات (ACs)', power: 2000, quantity: 4, hours: 4 },
    { id: '4', name: 'نظام صوت (Sound System)', power: 300, quantity: 1, hours: 2 },
  ],
  printing_press: [
    { id: '1', name: 'آلة طباعة (Printing Machine)', power: 5000, quantity: 1, hours: 8 },
    { id: '2', name: 'مقص ورق (Paper Cutter)', power: 1500, quantity: 1, hours: 4 },
    { id: '3', name: 'إضاءة (Lighting)', power: 36, quantity: 10, hours: 10 },
  ],
  coffee_shop: [
    { id: '1', name: 'آلة إسبريسو (Espresso Machine)', power: 3500, quantity: 1, hours: 12 },
    { id: '2', name: 'ثلاجة عرض (Display Fridge)', power: 600, quantity: 2, hours: 24 },
    { id: '3', name: 'إضاءة (Lighting)', power: 15, quantity: 15, hours: 14 },
    { id: '4', name: 'مكيف هواء (AC)', power: 2000, quantity: 2, hours: 14 },
  ],
  restaurant: [
    { id: '1', name: 'ثلاجات (Refrigerators)', power: 1000, quantity: 3, hours: 24 },
    { id: '2', name: 'إضاءة (Lighting)', power: 18, quantity: 20, hours: 14 },
    { id: '3', name: 'مكيف هواء (AC)', power: 2500, quantity: 3, hours: 14 },
    { id: '4', name: 'معدات مطبخ كهربائية (Kitchen Equip.)', power: 3000, quantity: 2, hours: 8 },
  ],
  hotel: [
    { id: '1', name: 'تكييف غرف (Room ACs)', power: 1500, quantity: 20, hours: 12 },
    { id: '2', name: 'إضاءة (Lighting)', power: 18, quantity: 100, hours: 12 },
    { id: '3', name: 'ثلاجات (Refrigerators)', power: 800, quantity: 5, hours: 24 },
    { id: '4', name: 'مضخة ماء (Water Pump)', power: 2200, quantity: 2, hours: 6 },
  ],
  bank: [
    { id: '1', name: 'أجهزة صراف آلي (ATMs)', power: 300, quantity: 4, hours: 24 },
    { id: '2', name: 'أجهزة كمبيوتر (Computers)', power: 200, quantity: 15, hours: 10 },
    { id: '3', name: 'مكيفات (ACs)', power: 2000, quantity: 5, hours: 10 },
    { id: '4', name: 'إضاءة (Lighting)', power: 18, quantity: 40, hours: 12 },
  ],
  supermarket: [
    { id: '1', name: 'ثلاجات عرض كبيرة (Large Display Fridges)', power: 1500, quantity: 5, hours: 24 },
    { id: '2', name: 'مكيفات (ACs)', power: 2500, quantity: 4, hours: 16 },
    { id: '3', name: 'إضاءة (Lighting)', power: 36, quantity: 30, hours: 16 },
    { id: '4', name: 'أنظمة محاسبة (POS Systems)', power: 150, quantity: 3, hours: 16 },
  ],
  fuel_station: [
    { id: '1', name: 'مضخات وقود (Fuel Pumps)', power: 1000, quantity: 4, hours: 18 },
    { id: '2', name: 'إضاءة مظلة (Canopy Lighting)', power: 100, quantity: 10, hours: 12 },
    { id: '3', name: 'مكيف إدارة (Office AC)', power: 1500, quantity: 1, hours: 12 },
  ],
  mining_company: [
    { id: '1', name: 'معدات تعدين (Mining Equipment)', power: 15000, quantity: 2, hours: 12 },
    { id: '2', name: 'مضخات سحب مياه (Dewatering Pumps)', power: 5000, quantity: 2, hours: 24 },
    { id: '3', name: 'إضاءة موقع (Site Lighting)', power: 500, quantity: 10, hours: 12 },
    { id: '4', name: 'تكييف مكاتب (Office ACs)', power: 2000, quantity: 4, hours: 10 },
  ],
};
