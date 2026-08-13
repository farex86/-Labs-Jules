export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع تلج', defaultAppliances: [{ id: 1, name: 'ماكينة ثلج', power: 5000, count: 2, hours: 24 }] },
  { id: 'company', name: 'شركة', defaultAppliances: [{ id: 1, name: 'مكيف', power: 1500, count: 5, hours: 8 }, { id: 2, name: 'كمبيوتر', power: 250, count: 10, hours: 8 }, { id: 3, name: 'إضاءة', power: 20, count: 20, hours: 10 }] },
  { id: 'farm', name: 'مزرعة', defaultAppliances: [{ id: 1, name: 'مضخة مياه', power: 3000, count: 1, hours: 6 }, { id: 2, name: 'إضاءة', power: 50, count: 5, hours: 12 }] },
  { id: 'poultry_farm', name: 'مزرعة دواجن', defaultAppliances: [{ id: 1, name: 'مراوح تهوية', power: 500, count: 10, hours: 24 }, { id: 2, name: 'إضاءة', power: 20, count: 20, hours: 12 }, { id: 3, name: 'سخانات', power: 2000, count: 2, hours: 12 }] },
  { id: 'greenhouse', name: 'بيوت محمية', defaultAppliances: [{ id: 1, name: 'مراوح', power: 300, count: 4, hours: 12 }, { id: 2, name: 'مضخة ري', power: 1500, count: 1, hours: 4 }] },
  { id: 'factory', name: 'مصنع', defaultAppliances: [{ id: 1, name: 'آلات تصنيع', power: 10000, count: 2, hours: 16 }, { id: 2, name: 'إضاءة', power: 100, count: 20, hours: 16 }] },
  { id: 'clinic', name: 'مستوصف', defaultAppliances: [{ id: 1, name: 'مكيف', power: 1500, count: 4, hours: 12 }, { id: 2, name: 'ثلاجة أدوية', power: 300, count: 2, hours: 24 }, { id: 3, name: 'أجهزة طبية', power: 1000, count: 2, hours: 8 }] },
  { id: 'hospital', name: 'مستشفي', defaultAppliances: [{ id: 1, name: 'تكييف مركزي', power: 20000, count: 1, hours: 24 }, { id: 2, name: 'أجهزة طبية', power: 5000, count: 10, hours: 24 }, { id: 3, name: 'إضاءة', power: 50, count: 100, hours: 24 }, { id: 4, name: 'ثلاجات', power: 500, count: 5, hours: 24 }] },
  { id: 'bakery', name: 'مخبز', defaultAppliances: [{ id: 1, name: 'عجانة', power: 3000, count: 2, hours: 8 }, { id: 2, name: 'فرن', power: 10000, count: 1, hours: 12 }] },
  { id: 'shop', name: 'دكان', defaultAppliances: [{ id: 1, name: 'ثلاجة', power: 400, count: 2, hours: 24 }, { id: 2, name: 'مروحة', power: 100, count: 2, hours: 12 }, { id: 3, name: 'إضاءة', power: 20, count: 4, hours: 12 }] },
  { id: 'workshop', name: 'ورشة', defaultAppliances: [{ id: 1, name: 'معدات لحام', power: 5000, count: 1, hours: 4 }, { id: 2, name: 'معدات قطع', power: 2000, count: 2, hours: 6 }] },
  { id: 'water_pump', name: 'مضخة موية', defaultAppliances: [{ id: 1, name: 'مضخة غاطسة', power: 5500, count: 1, hours: 8 }] },
  { id: 'donkey', name: 'دونكي', defaultAppliances: [{ id: 1, name: 'مضخة', power: 4000, count: 1, hours: 10 }] },
  { id: 'mosque', name: 'مسجد', defaultAppliances: [{ id: 1, name: 'مكيف', power: 2000, count: 4, hours: 6 }, { id: 2, name: 'مراوح', power: 100, count: 10, hours: 6 }, { id: 3, name: 'مكبر صوت', power: 200, count: 1, hours: 4 }] },
  { id: 'printing_press', name: 'مطبعة', defaultAppliances: [{ id: 1, name: 'ماكينة طباعة', power: 6000, count: 2, hours: 10 }, { id: 2, name: 'كمبيوتر', power: 300, count: 4, hours: 10 }] },
  { id: 'coffee_shop', name: 'كوفي شوب', defaultAppliances: [{ id: 1, name: 'ماكينة قهوة', power: 3000, count: 1, hours: 16 }, { id: 2, name: 'ثلاجة عرض', power: 500, count: 2, hours: 24 }, { id: 3, name: 'مكيف', power: 1500, count: 2, hours: 16 }] },
  { id: 'restaurant', name: 'مطعم', defaultAppliances: [{ id: 1, name: 'ثلاجة/فريزر', power: 1000, count: 3, hours: 24 }, { id: 2, name: 'مكيف', power: 2000, count: 4, hours: 16 }, { id: 3, name: 'إضاءة', power: 50, count: 20, hours: 16 }] },
  { id: 'hotel', name: 'فندق', defaultAppliances: [{ id: 1, name: 'مكيفات غرف', power: 1500, count: 20, hours: 12 }, { id: 2, name: 'إضاءة', power: 20, count: 100, hours: 12 }, { id: 3, name: 'مصعد', power: 10000, count: 1, hours: 4 }] },
  { id: 'bank', name: 'بنك', defaultAppliances: [{ id: 1, name: 'تكييف', power: 1500, count: 10, hours: 10 }, { id: 2, name: 'كمبيوترات', power: 250, count: 20, hours: 10 }, { id: 3, name: 'صراف آلي', power: 500, count: 2, hours: 24 }] },
  { id: 'supermarket', name: 'سوبر ماركت', defaultAppliances: [{ id: 1, name: 'ثلاجات عرض', power: 800, count: 10, hours: 24 }, { id: 2, name: 'فريزر', power: 1000, count: 5, hours: 24 }, { id: 3, name: 'تكييف', power: 2000, count: 4, hours: 16 }] },
  { id: 'gas_station', name: 'طرمبة وقود', defaultAppliances: [{ id: 1, name: 'مضخة وقود', power: 1500, count: 4, hours: 24 }, { id: 2, name: 'إضاءة خارجية', power: 200, count: 10, hours: 12 }] },
  { id: 'mining_company', name: 'شركة تعدين', defaultAppliances: [{ id: 1, name: 'معدات حفر', power: 15000, count: 2, hours: 16 }, { id: 2, name: 'كسارة', power: 20000, count: 1, hours: 16 }] },
];

