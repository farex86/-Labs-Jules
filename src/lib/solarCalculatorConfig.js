// Constant values for solar calculations
export const SOLAR_CONSTANTS = {
  SYSTEM_VOLTAGE: 48, // typical for larger systems (24V or 48V)
  PANEL_WATTAGE: 550, // modern panel average watts
  BATTERY_VOLTAGE: 12, // typical battery voltage
  BATTERY_AMP_HOURS: 200, // typical battery capacity (Ah)
  SUN_HOURS: 6, // average peak sun hours per day
  INVERTER_EFFICIENCY: 0.9,
  SYSTEM_LOSSES: 1.2, // Safety factor for system losses (20%)
  DEPTH_OF_DISCHARGE: 0.5, // 50% max discharge for lead-acid (can be 0.8 for Lithium)
};

// Consumption Patterns in Arabic as requested
// "مصنع تلج, شركة, مزرعة, مزرعة دواجن, بيوت محمية, مصنع, مستوصف, مستشفي, مخبز, دكان, ورشة, مضخة موية, دونكي, مسجد, مطبعة, كوفي شوب, مطعم, فندق, بنك, سوبر ماركت, طرمبة وقود, شركة تعدين"

export const CONSUMPTION_PATTERNS = [
  {
    id: "ice_factory",
    name: "مصنع تلج (Ice Factory)",
    devices: [
      { id: '1', name: 'آلة صنع الثلج كبيرة', power: 15000, quantity: 2, hours: 24 },
      { id: '2', name: 'مكيفات هواء', power: 2000, quantity: 4, hours: 24 },
      { id: '3', name: 'إضاءة', power: 50, quantity: 20, hours: 12 },
    ]
  },
  {
    id: "company",
    name: "شركة (Company / Office)",
    devices: [
      { id: '1', name: 'أجهزة كمبيوتر', power: 150, quantity: 20, hours: 10 },
      { id: '2', name: 'مكيفات هواء', power: 1500, quantity: 10, hours: 10 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 50, hours: 10 },
      { id: '4', name: 'خادم (سيرفر)', power: 800, quantity: 1, hours: 24 },
    ]
  },
  {
    id: "farm",
    name: "مزرعة (Farm)",
    devices: [
      { id: '1', name: 'مضخة مياه غاطسة', power: 4000, quantity: 1, hours: 6 },
      { id: '2', name: 'إضاءة محيطية', power: 100, quantity: 10, hours: 12 },
      { id: '3', name: 'أدوات زراعية', power: 1500, quantity: 2, hours: 4 },
    ]
  },
  {
    id: "poultry_farm",
    name: "مزرعة دواجن (Poultry Farm)",
    devices: [
      { id: '1', name: 'مراوح تهوية', power: 500, quantity: 10, hours: 24 },
      { id: '2', name: 'دفايات كهربائية', power: 2000, quantity: 5, hours: 12 },
      { id: '3', name: 'إضاءة', power: 30, quantity: 100, hours: 16 },
      { id: '4', name: 'ماكينات علف', power: 1000, quantity: 2, hours: 6 },
    ]
  },
  {
    id: "greenhouse",
    name: "بيوت محمية (Greenhouses)",
    devices: [
      { id: '1', name: 'مراوح تبريد', power: 750, quantity: 4, hours: 12 },
      { id: '2', name: 'مضخات ري', power: 1500, quantity: 2, hours: 4 },
      { id: '3', name: 'إضاءة نمو', power: 200, quantity: 50, hours: 14 },
    ]
  },
  {
    id: "factory",
    name: "مصنع (General Factory)",
    devices: [
      { id: '1', name: 'ماكينات إنتاج', power: 10000, quantity: 5, hours: 16 },
      { id: '2', name: 'محركات كهربائية', power: 5000, quantity: 4, hours: 16 },
      { id: '3', name: 'إضاءة', power: 100, quantity: 100, hours: 16 },
    ]
  },
  {
    id: "clinic",
    name: "مستوصف (Clinic)",
    devices: [
      { id: '1', name: 'مكيفات هواء', power: 1500, quantity: 8, hours: 12 },
      { id: '2', name: 'ثلاجة أدوية', power: 300, quantity: 2, hours: 24 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 30, hours: 12 },
      { id: '4', name: 'أجهزة طبية صغيرة', power: 500, quantity: 5, hours: 6 },
    ]
  },
  {
    id: "hospital",
    name: "مستشفي (Hospital)",
    devices: [
      { id: '1', name: 'أجهزة تكييف مركزية', power: 50000, quantity: 1, hours: 24 },
      { id: '2', name: 'أجهزة أشعة/MRI', power: 15000, quantity: 2, hours: 8 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 300, hours: 24 },
      { id: '4', name: 'أجهزة تنفس/مراقبة', power: 200, quantity: 50, hours: 24 },
    ]
  },
  {
    id: "bakery",
    name: "مخبز (Bakery)",
    devices: [
      { id: '1', name: 'فرن كهربائي كبير', power: 12000, quantity: 2, hours: 12 },
      { id: '2', name: 'عجانات', power: 3000, quantity: 3, hours: 6 },
      { id: '3', name: 'ثلاجات تبريد', power: 1500, quantity: 2, hours: 24 },
      { id: '4', name: 'إضاءة', power: 50, quantity: 20, hours: 14 },
    ]
  },
  {
    id: "shop",
    name: "دكان (Small Shop)",
    devices: [
      { id: '1', name: 'ثلاجة عرض', power: 800, quantity: 2, hours: 24 },
      { id: '2', name: 'مكيف هواء', power: 1500, quantity: 1, hours: 12 },
      { id: '3', name: 'إضاءة', power: 30, quantity: 10, hours: 12 },
    ]
  },
  {
    id: "workshop",
    name: "ورشة (Workshop)",
    devices: [
      { id: '1', name: 'مخرطة / فريزة', power: 4000, quantity: 2, hours: 8 },
      { id: '2', name: 'ماكينة لحام', power: 5000, quantity: 1, hours: 4 },
      { id: '3', name: 'كمبروسر هواء', power: 2000, quantity: 1, hours: 6 },
      { id: '4', name: 'إضاءة', power: 50, quantity: 15, hours: 10 },
    ]
  },
  {
    id: "water_pump",
    name: "مضخة موية (Water Pump Station)",
    devices: [
      { id: '1', name: 'مضخة رئيسية', power: 7500, quantity: 2, hours: 8 },
      { id: '2', name: 'إضاءة', power: 50, quantity: 5, hours: 12 },
    ]
  },
  {
    id: "donkey",
    name: "دونكي (Donkey - Local Water Station)",
    devices: [
      { id: '1', name: 'مضخة مياه', power: 3000, quantity: 1, hours: 10 },
    ]
  },
  {
    id: "mosque",
    name: "مسجد (Mosque)",
    devices: [
      { id: '1', name: 'مكيفات هواء', power: 1500, quantity: 8, hours: 6 },
      { id: '2', name: 'مكبرات صوت', power: 300, quantity: 1, hours: 2 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 50, hours: 6 },
      { id: '4', name: 'مبردات مياه', power: 400, quantity: 3, hours: 24 },
    ]
  },
  {
    id: "printing_press",
    name: "مطبعة (Printing Press)",
    devices: [
      { id: '1', name: 'ماكينة طباعة رئيسية', power: 8000, quantity: 2, hours: 10 },
      { id: '2', name: 'ماكينة قص', power: 2000, quantity: 1, hours: 6 },
      { id: '3', name: 'مكيفات هواء', power: 2000, quantity: 4, hours: 12 },
      { id: '4', name: 'إضاءة', power: 50, quantity: 30, hours: 12 },
    ]
  },
  {
    id: "coffee_shop",
    name: "كوفي شوب (Coffee Shop)",
    devices: [
      { id: '1', name: 'ماكينة إسبريسو', power: 3000, quantity: 1, hours: 14 },
      { id: '2', name: 'مكيفات هواء', power: 1500, quantity: 3, hours: 14 },
      { id: '3', name: 'ثلاجة عرض', power: 800, quantity: 2, hours: 24 },
      { id: '4', name: 'إضاءة ديكور', power: 20, quantity: 50, hours: 14 },
    ]
  },
  {
    id: "restaurant",
    name: "مطعم (Restaurant)",
    devices: [
      { id: '1', name: 'شفاطات مطبخ', power: 1500, quantity: 2, hours: 14 },
      { id: '2', name: 'مكيفات هواء', power: 2000, quantity: 5, hours: 14 },
      { id: '3', name: 'ثلاجات ضخمة', power: 1200, quantity: 4, hours: 24 },
      { id: '4', name: 'إضاءة', power: 40, quantity: 60, hours: 14 },
    ]
  },
  {
    id: "hotel",
    name: "فندق (Hotel)",
    devices: [
      { id: '1', name: 'مكيفات غرف', power: 1200, quantity: 50, hours: 16 },
      { id: '2', name: 'سخانات مياه', power: 2000, quantity: 50, hours: 4 },
      { id: '3', name: 'إضاءة الممرات', power: 20, quantity: 200, hours: 24 },
      { id: '4', name: 'مصاعد', power: 10000, quantity: 2, hours: 8 },
    ]
  },
  {
    id: "bank",
    name: "بنك (Bank)",
    devices: [
      { id: '1', name: 'أجهزة كمبيوتر', power: 150, quantity: 40, hours: 10 },
      { id: '2', name: 'تكييف مركزي', power: 20000, quantity: 1, hours: 10 },
      { id: '3', name: 'ماكينات صراف آلي', power: 400, quantity: 4, hours: 24 },
      { id: '4', name: 'إضاءة', power: 40, quantity: 100, hours: 10 },
    ]
  },
  {
    id: "supermarket",
    name: "سوبر ماركت (Supermarket)",
    devices: [
      { id: '1', name: 'ثلاجات عرض', power: 1200, quantity: 15, hours: 24 },
      { id: '2', name: 'فريزرات', power: 1500, quantity: 8, hours: 24 },
      { id: '3', name: 'مكيفات هواء', power: 2500, quantity: 6, hours: 16 },
      { id: '4', name: 'إضاءة', power: 50, quantity: 100, hours: 16 },
    ]
  },
  {
    id: "gas_station",
    name: "طرمبة وقود (Gas Station)",
    devices: [
      { id: '1', name: 'مضخات وقود', power: 1500, quantity: 6, hours: 24 },
      { id: '2', name: 'إضاءة المظلة', power: 100, quantity: 20, hours: 12 },
      { id: '3', name: 'سوبر ماركت صغير', power: 3000, quantity: 1, hours: 24 },
    ]
  },
  {
    id: "mining_company",
    name: "شركة تعدين (Mining Company)",
    devices: [
      { id: '1', name: 'ماكينات تكسير', power: 30000, quantity: 2, hours: 16 },
      { id: '2', name: 'سيور ناقلة', power: 10000, quantity: 4, hours: 16 },
      { id: '3', name: 'مضخات مياه', power: 5000, quantity: 3, hours: 24 },
      { id: '4', name: 'إضاءة كاشفة', power: 400, quantity: 20, hours: 12 },
    ]
  }
];
