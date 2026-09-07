import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import {
  Building, Factory, Tractor, Bird, TreePine,
  Stethoscope, Hospital, Croissant, Store, Wrench,
  Droplet, Droplets, Moon, Printer, Coffee,
  Utensils, Hotel, Landmark, ShoppingCart, Fuel,
  Pickaxe, Sun, Battery, Zap, Plus, Trash2
} from 'lucide-react';
import { FACILITY_TYPES, APPLIANCES_BY_FACILITY, calculateSystemSize } from '../../models/SolarCalculatorModel';

const ICON_MAP = {
  building: Building,
  factory: Factory,
  tractor: Tractor,
  bird: Bird,
  plant: TreePine,
  stethoscope: Stethoscope,
  hospital: Hospital,
  croissant: Croissant,
  store: Store,
  wrench: Wrench,
  droplet: Droplet,
  droplets: Droplets,
  moon: Moon,
  printer: Printer,
  coffee: Coffee,
  utensils: Utensils,
  hotel: Hotel,
  landmark: Landmark,
  'shopping-cart': ShoppingCart,
  fuel: Fuel,
  pickaxe: Pickaxe,
  snow: Factory // Fallback for ice factory
};

let nextId = 0;
const generateId = () => `app_${Date.now()}_${nextId++}`;

