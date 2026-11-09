export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع تلج', defaultAppliances: [
    { id: '1', name: 'ماكينة ثلج', power: 5000, quantity: 2, hours: 24 },
    { id: '2', name: 'إضاءة', power: 20, quantity: 10, hours: 12 }
  ]},
  { id: 'company', name: 'شركة', defaultAppliances: [
    { id: '1', name: 'مكيف', power: 1500, quantity: 4, hours: 8 },
    { id: '2', name: 'كمبيوتر', power: 250, quantity: 10, hours: 8 },
    { id: '3', name: 'إضاءة', power: 20, quantity: 20, hours: 10 }
  ]},
  { id: 'farm', name: 'مزرعة', defaultAppliances: [
    { id: '1', name: 'مضخة ماء', power: 2200, quantity: 1, hours: 6 },
    { id: '2', name: 'إضاءة', power: 20, quantity: 5, hours: 12 }
  ]},
  { id: 'poultry_farm', name: 'مزرعة دواجن', defaultAppliances: [
    { id: '1', name: 'مراوح تهوية', power: 500, quantity: 10, hours: 24 },
    { id: '2', name: 'إضاءة', power: 20, quantity: 30, hours: 16 },
    { id: '3', name: 'سخانات', power: 2000, quantity: 5, hours: 12 }
  ]},
  { id: 'greenhouse', name: 'بيوت محمية', defaultAppliances: [
    { id: '1', name: 'مضخة ري', power: 1500, quantity: 2, hours: 4 },
    { id: '2', name: 'مراوح تبريد', power: 750, quantity: 4, hours: 10 }
  ]},
  { id: 'factory', name: 'مصنع', defaultAppliances: [
    { id: '1', name: 'ماكينات تصنيع', power: 10000, quantity: 3, hours: 12 },
    { id: '2', name: 'إضاءة', power: 50, quantity: 40, hours: 12 }
  ]},
  { id: 'clinic', name: 'مستوصف', defaultAppliances: [
    { id: '1', name: 'مكيف', power: 1500, quantity: 5, hours: 12 },
    { id: '2', name: 'ثلاجة أدوية', power: 200, quantity: 2, hours: 24 },
    { id: '3', name: 'إضاءة', power: 20, quantity: 20, hours: 14 }
  ]},
  { id: 'hospital', name: 'مستشفي', defaultAppliances: [
    { id: '1', name: 'أجهزة طبية', power: 3000, quantity: 10, hours: 24 },
    { id: '2', name: 'مكيف مركزي', power: 10000, quantity: 2, hours: 24 },
    { id: '3', name: 'إضاءة', power: 20, quantity: 100, hours: 24 }
  ]},
  { id: 'bakery', name: 'مخبز', defaultAppliances: [
    { id: '1', name: 'عجانة', power: 2000, quantity: 2, hours: 8 },
    { id: '2', name: 'فرن كهربائي', power: 5000, quantity: 1, hours: 12 },
    { id: '3', name: 'إضاءة', power: 20, quantity: 10, hours: 12 }
  ]},
  { id: 'shop', name: 'دكان', defaultAppliances: [
    { id: '1', name: 'ثلاجة', power: 300, quantity: 2, hours: 24 },
    { id: '2', name: 'مروحة', power: 70, quantity: 2, hours: 16 },
    { id: '3', name: 'إضاءة', power: 20, quantity: 4, hours: 12 }
  ]},
  { id: 'workshop', name: 'ورشة', defaultAppliances: [
    { id: '1', name: 'ماكينة لحام', power: 4000, quantity: 1, hours: 4 },
    { id: '2', name: 'صاروخ قطع', power: 2000, quantity: 2, hours: 6 },
    { id: '3', name: 'إضاءة', power: 50, quantity: 10, hours: 10 }
  ]},
  { id: 'water_pump', name: 'مضخة موية', defaultAppliances: [
    { id: '1', name: 'مضخة غاطسة', power: 3000, quantity: 1, hours: 8 }
  ]},
  { id: 'donkey_engine', name: 'دونكي', defaultAppliances: [
    { id: '1', name: 'محرك مياه', power: 2200, quantity: 1, hours: 6 }
  ]},
  { id: 'mosque', name: 'مسجد', defaultAppliances: [
    { id: '1', name: 'مكيف', power: 2000, quantity: 6, hours: 6 },
    { id: '2', name: 'مكبر صوت', power: 150, quantity: 1, hours: 2 },
    { id: '3', name: 'إضاءة', power: 20, quantity: 30, hours: 8 }
  ]},
  { id: 'press', name: 'مطبعة', defaultAppliances: [
    { id: '1', name: 'ماكينة طباعة', power: 3000, quantity: 2, hours: 10 },
    { id: '2', name: 'كمبيوتر', power: 300, quantity: 3, hours: 10 },
    { id: '3', name: 'مكيف', power: 1500, quantity: 2, hours: 10 }
  ]},
  { id: 'cafe', name: 'كوفي شوب', defaultAppliances: [
    { id: '1', name: 'ماكينة قهوة', power: 2500, quantity: 1, hours: 12 },
    { id: '2', name: 'ثلاجة عرض', power: 400, quantity: 2, hours: 24 },
    { id: '3', name: 'مكيف', power: 1500, quantity: 2, hours: 12 },
    { id: '4', name: 'إضاءة', power: 20, quantity: 15, hours: 14 }
  ]},
  { id: 'restaurant', name: 'مطعم', defaultAppliances: [
    { id: '1', name: 'ثلاجة', power: 500, quantity: 4, hours: 24 },
    { id: '2', name: 'مكيف', power: 2000, quantity: 3, hours: 14 },
    { id: '3', name: 'إضاءة', power: 20, quantity: 20, hours: 14 }
  ]},
  { id: 'hotel', name: 'فندق', defaultAppliances: [
    { id: '1', name: 'مكيف', power: 1500, quantity: 20, hours: 12 },
    { id: '2', name: 'تلفزيون', power: 100, quantity: 20, hours: 6 },
    { id: '3', name: 'ثلاجة صغيرة', power: 100, quantity: 20, hours: 24 },
    { id: '4', name: 'إضاءة', power: 20, quantity: 100, hours: 12 }
  ]},
  { id: 'bank', name: 'بنك', defaultAppliances: [
    { id: '1', name: 'كمبيوتر', power: 250, quantity: 15, hours: 10 },
    { id: '2', name: 'مكيف مركزي', power: 5000, quantity: 2, hours: 10 },
    { id: '3', name: 'صراف آلي', power: 500, quantity: 2, hours: 24 },
    { id: '4', name: 'إضاءة', power: 20, quantity: 40, hours: 12 }
  ]},
  { id: 'supermarket', name: 'سوبر ماركت', defaultAppliances: [
    { id: '1', name: 'ثلاجة عرض', power: 800, quantity: 6, hours: 24 },
    { id: '2', name: 'فريزر', power: 600, quantity: 4, hours: 24 },
    { id: '3', name: 'مكيف', power: 2000, quantity: 4, hours: 16 },
    { id: '4', name: 'إضاءة', power: 20, quantity: 30, hours: 16 }
  ]},
  { id: 'gas_station', name: 'طرمبة وقود', defaultAppliances: [
    { id: '1', name: 'مضخة وقود', power: 1000, quantity: 4, hours: 12 },
    { id: '2', name: 'إضاءة خارجية', power: 100, quantity: 10, hours: 12 }
  ]},
  { id: 'mining_company', name: 'شركة تعدين', defaultAppliances: [
    { id: '1', name: 'معدات تعدين', power: 15000, quantity: 2, hours: 16 },
    { id: '2', name: 'مضخة مياه ضخمة', power: 5000, quantity: 2, hours: 12 },
    { id: '3', name: 'إضاءة كشافات', power: 500, quantity: 10, hours: 12 }
  ]}
];

