export const facilityTypes = [
  'مصنع ثلج',
  'شركة',
  'مزرعة',
  'مزرعة دواجن',
  'بيوت محمية',
  'مصنع',
  'مستوصف',
  'مستشفي',
  'مخبز',
  'دكان',
  'ورشة',
  'مضخة موية',
  'دونكي',
  'مسجد',
  'مطبعة',
  'كوفي شوب',
  'مطعم',
  'فندق',
  'بنك',
  'سوبر ماركت',
  'طرمبة وقود',
  'شركة تعدين'
];

export const defaultDevicesMapping = {
  'مصنع ثلج': [
    { id: '1', name: 'ماكينة ثلج', power: 5000, quantity: 2, hours: 24 },
    { id: '2', name: 'إضاءة', power: 50, quantity: 10, hours: 12 },
    { id: '3', name: 'مكيف', power: 1500, quantity: 1, hours: 24 }
  ],
  'شركة': [
    { id: '1', name: 'كمبيوتر', power: 250, quantity: 10, hours: 8 },
    { id: '2', name: 'إضاءة', power: 40, quantity: 20, hours: 10 },
    { id: '3', name: 'مكيف سبليت', power: 1500, quantity: 4, hours: 10 },
    { id: '4', name: 'طابعة', power: 500, quantity: 2, hours: 2 }
  ],
  'مزرعة': [
    { id: '1', name: 'مضخة مياه غاطسة', power: 2200, quantity: 1, hours: 6 },
    { id: '2', name: 'إضاءة خارجية', power: 100, quantity: 5, hours: 12 }
  ],
  'مزرعة دواجن': [
    { id: '1', name: 'مراوح تهوية', power: 750, quantity: 6, hours: 24 },
    { id: '2', name: 'إضاءة', power: 20, quantity: 50, hours: 16 },
    { id: '3', name: 'مضخة مياه', power: 1500, quantity: 1, hours: 4 },
    { id: '4', name: 'سخانات', power: 2000, quantity: 2, hours: 12 }
  ],
  'بيوت محمية': [
    { id: '1', name: 'مراوح تبريد', power: 500, quantity: 4, hours: 12 },
    { id: '2', name: 'مضخة ري', power: 1100, quantity: 1, hours: 4 }
  ],
  'مصنع': [
    { id: '1', name: 'آلات صناعية', power: 10000, quantity: 2, hours: 12 },
    { id: '2', name: 'إضاءة', power: 100, quantity: 30, hours: 12 },
    { id: '3', name: 'تهوية', power: 2000, quantity: 4, hours: 24 }
  ],
  'مستوصف': [
    { id: '1', name: 'إضاءة', power: 40, quantity: 40, hours: 24 },
    { id: '2', name: 'مكيفات', power: 1500, quantity: 10, hours: 24 },
    { id: '3', name: 'ثلاجة أدوية', power: 300, quantity: 2, hours: 24 },
    { id: '4', name: 'أجهزة طبية', power: 2000, quantity: 3, hours: 8 }
  ],
  'مستشفي': [
    { id: '1', name: 'إضاءة شاملة', power: 40, quantity: 200, hours: 24 },
    { id: '2', name: 'تكييف مركزي', power: 50000, quantity: 1, hours: 24 },
    { id: '3', name: 'أجهزة طبية (غرف عمليات/عناية)', power: 10000, quantity: 5, hours: 24 },
    { id: '4', name: 'ثلاجات حفظ', power: 500, quantity: 10, hours: 24 }
  ],
  'مخبز': [
    { id: '1', name: 'فرن كهربائي', power: 8000, quantity: 2, hours: 12 },
    { id: '2', name: 'عجانة', power: 2000, quantity: 2, hours: 6 },
    { id: '3', name: 'إضاءة', power: 50, quantity: 10, hours: 14 }
  ],
  'دكان': [
    { id: '1', name: 'إضاءة', power: 20, quantity: 4, hours: 12 },
    { id: '2', name: 'ثلاجة عرض', power: 400, quantity: 2, hours: 24 },
    { id: '3', name: 'مروحة سقف', power: 75, quantity: 2, hours: 12 }
  ],
  'ورشة': [
    { id: '1', name: 'ماكينة لحام', power: 4000, quantity: 1, hours: 4 },
    { id: '2', name: 'صاروخ قص', power: 1500, quantity: 2, hours: 3 },
    { id: '3', name: 'كمبروسر هواء', power: 2200, quantity: 1, hours: 5 },
    { id: '4', name: 'إضاءة', power: 100, quantity: 6, hours: 8 }
  ],
  'مضخة موية': [
    { id: '1', name: 'مضخة غاطسة', power: 5500, quantity: 1, hours: 8 }
  ],
  'دونكي': [
    { id: '1', name: 'مضخة استخراج مياه', power: 3000, quantity: 1, hours: 6 }
  ],
  'مسجد': [
    { id: '1', name: 'إضاءة', power: 40, quantity: 30, hours: 5 },
    { id: '2', name: 'مكيفات', power: 2000, quantity: 6, hours: 5 },
    { id: '3', name: 'مكبر صوت', power: 200, quantity: 1, hours: 3 }
  ],
  'مطبعة': [
    { id: '1', name: 'ماكينة طباعة', power: 5000, quantity: 2, hours: 10 },
    { id: '2', name: 'كمبيوتر تصاميم', power: 400, quantity: 3, hours: 10 },
    { id: '3', name: 'إضاءة', power: 50, quantity: 15, hours: 12 }
  ],
  'كوفي شوب': [
    { id: '1', name: 'ماكينة إسبريسو', power: 3000, quantity: 1, hours: 12 },
    { id: '2', name: 'ثلاجة عرض', power: 500, quantity: 1, hours: 24 },
    { id: '3', name: 'إضاءة ديكور', power: 20, quantity: 30, hours: 14 },
    { id: '4', name: 'مكيف', power: 2000, quantity: 2, hours: 14 }
  ],
  'مطعم': [
    { id: '1', name: 'ثلاجات وفريزرات', power: 800, quantity: 4, hours: 24 },
    { id: '2', name: 'إضاءة', power: 40, quantity: 40, hours: 16 },
    { id: '3', name: 'مكيفات', power: 2000, quantity: 4, hours: 16 },
    { id: '4', name: 'معدات مطبخ (خلاط، مايكروويف)', power: 1500, quantity: 2, hours: 6 }
  ],
  'فندق': [
    { id: '1', name: 'إضاءة غرف وممرات', power: 20, quantity: 200, hours: 24 },
    { id: '2', name: 'مكيفات غرف', power: 1500, quantity: 50, hours: 16 },
    { id: '3', name: 'مصاعد', power: 10000, quantity: 2, hours: 24 },
    { id: '4', name: 'معدات مطبخ ومغسلة', power: 5000, quantity: 3, hours: 10 }
  ],
  'بنك': [
    { id: '1', name: 'أجهزة كمبيوتر', power: 250, quantity: 30, hours: 10 },
    { id: '2', name: 'إضاءة', power: 40, quantity: 100, hours: 12 },
    { id: '3', name: 'تكييف مركزي', power: 20000, quantity: 1, hours: 12 },
    { id: '4', name: 'صراف آلي (ATM)', power: 500, quantity: 2, hours: 24 },
    { id: '5', name: 'سيرفرات', power: 2000, quantity: 2, hours: 24 }
  ],
  'سوبر ماركت': [
    { id: '1', name: 'ثلاجات عرض', power: 1000, quantity: 10, hours: 24 },
    { id: '2', name: 'فريزرات', power: 1200, quantity: 5, hours: 24 },
    { id: '3', name: 'إضاءة', power: 40, quantity: 50, hours: 18 },
    { id: '4', name: 'مكيفات', power: 2000, quantity: 6, hours: 18 }
  ],
  'طرمبة وقود': [
    { id: '1', name: 'مضخات وقود', power: 1500, quantity: 6, hours: 24 },
    { id: '2', name: 'إضاءة المظلة', power: 200, quantity: 10, hours: 12 },
    { id: '3', name: 'محل تجاري (إضاءة وثلاجة)', power: 1000, quantity: 1, hours: 24 }
  ],
  'شركة تعدين': [
    { id: '1', name: 'معدات حفر ثقيلة (كهربائية)', power: 20000, quantity: 2, hours: 16 },
    { id: '2', name: 'مضخات مياه', power: 5000, quantity: 4, hours: 24 },
    { id: '3', name: 'إضاءة كاشفة', power: 1000, quantity: 20, hours: 12 },
    { id: '4', name: 'تهوية مناجم', power: 10000, quantity: 2, hours: 24 }
  ]
};