export default function SolarCalculator() {
  const [selectedFacilityId, setSelectedFacilityId] = useState('');
  const [appliances, setAppliances] = useState([]);
  const [results, setResults] = useState({
    panelsKW: 0,
    inverterKW: 0,
    batteryKWh: 0
  });

  const handleFacilitySelect = (e) => {
    const facilityId = e.target.value;
    setSelectedFacilityId(facilityId);

    if (facilityId && APPLIANCES_BY_FACILITY[facilityId]) {
      // Deep copy to prevent mutating constants
      const defaultAppliances = APPLIANCES_BY_FACILITY[facilityId].map(app => ({
        id: generateId(),
        name: app.name,
        watts: app.defaultWatts,
        hours: app.defaultHours,
        qty: app.defaultQty
      }));
      setAppliances(defaultAppliances);
      updateCalculations(defaultAppliances);
    } else {
      setAppliances([]);
      setResults({ panelsKW: 0, inverterKW: 0, batteryKWh: 0 });
    }
  };

  const updateCalculations = (currentAppliances) => {
    const calcResults = calculateSystemSize(currentAppliances);
    setResults(calcResults);
  };

  const handleApplianceChange = (id, field, value) => {
    const updatedAppliances = appliances.map(app => {
      if (app.id === id) {
        return { ...app, [field]: value };
      }
      return app;
    });
    setAppliances(updatedAppliances);
    updateCalculations(updatedAppliances);
  };

  const addAppliance = () => {
    const newAppliance = {
      id: generateId(),
      name: 'جهاز جديد',
      watts: 100,
      hours: 1,
      qty: 1
    };
    const updatedAppliances = [...appliances, newAppliance];
    setAppliances(updatedAppliances);
    updateCalculations(updatedAppliances);
  };

  const removeAppliance = (id) => {
    const updatedAppliances = appliances.filter(app => app.id !== id);
    setAppliances(updatedAppliances);
    updateCalculations(updatedAppliances);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            احسب حجم النظام الشمسي المناسب لمنشأتك بناءً على أنماط الاستهلاك
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="mb-8">
              <label htmlFor="facility" className="block text-lg font-medium text-gray-700 mb-4">
                اختر نوع المنشأة
              </label>
              <div className="relative">
                <select
                  id="facility"
                  name="facility"
                  className="block w-full pl-3 pr-10 py-4 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg rounded-xl shadow-sm border bg-gray-50 appearance-none"
                  value={selectedFacilityId}
                  onChange={handleFacilitySelect}
                >
                  <option value="">-- يرجى اختيار نوع المنشأة --</option>
                  {FACILITY_TYPES.map((facility) => {
                    const Icon = ICON_MAP[facility.icon] || Building;
                    return (
                      <option key={facility.id} value={facility.id}>
                        {facility.label}
                      </option>
                    );
                  })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-gray-500">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {selectedFacilityId && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Appliances List */}
                <div className="lg:col-span-2">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">الأجهزة الكهربائية</h2>
                    <button
                      onClick={addAppliance}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Plus className="h-5 w-5 ml-2" />
                      إضافة جهاز
                    </button>
                  </div>

                  <div className="space-y-4">
                    {appliances.map((app, index) => (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={app.id}
                        className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row gap-4 items-end sm:items-center"
                      >
                        <div className="w-full sm:w-1/3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">اسم الجهاز</label>
                          <input
                            type="text"
                            value={app.name}
                            onChange={(e) => handleApplianceChange(app.id, 'name', e.target.value)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                          />
                        </div>
                        <div className="w-full sm:w-1/6">
                          <label className="block text-sm font-medium text-gray-700 mb-1">العدد</label>
                          <input
                            type="number"
                            min="1"
                            value={app.qty}
                            onChange={(e) => handleApplianceChange(app.id, 'qty', e.target.value)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                          />
                        </div>
                        <div className="w-full sm:w-1/5">
                          <label className="block text-sm font-medium text-gray-700 mb-1">القدرة (واط)</label>
                          <input
                            type="number"
                            min="1"
                            value={app.watts}
                            onChange={(e) => handleApplianceChange(app.id, 'watts', e.target.value)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                          />
                        </div>
                        <div className="w-full sm:w-1/5">
                          <label className="block text-sm font-medium text-gray-700 mb-1">ساعات التشغيل</label>
                          <input
                            type="number"
                            min="1"
                            max="24"
                            value={app.hours}
                            onChange={(e) => handleApplianceChange(app.id, 'hours', e.target.value)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                          />
                        </div>
                        <div className="w-full sm:w-auto flex justify-end pb-1">
                          <button
                            onClick={() => removeAppliance(app.id)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors"
                            title="حذف الجهاز"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                    {appliances.length === 0 && (
                      <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                        <p className="text-gray-500">لا توجد أجهزة مضافة. قم بإضافة جهاز للبدء.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Results Panel */}
                <div className="lg:col-span-1">
                  <div className="bg-blue-600 rounded-2xl p-6 text-white sticky top-6 shadow-2xl">
                    <h3 className="text-2xl font-bold mb-6 border-b border-blue-400 pb-4">نتائج الحساب</h3>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-500 p-3 rounded-lg">
                          <Sun className="h-8 w-8 text-yellow-300" />
                        </div>
                        <div>
                          <p className="text-blue-200 text-sm font-medium">سعة الألواح الشمسية</p>
                          <p className="text-3xl font-bold">{results.panelsKW} <span className="text-lg font-normal">kW</span></p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="bg-blue-500 p-3 rounded-lg">
                          <Zap className="h-8 w-8 text-yellow-300" />
                        </div>
                        <div>
                          <p className="text-blue-200 text-sm font-medium">سعة المحول (الإنفرتر)</p>
                          <p className="text-3xl font-bold">{results.inverterKW} <span className="text-lg font-normal">kW</span></p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="bg-blue-500 p-3 rounded-lg">
                          <Battery className="h-8 w-8 text-yellow-300" />
                        </div>
                        <div>
                          <p className="text-blue-200 text-sm font-medium">سعة البطاريات المطلوبة</p>
                          <p className="text-3xl font-bold">{results.batteryKWh} <span className="text-lg font-normal">kWh</span></p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-blue-400">
                      <p className="text-sm text-blue-200 leading-relaxed">
                        * هذه النتائج تقديرية بناءً على ساعات التشغيل والاستهلاك المبدئي. يفضل استشارة مهندس مختص للحصول على تصميم دقيق.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
