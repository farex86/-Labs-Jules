export const FACILITY_TYPES = [
  {
    id: "ice_factory",
    name: "مصنع ثلج",
    defaultAppliances: [
      { id: "1", name: "ماكينة صنع الثلج", power: 5000, quantity: 2, hours: 24 },
      { id: "2", name: "غرفة تبريد", power: 3000, quantity: 1, hours: 24 },
      { id: "3", name: "إضاءة", power: 50, quantity: 20, hours: 12 },
    ]
  },
  {
    id: "company",
    name: "شركة",
    defaultAppliances: [
      { id: "1", name: "مكيف هواء", power: 1500, quantity: 5, hours: 10 },
      { id: "2", name: "كمبيوتر", power: 250, quantity: 15, hours: 10 },
      { id: "3", name: "إضاءة", power: 40, quantity: 30, hours: 10 },
      { id: "4", name: "طابعة", power: 500, quantity: 2, hours: 2 },
    ]
  },
  {
    id: "farm",
    name: "مزرعة",
    defaultAppliances: [
      { id: "1", name: "مضخة مياه", power: 2200, quantity: 1, hours: 6 },
      { id: "2", name: "إضاءة خارجية", power: 100, quantity: 10, hours: 12 },
      { id: "3", name: "معدات زراعية خفيفة", power: 1000, quantity: 2, hours: 4 },
    ]
  },
  {
    id: "poultry_farm",
    name: "مزرعة دواجن",
    defaultAppliances: [
      { id: "1", name: "مراوح تهوية", power: 750, quantity: 6, hours: 24 },
      { id: "2", name: "إضاءة", power: 40, quantity: 50, hours: 16 },
      { id: "3", name: "نظام تعليف آلي", power: 1500, quantity: 1, hours: 4 },
      { id: "4", name: "دفايات", power: 2000, quantity: 4, hours: 12 },
    ]
  },
  {
    id: "greenhouse",
    name: "بيوت محمية",
    defaultAppliances: [
      { id: "1", name: "نظام ري", power: 1500, quantity: 1, hours: 4 },
      { id: "2", name: "مراوح تهوية", power: 500, quantity: 4, hours: 12 },
      { id: "3", name: "إضاءة نمو", power: 200, quantity: 20, hours: 8 },
    ]
  },
  {
    id: "factory",
    name: "مصنع",
    defaultAppliances: [
      { id: "1", name: "آلات إنتاج", power: 10000, quantity: 3, hours: 16 },
      { id: "2", name: "إضاءة صناعية", power: 150, quantity: 50, hours: 16 },
      { id: "3", name: "مكيفات هواء", power: 2500, quantity: 4, hours: 16 },
    ]
  },
  {
    id: "clinic",
    name: "مستوصف",
    defaultAppliances: [
      { id: "1", name: "مكيف هواء", power: 1500, quantity: 6, hours: 12 },
      { id: "2", name: "إضاءة", power: 40, quantity: 40, hours: 12 },
      { id: "3", name: "ثلاجة أدوية", power: 300, quantity: 2, hours: 24 },
      { id: "4", name: "أجهزة طبية صغيرة", power: 500, quantity: 5, hours: 6 },
    ]
  },
  {
    id: "hospital",
    name: "مستشفى",
    defaultAppliances: [
      { id: "1", name: "تكييف مركزي", power: 50000, quantity: 1, hours: 24 },
      { id: "2", name: "إضاءة", power: 40, quantity: 200, hours: 24 },
      { id: "3", name: "ثلاجات أدوية وبنك دم", power: 500, quantity: 10, hours: 24 },
      { id: "4", name: "أجهزة طبية (أشعة، غسيل)", power: 5000, quantity: 10, hours: 8 },
      { id: "5", name: "مصاعد", power: 10000, quantity: 2, hours: 12 },
    ]
  },
  {
    id: "bakery",
    name: "مخبز",
    defaultAppliances: [
      { id: "1", name: "عجانة", power: 3000, quantity: 2, hours: 8 },
      { id: "2", name: "فرن كهربائي (إذا وجد)", power: 15000, quantity: 1, hours: 12 },
      { id: "3", name: "قطاعة", power: 1500, quantity: 1, hours: 4 },
      { id: "4", name: "إضاءة ومراوح", power: 100, quantity: 10, hours: 14 },
    ]
  },
  {
    id: "shop",
    name: "دكان",
    defaultAppliances: [
      { id: "1", name: "ثلاجة عرض", power: 800, quantity: 2, hours: 24 },
      { id: "2", name: "مكيف هواء", power: 1500, quantity: 1, hours: 12 },
      { id: "3", name: "إضاءة", power: 40, quantity: 6, hours: 12 },
      { id: "4", name: "مروحة سقف", power: 80, quantity: 2, hours: 12 },
    ]
  },
  {
    id: "workshop",
    name: "ورشة",
    defaultAppliances: [
      { id: "1", name: "ماكينة لحام", power: 5000, quantity: 1, hours: 4 },
      { id: "2", name: "صاروخ تقطيع", power: 2000, quantity: 2, hours: 3 },
      { id: "3", name: "كمبروسر هواء", power: 3000, quantity: 1, hours: 5 },
      { id: "4", name: "إضاءة", power: 100, quantity: 8, hours: 10 },
    ]
  },
  {
    id: "water_pump",
    name: "مضخة مياه",
    defaultAppliances: [
      { id: "1", name: "مضخة غاطسة", power: 3000, quantity: 1, hours: 8 },
    ]
  },
  {
    id: "donkey",
    name: "دونكي",
    defaultAppliances: [
      { id: "1", name: "مضخة مياه", power: 4000, quantity: 1, hours: 10 },
      { id: "2", name: "إضاءة", power: 50, quantity: 4, hours: 12 },
    ]
  },
  {
    id: "mosque",
    name: "مسجد",
    defaultAppliances: [
      { id: "1", name: "مكيف هواء", power: 2000, quantity: 6, hours: 6 },
      { id: "2", name: "مراوح سقف", power: 80, quantity: 15, hours: 6 },
      { id: "3", name: "إضاءة", power: 40, quantity: 30, hours: 8 },
      { id: "4", name: "نظام صوتي", power: 300, quantity: 1, hours: 3 },
    ]
  },
  {
    id: "printing_press",
    name: "مطبعة",
    defaultAppliances: [
      { id: "1", name: "ماكينة طباعة", power: 6000, quantity: 2, hours: 8 },
      { id: "2", name: "ماكينة قص", power: 2000, quantity: 1, hours: 4 },
      { id: "3", name: "مكيف هواء", power: 2000, quantity: 3, hours: 10 },
      { id: "4", name: "إضاءة", power: 60, quantity: 20, hours: 10 },
    ]
  },
  {
    id: "coffee_shop",
    name: "كوفي شوب",
    defaultAppliances: [
      { id: "1", name: "ماكينة اسبريسو", power: 3500, quantity: 1, hours: 12 },
      { id: "2", name: "مطحنة بن", power: 400, quantity: 2, hours: 4 },
      { id: "3", name: "ثلاجة عرض", power: 800, quantity: 2, hours: 24 },
      { id: "4", name: "مكيف هواء", power: 2000, quantity: 2, hours: 14 },
      { id: "5", name: "إضاءة وديكور", power: 1000, quantity: 1, hours: 14 },
    ]
  },
  {
    id: "restaurant",
    name: "مطعم",
    defaultAppliances: [
      { id: "1", name: "ثلاجات وتجميد", power: 1500, quantity: 4, hours: 24 },
      { id: "2", name: "مكيف هواء", power: 2500, quantity: 4, hours: 14 },
      { id: "3", name: "مراوح شفط", power: 1000, quantity: 2, hours: 12 },
      { id: "4", name: "إضاءة", power: 60, quantity: 30, hours: 14 },
    ]
  },
  {
    id: "hotel",
    name: "فندق",
    defaultAppliances: [
      { id: "1", name: "مكيفات الغرف", power: 1500, quantity: 30, hours: 12 },
      { id: "2", name: "تكييف الاستقبال", power: 4000, quantity: 2, hours: 24 },
      { id: "3", name: "ثلاجات صغيرة", power: 100, quantity: 30, hours: 24 },
      { id: "4", name: "إضاءة", power: 10, quantity: 150, hours: 12 },
      { id: "5", name: "سخانات مياه", power: 1500, quantity: 30, hours: 3 },
      { id: "6", name: "مصاعد", power: 8000, quantity: 2, hours: 12 },
    ]
  },
  {
    id: "bank",
    name: "بنك",
    defaultAppliances: [
      { id: "1", name: "تكييف مركزي/وحدات", power: 15000, quantity: 1, hours: 10 },
      { id: "2", name: "أجهزة كمبيوتر", power: 250, quantity: 20, hours: 10 },
      { id: "3", name: "ماكينات صراف آلي", power: 300, quantity: 4, hours: 24 },
      { id: "4", name: "إضاءة", power: 40, quantity: 60, hours: 10 },
    ]
  },
  {
    id: "supermarket",
    name: "سوبر ماركت",
    defaultAppliances: [
      { id: "1", name: "ثلاجات عرض", power: 1200, quantity: 8, hours: 24 },
      { id: "2", name: "فريزرات", power: 1000, quantity: 4, hours: 24 },
      { id: "3", name: "مكيف هواء", power: 2500, quantity: 4, hours: 16 },
      { id: "4", name: "إضاءة", power: 50, quantity: 40, hours: 16 },
      { id: "5", name: "كاشير", power: 200, quantity: 3, hours: 16 },
    ]
  },
  {
    id: "gas_station",
    name: "طرمبة وقود",
    defaultAppliances: [
      { id: "1", name: "مضخات وقود", power: 1500, quantity: 6, hours: 12 },
      { id: "2", name: "إضاءة مظلة", power: 200, quantity: 8, hours: 12 },
      { id: "3", name: "كمبروسر هواء", power: 2000, quantity: 1, hours: 4 },
      { id: "4", name: "مكيف إدارة", power: 1500, quantity: 1, hours: 24 },
    ]
  },
  {
    id: "mining_company",
    name: "شركة تعدين",
    defaultAppliances: [
      { id: "1", name: "طواحين صغيرة", power: 15000, quantity: 2, hours: 12 },
      { id: "2", name: "مضخات مياه", power: 3000, quantity: 2, hours: 8 },
      { id: "3", name: "مكيفات مكاتب", power: 2000, quantity: 4, hours: 12 },
      { id: "4", name: "إضاءة عامة", power: 200, quantity: 20, hours: 12 },
    ]
  }
];

