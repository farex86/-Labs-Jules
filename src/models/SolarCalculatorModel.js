export const FACILITY_TYPES = [
  { id: 'ice_factory', label: 'مصنع تلج', defaultDevices: [{ name: 'آلة صنع الثلج', power: 5000, quantity: 2, hours: 24 }, { name: 'إضاءة', power: 50, quantity: 10, hours: 12 }] },
  { id: 'company', label: 'شركة', defaultDevices: [{ name: 'مكيف', power: 1500, quantity: 5, hours: 8 }, { name: 'كمبيوتر', power: 250, quantity: 20, hours: 8 }, { name: 'إضاءة', power: 40, quantity: 30, hours: 10 }] },
  { id: 'farm', label: 'مزرعة', defaultDevices: [{ name: 'مضخة مياه', power: 3000, quantity: 1, hours: 6 }, { name: 'إضاءة خارجية', power: 100, quantity: 5, hours: 12 }] },
  { id: 'poultry_farm', label: 'مزرعة دواجن', defaultDevices: [{ name: 'مروحة تهوية', power: 750, quantity: 10, hours: 24 }, { name: 'نظام تدفئة', power: 2000, quantity: 5, hours: 12 }, { name: 'إضاءة', power: 40, quantity: 20, hours: 16 }] },
  { id: 'greenhouse', label: 'بيوت محمية', defaultDevices: [{ name: 'مضخة ري', power: 1500, quantity: 2, hours: 4 }, { name: 'مروحة تهوية', power: 500, quantity: 4, hours: 8 }] },
  { id: 'factory', label: 'مصنع', defaultDevices: [{ name: 'محركات صناعية', power: 10000, quantity: 3, hours: 16 }, { name: 'إضاءة المصنع', power: 100, quantity: 50, hours: 16 }] },
  { id: 'clinic', label: 'مستوصف', defaultDevices: [{ name: 'أجهزة طبية', power: 2000, quantity: 5, hours: 24 }, { name: 'مكيف', power: 1500, quantity: 4, hours: 12 }, { name: 'ثلاجة أدوية', power: 300, quantity: 2, hours: 24 }, { name: 'إضاءة', power: 40, quantity: 20, hours: 24 }] },
  { id: 'hospital', label: 'مستشفى', defaultDevices: [{ name: 'أجهزة طبية كبيرة', power: 5000, quantity: 10, hours: 24 }, { name: 'مكيفات مركزية', power: 10000, quantity: 5, hours: 24 }, { name: 'غرفة عمليات', power: 3000, quantity: 3, hours: 24 }, { name: 'إضاءة', power: 50, quantity: 100, hours: 24 }] },
  { id: 'bakery', label: 'مخبز', defaultDevices: [{ name: 'فرن كهربائي', power: 5000, quantity: 2, hours: 12 }, { name: 'عجانة', power: 1500, quantity: 2, hours: 8 }, { name: 'إضاءة', power: 40, quantity: 10, hours: 14 }] },
  { id: 'shop', label: 'دكان', defaultDevices: [{ name: 'ثلاجة عرض', power: 800, quantity: 2, hours: 24 }, { name: 'مكيف', power: 1500, quantity: 1, hours: 12 }, { name: 'إضاءة', power: 40, quantity: 5, hours: 12 }] },
  { id: 'workshop', label: 'ورشة', defaultDevices: [{ name: 'معدات ورشة', power: 3000, quantity: 3, hours: 8 }, { name: 'مكيف', power: 1500, quantity: 1, hours: 8 }, { name: 'إضاءة', power: 50, quantity: 10, hours: 10 }] },
  { id: 'water_pump', label: 'مضخة موية', defaultDevices: [{ name: 'مضخة مياه رئيسية', power: 5000, quantity: 1, hours: 10 }] },
  { id: 'donkey_cart', label: 'دونكي', defaultDevices: [{ name: 'إضاءة بسيطة', power: 20, quantity: 2, hours: 4 }] },
  { id: 'mosque', label: 'مسجد', defaultDevices: [{ name: 'مكيف', power: 1500, quantity: 6, hours: 6 }, { name: 'مروحة', power: 100, quantity: 10, hours: 6 }, { name: 'إضاءة', power: 40, quantity: 20, hours: 6 }, { name: 'مكبر صوت', power: 200, quantity: 1, hours: 6 }] },
  { id: 'printing_press', label: 'مطبعة', defaultDevices: [{ name: 'آلة طباعة', power: 4000, quantity: 2, hours: 10 }, { name: 'كمبيوتر', power: 250, quantity: 5, hours: 10 }, { name: 'مكيف', power: 1500, quantity: 2, hours: 10 }, { name: 'إضاءة', power: 50, quantity: 15, hours: 12 }] },
  { id: 'coffee_shop', label: 'كوفي شوب', defaultDevices: [{ name: 'آلة اسبريسو', power: 3000, quantity: 1, hours: 12 }, { name: 'ثلاجة', power: 500, quantity: 2, hours: 24 }, { name: 'مكيف', power: 1500, quantity: 2, hours: 12 }, { name: 'إضاءة ديكور', power: 100, quantity: 10, hours: 12 }] },
  { id: 'restaurant', label: 'مطعم', defaultDevices: [{ name: 'ثلاجة كبيرة', power: 1500, quantity: 3, hours: 24 }, { name: 'فرن كهربائي', power: 3000, quantity: 2, hours: 12 }, { name: 'مكيف', power: 1500, quantity: 4, hours: 14 }, { name: 'إضاءة', power: 50, quantity: 20, hours: 14 }] },
  { id: 'hotel', label: 'فندق', defaultDevices: [{ name: 'مكيفات غرف', power: 1500, quantity: 20, hours: 16 }, { name: 'ثلاجات غرف', power: 150, quantity: 20, hours: 24 }, { name: 'إضاءة عامة', power: 100, quantity: 50, hours: 24 }, { name: 'مصعد', power: 10000, quantity: 1, hours: 24 }] },
  { id: 'bank', label: 'بنك', defaultDevices: [{ name: 'كمبيوتر', power: 250, quantity: 30, hours: 9 }, { name: 'تكييف مركزي', power: 8000, quantity: 2, hours: 10 }, { name: 'صراف آلي', power: 500, quantity: 3, hours: 24 }, { name: 'إضاءة', power: 50, quantity: 50, hours: 12 }] },
  { id: 'supermarket', label: 'سوبر ماركت', defaultDevices: [{ name: 'ثلاجة عرض', power: 1500, quantity: 10, hours: 24 }, { name: 'فريزر', power: 2000, quantity: 5, hours: 24 }, { name: 'مكيف مركزي', power: 10000, quantity: 2, hours: 16 }, { name: 'إضاءة', power: 50, quantity: 60, hours: 16 }] },
  { id: 'gas_station', label: 'طرمبة وقود', defaultDevices: [{ name: 'مضخة وقود', power: 1500, quantity: 4, hours: 24 }, { name: 'إضاءة المظلة', power: 150, quantity: 20, hours: 12 }, { name: 'مكيف المتجر', power: 1500, quantity: 2, hours: 24 }, { name: 'ثلاجات المتجر', power: 800, quantity: 3, hours: 24 }] },
  { id: 'mining_company', label: 'شركة تعدين', defaultDevices: [{ name: 'معدات حفر', power: 15000, quantity: 2, hours: 16 }, { name: 'مضخة مياه', power: 5000, quantity: 2, hours: 12 }, { name: 'إضاءة الموقع', power: 500, quantity: 10, hours: 12 }, { name: 'مكيف كرفانات', power: 1500, quantity: 5, hours: 16 }] }
];

