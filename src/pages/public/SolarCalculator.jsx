import React, { useReducer, useEffect } from 'react';
import { motion } from 'motion/react';
import toast, { Toaster } from 'react-hot-toast';
import { Sun, Battery, Zap, Activity } from 'lucide-react';
import { FACILITY_TYPES, calculateSolarRequirements } from '../../models/SolarCalculatorModel';
import SkeletonLoader from '../../components/SkeletonLoader';

const initialState = {
  selectedFacility: null,
  appliances: [],
  results: null,
  isLoading: true, // Simulating an initial load state
};

function reducer(state, action) {
  switch (action.type) {
    case 'FINISH_LOADING':
      return { ...state, isLoading: false };
    case 'SELECT_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      return {
        ...state,
        selectedFacility: facility,
        appliances: facility ? JSON.parse(JSON.stringify(facility.defaultAppliances)) : [], // Deep copy
        results: null,
      };
    }
    case 'UPDATE_APPLIANCE': {
      const { index, field, value } = action.payload;
      const updatedAppliances = [...state.appliances];
      updatedAppliances[index][field] = value;
      return { ...state, appliances: updatedAppliances };
    }
    case 'ADD_APPLIANCE':
      return {
        ...state,
        appliances: [
          ...state.appliances,
          { name: '', quantity: 1, powerW: 100, hoursPerDay: 1 }
        ]
      };
    case 'REMOVE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.filter((_, i) => i !== action.payload)
      };
    case 'CALCULATE':
      return {
        ...state,
        results: calculateSolarRequirements(state.appliances)
      };
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Simulate fetching data or loading model
    const timer = setTimeout(() => {
      dispatch({ type: 'FINISH_LOADING' });
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SELECT_FACILITY', payload: e.target.value });
    toast.success('تم تغيير نوع المنشأة وتحديث الأجهزة الافتراضية');
  };

  const handleCalculate = () => {
    if (!state.selectedFacility) {
      toast.error('الرجاء اختيار نوع المنشأة أولاً');
      return;
    }
    dispatch({ type: 'CALCULATE' });
    toast.success('تم حساب احتياجات النظام الشمسي بنجاح');
  };

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex flex-col items-center" dir="rtl">
        <div className="w-full max-w-4xl space-y-6">
          <SkeletonLoader className="h-12 w-64 mx-auto" />
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm space-y-4">
             <SkeletonLoader className="h-8 w-1/3" />
             <SkeletonLoader className="h-10 w-full" />
             <SkeletonLoader className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <Toaster position="top-center" />

      <div className="max-w-5xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
            <Sun className="h-10 w-10 text-yellow-500" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك واستهلاكك
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Input Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اختر نوع المنشأة
              </label>
              <select
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-green-500 focus:ring-green-500 p-3"
                onChange={handleFacilityChange}
                value={state.selectedFacility?.id || ''}
              >
                <option value="">-- اختر --</option>
                {FACILITY_TYPES.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {state.selectedFacility && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">الأجهزة والاستهلاك</h2>
                  <button
                    onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                    className="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    + إضافة جهاز
                  </button>
                </div>

                <div className="space-y-4">
                  {state.appliances.map((appliance, index) => (
                    <motion.div
                      key={index}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl"
                    >
                      <div className="sm:col-span-4">
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">اسم الجهاز</label>
                        <input
                          type="text"
                          value={appliance.name}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { index, field: 'name', value: e.target.value } })}
                          className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm p-2"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">العدد</label>
                        <input
                          type="number"
                          min="1"
                          value={appliance.quantity}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { index, field: 'quantity', value: e.target.value } })}
                          className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm p-2"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">القدرة (وات)</label>
                        <input
                          type="number"
                          min="0"
                          value={appliance.powerW}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { index, field: 'powerW', value: e.target.value } })}
                          className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm p-2"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">ساعات/يوم</label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={appliance.hoursPerDay}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { index, field: 'hoursPerDay', value: e.target.value } })}
                          className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm p-2"
                        />
                      </div>
                      <div className="sm:col-span-1 flex justify-end">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: index })}
                          className="text-red-500 hover:text-red-700 p-2 bg-red-50 dark:bg-red-900/20 rounded-md"
                          title="حذف"
                        >
                          ×
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleCalculate}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <Activity className="h-5 w-5" />
                    احسب النظام الآن
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column: Results */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 border border-green-200 dark:border-gray-700 shadow-sm sticky top-6">
              <h2 className="text-xl font-bold text-green-900 dark:text-green-400 mb-6 flex items-center gap-2">
                <Zap className="h-6 w-6" />
                نتائج الحساب
              </h2>

              {state.results ? (
                <div className="space-y-6">
                  <ResultCard
                    icon={<Activity className="text-blue-500" />}
                    title="الاستهلاك اليومي"
                    value={(state.results.totalDailyEnergyWh / 1000).toFixed(2)}
                    unit="كيلووات.ساعة (kWh)"
                  />
                  <ResultCard
                    icon={<Zap className="text-yellow-500" />}
                    title="حمل الذروة"
                    value={(state.results.peakPowerW / 1000).toFixed(2)}
                    unit="كيلووات (kW)"
                  />

                  <div className="pt-4 border-t border-green-200/50 dark:border-gray-700"></div>

                  <ResultCard
                    icon={<Sun className="text-orange-500" />}
                    title="سعة الألواح المطلوبة"
                    value={(state.results.requiredPanelCapacityW / 1000).toFixed(2)}
                    unit="كيلووات (kWp)"
                    highlight
                  />
                  <ResultCard
                    icon={<Activity className="text-indigo-500" />}
                    title="سعة الانفرتر المطلوبة"
                    value={(state.results.requiredInverterCapacityW / 1000).toFixed(2)}
                    unit="كيلووات (kW)"
                    highlight
                  />
                  <ResultCard
                    icon={<Battery className="text-green-500" />}
                    title="سعة البطاريات المطلوبة"
                    value={Math.ceil(state.results.batteryBankCapacityAh)}
                    unit={`أمبير.ساعة (Ah) @ ${state.results.batteryVoltage}V`}
                    highlight
                  />
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                  <Sun className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>الرجاء إدخال البيانات والضغط على حساب لعرض النتائج هنا</p>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

const ResultCard = ({ icon, title, value, unit, highlight }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className={`bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm flex items-start gap-4 ${highlight ? 'border-2 border-green-400 dark:border-green-500' : ''}`}
  >
    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{unit}</span>
      </div>
    </div>
  </motion.div>
);

export default SolarCalculator;
