export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع ثلج', baseConsumptionKW: 50, typicalDevices: ['Ice Machines', 'Compressors', 'Freezers'] },
  { id: 'company', name: 'شركة', baseConsumptionKW: 10, typicalDevices: ['Computers', 'AC Units', 'Lighting'] },
  { id: 'farm', name: 'مزرعة', baseConsumptionKW: 15, typicalDevices: ['Water Pumps', 'Lighting', 'Small Machinery'] },
  { id: 'poultry_farm', name: 'مزرعة دواجن', baseConsumptionKW: 25, typicalDevices: ['Heaters', 'Fans', 'Lighting', 'Feeders'] },
  { id: 'greenhouses', name: 'بيوت محمية', baseConsumptionKW: 8, typicalDevices: ['Climate Control', 'Lighting', 'Irrigation'] },
  { id: 'factory', name: 'مصنع', baseConsumptionKW: 100, typicalDevices: ['Heavy Machinery', 'HVAC', 'Lighting'] },
  { id: 'dispensary', name: 'مستوصف', baseConsumptionKW: 20, typicalDevices: ['Medical Equipment', 'AC Units', 'Lighting'] },
  { id: 'hospital', name: 'مستشفي', baseConsumptionKW: 200, typicalDevices: ['Large Medical Equipment', 'HVAC', '24/7 Lighting'] },
  { id: 'bakery', name: 'مخبز', baseConsumptionKW: 30, typicalDevices: ['Ovens', 'Mixers', 'Lighting'] },
  { id: 'shop', name: 'دكان', baseConsumptionKW: 5, typicalDevices: ['Fridges', 'Lighting', 'AC'] },
  { id: 'workshop', name: 'ورشة', baseConsumptionKW: 15, typicalDevices: ['Tools', 'Welding Machines', 'Lighting'] },
  { id: 'water_pump', name: 'مضخة موية', baseConsumptionKW: 12, typicalDevices: ['Submersible Pumps', 'Controllers'] },
  { id: 'donkey_pump', name: 'دونكي', baseConsumptionKW: 8, typicalDevices: ['Pumps'] },
  { id: 'mosque', name: 'مسجد', baseConsumptionKW: 10, typicalDevices: ['AC Units', 'Sound System', 'Lighting'] },
  { id: 'printing_press', name: 'مطبعة', baseConsumptionKW: 40, typicalDevices: ['Printing Machines', 'Computers', 'Lighting'] },
  { id: 'coffee_shop', name: 'كوفي شوب', baseConsumptionKW: 15, typicalDevices: ['Espresso Machines', 'Fridges', 'AC'] },
  { id: 'restaurant', name: 'مطعم', baseConsumptionKW: 25, typicalDevices: ['Ovens', 'Fridges', 'HVAC'] },
  { id: 'hotel', name: 'فندق', baseConsumptionKW: 150, typicalDevices: ['HVAC', 'Elevators', 'Kitchen Equipment', 'Lighting'] },
  { id: 'bank', name: 'بنك', baseConsumptionKW: 30, typicalDevices: ['Computers', 'AC Units', 'Servers', 'Lighting'] },
  { id: 'supermarket', name: 'سوبر ماركت', baseConsumptionKW: 40, typicalDevices: ['Freezers', 'Fridges', 'AC', 'Lighting'] },
  { id: 'fuel_station', name: 'طرمبة وقود', baseConsumptionKW: 20, typicalDevices: ['Fuel Pumps', 'Lighting', 'Shop'] },
  { id: 'mining_company', name: 'شركة تعدين', baseConsumptionKW: 300, typicalDevices: ['Excavators', 'Processing Plants', 'Lighting'] }
];

export const calculateSystemSize = (consumptionKW, hoursOfSunlight = 5) => {
  // Add 20% margin for inefficiencies
  const requiredGeneration = consumptionKW * 1.2;
  const systemSizeKW = requiredGeneration / hoursOfSunlight;
  const estimatedCostUSD = systemSizeKW * 1000; // Rough estimate: $1000 per KW
  const panelCount = Math.ceil((systemSizeKW * 1000) / 550); // Assuming 550W panels

  return {
    systemSizeKW: systemSizeKW.toFixed(2),
    estimatedCostUSD: estimatedCostUSD.toFixed(2),
    panelCount,
    requiredAreaM2: (panelCount * 2.5).toFixed(2), // Rough estimate: 2.5 sq meters per panel
  };
};

export const getFacilityDetails = (facilityId) => {
  return FACILITY_TYPES.find(f => f.id === facilityId) || null;
};
