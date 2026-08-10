import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Calculator, Zap, Battery, Sun, Wrench } from 'lucide-react';
import { FACILITY_TYPES, calculateSolarRequirements } from '../../models/SolarCalculatorModel';

// Helper to generate IDs outside of render
let nextId = 1;
const generateId = () => {
  return nextId++;
};

const SolarCalculator = () => {
  const [facilityType, setFacilityType] = useState(FACILITY_TYPES[0]);
  const [appliances, setAppliances] = useState(() => [
    { id: generateId(), name: '', power: '', hours: '', quantity: 1 }
  ]);

  const results = useMemo(() => calculateSolarRequirements(appliances), [appliances]);

  const addAppliance = () => {
    setAppliances([...appliances, { id: generateId(), name: '', power: '', hours: '', quantity: 1 }]);
  };

  const updateAppliance = (id, field, value) => {
    setAppliances(appliances.map(app =>
      app.id === id ? { ...app, [field]: value } : app
    ));
  };

  const removeAppliance = (id) => {
    setAppliances(appliances.filter(app => app.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
            <Calculator className="w-8 h-8 text-blue-600" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            احسب احتياجاتك من الطاقة الشمسية بناءً على استهلاكك اليومي
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              نوع المنشأة
            </label>
            <select
              value={facilityType}
              onChange={(e) => setFacilityType(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            >
              {FACILITY_TYPES.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">الأجهزة المستهلكة</h2>
              <button
                onClick={addAppliance}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                إضافة جهاز
              </button>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400">
              <div className="col-span-4">اسم الجهاز</div>
              <div className="col-span-2">القدرة (واط)</div>
              <div className="col-span-2">ساعات التشغيل</div>
              <div className="col-span-2">العدد</div>
              <div className="col-span-2 text-center">الإجراء</div>
            </div>

            {appliances.map((appliance) => (
              <div key={appliance.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 md:p-0 bg-gray-50 md:bg-transparent dark:bg-gray-700/50 md:dark:bg-transparent rounded-lg border border-gray-200 md:border-none dark:border-gray-600">
                <div className="col-span-1 md:col-span-4">
                  <label className="block md:hidden text-xs text-gray-500 mb-1">اسم الجهاز</label>
                  <input
                    type="text"
                    placeholder="مثال: مكيف، ثلاجة..."
                    value={appliance.name}
                    onChange={(e) => updateAppliance(appliance.id, 'name', e.target.value)}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block md:hidden text-xs text-gray-500 mb-1">القدرة (واط)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="واط"
                    value={appliance.power}
                    onChange={(e) => updateAppliance(appliance.id, 'power', e.target.value)}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block md:hidden text-xs text-gray-500 mb-1">ساعات التشغيل (يومياً)</label>
                  <input
                    type="number"
                    min="0"
                    max="24"
                    placeholder="ساعات"
                    value={appliance.hours}
                    onChange={(e) => updateAppliance(appliance.id, 'hours', e.target.value)}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                   <label className="block md:hidden text-xs text-gray-500 mb-1">العدد</label>
                  <input
                    type="number"
                    min="1"
                    value={appliance.quantity}
                    onChange={(e) => updateAppliance(appliance.id, 'quantity', e.target.value)}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 flex justify-end md:justify-center">
                  <button
                    onClick={() => removeAppliance(appliance.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
                    title="حذف الجهاز"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            {appliances.length === 0 && (
              <div className="text-center text-gray-500 py-6">
                لم يتم إضافة أي أجهزة. انقر على "إضافة جهاز" للبدء.
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 mb-2">
              <Zap className="w-6 h-6" />
              <h3 className="font-semibold">الاستهلاك اليومي</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
              {results.dailyConsumptionWh.toLocaleString()} <span className="text-base font-normal text-gray-500">واط.ساعة</span>
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 text-yellow-500 mb-2">
              <Sun className="w-6 h-6" />
              <h3 className="font-semibold">الألواح المطلوبة</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
              {results.panelCapacityW.toLocaleString()} <span className="text-base font-normal text-gray-500">واط</span>
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 text-purple-500 mb-2">
              <Wrench className="w-6 h-6" />
              <h3 className="font-semibold">سعة المحول (الإنفرتر)</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
              {results.inverterCapacityW.toLocaleString()} <span className="text-base font-normal text-gray-500">واط</span>
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 text-green-500 mb-2">
              <Battery className="w-6 h-6" />
              <h3 className="font-semibold">سعة البطاريات</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
              {results.batteryCapacityWh.toLocaleString()} <span className="text-base font-normal text-gray-500">واط.ساعة</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
