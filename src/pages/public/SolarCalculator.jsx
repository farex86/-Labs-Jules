import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sun, Zap, Battery, Cpu, Activity } from 'lucide-react';
import { FACILITY_TYPES, calculateSolarSystem } from '../../models/SolarCalculatorModel';

const SolarCalculator = () => {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [customConsumption, setCustomConsumption] = useState('');
  const [results, setResults] = useState(null);

  const handleFacilityChange = (e) => {
    const facilityId = e.target.value;
    setSelectedFacility(facilityId);
    if (facilityId) {
      const facility = FACILITY_TYPES.find((f) => f.id === facilityId);
      if (facility) {
        setCustomConsumption(facility.baseConsumptionKWh.toString());
      }
    } else {
      setCustomConsumption('');
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    const consumptionKWh = parseFloat(customConsumption);
    if (!isNaN(consumptionKWh) && consumptionKWh > 0) {
      const calculation = calculateSolarSystem(consumptionKWh);
      setResults(calculation);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Calculator className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            احسب حجم النظام الشمسي المناسب لمنشأتك
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              تفاصيل الاستهلاك
            </h2>
            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  نوع المنشأة
                </label>
                <select
                  value={selectedFacility}
                  onChange={handleFacilityChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  dir="rtl"
                >
                  <option value="">اختر نوع المنشأة...</option>
                  {FACILITY_TYPES.map((facility) => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name}
                    </option>
                  ))}
                </select>
                {selectedFacility && (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {FACILITY_TYPES.find(f => f.id === selectedFacility)?.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الاستهلاك اليومي التقديري (كيلوواط ساعة)
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    min="1"
                    step="0.1"
                    required
                    value={customConsumption}
                    onChange={(e) => setCustomConsumption(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-16 pr-4 py-3 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-right"
                    placeholder="أدخل قيمة الاستهلاك"
                    dir="ltr"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 sm:text-sm">kWh</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                احسب النظام المناسب
              </button>
            </form>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 relative overflow-hidden"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              النتائج المقترحة
            </h2>

            {results ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
                dir="rtl"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                    <Sun className="h-6 w-6 text-blue-500 dark:text-blue-400 mb-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">حجم النظام</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {results.systemSizeKW} kW
                    </span>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                    <Activity className="h-6 w-6 text-green-500 dark:text-green-400 mb-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">عدد الألواح</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {results.numberOfPanels} (400W)
                    </span>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                    <Cpu className="h-6 w-6 text-purple-500 dark:text-purple-400 mb-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">حجم الانفرتر</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {results.inverterSizeKW} kW
                    </span>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                    <Battery className="h-6 w-6 text-orange-500 dark:text-orange-400 mb-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">سعة البطاريات</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                      {results.batteryCapacity}
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white pr-2">
                        الإنتاج اليومي المتوقع:
                      </span>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {results.dailyProductionExpected} kWh
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[250px] flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                <Calculator className="h-16 w-16 mb-4 opacity-50" />
                <p className="text-center text-sm">
                  أدخل تفاصيل الاستهلاك<br/>لرؤية النظام المقترح
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
