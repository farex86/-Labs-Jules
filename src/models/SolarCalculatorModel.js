export const FACILITY_TYPES = [
  {
    id: "ice_factory",
    name: "مصنع ثلج",
    appliances: [
      { id: "comp", name: "ضواغط التبريد (Compressors)", powerWatts: 15000, quantity: 2, hoursPerDay: 20 },
      { id: "pump", name: "مضخات مياه", powerWatts: 2000, quantity: 2, hoursPerDay: 12 },
      { id: "light", name: "إضاءة", powerWatts: 100, quantity: 20, hoursPerDay: 12 }
    ]
  },
  {
    id: "company",
    name: "شركة",
    appliances: [
      { id: "pc", name: "أجهزة كمبيوتر", powerWatts: 200, quantity: 15, hoursPerDay: 8 },
      { id: "ac", name: "مكيفات هواء (A/C)", powerWatts: 1500, quantity: 4, hoursPerDay: 8 },
      { id: "printer", name: "طابعات", powerWatts: 500, quantity: 2, hoursPerDay: 4 },
      { id: "light", name: "إضاءة", powerWatts: 40, quantity: 30, hoursPerDay: 8 }
    ]
  },
  {
    id: "farm",
    name: "مزرعة",
    appliances: [
      { id: "pump", name: "مضخة غاطسة", powerWatts: 5000, quantity: 1, hoursPerDay: 6 },
      { id: "light", name: "إضاءة خارجية", powerWatts: 100, quantity: 10, hoursPerDay: 10 }
    ]
  },
  {
    id: "poultry_farm",
    name: "مزرعة دواجن",
    appliances: [
      { id: "fan", name: "مراوح تهوية", powerWatts: 750, quantity: 6, hoursPerDay: 24 },
      { id: "heater", name: "دفايات", powerWatts: 2000, quantity: 4, hoursPerDay: 12 },
      { id: "light", name: "إضاءة", powerWatts: 40, quantity: 20, hoursPerDay: 16 }
    ]
  },
  {
    id: "greenhouse",
    name: "بيوت محمية",
    appliances: [
      { id: "fan", name: "مراوح", powerWatts: 500, quantity: 4, hoursPerDay: 12 },
      { id: "pump", name: "مضخة ري", powerWatts: 1500, quantity: 1, hoursPerDay: 4 }
    ]
  },
  {
    id: "factory",
    name: "مصنع",
    appliances: [
      { id: "machinery", name: "آلات تصنيع", powerWatts: 20000, quantity: 3, hoursPerDay: 16 },
      { id: "conveyor", name: "سيور ناقلة", powerWatts: 5000, quantity: 2, hoursPerDay: 16 },
      { id: "light", name: "إضاءة", powerWatts: 100, quantity: 50, hoursPerDay: 16 }
    ]
  },
  {
    id: "clinic",
    name: "مستوصف",
    appliances: [
      { id: "ac", name: "مكيفات هواء", powerWatts: 1500, quantity: 5, hoursPerDay: 12 },
      { id: "medical", name: "أجهزة طبية", powerWatts: 1000, quantity: 3, hoursPerDay: 8 },
      { id: "fridge", name: "ثلاجة أدوية", powerWatts: 300, quantity: 2, hoursPerDay: 24 },
      { id: "light", name: "إضاءة", powerWatts: 40, quantity: 40, hoursPerDay: 12 }
    ]
  },
  {
    id: "hospital",
    name: "مستشفى",
    appliances: [
      { id: "ac_central", name: "تكييف مركزي", powerWatts: 50000, quantity: 1, hoursPerDay: 24 },
      { id: "xray", name: "جهاز أشعة", powerWatts: 5000, quantity: 2, hoursPerDay: 6 },
      { id: "icu", name: "أجهزة عناية مركزة", powerWatts: 1000, quantity: 10, hoursPerDay: 24 },
      { id: "light", name: "إضاءة", powerWatts: 40, quantity: 200, hoursPerDay: 24 }
    ]
  },
  {
    id: "bakery",
    name: "مخبز",
    appliances: [
      { id: "oven", name: "فرن كهربائي", powerWatts: 10000, quantity: 2, hoursPerDay: 12 },
      { id: "mixer", name: "عجانات", powerWatts: 3000, quantity: 2, hoursPerDay: 6 },
      { id: "ac", name: "مكيفات", powerWatts: 1500, quantity: 2, hoursPerDay: 12 },
      { id: "light", name: "إضاءة", powerWatts: 40, quantity: 15, hoursPerDay: 12 }
    ]
  },
  {
    id: "shop",
    name: "دكان",
    appliances: [
      { id: "fridge", name: "ثلاجة عرض", powerWatts: 500, quantity: 2, hoursPerDay: 24 },
      { id: "ac", name: "مكيف هواء", powerWatts: 1500, quantity: 1, hoursPerDay: 12 },
      { id: "light", name: "إضاءة", powerWatts: 40, quantity: 5, hoursPerDay: 12 }
    ]
  },
  {
    id: "workshop",
    name: "ورشة",
    appliances: [
      { id: "welder", name: "ماكينة لحام", powerWatts: 5000, quantity: 2, hoursPerDay: 4 },
      { id: "tools", name: "معدات يدوية كهربائية", powerWatts: 1000, quantity: 5, hoursPerDay: 6 },
      { id: "light", name: "إضاءة", powerWatts: 100, quantity: 10, hoursPerDay: 8 }
    ]
  },
  {
    id: "water_pump",
    name: "مضخة موية",
    appliances: [
      { id: "pump", name: "مضخة رئيسية", powerWatts: 7500, quantity: 1, hoursPerDay: 8 },
      { id: "light", name: "إضاءة", powerWatts: 50, quantity: 2, hoursPerDay: 12 }
    ]
  },
  {
    id: "donkey",
    name: "دونكي",
    appliances: [
      { id: "pump", name: "مضخة صغيرة", powerWatts: 2000, quantity: 1, hoursPerDay: 6 }
    ]
  },
  {
    id: "mosque",
    name: "مسجد",
    appliances: [
      { id: "ac", name: "مكيفات هواء", powerWatts: 1500, quantity: 10, hoursPerDay: 4 },
      { id: "sound", name: "نظام صوتي", powerWatts: 300, quantity: 1, hoursPerDay: 4 },
      { id: "light", name: "إضاءة", powerWatts: 40, quantity: 30, hoursPerDay: 4 }
    ]
  },
  {
    id: "press",
    name: "مطبعة",
    appliances: [
      { id: "press_mach", name: "آلات طباعة", powerWatts: 8000, quantity: 2, hoursPerDay: 10 },
      { id: "pc", name: "أجهزة كمبيوتر", powerWatts: 300, quantity: 5, hoursPerDay: 10 },
      { id: "ac", name: "مكيفات", powerWatts: 2000, quantity: 3, hoursPerDay: 10 }
    ]
  },
  {
    id: "coffee_shop",
    name: "كوفي شوب",
    appliances: [
      { id: "espresso", name: "ماكينة اسبريسو", powerWatts: 3000, quantity: 1, hoursPerDay: 16 },
      { id: "fridge", name: "ثلاجة", powerWatts: 500, quantity: 3, hoursPerDay: 24 },
      { id: "ac", name: "مكيفات هواء", powerWatts: 1500, quantity: 2, hoursPerDay: 16 },
      { id: "light", name: "إضاءة ديكور", powerWatts: 40, quantity: 20, hoursPerDay: 16 }
    ]
  },
  {
    id: "restaurant",
    name: "مطعم",
    appliances: [
      { id: "oven", name: "أفران/قلايات", powerWatts: 5000, quantity: 3, hoursPerDay: 12 },
      { id: "freezer", name: "فريزر/ثلاجة كبيرة", powerWatts: 1000, quantity: 4, hoursPerDay: 24 },
      { id: "ac", name: "مكيفات", powerWatts: 2000, quantity: 4, hoursPerDay: 14 },
      { id: "light", name: "إضاءة", powerWatts: 40, quantity: 30, hoursPerDay: 14 }
    ]
  },
  {
    id: "hotel",
    name: "فندق",
    appliances: [
      { id: "ac_rooms", name: "مكيفات الغرف", powerWatts: 1500, quantity: 50, hoursPerDay: 12 },
      { id: "elevator", name: "مصاعد", powerWatts: 10000, quantity: 2, hoursPerDay: 4 },
      { id: "water_heater", name: "سخانات مياه", powerWatts: 2000, quantity: 20, hoursPerDay: 4 },
      { id: "light", name: "إضاءة", powerWatts: 40, quantity: 200, hoursPerDay: 16 }
    ]
  },
  {
    id: "bank",
    name: "بنك",
    appliances: [
      { id: "atm", name: "صراف آلي (ATM)", powerWatts: 500, quantity: 4, hoursPerDay: 24 },
      { id: "server", name: "سيرفرات", powerWatts: 1000, quantity: 2, hoursPerDay: 24 },
      { id: "ac", name: "مكيفات", powerWatts: 1500, quantity: 8, hoursPerDay: 10 },
      { id: "pc", name: "أجهزة كمبيوتر", powerWatts: 200, quantity: 20, hoursPerDay: 10 }
    ]
  },
  {
    id: "supermarket",
    name: "سوبر ماركت",
    appliances: [
      { id: "fridge_open", name: "ثلاجات عرض مفتوحة", powerWatts: 2000, quantity: 5, hoursPerDay: 24 },
      { id: "freezer", name: "فريزرات", powerWatts: 1000, quantity: 4, hoursPerDay: 24 },
      { id: "ac", name: "مكيفات مركزية", powerWatts: 5000, quantity: 2, hoursPerDay: 16 },
      { id: "light", name: "إضاءة", powerWatts: 50, quantity: 60, hoursPerDay: 16 }
    ]
  },
  {
    id: "gas_station",
    name: "طرمبة وقود",
    appliances: [
      { id: "fuel_pump", name: "مضخات وقود", powerWatts: 1500, quantity: 6, hoursPerDay: 24 },
      { id: "light_canopy", name: "إضاءة المظلة", powerWatts: 100, quantity: 20, hoursPerDay: 12 },
      { id: "shop_fridge", name: "ثلاجات البقالة", powerWatts: 500, quantity: 3, hoursPerDay: 24 }
    ]
  },
  {
    id: "mining",
    name: "شركة تعدين",
    appliances: [
      { id: "crusher", name: "كسارات", powerWatts: 50000, quantity: 2, hoursPerDay: 16 },
      { id: "conveyor", name: "سيور", powerWatts: 10000, quantity: 4, hoursPerDay: 16 },
      { id: "camp_ac", name: "مكيفات السكن", powerWatts: 1500, quantity: 20, hoursPerDay: 12 },
      { id: "light", name: "إضاءة كاشفة", powerWatts: 500, quantity: 20, hoursPerDay: 12 }
    ]
  }
];

