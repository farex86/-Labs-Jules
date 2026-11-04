export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج',
    appliances: [
      { id: '1', name: 'ماكينة تصنيع ثلج', powerWatts: 5000, quantity: 2, hoursPerDay: 12 },
      { id: '2', name: 'غرفة تبريد', powerWatts: 3000, quantity: 1, hoursPerDay: 24 },
      { id: '3', name: 'إضاءة', powerWatts: 50, quantity: 10, hoursPerDay: 12 }
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    appliances: [
      { id: '1', name: 'مكيف هواء (اسبليت)', powerWatts: 1500, quantity: 4, hoursPerDay: 8 },
      { id: '2', name: 'جهاز كمبيوتر', powerWatts: 200, quantity: 10, hoursPerDay: 8 },
      { id: '3', name: 'إضاءة', powerWatts: 40, quantity: 20, hoursPerDay: 10 },
      { id: '4', name: 'ماكينة تصوير', powerWatts: 800, quantity: 1, hoursPerDay: 4 }
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    appliances: [
      { id: '1', name: 'مضخة مياه زراعية', powerWatts: 3000, quantity: 1, hoursPerDay: 6 },
      { id: '2', name: 'إضاءة خارجية', powerWatts: 100, quantity: 10, hoursPerDay: 12 }
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    appliances: [
      { id: '1', name: 'مراوح تهوية', powerWatts: 500, quantity: 6, hoursPerDay: 24 },
      { id: '2', name: 'إضاءة', powerWatts: 40, quantity: 30, hoursPerDay: 16 },
      { id: '3', name: 'نظام تدفئة', powerWatts: 2000, quantity: 2, hoursPerDay: 12 }
    ]
  },
  {
    id: 'greenhouses',
    name: 'بيوت محمية',
    appliances: [
      { id: '1', name: 'مراوح تبريد', powerWatts: 400, quantity: 4, hoursPerDay: 12 },
      { id: '2', name: 'مضخة مياه', powerWatts: 1500, quantity: 1, hoursPerDay: 4 }
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    appliances: [
      { id: '1', name: 'ماكينات إنتاج', powerWatts: 10000, quantity: 2, hoursPerDay: 8 },
      { id: '2', name: 'مكيفات مركزية', powerWatts: 5000, quantity: 2, hoursPerDay: 8 },
      { id: '3', name: 'إضاءة صناعية', powerWatts: 150, quantity: 20, hoursPerDay: 10 }
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    appliances: [
      { id: '1', name: 'مكيف هواء', powerWatts: 1500, quantity: 6, hoursPerDay: 12 },
      { id: '2', name: 'إضاءة', powerWatts: 40, quantity: 30, hoursPerDay: 12 },
      { id: '3', name: 'أجهزة طبية صغيرة', powerWatts: 300, quantity: 5, hoursPerDay: 8 },
      { id: '4', name: 'ثلاجة أدوية', powerWatts: 200, quantity: 2, hoursPerDay: 24 }
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    appliances: [
      { id: '1', name: 'مكيفات مركزية', powerWatts: 10000, quantity: 4, hoursPerDay: 24 },
      { id: '2', name: 'إضاءة', powerWatts: 40, quantity: 100, hoursPerDay: 24 },
      { id: '3', name: 'أجهزة طبية (أشعة، الخ)', powerWatts: 5000, quantity: 3, hoursPerDay: 8 },
      { id: '4', name: 'ثلاجات حفظ', powerWatts: 300, quantity: 10, hoursPerDay: 24 }
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    appliances: [
      { id: '1', name: 'عجانة كهربائية', powerWatts: 2000, quantity: 2, hoursPerDay: 6 },
      { id: '2', name: 'فرن كهربائي', powerWatts: 5000, quantity: 1, hoursPerDay: 8 },
      { id: '3', name: 'مراوح تهوية', powerWatts: 300, quantity: 4, hoursPerDay: 12 },
      { id: '4', name: 'إضاءة', powerWatts: 40, quantity: 10, hoursPerDay: 12 }
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    appliances: [
      { id: '1', name: 'ثلاجة عرض', powerWatts: 400, quantity: 2, hoursPerDay: 24 },
      { id: '2', name: 'مروحة سقف', powerWatts: 70, quantity: 2, hoursPerDay: 12 },
      { id: '3', name: 'إضاءة', powerWatts: 20, quantity: 4, hoursPerDay: 12 }
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    appliances: [
      { id: '1', name: 'ماكينة لحام', powerWatts: 3000, quantity: 1, hoursPerDay: 4 },
      { id: '2', name: 'صاروخ قطع', powerWatts: 800, quantity: 2, hoursPerDay: 3 },
      { id: '3', name: 'إضاءة', powerWatts: 100, quantity: 5, hoursPerDay: 8 }
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    appliances: [
      { id: '1', name: 'مضخة مياه', powerWatts: 2200, quantity: 1, hoursPerDay: 8 }
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي',
    appliances: [
      { id: '1', name: 'مضخة غاطسة كبيرة', powerWatts: 5500, quantity: 1, hoursPerDay: 10 },
      { id: '2', name: 'إضاءة ليلية', powerWatts: 100, quantity: 2, hoursPerDay: 12 }
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    appliances: [
      { id: '1', name: 'مكيف هواء', powerWatts: 2000, quantity: 6, hoursPerDay: 4 },
      { id: '2', name: 'مراوح سقف', powerWatts: 70, quantity: 15, hoursPerDay: 6 },
      { id: '3', name: 'إضاءة', powerWatts: 40, quantity: 30, hoursPerDay: 5 },
      { id: '4', name: 'نظام صوتيات', powerWatts: 300, quantity: 1, hoursPerDay: 3 }
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    appliances: [
      { id: '1', name: 'ماكينة طباعة', powerWatts: 3000, quantity: 2, hoursPerDay: 8 },
      { id: '2', name: 'ماكينة قص ورق', powerWatts: 1500, quantity: 1, hoursPerDay: 4 },
      { id: '3', name: 'مكيف هواء', powerWatts: 1500, quantity: 2, hoursPerDay: 8 },
      { id: '4', name: 'إضاءة', powerWatts: 40, quantity: 15, hoursPerDay: 8 }
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    appliances: [
      { id: '1', name: 'ماكينة اسبريسو', powerWatts: 3500, quantity: 1, hoursPerDay: 12 },
      { id: '2', name: 'مطحنة قهوة', powerWatts: 500, quantity: 2, hoursPerDay: 6 },
      { id: '3', name: 'ثلاجة عرض', powerWatts: 400, quantity: 1, hoursPerDay: 24 },
      { id: '4', name: 'مكيف هواء', powerWatts: 1500, quantity: 2, hoursPerDay: 12 },
      { id: '5', name: 'إضاءة ديكور', powerWatts: 20, quantity: 30, hoursPerDay: 12 }
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    appliances: [
      { id: '1', name: 'ثلاجات حفظ لحوم', powerWatts: 800, quantity: 3, hoursPerDay: 24 },
      { id: '2', name: 'مكيفات هواء', powerWatts: 2000, quantity: 4, hoursPerDay: 14 },
      { id: '3', name: 'إضاءة', powerWatts: 40, quantity: 40, hoursPerDay: 14 },
      { id: '4', name: 'مراوح شفط', powerWatts: 400, quantity: 2, hoursPerDay: 14 }
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    appliances: [
      { id: '1', name: 'مكيفات غرف', powerWatts: 1200, quantity: 50, hoursPerDay: 12 },
      { id: '2', name: 'إضاءة غرف وممرات', powerWatts: 20, quantity: 200, hoursPerDay: 12 },
      { id: '3', name: 'مصاعد', powerWatts: 5000, quantity: 2, hoursPerDay: 24 },
      { id: '4', name: 'سخانات مياه', powerWatts: 1500, quantity: 50, hoursPerDay: 4 }
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    appliances: [
      { id: '1', name: 'مكيفات مركزية', powerWatts: 5000, quantity: 3, hoursPerDay: 10 },
      { id: '2', name: 'أجهزة كمبيوتر', powerWatts: 200, quantity: 30, hoursPerDay: 10 },
      { id: '3', name: 'إضاءة', powerWatts: 40, quantity: 60, hoursPerDay: 12 },
      { id: '4', name: 'صراف آلي (ATM)', powerWatts: 300, quantity: 4, hoursPerDay: 24 }
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    appliances: [
      { id: '1', name: 'ثلاجات عرض', powerWatts: 600, quantity: 10, hoursPerDay: 24 },
      { id: '2', name: 'ديب فريزر', powerWatts: 800, quantity: 4, hoursPerDay: 24 },
      { id: '3', name: 'مكيفات مركزية', powerWatts: 5000, quantity: 2, hoursPerDay: 16 },
      { id: '4', name: 'إضاءة ساطعة', powerWatts: 40, quantity: 50, hoursPerDay: 16 }
    ]
  },
  {
    id: 'fuel_station',
    name: 'طرمبة وقود',
    appliances: [
      { id: '1', name: 'مضخات وقود', powerWatts: 1000, quantity: 4, hoursPerDay: 24 },
      { id: '2', name: 'إضاءة المظلة', powerWatts: 150, quantity: 10, hoursPerDay: 12 },
      { id: '3', name: 'مكيف مكتب الإدارة', powerWatts: 1500, quantity: 1, hoursPerDay: 12 }
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    appliances: [
      { id: '1', name: 'معدات طحن', powerWatts: 15000, quantity: 2, hoursPerDay: 12 },
      { id: '2', name: 'مضخات مياه ضخمة', powerWatts: 7500, quantity: 2, hoursPerDay: 12 },
      { id: '3', name: 'إضاءة كشافات', powerWatts: 400, quantity: 20, hoursPerDay: 12 },
      { id: '4', name: 'أجهزة مكتبية ومكيفات', powerWatts: 5000, quantity: 1, hoursPerDay: 12 }
    ]
  }
];

/**
 * Calculates the total energy consumption per day in Watt-hours (Wh).
 * @param {Array} appliances - List of appliance objects { powerWatts, quantity, hoursPerDay }
 * @returns {number} Total consumption in Watt-hours.
 */
export const calculateTotalConsumption = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (app.powerWatts * app.quantity * app.hoursPerDay);
  }, 0);
};

/**
 * Calculates the recommended solar system size in kiloWatts (kW)
 * given the total daily consumption in Watt-hours, factoring in system losses
 * and average peak sun hours.
 * @param {number} totalConsumptionWh - Total daily consumption in Wh
 * @param {number} peakSunHours - Average daily peak sun hours (e.g., 5.5 for many sunny regions)
 * @param {number} efficiencyLoss - System efficiency factor (e.g., 0.8 for 20% loss)
 * @returns {number} Recommended system size in kW
 */
export const calculateSolarSystemSize = (totalConsumptionWh, peakSunHours = 5.5, efficiencyLoss = 0.8) => {
  if (totalConsumptionWh === 0) return 0;
  // Convert Wh to kWh, then divide by sun hours and efficiency
  const dailyConsumptionKWh = totalConsumptionWh / 1000;
  const systemSizeKw = dailyConsumptionKWh / (peakSunHours * efficiencyLoss);
  return Number(systemSizeKw.toFixed(2));
};
