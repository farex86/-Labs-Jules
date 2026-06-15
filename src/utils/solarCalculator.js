// src/utils/solarCalculator.js

// Constants for solar calculations
export const SYSTEM_LOSSES = 0.20; // 20% system losses
export const BATTERY_DEPTH_OF_DISCHARGE = 0.50; // 50% for lead acid, could be 0.8 for lithium
export const INVERTER_EFFICIENCY = 0.95; // 95% efficiency
export const PEAK_SUN_HOURS = 5; // Average peak sun hours (can be configurable later)
export const AUTONOMY_DAYS = 1; // Days of autonomy for battery storage
export const INVERTER_SAFETY_MARGIN = 1.25; // 25% safety margin for inverter sizing

// Facility types and default consumption patterns (in Arabic)
export const CONSUMPTION_PATTERNS = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج', // Ice Factory
    devices: [
      { id: '1', name: 'ماكينة ثلج', power: 5000, quantity: 2, hours: 24 }, // Ice machine
      { id: '2', name: 'غرفة تبريد', power: 3000, quantity: 1, hours: 24 }, // Cold room
      { id: '3', name: 'إضاءة', power: 40, quantity: 20, hours: 12 }, // Lighting
    ],
  },
  {
    id: 'company',
    name: 'شركة', // Company
    devices: [
      { id: '1', name: 'مكيف', power: 1500, quantity: 5, hours: 8 }, // AC
      { id: '2', name: 'كمبيوتر', power: 250, quantity: 20, hours: 8 }, // Computer
      { id: '3', name: 'إضاءة', power: 40, quantity: 40, hours: 10 }, // Lighting
      { id: '4', name: 'طابعة/ماكينة تصوير', power: 500, quantity: 2, hours: 4 }, // Printer/Copier
    ],
  },
  {
    id: 'farm',
    name: 'مزرعة', // Farm
    devices: [
      { id: '1', name: 'مضخة غاطسة', power: 2200, quantity: 1, hours: 8 }, // Submersible pump
      { id: '2', name: 'إضاءة محيطية', power: 100, quantity: 10, hours: 12 }, // Perimeter lighting
      { id: '3', name: 'سكن عمال (مراوح وإضاءة)', power: 500, quantity: 1, hours: 12 }, // Worker housing
    ],
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن', // Poultry Farm
    devices: [
      { id: '1', name: 'مراوح تهوية', power: 1100, quantity: 6, hours: 24 }, // Ventilation fans
      { id: '2', name: 'خلايا تبريد (مضخة)', power: 750, quantity: 2, hours: 12 }, // Cooling pads pump
      { id: '3', name: 'إضاءة', power: 40, quantity: 50, hours: 16 }, // Lighting
      { id: '4', name: 'محرك علف', power: 1500, quantity: 2, hours: 4 }, // Feed motor
    ],
  },
  {
    id: 'greenhouses',
    name: 'بيوت محمية', // Greenhouses
    devices: [
      { id: '1', name: 'مراوح تهوية', power: 750, quantity: 4, hours: 12 }, // Ventilation fans
      { id: '2', name: 'مضخة ري', power: 1500, quantity: 1, hours: 6 }, // Irrigation pump
      { id: '3', name: 'إضاءة', power: 40, quantity: 20, hours: 8 }, // Lighting
    ],
  },
  {
    id: 'factory',
    name: 'مصنع', // Factory (General)
    devices: [
      { id: '1', name: 'ماكينات انتاج', power: 10000, quantity: 3, hours: 16 }, // Production machines
      { id: '2', name: 'إضاءة', power: 100, quantity: 50, hours: 16 }, // Lighting
      { id: '3', name: 'مكيفات', power: 2000, quantity: 5, hours: 16 }, // AC
    ],
  },
  {
    id: 'clinic',
    name: 'مستوصف', // Clinic
    devices: [
      { id: '1', name: 'إضاءة', power: 40, quantity: 30, hours: 12 }, // Lighting
      { id: '2', name: 'مكيف', power: 1500, quantity: 6, hours: 10 }, // AC
      { id: '3', name: 'ثلاجة أدوية', power: 300, quantity: 2, hours: 24 }, // Medicine fridge
      { id: '4', name: 'أجهزة طبية', power: 1000, quantity: 3, hours: 6 }, // Medical equipment
    ],
  },
  {
    id: 'hospital',
    name: 'مستشفي', // Hospital
    devices: [
      { id: '1', name: 'إضاءة', power: 40, quantity: 200, hours: 24 }, // Lighting
      { id: '2', name: 'مكيفات', power: 2000, quantity: 50, hours: 24 }, // AC
      { id: '3', name: 'أجهزة طبية (عناية، الخ)', power: 2000, quantity: 20, hours: 24 }, // Medical equipment
      { id: '4', name: 'ثلاجات حفظ', power: 500, quantity: 10, hours: 24 }, // Fridges
      { id: '5', name: 'مصاعد', power: 5000, quantity: 2, hours: 12 }, // Elevators
    ],
  },
  {
    id: 'bakery',
    name: 'مخبز', // Bakery
    devices: [
      { id: '1', name: 'عجانة', power: 3000, quantity: 2, hours: 6 }, // Mixer
      { id: '2', name: 'فرن كهربائي', power: 10000, quantity: 1, hours: 8 }, // Electric oven (if not gas)
      { id: '3', name: 'إضاءة ومراوح', power: 100, quantity: 10, hours: 12 }, // Lighting & fans
    ],
  },
  {
    id: 'shop',
    name: 'دكان', // Shop
    devices: [
      { id: '1', name: 'إضاءة', power: 40, quantity: 5, hours: 12 }, // Lighting
      { id: '2', name: 'ثلاجة عرض', power: 400, quantity: 2, hours: 24 }, // Display fridge
      { id: '3', name: 'مروحة', power: 75, quantity: 2, hours: 12 }, // Fan
    ],
  },
  {
    id: 'workshop',
    name: 'ورشة', // Workshop
    devices: [
      { id: '1', name: 'ماكينة لحام', power: 5000, quantity: 1, hours: 4 }, // Welding machine
      { id: '2', name: 'صاروخ / دريل', power: 1000, quantity: 3, hours: 4 }, // Grinder / Drill
      { id: '3', name: 'كمبروسر هواء', power: 2200, quantity: 1, hours: 6 }, // Air compressor
      { id: '4', name: 'إضاءة', power: 100, quantity: 5, hours: 10 }, // Lighting
    ],
  },
  {
    id: 'water_pump',
    name: 'مضخة موية', // Water Pump
    devices: [
      { id: '1', name: 'مضخة مياه', power: 2200, quantity: 1, hours: 8 }, // Water pump
    ],
  },
  {
    id: 'donkey',
    name: 'دونكي', // Donkey (Water station)
    devices: [
      { id: '1', name: 'مضخة غاطسة', power: 3000, quantity: 1, hours: 10 }, // Submersible pump
      { id: '2', name: 'إضاءة', power: 50, quantity: 4, hours: 12 }, // Lighting
    ],
  },
  {
    id: 'mosque',
    name: 'مسجد', // Mosque
    devices: [
      { id: '1', name: 'مكيف دولاب / سبليت', power: 2500, quantity: 4, hours: 6 }, // AC
      { id: '2', name: 'مراوح', power: 80, quantity: 20, hours: 8 }, // Fans
      { id: '3', name: 'إضاءة', power: 40, quantity: 40, hours: 8 }, // Lighting
      { id: '4', name: 'مكبر صوت', power: 200, quantity: 1, hours: 5 }, // Amplifier
    ],
  },
  {
    id: 'printing_press',
    name: 'مطبعة', // Printing press
    devices: [
      { id: '1', name: 'ماكينة طباعة', power: 5000, quantity: 2, hours: 8 }, // Printing machine
      { id: '2', name: 'ماكينة قص', power: 1500, quantity: 1, hours: 4 }, // Cutting machine
      { id: '3', name: 'مكيف', power: 1500, quantity: 3, hours: 8 }, // AC
      { id: '4', name: 'إضاءة', power: 100, quantity: 20, hours: 10 }, // Lighting
    ],
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب', // Coffee shop
    devices: [
      { id: '1', name: 'ماكينة اسبريسو', power: 3500, quantity: 1, hours: 12 }, // Espresso machine
      { id: '2', name: 'مكيف', power: 2000, quantity: 2, hours: 12 }, // AC
      { id: '3', name: 'ثلاجة عرض', power: 500, quantity: 1, hours: 24 }, // Display fridge
      { id: '4', name: 'خلاط / أجهزة صغيرة', power: 1000, quantity: 2, hours: 4 }, // Blender / Small appliances
      { id: '5', name: 'إضاءة وديكور', power: 200, quantity: 1, hours: 12 }, // Lighting
    ],
  },
  {
    id: 'restaurant',
    name: 'مطعم', // Restaurant
    devices: [
      { id: '1', name: 'مكيف', power: 2500, quantity: 4, hours: 14 }, // AC
      { id: '2', name: 'ثلاجة تجميد', power: 800, quantity: 3, hours: 24 }, // Freezer
      { id: '3', name: 'شفاط هواء', power: 1500, quantity: 2, hours: 14 }, // Exhaust fan
      { id: '4', name: 'إضاءة', power: 40, quantity: 40, hours: 14 }, // Lighting
    ],
  },
  {
    id: 'hotel',
    name: 'فندق', // Hotel
    devices: [
      { id: '1', name: 'مكيف غرف', power: 1200, quantity: 30, hours: 12 }, // Room ACs
      { id: '2', name: 'إضاءة عامة وغرف', power: 1500, quantity: 1, hours: 24 }, // Lighting
      { id: '3', name: 'مصعد', power: 5000, quantity: 1, hours: 12 }, // Elevator
      { id: '4', name: 'مضخة مياه', power: 2200, quantity: 2, hours: 6 }, // Water pumps
      { id: '5', name: 'غسالات (مغسلة)', power: 3000, quantity: 2, hours: 8 }, // Washing machines
    ],
  },
  {
    id: 'bank',
    name: 'بنك', // Bank
    devices: [
      { id: '1', name: 'تكييف مركزي/سبليت', power: 2000, quantity: 10, hours: 10 }, // AC
      { id: '2', name: 'كمبيوترات وسيرفر', power: 300, quantity: 30, hours: 24 }, // Computers/Servers
      { id: '3', name: 'صراف آلي (ATM)', power: 400, quantity: 3, hours: 24 }, // ATM
      { id: '4', name: 'إضاءة', power: 40, quantity: 100, hours: 12 }, // Lighting
    ],
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت', // Supermarket
    devices: [
      { id: '1', name: 'ثلاجات عرض', power: 800, quantity: 10, hours: 24 }, // Display fridges
      { id: '2', name: 'مكيف', power: 2500, quantity: 4, hours: 16 }, // AC
      { id: '3', name: 'إضاءة', power: 40, quantity: 80, hours: 16 }, // Lighting
      { id: '4', name: 'أجهزة كاشير', power: 200, quantity: 3, hours: 16 }, // POS systems
    ],
  },
  {
    id: 'fuel_station',
    name: 'طرمبة وقود', // Fuel station
    devices: [
      { id: '1', name: 'مضخة وقود', power: 1500, quantity: 4, hours: 12 }, // Fuel dispenser
      { id: '2', name: 'إضاءة مظلة', power: 150, quantity: 12, hours: 12 }, // Canopy lighting
      { id: '3', name: 'مكيف مكتب', power: 1500, quantity: 1, hours: 12 }, // Office AC
    ],
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين', // Mining company
    devices: [
      { id: '1', name: 'ماكينات طحن/تكسير', power: 15000, quantity: 2, hours: 12 }, // Crushers
      { id: '2', name: 'مضخات غسيل/مياه', power: 5000, quantity: 3, hours: 12 }, // Pumps
      { id: '3', name: 'سكن عمال (تكييف وإضاءة)', power: 2000, quantity: 5, hours: 12 }, // Housing
      { id: '4', name: 'إضاءة مواقع', power: 400, quantity: 20, hours: 12 }, // Site lighting
    ],
  },
];


