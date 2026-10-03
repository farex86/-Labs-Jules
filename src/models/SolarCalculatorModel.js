export const FACILITY_TYPES = [
  {
    id: "ice_factory",
    name: "مصنع ثلج",
    defaultDevices: [
      { id: "1", name: "ماكينة صنع الثلج", power: 15000, quantity: 1, hours: 24 },
      { id: "2", name: "غرفة تبريد", power: 5000, quantity: 2, hours: 24 },
      { id: "3", name: "إضاءة", power: 40, quantity: 20, hours: 12 },
    ]
  },
  {
    id: "company",
    name: "شركة",
    defaultDevices: [
      { id: "1", name: "مكيف هواء سبليت", power: 1500, quantity: 5, hours: 8 },
      { id: "2", name: "كمبيوتر مكتبي", power: 250, quantity: 10, hours: 8 },
      { id: "3", name: "إضاءة", power: 20, quantity: 30, hours: 8 },
      { id: "4", name: "طابعة/ماكينة تصوير", power: 500, quantity: 2, hours: 4 },
      { id: "5", name: "ثلاجة صغيرة", power: 150, quantity: 1, hours: 24 },
    ]
  },
  {
    id: "farm",
    name: "مزرعة",
    defaultDevices: [
      { id: "1", name: "مضخة غاطسة", power: 3000, quantity: 1, hours: 8 },
      { id: "2", name: "إضاءة خارجية", power: 50, quantity: 10, hours: 12 },
      { id: "3", name: "تلفزيون", power: 100, quantity: 1, hours: 4 },
      { id: "4", name: "ثلاجة", power: 200, quantity: 1, hours: 24 },
    ]
  },
  {
    id: "poultry_farm",
    name: "مزرعة دواجن",
    defaultDevices: [
      { id: "1", name: "مراوح شفط", power: 750, quantity: 6, hours: 24 },
      { id: "2", name: "إضاءة", power: 20, quantity: 50, hours: 16 },
      { id: "3", name: "نظام تبريد (خلايا)", power: 1500, quantity: 2, hours: 12 },
      { id: "4", name: "معالف أوتوماتيكية", power: 500, quantity: 1, hours: 4 },
    ]
  },
  {
    id: "greenhouses",
    name: "بيوت محمية",
    defaultDevices: [
      { id: "1", name: "مراوح شفط", power: 750, quantity: 4, hours: 12 },
      { id: "2", name: "مضخة ري", power: 1500, quantity: 1, hours: 4 },
      { id: "3", name: "نظام تبريد", power: 1500, quantity: 1, hours: 8 },
    ]
  },
  {
    id: "factory",
    name: "مصنع",
    defaultDevices: [
      { id: "1", name: "ماكينات إنتاج", power: 10000, quantity: 3, hours: 12 },
      { id: "2", name: "إضاءة قوية", power: 100, quantity: 40, hours: 12 },
      { id: "3", name: "مكيفات هواء", power: 3000, quantity: 5, hours: 12 },
    ]
  },
  {
    id: "clinic",
    name: "مستوصف",
    defaultDevices: [
      { id: "1", name: "مكيف هواء", power: 1500, quantity: 10, hours: 12 },
      { id: "2", name: "إضاءة", power: 20, quantity: 50, hours: 12 },
      { id: "3", name: "أجهزة طبية (متوسط)", power: 1000, quantity: 5, hours: 8 },
      { id: "4", name: "ثلاجة أدوية", power: 250, quantity: 2, hours: 24 },
      { id: "5", name: "كمبيوتر", power: 250, quantity: 5, hours: 12 },
    ]
  },
  {
    id: "hospital",
    name: "مستشفى",
    defaultDevices: [
      { id: "1", name: "مكيف هواء مركزي", power: 50000, quantity: 1, hours: 24 },
      { id: "2", name: "إضاءة", power: 20, quantity: 200, hours: 24 },
      { id: "3", name: "أجهزة العناية المركزة", power: 1500, quantity: 10, hours: 24 },
      { id: "4", name: "جهاز أشعة", power: 5000, quantity: 1, hours: 4 },
      { id: "5", name: "ثلاجات بنك الدم/أدوية", power: 300, quantity: 5, hours: 24 },
    ]
  },
  {
    id: "bakery",
    name: "مخبز",
    defaultDevices: [
      { id: "1", name: "فرن كهربائي/غاز (مراوح)", power: 3000, quantity: 2, hours: 12 },
      { id: "2", name: "عجانة", power: 2000, quantity: 2, hours: 6 },
      { id: "3", name: "قطاعة عجين", power: 1000, quantity: 1, hours: 4 },
      { id: "4", name: "إضاءة", power: 40, quantity: 10, hours: 14 },
    ]
  },
  {
    id: "shop",
    name: "دكان",
    defaultDevices: [
      { id: "1", name: "إضاءة", power: 20, quantity: 6, hours: 12 },
      { id: "2", name: "مروحة سقف/مروحة حائط", power: 60, quantity: 2, hours: 12 },
      { id: "3", name: "ثلاجة عرض (مشروبات)", power: 400, quantity: 1, hours: 24 },
    ]
  },
  {
    id: "workshop",
    name: "ورشة",
    defaultDevices: [
      { id: "1", name: "ماكينة لحام", power: 4000, quantity: 1, hours: 4 },
      { id: "2", name: "صاروخ تقطيع/جلخ", power: 1000, quantity: 2, hours: 3 },
      { id: "3", name: "شنيور/دريل", power: 600, quantity: 2, hours: 2 },
      { id: "4", name: "إضاءة قوية", power: 100, quantity: 4, hours: 8 },
    ]
  },
  {
    id: "water_pump",
    name: "مضخة موية",
    defaultDevices: [
      { id: "1", name: "مضخة غاطسة", power: 5000, quantity: 1, hours: 6 },
      { id: "2", name: "إضاءة", power: 20, quantity: 2, hours: 12 },
    ]
  },
  {
    id: "donkey",
    name: "دونكي",
    defaultDevices: [
      { id: "1", name: "مضخة سطحية", power: 1500, quantity: 1, hours: 4 },
      { id: "2", name: "إضاءة", power: 20, quantity: 2, hours: 12 },
    ]
  },
  {
    id: "mosque",
    name: "مسجد",
    defaultDevices: [
      { id: "1", name: "مكيف هواء سبليت", power: 1500, quantity: 6, hours: 4 },
      { id: "2", name: "مراوح سقف", power: 60, quantity: 10, hours: 6 },
      { id: "3", name: "إضاءة", power: 20, quantity: 30, hours: 5 },
      { id: "4", name: "مكبرات صوت", power: 200, quantity: 1, hours: 2 },
    ]
  },
  {
    id: "printing_press",
    name: "مطبعة",
    defaultDevices: [
      { id: "1", name: "ماكينة طباعة كبيرة", power: 5000, quantity: 2, hours: 8 },
      { id: "2", name: "مقص ورق كهربائي", power: 1000, quantity: 1, hours: 4 },
      { id: "3", name: "مكيف هواء", power: 2000, quantity: 3, hours: 8 },
      { id: "4", name: "إضاءة", power: 40, quantity: 20, hours: 10 },
      { id: "5", name: "كمبيوتر تصميم", power: 400, quantity: 3, hours: 8 },
    ]
  },
  {
    id: "coffee_shop",
    name: "كوفي شوب",
    defaultDevices: [
      { id: "1", name: "ماكينة اسبريسو", power: 3000, quantity: 1, hours: 8 },
      { id: "2", name: "مطحنة قهوة", power: 500, quantity: 2, hours: 4 },
      { id: "3", name: "ثلاجة عرض حلويات", power: 500, quantity: 1, hours: 24 },
      { id: "4", name: "صانعة ثلج صغيرة", power: 800, quantity: 1, hours: 24 },
      { id: "5", name: "مكيف هواء", power: 1500, quantity: 2, hours: 12 },
      { id: "6", name: "إضاءة ديكور", power: 10, quantity: 50, hours: 12 },
    ]
  },
  {
    id: "restaurant",
    name: "مطعم",
    defaultDevices: [
      { id: "1", name: "ثلاجة كبيرة/فريزر", power: 800, quantity: 3, hours: 24 },
      { id: "2", name: "مراوح شفط مطبخ", power: 1000, quantity: 2, hours: 12 },
      { id: "3", name: "مكيف هواء", power: 2000, quantity: 4, hours: 12 },
      { id: "4", name: "إضاءة", power: 20, quantity: 40, hours: 14 },
      { id: "5", name: "خلاط/عجانة", power: 1000, quantity: 2, hours: 3 },
    ]
  },
  {
    id: "hotel",
    name: "فندق",
    defaultDevices: [
      { id: "1", name: "مكيفات هواء (غرف)", power: 1000, quantity: 20, hours: 16 },
      { id: "2", name: "إضاءة عامة", power: 20, quantity: 100, hours: 24 },
      { id: "3", name: "ثلاجات صغيرة (غرف)", power: 100, quantity: 20, hours: 24 },
      { id: "4", name: "مصعد", power: 5000, quantity: 1, hours: 6 },
      { id: "5", name: "سخانات مياه", power: 1500, quantity: 20, hours: 4 },
    ]
  },
  {
    id: "bank",
    name: "بنك",
    defaultDevices: [
      { id: "1", name: "تكييف مركزي/سبليت", power: 2000, quantity: 10, hours: 10 },
      { id: "2", name: "كمبيوترات", power: 250, quantity: 20, hours: 10 },
      { id: "3", name: "إضاءة", power: 20, quantity: 60, hours: 10 },
      { id: "4", name: "صراف آلي (ATM)", power: 400, quantity: 2, hours: 24 },
      { id: "5", name: "سيرفر", power: 800, quantity: 1, hours: 24 },
    ]
  },
  {
    id: "supermarket",
    name: "سوبر ماركت",
    defaultDevices: [
      { id: "1", name: "ثلاجات عرض (تجميد)", power: 1500, quantity: 4, hours: 24 },
      { id: "2", name: "ثلاجات عرض (تبريد)", power: 1000, quantity: 6, hours: 24 },
      { id: "3", name: "مكيفات هواء", power: 2000, quantity: 4, hours: 14 },
      { id: "4", name: "إضاءة", power: 40, quantity: 50, hours: 14 },
      { id: "5", name: "نقاط بيع (كاشير)", power: 150, quantity: 3, hours: 14 },
    ]
  },
  {
    id: "gas_station",
    name: "طرمبة وقود",
    defaultDevices: [
      { id: "1", name: "مضخات وقود", power: 750, quantity: 4, hours: 8 },
      { id: "2", name: "إضاءة مظلة خارجية", power: 150, quantity: 12, hours: 12 },
      { id: "3", name: "مكيف مكتب/ماركت", power: 1500, quantity: 2, hours: 24 },
      { id: "4", name: "ثلاجات مشروبات", power: 400, quantity: 2, hours: 24 },
    ]
  },
  {
    id: "mining_company",
    name: "شركة تعدين",
    defaultDevices: [
      { id: "1", name: "طواحين/كسارات", power: 20000, quantity: 2, hours: 16 },
      { id: "2", name: "مضخات مياه/ملاط", power: 5000, quantity: 3, hours: 16 },
      { id: "3", name: "إضاءة كاشفة", power: 500, quantity: 20, hours: 12 },
      { id: "4", name: "مكيفات مكاتب", power: 1500, quantity: 5, hours: 12 },
      { id: "5", name: "ماكينة لحام", power: 5000, quantity: 2, hours: 4 },
    ]
  }
];

export const calculateTotalEnergy = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.power * device.quantity * device.hours);
  }, 0);
};

export const calculateRecommendedSystem = (totalEnergyWh) => {
  // Add 20% system loss margin
  const energyWithLosses = totalEnergyWh * 1.2;

  // Assume average 5 peak sun hours per day
  const requiredSolarKw = energyWithLosses / 5 / 1000;

  // Recommend battery capacity for 1 day autonomy (assuming 50% Depth of Discharge)
  const requiredBatteryKwh = (totalEnergyWh / 1000) * 2;

  // Recommend inverter size (assuming 1.5x of peak load if all devices run at once)
  // For simplicity here, we just use a baseline based on energy,
  // but a real calculator would sum peak power.

  return {
    solarPanelsKw: Math.ceil(requiredSolarKw * 10) / 10,
    batteryKwh: Math.ceil(requiredBatteryKwh * 10) / 10,
    dailyConsumptionKwh: Math.round(totalEnergyWh / 100) / 10
  };
};
