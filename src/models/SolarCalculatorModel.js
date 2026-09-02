export const FACILITY_TYPES = [
  { id: 'ice_factory', label: 'مصنع تلج', appliances: [{ id: 'compressor', name: 'كمبروسر', powerW: 15000, quantity: 2, hours: 24 }, { id: 'pump', name: 'مضخة مياه', powerW: 2000, quantity: 1, hours: 24 }] },
  { id: 'company', label: 'شركة', appliances: [{ id: 'ac', name: 'مكيف', powerW: 1500, quantity: 5, hours: 10 }, { id: 'pc', name: 'كمبيوتر', powerW: 300, quantity: 15, hours: 10 }, { id: 'lights', name: 'إضاءة', powerW: 40, quantity: 50, hours: 12 }] },
  { id: 'farm', label: 'مزرعة', appliances: [{ id: 'water_pump', name: 'مضخة غاطسة', powerW: 5500, quantity: 1, hours: 8 }, { id: 'lights', name: 'كشافات إضاءة', powerW: 100, quantity: 10, hours: 12 }] },
  { id: 'poultry_farm', label: 'مزرعة دواجن', appliances: [{ id: 'heaters', name: 'دفايات', powerW: 2000, quantity: 5, hours: 24 }, { id: 'fans', name: 'مراوح شفط', powerW: 750, quantity: 8, hours: 24 }, { id: 'feeder', name: 'نظام تعليف', powerW: 1500, quantity: 1, hours: 6 }] },
  { id: 'greenhouse', label: 'بيوت محمية', appliances: [{ id: 'cooling_pad', name: 'نظام تبريد', powerW: 1000, quantity: 4, hours: 12 }, { id: 'irrigation', name: 'نظام ري', powerW: 1500, quantity: 1, hours: 4 }] },
  { id: 'factory', label: 'مصنع', appliances: [{ id: 'machines', name: 'ماكينات إنتاج', powerW: 25000, quantity: 3, hours: 16 }, { id: 'lights', name: 'إضاءة', powerW: 200, quantity: 40, hours: 16 }] },
  { id: 'clinic', label: 'مستوصف', appliances: [{ id: 'medical_eq', name: 'أجهزة طبية', powerW: 5000, quantity: 1, hours: 8 }, { id: 'ac', name: 'مكيف', powerW: 1500, quantity: 8, hours: 12 }, { id: 'fridge', name: 'ثلاجة أدوية', powerW: 300, quantity: 3, hours: 24 }] },
  { id: 'hospital', label: 'مستشفي', appliances: [{ id: 'icu', name: 'عناية مركزة', powerW: 15000, quantity: 1, hours: 24 }, { id: 'xray', name: 'أشعة', powerW: 20000, quantity: 1, hours: 4 }, { id: 'central_ac', name: 'تكييف مركزي', powerW: 50000, quantity: 1, hours: 24 }] },
  { id: 'bakery', label: 'مخبز', appliances: [{ id: 'oven', name: 'فرن كهربائي', powerW: 12000, quantity: 2, hours: 16 }, { id: 'mixer', name: 'عجانة', powerW: 3000, quantity: 2, hours: 8 }] },
  { id: 'shop', label: 'دكان', appliances: [{ id: 'fridge', name: 'ثلاجة عرض', powerW: 800, quantity: 3, hours: 24 }, { id: 'fan', name: 'مروحة', powerW: 80, quantity: 2, hours: 14 }] },
  { id: 'workshop', label: 'ورشة', appliances: [{ id: 'welding', name: 'ماكينة لحام', powerW: 7000, quantity: 1, hours: 6 }, { id: 'drill', name: 'دريل', powerW: 1500, quantity: 2, hours: 4 }] },
  { id: 'water_pump', label: 'مضخة موية', appliances: [{ id: 'pump', name: 'مضخة رئيسية', powerW: 11000, quantity: 1, hours: 12 }] },
  { id: 'donkey', label: 'دونكي', appliances: [{ id: 'pump', name: 'طلمبة', powerW: 4000, quantity: 1, hours: 10 }] },
  { id: 'mosque', label: 'مسجد', appliances: [{ id: 'ac', name: 'مكيف', powerW: 1500, quantity: 6, hours: 4 }, { id: 'mic', name: 'مكبر صوت', powerW: 200, quantity: 1, hours: 4 }] },
  { id: 'printing_press', label: 'مطبعة', appliances: [{ id: 'printer', name: 'ماكينة طباعة', powerW: 5000, quantity: 2, hours: 10 }, { id: 'cutter', name: 'مقص ورق', powerW: 2000, quantity: 1, hours: 4 }] },
  { id: 'coffee_shop', label: 'كوفي شوب', appliances: [{ id: 'espresso', name: 'ماكينة قهوة', powerW: 3500, quantity: 1, hours: 16 }, { id: 'blender', name: 'خلاط', powerW: 1200, quantity: 2, hours: 4 }, { id: 'ac', name: 'مكيف', powerW: 1500, quantity: 2, hours: 16 }] },
  { id: 'restaurant', label: 'مطعم', appliances: [{ id: 'fridge', name: 'ثلاجة تبريد', powerW: 1000, quantity: 4, hours: 24 }, { id: 'oven', name: 'فرن', powerW: 4000, quantity: 2, hours: 10 }, { id: 'exhaust', name: 'شفاط', powerW: 1500, quantity: 2, hours: 12 }] },
  { id: 'hotel', label: 'فندق', appliances: [{ id: 'rooms', name: 'غرف (تكييف وإضاءة)', powerW: 2000, quantity: 50, hours: 14 }, { id: 'elevator', name: 'مصعد', powerW: 15000, quantity: 2, hours: 24 }] },
  { id: 'bank', label: 'بنك', appliances: [{ id: 'atm', name: 'صراف آلي', powerW: 500, quantity: 3, hours: 24 }, { id: 'server', name: 'سيرفرات', powerW: 2000, quantity: 1, hours: 24 }, { id: 'ac', name: 'مكيف مركزي', powerW: 20000, quantity: 1, hours: 10 }] },
  { id: 'supermarket', label: 'سوبر ماركت', appliances: [{ id: 'display_fridge', name: 'ثلاجة عرض كبيرة', powerW: 1500, quantity: 10, hours: 24 }, { id: 'freezer', name: 'فريزر', powerW: 1200, quantity: 5, hours: 24 }, { id: 'ac', name: 'مكيف مركزي', powerW: 15000, quantity: 1, hours: 16 }] },
  { id: 'gas_station', label: 'طرمبة وقود', appliances: [{ id: 'dispenser', name: 'طلمبة وقود', powerW: 750, quantity: 6, hours: 24 }, { id: 'lights', name: 'كشافات خارجية', powerW: 200, quantity: 20, hours: 12 }] },
  { id: 'mining_company', label: 'شركة تعدين', appliances: [{ id: 'mill', name: 'طاحونة', powerW: 30000, quantity: 2, hours: 20 }, { id: 'pump', name: 'مضخة غسيل', powerW: 15000, quantity: 2, hours: 16 }] }
];

export const calculateTotalConsumption = (appliances) => {
  if (!appliances || appliances.length === 0) return 0;
  return appliances.reduce((total, app) => {
    return total + (app.powerW * app.quantity * app.hours);
  }, 0); // returns Wh
};

export const calculateRecommendedSystemSize = (dailyWh) => {
  // Assume 4.5 peak sun hours average and 80% system efficiency
  // System Size (kW) = (Daily Consumption in kWh) / (Peak Sun Hours * Efficiency)
  const dailyKWh = dailyWh / 1000;
  const peakSunHours = 4.5;
  const efficiency = 0.8;
  const systemSizeKw = dailyKWh / (peakSunHours * efficiency);
  return systemSizeKw;
};
