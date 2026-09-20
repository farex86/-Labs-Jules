import React, { useReducer } from 'react';
import { Plus, Trash2, Calculator, Settings, Sun } from 'lucide-react';
import {
  FACILITY_TYPES,
  calculateTotalEnergy,
  calculateSystemSize,
  calculateBatteryCapacity
} from '../../models/SolarCalculatorModel';

// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const initialState = {
  selectedFacilityId: '',
  devices: [],
  results: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      const clonedDevices = facility
        ? facility.defaultDevices.map(d => ({ ...d, id: Math.random().toString(36).substr(2, 9) }))
        : [];
      return {
        ...state,
        selectedFacilityId: action.payload,
        devices: clonedDevices,
        results: null,
      };
    }
    case 'ADD_DEVICE': {
      return {
        ...state,
        devices: [...state.devices, { id: Math.random().toString(36).substr(2, 9), name: 'جهاز جديد', power: 0, quantity: 1, hours: 1 }],
        results: null,
      };
    }
    case 'UPDATE_DEVICE': {
      return {
        ...state,
        devices: state.devices.map(d =>
          d.id === action.payload.id ? { ...d, ...action.payload.updates } : d
        ),
        results: null,
      };
    }
    case 'REMOVE_DEVICE': {
      return {
        ...state,
        devices: state.devices.filter(d => d.id !== action.payload),
        results: null,
      };
    }
    case 'CALCULATE': {
      const totalEnergy = calculateTotalEnergy(state.devices);
      const systemSize = calculateSystemSize(totalEnergy);
      const batteryCapacity = calculateBatteryCapacity(totalEnergy);
      return {
        ...state,
        results: {
          totalEnergy,
          systemSize,
          batteryCapacity
        }
      };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4 space-x-reverse border border-gray-100">
          <div className="bg-amber-100 p-3 rounded-lg">
            <Sun className="h-8 w-8 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">حاسبة الطاقة الشمسية</h1>
            <p className="text-gray-500 mt-1">احسب احتياجك من الطاقة الشمسية بناءً على نوع منشأتك</p>
          </div>
        </div>

        {/* Selection Area */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">اختر نوع المنشأة</label>
          <select
            className="w-full md:w-1/2 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-gray-50 border p-3"
            value={state.selectedFacilityId}
            onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
          >
            <option value="">-- اختر من القائمة --</option>
            {FACILITY_TYPES.map(facility => (
              <option key={facility.id} value={facility.id}>{facility.name}</option>
            ))}
          </select>
        </div>

        {/* Devices List */}
        {state.selectedFacilityId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-500" />
                الأجهزة الكهربائية
              </h2>
              <button
                onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-md hover:bg-amber-100 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                إضافة جهاز
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-600">
                    <th className="pb-3 px-2 font-medium">اسم الجهاز</th>
                    <th className="pb-3 px-2 font-medium">الاستهلاك (واط)</th>
                    <th className="pb-3 px-2 font-medium">العدد</th>
                    <th className="pb-3 px-2 font-medium">ساعات العمل/يوم</th>
                    <th className="pb-3 px-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {state.devices.map(device => (
                    <tr key={device.id} className="border-b border-gray-50">
                      <td className="py-3 px-2">
                        <input
                          type="text"
                          value={device.name}
                          onChange={e => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, updates: { name: e.target.value } } })}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 p-2 border"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="number"
                          value={device.power}
                          onChange={e => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, updates: { power: Number(e.target.value) } } })}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 p-2 border"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="number"
                          value={device.quantity}
                          onChange={e => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, updates: { quantity: Number(e.target.value) } } })}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 p-2 border"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="number"
                          value={device.hours}
                          onChange={e => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, updates: { hours: Number(e.target.value) } } })}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 p-2 border"
                        />
                      </td>
                      <td className="py-3 px-2 text-left">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => dispatch({ type: 'CALCULATE' })}
                className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium shadow-sm"
              >
                <Calculator className="w-5 h-5" />
                احسب النظام المناسب
              </button>
            </div>
          </motion.div>
        )}

        {/* Results Area */}
        {state.results && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">النتائج التقديرية</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                <div className="text-blue-800 text-sm font-medium mb-1">الاستهلاك اليومي</div>
                <div className="text-3xl font-bold text-blue-900">
                  {(state.results.totalEnergy / 1000).toFixed(1)} <span className="text-lg font-normal text-blue-700">كيلوواط/ساعة</span>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                <div className="text-amber-800 text-sm font-medium mb-1">حجم النظام الشمسي المقترح</div>
                <div className="text-3xl font-bold text-amber-900">
                  {state.results.systemSize.toFixed(1)} <span className="text-lg font-normal text-amber-700">كيلوواط</span>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                <div className="text-green-800 text-sm font-medium mb-1">سعة البطاريات المطلوبة (48 فولت)</div>
                <div className="text-3xl font-bold text-green-900">
                  {Math.ceil(state.results.batteryCapacity)} <span className="text-lg font-normal text-green-700">أمبير/ساعة</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-6 text-center">
              * هذه الحسابات تقديرية وتعتمد على متوسطات السطوع الشمسي. يُنصح باستشارة مهندس مختص للحصول على تصميم دقيق.
            </p>
          </motion.div>
        )}

      </div>
    </div>
  );
}
