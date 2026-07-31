import React, { useReducer, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Calculator, Plus, Trash2, Zap, Battery, Sun, Activity } from 'lucide-react';
import { FACILITY_TYPES, calculateSolarSystem } from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacilityId: '',
  devices: [],
  results: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      return {
        ...state,
        selectedFacilityId: action.payload,
        devices: facility ? JSON.parse(JSON.stringify(facility.devices)) : [],
        results: null
      };
    }
    case 'UPDATE_DEVICE': {
      const { id, field, value } = action.payload;
      return {
        ...state,
        devices: state.devices.map(device =>
          device.id === id ? { ...device, [field]: value } : device
        )
      };
    }
    case 'ADD_DEVICE': {
      const newDevice = {
        id: `custom_${Date.now()}`,
        name: 'جهاز جديد',
        power: 100,
        quantity: 1,
        hoursPerDay: 4
      };
      return {
        ...state,
        devices: [...state.devices, newDevice]
      };
    }
    case 'REMOVE_DEVICE': {
      return {
        ...state,
        devices: state.devices.filter(d => d.id !== action.payload)
      };
    }
    case 'CALCULATE': {
      const results = calculateSolarSystem(state.devices);
      return {
        ...state,
        results
      };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Auto-calculate whenever devices change
  useEffect(() => {
    if (state.devices.length > 0) {
      dispatch({ type: 'CALCULATE' });
    }
  }, [state.devices]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full mb-4"
          >
            <Calculator className="h-10 w-10 text-blue-600" />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="text-xl text-gray-600">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع المنشأة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اختر نوع المنشأة
                </label>
                <select
                  value={state.selectedFacilityId}
                  onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-lg"
                >
                  <option value="">-- اختر من القائمة --</option>
                  {FACILITY_TYPES.map(facility => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name}
                    </option>
                  ))}
                </select>
              </div>

              {state.devices.length > 0 && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">الأجهزة الكهربائية</h2>
                    <button
                      onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة جهاز
                    </button>
                  </div>

                  <div className="space-y-4">
                    {state.devices.map((device, index) => (
                      <motion.div
                        key={device.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
                      >
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-gray-500 mb-1">اسم الجهاز</label>
                          <input
                            type="text"
                            value={device.name}
                            onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'name', value: e.target.value } })}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        <div className="w-full sm:w-24">
                          <label className="block text-xs font-medium text-gray-500 mb-1">القدرة (واط)</label>
                          <input
                            type="number"
                            min="0"
                            value={device.power}
                            onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'power', value: Number(e.target.value) } })}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        <div className="w-full sm:w-24">
                          <label className="block text-xs font-medium text-gray-500 mb-1">العدد</label>
                          <input
                            type="number"
                            min="1"
                            value={device.quantity}
                            onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'quantity', value: Number(e.target.value) } })}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        <div className="w-full sm:w-32">
                          <label className="block text-xs font-medium text-gray-500 mb-1">ساعات التشغيل</label>
                          <input
                            type="number"
                            min="0"
                            max="24"
                            step="0.5"
                            value={device.hoursPerDay}
                            onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'hoursPerDay', value: Number(e.target.value) } })}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        <div className="flex items-end pb-1">
                          <button
                            onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="حذف الجهاز"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              {state.results ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                    <h3 className="text-xl font-bold mb-2">النتائج التقديرية</h3>
                    <p className="text-blue-100 text-sm">
                      هذه الحسابات تقريبية وتعتمد على المتوسطات.
                    </p>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Energy & Power */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                          <Activity className="h-4 w-4" />
                          <span className="text-sm font-medium">الاستهلاك اليومي</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {state.results.totalDailyEnergyKWh.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">كيلوواط.ساعة (kWh)</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                          <Zap className="h-4 w-4" />
                          <span className="text-sm font-medium">ذروة الأحمال</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {state.results.peakPowerKW.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">كيلوواط (kW)</div>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6 space-y-4">
                      {/* Inverter */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">حجم الانفرتر المقترح</span>
                          <span className="text-lg font-bold text-blue-600">{state.results.recommendedInverterKW.toFixed(1)} kW</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>

                      {/* Panels */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <Sun className="h-4 w-4 text-orange-500" />
                            قدرة الألواح المطلوبة
                          </span>
                          <span className="text-lg font-bold text-orange-600">{state.results.panelCapacityKW.toFixed(1)} kW</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>

                      {/* Batteries */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <Battery className="h-4 w-4 text-green-500" />
                            سعة البطاريات (48V)
                          </span>
                          <span className="text-lg font-bold text-green-600">{Math.round(state.results.batteryCapacityAh48V)} Ah</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          مخزون يكفي لمدة يوم ونصف تقريباً
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-dashed border-gray-300">
                  <Calculator className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد نتائج بعد</h3>
                  <p className="text-gray-500 text-sm">
                    قم باختيار نوع المنشأة أو إضافة أجهزة لعرض الحسابات التقديرية للنظام الشمسي المناسب لك.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
