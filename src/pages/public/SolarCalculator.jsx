/* eslint-disable no-unused-vars */
import React, { useReducer, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator, Plus, Trash2, Zap, Battery, Sun, Server } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import {
  FACILITY_TYPES,
  getAppliancesForFacility,
  calculateSolarSystem
} from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacility: '',
  appliances: [],
  results: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY':
      return {
        ...state,
        selectedFacility: action.payload,
        appliances: getAppliancesForFacility(action.payload),
        results: null,
      };
    case 'ADD_APPLIANCE':
      return {
        ...state,
        appliances: [
          ...state.appliances,
          {
            id: Date.now().toString(),
            name: 'جهاز جديد',
            power_watts: 100,
            quantity: 1,
            hours_per_day: 5,
          },
        ],
        results: null,
      };
    case 'UPDATE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.map((app) =>
          app.id === action.payload.id ? { ...app, ...action.payload.updates } : app
        ),
        results: null,
      };
    case 'REMOVE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.filter((app) => app.id !== action.payload),
        results: null,
      };
    case 'CALCULATE':
      return {
        ...state,
        results: calculateSolarSystem(state.appliances),
      };
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Optionally trigger something when results are updated
    if (state.results) {
      toast.success('تم حساب النظام بنجاح!');
    }
  }, [state.results]);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (state.appliances.length === 0) {
      toast.error('الرجاء إضافة أجهزة أولاً');
      return;
    }
    dispatch({ type: 'CALCULATE' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-8 font-sans" dir="rtl">
      <Toaster position="top-center" />
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
            <Calculator className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع المنشأة والأجهزة المستخدمة.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Facility Selection */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <label className="block text-sm font-medium mb-2">اختر نوع المنشأة:</label>
              <select
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                value={state.selectedFacility}
                onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
              >
                <option value="" disabled>-- اختر المنشأة --</option>
                {FACILITY_TYPES.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Appliances List */}
            {state.selectedFacility && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">الأجهزة وأنماط الاستهلاك</h2>
                  <button
                    onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                    className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> إضافة جهاز
                  </button>
                </div>

                <div className="space-y-4">
                  {state.appliances.map((app, index) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div className="md:col-span-4">
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">اسم الجهاز</label>
                        <input
                          type="text"
                          value={app.name}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, updates: { name: e.target.value } } })}
                          className="w-full p-2 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">القدرة (واط)</label>
                        <input
                          type="number"
                          value={app.power_watts}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, updates: { power_watts: Number(e.target.value) } } })}
                          className="w-full p-2 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">العدد</label>
                        <input
                          type="number"
                          value={app.quantity}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, updates: { quantity: Number(e.target.value) } } })}
                          className="w-full p-2 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">ساعات/يوم</label>
                        <input
                          type="number"
                          value={app.hours_per_day}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, updates: { hours_per_day: Number(e.target.value) } } })}
                          className="w-full p-2 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        />
                      </div>
                      <div className="md:col-span-1 flex justify-end">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                          className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors mt-5 md:mt-0"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  {state.appliances.length === 0 && (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-4">لا توجد أجهزة مضافة.</p>
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleCalculate}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/30"
                  >
                    حساب النظام الشمسي
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Results Panel */}
          <div>
            {state.results ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-xl text-white p-6 sticky top-8"
              >
                <h2 className="text-2xl font-bold mb-6 text-center border-b border-white/20 pb-4">نتائج الحساب</h2>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-lg">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm">إجمالي الاستهلاك اليومي</p>
                      <p className="text-xl font-bold">{state.results.totalDailyEnergy.toLocaleString()} واط/ساعة</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-lg">
                      <Sun className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm">قدرة الألواح المطلوبة</p>
                      <p className="text-xl font-bold">{state.results.recommendedPanelsCapacity.toLocaleString()} واط</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-lg">
                      <Server className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm">حجم الانفرتر (المحول)</p>
                      <p className="text-xl font-bold">{state.results.recommendedInverter.toLocaleString()} واط</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-lg">
                      <Battery className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm">سعة البطاريات المطلوبة</p>
                      <p className="text-xl font-bold">{state.results.recommendedBatteryCapacity.toLocaleString()} أمبير/ساعة</p>
                      <p className="text-xs text-blue-200 mt-1">على نظام {state.results.systemVoltage} فولت</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-black/10 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed text-blue-50">
                    * هذه الحسابات تقديرية وتفترض وجود 5 ساعات ذروة شمسية، وكفاءة نظام بنسبة 70%، وتفريغ بطاريات بنسبة 50%.
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 h-full min-h-[300px] flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  قم باختيار المنشأة والأجهزة ثم اضغط على "حساب النظام الشمسي" لرؤية النتائج هنا.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
