import React, { useState } from 'react';
import { facilityTypes, calculateSolarNeeds } from '../../models/SolarCalculatorModel';
import { Calculator, Sun, Battery, DollarSign, Activity } from 'lucide-react';

const SolarCalculator = () => {
  const [facilityId, setFacilityId] = useState(facilityTypes[0].id);
  const [customLoad, setCustomLoad] = useState('');
  const [results, setResults] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const loadKw = parseFloat(customLoad);
    const calcResults = calculateSolarNeeds(facilityId, isNaN(loadKw) ? 0 : loadKw);
    setResults(calcResults);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <Sun className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">حاسبة الطاقة الشمسية</h1>
          <p className="text-lg text-gray-600">احسب احتياجات منشأتك من الطاقة الشمسية بسهولة</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-2">
                  نوع المنشأة
                </label>
                <select
                  id="facility"
                  value={facilityId}
                  onChange={(e) => setFacilityId(e.target.value)}
                  className="w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg border bg-gray-50"
                >
                  {facilityTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="load" className="block text-sm font-medium text-gray-700 mb-2">
                  الحمل التقديري (كيلوواط) - اختياري
                </label>
                <input
                  type="number"
                  id="load"
                  value={customLoad}
                  onChange={(e) => setCustomLoad(e.target.value)}
                  placeholder="اتركه فارغاً لاستخدام المعدل الافتراضي"
                  className="w-full px-4 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg border bg-gray-50"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Calculator className="ml-2 h-5 w-5" />
                احسب الاحتياجات
              </button>
            </form>
          </div>

          {results && (
            <div className="bg-blue-50 border-t border-blue-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                النتائج التقديرية لـ {results.facilityName}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm flex items-center border border-gray-100">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600 ml-4">
                    <Activity className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">حجم النظام (كيلوواط)</p>
                    <p className="text-2xl font-bold text-gray-900">{results.systemSizeKw}</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm flex items-center border border-gray-100">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 ml-4">
                    <Sun className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">عدد الألواح التقريبي</p>
                    <p className="text-2xl font-bold text-gray-900">{results.numberOfPanels}</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm flex items-center border border-gray-100">
                  <div className="p-3 rounded-full bg-green-100 text-green-600 ml-4">
                    <Battery className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">سعة البطاريات (كيلوواط/ساعة)</p>
                    <p className="text-2xl font-bold text-gray-900">{results.batteryCapacityKwh}</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm flex items-center border border-gray-100">
                  <div className="p-3 rounded-full bg-emerald-100 text-emerald-600 ml-4">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">التكلفة التقديرية ($)</p>
                    <p className="text-2xl font-bold text-gray-900">{results.estimatedCostUsd}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center text-sm text-gray-500">
                <p>* هذه النتائج هي تقديرات أولية. يرجى استشارة مهندس متخصص للحصول على دراسة دقيقة.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
