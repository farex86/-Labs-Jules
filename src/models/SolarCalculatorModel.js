export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    appliances: [
      { id: 'compressor', name: 'كمبريسر تبريد', powerW: 15000, defaultQuantity: 2, defaultHours: 12 },
      { id: 'water_pump', name: 'مضخة مياه', powerW: 2200, defaultQuantity: 1, defaultHours: 8 },
      { id: 'lighting', name: 'إضاءة', powerW: 50, defaultQuantity: 10, defaultHours: 12 }
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    appliances: [
      { id: 'ac', name: 'مكيف', powerW: 1500, defaultQuantity: 5, defaultHours: 8 },
      { id: 'computer', name: 'جهاز كمبيوتر', powerW: 200, defaultQuantity: 10, defaultHours: 8 },
      { id: 'lighting', name: 'إضاءة', powerW: 30, defaultQuantity: 20, defaultHours: 9 },
      { id: 'printer', name: 'طابعة', powerW: 400, defaultQuantity: 2, defaultHours: 2 }
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    appliances: [
      { id: 'water_pump', name: 'مضخة غاطسة', powerW: 5500, defaultQuantity: 1, defaultHours: 6 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, defaultQuantity: 10, defaultHours: 12 },
      { id: 'fridge', name: 'ثلاجة', powerW: 300, defaultQuantity: 1, defaultHours: 24 }
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    appliances: [
      { id: 'ventilation', name: 'مراوح تهوية', powerW: 1100, defaultQuantity: 4, defaultHours: 24 },
      { id: 'heating', name: 'دفايات', powerW: 2000, defaultQuantity: 2, defaultHours: 12 },
      { id: 'feeding_system', name: 'نظام تغذية', powerW: 1500, defaultQuantity: 1, defaultHours: 4 },
      { id: 'lighting', name: 'إضاءة', powerW: 20, defaultQuantity: 30, defaultHours: 16 }
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    appliances: [
      { id: 'cooling_pad', name: 'نظام تبريد', powerW: 1500, defaultQuantity: 2, defaultHours: 10 },
      { id: 'water_pump', name: 'مضخة ري', powerW: 1100, defaultQuantity: 1, defaultHours: 4 },
      { id: 'lighting', name: 'إضاءة للنمو', powerW: 100, defaultQuantity: 20, defaultHours: 8 }
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    appliances: [
      { id: 'machine', name: 'آلات تصنيع', powerW: 10000, defaultQuantity: 3, defaultHours: 8 },
      { id: 'lighting', name: 'إضاءة المصنع', powerW: 100, defaultQuantity: 30, defaultHours: 10 },
      { id: 'ac', name: 'تكييف', powerW: 3000, defaultQuantity: 4, defaultHours: 8 }
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    appliances: [
      { id: 'ac', name: 'مكيف', powerW: 1500, defaultQuantity: 8, defaultHours: 12 },
      { id: 'lighting', name: 'إضاءة', powerW: 30, defaultQuantity: 30, defaultHours: 12 },
      { id: 'medical_eq', name: 'معدات طبية', powerW: 2000, defaultQuantity: 2, defaultHours: 6 },
      { id: 'fridge', name: 'ثلاجة أدوية', powerW: 250, defaultQuantity: 2, defaultHours: 24 }
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    appliances: [
      { id: 'ac', name: 'تكييف مركزي', powerW: 20000, defaultQuantity: 2, defaultHours: 24 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, defaultQuantity: 100, defaultHours: 24 },
      { id: 'medical_eq', name: 'معدات طبية ثقيلة', powerW: 5000, defaultQuantity: 5, defaultHours: 10 },
      { id: 'fridge', name: 'ثلاجات', powerW: 400, defaultQuantity: 10, defaultHours: 24 }
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    appliances: [
      { id: 'mixer', name: 'عجانة', powerW: 3000, defaultQuantity: 2, defaultHours: 6 },
      { id: 'oven', name: 'فرن كهربائي', powerW: 8000, defaultQuantity: 1, defaultHours: 10 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, defaultQuantity: 10, defaultHours: 12 }
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    appliances: [
      { id: 'fridge', name: 'ثلاجة عرض', powerW: 500, defaultQuantity: 2, defaultHours: 24 },
      { id: 'ac', name: 'مكيف', powerW: 1500, defaultQuantity: 1, defaultHours: 12 },
      { id: 'lighting', name: 'إضاءة', powerW: 30, defaultQuantity: 6, defaultHours: 12 }
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    appliances: [
      { id: 'welding', name: 'ماكينة لحام', powerW: 5000, defaultQuantity: 1, defaultHours: 4 },
      { id: 'drill', name: 'دريل / صاروخ', powerW: 1200, defaultQuantity: 2, defaultHours: 3 },
      { id: 'compressor', name: 'كمبريسر هواء', powerW: 2200, defaultQuantity: 1, defaultHours: 5 },
      { id: 'lighting', name: 'إضاءة', powerW: 50, defaultQuantity: 5, defaultHours: 10 }
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة مياه',
    appliances: [
      { id: 'pump_large', name: 'مضخة رئيسية', powerW: 7500, defaultQuantity: 1, defaultHours: 8 },
      { id: 'pump_small', name: 'مضخة مساعدة', powerW: 2200, defaultQuantity: 1, defaultHours: 4 }
    ]
  },
  {
    id: 'donkey_cart',
    name: 'دونكي (عربة كارو/متحركة)',
    appliances: [
      { id: 'lighting', name: 'كشاف صغير', powerW: 20, defaultQuantity: 1, defaultHours: 5 },
      { id: 'radio', name: 'راديو / مسجل', powerW: 15, defaultQuantity: 1, defaultHours: 6 }
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    appliances: [
      { id: 'ac', name: 'مكيف', powerW: 2000, defaultQuantity: 6, defaultHours: 6 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, defaultQuantity: 20, defaultHours: 5 },
      { id: 'sound', name: 'مكبر صوت', powerW: 150, defaultQuantity: 1, defaultHours: 3 }
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    appliances: [
      { id: 'printer_large', name: 'ماكينة طباعة', powerW: 5000, defaultQuantity: 2, defaultHours: 8 },
      { id: 'cutter', name: 'مقص ورق', powerW: 1500, defaultQuantity: 1, defaultHours: 4 },
      { id: 'lighting', name: 'إضاءة', powerW: 50, defaultQuantity: 15, defaultHours: 10 },
      { id: 'ac', name: 'تكييف', powerW: 2000, defaultQuantity: 3, defaultHours: 10 }
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    appliances: [
      { id: 'espresso', name: 'ماكينة قهوة', powerW: 3500, defaultQuantity: 1, defaultHours: 10 },
      { id: 'grinder', name: 'طاحونة', powerW: 500, defaultQuantity: 2, defaultHours: 2 },
      { id: 'fridge', name: 'ثلاجة عرض', powerW: 600, defaultQuantity: 1, defaultHours: 24 },
      { id: 'ac', name: 'تكييف', powerW: 2500, defaultQuantity: 2, defaultHours: 12 },
      { id: 'lighting', name: 'إضاءة ديكور', powerW: 30, defaultQuantity: 20, defaultHours: 12 }
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    appliances: [
      { id: 'fridge', name: 'ثلاجة / فريزر', powerW: 800, defaultQuantity: 4, defaultHours: 24 },
      { id: 'oven', name: 'فرن / شواية كهربائية', powerW: 5000, defaultQuantity: 2, defaultHours: 8 },
      { id: 'ac', name: 'تكييف', powerW: 3000, defaultQuantity: 3, defaultHours: 12 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, defaultQuantity: 30, defaultHours: 14 }
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    appliances: [
      { id: 'ac', name: 'تكييف', powerW: 1500, defaultQuantity: 20, defaultHours: 16 },
      { id: 'lighting', name: 'إضاءة', powerW: 30, defaultQuantity: 100, defaultHours: 12 },
      { id: 'fridge', name: 'ثلاجات غرف', powerW: 100, defaultQuantity: 20, defaultHours: 24 },
      { id: 'water_heater', name: 'سخانات مياه', powerW: 2000, defaultQuantity: 10, defaultHours: 4 }
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    appliances: [
      { id: 'ac', name: 'تكييف مركزي', powerW: 10000, defaultQuantity: 2, defaultHours: 10 },
      { id: 'computer', name: 'أجهزة كمبيوتر', powerW: 200, defaultQuantity: 30, defaultHours: 9 },
      { id: 'server', name: 'سيرفر', powerW: 800, defaultQuantity: 2, defaultHours: 24 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, defaultQuantity: 50, defaultHours: 10 }
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    appliances: [
      { id: 'fridge_open', name: 'ثلاجة عرض مفتوحة', powerW: 1200, defaultQuantity: 4, defaultHours: 24 },
      { id: 'freezer', name: 'فريزر', powerW: 800, defaultQuantity: 3, defaultHours: 24 },
      { id: 'ac', name: 'تكييف', powerW: 2500, defaultQuantity: 2, defaultHours: 14 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, defaultQuantity: 30, defaultHours: 16 }
    ]
  },
  {
    id: 'gas_station',
    name: 'محطة/طرمبة وقود',
    appliances: [
      { id: 'pump', name: 'مضخة وقود', powerW: 1500, defaultQuantity: 4, defaultHours: 12 },
      { id: 'lighting_canopy', name: 'إضاءة المظلة', powerW: 150, defaultQuantity: 8, defaultHours: 12 },
      { id: 'compressor', name: 'كمبريسر هواء للسيارات', powerW: 2200, defaultQuantity: 1, defaultHours: 6 }
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    appliances: [
      { id: 'crusher', name: 'كسارة', powerW: 20000, defaultQuantity: 1, defaultHours: 10 },
      { id: 'conveyor', name: 'سير ناقل', powerW: 5000, defaultQuantity: 2, defaultHours: 10 },
      { id: 'water_pump', name: 'مضخة مياه', powerW: 7500, defaultQuantity: 1, defaultHours: 8 },
      { id: 'lighting', name: 'إضاءة مواقع', powerW: 500, defaultQuantity: 10, defaultHours: 12 },
      { id: 'ac_camp', name: 'مكيفات السكن', powerW: 1500, defaultQuantity: 10, defaultHours: 10 }
    ]
  }
];

export const CALCULATE_SOLAR_NEEDS = (appliances) => {
  let totalDailyEnergyWh = 0;
  let maxPowerW = 0;

  appliances.forEach(app => {
    const power = Number(app.powerW) || 0;
    const qty = Number(app.quantity) || 0;
    const hrs = Number(app.hours) || 0;

    totalDailyEnergyWh += (power * qty * hrs);
    maxPowerW += (power * qty);
  });

  // Basic estimation factors (configurable)
  const systemLosses = 1.3; // 30% system losses
  const peakSunHours = 5; // Average peak sun hours
  const batteryDepthOfDischarge = 0.5; // 50% DoD for lead-acid (common)
  const systemVoltage = 48; // Standard 48V system for medium/large

  const requiredSolarPanelW = (totalDailyEnergyWh * systemLosses) / peakSunHours;
  const requiredBatteryAh = (totalDailyEnergyWh / systemVoltage) / batteryDepthOfDischarge;
  const recommendedInverterW = maxPowerW * 1.25; // 25% overhead

  return {
    totalDailyEnergyWh,
    maxPowerW,
    recommendedSystem: {
      solarPanelsW: Math.ceil(requiredSolarPanelW),
      batteryCapacityAh: Math.ceil(requiredBatteryAh),
      inverterPowerW: Math.ceil(recommendedInverterW),
      systemVoltage
    }
  };
};
