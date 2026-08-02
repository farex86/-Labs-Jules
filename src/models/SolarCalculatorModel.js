export const FACILITIES = [
  {
    id: "ice_factory",
    name: "مصنع تلج",
    defaultDevices: [
      { id: "1", name: "ماكينة ثلج", watts: 5000, quantity: 2, hours: 24 },
      { id: "2", name: "إضاءة", watts: 40, quantity: 20, hours: 12 },
      { id: "3", name: "مكيف", watts: 1500, quantity: 2, hours: 12 },
    ],
  },
  {
    id: "company",
    name: "شركة",
    defaultDevices: [
      { id: "1", name: "كمبيوتر", watts: 200, quantity: 20, hours: 8 },
      { id: "2", name: "طابعة", watts: 50, quantity: 2, hours: 2 },
      { id: "3", name: "إضاءة", watts: 40, quantity: 40, hours: 10 },
      { id: "4", name: "مكيف", watts: 1500, quantity: 4, hours: 10 },
      { id: "5", name: "ثلاجة", watts: 150, quantity: 1, hours: 24 },
    ],
  },
  {
    id: "farm",
    name: "مزرعة",
    defaultDevices: [
      { id: "1", name: "مضخة مياه", watts: 2000, quantity: 1, hours: 6 },
      { id: "2", name: "إضاءة", watts: 40, quantity: 10, hours: 12 },
    ],
  },
  {
    id: "poultry_farm",
    name: "مزرعة دواجن",
    defaultDevices: [
      { id: "1", name: "مراوح تهوية", watts: 500, quantity: 10, hours: 24 },
      { id: "2", name: "إضاءة", watts: 40, quantity: 50, hours: 12 },
      { id: "3", name: "سخانات", watts: 2000, quantity: 5, hours: 8 },
      { id: "4", name: "مضخة مياه", watts: 1000, quantity: 1, hours: 4 },
    ],
  },
  {
    id: "greenhouse",
    name: "بيوت محمية",
    defaultDevices: [
      { id: "1", name: "مراوح", watts: 300, quantity: 4, hours: 12 },
      { id: "2", name: "مضخة ري", watts: 1000, quantity: 1, hours: 4 },
      { id: "3", name: "إضاءة", watts: 100, quantity: 10, hours: 8 },
    ],
  },
  {
    id: "factory",
    name: "مصنع",
    defaultDevices: [
      { id: "1", name: "ماكينات صناعية", watts: 10000, quantity: 5, hours: 16 },
      { id: "2", name: "إضاءة", watts: 100, quantity: 100, hours: 16 },
      { id: "3", name: "مكيفات", watts: 2000, quantity: 10, hours: 16 },
    ],
  },
  {
    id: "clinic",
    name: "مستوصف",
    defaultDevices: [
      { id: "1", name: "إضاءة", watts: 40, quantity: 30, hours: 12 },
      { id: "2", name: "مكيف", watts: 1500, quantity: 5, hours: 12 },
      { id: "3", name: "ثلاجة أدوية", watts: 200, quantity: 2, hours: 24 },
      { id: "4", name: "أجهزة طبية", watts: 1000, quantity: 3, hours: 6 },
    ],
  },
  {
    id: "hospital",
    name: "مستشفي",
    defaultDevices: [
      { id: "1", name: "إضاءة", watts: 40, quantity: 200, hours: 24 },
      { id: "2", name: "مكيف مركزي", watts: 20000, quantity: 1, hours: 24 },
      { id: "3", name: "أجهزة طبية كبيرة", watts: 5000, quantity: 5, hours: 12 },
      { id: "4", name: "ثلاجات", watts: 300, quantity: 10, hours: 24 },
      { id: "5", name: "غرف عمليات", watts: 3000, quantity: 2, hours: 8 },
    ],
  },
  {
    id: "bakery",
    name: "مخبز",
    defaultDevices: [
      { id: "1", name: "عجانة", watts: 2000, quantity: 2, hours: 8 },
      { id: "2", name: "فرن كهربائي", watts: 5000, quantity: 1, hours: 12 },
      { id: "3", name: "إضاءة", watts: 40, quantity: 10, hours: 16 },
    ],
  },
  {
    id: "shop",
    name: "دكان",
    defaultDevices: [
      { id: "1", name: "إضاءة", watts: 40, quantity: 6, hours: 12 },
      { id: "2", name: "ثلاجة", watts: 300, quantity: 2, hours: 24 },
      { id: "3", name: "مروحة", watts: 70, quantity: 2, hours: 12 },
    ],
  },
  {
    id: "workshop",
    name: "ورشة",
    defaultDevices: [
      { id: "1", name: "ماكينة لحام", watts: 3000, quantity: 1, hours: 4 },
      { id: "2", name: "صاروخ تقطيع", watts: 1000, quantity: 2, hours: 4 },
      { id: "3", name: "كمبريسور", watts: 2000, quantity: 1, hours: 6 },
      { id: "4", name: "إضاءة", watts: 100, quantity: 10, hours: 10 },
    ],
  },
  {
    id: "water_pump",
    name: "مضخة موية",
    defaultDevices: [
      { id: "1", name: "مضخة مياه غاطسة", watts: 3000, quantity: 1, hours: 8 },
    ],
  },
  {
    id: "donkey_pump",
    name: "دونكي",
    defaultDevices: [
      { id: "1", name: "مضخة مياه سطحية", watts: 1500, quantity: 1, hours: 6 },
    ],
  },
  {
    id: "mosque",
    name: "مسجد",
    defaultDevices: [
      { id: "1", name: "مكيف", watts: 2000, quantity: 4, hours: 5 },
      { id: "2", name: "مراوح", watts: 70, quantity: 10, hours: 5 },
      { id: "3", name: "إضاءة", watts: 40, quantity: 30, hours: 5 },
      { id: "4", name: "مكبر صوت", watts: 100, quantity: 1, hours: 2 },
    ],
  },
  {
    id: "printing_press",
    name: "مطبعة",
    defaultDevices: [
      { id: "1", name: "ماكينة طباعة", watts: 3000, quantity: 2, hours: 10 },
      { id: "2", name: "كمبيوتر", watts: 200, quantity: 5, hours: 10 },
      { id: "3", name: "إضاءة", watts: 40, quantity: 20, hours: 12 },
      { id: "4", name: "مكيف", watts: 1500, quantity: 2, hours: 10 },
    ],
  },
  {
    id: "coffee_shop",
    name: "كوفي شوب",
    defaultDevices: [
      { id: "1", name: "ماكينة قهوة", watts: 3000, quantity: 1, hours: 12 },
      { id: "2", name: "ثلاجة عرض", watts: 400, quantity: 2, hours: 24 },
      { id: "3", name: "صانع ثلج", watts: 500, quantity: 1, hours: 24 },
      { id: "4", name: "إضاءة", watts: 40, quantity: 20, hours: 16 },
      { id: "5", name: "مكيف", watts: 1500, quantity: 2, hours: 16 },
    ],
  },
  {
    id: "restaurant",
    name: "مطعم",
    defaultDevices: [
      { id: "1", name: "ثلاجة كبيرة", watts: 800, quantity: 3, hours: 24 },
      { id: "2", name: "فريزر", watts: 600, quantity: 2, hours: 24 },
      { id: "3", name: "إضاءة", watts: 40, quantity: 40, hours: 16 },
      { id: "4", name: "مكيف", watts: 2000, quantity: 4, hours: 16 },
      { id: "5", name: "شفاطات هواء", watts: 300, quantity: 2, hours: 12 },
    ],
  },
  {
    id: "hotel",
    name: "فندق",
    defaultDevices: [
      { id: "1", name: "إضاءة غرف وممرات", watts: 40, quantity: 200, hours: 12 },
      { id: "2", name: "مكيفات غرف", watts: 1000, quantity: 50, hours: 8 },
      { id: "3", name: "ثلاجات صغيرة", watts: 100, quantity: 50, hours: 24 },
      { id: "4", name: "مصعد", watts: 5000, quantity: 2, hours: 4 },
      { id: "5", name: "مطبخ الفندق", watts: 5000, quantity: 1, hours: 10 },
    ],
  },
  {
    id: "bank",
    name: "بنك",
    defaultDevices: [
      { id: "1", name: "كمبيوتر", watts: 200, quantity: 30, hours: 10 },
      { id: "2", name: "مكيف مركزي", watts: 10000, quantity: 1, hours: 10 },
      { id: "3", name: "إضاءة", watts: 40, quantity: 100, hours: 10 },
      { id: "4", name: "صراف آلي (ATM)", watts: 300, quantity: 2, hours: 24 },
      { id: "5", name: "سيرفرات", watts: 1000, quantity: 1, hours: 24 },
    ],
  },
  {
    id: "supermarket",
    name: "سوبر ماركت",
    defaultDevices: [
      { id: "1", name: "ثلاجة عرض ألبان", watts: 1000, quantity: 4, hours: 24 },
      { id: "2", name: "فريزر لحوم", watts: 1200, quantity: 3, hours: 24 },
      { id: "3", name: "إضاءة", watts: 40, quantity: 50, hours: 16 },
      { id: "4", name: "مكيف", watts: 2000, quantity: 3, hours: 16 },
      { id: "5", name: "كاشير", watts: 100, quantity: 4, hours: 16 },
    ],
  },
  {
    id: "gas_station",
    name: "طرمبة وقود",
    defaultDevices: [
      { id: "1", name: "مضخة وقود", watts: 750, quantity: 4, hours: 10 },
      { id: "2", name: "إضاءة خارجية", watts: 200, quantity: 10, hours: 12 },
      { id: "3", name: "مكيف سوبرماركت المحطة", watts: 1500, quantity: 1, hours: 24 },
      { id: "4", name: "ثلاجة", watts: 400, quantity: 2, hours: 24 },
    ],
  },
  {
    id: "mining_company",
    name: "شركة تعدين",
    defaultDevices: [
      { id: "1", name: "معدات حفر وتكسير", watts: 20000, quantity: 2, hours: 12 },
      { id: "2", name: "مضخة مياه كبيرة", watts: 5000, quantity: 2, hours: 12 },
      { id: "3", name: "إضاءة كاشفة", watts: 1000, quantity: 10, hours: 12 },
      { id: "4", name: "مكيفات مكاتب الموقع", watts: 1500, quantity: 5, hours: 12 },
      { id: "5", name: "كمبريسور", watts: 3000, quantity: 2, hours: 10 },
    ],
  },
];

