// src/models/SolarCalculatorModel.js

export const FACILITY_CONSUMPTION_PATTERNS = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    appliances: [
      { id: '1', name: 'ماكينة تصنيع ثلج', powerW: 5000, hours: 24, count: 1 },
      { id: '2', name: 'إضاءة', powerW: 100, hours: 12, count: 5 }
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    appliances: [
      { id: '3', name: 'أجهزة كمبيوتر', powerW: 150, hours: 8, count: 10 },
      { id: '4', name: 'مكيفات هواء', powerW: 1500, hours: 8, count: 4 },
      { id: '5', name: 'إضاءة', powerW: 40, hours: 10, count: 20 },
      { id: '6', name: 'طابعة', powerW: 300, hours: 2, count: 2 }
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    appliances: [
      { id: '7', name: 'مضخة مياه (غطاس)', powerW: 2200, hours: 6, count: 1 },
      { id: '8', name: 'إضاءة خارجية', powerW: 100, hours: 12, count: 10 },
      { id: '9', name: 'سكن عمال', powerW: 500, hours: 24, count: 1 }
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    appliances: [
      { id: '10', name: 'مراوح تهوية', powerW: 500, hours: 24, count: 10 },
      { id: '11', name: 'نظام تبريد', powerW: 1500, hours: 12, count: 2 },
      { id: '12', name: 'إضاءة', powerW: 40, hours: 16, count: 50 },
      { id: '13', name: 'مضخة مياه', powerW: 1500, hours: 4, count: 1 }
    ]
  },
  {
    id: 'greenhouses',
    name: 'بيوت محمية',
    appliances: [
      { id: '14', name: 'مراوح تهوية', powerW: 400, hours: 12, count: 8 },
      { id: '15', name: 'مضخة ري', powerW: 1500, hours: 4, count: 1 },
      { id: '16', name: 'مضخة تبريد', powerW: 1100, hours: 10, count: 2 }
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    appliances: [
      { id: '17', name: 'آلات صناعية', powerW: 10000, hours: 16, count: 2 },
      { id: '18', name: 'إضاءة', powerW: 100, hours: 24, count: 50 },
      { id: '19', name: 'مكيفات', powerW: 2000, hours: 16, count: 5 }
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    appliances: [
      { id: '20', name: 'إضاءة', powerW: 40, hours: 24, count: 30 },
      { id: '21', name: 'مكيفات', powerW: 1500, hours: 24, count: 8 },
      { id: '22', name: 'أجهزة طبية', powerW: 500, hours: 12, count: 5 },
      { id: '23', name: 'ثلاجة أدوية', powerW: 200, hours: 24, count: 2 }
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    appliances: [
      { id: '24', name: 'إضاءة', powerW: 40, hours: 24, count: 100 },
      { id: '25', name: 'مكيفات مركزية', powerW: 5000, hours: 24, count: 10 },
      { id: '26', name: 'أجهزة طبية', powerW: 2000, hours: 24, count: 10 },
      { id: '27', name: 'مصاعد', powerW: 5000, hours: 12, count: 2 }
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    appliances: [
      { id: '28', name: 'عجانة', powerW: 3000, hours: 8, count: 2 },
      { id: '29', name: 'فرن كهربائي', powerW: 2000, hours: 12, count: 1 },
      { id: '30', name: 'ثلاجة عرض', powerW: 800, hours: 24, count: 2 },
      { id: '31', name: 'إضاءة', powerW: 40, hours: 16, count: 10 }
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    appliances: [
      { id: '32', name: 'إضاءة', powerW: 40, hours: 12, count: 4 },
      { id: '33', name: 'مروحة سقف', powerW: 80, hours: 12, count: 2 },
      { id: '34', name: 'ثلاجة', powerW: 200, hours: 24, count: 1 }
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    appliances: [
      { id: '35', name: 'ماكينة لحام', powerW: 4000, hours: 4, count: 1 },
      { id: '36', name: 'صاروخ قطع/جلخ', powerW: 1000, hours: 3, count: 2 },
      { id: '37', name: 'كمبريسور هواء', powerW: 2200, hours: 5, count: 1 },
      { id: '38', name: 'إضاءة', powerW: 100, hours: 10, count: 4 }
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    appliances: [
      { id: '39', name: 'مضخة مياه غاطسة', powerW: 5500, hours: 8, count: 1 }
    ]
  },
  {
    id: 'donkey_pump',
    name: 'دونكي',
    appliances: [
      { id: '40', name: 'مضخة مياه سطحية', powerW: 1500, hours: 6, count: 1 },
      { id: '41', name: 'إضاءة بسيطة', powerW: 20, hours: 12, count: 2 }
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    appliances: [
      { id: '42', name: 'مكيفات', powerW: 2000, hours: 6, count: 4 },
      { id: '43', name: 'إضاءة', powerW: 40, hours: 6, count: 20 },
      { id: '44', name: 'نظام صوتي', powerW: 100, hours: 3, count: 1 },
      { id: '45', name: 'مبرد مياه', powerW: 300, hours: 24, count: 1 }
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    appliances: [
      { id: '46', name: 'ماكينة طباعة', powerW: 3000, hours: 8, count: 2 },
      { id: '47', name: 'ماكينة قص ورقة', powerW: 1500, hours: 4, count: 1 },
      { id: '48', name: 'أجهزة كمبيوتر', powerW: 200, hours: 8, count: 4 },
      { id: '49', name: 'إضاءة', powerW: 40, hours: 10, count: 10 },
      { id: '50', name: 'مكيفات', powerW: 1500, hours: 10, count: 2 }
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    appliances: [
      { id: '51', name: 'ماكينة قهوة اسبريسو', powerW: 3500, hours: 16, count: 1 },
      { id: '52', name: 'ثلاجة عرض', powerW: 500, hours: 24, count: 2 },
      { id: '53', name: 'مكيفات', powerW: 1500, hours: 16, count: 3 },
      { id: '54', name: 'إضاءة', powerW: 40, hours: 16, count: 20 },
      { id: '55', name: 'خلاط', powerW: 1000, hours: 2, count: 2 }
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    appliances: [
      { id: '56', name: 'ثلاجة/فريزر', powerW: 800, hours: 24, count: 4 },
      { id: '57', name: 'مكيفات', powerW: 2000, hours: 16, count: 5 },
      { id: '58', name: 'إضاءة', powerW: 40, hours: 16, count: 30 },
      { id: '59', name: 'شفاطات هواء', powerW: 500, hours: 16, count: 2 }
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    appliances: [
      { id: '60', name: 'مكيفات غرف', powerW: 1200, hours: 12, count: 20 },
      { id: '61', name: 'ثلاجات صغيرة', powerW: 100, hours: 24, count: 20 },
      { id: '62', name: 'إضاءة ممرات وغرف', powerW: 40, hours: 12, count: 100 },
      { id: '63', name: 'مصاعد', powerW: 5000, hours: 10, count: 1 },
      { id: '64', name: 'مضخات مياه', powerW: 2000, hours: 8, count: 2 }
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    appliances: [
      { id: '65', name: 'أجهزة كمبيوتر وسيرفرات', powerW: 200, hours: 24, count: 15 },
      { id: '66', name: 'مكيفات', powerW: 1500, hours: 10, count: 8 },
      { id: '67', name: 'إضاءة', powerW: 40, hours: 12, count: 40 },
      { id: '68', name: 'صراف آلي (ATM)', powerW: 300, hours: 24, count: 2 }
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    appliances: [
      { id: '69', name: 'ثلاجات عرض', powerW: 1000, hours: 24, count: 8 },
      { id: '70', name: 'فريزر', powerW: 800, hours: 24, count: 4 },
      { id: '71', name: 'مكيفات', powerW: 2000, hours: 16, count: 6 },
      { id: '72', name: 'إضاءة', powerW: 40, hours: 16, count: 50 },
      { id: '73', name: 'نقاط بيع كاشير', powerW: 100, hours: 16, count: 3 }
    ]
  },
  {
    id: 'fuel_station',
    name: 'طرمبة وقود',
    appliances: [
      { id: '74', name: 'مضخات وقود', powerW: 750, hours: 10, count: 4 },
      { id: '75', name: 'إضاءة مظلة (كشافات)', powerW: 150, hours: 12, count: 10 },
      { id: '76', name: 'مكيف بقالة', powerW: 1500, hours: 24, count: 1 },
      { id: '77', name: 'ثلاجة', powerW: 300, hours: 24, count: 2 }
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    appliances: [
      { id: '78', name: 'طواحين ومعدات فرز', powerW: 15000, hours: 20, count: 2 },
      { id: '79', name: 'مضخات مياه', powerW: 5000, hours: 12, count: 2 },
      { id: '80', name: 'إضاءة كشافات', powerW: 400, hours: 12, count: 20 },
      { id: '81', name: 'سكن عمال', powerW: 5000, hours: 16, count: 1 }
    ]
  }
];

export const calculateSystemRequirements = (totalDailyWh) => {
  // Constants for estimation
  const peakSunHours = 5.5; // Average full sun hours
  const systemEfficiency = 0.75; // Accounting for losses in wiring, inverter, etc.
  const batteryVoltage = 48; // System voltage
  const batteryDepthOfDischarge = 0.8; // 80% DoD for Lithium

  // Array size in Watts
  const requiredSolarArrayW = (totalDailyWh / systemEfficiency) / peakSunHours;

  // Recommended panel size
  const panelWattage = 550;
  const recommendedPanelsCount = Math.ceil(requiredSolarArrayW / panelWattage);

  // Battery capacity in Ah (assuming 1 day of autonomy)
  const requiredBatteryCapacityAh = (totalDailyWh / batteryVoltage) / batteryDepthOfDischarge;

  // Recommended battery size
  const batteryAh = 200;
  const recommendedBatteriesCount = Math.ceil(requiredBatteryCapacityAh / batteryAh);

  // Inverter Size estimation (rough guess based on total daily Wh)
  // Usually inverter sizing requires knowing peak power draw. Here we estimate.
  const estimatedInverterW = Math.max(3000, Math.ceil((requiredSolarArrayW * 1.5) / 1000) * 1000);

  return {
    totalDailyWh,
    requiredSolarArrayW: Math.ceil(requiredSolarArrayW),
    recommendedPanelsCount,
    panelWattage,
    requiredBatteryCapacityAh: Math.ceil(requiredBatteryCapacityAh),
    recommendedBatteriesCount,
    batteryAh,
    batteryVoltage,
    estimatedInverterW
  };
};
