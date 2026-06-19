export const CONSUMPTION_PATTERNS = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج (Ice Factory)',
    devices: [
      { id: 'ice_maker', name: 'ماكينة صنع الثلج', power: 5000, qty: 2, hours: 24 },
      { id: 'freezer', name: 'فريزر', power: 1500, qty: 3, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 50, qty: 10, hours: 12 },
    ],
  },
  {
    id: 'company',
    name: 'شركة (Company)',
    devices: [
      { id: 'ac', name: 'مكيف', power: 1500, qty: 5, hours: 10 },
      { id: 'pc', name: 'جهاز كمبيوتر', power: 250, qty: 10, hours: 8 },
      { id: 'lighting', name: 'إضاءة', power: 40, qty: 20, hours: 10 },
      { id: 'printer', name: 'طابعة', power: 500, qty: 2, hours: 2 },
    ],
  },
  {
    id: 'farm',
    name: 'مزرعة (Farm)',
    devices: [
      { id: 'water_pump', name: 'مضخة مياه', power: 2200, qty: 1, hours: 6 },
      { id: 'lighting', name: 'إضاءة كشافات', power: 100, qty: 10, hours: 12 },
      { id: 'house_ac', name: 'مكيف منزل المزرعة', power: 1500, qty: 2, hours: 8 },
    ],
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن (Poultry Farm)',
    devices: [
      { id: 'cooling_fan', name: 'مروحة تبريد', power: 750, qty: 8, hours: 24 },
      { id: 'heater', name: 'سخان', power: 2000, qty: 4, hours: 12 },
      { id: 'lighting', name: 'إضاءة', power: 40, qty: 20, hours: 24 },
      { id: 'water_pump', name: 'مضخة مياه', power: 1500, qty: 1, hours: 4 },
    ],
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية (Greenhouses)',
    devices: [
      { id: 'fan', name: 'مروحة تهوية', power: 500, qty: 4, hours: 12 },
      { id: 'water_pump', name: 'مضخة ري', power: 1500, qty: 1, hours: 4 },
      { id: 'lighting', name: 'إضاءة زراعية', power: 200, qty: 10, hours: 8 },
    ],
  },
  {
    id: 'factory',
    name: 'مصنع (Factory)',
    devices: [
      { id: 'machine_large', name: 'ماكينة كبيرة', power: 10000, qty: 2, hours: 16 },
      { id: 'machine_small', name: 'ماكينة صغيرة', power: 3000, qty: 5, hours: 16 },
      { id: 'lighting', name: 'إضاءة مصنع', power: 150, qty: 20, hours: 16 },
      { id: 'office_ac', name: 'مكيفات المكاتب', power: 1500, qty: 4, hours: 10 },
    ],
  },
  {
    id: 'dispensary',
    name: 'مستوصف (Dispensary)',
    devices: [
      { id: 'ac', name: 'مكيف', power: 1500, qty: 6, hours: 24 },
      { id: 'fridge_medical', name: 'ثلاجة أدوية', power: 300, qty: 2, hours: 24 },
      { id: 'medical_eq', name: 'أجهزة طبية', power: 1000, qty: 3, hours: 8 },
      { id: 'lighting', name: 'إضاءة', power: 40, qty: 20, hours: 24 },
    ],
  },
  {
    id: 'hospital',
    name: 'مستشفى (Hospital)',
    devices: [
      { id: 'ac_central', name: 'تكييف مركزي', power: 50000, qty: 1, hours: 24 },
      { id: 'mri', name: 'جهاز أشعة', power: 15000, qty: 1, hours: 4 },
      { id: 'ventilator', name: 'أجهزة تنفس', power: 500, qty: 10, hours: 24 },
      { id: 'fridge_blood', name: 'ثلاجات دم/أدوية', power: 500, qty: 5, hours: 24 },
      { id: 'lighting', name: 'إضاءة شاملة', power: 50, qty: 100, hours: 24 },
    ],
  },
  {
    id: 'bakery',
    name: 'مخبز (Bakery)',
    devices: [
      { id: 'oven_elec', name: 'فرن كهربائي', power: 10000, qty: 2, hours: 12 },
      { id: 'mixer', name: 'عجانة', power: 3000, qty: 2, hours: 8 },
      { id: 'fridge', name: 'ثلاجة عرض', power: 800, qty: 2, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 50, qty: 10, hours: 16 },
    ],
  },
  {
    id: 'shop',
    name: 'دكان / محل (Shop)',
    devices: [
      { id: 'fridge_display', name: 'ثلاجة عرض', power: 600, qty: 2, hours: 24 },
      { id: 'ac', name: 'مكيف', power: 1500, qty: 1, hours: 12 },
      { id: 'lighting', name: 'إضاءة', power: 30, qty: 6, hours: 12 },
    ],
  },
  {
    id: 'workshop',
    name: 'ورشة (Workshop)',
    devices: [
      { id: 'welding', name: 'ماكينة لحام', power: 4000, qty: 1, hours: 4 },
      { id: 'compressor', name: 'كمبروسر هواء', power: 2200, qty: 1, hours: 6 },
      { id: 'grinder', name: 'صاروخ / دريل', power: 800, qty: 3, hours: 4 },
      { id: 'lighting', name: 'إضاءة', power: 50, qty: 8, hours: 10 },
    ],
  },
  {
    id: 'water_pump',
    name: 'مضخة موية (Water Pump)',
    devices: [
      { id: 'pump_large', name: 'مضخة غاطسة', power: 5500, qty: 1, hours: 8 },
    ],
  },
  {
    id: 'donkey_pump',
    name: 'دونكي (Donkey/Rural Pump)',
    devices: [
      { id: 'pump_medium', name: 'مضخة مياه', power: 2200, qty: 1, hours: 10 },
    ],
  },
  {
    id: 'mosque',
    name: 'مسجد (Mosque)',
    devices: [
      { id: 'ac', name: 'مكيف', power: 1500, qty: 6, hours: 6 },
      { id: 'fans', name: 'مراوح', power: 80, qty: 10, hours: 6 },
      { id: 'lighting', name: 'إضاءة', power: 40, qty: 15, hours: 5 },
      { id: 'sound_sys', name: 'نظام صوتي', power: 300, qty: 1, hours: 3 },
    ],
  },
  {
    id: 'printing_press',
    name: 'مطبعة (Printing Press)',
    devices: [
      { id: 'print_machine_large', name: 'ماكينة طباعة كبيرة', power: 5000, qty: 2, hours: 10 },
      { id: 'cutter', name: 'مقص ورق كهربائي', power: 2000, qty: 1, hours: 4 },
      { id: 'ac', name: 'مكيف', power: 1500, qty: 3, hours: 12 },
      { id: 'lighting', name: 'إضاءة', power: 50, qty: 15, hours: 12 },
    ],
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب (Coffee Shop)',
    devices: [
      { id: 'espresso_machine', name: 'ماكينة اسبريسو', power: 3500, qty: 1, hours: 12 },
      { id: 'grinder', name: 'طاحونة قهوة', power: 500, qty: 2, hours: 6 },
      { id: 'fridge_display', name: 'ثلاجة عرض', power: 600, qty: 2, hours: 24 },
      { id: 'ac', name: 'مكيف', power: 1500, qty: 3, hours: 16 },
      { id: 'lighting', name: 'إضاءة وديكور', power: 60, qty: 20, hours: 16 },
    ],
  },
  {
    id: 'restaurant',
    name: 'مطعم (Restaurant)',
    devices: [
      { id: 'fridge', name: 'ثلاجة كبيرة', power: 1200, qty: 3, hours: 24 },
      { id: 'freezer', name: 'فريزر', power: 1500, qty: 2, hours: 24 },
      { id: 'exhaust_fan', name: 'شفاط هواء', power: 1000, qty: 2, hours: 16 },
      { id: 'ac', name: 'مكيف', power: 1500, qty: 5, hours: 16 },
      { id: 'lighting', name: 'إضاءة', power: 50, qty: 30, hours: 16 },
    ],
  },
  {
    id: 'hotel',
    name: 'فندق (Hotel)',
    devices: [
      { id: 'ac_rooms', name: 'مكيفات الغرف', power: 1200, qty: 20, hours: 12 },
      { id: 'elevator', name: 'مصعد', power: 7500, qty: 1, hours: 5 },
      { id: 'water_heater', name: 'سخانات مياه', power: 1500, qty: 10, hours: 6 },
      { id: 'lighting', name: 'إضاءة', power: 50, qty: 100, hours: 24 },
      { id: 'kitchen_eq', name: 'معدات مطبخ', power: 5000, qty: 1, hours: 10 },
    ],
  },
  {
    id: 'bank',
    name: 'بنك (Bank)',
    devices: [
      { id: 'ac', name: 'تكييف', power: 1500, qty: 10, hours: 10 },
      { id: 'pc', name: 'أجهزة كمبيوتر', power: 250, qty: 20, hours: 10 },
      { id: 'atm', name: 'صراف آلي', power: 500, qty: 2, hours: 24 },
      { id: 'server', name: 'سيرفر', power: 800, qty: 1, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 40, qty: 40, hours: 12 },
    ],
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت (Supermarket)',
    devices: [
      { id: 'fridge_display', name: 'ثلاجات عرض', power: 800, qty: 8, hours: 24 },
      { id: 'freezer_display', name: 'فريزرات عرض', power: 1000, qty: 4, hours: 24 },
      { id: 'ac', name: 'مكيف', power: 1500, qty: 4, hours: 16 },
      { id: 'lighting', name: 'إضاءة', power: 50, qty: 40, hours: 16 },
    ],
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود (Gas Station)',
    devices: [
      { id: 'fuel_pump', name: 'مضخات وقود', power: 750, qty: 4, hours: 24 },
      { id: 'lighting_canopy', name: 'إضاءة المظلة', power: 150, qty: 10, hours: 12 },
      { id: 'shop_fridge', name: 'ثلاجة البقالة', power: 600, qty: 2, hours: 24 },
      { id: 'ac_office', name: 'مكيف الإدارة', power: 1500, qty: 1, hours: 24 },
    ],
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين (Mining Company)',
    devices: [
      { id: 'crusher', name: 'كسارة', power: 20000, qty: 1, hours: 12 },
      { id: 'conveyor', name: 'سير ناقل', power: 5000, qty: 2, hours: 12 },
      { id: 'water_pump', name: 'مضخة مياه كبيرة', power: 7500, qty: 1, hours: 8 },
      { id: 'camp_ac', name: 'مكيفات الكامب', power: 1500, qty: 10, hours: 12 },
      { id: 'camp_lighting', name: 'إضاءة الكامب والموقع', power: 200, qty: 20, hours: 12 },
    ],
  },
];
