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

// Typical appliances with default watts, quantity, and hours of usage per facility type.
export const CONSUMPTION_PATTERNS = {
  ice_factory: [
    { id: 'a1', name: 'ماكينة ثلج كبيرة', watts: 15000, quantity: 1, hours: 24 },
    { id: 'a2', name: 'مبرد / فريزر', watts: 5000, quantity: 2, hours: 24 },
    { id: 'a3', name: 'إضاءة', watts: 100, quantity: 10, hours: 12 }
  ],
  company: [
    { id: 'a1', name: 'مكيف', watts: 1500, quantity: 5, hours: 8 },
    { id: 'a2', name: 'كمبيوتر', watts: 200, quantity: 20, hours: 8 },
    { id: 'a3', name: 'إضاءة', watts: 40, quantity: 50, hours: 10 }
  ],
  farm: [
    { id: 'a1', name: 'مضخة غاطسة', watts: 5000, quantity: 1, hours: 6 },
    { id: 'a2', name: 'إضاءة خارجية', watts: 100, quantity: 5, hours: 12 }
  ],
  poultry_farm: [
    { id: 'a1', name: 'مراوح تهوية', watts: 500, quantity: 10, hours: 24 },
    { id: 'a2', name: 'دفايات', watts: 2000, quantity: 5, hours: 12 },
    { id: 'a3', name: 'إضاءة', watts: 60, quantity: 20, hours: 16 }
  ],
  greenhouse: [
    { id: 'a1', name: 'مراوح تبريد', watts: 750, quantity: 4, hours: 12 },
    { id: 'a2', name: 'مضخة ري', watts: 1500, quantity: 1, hours: 4 }
  ],
  factory: [
    { id: 'a1', name: 'ماكينة إنتاج', watts: 10000, quantity: 2, hours: 16 },
    { id: 'a2', name: 'إضاءة صناعية', watts: 200, quantity: 20, hours: 16 }
  ],
  clinic: [
    { id: 'a1', name: 'مكيف', watts: 1500, quantity: 4, hours: 12 },
    { id: 'a2', name: 'أجهزة طبية', watts: 1000, quantity: 3, hours: 8 },
    { id: 'a3', name: 'إضاءة', watts: 40, quantity: 20, hours: 12 }
  ],
  hospital: [
    { id: 'a1', name: 'مكيف مركزي', watts: 20000, quantity: 2, hours: 24 },
    { id: 'a2', name: 'أجهزة طبية حيوية', watts: 5000, quantity: 10, hours: 24 },
    { id: 'a3', name: 'إضاءة', watts: 50, quantity: 200, hours: 24 }
  ],
  bakery: [
    { id: 'a1', name: 'فرن كهربائي', watts: 8000, quantity: 2, hours: 16 },
    { id: 'a2', name: 'عجانة', watts: 2000, quantity: 2, hours: 8 },
    { id: 'a3', name: 'إضاءة', watts: 50, quantity: 10, hours: 18 }
  ],
  shop: [
    { id: 'a1', name: 'ثلاجة عرض', watts: 500, quantity: 2, hours: 24 },
    { id: 'a2', name: 'مروحة / مكيف', watts: 1000, quantity: 1, hours: 12 },
    { id: 'a3', name: 'إضاءة', watts: 40, quantity: 5, hours: 12 }
  ],
  workshop: [
    { id: 'a1', name: 'ماكينة لحام', watts: 5000, quantity: 1, hours: 6 },
    { id: 'a2', name: 'صاروخ / دريل', watts: 1500, quantity: 2, hours: 4 },
    { id: 'a3', name: 'إضاءة', watts: 100, quantity: 6, hours: 10 }
  ],
  water_pump: [
    { id: 'a1', name: 'مضخة مياه سطحية', watts: 3000, quantity: 1, hours: 8 }
  ],
  donkey: [
    { id: 'a1', name: 'مضخة مياه (دونكي)', watts: 2200, quantity: 1, hours: 10 }
  ],
  mosque: [
    { id: 'a1', name: 'مكيف', watts: 2000, quantity: 6, hours: 6 },
    { id: 'a2', name: 'مراوح', watts: 100, quantity: 15, hours: 6 },
    { id: 'a3', name: 'إضاءة', watts: 40, quantity: 30, hours: 6 },
    { id: 'a4', name: 'مكبر صوت', watts: 300, quantity: 1, hours: 2 }
  ],
  printing_press: [
    { id: 'a1', name: 'ماكينة طباعة', watts: 6000, quantity: 2, hours: 10 },
    { id: 'a2', name: 'كمبيوتر', watts: 300, quantity: 5, hours: 10 },
    { id: 'a3', name: 'مكيف', watts: 2000, quantity: 2, hours: 10 }
  ],
  coffee_shop: [
    { id: 'a1', name: 'ماكينة قهوة', watts: 3000, quantity: 1, hours: 14 },
    { id: 'a2', name: 'ثلاجة عرض', watts: 600, quantity: 2, hours: 24 },
    { id: 'a3', name: 'مكيف', watts: 1500, quantity: 2, hours: 14 },
    { id: 'a4', name: 'إضاءة ديكور', watts: 200, quantity: 1, hours: 14 }
  ],
  restaurant: [
    { id: 'a1', name: 'ثلاجة / فريزر', watts: 1000, quantity: 4, hours: 24 },
    { id: 'a2', name: 'شفاط هواء', watts: 1500, quantity: 2, hours: 16 },
    { id: 'a3', name: 'مكيف', watts: 2000, quantity: 3, hours: 16 },
    { id: 'a4', name: 'إضاءة', watts: 50, quantity: 30, hours: 16 }
  ],
  hotel: [
    { id: 'a1', name: 'مكيفات غرف', watts: 1500, quantity: 20, hours: 12 },
    { id: 'a2', name: 'إضاءة', watts: 40, quantity: 100, hours: 12 },
    { id: 'a3', name: 'ثلاجات غرف', watts: 100, quantity: 20, hours: 24 },
    { id: 'a4', name: 'مصعد', watts: 10000, quantity: 1, hours: 4 }
  ],
  bank: [
    { id: 'a1', name: 'تكييف مركزي', watts: 10000, quantity: 1, hours: 10 },
    { id: 'a2', name: 'أجهزة كمبيوتر / صراف', watts: 300, quantity: 30, hours: 10 },
    { id: 'a3', name: 'إضاءة', watts: 40, quantity: 50, hours: 10 }
  ],
  supermarket: [
    { id: 'a1', name: 'ثلاجات عرض منتجات', watts: 1500, quantity: 10, hours: 24 },
    { id: 'a2', name: 'مكيفات', watts: 2000, quantity: 4, hours: 16 },
    { id: 'a3', name: 'إضاءة قوية', watts: 60, quantity: 40, hours: 16 }
  ],
  gas_station: [
    { id: 'a1', name: 'طرمبات وقود', watts: 750, quantity: 6, hours: 24 },
    { id: 'a2', name: 'إضاءة خارجية', watts: 200, quantity: 10, hours: 12 },
    { id: 'a3', name: 'سوبر ماركت محطة', watts: 2000, quantity: 1, hours: 24 }
  ],
  mining_company: [
    { id: 'a1', name: 'معدات حفر وتكسير', watts: 20000, quantity: 2, hours: 12 },
    { id: 'a2', name: 'مضخات مياه كبيرة', watts: 10000, quantity: 2, hours: 24 },
    { id: 'a3', name: 'إضاءة كاشفة', watts: 1000, quantity: 10, hours: 12 }
  ]
};


