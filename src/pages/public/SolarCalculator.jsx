import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { FACILITY_TYPES, calculateSolarNeeds } from '../../models/SolarCalculatorModel';
import toast from 'react-hot-toast';

const initialState = {
  selectedFacility: '',
  customLoad: '',
  customHours: '',
  results: null,
  isCalculating: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY':
      return {
        ...state,
        selectedFacility: action.payload,
        customLoad: '',
        customHours: '',
        results: null
      };
    case 'SET_CUSTOM_LOAD':
      return { ...state, customLoad: action.payload };
    case 'SET_CUSTOM_HOURS':
      return { ...state, customHours: action.payload };
    case 'CALCULATE_START':
      return { ...state, isCalculating: true };
    case 'CALCULATE_SUCCESS':
      return { ...state, isCalculating: false, results: action.payload };
    case 'CALCULATE_ERROR':
      return { ...state, isCalculating: false, results: null };
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!state.selectedFacility) {
      toast.error('يرجى اختيار نوع المنشأة');
      return;
    }

    dispatch({ type: 'CALCULATE_START' });

    setTimeout(() => {
      const load = state.customLoad ? parseFloat(state.customLoad) : null;
      const hours = state.customHours ? parseFloat(state.customHours) : null;

      const results = calculateSolarNeeds(state.selectedFacility, load, hours);

      if (results) {
        dispatch({ type: 'CALCULATE_SUCCESS', payload: results });
        toast.success('تم الحساب بنجاح');
      } else {
        dispatch({ type: 'CALCULATE_ERROR' });
        toast.error('حدث خطأ أثناء الحساب');
      }
    }, 500); // Simulate processing time for UX
  };

  const selectedFacilityData = FACILITY_TYPES.find(f => f.id === state.selectedFacility);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-blue-600 px-6 py-8 text-white text-center">
            <h1 className="text-3xl font-bold mb-2">حاسبة الطاقة الشمسية</h1>
            <p className="text-blue-100">احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-2">
                  نوع المنشأة
                </label>
                <select
                  id="facility"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                  value={state.selectedFacility}
                  onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
                >
                  <option value="">-- اختر نوع المنشأة --</option>
                  {FACILITY_TYPES.map(facility => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name}
                    </option>
                  ))}
                </select>
              </div>

              {state.selectedFacility && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الحمل الاستهلاكي (كيلوواط)
                    </label>
                    <input
                      type="number"
                      placeholder={`الافتراضي: ${selectedFacilityData?.baseLoad}`}
                      className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                      value={state.customLoad}
                      onChange={(e) => dispatch({ type: 'SET_CUSTOM_LOAD', payload: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ساعات التشغيل اليومية
                    </label>
                    <input
                      type="number"
                      placeholder={`الافتراضي: ${selectedFacilityData?.avgHours}`}
                      className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                      value={state.customHours}
                      onChange={(e) => dispatch({ type: 'SET_CUSTOM_HOURS', payload: e.target.value })}
                    />
                  </div>
                  <p className="text-sm text-gray-500 md:col-span-2">
                    * يمكنك ترك الحقول فارغة لاستخدام القيم الافتراضية
                  </p>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={state.isCalculating}
                className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all
                  ${state.isCalculating ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'}`}
              >
                {state.isCalculating ? 'جاري الحساب...' : 'احسب الاحتياجات'}
              </button>
            </form>

            {state.results && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-10 border-t border-gray-200 pt-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">النتائج التقديرية</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h3 className="text-blue-800 font-semibold mb-2">الاستهلاك اليومي</h3>
                    <p className="text-3xl font-bold text-blue-600">
                      {state.results.dailyConsumption.toFixed(2)} <span className="text-lg">كيلوواط/ساعة</span>
                    </p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                    <h3 className="text-green-800 font-semibold mb-2">سعة النظام المطلوبة</h3>
                    <p className="text-3xl font-bold text-green-600">
                      {state.results.requiredCapacity.toFixed(2)} <span className="text-lg">كيلوواط</span>
                    </p>
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100">
                    <h3 className="text-yellow-800 font-semibold mb-2">عدد الألواح التقريبي (500 واط)</h3>
                    <p className="text-3xl font-bold text-yellow-600">
                      {state.results.numberOfPanels} <span className="text-lg">لوح</span>
                    </p>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                    <h3 className="text-purple-800 font-semibold mb-2">سعة البطاريات المطلوبة (48 فولت)</h3>
                    <p className="text-3xl font-bold text-purple-600">
                      {state.results.batteryCapacityAh.toFixed(0)} <span className="text-lg">أمبير/ساعة</span>
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-gray-100 p-6 rounded-xl text-center">
                  <h3 className="text-gray-600 font-medium mb-2">التكلفة التقديرية للنظام</h3>
                  <p className="text-4xl font-bold text-gray-800">
                    ${state.results.estimatedCost.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">* هذه مجرد تقديرات تقريبية وقد تختلف التكلفة الفعلية</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
