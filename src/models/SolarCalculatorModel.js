export const FACILITY_TYPES = [
  'مصنع تلج', // Ice Factory
  'شركة', // Company
  'مزرعة', // Farm
  'مزرعة دواجن', // Poultry Farm
  'بيوت محمية', // Greenhouses
  'مصنع', // Factory
  'مستوصف', // Clinic
  'مستشفي', // Hospital
  'مخبز', // Bakery
  'دكان', // Shop
  'ورشة', // Workshop
  'مضخة موية', // Water Pump
  'دونكي', // Donkey (Water Well)
  'مسجد', // Mosque
  'مطبعة', // Printing Press
  'كوفي شوب', // Coffee Shop
  'مطعم', // Restaurant
  'فندق', // Hotel
  'بنك', // Bank
  'سوبر ماركت', // Supermarket
  'طرمبة وقود', // Gas Station
  'شركة تعدين', // Mining Company
  'أخرى' // Other
];

// Define common appliances and their default power consumption (Watts)
export const COMMON_APPLIANCES = {
  'لمبة': { power: 15, name: 'لمبة' },
  'مكيف': { power: 1500, name: 'مكيف' },
  'ثلاجة': { power: 200, name: 'ثلاجة' },
  'تلفزيون': { power: 100, name: 'تلفزيون' },
  'مروحة': { power: 75, name: 'مروحة' },
  'كمبيوتر': { power: 250, name: 'كمبيوتر' },
  'مضخة ماء': { power: 750, name: 'مضخة ماء' },
  'ماكينة تصوير': { power: 1200, name: 'ماكينة تصوير' },
  'ماكينة قهوة': { power: 1000, name: 'ماكينة قهوة' },
  'فرن كهربائي': { power: 2000, name: 'فرن كهربائي' },
  'ماكينة لحام': { power: 3000, name: 'ماكينة لحام' },
  'طابعة': { power: 50, name: 'طابعة' },
  'غسالة': { power: 500, name: 'غسالة' },
  'ماكينة آيس كريم': { power: 2500, name: 'ماكينة آيس كريم' },
};

