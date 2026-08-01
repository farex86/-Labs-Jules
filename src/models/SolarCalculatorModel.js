export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    label: 'مصنع تلج',
    devices: [
      { id: 'ice_maker', name: 'آلة صنع الثلج', powerW: 5000 },
      { id: 'freezer', name: 'فريزر', powerW: 1000 },
      { id: 'ac', name: 'مكيف', powerW: 1500 },
      { id: 'lighting', name: 'إضاءة', powerW: 100 }
    ]
  },
  {
    id: 'company',
    label: 'شركة',
    devices: [
      { id: 'computer', name: 'حاسوب', powerW: 200 },
      { id: 'ac', name: 'مكيف', powerW: 1500 },
      { id: 'lighting', name: 'إضاءة', powerW: 50 },
      { id: 'printer', name: 'طابعة', powerW: 500 },
      { id: 'small_fridge', name: 'ثلاجة صغيرة', powerW: 150 }
    ]
  },
  {
    id: 'farm',
    label: 'مزرعة',
    devices: [
      { id: 'water_pump', name: 'مضخة ماء', powerW: 2000 },
      { id: 'outdoor_lighting', name: 'إضاءة خارجية', powerW: 100 },
      { id: 'farming_equipment', name: 'معدات زراعية', powerW: 1500 }
    ]
  },
  {
    id: 'poultry_farm',
    label: 'مزرعة دواجن',
    devices: [
      { id: 'vent_fan', name: 'مروحة تهوية', powerW: 500 },
      { id: 'heater', name: 'دفاية', powerW: 2000 },
      { id: 'lighting', name: 'إضاءة', powerW: 100 },
      { id: 'water_pump', name: 'مضخة ماء', powerW: 1500 }
    ]
  },
  {
    id: 'greenhouse',
    label: 'بيوت محمية',
    devices: [
      { id: 'fan', name: 'مروحة', powerW: 300 },
      { id: 'water_pump', name: 'مضخة ماء', powerW: 1500 },
      { id: 'lighting', name: 'إضاءة', powerW: 100 },
      { id: 'cooling_system', name: 'نظام تبريد', powerW: 2000 }
    ]
  },
  {
    id: 'factory',
    label: 'مصنع',
    devices: [
      { id: 'industrial_machine', name: 'آلة صناعية', powerW: 5000 },
      { id: 'lighting', name: 'إضاءة', powerW: 200 },
      { id: 'ac', name: 'مكيف', powerW: 2000 },
      { id: 'computer', name: 'حاسوب', powerW: 200 }
    ]
  },
  {
    id: 'clinic',
    label: 'مستوصف',
    devices: [
      { id: 'medical_device', name: 'جهاز طبي', powerW: 1000 },
      { id: 'ac', name: 'مكيف', powerW: 1500 },
      { id: 'medical_fridge', name: 'ثلاجة أدوية', powerW: 300 },
      { id: 'lighting', name: 'إضاءة', powerW: 50 },
      { id: 'computer', name: 'حاسوب', powerW: 200 }
    ]
  },
  {
    id: 'hospital',
    label: 'مستشفي',
    devices: [
      { id: 'major_medical', name: 'أجهزة طبية كبرى', powerW: 5000 },
      { id: 'central_ac', name: 'تكييف مركزي', powerW: 10000 },
      { id: 'lighting', name: 'إضاءة', powerW: 1000 },
      { id: 'computer', name: 'حاسوب', powerW: 200 },
      { id: 'elevator', name: 'مصعد', powerW: 8000 }
    ]
  },
  {
    id: 'bakery',
    label: 'مخبز',
    devices: [
      { id: 'mixer', name: 'عجانة', powerW: 1500 },
      { id: 'electric_oven', name: 'فرن كهربائي', powerW: 5000 },
      { id: 'fridge', name: 'ثلاجة', powerW: 500 },
      { id: 'lighting', name: 'إضاءة', powerW: 50 }
    ]
  },
  {
    id: 'shop',
    label: 'دكان',
    devices: [
      { id: 'fridge', name: 'ثلاجة', powerW: 500 },
      { id: 'freezer', name: 'فريزر', powerW: 800 },
      { id: 'lighting', name: 'إضاءة', powerW: 50 },
      { id: 'fan', name: 'مروحة', powerW: 70 }
    ]
  },
  {
    id: 'workshop',
    label: 'ورشة',
    devices: [
      { id: 'welding_machine', name: 'آلة لحام', powerW: 3000 },
      { id: 'drill', name: 'مثقاب', powerW: 500 },
      { id: 'electric_saw', name: 'منشار كهربائي', powerW: 1000 },
      { id: 'lighting', name: 'إضاءة', powerW: 100 }
    ]
  },
  {
    id: 'water_pump',
    label: 'مضخة موية',
    devices: [
      { id: 'submersible_pump', name: 'مضخة غطاس', powerW: 2000 }
    ]
  },
  {
    id: 'donkey_pump',
    label: 'دونكي',
    devices: [
      { id: 'donkey_pump', name: 'مضخة دونكي', powerW: 1500 }
    ]
  },
  {
    id: 'mosque',
    label: 'مسجد',
    devices: [
      { id: 'ac', name: 'مكيف', powerW: 1500 },
      { id: 'fan', name: 'مروحة', powerW: 70 },
      { id: 'lighting', name: 'إضاءة', powerW: 50 },
      { id: 'speaker', name: 'مكبر صوت', powerW: 100 },
      { id: 'water_cooler', name: 'ثلاجة ماء', powerW: 200 }
    ]
  },
  {
    id: 'printing_press',
    label: 'مطبعة',
    devices: [
      { id: 'printing_machine', name: 'آلة طباعة', powerW: 3000 },
      { id: 'computer', name: 'حاسوب', powerW: 200 },
      { id: 'ac', name: 'مكيف', powerW: 1500 },
      { id: 'lighting', name: 'إضاءة', powerW: 100 }
    ]
  },
  {
    id: 'coffee_shop',
    label: 'كوفي شوب',
    devices: [
      { id: 'espresso_machine', name: 'آلة إسبريسو', powerW: 3000 },
      { id: 'display_fridge', name: 'ثلاجة عرض', powerW: 800 },
      { id: 'blender', name: 'خلاط', powerW: 500 },
      { id: 'ac', name: 'مكيف', powerW: 1500 },
      { id: 'lighting', name: 'إضاءة', powerW: 50 }
    ]
  },
  {
    id: 'restaurant',
    label: 'مطعم',
    devices: [
      { id: 'fridge', name: 'ثلاجة', powerW: 1000 },
      { id: 'freezer', name: 'فريزر', powerW: 1500 },
      { id: 'oven', name: 'فرن', powerW: 3000 },
      { id: 'ac', name: 'مكيف', powerW: 1500 },
      { id: 'lighting', name: 'إضاءة', powerW: 100 }
    ]
  },
  {
    id: 'hotel',
    label: 'فندق',
    devices: [
      { id: 'ac', name: 'مكيف', powerW: 1500 },
      { id: 'mini_fridge', name: 'ثلاجة صغيرة', powerW: 150 },
      { id: 'lighting', name: 'إضاءة', powerW: 50 },
      { id: 'tv', name: 'تلفزيون', powerW: 100 },
      { id: 'elevator', name: 'مصعد', powerW: 8000 }
    ]
  },
  {
    id: 'bank',
    label: 'بنك',
    devices: [
      { id: 'computer', name: 'حاسوب', powerW: 200 },
      { id: 'ac', name: 'مكيف', powerW: 1500 },
      { id: 'atm', name: 'صراف آلي', powerW: 500 },
      { id: 'lighting', name: 'إضاءة', powerW: 50 }
    ]
  },
  {
    id: 'supermarket',
    label: 'سوبر ماركت',
    devices: [
      { id: 'display_fridge', name: 'ثلاجة عرض', powerW: 1500 },
      { id: 'freezer', name: 'فريزر', powerW: 2000 },
      { id: 'ac', name: 'مكيف', powerW: 2000 },
      { id: 'lighting', name: 'إضاءة', powerW: 100 },
      { id: 'pos', name: 'نقطة بيع', powerW: 50 }
    ]
  },
  {
    id: 'fuel_station',
    label: 'طرمبة وقود',
    devices: [
      { id: 'fuel_pump', name: 'مضخة وقود', powerW: 1500 },
      { id: 'outdoor_lighting', name: 'إضاءة خارجية', powerW: 200 },
      { id: 'fridge', name: 'ثلاجة', powerW: 500 },
      { id: 'ac', name: 'مكيف', powerW: 1500 }
    ]
  },
  {
    id: 'mining_company',
    label: 'شركة تعدين',
    devices: [
      { id: 'drilling_machine', name: 'آلة حفر', powerW: 5000 },
      { id: 'pump', name: 'مضخة', powerW: 2000 },
      { id: 'lighting', name: 'إضاءة', powerW: 200 },
      { id: 'ac', name: 'مكيف', powerW: 2000 }
    ]
  }
];

export class SolarCalculatorModel {
  static getFacilities() {
    return FACILITY_TYPES;
  }

  static getDevicesForFacility(facilityId) {
    const facility = FACILITY_TYPES.find(f => f.id === facilityId);
    return facility ? facility.devices : [];
  }

  static calculateSystemSize(consumptionKWh) {
    if (!consumptionKWh || isNaN(consumptionKWh)) return null;

    // Average daily sun hours in region (e.g., 6 hours)
    const sunHours = 6;

    // System efficiency (e.g., 80%)
    const efficiency = 0.8;

    // Calculate required system size in kW
    // Daily consumption = monthly / 30
    const dailyConsumption = consumptionKWh / 30;

    const systemSizeKW = dailyConsumption / (sunHours * efficiency);

    return {
      systemSizeKW: systemSizeKW.toFixed(2),
      estimatedPanels: Math.ceil((systemSizeKW * 1000) / 400), // assuming 400W panels
      estimatedInverter: Math.ceil(systemSizeKW * 1.2), // 20% overhead
    };
  }
}
