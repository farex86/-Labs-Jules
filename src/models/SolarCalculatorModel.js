// Business logic and data model for the Solar Calculator

export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع تلج', baseConsumption: 50000, recommendedSystem: 'Off-grid or Hybrid 100kW+', icon: 'Factory' },
  { id: 'company', name: 'شركة', baseConsumption: 15000, recommendedSystem: 'On-grid 20kW+', icon: 'Building2' },
  { id: 'farm', name: 'مزرعة', baseConsumption: 10000, recommendedSystem: 'Off-grid with Storage 15kW+', icon: 'Tractor' },
  { id: 'poultry_farm', name: 'مزرعة دواجن', baseConsumption: 25000, recommendedSystem: 'Hybrid with Backup 30kW+', icon: 'Bird' },
  { id: 'greenhouse', name: 'بيوت محمية', baseConsumption: 8000, recommendedSystem: 'Off-grid 10kW+', icon: 'Trees' },
  { id: 'factory', name: 'مصنع', baseConsumption: 100000, recommendedSystem: 'Industrial On-grid 200kW+', icon: 'Factory' },
  { id: 'clinic', name: 'مستوصف', baseConsumption: 12000, recommendedSystem: 'Hybrid 15kW+', icon: 'Stethoscope' },
  { id: 'hospital', name: 'مستشفي', baseConsumption: 200000, recommendedSystem: 'Critical Hybrid/On-grid 300kW+', icon: 'Hospital' },
  { id: 'bakery', name: 'مخبز', baseConsumption: 30000, recommendedSystem: 'Hybrid 40kW+', icon: 'Croissant' },
  { id: 'shop', name: 'دكان', baseConsumption: 3000, recommendedSystem: 'Off-grid 5kW+', icon: 'Store' },
  { id: 'workshop', name: 'ورشة', baseConsumption: 18000, recommendedSystem: 'On-grid 25kW+', icon: 'Wrench' },
  { id: 'water_pump', name: 'مضخة موية', baseConsumption: 5000, recommendedSystem: 'Solar Water Pumping System (VFD)', icon: 'Droplets' },
  { id: 'donkey', name: 'دونكي', baseConsumption: 2000, recommendedSystem: 'Small Off-grid 3kW+', icon: 'Package' },
  { id: 'mosque', name: 'مسجد', baseConsumption: 8000, recommendedSystem: 'On-grid/Hybrid 10kW+', icon: 'Moon' },
  { id: 'printing_press', name: 'مطبعة', baseConsumption: 40000, recommendedSystem: 'On-grid 50kW+', icon: 'Printer' },
  { id: 'coffee_shop', name: 'كوفي شوب', baseConsumption: 15000, recommendedSystem: 'Hybrid 20kW+', icon: 'Coffee' },
  { id: 'restaurant', name: 'مطعم', baseConsumption: 25000, recommendedSystem: 'Hybrid 30kW+', icon: 'Utensils' },
  { id: 'hotel', name: 'فندق', baseConsumption: 150000, recommendedSystem: 'On-grid/Hybrid 200kW+', icon: 'Hotel' },
  { id: 'bank', name: 'بنك', baseConsumption: 40000, recommendedSystem: 'Hybrid with robust Backup 50kW+', icon: 'Landmark' },
  { id: 'supermarket', name: 'سوبر ماركت', baseConsumption: 35000, recommendedSystem: 'Hybrid 40kW+', icon: 'ShoppingCart' },
  { id: 'gas_station', name: 'طرمبة وقود', baseConsumption: 20000, recommendedSystem: 'Hybrid 25kW+', icon: 'Fuel' },
  { id: 'mining_company', name: 'شركة تعدين', baseConsumption: 300000, recommendedSystem: 'Industrial Off-grid/Hybrid 500kW+', icon: 'Pickaxe' }
];

export const calculateSolarRequirements = (facilityId, hoursPerDay = 8, additionalLoad = 0) => {
  const facility = FACILITY_TYPES.find(f => f.id === facilityId);
  if (!facility) return null;

  const totalDailyConsumptionWh = (facility.baseConsumption * hoursPerDay) + additionalLoad;
  const systemSizeKw = (totalDailyConsumptionWh / 1000) * 1.2; // 20% safety margin

  // Approximate cost per kW (this is just for demo purposes, can be configurable)
  const estimatedCostUsd = systemSizeKw * 1000;

  return {
    facilityName: facility.name,
    dailyConsumptionKwh: (totalDailyConsumptionWh / 1000).toFixed(2),
    recommendedSystemSizeKw: systemSizeKw.toFixed(2),
    systemType: facility.recommendedSystem,
    estimatedCostUsd: estimatedCostUsd.toFixed(2)
  };
};
