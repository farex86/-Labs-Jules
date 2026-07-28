export const facilityTypes = [
  { id: 'ice_factory', name: 'مصنع تلج', appliances: [{ id: '1', name: 'ماكينة ثلج', power: 5000, quantity: 2, hours: 12 }] },
  { id: 'company', name: 'شركة', appliances: [{ id: '1', name: 'مكيف', power: 1500, quantity: 3, hours: 8 }, { id: '2', name: 'إضاءة', power: 20, quantity: 20, hours: 10 }, { id: '3', name: 'كمبيوتر', power: 200, quantity: 10, hours: 8 }] },
  { id: 'farm', name: 'مزرعة', appliances: [{ id: '1', name: 'مضخة مياه', power: 2000, quantity: 1, hours: 6 }] },
  { id: 'poultry_farm', name: 'مزرعة دواجن', appliances: [{ id: '1', name: 'مروحة شفط', power: 500, quantity: 4, hours: 24 }, { id: '2', name: 'إضاءة', power: 20, quantity: 50, hours: 12 }] },
  { id: 'greenhouse', name: 'بيوت محمية', appliances: [{ id: '1', name: 'مروحة تبريد', power: 1000, quantity: 2, hours: 12 }, { id: '2', name: 'مضخة ري', power: 1500, quantity: 1, hours: 4 }] },
  { id: 'factory', name: 'مصنع', appliances: [{ id: '1', name: 'ماكينة إنتاج', power: 10000, quantity: 1, hours: 16 }, { id: '2', name: 'إضاءة', power: 50, quantity: 40, hours: 16 }] },
  { id: 'clinic', name: 'مستوصف', appliances: [{ id: '1', name: 'مكيف', power: 1500, quantity: 4, hours: 12 }, { id: '2', name: 'ثلاجة أدوية', power: 300, quantity: 2, hours: 24 }, { id: '3', name: 'إضاءة', power: 20, quantity: 30, hours: 12 }] },
  { id: 'hospital', name: 'مستشفي', appliances: [{ id: '1', name: 'مكيف مركزي', power: 20000, quantity: 1, hours: 24 }, { id: '2', name: 'أجهزة طبية', power: 5000, quantity: 5, hours: 24 }, { id: '3', name: 'إضاءة', power: 30, quantity: 100, hours: 24 }] },
  { id: 'bakery', name: 'مخبز', appliances: [{ id: '1', name: 'فرن كهربائي', power: 8000, quantity: 1, hours: 10 }, { id: '2', name: 'عجانة', power: 2000, quantity: 1, hours: 6 }] },
  { id: 'shop', name: 'دكان', appliances: [{ id: '1', name: 'ثلاجة عرض', power: 600, quantity: 2, hours: 24 }, { id: '2', name: 'إضاءة', power: 20, quantity: 10, hours: 12 }] },
  { id: 'workshop', name: 'ورشة', appliances: [{ id: '1', name: 'ماكينة لحام', power: 4000, quantity: 1, hours: 4 }, { id: '2', name: 'صاروخ قطع', power: 1500, quantity: 2, hours: 3 }] },
  { id: 'water_pump', name: 'مضخة موية', appliances: [{ id: '1', name: 'مضخة غاطسة', power: 3000, quantity: 1, hours: 8 }] },
  { id: 'donkey', name: 'دونكي', appliances: [{ id: '1', name: 'مضخة مياه صغيرة', power: 1000, quantity: 1, hours: 6 }] },
  { id: 'mosque', name: 'مسجد', appliances: [{ id: '1', name: 'مكيف', power: 2000, quantity: 6, hours: 4 }, { id: '2', name: 'مروحة', power: 80, quantity: 15, hours: 5 }, { id: '3', name: 'إضاءة', power: 20, quantity: 40, hours: 4 }, { id: '4', name: 'مكبر صوت', power: 100, quantity: 1, hours: 3 }] },
  { id: 'printing_press', name: 'مطبعة', appliances: [{ id: '1', name: 'ماكينة طباعة', power: 5000, quantity: 2, hours: 8 }, { id: '2', name: 'كمبيوتر', power: 250, quantity: 5, hours: 8 }] },
  { id: 'coffee_shop', name: 'كوفي شوب', appliances: [{ id: '1', name: 'ماكينة اسبريسو', power: 3000, quantity: 1, hours: 12 }, { id: '2', name: 'ثلاجة عرض', power: 500, quantity: 2, hours: 24 }, { id: '3', name: 'مكيف', power: 2000, quantity: 2, hours: 12 }] },
  { id: 'restaurant', name: 'مطعم', appliances: [{ id: '1', name: 'ثلاجة', power: 800, quantity: 3, hours: 24 }, { id: '2', name: 'مكيف', power: 2500, quantity: 4, hours: 14 }, { id: '3', name: 'إضاءة', power: 20, quantity: 40, hours: 14 }] },
  { id: 'hotel', name: 'فندق', appliances: [{ id: '1', name: 'مكيف غرف', power: 1500, quantity: 20, hours: 10 }, { id: '2', name: 'سخان مياه', power: 2000, quantity: 20, hours: 4 }, { id: '3', name: 'مصعد', power: 8000, quantity: 1, hours: 5 }] },
  { id: 'bank', name: 'بنك', appliances: [{ id: '1', name: 'مكيف مركزي', power: 15000, quantity: 1, hours: 10 }, { id: '2', name: 'كمبيوتر', power: 200, quantity: 30, hours: 10 }, { id: '3', name: 'ماكينة صراف آلي', power: 400, quantity: 2, hours: 24 }] },
  { id: 'supermarket', name: 'سوبر ماركت', appliances: [{ id: '1', name: 'ثلاجة عرض كبيرة', power: 1500, quantity: 5, hours: 24 }, { id: '2', name: 'مكيف', power: 3000, quantity: 4, hours: 16 }, { id: '3', name: 'إضاءة', power: 30, quantity: 50, hours: 16 }] },
  { id: 'gas_station', name: 'طرمبة وقود', appliances: [{ id: '1', name: 'مضخة وقود', power: 1000, quantity: 4, hours: 24 }, { id: '2', name: 'إضاءة مظلة', power: 100, quantity: 10, hours: 12 }] },
  { id: 'mining_company', name: 'شركة تعدين', appliances: [{ id: '1', name: 'حفار', power: 50000, quantity: 1, hours: 12 }, { id: '2', name: 'مضخة مياه ضخمة', power: 20000, quantity: 2, hours: 12 }] },
];

export const calculateTotalDailyEnergy = (appliances) => {
  return appliances.reduce((total, app) => total + (app.power * app.quantity * app.hours), 0);
};

export const calculateSystemSize = (totalDailyEnergy, peakSunHours = 5, systemLosses = 1.3) => {
  return (totalDailyEnergy / 1000) / peakSunHours * systemLosses;
};

export const calculateInverterSize = (appliances, safetyMargin = 1.25) => {
  const totalPower = appliances.reduce((total, app) => total + (app.power * app.quantity), 0);
  return (totalPower / 1000) * safetyMargin;
};

export const calculateBatteryCapacity = (totalDailyEnergy, systemVoltage = 48, depthOfDischarge = 0.5, daysOfAutonomy = 1) => {
  return (totalDailyEnergy * daysOfAutonomy) / (systemVoltage * depthOfDischarge);
};
