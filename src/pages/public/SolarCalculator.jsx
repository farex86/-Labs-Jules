import React, { useReducer } from 'react';
import { motion } from 'motion/react';
import { Calculator, Sun, Zap, Battery, ArrowRight } from 'lucide-react';
import { facilityTypes, calculateSolarRequirements } from '../../models/SolarCalculatorModel';

const initialState = {
  facilityType: '',
  hoursOfOperation: 8,
  customConsumption: 0,
  results: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY_TYPE':
      return { ...state, facilityType: action.payload };
    case 'SET_HOURS':
      return { ...state, hoursOfOperation: action.payload };
    case 'SET_CUSTOM_CONSUMPTION':
      return { ...state, customConsumption: action.payload };
    case 'CALCULATE':
      return { ...state, results: calculateSolarRequirements(state) };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'CALCULATE' });
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-8 sm:px-10">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="bg-blue-500 p-3 rounded-lg">
                <Sun className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">حاسبة الطاقة الشمسية</h1>
                <p className="mt-1 text-blue-100">احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Facility Type */}
              <div>
                <label htmlFor="facilityType" className="block text-sm font-medium text-gray-700">
                  نوع المنشأة
                </label>
                <div className="mt-1">
                  <select
                    id="facilityType"
                    name="facilityType"
                    required
                    value={state.facilityType}
                    onChange={(e) => dispatch({ type: 'SET_FACILITY_TYPE', payload: e.target.value })}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                  >
                    <option value="" disabled>اختر نوع المنشأة</option>
                    {facilityTypes.map((facility) => (
                      <option key={facility.id} value={facility.id}>
                        {facility.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Hours of Operation */}
              <div>
                <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
                  ساعات التشغيل اليومية (ساعة)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="hours"
                    name="hours"
                    min="1"
                    max="24"
                    required
                    value={state.hoursOfOperation}
                    onChange={(e) => dispatch({ type: 'SET_HOURS', payload: Number(e.target.value) })}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
                  />
                </div>
              </div>

              {/* Custom Consumption (Optional) */}
              <div>
                <label htmlFor="customConsumption" className="block text-sm font-medium text-gray-700">
                  استهلاك إضافي (واط) - اختياري
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="customConsumption"
                    name="customConsumption"
                    min="0"
                    value={state.customConsumption}
                    onChange={(e) => dispatch({ type: 'SET_CUSTOM_CONSUMPTION', payload: Number(e.target.value) })}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Calculator className="h-5 w-5 ml-2" />
                  احسب الاحتياجات
                </button>
              </div>
            </form>

            {/* Results Section */}
            {state.results && (
              // eslint-disable-next-line no-unused-vars
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-10"
              >
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">النتائج التقديرية</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Total Consumption */}
                    <div className="flex items-start space-x-4 space-x-reverse bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex-shrink-0">
                        <Zap className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">إجمالي الاستهلاك اليومي</p>
                        <p className="mt-1 text-2xl font-semibold text-gray-900">
                          {Math.round(state.results.totalDailyConsumption).toLocaleString()} <span className="text-sm text-gray-500">واط/ساعة</span>
                        </p>
                      </div>
                    </div>

                    {/* Required Capacity */}
                    <div className="flex items-start space-x-4 space-x-reverse bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex-shrink-0">
                        <Sun className="h-6 w-6 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">سعة الألواح المطلوبة</p>
                        <p className="mt-1 text-2xl font-semibold text-gray-900">
                          {Math.round(state.results.requiredCapacity).toLocaleString()} <span className="text-sm text-gray-500">واط</span>
                        </p>
                      </div>
                    </div>

                    {/* Number of Panels */}
                    <div className="flex items-start space-x-4 space-x-reverse bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex-shrink-0">
                        <ArrowRight className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">عدد الألواح التقريبي (500 واط للوح)</p>
                        <p className="mt-1 text-2xl font-semibold text-gray-900">
                          {state.results.numberOfPanels} <span className="text-sm text-gray-500">لوح</span>
                        </p>
                      </div>
                    </div>

                    {/* Battery Capacity */}
                    <div className="flex items-start space-x-4 space-x-reverse bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex-shrink-0">
                        <Battery className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">سعة البطاريات المطلوبة (48 فولت)</p>
                        <p className="mt-1 text-2xl font-semibold text-gray-900">
                          {Math.round(state.results.requiredBatteryCapacityAh).toLocaleString()} <span className="text-sm text-gray-500">أمبير/ساعة</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-sm text-gray-500 bg-blue-50 p-4 rounded-md">
                    <p><strong>ملاحظة:</strong> هذه الحسابات تقديرية وتفترض 5 ساعات من ذروة الشمس وكفاءة نظام بنسبة 80%، بالإضافة إلى يومين من الاستقلالية للبطاريات (تفريغ 50%). ينصح باستشارة مهندس مختص للحصول على تصميم دقيق.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
