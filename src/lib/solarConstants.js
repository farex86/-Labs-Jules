export const CONSUMPTION_PATTERNS = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج', // Ice Factory
    nameEn: 'Ice Factory',
    typicalDevices: [
      { id: 'compressor', name: 'كمبروسر', nameEn: 'Compressor', defaultPowerW: 5000, defaultHours: 24 },
      { id: 'water_pump', name: 'مضخة مياه', nameEn: 'Water Pump', defaultPowerW: 1500, defaultHours: 12 },
      { id: 'lighting', name: 'إضاءة', nameEn: 'Lighting', defaultPowerW: 500, defaultHours: 12 }
    ]
  },
  {
    id: 'company',
    name: 'شركة', // Company
    nameEn: 'Company',
    typicalDevices: [
      { id: 'ac', name: 'مكيف', nameEn: 'Air Conditioner', defaultPowerW: 2000, defaultHours: 8 },
      { id: 'computer', name: 'جهاز كمبيوتر', nameEn: 'Computer', defaultPowerW: 200, defaultHours: 8 },
      { id: 'lighting', name: 'إضاءة', nameEn: 'Lighting', defaultPowerW: 1000, defaultHours: 10 },
      { id: 'server', name: 'سيرفر', nameEn: 'Server', defaultPowerW: 800, defaultHours: 24 }
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة', // Farm
    nameEn: 'Farm',
    typicalDevices: [
      { id: 'water_pump', name: 'مضخة مياه (غطاس)', nameEn: 'Submersible Pump', defaultPowerW: 3000, defaultHours: 8 },
      { id: 'irrigation_system', name: 'نظام ري', nameEn: 'Irrigation System', defaultPowerW: 1000, defaultHours: 6 },
      { id: 'lighting', name: 'إضاءة', nameEn: 'Lighting', defaultPowerW: 500, defaultHours: 12 }
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن', // Poultry Farm
    nameEn: 'Poultry Farm',
    typicalDevices: [
      { id: 'fans', name: 'مراوح تهوية', nameEn: 'Ventilation Fans', defaultPowerW: 1500, defaultHours: 24 },
      { id: 'heating', name: 'نظام تدفئة', nameEn: 'Heating System', defaultPowerW: 3000, defaultHours: 12 },
      { id: 'lighting', name: 'إضاءة', nameEn: 'Lighting', defaultPowerW: 800, defaultHours: 16 },
      { id: 'feeding_system', name: 'نظام تغذية', nameEn: 'Feeding System', defaultPowerW: 1000, defaultHours: 4 }
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية', // Greenhouses
    nameEn: 'Greenhouses',
    typicalDevices: [
      { id: 'ac_cooling', name: 'تبريد وتكييف', nameEn: 'Cooling & AC', defaultPowerW: 2500, defaultHours: 12 },
      { id: 'water_pump', name: 'مضخة مياه', nameEn: 'Water Pump', defaultPowerW: 1500, defaultHours: 6 },
      { id: 'lighting', name: 'إضاءة زراعية', nameEn: 'Grow Lights', defaultPowerW: 2000, defaultHours: 14 }
    ]
  },
  {
    id: 'factory',
    name: 'مصنع', // Factory
    nameEn: 'Factory',
    typicalDevices: [
      { id: 'heavy_machinery', name: 'معدات ثقيلة', nameEn: 'Heavy Machinery', defaultPowerW: 10000, defaultHours: 16 },
      { id: 'conveyor', name: 'سير ناقل', nameEn: 'Conveyor Belt', defaultPowerW: 3000, defaultHours: 16 },
      { id: 'lighting', name: 'إضاءة', nameEn: 'Lighting', defaultPowerW: 2000, defaultHours: 24 }
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف', // Clinic
    nameEn: 'Clinic',
    typicalDevices: [
      { id: 'ac', name: 'مكيف', nameEn: 'Air Conditioner', defaultPowerW: 2000, defaultHours: 12 },
      { id: 'medical_eq', name: 'معدات طبية خفيفة', nameEn: 'Light Medical Eq.', defaultPowerW: 1500, defaultHours: 8 },
      { id: 'fridge', name: 'ثلاجة أدوية', nameEn: 'Medicine Fridge', defaultPowerW: 300, defaultHours: 24 },
      { id: 'lighting', name: 'إضاءة', nameEn: 'Lighting', defaultPowerW: 1000, defaultHours: 14 }
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى', // Hospital
    nameEn: 'Hospital',
    typicalDevices: [
      { id: 'central_ac', name: 'تكييف مركزي', nameEn: 'Central AC', defaultPowerW: 20000, defaultHours: 24 },
      { id: 'heavy_medical_eq', name: 'معدات طبية ثقيلة', nameEn: 'Heavy Medical Eq.', defaultPowerW: 15000, defaultHours: 12 },
      { id: 'fridge', name: 'ثلاجات حفظ', nameEn: 'Storage Fridges', defaultPowerW: 2000, defaultHours: 24 },
      { id: 'lighting', name: 'إضاءة', nameEn: 'Lighting', defaultPowerW: 5000, defaultHours: 24 },
      { id: 'elevators', name: 'مصاعد', nameEn: 'Elevators', defaultPowerW: 8000, defaultHours: 24 }
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز', // Bakery
    nameEn: 'Bakery',
    typicalDevices: [
      { id: 'electric_oven', name: 'فرن كهربائي', nameEn: 'Electric Oven', defaultPowerW: 12000, defaultHours: 10 },
      { id: 'mixer', name: 'عجانة', nameEn: 'Mixer', defaultPowerW: 3000, defaultHours: 6 },
      { id: 'fridge', name: 'ثلاجة عرض', nameEn: 'Display Fridge', defaultPowerW: 1500, defaultHours: 24 },
      { id: 'lighting', name: 'إضاءة', nameEn: 'Lighting', defaultPowerW: 800, defaultHours: 16 }
    ]
  },
  {
    id: 'shop',
    name: 'دكان', // Shop
    nameEn: 'Shop',
    typicalDevices: [
      { id: 'fridge', name: 'ثلاجة', nameEn: 'Fridge', defaultPowerW: 500, defaultHours: 24 },
      { id: 'freezer', name: 'فريزر', nameEn: 'Freezer', defaultPowerW: 600, defaultHours: 24 },
      { id: 'ac', name: 'مكيف', nameEn: 'Air Conditioner', defaultPowerW: 1500, defaultHours: 12 },
      { id: 'lighting', name: 'إضاءة', nameEn: 'Lighting', defaultPowerW: 300, defaultHours: 14 }
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة', // Workshop
    nameEn: 'Workshop',
    typicalDevices: [
      { id: 'welding_machine', name: 'ماكينة لحام', nameEn: 'Welding Machine', defaultPowerW: 5000, defaultHours: 6 },
      { id: 'air_compressor', name: 'كمبروسر هواء', nameEn: 'Air Compressor', defaultPowerW: 3000, defaultHours: 8 },
      { id: 'drill_grinder', name: 'صاروخ / دريل', nameEn: 'Grinder / Drill', defaultPowerW: 1500, defaultHours: 5 },
      { id: 'lighting', name: 'إضاءة', nameEn: 'Lighting', defaultPowerW: 1000, defaultHours: 10 }
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية', // Water Pump
    nameEn: 'Water Pump Station',
    typicalDevices: [
      { id: 'main_pump', name: 'مضخة رئيسية', nameEn: 'Main Pump', defaultPowerW: 5000, defaultHours: 12 },
      { id: 'control_panel', name: 'لوحة تحكم', nameEn: 'Control Panel', defaultPowerW: 200, defaultHours: 24 },
      { id: 'lighting', name: 'إضاءة', nameEn: 'Lighting', defaultPowerW: 300, defaultHours: 12 }
    ]
  },
  {
    id: 'donkey', // Unsure of translation, using donkey/rural pump? Or refers to engine "Donkey"
    name: 'دونكي',
    nameEn: 'Donkey (Rural Engine/Pump)',
    typicalDevices: [
      { id: 'motor', name: 'موتور', nameEn: 'Motor', defaultPowerW: 4000, defaultHours: 8 },
      { id: 'lighting', name: 'إضاءة', nameEn: 'Lighting', defaultPowerW: 200, defaultHours: 8 }
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد', // Mosque
    nameEn: 'Mosque',
    typicalDevices: [
      { id: 'ac', name: 'مكيف', nameEn: 'Air Conditioner', defaultPowerW: 2000, defaultHours: 8 },
      { id: 'fans', name: 'مراوح', nameEn: 'Fans', defaultPowerW: 200, defaultHours: 8 },
      { id: 'lighting', name: 'إضاءة', nameEn: 'Lighting', defaultPowerW: 1000, defaultHours: 6 },
      { id: 'sound_system', name: 'نظام صوت', nameEn: 'Sound System', defaultPowerW: 500, defaultHours: 3 }
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة', // Printing Press
    nameEn: 'Printing Press',
    typicalDevices: [
      { id: 'printing_machine', name: 'ماكينة طباعة', nameEn: 'Printing Machine', defaultPowerW: 8000, defaultHours: 12 },
      { id: 'cutter', name: 'ماكينة قص', nameEn: 'Cutting Machine', defaultPowerW: 3000, defaultHours: 8 },
      { id: 'computers', name: 'أجهزة كمبيوتر', nameEn: 'Computers', defaultPowerW: 1500, defaultHours: 12 },
      { id: 'ac', name: 'مكيف', nameEn: 'Air Conditioner', defaultPowerW: 3000, defaultHours: 12 },
      { id: 'lighting', name: 'إضاءة', nameEn: 'Lighting', defaultPowerW: 1500, defaultHours: 12 }
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب', // Coffee Shop
    nameEn: 'Coffee Shop',
    typicalDevices: [
      { id: 'espresso_machine', name: 'ماكينة قهوة', nameEn: 'Espresso Machine', defaultPowerW: 3500, defaultHours: 16 },
      { id: 'grinder', name: 'طاحونة', nameEn: 'Coffee Grinder', defaultPowerW: 800, defaultHours: 8 },
      { id: 'fridge', name: 'ثلاجة', nameEn: 'Fridge', defaultPowerW: 1000, defaultHours: 24 },
      { id: 'ac', name: 'مكيف', nameEn: 'Air Conditioner', defaultPowerW: 2000, defaultHours: 16 },
      { id: 'lighting', name: 'إضاءة', nameEn: 'Lighting', defaultPowerW: 800, defaultHours: 16 }
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم', // Restaurant
    nameEn: 'Restaurant',
    typicalDevices: [
      { id: 'electric_oven', name: 'فرن', nameEn: 'Electric Oven/Stove', defaultPowerW: 6000, defaultHours: 12 },
      { id: 'fridge_freezer', name: 'ثلاجات وفريزرات', nameEn: 'Fridges & Freezers', defaultPowerW: 4000, defaultHours: 24 },
      { id: 'ac', name: 'تكييف', nameEn: 'Air Conditioning', defaultPowerW: 5000, defaultHours: 14 },
      { id: 'exhaust_fan', name: 'شفاط هواء', nameEn: 'Exhaust Fans', defaultPowerW: 1500, defaultHours: 14 },
      { id: 'lighting', name: 'إضاءة', nameEn: 'Lighting', defaultPowerW: 1500, defaultHours: 16 }
    ]
  },
  {
    id: 'hotel',
    name: 'فندق', // Hotel
    nameEn: 'Hotel',
    typicalDevices: [
      { id: 'rooms_ac', name: 'تكييف الغرف', nameEn: 'Rooms AC', defaultPowerW: 20000, defaultHours: 16 },
      { id: 'elevators', name: 'مصاعد', nameEn: 'Elevators', defaultPowerW: 8000, defaultHours: 24 },
      { id: 'water_heaters', name: 'سخانات مياه', nameEn: 'Water Heaters', defaultPowerW: 10000, defaultHours: 6 },
      { id: 'kitchen', name: 'معدات مطبخ', nameEn: 'Kitchen Equipment', defaultPowerW: 15000, defaultHours: 12 },
      { id: 'lighting', name: 'إضاءة', nameEn: 'Lighting', defaultPowerW: 5000, defaultHours: 24 }
    ]
  },
  {
    id: 'bank',
    name: 'بنك', // Bank
    nameEn: 'Bank',
    typicalDevices: [
      { id: 'central_ac', name: 'تكييف مركزي', nameEn: 'Central AC', defaultPowerW: 15000, defaultHours: 10 },
      { id: 'computers', name: 'أجهزة كمبيوتر', nameEn: 'Computers', defaultPowerW: 5000, defaultHours: 10 },
      { id: 'servers', name: 'سيرفرات', nameEn: 'Servers', defaultPowerW: 2000, defaultHours: 24 },
      { id: 'atm', name: 'صراف آلي', nameEn: 'ATMs', defaultPowerW: 1500, defaultHours: 24 },
      { id: 'lighting', name: 'إضاءة', nameEn: 'Lighting', defaultPowerW: 3000, defaultHours: 12 }
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت', // Supermarket
    nameEn: 'Supermarket',
    typicalDevices: [
      { id: 'display_fridges', name: 'ثلاجات عرض', nameEn: 'Display Fridges', defaultPowerW: 10000, defaultHours: 24 },
      { id: 'freezers', name: 'فريزرات', nameEn: 'Freezers', defaultPowerW: 8000, defaultHours: 24 },
      { id: 'ac', name: 'تكييف', nameEn: 'Air Conditioning', defaultPowerW: 6000, defaultHours: 16 },
      { id: 'pos_systems', name: 'كاشير', nameEn: 'POS Systems', defaultPowerW: 1000, defaultHours: 16 },
      { id: 'lighting', name: 'إضاءة', nameEn: 'Lighting', defaultPowerW: 3000, defaultHours: 16 }
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود', // Gas Station
    nameEn: 'Gas Station',
    typicalDevices: [
      { id: 'fuel_pumps', name: 'مضخات وقود', nameEn: 'Fuel Pumps', defaultPowerW: 5000, defaultHours: 24 },
      { id: 'canopy_lighting', name: 'إضاءة المظلة', nameEn: 'Canopy Lighting', defaultPowerW: 2000, defaultHours: 12 },
      { id: 'store_ac', name: 'تكييف البقالة', nameEn: 'Store AC', defaultPowerW: 2000, defaultHours: 24 },
      { id: 'store_fridges', name: 'ثلاجات البقالة', nameEn: 'Store Fridges', defaultPowerW: 2000, defaultHours: 24 }
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين', // Mining Company
    nameEn: 'Mining Company',
    typicalDevices: [
      { id: 'crushers', name: 'كسارات', nameEn: 'Crushers', defaultPowerW: 20000, defaultHours: 12 },
      { id: 'mills', name: 'طواحين', nameEn: 'Mills', defaultPowerW: 15000, defaultHours: 12 },
      { id: 'water_pumps', name: 'مضخات مياه ضخمة', nameEn: 'Large Water Pumps', defaultPowerW: 10000, defaultHours: 12 },
      { id: 'lighting_towers', name: 'أبراج إضاءة', nameEn: 'Lighting Towers', defaultPowerW: 5000, defaultHours: 12 },
      { id: 'camp_ac', name: 'تكييف السكن', nameEn: 'Camp AC', defaultPowerW: 10000, defaultHours: 12 }
    ]
  }
];

export const SOLAR_CONSTANTS = {
  // Average Peak Sun Hours (PSH) per day
  PEAK_SUN_HOURS: 5,
  // System efficiency (losses due to wiring, dust, inverter inefficiency)
  SYSTEM_EFFICIENCY: 0.8,
  // Average wattage of a single solar panel
  AVERAGE_PANEL_WATTAGE: 550, // 550W panels are common now
  // Average capacity of a battery (in Ah)
  AVERAGE_BATTERY_AH: 200,
  // Battery voltage
  BATTERY_VOLTAGE: 12, // Usually wired in 24V or 48V banks, but base unit is 12V
  // Recommended Depth of Discharge (DoD) for Lead Acid/Gel
  BATTERY_DOD: 0.5, // 50%
  // Inverter safety margin (e.g. 1.25 means 25% oversized to handle surges)
  INVERTER_SURGE_MARGIN: 1.25,
};
