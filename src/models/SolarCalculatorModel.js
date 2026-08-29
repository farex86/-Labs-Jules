export const facilityTypes = [
  "مصنع تلج",
  "شركة",
  "مزرعة",
  "مزرعة دواجن",
  "بيوت محمية",
  "مصنع",
  "مستوصف",
  "مستشفي",
  "مخبز",
  "دكان",
  "ورشة",
  "مضخة موية",
  "دونكي",
  "مسجد",
  "مطبعة",
  "كوفي شوب",
  "مطعم",
  "فندق",
  "بنك",
  "سوبر ماركت",
  "طرمبة وقود",
  "شركة تعدين",
  "أخرى"
];

// Constants for solar calculation
export const SYSTEM_LOSS_FACTOR = 1.3; // 30% loss for inefficiency (inverter, wiring, temperature, etc)
export const SUN_HOURS = 5; // Average daily peak sun hours

/**
 * Calculates total daily energy consumption in Watt-hours (Wh)
 * @param {Array} devices - Array of device objects { name, quantity, watts, hours }
 * @returns {number} - Total daily Wh
 */
export const calculateDailyConsumption = (devices) => {
  if (!Array.isArray(devices)) return 0;

  return devices.reduce((total, device) => {
    const qty = parseFloat(device.quantity) || 0;
    const watts = parseFloat(device.watts) || 0;
    const hours = parseFloat(device.hours) || 0;

    return total + (qty * watts * hours);
  }, 0);
};

/**
 * Calculates required solar system size in kilowatts (kW)
 * @param {number} dailyConsumptionWh - Total daily consumption in Wh
 * @returns {number} - Required system size in kW
 */
export const calculateSystemSize = (dailyConsumptionWh) => {
  if (typeof dailyConsumptionWh !== 'number' || dailyConsumptionWh <= 0) return 0;

  // Convert Wh to kWh, apply loss factor, divide by peak sun hours
  const requiredKwh = (dailyConsumptionWh / 1000) * SYSTEM_LOSS_FACTOR;
  const systemSizeKw = requiredKwh / SUN_HOURS;

  // Return rounded to 2 decimal places
  return Math.round(systemSizeKw * 100) / 100;
};
