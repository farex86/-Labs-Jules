// src/models/SolarCalculatorModel.js

export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع تلج' },
  { id: 'company', name: 'شركة' },
  { id: 'farm', name: 'مزرعة' },
  { id: 'poultry_farm', name: 'مزرعة دواجن' },
  { id: 'greenhouse', name: 'بيوت محمية' },
  { id: 'factory', name: 'مصنع' },
  { id: 'clinic', name: 'مستوصف' },
  { id: 'hospital', name: 'مستشفي' },
  { id: 'bakery', name: 'مخبز' },
  { id: 'shop', name: 'دكان' },
  { id: 'workshop', name: 'ورشة' },
  { id: 'water_pump', name: 'مضخة موية' },
  { id: 'donkey', name: 'دونكي' },
  { id: 'mosque', name: 'مسجد' },
  { id: 'printing_press', name: 'مطبعة' },
  { id: 'coffee_shop', name: 'كوفي شوب' },
  { id: 'restaurant', name: 'مطعم' },
  { id: 'hotel', name: 'فندق' },
  { id: 'bank', name: 'بنك' },
  { id: 'supermarket', name: 'سوبر ماركت' },
  { id: 'gas_station', name: 'طرمبة وقود' },
  { id: 'mining_company', name: 'شركة تعدين' }
];

