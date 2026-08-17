// SolarCalculatorModel.js

// List of Arabic localized facility types and their default consumption patterns.
// This separates the configuration data from the UI.
export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع ثلج', devices: [{ id: 'ice_maker', name: 'ماكينة ثلج', power: 5000, qty: 1, hours: 24 }] },
  { id: 'company', name: 'شركة', devices: [{ id: 'pc', name: 'جهاز كمبيوتر', power: 250, qty: 10, hours: 8 }, { id: 'ac', name: 'مكيف', power: 1500, qty: 3, hours: 8 }, { id: 'lighting', name: 'إضاءة', power: 20, qty: 30, hours: 10 }] },
  { id: 'farm', name: 'مزرعة', devices: [{ id: 'water_pump', name: 'مضخة مياه', power: 3000, qty: 1, hours: 6 }, { id: 'lighting', name: 'إضاءة خارجية', power: 50, qty: 10, hours: 12 }] },
  { id: 'poultry_farm', name: 'مزرعة دواجن', devices: [{ id: 'ventilation', name: 'مراوح تهوية', power: 500, qty: 6, hours: 24 }, { id: 'feeding', name: 'نظام تغذية', power: 1000, qty: 2, hours: 4 }, { id: 'heating', name: 'تدفئة', power: 2000, qty: 4, hours: 12 }] },
  { id: 'greenhouse', name: 'بيوت محمية', devices: [{ id: 'cooling', name: 'نظام تبريد/تكييف', power: 1500, qty: 2, hours: 12 }, { id: 'irrigation', name: 'مضخة ري', power: 1000, qty: 1, hours: 4 }] },
  { id: 'factory', name: 'مصنع', devices: [{ id: 'machinery', name: 'معدات تصنيع', power: 10000, qty: 2, hours: 16 }, { id: 'lighting', name: 'إضاءة', power: 100, qty: 50, hours: 16 }] },
  { id: 'clinic', name: 'مستوصف', devices: [{ id: 'medical_eq', name: 'أجهزة طبية', power: 2000, qty: 3, hours: 8 }, { id: 'fridge', name: 'ثلاجة أدوية', power: 300, qty: 2, hours: 24 }, { id: 'ac', name: 'مكيف', power: 1500, qty: 4, hours: 12 }] },
  { id: 'hospital', name: 'مستشفى', devices: [{ id: 'medical_eq', name: 'أجهزة طبية معقدة', power: 5000, qty: 10, hours: 24 }, { id: 'ac_central', name: 'تكييف مركزي', power: 20000, qty: 1, hours: 24 }, { id: 'lighting', name: 'إضاءة', power: 50, qty: 200, hours: 24 }] },
  { id: 'bakery', name: 'مخبز', devices: [{ id: 'oven', name: 'فرن كهربائي', power: 8000, qty: 2, hours: 12 }, { id: 'mixer', name: 'عجانة', power: 1500, qty: 2, hours: 8 }, { id: 'fridge', name: 'ثلاجة عرض', power: 500, qty: 3, hours: 24 }] },
  { id: 'shop', name: 'دكان', devices: [{ id: 'fridge', name: 'ثلاجة', power: 400, qty: 2, hours: 24 }, { id: 'lighting', name: 'إضاءة', power: 20, qty: 10, hours: 14 }, { id: 'fan', name: 'مروحة/مكيف', power: 1000, qty: 1, hours: 14 }] },
  { id: 'workshop', name: 'ورشة', devices: [{ id: 'welding', name: 'ماكينة لحام', power: 4000, qty: 1, hours: 4 }, { id: 'grinder', name: 'صاروخ قطع/جلخ', power: 1200, qty: 2, hours: 6 }, { id: 'compressor', name: 'كمبروسر هواء', power: 2000, qty: 1, hours: 4 }] },
  { id: 'water_pump', name: 'مضخة موية', devices: [{ id: 'pump', name: 'مضخة غاطسة/سطحية', power: 2200, qty: 1, hours: 8 }] },
  { id: 'donkey', name: 'دونكي', devices: [{ id: 'water_pump', name: 'مضخة', power: 1500, qty: 1, hours: 10 }] },
  { id: 'mosque', name: 'مسجد', devices: [{ id: 'ac', name: 'مكيف', power: 2000, qty: 6, hours: 6 }, { id: 'lighting', name: 'إضاءة', power: 40, qty: 40, hours: 8 }, { id: 'sound_sys', name: 'مكبر صوت', power: 200, qty: 1, hours: 5 }] },
  { id: 'printing_press', name: 'مطبعة', devices: [{ id: 'printer', name: 'ماكينة طباعة', power: 3000, qty: 2, hours: 10 }, { id: 'cutter', name: 'مقص ورق', power: 1500, qty: 1, hours: 4 }, { id: 'pc', name: 'كمبيوتر تصميم', power: 400, qty: 3, hours: 10 }] },
  { id: 'coffee_shop', name: 'كوفي شوب', devices: [{ id: 'espresso', name: 'ماكينة قهوة', power: 3500, qty: 1, hours: 16 }, { id: 'grinder', name: 'طاحونة', power: 500, qty: 2, hours: 4 }, { id: 'fridge', name: 'ثلاجة عرض/تبريد', power: 600, qty: 3, hours: 24 }, { id: 'ac', name: 'مكيف', power: 1500, qty: 2, hours: 16 }] },
  { id: 'restaurant', name: 'مطعم', devices: [{ id: 'fridge_freezer', name: 'ثلاجات وفريزرات', power: 800, qty: 4, hours: 24 }, { id: 'fryer', name: 'قلاية', power: 2500, qty: 2, hours: 10 }, { id: 'hood', name: 'شفاط', power: 1000, qty: 1, hours: 16 }, { id: 'ac', name: 'مكيف', power: 2000, qty: 3, hours: 16 }] },
  { id: 'hotel', name: 'فندق', devices: [{ id: 'ac', name: 'مكيفات غرف', power: 1500, qty: 20, hours: 12 }, { id: 'water_heater', name: 'سخان مياه', power: 2000, qty: 10, hours: 6 }, { id: 'elevator', name: 'مصعد', power: 7500, qty: 1, hours: 4 }, { id: 'lighting', name: 'إضاءة', power: 20, qty: 100, hours: 12 }] },
  { id: 'bank', name: 'بنك', devices: [{ id: 'pc', name: 'أجهزة كمبيوتر', power: 250, qty: 20, hours: 10 }, { id: 'ac', name: 'تكييف مركزي/سبليت', power: 2000, qty: 5, hours: 12 }, { id: 'server', name: 'سيرفر', power: 1000, qty: 1, hours: 24 }, { id: 'atm', name: 'صراف آلي', power: 500, qty: 2, hours: 24 }] },
  { id: 'supermarket', name: 'سوبر ماركت', devices: [{ id: 'freezer', name: 'فريزر عرض', power: 1200, qty: 5, hours: 24 }, { id: 'fridge', name: 'ثلاجة ألبان/مشروبات', power: 1000, qty: 6, hours: 24 }, { id: 'ac', name: 'مكيف', power: 2500, qty: 4, hours: 18 }, { id: 'pos', name: 'نقاط بيع', power: 150, qty: 3, hours: 16 }] },
  { id: 'gas_station', name: 'طرمبة وقود', devices: [{ id: 'pump', name: 'مضخة وقود', power: 1500, qty: 4, hours: 24 }, { id: 'lighting', name: 'إضاءة مظلة', power: 100, qty: 20, hours: 12 }, { id: 'shop_fridge', name: 'ثلاجة البقالة', power: 500, qty: 2, hours: 24 }] },
  { id: 'mining_company', name: 'شركة تعدين', devices: [{ id: 'crusher', name: 'كسارة', power: 15000, qty: 1, hours: 12 }, { id: 'conveyor', name: 'سير ناقل', power: 5000, qty: 2, hours: 12 }, { id: 'pump', name: 'مضخة غسيل', power: 7500, qty: 1, hours: 12 }, { id: 'camp', name: 'سكن عمال (تكييف وإنارة)', power: 2000, qty: 10, hours: 14 }] },
];

