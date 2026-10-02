export const FACILITY_TYPES = [
  { id: "ice_factory", name: "مصنع ثلج" },
  { id: "company", name: "شركة" },
  { id: "farm", name: "مزرعة" },
  { id: "poultry_farm", name: "مزرعة دواجن" },
  { id: "greenhouse", name: "بيوت محمية" },
  { id: "factory", name: "مصنع" },
  { id: "clinic", name: "مستوصف" },
  { id: "hospital", name: "مستشفى" },
  { id: "bakery", name: "مخبز" },
  { id: "shop", name: "دكان" },
  { id: "workshop", name: "ورشة" },
  { id: "water_pump", name: "مضخة مياه" },
  { id: "donkey_cart_pump", name: "دونكي" },
  { id: "mosque", name: "مسجد" },
  { id: "printing_press", name: "مطبعة" },
  { id: "coffee_shop", name: "كوفي شوب" },
  { id: "restaurant", name: "مطعم" },
  { id: "hotel", name: "فندق" },
  { id: "bank", name: "بنك" },
  { id: "supermarket", name: "سوبر ماركت" },
  { id: "gas_station", name: "طرمبة وقود" },
  { id: "mining_company", name: "شركة تعدين" },
];

export const DEVICE_PRESETS = [
  { name: "لمبة", power: 10, hours: 8 },
  { name: "مروحة", power: 75, hours: 10 },
  { name: "تلفزيون", power: 100, hours: 6 },
  { name: "ثلاجة", power: 250, hours: 12 },
  { name: "مكيف", power: 1500, hours: 8 },
  { name: "مضخة", power: 750, hours: 4 },
];

/**
 * Calculates the solar system requirements based on a list of devices.
 *
 * @param {Array} devices - Array of device objects { name, quantity, power, hours }
 * @param {Object} options - Options like peakSunHours, systemVoltage
 * @returns {Object} Requirements { totalDailyEnergy, totalPower, solarArrayCapacity, inverterCapacity, batteryCapacity }
 */
export function calculateSolarRequirements(devices, options = {}) {
  const peakSunHours = options.peakSunHours || 5; // Default to 5 hours of peak sun
  const systemVoltage = options.systemVoltage || 48; // Default 48V system

  let totalDailyEnergy = 0; // in Wh
  let totalPower = 0; // in W

  devices.forEach((device) => {
    const qty = parseInt(device.quantity) || 0;
    const pwr = parseFloat(device.power) || 0;
    const hrs = parseFloat(device.hours) || 0;

    totalPower += qty * pwr;
    totalDailyEnergy += qty * pwr * hrs;
  });

  // Calculate requirements
  // Add 30% for system losses
  const solarArrayCapacity = (totalDailyEnergy / peakSunHours) * 1.3;

  // Inverter needs to handle max load + 25% safety margin
  const inverterCapacity = totalPower * 1.25;

  // Battery capacity in Ah (assuming 50% Depth of Discharge for Lead-acid or standard safety)
  const batteryCapacity = (totalDailyEnergy / systemVoltage) * 2;

  return {
    totalDailyEnergy: Math.ceil(totalDailyEnergy),
    totalPower: Math.ceil(totalPower),
    solarArrayCapacity: Math.ceil(solarArrayCapacity),
    inverterCapacity: Math.ceil(inverterCapacity),
    batteryCapacity: Math.ceil(batteryCapacity)
  };
}
