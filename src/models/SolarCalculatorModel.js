// SolarCalculatorModel.js

export const facilityTypes = [
  { id: 'ice_factory', name: 'مصنع ثلج', devices: [{ name: 'ماكينة ثلج', power: 5000, qty: 1, hours: 24 }] },
  { id: 'company', name: 'شركة', devices: [{ name: 'مكيف', power: 1500, qty: 4, hours: 8 }, { name: 'كمبيوتر', power: 200, qty: 10, hours: 8 }] },
  { id: 'farm', name: 'مزرعة', devices: [{ name: 'مضخة مياه', power: 3000, qty: 1, hours: 6 }] },
  { id: 'poultry_farm', name: 'مزرعة دواجن', devices: [{ name: 'مروحة شفط', power: 500, qty: 10, hours: 24 }, { name: 'إضاءة', power: 20, qty: 50, hours: 12 }] },
  { id: 'greenhouse', name: 'بيوت محمية', devices: [{ name: 'مروحة تبريد', power: 400, qty: 5, hours: 12 }] },
  { id: 'factory', name: 'مصنع', devices: [{ name: 'ماكينة إنتاج', power: 10000, qty: 1, hours: 16 }] },
  { id: 'clinic', name: 'مستوصف', devices: [{ name: 'إضاءة', power: 20, qty: 30, hours: 12 }, { name: 'مكيف', power: 1500, qty: 5, hours: 12 }] },
  { id: 'hospital', name: 'مستشفى', devices: [{ name: 'مكيف مركزي', power: 20000, qty: 1, hours: 24 }, { name: 'أجهزة طبية', power: 5000, qty: 1, hours: 24 }] },
  { id: 'bakery', name: 'مخبز', devices: [{ name: 'فرن كهربائي', power: 8000, qty: 1, hours: 12 }, { name: 'عجانة', power: 2000, qty: 1, hours: 6 }] },
  { id: 'shop', name: 'دكان', devices: [{ name: 'ثلاجة', power: 300, qty: 2, hours: 24 }, { name: 'إضاءة', power: 20, qty: 5, hours: 12 }] },
  { id: 'workshop', name: 'ورشة', devices: [{ name: 'ماكينة لحام', power: 4000, qty: 1, hours: 4 }, { name: 'صاروخ', power: 1000, qty: 2, hours: 4 }] },
  { id: 'water_pump', name: 'مضخة مياه', devices: [{ name: 'مضخة غاطسة', power: 5500, qty: 1, hours: 8 }] },
  { id: 'donki', name: 'دونكي', devices: [{ name: 'مضخة محطة', power: 7500, qty: 1, hours: 10 }] },
  { id: 'mosque', name: 'مسجد', devices: [{ name: 'مكيف', power: 1500, qty: 10, hours: 4 }, { name: 'مكبر صوت', power: 100, qty: 1, hours: 4 }] },
  { id: 'printing_press', name: 'مطبعة', devices: [{ name: 'ماكينة طباعة', power: 5000, qty: 2, hours: 8 }] },
  { id: 'coffee_shop', name: 'كوفي شوب', devices: [{ name: 'ماكينة قهوة', power: 3000, qty: 1, hours: 12 }, { name: 'ثلاجة عرض', power: 500, qty: 1, hours: 24 }] },
  { id: 'restaurant', name: 'مطعم', devices: [{ name: 'ثلاجة تجميد', power: 1000, qty: 2, hours: 24 }, { name: 'شفاط', power: 1500, qty: 1, hours: 12 }] },
  { id: 'hotel', name: 'فندق', devices: [{ name: 'مكيف سبليت', power: 1500, qty: 20, hours: 12 }, { name: 'سخان مياه', power: 2000, qty: 20, hours: 4 }] },
  { id: 'bank', name: 'بنك', devices: [{ name: 'كمبيوتر', power: 200, qty: 20, hours: 8 }, { name: 'صراف آلي', power: 500, qty: 2, hours: 24 }] },
  { id: 'supermarket', name: 'سوبر ماركت', devices: [{ name: 'ثلاجة عرض', power: 800, qty: 5, hours: 24 }, { name: 'فريزر', power: 600, qty: 3, hours: 24 }] },
  { id: 'gas_station', name: 'طرمبة وقود', devices: [{ name: 'مضخة وقود', power: 1000, qty: 4, hours: 24 }, { name: 'إضاءة مظلة', power: 100, qty: 10, hours: 12 }] },
  { id: 'mining_company', name: 'شركة تعدين', devices: [{ name: 'طاحونة', power: 15000, qty: 1, hours: 12 }, { name: 'حفار', power: 20000, qty: 1, hours: 8 }] },
];

export const calculateTotalConsumption = (devices) => {
  return devices.reduce((total, device) => {
    return total + (device.power * device.qty * device.hours) / 1000;
  }, 0);
};

export const calculateSolarSystemSize = (dailyConsumptionKWh, peakSunHours = 5.5, systemEfficiency = 0.8) => {
  // Returns required system size in kW
  return dailyConsumptionKWh / (peakSunHours * systemEfficiency);
};
