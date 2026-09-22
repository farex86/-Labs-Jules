// Solar Calculator Business Logic and Configuration

export const FACILITY_TYPES = [
  {
    id: "ice_factory",
    name: "مصنع ثلج",
    devices: [
      { id: "1", name: "ماكينة صنع الثلج", power: 5000, quantity: 2, hours: 24 },
      { id: "2", name: "إضاءة", power: 40, quantity: 10, hours: 12 },
      { id: "3", name: "مضخة مياه", power: 1500, quantity: 1, hours: 10 },
    ]
  },
  {
    id: "company",
    name: "شركة",
    devices: [
      { id: "1", name: "حاسوب", power: 150, quantity: 15, hours: 8 },
      { id: "2", name: "مكيف هواء", power: 1500, quantity: 3, hours: 8 },
      { id: "3", name: "إضاءة", power: 40, quantity: 30, hours: 10 },
      { id: "4", name: "طابعة", power: 300, quantity: 2, hours: 2 },
    ]
  },
  {
    id: "farm",
    name: "مزرعة",
    devices: [
      { id: "1", name: "مضخة مياه (غطاس)", power: 3000, quantity: 1, hours: 8 },
      { id: "2", name: "إضاءة خارجية", power: 100, quantity: 5, hours: 12 },
      { id: "3", name: "ثلاجة صغيرة", power: 200, quantity: 1, hours: 24 },
    ]
  },
  {
    id: "poultry_farm",
    name: "مزرعة دواجن",
    devices: [
      { id: "1", name: "مراوح تهوية", power: 500, quantity: 4, hours: 24 },
      { id: "2", name: "إضاءة", power: 40, quantity: 20, hours: 16 },
      { id: "3", name: "مضخة مياه", power: 1100, quantity: 1, hours: 6 },
      { id: "4", name: "سخانات", power: 2000, quantity: 2, hours: 10 },
    ]
  },
  {
    id: "greenhouse",
    name: "بيوت محمية",
    devices: [
      { id: "1", name: "مضخة مياه للري", power: 1500, quantity: 1, hours: 4 },
      { id: "2", name: "مراوح تبريد", power: 750, quantity: 2, hours: 12 },
      { id: "3", name: "إضاءة", power: 40, quantity: 10, hours: 12 },
    ]
  },
  {
    id: "factory",
    name: "مصنع",
    devices: [
      { id: "1", name: "آلات تصنيع", power: 10000, quantity: 2, hours: 12 },
      { id: "2", name: "إضاءة قوية", power: 100, quantity: 40, hours: 14 },
      { id: "3", name: "مكيفات هواء مركزية", power: 5000, quantity: 2, hours: 12 },
    ]
  },
  {
    id: "clinic",
    name: "مستوصف",
    devices: [
      { id: "1", name: "أجهزة طبية", power: 2000, quantity: 3, hours: 10 },
      { id: "2", name: "إضاءة", power: 40, quantity: 20, hours: 12 },
      { id: "3", name: "مكيف هواء", power: 1500, quantity: 4, hours: 12 },
      { id: "4", name: "ثلاجة أدوية", power: 300, quantity: 2, hours: 24 },
    ]
  },
  {
    id: "hospital",
    name: "مستشفى",
    devices: [
      { id: "1", name: "أجهزة طبية متقدمة", power: 5000, quantity: 5, hours: 24 },
      { id: "2", name: "إضاءة", power: 40, quantity: 100, hours: 24 },
      { id: "3", name: "مكيفات هواء مركزية", power: 10000, quantity: 3, hours: 24 },
      { id: "4", name: "مضخات مياه", power: 3000, quantity: 2, hours: 12 },
    ]
  },
  {
    id: "bakery",
    name: "مخبز",
    devices: [
      { id: "1", name: "عجانة", power: 2000, quantity: 2, hours: 8 },
      { id: "2", name: "فرن كهربائي (إذا وجد)", power: 15000, quantity: 1, hours: 10 },
      { id: "3", name: "إضاءة", power: 40, quantity: 10, hours: 14 },
      { id: "4", name: "مكيف/مروحة", power: 500, quantity: 2, hours: 14 },
    ]
  },
  {
    id: "shop",
    name: "دكان",
    devices: [
      { id: "1", name: "ثلاجة عرض", power: 800, quantity: 2, hours: 24 },
      { id: "2", name: "إضاءة", power: 40, quantity: 6, hours: 14 },
      { id: "3", name: "مروحة سقف", power: 80, quantity: 2, hours: 14 },
    ]
  },
  {
    id: "workshop",
    name: "ورشة",
    devices: [
      { id: "1", name: "آلة لحام", power: 4000, quantity: 1, hours: 4 },
      { id: "2", name: "صاروخ قص/جلخ", power: 2000, quantity: 2, hours: 4 },
      { id: "3", name: "كمبروسر هواء", power: 2200, quantity: 1, hours: 6 },
      { id: "4", name: "إضاءة", power: 100, quantity: 5, hours: 10 },
    ]
  },
  {
    id: "water_pump",
    name: "مضخة موية",
    devices: [
      { id: "1", name: "مضخة مياه كبيرة", power: 5500, quantity: 1, hours: 8 },
    ]
  },
  {
    id: "donkey",
    name: "دونكي",
    devices: [
      { id: "1", name: "مضخة مياه للحيوانات", power: 1500, quantity: 1, hours: 6 },
      { id: "2", name: "إضاءة بسيطة", power: 20, quantity: 2, hours: 12 },
    ]
  },
  {
    id: "mosque",
    name: "مسجد",
    devices: [
      { id: "1", name: "مكيف هواء", power: 2000, quantity: 4, hours: 6 },
      { id: "2", name: "مكبر صوت", power: 150, quantity: 1, hours: 3 },
      { id: "3", name: "إضاءة", power: 40, quantity: 20, hours: 8 },
      { id: "4", name: "برادة مياه", power: 300, quantity: 1, hours: 24 },
    ]
  },
  {
    id: "printing_press",
    name: "مطبعة",
    devices: [
      { id: "1", name: "آلات طباعة", power: 3000, quantity: 3, hours: 10 },
      { id: "2", name: "حاسوب", power: 150, quantity: 5, hours: 10 },
      { id: "3", name: "مكيف هواء", power: 1500, quantity: 2, hours: 10 },
      { id: "4", name: "إضاءة", power: 40, quantity: 15, hours: 12 },
    ]
  },
  {
    id: "coffee_shop",
    name: "كوفي شوب",
    devices: [
      { id: "1", name: "آلة إسبريسو", power: 3000, quantity: 1, hours: 14 },
      { id: "2", name: "طاحونة قهوة", power: 350, quantity: 2, hours: 4 },
      { id: "3", name: "ثلاجة عرض", power: 800, quantity: 1, hours: 24 },
      { id: "4", name: "مكيف هواء", power: 2000, quantity: 2, hours: 14 },
      { id: "5", name: "إضاءة ديكور", power: 20, quantity: 30, hours: 14 },
    ]
  },
  {
    id: "restaurant",
    name: "مطعم",
    devices: [
      { id: "1", name: "ثلاجة كبيرة", power: 1000, quantity: 3, hours: 24 },
      { id: "2", name: "فريزر", power: 1200, quantity: 2, hours: 24 },
      { id: "3", name: "مكيف هواء", power: 2500, quantity: 4, hours: 16 },
      { id: "4", name: "إضاءة", power: 40, quantity: 30, hours: 16 },
      { id: "5", name: "مراوح شفط", power: 500, quantity: 2, hours: 16 },
    ]
  },
  {
    id: "hotel",
    name: "فندق",
    devices: [
      { id: "1", name: "مكيف هواء غرف", power: 1500, quantity: 20, hours: 12 },
      { id: "2", name: "إضاءة عامة", power: 40, quantity: 100, hours: 14 },
      { id: "3", name: "سخانات مياه", power: 2000, quantity: 5, hours: 6 },
      { id: "4", name: "ثلاجات غرف", power: 100, quantity: 20, hours: 24 },
    ]
  },
  {
    id: "bank",
    name: "بنك",
    devices: [
      { id: "1", name: "حاسوب", power: 150, quantity: 20, hours: 10 },
      { id: "2", name: "صراف آلي (ATM)", power: 500, quantity: 3, hours: 24 },
      { id: "3", name: "مكيف هواء مركزي", power: 5000, quantity: 2, hours: 10 },
      { id: "4", name: "إضاءة", power: 40, quantity: 50, hours: 12 },
    ]
  },
  {
    id: "supermarket",
    name: "سوبر ماركت",
    devices: [
      { id: "1", name: "ثلاجات عرض مفتوحة", power: 2000, quantity: 5, hours: 24 },
      { id: "2", name: "فريزر أفقي", power: 1000, quantity: 4, hours: 24 },
      { id: "3", name: "مكيف هواء مركزي", power: 5000, quantity: 2, hours: 16 },
      { id: "4", name: "إضاءة", power: 40, quantity: 40, hours: 16 },
    ]
  },
  {
    id: "gas_station",
    name: "طرمبة وقود",
    devices: [
      { id: "1", name: "مضخات وقود", power: 1500, quantity: 4, hours: 24 },
      { id: "2", name: "إضاءة المظلة", power: 150, quantity: 10, hours: 12 },
      { id: "3", name: "مكيف هواء المكتب", power: 1500, quantity: 1, hours: 24 },
      { id: "4", name: "ثلاجة مشروبات", power: 800, quantity: 2, hours: 24 },
    ]
  },
  {
    id: "mining_company",
    name: "شركة تعدين",
    devices: [
      { id: "1", name: "معدات ثقيلة (ورشة)", power: 5000, quantity: 2, hours: 10 },
      { id: "2", name: "إضاءة كاشفة", power: 1000, quantity: 10, hours: 12 },
      { id: "3", name: "مكيفات هواء للكامبات", power: 1500, quantity: 10, hours: 12 },
      { id: "4", name: "مضخات مياه ضخمة", power: 10000, quantity: 1, hours: 12 },
    ]
  }
];

