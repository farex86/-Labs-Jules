/**
 * Constants and business logic for the Solar Calculator
 * All data is localized in Arabic.
 */

export const FACILITY_TYPES = [
  { id: 'ice_factory', label: 'مصنع ثلج', icon: 'snow' },
  { id: 'company', label: 'شركة', icon: 'building' },
  { id: 'farm', label: 'مزرعة', icon: 'tractor' },
  { id: 'poultry_farm', label: 'مزرعة دواجن', icon: 'bird' },
  { id: 'greenhouse', label: 'بيوت محمية', icon: 'plant' },
  { id: 'factory', label: 'مصنع', icon: 'factory' },
  { id: 'clinic', label: 'مستوصف', icon: 'stethoscope' },
  { id: 'hospital', label: 'مستشفى', icon: 'hospital' },
  { id: 'bakery', label: 'مخبز', icon: 'croissant' },
  { id: 'shop', label: 'دكان', icon: 'store' },
  { id: 'workshop', label: 'ورشة', icon: 'wrench' },
  { id: 'water_pump', label: 'مضخة مياه', icon: 'droplet' },
  { id: 'donkey', label: 'دونكي (محطة مياه)', icon: 'droplets' }, // Donkey in this context usually refers to a water station/pump setup in rural areas
  { id: 'mosque', label: 'مسجد', icon: 'moon' },
  { id: 'printing_press', label: 'مطبعة', icon: 'printer' },
  { id: 'coffee_shop', label: 'مقهى (كوفي شوب)', icon: 'coffee' },
  { id: 'restaurant', label: 'مطعم', icon: 'utensils' },
  { id: 'hotel', label: 'فندق', icon: 'hotel' },
  { id: 'bank', label: 'بنك', icon: 'landmark' },
  { id: 'supermarket', label: 'سوبر ماركت', icon: 'shopping-cart' },
  { id: 'gas_station', label: 'طرمبة وقود (محطة وقود)', icon: 'fuel' },
  { id: 'mining_company', label: 'شركة تعدين', icon: 'pickaxe' }
];