/**
 * Calculates total power needed (Watt)
 * @param {Array} devices Array of device objects {power, quantity}
 * @returns {Number} Total power in watts
 */
export const calculateTotalPower = (devices) => {
  return devices.reduce((total, device) => total + (device.power * device.quantity), 0);
};

/**
 * Calculates total daily energy consumption (Watt-hours)
 * @param {Array} devices Array of device objects {power, quantity, hours}
 * @returns {Number} Total daily energy in watt-hours
 */
export const calculateTotalDailyEnergy = (devices) => {
  return devices.reduce((total, device) => total + (device.power * device.quantity * device.hours), 0);
};

/**
 * Calculates required solar system size
 * @param {Array} devices Array of devices
 * @param {Object} options Calculation options (peakSunHours, autonomyDays)
 * @returns {Object} Required system sizes
 */
export const calculateSolarSystem = (devices, options = {}) => {
  const peakSunHours = options.peakSunHours || PEAK_SUN_HOURS;
  const autonomyDays = options.autonomyDays || AUTONOMY_DAYS;

  // 1. Calculate Total Load & Energy
  const totalPowerW = calculateTotalPower(devices); // Watts
  const totalDailyEnergyWh = calculateTotalDailyEnergy(devices); // Watt-hours

  // 2. Adjust for System Losses
  const actualDailyEnergyNeededWh = totalDailyEnergyWh / (1 - SYSTEM_LOSSES);

  // 3. Calculate Required Solar Panel Capacity (Watts)
  const requiredSolarCapacityW = actualDailyEnergyNeededWh / peakSunHours;

  // 4. Calculate Required Inverter Size (Watts)
  const requiredInverterSizeW = totalPowerW * INVERTER_SAFETY_MARGIN;

  // 5. Calculate Required Battery Capacity (Watt-hours)
  const requiredBatteryCapacityWh = (actualDailyEnergyNeededWh * autonomyDays) / BATTERY_DEPTH_OF_DISCHARGE;

  return {
    totalPowerW,
    totalDailyEnergyWh,
    requiredSolarCapacityW,
    requiredInverterSizeW,
    requiredBatteryCapacityWh,
    // Provide some practical recommendations based on standard sizes
    recommendations: {
      solarPanels: {
        size550W: Math.ceil(requiredSolarCapacityW / 550), // Number of 550W panels
      },
      inverter: {
        sizeKW: Math.ceil(requiredInverterSizeW / 1000), // KW inverter size
      },
      batteries: {
        // Assuming 12V 200Ah batteries (2400Wh) or similar standard
        // Lets just output a generic capacity for now, battery sizing depends heavily on system voltage (24V, 48V)
        capacityKWh: (requiredBatteryCapacityWh / 1000).toFixed(1),
        voltage48vAh: Math.ceil(requiredBatteryCapacityWh / 48), // Amp-hours at 48V
      }
    }
  };
};
