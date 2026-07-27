export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع ثلج', baseConsumptionKWh: 150, description: 'استهلاك عالي، ماكينات تبريد مستمرة' },
  { id: 'company', name: 'شركة', baseConsumptionKWh: 40, description: 'مكيفات، أجهزة كمبيوتر، إضاءة' },
  { id: 'farm', name: 'مزرعة', baseConsumptionKWh: 30, description: 'مضخات، إضاءة، معدات زراعية' },
  { id: 'poultry_farm', name: 'مزرعة دواجن', baseConsumptionKWh: 80, description: 'تدفئة، تهوية، إضاءة مستمرة' },
  { id: 'greenhouses', name: 'بيوت محمية', baseConsumptionKWh: 50, description: 'أنظمة تحكم بالمناخ ومضخات' },
  { id: 'factory', name: 'مصنع', baseConsumptionKWh: 200, description: 'آلات ومعدات صناعية ثقيلة' },
  { id: 'clinic', name: 'مستوصف', baseConsumptionKWh: 60, description: 'أجهزة طبية وتكييف وإضاءة' },
  { id: 'hospital', name: 'مستشفى', baseConsumptionKWh: 300, description: 'أجهزة طبية متقدمة، تكييف مركزي، تشغيل 24 ساعة' },
  { id: 'bakery', name: 'مخبز', baseConsumptionKWh: 100, description: 'أفران كهربائية وعجانات' },
  { id: 'shop', name: 'دكان', baseConsumptionKWh: 15, description: 'إضاءة وثلاجة صغيرة' },
  { id: 'workshop', name: 'ورشة', baseConsumptionKWh: 70, description: 'معدات كهربائية وأدوات لحام' },
  { id: 'water_pump', name: 'مضخة مياه', baseConsumptionKWh: 25, description: 'مضخة غاطسة أو سطحية' },
  { id: 'donkey', name: 'دونكي', baseConsumptionKWh: 10, description: 'استهلاك بسيط جداً' },
  { id: 'mosque', name: 'مسجد', baseConsumptionKWh: 20, description: 'إضاءة وتكييف متقطع' },
  { id: 'printing_press', name: 'مطبعة', baseConsumptionKWh: 120, description: 'آلات طباعة كبيرة ومعدات قص' },
  { id: 'coffee_shop', name: 'كوفي شوب', baseConsumptionKWh: 50, description: 'آلات إسبريسو، ثلاجات، إضاءة' },
  { id: 'restaurant', name: 'مطعم', baseConsumptionKWh: 90, description: 'أجهزة طهي، ثلاجات، تكييف' },
  { id: 'hotel', name: 'فندق', baseConsumptionKWh: 250, description: 'تكييف غرف، مصاعد، مطابخ' },
  { id: 'bank', name: 'بنك', baseConsumptionKWh: 80, description: 'أجهزة صراف آلي، سيرفرات، تكييف' },
  { id: 'supermarket', name: 'سوبر ماركت', baseConsumptionKWh: 110, description: 'ثلاجات عرض مستمرة، إضاءة قوية' },
  { id: 'gas_station', name: 'طرمبة وقود', baseConsumptionKWh: 40, description: 'مضخات وقود وإضاءة ليلية' },
  { id: 'mining_company', name: 'شركة تعدين', baseConsumptionKWh: 400, description: 'معدات حفر، إضاءة، طواحين' },
];

/**
 * Calculates the recommended solar system specifications.
 * @param {number} dailyConsumptionKWh - The daily energy consumption in kWh.
 * @param {number} peakSunHours - The average daily peak sun hours (default 5.5 for Sudan).
 * @returns {object} The recommended system specifications.
 */
export const calculateSolarSystem = (dailyConsumptionKWh, peakSunHours = 5.5) => {
  if (!dailyConsumptionKWh || dailyConsumptionKWh <= 0) {
    return null;
  }

  // System Losses (efficiency factor ~75%)
  const efficiency = 0.75;

  // Required Solar Panel Array Size in kW
  const requiredArraySizeKW = dailyConsumptionKWh / (peakSunHours * efficiency);

  // Assuming 400W (0.4kW) panels for the calculation
  const panelWattageKW = 0.4;
  const numberOfPanels = Math.ceil(requiredArraySizeKW / panelWattageKW);

  // Inverter Size (typically 120-125% of the array size to handle peaks, but roughly equal to required kW for simplicity in off-grid/hybrid)
  // Let's add 20% margin for surges
  const inverterSizeKW = Math.ceil(requiredArraySizeKW * 1.2);

  // Battery Capacity (assuming 1 day of autonomy and 50% Depth of Discharge for Lead-Acid, or 80% for Lithium)
  // Let's calculate based on Lithium (80% DoD, 48V system)
  const systemVoltage = 48; // Volts
  // total watt hours needed = dailyConsumptionKWh * 1000
  // Battery Ah needed = (Wh / Voltage) / DoD
  const dod = 0.8;
  const batteryAhNeeded = ((dailyConsumptionKWh * 1000) / systemVoltage) / dod;

  // Return standard battery size strings based on typical 48V 100Ah/200Ah modules
  const standardBatteryModules = Math.ceil(batteryAhNeeded / 100);
  const batteryCapacity = `${standardBatteryModules}x 48V 100Ah (Lithium)`;

  return {
    systemSizeKW: requiredArraySizeKW.toFixed(1),
    numberOfPanels: numberOfPanels,
    inverterSizeKW: inverterSizeKW,
    batteryCapacity: batteryCapacity,
    dailyProductionExpected: (requiredArraySizeKW * peakSunHours * efficiency).toFixed(1)
  };
};
