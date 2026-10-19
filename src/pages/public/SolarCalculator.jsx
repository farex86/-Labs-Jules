import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { Calculator, Sun, Battery, Zap, AlertCircle, RefreshCw } from 'lucide-react';
import { FACILITY_TYPES, CALCULATE_SOLAR_NEEDS } from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacility: null,
  appliances: [],
  results: null,
  isCalculating: false,
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      // Deep copy to prevent mutating the constant array
      const initialAppliances = facility ? facility.appliances.map(app => ({
        ...app,
        quantity: app.defaultQuantity,
        hours: app.defaultHours
      })) : [];
      return {
        ...state,
        selectedFacility: action.payload,
        appliances: initialAppliances,
        results: null
      };
    }
    case 'UPDATE_APPLIANCE': {
      const updatedAppliances = state.appliances.map(app =>
        app.id === action.payload.id ? { ...app, [action.payload.field]: action.payload.value } : app
      );
      return { ...state, appliances: updatedAppliances, results: null };
    }
    case 'CALCULATE_START':
      return { ...state, isCalculating: true };
    case 'CALCULATE_SUCCESS':
      return { ...state, isCalculating: false, results: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!state.selectedFacility) {
      toast.error('الرجاء اختيار نوع المنشأة أولاً');
      return;
    }

    dispatch({ type: 'CALCULATE_START' });

    // Simulate calculation delay for UX
    setTimeout(() => {
      const results = CALCULATE_SOLAR_NEEDS(state.appliances);
      dispatch({ type: 'CALCULATE_SUCCESS', payload: results });
      toast.success('تم الحساب بنجاح');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Sun className="mx-auto h-16 w-16 text-amber-500 mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            احسب احتياجات منشأتك من الطاقة الشمسية بدقة وسهولة
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-10">
            <form onSubmit={handleCalculate}>
              {/* Facility Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                  اختر نوع المنشأة
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {FACILITY_TYPES.map((facility) => (
                    <button
                      key={facility.id}
                      type="button"
                      onClick={() => dispatch({ type: 'SELECT_FACILITY', payload: facility.id })}
                      className={`px-4 py-3 border rounded-xl text-sm font-medium transition-all duration-200 ${
                        state.selectedFacility === facility.id
                          ? 'bg-amber-50 border-amber-500 text-amber-700 dark:bg-amber-900/30 dark:border-amber-400 dark:text-amber-300'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      {facility.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Appliances Configuration */}
              {state.appliances.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-8"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b pb-2 dark:border-gray-700">
                    الأجهزة والاستهلاك المتوقع
                  </h3>
                  <div className="space-y-4">
                    {state.appliances.map((app) => (
                      <div key={app.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                        <div className="md:col-span-4">
                          <span className="font-medium text-gray-900 dark:text-white">{app.name}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 block">{app.powerW} واط</span>
                        </div>
                        <div className="md:col-span-4">
                          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">الكمية</label>
                          <input
                            type="number"
                            min="0"
                            value={app.quantity}
                            onChange={(e) => dispatch({
                              type: 'UPDATE_APPLIANCE',
                              payload: { id: app.id, field: 'quantity', value: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-800 dark:text-white"
                          />
                        </div>
                        <div className="md:col-span-4">
                          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">ساعات التشغيل (يومياً)</label>
                          <input
                            type="number"
                            min="0"
                            max="24"
                            value={app.hours}
                            onChange={(e) => dispatch({
                              type: 'UPDATE_APPLIANCE',
                              payload: { id: app.id, field: 'hours', value: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-800 dark:text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={!state.selectedFacility || state.isCalculating}
                  className="flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {state.isCalculating ? (
                    <RefreshCw className="animate-spin h-5 w-5 ml-2" />
                  ) : (
                    <Calculator className="h-5 w-5 ml-2" />
                  )}
                  احسب النظام المطلوب
                </button>
                {state.results && (
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'RESET' })}
                    className="py-3 px-6 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
                  >
                    إعادة ضبط
                  </button>
                )}
              </div>
            </form>

            {/* Results Section */}
            {state.results && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-10 bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  النظام الشمسي المقترح
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center border-t-4 border-blue-500">
                    <Sun className="mx-auto h-8 w-8 text-blue-500 mb-3" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">الألواح الشمسية</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {(state.results.recommendedSystem.solarPanelsW / 1000).toFixed(1)} <span className="text-sm">kW</span>
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center border-t-4 border-green-500">
                    <Battery className="mx-auto h-8 w-8 text-green-500 mb-3" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">سعة البطاريات (48V)</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {state.results.recommendedSystem.batteryCapacityAh} <span className="text-sm">Ah</span>
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center border-t-4 border-amber-500">
                    <Zap className="mx-auto h-8 w-8 text-amber-500 mb-3" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">محول الطاقة (Inverter)</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {(state.results.recommendedSystem.inverterPowerW / 1000).toFixed(1)} <span className="text-sm">kW</span>
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center border-t-4 border-purple-500">
                    <AlertCircle className="mx-auto h-8 w-8 text-purple-500 mb-3" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">الاستهلاك اليومي</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {(state.results.totalDailyEnergyWh / 1000).toFixed(1)} <span className="text-sm">kWh</span>
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 ml-3 flex-shrink-0" />
                  <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                    <strong>ملاحظة:</strong> هذه الحسابات تقديرية وتعتمد على متوسط الإشعاع الشمسي (5 ساعات ذروة) وخسائر نظام افتراضية بنسبة 30%. يفضل استشارة مهندس طاقة شمسية مختص للحصول على تصميم دقيق يتناسب مع الموقع الجغرافي والظروف الفعلية.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
