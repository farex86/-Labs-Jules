import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import toast, { Toaster } from 'react-hot-toast';
import { Plus, Trash2, Calculator, ArrowRight, Zap, Sun, Battery } from 'lucide-react';
import {
  FACILITY_TYPES,
  calculateTotalEnergy,
  calculateRecommendedSystem
} from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacilityId: '',
  devices: [],
  isCalculating: false,
  results: null,
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      if (!facility) return state;
      // Deep copy devices to avoid mutating constants
      const copiedDevices = facility.defaultDevices.map(d => ({ ...d }));
      return {
        ...state,
        selectedFacilityId: action.payload,
        devices: copiedDevices,
        results: null
      };
    }
    case 'UPDATE_DEVICE': {
      const { id, field, value } = action.payload;
      const updatedDevices = state.devices.map(device => {
        if (device.id === id) {
          return { ...device, [field]: value };
        }
        return device;
      });
      return { ...state, devices: updatedDevices, results: null };
    }
    case 'ADD_DEVICE': {
      const newDevice = {
        id: Date.now().toString(),
        name: 'جهاز جديد',
        power: 100,
        quantity: 1,
        hours: 1
      };
      return { ...state, devices: [...state.devices, newDevice], results: null };
    }
    case 'REMOVE_DEVICE': {
      const filteredDevices = state.devices.filter(d => d.id !== action.payload);
      return { ...state, devices: filteredDevices, results: null };
    }
    case 'CALCULATE_START': {
      return { ...state, isCalculating: true };
    }
    case 'CALCULATE_END': {
      return { ...state, isCalculating: false, results: action.payload };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SET_FACILITY', payload: e.target.value });
    toast.success('تم تحديث الأجهزة الافتراضية');
  };

  const handleCalculate = () => {
    dispatch({ type: 'CALCULATE_START' });

    // Simulate slight delay for UX
    setTimeout(() => {
      const totalEnergyWh = calculateTotalEnergy(state.devices);
      const systemRecommendation = calculateRecommendedSystem(totalEnergyWh);
      dispatch({ type: 'CALCULATE_END', payload: systemRecommendation });
      toast.success('تم الحساب بنجاح!');
    }, 600);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Toaster position="top-center" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Sun className="h-10 w-10 text-yellow-500" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="text-lg text-gray-600">احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="mb-8">
              <label htmlFor="facility-type" className="block text-sm font-medium text-gray-700 mb-2">
                اختر نوع المنشأة
              </label>
              <select
                id="facility-type"
                value={state.selectedFacilityId}
                onChange={handleFacilityChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-4 shadow-sm"
              >
                <option value="" disabled>-- الرجاء اختيار نوع المنشأة --</option>
                {FACILITY_TYPES.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {state.devices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">الأجهزة الكهربائية</h3>
                  <button
                    onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium bg-blue-50 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                      <tr>
                        <th className="px-6 py-4 rounded-tr-lg">اسم الجهاز</th>
                        <th className="px-6 py-4">القدرة (واط)</th>
                        <th className="px-6 py-4">العدد</th>
                        <th className="px-6 py-4">ساعات التشغيل/يوم</th>
                        <th className="px-6 py-4 rounded-tl-lg">إجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.devices.map((device) => (
                        <tr key={device.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={device.name}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'name', value: e.target.value }})}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              min="1"
                              value={device.power}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'power', value: Number(e.target.value) }})}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              min="1"
                              value={device.quantity}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'quantity', value: Number(e.target.value) }})}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              min="1"
                              max="24"
                              value={device.hours}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'hours', value: Number(e.target.value) }})}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                              className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={handleCalculate}
                    disabled={state.isCalculating}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {state.isCalculating ? (
                      <span className="animate-pulse">جاري الحساب...</span>
                    ) : (
                      <>
                        <Calculator className="h-6 w-6" />
                        احسب النظام المناسب
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {state.results && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-blue-900 text-white p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">النتائج المقدرة</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-800/50 p-6 rounded-xl flex flex-col items-center justify-center text-center border border-blue-700">
                  <Zap className="h-10 w-10 text-yellow-400 mb-3" />
                  <p className="text-blue-200 text-sm mb-1">الاستهلاك اليومي</p>
                  <p className="text-3xl font-bold">{state.results.dailyConsumptionKwh} <span className="text-lg font-normal">كيلوواط/ساعة</span></p>
                </div>

                <div className="bg-blue-800/50 p-6 rounded-xl flex flex-col items-center justify-center text-center border border-blue-700">
                  <Sun className="h-10 w-10 text-orange-400 mb-3" />
                  <p className="text-blue-200 text-sm mb-1">حجم الألواح المقترح</p>
                  <p className="text-3xl font-bold">{state.results.solarPanelsKw} <span className="text-lg font-normal">كيلوواط</span></p>
                </div>

                <div className="bg-blue-800/50 p-6 rounded-xl flex flex-col items-center justify-center text-center border border-blue-700">
                  <Battery className="h-10 w-10 text-green-400 mb-3" />
                  <p className="text-blue-200 text-sm mb-1">سعة البطاريات المقترحة</p>
                  <p className="text-3xl font-bold">{state.results.batteryKwh} <span className="text-lg font-normal">كيلوواط/ساعة</span></p>
                </div>
              </div>

              <div className="mt-8 text-center text-blue-200 text-sm">
                <p>ملاحظة: هذه الحسابات تقديرية وتعتمد على المتوسطات. يرجى استشارة مهندس طاقة شمسية للحصول على تصميم دقيق.</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
