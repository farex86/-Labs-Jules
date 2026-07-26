export const FACILITY_TYPES = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    appliances: [
      { id: '1', name: 'ماكينة ثلج', power: 5000, quantity: 2, hours: 24 },
      { id: '2', name: 'إضاءة', power: 50, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    appliances: [
      { id: '1', name: 'مكيف', power: 1500, quantity: 4, hours: 8 },
      { id: '2', name: 'حاسوب', power: 250, quantity: 10, hours: 8 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 20, hours: 10 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    appliances: [
      { id: '1', name: 'مضخة مياه صغيرة', power: 1500, quantity: 1, hours: 6 },
      { id: '2', name: 'إضاءة', power: 50, quantity: 5, hours: 12 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    appliances: [
      { id: '1', name: 'مراوح تهوية', power: 750, quantity: 6, hours: 24 },
      { id: '2', name: 'تدفئة', power: 2000, quantity: 2, hours: 12 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 20, hours: 14 },
    ]
  },
  {
    id: 'greenhouses',
    name: 'بيوت محمية',
    appliances: [
      { id: '1', name: 'مراوح تبريد', power: 1000, quantity: 4, hours: 10 },
      { id: '2', name: 'مضخة ري', power: 1500, quantity: 1, hours: 4 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    appliances: [
      { id: '1', name: 'ماكينات إنتاج', power: 10000, quantity: 2, hours: 12 },
      { id: '2', name: 'إضاءة', power: 100, quantity: 30, hours: 12 },
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    appliances: [
      { id: '1', name: 'مكيف', power: 1500, quantity: 3, hours: 10 },
      { id: '2', name: 'ثلاجة أدوية', power: 300, quantity: 2, hours: 24 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 15, hours: 12 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفى',
    appliances: [
      { id: '1', name: 'أجهزة طبية', power: 2000, quantity: 10, hours: 24 },
      { id: '2', name: 'مكيف مركزي', power: 10000, quantity: 2, hours: 24 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 100, hours: 24 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    appliances: [
      { id: '1', name: 'عجانة', power: 3000, quantity: 2, hours: 8 },
      { id: '2', name: 'فرن كهربائي', power: 8000, quantity: 1, hours: 10 },
      { id: '3', name: 'إضاءة', power: 50, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'shop',
    name: 'دكان',
    appliances: [
      { id: '1', name: 'ثلاجة عرض', power: 600, quantity: 2, hours: 24 },
      { id: '2', name: 'مروحة / مكيف', power: 100, quantity: 2, hours: 12 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 4, hours: 12 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    appliances: [
      { id: '1', name: 'ماكينة لحام', power: 4000, quantity: 1, hours: 4 },
      { id: '2', name: 'صاروخ / دريل', power: 800, quantity: 2, hours: 5 },
      { id: '3', name: 'إضاءة', power: 100, quantity: 4, hours: 10 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة مياه',
    appliances: [
      { id: '1', name: 'مضخة غاطسة', power: 5500, quantity: 1, hours: 8 },
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي (محطة مياه)',
    appliances: [
      { id: '1', name: 'مضخة', power: 7500, quantity: 1, hours: 10 },
      { id: '2', name: 'إضاءة', power: 50, quantity: 2, hours: 12 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    appliances: [
      { id: '1', name: 'مكيف', power: 2000, quantity: 4, hours: 4 },
      { id: '2', name: 'مكبر صوت', power: 200, quantity: 1, hours: 2 },
      { id: '3', name: 'إضاءة', power: 40, quantity: 20, hours: 5 },
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    appliances: [
      { id: '1', name: 'ماكينة طباعة', power: 5000, quantity: 2, hours: 8 },
      { id: '2', name: 'حاسوب', power: 250, quantity: 3, hours: 8 },
      { id: '3', name: 'مكيف', power: 2000, quantity: 2, hours: 8 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    appliances: [
      { id: '1', name: 'ماكينة قهوة', power: 3000, quantity: 1, hours: 12 },
      { id: '2', name: 'ثلاجة عرض', power: 500, quantity: 2, hours: 24 },
      { id: '3', name: 'مكيف', power: 1500, quantity: 2, hours: 12 },
      { id: '4', name: 'إضاءة وديكور', power: 100, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    appliances: [
      { id: '1', name: 'ثلاجة تجميد', power: 800, quantity: 2, hours: 24 },
      { id: '2', name: 'شواية/قلاية', power: 3500, quantity: 2, hours: 10 },
      { id: '3', name: 'مكيف', power: 2000, quantity: 3, hours: 14 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    appliances: [
      { id: '1', name: 'مكيف', power: 1500, quantity: 20, hours: 12 },
      { id: '2', name: 'سخان مياه', power: 2000, quantity: 20, hours: 3 },
      { id: '3', name: 'إضاءة ومصعد', power: 5000, quantity: 1, hours: 24 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    appliances: [
      { id: '1', name: 'حاسوب', power: 250, quantity: 15, hours: 10 },
      { id: '2', name: 'مكيف', power: 2000, quantity: 5, hours: 10 },
      { id: '3', name: 'صراف آلي (ATM)', power: 500, quantity: 2, hours: 24 },
      { id: '4', name: 'إضاءة', power: 40, quantity: 30, hours: 12 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    appliances: [
      { id: '1', name: 'ثلاجة عرض كبيرة', power: 1500, quantity: 4, hours: 24 },
      { id: '2', name: 'مكيف', power: 2000, quantity: 3, hours: 16 },
      { id: '3', name: 'إضاءة', power: 50, quantity: 20, hours: 16 },
    ]
  },
  {
    id: 'fuel_station',
    name: 'طرمبة وقود',
    appliances: [
      { id: '1', name: 'مضخة وقود', power: 1000, quantity: 4, hours: 24 },
      { id: '2', name: 'إضاءة مظلة', power: 200, quantity: 10, hours: 12 },
      { id: '3', name: 'مكيف مكتب', power: 1500, quantity: 1, hours: 24 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    appliances: [
      { id: '1', name: 'كسارة', power: 15000, quantity: 1, hours: 10 },
      { id: '2', name: 'مضخة مياه ضخمة', power: 8000, quantity: 2, hours: 12 },
      { id: '3', name: 'إضاءة ومرافق', power: 2000, quantity: 5, hours: 24 },
    ]
  },
];

export const calculateTotalConsumption = (appliances) => {
  let dailyEnergyWh = 0;
  let maxPowerW = 0;

  appliances.forEach(app => {
    const power = Number(app.power) || 0;
    const quantity = Number(app.quantity) || 0;
    const hours = Number(app.hours) || 0;

    const appliancePower = power * quantity;
    dailyEnergyWh += appliancePower * hours;
    maxPowerW += appliancePower;
  });

  const peakSunHours = 5;
  const systemEfficiency = 0.8;
  const recommendedSolarSystemSizeKw = (dailyEnergyWh / (peakSunHours * systemEfficiency)) / 1000;
  const recommendedInverterSizeKw = (maxPowerW * 1.25) / 1000;
  const recommendedBatteryCapacityWh = dailyEnergyWh / 0.8;

  return {
    dailyEnergyWh,
    maxPowerW,
    recommendedSolarSystemSizeKw,
    recommendedInverterSizeKw,
    recommendedBatteryCapacityWh
  };
};
