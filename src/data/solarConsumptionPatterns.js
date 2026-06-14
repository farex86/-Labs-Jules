export const consumptionPatterns = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج (Ice Factory)',
    devices: [
      { id: '1', name: 'ماكينة ثلج (Ice Machine)', power: 15000, quantity: 2, hours: 24 },
      { id: '2', name: 'غرفة تبريد (Cold Room)', power: 5000, quantity: 1, hours: 24 },
      { id: '3', name: 'إضاءة (Lighting)', power: 100, quantity: 20, hours: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة (Company)',
    devices: [
      { id: '1', name: 'مكيف هواء (AC)', power: 1500, quantity: 10, hours: 10 },
      { id: '2', name: 'حاسوب (Computer)', power: 250, quantity: 30, hours: 8 },
      { id: '3', name: 'إضاءة (Lighting)', power: 50, quantity: 50, hours: 12 },
      { id: '4', name: 'ماكينة تصوير (Printer/Copier)', power: 1000, quantity: 2, hours: 4 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة (Farm)',
    devices: [
      { id: '1', name: 'مضخة مياه (Water Pump)', power: 5000, quantity: 2, hours: 8 },
      { id: '2', name: 'إضاءة خارجية (Outdoor Lighting)', power: 100, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن (Poultry Farm)',
    devices: [
      { id: '1', name: 'مراوح تهوية (Ventilation Fans)', power: 1000, quantity: 10, hours: 24 },
      { id: '2', name: 'إضاءة (Lighting)', power: 50, quantity: 50, hours: 24 },
      { id: '3', name: 'نظام تغذية (Feeding System)', power: 2000, quantity: 2, hours: 6 },
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية (Greenhouses)',
    devices: [
      { id: '1', name: 'مضخة ري (Irrigation Pump)', power: 3000, quantity: 1, hours: 6 },
      { id: '2', name: 'مراوح تهوية (Ventilation Fans)', power: 500, quantity: 4, hours: 12 },
      { id: '3', name: 'نظام تبريد (Cooling System)', power: 2000, quantity: 2, hours: 10 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع (Factory)',
    devices: [
      { id: '1', name: 'آلات إنتاج (Production Machines)', power: 20000, quantity: 3, hours: 16 },
      { id: '2', name: 'إضاءة (Lighting)', power: 200, quantity: 100, hours: 16 },
      { id: '3', name: 'مكيفات مركزية (Central AC)', power: 10000, quantity: 2, hours: 16 },
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف (Clinic)',
    devices: [
      { id: '1', name: 'مكيف هواء (AC)', power: 1500, quantity: 8, hours: 12 },
      { id: '2', name: 'معدات طبية (Medical Equipment)', power: 3000, quantity: 2, hours: 8 },
      { id: '3', name: 'ثلاجة أدوية (Medicine Fridge)', power: 300, quantity: 2, hours: 24 },
      { id: '4', name: 'إضاءة (Lighting)', power: 50, quantity: 40, hours: 12 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى (Hospital)',
    devices: [
      { id: '1', name: 'مكيفات مركزية (Central AC)', power: 15000, quantity: 4, hours: 24 },
      { id: '2', name: 'معدات طبية ثقيلة (Heavy Medical Eq.)', power: 10000, quantity: 5, hours: 12 },
      { id: '3', name: 'إضاءة (Lighting)', power: 100, quantity: 200, hours: 24 },
      { id: '4', name: 'ثلاجات (Fridges)', power: 500, quantity: 10, hours: 24 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز (Bakery)',
    devices: [
      { id: '1', name: 'فرن كهربائي (Electric Oven)', power: 15000, quantity: 2, hours: 12 },
      { id: '2', name: 'عجانة (Dough Mixer)', power: 3000, quantity: 2, hours: 6 },
      { id: '3', name: 'إضاءة (Lighting)', power: 100, quantity: 10, hours: 14 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان (Shop/Grocery)',
    devices: [
      { id: '1', name: 'ثلاجة عرض (Display Fridge)', power: 800, quantity: 3, hours: 24 },
      { id: '2', name: 'فريزر (Freezer)', power: 1000, quantity: 2, hours: 24 },
      { id: '3', name: 'مكيف هواء (AC)', power: 1500, quantity: 1, hours: 14 },
      { id: '4', name: 'إضاءة (Lighting)', power: 50, quantity: 10, hours: 14 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة (Workshop)',
    devices: [
      { id: '1', name: 'آلة لحام (Welding Machine)', power: 5000, quantity: 2, hours: 6 },
      { id: '2', name: 'مخرطة (Lathe Machine)', power: 3000, quantity: 1, hours: 8 },
      { id: '3', name: 'صاروخ جلخ (Grinder)', power: 1500, quantity: 3, hours: 4 },
      { id: '4', name: 'إضاءة (Lighting)', power: 100, quantity: 10, hours: 10 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية (Water Pump Station)',
    devices: [
      { id: '1', name: 'مضخة غاطسة (Submersible Pump)', power: 7500, quantity: 2, hours: 10 },
      { id: '2', name: 'إضاءة (Lighting)', power: 50, quantity: 2, hours: 12 },
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي (Donkey/Rural Water Well)',
    devices: [
      { id: '1', name: 'مضخة صغيرة (Small Pump)', power: 2200, quantity: 1, hours: 6 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد (Mosque)',
    devices: [
      { id: '1', name: 'مكيف هواء (AC)', power: 2000, quantity: 6, hours: 6 },
      { id: '2', name: 'مراوح (Fans)', power: 100, quantity: 10, hours: 8 },
      { id: '3', name: 'إضاءة (Lighting)', power: 50, quantity: 40, hours: 8 },
      { id: '4', name: 'مكبر صوت (Sound System)', power: 300, quantity: 1, hours: 4 },
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة (Printing Press)',
    devices: [
      { id: '1', name: 'آلة طباعة (Printing Machine)', power: 8000, quantity: 2, hours: 10 },
      { id: '2', name: 'مكيف هواء (AC)', power: 2000, quantity: 3, hours: 12 },
      { id: '3', name: 'حواسيب (Computers)', power: 250, quantity: 5, hours: 10 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب (Coffee Shop)',
    devices: [
      { id: '1', name: 'آلة إسبريسو (Espresso Machine)', power: 3500, quantity: 1, hours: 16 },
      { id: '2', name: 'ثلاجة عرض (Display Fridge)', power: 800, quantity: 2, hours: 24 },
      { id: '3', name: 'مكيف هواء (AC)', power: 2000, quantity: 2, hours: 16 },
      { id: '4', name: 'إضاءة وديكور (Lighting/Decor)', power: 1000, quantity: 1, hours: 16 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم (Restaurant)',
    devices: [
      { id: '1', name: 'ثلاجات (Fridges/Freezers)', power: 1000, quantity: 4, hours: 24 },
      { id: '2', name: 'أفران/شوايات (Ovens/Grills)', power: 5000, quantity: 2, hours: 14 },
      { id: '3', name: 'مكيف هواء (AC)', power: 2000, quantity: 4, hours: 14 },
      { id: '4', name: 'إضاءة (Lighting)', power: 100, quantity: 30, hours: 14 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق (Hotel)',
    devices: [
      { id: '1', name: 'مكيفات غرف (Room ACs)', power: 1500, quantity: 50, hours: 12 },
      { id: '2', name: 'سخانات مياه (Water Heaters)', power: 2000, quantity: 25, hours: 4 },
      { id: '3', name: 'إضاءة (Lighting)', power: 50, quantity: 200, hours: 12 },
      { id: '4', name: 'مصاعد (Elevators)', power: 7500, quantity: 2, hours: 6 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك (Bank)',
    devices: [
      { id: '1', name: 'مكيفات هواء (ACs)', power: 2000, quantity: 10, hours: 10 },
      { id: '2', name: 'حواسيب (Computers)', power: 250, quantity: 30, hours: 10 },
      { id: '3', name: 'صراف آلي (ATM)', power: 500, quantity: 3, hours: 24 },
      { id: '4', name: 'سيرفرات (Servers)', power: 1500, quantity: 2, hours: 24 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت (Supermarket)',
    devices: [
      { id: '1', name: 'ثلاجات عرض (Display Fridges)', power: 1500, quantity: 10, hours: 24 },
      { id: '2', name: 'مكيفات مركزية (Central AC)', power: 10000, quantity: 2, hours: 16 },
      { id: '3', name: 'إضاءة (Lighting)', power: 100, quantity: 100, hours: 16 },
      { id: '4', name: 'نقاط بيع (POS Systems)', power: 200, quantity: 5, hours: 16 },
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود (Gas Station)',
    devices: [
      { id: '1', name: 'مضخات وقود (Fuel Pumps)', power: 1500, quantity: 6, hours: 24 },
      { id: '2', name: 'إضاءة مظلة (Canopy Lighting)', power: 200, quantity: 20, hours: 12 },
      { id: '3', name: 'مكيفات البقالة (Mart ACs)', power: 1500, quantity: 2, hours: 24 },
      { id: '4', name: 'ثلاجات البقالة (Mart Fridges)', power: 800, quantity: 4, hours: 24 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين (Mining Company)',
    devices: [
      { id: '1', name: 'كسارات (Crushers)', power: 30000, quantity: 2, hours: 16 },
      { id: '2', name: 'سيور ناقلة (Conveyor Belts)', power: 10000, quantity: 4, hours: 16 },
      { id: '3', name: 'مضخات مياه (Water Pumps)', power: 15000, quantity: 3, hours: 24 },
      { id: '4', name: 'مخيم العمال (Worker Camp ACs & Light)', power: 50000, quantity: 1, hours: 12 },
    ]
  }
];

// Configuration defaults for the solar system calculation
export const solarConfigOptions = {
  panelPowerW: 550, // Watts per panel
  batteryVoltageV: 12, // Voltage per battery
  batteryCapacityAh: 200, // Amp-hours per battery
  dod: 0.8, // Depth of Discharge for batteries (80%)
  systemVoltage: 48, // DC System voltage
  sunlightHours: 5.5, // Average peak sun hours per day
  efficiency: 0.8, // Overall system efficiency
  inverterSafetyFactor: 1.25, // 25% extra capacity for inverter
};
