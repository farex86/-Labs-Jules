export const FACILITY_TYPES = [
  {
    id: "ice_factory",
    name: "مصنع ثلج",
    defaultDevices: [
      { id: "1", name: "ماكينة صنع الثلج", quantity: 2, power_watts: 5000, hours_per_day: 12 },
      { id: "2", name: "غرفة تبريد", quantity: 1, power_watts: 3000, hours_per_day: 24 },
      { id: "3", name: "إضاءة", quantity: 10, power_watts: 20, hours_per_day: 12 }
    ]
  },
  {
    id: "company",
    name: "شركة",
    defaultDevices: [
      { id: "1", name: "مكيف هواء", quantity: 5, power_watts: 1500, hours_per_day: 8 },
      { id: "2", name: "كمبيوتر", quantity: 10, power_watts: 200, hours_per_day: 8 },
      { id: "3", name: "إضاءة", quantity: 20, power_watts: 20, hours_per_day: 10 },
      { id: "4", name: "طابعة", quantity: 2, power_watts: 500, hours_per_day: 2 }
    ]
  },
  {
    id: "farm",
    name: "مزرعة",
    defaultDevices: [
      { id: "1", name: "مضخة مياه غاطسة", quantity: 1, power_watts: 4000, hours_per_day: 6 },
      { id: "2", name: "إضاءة خارجية", quantity: 5, power_watts: 50, hours_per_day: 12 }
    ]
  },
  {
    id: "poultry_farm",
    name: "مزرعة دواجن",
    defaultDevices: [
      { id: "1", name: "مراوح تهوية", quantity: 4, power_watts: 500, hours_per_day: 24 },
      { id: "2", name: "إضاءة", quantity: 20, power_watts: 20, hours_per_day: 16 },
      { id: "3", name: "نظام تدفئة", quantity: 2, power_watts: 2000, hours_per_day: 12 }
    ]
  },
  {
    id: "greenhouses",
    name: "بيوت محمية",
    defaultDevices: [
      { id: "1", name: "مضخة ري", quantity: 2, power_watts: 1500, hours_per_day: 4 },
      { id: "2", name: "مراوح تهوية", quantity: 4, power_watts: 400, hours_per_day: 10 }
    ]
  },
  {
    id: "factory",
    name: "مصنع",
    defaultDevices: [
      { id: "1", name: "آلات تصنيع", quantity: 5, power_watts: 5000, hours_per_day: 12 },
      { id: "2", name: "إضاءة صناعية", quantity: 30, power_watts: 100, hours_per_day: 12 }
    ]
  },
  {
    id: "clinic",
    name: "مستوصف",
    defaultDevices: [
      { id: "1", name: "مكيف هواء", quantity: 6, power_watts: 1500, hours_per_day: 12 },
      { id: "2", name: "إضاءة", quantity: 30, power_watts: 20, hours_per_day: 12 },
      { id: "3", name: "أجهزة طبية صغيرة", quantity: 5, power_watts: 300, hours_per_day: 8 },
      { id: "4", name: "ثلاجة أدوية", quantity: 2, power_watts: 250, hours_per_day: 24 }
    ]
  },
  {
    id: "hospital",
    name: "مستشفي",
    defaultDevices: [
      { id: "1", name: "مكيف هواء مركزي", quantity: 2, power_watts: 10000, hours_per_day: 24 },
      { id: "2", name: "أجهزة طبية (عناية)", quantity: 10, power_watts: 1000, hours_per_day: 24 },
      { id: "3", name: "إضاءة", quantity: 100, power_watts: 20, hours_per_day: 24 },
      { id: "4", name: "مصاعد", quantity: 2, power_watts: 5000, hours_per_day: 12 }
    ]
  },
  {
    id: "bakery",
    name: "مخبز",
    defaultDevices: [
      { id: "1", name: "عجانة كهربائية", quantity: 2, power_watts: 3000, hours_per_day: 8 },
      { id: "2", name: "فرن كهربائي", quantity: 1, power_watts: 10000, hours_per_day: 12 },
      { id: "3", name: "إضاءة", quantity: 10, power_watts: 20, hours_per_day: 14 }
    ]
  },
  {
    id: "shop",
    name: "دكان",
    defaultDevices: [
      { id: "1", name: "ثلاجة عرض", quantity: 2, power_watts: 400, hours_per_day: 24 },
      { id: "2", name: "مروحة سقف", quantity: 2, power_watts: 75, hours_per_day: 12 },
      { id: "3", name: "إضاءة", quantity: 4, power_watts: 20, hours_per_day: 12 }
    ]
  },
  {
    id: "workshop",
    name: "ورشة",
    defaultDevices: [
      { id: "1", name: "ماكينة لحام", quantity: 1, power_watts: 4000, hours_per_day: 4 },
      { id: "2", name: "صاروخ قطعية", quantity: 2, power_watts: 1000, hours_per_day: 3 },
      { id: "3", name: "شنيور", quantity: 2, power_watts: 600, hours_per_day: 3 },
      { id: "4", name: "إضاءة", quantity: 6, power_watts: 50, hours_per_day: 10 }
    ]
  },
  {
    id: "water_pump",
    name: "مضخة موية",
    defaultDevices: [
      { id: "1", name: "مضخة سطحية", quantity: 1, power_watts: 1500, hours_per_day: 8 }
    ]
  },
  {
    id: "donkey",
    name: "دونكي",
    defaultDevices: [
      { id: "1", name: "مضخة مياه غاطسة", quantity: 1, power_watts: 5500, hours_per_day: 10 }
    ]
  },
  {
    id: "mosque",
    name: "مسجد",
    defaultDevices: [
      { id: "1", name: "مكيف هواء", quantity: 6, power_watts: 1500, hours_per_day: 6 },
      { id: "2", name: "مراوح", quantity: 10, power_watts: 75, hours_per_day: 6 },
      { id: "3", name: "مكبرات صوت", quantity: 1, power_watts: 300, hours_per_day: 3 },
      { id: "4", name: "إضاءة", quantity: 30, power_watts: 20, hours_per_day: 8 }
    ]
  },
  {
    id: "printing_press",
    name: "مطبعة",
    defaultDevices: [
      { id: "1", name: "ماكينة طباعة", quantity: 2, power_watts: 3000, hours_per_day: 10 },
      { id: "2", name: "كمبيوتر تصميم", quantity: 3, power_watts: 300, hours_per_day: 10 },
      { id: "3", name: "إضاءة", quantity: 15, power_watts: 40, hours_per_day: 12 }
    ]
  },
  {
    id: "coffee_shop",
    name: "كوفي شوب",
    defaultDevices: [
      { id: "1", name: "ماكينة اسبريسو", quantity: 1, power_watts: 3500, hours_per_day: 14 },
      { id: "2", name: "ثلاجة عرض", quantity: 2, power_watts: 500, hours_per_day: 24 },
      { id: "3", name: "صانعة ثلج", quantity: 1, power_watts: 400, hours_per_day: 24 },
      { id: "4", name: "مكيف هواء", quantity: 3, power_watts: 1500, hours_per_day: 14 },
      { id: "5", name: "إضاءة", quantity: 20, power_watts: 15, hours_per_day: 14 }
    ]
  },
  {
    id: "restaurant",
    name: "مطعم",
    defaultDevices: [
      { id: "1", name: "ثلاجة كبيرة", quantity: 3, power_watts: 800, hours_per_day: 24 },
      { id: "2", name: "ديب فريزر", quantity: 2, power_watts: 600, hours_per_day: 24 },
      { id: "3", name: "مكيف هواء", quantity: 4, power_watts: 2000, hours_per_day: 14 },
      { id: "4", name: "شفاطات هواء", quantity: 2, power_watts: 500, hours_per_day: 14 },
      { id: "5", name: "إضاءة", quantity: 30, power_watts: 20, hours_per_day: 14 }
    ]
  },
  {
    id: "hotel",
    name: "فندق",
    defaultDevices: [
      { id: "1", name: "مكيف هواء غرف", quantity: 20, power_watts: 1200, hours_per_day: 12 },
      { id: "2", name: "ثلاجة غرف", quantity: 20, power_watts: 150, hours_per_day: 24 },
      { id: "3", name: "إضاءة", quantity: 100, power_watts: 15, hours_per_day: 10 },
      { id: "4", name: "مصعد", quantity: 1, power_watts: 5000, hours_per_day: 24 },
      { id: "5", name: "سخانات مياه", quantity: 20, power_watts: 1500, hours_per_day: 3 }
    ]
  },
  {
    id: "bank",
    name: "بنك",
    defaultDevices: [
      { id: "1", name: "مكيف هواء مركزي", quantity: 1, power_watts: 8000, hours_per_day: 10 },
      { id: "2", name: "كمبيوتر", quantity: 15, power_watts: 200, hours_per_day: 10 },
      { id: "3", name: "صراف آلي (ATM)", quantity: 2, power_watts: 400, hours_per_day: 24 },
      { id: "4", name: "إضاءة", quantity: 40, power_watts: 20, hours_per_day: 10 },
      { id: "5", name: "سيرفر", quantity: 2, power_watts: 500, hours_per_day: 24 }
    ]
  },
  {
    id: "supermarket",
    name: "سوبر ماركت",
    defaultDevices: [
      { id: "1", name: "ثلاجة عرض كبيرة", quantity: 5, power_watts: 1000, hours_per_day: 24 },
      { id: "2", name: "ديب فريزر عرض", quantity: 3, power_watts: 800, hours_per_day: 24 },
      { id: "3", name: "مكيف هواء", quantity: 4, power_watts: 2000, hours_per_day: 16 },
      { id: "4", name: "إضاءة", quantity: 50, power_watts: 20, hours_per_day: 16 },
      { id: "5", name: "أجهزة كاشير", quantity: 3, power_watts: 150, hours_per_day: 16 }
    ]
  },
  {
    id: "gas_station",
    name: "طرمبة وقود",
    defaultDevices: [
      { id: "1", name: "مضخة وقود", quantity: 4, power_watts: 1000, hours_per_day: 8 },
      { id: "2", name: "إضاءة خارجية", quantity: 15, power_watts: 100, hours_per_day: 12 },
      { id: "3", name: "مكيف هواء (مكتب)", quantity: 2, power_watts: 1500, hours_per_day: 24 }
    ]
  },
  {
    id: "mining_company",
    name: "شركة تعدين",
    defaultDevices: [
      { id: "1", name: "معدات حفر وتكسير", quantity: 2, power_watts: 10000, hours_per_day: 8 },
      { id: "2", name: "سيور ناقلة", quantity: 2, power_watts: 5000, hours_per_day: 8 },
      { id: "3", name: "إضاءة قوية", quantity: 20, power_watts: 200, hours_per_day: 12 },
      { id: "4", name: "مكيفات هواء للكامب", quantity: 10, power_watts: 1500, hours_per_day: 12 }
    ]
  }
];