export class SolarCalculatorModel {
  static calculateSystem(appliances) {
    if (!appliances || appliances.length === 0) {
      return {
        dailyEnergyWh: 0,
        requiredSolarCapacityW: 0,
        numberOfPanels: 0,
        inverterSizeW: 0,
        batteryCapacityAh: 0,
        totalInstantaneousPower: 0,
      };
    }

    let totalInstantaneousPower = 0;
    let dailyEnergyWh = 0;

    appliances.forEach((appliance) => {
      const power = parseFloat(appliance.power) || 0;
      const count = parseInt(appliance.count, 10) || 0;
      const hours = parseFloat(appliance.hours) || 0;

      totalInstantaneousPower += power * count;
      dailyEnergyWh += power * count * hours;
    });

    const PEAK_SUN_HOURS = 5;
    const SYSTEM_LOSS_FACTOR = 1.3;
    const requiredSolarCapacityW = (dailyEnergyWh / PEAK_SUN_HOURS) * SYSTEM_LOSS_FACTOR;

    const PANEL_RATING_W = 550;
    const numberOfPanels = Math.ceil(requiredSolarCapacityW / PANEL_RATING_W);

    const SURGE_FACTOR = 1.25;
    const inverterSizeW = totalInstantaneousPower * SURGE_FACTOR;

    const DAYS_OF_AUTONOMY = 1;
    const BATTERY_VOLTAGE = 48;
    const DOD = 0.8;
    const batteryCapacityAh = (dailyEnergyWh * DAYS_OF_AUTONOMY) / (BATTERY_VOLTAGE * DOD);

    return {
      dailyEnergyWh,
      requiredSolarCapacityW,
      numberOfPanels,
      inverterSizeW,
      batteryCapacityAh,
      totalInstantaneousPower,
    };
  }
}