// Calculation Functions
export const calculateDailyConsumption = (devices) => {
  return devices.reduce((total, device) => {
    return total + device.watts * device.quantity * device.hours;
  }, 0);
};

export const calculateMaxPower = (devices) => {
    return devices.reduce((total, device) => {
        return total + device.watts * device.quantity;
    }, 0);
};

export const calculateSystemRequirements = (devices) => {
  const dailyConsumptionWh = calculateDailyConsumption(devices);
  const maxPowerW = calculateMaxPower(devices);

  // Assumptions
  const systemVoltage = 48; // Standard 48V system for commercial
  const inverterEfficiency = 0.85;
  const panelWattage = 550; // High efficiency panel
  const sunHours = 5.5; // Average peak sun hours
  const batteryVoltage = 12; // Typical battery block
  const batteryAh = 200; // Typical battery capacity
  const batteryDepthOfDischarge = 0.5; // 50% DoD for lead-acid/gel

  // 1. Required Inverter Size (kW)
  // Needs to handle max instantaneous power + 20% margin
  let requiredInverterW = maxPowerW * 1.2;
  const requiredInverterKw = (requiredInverterW / 1000).toFixed(1);

  // 2. Required Solar Panels
  // Total daily generation needed (accounting for system losses)
  const totalDailyGenerationNeededWh = dailyConsumptionWh / inverterEfficiency;
  const totalPanelWattageNeeded = totalDailyGenerationNeededWh / sunHours;
  const requiredPanelsCount = Math.ceil(totalPanelWattageNeeded / panelWattage);
  const requiredPanelsKw = ((requiredPanelsCount * panelWattage) / 1000).toFixed(1);

  // 3. Required Batteries
  // Total storage needed for 1 day of autonomy
  const usableBatteryCapacityNeededWh = dailyConsumptionWh;
  const totalBatteryCapacityNeededWh = usableBatteryCapacityNeededWh / batteryDepthOfDischarge;
  const singleBatteryCapacityWh = batteryVoltage * batteryAh;
  const requiredBatteriesCount = Math.ceil(totalBatteryCapacityNeededWh / singleBatteryCapacityWh);


  return {
    dailyConsumptionWh,
    dailyConsumptionKwh: (dailyConsumptionWh / 1000).toFixed(1),
    maxPowerW,
    maxPowerKw: (maxPowerW / 1000).toFixed(1),
    requiredInverterKw,
    requiredPanelsCount,
    requiredPanelsKw,
    requiredBatteriesCount,
    batteryBankVoltage: systemVoltage, // Usually 4 batteries in series for 48V
  };
};
