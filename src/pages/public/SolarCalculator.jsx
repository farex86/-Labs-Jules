import React, { useReducer, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator, Plus, Trash2, Sun, Settings2, Zap } from 'lucide-react';
import { FACILITY_TYPES, FACILITY_APPLIANCES, calculateDailyEnergy, calculateSystemSize } from '../../models/SolarCalculatorModel';
import toast from 'react-hot-toast';

// Initial state for the reducer
const initialState = {
  selectedFacility: '',
  appliances: []
};

// Reducer for managing the calculator state
function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facilityId = action.payload;
      // Deep copy the default appliances for the selected facility to prevent mutating constant data
      const defaultAppliances = (FACILITY_APPLIANCES[facilityId] || []).map(appliance => ({ ...appliance }));
      return {
        ...state,
        selectedFacility: facilityId,
        appliances: defaultAppliances
      };
    }
    case 'UPDATE_APPLIANCE': {
      const { index, field, value } = action.payload;
      const newAppliances = [...state.appliances];
      newAppliances[index] = { ...newAppliances[index], [field]: Number(value) };
      return { ...state, appliances: newAppliances };
    }
    case 'REMOVE_APPLIANCE': {
      const newAppliances = state.appliances.filter((_, i) => i !== action.payload);
      return { ...state, appliances: newAppliances };
    }
    case 'ADD_APPLIANCE': {
      return {
        ...state,
        appliances: [
          ...state.appliances,
          { id: Date.now().toString(), name: 'جهاز جديد', power: 100, quantity: 1, hours: 1 }
        ]
      };
    }
    case 'UPDATE_APPLIANCE_NAME': {
      const { index, value } = action.payload;
      const newAppliances = [...state.appliances];
      newAppliances[index] = { ...newAppliances[index], name: value };
      return { ...state, appliances: newAppliances };
    }
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  // Derived state (purely computed during render)
  const dailyEnergyWh = useMemo(() => calculateDailyEnergy(state.appliances), [state.appliances]);
  const dailyEnergyKWh = dailyEnergyWh / 1000;
  const systemSizeKw = useMemo(() => calculateSystemSize(dailyEnergyWh), [dailyEnergyWh]);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SET_FACILITY', payload: e.target.value });
    toast.success('تم تحديث نمط الاستهلاك بنجاح');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-8 font-sans"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
              <Sun className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">حاسبة الطاقة الشمسية</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            احسب حجم النظام الشمسي المناسب لمنشأتك بناءً على الأجهزة المستخدمة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Configuration Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Settings2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold">نمط الاستهلاك (نوع المنشأة)</h2>
              </div>
              <select
                value={state.selectedFacility}
                onChange={handleFacilityChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>اختر نوع المنشأة...</option>
                {FACILITY_TYPES.map((facility) => (
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
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">الأجهزة الكهربائية</h2>
                  <button
                    onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                    className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" /> إضافة جهاز
                  </button>
                </div>

                <div className="space-y-4">
                  {state.appliances.map((appliance, index) => (
                    <motion.div
                      key={`${appliance.id}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="grid grid-cols-12 gap-3 items-end bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl"
                    >
                      <div className="col-span-12 sm:col-span-4">
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">اسم الجهاز</label>
                        <input
                          type="text"
                          value={appliance.name}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE_NAME', payload: { index, value: e.target.value } })}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">القدرة (واط)</label>
                        <input
                          type="number"
                          min="1"
                          value={appliance.power}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { index, field: 'power', value: e.target.value } })}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-left"
                          dir="ltr"
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">العدد</label>
                        <input
                          type="number"
                          min="1"
                          value={appliance.quantity}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { index, field: 'quantity', value: e.target.value } })}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-left"
                          dir="ltr"
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">ساعات العمل</label>
                        <input
                          type="number"
                          min="1"
                          max="24"
                          value={appliance.hours}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { index, field: 'hours', value: e.target.value } })}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-left"
                          dir="ltr"
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-2 flex justify-end pb-1">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: index })}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          title="حذف الجهاز"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  {state.appliances.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      لا يوجد أجهزة مضافة. أضف أجهزة لحساب الاستهلاك.
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Results Section */}
          <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-2xl shadow-lg sticky top-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5" /> النتائج التقديرية
              </h2>

              <div className="space-y-6">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-blue-100 mb-2">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm">الاستهلاك اليومي</span>
                  </div>
                  <div className="text-3xl font-bold">
                    {dailyEnergyKWh.toFixed(1)} <span className="text-lg font-normal opacity-80">كيلوواط.ساعة</span>
                  </div>
                </div>

                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-yellow-400/30">
                  <div className="flex items-center gap-2 text-yellow-300 mb-2">
                    <Sun className="w-4 h-4" />
                    <span className="text-sm">حجم النظام الشمسي المقترح</span>
                  </div>
                  <div className="text-4xl font-bold text-yellow-400">
                    {systemSizeKw.toFixed(1)} <span className="text-lg font-normal opacity-80 text-white">كيلوواط</span>
                  </div>
                </div>

                <div className="text-xs text-blue-200 mt-4 bg-blue-900/40 p-3 rounded-lg leading-relaxed">
                  <p><strong>ملاحظة هامة:</strong></p>
                  <p>هذه الحسابات تقديرية وتعتمد على 4 ساعات شمسية ذروة كمتوسط، وكفاءة نظام 80%.</p>
                  <p className="mt-2">يُنصح دائماً باستشارة مهندس مختص لتقييم الموقع بدقة قبل التركيب.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SolarCalculator;
