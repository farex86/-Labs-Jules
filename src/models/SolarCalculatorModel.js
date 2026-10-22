export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج',
    defaultConsumptionKWh: 500,
    appliances: ['ماكينات صنع الثلج', 'غرف التبريد', 'إضاءة', 'مضخات مياه']
  },
  {
    id: 'company',
    name: 'شركة',
    defaultConsumptionKWh: 100,
    appliances: ['أجهزة كمبيوتر', 'مكيفات', 'إضاءة', 'طابعات']
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultConsumptionKWh: 150,
    appliances: ['مضخة مياه', 'إضاءة', 'أجهزة زراعية بسيطة']
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultConsumptionKWh: 200,
    appliances: ['دفايات', 'مراوح تهوية', 'إضاءة', 'سقايات آلية']
  },
  {
    id: 'greenhouses',
    name: 'بيوت محمية',
    defaultConsumptionKWh: 120,
    appliances: ['وسائد تبريد', 'مراوح سحب', 'مضخات مياه', 'إضاءة']
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultConsumptionKWh: 1000,
    appliances: ['آلات ثقيلة', 'إضاءة صناعية', 'مكيفات مركزية', 'سيور ناقلة']
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultConsumptionKWh: 80,
    appliances: ['أجهزة طبية أساسية', 'مكيفات', 'إضاءة', 'ثلاجات أدوية']
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    defaultConsumptionKWh: 800,
    appliances: ['أجهزة طبية معقدة', 'تكييف مركزي', 'مصاعد', 'إضاءة طوارئ']
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultConsumptionKWh: 300,
    appliances: ['أفران كهربائية', 'عجانات', 'إضاءة', 'مراوح']
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultConsumptionKWh: 30,
    appliances: ['ثلاجة عرض', 'إضاءة', 'مروحة', 'تلفزيون']
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultConsumptionKWh: 150,
    appliances: ['معدات لحام', 'آلات قطع', 'إضاءة قوية', 'ضواغط هواء']
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    defaultConsumptionKWh: 200,
    appliances: ['مضخة غاطسة', 'لوحة تحكم']
  },
  {
    id: 'donkey',
    name: 'دونكي',
    defaultConsumptionKWh: 150,
    appliances: ['مضخات استخراج المياه', 'لوحات تحكم', 'إنارة بسيطة']
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultConsumptionKWh: 100,
    appliances: ['مكيفات', 'إضاءة', 'نظام صوتي', 'مبردات مياه']
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultConsumptionKWh: 250,
    appliances: ['طابعات صناعية', 'أجهزة كمبيوتر', 'إضاءة', 'آلات قص وتغليف']
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultConsumptionKWh: 120,
    appliances: ['ماكينة إسبريسو', 'ثلاجات', 'مكيفات', 'خلاطات', 'إضاءة']
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultConsumptionKWh: 200,
    appliances: ['ثلاجات وفريزرات', 'مكيفات', 'شفاطات هواء', 'معدات مطبخ', 'إضاءة']
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultConsumptionKWh: 600,
    appliances: ['مكيفات', 'سخانات مياه', 'مصاعد', 'إضاءة', 'معدات مطبخ']
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultConsumptionKWh: 200,
    appliances: ['أجهزة كمبيوتر', 'خوادم', 'مكيفات', 'إضاءة', 'ماكينات صراف آلي']
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultConsumptionKWh: 400,
    appliances: ['ثلاجات عرض', 'فريزرات', 'مكيفات', 'إضاءة', 'أجهزة كاشير']
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultConsumptionKWh: 150,
    appliances: ['مضخات وقود', 'إضاءة خارجية', 'ثلاجات صغيرة', 'مكيفات للإدارة']
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultConsumptionKWh: 2000,
    appliances: ['آلات حفر وطحن', 'سيور ناقلة', 'معدات معالجة', 'إضاءة صناعية قوية']
  }
];

/**
 * Calculates solar requirements based on daily consumption.
 * @param {number} consumptionKWh - The estimated daily power consumption in kWh.
 * @param {number} locationSunHours - Estimated daily peak sun hours (default 5.5).
 * @param {number} panelWattage - The wattage of one solar panel in Watts (default 500W).
 * @returns {Object} Object containing capacity, number of panels, battery and cost estimation.
 */
export const calculateSolarRequirements = (
  consumptionKWh,
  locationSunHours = 5.5,
  panelWattage = 500
) => {
  // Ensure consumption is a valid number
  if (!consumptionKWh || consumptionKWh <= 0) {
    return {
      requiredCapacityKW: 0,
      numberOfPanels: 0,
      batteryCapacityKWh: 0,
      estimatedCost: 0
    };
  }

  // System Efficiency (Inverter losses, wiring, temperature, etc.)
  const systemEfficiency = 0.8;

  // Required system capacity in kW to produce the required kWh per day
  const requiredCapacityKW = consumptionKWh / (locationSunHours * systemEfficiency);

  // Convert to Watts to calculate number of panels
  const requiredCapacityW = requiredCapacityKW * 1000;
  const numberOfPanels = Math.ceil(requiredCapacityW / panelWattage);

  // Battery capacity for 1 day of autonomy at 50% Depth of Discharge
  const batteryCapacityKWh = consumptionKWh / 0.5;

  // Rough estimation: Cost per kW installed (e.g., $1000/kW)
  const estimatedCost = requiredCapacityKW * 1000;

  return {
    requiredCapacityKW: Number(requiredCapacityKW.toFixed(2)),
    numberOfPanels,
    batteryCapacityKWh: Number(batteryCapacityKWh.toFixed(2)),
    estimatedCost: Number(estimatedCost.toFixed(2))
  };
};
