import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import {
  FACILITY_TYPES,
  calculateTotalLoad,
  estimateSystemSize,
  calculateBatteryCapacity,
  generateDefaultDevicesForFacility
} from '../../models/SolarCalculatorModel';
import { Calculator, Zap, Battery, Sun, Plus, Trash2, Home, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const initialState = {
  selectedFacilityId: '',
  devices: [],
  totalLoadWh: 0,
  systemSizeKw: 0,
  batteryCapacityAh: 0,
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const devices = generateDefaultDevicesForFacility(action.payload);
      const totalLoadWh = calculateTotalLoad(devices);
      return {
        ...state,
        selectedFacilityId: action.payload,
        devices,
        totalLoadWh,
        systemSizeKw: estimateSystemSize(totalLoadWh),
        batteryCapacityAh: calculateBatteryCapacity(totalLoadWh),
      };
    }
    case 'UPDATE_DEVICE': {
      const { index, field, value } = action.payload;
      const newDevices = [...state.devices];
      newDevices[index] = { ...newDevices[index], [field]: Number(value) >= 0 ? Number(value) : 0 };
      const totalLoadWh = calculateTotalLoad(newDevices);
      return {
        ...state,
        devices: newDevices,
        totalLoadWh,
        systemSizeKw: estimateSystemSize(totalLoadWh),
        batteryCapacityAh: calculateBatteryCapacity(totalLoadWh),
      };
    }
    case 'ADD_DEVICE': {
      const newDevices = [
        ...state.devices,
        { id: `custom_${Date.now()}`, name: 'جهاز جديد', quantity: 1, wattage: 100, hours: 1 }
      ];
      const totalLoadWh = calculateTotalLoad(newDevices);
      return {
        ...state,
        devices: newDevices,
        totalLoadWh,
        systemSizeKw: estimateSystemSize(totalLoadWh),
        batteryCapacityAh: calculateBatteryCapacity(totalLoadWh),
      };
    }
    case 'UPDATE_DEVICE_NAME': {
      const { index, value } = action.payload;
      const newDevices = [...state.devices];
      newDevices[index] = { ...newDevices[index], name: value };
      return { ...state, devices: newDevices };
    }
    case 'REMOVE_DEVICE': {
      const newDevices = state.devices.filter((_, idx) => idx !== action.payload);
      const totalLoadWh = calculateTotalLoad(newDevices);
      return {
        ...state,
        devices: newDevices,
        totalLoadWh,
        systemSizeKw: estimateSystemSize(totalLoadWh),
        batteryCapacityAh: calculateBatteryCapacity(totalLoadWh),
      };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const navigate = useNavigate();

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SELECT_FACILITY', payload: e.target.value });
  };

  const handleDeviceChange = (index, field, value) => {
    dispatch({ type: 'UPDATE_DEVICE', payload: { index, field, value } });
  };

  const handleDeviceNameChange = (index, value) => {
    dispatch({ type: 'UPDATE_DEVICE_NAME', payload: { index, value } });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      {/* Header */}
      <header className="bg-emerald-600 text-white p-6 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calculator className="w-8 h-8" />
            <h1 className="text-2xl font-bold">حاسبة الطاقة الشمسية</h1>
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 transition-colors px-4 py-2 rounded-lg text-sm font-medium"
          >
            <Home className="w-4 h-4" />
            العودة للرئيسية
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column (Inputs) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">اختر نوع المنشأة</h2>
              <p className="text-gray-500 text-sm mb-4">اختر نوع منشأتك ليتم تحميل الأجهزة الافتراضية وأنماط الاستهلاك المناسبة.</p>

              <div className="relative">
                <select
                  value={state.selectedFacilityId}
                  onChange={handleFacilityChange}
                  className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all appearance-none pr-4 text-gray-700 font-medium text-lg"
                >
                  <option value="" disabled>-- الرجاء اختيار المنشأة --</option>
                  {FACILITY_TYPES.map(facility => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </motion.div>

            {/* Devices List */}
            {state.selectedFacilityId && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">الأجهزة والأحمال الكهربائية</h2>
                  <button
                    onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                    className="flex items-center gap-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="space-y-4">
                  {state.devices.map((device, index) => (
                    <div key={device.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end p-4 bg-gray-50 rounded-xl border border-gray-200">

                      <div className="md:col-span-3">
                        <label className="block text-xs text-gray-500 mb-1">اسم الجهاز</label>
                        <input
                          type="text"
                          value={device.name}
                          onChange={(e) => handleDeviceNameChange(index, e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-white text-sm"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-500 mb-1">الكمية</label>
                        <input
                          type="number"
                          min="1"
                          value={device.quantity}
                          onChange={(e) => handleDeviceChange(index, 'quantity', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-white text-sm"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label className="block text-xs text-gray-500 mb-1">الاستهلاك (واط)</label>
                        <input
                          type="number"
                          min="0"
                          value={device.wattage}
                          onChange={(e) => handleDeviceChange(index, 'wattage', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-white text-sm"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label className="block text-xs text-gray-500 mb-1">ساعات العمل/يوم</label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={device.hours}
                          onChange={(e) => handleDeviceChange(index, 'hours', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-white text-sm"
                        />
                      </div>

                      <div className="md:col-span-1 flex justify-center">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: index })}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="حذف الجهاز"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                    </div>
                  ))}
                  {state.devices.length === 0 && (
                     <div className="text-center py-8 text-gray-500">
                       لا توجد أجهزة مضافة. انقر على "إضافة جهاز" للبدء.
                     </div>
                  )}
                </div>
              </motion.div>
            )}

          </div>

          {/* Right Column (Results) */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-600 rounded-2xl shadow-lg p-6 text-white sticky top-6"
            >
              <h3 className="text-lg font-bold mb-6 border-b border-emerald-500 pb-4">النتائج التقديرية</h3>

              <div className="space-y-6">

                {/* Total Load */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-500 rounded-xl">
                    <Zap className="w-6 h-6 text-emerald-50" />
                  </div>
                  <div>
                    <p className="text-emerald-100 text-sm mb-1">الاستهلاك اليومي الكلي</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{(state.totalLoadWh / 1000).toFixed(1)}</span>
                      <span className="text-sm">كيلو واط/ساعة (kWh)</span>
                    </div>
                  </div>
                </div>

                {/* System Size */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-500 rounded-xl">
                    <Sun className="w-6 h-6 text-emerald-50" />
                  </div>
                  <div>
                    <p className="text-emerald-100 text-sm mb-1">حجم النظام الشمسي المقترح</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{state.systemSizeKw.toFixed(1)}</span>
                      <span className="text-sm">كيلو واط (kW)</span>
                    </div>
                    <p className="text-xs text-emerald-200 mt-1">*بافتراض 5.5 ساعات شمس وكفاءة 80%</p>
                  </div>
                </div>

                {/* Battery Capacity */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-500 rounded-xl">
                    <Battery className="w-6 h-6 text-emerald-50" />
                  </div>
                  <div>
                    <p className="text-emerald-100 text-sm mb-1">سعة البطاريات المقترحة</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{Math.round(state.batteryCapacityAh)}</span>
                      <span className="text-sm">أمبير/ساعة (Ah)</span>
                    </div>
                    <p className="text-xs text-emerald-200 mt-1">*بافتراض نظام 48 فولت وتفريغ 80%</p>
                  </div>
                </div>

              </div>

              {state.totalLoadWh > 0 && (
                <div className="mt-8 pt-6 border-t border-emerald-500">
                  <button className="w-full bg-white text-emerald-700 hover:bg-emerald-50 font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                    طلب عرض سعر بناءً على هذه النتائج
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              )}

            </motion.div>
          </div>

        </div>
      </main>
    </div>
  );
}
