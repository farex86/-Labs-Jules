export const facilityTypes = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    devices: [
      { id: 'ice_machine_large', name: 'ماكينة ثلج كبيرة', power: 15000, quantity: 2, hours: 24 },
      { id: 'cold_room', name: 'غرفة تبريد', power: 5000, quantity: 1, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 100, quantity: 20, hours: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    devices: [
      { id: 'ac_split', name: 'مكيف سبليت', power: 2000, quantity: 5, hours: 10 },
      { id: 'computer', name: 'جهاز كمبيوتر', power: 250, quantity: 20, hours: 10 },
      { id: 'printer', name: 'طابعة', power: 500, quantity: 2, hours: 4 },
      { id: 'server', name: 'سيرفر', power: 800, quantity: 1, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 50, hours: 12 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    devices: [
      { id: 'water_pump', name: 'مضخة مياه', power: 5000, quantity: 1, hours: 8 },
      { id: 'lighting', name: 'إضاءة خارجية', power: 200, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    devices: [
      { id: 'ventilation_fan', name: 'مروحة تهوية', power: 1500, quantity: 10, hours: 24 },
      { id: 'heater', name: 'دفاية', power: 3000, quantity: 5, hours: 12 },
      { id: 'feeding_system', name: 'نظام تغذية آلي', power: 2000, quantity: 2, hours: 6 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 40, hours: 16 },
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    devices: [
      { id: 'cooling_pad_pump', name: 'مضخة تبريد', power: 1500, quantity: 2, hours: 12 },
      { id: 'exhaust_fan', name: 'مروحة سحب', power: 1100, quantity: 4, hours: 12 },
      { id: 'irrigation_pump', name: 'مضخة ري', power: 2200, quantity: 1, hours: 4 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    devices: [
      { id: 'heavy_machinery', name: 'ماكينة ثقيلة', power: 20000, quantity: 3, hours: 16 },
      { id: 'compressor', name: 'كمبروسر هواء', power: 5500, quantity: 2, hours: 16 },
      { id: 'lighting', name: 'إضاءة', power: 150, quantity: 50, hours: 16 },
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    devices: [
      { id: 'ac', name: 'تكييف', power: 2000, quantity: 10, hours: 14 },
      { id: 'medical_equipment', name: 'أجهزة طبية', power: 1500, quantity: 5, hours: 8 },
      { id: 'fridge_med', name: 'ثلاجة أدوية', power: 300, quantity: 2, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 60, hours: 14 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    devices: [
      { id: 'central_ac', name: 'تكييف مركزي', power: 50000, quantity: 2, hours: 24 },
      { id: 'mri_scanner', name: 'جهاز رنين/أشعة', power: 30000, quantity: 1, hours: 8 },
      { id: 'medical_equipment', name: 'أجهزة طبية متنوعة', power: 1000, quantity: 50, hours: 12 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 200, hours: 24 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    devices: [
      { id: 'electric_oven', name: 'فرن كهربائي', power: 15000, quantity: 2, hours: 12 },
      { id: 'dough_mixer', name: 'عجانة', power: 3000, quantity: 2, hours: 6 },
      { id: 'fridge', name: 'ثلاجة عرض', power: 800, quantity: 2, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 20, hours: 16 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    devices: [
      { id: 'fridge', name: 'ثلاجة', power: 400, quantity: 2, hours: 24 },
      { id: 'freezer', name: 'فريزر', power: 500, quantity: 1, hours: 24 },
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 1, hours: 12 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 6, hours: 12 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    devices: [
      { id: 'welding_machine', name: 'ماكينة لحام', power: 6000, quantity: 2, hours: 6 },
      { id: 'grinder', name: 'صاروخ جلخ', power: 1500, quantity: 3, hours: 4 },
      { id: 'compressor', name: 'كمبروسر هواء', power: 3000, quantity: 1, hours: 8 },
      { id: 'lighting', name: 'إضاءة', power: 100, quantity: 10, hours: 10 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة مياه',
    devices: [
      { id: 'main_pump', name: 'مضخة رئيسية', power: 7500, quantity: 1, hours: 10 },
      { id: 'control_panel', name: 'لوحة تحكم', power: 100, quantity: 1, hours: 24 },
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي',
    devices: [
      { id: 'submersible_pump', name: 'طلمبة غاطسة', power: 5500, quantity: 1, hours: 10 },
      { id: 'surface_pump', name: 'طلمبة سطحية', power: 2200, quantity: 1, hours: 4 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    devices: [
      { id: 'ac', name: 'مكيف', power: 2000, quantity: 6, hours: 5 },
      { id: 'fans', name: 'مراوح', power: 80, quantity: 15, hours: 5 },
      { id: 'sound_system', name: 'مكبر صوت', power: 300, quantity: 1, hours: 5 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 40, hours: 5 },
      { id: 'water_cooler', name: 'مبرد مياه', power: 300, quantity: 2, hours: 24 },
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    devices: [
      { id: 'printing_machine', name: 'ماكينة طباعة', power: 10000, quantity: 2, hours: 12 },
      { id: 'cutting_machine', name: 'مقص ورق', power: 2000, quantity: 1, hours: 8 },
      { id: 'ac', name: 'تكييف', power: 2000, quantity: 4, hours: 12 },
      { id: 'lighting', name: 'إضاءة', power: 100, quantity: 30, hours: 12 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    devices: [
      { id: 'espresso_machine', name: 'ماكينة اسبريسو', power: 3500, quantity: 1, hours: 14 },
      { id: 'grinder', name: 'طاحونة قهوة', power: 400, quantity: 2, hours: 4 },
      { id: 'fridge', name: 'ثلاجة', power: 500, quantity: 3, hours: 24 },
      { id: 'ice_maker', name: 'صانعة ثلج', power: 600, quantity: 1, hours: 24 },
      { id: 'ac', name: 'تكييف', power: 2000, quantity: 3, hours: 16 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 30, hours: 16 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    devices: [
      { id: 'fridge', name: 'ثلاجة', power: 600, quantity: 4, hours: 24 },
      { id: 'freezer', name: 'فريزر', power: 800, quantity: 2, hours: 24 },
      { id: 'electric_grill', name: 'شواية كهربائية', power: 4000, quantity: 2, hours: 8 },
      { id: 'exhaust_fan', name: 'شفاط هواء', power: 1000, quantity: 2, hours: 14 },
      { id: 'ac', name: 'تكييف', power: 2000, quantity: 6, hours: 16 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 50, hours: 16 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    devices: [
      { id: 'ac', name: 'تكييف غرف', power: 1500, quantity: 50, hours: 14 },
      { id: 'elevator', name: 'مصعد', power: 7500, quantity: 2, hours: 8 },
      { id: 'water_heater', name: 'سخان مياه مركزي', power: 10000, quantity: 2, hours: 10 },
      { id: 'kitchen_equipment', name: 'معدات مطبخ', power: 15000, quantity: 1, hours: 12 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 300, hours: 24 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    devices: [
      { id: 'ac', name: 'تكييف', power: 2000, quantity: 15, hours: 12 },
      { id: 'computer', name: 'كمبيوتر', power: 250, quantity: 40, hours: 10 },
      { id: 'atm', name: 'صراف آلي', power: 500, quantity: 4, hours: 24 },
      { id: 'server', name: 'سيرفر', power: 1500, quantity: 1, hours: 24 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 100, hours: 12 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    devices: [
      { id: 'display_fridge', name: 'ثلاجة عرض', power: 1200, quantity: 8, hours: 24 },
      { id: 'display_freezer', name: 'فريزر عرض', power: 1500, quantity: 4, hours: 24 },
      { id: 'ac', name: 'تكييف', power: 3000, quantity: 4, hours: 16 },
      { id: 'cash_register', name: 'كاشير', power: 200, quantity: 4, hours: 16 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 80, hours: 16 },
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    devices: [
      { id: 'fuel_pump', name: 'مضخة وقود', power: 1500, quantity: 6, hours: 12 },
      { id: 'compressor', name: 'كمبروسر هواء', power: 2200, quantity: 1, hours: 8 },
      { id: 'canopy_lighting', name: 'إضاءة المظلة', power: 150, quantity: 12, hours: 12 },
      { id: 'shop_ac', name: 'تكييف البقالة', power: 1500, quantity: 2, hours: 24 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    devices: [
      { id: 'crusher', name: 'كسارة', power: 50000, quantity: 1, hours: 16 },
      { id: 'conveyor_belt', name: 'سير ناقل', power: 15000, quantity: 3, hours: 16 },
      { id: 'water_pump', name: 'مضخة مياه', power: 11000, quantity: 2, hours: 12 },
      { id: 'camp_ac', name: 'تكييف السكن', power: 1500, quantity: 20, hours: 12 },
      { id: 'lighting', name: 'إضاءة الموقع', power: 400, quantity: 30, hours: 12 },
    ]
  }
];
