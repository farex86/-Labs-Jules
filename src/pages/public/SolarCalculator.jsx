import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Calculator, Zap, Battery, Sun } from 'lucide-react';
import { facilityTypes, calculateSolarRequirements } from '../../models/SolarCalculatorModel';

const SolarCalculator = () => {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [customLoad, setCustomLoad] = useState('');
  const [customHours, setCustomHours] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    let loadKw = 0;
    let usageHours = 0;

    if (selectedFacility && selectedFacility !== 'custom') {
      const facility = facilityTypes.find(f => f.id === selectedFacility);
      if (facility) {
        loadKw = facility.defaultLoadKw;
        usageHours = facility.defaultUsageHours;
      }
    } else {
      loadKw = parseFloat(customLoad);
      usageHours = parseFloat(customHours);
    }

    if (isNaN(loadKw) || isNaN(usageHours) || loadKw <= 0 || usageHours <= 0) {
      // Basic validation handled via input types but added fallback check
      return;
    }

    const calculatedResult = calculateSolarRequirements(loadKw, usageHours);
    setResult(calculatedResult);
  };

  const handleFacilityChange = (e) => {
    const val = e.target.value;
    setSelectedFacility(val);
    setResult(null);
    if (val !== 'custom') {
      setCustomLoad('');
      setCustomHours('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-10">
          <Calculator className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400" />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
            حاسبة الطاقة الشمسية
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع المنشأة
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 sm:p-8">
          <form onSubmit={handleCalculate} className="space-y-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                نوع المنشأة
              </label>
              <select
                value={selectedFacility}
                onChange={handleFacilityChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="" disabled>اختر نوع المنشأة</option>
                {facilityTypes.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.nameAr}
                  </option>
                ))}
                <option value="custom">أخرى (إدخال يدوي)</option>
              </select>
            </div>

            {selectedFacility === 'custom' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الحمل الكهربائي (كيلوواط)
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={customLoad}
                    onChange={(e) => setCustomLoad(e.target.value)}
                    required={selectedFacility === 'custom'}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ساعات الاستخدام اليومية
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="24"
                    value={customHours}
                    onChange={(e) => setCustomHours(e.target.value)}
                    required={selectedFacility === 'custom'}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </motion.div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                احسب الاحتياجات
              </button>
            </div>
          </form>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-8"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                النتائج التقديرية
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 flex items-start">
                  <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400 ml-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">الطاقة اليومية المطلوبة</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{result.dailyEnergyKwh} <span className="text-base font-normal">كيلوواط.ساعة</span></p>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4 flex items-start">
                  <Sun className="h-6 w-6 text-yellow-600 dark:text-yellow-400 ml-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">سعة الألواح الشمسية المطلوبة</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{result.requiredSolarCapacityKw} <span className="text-base font-normal">كيلوواط</span></p>
                    <p className="text-xs text-gray-500 mt-1">حوالي {result.recommendedPanels} لوح (500 واط)</p>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 flex items-start">
                  <Zap className="h-6 w-6 text-green-600 dark:text-green-400 ml-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">سعة المحول (الإنفرتر) المقترحة</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{result.recommendedInverterKw} <span className="text-base font-normal">كيلوواط</span></p>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 flex items-start">
                  <Battery className="h-6 w-6 text-purple-600 dark:text-purple-400 ml-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">سعة البطاريات التقريبية</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{result.requiredBatteryCapacityKwh} <span className="text-base font-normal">كيلوواط.ساعة</span></p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SolarCalculator;
