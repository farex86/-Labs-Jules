export const consumptionPatterns = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج',
    defaultDevices: [
      { id: 'ice_maker', name: 'صانعة ثلج (Ice Maker)', power: 5000, quantity: 1, hours: 12 },
      { id: 'freezer', name: 'فريزر (Freezer)', power: 1500, quantity: 2, hours: 24 },
      { id: 'lighting', name: 'إضاءة (Lighting)', power: 50, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    defaultDevices: [
      { id: 'computer', name: 'كمبيوتر (Computer)', power: 250, quantity: 10, hours: 8 },
      { id: 'ac', name: 'مكيف (Air Conditioner)', power: 1500, quantity: 3, hours: 8 },
      { id: 'printer', name: 'طابعة (Printer)', power: 500, quantity: 2, hours: 2 },
      { id: 'lighting', name: 'إضاءة (Lighting)', power: 40, quantity: 20, hours: 10 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultDevices: [
      { id: 'water_pump', name: 'مضخة ماء (Water Pump)', power: 2000, quantity: 1, hours: 6 },
      { id: 'lighting', name: 'إضاءة خارجية (Outdoor Lighting)', power: 100, quantity: 5, hours: 12 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultDevices: [
      { id: 'ventilation', name: 'مراوح تهوية (Ventilation Fans)', power: 500, quantity: 4, hours: 24 },
      { id: 'heater', name: 'سخانات (Heaters)', power: 2000, quantity: 2, hours: 12 },
      { id: 'lighting', name: 'إضاءة (Lighting)', power: 50, quantity: 20, hours: 16 },
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    defaultDevices: [
      { id: 'water_pump', name: 'مضخة ماء (Water Pump)', power: 1500, quantity: 1, hours: 4 },
      { id: 'ventilation', name: 'تهوية (Ventilation)', power: 300, quantity: 2, hours: 12 },
      { id: 'grow_lights', name: 'إضاءة زراعية (Grow Lights)', power: 200, quantity: 10, hours: 8 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultDevices: [
      { id: 'machinery', name: 'آلات (Machinery)', power: 5000, quantity: 3, hours: 8 },
      { id: 'lighting', name: 'إضاءة (Lighting)', power: 100, quantity: 30, hours: 10 },
      { id: 'compressor', name: 'كمبروسر (Air Compressor)', power: 3000, quantity: 1, hours: 4 },
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultDevices: [
      { id: 'ac', name: 'مكيف (Air Conditioner)', power: 1500, quantity: 4, hours: 12 },
      { id: 'fridge_meds', name: 'ثلاجة أدوية (Medicine Fridge)', power: 300, quantity: 2, hours: 24 },
      { id: 'lighting', name: 'إضاءة (Lighting)', power: 50, quantity: 20, hours: 14 },
      { id: 'medical_eq', name: 'معدات طبية (Medical Equipment)', power: 1000, quantity: 2, hours: 6 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    defaultDevices: [
      { id: 'ac', name: 'مكيفات مركزية (HVAC)', power: 10000, quantity: 2, hours: 24 },
      { id: 'medical_eq', name: 'أجهزة طبية (Large Medical Eq)', power: 5000, quantity: 5, hours: 12 },
      { id: 'lighting', name: 'إضاءة (Lighting)', power: 50, quantity: 100, hours: 24 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultDevices: [
      { id: 'mixer', name: 'عجانة (Dough Mixer)', power: 3000, quantity: 1, hours: 6 },
      { id: 'oven', name: 'فرن كهربائي (Electric Oven)', power: 8000, quantity: 1, hours: 8 },
      { id: 'lighting', name: 'إضاءة (Lighting)', power: 50, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultDevices: [
      { id: 'fridge', name: 'ثلاجة عرض (Display Fridge)', power: 400, quantity: 2, hours: 24 },
      { id: 'fan', name: 'مروحة (Fan)', power: 75, quantity: 2, hours: 12 },
      { id: 'lighting', name: 'إضاءة (Lighting)', power: 30, quantity: 4, hours: 8 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultDevices: [
      { id: 'welding', name: 'ماكينة لحام (Welding Machine)', power: 4000, quantity: 1, hours: 4 },
      { id: 'grinder', name: 'صاروخ جلخ (Grinder)', power: 1500, quantity: 2, hours: 3 },
      { id: 'lighting', name: 'إضاءة (Lighting)', power: 100, quantity: 5, hours: 10 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    defaultDevices: [
      { id: 'pump', name: 'مضخة (Pump)', power: 3000, quantity: 1, hours: 8 },
    ]
  },
  {
    id: 'donkey_station',
    name: 'دونكي',
    defaultDevices: [
      { id: 'submersible_pump', name: 'مضخة غاطسة (Submersible Pump)', power: 4000, quantity: 1, hours: 10 },
      { id: 'surface_pump', name: 'مضخة سطحية (Surface Pump)', power: 2000, quantity: 1, hours: 5 },
      { id: 'lighting', name: 'إضاءة (Lighting)', power: 50, quantity: 4, hours: 12 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultDevices: [
      { id: 'ac', name: 'مكيف (Air Conditioner)', power: 2000, quantity: 6, hours: 6 },
      { id: 'sound_system', name: 'نظام صوتي (Sound System)', power: 300, quantity: 1, hours: 4 },
      { id: 'lighting', name: 'إضاءة (Lighting)', power: 40, quantity: 30, hours: 6 },
      { id: 'fan', name: 'مروحة (Fan)', power: 75, quantity: 10, hours: 8 },
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultDevices: [
      { id: 'printer_machine', name: 'ماكينة طباعة (Printing Machine)', power: 5000, quantity: 2, hours: 10 },
      { id: 'computer', name: 'كمبيوتر (Computer)', power: 250, quantity: 3, hours: 10 },
      { id: 'lighting', name: 'إضاءة (Lighting)', power: 50, quantity: 15, hours: 12 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultDevices: [
      { id: 'espresso', name: 'ماكينة قهوة (Espresso Machine)', power: 3000, quantity: 1, hours: 12 },
      { id: 'grinder', name: 'طاحونة (Grinder)', power: 500, quantity: 2, hours: 4 },
      { id: 'fridge', name: 'ثلاجة عرض (Display Fridge)', power: 400, quantity: 1, hours: 24 },
      { id: 'ac', name: 'مكيف (Air Conditioner)', power: 1500, quantity: 2, hours: 14 },
      { id: 'lighting', name: 'إضاءة (Lighting)', power: 30, quantity: 20, hours: 14 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultDevices: [
      { id: 'fridge', name: 'ثلاجة (Fridge)', power: 500, quantity: 3, hours: 24 },
      { id: 'freezer', name: 'فريزر (Freezer)', power: 800, quantity: 2, hours: 24 },
      { id: 'ac', name: 'مكيف (Air Conditioner)', power: 2000, quantity: 4, hours: 14 },
      { id: 'exhaust', name: 'شفاط هواء (Exhaust Fan)', power: 600, quantity: 2, hours: 12 },
      { id: 'lighting', name: 'إضاءة (Lighting)', power: 40, quantity: 30, hours: 14 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultDevices: [
      { id: 'ac', name: 'مكيف (Air Conditioner)', power: 1500, quantity: 20, hours: 12 },
      { id: 'water_heater', name: 'سخان ماء (Water Heater)', power: 2000, quantity: 5, hours: 4 },
      { id: 'elevator', name: 'مصعد (Elevator)', power: 5000, quantity: 1, hours: 3 },
      { id: 'lighting', name: 'إضاءة (Lighting)', power: 20, quantity: 100, hours: 12 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultDevices: [
      { id: 'computer', name: 'كمبيوتر (Computer)', power: 250, quantity: 20, hours: 10 },
      { id: 'ac', name: 'مكيف (Air Conditioner)', power: 2000, quantity: 5, hours: 12 },
      { id: 'server', name: 'سيرفر (Server)', power: 1000, quantity: 2, hours: 24 },
      { id: 'atm', name: 'صراف آلي (ATM)', power: 500, quantity: 2, hours: 24 },
      { id: 'lighting', name: 'إضاءة (Lighting)', power: 40, quantity: 50, hours: 12 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultDevices: [
      { id: 'display_fridge', name: 'ثلاجة عرض (Display Fridge)', power: 600, quantity: 5, hours: 24 },
      { id: 'freezer', name: 'فريزر (Freezer)', power: 800, quantity: 3, hours: 24 },
      { id: 'ac', name: 'مكيف (Air Conditioner)', power: 2000, quantity: 4, hours: 16 },
      { id: 'lighting', name: 'إضاءة (Lighting)', power: 40, quantity: 40, hours: 16 },
    ]
  },
  {
    id: 'fuel_station',
    name: 'طرمبة وقود',
    defaultDevices: [
      { id: 'dispenser', name: 'مضخة وقود (Fuel Dispenser)', power: 1000, quantity: 4, hours: 10 },
      { id: 'lighting', name: 'إضاءة المظلة (Canopy Lighting)', power: 100, quantity: 12, hours: 12 },
      { id: 'shop_fridge', name: 'ثلاجة المتجر (Shop Fridge)', power: 400, quantity: 2, hours: 24 },
    ]
  },
  {
    id: 'mining',
    name: 'شركة تعدين',
    defaultDevices: [
      { id: 'crusher', name: 'كسارة (Crusher)', power: 10000, quantity: 1, hours: 10 },
      { id: 'conveyor', name: 'حزام ناقل (Conveyor)', power: 5000, quantity: 2, hours: 10 },
      { id: 'floodlight', name: 'كشافات إضاءة (Floodlights)', power: 1000, quantity: 10, hours: 12 },
      { id: 'pump', name: 'مضخة (Pump)', power: 4000, quantity: 2, hours: 12 },
    ]
  }
];

export const systemDefaults = {
  sunHours: 5.5, // Average peak sun hours
  systemEfficiency: 0.8, // System losses (20%)
  inverterSurgeFactor: 1.25, // Inverter sizing factor
  batteryVoltage: 48, // Standard system voltage for large setups
  batteryDepthOfDischarge: 0.8, // Lithium battery DoD (80%)
  daysOfAutonomy: 1, // Number of days the battery can run without sun
  panelWattage: 550, // Standard panel size in Watts
};
