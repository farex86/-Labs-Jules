export const FACILITY_TYPES = [
  {
    id: "ice_factory",
    name: "مصنع ثلج",
    defaultDevices: [
      { id: "1", name: "ماكينة صنع ثلج", quantity: 2, power: 5000, hours: 24 },
      { id: "2", name: "إضاءة", quantity: 10, power: 20, hours: 12 },
      { id: "3", name: "مكيف هواء", quantity: 1, power: 1500, hours: 8 }
    ]
  },
  {
    id: "company",
    name: "شركة",
    defaultDevices: [
      { id: "1", name: "أجهزة كمبيوتر", quantity: 10, power: 250, hours: 8 },
      { id: "2", name: "إضاءة", quantity: 20, power: 20, hours: 10 },
      { id: "3", name: "مكيفات هواء", quantity: 4, power: 1500, hours: 8 },
      { id: "4", name: "طابعة", quantity: 2, power: 500, hours: 2 }
    ]
  },
  {
    id: "farm",
    name: "مزرعة",
    defaultDevices: [
      { id: "1", name: "مضخة مياه", quantity: 1, power: 2200, hours: 6 },
      { id: "2", name: "إضاءة خارجية", quantity: 5, power: 50, hours: 12 }
    ]
  },
  {
    id: "poultry_farm",
    name: "مزرعة دواجن",
    defaultDevices: [
      { id: "1", name: "مراوح تهوية", quantity: 4, power: 750, hours: 24 },
      { id: "2", name: "إضاءة", quantity: 20, power: 15, hours: 18 },
      { id: "3", name: "نظام تعليف آلي", quantity: 1, power: 1000, hours: 4 }
    ]
  },
  {
    id: "greenhouses",
    name: "بيوت محمية",
    defaultDevices: [
      { id: "1", name: "مراوح تبريد", quantity: 6, power: 500, hours: 12 },
      { id: "2", name: "مضخة ري", quantity: 1, power: 1500, hours: 4 }
    ]
  },
  {
    id: "factory",
    name: "مصنع",
    defaultDevices: [
      { id: "1", name: "ماكينات إنتاج", quantity: 5, power: 4000, hours: 16 },
      { id: "2", name: "إضاءة", quantity: 30, power: 40, hours: 16 }
    ]
  },
  {
    id: "clinic",
    name: "مستوصف",
    defaultDevices: [
      { id: "1", name: "معدات طبية", quantity: 5, power: 800, hours: 8 },
      { id: "2", name: "ثلاجة أدوية", quantity: 2, power: 200, hours: 24 },
      { id: "3", name: "إضاءة ومكيفات", quantity: 5, power: 1200, hours: 12 }
    ]
  },
  {
    id: "hospital",
    name: "مستشفى",
    defaultDevices: [
      { id: "1", name: "معدات طبية ثقيلة", quantity: 10, power: 2000, hours: 12 },
      { id: "2", name: "ثلاجات ومبردات", quantity: 5, power: 500, hours: 24 },
      { id: "3", name: "تكييف مركزي", quantity: 1, power: 15000, hours: 24 }
    ]
  },
  {
    id: "bakery",
    name: "مخبز",
    defaultDevices: [
      { id: "1", name: "عجانة", quantity: 2, power: 1500, hours: 6 },
      { id: "2", name: "فرن كهربائي", quantity: 1, power: 5000, hours: 8 },
      { id: "3", name: "إضاءة", quantity: 5, power: 40, hours: 12 }
    ]
  },
  {
    id: "shop",
    name: "دكان",
    defaultDevices: [
      { id: "1", name: "ثلاجة عرض", quantity: 2, power: 400, hours: 24 },
      { id: "2", name: "إضاءة", quantity: 4, power: 20, hours: 12 },
      { id: "3", name: "مروحة", quantity: 1, power: 75, hours: 12 }
    ]
  },
  {
    id: "workshop",
    name: "ورشة",
    defaultDevices: [
      { id: "1", name: "ماكينة لحام", quantity: 1, power: 3000, hours: 4 },
      { id: "2", name: "صاروخ تقطيع", quantity: 2, power: 1200, hours: 3 },
      { id: "3", name: "ضاغط هواء", quantity: 1, power: 2200, hours: 5 }
    ]
  },
  {
    id: "water_pump",
    name: "مضخة موية",
    defaultDevices: [
      { id: "1", name: "مضخة مياه غاطسة", quantity: 1, power: 4000, hours: 8 }
    ]
  },
  {
    id: "donkey",
    name: "دونكي",
    defaultDevices: [
      { id: "1", name: "مضخة مياه", quantity: 1, power: 5500, hours: 10 },
      { id: "2", name: "إضاءة الموقع", quantity: 2, power: 50, hours: 12 }
    ]
  },
  {
    id: "mosque",
    name: "مسجد",
    defaultDevices: [
      { id: "1", name: "مكبرات صوت", quantity: 4, power: 100, hours: 2 },
      { id: "2", name: "مكيفات هواء", quantity: 6, power: 1500, hours: 4 },
      { id: "3", name: "مراوح", quantity: 10, power: 75, hours: 4 },
      { id: "4", name: "إضاءة", quantity: 20, power: 20, hours: 4 }
    ]
  },
  {
    id: "printing_press",
    name: "مطبعة",
    defaultDevices: [
      { id: "1", name: "ماكينة طباعة", quantity: 2, power: 3500, hours: 10 },
      { id: "2", name: "أجهزة كمبيوتر", quantity: 4, power: 250, hours: 10 },
      { id: "3", name: "مكيف هواء", quantity: 2, power: 1500, hours: 10 }
    ]
  },
  {
    id: "coffee_shop",
    name: "كوفي شوب",
    defaultDevices: [
      { id: "1", name: "ماكينة قهوة", quantity: 1, power: 2500, hours: 12 },
      { id: "2", name: "طاحونة بن", quantity: 2, power: 300, hours: 4 },
      { id: "3", name: "ثلاجة", quantity: 2, power: 400, hours: 24 },
      { id: "4", name: "إضاءة ديكور", quantity: 15, power: 15, hours: 14 }
    ]
  },
  {
    id: "restaurant",
    name: "مطعم",
    defaultDevices: [
      { id: "1", name: "ثلاجات ومجمدات", quantity: 4, power: 600, hours: 24 },
      { id: "2", name: "شفاطات هواء", quantity: 2, power: 800, hours: 12 },
      { id: "3", name: "إضاءة ومكيفات", quantity: 5, power: 1500, hours: 12 }
    ]
  },
  {
    id: "hotel",
    name: "فندق",
    defaultDevices: [
      { id: "1", name: "إضاءة الغرف والممرات", quantity: 100, power: 15, hours: 12 },
      { id: "2", name: "مكيفات هواء", quantity: 20, power: 1200, hours: 12 },
      { id: "3", name: "مصاعد", quantity: 1, power: 5000, hours: 24 },
      { id: "4", name: "سخانات مياه", quantity: 20, power: 1500, hours: 4 }
    ]
  },
  {
    id: "bank",
    name: "بنك",
    defaultDevices: [
      { id: "1", name: "أجهزة كمبيوتر وسيرفرات", quantity: 20, power: 300, hours: 10 },
      { id: "2", name: "ماكينات صراف آلي", quantity: 3, power: 400, hours: 24 },
      { id: "3", name: "تكييف مركزي", quantity: 2, power: 5000, hours: 10 }
    ]
  },
  {
    id: "supermarket",
    name: "سوبر ماركت",
    defaultDevices: [
      { id: "1", name: "ثلاجات عرض مفتوحة", quantity: 5, power: 1500, hours: 24 },
      { id: "2", name: "مجمدات", quantity: 3, power: 800, hours: 24 },
      { id: "3", name: "إضاءة عالية", quantity: 40, power: 30, hours: 16 }
    ]
  },
  {
    id: "gas_station",
    name: "طرمبة وقود",
    defaultDevices: [
      { id: "1", name: "مضخات وقود", quantity: 4, power: 1200, hours: 24 },
      { id: "2", name: "إضاءة المظلة", quantity: 10, power: 100, hours: 12 },
      { id: "3", name: "كمبيوتر وكاميرات", quantity: 1, power: 300, hours: 24 }
    ]
  },
  {
    id: "mining_company",
    name: "شركة تعدين",
    defaultDevices: [
      { id: "1", name: "كسارات", quantity: 2, power: 15000, hours: 10 },
      { id: "2", name: "سيور ناقلة", quantity: 3, power: 5000, hours: 10 },
      { id: "3", name: "إضاءة كاشفة", quantity: 10, power: 400, hours: 12 },
      { id: "4", name: "معدات معالجة", quantity: 2, power: 8000, hours: 10 }
    ]
  }
];

