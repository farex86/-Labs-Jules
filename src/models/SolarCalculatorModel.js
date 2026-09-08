export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    devices: [
      { id: 'ice_machine', name: 'ماكينة ثلج', quantity: 2, wattage: 5000, hours: 12 },
      { id: 'freezer', name: 'فريزر', quantity: 3, wattage: 1000, hours: 24 },
      { id: 'lighting', name: 'إضاءة', quantity: 10, wattage: 20, hours: 12 },
    ],
  },
  {
    id: 'company',
    name: 'شركة',
    devices: [
      { id: 'ac', name: 'مكيف', quantity: 5, wattage: 1500, hours: 8 },
      { id: 'pc', name: 'كمبيوتر', quantity: 10, wattage: 200, hours: 8 },
      { id: 'lighting', name: 'إضاءة', quantity: 20, wattage: 20, hours: 10 },
      { id: 'printer', name: 'طابعة', quantity: 2, wattage: 500, hours: 2 },
    ],
  },
  {
    id: 'farm',
    name: 'مزرعة',
    devices: [
      { id: 'water_pump', name: 'مضخة مياه', quantity: 1, wattage: 2000, hours: 6 },
      { id: 'lighting', name: 'إضاءة', quantity: 5, wattage: 20, hours: 12 },
    ],
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    devices: [
      { id: 'ventilation', name: 'مراوح تهوية', quantity: 4, wattage: 500, hours: 24 },
      { id: 'heating', name: 'دفايات', quantity: 2, wattage: 2000, hours: 12 },
      { id: 'lighting', name: 'إضاءة', quantity: 10, wattage: 20, hours: 16 },
    ],
  },
  {
    id: 'greenhouses',
    name: 'بيوت محمية',
    devices: [
      { id: 'cooling_pad', name: 'وسادات تبريد', quantity: 2, wattage: 1000, hours: 12 },
      { id: 'water_pump', name: 'مضخة مياه', quantity: 1, wattage: 1500, hours: 4 },
      { id: 'lighting', name: 'إضاءة', quantity: 5, wattage: 30, hours: 12 },
    ],
  },
  {
    id: 'factory',
    name: 'مصنع',
    devices: [
      { id: 'heavy_machinery', name: 'آلات ثقيلة', quantity: 3, wattage: 10000, hours: 8 },
      { id: 'lighting', name: 'إضاءة', quantity: 50, wattage: 40, hours: 10 },
      { id: 'ac', name: 'تكييف', quantity: 5, wattage: 2000, hours: 10 },
    ],
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    devices: [
      { id: 'ac', name: 'مكيف', quantity: 6, wattage: 1500, hours: 12 },
      { id: 'medical_equipment', name: 'أجهزة طبية', quantity: 5, wattage: 500, hours: 8 },
      { id: 'fridge', name: 'ثلاجة أدوية', quantity: 2, wattage: 300, hours: 24 },
      { id: 'lighting', name: 'إضاءة', quantity: 20, wattage: 20, hours: 14 },
    ],
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    devices: [
      { id: 'ac', name: 'تكييف مركزي', quantity: 2, wattage: 15000, hours: 24 },
      { id: 'medical_equipment_heavy', name: 'أجهزة طبية ثقيلة (أشعة وغيرها)', quantity: 3, wattage: 5000, hours: 8 },
      { id: 'icu_equipment', name: 'أجهزة عناية مركزة', quantity: 10, wattage: 1000, hours: 24 },
      { id: 'fridge', name: 'ثلاجة أدوية', quantity: 10, wattage: 300, hours: 24 },
      { id: 'lighting', name: 'إضاءة', quantity: 100, wattage: 20, hours: 24 },
    ],
  },
  {
    id: 'bakery',
    name: 'مخبز',
    devices: [
      { id: 'oven', name: 'فرن كهربائي', quantity: 2, wattage: 5000, hours: 12 },
      { id: 'mixer', name: 'عجانة', quantity: 2, wattage: 1500, hours: 8 },
      { id: 'fridge', name: 'ثلاجة', quantity: 1, wattage: 1000, hours: 24 },
      { id: 'lighting', name: 'إضاءة', quantity: 10, wattage: 20, hours: 14 },
    ],
  },
  {
    id: 'shop',
    name: 'دكان',
    devices: [
      { id: 'fridge', name: 'ثلاجة عرض', quantity: 2, wattage: 800, hours: 24 },
      { id: 'ac', name: 'مكيف', quantity: 1, wattage: 1500, hours: 12 },
      { id: 'lighting', name: 'إضاءة', quantity: 4, wattage: 20, hours: 12 },
    ],
  },
  {
    id: 'workshop',
    name: 'ورشة',
    devices: [
      { id: 'welding', name: 'ماكينة لحام', quantity: 1, wattage: 4000, hours: 4 },
      { id: 'drill', name: 'شنيور/صاروخ', quantity: 3, wattage: 800, hours: 4 },
      { id: 'compressor', name: 'كمبروسر هواء', quantity: 1, wattage: 2000, hours: 4 },
      { id: 'lighting', name: 'إضاءة', quantity: 6, wattage: 40, hours: 10 },
    ],
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    devices: [
      { id: 'pump', name: 'مضخة غاطسة', quantity: 1, wattage: 3000, hours: 8 },
    ],
  },
  {
    id: 'donkey_pump',
    name: 'دونكي',
    devices: [
      { id: 'pump', name: 'مضخة مياه', quantity: 1, wattage: 5000, hours: 10 },
      { id: 'lighting', name: 'إضاءة', quantity: 2, wattage: 20, hours: 12 },
    ],
  },
  {
    id: 'mosque',
    name: 'مسجد',
    devices: [
      { id: 'ac', name: 'مكيف', quantity: 6, wattage: 1500, hours: 6 },
      { id: 'fans', name: 'مراوح', quantity: 10, wattage: 80, hours: 8 },
      { id: 'sound_system', name: 'مكبر صوت', quantity: 1, wattage: 200, hours: 4 },
      { id: 'lighting', name: 'إضاءة', quantity: 30, wattage: 20, hours: 6 },
    ],
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    devices: [
      { id: 'printer', name: 'ماكينة طباعة', quantity: 2, wattage: 3000, hours: 10 },
      { id: 'cutter', name: 'ماكينة قص', quantity: 1, wattage: 1500, hours: 5 },
      { id: 'ac', name: 'مكيف', quantity: 2, wattage: 2000, hours: 10 },
      { id: 'lighting', name: 'إضاءة', quantity: 15, wattage: 40, hours: 12 },
    ],
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    devices: [
      { id: 'espresso_machine', name: 'ماكينة قهوة', quantity: 1, wattage: 3000, hours: 12 },
      { id: 'grinder', name: 'طاحونة', quantity: 2, wattage: 500, hours: 4 },
      { id: 'fridge', name: 'ثلاجة', quantity: 2, wattage: 800, hours: 24 },
      { id: 'ac', name: 'مكيف', quantity: 3, wattage: 1500, hours: 14 },
      { id: 'lighting', name: 'إضاءة', quantity: 20, wattage: 20, hours: 14 },
    ],
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    devices: [
      { id: 'fridge', name: 'ثلاجة/فريزر', quantity: 4, wattage: 1000, hours: 24 },
      { id: 'ac', name: 'مكيف', quantity: 4, wattage: 2000, hours: 14 },
      { id: 'exhaust', name: 'شفاط هواء', quantity: 2, wattage: 800, hours: 14 },
      { id: 'lighting', name: 'إضاءة', quantity: 30, wattage: 20, hours: 14 },
    ],
  },
  {
    id: 'hotel',
    name: 'فندق',
    devices: [
      { id: 'ac', name: 'مكيفات غرف', quantity: 20, wattage: 1200, hours: 12 },
      { id: 'fridge', name: 'ثلاجات غرف', quantity: 20, wattage: 100, hours: 24 },
      { id: 'water_heater', name: 'سخانات مياه', quantity: 20, wattage: 1500, hours: 4 },
      { id: 'elevator', name: 'مصعد', quantity: 1, wattage: 5000, hours: 4 },
      { id: 'lighting', name: 'إضاءة', quantity: 100, wattage: 15, hours: 12 },
    ],
  },
  {
    id: 'bank',
    name: 'بنك',
    devices: [
      { id: 'ac', name: 'تكييف مركزي', quantity: 1, wattage: 10000, hours: 10 },
      { id: 'pc', name: 'كمبيوتر', quantity: 20, wattage: 200, hours: 10 },
      { id: 'atm', name: 'صراف آلي', quantity: 2, wattage: 500, hours: 24 },
      { id: 'lighting', name: 'إضاءة', quantity: 50, wattage: 20, hours: 12 },
    ],
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    devices: [
      { id: 'display_fridge', name: 'ثلاجات عرض', quantity: 5, wattage: 1200, hours: 24 },
      { id: 'freezer', name: 'فريزر', quantity: 3, wattage: 1000, hours: 24 },
      { id: 'ac', name: 'مكيف', quantity: 4, wattage: 2000, hours: 16 },
      { id: 'pos', name: 'نقاط بيع', quantity: 3, wattage: 150, hours: 16 },
      { id: 'lighting', name: 'إضاءة', quantity: 40, wattage: 30, hours: 16 },
    ],
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    devices: [
      { id: 'fuel_pump', name: 'مضخة وقود', quantity: 4, wattage: 1500, hours: 24 },
      { id: 'lighting', name: 'إضاءة خارجية', quantity: 20, wattage: 50, hours: 12 },
      { id: 'shop_fridge', name: 'ثلاجة متجر', quantity: 2, wattage: 800, hours: 24 },
      { id: 'shop_ac', name: 'مكيف متجر', quantity: 1, wattage: 1500, hours: 24 },
    ],
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    devices: [
      { id: 'crusher', name: 'كسارة', quantity: 1, wattage: 15000, hours: 12 },
      { id: 'mill', name: 'طاحونة', quantity: 2, wattage: 10000, hours: 12 },
      { id: 'water_pump', name: 'مضخة مياه', quantity: 2, wattage: 3000, hours: 12 },
      { id: 'lighting', name: 'إضاءة', quantity: 30, wattage: 100, hours: 12 },
      { id: 'ac', name: 'مكيفات مكاتب', quantity: 5, wattage: 1500, hours: 10 },
    ],
  },
];

export const calculateTotalLoad = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.quantity * device.wattage * device.hours);
  }, 0);
};

export const estimateSystemSize = (totalLoadWh, dailySunHours = 5.5, systemEfficiency = 0.8) => {
  // Size in kW
  const totalLoadKw = totalLoadWh / 1000;
  const requiredSolarKw = totalLoadKw / (dailySunHours * systemEfficiency);
  return Number(requiredSolarKw.toFixed(2));
};

export const calculateBatteryCapacity = (totalLoadWh, batteryVoltage = 48, depthOfDischarge = 0.8) => {
  // Capacity in Ah
  const capacityAh = totalLoadWh / (batteryVoltage * depthOfDischarge);
  return Number(capacityAh.toFixed(2));
};

export const generateDefaultDevicesForFacility = (facilityId) => {
  const facility = FACILITY_TYPES.find(f => f.id === facilityId);
  if (!facility) return [];
  // Deep copy to prevent mutating constants
  return facility.devices.map(d => ({ ...d }));
};
