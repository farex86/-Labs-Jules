export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    devices: [
      { id: '1', name: 'آلة صنع الثلج', power: 15000, hours: 24, quantity: 2 },
      { id: '2', name: 'غرفة تبريد', power: 5000, hours: 24, quantity: 1 },
      { id: '3', name: 'إضاءة', power: 100, hours: 12, quantity: 10 }
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    devices: [
      { id: '1', name: 'مكيف هواء', power: 1500, hours: 8, quantity: 5 },
      { id: '2', name: 'كمبيوتر', power: 300, hours: 8, quantity: 20 },
      { id: '3', name: 'إضاءة', power: 40, hours: 10, quantity: 30 }
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    devices: [
      { id: '1', name: 'مضخة مياه', power: 3000, hours: 6, quantity: 2 },
      { id: '2', name: 'إضاءة محيطية', power: 150, hours: 12, quantity: 10 }
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    devices: [
      { id: '1', name: 'مراوح تهوية', power: 500, hours: 24, quantity: 10 },
      { id: '2', name: 'نظام تدفئة', power: 2000, hours: 12, quantity: 4 },
      { id: '3', name: 'إضاءة', power: 100, hours: 24, quantity: 20 }
    ]
  },
  {
    id: 'greenhouses',
    name: 'بيوت محمية',
    devices: [
      { id: '1', name: 'مضخة ري', power: 1500, hours: 4, quantity: 2 },
      { id: '2', name: 'مراوح تبريد', power: 750, hours: 8, quantity: 6 },
      { id: '3', name: 'نظام تحكم', power: 200, hours: 24, quantity: 1 }
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    devices: [
      { id: '1', name: 'آلات إنتاج', power: 10000, hours: 16, quantity: 5 },
      { id: '2', name: 'إضاءة صناعية', power: 200, hours: 16, quantity: 50 },
      { id: '3', name: 'مكيفات مركزية', power: 5000, hours: 16, quantity: 4 }
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    devices: [
      { id: '1', name: 'مكيفات', power: 2000, hours: 24, quantity: 6 },
      { id: '2', name: 'أجهزة طبية صغيرة', power: 500, hours: 10, quantity: 10 },
      { id: '3', name: 'إضاءة', power: 50, hours: 24, quantity: 40 },
      { id: '4', name: 'ثلاجة أدوية', power: 300, hours: 24, quantity: 2 }
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    devices: [
      { id: '1', name: 'تكييف مركزي', power: 50000, hours: 24, quantity: 2 },
      { id: '2', name: 'أجهزة تصوير طبي', power: 5000, hours: 12, quantity: 4 },
      { id: '3', name: 'غرف عمليات', power: 10000, hours: 12, quantity: 3 },
      { id: '4', name: 'إضاءة', power: 50, hours: 24, quantity: 200 }
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    devices: [
      { id: '1', name: 'فرن كهربائي', power: 15000, hours: 12, quantity: 2 },
      { id: '2', name: 'عجانة', power: 3000, hours: 8, quantity: 2 },
      { id: '3', name: 'ثلاجة عرض', power: 1000, hours: 24, quantity: 3 }
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    devices: [
      { id: '1', name: 'ثلاجة تبريد', power: 800, hours: 24, quantity: 2 },
      { id: '2', name: 'مكيف', power: 1500, hours: 12, quantity: 1 },
      { id: '3', name: 'إضاءة', power: 40, hours: 12, quantity: 8 }
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    devices: [
      { id: '1', name: 'آلة لحام', power: 5000, hours: 4, quantity: 2 },
      { id: '2', name: 'ضاغط هواء', power: 2500, hours: 6, quantity: 1 },
      { id: '3', name: 'إضاءة قوية', power: 150, hours: 10, quantity: 10 }
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    devices: [
      { id: '1', name: 'مضخة غاطسة', power: 4000, hours: 10, quantity: 1 },
      { id: '2', name: 'نظام تحكم', power: 100, hours: 10, quantity: 1 }
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي',
    devices: [
      { id: '1', name: 'مضخة مياه صغيرة', power: 1500, hours: 12, quantity: 1 },
      { id: '2', name: 'إنارة بسيطة', power: 50, hours: 12, quantity: 2 }
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    devices: [
      { id: '1', name: 'مكيفات', power: 2000, hours: 5, quantity: 10 },
      { id: '2', name: 'إضاءة', power: 40, hours: 5, quantity: 50 },
      { id: '3', name: 'نظام صوتي', power: 300, hours: 5, quantity: 1 }
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    devices: [
      { id: '1', name: 'آلة طباعة', power: 4000, hours: 10, quantity: 3 },
      { id: '2', name: 'مكيف', power: 2000, hours: 10, quantity: 2 },
      { id: '3', name: 'إضاءة', power: 100, hours: 10, quantity: 15 }
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    devices: [
      { id: '1', name: 'آلة اسبريسو', power: 3500, hours: 14, quantity: 1 },
      { id: '2', name: 'ثلاجة عرض', power: 800, hours: 24, quantity: 2 },
      { id: '3', name: 'مكيف', power: 2000, hours: 14, quantity: 2 },
      { id: '4', name: 'صانعة ثلج', power: 500, hours: 24, quantity: 1 }
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    devices: [
      { id: '1', name: 'ثلاجات', power: 1000, hours: 24, quantity: 4 },
      { id: '2', name: 'مكيفات', power: 2500, hours: 16, quantity: 4 },
      { id: '3', name: 'إضاءة', power: 50, hours: 16, quantity: 40 },
      { id: '4', name: 'شفاط هواء', power: 1500, hours: 16, quantity: 2 }
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    devices: [
      { id: '1', name: 'تكييف غرف', power: 1500, hours: 24, quantity: 50 },
      { id: '2', name: 'سخان مياه مركزي', power: 10000, hours: 8, quantity: 2 },
      { id: '3', name: 'ثلاجات صغيرة', power: 150, hours: 24, quantity: 50 },
      { id: '4', name: 'إضاءة ومصاعد', power: 10000, hours: 24, quantity: 1 }
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    devices: [
      { id: '1', name: 'تكييف مركزي', power: 15000, hours: 12, quantity: 1 },
      { id: '2', name: 'أجهزة صراف آلي', power: 500, hours: 24, quantity: 4 },
      { id: '3', name: 'كمبيوترات', power: 250, hours: 10, quantity: 30 },
      { id: '4', name: 'إضاءة', power: 40, hours: 12, quantity: 100 }
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    devices: [
      { id: '1', name: 'ثلاجات عرض', power: 1500, hours: 24, quantity: 10 },
      { id: '2', name: 'مكيفات', power: 3000, hours: 16, quantity: 6 },
      { id: '3', name: 'إضاءة', power: 50, hours: 16, quantity: 80 },
      { id: '4', name: 'فريزر', power: 2000, hours: 24, quantity: 5 }
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    devices: [
      { id: '1', name: 'مضخات وقود', power: 1000, hours: 24, quantity: 6 },
      { id: '2', name: 'إضاءة قوية', power: 200, hours: 12, quantity: 20 },
      { id: '3', name: 'مكيف مكتب', power: 1500, hours: 24, quantity: 1 }
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    devices: [
      { id: '1', name: 'معدات حفر', power: 20000, hours: 16, quantity: 3 },
      { id: '2', name: 'كسارات', power: 30000, hours: 16, quantity: 2 },
      { id: '3', name: 'إضاءة كاشفة', power: 1000, hours: 12, quantity: 30 }
    ]
  }
];

export const calculateTotalConsumption = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.power * device.hours * device.quantity);
  }, 0);
};

export const calculateSystemSize = (dailyConsumptionWh, peakSunHours = 5, systemEfficiency = 0.8) => {
  if (dailyConsumptionWh <= 0) return 0;

  // Size in kW = (Daily Consumption in Wh) / (Peak Sun Hours * System Efficiency * 1000)
  const systemSizeKw = dailyConsumptionWh / (peakSunHours * systemEfficiency * 1000);

  return systemSizeKw;
};
