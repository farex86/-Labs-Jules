export const CONSUMPTION_PATTERNS = [
  {
    id: 'ice_factory',
    name: 'مصنع تلج',
    defaultDevices: [
      { name: 'Ice Maker', powerW: 10000, hours: 24, quantity: 2 },
      { name: 'Freezer', powerW: 5000, hours: 24, quantity: 4 },
      { name: 'Lighting', powerW: 100, hours: 12, quantity: 20 },
    ],
  },
  {
    id: 'company',
    name: 'شركة',
    defaultDevices: [
      { name: 'Computers', powerW: 200, hours: 10, quantity: 50 },
      { name: 'AC Units', powerW: 1500, hours: 10, quantity: 10 },
      { name: 'Server', powerW: 800, hours: 24, quantity: 2 },
      { name: 'Lighting', powerW: 40, hours: 12, quantity: 100 },
    ],
  },
  {
    id: 'farm',
    name: 'مزرعة',
    defaultDevices: [
      { name: 'Water Pump', powerW: 3000, hours: 6, quantity: 1 },
      { name: 'Lighting', powerW: 60, hours: 12, quantity: 10 },
    ],
  },
  {
    id: 'poultry_farm',
    name: 'مزرعة دواجن',
    defaultDevices: [
      { name: 'Ventilation Fans', powerW: 1000, hours: 24, quantity: 6 },
      { name: 'Heaters', powerW: 2000, hours: 12, quantity: 4 },
      { name: 'Lighting', powerW: 40, hours: 16, quantity: 40 },
      { name: 'Feeder Motors', powerW: 500, hours: 4, quantity: 2 },
    ],
  },
  {
    id: 'greenhouse',
    name: 'بيوت محمية',
    defaultDevices: [
      { name: 'Cooling Fans', powerW: 800, hours: 12, quantity: 4 },
      { name: 'Water Pump', powerW: 1500, hours: 4, quantity: 1 },
      { name: 'Grow Lights', powerW: 200, hours: 8, quantity: 20 },
    ],
  },
  {
    id: 'factory',
    name: 'مصنع',
    defaultDevices: [
      { name: 'Heavy Machinery', powerW: 15000, hours: 16, quantity: 3 },
      { name: 'Lighting', powerW: 100, hours: 24, quantity: 50 },
      { name: 'AC Units', powerW: 2000, hours: 16, quantity: 10 },
    ],
  },
  {
    id: 'clinic',
    name: 'مستوصف',
    defaultDevices: [
      { name: 'Medical Equipment', powerW: 1000, hours: 8, quantity: 5 },
      { name: 'AC Units', powerW: 1500, hours: 24, quantity: 6 },
      { name: 'Lighting', powerW: 40, hours: 24, quantity: 30 },
      { name: 'Computers', powerW: 200, hours: 16, quantity: 10 },
    ],
  },
  {
    id: 'hospital',
    name: 'مستشفي',
    defaultDevices: [
      { name: 'Life Support', powerW: 500, hours: 24, quantity: 20 },
      { name: 'Medical Equipment (MRI/X-Ray)', powerW: 50000, hours: 8, quantity: 2 },
      { name: 'HVAC System', powerW: 20000, hours: 24, quantity: 5 },
      { name: 'Lighting', powerW: 40, hours: 24, quantity: 500 },
      { name: 'Elevators', powerW: 10000, hours: 24, quantity: 4 },
    ],
  },
  {
    id: 'bakery',
    name: 'مخبز',
    defaultDevices: [
      { name: 'Electric Oven', powerW: 8000, hours: 12, quantity: 2 },
      { name: 'Dough Mixer', powerW: 3000, hours: 6, quantity: 2 },
      { name: 'Lighting', powerW: 40, hours: 14, quantity: 10 },
      { name: 'Fridge', powerW: 800, hours: 24, quantity: 2 },
    ],
  },
  {
    id: 'shop',
    name: 'دكان',
    defaultDevices: [
      { name: 'Fridge', powerW: 500, hours: 24, quantity: 2 },
      { name: 'Lighting', powerW: 40, hours: 12, quantity: 4 },
      { name: 'Fan', powerW: 100, hours: 12, quantity: 2 },
    ],
  },
  {
    id: 'workshop',
    name: 'ورشة',
    defaultDevices: [
      { name: 'Welding Machine', powerW: 5000, hours: 6, quantity: 1 },
      { name: 'Air Compressor', powerW: 2000, hours: 4, quantity: 1 },
      { name: 'Power Tools', powerW: 800, hours: 8, quantity: 4 },
      { name: 'Lighting', powerW: 100, hours: 10, quantity: 6 },
    ],
  },
  {
    id: 'water_pump',
    name: 'مضخة موية',
    defaultDevices: [
      { name: 'Water Pump Submersible', powerW: 5000, hours: 8, quantity: 1 },
    ],
  },
  {
    id: 'donkey_engine',
    name: 'دونكي',
    defaultDevices: [
      { name: 'Donkey Engine/Pump', powerW: 4000, hours: 8, quantity: 1 },
    ],
  },
  {
    id: 'mosque',
    name: 'مسجد',
    defaultDevices: [
      { name: 'AC Units', powerW: 2000, hours: 6, quantity: 8 },
      { name: 'Lighting', powerW: 40, hours: 5, quantity: 40 },
      { name: 'Sound System', powerW: 300, hours: 5, quantity: 1 },
    ],
  },
  {
    id: 'printing_press',
    name: 'مطبعة',
    defaultDevices: [
      { name: 'Large Printer', powerW: 3000, hours: 10, quantity: 2 },
      { name: 'Cutting Machine', powerW: 1500, hours: 6, quantity: 1 },
      { name: 'Computers', powerW: 250, hours: 10, quantity: 5 },
      { name: 'AC Units', powerW: 1500, hours: 10, quantity: 3 },
      { name: 'Lighting', powerW: 60, hours: 10, quantity: 20 },
    ],
  },
  {
    id: 'coffee_shop',
    name: 'كوفي شوب',
    defaultDevices: [
      { name: 'Espresso Machine', powerW: 3000, hours: 14, quantity: 1 },
      { name: 'Coffee Grinder', powerW: 400, hours: 4, quantity: 2 },
      { name: 'Fridge', powerW: 600, hours: 24, quantity: 3 },
      { name: 'Blender', powerW: 1200, hours: 2, quantity: 2 },
      { name: 'AC Units', powerW: 1500, hours: 14, quantity: 2 },
      { name: 'Lighting', powerW: 40, hours: 14, quantity: 15 },
    ],
  },
  {
    id: 'restaurant',
    name: 'مطعم',
    defaultDevices: [
      { name: 'Commercial Fridge', powerW: 1000, hours: 24, quantity: 4 },
      { name: 'Electric Stove/Oven', powerW: 5000, hours: 8, quantity: 2 },
      { name: 'Exhaust Fan', powerW: 800, hours: 12, quantity: 2 },
      { name: 'AC Units', powerW: 2000, hours: 14, quantity: 4 },
      { name: 'Lighting', powerW: 40, hours: 14, quantity: 30 },
    ],
  },
  {
    id: 'hotel',
    name: 'فندق',
    defaultDevices: [
      { name: 'AC Units (Rooms)', powerW: 1200, hours: 12, quantity: 50 },
      { name: 'Lighting (Rooms)', powerW: 60, hours: 8, quantity: 100 },
      { name: 'Water Heaters', powerW: 2000, hours: 4, quantity: 50 },
      { name: 'Elevator', powerW: 8000, hours: 24, quantity: 2 },
      { name: 'Lobby AC', powerW: 5000, hours: 24, quantity: 2 },
      { name: 'Kitchen Equipment', powerW: 10000, hours: 12, quantity: 1 },
    ],
  },
  {
    id: 'bank',
    name: 'بنك',
    defaultDevices: [
      { name: 'Computers', powerW: 200, hours: 10, quantity: 30 },
      { name: 'AC Units', powerW: 1500, hours: 10, quantity: 10 },
      { name: 'Servers', powerW: 1000, hours: 24, quantity: 2 },
      { name: 'ATM Machines', powerW: 300, hours: 24, quantity: 4 },
      { name: 'Lighting', powerW: 40, hours: 12, quantity: 60 },
    ],
  },
  {
    id: 'supermarket',
    name: 'سوبر ماركت',
    defaultDevices: [
      { name: 'Display Fridges', powerW: 1500, hours: 24, quantity: 10 },
      { name: 'Deep Freezers', powerW: 800, hours: 24, quantity: 8 },
      { name: 'AC Units', powerW: 5000, hours: 16, quantity: 4 },
      { name: 'Lighting', powerW: 40, hours: 16, quantity: 100 },
      { name: 'Cash Registers', powerW: 100, hours: 16, quantity: 5 },
    ],
  },
  {
    id: 'gas_station',
    name: 'طرمبة وقود',
    defaultDevices: [
      { name: 'Fuel Dispensers', powerW: 800, hours: 24, quantity: 6 },
      { name: 'Canopy Lighting', powerW: 100, hours: 12, quantity: 20 },
      { name: 'Shop Fridge', powerW: 600, hours: 24, quantity: 3 },
      { name: 'AC Units (Shop)', powerW: 1500, hours: 24, quantity: 2 },
    ],
  },
  {
    id: 'mining_company',
    name: 'شركة تعدين',
    defaultDevices: [
      { name: 'Processing Machinery', powerW: 50000, hours: 20, quantity: 2 },
      { name: 'Water Pumps', powerW: 10000, hours: 20, quantity: 4 },
      { name: 'Conveyor Belts', powerW: 15000, hours: 20, quantity: 3 },
      { name: 'Camp AC Units', powerW: 1500, hours: 12, quantity: 30 },
      { name: 'Camp Lighting', powerW: 40, hours: 12, quantity: 100 },
    ],
  },
];

export const SOLAR_CONSTANTS = {
  peakSunHours: 5.5, // Average peak sun hours in Sudan/Region
  systemLosses: 1.3, // 30% losses
  inverterSafetyFactor: 1.25, // 25% safety margin for inverter
  batteryDepthOfDischarge: 0.5, // 50% for Lead-Acid/Gel, or 0.8 for Lithium
  batteryVoltage: 48, // Standard system voltage for medium/large systems
  panelWattage: 550, // Standard panel size today
};
