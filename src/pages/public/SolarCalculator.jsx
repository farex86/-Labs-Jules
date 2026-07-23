import React, { useState } from 'react';
import { Calculator, Zap, Battery, Sun, Building2 } from 'lucide-react';
import { FACILITY_TYPES, calculateSolarRequirements } from '../../models/SolarCalculatorModel';

const SolarCalculator = () => {
  const [consumption, setConsumption] = useState('');
  const [facilityType, setFacilityType] = useState(FACILITY_TYPES[0].id);
  const [results, setResults] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!consumption || isNaN(consumption)) return;

    const calculation = calculateSolarRequirements(Number(consumption), facilityType);
    setResults(calculation);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 dir-rtl" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
            <Calculator className="w-10 h-10 text-emerald-600" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك واستهلاكك اليومي
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  نوع المنشأة
                </label>
                <select
                  value={facilityType}
                  onChange={(e) => setFacilityType(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                >
                  {FACILITY_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-gray-400" />
                  الاستهلاك اليومي (كيلوواط/ساعة)
                </label>
                <input
                  type="number"
                  value={consumption}
                  onChange={(e) => setConsumption(e.target.value)}
                  placeholder="مثال: 50"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  required
                  min="1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                احسب الاحتياجات
              </button>
            </form>
          </div>

          {results && (
            <div className="bg-emerald-50 p-8 border-t border-emerald-100">
              <h3 className="text-2xl font-bold text-emerald-900 mb-6 text-center">نتائج الحساب</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 flex items-center gap-4">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <Zap className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">الاستهلاك المعدل</p>
                    <p className="text-2xl font-bold text-gray-900">{results.adjustedDailyConsumption} <span className="text-sm font-normal text-gray-500">ك.و.س</span></p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Sun className="w-8 h-8 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">السعة المطلوبة</p>
                    <p className="text-2xl font-bold text-gray-900">{results.requiredCapacityKw} <span className="text-sm font-normal text-gray-500">ك.و</span></p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Sun className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">عدد الألواح التقريبي (500W)</p>
                    <p className="text-2xl font-bold text-gray-900">{results.estimatedPanels} <span className="text-sm font-normal text-gray-500">لوح</span></p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Battery className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">سعة البطاريات المقدرة</p>
                    <p className="text-2xl font-bold text-gray-900">{results.estimatedBatteryKwh} <span className="text-sm font-normal text-gray-500">ك.و.س</span></p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
