// src/models/SolarCalculatorModel.js

// Predefined Arabic facility types with default consumption patterns
export const FACILITY_TYPES = [
  {
    id: "ice_factory",
    name: "مصنع ثلج",
    appliances: [
      { id: "1", name: "ماكينة صنع الثلج", quantity: 2, powerW: 5000, hoursPerDay: 12 },
      { id: "2", name: "ثلاجة تبريد كبيرة", quantity: 3, powerW: 2000, hoursPerDay: 24 },
      { id: "3", name: "إضاءة", quantity: 10, powerW: 20, hoursPerDay: 12 },
    ],
  },
  {
    id: "company",
    name: "شركة",
    appliances: [
      { id: "1", name: "مكيف هواء", quantity: 5, powerW: 1500, hoursPerDay: 8 },
      { id: "2", name: "كمبيوتر", quantity: 10, powerW: 200, hoursPerDay: 8 },
      { id: "3", name: "إضاءة", quantity: 20, powerW: 20, hoursPerDay: 8 },
      { id: "4", name: "ثلاجة صغيرة", quantity: 1, powerW: 150, hoursPerDay: 24 },
    ],
  },
  {
    id: "farm",
    name: "مزرعة",
    appliances: [
      { id: "1", name: "مضخة مياه زراعية", quantity: 1, powerW: 3000, hoursPerDay: 6 },
      { id: "2", name: "إضاءة خارجية", quantity: 5, powerW: 50, hoursPerDay: 10 },
      { id: "3", name: "مروحة", quantity: 2, powerW: 75, hoursPerDay: 12 },
    ],
  },
  {
    id: "poultry_farm",
    name: "مزرعة دواجن",
    appliances: [
      { id: "1", name: "مراوح تهوية", quantity: 10, powerW: 200, hoursPerDay: 24 },
      { id: "2", name: "إضاءة للتدفئة", quantity: 20, powerW: 100, hoursPerDay: 12 },
      { id: "3", name: "نظام تغذية آلي", quantity: 2, powerW: 1000, hoursPerDay: 4 },
      { id: "4", name: "مضخة مياه", quantity: 1, powerW: 750, hoursPerDay: 8 },
    ],
  },
  {
    id: "greenhouse",
    name: "بيوت محمية",
    appliances: [
      { id: "1", name: "نظام تبريد/مراوح", quantity: 4, powerW: 500, hoursPerDay: 12 },
      { id: "2", name: "مضخة ري بالتنقيط", quantity: 2, powerW: 1100, hoursPerDay: 4 },
      { id: "3", name: "نظام تحكم", quantity: 1, powerW: 100, hoursPerDay: 24 },
    ],
  },
  {
    id: "factory",
    name: "مصنع",
    appliances: [
      { id: "1", name: "آلات تصنيع", quantity: 5, powerW: 4000, hoursPerDay: 8 },
      { id: "2", name: "ناقل حركة", quantity: 2, powerW: 2000, hoursPerDay: 8 },
      { id: "3", name: "إضاءة صناعية", quantity: 30, powerW: 50, hoursPerDay: 10 },
      { id: "4", name: "مكيف مركزي", quantity: 2, powerW: 5000, hoursPerDay: 10 },
    ],
  },
  {
    id: "clinic",
    name: "مستوصف",
    appliances: [
      { id: "1", name: "أجهزة طبية", quantity: 4, powerW: 800, hoursPerDay: 8 },
      { id: "2", name: "ثلاجة أدوية", quantity: 2, powerW: 300, hoursPerDay: 24 },
      { id: "3", name: "مكيف هواء", quantity: 4, powerW: 1500, hoursPerDay: 12 },
      { id: "4", name: "إضاءة", quantity: 15, powerW: 20, hoursPerDay: 12 },
    ],
  },
  {
    id: "hospital",
    name: "مستشفى",
    appliances: [
      { id: "1", name: "أجهزة طبية حيوية", quantity: 20, powerW: 1000, hoursPerDay: 24 },
      { id: "2", name: "ثلاجات أدوية/بنوك دم", quantity: 10, powerW: 400, hoursPerDay: 24 },
      { id: "3", name: "مكيفات مركزية", quantity: 5, powerW: 10000, hoursPerDay: 24 },
      { id: "4", name: "إضاءة عامة", quantity: 100, powerW: 20, hoursPerDay: 24 },
      { id: "5", name: "أجهزة تصوير (X-Ray/MRI)", quantity: 2, powerW: 5000, hoursPerDay: 8 },
    ],
  },
  {
    id: "bakery",
    name: "مخبز",
    appliances: [
      { id: "1", name: "فرن كهربائي", quantity: 2, powerW: 8000, hoursPerDay: 10 },
      { id: "2", name: "عجانة", quantity: 2, powerW: 1500, hoursPerDay: 6 },
      { id: "3", name: "ثلاجة", quantity: 2, powerW: 500, hoursPerDay: 24 },
      { id: "4", name: "إضاءة", quantity: 10, powerW: 20, hoursPerDay: 14 },
    ],
  },
  {
    id: "shop",
    name: "دكان",
    appliances: [
      { id: "1", name: "ثلاجة عرض", quantity: 2, powerW: 600, hoursPerDay: 24 },
      { id: "2", name: "مروحة", quantity: 2, powerW: 75, hoursPerDay: 14 },
      { id: "3", name: "إضاءة", quantity: 4, powerW: 20, hoursPerDay: 14 },
    ],
  },
  {
    id: "workshop",
    name: "ورشة",
    appliances: [
      { id: "1", name: "آلة لحام", quantity: 1, powerW: 3000, hoursPerDay: 4 },
      { id: "2", name: "كمبروسر هواء", quantity: 1, powerW: 2000, hoursPerDay: 4 },
      { id: "3", name: "صاروخ تقطيع", quantity: 2, powerW: 1000, hoursPerDay: 3 },
      { id: "4", name: "إضاءة", quantity: 6, powerW: 40, hoursPerDay: 10 },
    ],
  },
  {
    id: "water_pump",
    name: "مضخة مياه",
    appliances: [
      { id: "1", name: "مضخة سطحية/غطاس", quantity: 1, powerW: 2200, hoursPerDay: 8 },
    ],
  },
  {
    id: "donkey_pump",
    name: "دونكي (مضخة بئر)",
    appliances: [
      { id: "1", name: "مضخة بئر عميق", quantity: 1, powerW: 4000, hoursPerDay: 6 },
      { id: "2", name: "إضاءة خفيفة", quantity: 2, powerW: 20, hoursPerDay: 12 },
    ],
  },
  {
    id: "mosque",
    name: "مسجد",
    appliances: [
      { id: "1", name: "مكيف هواء", quantity: 6, powerW: 2000, hoursPerDay: 5 },
      { id: "2", name: "مكبرات صوت", quantity: 1, powerW: 200, hoursPerDay: 2 },
      { id: "3", name: "إضاءة ثريات/لمبات", quantity: 30, powerW: 20, hoursPerDay: 5 },
      { id: "4", name: "مبرد مياه", quantity: 2, powerW: 300, hoursPerDay: 24 },
    ],
  },
  {
    id: "printing_press",
    name: "مطبعة",
    appliances: [
      { id: "1", name: "آلات طباعة", quantity: 3, powerW: 3000, hoursPerDay: 10 },
      { id: "2", name: "آلة قص ورق", quantity: 1, powerW: 1500, hoursPerDay: 4 },
      { id: "3", name: "مكيف هواء", quantity: 3, powerW: 1500, hoursPerDay: 12 },
      { id: "4", name: "إضاءة", quantity: 15, powerW: 40, hoursPerDay: 12 },
    ],
  },
  {
    id: "coffee_shop",
    name: "كوفي شوب",
    appliances: [
      { id: "1", name: "ماكينة إسبريسو", quantity: 1, powerW: 3500, hoursPerDay: 8 },
      { id: "2", name: "صانعة ثلج", quantity: 1, powerW: 500, hoursPerDay: 24 },
      { id: "3", name: "ثلاجة عرض", quantity: 2, powerW: 600, hoursPerDay: 24 },
      { id: "4", name: "مكيف هواء", quantity: 2, powerW: 1500, hoursPerDay: 16 },
      { id: "5", name: "إضاءة وديكور", quantity: 20, powerW: 20, hoursPerDay: 16 },
    ],
  },
  {
    id: "restaurant",
    name: "مطعم",
    appliances: [
      { id: "1", name: "مكيف هواء", quantity: 4, powerW: 2000, hoursPerDay: 16 },
      { id: "2", name: "ثلاجة تبريد/تجميد", quantity: 4, powerW: 800, hoursPerDay: 24 },
      { id: "3", name: "شفاطات هواء", quantity: 2, powerW: 1000, hoursPerDay: 16 },
      { id: "4", name: "إضاءة", quantity: 30, powerW: 20, hoursPerDay: 16 },
    ],
  },
  {
    id: "hotel",
    name: "فندق",
    appliances: [
      { id: "1", name: "مكيفات غرف", quantity: 20, powerW: 1200, hoursPerDay: 12 },
      { id: "2", name: "ثلاجات صغيرة", quantity: 20, powerW: 100, hoursPerDay: 24 },
      { id: "3", name: "مصاعد", quantity: 2, powerW: 8000, hoursPerDay: 4 },
      { id: "4", name: "إضاءة", quantity: 100, powerW: 20, hoursPerDay: 12 },
      { id: "5", name: "سخانات مياه", quantity: 20, powerW: 1500, hoursPerDay: 4 },
    ],
  },
  {
    id: "bank",
    name: "بنك",
    appliances: [
      { id: "1", name: "أجهزة صراف آلي", quantity: 3, powerW: 300, hoursPerDay: 24 },
      { id: "2", name: "حواسيب وخوادم", quantity: 20, powerW: 300, hoursPerDay: 10 },
      { id: "3", name: "مكيفات هواء", quantity: 6, powerW: 2000, hoursPerDay: 10 },
      { id: "4", name: "إضاءة", quantity: 40, powerW: 20, hoursPerDay: 10 },
    ],
  },
  {
    id: "supermarket",
    name: "سوبر ماركت",
    appliances: [
      { id: "1", name: "ثلاجات عرض منتجات", quantity: 6, powerW: 1000, hoursPerDay: 24 },
      { id: "2", name: "فريزرات", quantity: 4, powerW: 1200, hoursPerDay: 24 },
      { id: "3", name: "مكيفات هواء", quantity: 4, powerW: 2000, hoursPerDay: 16 },
      { id: "4", name: "إضاءة مكثفة", quantity: 50, powerW: 40, hoursPerDay: 16 },
    ],
  },
  {
    id: "gas_station",
    name: "طرمبة وقود",
    appliances: [
      { id: "1", name: "مضخات وقود", quantity: 4, powerW: 1500, hoursPerDay: 8 },
      { id: "2", name: "إضاءة مظلة خارجية", quantity: 10, powerW: 100, hoursPerDay: 12 },
      { id: "3", name: "ثلاجة بضائع", quantity: 2, powerW: 500, hoursPerDay: 24 },
      { id: "4", name: "مكيف هواء", quantity: 1, powerW: 1500, hoursPerDay: 24 },
    ],
  },
  {
    id: "mining_company",
    name: "شركة تعدين",
    appliances: [
      { id: "1", name: "معدات طحن وتكسير", quantity: 2, powerW: 15000, hoursPerDay: 12 },
      { id: "2", name: "مضخات مياه/طين", quantity: 2, powerW: 5000, hoursPerDay: 12 },
      { id: "3", name: "مولدات لحام", quantity: 3, powerW: 3000, hoursPerDay: 8 },
      { id: "4", name: "إضاءة كاشفة", quantity: 10, powerW: 400, hoursPerDay: 12 },
      { id: "5", name: "مكيفات هواء سكن عمال", quantity: 10, powerW: 1500, hoursPerDay: 10 },
    ],
  },
];

