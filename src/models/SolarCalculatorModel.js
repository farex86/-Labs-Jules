export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع ثلج' },
  { id: 'company', name: 'شركة' },
  { id: 'farm', name: 'مزرعة' },
  { id: 'poultry_farm', name: 'مزرعة دواجن' },
  { id: 'greenhouse', name: 'بيوت محمية' },
  { id: 'factory', name: 'مصنع' },
  { id: 'clinic', name: 'مستوصف' },
  { id: 'hospital', name: 'مستشفى' },
  { id: 'bakery', name: 'مخبز' },
  { id: 'shop', name: 'دكان' },
  { id: 'workshop', name: 'ورشة' },
  { id: 'water_pump', name: 'مضخة مياه' },
  { id: 'donkey', name: 'دونكي' },
  { id: 'mosque', name: 'مسجد' },
  { id: 'printing_press', name: 'مطبعة' },
  { id: 'coffee_shop', name: 'كوفي شوب' },
  { id: 'restaurant', name: 'مطعم' },
  { id: 'hotel', name: 'فندق' },
  { id: 'bank', name: 'بنك' },
  { id: 'supermarket', name: 'سوبر ماركت' },
  { id: 'fuel_station', name: 'طرمبة وقود' },
  { id: 'mining_company', name: 'شركة تعدين' }
];

export const DEFAULT_DEVICES = {
  ice_factory: [
    { id: 'ice_machine', name: 'ماكينة ثلج', power: 5000, quantity: 2, hours: 12 },
    { id: 'freezer', name: 'فريزر', power: 1500, quantity: 4, hours: 24 },
    { id: 'lighting', name: 'إضاءة', power: 50, quantity: 20, hours: 12 }
  ],
  company: [
    { id: 'ac', name: 'مكيف', power: 1500, quantity: 5, hours: 8 },
    { id: 'pc', name: 'كمبيوتر', power: 250, quantity: 10, hours: 8 },
    { id: 'lighting', name: 'إضاءة', power: 40, quantity: 30, hours: 8 },
    { id: 'printer', name: 'طابعة', power: 500, quantity: 2, hours: 2 }
  ],
  farm: [
    { id: 'water_pump', name: 'مضخة مياه', power: 3000, quantity: 1, hours: 6 },
    { id: 'lighting', name: 'إضاءة', power: 50, quantity: 10, hours: 12 }
  ],
  poultry_farm: [
    { id: 'fan', name: 'مروحة تهوية', power: 300, quantity: 10, hours: 24 },
    { id: 'heater', name: 'دفاية', power: 2000, quantity: 5, hours: 12 },
    { id: 'lighting', name: 'إضاءة', power: 40, quantity: 20, hours: 16 }
  ],
  greenhouse: [
    { id: 'water_pump', name: 'مضخة', power: 1500, quantity: 2, hours: 4 },
    { id: 'fan', name: 'مروحة', power: 250, quantity: 6, hours: 12 }
  ],
  factory: [
    { id: 'heavy_machinery', name: 'آلات ثقيلة', power: 10000, quantity: 3, hours: 8 },
    { id: 'lighting', name: 'إضاءة', power: 100, quantity: 50, hours: 12 }
  ],
  clinic: [
    { id: 'medical_eq', name: 'معدات طبية', power: 2000, quantity: 3, hours: 8 },
    { id: 'ac', name: 'مكيف', power: 1500, quantity: 4, hours: 12 },
    { id: 'lighting', name: 'إضاءة', power: 40, quantity: 20, hours: 12 },
    { id: 'fridge', name: 'ثلاجة أدوية', power: 300, quantity: 2, hours: 24 }
  ],
  hospital: [
    { id: 'medical_eq', name: 'معدات طبية', power: 5000, quantity: 10, hours: 24 },
    { id: 'ac', name: 'مكيف', power: 2000, quantity: 30, hours: 24 },
    { id: 'lighting', name: 'إضاءة', power: 50, quantity: 100, hours: 24 }
  ],
  bakery: [
    { id: 'oven', name: 'فرن كهربائي', power: 8000, quantity: 2, hours: 10 },
    { id: 'mixer', name: 'عجانة', power: 1500, quantity: 2, hours: 6 },
    { id: 'lighting', name: 'إضاءة', power: 50, quantity: 10, hours: 12 }
  ],
  shop: [
    { id: 'fridge', name: 'ثلاجة', power: 400, quantity: 2, hours: 24 },
    { id: 'fan', name: 'مروحة', power: 70, quantity: 2, hours: 12 },
    { id: 'lighting', name: 'إضاءة', power: 40, quantity: 4, hours: 12 }
  ],
  workshop: [
    { id: 'welding', name: 'ماكينة لحام', power: 4000, quantity: 1, hours: 4 },
    { id: 'drill', name: 'دريل/صاروخ', power: 800, quantity: 3, hours: 4 },
    { id: 'lighting', name: 'إضاءة', power: 50, quantity: 6, hours: 8 }
  ],
  water_pump: [
    { id: 'pump_large', name: 'مضخة كبيرة', power: 5500, quantity: 1, hours: 8 }
  ],
  donkey: [
    { id: 'well_pump', name: 'طلمبة بئر', power: 2200, quantity: 1, hours: 10 }
  ],
  mosque: [
    { id: 'ac', name: 'مكيف', power: 2000, quantity: 4, hours: 5 },
    { id: 'fan', name: 'مروحة', power: 70, quantity: 15, hours: 5 },
    { id: 'sound', name: 'مكبر صوت', power: 200, quantity: 1, hours: 3 },
    { id: 'lighting', name: 'إضاءة', power: 40, quantity: 30, hours: 5 }
  ],
  printing_press: [
    { id: 'printer_large', name: 'ماكينة طباعة', power: 3000, quantity: 2, hours: 8 },
    { id: 'pc', name: 'كمبيوتر', power: 250, quantity: 4, hours: 8 },
    { id: 'lighting', name: 'إضاءة', power: 50, quantity: 15, hours: 8 }
  ],
  coffee_shop: [
    { id: 'espresso', name: 'ماكينة قهوة', power: 2500, quantity: 1, hours: 12 },
    { id: 'grinder', name: 'مطحنة', power: 400, quantity: 2, hours: 4 },
    { id: 'fridge', name: 'ثلاجة عرض', power: 600, quantity: 1, hours: 24 },
    { id: 'ac', name: 'مكيف', power: 1500, quantity: 2, hours: 12 }
  ],
  restaurant: [
    { id: 'fridge', name: 'ثلاجة', power: 800, quantity: 3, hours: 24 },
    { id: 'freezer', name: 'فريزر', power: 1000, quantity: 2, hours: 24 },
    { id: 'ac', name: 'مكيف', power: 2000, quantity: 4, hours: 14 },
    { id: 'lighting', name: 'إضاءة', power: 50, quantity: 30, hours: 14 }
  ],
  hotel: [
    { id: 'ac', name: 'مكيف', power: 1500, quantity: 20, hours: 12 },
    { id: 'tv', name: 'تلفزيون', power: 100, quantity: 20, hours: 6 },
    { id: 'fridge_small', name: 'ثلاجة صغيرة', power: 150, quantity: 20, hours: 24 },
    { id: 'lighting', name: 'إضاءة', power: 40, quantity: 100, hours: 12 },
    { id: 'water_heater', name: 'سخان مياه', power: 1500, quantity: 20, hours: 2 }
  ],
  bank: [
    { id: 'ac', name: 'مكيف مركزي', power: 5000, quantity: 4, hours: 10 },
    { id: 'pc', name: 'كمبيوتر', power: 250, quantity: 30, hours: 10 },
    { id: 'atm', name: 'صراف آلي', power: 400, quantity: 3, hours: 24 },
    { id: 'lighting', name: 'إضاءة', power: 50, quantity: 60, hours: 10 }
  ],
  supermarket: [
    { id: 'fridge_display', name: 'ثلاجة عرض', power: 1200, quantity: 5, hours: 24 },
    { id: 'freezer', name: 'فريزر', power: 1500, quantity: 3, hours: 24 },
    { id: 'ac', name: 'مكيف', power: 2000, quantity: 4, hours: 16 },
    { id: 'lighting', name: 'إضاءة', power: 50, quantity: 40, hours: 16 }
  ],
  fuel_station: [
    { id: 'fuel_pump', name: 'طلمبة وقود', power: 1000, quantity: 4, hours: 24 },
    { id: 'lighting_ext', name: 'إضاءة خارجية', power: 100, quantity: 15, hours: 12 },
    { id: 'ac', name: 'مكيف مكتب', power: 1500, quantity: 1, hours: 24 }
  ],
  mining_company: [
    { id: 'crusher', name: 'كسارة', power: 15000, quantity: 1, hours: 10 },
    { id: 'water_pump', name: 'مضخة غاطسة', power: 4000, quantity: 2, hours: 10 },
    { id: 'lighting_heavy', name: 'كشافات إضاءة', power: 400, quantity: 10, hours: 12 },
    { id: 'ac', name: 'مكيف سكن', power: 1500, quantity: 10, hours: 8 }
  ]
};

