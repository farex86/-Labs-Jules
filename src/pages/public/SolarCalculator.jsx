import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { FACILITY_TYPES, calculateSolarRequirements } from '../../models/SolarCalculatorModel';
import * as Icons from 'lucide-react';
import toast from 'react-hot-toast';

const initialState = {
  selectedFacility: '',
  hoursPerDay: 8,
  additionalLoad: 0,
  result: null,
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY':
      return { ...state, selectedFacility: action.payload, result: null };
    case 'SET_HOURS':
      return { ...state, hoursPerDay: action.payload, result: null };
    case 'SET_ADDITIONAL_LOAD':
      return { ...state, additionalLoad: action.payload, result: null };
    case 'CALCULATE': {
      if (!state.selectedFacility) {
        return state;
      }
      const result = calculateSolarRequirements(
        state.selectedFacility,
        state.hoursPerDay,
        state.additionalLoad
      );
      return { ...state, result };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!state.selectedFacility) {
      toast.error('الرجاء اختيار نوع المنشأة', { position: 'top-center' });
      return;
    }
    dispatch({ type: 'CALCULATE' });
    toast.success('تم الحساب بنجاح', { position: 'top-center' });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">الحاسبة الشمسية</h1>
          <p className="text-lg text-gray-600">احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleCalculate} className="space-y-8">

              {/* Facility Type Selection */}
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">اختر نوع المنشأة</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {FACILITY_TYPES.map((facility) => {
                    const IconComponent = Icons[facility.icon] || Icons.Building;
                    const isSelected = state.selectedFacility === facility.id;

                    return (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        key={facility.id}
                        type="button"
                        onClick={() => dispatch({ type: 'SET_FACILITY', payload: facility.id })}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-colors ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        <IconComponent className={`w-8 h-8 mb-2 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                        <span className="text-sm font-semibold text-center">{facility.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Inputs */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ساعات التشغيل يومياً
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="24"
                    value={state.hoursPerDay}
                    onChange={(e) => dispatch({ type: 'SET_HOURS', payload: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    أحمال إضافية (واط) - اختياري
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={state.additionalLoad}
                    onChange={(e) => dispatch({ type: 'SET_ADDITIONAL_LOAD', payload: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all"
                >
                  حساب الاحتياج
                </motion.button>
                {state.result && (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-4 rounded-lg font-bold text-lg border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
                  >
                    إعادة ضبط
                  </motion.button>
                )}
              </div>
            </form>
          </div>

          {/* Results Section */}
          {state.result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-blue-50 border-t border-blue-100 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-blue-200 pb-4">
                نتائج التقييم لـ: {state.result.facilityName}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                  <div className="text-blue-600 mb-2">
                    <Icons.Zap className="w-6 h-6 inline ml-2" />
                    الاستهلاك اليومي
                  </div>
                  <div className="text-3xl font-bold text-gray-900" dir="ltr">
                    {state.result.dailyConsumptionKwh} <span className="text-lg text-gray-500">kWh</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                  <div className="text-blue-600 mb-2">
                    <Icons.Sun className="w-6 h-6 inline ml-2" />
                    حجم النظام المقترح
                  </div>
                  <div className="text-3xl font-bold text-gray-900" dir="ltr">
                    {state.result.recommendedSystemSizeKw} <span className="text-lg text-gray-500">kW</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 md:col-span-2">
                  <div className="text-blue-600 mb-2">
                    <Icons.Settings className="w-6 h-6 inline ml-2" />
                    نوع النظام الموصى به
                  </div>
                  <div className="text-xl font-semibold text-gray-900" dir="ltr">
                    {state.result.systemType}
                  </div>
                </div>
              </div>
              <p className="mt-6 text-sm text-gray-500 text-center">
                * هذه الحسابات تقديرية وتتطلب زيارة ميدانية لتحديد الاحتياج الفعلي بدقة.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
