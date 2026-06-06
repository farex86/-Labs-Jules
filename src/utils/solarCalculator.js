// Constants for Solar System Calculations
export const SOLAR_CONSTANTS = {
  // Average peak sun hours (can be configurable later)
  PEAK_SUN_HOURS: 5.5,

  // System efficiencies
  INVERTER_EFFICIENCY: 0.95,
  BATTERY_EFFICIENCY: 0.90,
  SYSTEM_LOSSES: 0.20, // wiring, dust, temperature losses (20%)

  // Depth of Discharge for batteries
  LITHIUM_DOD: 0.80,
  LEAD_ACID_DOD: 0.50,

  // Days of Autonomy (days without sun)
  DAYS_OF_AUTONOMY: 1,

  // Safety margin for inverter sizing
  INVERTER_SAFETY_MARGIN: 1.25,
};

// Facility Types / Usage Profiles (انماط الاستهلاك)
export const FACILITY_PROFILES = {
  "ice_factory": {
    name: "مصنع ثلج", // Ice Factory
    devices: [
      { id: "1", name: "ماكينة صنع الثلج", power: 15000, quantity: 1, hours: 24 }, // Ice machine
      { id: "2", name: "مضخة مياه", power: 2000, quantity: 2, hours: 12 }, // Water pump
      { id: "3", name: "إضاءة", power: 50, quantity: 20, hours: 12 }, // Lighting
      { id: "4", name: "مكيف هواء", power: 2500, quantity: 1, hours: 8 } // AC
    ]
  },
  "company": {
    name: "شركة", // Company/Office
    devices: [
      { id: "1", name: "كمبيوتر مكتبي", power: 250, quantity: 10, hours: 10 }, // Desktop PC
      { id: "2", name: "إضاءة", power: 40, quantity: 30, hours: 12 }, // Lighting
      { id: "3", name: "مكيف هواء", power: 2000, quantity: 4, hours: 10 }, // AC
      { id: "4", name: "طابعة/ماكينة تصوير", power: 600, quantity: 2, hours: 4 }, // Printer/Copier
      { id: "5", name: "ثلاجة صغيرة", power: 150, quantity: 1, hours: 24 } // Mini-fridge
    ]
  },
  "farm": {
    name: "مزرعة", // Farm
    devices: [
      { id: "1", name: "مضخة غاطسة", power: 5500, quantity: 1, hours: 8 }, // Submersible pump
      { id: "2", name: "إضاءة خارجية", power: 100, quantity: 10, hours: 12 }, // Outdoor lighting
      { id: "3", name: "سكن العمال (إضاءة ومراوح)", power: 500, quantity: 1, hours: 12 } // Worker housing
    ]
  },
  "poultry_farm": {
    name: "مزرعة دواجن", // Poultry Farm
    devices: [
      { id: "1", name: "مراوح تهوية", power: 750, quantity: 6, hours: 24 }, // Ventilation fans
      { id: "2", name: "إضاءة", power: 40, quantity: 50, hours: 16 }, // Lighting
      { id: "3", name: "نظام التغذية الآلي", power: 1500, quantity: 1, hours: 4 }, // Auto feeder
      { id: "4", name: "دفايات", power: 2000, quantity: 4, hours: 12 } // Heaters (seasonal)
    ]
  },
  "greenhouses": {
    name: "بيوت محمية", // Greenhouses
    devices: [
      { id: "1", name: "مراوح تبريد", power: 1100, quantity: 4, hours: 12 }, // Cooling fans
      { id: "2", name: "مضخة ري", power: 2200, quantity: 1, hours: 4 }, // Irrigation pump
      { id: "3", name: "مضخة تبريد بخرية", power: 750, quantity: 2, hours: 12 } // Evaporative cooling pump
    ]
  },
  "factory": {
    name: "مصنع", // Factory
    devices: [
      { id: "1", name: "ماكينات إنتاج", power: 20000, quantity: 2, hours: 16 }, // Production machines
      { id: "2", name: "إضاءة صناعية", power: 150, quantity: 40, hours: 16 }, // Industrial lighting
      { id: "3", name: "مكيفات مكتبية", power: 2000, quantity: 3, hours: 10 } // Office ACs
    ]
  },
  "clinic": {
    name: "مستوصف", // Clinic
    devices: [
      { id: "1", name: "إضاءة", power: 40, quantity: 40, hours: 24 }, // Lighting
      { id: "2", name: "مكيفات", power: 2000, quantity: 6, hours: 16 }, // ACs
      { id: "3", name: "ثلاجة حفظ الأدوية", power: 300, quantity: 2, hours: 24 }, // Medicine fridge
      { id: "4", name: "معدات طبية متنوعة", power: 1500, quantity: 1, hours: 8 }, // Medical equip
      { id: "5", name: "كمبيوترات", power: 200, quantity: 5, hours: 12 } // Computers
    ]
  },
  "hospital": {
    name: "مستشفى", // Hospital
    devices: [
      { id: "1", name: "إضاءة", power: 40, quantity: 200, hours: 24 }, // Lighting
      { id: "2", name: "تكييف مركزي", power: 50000, quantity: 1, hours: 24 }, // Central AC
      { id: "3", name: "أجهزة طبية (عناية، غرف عمليات)", power: 15000, quantity: 1, hours: 24 }, // Medical equip
      { id: "4", name: "ثلاجات وتجميد", power: 500, quantity: 10, hours: 24 }, // Fridges
      { id: "5", name: "مصاعد", power: 10000, quantity: 2, hours: 8 } // Elevators
    ]
  },
  "bakery": {
    name: "مخبز", // Bakery
    devices: [
      { id: "1", name: "عجانة", power: 3000, quantity: 2, hours: 8 }, // Mixer
      { id: "2", name: "فرن كهربائي/مروحة", power: 5000, quantity: 1, hours: 12 }, // Oven/fan
      { id: "3", name: "إضاءة", power: 50, quantity: 10, hours: 16 }, // Lighting
      { id: "4", name: "ثلاجة عرض", power: 800, quantity: 2, hours: 24 } // Display fridge
    ]
  },
  "shop": {
    name: "دكان", // Shop/Grocery
    devices: [
      { id: "1", name: "ثلاجة عرض", power: 600, quantity: 2, hours: 24 }, // Display fridge
      { id: "2", name: "فريزر", power: 500, quantity: 1, hours: 24 }, // Freezer
      { id: "3", name: "إضاءة", power: 40, quantity: 6, hours: 14 }, // Lighting
      { id: "4", name: "مروحة سقف", power: 80, quantity: 2, hours: 14 } // Ceiling fan
    ]
  },
  "workshop": {
    name: "ورشة", // Workshop
    devices: [
      { id: "1", name: "ماكينة لحام", power: 5000, quantity: 1, hours: 4 }, // Welding machine
      { id: "2", name: "صاروخ قص/جلخ", power: 2000, quantity: 2, hours: 6 }, // Grinder
      { id: "3", name: "دريل (مثقاب)", power: 800, quantity: 2, hours: 4 }, // Drill
      { id: "4", name: "إضاءة كاشفة", power: 200, quantity: 4, hours: 8 } // Floodlights
    ]
  },
  "water_pump": {
    name: "مضخة موية", // Water Pump Station
    devices: [
      { id: "1", name: "مضخة سطحية/غاطسة", power: 7500, quantity: 1, hours: 10 }, // Pump
      { id: "2", name: "إضاءة الموقع", power: 100, quantity: 2, hours: 12 } // Site lighting
    ]
  },
  "donkey": {
    name: "دونكي", // Donkey (traditional water point)
    devices: [
      { id: "1", name: "مضخة غاطسة صغيرة", power: 2200, quantity: 1, hours: 8 } // Small submersible pump
    ]
  },
  "mosque": {
    name: "مسجد", // Mosque
    devices: [
      { id: "1", name: "مكيفات سبليت", power: 2500, quantity: 6, hours: 6 }, // Split ACs
      { id: "2", name: "مراوح سقف", power: 80, quantity: 20, hours: 8 }, // Ceiling fans
      { id: "3", name: "إضاءة", power: 40, quantity: 40, hours: 5 }, // Lighting
      { id: "4", name: "مكبرات صوت", power: 300, quantity: 1, hours: 3 } // Audio system
    ]
  },
  "printing_press": {
    name: "مطبعة", // Printing Press
    devices: [
      { id: "1", name: "ماكينة طباعة", power: 8000, quantity: 1, hours: 10 }, // Printing machine
      { id: "2", name: "ماكينة قص ورق", power: 3000, quantity: 1, hours: 4 }, // Paper cutter
      { id: "3", name: "كمبيوترات", power: 250, quantity: 4, hours: 10 }, // Computers
      { id: "4", name: "إضاءة", power: 50, quantity: 20, hours: 10 }, // Lighting
      { id: "5", name: "مكيفات", power: 2000, quantity: 3, hours: 10 } // ACs
    ]
  },
  "coffee_shop": {
    name: "كوفي شوب", // Coffee Shop
    devices: [
      { id: "1", name: "ماكينة إسبريسو", power: 4000, quantity: 1, hours: 12 }, // Espresso machine
      { id: "2", name: "طاحونة قهوة", power: 500, quantity: 2, hours: 4 }, // Coffee grinder
      { id: "3", name: "ثلاجة عرض", power: 600, quantity: 1, hours: 24 }, // Display fridge
      { id: "4", name: "مكيفات", power: 2000, quantity: 2, hours: 16 }, // ACs
      { id: "5", name: "إضاءة ديكورية", power: 20, quantity: 40, hours: 16 } // Decorative lighting
    ]
  },
  "restaurant": {
    name: "مطعم", // Restaurant
    devices: [
      { id: "1", name: "ثلاجات وتجميد", power: 800, quantity: 4, hours: 24 }, // Fridges/Freezers
      { id: "2", name: "شفاطات هواء", power: 1500, quantity: 2, hours: 16 }, // Exhaust fans
      { id: "3", name: "إضاءة", power: 40, quantity: 50, hours: 16 }, // Lighting
      { id: "4", name: "مكيفات الصالة", power: 2500, quantity: 4, hours: 16 }, // Hall ACs
      { id: "5", name: "خلاطات وعجانات", power: 1000, quantity: 2, hours: 6 } // Blenders/Mixers
    ]
  },
  "hotel": {
    name: "فندق", // Hotel
    devices: [
      { id: "1", name: "مكيفات غرف", power: 1500, quantity: 50, hours: 16 }, // Room ACs
      { id: "2", name: "إضاءة الممرات والغرف", power: 40, quantity: 200, hours: 12 }, // Lighting
      { id: "3", name: "مصعد", power: 7500, quantity: 1, hours: 24 }, // Elevator
      { id: "4", name: "غسالات ومجففات", power: 3000, quantity: 4, hours: 8 }, // Washers/Dryers
      { id: "5", name: "ثلاجات", power: 300, quantity: 10, hours: 24 } // Fridges
    ]
  },
  "bank": {
    name: "بنك", // Bank
    devices: [
      { id: "1", name: "كمبيوترات", power: 250, quantity: 30, hours: 10 }, // Computers
      { id: "2", name: "سيرفرات", power: 1500, quantity: 2, hours: 24 }, // Servers
      { id: "3", name: "تكييف مركزي", power: 20000, quantity: 1, hours: 12 }, // Central AC
      { id: "4", name: "إضاءة", power: 40, quantity: 100, hours: 12 }, // Lighting
      { id: "5", name: "صرافات آلية (ATM)", power: 500, quantity: 3, hours: 24 } // ATMs
    ]
  },
  "supermarket": {
    name: "سوبر ماركت", // Supermarket
    devices: [
      { id: "1", name: "ثلاجات عرض منتجات", power: 1200, quantity: 6, hours: 24 }, // Display fridges
      { id: "2", name: "فريزرات عميقة", power: 1000, quantity: 4, hours: 24 }, // Deep freezers
      { id: "3", name: "تكييف", power: 2500, quantity: 4, hours: 16 }, // ACs
      { id: "4", name: "إضاءة", power: 50, quantity: 60, hours: 16 }, // Lighting
      { id: "5", name: "نقاط بيع (كاشير)", power: 150, quantity: 3, hours: 16 } // POS systems
    ]
  },
  "gas_station": {
    name: "طرمبة وقود", // Gas Station
    devices: [
      { id: "1", name: "مضخات وقود", power: 1500, quantity: 4, hours: 24 }, // Fuel pumps
      { id: "2", name: "إضاءة المظلة الخارجية", power: 150, quantity: 12, hours: 12 }, // Canopy lighting
      { id: "3", name: "كمبيوترات وإدارة", power: 250, quantity: 2, hours: 24 }, // Office PCs
      { id: "4", name: "تكييف مكتب الإدارة", power: 1500, quantity: 1, hours: 24 }, // Office AC
      { id: "5", name: "ضاغط هواء (كمبروسر)", power: 2200, quantity: 1, hours: 4 } // Air compressor
    ]
  },
  "mining_company": {
    name: "شركة تعدين", // Mining Company
    devices: [
      { id: "1", name: "معدات طحن/كسارات", power: 50000, quantity: 2, hours: 16 }, // Crushers/Mills
      { id: "2", name: "مضخات مياه كبيرة", power: 15000, quantity: 2, hours: 24 }, // Large water pumps
      { id: "3", name: "إضاءة كاشفة للموقع", power: 400, quantity: 20, hours: 12 }, // Floodlights
      { id: "4", name: "سكن العمال (تكييف وإضاءة)", power: 20000, quantity: 1, hours: 24 }, // Camp
      { id: "5", name: "أجهزة فصل وفلترة", power: 10000, quantity: 3, hours: 16 } // Separation eqpt
    ]
  }
};

