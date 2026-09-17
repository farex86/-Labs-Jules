import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import toast, { Toaster } from 'react-hot-toast';
import { Calculator, Zap, Sun, DollarSign } from 'lucide-react';
import { facilityTypes, calculateSolarRequirements } from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacility: '',
  customHours: '',
  customConsumption: '',
  result: null,
  isCalculating: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY':
      return { ...state, selectedFacility: action.payload, result: null };
    case 'SET_CUSTOM_HOURS':
      return { ...state, customHours: action.payload };
    case 'SET_CUSTOM_CONSUMPTION':
      return { ...state, customConsumption: action.payload };
    case 'START_CALCULATION':
      return { ...state, isCalculating: true };
    case 'CALCULATION_SUCCESS':
      // Deep copy is conceptually done here by creating a new result object
      return { ...state, isCalculating: false, result: { ...action.payload } };
    case 'CALCULATION_ERROR':
      return { ...state, isCalculating: false };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!state.selectedFacility) {
      toast.error('الرجاء اختيار نوع المنشأة');
      return;
    }

    dispatch({ type: 'START_CALCULATION' });

    // Simulate a slight delay for UX
    setTimeout(() => {
      const inputs = {
        hours: state.customHours ? parseFloat(state.customHours) : undefined,
        customConsumption: state.customConsumption ? parseFloat(state.customConsumption) : undefined,
      };

      const result = calculateSolarRequirements(state.selectedFacility, inputs);

      if (result) {
        dispatch({ type: 'CALCULATION_SUCCESS', payload: result });
        toast.success('تم الحساب بنجاح!');
      } else {
        dispatch({ type: 'CALCULATION_ERROR' });
        toast.error('حدث خطأ أثناء الحساب');
      }
    }, 500);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <Toaster position="top-center" />

      <motion.div
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-blue-600 px-6 py-8 text-white text-center">
          <Calculator className="w-12 h-12 mx-auto mb-4 text-blue-200" />
          <h1 className="text-3xl font-bold">حاسبة الطاقة الشمسية</h1>
          <p className="mt-2 text-blue-100">احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك</p>
        </div>

        <div className="p-6 md:p-8">
          <form onSubmit={handleCalculate} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label htmlFor="facility" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                نوع المنشأة <span className="text-red-500">*</span>
              </label>
              <select
                id="facility"
                value={state.selectedFacility}
                onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
                className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-3 border"
              >
                <option value="">-- اختر نوع المنشأة --</option>
                {facilityTypes.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name} (استهلاك تقديري: {facility.defaultConsumptionKWh} ك.و.س/يوم)
                  </option>
                ))}
              </select>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="hours" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ساعات العمل اليومية (اختياري)
                </label>
                <input
                  type="number"
                  id="hours"
                  min="1"
                  max="24"
                  value={state.customHours}
                  onChange={(e) => dispatch({ type: 'SET_CUSTOM_HOURS', payload: e.target.value })}
                  placeholder="مثال: 12"
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-3 border"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="consumption" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الاستهلاك الفعلي بالكيلوواط/يوم (اختياري)
                </label>
                <input
                  type="number"
                  id="consumption"
                  min="0"
                  value={state.customConsumption}
                  onChange={(e) => dispatch({ type: 'SET_CUSTOM_CONSUMPTION', payload: e.target.value })}
                  placeholder="لتجاوز الاستهلاك التقديري"
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-3 border"
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="pt-4 flex justify-between">
              <button
                type="submit"
                disabled={state.isCalculating}
                className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
              >
                {state.isCalculating ? 'جاري الحساب...' : 'احسب الاحتياج'}
              </button>

              {state.result && (
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'RESET' })}
                  className="w-full md:w-auto px-8 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors mr-4"
                >
                  إعادة ضبط
                </button>
              )}
            </motion.div>
          </form>

          {state.result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-10 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">نتائج التقدير المبدئي</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4 ml-4">
                    <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">الاستهلاك اليومي</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {state.result.dailyConsumptionKWh} <span className="text-sm font-normal">ك.و.س</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mr-4 ml-4">
                    <Sun className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">سعة النظام المطلوبة</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {state.result.requiredCapacityKW} <span className="text-sm font-normal">كيلوواط</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mr-4 ml-4">
                    <Calculator className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">الألواح المقترحة (500W)</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {state.result.requiredPanels} <span className="text-sm font-normal">لوح تقريباً</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full mr-4 ml-4">
                    <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">التكلفة التقديرية</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      ${state.result.estimatedCostUSD} <span className="text-sm font-normal">دولار</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                ملاحظة: هذه الأرقام تقديرية بناءً على المعطيات الأساسية. للحصول على عرض سعر دقيق، يرجى التواصل مع فريق المبيعات.
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
