import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
// eslint-disable-next-line no-unused-vars
import { Sun, Battery, Zap, DollarSign, Activity } from 'lucide-react';
import { FACILITY_TYPES, calculateSolarSystem } from '../../models/SolarCalculatorModel';

export default function SolarCalculator() {
  const [selectedFacility, setSelectedFacility] = useState(FACILITY_TYPES[1].id);
  const [consumptionMultiplier, setConsumptionMultiplier] = useState(1);

  const facility = FACILITY_TYPES.find(f => f.id === selectedFacility);

  // Estimate daily consumption based on base load and peak hours, scaled by user multiplier
  const estimatedDailyKWh = (facility.baseLoadkW * facility.peakHours) * consumptionMultiplier;

  const results = useMemo(() => {
    return calculateSolarSystem(selectedFacility, estimatedDailyKWh);
  }, [selectedFacility, estimatedDailyKWh]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع المنشأة وحجم الاستهلاك.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Facility Type Selector */}
            <div>
              <label htmlFor="facility-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                نوع المنشأة
              </label>
              <select
                id="facility-type"
                value={selectedFacility}
                onChange={(e) => setSelectedFacility(e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
              >
                {FACILITY_TYPES.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Consumption Slider */}
            <div>
              <label htmlFor="consumption" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                مستوى الاستهلاك (تقديري)
              </label>
              <input
                type="range"
                id="consumption"
                min="0.5"
                max="3"
                step="0.1"
                value={consumptionMultiplier}
                onChange={(e) => setConsumptionMultiplier(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span>منخفض</span>
                <span>متوسط</span>
                <span>مرتفع</span>
              </div>
              <p className="mt-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
                الاستهلاك اليومي التقديري: {Math.round(estimatedDailyKWh)} كيلوواط ساعة (kWh)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* System Size */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center text-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full mb-4">
              <Sun className="h-6 w-6 text-orange-600 dark:text-orange-300" />
            </div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">حجم النظام (الألواح)</h3>
            <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
              {results.systemSizeKW} kW
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              حوالي {results.numberOfPanels} لوح (550W)
            </p>
          </div>

          {/* Inverter Size */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center text-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
              <Activity className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">حجم المحول (Inverter)</h3>
            <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
              {results.inverterSizeKW} kW
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              النظام المقترح: {results.recommendedSystemType}
            </p>
          </div>

          {/* Battery Capacity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center text-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full mb-4">
              <Battery className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">سعة البطاريات المطلوبة</h3>
            <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
              {results.batteryCapacityKWh} kWh
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              احتياطي تقريبي (Lithium)
            </p>
          </div>

          {/* Estimated Cost */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center text-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
              <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-300" />
            </div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">التكلفة التقديرية</h3>
            <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
              ${results.estimatedCostUSD.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              تقريبية، قد تختلف حسب السوق
            </p>
          </div>
        </motion.div>

        <div className="text-center mt-8">
           <p className="text-xs text-gray-400 dark:text-gray-500">
             * هذه الحسابات تقديرية فقط ولا تغني عن استشارة مهندس متخصص.
           </p>
        </div>

      </div>
    </div>
  );
}