export const calculateSystemRequirements = (devices) => {
  let totalDailyEnergyWH = 0;
  let totalPeakPowerW = 0;

  devices.forEach(device => {
    const power = Number(device.power) || 0;
    const quantity = Number(device.quantity) || 0;
    const hours = Number(device.hours) || 0;

    const deviceTotalPower = power * quantity;
    const deviceDailyEnergy = deviceTotalPower * hours;

    totalPeakPowerW += deviceTotalPower;
    totalDailyEnergyWH += deviceDailyEnergy;
  });

  // Calculate System Requirements
  const safetyFactor = 1.25; // 25% safety margin
  const inverterSizeKW = (totalPeakPowerW * safetyFactor) / 1000;

  // Assuming 5 peak sun hours per day
  const peakSunHours = 5;
  const arrayCapacityKW = (totalDailyEnergyWH / peakSunHours) * 1.3 / 1000; // 30% system losses

  // Battery sizing assuming 50% Depth of Discharge for lead acid or optimal for lithium, 1 day autonomy
  const batteryStorageKWh = (totalDailyEnergyWH / 0.5) / 1000;

  return {
    totalDailyEnergyKWh: totalDailyEnergyWH / 1000,
    totalPeakPowerKW: totalPeakPowerW / 1000,
    recommendedInverterKW: inverterSizeKW,
    solarArrayCapacityKW: arrayCapacityKW,
    batteryStorageKWh: batteryStorageKWh
  };
};