/**
 * Calculates the solar system requirements based on a list of devices.
 *
 * @param {Array} devices - List of device objects: { power: number(Watts), qty: number, hours: number(hours/day) }
 * @returns {Object} - Results containing total energy, total power, inverter size, etc.
 */
export const calculateSolarSystem = (devices) => {
  if (!devices || devices.length === 0) {
    return {
      totalPowerW: 0,
      totalEnergyWh: 0,
      inverterSizeKW: 0,
      solarPanelsKW: 0,
      batteryCapacityKWh: 0
    };
  }

  // 1. Calculate Total Power (W) and Total Energy (Wh) per day
  let totalPowerW = 0;
  let totalEnergyWh = 0;

  devices.forEach(device => {
    const power = parseFloat(device.power) || 0;
    const qty = parseInt(device.qty, 10) || 0;
    const hours = parseFloat(device.hours) || 0;

    const deviceTotalPower = power * qty;
    totalPowerW += deviceTotalPower;
    totalEnergyWh += (deviceTotalPower * hours);
  });

  // 2. Inverter Sizing
  // Typically 25-30% safety margin over total concurrent peak load.
  // Assuming all devices could potentially run at once for worst-case.
  const inverterSizeW = totalPowerW * 1.25;
  const inverterSizeKW = inverterSizeW / 1000;

  // 3. Solar Panel Sizing
  // To generate 'totalEnergyWh', considering system losses (~30%) and average peak sun hours (e.g., 5 hours/day in sunny regions).
  const PEAK_SUN_HOURS = 5;
  const SYSTEM_EFFICIENCY = 0.7; // 70% efficiency
  const requiredSolarEnergyWh = totalEnergyWh / SYSTEM_EFFICIENCY;
  const solarPanelsW = requiredSolarEnergyWh / PEAK_SUN_HOURS;
  const solarPanelsKW = solarPanelsW / 1000;

  // 4. Battery Bank Sizing (for autonomy)
  // Assuming 1 day of autonomy and max Depth of Discharge (DoD) of 50% for typical Lead-Acid/Gel, or 80% for Lithium.
  // Let's use 60% DoD as a generic safe average for general estimates.
  const DOD = 0.6;
  // We only really need battery for energy used *outside* sun hours, but for simplicity we calculate battery to cover the full daily energy requirement for 1 day autonomy.
  const requiredBatteryEnergyWh = totalEnergyWh / DOD;
  const batteryCapacityKWh = requiredBatteryEnergyWh / 1000;

  return {
    totalPowerW,
    totalEnergyWh,
    inverterSizeKW: Number(inverterSizeKW.toFixed(2)),
    solarPanelsKW: Number(solarPanelsKW.toFixed(2)),
    batteryCapacityKWh: Number(batteryCapacityKWh.toFixed(2))
  };
};
