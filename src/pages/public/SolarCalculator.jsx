/* eslint-disable no-unused-vars */
import React, { useReducer } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Calculator, Settings, ArrowRight } from 'lucide-react';
import { facilityTypes, calculateDailyConsumption, calculateSystemSize } from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacility: '',
  devices: [],
  newDevice: {
    name: '',
    quantity: 1,
    watts: 0,
    hours: 0
  },
  results: {
    dailyConsumptionWh: 0,
    systemSizeKw: 0
  }
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY':
      return { ...state, selectedFacility: action.payload };
    case 'UPDATE_NEW_DEVICE':
      return {
        ...state,
        newDevice: { ...state.newDevice, ...action.payload }
      };
    case 'ADD_DEVICE': {
      if (!state.newDevice.name || state.newDevice.watts <= 0) return state;

      const updatedDevices = [...state.devices, { ...state.newDevice, id: Date.now() }];
      const dailyWh = calculateDailyConsumption(updatedDevices);
      const sizeKw = calculateSystemSize(dailyWh);

      return {
        ...state,
        devices: updatedDevices,
        newDevice: { name: '', quantity: 1, watts: 0, hours: 0 },
        results: { dailyConsumptionWh: dailyWh, systemSizeKw: sizeKw }
      };
    }
    case 'REMOVE_DEVICE': {
      const updatedDevices = state.devices.filter(d => d.id !== action.payload);
      const dailyWh = calculateDailyConsumption(updatedDevices);
      const sizeKw = calculateSystemSize(dailyWh);

      return {
        ...state,
        devices: updatedDevices,
        results: { dailyConsumptionWh: dailyWh, systemSizeKw: sizeKw }
      };
    }
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  // Handlers
  const handleFacilityChange = (e) => {
    dispatch({ type: 'SET_FACILITY', payload: e.target.value });
  };

  const handleDeviceChange = (field, value) => {
    dispatch({ type: 'UPDATE_NEW_DEVICE', payload: { [field]: value } });
  };

  const handleAddDevice = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_DEVICE' });
  };

  const handleRemoveDevice = (id) => {
    dispatch({ type: 'REMOVE_DEVICE', payload: id });
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-yellow-100 text-yellow-600 rounded-full mb-4">
            <Calculator className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">حاسبة الطاقة الشمسية</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            احسب استهلاكك من الطاقة وحجم النظام الشمسي المناسب لمنشأتك
          </p>
        </div>

        {/* Facility Selection */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            نوع المنشأة
          </label>
          <select
            value={state.selectedFacility}
            onChange={handleFacilityChange}
            className="w-full md:w-1/2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
          >
            <option value="">اختر نوع المنشأة...</option>
            {facilityTypes.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Left Column: Device Input & List */}
          <div className="md:col-span-2 space-y-6">

            {/* Add Device Form */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6 text-blue-500" />
                إضافة جهاز
              </h2>

              <form onSubmit={handleAddDevice} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">اسم الجهاز (مثال: مكيف، ثلاجة، إلخ)</label>
                  <input
                    type="text"
                    value={state.newDevice.name}
                    onChange={(e) => handleDeviceChange('name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                    placeholder="اسم الجهاز"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الكمية</label>
                  <input
                    type="number"
                    min="1"
                    value={state.newDevice.quantity}
                    onChange={(e) => handleDeviceChange('quantity', parseInt(e.target.value) || 0)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">القدرة (واط)</label>
                  <input
                    type="number"
                    min="1"
                    value={state.newDevice.watts || ''}
                    onChange={(e) => handleDeviceChange('watts', parseInt(e.target.value) || 0)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                    placeholder="القدرة بالواط"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">ساعات التشغيل اليومية</label>
                  <input
                    type="number"
                    min="1" max="24"
                    value={state.newDevice.hours || ''}
                    onChange={(e) => handleDeviceChange('hours', parseFloat(e.target.value) || 0)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                    placeholder="ساعات التشغيل (1-24)"
                    required
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    إضافة الجهاز
                  </button>
                </div>
              </form>
            </div>

            {/* Device List */}
            {state.devices.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-bold mb-4">الأجهزة المضافة</h3>
                <div className="space-y-3">
                  {state.devices.map(device => (
                    <motion.div
                      key={device.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-800">{device.name}</h4>
                        <p className="text-sm text-gray-500">
                          الكمية: {device.quantity} | {device.watts} واط | {device.hours} ساعات/يوم
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveDevice(device.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Results */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 text-white sticky top-6">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                النتائج
              </h2>

              <div className="space-y-8">
                <div>
                  <p className="text-gray-400 mb-1">الاستهلاك اليومي</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-yellow-400">
                      {(state.results.dailyConsumptionWh / 1000).toFixed(2)}
                    </span>
                    <span className="text-xl mb-1 text-gray-300">كيلوواط/ساعة</span>
                  </div>
                </div>

                <div className="h-px bg-gray-700 w-full"></div>

                <div>
                  <p className="text-gray-400 mb-1 text-sm flex items-center gap-1">
                    حجم النظام المقترح
                    <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full text-gray-300" title="تم احتساب نسبة فاقد 30%">شامل الفاقد</span>
                  </p>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-bold text-green-400">
                      {state.results.systemSizeKw}
                    </span>
                    <span className="text-2xl mb-1 text-gray-300">kWp</span>
                  </div>
                </div>

                {state.results.systemSizeKw > 0 && (
                  <div className="pt-4">
                     <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                        طلب عرض سعر
                        <ArrowRight className="w-5 h-5" />
                     </button>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
