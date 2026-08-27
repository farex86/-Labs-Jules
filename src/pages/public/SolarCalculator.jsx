import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { FACILITY_TYPES } from '../../models/SolarCalculatorModel';
import { Calculator, Zap, Battery, Sun, Plus, Trash2 } from 'lucide-react';

// Initial state for the calculator
const initialState = {
  selectedFacilityId: '',
  appliances: [],
  results: null
};

// Reducer to manage calculator state
function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      // Deep copy appliances to avoid mutating constant model data
      const newAppliances = facility ? facility.appliances.map(a => ({ ...a, id: Math.random().toString(36).substr(2, 9) })) : [];
      return { ...state, selectedFacilityId: action.payload, appliances: newAppliances, results: null };
    }
    case 'ADD_APPLIANCE':
      return {
        ...state,
        appliances: [...state.appliances, { id: Math.random().toString(36).substr(2, 9), name: 'جهاز جديد', quantity: 1, power: 100, hours: 4 }],
        results: null
      };
    case 'UPDATE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.map(a => a.id === action.payload.id ? { ...a, ...action.payload.updates } : a),
        results: null
      };
    case 'REMOVE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.filter(a => a.id !== action.payload),
        results: null
      };
    case 'CALCULATE': {
      let totalWh = 0;
      let peakPower = 0;

      state.appliances.forEach(app => {
        const qty = Number(app.quantity) || 0;
        const pwr = Number(app.power) || 0;
        const hrs = Number(app.hours) || 0;

        totalWh += (qty * pwr * hrs);
        peakPower += (qty * pwr);
      });

      // Basic Solar Sizing Math (Simplified for this example)
      // Safety factor for inverter (20% extra)
      const inverterSize = peakPower * 1.2;

      // Battery sizing (assuming 50% Depth of Discharge, 12V system)
      // Wh / 12V * 2 (for 50% DoD)
      const batteryAh = (totalWh / 12) * 2;

      // Panel sizing (assuming 5 hours of peak sun)
      const panelWatts = totalWh / 5;

      return {
        ...state,
        results: {
          totalWh,
          peakPower,
          inverterSize,
          batteryAh,
          panelWatts
        }
      };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3 text-emerald-600 dark:text-emerald-400">
            <Calculator className="w-8 h-8" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">

            {/* Facility Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <label className="block text-sm font-medium mb-2">اختر نوع المنشأة</label>
              <select
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                value={state.selectedFacilityId}
                onChange={(e) => dispatch({ type: 'SELECT_FACILITY', payload: e.target.value })}
              >
                <option value="">-- اختر --</option>
                {FACILITY_TYPES.map(facility => (
                  <option key={facility.id} value={facility.id}>{facility.name}</option>
                ))}
              </select>
            </div>

            {/* Appliances List */}
            {state.appliances.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">الأجهزة (أنماط الاستهلاك)</h2>
                  <button
                    onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                    className="flex items-center gap-1 text-sm bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1.5 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-800/40 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> إضافة جهاز
                  </button>
                </div>

                <div className="space-y-4">
                  {state.appliances.map((app, index) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="grid grid-cols-12 gap-3 items-end border-b dark:border-gray-700 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="col-span-12 md:col-span-4">
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">اسم الجهاز</label>
                        <input
                          type="text"
                          value={app.name}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, updates: { name: e.target.value } } })}
                          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 text-sm outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div className="col-span-4 md:col-span-2">
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">العدد</label>
                        <input
                          type="number"
                          min="1"
                          value={app.quantity}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, updates: { quantity: e.target.value } } })}
                          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 text-sm outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div className="col-span-4 md:col-span-2">
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">القدرة (واط)</label>
                        <input
                          type="number"
                          min="0"
                          value={app.power}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, updates: { power: e.target.value } } })}
                          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 text-sm outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div className="col-span-4 md:col-span-2">
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">الساعات/يوم</label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={app.hours}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, updates: { hours: e.target.value } } })}
                          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 text-sm outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div className="col-span-12 md:col-span-2 flex justify-end md:justify-center">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                          className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          title="حذف الجهاز"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t dark:border-gray-700">
                  <button
                    onClick={() => dispatch({ type: 'CALCULATE' })}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-5 h-5" />
                    احسب النظام
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Results Sidebar */}
          <div className="md:col-span-1">
            {state.results ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-xl p-6 sticky top-6"
              >
                <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-6 border-b border-emerald-200 dark:border-emerald-800/50 pb-3">النتيجة التقديرية</h2>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-medium">الاستهلاك اليومي الكلي</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {(state.results.totalWh / 1000).toFixed(2)} <span className="text-sm font-normal text-gray-500">كيلو واط ساعة</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <Sun className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium">حجم الألواح المقترح</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.ceil(state.results.panelWatts)} <span className="text-sm font-normal text-gray-500">واط</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <Zap className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">حجم الانفرتر (المحول)</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.ceil(state.results.inverterSize)} <span className="text-sm font-normal text-gray-500">واط</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <Battery className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">سعة البطاريات (12 فولت)</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.ceil(state.results.batteryAh)} <span className="text-sm font-normal text-gray-500">أمبير ساعة</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-xs text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                  * هذه الحسابات تقديرية وتفترض شروطاً مثالية، يجب استشارة مهندس مختص للحصول على تصميم دقيق.
                </div>
              </motion.div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center justify-center text-center h-full min-h-[300px] text-gray-400 dark:text-gray-500">
                <Calculator className="w-12 h-12 mb-3 opacity-20" />
                <p>اختر المنشأة وقم بحساب النظام لرؤية النتائج التقديرية هنا.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