export const SYSTEM_CONSTANTS = {
  SAFETY_MARGIN: 1.25,        // 25% extra for inverter
  SYSTEM_LOSSES: 1.3,         // 30% losses for solar panels
  PEAK_SUN_HOURS: 5,          // Average peak sun hours
  PANEL_WATTAGE: 550,         // Default panel wattage
  BATTERY_VOLTAGE: 48,        // Default system voltage
  BATTERY_CAPACITY_AH: 200,   // Default battery capacity Ah
  DEPTH_OF_DISCHARGE: 0.8     // 80% DoD
};

export const calculateSolarSystem = (appliances) => {
  let totalDailyEnergyWh = 0;
  let totalPowerW = 0;

  appliances.forEach(app => {
    const power = Number(app.power) || 0;
    const quantity = Number(app.quantity) || 0;
    const hours = Number(app.hours) || 0;

    totalPowerW += (power * quantity);
    totalDailyEnergyWh += (power * quantity * hours);
  });

  const inverterCapacityW = totalPowerW * SYSTEM_CONSTANTS.SAFETY_MARGIN;

  const requiredSolarEnergyWh = totalDailyEnergyWh * SYSTEM_CONSTANTS.SYSTEM_LOSSES;
  const numberOfPanels = Math.ceil(requiredSolarEnergyWh / (SYSTEM_CONSTANTS.PANEL_WATTAGE * SYSTEM_CONSTANTS.PEAK_SUN_HOURS));

  // Batteries needed = Total Wh / (Battery Voltage * DoD) -> gives total Ah needed
  // Then divide by single battery Ah
  const totalAhNeeded = totalDailyEnergyWh / (SYSTEM_CONSTANTS.BATTERY_VOLTAGE * SYSTEM_CONSTANTS.DEPTH_OF_DISCHARGE);
  const numberOfBatteries = Math.ceil(totalAhNeeded / SYSTEM_CONSTANTS.BATTERY_CAPACITY_AH);

  return {
    totalDailyEnergyWh,
    totalPowerW,
    inverterCapacityW,
    numberOfPanels,
    numberOfBatteries,
    panelWattage: SYSTEM_CONSTANTS.PANEL_WATTAGE,
    batteryVoltage: SYSTEM_CONSTANTS.BATTERY_VOLTAGE,
    batteryCapacity: SYSTEM_CONSTANTS.BATTERY_CAPACITY_AH
  };
};
