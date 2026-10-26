export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع تلج', baseLoadKw: 50, typicalAppliances: ['كمبريسورات تبريد', 'مضخات مياه', 'إضاءة'] },
  { id: 'company', name: 'شركة', baseLoadKw: 20, typicalAppliances: ['مكيفات', 'حواسيب', 'إضاءة', 'سيرفرات'] },
  { id: 'farm', name: 'مزرعة', baseLoadKw: 15, typicalAppliances: ['مضخات غطاسة', 'إضاءة', 'معدات زراعية'] },
  { id: 'poultry_farm', name: 'مزرعة دواجن', baseLoadKw: 30, typicalAppliances: ['مراوح تهوية', 'دفايات', 'إضاءة', 'مغذيات آلية'] },
  { id: 'greenhouse', name: 'بيوت محمية', baseLoadKw: 10, typicalAppliances: ['مراوح', 'مضخات مياه', 'إضاءة'] },
  { id: 'factory', name: 'مصنع', baseLoadKw: 100, typicalAppliances: ['آلات إنتاج', 'سيور ناقلة', 'إضاءة', 'مكيفات'] },
  { id: 'clinic', name: 'مستوصف', baseLoadKw: 25, typicalAppliances: ['مكيفات', 'أجهزة طبية', 'ثلاجات أدوية', 'إضاءة'] },
  { id: 'hospital', name: 'مستشفي', baseLoadKw: 200, typicalAppliances: ['غرف عمليات', 'عناية مركزة', 'مكيفات مركزية', 'مصاعد'] },
  { id: 'bakery', name: 'مخبز', baseLoadKw: 40, typicalAppliances: ['أفران كهربائية', 'عجانات', 'إضاءة'] },
  { id: 'shop', name: 'دكان', baseLoadKw: 5, typicalAppliances: ['ثلاجة', 'إضاءة', 'مروحة'] },
  { id: 'workshop', name: 'ورشة', baseLoadKw: 15, typicalAppliances: ['ماكينات لحام', 'مخارط', 'إضاءة'] },
  { id: 'water_pump', name: 'مضخة موية', baseLoadKw: 10, typicalAppliances: ['مضخة غطاسة', 'لوحة تحكم'] },
  { id: 'donkey_engine', name: 'دونكي', baseLoadKw: 5, typicalAppliances: ['محرك ديزل/كهربائي صغير'] },
  { id: 'mosque', name: 'مسجد', baseLoadKw: 10, typicalAppliances: ['مكيفات', 'مراوح', 'إضاءة', 'مكبرات صوت'] },
  { id: 'printing_press', name: 'مطبعة', baseLoadKw: 30, typicalAppliances: ['ماكينات طباعة', 'مكيفات', 'إضاءة'] },
  { id: 'coffee_shop', name: 'كوفي شوب', baseLoadKw: 15, typicalAppliances: ['ماكينة إسبريسو', 'ثلاجات', 'مكيفات', 'إضاءة'] },
  { id: 'restaurant', name: 'مطعم', baseLoadKw: 25, typicalAppliances: ['ثلاجات', 'مكيفات', 'شفاطات', 'أفران'] },
  { id: 'hotel', name: 'فندق', baseLoadKw: 150, typicalAppliances: ['مكيفات', 'مصاعد', 'سخانات', 'إضاءة'] },
  { id: 'bank', name: 'بنك', baseLoadKw: 30, typicalAppliances: ['مكيفات', 'حواسيب', 'سيرفرات', 'إضاءة'] },
  { id: 'supermarket', name: 'سوبر ماركت', baseLoadKw: 40, typicalAppliances: ['ثلاجات عرض', 'مكيفات', 'إضاءة'] },
  { id: 'gas_station', name: 'طرمبة وقود', baseLoadKw: 20, typicalAppliances: ['مضخات وقود', 'إضاءة خارجية', 'مكيفات مكتب'] },
  { id: 'mining_company', name: 'شركة تعدين', baseLoadKw: 250, typicalAppliances: ['كسارات', 'طواحين', 'مضخات', 'إضاءة'] }
];

export const calculateSystemSize = (facilityId, additionalLoad = 0) => {
  const facility = FACILITY_TYPES.find(f => f.id === facilityId);
  if (!facility) return null;

  const totalLoad = facility.baseLoadKw + Number(additionalLoad);

  // Basic calculation rules (mocked up):
  // System Size (kW) is typically Total Load * 1.2 for safety margin
  const recommendedSystemSizeKw = totalLoad * 1.2;

  // Estimated panels (assuming 500W panels)
  const numberOfPanels = Math.ceil((recommendedSystemSizeKw * 1000) / 500);

  // Estimated space needed (approx 2.5 sq meters per panel)
  const spaceNeededSqM = numberOfPanels * 2.5;

  // Estimated Cost (assuming $1000 per kW installed)
  const estimatedCostUsd = recommendedSystemSizeKw * 1000;

  return {
    facilityName: facility.name,
    totalLoadKw: totalLoad,
    recommendedSystemSizeKw,
    numberOfPanels,
    spaceNeededSqM,
    estimatedCostUsd
  };
};
