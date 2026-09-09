export const FACILITY_TYPES = [
  {
    id: "ice_factory",
    name: "مصنع تلج",
    defaultDevices: [
      { id: "ice_machine_large", name: "ماكينة ثلج كبيرة", power: 15000, quantity: 2, hours: 24 },
      { id: "freezer_room", name: "غرفة تجميد", power: 8000, quantity: 1, hours: 24 },
      { id: "lighting", name: "إضاءة", power: 100, quantity: 10, hours: 12 },
    ],
  },
  {
    id: "company",
    name: "شركة",
    defaultDevices: [
      { id: "ac_split", name: "مكيف سبليت", power: 1500, quantity: 5, hours: 10 },
      { id: "computer", name: "جهاز كمبيوتر", power: 300, quantity: 15, hours: 10 },
      { id: "lighting", name: "إضاءة", power: 40, quantity: 30, hours: 10 },
      { id: "server", name: "خادم شبكة (سيرفر)", power: 800, quantity: 1, hours: 24 },
    ],
  },
  {
    id: "farm",
    name: "مزرعة",
    defaultDevices: [
      { id: "water_pump", name: "مضخة مياه", power: 5000, quantity: 1, hours: 8 },
      { id: "lighting", name: "كشافات إضاءة", power: 200, quantity: 5, hours: 12 },
      { id: "worker_room", name: "سكن عمال", power: 1000, quantity: 1, hours: 8 },
    ],
  },
  {
    id: "poultry_farm",
    name: "مزرعة دواجن",
    defaultDevices: [
      { id: "ventilation", name: "مراوح تهوية", power: 1500, quantity: 4, hours: 24 },
      { id: "heater", name: "دفاية", power: 2000, quantity: 2, hours: 12 },
      { id: "lighting", name: "إضاءة", power: 100, quantity: 20, hours: 16 },
      { id: "feed_motor", name: "موتور علف", power: 1000, quantity: 2, hours: 4 },
    ],
  },
  {
    id: "greenhouse",
    name: "بيوت محمية",
    defaultDevices: [
      { id: "cooling_pad_pump", name: "مضخة تبريد", power: 1000, quantity: 2, hours: 12 },
      { id: "exhaust_fan", name: "مروحة سحب", power: 1200, quantity: 4, hours: 12 },
      { id: "irrigation_pump", name: "مضخة ري", power: 2000, quantity: 1, hours: 4 },
    ],
  },
  {
    id: "factory",
    name: "مصنع",
    defaultDevices: [
      { id: "machine_motor", name: "موتور ماكينة", power: 10000, quantity: 3, hours: 16 },
      { id: "ac", name: "تكييف", power: 3000, quantity: 4, hours: 16 },
      { id: "lighting_highbay", name: "إضاءة مصانع", power: 250, quantity: 20, hours: 16 },
    ],
  },
  {
    id: "clinic",
    name: "مستوصف",
    defaultDevices: [
      { id: "medical_eq", name: "أجهزة طبية", power: 2000, quantity: 3, hours: 8 },
      { id: "ac", name: "مكيفات", power: 1500, quantity: 6, hours: 12 },
      { id: "fridge", name: "ثلاجة أدوية", power: 300, quantity: 2, hours: 24 },
      { id: "lighting", name: "إضاءة", power: 40, quantity: 20, hours: 12 },
    ],
  },
  {
    id: "hospital",
    name: "مستشفي",
    defaultDevices: [
      { id: "icu_eq", name: "أجهزة عناية مركزة", power: 3000, quantity: 5, hours: 24 },
      { id: "xray", name: "جهاز أشعة", power: 5000, quantity: 1, hours: 6 },
      { id: "central_ac", name: "تكييف مركزي", power: 50000, quantity: 1, hours: 24 },
      { id: "lighting", name: "إضاءة", power: 40, quantity: 100, hours: 24 },
    ],
  },
  {
    id: "bakery",
    name: "مخبز",
    defaultDevices: [
      { id: "mixer", name: "عجانة", power: 3000, quantity: 2, hours: 8 },
      { id: "oven_motor", name: "موتور فرن", power: 1500, quantity: 1, hours: 12 },
      { id: "lighting", name: "إضاءة", power: 100, quantity: 5, hours: 12 },
    ],
  },
  {
    id: "shop",
    name: "دكان",
    defaultDevices: [
      { id: "fridge", name: "ثلاجة عرض", power: 800, quantity: 2, hours: 24 },
      { id: "freezer", name: "ديب فريزر", power: 600, quantity: 1, hours: 24 },
      { id: "fan", name: "مروحة", power: 100, quantity: 2, hours: 14 },
      { id: "lighting", name: "إضاءة", power: 40, quantity: 4, hours: 14 },
    ],
  },
  {
    id: "workshop",
    name: "ورشة",
    defaultDevices: [
      { id: "welding", name: "ماكينة لحام", power: 5000, quantity: 1, hours: 6 },
      { id: "compressor", name: "كمبروسر هواء", power: 2500, quantity: 1, hours: 8 },
      { id: "grinder", name: "صاروخ تقطيع", power: 1000, quantity: 2, hours: 4 },
      { id: "lighting", name: "إضاءة", power: 150, quantity: 4, hours: 10 },
    ],
  },
  {
    id: "water_pump",
    name: "مضخة موية",
    defaultDevices: [
      { id: "pump_large", name: "مضخة غاطسة", power: 7500, quantity: 1, hours: 10 },
    ],
  },
  {
    id: "donkey_pump",
    name: "دونكي",
    defaultDevices: [
      { id: "surface_pump", name: "مضخة سطحية", power: 2200, quantity: 1, hours: 8 },
    ],
  },
  {
    id: "mosque",
    name: "مسجد",
    defaultDevices: [
      { id: "ac", name: "مكيفات", power: 2000, quantity: 6, hours: 6 },
      { id: "sound", name: "أجهزة صوتية", power: 500, quantity: 1, hours: 2 },
      { id: "lighting", name: "إضاءة", power: 40, quantity: 30, hours: 4 },
      { id: "water_cooler", name: "برادة مياه", power: 300, quantity: 2, hours: 24 },
    ],
  },
  {
    id: "printing_press",
    name: "مطبعة",
    defaultDevices: [
      { id: "printer_large", name: "ماكينة طباعة", power: 8000, quantity: 2, hours: 12 },
      { id: "cutter", name: "مقص ورق", power: 1500, quantity: 1, hours: 8 },
      { id: "ac", name: "تكييف", power: 2500, quantity: 2, hours: 12 },
    ],
  },
  {
    id: "coffee_shop",
    name: "كوفي شوب",
    defaultDevices: [
      { id: "espresso", name: "ماكينة قهوة", power: 3500, quantity: 1, hours: 16 },
      { id: "grinder", name: "مطحنة", power: 500, quantity: 2, hours: 4 },
      { id: "fridge", name: "ثلاجة عرض", power: 600, quantity: 2, hours: 24 },
      { id: "ac", name: "تكييف", power: 2000, quantity: 2, hours: 16 },
    ],
  },
  {
    id: "restaurant",
    name: "مطعم",
    defaultDevices: [
      { id: "fryer", name: "قلاية كهربائية", power: 3000, quantity: 2, hours: 10 },
      { id: "fridge_large", name: "ثلاجة كبيرة", power: 1200, quantity: 3, hours: 24 },
      { id: "exhaust", name: "شفاطات", power: 800, quantity: 2, hours: 14 },
      { id: "ac", name: "تكييف", power: 3000, quantity: 3, hours: 14 },
    ],
  },
  {
    id: "hotel",
    name: "فندق",
    defaultDevices: [
      { id: "room_ac", name: "مكيفات غرف", power: 1500, quantity: 20, hours: 12 },
      { id: "water_heater", name: "سخانات مياه", power: 2000, quantity: 10, hours: 4 },
      { id: "elevator", name: "مصعد", power: 10000, quantity: 1, hours: 5 },
      { id: "lighting", name: "إضاءة", power: 20, quantity: 100, hours: 12 },
    ],
  },
  {
    id: "bank",
    name: "بنك",
    defaultDevices: [
      { id: "computer", name: "أجهزة كمبيوتر", power: 300, quantity: 20, hours: 10 },
      { id: "ac", name: "مكيفات", power: 2500, quantity: 6, hours: 10 },
      { id: "server", name: "سيرفرات", power: 1500, quantity: 2, hours: 24 },
      { id: "atm", name: "صراف آلي", power: 500, quantity: 2, hours: 24 },
    ],
  },
  {
    id: "supermarket",
    name: "سوبر ماركت",
    defaultDevices: [
      { id: "chiller", name: "ثلاجات عرض ألبان", power: 1500, quantity: 4, hours: 24 },
      { id: "freezer", name: "فريزرات لحوم", power: 1200, quantity: 3, hours: 24 },
      { id: "ac", name: "تكييف", power: 3000, quantity: 3, hours: 16 },
      { id: "pos", name: "كاشير", power: 200, quantity: 3, hours: 16 },
    ],
  },
  {
    id: "gas_station",
    name: "طرمبة وقود",
    defaultDevices: [
      { id: "fuel_pump", name: "مضخة وقود", power: 1000, quantity: 4, hours: 12 },
      { id: "lighting", name: "كشافات إضاءة خارجية", power: 400, quantity: 6, hours: 12 },
      { id: "office_ac", name: "تكييف مكتب", power: 1500, quantity: 1, hours: 24 },
    ],
  },
  {
    id: "mining_company",
    name: "شركة تعدين",
    defaultDevices: [
      { id: "crusher", name: "كسارة صخور", power: 20000, quantity: 1, hours: 10 },
      { id: "water_pump", name: "مضخة غسيل", power: 5000, quantity: 2, hours: 12 },
      { id: "camp_power", name: "كهرباء سكن العمال", power: 10000, quantity: 1, hours: 24 },
    ],
  }
];

