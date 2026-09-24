import React, { useReducer } from 'react';
import { getFacilityTypes, getDevicesForFacility, calculateSolarSystem } from '../../models/SolarCalculatorModel';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import toast, { Toaster } from 'react-hot-toast';
import { Calculator, Plus, Trash2, Zap, Battery, Sun, Activity, Save } from 'lucide-react';

// Pure utility to generate unique IDs outside the component
const generateId = () => `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const initialState = {
  selectedFacility: '',
  devices: [],
  results: null,
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const newDevices = getDevicesForFacility(action.payload);
      return {
        ...state,
        selectedFacility: action.payload,
        devices: newDevices,
        results: null, // Reset results on facility change
      };
    }
    case 'UPDATE_DEVICE': {
      const updatedDevices = state.devices.map(device => {
        if (device.id === action.payload.id) {
          return { ...device, [action.payload.field]: Number(action.payload.value) || action.payload.value };
        }
        return device;
      });
      return { ...state, devices: updatedDevices, results: null };
    }
    case 'ADD_DEVICE': {
      const newDevice = {
        id: generateId(),
        name: 'جهاز جديد',
        power: 100,
        quantity: 1,
        hours: 1,
      };
      return { ...state, devices: [...state.devices, newDevice], results: null };
    }
    case 'REMOVE_DEVICE': {
      const filteredDevices = state.devices.filter(d => d.id !== action.payload);
      return { ...state, devices: filteredDevices, results: null };
    }
    case 'CALCULATE': {
      if (state.devices.length === 0) {
        return state;
      }
      const results = calculateSolarSystem(state.devices);
      return { ...state, results };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const facilityTypes = getFacilityTypes();

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SELECT_FACILITY', payload: e.target.value });
    toast.success('تم تحديث الأجهزة بناءً على نمط الاستهلاك المحدد');
  };

  const handleDeviceChange = (id, field, value) => {
    dispatch({ type: 'UPDATE_DEVICE', payload: { id, field, value } });
  };

  const addDevice = () => {
    dispatch({ type: 'ADD_DEVICE' });
  };

  const removeDevice = (id) => {
    dispatch({ type: 'REMOVE_DEVICE', payload: id });
    toast.error('تم إزالة الجهاز');
  };

  const handleCalculate = () => {
    if (state.devices.length === 0) {
      toast.error('الرجاء إضافة جهاز واحد على الأقل');
      return;
    }
    dispatch({ type: 'CALCULATE' });
    toast.success('تم الحساب بنجاح');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      {/* Header */}
      <header className="bg-blue-600 text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calculator size={32} />
            <h1 className="text-2xl font-bold">حاسبة الطاقة الشمسية</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column (Input) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Facility Selection */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">اختر نمط الاستهلاك</h2>
            <select
              value={state.selectedFacility}
              onChange={handleFacilityChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="">-- اختر من القائمة --</option>
              {facilityTypes.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
            <p className="mt-3 text-sm text-gray-500">سيتم ملء الأجهزة الافتراضية تلقائياً بناءً على اختيارك، يمكنك التعديل عليها.</p>
          </div>

          {/* Devices List */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">الأجهزة الكهربائية</h2>
              <button
                onClick={addDevice}
                className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Plus size={18} />
                <span>إضافة جهاز</span>
              </button>
            </div>

            {state.devices.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                لا توجد أجهزة مضافة. الرجاء اختيار نمط استهلاك أو إضافة جهاز يدوياً.
              </div>
            ) : (
              <div className="space-y-4">
                {/* Headers for larger screens */}
                <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 mb-2 px-2">
                  <div className="col-span-4">اسم الجهاز</div>
                  <div className="col-span-2">القدرة (واط)</div>
                  <div className="col-span-2">العدد</div>
                  <div className="col-span-3">ساعات العمل / يوم</div>
                  <div className="col-span-1 text-center">إجراء</div>
                </div>

                {state.devices.map((device, index) => (

                  <motion.div
                    key={device.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gray-50 p-4 rounded-lg border border-gray-200"
                  >
                    <div className="col-span-1 md:col-span-4">
                      <label className="block text-xs text-gray-500 mb-1 md:hidden">اسم الجهاز</label>
                      <input
                        type="text"
                        value={device.name}
                        onChange={(e) => handleDeviceChange(device.id, 'name', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                        placeholder="مثال: مكيف"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs text-gray-500 mb-1 md:hidden">القدرة (واط)</label>
                      <input
                        type="number"
                        min="0"
                        value={device.power}
                        onChange={(e) => handleDeviceChange(device.id, 'power', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs text-gray-500 mb-1 md:hidden">العدد</label>
                      <input
                        type="number"
                        min="1"
                        value={device.quantity}
                        onChange={(e) => handleDeviceChange(device.id, 'quantity', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-3">
                      <label className="block text-xs text-gray-500 mb-1 md:hidden">ساعات العمل</label>
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={device.hours}
                        onChange={(e) => handleDeviceChange(device.id, 'hours', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-1 flex justify-end md:justify-center mt-2 md:mt-0">
                      <button
                        onClick={() => removeDevice(device.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
                        title="حذف الجهاز"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Calculate Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleCalculate}
                disabled={state.devices.length === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calculator size={20} />
                <span>احسب النظام</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Results) */}
        <div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-4">النتائج والتوصيات</h2>

            {!state.results ? (
              <div className="text-center py-12 text-gray-400 flex flex-col items-center">
                <Calculator size={48} className="mb-4 text-gray-300" />
                <p>أدخل الأجهزة واضغط على "احسب النظام" لرؤية النتائج</p>
              </div>
            ) : (

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Daily Energy */}
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                    <Activity size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">الاستهلاك اليومي</p>
                    <p className="text-xl font-bold text-gray-800">
                      {(state.results.totalDailyEnergy / 1000).toFixed(1)} <span className="text-sm font-normal text-gray-500">كيلوواط.ساعة</span>
                    </p>
                  </div>
                </div>

                {/* Panel Capacity */}
                <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-lg">
                  <div className="bg-amber-100 p-2 rounded-full text-amber-600">
                    <Sun size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">سعة الألواح المطلوبة</p>
                    <p className="text-xl font-bold text-gray-800">
                      {(state.results.recommendedPanelCapacity / 1000).toFixed(1)} <span className="text-sm font-normal text-gray-500">كيلوواط</span>
                    </p>
                  </div>
                </div>

                {/* Inverter Size */}
                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                  <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                    <Zap size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">حجم الانفرتر (المحول)</p>
                    <p className="text-xl font-bold text-gray-800">
                      {(state.results.inverterSize / 1000).toFixed(1)} <span className="text-sm font-normal text-gray-500">كيلوواط</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      الحمل الأقصى: {(state.results.peakPowerLoad / 1000).toFixed(1)} كيلوواط
                    </p>
                  </div>
                </div>

                {/* Battery Capacity */}
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <Battery size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">سعة البطاريات المطلوبة</p>
                    <p className="text-xl font-bold text-gray-800">
                      {(state.results.recommendedBatteryCapacity / 1000).toFixed(1)} <span className="text-sm font-normal text-gray-500">كيلوواط.ساعة</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">لضمان تشغيل يوم كامل بدون شمس</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg transition-colors font-medium">
                    <Save size={18} />
                    <span>حفظ كملف PDF (قريباً)</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Global Toaster for notifications */}
      <Toaster position="bottom-left" />
    </div>
  );
}
