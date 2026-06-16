// Constants for typical component efficiencies and safety margins
export const SYSTEM_CONSTANTS = {
  INVERTER_EFFICIENCY: 0.95, // 95% efficiency
  BATTERY_DEPTH_OF_DISCHARGE: 0.8, // 80% DoD for Lithium-ion, adjust if Lead-Acid
  SYSTEM_VOLTAGE: 48, // 48V standard for larger systems
  PEAK_SUN_HOURS: 5.5, // Average peak sun hours (adjust based on region, e.g., Sudan is high)
  SAFETY_MARGIN: 1.25, // 25% safety margin for inverter sizing
  BATTERY_AUTONOMY_DAYS: 1, // Number of days the battery should power the load without sun
};

// Pre-defined consumption patterns (in Arabic as requested)
export const CONSUMPTION_PATTERNS = {
  "مصنع تلج": [ // Ice factory
    { id: '1', name: "ماكينة صنع الثلج (Ice Machine)", power: 5000, quantity: 2, hours: 24 },
    { id: '2', name: "فريزر (Freezer)", power: 1500, quantity: 4, hours: 24 },
    { id: '3', name: "إضاءة (Lighting)", power: 40, quantity: 10, hours: 12 },
  ],
  "شركة": [ // Company
    { id: '1', name: "مكيف (Air Conditioner)", power: 1500, quantity: 5, hours: 8 },
    { id: '2', name: "حاسوب (Computer)", power: 200, quantity: 15, hours: 8 },
    { id: '3', name: "إضاءة (Lighting)", power: 40, quantity: 30, hours: 10 },
    { id: '4', name: "طابعة (Printer)", power: 500, quantity: 2, hours: 2 },
  ],
  "مزرعة": [ // Farm
    { id: '1', name: "مضخة مياه (Water Pump)", power: 2200, quantity: 1, hours: 6 },
    { id: '2', name: "إضاءة خارجية (Outdoor Lighting)", power: 50, quantity: 10, hours: 12 },
    { id: '3', name: "ثلاجة (Refrigerator)", power: 400, quantity: 1, hours: 24 },
  ],
  "مزرعة دواجن": [ // Poultry farm
    { id: '1', name: "مراوح تهوية (Ventilation Fans)", power: 750, quantity: 6, hours: 24 },
    { id: '2', name: "إضاءة (Lighting)", power: 20, quantity: 50, hours: 16 },
    { id: '3', name: "نظام تغذية (Feeding System)", power: 1000, quantity: 2, hours: 4 },
  ],
  "بيوت محمية": [ // Greenhouses
    { id: '1', name: "مضخة تبريد (Cooling Pump)", power: 1500, quantity: 2, hours: 12 },
    { id: '2', name: "مراوح (Fans)", power: 500, quantity: 4, hours: 12 },
    { id: '3', name: "إضاءة زراعية (Grow Lights)", power: 100, quantity: 20, hours: 8 },
  ],
  "مصنع": [ // Factory
    { id: '1', name: "محرك صناعي (Industrial Motor)", power: 7500, quantity: 3, hours: 10 },
    { id: '2', name: "إضاءة (Lighting)", power: 100, quantity: 40, hours: 12 },
    { id: '3', name: "مكيفات (Air Conditioners)", power: 2000, quantity: 5, hours: 10 },
  ],
  "مستوصف": [ // Clinic
    { id: '1', name: "إضاءة (Lighting)", power: 40, quantity: 20, hours: 12 },
    { id: '2', name: "مكيف (Air Conditioner)", power: 1500, quantity: 4, hours: 12 },
    { id: '3', name: "ثلاجة أدوية (Medicine Fridge)", power: 300, quantity: 2, hours: 24 },
    { id: '4', name: "معدات طبية (Medical Equipment)", power: 1000, quantity: 2, hours: 6 },
  ],
  "مستشفي": [ // Hospital
    { id: '1', name: "مكيفات (Air Conditioners)", power: 2000, quantity: 20, hours: 24 },
    { id: '2', name: "إضاءة (Lighting)", power: 40, quantity: 100, hours: 24 },
    { id: '3', name: "معدات طبية ثقيلة (Heavy Medical Eq.)", power: 5000, quantity: 3, hours: 8 },
    { id: '4', name: "ثلاجات (Refrigerators)", power: 500, quantity: 10, hours: 24 },
  ],
  "مخبز": [ // Bakery
    { id: '1', name: "عجانة (Dough Mixer)", power: 2000, quantity: 2, hours: 6 },
    { id: '2', name: "فرن كهربائي (Electric Oven)", power: 8000, quantity: 1, hours: 8 },
    { id: '3', name: "إضاءة (Lighting)", power: 40, quantity: 10, hours: 12 },
  ],
  "دكان": [ // Shop
    { id: '1', name: "إضاءة (Lighting)", power: 20, quantity: 6, hours: 12 },
    { id: '2', name: "ثلاجة عرض (Display Fridge)", power: 600, quantity: 2, hours: 24 },
    { id: '3', name: "مروحة (Fan)", power: 75, quantity: 2, hours: 12 },
  ],
  "ورشة": [ // Workshop
    { id: '1', name: "ماكينة لحام (Welding Machine)", power: 4000, quantity: 1, hours: 4 },
    { id: '2', name: "صاروخ تقطيع (Grinder)", power: 1000, quantity: 2, hours: 3 },
    { id: '3', name: "إضاءة (Lighting)", power: 50, quantity: 8, hours: 10 },
  ],
  "مضخة موية": [ // Water pump
    { id: '1', name: "مضخة غاطسة (Submersible Pump)", power: 3000, quantity: 1, hours: 8 },
  ],
  "دونكي": [ // Donkey/Well pump
    { id: '1', name: "مضخة بئر (Well Pump)", power: 5500, quantity: 1, hours: 10 },
  ],
  "مسجد": [ // Mosque
    { id: '1', name: "مكيف (Air Conditioner)", power: 2000, quantity: 6, hours: 5 },
    { id: '2', name: "مراوح (Fans)", power: 75, quantity: 15, hours: 8 },
    { id: '3', name: "إضاءة (Lighting)", power: 40, quantity: 25, hours: 6 },
    { id: '4', name: "مكبر صوت (Sound System)", power: 200, quantity: 1, hours: 5 },
  ],
  "مطبعة": [ // Printing press
    { id: '1', name: "ماكينة طباعة (Printing Machine)", power: 3000, quantity: 2, hours: 8 },
    { id: '2', name: "ماكينة قص (Cutting Machine)", power: 1500, quantity: 1, hours: 4 },
    { id: '3', name: "إضاءة (Lighting)", power: 60, quantity: 15, hours: 10 },
  ],
  "كوفي شوب": [ // Coffee shop
    { id: '1', name: "ماكينة قهوة (Espresso Machine)", power: 3500, quantity: 1, hours: 12 },
    { id: '2', name: "ثلاجة عرض (Display Fridge)", power: 500, quantity: 1, hours: 24 },
    { id: '3', name: "مكيف (Air Conditioner)", power: 1500, quantity: 2, hours: 14 },
    { id: '4', name: "إضاءة (Lighting)", power: 30, quantity: 20, hours: 14 },
  ],
  "مطعم": [ // Restaurant
    { id: '1', name: "ثلاجة / فريزر (Fridge/Freezer)", power: 800, quantity: 4, hours: 24 },
    { id: '2', name: "مكيف (Air Conditioner)", power: 2000, quantity: 4, hours: 16 },
    { id: '3', name: "شفاط (Exhaust Hood)", power: 1000, quantity: 2, hours: 14 },
    { id: '4', name: "إضاءة (Lighting)", power: 40, quantity: 30, hours: 16 },
  ],
  "فندق": [ // Hotel
    { id: '1', name: "مكيفات (Air Conditioners)", power: 1500, quantity: 50, hours: 12 },
    { id: '2', name: "سخانات مياه (Water Heaters)", power: 2000, quantity: 20, hours: 4 },
    { id: '3', name: "مصعد (Elevator)", power: 7500, quantity: 2, hours: 6 },
    { id: '4', name: "إضاءة (Lighting)", power: 20, quantity: 200, hours: 12 },
  ],
  "بنك": [ // Bank
    { id: '1', name: "مكيف (Air Conditioner)", power: 1500, quantity: 10, hours: 10 },
    { id: '2', name: "أجهزة كمبيوتر (Computers)", power: 200, quantity: 30, hours: 10 },
    { id: '3', name: "سيرفرات (Servers)", power: 1000, quantity: 2, hours: 24 },
    { id: '4', name: "إضاءة (Lighting)", power: 40, quantity: 50, hours: 12 },
  ],
  "سوبر ماركت": [ // Supermarket
    { id: '1', name: "ثلاجات عرض (Display Fridges)", power: 1200, quantity: 10, hours: 24 },
    { id: '2', name: "فريزرات (Freezers)", power: 1500, quantity: 5, hours: 24 },
    { id: '3', name: "مكيف (Air Conditioner)", power: 2500, quantity: 4, hours: 16 },
    { id: '4', name: "إضاءة (Lighting)", power: 50, quantity: 40, hours: 18 },
  ],
  "طرمبة وقود": [ // Fuel station
    { id: '1', name: "مضخات وقود (Fuel Pumps)", power: 1000, quantity: 4, hours: 24 },
    { id: '2', name: "إضاءة خارجية (Canopy Lighting)", power: 100, quantity: 12, hours: 12 },
    { id: '3', name: "مكيف البقالة (Shop AC)", power: 1500, quantity: 1, hours: 24 },
  ],
  "شركة تعدين": [ // Mining company
    { id: '1', name: "مضخة مياه ضخمة (Large Water Pump)", power: 15000, quantity: 2, hours: 12 },
    { id: '2', name: "كسارات (Crushers)", power: 20000, quantity: 1, hours: 10 },
    { id: '3', name: "مكيفات سكن (Camp ACs)", power: 1500, quantity: 20, hours: 10 },
    { id: '4', name: "إضاءة (Lighting)", power: 100, quantity: 50, hours: 12 },
  ],
};

