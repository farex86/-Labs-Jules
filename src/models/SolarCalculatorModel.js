export const SYSTEM_CONSTANTS = {
  PEAK_SUN_HOURS: 5, // Average peak sun hours
  INVERTER_SAFETY_FACTOR: 1.25, // 25% extra capacity for inverter
  SYSTEM_LOSS_FACTOR: 1.2, // 20% loss factor for panels
  BATTERY_VOLTAGE: 48, // Default 48V system
  BATTERY_DOD: 0.8, // Depth of discharge 80% (Lithium)
  BATTERY_DAYS_AUTONOMY: 1, // Days of autonomy
  BATTERY_EFFICIENCY: 0.95, // 95% efficient
};

export const FACILITY_TYPES = [
  {
    id: "ice_factory",
    name: "مصنع تلج",
    defaultDevices: [
      { id: '1', name: 'ماكينة ثلج', power: 5000, hours: 24, quantity: 2 },
      { id: '2', name: 'إضاءة', power: 50, hours: 12, quantity: 10 }
    ]
  },
  {
    id: "company",
    name: "شركة",
    defaultDevices: [
      { id: '1', name: 'مكيف', power: 1500, hours: 8, quantity: 4 },
      { id: '2', name: 'كمبيوتر', power: 250, hours: 8, quantity: 10 },
      { id: '3', name: 'إضاءة', power: 30, hours: 10, quantity: 20 }
    ]
  },
  {
    id: "farm",
    name: "مزرعة",
    defaultDevices: [
      { id: '1', name: 'مضخة ماء', power: 2200, hours: 6, quantity: 1 },
      { id: '2', name: 'إضاءة', power: 50, hours: 12, quantity: 5 }
    ]
  },
  {
    id: "poultry_farm",
    name: "مزرعة دواجن",
    defaultDevices: [
      { id: '1', name: 'مراوح تهوية', power: 500, hours: 24, quantity: 10 },
      { id: '2', name: 'إضاءة', power: 40, hours: 16, quantity: 20 },
      { id: '3', name: 'نظام تدفئة', power: 2000, hours: 12, quantity: 2 }
    ]
  },
  {
    id: "greenhouses",
    name: "بيوت محمية",
    defaultDevices: [
      { id: '1', name: 'مضخة ري', power: 1500, hours: 4, quantity: 2 },
      { id: '2', name: 'مراوح تبريد', power: 750, hours: 12, quantity: 4 }
    ]
  },
  {
    id: "factory",
    name: "مصنع",
    defaultDevices: [
      { id: '1', name: 'آلات تصنيع', power: 10000, hours: 16, quantity: 2 },
      { id: '2', name: 'إضاءة صناعية', power: 100, hours: 16, quantity: 30 }
    ]
  },
  {
    id: "dispensary",
    name: "مستوصف",
    defaultDevices: [
      { id: '1', name: 'مكيف', power: 1500, hours: 12, quantity: 5 },
      { id: '2', name: 'ثلاجة أدوية', power: 300, hours: 24, quantity: 2 },
      { id: '3', name: 'إضاءة', power: 40, hours: 12, quantity: 20 },
      { id: '4', name: 'معدات طبية', power: 1000, hours: 6, quantity: 2 }
    ]
  },
  {
    id: "hospital",
    name: "مستشفي",
    defaultDevices: [
      { id: '1', name: 'مكيف', power: 1500, hours: 24, quantity: 20 },
      { id: '2', name: 'ثلاجة أدوية', power: 300, hours: 24, quantity: 10 },
      { id: '3', name: 'إضاءة', power: 40, hours: 24, quantity: 100 },
      { id: '4', name: 'معدات طبية ثقيلة', power: 5000, hours: 12, quantity: 5 }
    ]
  },
  {
    id: "bakery",
    name: "مخبز",
    defaultDevices: [
      { id: '1', name: 'عجانة', power: 3000, hours: 8, quantity: 2 },
      { id: '2', name: 'إضاءة', power: 50, hours: 12, quantity: 10 },
      { id: '3', name: 'مروحة شفط', power: 500, hours: 12, quantity: 2 }
    ]
  },
  {
    id: "shop",
    name: "دكان",
    defaultDevices: [
      { id: '1', name: 'ثلاجة عرض', power: 600, hours: 24, quantity: 2 },
      { id: '2', name: 'إضاءة', power: 30, hours: 12, quantity: 5 },
      { id: '3', name: 'مروحة', power: 100, hours: 12, quantity: 1 }
    ]
  },
  {
    id: "workshop",
    name: "ورشة",
    defaultDevices: [
      { id: '1', name: 'معدات لحام / قطع', power: 4000, hours: 6, quantity: 1 },
      { id: '2', name: 'ضاغط هواء', power: 2200, hours: 4, quantity: 1 },
      { id: '3', name: 'إضاءة', power: 100, hours: 10, quantity: 6 }
    ]
  },
  {
    id: "water_pump",
    name: "مضخة موية",
    defaultDevices: [
      { id: '1', name: 'مضخة غاطسة', power: 3000, hours: 8, quantity: 1 }
    ]
  },
  {
    id: "donkey",
    name: "دونكي",
    defaultDevices: [
      { id: '1', name: 'مضخة مياه سطحية', power: 1500, hours: 6, quantity: 1 }
    ]
  },
  {
    id: "mosque",
    name: "مسجد",
    defaultDevices: [
      { id: '1', name: 'مكيف', power: 1500, hours: 6, quantity: 6 },
      { id: '2', name: 'إضاءة', power: 40, hours: 8, quantity: 30 },
      { id: '3', name: 'مكبر صوت', power: 200, hours: 2, quantity: 1 }
    ]
  },
  {
    id: "printing_press",
    name: "مطبعة",
    defaultDevices: [
      { id: '1', name: 'آلة طباعة', power: 5000, hours: 10, quantity: 2 },
      { id: '2', name: 'كمبيوتر', power: 300, hours: 10, quantity: 5 },
      { id: '3', name: 'إضاءة', power: 50, hours: 10, quantity: 15 }
    ]
  },
  {
    id: "coffee_shop",
    name: "كوفي شوب",
    defaultDevices: [
      { id: '1', name: 'آلة إسبريسو', power: 3500, hours: 12, quantity: 1 },
      { id: '2', name: 'مطحنة بن', power: 500, hours: 4, quantity: 2 },
      { id: '3', name: 'مكيف', power: 1500, hours: 14, quantity: 2 },
      { id: '4', name: 'ثلاجة عرض', power: 800, hours: 24, quantity: 1 },
      { id: '5', name: 'إضاءة ديكور', power: 150, hours: 14, quantity: 1 }
    ]
  },
  {
    id: "restaurant",
    name: "مطعم",
    defaultDevices: [
      { id: '1', name: 'ثلاجة تجميد', power: 1000, hours: 24, quantity: 3 },
      { id: '2', name: 'مكيف', power: 1500, hours: 14, quantity: 4 },
      { id: '3', name: 'إضاءة', power: 50, hours: 14, quantity: 20 },
      { id: '4', name: 'مروحة شفط كبيرة', power: 1000, hours: 12, quantity: 2 }
    ]
  },
  {
    id: "hotel",
    name: "فندق",
    defaultDevices: [
      { id: '1', name: 'مكيف غرف', power: 1500, hours: 12, quantity: 20 },
      { id: '2', name: 'إضاءة غرف وممرات', power: 40, hours: 12, quantity: 100 },
      { id: '3', name: 'مصعد', power: 7000, hours: 4, quantity: 1 },
      { id: '4', name: 'ثلاجات ميني', power: 150, hours: 24, quantity: 20 }
    ]
  },
  {
    id: "bank",
    name: "بنك",
    defaultDevices: [
      { id: '1', name: 'مكيف مركزي / وحدات', power: 1500, hours: 10, quantity: 10 },
      { id: '2', name: 'كمبيوتر', power: 250, hours: 10, quantity: 20 },
      { id: '3', name: 'إضاءة', power: 40, hours: 12, quantity: 50 },
      { id: '4', name: 'صراف آلي', power: 500, hours: 24, quantity: 2 },
      { id: '5', name: 'خوادم', power: 1500, hours: 24, quantity: 1 }
    ]
  },
  {
    id: "supermarket",
    name: "سوبر ماركت",
    defaultDevices: [
      { id: '1', name: 'ثلاجة عرض ألبان/لحوم', power: 1500, hours: 24, quantity: 4 },
      { id: '2', name: 'ثلاجة تجميد', power: 1200, hours: 24, quantity: 3 },
      { id: '3', name: 'مكيف', power: 1500, hours: 16, quantity: 4 },
      { id: '4', name: 'إضاءة', power: 50, hours: 16, quantity: 40 }
    ]
  },
  {
    id: "fuel_station",
    name: "طرمبة وقود",
    defaultDevices: [
      { id: '1', name: 'مضخة وقود', power: 1000, hours: 10, quantity: 4 },
      { id: '2', name: 'إضاءة مظلة', power: 100, hours: 12, quantity: 10 },
      { id: '3', name: 'مكيف المكتب', power: 1500, hours: 12, quantity: 1 }
    ]
  },
  {
    id: "mining_company",
    name: "شركة تعدين",
    defaultDevices: [
      { id: '1', name: 'كسارة', power: 15000, hours: 12, quantity: 1 },
      { id: '2', name: 'مضخة مياه كبيرة', power: 5000, hours: 12, quantity: 2 },
      { id: '3', name: 'إضاءة كاشفة', power: 500, hours: 12, quantity: 10 },
      { id: '4', name: 'مكيف سكن عمال', power: 1500, hours: 12, quantity: 10 }
    ]
  }
];

