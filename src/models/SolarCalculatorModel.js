export const facilityTypes = [
  {
    id: "ice_factory",
    name: "مصنع تلج",
    devices: [
      { id: "1", name: "ماكينة صنع ثلج", quantity: 2, powerW: 15000, hoursPerDay: 24 },
      { id: "2", name: "غرفة تبريد", quantity: 1, powerW: 5000, hoursPerDay: 24 },
      { id: "3", name: "إضاءة", quantity: 10, powerW: 50, hoursPerDay: 12 },
    ]
  },
  {
    id: "company",
    name: "شركة",
    devices: [
      { id: "1", name: "أجهزة كمبيوتر", quantity: 20, powerW: 250, hoursPerDay: 10 },
      { id: "2", name: "مكيفات هواء", quantity: 5, powerW: 2000, hoursPerDay: 10 },
      { id: "3", name: "إضاءة", quantity: 30, powerW: 40, hoursPerDay: 10 },
      { id: "4", name: "طابعة/آلة تصوير", quantity: 2, powerW: 500, hoursPerDay: 4 },
    ]
  },
  {
    id: "farm",
    name: "مزرعة",
    devices: [
      { id: "1", name: "مضخة مياه صغيرة", quantity: 1, powerW: 3000, hoursPerDay: 6 },
      { id: "2", name: "إضاءة خارجية", quantity: 10, powerW: 100, hoursPerDay: 12 },
      { id: "3", name: "سكن عمال (أجهزة متنوعة)", quantity: 1, powerW: 2000, hoursPerDay: 8 },
    ]
  },
  {
    id: "poultry_farm",
    name: "مزرعة دواجن",
    devices: [
      { id: "1", name: "مراوح تهوية", quantity: 10, powerW: 750, hoursPerDay: 24 },
      { id: "2", name: "أنظمة تدفئة", quantity: 5, powerW: 2000, hoursPerDay: 12 },
      { id: "3", name: "إضاءة", quantity: 40, powerW: 20, hoursPerDay: 16 },
      { id: "4", name: "معالف ومساقي آلية", quantity: 4, powerW: 500, hoursPerDay: 8 },
    ]
  },
  {
    id: "greenhouses",
    name: "بيوت محمية",
    devices: [
      { id: "1", name: "مراوح تبريد", quantity: 4, powerW: 1000, hoursPerDay: 12 },
      { id: "2", name: "مضخة ري", quantity: 1, powerW: 1500, hoursPerDay: 4 },
      { id: "3", name: "إضاءة زراعية", quantity: 20, powerW: 100, hoursPerDay: 8 },
    ]
  },
  {
    id: "factory",
    name: "مصنع",
    devices: [
      { id: "1", name: "آلات إنتاج رئيسية", quantity: 3, powerW: 10000, hoursPerDay: 16 },
      { id: "2", name: "سيور ناقلة", quantity: 2, powerW: 3000, hoursPerDay: 16 },
      { id: "3", name: "إضاءة صناعية", quantity: 50, powerW: 100, hoursPerDay: 16 },
    ]
  },
  {
    id: "clinic",
    name: "مستوصف",
    devices: [
      { id: "1", name: "مكيفات هواء", quantity: 6, powerW: 1500, hoursPerDay: 12 },
      { id: "2", name: "أجهزة طبية صغيرة", quantity: 5, powerW: 500, hoursPerDay: 8 },
      { id: "3", name: "ثلاجة أدوية", quantity: 2, powerW: 300, hoursPerDay: 24 },
      { id: "4", name: "إضاءة", quantity: 20, powerW: 40, hoursPerDay: 12 },
    ]
  },
  {
    id: "hospital",
    name: "مستشفي",
    devices: [
      { id: "1", name: "مكيفات هواء مركزية", quantity: 1, powerW: 50000, hoursPerDay: 24 },
      { id: "2", name: "أجهزة أشعة", quantity: 2, powerW: 10000, hoursPerDay: 8 },
      { id: "3", name: "أجهزة عناية مركزة", quantity: 10, powerW: 1000, hoursPerDay: 24 },
      { id: "4", name: "إضاءة", quantity: 200, powerW: 40, hoursPerDay: 24 },
    ]
  },
  {
    id: "bakery",
    name: "مخبز",
    devices: [
      { id: "1", name: "فرن كهربائي", quantity: 2, powerW: 15000, hoursPerDay: 12 },
      { id: "2", name: "عجانة", quantity: 2, powerW: 3000, hoursPerDay: 8 },
      { id: "3", name: "ثلاجات عرض", quantity: 3, powerW: 800, hoursPerDay: 24 },
    ]
  },
  {
    id: "shop",
    name: "دكان",
    devices: [
      { id: "1", name: "ثلاجة مشروبات", quantity: 2, powerW: 400, hoursPerDay: 24 },
      { id: "2", name: "مكيف هواء", quantity: 1, powerW: 1500, hoursPerDay: 12 },
      { id: "3", name: "إضاءة", quantity: 6, powerW: 40, hoursPerDay: 12 },
    ]
  },
  {
    id: "workshop",
    name: "ورشة",
    devices: [
      { id: "1", name: "آلة لحام", quantity: 2, powerW: 5000, hoursPerDay: 6 },
      { id: "2", name: "مخرطة/مثقاب", quantity: 3, powerW: 2000, hoursPerDay: 8 },
      { id: "3", name: "ضاغط هواء (كمبروسر)", quantity: 1, powerW: 3000, hoursPerDay: 8 },
    ]
  },
  {
    id: "water_pump",
    name: "مضخة موية",
    devices: [
      { id: "1", name: "مضخة غاطسة كبيرة", quantity: 1, powerW: 7500, hoursPerDay: 10 },
      { id: "2", name: "لوحة تحكم", quantity: 1, powerW: 100, hoursPerDay: 10 },
    ]
  },
  {
    id: "donkey",
    name: "دونكي",
    devices: [
      { id: "1", name: "مضخة مياه", quantity: 1, powerW: 4000, hoursPerDay: 8 },
      { id: "2", name: "إضاءة بسيطة", quantity: 2, powerW: 50, hoursPerDay: 12 },
    ]
  },
  {
    id: "mosque",
    name: "مسجد",
    devices: [
      { id: "1", name: "مكيفات هواء", quantity: 10, powerW: 2000, hoursPerDay: 6 },
      { id: "2", name: "إضاءة", quantity: 40, powerW: 40, hoursPerDay: 6 },
      { id: "3", name: "نظام صوتي", quantity: 1, powerW: 500, hoursPerDay: 3 },
    ]
  },
  {
    id: "printing_press",
    name: "مطبعة",
    devices: [
      { id: "1", name: "ماكينة طباعة رئيسية", quantity: 2, powerW: 8000, hoursPerDay: 10 },
      { id: "2", name: "ماكينة قص", quantity: 1, powerW: 3000, hoursPerDay: 6 },
      { id: "3", name: "أجهزة كمبيوتر", quantity: 5, powerW: 250, hoursPerDay: 10 },
    ]
  },
  {
    id: "coffee_shop",
    name: "كوفي شوب",
    devices: [
      { id: "1", name: "ماكينة اسبريسو", quantity: 1, powerW: 3500, hoursPerDay: 12 },
      { id: "2", name: "ثلاجات عرض/تبريد", quantity: 3, powerW: 600, hoursPerDay: 24 },
      { id: "3", name: "مكيفات هواء", quantity: 3, powerW: 2000, hoursPerDay: 16 },
      { id: "4", name: "إضاءة ديكور", quantity: 20, powerW: 30, hoursPerDay: 16 },
    ]
  },
  {
    id: "restaurant",
    name: "مطعم",
    devices: [
      { id: "1", name: "ثلاجات وفريزرات", quantity: 5, powerW: 800, hoursPerDay: 24 },
      { id: "2", name: "أفران/شوايات كهربائية", quantity: 3, powerW: 5000, hoursPerDay: 12 },
      { id: "3", name: "مكيفات هواء", quantity: 6, powerW: 2000, hoursPerDay: 16 },
      { id: "4", name: "شفاطات هواء", quantity: 2, powerW: 1000, hoursPerDay: 16 },
    ]
  },
  {
    id: "hotel",
    name: "فندق",
    devices: [
      { id: "1", name: "مكيفات غرف", quantity: 50, powerW: 1500, hoursPerDay: 12 },
      { id: "2", name: "مصاعد", quantity: 2, powerW: 10000, hoursPerDay: 4 },
      { id: "3", name: "معدات مطبخ", quantity: 10, powerW: 2000, hoursPerDay: 12 },
      { id: "4", name: "سخانات مياه", quantity: 50, powerW: 1200, hoursPerDay: 4 },
    ]
  },
  {
    id: "bank",
    name: "بنك",
    devices: [
      { id: "1", name: "أجهزة كمبيوتر", quantity: 30, powerW: 250, hoursPerDay: 10 },
      { id: "2", name: "مكيفات مركزية", quantity: 2, powerW: 15000, hoursPerDay: 12 },
      { id: "3", name: "صراف آلي (ATM)", quantity: 3, powerW: 500, hoursPerDay: 24 },
      { id: "4", name: "إضاءة", quantity: 50, powerW: 40, hoursPerDay: 12 },
    ]
  },
  {
    id: "supermarket",
    name: "سوبر ماركت",
    devices: [
      { id: "1", name: "ثلاجات عرض (ألبان/لحوم)", quantity: 10, powerW: 1200, hoursPerDay: 24 },
      { id: "2", name: "فريزرات", quantity: 5, powerW: 1000, hoursPerDay: 24 },
      { id: "3", name: "مكيفات هواء", quantity: 8, powerW: 2000, hoursPerDay: 16 },
      { id: "4", name: "إضاءة", quantity: 60, powerW: 50, hoursPerDay: 16 },
    ]
  },
  {
    id: "gas_station",
    name: "طرمبة وقود",
    devices: [
      { id: "1", name: "مضخات وقود", quantity: 6, powerW: 1500, hoursPerDay: 24 },
      { id: "2", name: "إضاءة المظلة", quantity: 20, powerW: 150, hoursPerDay: 12 },
      { id: "3", name: "محل تموينات صغير", quantity: 1, powerW: 3000, hoursPerDay: 24 },
    ]
  },
  {
    id: "mining_company",
    name: "شركة تعدين",
    devices: [
      { id: "1", name: "معدات طحن وتكسير", quantity: 2, powerW: 50000, hoursPerDay: 16 },
      { id: "2", name: "سيور ناقلة", quantity: 4, powerW: 5000, hoursPerDay: 16 },
      { id: "3", name: "إضاءة كاشفة", quantity: 20, powerW: 1000, hoursPerDay: 12 },
      { id: "4", name: "سكن ومكاتب", quantity: 1, powerW: 15000, hoursPerDay: 24 },
    ]
  }
];

/**
 * Calculates the total daily consumption based on a list of devices.
 *
 * @param {Array} devices - List of devices
 * @param {number} devices[].quantity - Number of items for this device
 * @param {number} devices[].powerW - Power consumption of a single unit in Watts
 * @param {number} devices[].hoursPerDay - Operating hours per day
 * @returns {number} Total consumption in Watt-hours (Wh)
 */
export const calculateTotalConsumption = (devices) => {
  if (!Array.isArray(devices)) return 0;

  return devices.reduce((total, device) => {
    const qty = Number(device.quantity) || 0;
    const power = Number(device.powerW) || 0;
    const hours = Number(device.hoursPerDay) || 0;

    return total + (qty * power * hours);
  }, 0);
};

export const getFacilityById = (id) => {
  return facilityTypes.find(facility => facility.id === id);
};