/**
 * Business logic calculations for the solar system.
 * @param {Array} appliances - Array of appliance objects { power, quantity, hours }
 * @returns {Object} Calculated system requirements
 */
export const calculateSolarSystem = (appliances) => {
  // 1. Calculate Total Daily Energy Consumption (Wh)
  const totalDailyEnergyWh = appliances.reduce((sum, item) => {
    return sum + (item.power * item.quantity * item.hours);
  }, 0);

  // 2. Calculate Total Peak Power (W)
  const totalPeakPowerW = appliances.reduce((sum, item) => {
    return sum + (item.power * item.quantity);
  }, 0);

  // 3. Recommended Inverter Size (W)
  // Inverter should handle total peak power + safety margin
  const inverterSizeW = totalPeakPowerW * SYSTEM_CONSTANTS.SAFETY_MARGIN;

  // 4. Recommended Battery Capacity (Ah)
  // Total Energy required from battery = Total Daily Energy / Inverter Efficiency
  const energyRequiredFromBatteryWh = totalDailyEnergyWh / SYSTEM_CONSTANTS.INVERTER_EFFICIENCY;

  // Usable battery capacity needed
  const usableBatteryCapacityWh = energyRequiredFromBatteryWh * SYSTEM_CONSTANTS.BATTERY_AUTONOMY_DAYS;

  // Total battery capacity needed (considering Depth of Discharge)
  const totalBatteryCapacityWh = usableBatteryCapacityWh / SYSTEM_CONSTANTS.BATTERY_DEPTH_OF_DISCHARGE;

  // Battery Capacity in Ampere-hours (Ah)
  const batteryCapacityAh = totalBatteryCapacityWh / SYSTEM_CONSTANTS.SYSTEM_VOLTAGE;

  // 5. Recommended Solar Panel Capacity (W)
  // Solar panels need to generate enough energy to power daily loads and charge batteries
  // Considering system losses (efficiency)
  const requiredDailyGenerationWh = totalDailyEnergyWh / SYSTEM_CONSTANTS.INVERTER_EFFICIENCY;
  const solarPanelCapacityW = requiredDailyGenerationWh / SYSTEM_CONSTANTS.PEAK_SUN_HOURS;

  return {
    totalDailyEnergyKWh: totalDailyEnergyWh / 1000,
    totalPeakPowerKW: totalPeakPowerW / 1000,
    inverterSizeKW: inverterSizeW / 1000,
    batteryCapacityAh: batteryCapacityAh,
    solarPanelCapacityKW: solarPanelCapacityW / 1000,
  };
};