export const calculateTotalDailyConsumption = (appliances) => {
  return appliances.reduce((total, appliance) => {
    return total + (appliance.power * appliance.quantity * appliance.hours);
  }, 0);
};

export const calculateMaxPower = (appliances) => {
    return appliances.reduce((total, appliance) => {
        return total + (appliance.power * appliance.quantity);
    }, 0);
}

// Assumes 5 hours of effective peak sunlight per day for solar panel sizing, plus a 20% system loss factor
export const calculateSolarSystemSize = (dailyConsumptionWh, peakSunHours = 5, systemLossFactor = 1.2) => {
  const dailyConsumptionKwH = dailyConsumptionWh / 1000;
  const requiredCapacityKw = (dailyConsumptionKwH / peakSunHours) * systemLossFactor;
  return requiredCapacityKw;
};

// Safety margin of 25% for the inverter to handle starting surges
export const calculateInverterSize = (maxPowerW, safetyMargin = 1.25) => {
  return (maxPowerW * safetyMargin) / 1000;
};

// Battery sizing: Requires 1.5 days of autonomy, 50% Depth of Discharge for lead acid, or 80% for Lithium. We'll assume Lithium (80% DoD). System loss 10%.
export const calculateBatterySize = (dailyConsumptionWh, daysOfAutonomy = 1.5, depthOfDischarge = 0.8, efficiency = 0.9) => {
  const requiredStorageWh = (dailyConsumptionWh * daysOfAutonomy) / (depthOfDischarge * efficiency);
  return requiredStorageWh / 1000; // Return in kWh
};
