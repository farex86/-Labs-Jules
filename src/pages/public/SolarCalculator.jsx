import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Calculator, Zap, Sun, Battery, Settings2, Info } from 'lucide-react';
import { facilityTypes, calculateSolarRequirements } from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacilityId: '',
  customLoadKw: '',
  customHours: '',
  result: null,
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const selectedFacilityId = action.payload;
      const facility = facilityTypes.find(f => f.id === selectedFacilityId);
      let result = null;
      if (facility) {
        result = calculateSolarRequirements(facility, state.customLoadKw, state.customHours);
      }
      return { ...state, selectedFacilityId, result };
    }
    case 'UPDATE_CUSTOM_LOAD': {
      const customLoadKw = action.payload;
      const facility = facilityTypes.find(f => f.id === state.selectedFacilityId);
      let result = null;
      if (facility) {
        result = calculateSolarRequirements(facility, customLoadKw, state.customHours);
      }
      return { ...state, customLoadKw, result };
    }
    case 'UPDATE_CUSTOM_HOURS': {
      const customHours = action.payload;
      const facility = facilityTypes.find(f => f.id === state.selectedFacilityId);
      let result = null;
      if (facility) {
        result = calculateSolarRequirements(facility, state.customLoadKw, customHours);
      }
      return { ...state, customHours, result };
    }
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const selectedFacility = facilityTypes.find(f => f.id === state.selectedFacilityId);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center p-3 bg-yellow-100 text-yellow-600 rounded-full mb-4">
            <Calculator className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك واستهلاكك اليومي.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Settings2 className="ml-2 h-5 w-5 text-blue-500" />
              مدخلات الحساب
            </h2>

            <div className="space-y-6">
              {/* Facility Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  نوع المنشأة
                </label>
                <select
                  value={state.selectedFacilityId}
                  onChange={(e) => dispatch({ type: 'SELECT_FACILITY', payload: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-yellow-500 focus:ring-yellow-500 py-2.5 px-3"
                >
                  <option value="">-- اختر نوع المنشأة --</option>
                  {facilityTypes.map((facility) => (
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
                  className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex items-start"
                >
                  <Info className="h-5 w-5 text-blue-500 mt-0.5 ml-2 flex-shrink-0" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    الاستهلاك الافتراضي لهذه المنشأة هو <strong>{selectedFacility.baseLoadKw} كيلوواط</strong> لمدة <strong>{selectedFacility.hoursPerDay} ساعة</strong> يومياً. يمكنك تعديل هذه القيم أدناه إذا لزم الأمر.
                  </p>
                </motion.div>
              )}

              {/* Custom Inputs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الحمل الكهربائي (كيلوواط) - اختياري
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder={selectedFacility ? String(selectedFacility.baseLoadKw) : 'أدخل الحمل بالكيلوواط'}
                  value={state.customLoadKw}
                  onChange={(e) => dispatch({ type: 'UPDATE_CUSTOM_LOAD', payload: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-yellow-500 focus:ring-yellow-500 py-2.5 px-3"
                  disabled={!state.selectedFacilityId}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ساعات التشغيل اليومية - اختياري
                </label>
                <input
                  type="number"
                  min="0"
                  max="24"
                  step="1"
                  placeholder={selectedFacility ? String(selectedFacility.hoursPerDay) : 'أدخل عدد الساعات'}
                  value={state.customHours}
                  onChange={(e) => dispatch({ type: 'UPDATE_CUSTOM_HOURS', payload: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-yellow-500 focus:ring-yellow-500 py-2.5 px-3"
                  disabled={!state.selectedFacilityId}
                />
              </div>

              <button
                onClick={() => dispatch({ type: 'RESET' })}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                إعادة ضبط
              </button>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {state.result ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 h-full flex flex-col">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center border-b border-gray-200 dark:border-gray-700 pb-4">
                  <Zap className="ml-2 h-5 w-5 text-yellow-500" />
                  النتائج التقديرية
                </h2>

                <div className="space-y-6 flex-grow">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">الاستهلاك اليومي</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{state.result.dailyConsumptionKwh}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">كيلوواط/ساعة</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">سعة النظام المطلوبة</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{state.result.requiredCapacityKw}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">كيلوواط</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-xl flex items-center justify-between border border-yellow-100 dark:border-yellow-800">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-100 dark:bg-yellow-800 rounded-lg ml-4">
                        <Sun className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">الألواح الشمسية</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">بافتراض 550 واط للوح</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {state.result.estimatedPanels}
                    </div>
                  </div>

                  {state.result.estimatedBatteries > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl flex items-center justify-between border border-blue-100 dark:border-blue-800">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg ml-4">
                          <Battery className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">البطاريات المطلوبة</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">نظام {state.result.recommendedSystemType}</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {state.result.estimatedBatteries}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      النظام المقترح: {state.result.recommendedSystemType}
                    </span>
                  </div>
                </div>

                <div className="mt-6 text-xs text-gray-400 dark:text-gray-500 text-center">
                  * هذه الحسابات تقديرية وتعتمد على متوسطات الإشعاع الشمسي. يرجى استشارة مهندس مختص للحصول على تصميم دقيق.
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 h-full flex flex-col items-center justify-center text-center opacity-50">
                <Calculator className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  قم باختيار نوع المنشأة من القائمة لعرض النتائج التقديرية.
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
