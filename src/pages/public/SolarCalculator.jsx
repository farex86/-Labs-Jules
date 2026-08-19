import React, { useState, useEffect } from 'react';
import { Sun, Battery, Zap, DollarSign, Calculator, Activity, ArrowRight, Building } from 'lucide-react';
import { facilityTypes, calculateSolarSystem } from '../../models/SolarCalculatorModel';
import { Link } from 'react-router-dom';

const SolarCalculator = () => {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [monthlyConsumption, setMonthlyConsumption] = useState('');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (selectedFacility) {
      const facility = facilityTypes.find(f => f.id === selectedFacility);
      if (facility) {
        setMonthlyConsumption(facility.defaultConsumption.toString());
      }
    }
  }, [selectedFacility]);

  const handleCalculate = (e) => {
    e.preventDefault();
    const consumptionNum = parseFloat(monthlyConsumption);
    const calcResults = calculateSolarSystem(consumptionNum);
    setResults(calcResults);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Sun className="h-8 w-8 text-yellow-500 ml-3" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">حاسبة الطاقة الشمسية</h1>
          </div>
          <Link to="/login" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center">
            تسجيل الدخول <ArrowRight className="h-4 w-4 mr-1" />
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            احسب احتياجاتك من الطاقة الشمسية
          </h2>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            أدخل نوع المنشأة والاستهلاك الشهري للحصول على تقدير فوري لحجم النظام الشمسي المطلوب.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6 flex items-center">
              <Calculator className="h-5 w-5 ml-2 text-blue-500" />
              بيانات الاستهلاك
            </h3>

            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label htmlFor="facilityType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  نوع المنشأة
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="facilityType"
                    value={selectedFacility}
                    onChange={(e) => setSelectedFacility(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="" disabled>اختر نوع المنشأة...</option>
                    {facilityTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="consumption" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الاستهلاك الشهري (كيلوواط ساعة - kWh)
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Zap className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="consumption"
                    id="consumption"
                    required
                    min="1"
                    value={monthlyConsumption}
                    onChange={(e) => setMonthlyConsumption(e.target.value)}
                    className="block w-full pr-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500 py-2"
                    placeholder="مثال: 1500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                احسب الآن
              </button>
            </form>
          </div>

          {/* Results Display */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6 flex items-center">
              <Activity className="h-5 w-5 ml-2 text-green-500" />
              النتائج التقديرية
            </h3>

            {results ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">الاستهلاك اليومي</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{results.dailyConsumption} <span className="text-sm font-normal text-gray-500">kWh</span></p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">حجم النظام (القدرة)</p>
                    <p className="text-xl font-bold text-blue-700 dark:text-blue-300">{results.systemCapacityKW} <span className="text-sm font-normal text-blue-500">kW</span></p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
                    <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-1">عدد الألواح (500W)</p>
                    <p className="text-xl font-bold text-yellow-700 dark:text-yellow-300">{results.numberOfPanels} <span className="text-sm font-normal text-yellow-500">لوح</span></p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                    <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">حجم المحول (Inverter)</p>
                    <p className="text-xl font-bold text-purple-700 dark:text-purple-300">{results.inverterCapacityKW} <span className="text-sm font-normal text-purple-500">kW</span></p>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-400 mb-1 flex items-center">
                      <Battery className="h-4 w-4 ml-1" /> سعة البطاريات المطلوبة
                    </p>
                    <p className="text-xl font-bold text-green-700 dark:text-green-300">{results.batteryCapacityKWh} <span className="text-sm font-normal text-green-500">kWh</span></p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                    <DollarSign className="h-4 w-4 ml-1 text-gray-400" /> التكلفة التقديرية (تقريبي)
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${results.estimatedCostRange.min.toLocaleString()} - ${results.estimatedCostRange.max.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    * هذه التكلفة تقديرية وقد تختلف بناءً على نوع الألواح، البطاريات، وتكاليف التركيب في منطقتك.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 py-12">
                <Calculator className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                <p>الرجاء إدخال بيانات الاستهلاك والضغط على "احسب الآن" لرؤية النتائج.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SolarCalculator;