// Returns default devices for a facility type, deep copied to avoid mutation
export const getDefaultDevices = (facilityId) => {
  const devices = DEFAULT_DEVICES[facilityId] || [];
  return devices.map(d => ({ ...d }));
};

export const CONSTANTS = {
  PEAK_SUN_HOURS: 5, // Average peak sun hours per day
  SYSTEM_VOLTAGE: 48, // Standard system voltage for larger systems (24V or 48V)
  INVERTER_EFFICIENCY: 0.85,
  BATTERY_DEPTH_OF_DISCHARGE: 0.5, // For Lead Acid / Gel. Lithium would be ~0.8
  DAYS_OF_AUTONOMY: 1,
  SAFETY_FACTOR: 1.25 // 25% extra capacity for safety
};

export const calculateSolarRequirements = (devices) => {
  let totalDailyEnergyWh = 0;
  let maxPowerW = 0;

  devices.forEach(device => {
    const power = Number(device.power) || 0;
    const quantity = Number(device.quantity) || 0;
    const hours = Number(device.hours) || 0;

    const deviceTotalPower = power * quantity;
    const deviceDailyEnergy = deviceTotalPower * hours;

    totalDailyEnergyWh += deviceDailyEnergy;
    maxPowerW += deviceTotalPower;
  });

  // Calculate Inverter Capacity (W)
  // Should handle the maximum simultaneous power draw. Assuming all devices run at once + safety factor
  const inverterCapacityW = maxPowerW * CONSTANTS.SAFETY_FACTOR;

  // Calculate Solar Panel Capacity (W)
  // Energy needed per day / Peak sun hours / system efficiency
  // Simplified: total energy / peak sun hours
  const solarPanelCapacityW = (totalDailyEnergyWh / CONSTANTS.PEAK_SUN_HOURS) * CONSTANTS.SAFETY_FACTOR;

  // Calculate Battery Capacity (Wh)
  // Total Energy * Days of Autonomy / Depth of Discharge
  const batteryCapacityWh = (totalDailyEnergyWh * CONSTANTS.DAYS_OF_AUTONOMY) / CONSTANTS.BATTERY_DEPTH_OF_DISCHARGE;

  return {
    totalDailyEnergyWh,
    maxPowerW,
    inverterCapacityW,
    solarPanelCapacityW,
    batteryCapacityWh
  };
};
