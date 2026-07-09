export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع ثلج', defaultDevices: [{ id: '1', name: 'ماكينة تصنيع ثلج', power: 5000, qty: 2, hours: 24 }] },
  { id: 'company', name: 'شركة', defaultDevices: [{ id: '1', name: 'مكيف', power: 1500, qty: 3, hours: 8 }, { id: '2', name: 'كمبيوتر', power: 200, qty: 10, hours: 8 }, { id: '3', name: 'إضاءة', power: 20, qty: 20, hours: 10 }] },
  { id: 'farm', name: 'مزرعة', defaultDevices: [{ id: '1', name: 'مضخة مياه', power: 2200, qty: 1, hours: 6 }, { id: '2', name: 'إضاءة', power: 20, qty: 10, hours: 12 }] },
  { id: 'poultry_farm', name: 'مزرعة دواجن', defaultDevices: [{ id: '1', name: 'مراوح تهوية', power: 750, qty: 4, hours: 24 }, { id: '2', name: 'إضاءة', power: 20, qty: 30, hours: 16 }, { id: '3', name: 'سخانات', power: 2000, qty: 2, hours: 12 }] },
  { id: 'greenhouse', name: 'بيوت محمية', defaultDevices: [{ id: '1', name: 'مراوح تبريد', power: 500, qty: 4, hours: 12 }, { id: '2', name: 'مضخة ري', power: 1100, qty: 1, hours: 4 }] },
  { id: 'factory', name: 'مصنع', defaultDevices: [{ id: '1', name: 'ماكينات إنتاج', power: 10000, qty: 2, hours: 16 }, { id: '2', name: 'إضاءة قوية', power: 100, qty: 50, hours: 16 }] },
  { id: 'dispensary', name: 'مستوصف', defaultDevices: [{ id: '1', name: 'مكيف', power: 1500, qty: 4, hours: 12 }, { id: '2', name: 'ثلاجة أدوية', power: 300, qty: 2, hours: 24 }, { id: '3', name: 'إضاءة', power: 20, qty: 30, hours: 12 }, { id: '4', name: 'أجهزة طبية', power: 1000, qty: 2, hours: 8 }] },
  { id: 'hospital', name: 'مستشفى', defaultDevices: [{ id: '1', name: 'مكيفات مركزية', power: 5000, qty: 10, hours: 24 }, { id: '2', name: 'ثلاجات بنك الدم', power: 500, qty: 5, hours: 24 }, { id: '3', name: 'أجهزة طبية حيوية', power: 2000, qty: 10, hours: 24 }] },
  { id: 'bakery', name: 'مخبز', defaultDevices: [{ id: '1', name: 'فرن كهربائي', power: 8000, qty: 1, hours: 16 }, { id: '2', name: 'عجانة', power: 2000, qty: 2, hours: 8 }, { id: '3', name: 'إضاءة', power: 20, qty: 15, hours: 16 }] },
  { id: 'shop', name: 'دكان', defaultDevices: [{ id: '1', name: 'ثلاجة عرض', power: 600, qty: 2, hours: 24 }, { id: '2', name: 'مكيف', power: 1500, qty: 1, hours: 12 }, { id: '3', name: 'إضاءة', power: 20, qty: 5, hours: 12 }] },
  { id: 'workshop', name: 'ورشة', defaultDevices: [{ id: '1', name: 'ماكينة لحام', power: 4000, qty: 1, hours: 4 }, { id: '2', name: 'معدات قطع', power: 2000, qty: 2, hours: 6 }, { id: '3', name: 'إضاءة', power: 40, qty: 10, hours: 10 }] },
  { id: 'water_pump', name: 'مضخة موية', defaultDevices: [{ id: '1', name: 'مضخة غاطسة', power: 5500, qty: 1, hours: 8 }] },
  { id: 'donkey', name: 'دونكي', defaultDevices: [{ id: '1', name: 'مضخة مياه صغيرة', power: 1100, qty: 1, hours: 6 }] },
  { id: 'mosque', name: 'مسجد', defaultDevices: [{ id: '1', name: 'مكيفات', power: 2000, qty: 6, hours: 4 }, { id: '2', name: 'مكبر صوت', power: 200, qty: 1, hours: 4 }, { id: '3', name: 'إضاءة', power: 20, qty: 40, hours: 6 }] },
  { id: 'printing_press', name: 'مطبعة', defaultDevices: [{ id: '1', name: 'ماكينة طباعة', power: 3000, qty: 2, hours: 10 }, { id: '2', name: 'مكيف', power: 2000, qty: 2, hours: 10 }] },
  { id: 'coffee_shop', name: 'كوفي شوب', defaultDevices: [{ id: '1', name: 'ماكينة قهوة', power: 3000, qty: 1, hours: 14 }, { id: '2', name: 'ثلاجة عرض', power: 500, qty: 1, hours: 24 }, { id: '3', name: 'مكيف', power: 2000, qty: 2, hours: 14 }] },
  { id: 'restaurant', name: 'مطعم', defaultDevices: [{ id: '1', name: 'ثلاجات ومجمدات', power: 1000, qty: 4, hours: 24 }, { id: '2', name: 'مكيفات', power: 2000, qty: 4, hours: 16 }, { id: '3', name: 'معدات مطبخ كهربائية', power: 3000, qty: 2, hours: 10 }] },
  { id: 'hotel', name: 'فندق', defaultDevices: [{ id: '1', name: 'مكيفات غرف', power: 1200, qty: 20, hours: 12 }, { id: '2', name: 'إضاءة', power: 20, qty: 100, hours: 12 }, { id: '3', name: 'مصعد', power: 5000, qty: 1, hours: 6 }] },
  { id: 'bank', name: 'بنك', defaultDevices: [{ id: '1', name: 'مكيفات مركزية', power: 4000, qty: 3, hours: 10 }, { id: '2', name: 'أجهزة كمبيوتر', power: 250, qty: 20, hours: 10 }, { id: '3', name: 'صراف آلي', power: 500, qty: 2, hours: 24 }] },
  { id: 'supermarket', name: 'سوبر ماركت', defaultDevices: [{ id: '1', name: 'ثلاجات عرض', power: 800, qty: 10, hours: 24 }, { id: '2', name: 'مكيفات', power: 3000, qty: 4, hours: 16 }, { id: '3', name: 'إضاءة', power: 40, qty: 50, hours: 16 }] },
  { id: 'fuel_station', name: 'طرمبة وقود', defaultDevices: [{ id: '1', name: 'مضخات وقود', power: 1500, qty: 6, hours: 24 }, { id: '2', name: 'إضاءة قوية', power: 100, qty: 20, hours: 12 }, { id: '3', name: 'مكيف دكان', power: 1500, qty: 1, hours: 24 }] },
  { id: 'mining_company', name: 'شركة تعدين', defaultDevices: [{ id: '1', name: 'معدات ثقيلة', power: 15000, qty: 2, hours: 12 }, { id: '2', name: 'مضخات مياه', power: 5000, qty: 2, hours: 24 }, { id: '3', name: 'إضاءة كاشفة', power: 400, qty: 10, hours: 12 }] },
  { id: 'custom', name: 'مخصص (أخرى)', defaultDevices: [] }
];

export const SOLAR_CONSTANTS = {
  SAFETY_FACTOR_INVERTER: 1.25, // 25% safety margin
  SYSTEM_VOLTAGE: 48, // Standard 48V system
  BATTERY_DOD: 0.8, // 80% Depth of Discharge for Lithium
  AUTONOMY_DAYS: 1, // Days of backup
  PEAK_SUN_HOURS: 5.5, // Average peak sun hours
  SYSTEM_LOSS_FACTOR: 1.3 // 30% loss from panels to battery/inverter
};