/**
 * Calculates solar system requirements based on a list of appliances.
 * @param {Array} appliances - Array of appliance objects { powerWatts, quantity, hoursPerDay }
 * @returns {Object} Calculated requirements
 */
export function calculateSolarRequirements(appliances) {
  let totalDailyEnergyWh = 0;
  let peakPowerW = 0;

  appliances.forEach(app => {
    const power = Number(app.powerWatts) || 0;
    const qty = Number(app.quantity) || 0;
    const hours = Number(app.hoursPerDay) || 0;

    const appliancePeakW = power * qty;
    const applianceDailyWh = appliancePeakW * hours;

    peakPowerW += appliancePeakW;
    totalDailyEnergyWh += applianceDailyWh;
  });

  // Convert to kW and kWh
  const totalDailyEnergyKWh = totalDailyEnergyWh / 1000;
  const peakPowerKW = peakPowerW / 1000;

  // Assuming an average of 5 peak sun hours per day and 80% system efficiency
  const PEAK_SUN_HOURS = 5;
  const SYSTEM_EFFICIENCY = 0.8;
  const INVERTER_SAFETY_FACTOR = 1.25;
  const BATTERY_DEPTH_OF_DISCHARGE = 0.5; // 50% DoD for lead-acid/gel, or keep safe for lithium
  const DAYS_OF_AUTONOMY = 1; // 1 day of backup

  // Required Solar Array (kW)
  let solarArrayKW = 0;
  if (totalDailyEnergyKWh > 0) {
    solarArrayKW = totalDailyEnergyKWh / (PEAK_SUN_HOURS * SYSTEM_EFFICIENCY);
  }

  // Recommended Inverter Size (kW)
  const inverterKW = peakPowerKW * INVERTER_SAFETY_FACTOR;

  // Required Battery Bank Capacity (kWh)
  // Total energy * days of autonomy / depth of discharge
  const batteryBankKWh = totalDailyEnergyKWh > 0
    ? (totalDailyEnergyKWh * DAYS_OF_AUTONOMY) / BATTERY_DEPTH_OF_DISCHARGE
    : 0;

  return {
    totalDailyEnergyKWh: totalDailyEnergyKWh.toFixed(2),
    peakPowerKW: peakPowerKW.toFixed(2),
    recommendedInverterKW: inverterKW.toFixed(2),
    solarArrayKW: solarArrayKW.toFixed(2),
    batteryBankKWh: batteryBankKWh.toFixed(2)
  };
}
