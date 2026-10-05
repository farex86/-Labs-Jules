// src/models/SolarCalculatorModel.js

// أنماط الاستهلاك والمنشآت (Facility Types)
export const facilityTypes = [
  { id: 'ice_factory', name: 'مصنع ثلج' },
  { id: 'company', name: 'شركة' },
  { id: 'farm', name: 'مزرعة' },
  { id: 'poultry_farm', name: 'مزرعة دواجن' },
  { id: 'greenhouses', name: 'بيوت محمية' },
  { id: 'factory', name: 'مصنع' },
  { id: 'clinic', name: 'مستوصف' },
  { id: 'hospital', name: 'مستشفى' },
  { id: 'bakery', name: 'مخبز' },
  { id: 'shop', name: 'دكان' },
  { id: 'workshop', name: 'ورشة' },
  { id: 'water_pump', name: 'مضخة مياه' },
  { id: 'donkey', name: 'دونكي (مضخة)' },
  { id: 'mosque', name: 'مسجد' },
  { id: 'printing_press', name: 'مطبعة' },
  { id: 'coffee_shop', name: 'كوفي شوب' },
  { id: 'restaurant', name: 'مطعم' },
  { id: 'hotel', name: 'فندق' },
  { id: 'bank', name: 'بنك' },
  { id: 'supermarket', name: 'سوبر ماركت' },
  { id: 'gas_station', name: 'طرمبة وقود' },
  { id: 'mining_company', name: 'شركة تعدين' }
];

// الأجهزة الشائعة (Common Appliances)
export const commonAppliances = [
  { id: 'led_bulb', name: 'لمبة ليد', defaultWattage: 10, defaultHours: 8 },
  { id: 'fan', name: 'مروحة سقف', defaultWattage: 70, defaultHours: 12 },
  { id: 'tv', name: 'تلفزيون', defaultWattage: 100, defaultHours: 6 },
  { id: 'fridge', name: 'ثلاجة', defaultWattage: 150, defaultHours: 24 },
  { id: 'ac', name: 'مكيف', defaultWattage: 1500, defaultHours: 8 },
  { id: 'washing_machine', name: 'غسالة', defaultWattage: 500, defaultHours: 2 },
  { id: 'water_pump', name: 'مضخة مياه صغيرة', defaultWattage: 750, defaultHours: 2 },
  { id: 'computer', name: 'كمبيوتر', defaultWattage: 250, defaultHours: 8 },
  { id: 'printer', name: 'طابعة', defaultWattage: 50, defaultHours: 2 },
  { id: 'coffee_machine', name: 'ماكينة قهوة', defaultWattage: 1000, defaultHours: 2 },
  { id: 'freezer', name: 'فريزر', defaultWattage: 200, defaultHours: 24 },
  { id: 'heavy_machinery', name: 'معدات ثقيلة', defaultWattage: 5000, defaultHours: 8 }
];

/**
 * Calculates solar system requirements based on appliances list
 * @param {Array} appliances - Array of objects { id, name, wattage, quantity, hoursPerDay }
 * @returns {Object} Requirements { dailyConsumptionWh, inverterSizeW, panelCount, batteryCount }
 */
export const calculateSolarRequirements = (appliances) => {
  if (!appliances || !Array.isArray(appliances) || appliances.length === 0) {
    return {
      dailyConsumptionWh: 0,
      totalPeakLoadW: 0,
      inverterSizeVA: 0,
      panelCount: 0,
      batteryCount: 0
    };
  }

  // 1. Calculate Total Daily Consumption (Wh) and Total Peak Load (W)
  let dailyConsumptionWh = 0;
  let totalPeakLoadW = 0;

  appliances.forEach(app => {
    const qty = parseInt(app.quantity, 10) || 0;
    const watt = parseFloat(app.wattage) || 0;
    const hours = parseFloat(app.hoursPerDay) || 0;

    const appliancePeak = qty * watt;
    const applianceDaily = appliancePeak * hours;

    totalPeakLoadW += appliancePeak;
    dailyConsumptionWh += applianceDaily;
  });

  // 2. Calculate Inverter Size
  // Add 25% safety margin for inverter size, convert W to VA roughly (Power factor ~0.8)
  const safetyFactorInverter = 1.25;
  const powerFactor = 0.8;
  const inverterSizeVA = Math.ceil((totalPeakLoadW * safetyFactorInverter) / powerFactor);

  // Suggested typical inverter rating (rounding up to nearest 1000)
  const suggestedInverterVA = Math.ceil(inverterSizeVA / 1000) * 1000;

  // 3. Calculate Solar Panels (Assuming 500W panels and 5 peak sun hours)
  const peakSunHours = 5;
  const systemLossesFactor = 1.3; // 30% losses

  // Total daily Wh to be generated
  const dailyGenerationRequiredWh = dailyConsumptionWh * systemLossesFactor;

  // Total panel capacity needed
  const totalPanelCapacityW = dailyGenerationRequiredWh / peakSunHours;

  // Panel Count (Assume 500W per panel)
  const panelRatingW = 500;
  const panelCount = Math.ceil(totalPanelCapacityW / panelRatingW);

  // 4. Calculate Battery Storage (Assuming 12V 200Ah batteries, 50% Depth of Discharge for Lead Acid / Gel, or use Lithium)
  // Let's assume standard Gel/AGM: 50% DoD, 1 day of autonomy
  const batteryVoltage = 12;
  const batteryCapacityAh = 200;
  const depthOfDischarge = 0.5;

  // Total Ah required per day
  const totalAhRequired = dailyConsumptionWh / batteryVoltage;

  // Ah required considering DoD
  const effectiveAhRequired = totalAhRequired / depthOfDischarge;

  // Battery count
  const batteryCount = Math.ceil(effectiveAhRequired / batteryCapacityAh);

  return {
    dailyConsumptionWh,
    totalPeakLoadW,
    inverterSizeVA: suggestedInverterVA,
    panelCount,
    batteryCount
  };
};