export const DEFAULT_DEVICES = {
  ice_factory: [
    { id: 1, name: 'ماكينة ثلج', watts: 5000, quantity: 2, hours: 24 },
    { id: 2, name: 'إضاءة', watts: 20, quantity: 10, hours: 12 }
  ],
  company: [
    { id: 1, name: 'مكيف هواء', watts: 1500, quantity: 4, hours: 8 },
    { id: 2, name: 'جهاز كمبيوتر', watts: 200, quantity: 10, hours: 8 },
    { id: 3, name: 'إضاءة', watts: 20, quantity: 20, hours: 10 }
  ],
  farm: [
    { id: 1, name: 'مضخة مياه', watts: 3000, quantity: 1, hours: 6 },
    { id: 2, name: 'إضاءة', watts: 20, quantity: 5, hours: 12 }
  ],
  poultry_farm: [
    { id: 1, name: 'مراوح تهوية', watts: 500, quantity: 10, hours: 24 },
    { id: 2, name: 'نظام تدفئة/تبريد', watts: 2000, quantity: 2, hours: 12 },
    { id: 3, name: 'إضاءة', watts: 20, quantity: 20, hours: 16 }
  ],
  greenhouse: [
    { id: 1, name: 'مضخة ري', watts: 1500, quantity: 2, hours: 4 },
    { id: 2, name: 'مراوح تهوية', watts: 300, quantity: 5, hours: 12 }
  ],
  factory: [
    { id: 1, name: 'آلات تصنيع', watts: 10000, quantity: 3, hours: 16 },
    { id: 2, name: 'إضاءة صناعية', watts: 100, quantity: 30, hours: 16 }
  ],
  clinic: [
    { id: 1, name: 'مكيف هواء', watts: 1500, quantity: 3, hours: 12 },
    { id: 2, name: 'أجهزة طبية صغيرة', watts: 500, quantity: 5, hours: 8 },
    { id: 3, name: 'ثلاجة أدوية', watts: 200, quantity: 2, hours: 24 }
  ],
  hospital: [
    { id: 1, name: 'مكيف مركزي', watts: 10000, quantity: 5, hours: 24 },
    { id: 2, name: 'أجهزة طبية متقدمة', watts: 2000, quantity: 10, hours: 24 },
    { id: 3, name: 'إضاءة', watts: 40, quantity: 100, hours: 24 }
  ],
  bakery: [
    { id: 1, name: 'فرن كهربائي', watts: 5000, quantity: 2, hours: 12 },
    { id: 2, name: 'عجانة', watts: 1500, quantity: 2, hours: 6 },
    { id: 3, name: 'إضاءة', watts: 20, quantity: 10, hours: 14 }
  ],
  shop: [
    { id: 1, name: 'ثلاجة عرض', watts: 400, quantity: 2, hours: 24 },
    { id: 2, name: 'إضاءة', watts: 20, quantity: 6, hours: 14 },
    { id: 3, name: 'مروحة', watts: 75, quantity: 2, hours: 14 }
  ],
  workshop: [
    { id: 1, name: 'آلة لحام', watts: 3000, quantity: 1, hours: 4 },
    { id: 2, name: 'صاروخ قطع/جلخ', watts: 1000, quantity: 2, hours: 4 },
    { id: 3, name: 'إضاءة', watts: 50, quantity: 8, hours: 10 }
  ],
  water_pump: [
    { id: 1, name: 'مضخة غاطسة', watts: 5500, quantity: 1, hours: 8 }
  ],
  donkey: [
    { id: 1, name: 'مضخة سحب صغيرة', watts: 1500, quantity: 1, hours: 6 }
  ],
  mosque: [
    { id: 1, name: 'مكيف هواء', watts: 2000, quantity: 4, hours: 6 },
    { id: 2, name: 'مكبر صوت', watts: 150, quantity: 1, hours: 4 },
    { id: 3, name: 'إضاءة', watts: 20, quantity: 30, hours: 8 }
  ],
  printing_press: [
    { id: 1, name: 'ماكينة طباعة', watts: 3000, quantity: 2, hours: 10 },
    { id: 2, name: 'جهاز كمبيوتر', watts: 300, quantity: 3, hours: 10 },
    { id: 3, name: 'إضاءة', watts: 40, quantity: 15, hours: 12 }
  ],
  coffee_shop: [
    { id: 1, name: 'ماكينة اسبريسو', watts: 2500, quantity: 1, hours: 12 },
    { id: 2, name: 'ثلاجة', watts: 300, quantity: 2, hours: 24 },
    { id: 3, name: 'مكيف هواء', watts: 1500, quantity: 2, hours: 14 }
  ],
  restaurant: [
    { id: 1, name: 'ثلاجة كبيرة', watts: 800, quantity: 3, hours: 24 },
    { id: 2, name: 'مكيف هواء', watts: 2000, quantity: 4, hours: 16 },
    { id: 3, name: 'إضاءة', watts: 20, quantity: 40, hours: 16 }
  ],
  hotel: [
    { id: 1, name: 'مكيف هواء', watts: 1500, quantity: 20, hours: 16 },
    { id: 2, name: 'سخان مياه', watts: 2000, quantity: 10, hours: 6 },
    { id: 3, name: 'ثلاجة صغيرة', watts: 100, quantity: 20, hours: 24 }
  ],
  bank: [
    { id: 1, name: 'جهاز صراف آلي', watts: 500, quantity: 2, hours: 24 },
    { id: 2, name: 'جهاز كمبيوتر', watts: 200, quantity: 15, hours: 10 },
    { id: 3, name: 'مكيف مركزي', watts: 5000, quantity: 2, hours: 12 }
  ],
  supermarket: [
    { id: 1, name: 'ثلاجة عرض كبيرة', watts: 1000, quantity: 6, hours: 24 },
    { id: 2, name: 'مكيف هواء', watts: 2000, quantity: 4, hours: 18 },
    { id: 3, name: 'إضاءة', watts: 40, quantity: 50, hours: 18 }
  ],
  gas_station: [
    { id: 1, name: 'مضخة وقود', watts: 1000, quantity: 4, hours: 24 },
    { id: 2, name: 'إضاءة خارجية', watts: 100, quantity: 10, hours: 12 }
  ],
  mining_company: [
    { id: 1, name: 'معدات حفر وتكسير', watts: 15000, quantity: 2, hours: 12 },
    { id: 2, name: 'مضخة سحب مياه', watts: 5000, quantity: 2, hours: 24 },
    { id: 3, name: 'كشافات إضاءة', watts: 500, quantity: 10, hours: 12 }
  ]
};

/**
 * Calculates the total daily energy consumption in Watt-hours (Wh)
 * @param {Array} devices - Array of device objects { watts, quantity, hours }
 * @returns {number} Total daily energy in Wh
 */
export const calculateTotalEnergy = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.watts * device.quantity * device.hours);
  }, 0);
};

/**
 * Calculates the peak power requirement in Watts (W)
 * @param {Array} devices - Array of device objects { watts, quantity }
 * @returns {number} Peak power in W
 */
export const calculatePeakPower = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.watts * device.quantity);
  }, 0);
};
