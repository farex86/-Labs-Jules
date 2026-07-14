import React, { useState, useMemo } from 'react';
import { FACILITY_TYPES, APPLIANCES, FACILITY_DEFAULT_APPLIANCES } from '../../utils/solarCalculatorData';
import { calculateSolarSystem } from '../../utils/solarCalculatorLogic';
import { motion, AnimatePresence } from 'framer-motion';

export default function SolarCalculator() {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [activeAppliances, setActiveAppliances] = useState([]);

  const handleFacilityChange = (e) => {
    const facilityId = e.target.value;
    setSelectedFacility(facilityId);

    if (facilityId && FACILITY_DEFAULT_APPLIANCES[facilityId]) {
      const defaultApps = FACILITY_DEFAULT_APPLIANCES[facilityId].map(item => ({
        id: Math.random().toString(36).substr(2, 9),
        applianceId: item.applianceId,
        quantity: item.quantity,
        hoursPerDay: 8, // Default 8 hours
        wattage: APPLIANCES[item.applianceId].typicalWattage
      }));
      setActiveAppliances(defaultApps);
    } else {
      setActiveAppliances([]);
    }
  };

  const addAppliance = () => {
    setActiveAppliances([...activeAppliances, {
      id: Math.random().toString(36).substr(2, 9),
      applianceId: Object.keys(APPLIANCES)[0],
      quantity: 1,
      hoursPerDay: 8,
      wattage: APPLIANCES[Object.keys(APPLIANCES)[0]].typicalWattage
    }]);
  };

  const updateAppliance = (id, field, value) => {
    setActiveAppliances(activeAppliances.map(app => {
      if (app.id === id) {
        const updated = { ...app, [field]: value };
        if (field === 'applianceId') {
          updated.wattage = APPLIANCES[value].typicalWattage;
        }
        return updated;
      }
      return app;
    }));
  };

  const removeAppliance = (id) => {
    setActiveAppliances(activeAppliances.filter(app => app.id !== id));
  };

  const results = useMemo(() => {
    if (activeAppliances.length === 0) return null;
    return calculateSolarSystem(activeAppliances);
  }, [activeAppliances]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-lg m-8" dir="rtl">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">حاسبة الطاقة الشمسية</h1>
        <p className="text-gray-600">اختر نوع المنشأة لمعرفة احتياجاتك من الطاقة الشمسية</p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">نوع المنشأة</label>
        <select
          value={selectedFacility}
          onChange={handleFacilityChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">-- اختر نوع المنشأة --</option>
          {FACILITY_TYPES.map(facility => (
            <option key={facility.id} value={facility.id}>{facility.name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">الأجهزة الكهربائية</h2>
          <button
            onClick={addAppliance}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            + إضافة جهاز
          </button>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {activeAppliances.map((app) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-4 items-end p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-xs text-gray-500 mb-1">الجهاز</label>
                  <select
                    value={app.applianceId}
                    onChange={(e) => updateAppliance(app.id, 'applianceId', e.target.value)}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    {Object.values(APPLIANCES).map(a => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                </div>

                <div className="w-24">
                  <label className="block text-xs text-gray-500 mb-1">الكمية</label>
                  <input
                    type="number"
                    min="1"
                    value={app.quantity}
                    onChange={(e) => updateAppliance(app.id, 'quantity', parseInt(e.target.value) || 0)}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="w-24">
                  <label className="block text-xs text-gray-500 mb-1">ساعات العمل</label>
                  <input
                    type="number"
                    min="1"
                    max="24"
                    value={app.hoursPerDay}
                    onChange={(e) => updateAppliance(app.id, 'hoursPerDay', parseInt(e.target.value) || 0)}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="w-24">
                  <label className="block text-xs text-gray-500 mb-1">القدرة (واط)</label>
                  <input
                    type="number"
                    value={app.wattage}
                    onChange={(e) => updateAppliance(app.id, 'wattage', parseInt(e.target.value) || 0)}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <button
                  onClick={() => removeAppliance(app.id)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="حذف"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {activeAppliances.length === 0 && (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              لا توجد أجهزة مضافة. الرجاء اختيار منشأة أو إضافة أجهزة يدوياً.
            </div>
          )}
        </div>
      </div>

      {results && activeAppliances.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100"
        >
          <h2 className="text-xl font-semibold text-blue-900 mb-6 border-b border-blue-200 pb-2">النتائج التقديرية للنظام</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-1">الاستهلاك اليومي</div>
              <div className="text-2xl font-bold text-gray-900">
                {(results.totalDailyEnergyWh / 1000).toFixed(1)} <span className="text-sm font-normal text-gray-500">كيلو واط/ساعة</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
              <div className="text-sm text-gray-500 mb-1">حجم الألواح المطلوب</div>
              <div className="text-2xl font-bold text-blue-600">
                {results.totalPanelCapacityW} <span className="text-sm font-normal text-gray-500">واط</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
              <div className="text-sm text-gray-500 mb-1">سعة البطاريات (24 فولت)</div>
              <div className="text-2xl font-bold text-yellow-600">
                {results.batteryCapacityAh} <span className="text-sm font-normal text-gray-500">أمبير/ساعة</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
              <div className="text-sm text-gray-500 mb-1">حجم المحول (الإنفرتر)</div>
              <div className="text-2xl font-bold text-green-600">
                {results.inverterSizeW} <span className="text-sm font-normal text-gray-500">واط</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-4 italic">
            * هذه الحسابات تقديرية وتعتمد على كفاءة النظام وافتراضات قياسية. يرجى استشارة مهندس مختص للحصول على تصميم دقيق.
          </p>
        </motion.div>
      )}
    </div>
  );
}