export const calculateSolarRequirements = (devices) => {
  // Total Daily Energy Consumption (Wh)
  const totalDailyWh = devices.reduce((total, device) => {
    return total + (device.power * device.quantity * device.hours);
  }, 0);

  // Total Peak Power Requirement (W) - assuming all run at once in worst case, or a diversity factor could be applied.
  // For simplicity, sum of all peak powers.
  const totalPeakPowerW = devices.reduce((total, device) => {
    return total + (device.power * device.quantity);
  }, 0);

  // System Size Requirements
  // Assuming average 5 peak sun hours per day.
  const peakSunHours = 5;
  // Apply a system efficiency loss factor (e.g., 80% efficiency)
  const systemEfficiency = 0.8;

  const requiredSolarArraySizeW = totalDailyWh / (peakSunHours * systemEfficiency);
  const requiredSolarArraySizeKW = requiredSolarArraySizeW / 1000;

  // Inverter Size
  // Should be at least 120% of the peak power requirement to handle surges
  const recommendedInverterSizeW = totalPeakPowerW * 1.2;
  const recommendedInverterSizeKW = recommendedInverterSizeW / 1000;

  // Battery Storage (assuming 1 day of autonomy, 50% Depth of Discharge for Lead Acid or 80% for Lithium)
  // Let's assume Lithium (80% DoD), system voltage 48V
  const batteryVoltage = 48;
  const depthOfDischarge = 0.8;
  const inverterEfficiency = 0.95;

  // Required battery capacity in Wh
  const batteryCapacityWh = totalDailyWh / (depthOfDischarge * inverterEfficiency);
  // Required battery capacity in Ah
  const batteryCapacityAh = batteryCapacityWh / batteryVoltage;

  return {
    totalDailyWh,
    totalDailyKWh: totalDailyWh / 1000,
    totalPeakPowerW,
    totalPeakPowerKW: totalPeakPowerW / 1000,
    requiredSolarArraySizeKW,
    recommendedInverterSizeKW,
    batteryCapacityWh,
    batteryCapacityKWh: batteryCapacityWh / 1000,
    batteryCapacityAh,
    batteryVoltage
  };
};
