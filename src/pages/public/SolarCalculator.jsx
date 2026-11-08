import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Calculator, Zap, Sun, Battery, Activity } from 'lucide-react';
import { facilityTypes, calculateSolarRequirements } from '../../models/SolarCalculatorModel';

const SolarCalculator = () => {
  const [consumption, setConsumption] = useState('');
  const [selectedFacility, setSelectedFacility] = useState(facilityTypes[0].id);
  const [results, setResults] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!consumption || isNaN(consumption) || Number(consumption) <= 0) {
      return;
    }

    const calculation = calculateSolarRequirements(Number(consumption));
    setResults(calculation);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4"
          >
            <Calculator size={32} />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">حاسبة الطاقة الشمسية</h1>
          <p className="text-lg text-gray-600">
            احسب احتياجاتك من الطاقة الشمسية بناءً على استهلاكك ونوع المنشأة
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نوع المنشأة
                </label>
                <select
                  value={selectedFacility}
                  onChange={(e) => setSelectedFacility(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  {facilityTypes.map((facility) => (
                    <option key={facility.id} value={facility.id}>
                      {facility.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاستهلاك اليومي التقريبي (كيلوواط/ساعة)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Activity className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    min="1"
                    step="0.1"
                    value={consumption}
                    onChange={(e) => setConsumption(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-right"
                    placeholder="أدخل قيمة الاستهلاك"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 space-x-reverse"
              >
                <Zap className="h-5 w-5" />
                <span>احسب الاحتياجات</span>
              </button>
            </form>
          </div>

          {results && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-gray-50 border-t border-gray-100 p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">النتائج التقديرية</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4 space-x-reverse">
                  <div className="p-3 bg-yellow-50 rounded-lg text-yellow-600">
                    <Sun className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">الألواح الشمسية المطلوبة</p>
                    <p className="text-2xl font-bold text-gray-900">{results.numberOfPanels} لوح</p>
                    <p className="text-xs text-gray-400 mt-1">بقدرة إجمالية {results.totalSolarArrayKw} كيلوواط</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4 space-x-reverse">
                  <div className="p-3 bg-green-50 rounded-lg text-green-600">
                    <Battery className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">البطاريات المطلوبة</p>
                    <p className="text-2xl font-bold text-gray-900">{results.numberOfBatteries} بطارية</p>
                    <p className="text-xs text-gray-400 mt-1">لتغطية الاستهلاك ليلاً</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4 space-x-reverse">
                  <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                    <Activity className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">حجم المحول (الإنفرتر)</p>
                    <p className="text-2xl font-bold text-gray-900">{results.inverterSizeKw} كيلوواط</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4 space-x-reverse">
                  <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                    <Calculator className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">التكلفة التقديرية</p>
                    <p className="text-2xl font-bold text-gray-900">${results.estimatedCostUsd}</p>
                    <p className="text-xs text-gray-400 mt-1">تكلفة تقريبية للمواد</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SolarCalculator;