export class SolarCalculatorModel {
  /**
   * Calculates the required solar system size based on a list of appliances.
   *
   * @param {Array} appliances - Array of appliance objects { quantity, powerW, hoursPerDay }
   * @returns {Object} System requirements
   */
  static calculateSystemSize(appliances) {
    let totalDailyEnergyWh = 0;
    let peakPowerW = 0;

    appliances.forEach((appliance) => {
      const q = parseFloat(appliance.quantity) || 0;
      const p = parseFloat(appliance.powerW) || 0;
      const h = parseFloat(appliance.hoursPerDay) || 0;

      const appPeakPower = q * p;
      peakPowerW += appPeakPower;
      totalDailyEnergyWh += appPeakPower * h;
    });

    // Inverter Sizing: Peak Power + 20-30% safety margin
    const inverterSizeW = Math.ceil(peakPowerW * 1.25);

    // Battery Sizing (assuming 1 day of autonomy, 50% Depth of Discharge for Lead Acid/Gel, 48V system)
    // For simplicity, we calculate total usable battery energy needed in Wh
    // Then battery capacity in Ah for a standard 48V system.
    // Wh / 48V / 0.5 (DoD) = Ah needed
    // Let's use 80% efficiency for the inverter
    const batteryCapacityWhNeeded = totalDailyEnergyWh / 0.8;

    // Assuming 48V battery bank and 80% Depth of Discharge (LiFePO4 is common now, let's use 80% DoD)
    const systemVoltage = 48;
    const depthOfDischarge = 0.8;
    const batteryCapacityAh = Math.ceil(batteryCapacityWhNeeded / (systemVoltage * depthOfDischarge));

    // Solar Panel Sizing
    // Assuming 5 peak sun hours per day
    const peakSunHours = 5;
    // System losses (dust, heat, wire losses) ~ 20% -> 0.8 efficiency factor
    const requiredSolarArrayPowerW = Math.ceil((totalDailyEnergyWh / peakSunHours) / 0.8);

    // Assuming 550W panels
    const panelWattage = 550;
    const numberOfPanels = Math.ceil(requiredSolarArrayPowerW / panelWattage);

    return {
      totalDailyEnergyWh,
      totalDailyEnergyKWh: (totalDailyEnergyWh / 1000).toFixed(2),
      peakPowerW,
      inverterSizeW,
      inverterSizeKVA: (inverterSizeW / 800).toFixed(1), // Assuming 0.8 power factor
      batteryCapacityAh,
      systemVoltage,
      requiredSolarArrayPowerW,
      requiredSolarArrayPowerKW: (requiredSolarArrayPowerW / 1000).toFixed(2),
      numberOfPanels,
      panelWattage
    };
  }
}
