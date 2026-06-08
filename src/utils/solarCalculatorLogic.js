// Constant data for building/facility types (consumption patterns)
export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع تلج', baseLoadKw: 50, typicalDailyHours: 24 },
  { id: 'company', name: 'شركة', baseLoadKw: 15, typicalDailyHours: 10 },
  { id: 'farm', name: 'مزرعة', baseLoadKw: 20, typicalDailyHours: 12 },
  { id: 'poultry_farm', name: 'مزرعة دواجن', baseLoadKw: 30, typicalDailyHours: 24 },
  { id: 'greenhouse', name: 'بيوت محمية', baseLoadKw: 10, typicalDailyHours: 24 },
  { id: 'factory', name: 'مصنع', baseLoadKw: 100, typicalDailyHours: 16 },
  { id: 'clinic', name: 'مستوصف', baseLoadKw: 20, typicalDailyHours: 24 },
  { id: 'hospital', name: 'مستشفي', baseLoadKw: 200, typicalDailyHours: 24 },
  { id: 'bakery', name: 'مخبز', baseLoadKw: 40, typicalDailyHours: 16 },
  { id: 'shop', name: 'دكان', baseLoadKw: 5, typicalDailyHours: 14 },
  { id: 'workshop', name: 'ورشة', baseLoadKw: 15, typicalDailyHours: 10 },
  { id: 'water_pump', name: 'مضخة موية', baseLoadKw: 10, typicalDailyHours: 8 },
  { id: 'donkey', name: 'دونكي', baseLoadKw: 5, typicalDailyHours: 6 },
  { id: 'mosque', name: 'مسجد', baseLoadKw: 10, typicalDailyHours: 5 },
  { id: 'printing_press', name: 'مطبعة', baseLoadKw: 30, typicalDailyHours: 12 },
  { id: 'coffee_shop', name: 'كوفي شوب', baseLoadKw: 15, typicalDailyHours: 16 },
  { id: 'restaurant', name: 'مطعم', baseLoadKw: 25, typicalDailyHours: 16 },
  { id: 'hotel', name: 'فندق', baseLoadKw: 100, typicalDailyHours: 24 },
  { id: 'bank', name: 'بنك', baseLoadKw: 40, typicalDailyHours: 10 },
  { id: 'supermarket', name: 'سوبر ماركت', baseLoadKw: 30, typicalDailyHours: 16 },
  { id: 'gas_station', name: 'طرمبة وقود', baseLoadKw: 20, typicalDailyHours: 24 },
  { id: 'mining_company', name: 'شركة تعدين', baseLoadKw: 500, typicalDailyHours: 24 }
];

// Specific appliances/devices often associated with these patterns
export const COMMON_APPLIANCES = [
  { id: 'ac', name: 'مكيف', powerWatts: 1500 },
  { id: 'fridge', name: 'ثلاجة', powerWatts: 200 },
  { id: 'freezer', name: 'فريزر', powerWatts: 400 },
  { id: 'lights', name: 'إضاءة', powerWatts: 20 },
  { id: 'pump', name: 'مضخة', powerWatts: 750 },
  { id: 'motor', name: 'محرك', powerWatts: 2000 },
  { id: 'computer', name: 'كمبيوتر', powerWatts: 150 },
  { id: 'oven', name: 'فرن', powerWatts: 2500 }
];

/**
 * Calculates the required solar system size based on facility type and custom adjustments.
 *
 * @param {string} facilityId - The ID of the selected facility type.
 * @param {number} customDailyKwh - Optional custom daily consumption in kWh. If provided, overrides facility defaults.
 * @param {number} sunHours - Average daily peak sun hours (default 5.5 for typical sunny regions).
 * @param {number} systemLosses - System inefficiency factor (default 0.2 for 20% loss).
 * @returns {Object} - Object containing calculation results.
 */
export const calculateSolarRequirements = (facilityId, customDailyKwh = null, sunHours = 5.5, systemLosses = 0.2) => {
  let dailyKwh = customDailyKwh;
  let facilityName = "مخصص";

  if (!dailyKwh && facilityId) {
    const facility = FACILITY_TYPES.find(f => f.id === facilityId);
    if (facility) {
      dailyKwh = facility.baseLoadKw * facility.typicalDailyHours;
      facilityName = facility.name;
    }
  }

  if (!dailyKwh) {
    return null; // Need inputs
  }

  // Energy needed to be produced to account for losses
  const requiredDailyProductionKwh = dailyKwh / (1 - systemLosses);

  // Required system size in kW
  const requiredSystemSizeKw = requiredDailyProductionKwh / sunHours;

  // Assuming typical 550W panels
  const panelWattage = 550;
  const numberOfPanels = Math.ceil((requiredSystemSizeKw * 1000) / panelWattage);

  // Required battery capacity (assuming 1 day of autonomy for typical systems, 50% Depth of Discharge)
  // Note: For some large 24h facilities, you'd calculate this differently or rely purely on grid-tie,
  // but we'll provide a basic off-grid/hybrid battery estimate.
  const batteryCapacityKwh = (dailyKwh * 1) / 0.5;

  return {
    facilityName,
    dailyConsumptionKwh: dailyKwh,
    requiredSystemSizeKw: parseFloat(requiredSystemSizeKw.toFixed(2)),
    numberOfPanels,
    panelWattage,
    batteryCapacityKwh: parseFloat(batteryCapacityKwh.toFixed(2)),
    inverterSizeKw: parseFloat((requiredSystemSizeKw * 1.2).toFixed(2)) // 20% buffer for inverter
  };
};
