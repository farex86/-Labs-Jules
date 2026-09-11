import React, { useReducer, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Sun, Plus, Trash2, Calculator, Settings, Zap } from 'lucide-react';
import { FACILITY_TYPES, SolarCalculatorModel } from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacility: '',
  devices: [],
  totals: {
    totalPowerW: 0,
    totalDailyEnergyWh: 0,
    totalDailyEnergyKwh: 0,
    recommendedInverterKw: 0,
    requiredPanelCapacityKw: 0
  }
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const devices = SolarCalculatorModel.getDevicesForFacility(action.payload);
      return {
        ...state,
        selectedFacility: action.payload,
        devices
      };
    }
    case 'UPDATE_DEVICE': {
      const { id, field, value } = action.payload;
      const updatedDevices = state.devices.map(device =>
        device.id === id ? { ...device, [field]: value } : device
      );
      return { ...state, devices: updatedDevices };
    }
    case 'ADD_DEVICE': {
      const newDevice = {
        id: Date.now(), // Generate a unique ID outside if strict purity is needed, but Date.now is acceptable for simple lists without external side-effects
        name: 'جهاز جديد',
        powerW: 100,
        qty: 1,
        hours: 1
      };
      return { ...state, devices: [...state.devices, newDevice] };
    }
    case 'REMOVE_DEVICE': {
      const updatedDevices = state.devices.filter(d => d.id !== action.payload);
      return { ...state, devices: updatedDevices };
    }
    case 'CALCULATE_TOTALS': {
      const totals = SolarCalculatorModel.calculateTotals(state.devices);
      return { ...state, totals };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  // Recalculate totals whenever devices change
  useEffect(() => {
    dispatch({ type: 'CALCULATE_TOTALS' });
  }, [state.devices]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-10">
          <Sun className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
          <label htmlFor="facility" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            اختر نوع المنشأة
          </label>
          <select
            id="facility"
            value={state.selectedFacility}
            onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md"
          >
            <option value="" disabled>-- اختر من القائمة --</option>
            {FACILITY_TYPES.map(facility => (
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
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8 overflow-x-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <Settings className="h-5 w-5 ml-2 text-gray-500" />
                الأجهزة والأحمال
              </h2>
              <button
                onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                <Plus className="h-4 w-4 ml-2" />
                إضافة جهاز
              </button>
            </div>

            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القدرة (واط)</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العدد</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات التشغيل</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراء</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {state.devices.map((device) => (
                  <tr key={device.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        value={device.name}
                        onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'name', value: e.target.value }})}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        min="0"
                        value={device.powerW}
                        onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'powerW', value: e.target.value }})}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        min="1"
                        value={device.qty}
                        onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'qty', value: e.target.value }})}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={device.hours}
                        onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'hours', value: e.target.value }})}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {state.devices.length === 0 && (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                لا توجد أجهزة مضافة.
              </div>
            )}
          </motion.div>
        )}

        {state.selectedFacility && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 rounded-lg p-6 text-white shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center border-b border-gray-700 pb-4">
              <Calculator className="h-6 w-6 ml-3 text-yellow-500" />
              النتائج والتوصيات
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-4 rounded-lg flex items-center">
                <div className="p-3 bg-blue-900/50 rounded-full ml-4">
                  <Zap className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">إجمالي الاستهلاك اليومي</p>
                  <p className="text-2xl font-bold">{state.totals.totalDailyEnergyKwh.toFixed(2)} <span className="text-sm font-normal text-gray-400">كيلوواط/ساعة</span></p>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg flex items-center">
                <div className="p-3 bg-yellow-900/50 rounded-full ml-4">
                  <Sun className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">قدرة الألواح المطلوبة (تقريبي)</p>
                  <p className="text-2xl font-bold">{state.totals.requiredPanelCapacityKw.toFixed(2)} <span className="text-sm font-normal text-gray-400">كيلوواط</span></p>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg flex items-center md:col-span-2">
                <div className="p-3 bg-green-900/50 rounded-full ml-4">
                  <Settings className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">حجم الانفرتر الموصى به</p>
                  <p className="text-2xl font-bold">{state.totals.recommendedInverterKw.toFixed(2)} <span className="text-sm font-normal text-gray-400">كيلوواط</span></p>
                  <p className="text-xs text-gray-500 mt-1">* يشمل هامش أمان 25% للتشغيل</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
