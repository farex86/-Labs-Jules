export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    label: 'مصنع تلج',
    devices: [
      { id: 'compressor', name: 'كمبريسور تبريد', powerW: 15000, qty: 2, hoursPerDay: 24 },
      { id: 'water_pump', name: 'مضخة ماء', powerW: 2200, qty: 1, hoursPerDay: 12 },
      { id: 'lighting', name: 'إضاءة', powerW: 100, qty: 10, hoursPerDay: 12 }
    ]
  },
  {
    id: 'company',
    label: 'شركة',
    devices: [
      { id: 'ac', name: 'مكيف', powerW: 1500, qty: 5, hoursPerDay: 8 },
      { id: 'computer', name: 'كمبيوتر', powerW: 250, qty: 10, hoursPerDay: 8 },
      { id: 'printer', name: 'طابعة', powerW: 500, qty: 2, hoursPerDay: 2 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, qty: 20, hoursPerDay: 8 }
    ]
  },
  {
    id: 'farm',
    label: 'مزرعة',
    devices: [
      { id: 'submersible_pump', name: 'مضخة غاطسة', powerW: 5500, qty: 1, hoursPerDay: 6 },
      { id: 'lighting', name: 'إضاءة', powerW: 100, qty: 5, hoursPerDay: 10 },
      { id: 'worker_room', name: 'غرفة عمال', powerW: 300, qty: 1, hoursPerDay: 12 }
    ]
  },
  {
    id: 'poultry_farm',
    label: 'مزرعة دواجن',
    devices: [
      { id: 'exhaust_fan', name: 'مروحة شفط', powerW: 1100, qty: 4, hoursPerDay: 24 },
      { id: 'cooling_pad_pump', name: 'مضخة تبريد', powerW: 750, qty: 2, hoursPerDay: 24 },
      { id: 'feeder_motor', name: 'موتور علف', powerW: 1500, qty: 2, hoursPerDay: 4 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, qty: 30, hoursPerDay: 16 }
    ]
  },
  {
    id: 'greenhouse',
    label: 'بيوت محمية',
    devices: [
      { id: 'exhaust_fan', name: 'مروحة شفط', powerW: 1100, qty: 2, hoursPerDay: 12 },
      { id: 'cooling_pump', name: 'مضخة تبريد', powerW: 750, qty: 1, hoursPerDay: 12 },
      { id: 'irrigation_pump', name: 'مضخة ري', powerW: 2200, qty: 1, hoursPerDay: 4 }
    ]
  },
  {
    id: 'factory',
    label: 'مصنع',
    devices: [
      { id: 'heavy_machinery', name: 'ماكينات إنتاج', powerW: 25000, qty: 2, hoursPerDay: 16 },
      { id: 'compressor', name: 'كمبريسور هواء', powerW: 5500, qty: 1, hoursPerDay: 16 },
      { id: 'lighting', name: 'إضاءة', powerW: 100, qty: 50, hoursPerDay: 16 }
    ]
  },
  {
    id: 'clinic',
    label: 'مستوصف',
    devices: [
      { id: 'ac', name: 'مكيف', powerW: 1500, qty: 6, hoursPerDay: 12 },
      { id: 'medical_equipment', name: 'معدات طبية', powerW: 2000, qty: 3, hoursPerDay: 8 },
      { id: 'fridge', name: 'ثلاجة أدوية', powerW: 300, qty: 2, hoursPerDay: 24 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, qty: 30, hoursPerDay: 12 }
    ]
  },
  {
    id: 'hospital',
    label: 'مستشفي',
    devices: [
      { id: 'central_ac', name: 'تكييف مركزي', powerW: 50000, qty: 1, hoursPerDay: 24 },
      { id: 'medical_equipment', name: 'معدات طبية', powerW: 30000, qty: 1, hoursPerDay: 24 },
      { id: 'elevators', name: 'مصاعد', powerW: 15000, qty: 2, hoursPerDay: 24 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, qty: 200, hoursPerDay: 24 }
    ]
  },
  {
    id: 'bakery',
    label: 'مخبز',
    devices: [
      { id: 'mixer', name: 'عجانة', powerW: 3000, qty: 2, hoursPerDay: 8 },
      { id: 'oven', name: 'فرن كهربائي', powerW: 10000, qty: 1, hoursPerDay: 12 },
      { id: 'proofer', name: 'خمارة', powerW: 2000, qty: 1, hoursPerDay: 12 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, qty: 15, hoursPerDay: 14 }
    ]
  },
  {
    id: 'shop',
    label: 'دكان',
    devices: [
      { id: 'fridge', name: 'ثلاجة عرض', powerW: 500, qty: 2, hoursPerDay: 24 },
      { id: 'chest_freezer', name: 'فريزر', powerW: 400, qty: 1, hoursPerDay: 24 },
      { id: 'fan', name: 'مروحة', powerW: 75, qty: 2, hoursPerDay: 12 },
      { id: 'lighting', name: 'إضاءة', powerW: 20, qty: 4, hoursPerDay: 12 }
    ]
  },
  {
    id: 'workshop',
    label: 'ورشة',
    devices: [
      { id: 'welding_machine', name: 'ماكينة لحام', powerW: 5000, qty: 1, hoursPerDay: 4 },
      { id: 'grinder', name: 'صاروخ جلخ', powerW: 2000, qty: 2, hoursPerDay: 3 },
      { id: 'drill', name: 'شنيور', powerW: 800, qty: 2, hoursPerDay: 2 },
      { id: 'lighting', name: 'إضاءة', powerW: 100, qty: 5, hoursPerDay: 10 }
    ]
  },
  {
    id: 'water_pump',
    label: 'مضخة موية',
    devices: [
      { id: 'pump_large', name: 'مضخة مياه كبيرة', powerW: 7500, qty: 1, hoursPerDay: 8 },
      { id: 'control_panel', name: 'لوحة تحكم', powerW: 100, qty: 1, hoursPerDay: 8 }
    ]
  },
  {
    id: 'donkey',
    label: 'دونكي',
    devices: [
      { id: 'pump_medium', name: 'مضخة', powerW: 2200, qty: 1, hoursPerDay: 6 },
      { id: 'lighting', name: 'إضاءة', powerW: 20, qty: 2, hoursPerDay: 12 }
    ]
  },
  {
    id: 'mosque',
    label: 'مسجد',
    devices: [
      { id: 'ac', name: 'مكيف', powerW: 1500, qty: 4, hoursPerDay: 6 },
      { id: 'fan', name: 'مروحة', powerW: 75, qty: 10, hoursPerDay: 6 },
      { id: 'sound_system', name: 'مكبر صوت', powerW: 300, qty: 1, hoursPerDay: 2 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, qty: 20, hoursPerDay: 5 }
    ]
  },
  {
    id: 'printing_press',
    label: 'مطبعة',
    devices: [
      { id: 'printing_machine', name: 'ماكينة طباعة', powerW: 5000, qty: 2, hoursPerDay: 10 },
      { id: 'cutter', name: 'مقص ورق', powerW: 2000, qty: 1, hoursPerDay: 4 },
      { id: 'computer', name: 'كمبيوتر تصميم', powerW: 400, qty: 3, hoursPerDay: 10 },
      { id: 'ac', name: 'مكيف', powerW: 1500, qty: 3, hoursPerDay: 10 }
    ]
  },
  {
    id: 'coffee_shop',
    label: 'كوفي شوب',
    devices: [
      { id: 'espresso_machine', name: 'ماكينة قهوة', powerW: 3500, qty: 1, hoursPerDay: 12 },
      { id: 'grinder', name: 'مطحنة قهوة', powerW: 500, qty: 2, hoursPerDay: 4 },
      { id: 'fridge', name: 'ثلاجة عرض', powerW: 600, qty: 2, hoursPerDay: 24 },
      { id: 'ac', name: 'مكيف', powerW: 1500, qty: 2, hoursPerDay: 16 }
    ]
  },
  {
    id: 'restaurant',
    label: 'مطعم',
    devices: [
      { id: 'freezer', name: 'فريزر', powerW: 800, qty: 3, hoursPerDay: 24 },
      { id: 'fridge', name: 'ثلاجة', powerW: 600, qty: 2, hoursPerDay: 24 },
      { id: 'ac', name: 'مكيف', powerW: 2000, qty: 4, hoursPerDay: 16 },
      { id: 'exhaust', name: 'شفاط مطبخ', powerW: 1500, qty: 1, hoursPerDay: 16 }
    ]
  },
  {
    id: 'hotel',
    label: 'فندق',
    devices: [
      { id: 'ac', name: 'مكيف', powerW: 1500, qty: 20, hoursPerDay: 16 },
      { id: 'water_heater', name: 'سخان مياه', powerW: 2000, qty: 10, hoursPerDay: 4 },
      { id: 'elevator', name: 'مصعد', powerW: 7500, qty: 1, hoursPerDay: 24 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, qty: 100, hoursPerDay: 12 }
    ]
  },
  {
    id: 'bank',
    label: 'بنك',
    devices: [
      { id: 'central_ac', name: 'تكييف مركزي', powerW: 15000, qty: 1, hoursPerDay: 10 },
      { id: 'computer', name: 'كمبيوتر', powerW: 250, qty: 20, hoursPerDay: 10 },
      { id: 'server', name: 'سيرفر', powerW: 1000, qty: 2, hoursPerDay: 24 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, qty: 50, hoursPerDay: 12 }
    ]
  },
  {
    id: 'supermarket',
    label: 'سوبر ماركت',
    devices: [
      { id: 'display_fridge', name: 'ثلاجات عرض', powerW: 1200, qty: 5, hoursPerDay: 24 },
      { id: 'chest_freezer', name: 'فريزر', powerW: 600, qty: 4, hoursPerDay: 24 },
      { id: 'ac', name: 'مكيف', powerW: 2000, qty: 3, hoursPerDay: 16 },
      { id: 'lighting', name: 'إضاءة', powerW: 40, qty: 40, hoursPerDay: 16 }
    ]
  },
  {
    id: 'gas_station',
    label: 'طرمبة وقود',
    devices: [
      { id: 'fuel_pump', name: 'مضخة وقود', powerW: 1500, qty: 4, hoursPerDay: 24 },
      { id: 'lighting_canopy', name: 'إضاءة المظلة', powerW: 150, qty: 10, hoursPerDay: 12 },
      { id: 'ac_office', name: 'مكيف الإدارة', powerW: 1500, qty: 2, hoursPerDay: 24 }
    ]
  },
  {
    id: 'mining_company',
    label: 'شركة تعدين',
    devices: [
      { id: 'crusher', name: 'كسارة', powerW: 50000, qty: 1, hoursPerDay: 12 },
      { id: 'conveyor', name: 'سير ناقل', powerW: 15000, qty: 2, hoursPerDay: 12 },
      { id: 'pump', name: 'مضخة غسيل', powerW: 22000, qty: 1, hoursPerDay: 12 },
      { id: 'camp_load', name: 'أحمال المعسكر', powerW: 10000, qty: 1, hoursPerDay: 24 }
    ]
  }
];

