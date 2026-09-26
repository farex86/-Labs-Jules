import React, { useReducer, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import {
  Calculator,
  Settings,
  Zap,
  Battery,
  Sun,
  Plus,
  Trash2,
  ChevronDown
} from 'lucide-react';
import { FACILITY_TYPES, calculateSolarRequirements } from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacilityId: '',
  devices: [],
  results: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      if (!facility) return state;
      return {
        ...state,
        selectedFacilityId: action.payload,
        devices: facility.defaultDevices.map(d => ({ ...d })),
        results: null
      };
    }
    case 'UPDATE_DEVICE': {
      const { id, field, value } = action.payload;
      return {
        ...state,
        devices: state.devices.map(d => d.id === id ? { ...d, [field]: value } : d)
      };
    }
    case 'REMOVE_DEVICE': {
      return {
        ...state,
        devices: state.devices.filter(d => d.id !== action.payload)
      };
    }
    case 'ADD_DEVICE': {
      const newDevice = {
        id: Date.now().toString(),
        name: 'جهاز جديد',
        quantity: 1,
        power_watts: 100,
        hours_per_day: 1
      };
      return {
        ...state,
        devices: [...state.devices, newDevice]
      };
    }
    case 'CALCULATE': {
      return {
        ...state,
        results: calculateSolarRequirements(state.devices)
      };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Automatically select first facility on mount if none selected
  useEffect(() => {
    if (!state.selectedFacilityId && FACILITY_TYPES.length > 0) {
      dispatch({ type: 'SET_FACILITY', payload: FACILITY_TYPES[0].id });
    }
  }, [state.selectedFacilityId]);

  // Recalculate whenever devices change, only if devices are not empty
  useEffect(() => {
    if (state.devices.length > 0) {
      dispatch({ type: 'CALCULATE' });
    }
  }, [state.devices]);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 mb-2"
          >
            <Sun className="w-8 h-8" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl md:text-4xl font-bold"
          >
            حاسبة الطاقة الشمسية
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع المنشأة والأجهزة المستخدمة.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content - Input Form */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <label className="block text-sm font-medium mb-2">نوع المنشأة</label>
              <div className="relative">
                <select
                  value={state.selectedFacilityId}
                  onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
                  className="w-full appearance-none bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {FACILITY_TYPES.map(facility => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </motion.div>

            {/* Devices List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-500" />
                  الأجهزة والأحمال
                </h2>
                <button
                  onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                  className="flex items-center gap-2 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  إضافة جهاز
                </button>
              </div>

              <div className="space-y-4">
                {state.devices.map((device, index) => (
                  <motion.div
                    key={device.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl items-center border border-gray-100 dark:border-gray-800"
                  >
                    <div className="md:col-span-4">
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1 md:hidden">اسم الجهاز</label>
                      <input
                        type="text"
                        value={device.name}
                        onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'name', value: e.target.value } })}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="اسم الجهاز"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1 md:hidden">الكمية</label>
                      <input
                        type="number"
                        min="1"
                        value={device.quantity}
                        onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'quantity', value: e.target.value } })}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-left"
                        dir="ltr"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1 md:hidden">القدرة (واط)</label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          value={device.power_watts}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'power_watts', value: e.target.value } })}
                          className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 pl-8 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-left"
                          dir="ltr"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">W</span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1 md:hidden">ساعات العمل/يوم</label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={device.hours_per_day}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'hours_per_day', value: e.target.value } })}
                          className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 pl-8 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-left"
                          dir="ltr"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">h</span>
                      </div>
                    </div>
                    <div className="md:col-span-1 flex justify-end">
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}

                {state.devices.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                    لا توجد أجهزة مضافة. انقر على "إضافة جهاز" للبدء.
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Results */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-blue-600 dark:bg-blue-800 text-white p-6 rounded-2xl shadow-lg sticky top-8"
            >
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                النتائج التقديرية
              </h2>

              {state.results ? (
                <div className="space-y-6">

                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-sm text-blue-100 mb-1">الاستهلاك اليومي</div>
                    <div className="text-2xl font-bold flex items-end gap-1">
                      {Math.round(state.results.totalDailyEnergyWh / 1000)}
                      <span className="text-sm font-normal text-blue-200 mb-1">kWh</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-blue-100">سعة الانفرتر المطلوبة</div>
                        <div className="font-semibold" dir="ltr">
                          {(state.results.inverterSizeW / 1000).toFixed(1)} kW
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Battery className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-blue-100">سعة البطاريات</div>
                        <div className="font-semibold" dir="ltr">
                          {(state.results.batteryCapacityWh / 1000).toFixed(1)} kWh
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Sun className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-blue-100">الألواح الشمسية ({state.results.panelSizeW}W)</div>
                        <div className="font-semibold">
                          {state.results.panelsCount} لوح
                          <span className="text-xs text-blue-200 block" dir="ltr">
                            Total: {(state.results.solarArraySizeW / 1000).toFixed(1)} kW
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/20 text-xs text-blue-200 leading-relaxed">
                    * هذه النتائج تقديرية وتعتمد على متوسط الإشعاع الشمسي (5 ساعات/يوم). يرجى استشارة مهندس متخصص لتصميم النظام بدقة.
                  </div>

                </div>
              ) : (
                <div className="text-center py-12 text-blue-200">
                  يرجى إضافة أجهزة لحساب النظام المطلوب
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
