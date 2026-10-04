export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع تلج', defaultAppliances: [{ name: 'ماكينة ثلج', power: 5000, qty: 1, hours: 12 }, { name: 'ثلاجة تجميد', power: 2000, qty: 2, hours: 24 }] },
  { id: 'company', name: 'شركة', defaultAppliances: [{ name: 'مكيف', power: 1500, qty: 3, hours: 8 }, { name: 'كمبيوتر', power: 300, qty: 10, hours: 8 }, { name: 'إضاءة', power: 50, qty: 20, hours: 10 }] },
  { id: 'farm', name: 'مزرعة', defaultAppliances: [{ name: 'مضخة مياه', power: 2000, qty: 1, hours: 6 }, { name: 'إضاءة', power: 100, qty: 5, hours: 12 }] },
  { id: 'poultry_farm', name: 'مزرعة دواجن', defaultAppliances: [{ name: 'مراوح تهوية', power: 500, qty: 4, hours: 24 }, { name: 'إضاءة', power: 50, qty: 20, hours: 16 }, { name: 'سخانات', power: 1000, qty: 2, hours: 12 }] },
  { id: 'greenhouses', name: 'بيوت محمية', defaultAppliances: [{ name: 'مضخة ري', power: 1000, qty: 1, hours: 4 }, { name: 'مراوح تبريد', power: 500, qty: 4, hours: 12 }] },
  { id: 'factory', name: 'مصنع', defaultAppliances: [{ name: 'ماكينة إنتاج', power: 10000, qty: 2, hours: 8 }, { name: 'إضاءة', power: 100, qty: 30, hours: 12 }] },
  { id: 'clinic', name: 'مستوصف', defaultAppliances: [{ name: 'مكيف', power: 1500, qty: 4, hours: 12 }, { name: 'ثلاجة أدوية', power: 300, qty: 2, hours: 24 }, { name: 'أجهزة طبية صغيرة', power: 500, qty: 3, hours: 8 }] },
  { id: 'hospital', name: 'مستشفي', defaultAppliances: [{ name: 'مكيف مركزي', power: 10000, qty: 2, hours: 24 }, { name: 'أجهزة طبية', power: 2000, qty: 10, hours: 12 }, { name: 'إضاءة', power: 50, qty: 100, hours: 24 }] },
  { id: 'bakery', name: 'مخبز', defaultAppliances: [{ name: 'فرن كهربائي', power: 5000, qty: 2, hours: 10 }, { name: 'عجانة', power: 1500, qty: 2, hours: 6 }, { name: 'إضاءة', power: 50, qty: 10, hours: 12 }] },
  { id: 'shop', name: 'دكان', defaultAppliances: [{ name: 'ثلاجة عرض', power: 800, qty: 2, hours: 24 }, { name: 'مروحة', power: 100, qty: 2, hours: 12 }, { name: 'إضاءة', power: 50, qty: 4, hours: 12 }] },
  { id: 'workshop', name: 'ورشة', defaultAppliances: [{ name: 'ماكينة لحام', power: 3000, qty: 1, hours: 4 }, { name: 'صاروخ قطع', power: 1000, qty: 2, hours: 4 }, { name: 'إضاءة', power: 100, qty: 5, hours: 8 }] },
  { id: 'water_pump', name: 'مضخة موية', defaultAppliances: [{ name: 'مضخة غاطسة', power: 3000, qty: 1, hours: 8 }] },
  { id: 'donkey', name: 'دونكي', defaultAppliances: [{ name: 'مضخة مياه كبيرة', power: 5000, qty: 1, hours: 10 }] },
  { id: 'mosque', name: 'مسجد', defaultAppliances: [{ name: 'مكيف', power: 1500, qty: 6, hours: 4 }, { name: 'مروحة', power: 100, qty: 10, hours: 6 }, { name: 'إضاءة', power: 50, qty: 20, hours: 6 }, { name: 'مكبر صوت', power: 200, qty: 1, hours: 2 }] },
  { id: 'printing_press', name: 'مطبعة', defaultAppliances: [{ name: 'ماكينة طباعة', power: 4000, qty: 2, hours: 8 }, { name: 'كمبيوتر', power: 300, qty: 3, hours: 8 }, { name: 'مكيف', power: 1500, qty: 2, hours: 10 }] },
  { id: 'coffee_shop', name: 'كوفي شوب', defaultAppliances: [{ name: 'ماكينة قهوة', power: 2500, qty: 1, hours: 12 }, { name: 'ثلاجة', power: 500, qty: 2, hours: 24 }, { name: 'مكيف', power: 1500, qty: 2, hours: 12 }, { name: 'إضاءة', power: 50, qty: 15, hours: 12 }] },
  { id: 'restaurant', name: 'مطعم', defaultAppliances: [{ name: 'ثلاجة كبيرة', power: 1000, qty: 3, hours: 24 }, { name: 'شفاط هواء', power: 500, qty: 2, hours: 12 }, { name: 'مكيف', power: 1500, qty: 4, hours: 12 }] },
  { id: 'hotel', name: 'فندق', defaultAppliances: [{ name: 'مكيف', power: 1500, qty: 20, hours: 12 }, { name: 'تلفزيون', power: 150, qty: 20, hours: 6 }, { name: 'ثلاجة صغيرة', power: 100, qty: 20, hours: 24 }, { name: 'سخان مياه', power: 1500, qty: 20, hours: 4 }] },
  { id: 'bank', name: 'بنك', defaultAppliances: [{ name: 'مكيف', power: 1500, qty: 10, hours: 10 }, { name: 'كمبيوتر', power: 300, qty: 20, hours: 8 }, { name: 'ماكينة صراف آلي', power: 500, qty: 2, hours: 24 }, { name: 'إضاءة', power: 50, qty: 50, hours: 10 }] },
  { id: 'supermarket', name: 'سوبر ماركت', defaultAppliances: [{ name: 'ثلاجة عرض كبيرة', power: 1500, qty: 5, hours: 24 }, { name: 'ثلاجة تجميد', power: 2000, qty: 3, hours: 24 }, { name: 'مكيف مركزي', power: 5000, qty: 2, hours: 14 }] },
  { id: 'fuel_station', name: 'طرمبة وقود', defaultAppliances: [{ name: 'مضخة وقود', power: 1000, qty: 4, hours: 24 }, { name: 'إضاءة خارجية', power: 200, qty: 10, hours: 12 }, { name: 'مكيف مكتب', power: 1500, qty: 1, hours: 24 }] },
  { id: 'mining_company', name: 'شركة تعدين', defaultAppliances: [{ name: 'ماكينة طحن', power: 15000, qty: 1, hours: 12 }, { name: 'حفار كهربائي', power: 10000, qty: 2, hours: 8 }, { name: 'مضخة مياه', power: 5000, qty: 2, hours: 12 }] }
];

