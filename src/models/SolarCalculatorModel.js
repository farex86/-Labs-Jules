// src/models/SolarCalculatorModel.js

/**
 * Solar Calculator Business Logic and Configuration
 * This separates the configuration data and formulas from the UI.
 */

// Facility Types with default consumption patterns and appliances
export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج',
    defaultAppliances: [
      { id: 'compressor', name: 'كمبريسور تبريد', powerW: 5000, quantity: 2, hoursPerDay: 24 },
      { id: 'water_pump', name: 'مضخة مياه', powerW: 1500, quantity: 1, hoursPerDay: 12 },
      { id: 'lighting', name: 'إضاءة', powerW: 100, quantity: 10, hoursPerDay: 12 }
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    defaultAppliances: [
      { id: 'ac', name: 'مكيف', powerW: 1500, quantity: 4, hoursPerDay: 10 },
      { id: 'pc', name: 'كمبيوتر', powerW: 300, quantity: 10, hoursPerDay: 8 },
      { id: 'lighting', name: 'إضاءة', powerW: 50, quantity: 20, hoursPerDay: 10 },
      { id: 'printer', name: 'طابعة', powerW: 500, quantity: 2, hoursPerDay: 2 }
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultAppliances: [
      { id: 'water_pump_large', name: 'مضخة غاطسة', powerW: 3000, quantity: 1, hoursPerDay: 8 },
      { id: 'lighting', name: 'إضاءة خارجية', powerW: 200, quantity: 5, hoursPerDay: 12 }
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultAppliances: [
      { id: 'ventilation', name: 'مراوح تهوية', powerW: 750, quantity: 4, hoursPerDay: 24 },
      { id: 'heater', name: 'دفايات', powerW: 2000, quantity: 2, hoursPerDay: 12 },
      { id: 'lighting', name: 'إضاءة', powerW: 100, quantity: 15, hoursPerDay: 24 },
      { id: 'water_pump', name: 'مضخة مياه', powerW: 1000, quantity: 1, hoursPerDay: 4 }
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    defaultAppliances: [
      { id: 'cooling_pad', name: 'مضخة تبريد', powerW: 1500, quantity: 2, hoursPerDay: 12 },
      { id: 'fan', name: 'مراوح سحب', powerW: 1000, quantity: 4, hoursPerDay: 12 },
      { id: 'lighting', name: 'إضاءة زراعية', powerW: 400, quantity: 10, hoursPerDay: 14 }
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultAppliances: [
      { id: 'machine_1', name: 'ماكينة إنتاج', powerW: 4000, quantity: 2, hoursPerDay: 16 },
      { id: 'conveyor', name: 'سير ناقل', powerW: 1500, quantity: 1, hoursPerDay: 16 },
      { id: 'lighting', name: 'إضاءة', powerW: 150, quantity: 20, hoursPerDay: 16 }
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultAppliances: [
      { id: 'ac', name: 'مكيف', powerW: 1500, quantity: 5, hoursPerDay: 14 },
      { id: 'fridge', name: 'ثلاجة أدوية', powerW: 300, quantity: 2, hoursPerDay: 24 },
      { id: 'medical_eq', name: 'أجهزة طبية', powerW: 1000, quantity: 3, hoursPerDay: 8 },
      { id: 'lighting', name: 'إضاءة', powerW: 50, quantity: 30, hoursPerDay: 14 }
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    defaultAppliances: [
      { id: 'ac_central', name: 'تكييف مركزي', powerW: 10000, quantity: 2, hoursPerDay: 24 },
      { id: 'fridge', name: 'ثلاجات حفظ', powerW: 500, quantity: 10, hoursPerDay: 24 },
      { id: 'medical_eq_heavy', name: 'أجهزة أشعة/عناية', powerW: 3000, quantity: 5, hoursPerDay: 12 },
      { id: 'elevator', name: 'مصعد', powerW: 5000, quantity: 2, hoursPerDay: 10 },
      { id: 'lighting', name: 'إضاءة', powerW: 50, quantity: 100, hoursPerDay: 24 }
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultAppliances: [
      { id: 'mixer', name: 'عجانة', powerW: 2500, quantity: 2, hoursPerDay: 8 },
      { id: 'oven', name: 'فرن كهربائي', powerW: 6000, quantity: 1, hoursPerDay: 10 },
      { id: 'proofer', name: 'خمارة', powerW: 1500, quantity: 1, hoursPerDay: 10 },
      { id: 'lighting', name: 'إضاءة', powerW: 100, quantity: 10, hoursPerDay: 12 }
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultAppliances: [
      { id: 'fridge_display', name: 'ثلاجة عرض', powerW: 800, quantity: 2, hoursPerDay: 24 },
      { id: 'freezer', name: 'فريزر', powerW: 500, quantity: 1, hoursPerDay: 24 },
      { id: 'fan', name: 'مروحة', powerW: 100, quantity: 2, hoursPerDay: 12 },
      { id: 'lighting', name: 'إضاءة', powerW: 50, quantity: 4, hoursPerDay: 12 }
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultAppliances: [
      { id: 'welder', name: 'ماكينة لحام', powerW: 4000, quantity: 1, hoursPerDay: 4 },
      { id: 'grinder', name: 'صاروخ جلخ', powerW: 1000, quantity: 2, hoursPerDay: 4 },
      { id: 'compressor', name: 'كمبريسور هواء', powerW: 2000, quantity: 1, hoursPerDay: 6 },
      { id: 'lighting', name: 'إضاءة كشافة', powerW: 200, quantity: 4, hoursPerDay: 8 }
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    defaultAppliances: [
      { id: 'pump_main', name: 'مضخة مياه رئيسية', powerW: 2200, quantity: 1, hoursPerDay: 6 }
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي', // Water station/well
    defaultAppliances: [
      { id: 'submersible_pump', name: 'طلمبة غاطسة', powerW: 3000, quantity: 1, hoursPerDay: 10 },
      { id: 'surface_pump', name: 'طلمبة سطحية', powerW: 1500, quantity: 1, hoursPerDay: 4 }
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultAppliances: [
      { id: 'ac', name: 'مكيف', powerW: 1500, quantity: 4, hoursPerDay: 6 },
      { id: 'fan', name: 'مروحة', powerW: 100, quantity: 10, hoursPerDay: 6 },
      { id: 'sound_sys', name: 'مكبر صوت', powerW: 200, quantity: 1, hoursPerDay: 3 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, quantity: 20, hoursPerDay: 5 }
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultAppliances: [
      { id: 'printer_large', name: 'ماكينة طباعة', powerW: 3500, quantity: 2, hoursPerDay: 8 },
      { id: 'cutter', name: 'مقص ورق', powerW: 1000, quantity: 1, hoursPerDay: 4 },
      { id: 'ac', name: 'مكيف', powerW: 1500, quantity: 2, hoursPerDay: 10 },
      { id: 'lighting', name: 'إضاءة', powerW: 100, quantity: 10, hoursPerDay: 10 }
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultAppliances: [
      { id: 'espresso_machine', name: 'ماكينة قهوة', powerW: 3000, quantity: 1, hoursPerDay: 12 },
      { id: 'grinder', name: 'طاحونة', powerW: 500, quantity: 2, hoursPerDay: 4 },
      { id: 'fridge', name: 'ثلاجة عرض', powerW: 800, quantity: 1, hoursPerDay: 24 },
      { id: 'ac', name: 'مكيف', powerW: 1500, quantity: 2, hoursPerDay: 14 },
      { id: 'lighting', name: 'إضاءة ديكور', powerW: 50, quantity: 15, hoursPerDay: 14 }
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultAppliances: [
      { id: 'fridge_freezer', name: 'ثلاجات وفريزرات', powerW: 1000, quantity: 4, hoursPerDay: 24 },
      { id: 'extractor', name: 'شفاط هواء', powerW: 1500, quantity: 1, hoursPerDay: 16 },
      { id: 'ac', name: 'مكيف', powerW: 2000, quantity: 3, hoursPerDay: 16 },
      { id: 'lighting', name: 'إضاءة', powerW: 100, quantity: 20, hoursPerDay: 16 }
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultAppliances: [
      { id: 'ac', name: 'مكيفات غرف', powerW: 1500, quantity: 20, hoursPerDay: 12 },
      { id: 'water_heater', name: 'سخانات مياه', powerW: 2000, quantity: 20, hoursPerDay: 4 },
      { id: 'elevator', name: 'مصعد', powerW: 5000, quantity: 1, hoursPerDay: 10 },
      { id: 'fridge', name: 'ثلاجات', powerW: 500, quantity: 5, hoursPerDay: 24 },
      { id: 'lighting', name: 'إضاءة عامة', powerW: 50, quantity: 50, hoursPerDay: 16 }
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultAppliances: [
      { id: 'ac_central', name: 'تكييف مركزي', powerW: 5000, quantity: 2, hoursPerDay: 10 },
      { id: 'pc', name: 'كمبيوتر', powerW: 300, quantity: 15, hoursPerDay: 10 },
      { id: 'server', name: 'سيرفر', powerW: 800, quantity: 2, hoursPerDay: 24 },
      { id: 'atm', name: 'صراف آلي', powerW: 500, quantity: 2, hoursPerDay: 24 },
      { id: 'lighting', name: 'إضاءة', powerW: 50, quantity: 30, hoursPerDay: 10 }
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultAppliances: [
      { id: 'fridge_display', name: 'ثلاجات عرض', powerW: 1000, quantity: 6, hoursPerDay: 24 },
      { id: 'freezer', name: 'فريزرات', powerW: 800, quantity: 4, hoursPerDay: 24 },
      { id: 'ac', name: 'مكيف', powerW: 2000, quantity: 4, hoursPerDay: 16 },
      { id: 'pos', name: 'نقاط بيع', powerW: 200, quantity: 3, hoursPerDay: 16 },
      { id: 'lighting', name: 'إضاءة', powerW: 100, quantity: 30, hoursPerDay: 16 }
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultAppliances: [
      { id: 'fuel_pump', name: 'مضخة وقود', powerW: 1500, quantity: 4, hoursPerDay: 8 },
      { id: 'lighting_canopy', name: 'إضاءة المظلة', powerW: 150, quantity: 10, hoursPerDay: 12 },
      { id: 'ac_office', name: 'مكيف الإدارة', powerW: 1500, quantity: 1, hoursPerDay: 12 }
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultAppliances: [
      { id: 'crusher', name: 'طاحونة/كسارة', powerW: 7500, quantity: 2, hoursPerDay: 16 },
      { id: 'water_pump', name: 'مضخة مياه كبيرة', powerW: 4000, quantity: 2, hoursPerDay: 12 },
      { id: 'welder', name: 'ماكينة لحام', powerW: 5000, quantity: 2, hoursPerDay: 6 },
      { id: 'lighting', name: 'كشافات إضاءة', powerW: 400, quantity: 20, hoursPerDay: 12 },
      { id: 'ac_camp', name: 'مكيفات السكن', powerW: 1500, quantity: 10, hoursPerDay: 8 }
    ]
  }
];

export const getFacilities = () => FACILITY_TYPES.map(f => ({ id: f.id, name: f.name }));

export const getFacilityDefaultAppliances = (facilityId) => {
  const facility = FACILITY_TYPES.find(f => f.id === facilityId);
  return facility ? facility.defaultAppliances.map(app => ({...app})) : []; // Return deep copy
};

/**
 * Calculates the solar system requirements based on a list of appliances.
 * @param {Array} appliances - Array of appliance objects { powerW, quantity, hoursPerDay }
 * @returns {Object} Calculated system requirements
 */
export const calculateSolarSystem = (appliances) => {
  if (!appliances || appliances.length === 0) {
    return {
      dailyEnergyWh: 0,
      totalPowerW: 0,
      recommendedInverterW: 0,
      recommendedPanelsKw: 0,
      batteryCapacityWh: 0
    };
  }

  // 1. Calculate total daily energy consumption (Wh)
  const dailyEnergyWh = appliances.reduce((total, app) => {
    return total + (app.powerW * app.quantity * app.hoursPerDay);
  }, 0);

  // 2. Calculate peak power load (W)
  const totalPowerW = appliances.reduce((total, app) => {
    return total + (app.powerW * app.quantity);
  }, 0);

  // 3. Recommended Inverter Size (Peak Power * 1.25 for safety margin)
  const recommendedInverterW = totalPowerW * 1.25;

  // 4. Recommended Solar Panels (kW)
  // Assuming 5 peak sun hours per day and 80% system efficiency
  // Panels (W) = DailyEnergyWh / (5 hours * 0.8)
  const recommendedPanelsW = dailyEnergyWh / (5 * 0.8);
  const recommendedPanelsKw = recommendedPanelsW / 1000;

  // 5. Battery Capacity for 1 day autonomy (Wh)
  // Assuming 50% Depth of Discharge for Lead Acid/Gel, or roughly 80% for Lithium.
  // We'll use a standard 60% usable capacity average for general estimation.
  // Battery Capacity (Wh) = DailyEnergyWh / 0.6
  const batteryCapacityWh = dailyEnergyWh / 0.6;

  return {
    dailyEnergyWh: Math.round(dailyEnergyWh),
    totalPowerW: Math.round(totalPowerW),
    recommendedInverterW: Math.round(recommendedInverterW),
    recommendedPanelsKw: Number(recommendedPanelsKw.toFixed(2)),
    batteryCapacityWh: Math.round(batteryCapacityWh)
  };
};
