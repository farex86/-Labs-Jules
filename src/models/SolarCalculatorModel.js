export const FACILITY_TYPES = [
  { id: 'ice_factory', label: 'مصنع ثلج', icon: 'building-2' },
  { id: 'company', label: 'شركة', icon: 'briefcase' },
  { id: 'farm', label: 'مزرعة', icon: 'tractor' },
  { id: 'poultry_farm', label: 'مزرعة دواجن', icon: 'bird' },
  { id: 'greenhouse', label: 'بيوت محمية', icon: 'leaf' },
  { id: 'factory', label: 'مصنع', icon: 'factory' },
  { id: 'clinic', label: 'مستوصف', icon: 'stethoscope' },
  { id: 'hospital', label: 'مستشفى', icon: 'hospital' },
  { id: 'bakery', label: 'مخبز', icon: 'croissant' },
  { id: 'shop', label: 'دكان', icon: 'store' },
  { id: 'workshop', label: 'ورشة', icon: 'wrench' },
  { id: 'water_pump', label: 'مضخة مياه', icon: 'droplet' },
  { id: 'donkey', label: 'دونكي', icon: 'truck' },
  { id: 'mosque', label: 'مسجد', icon: 'book-open' },
  { id: 'printing_press', label: 'مطبعة', icon: 'printer' },
  { id: 'coffee_shop', label: 'كوفي شوب', icon: 'coffee' },
  { id: 'restaurant', label: 'مطعم', icon: 'utensils' },
  { id: 'hotel', label: 'فندق', icon: 'hotel' },
  { id: 'bank', label: 'بنك', icon: 'landmark' },
  { id: 'supermarket', label: 'سوبر ماركت', icon: 'shopping-cart' },
  { id: 'gas_station', label: 'طرمبة وقود', icon: 'fuel' },
  { id: 'mining_company', label: 'شركة تعدين', icon: 'pickaxe' }
];

export const DEVICE_CATALOG = {
  ice_factory: [
    { name: 'آلة صنع الثلج', powerW: 5000, hours: 24, qty: 1 },
    { name: 'مكيف تبريد', powerW: 2000, hours: 24, qty: 2 },
    { name: 'إضاءة', powerW: 50, hours: 12, qty: 10 }
  ],
  farm: [
    { name: 'مضخة مياه زراعية', powerW: 3000, hours: 8, qty: 1 },
    { name: 'إضاءة', powerW: 50, hours: 10, qty: 5 }
  ],
  mosque: [
    { name: 'مكيف هواء', powerW: 1500, hours: 8, qty: 4 },
    { name: 'مراوح', powerW: 100, hours: 8, qty: 10 },
    { name: 'إضاءة', powerW: 40, hours: 6, qty: 20 },
    { name: 'نظام صوت', powerW: 200, hours: 4, qty: 1 }
  ],
  shop: [
    { name: 'ثلاجة عرض', powerW: 500, hours: 24, qty: 2 },
    { name: 'إضاءة', powerW: 30, hours: 12, qty: 6 },
    { name: 'مروحة', powerW: 80, hours: 12, qty: 2 }
  ]
};

export const getDefaultAppliances = (facilityTypeId) => {
  const defaultAppliances = DEVICE_CATALOG[facilityTypeId] || [
    { name: 'جهاز 1', powerW: 100, hours: 8, qty: 1 }
  ];
  return defaultAppliances.map(app => ({
    id: crypto.randomUUID(),
    ...app
  }));
};

export const calculateEnergyMetrics = (appliances) => {
  let totalDailyWh = 0;
  let peakPowerW = 0;

  appliances.forEach(app => {
    const power = Number(app.powerW) || 0;
    const hours = Number(app.hours) || 0;
    const qty = Number(app.qty) || 0;

    const appliancePeak = power * qty;
    peakPowerW += appliancePeak;
    totalDailyWh += appliancePeak * hours;
  });

  return {
    totalDailyWh,
    totalDailyKWh: totalDailyWh / 1000,
    peakPowerW,
    peakPowerKW: peakPowerW / 1000
  };
};

export const calculateSystemRecommendations = (metrics, sunHours = 5.5, efficiency = 0.8) => {
  const { totalDailyWh, peakPowerW } = metrics;

  // Panel Capacity (W)
  const requiredPanelCapacity = totalDailyWh / (sunHours * efficiency);

  // Number of 550W Panels
  const panelCount = Math.ceil(requiredPanelCapacity / 550);

  // Inverter Size (W) - adding 20% safety margin to peak load
  const recommendedInverter = peakPowerW * 1.2;

  // Battery Capacity (Wh) - assuming 1 day of autonomy and 50% Depth of Discharge for Lead Acid/Gel or 80% for Lithium
  // Let's calculate for Lithium (80% DoD)
  const requiredBatteryCapacityWh = totalDailyWh / 0.8;
  const batteries48V100Ah = Math.ceil(requiredBatteryCapacityWh / (48 * 100));

  return {
    panelCapacityW: requiredPanelCapacity,
    panelCount: panelCount || 0,
    inverterW: recommendedInverter || 0,
    batteryCapacityWh: requiredBatteryCapacityWh || 0,
    batteriesCount: batteries48V100Ah || 0
  };
};