// Typical appliances with default watts and usage hours per day
export const APPLIANCES_BY_FACILITY = {
  ice_factory: [
    { id: 'ice_machine', name: 'ماكينة ثلج كبيرة', defaultWatts: 5000, defaultHours: 12, defaultQty: 2 },
    { id: 'freezer_room', name: 'غرفة تبريد/فريزر', defaultWatts: 3000, defaultHours: 24, defaultQty: 1 },
    { id: 'lighting', name: 'إضاءة', defaultWatts: 20, defaultHours: 12, defaultQty: 10 },
  ],
  company: [
    { id: 'ac', name: 'مكيف', defaultWatts: 1500, defaultHours: 8, defaultQty: 4 },
    { id: 'computer', name: 'كمبيوتر', defaultWatts: 200, defaultHours: 8, defaultQty: 10 },
    { id: 'printer', name: 'طابعة', defaultWatts: 500, defaultHours: 2, defaultQty: 2 },
    { id: 'lighting', name: 'إضاءة', defaultWatts: 20, defaultHours: 10, defaultQty: 20 },
    { id: 'fridge', name: 'ثلاجة', defaultWatts: 150, defaultHours: 24, defaultQty: 1 },
  ],
  farm: [
    { id: 'submersible_pump', name: 'غاطس (مضخة مياه)', defaultWatts: 2200, defaultHours: 6, defaultQty: 1 }, // ~3HP
    { id: 'lighting', name: 'إضاءة كشافات', defaultWatts: 100, defaultHours: 10, defaultQty: 5 },
    { id: 'guard_room', name: 'غرفة الحارس (تلفزيون + مروحة)', defaultWatts: 150, defaultHours: 8, defaultQty: 1 },
  ],
  poultry_farm: [
    { id: 'exhaust_fan', name: 'مروحة شفط', defaultWatts: 500, defaultHours: 18, defaultQty: 6 },
    { id: 'cooling_pad', name: 'خلايا تبريد (مضخة)', defaultWatts: 370, defaultHours: 12, defaultQty: 2 }, // ~0.5HP
    { id: 'lighting', name: 'إضاءة حظائر', defaultWatts: 40, defaultHours: 16, defaultQty: 20 },
    { id: 'heater', name: 'دفاية (شتاء)', defaultWatts: 2000, defaultHours: 12, defaultQty: 2 },
  ],
  greenhouse: [
    { id: 'exhaust_fan', name: 'مروحة شفط', defaultWatts: 370, defaultHours: 12, defaultQty: 4 },
    { id: 'water_pump', name: 'مضخة ري', defaultWatts: 750, defaultHours: 4, defaultQty: 1 }, // 1HP
    { id: 'cooling_pump', name: 'مضخة تبريد', defaultWatts: 370, defaultHours: 10, defaultQty: 2 },
  ],
  factory: [
    { id: 'heavy_machinery', name: 'ماكينات إنتاج', defaultWatts: 10000, defaultHours: 8, defaultQty: 2 },
    { id: 'conveyor', name: 'سير ناقل', defaultWatts: 2200, defaultHours: 8, defaultQty: 1 },
    { id: 'lighting', name: 'إضاءة قوية', defaultWatts: 150, defaultHours: 12, defaultQty: 20 },
  ],
  clinic: [
    { id: 'ac', name: 'مكيف', defaultWatts: 1500, defaultHours: 10, defaultQty: 3 },
    { id: 'medical_equipment', name: 'أجهزة طبية (سونار/أسنان)', defaultWatts: 1000, defaultHours: 6, defaultQty: 2 },
    { id: 'lab_fridge', name: 'ثلاجة مختبر', defaultWatts: 200, defaultHours: 24, defaultQty: 1 },
    { id: 'lighting', name: 'إضاءة', defaultWatts: 20, defaultHours: 12, defaultQty: 15 },
  ],
  hospital: [
    { id: 'ac_central', name: 'تكييف مركزي (أو مكيفات)', defaultWatts: 5000, defaultHours: 24, defaultQty: 5 },
    { id: 'icu_equipment', name: 'أجهزة عناية مركزة', defaultWatts: 2000, defaultHours: 24, defaultQty: 3 },
    { id: 'xray', name: 'جهاز أشعة', defaultWatts: 5000, defaultHours: 4, defaultQty: 1 },
    { id: 'lighting', name: 'إضاءة', defaultWatts: 20, defaultHours: 24, defaultQty: 50 },
    { id: 'elevator', name: 'مصعد', defaultWatts: 7500, defaultHours: 10, defaultQty: 1 },
  ],
  bakery: [
    { id: 'mixer', name: 'عجانة', defaultWatts: 2200, defaultHours: 6, defaultQty: 1 },
    { id: 'electric_oven', name: 'فرن كهربائي', defaultWatts: 5000, defaultHours: 8, defaultQty: 1 },
    { id: 'proofer', name: 'مخمرة', defaultWatts: 1500, defaultHours: 8, defaultQty: 1 },
    { id: 'lighting', name: 'إضاءة', defaultWatts: 20, defaultHours: 12, defaultQty: 10 },
  ],
  shop: [
    { id: 'fridge', name: 'ثلاجة عرض', defaultWatts: 400, defaultHours: 24, defaultQty: 2 },
    { id: 'chest_freezer', name: 'ديب فريزر', defaultWatts: 300, defaultHours: 24, defaultQty: 1 },
    { id: 'fan', name: 'مروحة سقف', defaultWatts: 70, defaultHours: 12, defaultQty: 2 },
    { id: 'lighting', name: 'إضاءة', defaultWatts: 20, defaultHours: 12, defaultQty: 4 },
  ],
  workshop: [
    { id: 'welding_machine', name: 'ماكينة لحام', defaultWatts: 4000, defaultHours: 4, defaultQty: 1 },
    { id: 'grinder', name: 'صاروخ / جلخ', defaultWatts: 1000, defaultHours: 4, defaultQty: 2 },
    { id: 'air_compressor', name: 'كمبروسر هواء', defaultWatts: 2200, defaultHours: 4, defaultQty: 1 },
    { id: 'lighting', name: 'إضاءة', defaultWatts: 50, defaultHours: 10, defaultQty: 6 },
  ],
  water_pump: [
    { id: 'pump_large', name: 'مضخة مياه كبيرة (3-5 حصان)', defaultWatts: 3000, defaultHours: 8, defaultQty: 1 },
  ],
  donkey: [
    { id: 'submersible_pump', name: 'مضخة غاطس لبئر', defaultWatts: 2200, defaultHours: 8, defaultQty: 1 },
    { id: 'lighting', name: 'إضاءة ليلية', defaultWatts: 50, defaultHours: 12, defaultQty: 2 },
  ],
  mosque: [
    { id: 'ac', name: 'مكيف', defaultWatts: 1500, defaultHours: 5, defaultQty: 4 }, // Used mostly during prayer times
    { id: 'fans', name: 'مراوح سقف', defaultWatts: 70, defaultHours: 6, defaultQty: 10 },
    { id: 'sound_system', name: 'مكبرات صوت', defaultWatts: 200, defaultHours: 2, defaultQty: 1 },
    { id: 'lighting', name: 'إضاءة', defaultWatts: 20, defaultHours: 6, defaultQty: 20 },
  ],
  printing_press: [
    { id: 'offset_printer', name: 'ماكينة طباعة أوفست', defaultWatts: 5000, defaultHours: 8, defaultQty: 1 },
    { id: 'digital_printer', name: 'طابعة ديجيتال', defaultWatts: 1500, defaultHours: 8, defaultQty: 2 },
    { id: 'cutting_machine', name: 'مقص ورق', defaultWatts: 1500, defaultHours: 4, defaultQty: 1 },
    { id: 'ac', name: 'مكيف', defaultWatts: 1500, defaultHours: 8, defaultQty: 2 },
    { id: 'lighting', name: 'إضاءة', defaultWatts: 40, defaultHours: 10, defaultQty: 10 },
  ],
  coffee_shop: [
    { id: 'espresso_machine', name: 'ماكينة اسبريسو', defaultWatts: 3500, defaultHours: 10, defaultQty: 1 },
    { id: 'grinder', name: 'مطحنة بن', defaultWatts: 350, defaultHours: 4, defaultQty: 2 },
    { id: 'ice_maker', name: 'صانعة ثلج', defaultWatts: 500, defaultHours: 24, defaultQty: 1 },
    { id: 'fridge', name: 'ثلاجة عرض', defaultWatts: 400, defaultHours: 24, defaultQty: 1 },
    { id: 'blender', name: 'خلاط', defaultWatts: 1500, defaultHours: 2, defaultQty: 2 },
    { id: 'ac', name: 'مكيف', defaultWatts: 1500, defaultHours: 12, defaultQty: 2 },
    { id: 'lighting', name: 'إضاءة ديكور', defaultWatts: 20, defaultHours: 12, defaultQty: 20 },
  ],
  restaurant: [
    { id: 'commercial_fridge', name: 'ثلاجة تجارية', defaultWatts: 800, defaultHours: 24, defaultQty: 2 },
    { id: 'freezer', name: 'ديب فريزر', defaultWatts: 600, defaultHours: 24, defaultQty: 2 },
    { id: 'exhaust_hood', name: 'شفاط مطبخ', defaultWatts: 1000, defaultHours: 12, defaultQty: 1 },
    { id: 'ac', name: 'مكيف (صالة)', defaultWatts: 2000, defaultHours: 12, defaultQty: 3 },
    { id: 'lighting', name: 'إضاءة', defaultWatts: 20, defaultHours: 14, defaultQty: 30 },
  ],
  hotel: [
    { id: 'ac_rooms', name: 'مكيفات غرف', defaultWatts: 1500, defaultHours: 12, defaultQty: 20 }, // Assuming small-medium hotel
    { id: 'fridge_minibar', name: 'ثلاجات غرف صغيرة', defaultWatts: 80, defaultHours: 24, defaultQty: 20 },
    { id: 'elevator', name: 'مصعد', defaultWatts: 7500, defaultHours: 10, defaultQty: 1 },
    { id: 'water_heater', name: 'سخانات مياه', defaultWatts: 1500, defaultHours: 4, defaultQty: 20 },
    { id: 'lighting_rooms', name: 'إضاءة الغرف والممرات', defaultWatts: 20, defaultHours: 12, defaultQty: 100 },
  ],
  bank: [
    { id: 'ac_central', name: 'تكييف', defaultWatts: 2000, defaultHours: 10, defaultQty: 5 },
    { id: 'computers', name: 'أجهزة كمبيوتر', defaultWatts: 200, defaultHours: 10, defaultQty: 15 },
    { id: 'servers', name: 'سيرفرات (غرفة IT)', defaultWatts: 1000, defaultHours: 24, defaultQty: 2 },
    { id: 'atm', name: 'صراف آلي (ATM)', defaultWatts: 300, defaultHours: 24, defaultQty: 2 },
    { id: 'lighting', name: 'إضاءة', defaultWatts: 20, defaultHours: 12, defaultQty: 40 },
  ],
  supermarket: [
    { id: 'display_fridge', name: 'ثلاجات عرض منتجات', defaultWatts: 1000, defaultHours: 24, defaultQty: 4 },
    { id: 'chest_freezer', name: 'فريزر لحوم/آيس كريم', defaultWatts: 600, defaultHours: 24, defaultQty: 3 },
    { id: 'ac', name: 'مكيف', defaultWatts: 2000, defaultHours: 14, defaultQty: 4 },
    { id: 'lighting', name: 'إضاءة', defaultWatts: 40, defaultHours: 16, defaultQty: 30 },
    { id: 'pos', name: 'نقاط بيع (كاشير)', defaultWatts: 100, defaultHours: 14, defaultQty: 3 },
  ],
  gas_station: [
    { id: 'fuel_pump', name: 'ماكينة تعبئة وقود', defaultWatts: 750, defaultHours: 16, defaultQty: 4 },
    { id: 'canopy_lighting', name: 'إضاءة مظلة (كشافات)', defaultWatts: 150, defaultHours: 12, defaultQty: 10 },
    { id: 'office_ac', name: 'مكيف الإدارة', defaultWatts: 1500, defaultHours: 12, defaultQty: 1 },
    { id: 'shop_fridge', name: 'ثلاجة البقالة', defaultWatts: 400, defaultHours: 24, defaultQty: 2 },
  ],
  mining_company: [
    { id: 'rock_crusher', name: 'طاحونة صخور / كسارة', defaultWatts: 7500, defaultHours: 10, defaultQty: 1 },
    { id: 'water_pump', name: 'مضخة مياه غسيل', defaultWatts: 3000, defaultHours: 8, defaultQty: 1 },
    { id: 'air_compressor', name: 'كمبروسر هواء ضخم', defaultWatts: 5000, defaultHours: 10, defaultQty: 1 },
    { id: 'camp_lighting', name: 'إضاءة سكن العمال والموقع', defaultWatts: 100, defaultHours: 12, defaultQty: 20 },
    { id: 'camp_fans', name: 'مراوح/مكيفات سكن', defaultWatts: 200, defaultHours: 12, defaultQty: 10 },
  ]
};

