export const facilityTypes = [
  { id: 'ice_factory', name: 'مصنع ثلج', defaultConsumptionKWh: 500, suggestedPanels: 250 },
  { id: 'company', name: 'شركة', defaultConsumptionKWh: 150, suggestedPanels: 75 },
  { id: 'farm', name: 'مزرعة', defaultConsumptionKWh: 300, suggestedPanels: 150 },
  { id: 'poultry_farm', name: 'مزرعة دواجن', defaultConsumptionKWh: 400, suggestedPanels: 200 },
  { id: 'greenhouses', name: 'بيوت محمية', defaultConsumptionKWh: 250, suggestedPanels: 125 },
  { id: 'factory', name: 'مصنع', defaultConsumptionKWh: 1000, suggestedPanels: 500 },
  { id: 'clinic', name: 'مستوصف', defaultConsumptionKWh: 120, suggestedPanels: 60 },
  { id: 'hospital', name: 'مستشفى', defaultConsumptionKWh: 2000, suggestedPanels: 1000 },
  { id: 'bakery', name: 'مخبز', defaultConsumptionKWh: 300, suggestedPanels: 150 },
  { id: 'shop', name: 'دكان', defaultConsumptionKWh: 30, suggestedPanels: 15 },
  { id: 'workshop', name: 'ورشة', defaultConsumptionKWh: 100, suggestedPanels: 50 },
  { id: 'water_pump', name: 'مضخة مياه', defaultConsumptionKWh: 200, suggestedPanels: 100 },
  { id: 'donkey_water_station', name: 'دونكي', defaultConsumptionKWh: 80, suggestedPanels: 40 },
  { id: 'mosque', name: 'مسجد', defaultConsumptionKWh: 150, suggestedPanels: 75 },
  { id: 'printing_press', name: 'مطبعة', defaultConsumptionKWh: 350, suggestedPanels: 175 },
  { id: 'coffee_shop', name: 'مقهى', defaultConsumptionKWh: 90, suggestedPanels: 45 },
  { id: 'restaurant', name: 'مطعم', defaultConsumptionKWh: 250, suggestedPanels: 125 },
  { id: 'hotel', name: 'فندق', defaultConsumptionKWh: 1500, suggestedPanels: 750 },
  { id: 'bank', name: 'بنك', defaultConsumptionKWh: 400, suggestedPanels: 200 },
  { id: 'supermarket', name: 'سوبر ماركت', defaultConsumptionKWh: 600, suggestedPanels: 300 },
  { id: 'gas_station', name: 'محطة وقود', defaultConsumptionKWh: 200, suggestedPanels: 100 },
  { id: 'mining_company', name: 'شركة تعدين', defaultConsumptionKWh: 3000, suggestedPanels: 1500 },
];

/**
 * Calculates the solar system requirements based on the selected facility and custom inputs.
 *
 * @param {string} facilityId - The ID of the selected facility.
 * @param {object} customInputs - Custom user inputs (e.g., custom hours or consumption).
 * @param {number} customInputs.hours - Number of operating hours per day.
 * @param {number} customInputs.customConsumption - Overridden daily consumption in kWh.
 * @returns {object} The calculated requirements (e.g., required panels, capacity in kW, estimated cost).
 */
export const calculateSolarRequirements = (facilityId, customInputs = {}) => {
  const facility = facilityTypes.find(f => f.id === facilityId);
  if (!facility) {
    return null;
  }

  // Base daily consumption
  let dailyConsumptionKWh = facility.defaultConsumptionKWh;

  if (customInputs.customConsumption && !isNaN(customInputs.customConsumption)) {
    dailyConsumptionKWh = Number(customInputs.customConsumption);
  } else if (customInputs.hours && !isNaN(customInputs.hours)) {
    // If we only have hours, assume default consumption was based on 8 hours,
    // and adjust it proportionally as a simple mock formula.
    const defaultHours = 8;
    dailyConsumptionKWh = (dailyConsumptionKWh / defaultHours) * Number(customInputs.hours);
  }

  // Calculate required system capacity (kW)
  // Assuming 5 hours of effective sunlight per day for the system capacity calculation
  const effectiveSunlightHours = 5;
  let requiredCapacityKW = dailyConsumptionKWh / effectiveSunlightHours;

  // Add 20% safety margin
  requiredCapacityKW = requiredCapacityKW * 1.2;

  // Assume 500W (0.5kW) per panel
  const panelCapacityKW = 0.5;
  const requiredPanels = Math.ceil(requiredCapacityKW / panelCapacityKW);

  // Estimate cost ($1000 per kW as a rough estimate)
  const estimatedCostUSD = requiredCapacityKW * 1000;

  return {
    dailyConsumptionKWh: parseFloat(dailyConsumptionKWh.toFixed(2)),
    requiredCapacityKW: parseFloat(requiredCapacityKW.toFixed(2)),
    requiredPanels,
    estimatedCostUSD: parseFloat(estimatedCostUSD.toFixed(2)),
  };
};
