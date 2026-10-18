export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع ثلج', baseLoadkW: 50, recommendedSystemType: 'On-Grid / Hybrid', peakHours: 12 },
  { id: 'company', name: 'شركة', baseLoadkW: 20, recommendedSystemType: 'On-Grid', peakHours: 8 },
  { id: 'farm', name: 'مزرعة', baseLoadkW: 15, recommendedSystemType: 'Off-Grid / Solar Pump', peakHours: 10 },
  { id: 'poultry_farm', name: 'مزرعة دواجن', baseLoadkW: 30, recommendedSystemType: 'Hybrid', peakHours: 24 },
  { id: 'greenhouses', name: 'بيوت محمية', baseLoadkW: 10, recommendedSystemType: 'Off-Grid', peakHours: 12 },
  { id: 'factory', name: 'مصنع', baseLoadkW: 100, recommendedSystemType: 'On-Grid / Hybrid', peakHours: 16 },
  { id: 'clinic', name: 'مستوصف', baseLoadkW: 25, recommendedSystemType: 'Hybrid', peakHours: 24 },
  { id: 'hospital', name: 'مستشفى', baseLoadkW: 150, recommendedSystemType: 'Hybrid', peakHours: 24 },
  { id: 'bakery', name: 'مخبز', baseLoadkW: 40, recommendedSystemType: 'On-Grid', peakHours: 12 },
  { id: 'shop', name: 'دكان', baseLoadkW: 5, recommendedSystemType: 'Off-Grid / Hybrid', peakHours: 14 },
  { id: 'workshop', name: 'ورشة', baseLoadkW: 15, recommendedSystemType: 'On-Grid', peakHours: 10 },
  { id: 'water_pump', name: 'مضخة مياه', baseLoadkW: 22, recommendedSystemType: 'Solar Pump (VFD)', peakHours: 8 },
  { id: 'donkey', name: 'دونكي', baseLoadkW: 5, recommendedSystemType: 'Off-Grid', peakHours: 10 },
  { id: 'mosque', name: 'مسجد', baseLoadkW: 12, recommendedSystemType: 'On-Grid / Hybrid', peakHours: 8 },
  { id: 'printing_press', name: 'مطبعة', baseLoadkW: 35, recommendedSystemType: 'On-Grid', peakHours: 12 },
  { id: 'coffee_shop', name: 'كوفي شوب', baseLoadkW: 18, recommendedSystemType: 'Hybrid', peakHours: 16 },
  { id: 'restaurant', name: 'مطعم', baseLoadkW: 25, recommendedSystemType: 'Hybrid', peakHours: 16 },
  { id: 'hotel', name: 'فندق', baseLoadkW: 80, recommendedSystemType: 'Hybrid', peakHours: 24 },
  { id: 'bank', name: 'بنك', baseLoadkW: 30, recommendedSystemType: 'Hybrid', peakHours: 10 },
  { id: 'supermarket', name: 'سوبر ماركت', baseLoadkW: 40, recommendedSystemType: 'Hybrid', peakHours: 24 },
  { id: 'gas_station', name: 'طرمبة وقود', baseLoadkW: 20, recommendedSystemType: 'Hybrid', peakHours: 24 },
  { id: 'mining_company', name: 'شركة تعدين', baseLoadkW: 200, recommendedSystemType: 'Off-Grid / Hybrid', peakHours: 24 },
];

/**
 * Calculate solar system requirements based on facility type and adjusted daily consumption.
 * @param {string} facilityId - The ID of the selected facility type.
 * @param {number} dailyConsumptionKWh - The user-adjusted daily consumption in kWh.
 * @param {number} sunshineHours - Average daily sunshine hours (default 6).
 * @returns {object} The calculated system parameters (system size, panel count, battery capacity, inverter size, etc.).
 */
export function calculateSolarSystem(facilityId, dailyConsumptionKWh, sunshineHours = 6) {
  const facility = FACILITY_TYPES.find(f => f.id === facilityId) || FACILITY_TYPES[1]; // default to 'company'

  // 1. Calculate Required Solar Panel System Size (kW)
  // Assuming 20% system losses (efficiency factor = 0.8)
  const systemSizeKW = dailyConsumptionKWh / (sunshineHours * 0.8);

  // 2. Number of Panels (Assuming average 550W panel)
  const PANEL_WATTAGE = 550;
  const numberOfPanels = Math.ceil((systemSizeKW * 1000) / PANEL_WATTAGE);

  // 3. Inverter Size (kW)
  // Should be at least 1.25x the base load for safety margin (surge)
  // But also at least the size of the solar array if grid-tied.
  const inverterSizeKW = Math.max(facility.baseLoadkW * 1.25, systemSizeKW);

  // 4. Battery Capacity for Night/Backup (kWh)
  // Rough estimate: Assume 50% of daily consumption happens outside sunshine hours
  // Or based on peak hours. For simplicity: backup needed for (24 - sunshineHours) or standard fraction.
  // We recommend covering at least 1.5 days of autonomy for off-grid,
  // but for a general calculator let's assume 50% daily usage buffer with 50% Depth of Discharge for lead acid,
  // or 80% DoD for Lithium. Let's use Lithium (80% DoD).
  const requiredBackupKWh = dailyConsumptionKWh * 0.5;
  const batteryCapacityKWh = requiredBackupKWh / 0.8;

  // Estimated Cost (Rough rule of thumb: $1000 per kW installed for commercial, maybe less for large, more for hybrid/battery)
  // This is highly variable, but gives a rough number for the calculator.
  let estimatedCostUSD = systemSizeKW * 800; // base solar
  if (facility.recommendedSystemType.includes('Hybrid') || facility.recommendedSystemType.includes('Off-Grid')) {
    estimatedCostUSD += batteryCapacityKWh * 300; // add battery cost roughly
  }

  return {
    facilityName: facility.name,
    recommendedSystemType: facility.recommendedSystemType,
    systemSizeKW: systemSizeKW.toFixed(1),
    numberOfPanels,
    inverterSizeKW: Math.ceil(inverterSizeKW),
    batteryCapacityKWh: batteryCapacityKWh.toFixed(1),
    estimatedCostUSD: Math.round(estimatedCostUSD),
    sunshineHours
  };
}