/**
 * Calculates the solar system requirements based on a list of devices.
 *
 * Total Daily Energy (Wh) = Sum of (power * quantity * hours)
 * Peak Power (W) = Sum of (power * quantity)
 * Inverter Size (W) = Peak Power * 1.25 (25% margin)
 * Panels Count = Ceil(Total Daily Energy / (400W * 5 peak sun hours))
 * Battery Count (12V 200Ah, 50% DoD) = Ceil((Total Daily Energy * 2) / (12V * 200Ah))
 *
 * @param {Array} devices - Array of objects {power, quantity, hours}
 * @returns {Object} - Calculated system requirements
 */
export const calculateSystemRequirements = (devices) => {
  let totalDailyEnergy = 0; // Wh
  let peakPower = 0; // W

  devices.forEach(device => {
    const p = parseFloat(device.power) || 0;
    const q = parseInt(device.quantity, 10) || 0;
    const h = parseFloat(device.hours) || 0;

    peakPower += p * q;
    totalDailyEnergy += p * q * h;
  });

  const inverterSize = peakPower * 1.25;
  const panelsCount = Math.ceil(totalDailyEnergy / (400 * 5)); // 400W panel, 5 peak sun hours
  const batteryCount = Math.ceil((totalDailyEnergy * 2) / (12 * 200)); // 12V 200Ah, 50% Depth of Discharge

  return {
    totalDailyEnergy,
    peakPower,
    inverterSize,
    panelsCount,
    batteryCount
  };
};
