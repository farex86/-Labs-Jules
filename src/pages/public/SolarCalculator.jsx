import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { FACILITY_TYPES, calculateSystemSize } from '../../models/SolarCalculatorModel';
import { Calculator, Zap, DollarSign, Activity, Sun, Battery } from 'lucide-react';

const initialState = {
  facilityId: '',
  additionalLoad: 0,
  results: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY':
      return { ...state, facilityId: action.payload, results: null };
    case 'SET_ADDITIONAL_LOAD':
      return { ...state, additionalLoad: action.payload, results: null };
    case 'CALCULATE': {
      const results = calculateSystemSize(state.facilityId, state.additionalLoad);
      return { ...state, results };
    }
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!state.facilityId) {
      toast.error('يرجى اختيار نمط الاستهلاك');
      return;
    }
    dispatch({ type: 'CALCULATE' });
    toast.success('تم حساب النظام بنجاح');
  };

  const selectedFacility = FACILITY_TYPES.find(f => f.id === state.facilityId);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Sun className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">حاسبة الطاقة الشمسية</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            احسب حجم النظام الشمسي المناسب لمنشأتك
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
          >
            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  نمط الاستهلاك (المنشأة)
                </label>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-3 border"
                  value={state.facilityId}
                  onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
                >
                  <option value="">-- اختر المنشأة --</option>
                  {FACILITY_TYPES.map((facility) => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedFacility && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg text-sm text-blue-800 dark:text-blue-200"
                >
                  <p className="font-semibold mb-1">الأجهزة المعتادة:</p>
                  <ul className="list-disc list-inside">
                    {selectedFacility.typicalAppliances.map((appliance, idx) => (
                      <li key={idx}>{appliance}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs opacity-75">الحمل الأساسي التقديري: {selectedFacility.baseLoadKw} كيلوواط</p>
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  أحمال إضافية (كيلوواط) - اختياري
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-3 border"
                  placeholder="مثال: 5.5"
                  value={state.additionalLoad || ''}
                  onChange={(e) => dispatch({ type: 'SET_ADDITIONAL_LOAD', payload: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Calculator className="ml-2 h-5 w-5" />
                حساب النظام
              </button>

              {state.results && (
                 <button
                 type="button"
                 onClick={() => dispatch({ type: 'RESET' })}
                 className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors mt-2"
               >
                 إعادة ضبط
               </button>
              )}
            </form>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            {state.results ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 h-full border-t-4 border-green-500"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4 dark:border-gray-700">
                  نتائج التقدير
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center text-gray-700 dark:text-gray-200">
                      <Activity className="h-6 w-6 ml-3 text-blue-500" />
                      <span className="font-medium">إجمالي الحمل المقدر</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      {state.results.totalLoadKw.toFixed(2)} kW
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center text-gray-700 dark:text-gray-200">
                      <Zap className="h-6 w-6 ml-3 text-yellow-500" />
                      <span className="font-medium">حجم النظام الموصى به</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      {state.results.recommendedSystemSizeKw.toFixed(2)} kW
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center text-gray-700 dark:text-gray-200">
                      <Battery className="h-6 w-6 ml-3 text-green-500" />
                      <span className="font-medium">عدد الألواح التقريبي (500W)</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      {state.results.numberOfPanels} لوح
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center text-gray-700 dark:text-gray-200">
                      <Sun className="h-6 w-6 ml-3 text-orange-500" />
                      <span className="font-medium">المساحة المطلوبة</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      {state.results.spaceNeededSqM.toFixed(1)} m²
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
                    <div className="flex items-center text-blue-800 dark:text-blue-300">
                      <DollarSign className="h-6 w-6 ml-3 text-green-600 dark:text-green-400" />
                      <span className="font-bold">التكلفة التقديرية</span>
                    </div>
                    <span className="text-2xl font-black text-blue-900 dark:text-blue-200">
                      ${state.results.estimatedCostUsd.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                    * هذه الأرقام تقديرية وتعتمد على دراسة الموقع التفصيلية واختيار المكونات.
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-inner p-6 h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-300 dark:border-gray-700">
                <Calculator className="h-16 w-16 mb-4 opacity-50" />
                <p className="text-lg">قم باختيار المنشأة واضغط على حساب لرؤية النتائج</p>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
