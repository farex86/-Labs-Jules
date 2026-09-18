export const FACILITY_TYPES = [
  { id: 'ice_factory', label: 'مصنع ثلج' },
  { id: 'company', label: 'شركة' },
  { id: 'farm', label: 'مزرعة' },
  { id: 'poultry_farm', label: 'مزرعة دواجن' },
  { id: 'greenhouse', label: 'بيوت محمية' },
  { id: 'factory', label: 'مصنع' },
  { id: 'clinic', label: 'مستوصف' },
  { id: 'hospital', label: 'مستشفى' },
  { id: 'bakery', label: 'مخبز' },
  { id: 'shop', label: 'دكان' },
  { id: 'workshop', label: 'ورشة' },
  { id: 'water_pump', label: 'مضخة مياه' },
  { id: 'donkey', label: 'دونكي (مضخة مياه تقليدية)' },
  { id: 'mosque', label: 'مسجد' },
  { id: 'printing_press', label: 'مطبعة' },
  { id: 'coffee_shop', label: 'مقهى' },
  { id: 'restaurant', label: 'مطعم' },
  { id: 'hotel', label: 'فندق' },
  { id: 'bank', label: 'بنك' },
  { id: 'supermarket', label: 'سوبر ماركت' },
  { id: 'gas_station', label: 'محطة وقود' },
  { id: 'mining_company', label: 'شركة تعدين' }
];

export const DEFAULT_DEVICES = {
  ice_factory: [
    { id: 'ice_machine', name: 'ماكينة ثلج', power: 5000, quantity: 1, hours: 12 },
    { id: 'freezer', name: 'فريزر', power: 1000, quantity: 2, hours: 24 },
    { id: 'lighting', name: 'إضاءة', power: 50, quantity: 10, hours: 12 }
  ],
  company: [
    { id: 'ac', name: 'مكيف هواء', power: 1500, quantity: 4, hours: 8 },
    { id: 'computer', name: 'جهاز كمبيوتر', power: 250, quantity: 10, hours: 8 },
    { id: 'lighting', name: 'إضاءة', power: 20, quantity: 20, hours: 8 }
  ],
  farm: [
    { id: 'water_pump', name: 'مضخة مياه', power: 2000, quantity: 1, hours: 6 },
    { id: 'lighting', name: 'إضاءة كشافات', power: 100, quantity: 5, hours: 10 }
  ],
  poultry_farm: [
    { id: 'fans', name: 'مراوح تهوية', power: 500, quantity: 10, hours: 24 },
    { id: 'heater', name: 'دفاية', power: 2000, quantity: 2, hours: 12 },
    { id: 'lighting', name: 'إضاءة', power: 20, quantity: 30, hours: 16 }
  ],
  greenhouse: [
    { id: 'ventilation', name: 'نظام تهوية', power: 1000, quantity: 2, hours: 12 },
    { id: 'irrigation', name: 'نظام ري', power: 1500, quantity: 1, hours: 4 }
  ],
  factory: [
    { id: 'machinery', name: 'آلات تصنيع', power: 10000, quantity: 2, hours: 8 },
    { id: 'lighting', name: 'إضاءة', power: 100, quantity: 20, hours: 10 }
  ],
  clinic: [
    { id: 'ac', name: 'مكيف', power: 1500, quantity: 5, hours: 12 },
    { id: 'medical_equipment', name: 'معدات طبية', power: 2000, quantity: 2, hours: 8 },
    { id: 'fridge', name: 'ثلاجة أدوية', power: 300, quantity: 2, hours: 24 }
  ],
  hospital: [
    { id: 'ac_central', name: 'تكييف مركزي', power: 20000, quantity: 1, hours: 24 },
    { id: 'medical_equipment', name: 'معدات طبية', power: 5000, quantity: 10, hours: 24 },
    { id: 'lighting', name: 'إضاءة', power: 20, quantity: 200, hours: 24 }
  ],
  bakery: [
    { id: 'oven', name: 'فرن كهربائي', power: 5000, quantity: 2, hours: 10 },
    { id: 'mixer', name: 'عجانة', power: 1500, quantity: 2, hours: 8 },
    { id: 'lighting', name: 'إضاءة', power: 50, quantity: 10, hours: 12 }
  ],
  shop: [
    { id: 'fridge', name: 'ثلاجة عرض', power: 500, quantity: 2, hours: 24 },
    { id: 'ac', name: 'مكيف', power: 1500, quantity: 1, hours: 12 },
    { id: 'lighting', name: 'إضاءة', power: 20, quantity: 5, hours: 12 }
  ],
  workshop: [
    { id: 'tools', name: 'عدد كهربائية', power: 2000, quantity: 3, hours: 6 },
    { id: 'compressor', name: 'كمبروسر هواء', power: 3000, quantity: 1, hours: 4 },
    { id: 'lighting', name: 'إضاءة', power: 100, quantity: 4, hours: 10 }
  ],
  water_pump: [
    { id: 'pump_large', name: 'مضخة مياه كبيرة', power: 5000, quantity: 1, hours: 8 }
  ],
  donkey: [
    { id: 'pump_traditional', name: 'مضخة دونكي', power: 3000, quantity: 1, hours: 6 }
  ],
  mosque: [
    { id: 'ac', name: 'مكيفات', power: 2000, quantity: 6, hours: 4 },
    { id: 'sound_system', name: 'نظام صوتي', power: 500, quantity: 1, hours: 2 },
    { id: 'lighting', name: 'إضاءة', power: 50, quantity: 20, hours: 4 }
  ],
  printing_press: [
    { id: 'printer_industrial', name: 'طابعة صناعية', power: 4000, quantity: 2, hours: 10 },
    { id: 'computer', name: 'أجهزة كمبيوتر', power: 300, quantity: 5, hours: 10 },
    { id: 'lighting', name: 'إضاءة', power: 50, quantity: 10, hours: 10 }
  ],
  coffee_shop: [
    { id: 'espresso_machine', name: 'ماكينة قهوة', power: 3000, quantity: 1, hours: 12 },
    { id: 'blender', name: 'خلاط', power: 1000, quantity: 2, hours: 4 },
    { id: 'ac', name: 'مكيف', power: 1500, quantity: 2, hours: 12 },
    { id: 'fridge', name: 'ثلاجة عرض', power: 500, quantity: 1, hours: 24 }
  ],
  restaurant: [
    { id: 'kitchen_appliances', name: 'أجهزة مطبخ', power: 5000, quantity: 1, hours: 12 },
    { id: 'fridge', name: 'ثلاجات', power: 800, quantity: 4, hours: 24 },
    { id: 'ac', name: 'مكيفات', power: 2000, quantity: 4, hours: 14 }
  ],
  hotel: [
    { id: 'ac', name: 'مكيفات غرف', power: 1200, quantity: 50, hours: 12 },
    { id: 'water_heater', name: 'سخانات مياه', power: 1500, quantity: 50, hours: 2 },
    { id: 'lighting', name: 'إضاءة', power: 20, quantity: 200, hours: 8 }
  ],
  bank: [
    { id: 'ac', name: 'تكييف', power: 1500, quantity: 10, hours: 10 },
    { id: 'computer', name: 'أجهزة كمبيوتر', power: 250, quantity: 20, hours: 10 },
    { id: 'server', name: 'سيرفر', power: 1000, quantity: 1, hours: 24 }
  ],
  supermarket: [
    { id: 'fridge_display', name: 'ثلاجات عرض', power: 1000, quantity: 10, hours: 24 },
    { id: 'freezer', name: 'فريزرات', power: 1200, quantity: 5, hours: 24 },
    { id: 'ac', name: 'تكييف', power: 2000, quantity: 6, hours: 16 }
  ],
  gas_station: [
    { id: 'fuel_pump', name: 'مضخات وقود', power: 1500, quantity: 4, hours: 24 },
    { id: 'lighting', name: 'إضاءة خارجية', power: 100, quantity: 20, hours: 12 },
    { id: 'ac', name: 'مكيف مكتب', power: 1500, quantity: 2, hours: 24 }
  ],
  mining_company: [
    { id: 'heavy_machinery', name: 'آليات ثقيلة (كهربائية)', power: 20000, quantity: 2, hours: 12 },
    { id: 'lighting_tower', name: 'أبراج إضاءة', power: 2000, quantity: 5, hours: 12 },
    { id: 'water_pump', name: 'مضخات سحب مياه', power: 5000, quantity: 2, hours: 12 }
  ]
};

