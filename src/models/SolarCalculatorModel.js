export const FACILITY_TYPES = [
  { id: 'ice_factory', nameAr: 'مصنع ثلج', baseConsumption: 50000, descriptionAr: 'استهلاك عالي للتبريد المستمر' },
  { id: 'company', nameAr: 'شركة', baseConsumption: 15000, descriptionAr: 'أجهزة كمبيوتر وتكييف وإضاءة' },
  { id: 'farm', nameAr: 'مزرعة', baseConsumption: 25000, descriptionAr: 'مضخات وإنارة عامة' },
  { id: 'poultry_farm', nameAr: 'مزرعة دواجن', baseConsumption: 35000, descriptionAr: 'تهوية وتدفئة مستمرة' },
  { id: 'greenhouse', nameAr: 'بيوت محمية', baseConsumption: 20000, descriptionAr: 'تحكم في الحرارة والرطوبة' },
  { id: 'factory', nameAr: 'مصنع', baseConsumption: 100000, descriptionAr: 'آلات صناعية ثقيلة' },
  { id: 'clinic', nameAr: 'مستوصف', baseConsumption: 12000, descriptionAr: 'أجهزة طبية وتكييف' },
  { id: 'hospital', nameAr: 'مستشفى', baseConsumption: 80000, descriptionAr: 'أجهزة طبية معقدة وتكييف 24/7' },
  { id: 'bakery', nameAr: 'مخبز', baseConsumption: 40000, descriptionAr: 'أفران كهربائية وتبريد' },
  { id: 'shop', nameAr: 'دكان', baseConsumption: 5000, descriptionAr: 'إضاءة وثلاجات صغيرة' },
  { id: 'workshop', nameAr: 'ورشة', baseConsumption: 15000, descriptionAr: 'معدات يدوية وآلية' },
  { id: 'water_pump', nameAr: 'مضخة مياه', baseConsumption: 10000, descriptionAr: 'مضخات كهربائية' },
  { id: 'donkey', nameAr: 'دونكي', baseConsumption: 8000, descriptionAr: 'محطة مياه' },
  { id: 'mosque', nameAr: 'مسجد', baseConsumption: 15000, descriptionAr: 'تكييف وإضاءة وصوتيات' },
  { id: 'printing_press', nameAr: 'مطبعة', baseConsumption: 30000, descriptionAr: 'آلات طباعة وتغليف' },
  { id: 'coffee_shop', nameAr: 'كوفي شوب', baseConsumption: 12000, descriptionAr: 'آلات قهوة وتكييف وإضاءة' },
  { id: 'restaurant', nameAr: 'مطعم', baseConsumption: 35000, descriptionAr: 'معدات طبخ وتبريد وتكييف' },
  { id: 'hotel', nameAr: 'فندق', baseConsumption: 60000, descriptionAr: 'غرف متعددة وخدمات عامة' },
  { id: 'bank', nameAr: 'بنك', baseConsumption: 25000, descriptionAr: 'أجهزة كمبيوتر وتكييف وأمن' },
  { id: 'supermarket', nameAr: 'سوبر ماركت', baseConsumption: 45000, descriptionAr: 'ثلاجات عرض وتكييف' },
  { id: 'gas_station', nameAr: 'طرمبة وقود', baseConsumption: 20000, descriptionAr: 'مضخات وإضاءة 24/7' },
  { id: 'mining_company', nameAr: 'شركة تعدين', baseConsumption: 150000, descriptionAr: 'معدات حفر ومعالجة ثقيلة' },
];

export const calculateSolarRequirements = (facilityId, customConsumption = null) => {
  const facility = FACILITY_TYPES.find(f => f.id === facilityId);
  if (!facility) throw new Error('Facility type not found');

  const monthlyConsumption = customConsumption !== null && customConsumption > 0
    ? Number(customConsumption)
    : facility.baseConsumption;

  // Basic solar math rules of thumb (these can be refined based on specific geographical data)
  const averageSunHoursPerDay = 5.5; // Typical for sunny regions
  const systemLossFactor = 1.25; // Account for 20% losses (inverter, wiring, dust, etc)
  const daysInMonth = 30;

  const dailyConsumption = monthlyConsumption / daysInMonth; // kWh per day

  // Required solar panel capacity in kW
  const requiredCapacityKW = (dailyConsumption / averageSunHoursPerDay) * systemLossFactor;

  // Estimate number of 550W panels
  const panelWattage = 550;
  const numberOfPanels = Math.ceil((requiredCapacityKW * 1000) / panelWattage);

  // Estimate required battery capacity for 1 day of autonomy (assuming 50% depth of discharge for lead-acid/gel, or 80% for Lithium)
  // Let's assume Lithium for a modern system: 80% DoD
  const requiredBatteryCapacityKWh = dailyConsumption / 0.8;

  // Estimate Inverter size (usually 1.2x the required kW to handle peak loads)
  const inverterSizeKW = Math.ceil(requiredCapacityKW * 1.2);

  // Rough cost estimate (USD) - highly variable, this is just for demonstration
  // Assuming $1000 per kW installed
  const estimatedCostMin = Math.floor(requiredCapacityKW * 800);
  const estimatedCostMax = Math.floor(requiredCapacityKW * 1200);

  return {
    facilityNameAr: facility.nameAr,
    monthlyConsumption,
    dailyConsumption,
    requiredCapacityKW: Number(requiredCapacityKW.toFixed(2)),
    numberOfPanels,
    inverterSizeKW,
    requiredBatteryCapacityKWh: Number(requiredBatteryCapacityKWh.toFixed(2)),
    estimatedCostRange: [estimatedCostMin, estimatedCostMax]
  };
};

export const getFacilityTypes = () => [...FACILITY_TYPES];
