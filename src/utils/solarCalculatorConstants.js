export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع تلج' },
  { id: 'company', name: 'شركة' },
  { id: 'farm', name: 'مزرعة' },
  { id: 'poultry_farm', name: 'مزرعة دواجن' },
  { id: 'greenhouses', name: 'بيوت محمية' },
  { id: 'factory', name: 'مصنع' },
  { id: 'clinic', name: 'مستوصف' },
  { id: 'hospital', name: 'مستشفي' },
  { id: 'bakery', name: 'مخبز' },
  { id: 'shop', name: 'دكان' },
  { id: 'workshop', name: 'ورشة' },
  { id: 'water_pump', name: 'مضخة موية' },
  { id: 'donkey', name: 'دونكي' },
  { id: 'mosque', name: 'مسجد' },
  { id: 'printing_press', name: 'مطبعة' },
  { id: 'coffee_shop', name: 'كوفي شوب' },
  { id: 'restaurant', name: 'مطعم' },
  { id: 'hotel', name: 'فندق' },
  { id: 'bank', name: 'بنك' },
  { id: 'supermarket', name: 'سوبر ماركت' },
  { id: 'gas_station', name: 'طرمبة وقود' },
  { id: 'mining_company', name: 'شركة تعدين' }
];

export const DEFAULT_DEVICES = {
  ice_factory: [
    { id: 'if1', name: 'ماكينة تصنيع الثلج', power: 15000, qty: 2, hours: 24 },
    { id: 'if2', name: 'غرفة تبريد', power: 5000, qty: 1, hours: 24 },
    { id: 'if3', name: 'إضاءة', power: 100, qty: 10, hours: 12 },
  ],
  company: [
    { id: 'c1', name: 'مكيف هواء', power: 1500, qty: 5, hours: 8 },
    { id: 'c2', name: 'أجهزة كمبيوتر', power: 250, qty: 15, hours: 8 },
    { id: 'c3', name: 'إضاءة', power: 40, qty: 30, hours: 10 },
    { id: 'c4', name: 'طابعة', power: 500, qty: 2, hours: 2 },
  ],
  farm: [
    { id: 'fa1', name: 'مضخة مياه غاطسة', power: 7500, qty: 1, hours: 6 },
    { id: 'fa2', name: 'إضاءة', power: 100, qty: 5, hours: 12 },
  ],
  poultry_farm: [
    { id: 'pf1', name: 'مراوح تهوية', power: 1000, qty: 10, hours: 24 },
    { id: 'pf2', name: 'إضاءة', power: 60, qty: 20, hours: 16 },
    { id: 'pf3', name: 'نظام تدفئة', power: 3000, qty: 2, hours: 12 },
    { id: 'pf4', name: 'مضخة مياه', power: 1500, qty: 1, hours: 4 },
  ],
  greenhouses: [
    { id: 'gh1', name: 'مضخة ري', power: 2000, qty: 2, hours: 4 },
    { id: 'gh2', name: 'مراوح تبريد', power: 750, qty: 8, hours: 12 },
    { id: 'gh3', name: 'إضاءة', power: 50, qty: 10, hours: 8 },
  ],
  factory: [
    { id: 'f1', name: 'محركات صناعية', power: 20000, qty: 3, hours: 16 },
    { id: 'f2', name: 'إضاءة كشافة', power: 400, qty: 15, hours: 12 },
    { id: 'f3', name: 'معدات لحام', power: 5000, qty: 2, hours: 6 },
  ],
  clinic: [
    { id: 'cl1', name: 'مكيف هواء', power: 1500, qty: 4, hours: 12 },
    { id: 'cl2', name: 'إضاءة', power: 40, qty: 20, hours: 12 },
    { id: 'cl3', name: 'ثلاجة أدوية', power: 300, qty: 2, hours: 24 },
    { id: 'cl4', name: 'معدات طبية', power: 1000, qty: 3, hours: 6 },
  ],
  hospital: [
    { id: 'ho1', name: 'مكيف هواء مركزي', power: 15000, qty: 2, hours: 24 },
    { id: 'ho2', name: 'إضاءة', power: 40, qty: 100, hours: 24 },
    { id: 'ho3', name: 'أجهزة عناية مركزة', power: 2000, qty: 10, hours: 24 },
    { id: 'ho4', name: 'أشعة / رنين', power: 10000, qty: 2, hours: 8 },
  ],
  bakery: [
    { id: 'b1', name: 'فرن كهربائي', power: 12000, qty: 2, hours: 10 },
    { id: 'b2', name: 'عجانة', power: 3000, qty: 2, hours: 6 },
    { id: 'b3', name: 'إضاءة', power: 60, qty: 10, hours: 14 },
    { id: 'b4', name: 'ثلاجة عرض', power: 800, qty: 2, hours: 24 },
  ],
  shop: [
    { id: 'sh1', name: 'إضاءة', power: 40, qty: 4, hours: 12 },
    { id: 'sh2', name: 'مروحة سقف', power: 80, qty: 2, hours: 12 },
    { id: 'sh3', name: 'ثلاجة صغيرة', power: 200, qty: 1, hours: 24 },
  ],
  workshop: [
    { id: 'w1', name: 'ماكينة لحام', power: 4000, qty: 1, hours: 4 },
    { id: 'w2', name: 'صاروخ جلخ', power: 1200, qty: 2, hours: 3 },
    { id: 'w3', name: 'كمبروسر هواء', power: 3000, qty: 1, hours: 4 },
    { id: 'w4', name: 'إضاءة', power: 100, qty: 5, hours: 10 },
  ],
  water_pump: [
    { id: 'wp1', name: 'مضخة غاطسة', power: 11000, qty: 1, hours: 8 },
  ],
  donkey: [ // Assuming "دونكي" means a localized water station or similar setup
    { id: 'd1', name: 'مضخة مياه', power: 5500, qty: 1, hours: 6 },
  ],
  mosque: [
    { id: 'm1', name: 'مكيف هواء', power: 2000, qty: 6, hours: 4 },
    { id: 'm2', name: 'مراوح سقف', power: 80, qty: 20, hours: 6 },
    { id: 'm3', name: 'إضاءة', power: 40, qty: 30, hours: 4 },
    { id: 'm4', name: 'نظام صوت', power: 300, qty: 1, hours: 3 },
  ],
  printing_press: [
    { id: 'pp1', name: 'ماكينة طباعة', power: 8000, qty: 2, hours: 10 },
    { id: 'pp2', name: 'ماكينة قص ورق', power: 2000, qty: 1, hours: 4 },
    { id: 'pp3', name: 'مكيف هواء', power: 1500, qty: 2, hours: 10 },
    { id: 'pp4', name: 'إضاءة', power: 100, qty: 10, hours: 12 },
  ],
  coffee_shop: [
    { id: 'cs1', name: 'ماكينة اسبريسو', power: 3500, qty: 1, hours: 12 },
    { id: 'cs2', name: 'مطحنة قهوة', power: 500, qty: 2, hours: 4 },
    { id: 'cs3', name: 'مكيف هواء', power: 1500, qty: 2, hours: 14 },
    { id: 'cs4', name: 'ثلاجة عرض', power: 800, qty: 1, hours: 24 },
    { id: 'cs5', name: 'إضاءة ديكور', power: 200, qty: 1, hours: 14 },
  ],
  restaurant: [
    { id: 'r1', name: 'ثلاجة / فريزر', power: 1200, qty: 4, hours: 24 },
    { id: 'r2', name: 'مكيف هواء', power: 2000, qty: 4, hours: 14 },
    { id: 'r3', name: 'إضاءة', power: 100, qty: 20, hours: 14 },
    { id: 'r4', name: 'معدات مطبخ كهربائية', power: 5000, qty: 2, hours: 8 },
  ],
  hotel: [
    { id: 'ht1', name: 'مكيف هواء غرف', power: 1200, qty: 50, hours: 12 },
    { id: 'ht2', name: 'إضاءة', power: 40, qty: 200, hours: 10 },
    { id: 'ht3', name: 'ثلاجات ميني بار', power: 100, qty: 50, hours: 24 },
    { id: 'ht4', name: 'مصاعد', power: 15000, qty: 2, hours: 4 },
  ],
  bank: [
    { id: 'bk1', name: 'مكيف هواء', power: 1500, qty: 10, hours: 10 },
    { id: 'bk2', name: 'أجهزة كمبيوتر', power: 250, qty: 30, hours: 10 },
    { id: 'bk3', name: 'صراف آلي (ATM)', power: 500, qty: 4, hours: 24 },
    { id: 'bk4', name: 'إضاءة', power: 40, qty: 50, hours: 12 },
  ],
  supermarket: [
    { id: 'sm1', name: 'ثلاجات عرض', power: 1500, qty: 10, hours: 24 },
    { id: 'sm2', name: 'فريزر', power: 2000, qty: 5, hours: 24 },
    { id: 'sm3', name: 'مكيف هواء', power: 3000, qty: 4, hours: 16 },
    { id: 'sm4', name: 'إضاءة', power: 100, qty: 40, hours: 16 },
  ],
  gas_station: [
    { id: 'gs1', name: 'طلمبات وقود', power: 1500, qty: 6, hours: 10 },
    { id: 'gs2', name: 'إضاءة كشافة', power: 400, qty: 10, hours: 12 },
    { id: 'gs3', name: 'ثلاجات متجر', power: 800, qty: 3, hours: 24 },
  ],
  mining_company: [
    { id: 'mc1', name: 'طواحين ومعدات ثقيلة', power: 50000, qty: 2, hours: 16 },
    { id: 'mc2', name: 'مضخات مياه', power: 15000, qty: 3, hours: 12 },
    { id: 'mc3', name: 'إضاءة معسكر', power: 1000, qty: 5, hours: 12 },
    { id: 'mc4', name: 'مكيفات سكن عمال', power: 1500, qty: 20, hours: 8 },
  ]
};
