import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Calculator, Zap, Battery, Sun, Activity } from 'lucide-react';
import { facilityTypes, calculateSolarSystem } from '../../models/SolarCalculatorModel';
import { motion } from 'framer-motion';

const _motion = motion; // Fix linting rule for unused vars since motion is used in JSX

const SolarCalculator = () => {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [appliances, setAppliances] = useState([]);

  // Handle facility selection
  const handleFacilityChange = (e) => {
    const facilityId = e.target.value;
    setSelectedFacility(facilityId);

    if (facilityId) {
      const facility = facilityTypes.find(f => f.id === facilityId);
      if (facility) {
        // Create a deep copy of appliances so we can modify them independently
        setAppliances(JSON.parse(JSON.stringify(facility.appliances)));
      }
    } else {
      setAppliances([]);
    }
  };

  // Update appliance value
  const updateAppliance = (index, field, value) => {
    const updated = [...appliances];
    updated[index][field] = value;
    setAppliances(updated);
  };

  // Add new custom appliance
  const addAppliance = () => {
    setAppliances([
      ...appliances,
      { id: `custom_${Date.now()}`, name: 'جهاز جديد', quantity: 1, power: 100, hours: 4 }
    ]);
  };

  // Remove an appliance
  const removeAppliance = (index) => {
    const updated = appliances.filter((_, i) => i !== index);
    setAppliances(updated);
  };

  // Calculate results based on appliances
  const results = useMemo(() => {
    if (appliances.length > 0) {
      return calculateSolarSystem(appliances);
    }
    return null;
  }, [appliances]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
            <Calculator className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع المنشأة وأجهزتك
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  اختر نوع المنشأة للبدء (اختياري)
                </label>
                <select
                  value={selectedFacility}
                  onChange={handleFacilityChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="">-- اختر نوع المنشأة --</option>
                  {facilityTypes.map(facility => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">قائمة الأجهزة</h2>
                  <button
                    onClick={addAppliance}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة جهاز
                  </button>
                </div>

                {appliances.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
                    الرجاء اختيار منشأة أو إضافة أجهزة يدوياً
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appliances.map((app, index) => (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={`${app.id}-${index}`}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-xl"
                      >
                        <div className="md:col-span-4">
                          <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1 md:hidden">اسم الجهاز</label>
                          <input
                            type="text"
                            value={app.name}
                            onChange={(e) => updateAppliance(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            placeholder="اسم الجهاز"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1 md:hidden">العدد</label>
                          <input
                            type="number"
                            min="1"
                            value={app.quantity}
                            onChange={(e) => updateAppliance(index, 'quantity', e.target.value)}
                            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div className="md:col-span-3">
                          <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1 md:hidden">الاستهلاك (واط)</label>
                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              value={app.power}
                              onChange={(e) => updateAppliance(index, 'power', e.target.value)}
                              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white pr-10"
                            />
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
                              W
                            </span>
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1 md:hidden">ساعات التشغيل (يومياً)</label>
                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              max="24"
                              value={app.hours}
                              onChange={(e) => updateAppliance(index, 'hours', e.target.value)}
                              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white pr-10"
                            />
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
                              H
                            </span>
                          </div>
                        </div>
                        <div className="md:col-span-1 flex justify-end">
                          <button
                            onClick={() => removeAppliance(index)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="حذف الجهاز"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 text-white sticky top-8"
            >
              <h2 className="text-2xl font-bold mb-6 border-b border-blue-400/30 pb-4">
                النتائج والتوصيات
              </h2>

              {!results ? (
                <div className="text-center py-8 opacity-75">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  أضف أجهزة لرؤية النتائج
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Daily Consumption */}
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2 opacity-80">
                      <Zap className="w-5 h-5" />
                      <h3 className="font-semibold">الاستهلاك اليومي</h3>
                    </div>
                    <div className="text-3xl font-bold">
                      {results.totalDailyConsumptionKWh} <span className="text-lg font-normal opacity-80">kWh</span>
                    </div>
                    <div className="text-sm opacity-70 mt-1">
                      (إجمالي ذروة السحب: {results.totalPeakPower} واط)
                    </div>
                  </div>

                  {/* Solar System Size */}
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2 opacity-80">
                      <Sun className="w-5 h-5" />
                      <h3 className="font-semibold">حجم المنظومة الشمسية</h3>
                    </div>
                    <div className="text-3xl font-bold">
                      {results.recommendedSolarSizeKW} <span className="text-lg font-normal opacity-80">kW</span>
                    </div>
                    <div className="text-sm opacity-70 mt-1">
                      حجم الألواح الموصى به
                    </div>
                  </div>

                  {/* Inverter */}
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2 opacity-80">
                      <Activity className="w-5 h-5" />
                      <h3 className="font-semibold">حجم الإنفرتر (المحول)</h3>
                    </div>
                    <div className="text-3xl font-bold">
                      {results.recommendedInverterSizeKW} <span className="text-lg font-normal opacity-80">kW</span>
                    </div>
                    <div className="text-sm opacity-70 mt-1">
                      يشمل هامش أمان 25%
                    </div>
                  </div>

                  {/* Battery */}
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2 opacity-80">
                      <Battery className="w-5 h-5" />
                      <h3 className="font-semibold">سعة البطاريات المطلوبة</h3>
                    </div>
                    <div className="text-3xl font-bold">
                      {results.requiredBatteryCapacityAh} <span className="text-lg font-normal opacity-80">Ah</span>
                    </div>
                    <div className="text-sm opacity-70 mt-1">
                      نظام {results.systemVoltage} فولت (استقلالية ليوم واحد)
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-blue-400/30 text-xs opacity-75 text-center">
                    * هذه الحسابات تقديرية. يرجى استشارة مهندس مختص للحصول على تصميم دقيق لمنظومتك.
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
