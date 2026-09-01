export const facilityTypes = [
  { id: 'ice_factory', name: 'مصنع ثلج' },
  { id: 'company', name: 'شركة' },
  { id: 'farm', name: 'مزرعة' },
  { id: 'poultry_farm', name: 'مزرعة دواجن' },
  { id: 'greenhouses', name: 'بيوت محمية' },
  { id: 'factory', name: 'مصنع' },
  { id: 'clinic', name: 'مستوصف' },
  { id: 'hospital', name: 'مستشفى' },
  { id: 'bakery', name: 'مخبز' },
  { id: 'shop', name: 'دكان' },
  { id: 'workshop', name: 'ورشة' },
  { id: 'water_pump', name: 'مضخة مياه' },
  { id: 'donkey', name: 'دونكي (مضخة)' },
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

export const consumptionPatterns = {
  mosque: [
    { id: 1, name: 'مكيف (Air Conditioner)', wattage: 1500, quantity: 4, hours: 6 },
    { id: 2, name: 'لمبة (Bulb)', wattage: 20, quantity: 20, hours: 8 },
    { id: 3, name: 'مروحة (Fan)', wattage: 70, quantity: 8, hours: 8 },
    { id: 4, name: 'مكبر صوت (Speaker System)', wattage: 200, quantity: 1, hours: 2 }
  ],
  clinic: [
    { id: 1, name: 'إضاءة (Lighting)', wattage: 30, quantity: 15, hours: 12 },
    { id: 2, name: 'مكيفات (Air Conditioners)', wattage: 1500, quantity: 3, hours: 10 },
    { id: 3, name: 'ثلاجة أدوية (Medical Fridge)', wattage: 300, quantity: 2, hours: 24 },
    { id: 4, name: 'أجهزة طبية (Medical Equipment)', wattage: 1000, quantity: 2, hours: 6 },
    { id: 5, name: 'كمبيوتر (Computer)', wattage: 250, quantity: 3, hours: 8 }
  ],
  supermarket: [
    { id: 1, name: 'ثلاجة عرض (Display Fridge)', wattage: 800, quantity: 4, hours: 24 },
    { id: 2, name: 'فريزر (Freezer)', wattage: 600, quantity: 3, hours: 24 },
    { id: 3, name: 'إضاءة (Lighting)', wattage: 40, quantity: 20, hours: 16 },
    { id: 4, name: 'مكيفات (AC)', wattage: 2000, quantity: 2, hours: 14 }
  ],
  farm: [
    { id: 1, name: 'مضخة مياه (Water Pump)', wattage: 3000, quantity: 1, hours: 6 },
    { id: 2, name: 'إضاءة (Lighting)', wattage: 40, quantity: 10, hours: 10 }
  ],
  poultry_farm: [
    { id: 1, name: 'إضاءة (Lighting)', wattage: 20, quantity: 50, hours: 16 },
    { id: 2, name: 'مراوح تهوية (Ventilation Fans)', wattage: 500, quantity: 10, hours: 24 },
    { id: 3, name: 'سخانات (Heaters)', wattage: 2000, quantity: 4, hours: 10 }
  ],
  company: [
    { id: 1, name: 'كمبيوتر (Computers)', wattage: 250, quantity: 20, hours: 9 },
    { id: 2, name: 'مكيفات (AC)', wattage: 1500, quantity: 10, hours: 9 },
    { id: 3, name: 'إضاءة (Lighting)', wattage: 40, quantity: 30, hours: 10 },
    { id: 4, name: 'طابعة (Printer)', wattage: 500, quantity: 2, hours: 2 },
    { id: 5, name: 'سيرفر (Server)', wattage: 800, quantity: 1, hours: 24 }
  ],
  restaurant: [
    { id: 1, name: 'ثلاجة (Fridge)', wattage: 500, quantity: 3, hours: 24 },
    { id: 2, name: 'فريزر (Freezer)', wattage: 700, quantity: 2, hours: 24 },
    { id: 3, name: 'مكيفات (AC)', wattage: 2000, quantity: 4, hours: 12 },
    { id: 4, name: 'إضاءة (Lighting)', wattage: 40, quantity: 30, hours: 12 },
    { id: 5, name: 'معدات مطبخ كهربائية (Kitchen Equip.)', wattage: 3000, quantity: 1, hours: 6 }
  ],
  bakery: [
    { id: 1, name: 'عجانة (Mixer)', wattage: 2000, quantity: 2, hours: 6 },
    { id: 2, name: 'فرن كهربائي (Electric Oven)', wattage: 5000, quantity: 1, hours: 8 },
    { id: 3, name: 'إضاءة (Lighting)', wattage: 40, quantity: 15, hours: 12 }
  ],
  coffee_shop: [
    { id: 1, name: 'ماكينة قهوة (Espresso Machine)', wattage: 3500, quantity: 1, hours: 10 },
    { id: 2, name: 'ثلاجة عرض (Display Fridge)', wattage: 500, quantity: 2, hours: 24 },
    { id: 3, name: 'مكيف (AC)', wattage: 2000, quantity: 2, hours: 12 },
    { id: 4, name: 'إضاءة (Lighting)', wattage: 30, quantity: 20, hours: 14 }
  ],
  water_pump: [
    { id: 1, name: 'مضخة غاطسة (Submersible Pump)', wattage: 5500, quantity: 1, hours: 8 }
  ],
  workshop: [
    { id: 1, name: 'معدات لحام (Welding Equip.)', wattage: 4000, quantity: 1, hours: 4 },
    { id: 2, name: 'مثقاب/صاروخ (Drills/Grinders)', wattage: 1500, quantity: 3, hours: 5 },
    { id: 3, name: 'إضاءة (Lighting)', wattage: 100, quantity: 5, hours: 8 }
  ],
  default: [
    { id: 1, name: 'إضاءة (Lighting)', wattage: 20, quantity: 10, hours: 8 },
    { id: 2, name: 'مروحة (Fan)', wattage: 70, quantity: 2, hours: 12 }
  ]
};

class SolarCalculatorModel {
  /**
   * Calculates total daily energy consumption in Watt-hours (Wh).
   * @param {Array} appliances - Array of appliance objects { wattage, quantity, hours }.
   * @returns {number} Total daily consumption in Wh.
   */
  static calculateDailyConsumption(appliances) {
    if (!appliances || !Array.isArray(appliances)) return 0;
    return appliances.reduce((total, app) => {
      const w = Number(app.wattage) || 0;
      const q = Number(app.quantity) || 0;
      const h = Number(app.hours) || 0;
      return total + (w * q * h);
    }, 0);
  }

  /**
   * Calculates the recommended solar system size in kilowatts (kW).
   * Assuming an average of 5 peak sun hours and a system efficiency of 80% (0.8).
   * System Size (kW) = (Daily Consumption (Wh) / 0.8) / (Peak Sun Hours) / 1000
   * @param {number} dailyConsumptionWh - Total daily consumption in Wh.
   * @param {number} peakSunHours - Average peak sun hours per day (default 5 for many sunny regions).
   * @param {number} systemEfficiency - Efficiency of the system (default 0.8).
   * @returns {number} Recommended system size in kW, rounded to 1 decimal place.
   */
  static calculateSystemSize(dailyConsumptionWh, peakSunHours = 5, systemEfficiency = 0.8) {
    if (!dailyConsumptionWh || dailyConsumptionWh <= 0) return 0;
    const requiredDailyGenerationWh = dailyConsumptionWh / systemEfficiency;
    const systemSizeW = requiredDailyGenerationWh / peakSunHours;
    return Number((systemSizeW / 1000).toFixed(1));
  }

  /**
   * Calculates the recommended battery capacity in Ampere-hours (Ah) at a specific system voltage.
   * Assuming 1 day of autonomy (backup) and a maximum depth of discharge (DoD) of 50% for lead-acid or 80% for Lithium.
   * Battery Capacity (Ah) = (Daily Consumption (Wh) * Days of Autonomy) / (System Voltage * DoD)
   * @param {number} dailyConsumptionWh - Total daily consumption in Wh.
   * @param {number} systemVoltage - System battery voltage (e.g., 12, 24, 48).
   * @param {number} daysOfAutonomy - Number of days the system can run without sun (default 1).
   * @param {number} depthOfDischarge - Maximum safe discharge percentage (default 0.8 for Lithium-ion / LiFePO4).
   * @returns {number} Recommended battery capacity in Ah.
   */
  static calculateBatteryCapacity(dailyConsumptionWh, systemVoltage = 48, daysOfAutonomy = 1, depthOfDischarge = 0.8) {
    if (!dailyConsumptionWh || dailyConsumptionWh <= 0) return 0;
    const capacityAh = (dailyConsumptionWh * daysOfAutonomy) / (systemVoltage * depthOfDischarge);
    return Math.ceil(capacityAh);
  }
}

export default SolarCalculatorModel;
