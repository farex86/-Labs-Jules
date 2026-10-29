import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Calculator, Sun, Zap, DollarSign } from 'lucide-react';
import { FACILITY_TYPES, calculateSolarNeeds } from '../../models/SolarCalculatorModel';
import toast, { Toaster } from 'react-hot-toast';

export default function SolarCalculator() {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [customConsumption, setCustomConsumption] = useState('');
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    let consumptionToUse = 0;

    if (selectedFacility) {
      const facility = FACILITY_TYPES.find(f => f.id === selectedFacility);
      if (facility) consumptionToUse = facility.consumption;
    } else if (customConsumption) {
      consumptionToUse = parseFloat(customConsumption);
    }

    if (!consumptionToUse || consumptionToUse <= 0) {
      toast.error('الرجاء إدخال استهلاك صحيح أو اختيار نوع المنشأة', {
        position: 'bottom-center'
      });
      return;
    }

    const calculationResults = calculateSolarNeeds(consumptionToUse);
    setResults(calculationResults);
    toast.success('تم الحساب بنجاح', {
      position: 'bottom-center'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8" dir="rtl">
      <Toaster />
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400">
              <Calculator className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">حاسبة الطاقة الشمسية</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اختر نوع المنشأة
              </label>
              <select
                value={selectedFacility}
                onChange={(e) => {
                  setSelectedFacility(e.target.value);
                  setCustomConsumption('');
                }}
                className="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">اختر من القائمة...</option>
                {FACILITY_TYPES.map(facility => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name} (متوسط {facility.consumption} كيلوواط/يوم)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                أو أدخل الاستهلاك اليومي (كيلوواط/ساعة)
              </label>
              <input
                type="number"
                value={customConsumption}
                onChange={(e) => {
                  setCustomConsumption(e.target.value);
                  setSelectedFacility('');
                }}
                placeholder="مثال: 50"
                className="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-200 dark:shadow-none"
          >
            احسب التكلفة والاحتياجات
          </button>

          {results && (

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 grid sm:grid-cols-3 gap-6"
            >
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 rounded-2xl border border-yellow-100 dark:border-yellow-900/50">
                <Sun className="w-8 h-8 text-yellow-600 mb-4" />
                <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-1">عدد الألواح المطلوبة</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{results.numberOfPanels}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">لوح شمسي</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                <Zap className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-1">السعة الإجمالية</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{results.totalCapacity}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">كيلوواط</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-900/50">
                <DollarSign className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-1">التكلفة التقديرية</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${results.estimatedCost.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">دولار أمريكي</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
