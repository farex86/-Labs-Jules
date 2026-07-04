import React, { useReducer, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Calculator, Plus, Trash2, Zap, Battery, Sun, Server, Factory } from 'lucide-react';
import { facilityTypes, calculateSolarRequirements } from '../../models/solarCalculatorModel';

// State Management via useReducer
const initialState = {
  selectedFacility: '',
  devices: [],
  results: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facility = facilityTypes.find(f => f.id === action.payload);
      if (facility) {

        return {
          ...state,
          selectedFacility: action.payload,
          devices: JSON.parse(JSON.stringify(facility.defaultDevices)), // deep copy
          results: null
        };
      }
      return state;
    }
    case 'ADD_DEVICE': {
      const newDevice = {
        id: `custom_${Date.now()}`,
        name: 'جهاز جديد',
        powerW: 100,
        hoursPerDay: 8,
        quantity: 1
      };

      return {
        ...state,
        devices: [...state.devices, newDevice],
        results: null
      };
    }
    case 'UPDATE_DEVICE': {
      const { id, field, value } = action.payload;
      return {
        ...state,
        devices: state.devices.map(device =>
          device.id === id ? { ...device, [field]: value } : device
        ),
        results: null
      };
    }
    case 'REMOVE_DEVICE': {

      return {
        ...state,
        devices: state.devices.filter(device => device.id !== action.payload),
        results: null
      };
    }
    case 'CALCULATE': {
      const results = calculateSolarRequirements(state.devices);

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

  // Show toast via useEffect to avoid calling inside reducer during strict mode render
  useEffect(() => {
    if (state.selectedFacility && !state.results) {
      toast.success('تم تحديث البيانات', { id: 'update' });
    } else if (state.results) {
      toast.success('تم الحساب بنجاح!', { id: 'calc' });
    }
  }, [state.selectedFacility, state.devices.length, state.results]);

  // Direction RTL since everything is Arabic
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            الحاسبة الشمسية
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك
          </p>
        </motion.div>

        {/* Facility Selection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 shadow rounded-xl p-6"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
            <Factory className="w-5 h-5 text-indigo-500" />
            اختر نوع المنشأة
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {facilityTypes.map((facility) => (
              <button
                key={facility.id}
                onClick={() => dispatch({ type: 'SET_FACILITY', payload: facility.id })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  state.selectedFacility === facility.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {facility.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Devices Configuration */}
        <AnimatePresence>
          {state.selectedFacility && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white dark:bg-gray-800 shadow rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                  <Server className="w-5 h-5 text-green-500" />
                  الأجهزة والاستهلاك
                </h2>
                <button
                  onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                  className="flex items-center gap-1 text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  إضافة جهاز
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400">
                    <tr>
                      <th className="py-3 px-4 font-medium">اسم الجهاز</th>
                      <th className="py-3 px-4 font-medium">الاستهلاك (واط)</th>
                      <th className="py-3 px-4 font-medium">ساعات العمل/يوم</th>
                      <th className="py-3 px-4 font-medium">العدد</th>
                      <th className="py-3 px-4 font-medium text-center">إجراء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <AnimatePresence>
                      {state.devices.map((device) => (
                        <motion.tr
                          key={device.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="group hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        >
                          <td className="py-3 px-4">
                            <input
                              type="text"
                              value={device.name}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'name', value: e.target.value }})}
                              className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none px-1 py-1 text-gray-900 dark:text-white"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <input
                              type="number"
                              min="0"
                              value={device.powerW}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'powerW', value: e.target.value }})}
                              className="w-24 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none px-1 py-1 text-gray-900 dark:text-white"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <input
                              type="number"
                              min="0"
                              max="24"
                              value={device.hoursPerDay}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'hoursPerDay', value: e.target.value }})}
                              className="w-20 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none px-1 py-1 text-gray-900 dark:text-white"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <input
                              type="number"
                              min="1"
                              value={device.quantity}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'quantity', value: e.target.value }})}
                              className="w-16 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none px-1 py-1 text-gray-900 dark:text-white"
                            />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                              className="text-red-400 hover:text-red-600 transition-colors p-1"
                              title="حذف"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => dispatch({ type: 'CALCULATE' })}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  احسب النظام
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <AnimatePresence>
          {state.results && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl shadow-xl p-8 text-white"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">النتائج المقدرة للنظام</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Total Energy */}
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20 flex items-start gap-4">
                  <div className="p-3 bg-yellow-400/20 rounded-lg text-yellow-300">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">الاستهلاك اليومي الكلي</p>
                    <p className="text-3xl font-bold mt-1">{state.results.totalDailyEnergyKwh} <span className="text-lg font-normal text-blue-200">كيلوواط/ساعة</span></p>
                  </div>
                </div>

                {/* Solar Panels */}
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20 flex items-start gap-4">
                  <div className="p-3 bg-orange-400/20 rounded-lg text-orange-300">
                    <Sun className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">حجم الألواح الشمسية المقترح</p>
                    <p className="text-3xl font-bold mt-1">{state.results.recommendedSolarPanelsKw} <span className="text-lg font-normal text-blue-200">كيلوواط (kW)</span></p>
                  </div>
                </div>

                {/* Battery */}
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20 flex items-start gap-4">
                  <div className="p-3 bg-green-400/20 rounded-lg text-green-300">
                    <Battery className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">سعة البطاريات المقترحة (يوم واحد)</p>
                    <p className="text-3xl font-bold mt-1">{state.results.recommendedBatteryKwh} <span className="text-lg font-normal text-blue-200">كيلوواط/ساعة</span></p>
                  </div>
                </div>

                {/* Inverter */}
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20 flex items-start gap-4">
                  <div className="p-3 bg-purple-400/20 rounded-lg text-purple-300">
                    <Server className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">حجم محول الطاقة (الإنفرتر)</p>
                    <p className="text-3xl font-bold mt-1">{state.results.recommendedInverterKw} <span className="text-lg font-normal text-blue-200">كيلوواط (kW)</span></p>
                  </div>
                </div>

              </div>

              <div className="mt-8 text-center text-sm text-blue-200/70 bg-black/20 p-4 rounded-lg">
                * ملاحظة: هذه الحسابات تقديرية. يُنصح دائماً بالرجوع لمهندس مختص للحصول على تصميم دقيق يتناسب مع ظروف الموقع الفعلية.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