export const getAppliancesForFacility = (facilityType) => {
  const baseAppliances = [
    { id: '1', ...COMMON_APPLIANCES['لمبة'], quantity: 5, hours: 8 },
  ];

  switch (facilityType) {
    case 'مصنع تلج':
      return [
        ...baseAppliances,
        { id: '2', ...COMMON_APPLIANCES['ثلاجة'], power: 5000, name: 'ثلاجة تبريد كبيرة', quantity: 2, hours: 24 },
        { id: '3', ...COMMON_APPLIANCES['مضخة ماء'], quantity: 2, hours: 12 },
      ];
    case 'شركة':
    case 'بنك':
      return [
        { id: '1', ...COMMON_APPLIANCES['لمبة'], quantity: 20, hours: 10 },
        { id: '2', ...COMMON_APPLIANCES['مكيف'], quantity: 5, hours: 10 },
        { id: '3', ...COMMON_APPLIANCES['كمبيوتر'], quantity: 15, hours: 8 },
        { id: '4', ...COMMON_APPLIANCES['ماكينة تصوير'], quantity: 1, hours: 2 },
        { id: '5', ...COMMON_APPLIANCES['ثلاجة'], quantity: 1, hours: 24 },
      ];
    case 'مزرعة':
    case 'مزرعة دواجن':
    case 'بيوت محمية':
      return [
        { id: '1', ...COMMON_APPLIANCES['لمبة'], quantity: 10, hours: 12 },
        { id: '2', ...COMMON_APPLIANCES['مروحة'], quantity: 15, hours: 24 },
        { id: '3', ...COMMON_APPLIANCES['مضخة ماء'], quantity: 1, hours: 6 },
      ];
    case 'مصنع':
      return [
        { id: '1', ...COMMON_APPLIANCES['لمبة'], quantity: 30, hours: 12 },
        { id: '2', ...COMMON_APPLIANCES['مكيف'], quantity: 10, hours: 12 },
        { id: '3', ...COMMON_APPLIANCES['كمبيوتر'], quantity: 5, hours: 8 },
        { id: '4', power: 5000, name: 'ماكينات إنتاج', quantity: 3, hours: 10 },
      ];
    case 'مستوصف':
    case 'مستشفي':
      return [
        { id: '1', ...COMMON_APPLIANCES['لمبة'], quantity: 50, hours: 24 },
        { id: '2', ...COMMON_APPLIANCES['مكيف'], quantity: 20, hours: 24 },
        { id: '3', ...COMMON_APPLIANCES['ثلاجة'], power: 300, name: 'ثلاجة أدوية', quantity: 5, hours: 24 },
        { id: '4', ...COMMON_APPLIANCES['كمبيوتر'], quantity: 10, hours: 12 },
        { id: '5', power: 2000, name: 'أجهزة طبية', quantity: 10, hours: 8 },
      ];
    case 'مخبز':
      return [
        { id: '1', ...COMMON_APPLIANCES['لمبة'], quantity: 10, hours: 16 },
        { id: '2', ...COMMON_APPLIANCES['مروحة'], quantity: 4, hours: 16 },
        { id: '3', power: 3000, name: 'عجانة كهربائية', quantity: 2, hours: 6 },
        { id: '4', ...COMMON_APPLIANCES['فرن كهربائي'], power: 10000, quantity: 1, hours: 8 },
      ];
    case 'دكان':
    case 'سوبر ماركت':
      return [
        { id: '1', ...COMMON_APPLIANCES['لمبة'], quantity: 15, hours: 14 },
        { id: '2', ...COMMON_APPLIANCES['مكيف'], quantity: 2, hours: 14 },
        { id: '3', ...COMMON_APPLIANCES['ثلاجة'], power: 400, name: 'ثلاجة عرض', quantity: 4, hours: 24 },
      ];
    case 'ورشة':
      return [
        { id: '1', ...COMMON_APPLIANCES['لمبة'], quantity: 8, hours: 10 },
        { id: '2', ...COMMON_APPLIANCES['مروحة'], quantity: 2, hours: 10 },
        { id: '3', ...COMMON_APPLIANCES['ماكينة لحام'], quantity: 1, hours: 4 },
        { id: '4', power: 1500, name: 'صاروخ / دريل', quantity: 3, hours: 3 },
      ];
    case 'مضخة موية':
    case 'دونكي':
      return [
        { id: '1', ...COMMON_APPLIANCES['لمبة'], quantity: 2, hours: 12 },
        { id: '2', ...COMMON_APPLIANCES['مضخة ماء'], power: 1500, quantity: 1, hours: 8 },
      ];
    case 'مسجد':
      return [
        { id: '1', ...COMMON_APPLIANCES['لمبة'], quantity: 30, hours: 6 },
        { id: '2', ...COMMON_APPLIANCES['مكيف'], quantity: 10, hours: 6 },
        { id: '3', ...COMMON_APPLIANCES['مروحة'], quantity: 15, hours: 6 },
        { id: '4', power: 100, name: 'مكبر صوت', quantity: 1, hours: 5 },
      ];
    case 'مطبعة':
      return [
        { id: '1', ...COMMON_APPLIANCES['لمبة'], quantity: 15, hours: 10 },
        { id: '2', ...COMMON_APPLIANCES['مكيف'], quantity: 3, hours: 10 },
        { id: '3', ...COMMON_APPLIANCES['كمبيوتر'], quantity: 3, hours: 8 },
        { id: '4', power: 2500, name: 'ماكينة طباعة', quantity: 2, hours: 8 },
      ];
    case 'كوفي شوب':
    case 'مطعم':
      return [
        { id: '1', ...COMMON_APPLIANCES['لمبة'], quantity: 20, hours: 16 },
        { id: '2', ...COMMON_APPLIANCES['مكيف'], quantity: 4, hours: 16 },
        { id: '3', ...COMMON_APPLIANCES['ثلاجة'], quantity: 3, hours: 24 },
        { id: '4', ...COMMON_APPLIANCES['ماكينة قهوة'], quantity: 1, hours: 12 },
        { id: '5', ...COMMON_APPLIANCES['تلفزيون'], quantity: 2, hours: 16 },
      ];
    case 'فندق':
      return [
        { id: '1', ...COMMON_APPLIANCES['لمبة'], quantity: 100, hours: 12 },
        { id: '2', ...COMMON_APPLIANCES['مكيف'], quantity: 50, hours: 12 },
        { id: '3', ...COMMON_APPLIANCES['ثلاجة'], quantity: 50, hours: 24 },
        { id: '4', ...COMMON_APPLIANCES['تلفزيون'], quantity: 50, hours: 6 },
        { id: '5', ...COMMON_APPLIANCES['غسالة'], quantity: 4, hours: 8 },
      ];
    case 'طرمبة وقود':
      return [
        { id: '1', ...COMMON_APPLIANCES['لمبة'], quantity: 20, hours: 12 },
        { id: '2', ...COMMON_APPLIANCES['مكيف'], quantity: 2, hours: 24 },
        { id: '3', power: 500, name: 'مضخة وقود', quantity: 4, hours: 10 },
      ];
    case 'شركة تعدين':
      return [
        { id: '1', ...COMMON_APPLIANCES['لمبة'], quantity: 50, hours: 12 },
        { id: '2', ...COMMON_APPLIANCES['مكيف'], quantity: 10, hours: 12 },
        { id: '3', power: 10000, name: 'آلات حفر/طحن', quantity: 2, hours: 10 },
        { id: '4', ...COMMON_APPLIANCES['مضخة ماء'], power: 2000, quantity: 2, hours: 12 },
      ];
    default:
      return [
        { id: '1', ...COMMON_APPLIANCES['لمبة'], quantity: 4, hours: 8 },
        { id: '2', ...COMMON_APPLIANCES['مروحة'], quantity: 2, hours: 8 },
        { id: '3', ...COMMON_APPLIANCES['تلفزيون'], quantity: 1, hours: 6 },
        { id: '4', ...COMMON_APPLIANCES['ثلاجة'], quantity: 1, hours: 24 },
      ];
  }
};

