export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع تلج' },
  { id: 'company', name: 'شركة' },
  { id: 'farm', name: 'مزرعة' },
  { id: 'poultry_farm', name: 'مزرعة دواجن' },
  { id: 'greenhouses', name: 'بيوت محمية' },
  { id: 'factory', name: 'مصنع' },
  { id: 'clinic', name: 'مستوصف' },
  { id: 'hospital', name: 'مستشفي' },
  { id: 'bakery', name: 'مخبز' },
  { id: 'shop', name: 'دكان' },
  { id: 'workshop', name: 'ورشة' },
  { id: 'water_pump', name: 'مضخة موية' },
  { id: 'water_station', name: 'دونكي' },
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
    { id: 1, name: 'ماكينة ثلج كبيرة', powerW: 15000, qty: 2, hours: 24 },
    { id: 2, name: 'غرفة تبريد', powerW: 5000, qty: 1, hours: 24 },
    { id: 3, name: 'إضاءة', powerW: 100, qty: 10, hours: 12 }
  ],
  company: [
    { id: 1, name: 'مكيف هواء', powerW: 1500, qty: 5, hours: 8 },
    { id: 2, name: 'كمبيوتر', powerW: 200, qty: 10, hours: 8 },
    { id: 3, name: 'إضاءة', powerW: 40, qty: 20, hours: 8 },
    { id: 4, name: 'طابعة', powerW: 500, qty: 2, hours: 2 }
  ],
  farm: [
    { id: 1, name: 'مضخة مياه زراعية', powerW: 3000, qty: 1, hours: 6 },
    { id: 2, name: 'إضاءة خارجية', powerW: 100, qty: 5, hours: 12 },
    { id: 3, name: 'ثلاجة', powerW: 400, qty: 1, hours: 24 }
  ],
  poultry_farm: [
    { id: 1, name: 'مراوح تهوية', powerW: 750, qty: 4, hours: 24 },
    { id: 2, name: 'نظام تدفئة/تبريد', powerW: 2000, qty: 2, hours: 12 },
    { id: 3, name: 'إضاءة', powerW: 50, qty: 20, hours: 16 }
  ],
  greenhouses: [
    { id: 1, name: 'مضخة ري', powerW: 1500, qty: 1, hours: 4 },
    { id: 2, name: 'مراوح', powerW: 500, qty: 4, hours: 12 },
    { id: 3, name: 'نظام تحكم', powerW: 100, qty: 1, hours: 24 }
  ],
  factory: [
    { id: 1, name: 'آلات إنتاج', powerW: 10000, qty: 3, hours: 8 },
    { id: 2, name: 'مكيفات', powerW: 2000, qty: 4, hours: 8 },
    { id: 3, name: 'إضاءة صناعية', powerW: 150, qty: 20, hours: 8 }
  ],
  clinic: [
    { id: 1, name: 'مكيف هواء', powerW: 1500, qty: 4, hours: 12 },
    { id: 2, name: 'إضاءة', powerW: 40, qty: 20, hours: 12 },
    { id: 3, name: 'معدات طبية', powerW: 1000, qty: 2, hours: 8 },
    { id: 4, name: 'ثلاجة أدوية', powerW: 300, qty: 1, hours: 24 }
  ],
  hospital: [
    { id: 1, name: 'تكييف مركزي', powerW: 20000, qty: 1, hours: 24 },
    { id: 2, name: 'إضاءة', powerW: 40, qty: 100, hours: 24 },
    { id: 3, name: 'أجهزة طبية', powerW: 2000, qty: 10, hours: 12 },
    { id: 4, name: 'ثلاجات حفظ', powerW: 500, qty: 5, hours: 24 },
    { id: 5, name: 'مصاعد', powerW: 5000, qty: 2, hours: 12 }
  ],
  bakery: [
    { id: 1, name: 'فرن كهربائي', powerW: 5000, qty: 2, hours: 10 },
    { id: 2, name: 'عجانة', powerW: 1500, qty: 2, hours: 5 },
    { id: 3, name: 'مكيف', powerW: 1500, qty: 1, hours: 12 },
    { id: 4, name: 'إضاءة', powerW: 40, qty: 10, hours: 14 }
  ],
  shop: [
    { id: 1, name: 'مكيف', powerW: 1500, qty: 1, hours: 12 },
    { id: 2, name: 'ثلاجة عرض', powerW: 600, qty: 1, hours: 24 },
    { id: 3, name: 'إضاءة', powerW: 40, qty: 5, hours: 12 }
  ],
  workshop: [
    { id: 1, name: 'معدات لحام', powerW: 3000, qty: 1, hours: 4 },
    { id: 2, name: 'صاروخ/مثقاب', powerW: 800, qty: 3, hours: 4 },
    { id: 3, name: 'إضاءة', powerW: 100, qty: 4, hours: 8 }
  ],
  water_pump: [
    { id: 1, name: 'مضخة غاطسة', powerW: 2200, qty: 1, hours: 8 }
  ],
  water_station: [
    { id: 1, name: 'مضخة كبيرة', powerW: 5000, qty: 2, hours: 12 },
    { id: 2, name: 'إضاءة خارجية', powerW: 100, qty: 4, hours: 12 }
  ],
  mosque: [
    { id: 1, name: 'مكيفات', powerW: 2000, qty: 4, hours: 5 },
    { id: 2, name: 'إضاءة', powerW: 40, qty: 30, hours: 4 },
    { id: 3, name: 'نظام صوت', powerW: 300, qty: 1, hours: 3 }
  ],
  printing_press: [
    { id: 1, name: 'آلات طباعة', powerW: 4000, qty: 2, hours: 8 },
    { id: 2, name: 'كمبيوترات', powerW: 300, qty: 3, hours: 8 },
    { id: 3, name: 'مكيفات', powerW: 2000, qty: 2, hours: 8 }
  ],
  coffee_shop: [
    { id: 1, name: 'ماكينة إسبريسو', powerW: 3000, qty: 1, hours: 12 },
    { id: 2, name: 'مكيف', powerW: 2000, qty: 2, hours: 14 },
    { id: 3, name: 'ثلاجة', powerW: 500, qty: 2, hours: 24 },
    { id: 4, name: 'إضاءة', powerW: 40, qty: 15, hours: 14 }
  ],
  restaurant: [
    { id: 1, name: 'أفران', powerW: 4000, qty: 2, hours: 10 },
    { id: 2, name: 'ثلاجات/فريزر', powerW: 1000, qty: 3, hours: 24 },
    { id: 3, name: 'مكيفات', powerW: 2000, qty: 3, hours: 12 },
    { id: 4, name: 'شفاطات هواء', powerW: 800, qty: 2, hours: 12 }
  ],
  hotel: [
    { id: 1, name: 'مكيفات غرف', powerW: 1500, qty: 20, hours: 12 },
    { id: 2, name: 'إضاءة ومرافق', powerW: 40, qty: 100, hours: 24 },
    { id: 3, name: 'مصعد', powerW: 5000, qty: 1, hours: 12 },
    { id: 4, name: 'معدات مطبخ', powerW: 8000, qty: 1, hours: 8 }
  ],
  bank: [
    { id: 1, name: 'تكييف مركزي', powerW: 10000, qty: 1, hours: 10 },
    { id: 2, name: 'كمبيوترات', powerW: 200, qty: 20, hours: 10 },
    { id: 3, name: 'صراف آلي', powerW: 400, qty: 2, hours: 24 },
    { id: 4, name: 'إضاءة', powerW: 40, qty: 50, hours: 10 }
  ],
  supermarket: [
    { id: 1, name: 'ثلاجات عرض', powerW: 1500, qty: 5, hours: 24 },
    { id: 2, name: 'مكيفات', powerW: 2000, qty: 4, hours: 16 },
    { id: 3, name: 'إضاءة', powerW: 60, qty: 30, hours: 16 },
    { id: 4, name: 'نقاط بيع (كاشير)', powerW: 150, qty: 3, hours: 16 }
  ],
  gas_station: [
    { id: 1, name: 'مضخات وقود', powerW: 1000, qty: 4, hours: 24 },
    { id: 2, name: 'إضاءة خارجية', powerW: 200, qty: 10, hours: 12 },
    { id: 3, name: 'مكيف مكتب', powerW: 1500, qty: 1, hours: 24 }
  ],
  mining_company: [
    { id: 1, name: 'معدات حفر', powerW: 20000, qty: 2, hours: 12 },
    { id: 2, name: 'مضخات', powerW: 5000, qty: 3, hours: 12 },
    { id: 3, name: 'إنارة موقع', powerW: 1000, qty: 5, hours: 12 },
    { id: 4, name: 'مكيفات مكاتب', powerW: 1500, qty: 5, hours: 12 }
  ]
};

