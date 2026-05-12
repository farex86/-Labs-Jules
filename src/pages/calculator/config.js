export const navigationLinks = [
  { id: 'installation', label_en: 'Installation companies', label_ar: 'شركات التركيب' },
  { id: 'eshop', label_en: 'E shop', label_ar: 'المتجر الإلكتروني' },
  { id: 'finance', label_en: 'Finance', label_ar: 'التمويل' },
  { id: 'blog', label_en: 'Blog', label_ar: 'المدونة' },
  { id: 'training', label_en: 'Training', label_ar: 'التدريب' },
  { id: 'bidding', label_en: 'Solar bidding', label_ar: 'مناقصات الطاقة الشمسية' }
];

export const consumptionPatterns = [
  {
    id: 'ice_factory',
    label_en: 'Ice factory',
    label_ar: 'مصنع تلج',
    defaultDevices: [
      { id: 'ice_maker_large', name_en: 'Industrial Ice Maker', name_ar: 'ماكينة ثلج صناعية', power_watts: 5000, quantity: 2, hours_per_day: 12 },
      { id: 'freezer_room', name_en: 'Freezer Room', name_ar: 'غرفة تجميد', power_watts: 3000, quantity: 1, hours_per_day: 24 }
    ]
  },
  {
    id: 'company',
    label_en: 'Company',
    label_ar: 'شركة',
    defaultDevices: [
      { id: 'ac', name_en: 'Air Conditioner', name_ar: 'مكيف', power_watts: 1500, quantity: 4, hours_per_day: 8 },
      { id: 'pc', name_en: 'Computers', name_ar: 'أجهزة كمبيوتر', power_watts: 200, quantity: 10, hours_per_day: 8 },
      { id: 'lighting', name_en: 'Lighting', name_ar: 'إضاءة', power_watts: 50, quantity: 20, hours_per_day: 10 }
    ]
  },
  {
    id: 'farm',
    label_en: 'Farm',
    label_ar: 'مزرعة',
    defaultDevices: [
      { id: 'water_pump', name_en: 'Water Pump', name_ar: 'مضخة ماء', power_watts: 2000, quantity: 1, hours_per_day: 6 },
      { id: 'lighting', name_en: 'Lighting', name_ar: 'إضاءة', power_watts: 50, quantity: 10, hours_per_day: 12 }
    ]
  },
  {
    id: 'poultry_farm',
    label_en: 'Poultry Farm',
    label_ar: 'مزرعة دواجن',
    defaultDevices: [
      { id: 'ventilation', name_en: 'Ventilation Fans', name_ar: 'مراوح تهوية', power_watts: 500, quantity: 6, hours_per_day: 24 },
      { id: 'heater', name_en: 'Heating System', name_ar: 'نظام تدفئة', power_watts: 2000, quantity: 2, hours_per_day: 12 },
      { id: 'lighting', name_en: 'Lighting', name_ar: 'إضاءة', power_watts: 40, quantity: 20, hours_per_day: 16 }
    ]
  },
  {
    id: 'greenhouse',
    label_en: 'Greenhouses',
    label_ar: 'بيوت محمية',
    defaultDevices: [
      { id: 'irrigation_pump', name_en: 'Irrigation Pump', name_ar: 'مضخة ري', power_watts: 1000, quantity: 2, hours_per_day: 4 },
      { id: 'cooling_pad', name_en: 'Cooling Pad System', name_ar: 'نظام تبريد', power_watts: 800, quantity: 2, hours_per_day: 8 }
    ]
  },
  {
    id: 'factory',
    label_en: 'Factory',
    label_ar: 'مصنع',
    defaultDevices: [
      { id: 'heavy_machinery', name_en: 'Heavy Machinery', name_ar: 'معدات ثقيلة', power_watts: 10000, quantity: 2, hours_per_day: 8 },
      { id: 'lighting', name_en: 'Industrial Lighting', name_ar: 'إضاءة صناعية', power_watts: 100, quantity: 50, hours_per_day: 10 }
    ]
  },
  {
    id: 'clinic',
    label_en: 'Clinic',
    label_ar: 'مستوصف',
    defaultDevices: [
      { id: 'ac', name_en: 'Air Conditioner', name_ar: 'مكيف', power_watts: 1500, quantity: 3, hours_per_day: 12 },
      { id: 'medical_fridge', name_en: 'Medical Refrigerator', name_ar: 'ثلاجة أدوية', power_watts: 300, quantity: 2, hours_per_day: 24 },
      { id: 'lab_equip', name_en: 'Lab Equipment', name_ar: 'معدات مختبر', power_watts: 800, quantity: 2, hours_per_day: 8 }
    ]
  },
  {
    id: 'hospital',
    label_en: 'Hospital',
    label_ar: 'مستشفي',
    defaultDevices: [
      { id: 'central_ac', name_en: 'Central AC', name_ar: 'تكييف مركزي', power_watts: 20000, quantity: 1, hours_per_day: 24 },
      { id: 'icu_equip', name_en: 'ICU Equipment', name_ar: 'معدات عناية مركزة', power_watts: 1500, quantity: 10, hours_per_day: 24 },
      { id: 'lighting', name_en: 'Lighting', name_ar: 'إضاءة', power_watts: 40, quantity: 200, hours_per_day: 24 }
    ]
  },
  {
    id: 'bakery',
    label_en: 'Bakery',
    label_ar: 'مخبز',
    defaultDevices: [
      { id: 'electric_oven', name_en: 'Electric Oven', name_ar: 'فرن كهربائي', power_watts: 8000, quantity: 2, hours_per_day: 10 },
      { id: 'dough_mixer', name_en: 'Dough Mixer', name_ar: 'عجانة', power_watts: 1500, quantity: 2, hours_per_day: 4 }
    ]
  },
  {
    id: 'shop',
    label_en: 'Shop',
    label_ar: 'دكان',
    defaultDevices: [
      { id: 'fridge', name_en: 'Refrigerator', name_ar: 'ثلاجة', power_watts: 400, quantity: 2, hours_per_day: 24 },
      { id: 'fan', name_en: 'Fan', name_ar: 'مروحة', power_watts: 100, quantity: 2, hours_per_day: 14 },
      { id: 'lighting', name_en: 'Lighting', name_ar: 'إضاءة', power_watts: 30, quantity: 4, hours_per_day: 14 }
    ]
  },
  {
    id: 'workshop',
    label_en: 'Workshop',
    label_ar: 'ورشة',
    defaultDevices: [
      { id: 'welding_machine', name_en: 'Welding Machine', name_ar: 'ماكينة لحام', power_watts: 3000, quantity: 1, hours_per_day: 4 },
      { id: 'air_compressor', name_en: 'Air Compressor', name_ar: 'كمبروسر هواء', power_watts: 1500, quantity: 1, hours_per_day: 6 }
    ]
  },
  {
    id: 'water_pump',
    label_en: 'Water Pump',
    label_ar: 'مضخة موية',
    defaultDevices: [
      { id: 'submersible_pump', name_en: 'Submersible Pump', name_ar: 'مضخة غاطسة', power_watts: 2200, quantity: 1, hours_per_day: 8 }
    ]
  },
  {
    id: 'donkey',
    label_en: 'Water Station',
    label_ar: 'دونكي',
    defaultDevices: [
      { id: 'large_pump', name_en: 'Large Water Pump', name_ar: 'مضخة ماء كبيرة', power_watts: 5000, quantity: 1, hours_per_day: 10 }
    ]
  },
  {
    id: 'mosque',
    label_en: 'Mosque',
    label_ar: 'مسجد',
    defaultDevices: [
      { id: 'ac', name_en: 'Air Conditioner', name_ar: 'مكيف', power_watts: 1500, quantity: 4, hours_per_day: 4 },
      { id: 'sound_system', name_en: 'Sound System', name_ar: 'نظام صوتي', power_watts: 200, quantity: 1, hours_per_day: 3 },
      { id: 'lighting', name_en: 'Lighting', name_ar: 'إضاءة', power_watts: 40, quantity: 20, hours_per_day: 5 }
    ]
  },
  {
    id: 'printing_press',
    label_en: 'Printing Press',
    label_ar: 'مطبعة',
    defaultDevices: [
      { id: 'printing_machine', name_en: 'Printing Machine', name_ar: 'ماكينة طباعة', power_watts: 4000, quantity: 2, hours_per_day: 8 },
      { id: 'cutter', name_en: 'Paper Cutter', name_ar: 'قصاصة ورق', power_watts: 1500, quantity: 1, hours_per_day: 4 }
    ]
  },
  {
    id: 'coffee_shop',
    label_en: 'Coffee Shop',
    label_ar: 'كوفي شوب',
    defaultDevices: [
      { id: 'espresso_machine', name_en: 'Espresso Machine', name_ar: 'ماكينة قهوة', power_watts: 2500, quantity: 1, hours_per_day: 12 },
      { id: 'ac', name_en: 'Air Conditioner', name_ar: 'مكيف', power_watts: 1500, quantity: 2, hours_per_day: 16 },
      { id: 'fridge', name_en: 'Refrigerator', name_ar: 'ثلاجة', power_watts: 400, quantity: 2, hours_per_day: 24 }
    ]
  },
  {
    id: 'restaurant',
    label_en: 'Restaurant',
    label_ar: 'مطعم',
    defaultDevices: [
      { id: 'fridge', name_en: 'Commercial Refrigerator', name_ar: 'ثلاجة تجارية', power_watts: 800, quantity: 3, hours_per_day: 24 },
      { id: 'ac', name_en: 'Air Conditioner', name_ar: 'مكيف', power_watts: 1500, quantity: 4, hours_per_day: 14 },
      { id: 'exhaust_fan', name_en: 'Exhaust Fan', name_ar: 'مروحة شفط', power_watts: 500, quantity: 2, hours_per_day: 14 }
    ]
  },
  {
    id: 'hotel',
    label_en: 'Hotel',
    label_ar: 'فندق',
    defaultDevices: [
      { id: 'ac', name_en: 'Air Conditioner', name_ar: 'مكيف', power_watts: 1500, quantity: 20, hours_per_day: 12 },
      { id: 'elevator', name_en: 'Elevator', name_ar: 'مصعد', power_watts: 5000, quantity: 1, hours_per_day: 24 },
      { id: 'lighting', name_en: 'Lighting', name_ar: 'إضاءة', power_watts: 20, quantity: 100, hours_per_day: 12 }
    ]
  },
  {
    id: 'bank',
    label_en: 'Bank',
    label_ar: 'بنك',
    defaultDevices: [
      { id: 'ac', name_en: 'Air Conditioner', name_ar: 'مكيف', power_watts: 1500, quantity: 6, hours_per_day: 10 },
      { id: 'pc', name_en: 'Computers', name_ar: 'أجهزة كمبيوتر', power_watts: 200, quantity: 20, hours_per_day: 10 },
      { id: 'atm', name_en: 'ATM Machine', name_ar: 'صراف آلي', power_watts: 300, quantity: 2, hours_per_day: 24 }
    ]
  },
  {
    id: 'supermarket',
    label_en: 'Supermarket',
    label_ar: 'سوبر ماركت',
    defaultDevices: [
      { id: 'display_fridge', name_en: 'Display Refrigerator', name_ar: 'ثلاجة عرض', power_watts: 1000, quantity: 4, hours_per_day: 24 },
      { id: 'ac', name_en: 'Air Conditioner', name_ar: 'مكيف', power_watts: 1500, quantity: 4, hours_per_day: 16 },
      { id: 'lighting', name_en: 'Lighting', name_ar: 'إضاءة', power_watts: 50, quantity: 40, hours_per_day: 16 }
    ]
  },
  {
    id: 'gas_station',
    label_en: 'Gas Station',
    label_ar: 'طرمبة وقود',
    defaultDevices: [
      { id: 'fuel_pump', name_en: 'Fuel Dispenser', name_ar: 'مضخة وقود', power_watts: 800, quantity: 4, hours_per_day: 24 },
      { id: 'lighting', name_en: 'Canopy Lighting', name_ar: 'إضاءة المظلة', power_watts: 150, quantity: 10, hours_per_day: 12 }
    ]
  },
  {
    id: 'mining_company',
    label_en: 'Mining Company',
    label_ar: 'شركة تعدين',
    defaultDevices: [
      { id: 'crusher', name_en: 'Rock Crusher', name_ar: 'كسارة صخور', power_watts: 20000, quantity: 1, hours_per_day: 10 },
      { id: 'conveyor', name_en: 'Conveyor Belt', name_ar: 'حزام ناقل', power_watts: 5000, quantity: 2, hours_per_day: 10 }
    ]
  }
];

export const systemDefaults = {
  panelCapacityWatts: 550, // Default solar panel capacity (e.g., 550W)
  batteryCapacityWh: 2400, // Default battery capacity in Watt-hours (e.g., 200Ah 12V = 2400Wh)
  batteryDod: 0.8, // Depth of Discharge
  systemLosses: 1.2, // Factor to account for system losses (20%)
  peakSunHours: 5.5, // Average peak sun hours
  inverterEfficiency: 0.95 // Inverter efficiency
};
