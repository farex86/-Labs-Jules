import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { FACILITY_TYPES, calculateSolarRequirements } from '../../models/SolarCalculatorModel';
import { Sun, Battery, DollarSign, Zap } from 'lucide-react';

const SolarCalculator = () => {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [consumption, setConsumption] = useState('');
  const [results, setResults] = useState(null);

  const handleFacilityChange = (e) => {
    const facilityId = e.target.value;
    setSelectedFacility(facilityId);

    if (facilityId) {
      const facility = FACILITY_TYPES.find(f => f.id === facilityId);
      if (facility) {
        setConsumption(facility.defaultConsumptionKWh.toString());
      }
    } else {
      setConsumption('');
      setResults(null);
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    const consumptionNum = parseFloat(consumption);

    if (!consumptionNum || consumptionNum <= 0) {
      toast.error('الرجاء إدخال استهلاك صحيح أكبر من الصفر.');
      return;
    }

    const calculatedResults = calculateSolarRequirements(consumptionNum);
    setResults(calculatedResults);
    toast.success('تم الحساب بنجاح!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center mb-10">
              <Sun className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                حاسبة الطاقة الشمسية
              </h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك واستهلاكك اليومي.
              </p>
            </div>

            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label htmlFor="facility" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  نوع المنشأة
                </label>
                <select
                  id="facility"
                  value={selectedFacility}
                  onChange={handleFacilityChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md"
                >
                  <option value="">اختر نوع المنشأة...</option>
                  {FACILITY_TYPES.map((facility) => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="consumption" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  الاستهلاك اليومي التقريبي (كيلوواط ساعة)
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="number"
                    id="consumption"
                    value={consumption}
                    onChange={(e) => setConsumption(e.target.value)}
                    placeholder="مثال: 150"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {selectedFacility && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md"
                >
                  <p className="font-semibold mb-1">الأجهزة الشائعة في هذه المنشأة:</p>
                  <ul className="list-disc list-inside">
                    {FACILITY_TYPES.find(f => f.id === selectedFacility)?.appliances.map((app, index) => (
                      <li key={index}>{app}</li>
                    ))}
                  </ul>
                </motion.div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
                >
                  احسب الاحتياجات
                </button>
              </div>
            </form>

            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 pt-10 border-t border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  النتائج التقديرية
                </h3>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="bg-yellow-50 dark:bg-gray-700/50 overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div className="mr-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                              سعة النظام المطلوبة
                            </dt>
                            <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                              {results.requiredCapacityKW} كيلوواط
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-gray-700/50 overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Sun className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="mr-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                              عدد الألواح التقريبي (500 واط)
                            </dt>
                            <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                              {results.numberOfPanels} لوح
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-gray-700/50 overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Battery className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="mr-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                              سعة البطاريات (لـ 1 يوم)
                            </dt>
                            <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                              {results.batteryCapacityKWh} كيلوواط ساعة
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 dark:bg-gray-700/50 overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="mr-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                              التكلفة التقديرية للنظام
                            </dt>
                            <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                              ${results.estimatedCost.toLocaleString()}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
                  * هذه الأرقام تقديرية جداً وتعتمد على عوامل كثيرة مثل الموقع الجغرافي وكفاءة الألواح وتفاصيل التثبيت.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SolarCalculator;
