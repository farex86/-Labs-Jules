export const facilityTypes = [
  {
    id: 'ice_factory',
    name: 'مصنع ثلج',
    appliances: [
      { id: 'ice_machine', name: 'آلة صنع الثلج', powerWatts: 5000, quantity: 1, hours: 24 },
      { id: 'freezer', name: 'مجمدات', powerWatts: 2000, quantity: 2, hours: 24 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 100, quantity: 10, hours: 12 },
    ]
  },
  {
    id: 'company',
    name: 'شركة',
    appliances: [
      { id: 'ac', name: 'مكيف', powerWatts: 1500, quantity: 4, hours: 8 },
      { id: 'computer', name: 'كمبيوتر', powerWatts: 250, quantity: 10, hours: 8 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 50, quantity: 20, hours: 10 },
      { id: 'printer', name: 'طابعة', powerWatts: 500, quantity: 1, hours: 2 },
    ]
  },
  {
    id: 'farm',
    name: 'مزرعة',
    appliances: [
      { id: 'water_pump', name: 'مضخة ماء', powerWatts: 2000, quantity: 1, hours: 6 },
      { id: 'lighting', name: 'إضاءة خارجية', powerWatts: 200, quantity: 5, hours: 12 },
    ]
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    appliances: [
      { id: 'heater', name: 'تدفئة', powerWatts: 3000, quantity: 2, hours: 12 },
      { id: 'fan', name: 'مروحة تهوية', powerWatts: 500, quantity: 4, hours: 24 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 100, quantity: 10, hours: 14 },
    ]
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    appliances: [
      { id: 'fan', name: 'مراوح تهوية', powerWatts: 500, quantity: 2, hours: 12 },
      { id: 'water_pump', name: 'مضخة ري', powerWatts: 1500, quantity: 1, hours: 4 },
      { id: 'lighting', name: 'إضاءة نمو', powerWatts: 1000, quantity: 2, hours: 8 },
    ]
  },
  {
    id: 'factory',
    name: 'مصنع',
    appliances: [
      { id: 'heavy_machinery', name: 'آلات ثقيلة', powerWatts: 10000, quantity: 2, hours: 8 },
      { id: 'lighting', name: 'إضاءة صناعية', powerWatts: 400, quantity: 20, hours: 10 },
      { id: 'cooling', name: 'تبريد وتكييف', powerWatts: 5000, quantity: 2, hours: 10 },
    ]
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    appliances: [
      { id: 'medical_equipment', name: 'أجهزة طبية', powerWatts: 2000, quantity: 2, hours: 8 },
      { id: 'fridge', name: 'ثلاجة أدوية', powerWatts: 300, quantity: 2, hours: 24 },
      { id: 'ac', name: 'مكيف', powerWatts: 1500, quantity: 3, hours: 10 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 50, quantity: 20, hours: 12 },
    ]
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    appliances: [
      { id: 'medical_equipment', name: 'أجهزة طبية', powerWatts: 5000, quantity: 5, hours: 24 },
      { id: 'ac', name: 'تكييف مركزي', powerWatts: 10000, quantity: 2, hours: 24 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 50, quantity: 100, hours: 24 },
      { id: 'fridge', name: 'ثلاجات', powerWatts: 500, quantity: 5, hours: 24 },
    ]
  },
  {
    id: 'bakery',
    name: 'مخبز',
    appliances: [
      { id: 'oven', name: 'فرن كهربائي', powerWatts: 8000, quantity: 2, hours: 12 },
      { id: 'mixer', name: 'عجانة', powerWatts: 3000, quantity: 1, hours: 6 },
      { id: 'fridge', name: 'ثلاجة عرض', powerWatts: 800, quantity: 1, hours: 24 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 100, quantity: 10, hours: 14 },
    ]
  },
  {
    id: 'grocery',
    name: 'دكان',
    appliances: [
      { id: 'fridge', name: 'ثلاجة', powerWatts: 500, quantity: 2, hours: 24 },
      { id: 'freezer', name: 'فريزر', powerWatts: 800, quantity: 1, hours: 24 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 50, quantity: 5, hours: 12 },
      { id: 'fan', name: 'مروحة', powerWatts: 100, quantity: 2, hours: 12 },
    ]
  },
  {
    id: 'workshop',
    name: 'ورشة',
    appliances: [
      { id: 'welding', name: 'ماكينة لحام', powerWatts: 5000, quantity: 1, hours: 4 },
      { id: 'drill', name: 'مثقاب', powerWatts: 800, quantity: 2, hours: 3 },
      { id: 'compressor', name: 'كمبروسر هواء', powerWatts: 2000, quantity: 1, hours: 5 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 100, quantity: 8, hours: 8 },
    ]
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    appliances: [
      { id: 'pump', name: 'مضخة مياه رئيسية', powerWatts: 3000, quantity: 1, hours: 12 },
    ]
  },
  {
    id: 'donkey',
    name: 'دونكي',
    appliances: [
      { id: 'pump', name: 'مضخة مياه جوفية', powerWatts: 5000, quantity: 1, hours: 10 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 100, quantity: 2, hours: 12 },
    ]
  },
  {
    id: 'mosque',
    name: 'مسجد',
    appliances: [
      { id: 'ac', name: 'مكيف', powerWatts: 2000, quantity: 4, hours: 6 },
      { id: 'fan', name: 'مروحة سقف', powerWatts: 100, quantity: 10, hours: 6 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 50, quantity: 20, hours: 4 },
      { id: 'sound', name: 'مكبر صوت', powerWatts: 300, quantity: 1, hours: 2 },
    ]
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    appliances: [
      { id: 'printer_large', name: 'آلة طباعة كبيرة', powerWatts: 5000, quantity: 1, hours: 8 },
      { id: 'printer_small', name: 'طابعة صغيرة', powerWatts: 1000, quantity: 2, hours: 8 },
      { id: 'computer', name: 'كمبيوتر', powerWatts: 300, quantity: 3, hours: 8 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 100, quantity: 15, hours: 10 },
    ]
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    appliances: [
      { id: 'espresso', name: 'آلة إسبريسو', powerWatts: 3000, quantity: 1, hours: 12 },
      { id: 'grinder', name: 'مطحنة قهوة', powerWatts: 500, quantity: 2, hours: 4 },
      { id: 'fridge', name: 'ثلاجة عرض', powerWatts: 800, quantity: 1, hours: 24 },
      { id: 'ac', name: 'مكيف', powerWatts: 1500, quantity: 2, hours: 14 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 50, quantity: 15, hours: 14 },
    ]
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    appliances: [
      { id: 'fridge', name: 'ثلاجة كبيرة', powerWatts: 1500, quantity: 2, hours: 24 },
      { id: 'freezer', name: 'فريزر', powerWatts: 2000, quantity: 1, hours: 24 },
      { id: 'ac', name: 'مكيف', powerWatts: 2000, quantity: 3, hours: 12 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 100, quantity: 20, hours: 12 },
      { id: 'exhaust', name: 'شفاط هواء', powerWatts: 1000, quantity: 1, hours: 12 },
    ]
  },
  {
    id: 'hotel',
    name: 'فندق',
    appliances: [
      { id: 'ac', name: 'مكيف', powerWatts: 1500, quantity: 20, hours: 12 },
      { id: 'tv', name: 'تلفزيون', powerWatts: 150, quantity: 20, hours: 6 },
      { id: 'fridge_small', name: 'ثلاجة صغيرة', powerWatts: 200, quantity: 20, hours: 24 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 50, quantity: 100, hours: 12 },
      { id: 'elevator', name: 'مصعد', powerWatts: 10000, quantity: 1, hours: 4 },
    ]
  },
  {
    id: 'bank',
    name: 'بنك',
    appliances: [
      { id: 'computer', name: 'كمبيوتر', powerWatts: 250, quantity: 15, hours: 10 },
      { id: 'ac', name: 'مكيف', powerWatts: 2000, quantity: 5, hours: 10 },
      { id: 'atm', name: 'صراف آلي', powerWatts: 500, quantity: 2, hours: 24 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 50, quantity: 40, hours: 12 },
    ]
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    appliances: [
      { id: 'fridge_display', name: 'ثلاجة عرض', powerWatts: 1000, quantity: 5, hours: 24 },
      { id: 'freezer', name: 'فريزر', powerWatts: 1500, quantity: 3, hours: 24 },
      { id: 'ac', name: 'مكيف', powerWatts: 2000, quantity: 4, hours: 16 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 100, quantity: 30, hours: 16 },
    ]
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    appliances: [
      { id: 'pump', name: 'مضخة وقود', powerWatts: 1000, quantity: 4, hours: 12 },
      { id: 'lighting_outdoor', name: 'إضاءة خارجية', powerWatts: 400, quantity: 6, hours: 12 },
      { id: 'fridge', name: 'ثلاجة متجر', powerWatts: 800, quantity: 2, hours: 24 },
    ]
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    appliances: [
      { id: 'heavy_machinery', name: 'معدات ثقيلة', powerWatts: 20000, quantity: 2, hours: 12 },
      { id: 'crusher', name: 'كسارة', powerWatts: 15000, quantity: 1, hours: 8 },
      { id: 'lighting', name: 'إضاءة', powerWatts: 1000, quantity: 10, hours: 12 },
    ]
  },
];

export const calculateConsumption = (appliances) => {
  return appliances.reduce((total, app) => {
    return total + (app.powerWatts * app.quantity * app.hours);
  }, 0); // returns total Wh per day
};

// Assuming 4.5 peak sun hours and 80% system efficiency
export const calculateSystemSize = (totalWhPerDay, peakSunHours = 4.5, efficiency = 0.8) => {
  if (!totalWhPerDay) return 0;
  const systemSizeWatts = totalWhPerDay / (peakSunHours * efficiency);
  return (systemSizeWatts / 1000).toFixed(2); // returns kW
};
