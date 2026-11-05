export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج',
    devices: [
      { id: '1', name: 'كمبروسر تبريد', watts: 15000, hours: 24, quantity: 2 },
      { id: '2', name: 'مضخة مياه', watts: 2000, hours: 12, quantity: 2 },
      { id: '3', name: 'إضاءة', watts: 100, hours: 12, quantity: 10 }
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    devices: [
      { id: '1', name: 'أجهزة كمبيوتر', watts: 250, hours: 10, quantity: 20 },
      { id: '2', name: 'مكيفات', watts: 2000, hours: 10, quantity: 5 },
      { id: '3', name: 'إضاءة', watts: 40, hours: 10, quantity: 50 },
      { id: '4', name: 'طابعة', watts: 500, hours: 2, quantity: 2 }
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    devices: [
      { id: '1', name: 'غطاس مياه', watts: 7500, hours: 8, quantity: 1 },
      { id: '2', name: 'إضاءة', watts: 100, hours: 12, quantity: 5 }
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    devices: [
      { id: '1', name: 'مراوح شفط', watts: 750, hours: 24, quantity: 4 },
      { id: '2', name: 'دفايات', watts: 2000, hours: 12, quantity: 2 },
      { id: '3', name: 'إضاءة', watts: 50, hours: 24, quantity: 20 },
      { id: '4', name: 'مضخة مياه', watts: 1100, hours: 6, quantity: 1 }
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    devices: [
      { id: '1', name: 'مراوح تبريد', watts: 500, hours: 12, quantity: 6 },
      { id: '2', name: 'مضخة مياه', watts: 1500, hours: 4, quantity: 2 },
      { id: '3', name: 'إضاءة للنمو', watts: 300, hours: 8, quantity: 10 }
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    devices: [
      { id: '1', name: 'ماكينات إنتاج', watts: 30000, hours: 16, quantity: 3 },
      { id: '2', name: 'سيور ناقلة', watts: 5000, hours: 16, quantity: 2 },
      { id: '3', name: 'إضاءة', watts: 200, hours: 16, quantity: 50 }
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    devices: [
      { id: '1', name: 'معدات طبية', watts: 2000, hours: 8, quantity: 3 },
      { id: '2', name: 'مكيفات', watts: 1500, hours: 12, quantity: 6 },
      { id: '3', name: 'ثلاجات أدوية', watts: 500, hours: 24, quantity: 2 },
      { id: '4', name: 'أجهزة كمبيوتر', watts: 200, hours: 12, quantity: 5 },
      { id: '5', name: 'إضاءة', watts: 40, hours: 12, quantity: 40 }
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    devices: [
      { id: '1', name: 'معدات طبية كبيرة (أشعة وغيرها)', watts: 15000, hours: 8, quantity: 2 },
      { id: '2', name: 'تكييف مركزي', watts: 50000, hours: 24, quantity: 1 },
      { id: '3', name: 'ثلاجات حفظ', watts: 1000, hours: 24, quantity: 5 },
      { id: '4', name: 'أجهزة كمبيوتر', watts: 200, hours: 24, quantity: 30 },
      { id: '5', name: 'إضاءة', watts: 40, hours: 24, quantity: 200 }
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    devices: [
      { id: '1', name: 'أفران كهربائية', watts: 12000, hours: 12, quantity: 2 },
      { id: '2', name: 'عجانات', watts: 3000, hours: 6, quantity: 2 },
      { id: '3', name: 'مكيفات', watts: 2000, hours: 12, quantity: 2 },
      { id: '4', name: 'إضاءة', watts: 50, hours: 16, quantity: 20 }
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    devices: [
      { id: '1', name: 'ثلاجة عرض', watts: 800, hours: 24, quantity: 2 },
      { id: '2', name: 'فريزر', watts: 600, hours: 24, quantity: 1 },
      { id: '3', name: 'مكيف', watts: 1500, hours: 12, quantity: 1 },
      { id: '4', name: 'نقطة بيع', watts: 100, hours: 16, quantity: 1 },
      { id: '5', name: 'إضاءة', watts: 40, hours: 16, quantity: 10 }
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    devices: [
      { id: '1', name: 'ماكينة لحام', watts: 5000, hours: 4, quantity: 2 },
      { id: '2', name: 'صاروخ / دريل', watts: 1000, hours: 6, quantity: 4 },
      { id: '3', name: 'كمبروسر هواء', watts: 2000, hours: 8, quantity: 1 },
      { id: '4', name: 'إضاءة', watts: 100, hours: 12, quantity: 10 }
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    devices: [
      { id: '1', name: 'مضخة رئيسية', watts: 11000, hours: 10, quantity: 1 },
      { id: '2', name: 'لوحة تحكم', watts: 100, hours: 10, quantity: 1 }
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي',
    devices: [
      { id: '1', name: 'مضخة سطحية', watts: 3000, hours: 8, quantity: 1 },
      { id: '2', name: 'إضاءة', watts: 50, hours: 12, quantity: 2 }
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    devices: [
      { id: '1', name: 'مكيفات سبليت', watts: 2000, hours: 6, quantity: 6 },
      { id: '2', name: 'مراوح', watts: 100, hours: 8, quantity: 10 },
      { id: '3', name: 'مضخة مياه', watts: 750, hours: 2, quantity: 1 },
      { id: '4', name: 'نظام صوتي', watts: 200, hours: 2, quantity: 1 },
      { id: '5', name: 'إضاءة', watts: 40, hours: 6, quantity: 30 }
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    devices: [
      { id: '1', name: 'ماكينات طباعة', watts: 8000, hours: 12, quantity: 3 },
      { id: '2', name: 'ماكينة قص', watts: 2000, hours: 8, quantity: 1 },
      { id: '3', name: 'أجهزة كمبيوتر', watts: 250, hours: 12, quantity: 5 },
      { id: '4', name: 'مكيفات', watts: 2000, hours: 12, quantity: 4 },
      { id: '5', name: 'إضاءة', watts: 50, hours: 12, quantity: 30 }
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    devices: [
      { id: '1', name: 'ماكينة اسبريسو', watts: 4000, hours: 16, quantity: 1 },
      { id: '2', name: 'طاحونة قهوة', watts: 500, hours: 4, quantity: 2 },
      { id: '3', name: 'خلاطات', watts: 800, hours: 3, quantity: 2 },
      { id: '4', name: 'ثلاجة عرض', watts: 800, hours: 24, quantity: 1 },
      { id: '5', name: 'مكيفات', watts: 1500, hours: 16, quantity: 2 },
      { id: '6', name: 'إضاءة', watts: 40, hours: 16, quantity: 20 }
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    devices: [
      { id: '1', name: 'ثلاجات ومجمدات', watts: 1000, hours: 24, quantity: 4 },
      { id: '2', name: 'أفران كهربائية', watts: 6000, hours: 10, quantity: 2 },
      { id: '3', name: 'قلايات', watts: 3000, hours: 8, quantity: 2 },
      { id: '4', name: 'مكيفات', watts: 2000, hours: 16, quantity: 4 },
      { id: '5', name: 'مراوح شفط', watts: 500, hours: 16, quantity: 2 },
      { id: '6', name: 'إضاءة', watts: 50, hours: 16, quantity: 30 }
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    devices: [
      { id: '1', name: 'مكيفات', watts: 1500, hours: 16, quantity: 20 },
      { id: '2', name: 'ثلاجات صغيرة', watts: 150, hours: 24, quantity: 20 },
      { id: '3', name: 'تلفزيونات', watts: 100, hours: 8, quantity: 20 },
      { id: '4', name: 'مصاعد', watts: 15000, hours: 10, quantity: 1 },
      { id: '5', name: 'مضخات مياه', watts: 2000, hours: 6, quantity: 2 },
      { id: '6', name: 'إضاءة', watts: 40, hours: 24, quantity: 150 }
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    devices: [
      { id: '1', name: 'أجهزة كمبيوتر', watts: 200, hours: 10, quantity: 20 },
      { id: '2', name: 'صراف آلي', watts: 500, hours: 24, quantity: 2 },
      { id: '3', name: 'مكيفات', watts: 2000, hours: 12, quantity: 6 },
      { id: '4', name: 'خوادم', watts: 1500, hours: 24, quantity: 2 },
      { id: '5', name: 'إضاءة', watts: 40, hours: 12, quantity: 80 }
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    devices: [
      { id: '1', name: 'ثلاجات عرض', watts: 1500, hours: 24, quantity: 6 },
      { id: '2', name: 'مجمدات', watts: 1200, hours: 24, quantity: 4 },
      { id: '3', name: 'مكيفات', watts: 3000, hours: 16, quantity: 4 },
      { id: '4', name: 'نقاط بيع', watts: 150, hours: 16, quantity: 3 },
      { id: '5', name: 'إضاءة', watts: 50, hours: 16, quantity: 60 }
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    devices: [
      { id: '1', name: 'مضخات وقود', watts: 2500, hours: 12, quantity: 4 },
      { id: '2', name: 'نقاط بيع', watts: 150, hours: 24, quantity: 2 },
      { id: '3', name: 'مكيف', watts: 1500, hours: 24, quantity: 1 },
      { id: '4', name: 'إضاءة خارجية', watts: 100, hours: 12, quantity: 20 }
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    devices: [
      { id: '1', name: 'كسارات', watts: 50000, hours: 16, quantity: 2 },
      { id: '2', name: 'مضخات رفع', watts: 25000, hours: 16, quantity: 2 },
      { id: '3', name: 'معدات ثقيلة كهربائية', watts: 30000, hours: 12, quantity: 3 },
      { id: '4', name: 'كشافات إضاءة عالية', watts: 1000, hours: 12, quantity: 20 }
    ]
  }
];

export function calculateSolarSystem(devices, peakSunHours = 5, panelWattage = 500) {
  let totalWatts = 0;
  let totalDailyEnergyWh = 0;

  devices.forEach(device => {
    const deviceTotalWatts = device.watts * device.quantity;
    const deviceDailyEnergy = deviceTotalWatts * device.hours;

    totalWatts += deviceTotalWatts;
    totalDailyEnergyWh += deviceDailyEnergy;
  });

  // Calculate Required Solar Capacity
  // Assume 80% system efficiency
  const efficiency = 0.8;
  const requiredSolarCapacityW = totalDailyEnergyWh / (peakSunHours * efficiency);

  const numberOfPanels = Math.ceil(requiredSolarCapacityW / panelWattage);

  // Calculate Inverter Size
  // 20% margin for safety / surge
  const inverterSizeW = Math.ceil(totalWatts * 1.2);

  // Calculate Batteries
  // Assume 12V 200Ah batteries, 50% Depth of Discharge
  const batteryVoltage = 12;
  const batteryCapacityAh = 200;
  const batteryEnergyWh = batteryVoltage * batteryCapacityAh * 0.5;

  const numberOfBatteries = Math.ceil(totalDailyEnergyWh / batteryEnergyWh);

  return {
    totalWatts,
    totalDailyEnergyWh,
    requiredSolarCapacityW,
    numberOfPanels,
    panelWattage,
    inverterSizeW,
    numberOfBatteries,
    batterySpec: `${batteryVoltage}V ${batteryCapacityAh}Ah`
  };
}
