import React, { useReducer, useEffect } from 'react';
import { motion } from 'motion/react';
import { Save, Plus, Trash2, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  facilityTypes,
  calculateDeviceDailyConsumption,
  calculateTotalDailyConsumption,
  calculateRecommendedSystemSize,
  defaultDevices,
} from '../../models/SolarCalculatorModel';

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialState = {
  facilityType: '',
  devices: defaultDevices.map(d => ({ ...d, id: generateId() })),
  totalDailyConsumptionWh: 0,
  recommendedSystemSizeKw: 0,
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY':
      return { ...state, facilityType: action.payload };
    case 'ADD_DEVICE':
      return {
        ...state,
        devices: [
          ...state.devices,
          { id: generateId(), name: 'جهاز جديد', quantity: 1, wattage: 0, hoursPerDay: 0 },
        ],
      };
    case 'UPDATE_DEVICE': {
      const updatedDevices = state.devices.map(device =>
        device.id === action.payload.id ? { ...device, ...action.payload.updates } : device
      );
      return { ...state, devices: updatedDevices };
    }
    case 'REMOVE_DEVICE':
      return {
        ...state,
        devices: state.devices.filter(device => device.id !== action.payload),
      };
    case 'CALCULATE_TOTALS': {
      const totalWh = calculateTotalDailyConsumption(state.devices);
      const recommendedKw = calculateRecommendedSystemSize(totalWh);
      return {
        ...state,
        totalDailyConsumptionWh: totalWh,
        recommendedSystemSizeKw: recommendedKw,
      };
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

  const handleCalculate = () => {
    toast.success('تم الحساب بنجاح!');
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
              <Zap className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">حاسبة الطاقة الشمسية</h1>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="facilityType" className="block text-sm font-medium text-gray-700 mb-2">
                نوع المنشأة
              </label>
              <select
                id="facilityType"
                value={state.facilityType}
                onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border"
              >
                <option value="">اختر نوع المنشأة</option>
                {facilityTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">الأجهزة وأنماط الاستهلاك</h2>
                <button
                  onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  إضافة جهاز
                </button>
              </div>

              <div className="space-y-4">
                {state.devices.map((device) => (
                  <motion.div
                    key={device.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 sm:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 items-end"
                  >
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-medium text-gray-500 mb-1">اسم الجهاز</label>
                      <input
                        type="text"
                        value={device.name}
                        onChange={(e) =>
                          dispatch({
                            type: 'UPDATE_DEVICE',
                            payload: { id: device.id, updates: { name: e.target.value } },
                          })
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-medium text-gray-500 mb-1">العدد</label>
                      <input
                        type="number"
                        min="1"
                        value={device.quantity}
                        onChange={(e) =>
                          dispatch({
                            type: 'UPDATE_DEVICE',
                            payload: { id: device.id, updates: { quantity: parseInt(e.target.value) || 0 } },
                          })
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-medium text-gray-500 mb-1">الاستهلاك (واط)</label>
                      <input
                        type="number"
                        min="0"
                        value={device.wattage}
                        onChange={(e) =>
                          dispatch({
                            type: 'UPDATE_DEVICE',
                            payload: { id: device.id, updates: { wattage: parseInt(e.target.value) || 0 } },
                          })
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-medium text-gray-500 mb-1">ساعات التشغيل (يومياً)</label>
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={device.hoursPerDay}
                        onChange={(e) =>
                          dispatch({
                            type: 'UPDATE_DEVICE',
                            payload: { id: device.id, updates: { hoursPerDay: parseInt(e.target.value) || 0 } },
                          })
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                      />
                    </div>
                    <div className="sm:col-span-1 flex justify-end">
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        title="حذف الجهاز"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <button
                onClick={handleCalculate}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm"
              >
                <Save className="w-5 h-5" />
                حفظ وحساب
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-2">إجمالي الاستهلاك اليومي</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {(state.totalDailyConsumptionWh / 1000).toFixed(2)}
            </div>
            <span className="text-sm text-gray-500">كيلو واط ساعة (kWh)</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-2">حجم النظام المقترح</h3>
            <div className="text-3xl font-bold text-indigo-600 mb-1">
              {state.recommendedSystemSizeKw.toFixed(2)}
            </div>
            <span className="text-sm text-gray-500">كيلو واط (kW)</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