/**
 * Calculates the required solar system size based on a list of appliances.
 *
 * @param {Array} appliances List of appliance objects { qty, watts, hours }
 * @returns {Object} { totalDailyWh, panelsKW, inverterKW, batteryKWh }
 */
export function calculateSystemSize(appliances) {
  let totalWatts = 0; // Peak power requirement (all on at same time, rough estimate)
  let totalDailyWh = 0; // Total energy required per day

  appliances.forEach(app => {
    const qty = parseInt(app.qty) || 0;
    const watts = parseFloat(app.watts) || 0;
    const hours = parseFloat(app.hours) || 0;

    totalWatts += qty * watts;
    totalDailyWh += qty * watts * hours;
  });

  // Assumptions & Safety Factors:
  // 1. Inverter Safety Factor: 1.25 (25% extra capacity for surges)
  const inverterWatts = totalWatts * 1.25;
  const inverterKW = (inverterWatts / 1000).toFixed(1);

  // 2. Solar Panel generation: Assuming 5 peak sun hours (average for sunny regions like Sudan/Middle East)
  // System loss factor (wiring, dust, heat): 1.3 (meaning we need 30% more generation)
  const requiredGenerationWh = totalDailyWh * 1.3;
  const panelsWatts = requiredGenerationWh / 5; // 5 hours of peak sun
  const panelsKW = (panelsWatts / 1000).toFixed(1);

  // 3. Battery Storage: Assuming 1 day of autonomy, Depth of Discharge (DoD) for Lithium = 80% (0.8)
  // If Lead Acid, DoD would be ~50%, but standard modern systems use Lithium/Gel.
  // We'll assume a mix, using 0.8 as a standard good battery.
  // Actually, let's just output raw kWh needed and a recommended battery bank size.
  const requiredBatteryWh = totalDailyWh / 0.8;
  const batteryKWh = (requiredBatteryWh / 1000).toFixed(1);

  return {
    totalWatts,
    totalDailyWh,
    panelsKW: parseFloat(panelsKW),
    inverterKW: parseFloat(inverterKW),
    batteryKWh: parseFloat(batteryKWh)
  };
}
