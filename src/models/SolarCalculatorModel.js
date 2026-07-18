// Business logic and configurations for Solar Calculator

// Consumption patterns (أنماط الاستهلاك) with typical devices (أجهزتها)
export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج', // Ice Factory
    defaultDevices: [
      { name: 'ماكينة ثلج كبيرة', powerW: 15000, qty: 2, hoursPerDay: 24 }, // Large Ice Machine
      { name: 'غرفة تبريد', powerW: 5000, qty: 1, hoursPerDay: 24 }, // Cooling Room
      { name: 'مضخة مياه', powerW: 2000, qty: 2, hoursPerDay: 12 }, // Water Pump
      { name: 'إضاءة', powerW: 100, qty: 20, hoursPerDay: 12 } // Lighting
    ]
  },
  {
    id: 'company',
    name: 'شركة', // Company
    defaultDevices: [
      { name: 'مكيف هواء سبليت', powerW: 1500, qty: 5, hoursPerDay: 10 }, // Split AC
      { name: 'جهاز كمبيوتر', powerW: 250, qty: 20, hoursPerDay: 10 }, // Computer
      { name: 'طابعة/ماكينة تصوير', powerW: 800, qty: 2, hoursPerDay: 4 }, // Printer/Copier
      { name: 'خادم (سيرفر)', powerW: 1000, qty: 1, hoursPerDay: 24 }, // Server
      { name: 'إضاءة LED', powerW: 40, qty: 40, hoursPerDay: 10 }, // LED Lighting
      { name: 'ثلاجة صغيرة', powerW: 150, qty: 2, hoursPerDay: 24 } // Mini Fridge
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة', // Farm
    defaultDevices: [
      { name: 'مضخة مياه غاطسة', powerW: 3000, qty: 2, hoursPerDay: 6 }, // Submersible Pump
      { name: 'إنارة خارجية', powerW: 100, qty: 10, hoursPerDay: 12 }, // Outdoor Lighting
      { name: 'تلفزيون', powerW: 120, qty: 1, hoursPerDay: 6 }, // TV (Staff)
      { name: 'ثلاجة', powerW: 300, qty: 1, hoursPerDay: 24 } // Fridge
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن', // Poultry Farm
    defaultDevices: [
      { name: 'مراوح تهوية', powerW: 500, qty: 6, hoursPerDay: 24 }, // Ventilation Fans
      { name: 'نظام تدفئة (شتاء)', powerW: 2000, qty: 2, hoursPerDay: 12 }, // Heating System
      { name: 'مضخة مياه', powerW: 1000, qty: 1, hoursPerDay: 4 }, // Water Pump
      { name: 'نظام تغذية آلي', powerW: 800, qty: 1, hoursPerDay: 4 }, // Automated Feeding
      { name: 'إضاءة', powerW: 40, qty: 50, hoursPerDay: 18 } // Lighting
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية', // Greenhouses
    defaultDevices: [
      { name: 'مراوح تهوية', powerW: 300, qty: 4, hoursPerDay: 12 }, // Ventilation Fans
      { name: 'مضخة ري شبكية', powerW: 1500, qty: 1, hoursPerDay: 6 }, // Irrigation Pump
      { name: 'نظام تبريد صحراوي', powerW: 1000, qty: 2, hoursPerDay: 10 } // Evaporative Cooling
    ]
  },
  {
    id: 'factory',
    name: 'مصنع', // Factory (General)
    defaultDevices: [
      { name: 'آلات إنتاج 3-Phase', powerW: 20000, qty: 3, hoursPerDay: 16 }, // Production Machines
      { name: 'نظام تهوية مركزي', powerW: 5000, qty: 1, hoursPerDay: 16 }, // Central Ventilation
      { name: 'مكيفات مكاتب', powerW: 2000, qty: 4, hoursPerDay: 10 }, // Office ACs
      { name: 'إضاءة مستودع', powerW: 200, qty: 30, hoursPerDay: 16 } // Warehouse Lighting
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف', // Clinic
    defaultDevices: [
      { name: 'مكيف هواء', powerW: 1500, qty: 6, hoursPerDay: 12 }, // AC
      { name: 'ثلاجة أدوية', powerW: 200, qty: 3, hoursPerDay: 24 }, // Medicine Fridge
      { name: 'جهاز تعقيم (أوتوكلاف)', powerW: 2000, qty: 1, hoursPerDay: 4 }, // Autoclave
      { name: 'أجهزة فحص ومختبر', powerW: 1000, qty: 4, hoursPerDay: 8 }, // Lab Equipment
      { name: 'إضاءة', powerW: 40, qty: 30, hoursPerDay: 12 } // Lighting
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفي', // Hospital
    defaultDevices: [
      { name: 'نظام تكييف مركزي', powerW: 50000, qty: 1, hoursPerDay: 24 }, // Central HVAC
      { name: 'أجهزة طبية (عناية مركزة)', powerW: 5000, qty: 5, hoursPerDay: 24 }, // ICU Equipment
      { name: 'ثلاجات حفظ دم/أدوية', powerW: 500, qty: 10, hoursPerDay: 24 }, // Blood/Medicine Fridges
      { name: 'إضاءة عامة', powerW: 100, qty: 200, hoursPerDay: 24 }, // General Lighting
      { name: 'غسالات ومجففات', powerW: 3000, qty: 4, hoursPerDay: 12 } // Laundry
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز', // Bakery
    defaultDevices: [
      { name: 'عجانة كهربائية', powerW: 3000, qty: 2, hoursPerDay: 8 }, // Dough Mixer
      { name: 'فرن كهربائي/مراوح فرن', powerW: 5000, qty: 2, hoursPerDay: 10 }, // Oven Fans/Electric Oven
      { name: 'قطاعة عجين', powerW: 1500, qty: 1, hoursPerDay: 6 }, // Dough Divider
      { name: 'إضاءة', powerW: 40, qty: 15, hoursPerDay: 16 } // Lighting
    ]
  },
  {
    id: 'shop',
    name: 'دكان', // Small Shop
    defaultDevices: [
      { name: 'ثلاجة عرض (مشروبات)', powerW: 400, qty: 2, hoursPerDay: 24 }, // Display Fridge
      { name: 'فريزر (آيس كريم)', powerW: 300, qty: 1, hoursPerDay: 24 }, // Freezer
      { name: 'مروحة سقف', powerW: 80, qty: 2, hoursPerDay: 14 }, // Ceiling Fan
      { name: 'إضاءة', powerW: 20, qty: 6, hoursPerDay: 14 } // Lighting
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة', // Workshop
    defaultDevices: [
      { name: 'ماكينة لحام', powerW: 4000, qty: 1, hoursPerDay: 4 }, // Welding Machine
      { name: 'صاروخ جلخ', powerW: 1000, qty: 2, hoursPerDay: 3 }, // Grinder
      { name: 'مثقاب (دريل)', powerW: 800, qty: 2, hoursPerDay: 2 }, // Drill
      { name: 'كمبروسر هواء', powerW: 2000, qty: 1, hoursPerDay: 5 }, // Air Compressor
      { name: 'إضاءة', powerW: 100, qty: 8, hoursPerDay: 10 } // Lighting
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية', // Water Pump Station
    defaultDevices: [
      { name: 'مضخة رئيسية', powerW: 7500, qty: 1, hoursPerDay: 8 }, // Main Pump
      { name: 'لوحة تحكم', powerW: 100, qty: 1, hoursPerDay: 24 }, // Control Panel
      { name: 'إضاءة محطة', powerW: 50, qty: 4, hoursPerDay: 12 } // Station Lighting
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي', // Donkey (Local Water Station)
    defaultDevices: [
      { name: 'مضخة غاطسة', powerW: 2200, qty: 1, hoursPerDay: 10 }, // Submersible Pump
      { name: 'إضاءة حارس', powerW: 20, qty: 2, hoursPerDay: 10 } // Guard Lighting
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد', // Mosque
    defaultDevices: [
      { name: 'مكيف هواء', powerW: 2000, qty: 6, hoursPerDay: 6 }, // AC
      { name: 'مكبر صوت', powerW: 200, qty: 1, hoursPerDay: 3 }, // PA System
      { name: 'مروحة سقف', powerW: 80, qty: 15, hoursPerDay: 8 }, // Ceiling Fan
      { name: 'إضاءة داخلية وخارجية', powerW: 40, qty: 40, hoursPerDay: 8 }, // Lighting
      { name: 'برادة مياه', powerW: 300, qty: 2, hoursPerDay: 24 } // Water Cooler
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة', // Printing Press
    defaultDevices: [
      { name: 'ماكينة طباعة أوفست', powerW: 8000, qty: 1, hoursPerDay: 8 }, // Offset Printer
      { name: 'ماكينة قص ورق', powerW: 2000, qty: 1, hoursPerDay: 4 }, // Paper Cutter
      { name: 'أجهزة كمبيوتر وتصميم', powerW: 400, qty: 3, hoursPerDay: 10 }, // Design Computers
      { name: 'مكيف هواء', powerW: 2000, qty: 2, hoursPerDay: 10 }, // AC
      { name: 'إضاءة', powerW: 100, qty: 20, hoursPerDay: 10 } // Lighting
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب', // Coffee Shop
    defaultDevices: [
      { name: 'ماكينة إسبريسو', powerW: 3500, qty: 1, hoursPerDay: 12 }, // Espresso Machine
      { name: 'مطحنة قهوة', powerW: 500, qty: 2, hoursPerDay: 4 }, // Coffee Grinder
      { name: 'ثلاجة عرض', powerW: 500, qty: 1, hoursPerDay: 24 }, // Display Fridge
      { name: 'مكيف هواء', powerW: 2000, qty: 2, hoursPerDay: 16 }, // AC
      { name: 'إضاءة ديكور', powerW: 20, qty: 30, hoursPerDay: 16 } // Decorative Lighting
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم', // Restaurant
    defaultDevices: [
      { name: 'ثلاجة عمودية', powerW: 600, qty: 3, hoursPerDay: 24 }, // Upright Fridge
      { name: 'ديب فريزر', powerW: 500, qty: 2, hoursPerDay: 24 }, // Deep Freezer
      { name: 'شفاط هواء', powerW: 1000, qty: 2, hoursPerDay: 12 }, // Exhaust Fan
      { name: 'مكيف هواء', powerW: 2500, qty: 4, hoursPerDay: 14 }, // AC
      { name: 'إضاءة', powerW: 40, qty: 40, hoursPerDay: 14 } // Lighting
    ]
  },
  {
    id: 'hotel',
    name: 'فندق', // Hotel
    defaultDevices: [
      { name: 'مكيفات غرف', powerW: 1500, qty: 20, hoursPerDay: 12 }, // Room ACs
      { name: 'إضاءة غرف وممرات', powerW: 20, qty: 100, hoursPerDay: 16 }, // Lighting
      { name: 'ثلاجات صغيرة (ميني بار)', powerW: 100, qty: 20, hoursPerDay: 24 }, // Mini Bars
      { name: 'مصعد', powerW: 10000, qty: 1, hoursPerDay: 4 }, // Elevator
      { name: 'مضخات مياه', powerW: 3000, qty: 2, hoursPerDay: 8 } // Water Pumps
    ]
  },
  {
    id: 'bank',
    name: 'بنك', // Bank
    defaultDevices: [
      { name: 'أجهزة كمبيوتر', powerW: 250, qty: 15, hoursPerDay: 10 }, // Computers
      { name: 'خوادم (سيرفرات)', powerW: 1500, qty: 1, hoursPerDay: 24 }, // Servers
      { name: 'نظام تكييف', powerW: 15000, qty: 1, hoursPerDay: 12 }, // HVAC
      { name: 'ماكينة صراف آلي (ATM)', powerW: 400, qty: 2, hoursPerDay: 24 }, // ATMs
      { name: 'إضاءة', powerW: 40, qty: 60, hoursPerDay: 12 } // Lighting
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت', // Supermarket
    defaultDevices: [
      { name: 'ثلاجات عرض منتجات ألبان', powerW: 1500, qty: 4, hoursPerDay: 24 }, // Dairy Display Fridges
      { name: 'فريزر لحوم ومجمدات', powerW: 2000, qty: 3, hoursPerDay: 24 }, // Meat Freezers
      { name: 'مكيف هواء مركزي', powerW: 10000, qty: 1, hoursPerDay: 16 }, // Central AC
      { name: 'نقاط بيع (كاشير)', powerW: 300, qty: 4, hoursPerDay: 16 }, // POS Systems
      { name: 'إضاءة قوية', powerW: 50, qty: 80, hoursPerDay: 16 } // Bright Lighting
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود', // Gas Station
    defaultDevices: [
      { name: 'مضخات وقود', powerW: 1000, qty: 4, hoursPerDay: 10 }, // Fuel Pumps
      { name: 'إضاءة المظلة', powerW: 200, qty: 12, hoursPerDay: 12 }, // Canopy Lighting
      { name: 'ثلاجة متجر', powerW: 400, qty: 2, hoursPerDay: 24 }, // Shop Fridge
      { name: 'مكيف هواء متجر', powerW: 1500, qty: 1, hoursPerDay: 16 }, // Shop AC
      { name: 'كمبروسر هواء بنشر', powerW: 2000, qty: 1, hoursPerDay: 4 } // Tire Air Compressor
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين', // Mining Company
    defaultDevices: [
      { name: 'طواحين ومعدات معالجة', powerW: 30000, qty: 2, hoursPerDay: 16 }, // Mills and Processing Equipment
      { name: 'مضخات غسيل مياه', powerW: 5000, qty: 4, hoursPerDay: 12 }, // Washing Pumps
      { name: 'إضاءة موقع', powerW: 400, qty: 20, hoursPerDay: 12 }, // Site Lighting
      { name: 'سكن عمال (تكييف)', powerW: 1500, qty: 10, hoursPerDay: 10 }, // Camp ACs
      { name: 'ثلاجات ومعدات مطبخ', powerW: 2000, qty: 2, hoursPerDay: 24 } // Camp Kitchen Equipment
    ]
  }
];

/**
 * Calculate the total daily energy requirement in Watt-hours (Wh).
 *
 * @param {Array} devices - Array of device objects { powerW, qty, hoursPerDay }
 * @returns {number} Total daily Wh
 */
export const calculateTotalDailyEnergy = (devices) => {
  if (!Array.isArray(devices)) return 0;

  return devices.reduce((total, device) => {
    const power = Number(device.powerW) || 0;
    const qty = Number(device.qty) || 0;
    const hours = Number(device.hoursPerDay) || 0;
    return total + (power * qty * hours);
  }, 0);
};

/**
 * Calculate recommended solar system size based on daily energy usage.
 *
 * @param {number} dailyWh - Total daily energy requirement in Watt-hours
 * @param {number} peakSunHours - Average daily peak sun hours for the location (e.g., 5.5 for Sudan/Sahara)
 * @param {number} systemLossFactor - Accounting for system losses (inverter, wiring, temp), typically 0.8 to 0.85
 * @returns {number} Recommended Solar Array Size in kW
 */
export const calculateRecommendedSystemSize = (dailyWh, peakSunHours = 5.5, systemLossFactor = 0.8) => {
  if (!dailyWh || dailyWh <= 0) return 0;

  // Array Size (W) = Daily Energy (Wh) / (Peak Sun Hours * System Efficiency)
  const arraySizeW = dailyWh / (peakSunHours * systemLossFactor);

  // Convert to kW
  return arraySizeW / 1000;
};

/**
 * Calculate recommended battery bank capacity.
 *
 * @param {number} dailyWh - Total daily energy requirement in Watt-hours
 * @param {number} daysOfAutonomy - Number of days the system can run without sun (typically 1-3)
 * @param {number} depthOfDischarge - Maximum DoD for batteries (e.g., 0.5 for Lead-Acid, 0.8 for Lithium)
 * @param {number} batteryVoltage - System voltage (e.g., 12, 24, 48)
 * @returns {number} Recommended Battery Bank Capacity in Ah
 */
export const calculateBatteryBankCapacity = (dailyWh, daysOfAutonomy = 1, depthOfDischarge = 0.8, batteryVoltage = 48) => {
  if (!dailyWh || dailyWh <= 0) return 0;

  // Total Energy Needed = Daily Energy * Days of Autonomy
  const totalEnergyNeededWh = dailyWh * daysOfAutonomy;

  // Required Capacity (Wh) = Total Energy Needed / Depth of Discharge
  const requiredCapacityWh = totalEnergyNeededWh / depthOfDischarge;

  // Capacity in Amp-hours (Ah) = Required Capacity (Wh) / System Voltage
  return requiredCapacityWh / batteryVoltage;
};