/**
 * Calculate the required solar system based on a list of devices.
 *
 * @param {Array} devices - Array of objects { id, name, power, hours, quantity }
 * @returns {Object} Calculated metrics
 */
export const calculateSolarSystem = (devices) => {
  let totalPowerW = 0;
  let totalDailyEnergyWh = 0;

  devices.forEach(device => {
    const qty = Number(device.quantity) || 0;
    const power = Number(device.power) || 0;
    const hours = Number(device.hours) || 0;

    totalPowerW += qty * power;
    totalDailyEnergyWh += qty * power * hours;
  });

  // 1. Inverter Capacity (kW)
  // Need to handle the maximum simultaneous load. We assume all devices might run together for safety.
  const requiredInverterKw = (totalPowerW / 1000) * SYSTEM_CONSTANTS.INVERTER_SAFETY_FACTOR;

  // 2. Solar Panels Capacity (kW)
  // Energy needed to generate per day, factoring in system losses and average sun hours.
  const requiredPanelsKw = (totalDailyEnergyWh / SYSTEM_CONSTANTS.PEAK_SUN_HOURS / 1000) * SYSTEM_CONSTANTS.SYSTEM_LOSS_FACTOR;

  // 3. Battery Bank Capacity (Ah)
  // Needed to store energy for times without sun (or at night). We'll assume the total daily energy needs to be stored for 1 day of autonomy.
  // Realistically it might be less if running during the day, but a common simple estimator for full off-grid.
  const requiredBatteryAh = (totalDailyEnergyWh * SYSTEM_CONSTANTS.BATTERY_DAYS_AUTONOMY)
                            / (SYSTEM_CONSTANTS.BATTERY_VOLTAGE * SYSTEM_CONSTANTS.BATTERY_DOD * SYSTEM_CONSTANTS.BATTERY_EFFICIENCY);

  return {
    totalPowerW,
    totalDailyEnergyWh,
    requiredInverterKw,
    requiredPanelsKw,
    requiredBatteryAh,
    batteryVoltage: SYSTEM_CONSTANTS.BATTERY_VOLTAGE
  };
};
