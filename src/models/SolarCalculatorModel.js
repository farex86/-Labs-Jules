// Constants for Arabic Facility Types and typical consumption devices
export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    defaultDevices: [
      { id: '1', name: 'ماكينة صنع الثلج', power: 5000, quantity: 2, hours: 24 },
      { id: '2', name: 'مكيف', power: 2000, quantity: 1, hours: 24 },
      { id: '3', name: 'إضاءة', power: 50, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    defaultDevices: [
      { id: '1', name: 'أجهزة كمبيوتر', power: 200, quantity: 10, hours: 8 },
      { id: '2', name: 'مكيف', power: 1500, quantity: 3, hours: 8 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 20, hours: 10 },
      { id: '4', name: 'طابعة', power: 300, quantity: 2, hours: 4 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultDevices: [
      { id: '1', name: 'مضخة مياه غاطسة', power: 3000, quantity: 1, hours: 6 },
      { id: '2', name: 'إضاءة ليلية', power: 100, quantity: 5, hours: 12 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultDevices: [
      { id: '1', name: 'مراوح تهوية', power: 1000, quantity: 4, hours: 24 },
      { id: '2', name: 'نظام تدفئة', power: 2000, quantity: 2, hours: 12 },
      { id: '3', name: 'إضاءة مستمرة', power: 60, quantity: 20, hours: 24 },
      { id: '4', name: 'نظام تغذية', power: 500, quantity: 1, hours: 8 },
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    defaultDevices: [
      { id: '1', name: 'مراوح تبريد', power: 750, quantity: 6, hours: 12 },
      { id: '2', name: 'مضخة ري', power: 1500, quantity: 1, hours: 4 },
      { id: '3', name: 'إضاءة زراعية', power: 200, quantity: 10, hours: 8 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultDevices: [
      { id: '1', name: 'ماكينة إنتاج', power: 10000, quantity: 2, hours: 16 },
      { id: '2', name: 'رافعة', power: 5000, quantity: 1, hours: 4 },
      { id: '3', name: 'إضاءة مستودع', power: 150, quantity: 20, hours: 16 },
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultDevices: [
      { id: '1', name: 'أجهزة طبية', power: 1500, quantity: 3, hours: 8 },
      { id: '2', name: 'مكيف', power: 1500, quantity: 4, hours: 12 },
      { id: '3', name: 'إضاءة', power: 50, quantity: 15, hours: 12 },
      { id: '4', name: 'ثلاجة أدوية', power: 300, quantity: 2, hours: 24 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    defaultDevices: [
      { id: '1', name: 'معدات عناية مركزة', power: 2000, quantity: 5, hours: 24 },
      { id: '2', name: 'مكيفات مركزية', power: 10000, quantity: 2, hours: 24 },
      { id: '3', name: 'إضاءة طوارئ وعادية', power: 100, quantity: 100, hours: 24 },
      { id: '4', name: 'أجهزة أشعة', power: 5000, quantity: 1, hours: 6 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultDevices: [
      { id: '1', name: 'عجانة', power: 3000, quantity: 2, hours: 8 },
      { id: '2', name: 'فرن كهربائي', power: 8000, quantity: 1, hours: 10 },
      { id: '3', name: 'ثلاجة عرض', power: 500, quantity: 2, hours: 24 },
      { id: '4', name: 'إضاءة', power: 50, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultDevices: [
      { id: '1', name: 'ثلاجة', power: 300, quantity: 2, hours: 24 },
      { id: '2', name: 'مكيف', power: 1500, quantity: 1, hours: 12 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 5, hours: 12 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultDevices: [
      { id: '1', name: 'ماكينة لحام', power: 4000, quantity: 1, hours: 4 },
      { id: '2', name: 'صاروخ جلخ', power: 1000, quantity: 2, hours: 4 },
      { id: '3', name: 'كمبروسر هواء', power: 2000, quantity: 1, hours: 4 },
      { id: '4', name: 'إضاءة كشافة', power: 200, quantity: 4, hours: 10 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    defaultDevices: [
      { id: '1', name: 'مضخة', power: 2000, quantity: 1, hours: 8 },
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي',
    defaultDevices: [
      { id: '1', name: 'مضخة صغيرة', power: 750, quantity: 1, hours: 6 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultDevices: [
      { id: '1', name: 'مكيفات', power: 2000, quantity: 4, hours: 6 },
      { id: '2', name: 'مراوح', power: 100, quantity: 10, hours: 6 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 30, hours: 6 },
      { id: '4', name: 'مكبر صوت', power: 200, quantity: 1, hours: 2 },
    ]
  },
  {
    id: 'press',
    name: 'مطبعة',
    defaultDevices: [
      { id: '1', name: 'ماكينة طباعة', power: 5000, quantity: 1, hours: 8 },
      { id: '2', name: 'آلة قص', power: 1500, quantity: 1, hours: 4 },
      { id: '3', name: 'مكيف', power: 2000, quantity: 2, hours: 8 },
      { id: '4', name: 'إضاءة', power: 60, quantity: 15, hours: 8 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultDevices: [
      { id: '1', name: 'ماكينة اسبريسو', power: 3000, quantity: 1, hours: 12 },
      { id: '2', name: 'ثلاجة عرض', power: 500, quantity: 2, hours: 24 },
      { id: '3', name: 'مكيف', power: 1500, quantity: 2, hours: 14 },
      { id: '4', name: 'إضاءة', power: 40, quantity: 20, hours: 14 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultDevices: [
      { id: '1', name: 'ثلاجات وفريزرات', power: 800, quantity: 3, hours: 24 },
      { id: '2', name: 'أفران كهربائية/ميكروويف', power: 2000, quantity: 2, hours: 10 },
      { id: '3', name: 'مكيفات', power: 2000, quantity: 3, hours: 16 },
      { id: '4', name: 'إضاءة', power: 50, quantity: 30, hours: 16 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultDevices: [
      { id: '1', name: 'مكيفات غرف', power: 1500, quantity: 20, hours: 12 },
      { id: '2', name: 'إضاءة', power: 40, quantity: 100, hours: 12 },
      { id: '3', name: 'سخانات مياه', power: 1500, quantity: 10, hours: 4 },
      { id: '4', name: 'ثلاجات غرف', power: 150, quantity: 20, hours: 24 },
      { id: '5', name: 'مصعد', power: 5000, quantity: 1, hours: 6 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultDevices: [
      { id: '1', name: 'أجهزة كمبيوتر', power: 200, quantity: 30, hours: 10 },
      { id: '2', name: 'تكييف مركزي', power: 15000, quantity: 1, hours: 10 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 50, hours: 12 },
      { id: '4', name: 'صراف آلي', power: 500, quantity: 2, hours: 24 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultDevices: [
      { id: '1', name: 'ثلاجات عرض', power: 1000, quantity: 5, hours: 24 },
      { id: '2', name: 'فريزرات', power: 1500, quantity: 3, hours: 24 },
      { id: '3', name: 'مكيفات', power: 2000, quantity: 2, hours: 16 },
      { id: '4', name: 'إضاءة', power: 50, quantity: 40, hours: 16 },
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultDevices: [
      { id: '1', name: 'مضخات وقود', power: 1500, quantity: 4, hours: 10 },
      { id: '2', name: 'إضاءة كشافات', power: 200, quantity: 8, hours: 12 },
      { id: '3', name: 'مكيف (مكتب)', power: 1500, quantity: 1, hours: 12 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultDevices: [
      { id: '1', name: 'معدات ثقيلة كهربائية', power: 20000, quantity: 2, hours: 12 },
      { id: '2', name: 'مضخات غاطسة كبيرة', power: 10000, quantity: 1, hours: 12 },
      { id: '3', name: 'إضاءة مواقع', power: 500, quantity: 10, hours: 12 },
      { id: '4', name: 'مكيفات كامبات', power: 1500, quantity: 10, hours: 10 },
    ]
  }
];

// Business Logic Functions
export function calculateTotalEnergy(devices) {
  return devices.reduce((total, device) => {
    return total + (device.power * device.quantity * device.hours);
  }, 0);
}

export function calculateSystemSize(totalEnergyWh, peakSunHours = 5.5, efficiency = 0.8) {
  // Returns recommended solar panels total capacity in kW
  return (totalEnergyWh / (peakSunHours * efficiency)) / 1000;
}

export function calculateBatteryCapacity(totalEnergyWh, autonomyDays = 1, dod = 0.5, systemVoltage = 48) {
  // Returns required battery capacity in Ah
  return (totalEnergyWh * autonomyDays) / (dod * systemVoltage);
}