export class SolarCalculatorModel {
  static getDevicesForFacility(facilityId) {
    if (!facilityId || !DEFAULT_DEVICES[facilityId]) {
      return [];
    }
    // Deep copy to prevent mutation
    return DEFAULT_DEVICES[facilityId].map(device => ({ ...device }));
  }

  static calculateTotals(devices) {
    let totalPower = 0;
    let totalDailyEnergyWh = 0;

    devices.forEach(device => {
      const power = Number(device.powerW) || 0;
      const qty = Number(device.qty) || 0;
      const hours = Number(device.hours) || 0;

      const deviceTotalPower = power * qty;
      const deviceDailyEnergy = deviceTotalPower * hours;

      totalPower += deviceTotalPower;
      totalDailyEnergyWh += deviceDailyEnergy;
    });

    // Inverters are usually sized 20-25% higher than max demand
    const recommendedInverterKw = (totalPower * 1.25) / 1000;

    // Average daily sun hours estimation (e.g. 5 hours)
    // To generate totalDailyEnergyWh, we need Solar Panels
    // Panel capacity needed = totalDailyEnergyWh / 5 hours / 0.8 (efficiency)
    const averageSunHours = 5;
    const systemEfficiency = 0.8;
    const requiredPanelCapacityKw = (totalDailyEnergyWh / averageSunHours / systemEfficiency) / 1000;

    return {
      totalPowerW: totalPower,
      totalDailyEnergyWh: totalDailyEnergyWh,
      totalDailyEnergyKwh: totalDailyEnergyWh / 1000,
      recommendedInverterKw: recommendedInverterKw,
      requiredPanelCapacityKw: requiredPanelCapacityKw
    };
  }
}