export const calculateSolarNeeds = (devicesList) => {
  if (!devicesList || devicesList.length === 0) return null;

  let totalPeakLoadW = 0;
  let totalEnergyWh = 0;

  devicesList.forEach(device => {
    const qty = parseInt(device.qty, 10) || 0;
    const power = parseFloat(device.powerW) || 0;
    const hours = parseFloat(device.hoursPerDay) || 0;

    const devicePeakW = qty * power;
    const deviceEnergyWh = devicePeakW * hours;

    totalPeakLoadW += devicePeakW;
    totalEnergyWh += deviceEnergyWh;
  });

  const estimatedLoadKw = totalPeakLoadW / 1000;
  const totalEnergyKwh = totalEnergyWh / 1000;

  // Assumptions
  const dailySunHours = 5;
  const panelPowerW = 500;
  const panelEnergyWh = panelPowerW * dailySunHours;

  const panelsNeeded = Math.ceil(totalEnergyWh / panelEnergyWh) || 0;
  const inverterCapacityKw = Math.ceil(estimatedLoadKw * 1.2) || 0;
  const batteryCapacityKwh = Math.ceil(totalEnergyKwh * 0.5) || 0;

  const estimatedCost = (panelsNeeded * 150) + (inverterCapacityKw * 200) + (batteryCapacityKwh * 300);

  return {
    estimatedLoadKw: estimatedLoadKw.toFixed(2),
    totalEnergyKwh: totalEnergyKwh.toFixed(2),
    panelsNeeded,
    inverterCapacityKw,
    batteryCapacityKwh,
    estimatedCost
  };
};