export class SolarCalculatorModel {
  /**
   * Calculate total energy, inverter size, battery size, and panels needed.
   * @param {Array} appliances Array of { watts, quantity, hours }
   * @param {Object} config Configuration values for calculation
   * @returns {Object} Calculated metrics
   */
  static calculateSystem(appliances, config = {}) {
    // Default configs
    const PANEL_WATTAGE = config.panelWattage || 500; // 500W panel
    const SYSTEM_VOLTAGE = config.systemVoltage || 48; // 48V battery system
    const SUN_HOURS = config.sunHours || 5; // Average daily sun hours
    const INVERTER_SAFETY_FACTOR = config.inverterSafetyFactor || 1.25; // 25% safety margin
    const BATTERY_DEPTH_OF_DISCHARGE = config.batteryDod || 0.8; // 80% DoD for Lithium, or 0.5 for Lead Acid
    const SYSTEM_LOSS_FACTOR = config.systemLossFactor || 1.3; // 30% system losses

    // 1. Total Daily Energy Consumption (Wh)
    let totalDailyWh = 0;
    // Total Instantaneous Power (W)
    let totalPowerW = 0;

    appliances.forEach(app => {
      const power = Number(app.watts) || 0;
      const qty = Number(app.quantity) || 0;
      const hrs = Number(app.hours) || 0;

      const itemTotalPower = power * qty;
      totalPowerW += itemTotalPower;
      totalDailyWh += itemTotalPower * hrs;
    });

    // 2. Inverter Capacity (W)
    // Should handle the peak load + safety factor
    const inverterCapacityW = totalPowerW * INVERTER_SAFETY_FACTOR;

    // 3. Battery Bank Size (Ah)
    // (Total Daily Wh) / (System Voltage * DoD)
    let batteryCapacityAh = 0;
    if (totalDailyWh > 0) {
      batteryCapacityAh = totalDailyWh / (SYSTEM_VOLTAGE * BATTERY_DEPTH_OF_DISCHARGE);
    }

    // 4. Solar Panels Needed
    // Total Energy considering losses / (Sun Hours * Panel Wattage)
    let panelsNeeded = 0;
    let solarArrayCapacityW = 0;
    if (totalDailyWh > 0) {
      const requiredDailyGeneration = totalDailyWh * SYSTEM_LOSS_FACTOR;
      solarArrayCapacityW = requiredDailyGeneration / SUN_HOURS;
      panelsNeeded = Math.ceil(solarArrayCapacityW / PANEL_WATTAGE);
    }

    return {
      totalDailyWh,
      totalPowerW,
      inverterCapacityW,
      batteryCapacityAh,
      panelsNeeded,
      solarArrayCapacityW,
      systemVoltage: SYSTEM_VOLTAGE,
      panelWattage: PANEL_WATTAGE
    };
  }
}