// Constants for calculations
const SYSTEM_LOSS_FACTOR = 1.3; // 30% energy loss in inverter/batteries/wiring
const PEAK_SUN_HOURS = 5.5; // Average peak sun hours in Sudan/region
const BATTERY_VOLTAGE = 48; // Standard 48V battery system
const BATTERY_DOD = 0.5; // Depth of Discharge (50% for Lead Acid, could be adjusted for Lithium)
const DAYS_OF_AUTONOMY = 1.5; // Backup days
const PANEL_WATTAGE = 550; // Standard modern solar panel wattage

export const calculateTotalDailyConsumption = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.power * device.quantity * device.hours);
  }, 0); // result in Watt-hours (Wh)
};

export const calculateSystemRequirements = (devices) => {
  const dailyConsumptionWh = calculateTotalDailyConsumption(devices);

  if (dailyConsumptionWh === 0) {
    return {
      dailyConsumptionKWh: 0,
      systemSizeKW: 0,
      numberOfPanels: 0,
      batteryCapacityAh: 0,
      inverterSizeKW: 0
    };
  }

  // 1. Total energy needed considering system losses
  const totalEnergyNeededWh = dailyConsumptionWh * SYSTEM_LOSS_FACTOR;

  // 2. Solar Array Size
  const solarArrayWattage = totalEnergyNeededWh / PEAK_SUN_HOURS;
  const systemSizeKW = solarArrayWattage / 1000;
  const numberOfPanels = Math.ceil(solarArrayWattage / PANEL_WATTAGE);

  // 3. Battery Bank Capacity
  const batteryCapacityAh = (totalEnergyNeededWh * DAYS_OF_AUTONOMY) / (BATTERY_VOLTAGE * BATTERY_DOD);

  // 4. Inverter Size (based on peak instantaneous power, assuming all run at once for simplicity + 25% safety margin)
  const peakPowerW = devices.reduce((total, device) => total + (device.power * device.quantity), 0);
  const inverterSizeKW = (peakPowerW * 1.25) / 1000;

  return {
    dailyConsumptionKWh: (dailyConsumptionWh / 1000).toFixed(2),
    systemSizeKW: systemSizeKW.toFixed(2),
    numberOfPanels: numberOfPanels,
    batteryCapacityAh: Math.ceil(batteryCapacityAh),
    inverterSizeKW: Math.ceil(inverterSizeKW)
  };
};