/**
 * Calculates the total daily energy consumption in Watt-hours (Wh).
 * @param {Array} devices - Array of device objects { quantity, power, hours }.
 * @returns {number} Total consumption in Wh.
 */
export const calculateTotalConsumption = (devices) => {
  if (!Array.isArray(devices)) return 0;
  return devices.reduce((total, device) => {
    const qty = parseFloat(device.quantity) || 0;
    const power = parseFloat(device.power) || 0;
    const hours = parseFloat(device.hours) || 0;
    return total + (qty * power * hours);
  }, 0);
};

/**
 * Calculates the required solar system size in Watts (W).
 * @param {number} totalConsumptionWh - Total daily consumption in Wh.
 * @param {number} peakSunHours - Average peak sun hours (default 5.5).
 * @param {number} systemEfficiency - System efficiency (default 0.8 to account for losses).
 * @returns {number} Required system size in Watts.
 */
export const calculateSystemSize = (totalConsumptionWh, peakSunHours = 5.5, systemEfficiency = 0.8) => {
  if (!totalConsumptionWh) return 0;
  return totalConsumptionWh / (peakSunHours * systemEfficiency);
};

/**
 * Calculates the required battery capacity in Ampere-hours (Ah).
 * @param {number} totalConsumptionWh - Total daily consumption in Wh.
 * @param {number} systemVoltage - System DC voltage (default 48V).
 * @param {number} depthOfDischarge - Depth of discharge (default 0.8 for Lithium, 0.5 for Lead-Acid).
 * @returns {number} Battery capacity in Ah.
 */
export const calculateBatteryCapacity = (totalConsumptionWh, systemVoltage = 48, depthOfDischarge = 0.8) => {
  if (!totalConsumptionWh) return 0;
  return totalConsumptionWh / (systemVoltage * depthOfDischarge);
};