export const calculateDailyConsumption = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.power * device.quantity * device.hours);
  }, 0);
};

export const calculateRequiredSolarPanels = (totalDailyConsumptionWh, panelWattage = 500, peakSunHours = 5.5, systemLoss = 0.8) => {
  if (totalDailyConsumptionWh <= 0) return 0;
  // Total Energy required per day / (Peak Sun Hours * System Efficiency) = Total Array Capacity Required
  const totalCapacityRequired = totalDailyConsumptionWh / (peakSunHours * systemLoss);

  // Total Array Capacity / Panel Wattage = Number of Panels
  return Math.ceil(totalCapacityRequired / panelWattage);
};

export const calculateRequiredBatteries = (totalDailyConsumptionWh, daysOfAutonomy = 1, batteryVoltage = 48, depthOfDischarge = 0.8, batteryCapacityAh = 200) => {
  if (totalDailyConsumptionWh <= 0) return 0;
  // (Total Daily Consumption * Days of Autonomy) / (Battery Voltage * Depth of Discharge) = Required Total Amp Hours
  const requiredTotalAh = (totalDailyConsumptionWh * daysOfAutonomy) / (batteryVoltage * depthOfDischarge);

  // Required Total Amp Hours / Single Battery Amp Hours = Number of Batteries
  return Math.ceil(requiredTotalAh / batteryCapacityAh);
};

export const calculateInverterSize = (devices) => {
   // Calculate total running power
   const totalPower = devices.reduce((total, device) => total + (device.power * device.quantity), 0);
   // Add 25% safety margin
   return totalPower * 1.25;
};
