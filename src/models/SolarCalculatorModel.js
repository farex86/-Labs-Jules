export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع ثلج', consumption: 500 },
  { id: 'company', name: 'شركة', consumption: 100 },
  { id: 'farm', name: 'مزرعة', consumption: 200 },
  { id: 'poultry_farm', name: 'مزرعة دواجن', consumption: 300 },
  { id: 'greenhouse', name: 'بيوت محمية', consumption: 150 },
  { id: 'factory', name: 'مصنع', consumption: 800 },
  { id: 'clinic', name: 'مستوصف', consumption: 120 },
  { id: 'hospital', name: 'مستشفى', consumption: 1000 },
  { id: 'bakery', name: 'مخبز', consumption: 250 },
  { id: 'shop', name: 'دكان', consumption: 30 },
  { id: 'workshop', name: 'ورشة', consumption: 180 },
  { id: 'water_pump', name: 'مضخة مياه', consumption: 400 },
  { id: 'donkey', name: 'دونكي', consumption: 10 },
  { id: 'mosque', name: 'مسجد', consumption: 80 },
  { id: 'printing_press', name: 'مطبعة', consumption: 350 },
  { id: 'coffee_shop', name: 'مقهى', consumption: 60 },
  { id: 'restaurant', name: 'مطعم', consumption: 220 },
  { id: 'hotel', name: 'فندق', consumption: 600 },
  { id: 'bank', name: 'بنك', consumption: 150 },
  { id: 'supermarket', name: 'سوبر ماركت', consumption: 400 },
  { id: 'gas_station', name: 'محطة وقود', consumption: 300 },
  { id: 'mining_company', name: 'شركة تعدين', consumption: 1200 }
];

export const calculateSolarNeeds = (consumption) => {
  const panelCapacity = 400; // watts
  const solarHours = 5; // average peak sun hours
  const systemLosses = 0.8; // 20% system losses

  const dailyEnergyNeeded = consumption * 1000; // Wh
  const totalPanelCapacityNeeded = dailyEnergyNeeded / (solarHours * systemLosses);
  const numberOfPanels = Math.ceil(totalPanelCapacityNeeded / panelCapacity);
  const estimatedCost = numberOfPanels * panelCapacity * 0.8; // Example cost calculation

  return {
    numberOfPanels,
    estimatedCost,
    totalCapacity: (numberOfPanels * panelCapacity) / 1000 // kW
  };
};