/**
 * Calculates the total energy requirements based on a list of devices.
 * @param {Array} devices - Array of device objects { power, quantity, hours }
 * @returns {Object} Energy calculation results
 */
export const calculateEnergyRequirements = (devices) => {
  let totalPowerW = 0; // Peak power demand
  let totalDailyEnergyWh = 0; // Total daily energy consumption

  devices.forEach(device => {
    const power = Number(device.power) || 0;
    const qty = Number(device.quantity) || 0;
    const hrs = Number(device.hours) || 0;

    const deviceTotalPower = power * qty;
    const deviceDailyEnergy = deviceTotalPower * hrs;

    totalPowerW += deviceTotalPower;
    totalDailyEnergyWh += deviceDailyEnergy;
  });

  return {
    totalPowerW,
    totalDailyEnergyWh
  };
};

/**
 * Calculates the recommended solar system components.
 * @param {Object} energyReq - Result from calculateEnergyRequirements
 * @param {string} batteryType - "lithium" or "lead_acid"
 * @param {number} systemVoltage - Battery bank voltage (e.g., 12, 24, 48)
 * @returns {Object} System sizing recommendations
 */
export const calculateSystemSize = (energyReq, batteryType = "lithium", systemVoltage = 48) => {
  const { totalPowerW, totalDailyEnergyWh } = energyReq;

  // 1. Inverter Sizing (W)
  // Total power demand + Safety margin
  const recommendedInverterW = totalPowerW * SOLAR_CONSTANTS.INVERTER_SAFETY_MARGIN;

  // 2. Solar Array Sizing (Wp)
  // Account for system losses to find required daily energy from panels
  const requiredEnergyFromPanelsWh = totalDailyEnergyWh / (1 - SOLAR_CONSTANTS.SYSTEM_LOSSES);

  // Divide by peak sun hours
  const recommendedSolarArrayWp = requiredEnergyFromPanelsWh / SOLAR_CONSTANTS.PEAK_SUN_HOURS;

  // 3. Battery Sizing (Ah or kWh)
  // Energy needed from battery = Total daily energy / Inverter efficiency
  const energyNeededFromBatteryWh = totalDailyEnergyWh / SOLAR_CONSTANTS.INVERTER_EFFICIENCY;

  // Multiply by days of autonomy
  const autonomousEnergyWh = energyNeededFromBatteryWh * SOLAR_CONSTANTS.DAYS_OF_AUTONOMY;

  // Adjust for Depth of Discharge (DoD) based on chemistry
  const dod = batteryType === "lithium" ? SOLAR_CONSTANTS.LITHIUM_DOD : SOLAR_CONSTANTS.LEAD_ACID_DOD;
  const totalBatteryCapacityWh = autonomousEnergyWh / dod;

  // Capacity in Amp-hours (Ah) based on system voltage
  const totalBatteryCapacityAh = totalBatteryCapacityWh / systemVoltage;

  return {
    inverterSizeKW: (recommendedInverterW / 1000).toFixed(2),
    solarArraySizeKWp: (recommendedSolarArrayWp / 1000).toFixed(2),
    batteryCapacityKWh: (totalBatteryCapacityWh / 1000).toFixed(2),
    batteryCapacityAh: totalBatteryCapacityAh.toFixed(0),
    systemVoltage,
    batteryType,
    peakSunHours: SOLAR_CONSTANTS.PEAK_SUN_HOURS
  };
};