// Calculations

export const calculateTotalConsumption = (appliances) => {
  // Returns total daily consumption in Watt-hours (Wh)
  return appliances.reduce((total, app) => {
    return total + (app.power * app.quantity * app.hours);
  }, 0);
};

export const calculateSystemSize = (dailyConsumptionWh, peakSunHours = 5, systemEfficiency = 0.8) => {
  // Required solar array size in Watts (W)
  if (dailyConsumptionWh === 0) return 0;
  return dailyConsumptionWh / (peakSunHours * systemEfficiency);
};

export const calculatePanelsNeeded = (systemSizeW, panelWattage = 500) => {
  if (systemSizeW === 0) return 0;
  return Math.ceil(systemSizeW / panelWattage);
};

export const calculateBatteryCapacity = (dailyConsumptionWh, daysOfAutonomy = 1, depthOfDischarge = 0.5, systemVoltage = 48) => {
  // Required battery capacity in Ampere-hours (Ah)
  if (dailyConsumptionWh === 0) return 0;
  return (dailyConsumptionWh * daysOfAutonomy) / (systemVoltage * depthOfDischarge);
};

export const calculateInverterSize = (appliances, safetyFactor = 1.25) => {
  // Total instantaneous power if all appliances run at once, multiplied by a safety factor
  const totalPower = appliances.reduce((total, app) => {
    return total + (app.power * app.quantity);
  }, 0);
  return totalPower * safetyFactor;
};