export const calculateTotalConsumption = (appliances) => {
  let dailyEnergyWh = 0;
  let peakPowerW = 0;

  appliances.forEach((app) => {
    const power = Number(app.power) || 0;
    const qty = Number(app.qty) || 0;
    const hours = Number(app.hours) || 0;

    const appliancePeak = power * qty;
    peakPowerW += appliancePeak;
    dailyEnergyWh += appliancePeak * hours;
  });

  return {
    dailyEnergyWh,
    dailyEnergyKWh: dailyEnergyWh / 1000,
    peakPowerW,
    peakPowerKW: peakPowerW / 1000,
  };
};

export const recommendSolarSystem = (dailyEnergyWh, peakPowerW) => {
  // Simple heuristic for sizing a solar system
  // Assuming 5 hours of peak sun per day
  const PEAK_SUN_HOURS = 5;
  // System losses (inverter efficiency, wiring, dust, etc.)
  const SYSTEM_EFFICIENCY = 0.75;

  // Required PV Array size in Watts
  const requiredPVArrayW = dailyEnergyWh / (PEAK_SUN_HOURS * SYSTEM_EFFICIENCY);

  // Inverter size should be at least 1.2x peak power or enough for PV
  const recommendedInverterW = Math.max(peakPowerW * 1.2, requiredPVArrayW);

  // Battery sizing (for 1 day of autonomy), 50% Depth of Discharge for Lead-acid or typical Lithium buffer
  // We'll calculate battery capacity in Wh
  const requiredBatteryCapacityWh = dailyEnergyWh * 1.5; // 1.5x for some buffer
  // If using 48V system
  const requiredBatteryAh_48V = requiredBatteryCapacityWh / 48;

  return {
    pvArrayKW: (requiredPVArrayW / 1000).toFixed(1),
    inverterKW: (recommendedInverterW / 1000).toFixed(1),
    batteryKWh: (requiredBatteryCapacityWh / 1000).toFixed(1),
    batteryAh48V: Math.round(requiredBatteryAh_48V),
  };
};