export const calculateSolarRequirements = (devices) => {
  let totalDailyEnergyWh = 0;
  let totalPeakPowerW = 0;

  devices.forEach(device => {
    const qty = parseInt(device.quantity, 10) || 0;
    const power = parseFloat(device.power_watts) || 0;
    const hours = parseFloat(device.hours_per_day) || 0;

    const totalPower = qty * power;
    totalPeakPowerW += totalPower;
    totalDailyEnergyWh += totalPower * hours;
  });

  // Calculate Inverter Size (W)
  // Usually Total Peak Power + 25% margin for surges
  const inverterSizeW = totalPeakPowerW * 1.25;

  // Calculate Battery Capacity
  // Usable Wh needed for 1 day autonomy: Total Daily Energy Wh * 1.2 margin
  const batteryCapacityWh = totalDailyEnergyWh * 1.2;

  // Solar Panels Needed
  // Average Peak Sun Hours (PSH) in generic location = 5 hours/day
  // System Efficiency = 80%
  const solarArraySizeW = totalDailyEnergyWh / (5 * 0.8);

  // Assuming standard 450W panels
  const panelSizeW = 450;
  const panelsCount = Math.ceil(solarArraySizeW / panelSizeW);

  return {
    totalDailyEnergyWh,
    totalPeakPowerW,
    inverterSizeW,
    batteryCapacityWh,
    solarArraySizeW,
    panelsCount,
    panelSizeW
  };
};
