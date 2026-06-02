export const FACILITY_TYPES = [
  { id: 'ice_factory', name: 'مصنع ثلج' },
  { id: 'company', name: 'شركة' },
  { id: 'farm', name: 'مزرعة' },
  { id: 'poultry_farm', name: 'مزرعة دواجن' },
  { id: 'greenhouse', name: 'بيوت محمية' },
  { id: 'factory', name: 'مصنع' },
  { id: 'clinic', name: 'مستوصف' },
  { id: 'hospital', name: 'مستشفى' },
  { id: 'bakery', name: 'مخبز' },
  { id: 'shop', name: 'دكان' },
  { id: 'workshop', name: 'ورشة' },
  { id: 'water_pump', name: 'مضخة موية' },
  { id: 'donkey', name: 'دونكي' }, // Translator note: "Donkey" here might refer to a specific local type of water pump engine or similar machinery, but using transcription as requested.
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

export const DEFAULT_APPLIANCES = {
  ice_factory: [
    { id: 1, name: 'Ice Making Machine', powerW: 5000, quantity: 2, hoursPerDay: 12 },
    { id: 2, name: 'Freezer Room', powerW: 3000, quantity: 1, hoursPerDay: 24 },
    { id: 3, name: 'Lighting', powerW: 100, quantity: 10, hoursPerDay: 12 },
  ],
  company: [
    { id: 1, name: 'Computers', powerW: 150, quantity: 20, hoursPerDay: 8 },
    { id: 2, name: 'Air Conditioning', powerW: 2000, quantity: 5, hoursPerDay: 8 },
    { id: 3, name: 'Lighting', powerW: 50, quantity: 30, hoursPerDay: 10 },
    { id: 4, name: 'Printer/Copier', powerW: 500, quantity: 2, hoursPerDay: 4 },
  ],
  farm: [
    { id: 1, name: 'Water Pump', powerW: 2000, quantity: 1, hoursPerDay: 6 },
    { id: 2, name: 'Lighting', powerW: 60, quantity: 5, hoursPerDay: 10 },
  ],
  poultry_farm: [
    { id: 1, name: 'Ventilation Fans', powerW: 500, quantity: 10, hoursPerDay: 24 },
    { id: 2, name: 'Lighting', powerW: 40, quantity: 50, hoursPerDay: 16 },
    { id: 3, name: 'Feeding System', powerW: 1000, quantity: 2, hoursPerDay: 4 },
  ],
  greenhouse: [
    { id: 1, name: 'Climate Control System', powerW: 1500, quantity: 1, hoursPerDay: 24 },
    { id: 2, name: 'Irrigation Pump', powerW: 1000, quantity: 1, hoursPerDay: 4 },
    { id: 3, name: 'Grow Lights', powerW: 200, quantity: 20, hoursPerDay: 12 },
  ],
  factory: [
    { id: 1, name: 'Heavy Machinery', powerW: 10000, quantity: 3, hoursPerDay: 10 },
    { id: 2, name: 'Conveyor Belts', powerW: 2000, quantity: 2, hoursPerDay: 10 },
    { id: 3, name: 'Lighting', powerW: 100, quantity: 50, hoursPerDay: 12 },
  ],
  clinic: [
    { id: 1, name: 'Medical Equipment', powerW: 1000, quantity: 5, hoursPerDay: 8 },
    { id: 2, name: 'Air Conditioning', powerW: 1500, quantity: 3, hoursPerDay: 12 },
    { id: 3, name: 'Lighting', powerW: 60, quantity: 20, hoursPerDay: 12 },
    { id: 4, name: 'Computers', powerW: 150, quantity: 5, hoursPerDay: 8 },
  ],
  hospital: [
    { id: 1, name: 'Life Support Equipment', powerW: 2000, quantity: 10, hoursPerDay: 24 },
    { id: 2, name: 'HVAC System', powerW: 15000, quantity: 1, hoursPerDay: 24 },
    { id: 3, name: 'Lighting', powerW: 50, quantity: 200, hoursPerDay: 24 },
    { id: 4, name: 'Imaging (X-Ray/MRI)', powerW: 5000, quantity: 2, hoursPerDay: 4 },
  ],
  bakery: [
    { id: 1, name: 'Electric Ovens', powerW: 5000, quantity: 2, hoursPerDay: 8 },
    { id: 2, name: 'Mixers', powerW: 1500, quantity: 2, hoursPerDay: 4 },
    { id: 3, name: 'Lighting', powerW: 80, quantity: 10, hoursPerDay: 12 },
    { id: 4, name: 'Display Fridges', powerW: 800, quantity: 2, hoursPerDay: 24 },
  ],
  shop: [
    { id: 1, name: 'Lighting', powerW: 40, quantity: 10, hoursPerDay: 12 },
    { id: 2, name: 'Fan/AC', powerW: 1000, quantity: 1, hoursPerDay: 12 },
    { id: 3, name: 'POS System', powerW: 100, quantity: 1, hoursPerDay: 12 },
  ],
  workshop: [
    { id: 1, name: 'Power Tools', powerW: 1000, quantity: 5, hoursPerDay: 4 },
    { id: 2, name: 'Air Compressor', powerW: 2000, quantity: 1, hoursPerDay: 6 },
    { id: 3, name: 'Lighting', powerW: 100, quantity: 8, hoursPerDay: 10 },
  ],
  water_pump: [
    { id: 1, name: 'Main Pump', powerW: 3000, quantity: 1, hoursPerDay: 8 },
  ],
  donkey: [
    { id: 1, name: 'Pump Engine', powerW: 2500, quantity: 1, hoursPerDay: 10 },
  ],
  mosque: [
    { id: 1, name: 'Lighting', powerW: 40, quantity: 30, hoursPerDay: 6 },
    { id: 2, name: 'Air Conditioning', powerW: 2000, quantity: 5, hoursPerDay: 4 },
    { id: 3, name: 'Sound System', powerW: 300, quantity: 1, hoursPerDay: 2 },
  ],
  printing_press: [
    { id: 1, name: 'Printing Machines', powerW: 4000, quantity: 2, hoursPerDay: 8 },
    { id: 2, name: 'Computers', powerW: 200, quantity: 3, hoursPerDay: 8 },
    { id: 3, name: 'Lighting', powerW: 80, quantity: 15, hoursPerDay: 10 },
  ],
  coffee_shop: [
    { id: 1, name: 'Espresso Machine', powerW: 3000, quantity: 1, hoursPerDay: 10 },
    { id: 2, name: 'Grinder', powerW: 500, quantity: 2, hoursPerDay: 4 },
    { id: 3, name: 'Blender', powerW: 800, quantity: 2, hoursPerDay: 2 },
    { id: 4, name: 'Fridge', powerW: 600, quantity: 2, hoursPerDay: 24 },
    { id: 5, name: 'Lighting', powerW: 50, quantity: 20, hoursPerDay: 14 },
  ],
  restaurant: [
    { id: 1, name: 'Commercial Fridges', powerW: 1000, quantity: 3, hoursPerDay: 24 },
    { id: 2, name: 'Electric Ovens/Stoves', powerW: 4000, quantity: 2, hoursPerDay: 10 },
    { id: 3, name: 'Air Conditioning', powerW: 2500, quantity: 4, hoursPerDay: 14 },
    { id: 4, name: 'Lighting', powerW: 60, quantity: 40, hoursPerDay: 16 },
  ],
  hotel: [
    { id: 1, name: 'Room ACs', powerW: 1000, quantity: 50, hoursPerDay: 12 },
    { id: 2, name: 'Lighting', powerW: 50, quantity: 200, hoursPerDay: 12 },
    { id: 3, name: 'Elevators', powerW: 5000, quantity: 2, hoursPerDay: 4 },
    { id: 4, name: 'Water Heaters', powerW: 2000, quantity: 50, hoursPerDay: 3 },
  ],
  bank: [
    { id: 1, name: 'Computers', powerW: 150, quantity: 30, hoursPerDay: 10 },
    { id: 2, name: 'Air Conditioning', powerW: 5000, quantity: 2, hoursPerDay: 12 },
    { id: 3, name: 'Servers', powerW: 1000, quantity: 2, hoursPerDay: 24 },
    { id: 4, name: 'Lighting', powerW: 60, quantity: 50, hoursPerDay: 12 },
  ],
  supermarket: [
    { id: 1, name: 'Display Fridges', powerW: 1500, quantity: 10, hoursPerDay: 24 },
    { id: 2, name: 'Freezers', powerW: 2000, quantity: 5, hoursPerDay: 24 },
    { id: 3, name: 'Air Conditioning', powerW: 5000, quantity: 3, hoursPerDay: 16 },
    { id: 4, name: 'Lighting', powerW: 80, quantity: 100, hoursPerDay: 16 },
    { id: 5, name: 'POS Systems', powerW: 100, quantity: 5, hoursPerDay: 16 },
  ],
  gas_station: [
    { id: 1, name: 'Fuel Pumps', powerW: 1000, quantity: 6, hoursPerDay: 24 },
    { id: 2, name: 'Canopy Lighting', powerW: 200, quantity: 20, hoursPerDay: 12 },
    { id: 3, name: 'Convenience Store Fridges', powerW: 1000, quantity: 3, hoursPerDay: 24 },
  ],
  mining_company: [
    { id: 1, name: 'Heavy Excavation Equipment', powerW: 50000, quantity: 2, hoursPerDay: 12 },
    { id: 2, name: 'Processing Plant', powerW: 100000, quantity: 1, hoursPerDay: 24 },
    { id: 3, name: 'Camp Lighting & AC', powerW: 20000, quantity: 1, hoursPerDay: 24 },
  ]
};
