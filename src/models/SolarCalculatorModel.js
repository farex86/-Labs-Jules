// src/models/SolarCalculatorModel.js

export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج', // Ice factory
    devices: [
      { id: 'ice_maker', name: 'ماكينة ثلج', power: 5000, quantity: 2, hoursPerDay: 12 },
      { id: 'freezer', name: 'فريزر', power: 1500, quantity: 4, hoursPerDay: 24 },
      { id: 'lighting', name: 'إضاءة', power: 50, quantity: 20, hoursPerDay: 12 }
    ]
  },
  {
    id: 'company',
    name: 'شركة', // Company
    devices: [
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 4, hoursPerDay: 8 },
      { id: 'computer', name: 'كمبيوتر', power: 200, quantity: 10, hoursPerDay: 8 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 30, hoursPerDay: 9 }
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة', // Farm
    devices: [
      { id: 'water_pump', name: 'مضخة مياه', power: 2200, quantity: 1, hoursPerDay: 6 },
      { id: 'lighting', name: 'إضاءة خارجية', power: 100, quantity: 5, hoursPerDay: 10 }
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن', // Poultry farm
    devices: [
      { id: 'ventilation', name: 'مراوح تهوية', power: 750, quantity: 4, hoursPerDay: 24 },
      { id: 'heater', name: 'دفاية', power: 2000, quantity: 2, hoursPerDay: 12 },
      { id: 'lighting', name: 'إضاءة', power: 30, quantity: 20, hoursPerDay: 16 }
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية', // Greenhouses
    devices: [
      { id: 'ac_cooling', name: 'نظام تبريد', power: 1500, quantity: 2, hoursPerDay: 8 },
      { id: 'water_pump', name: 'مضخة ري', power: 1100, quantity: 1, hoursPerDay: 4 }
    ]
  },
  {
    id: 'factory',
    name: 'مصنع', // Factory
    devices: [
      { id: 'heavy_machinery', name: 'ماكينات', power: 5000, quantity: 3, hoursPerDay: 8 },
      { id: 'lighting', name: 'إضاءة', power: 100, quantity: 40, hoursPerDay: 12 }
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف', // Clinic
    devices: [
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 3, hoursPerDay: 12 },
      { id: 'medical_equipment', name: 'أجهزة طبية', power: 500, quantity: 5, hoursPerDay: 8 },
      { id: 'fridge', name: 'ثلاجة أدوية', power: 300, quantity: 2, hoursPerDay: 24 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 20, hoursPerDay: 14 }
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفي', // Hospital
    devices: [
      { id: 'ac_central', name: 'تكييف مركزي', power: 10000, quantity: 2, hoursPerDay: 24 },
      { id: 'medical_imaging', name: 'أجهزة تصوير', power: 3000, quantity: 2, hoursPerDay: 8 },
      { id: 'monitors', name: 'أجهزة مراقبة', power: 200, quantity: 20, hoursPerDay: 24 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 100, hoursPerDay: 24 }
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز', // Bakery
    devices: [
      { id: 'electric_oven', name: 'فرن كهربائي', power: 5000, quantity: 2, hoursPerDay: 10 },
      { id: 'dough_mixer', name: 'عجانة', power: 1500, quantity: 2, hoursPerDay: 6 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 15, hoursPerDay: 12 }
    ]
  },
  {
    id: 'shop',
    name: 'دكان', // Shop
    devices: [
      { id: 'fridge', name: 'ثلاجة عرض', power: 400, quantity: 2, hoursPerDay: 24 },
      { id: 'fan', name: 'مروحة', power: 75, quantity: 2, hoursPerDay: 12 },
      { id: 'lighting', name: 'إضاءة', power: 30, quantity: 4, hoursPerDay: 8 }
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة', // Workshop
    devices: [
      { id: 'welding', name: 'ماكينة لحام', power: 3000, quantity: 1, hoursPerDay: 4 },
      { id: 'drill', name: 'شنيور', power: 800, quantity: 2, hoursPerDay: 3 },
      { id: 'compressor', name: 'كمبروسر هواء', power: 1500, quantity: 1, hoursPerDay: 4 }
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية', // Water pump
    devices: [
      { id: 'pump_large', name: 'مضخة كبيرة', power: 5500, quantity: 1, hoursPerDay: 8 }
    ]
  },
  {
    id: 'well_donkey',
    name: 'دونكي', // Water well
    devices: [
      { id: 'submersible_pump', name: 'غطاس', power: 2200, quantity: 1, hoursPerDay: 6 }
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد', // Mosque
    devices: [
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 4, hoursPerDay: 6 },
      { id: 'sound_system', name: 'مكبر صوت', power: 300, quantity: 1, hoursPerDay: 3 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 20, hoursPerDay: 4 }
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة', // Printing press
    devices: [
      { id: 'printer', name: 'طابعة كبيرة', power: 3000, quantity: 2, hoursPerDay: 8 },
      { id: 'computer', name: 'كمبيوتر', power: 250, quantity: 3, hoursPerDay: 8 },
      { id: 'cutting_machine', name: 'قطاعة ورق', power: 1000, quantity: 1, hoursPerDay: 4 }
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب', // Coffee shop
    devices: [
      { id: 'espresso_machine', name: 'ماكينة اسبريسو', power: 3500, quantity: 1, hoursPerDay: 12 },
      { id: 'grinder', name: 'مطحنة بن', power: 400, quantity: 2, hoursPerDay: 4 },
      { id: 'fridge', name: 'ثلاجة', power: 300, quantity: 2, hoursPerDay: 24 },
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 2, hoursPerDay: 12 }
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم', // Restaurant
    devices: [
      { id: 'fridge', name: 'ثلاجة', power: 400, quantity: 3, hoursPerDay: 24 },
      { id: 'freezer', name: 'فريزر', power: 600, quantity: 2, hoursPerDay: 24 },
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 4, hoursPerDay: 12 },
      { id: 'lighting', name: 'إضاءة', power: 40, quantity: 30, hoursPerDay: 12 }
    ]
  },
  {
    id: 'hotel',
    name: 'فندق', // Hotel
    devices: [
      { id: 'ac', name: 'مكيفات غرف', power: 1200, quantity: 20, hoursPerDay: 12 },
      { id: 'elevator', name: 'مصعد', power: 7500, quantity: 1, hoursPerDay: 4 },
      { id: 'lighting', name: 'إضاءة', power: 20, quantity: 100, hoursPerDay: 12 }
    ]
  },
  {
    id: 'bank',
    name: 'بنك', // Bank
    devices: [
      { id: 'ac', name: 'مكيف', power: 1500, quantity: 5, hoursPerDay: 10 },
      { id: 'computer', name: 'كمبيوتر', power: 200, quantity: 15, hoursPerDay: 10 },
      { id: 'atm', name: 'صراف آلي', power: 300, quantity: 2, hoursPerDay: 24 },
      { id: 'server', name: 'سيرفر', power: 800, quantity: 1, hoursPerDay: 24 }
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت', // Supermarket
    devices: [
      { id: 'fridge_display', name: 'ثلاجة عرض', power: 800, quantity: 6, hoursPerDay: 24 },
      { id: 'freezer', name: 'فريزر', power: 1000, quantity: 4, hoursPerDay: 24 },
      { id: 'ac', name: 'مكيف', power: 2000, quantity: 3, hoursPerDay: 16 },
      { id: 'pos', name: 'كاشير', power: 100, quantity: 3, hoursPerDay: 16 }
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود', // Gas station
    devices: [
      { id: 'fuel_pump', name: 'مضخة وقود', power: 750, quantity: 4, hoursPerDay: 24 },
      { id: 'lighting', name: 'إضاءة', power: 100, quantity: 10, hoursPerDay: 12 }
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين', // Mining company
    devices: [
      { id: 'crusher', name: 'طاحونة', power: 15000, quantity: 1, hoursPerDay: 12 },
      { id: 'water_pump', name: 'مضخة مياه', power: 3000, quantity: 2, hoursPerDay: 12 },
      { id: 'lighting', name: 'إضاءة', power: 200, quantity: 20, hoursPerDay: 12 }
    ]
  }
];

export const calculateSolarSystem = (devices) => {
  let totalDailyEnergyWh = 0;
  let peakPowerW = 0;

  devices.forEach((device) => {
    const power = parseFloat(device.power) || 0;
    const quantity = parseInt(device.quantity, 10) || 0;
    const hoursPerDay = parseFloat(device.hoursPerDay) || 0;

    const devicePeakW = power * quantity;
    const deviceEnergyWh = devicePeakW * hoursPerDay;

    peakPowerW += devicePeakW;
    totalDailyEnergyWh += deviceEnergyWh;
  });

  // Recommended Inverter Size (W) = Peak Power * 1.25 (25% safety margin)
  const recommendedInverterW = peakPowerW * 1.25;

  // Panel Capacity (W) = Total Daily Energy / 4.5 (assuming 4.5 peak sun hours average)
  const panelCapacityW = totalDailyEnergyWh / 4.5;

  // Battery Capacity (Wh) = Total Daily Energy * 1.5 (for 1.5 days of autonomy)
  const batteryCapacityWh = totalDailyEnergyWh * 1.5;

  // Assume 48V battery system for Ah calculation
  const batteryCapacityAh48V = batteryCapacityWh / 48;

  return {
    totalDailyEnergyWh,
    totalDailyEnergyKWh: totalDailyEnergyWh / 1000,
    peakPowerW,
    peakPowerKW: peakPowerW / 1000,
    recommendedInverterW,
    recommendedInverterKW: recommendedInverterW / 1000,
    panelCapacityW,
    panelCapacityKW: panelCapacityW / 1000,
    batteryCapacityWh,
    batteryCapacityKWh: batteryCapacityWh / 1000,
    batteryCapacityAh48V
  };
};
