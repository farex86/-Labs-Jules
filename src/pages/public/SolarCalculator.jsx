import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sun, Zap, Battery, ZapOff, ArrowRight } from 'lucide-react';
import { FACILITY_TYPES, calculateSolarSystem } from '../../models/SolarCalculatorModel';

export default function SolarCalculator() {
  const [selectedFacilityId, setSelectedFacilityId] = useState('');
  const [appliances, setAppliances] = useState([]);

  // Handle facility selection
  const handleFacilityChange = (e) => {
    const facilityId = e.target.value;
    setSelectedFacilityId(facilityId);

    if (facilityId) {
      const facility = FACILITY_TYPES.find(f => f.id === facilityId);
      if (facility) {
        // Deep clone to avoid mutating the original model data
        setAppliances(JSON.parse(JSON.stringify(facility.defaultAppliances)));
      }
    } else {
      setAppliances([]);
    }
  };

  // Handle appliance updates
  const handleApplianceChange = (index, field, value) => {
    const updated = [...appliances];
    updated[index] = { ...updated[index], [field]: Number(value) >= 0 ? Number(value) : 0 };
    setAppliances(updated);
  };

  // Remove an appliance
  const handleRemoveAppliance = (index) => {
    const updated = appliances.filter((_, i) => i !== index);
    setAppliances(updated);
  };

  // Calculate results using pure function from the model, derived during render
  const results = useMemo(() => calculateSolarSystem(appliances), [appliances]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-right" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Calculator className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              حاسبة الطاقة الشمسية
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                1. اختر نوع المنشأة
              </h2>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  نوع المنشأة / النشاط التجاري
                </label>
                <select
                  value={selectedFacilityId}
                  onChange={handleFacilityChange}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">-- اختر من القائمة --</option>
                  {FACILITY_TYPES.map(facility => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name}
                    </option>
                  ))}
                </select>
              </div>

              {appliances.length > 0 && (
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      2. الأجهزة والاحتياجات
                    </h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th className="px-4 py-3">الجهاز</th>
                          <th className="px-4 py-3 text-center">القدرة (واط)</th>
                          <th className="px-4 py-3 text-center">الكمية</th>
                          <th className="px-4 py-3 text-center">ساعات التشغيل/يوم</th>
                          <th className="px-4 py-3 text-center">إجراء</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appliances.map((app, index) => (
                          <motion.tr
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                          >
                            <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">
                              {app.name}
                            </td>
                            <td className="px-4 py-4">
                              <input
                                type="number"
                                value={app.power}
                                onChange={(e) => handleApplianceChange(index, 'power', e.target.value)}
                                className="w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 mx-auto dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                min="0"
                              />
                            </td>
                            <td className="px-4 py-4">
                              <input
                                type="number"
                                value={app.quantity}
                                onChange={(e) => handleApplianceChange(index, 'quantity', e.target.value)}
                                className="w-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 mx-auto dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                min="0"
                              />
                            </td>
                            <td className="px-4 py-4">
                              <input
                                type="number"
                                value={app.hours}
                                onChange={(e) => handleApplianceChange(index, 'hours', e.target.value)}
                                className="w-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 mx-auto dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                min="0"
                                max="24"
                              />
                            </td>
                            <td className="px-4 py-4 text-center">
                              <button
                                onClick={() => handleRemoveAppliance(index)}
                                className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400"
                              >
                                إزالة
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-start">
                    <ArrowRight className="w-4 h-4 ml-1 mt-0.5 inline-block text-blue-500" />
                    <span>ملاحظة: يمكنك تعديل القدرة، الكمية، أو ساعات التشغيل للحصول على حسابات دقيقة تناسب منشأتك.</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg border border-blue-500 p-6 text-white sticky top-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Sun className="ml-2 h-6 w-6" />
                نتائج الحساب
              </h2>

              {!selectedFacilityId ? (
                <div className="text-blue-200 text-center py-8">
                  <p>الرجاء اختيار نوع المنشأة لرؤية النتائج المقدرة.</p>
                </div>
              ) : (
                <div className="space-y-6">

                  <div className="bg-blue-700/50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Zap className="h-5 w-5 ml-2 text-yellow-400" />
                        <span className="text-blue-100 font-medium">سعة الإنفرتر المطلوبة</span>
                      </div>
                    </div>
                    <div className="mt-2 text-3xl font-bold">
                      {results.inverterSizeKW} <span className="text-lg font-normal text-blue-200">كيلو واط (kW)</span>
                    </div>
                    <p className="text-xs text-blue-200 mt-1">يغطي أقصى حمل تشغيل مع هامش أمان</p>
                  </div>

                  <div className="bg-blue-700/50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Sun className="h-5 w-5 ml-2 text-yellow-400" />
                        <span className="text-blue-100 font-medium">الألواح الشمسية</span>
                      </div>
                    </div>
                    <div className="mt-2 text-3xl font-bold">
                      {results.panelsCount} <span className="text-lg font-normal text-blue-200">لوح</span>
                    </div>
                    <p className="text-xs text-blue-200 mt-1">بناءً على ألواح بقدرة {results.panelSizeW} واط للوح الواحد</p>
                  </div>

                  <div className="bg-blue-700/50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Battery className="h-5 w-5 ml-2 text-yellow-400" />
                        <span className="text-blue-100 font-medium">سعة البطاريات (48V)</span>
                      </div>
                    </div>
                    <div className="mt-2 text-3xl font-bold">
                      {results.batteryCapacityAh} <span className="text-lg font-normal text-blue-200">أمبير-ساعة (Ah)</span>
                    </div>
                    <p className="text-xs text-blue-200 mt-1">تكفي لتشغيل النظام ليوم واحد بدون شمس</p>
                  </div>

                  <div className="bg-blue-700/50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ZapOff className="h-5 w-5 ml-2 text-yellow-400" />
                        <span className="text-blue-100 font-medium">إجمالي الاستهلاك اليومي</span>
                      </div>
                    </div>
                    <div className="mt-2 text-xl font-bold">
                      {(results.totalEnergyWh / 1000).toFixed(1)} <span className="text-sm font-normal text-blue-200">كيلو واط-ساعة (kWh)</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-blue-500/50">
                    <p className="text-xs text-blue-200 text-justify">
                      * ملاحظة: هذه الحسابات تقديرية. لتصميم النظام النهائي وتقديم عرض سعر دقيق، ننصح بالتواصل مع شركات التركيب المعتمدة في النظام.
                    </p>
                  </div>

                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
