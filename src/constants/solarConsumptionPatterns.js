export const CONSUMPTION_PATTERNS = [
  {
    id: "ice_factory",
    name: "مصنع تلج",
    devices: [
      { id: 1, name: "ماكينة تبريد", power: 5000, quantity: 2, hours: 24 },
      { id: 2, name: "مضخة مياه", power: 1500, quantity: 1, hours: 24 },
      { id: 3, name: "إضاءة", power: 50, quantity: 20, hours: 12 },
    ]
  },
  {
    id: "company",
    name: "شركة",
    devices: [
      { id: 1, name: "مكيف هواء", power: 1500, quantity: 4, hours: 8 },
      { id: 2, name: "حاسب آلي", power: 250, quantity: 10, hours: 8 },
      { id: 3, name: "إضاءة", power: 40, quantity: 30, hours: 10 },
      { id: 4, name: "ماكينة تصوير", power: 1200, quantity: 1, hours: 4 },
      { id: 5, name: "ثلاجة صغيرة", power: 150, quantity: 2, hours: 24 },
    ]
  },
  {
    id: "farm",
    name: "مزرعة",
    devices: [
      { id: 1, name: "مضخة غاطسة", power: 3000, quantity: 1, hours: 6 },
      { id: 2, name: "إضاءة خارجية", power: 100, quantity: 10, hours: 12 },
      { id: 3, name: "مروحة", power: 75, quantity: 4, hours: 12 },
    ]
  },
  {
    id: "poultry_farm",
    name: "مزرعة دواجن",
    devices: [
      { id: 1, name: "مروحة تهوية", power: 370, quantity: 6, hours: 24 },
      { id: 2, name: "نظام تبريد", power: 1500, quantity: 2, hours: 12 },
      { id: 3, name: "إضاءة", power: 20, quantity: 50, hours: 16 },
      { id: 4, name: "محرك تغذية", power: 750, quantity: 2, hours: 4 },
    ]
  },
  {
    id: "greenhouse",
    name: "بيوت محمية",
    devices: [
      { id: 1, name: "مروحة تهوية", power: 370, quantity: 4, hours: 12 },
      { id: 2, name: "مضخة مياه", power: 1100, quantity: 1, hours: 4 },
      { id: 3, name: "نظام تحكم", power: 100, quantity: 1, hours: 24 },
    ]
  },
  {
    id: "factory",
    name: "مصنع",
    devices: [
      { id: 1, name: "محركات كهربائية", power: 7500, quantity: 3, hours: 8 },
      { id: 2, name: "إضاءة صناعية", power: 150, quantity: 40, hours: 10 },
      { id: 3, name: "مكيف هواء مركزي", power: 5000, quantity: 2, hours: 10 },
    ]
  },
  {
    id: "clinic",
    name: "مستوصف",
    devices: [
      { id: 1, name: "مكيف هواء", power: 1500, quantity: 5, hours: 12 },
      { id: 2, name: "إضاءة", power: 40, quantity: 40, hours: 14 },
      { id: 3, name: "ثلاجة أدوية", power: 300, quantity: 2, hours: 24 },
      { id: 4, name: "أجهزة طبية صغيرة", power: 500, quantity: 4, hours: 6 },
    ]
  },
  {
    id: "hospital",
    name: "مستشفي",
    devices: [
      { id: 1, name: "مكيف هواء", power: 2000, quantity: 20, hours: 24 },
      { id: 2, name: "إضاءة", power: 40, quantity: 200, hours: 24 },
      { id: 3, name: "أشعة مقطعية/سينية", power: 10000, quantity: 2, hours: 4 },
      { id: 4, name: "أجهزة عناية مركزة", power: 1000, quantity: 10, hours: 24 },
      { id: 5, name: "ثلاجة بنك دم", power: 500, quantity: 2, hours: 24 },
    ]
  },
  {
    id: "bakery",
    name: "مخبز",
    devices: [
      { id: 1, name: "عجانة", power: 2200, quantity: 2, hours: 6 },
      { id: 2, name: "فرن كهربائي (اختياري)", power: 5000, quantity: 1, hours: 8 },
      { id: 3, name: "إضاءة", power: 40, quantity: 15, hours: 12 },
      { id: 4, name: "مروحة شفط", power: 300, quantity: 2, hours: 10 },
    ]
  },
  {
    id: "shop",
    name: "دكان",
    devices: [
      { id: 1, name: "ثلاجة عرض", power: 800, quantity: 2, hours: 24 },
      { id: 2, name: "مكيف هواء", power: 1500, quantity: 1, hours: 12 },
      { id: 3, name: "إضاءة", power: 40, quantity: 8, hours: 12 },
      { id: 4, name: "مروحة سقف", power: 75, quantity: 2, hours: 12 },
    ]
  },
  {
    id: "workshop",
    name: "ورشة",
    devices: [
      { id: 1, name: "ماكينة لحام", power: 4000, quantity: 1, hours: 4 },
      { id: 2, name: "صاروخ تقطيع", power: 2000, quantity: 2, hours: 3 },
      { id: 3, name: "كمبروسر هواء", power: 2200, quantity: 1, hours: 4 },
      { id: 4, name: "إضاءة كاشفة", power: 100, quantity: 6, hours: 8 },
    ]
  },
  {
    id: "water_pump",
    name: "مضخة موية",
    devices: [
      { id: 1, name: "مضخة غاطسة / سطحية", power: 4000, quantity: 1, hours: 8 },
      { id: 2, name: "نظام تحكم وحماية", power: 100, quantity: 1, hours: 8 },
    ]
  },
  {
    id: "donkey_engine",
    name: "دونكي",
    devices: [
      { id: 1, name: "محرك ضخ", power: 3000, quantity: 1, hours: 10 },
      { id: 2, name: "إضاءة", power: 50, quantity: 2, hours: 12 },
    ]
  },
  {
    id: "mosque",
    name: "مسجد",
    devices: [
      { id: 1, name: "مكيف هواء", power: 2000, quantity: 4, hours: 6 },
      { id: 2, name: "مراوح سقف", power: 75, quantity: 15, hours: 6 },
      { id: 3, name: "إضاءة", power: 40, quantity: 30, hours: 6 },
      { id: 4, name: "مكبرات صوت", power: 200, quantity: 1, hours: 2 },
    ]
  },
  {
    id: "printing_press",
    name: "مطبعة",
    devices: [
      { id: 1, name: "ماكينة طباعة", power: 3500, quantity: 2, hours: 8 },
      { id: 2, name: "ماكينة قص ورقة", power: 1500, quantity: 1, hours: 4 },
      { id: 3, name: "حاسب آلي", power: 250, quantity: 3, hours: 8 },
      { id: 4, name: "مكيف هواء", power: 2000, quantity: 2, hours: 8 },
      { id: 5, name: "إضاءة", power: 40, quantity: 20, hours: 10 },
    ]
  },
  {
    id: "coffee_shop",
    name: "كوفي شوب",
    devices: [
      { id: 1, name: "ماكينة اسبريسو", power: 3000, quantity: 1, hours: 12 },
      { id: 2, name: "مطحنة قهوة", power: 350, quantity: 2, hours: 4 },
      { id: 3, name: "ثلاجة عرض", power: 800, quantity: 1, hours: 24 },
      { id: 4, name: "مكيف هواء", power: 2000, quantity: 2, hours: 14 },
      { id: 5, name: "إضاءة", power: 40, quantity: 20, hours: 14 },
      { id: 6, name: "مايكروويف", power: 1200, quantity: 1, hours: 2 },
    ]
  },
  {
    id: "restaurant",
    name: "مطعم",
    devices: [
      { id: 1, name: "مكيف هواء", power: 2000, quantity: 4, hours: 14 },
      { id: 2, name: "ثلاجة كبيرة", power: 1200, quantity: 3, hours: 24 },
      { id: 3, name: "فريزر", power: 1000, quantity: 2, hours: 24 },
      { id: 4, name: "شفاط هواء كبير", power: 1500, quantity: 1, hours: 12 },
      { id: 5, name: "إضاءة", power: 40, quantity: 40, hours: 14 },
    ]
  },
  {
    id: "hotel",
    name: "فندق",
    devices: [
      { id: 1, name: "مكيف هواء (غرف)", power: 1500, quantity: 30, hours: 16 },
      { id: 2, name: "تلفزيون", power: 100, quantity: 30, hours: 8 },
      { id: 3, name: "ثلاجة صغيرة", power: 100, quantity: 30, hours: 24 },
      { id: 4, name: "إضاءة عامة", power: 40, quantity: 100, hours: 24 },
      { id: 5, name: "مضخة مياه", power: 2200, quantity: 2, hours: 8 },
      { id: 6, name: "مصعد", power: 5000, quantity: 1, hours: 4 },
    ]
  },
  {
    id: "bank",
    name: "بنك",
    devices: [
      { id: 1, name: "مكيف هواء", power: 2000, quantity: 6, hours: 10 },
      { id: 2, name: "حاسب آلي", power: 250, quantity: 20, hours: 9 },
      { id: 3, name: "صراف آلي (ATM)", power: 500, quantity: 2, hours: 24 },
      { id: 4, name: "إضاءة", power: 40, quantity: 50, hours: 10 },
      { id: 5, name: "سيرفرات ونظام أمني", power: 1500, quantity: 1, hours: 24 },
    ]
  },
  {
    id: "supermarket",
    name: "سوبر ماركت",
    devices: [
      { id: 1, name: "ثلاجة عرض كبيرة", power: 2000, quantity: 4, hours: 24 },
      { id: 2, name: "فريزر عرض", power: 1500, quantity: 3, hours: 24 },
      { id: 3, name: "مكيف هواء", power: 2500, quantity: 4, hours: 16 },
      { id: 4, name: "إضاءة", power: 40, quantity: 60, hours: 16 },
      { id: 5, name: "نقاط بيع (كاشير)", power: 150, quantity: 4, hours: 16 },
    ]
  },
  {
    id: "gas_station",
    name: "طرمبة وقود",
    devices: [
      { id: 1, name: "مضخة وقود", power: 1100, quantity: 4, hours: 10 },
      { id: 2, name: "إضاءة كاشفة (مظلة)", power: 150, quantity: 10, hours: 12 },
      { id: 3, name: "مكيف هواء (مكتب)", power: 1500, quantity: 1, hours: 24 },
      { id: 4, name: "كمبروسر هواء", power: 2200, quantity: 1, hours: 6 },
    ]
  },
  {
    id: "mining_company",
    name: "شركة تعدين",
    devices: [
      { id: 1, name: "معدات ثقيلة (كهربائية)", power: 15000, quantity: 2, hours: 12 },
      { id: 2, name: "مضخة مياه عملاقة", power: 7500, quantity: 2, hours: 12 },
      { id: 3, name: "إضاءة كاشفة قوية", power: 400, quantity: 20, hours: 12 },
      { id: 4, name: "مكيفات هواء للكامبات", power: 2000, quantity: 10, hours: 12 },
      { id: 5, name: "ورشة صيانة", power: 5000, quantity: 1, hours: 8 },
    ]
  }
];
