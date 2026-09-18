import React, { useState, useReducer, useEffect } from 'react';
import {
  FACILITY_TYPES,
  DEFAULT_DEVICES,
  calculateDailyConsumption,
  calculateRequiredSolarPanels,
  calculateRequiredBatteries,
  calculateInverterSize
} from '../../models/SolarCalculatorModel';
import { Plus, Trash2, Calculator, Settings, Battery, Sun, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

// Initial state for the reducer
const initialState = {
  selectedFacility: '',
  devices: [],
  results: {
    dailyConsumptionWh: 0,
    requiredPanels: 0,
    requiredBatteries: 0,
    inverterSize: 0
  }
};

// Reducer for state management
function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const newDevices = DEFAULT_DEVICES[action.payload]
        ? DEFAULT_DEVICES[action.payload].map(d => ({ ...d }))
        : [];
      return {
        ...state,
        selectedFacility: action.payload,
        devices: newDevices
      };
    }
    case 'ADD_DEVICE':
      return {
        ...state,
        devices: [...state.devices, action.payload]
      };
    case 'UPDATE_DEVICE':
      return {
        ...state,
        devices: state.devices.map(device =>
          device.id === action.payload.id ? { ...device, ...action.payload.updates } : device
        )
      };
    case 'REMOVE_DEVICE':
      return {
        ...state,
        devices: state.devices.filter(device => device.id !== action.payload)
      };
    case 'UPDATE_RESULTS':
      return {
        ...state,
        results: action.payload
      };
    default:
      return state;
  }
}

// Generate unique ID outside component to keep reducer pure
const generateId = () => `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  // New device form state
  const [newDeviceName, setNewDeviceName] = useState('');
  const [newDevicePower, setNewDevicePower] = useState('');
  const [newDeviceQuantity, setNewDeviceQuantity] = useState('');
  const [newDeviceHours, setNewDeviceHours] = useState('');

  // Calculate results whenever devices change
  useEffect(() => {
    const dailyConsumptionWh = calculateDailyConsumption(state.devices);
    const requiredPanels = calculateRequiredSolarPanels(dailyConsumptionWh);
    const requiredBatteries = calculateRequiredBatteries(dailyConsumptionWh);
    const inverterSize = calculateInverterSize(state.devices);

    dispatch({
      type: 'UPDATE_RESULTS',
      payload: {
        dailyConsumptionWh,
        requiredPanels,
        requiredBatteries,
        inverterSize
      }
    });
  }, [state.devices]);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SET_FACILITY', payload: e.target.value });
    if (e.target.value) {
      toast.success('تم تحميل الأجهزة الافتراضية للمنشأة', { position: 'bottom-center' });
    }
  };

  const handleDeviceUpdate = (id, field, value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      dispatch({
        type: 'UPDATE_DEVICE',
        payload: { id, updates: { [field]: numValue } }
      });
    }
  };

  const handleAddDevice = (e) => {
    e.preventDefault();
    if (!newDeviceName || !newDevicePower || !newDeviceQuantity || !newDeviceHours) {
      toast.error('الرجاء إدخال جميع بيانات الجهاز', { position: 'bottom-center' });
      return;
    }

    const device = {
      id: generateId(),
      name: newDeviceName,
      power: parseFloat(newDevicePower),
      quantity: parseFloat(newDeviceQuantity),
      hours: parseFloat(newDeviceHours)
    };

    dispatch({ type: 'ADD_DEVICE', payload: device });

    // Reset form
    setNewDeviceName('');
    setNewDevicePower('');
    setNewDeviceQuantity('');
    setNewDeviceHours('');

    toast.success('تم إضافة الجهاز بنجاح', { position: 'bottom-center' });
  };

  const handleRemoveDevice = (id) => {
    dispatch({ type: 'REMOVE_DEVICE', payload: id });
    toast.success('تم حذف الجهاز', { position: 'bottom-center' });
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
            <Calculator className="w-8 h-8 text-blue-600" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع المنشأة والأجهزة المستخدمة
          </p>
        </div>

        {/* Facility Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <label htmlFor="facility" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            اختر نوع المنشأة
          </label>
          <select
            id="facility"
            value={state.selectedFacility}
            onChange={handleFacilityChange}
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
          >
            <option value="">-- اختر نوع المنشأة --</option>
            {FACILITY_TYPES.map(facility => (
              <option key={facility.id} value={facility.id}>
                {facility.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Devices List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-500" />
                الأجهزة الكهربائية
              </h2>

              {state.devices.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  لا توجد أجهزة مضافة. الرجاء اختيار منشأة أو إضافة أجهزة يدوياً.
                </div>
              ) : (
                <div className="space-y-4">
                  {state.devices.map((device) => (
                    <div key={device.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-750/50 border border-gray-100 dark:border-gray-700 items-start sm:items-center">
                      <div className="flex-1 font-medium text-gray-900 dark:text-white min-w-[120px]">
                        {device.name}
                      </div>
                      <div className="grid grid-cols-3 gap-2 flex-1 w-full sm:w-auto">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">القدرة (واط)</label>
                          <input
                            type="number"
                            value={device.power}
                            onChange={(e) => handleDeviceUpdate(device.id, 'power', e.target.value)}
                            className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">العدد</label>
                          <input
                            type="number"
                            value={device.quantity}
                            onChange={(e) => handleDeviceUpdate(device.id, 'quantity', e.target.value)}
                            className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2"
                            min="1"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">ساعات العمل</label>
                          <input
                            type="number"
                            value={device.hours}
                            onChange={(e) => handleDeviceUpdate(device.id, 'hours', e.target.value)}
                            className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2"
                            min="0"
                            max="24"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveDevice(device.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors mt-4 sm:mt-0"
                        title="حذف الجهاز"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add New Device Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">إضافة جهاز جديد</h3>
              <form onSubmit={handleAddDevice} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">اسم الجهاز</label>
                  <input
                    type="text"
                    value={newDeviceName}
                    onChange={(e) => setNewDeviceName(e.target.value)}
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2"
                    placeholder="مثال: تلفزيون"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">القدرة (واط)</label>
                  <input
                    type="number"
                    value={newDevicePower}
                    onChange={(e) => setNewDevicePower(e.target.value)}
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2"
                    placeholder="100"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">العدد</label>
                  <input
                    type="number"
                    value={newDeviceQuantity}
                    onChange={(e) => setNewDeviceQuantity(e.target.value)}
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2"
                    placeholder="1"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">ساعات العمل</label>
                  <input
                    type="number"
                    value={newDeviceHours}
                    onChange={(e) => setNewDeviceHours(e.target.value)}
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2"
                    placeholder="24"
                    min="0"
                    max="24"
                  />
                </div>
                <div className="md:col-span-5 flex justify-end mt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Results Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 border-b dark:border-gray-700 pb-4">
                النتائج التقديرية
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">الاستهلاك اليومي</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {(state.results.dailyConsumptionWh / 1000).toFixed(2)} <span className="text-sm font-normal text-gray-500">كيلو واط/ساعة</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg text-yellow-600 dark:text-yellow-400">
                    <Sun className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">الألواح الشمسية المطلوبة</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {state.results.requiredPanels} <span className="text-sm font-normal text-gray-500">لوح (500W)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-green-600 dark:text-green-400">
                    <Battery className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">البطاريات المطلوبة</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {state.results.requiredBatteries} <span className="text-sm font-normal text-gray-500">بطارية (48V 200Ah)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg text-purple-600 dark:text-purple-400">
                    <Settings className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">حجم الإنفرتر المقترح</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {(state.results.inverterSize / 1000).toFixed(1)} <span className="text-sm font-normal text-gray-500">كيلو واط</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    * هذه الحسابات تقديرية وتفترض كفاءة نظام بنسبة 80٪ و 5.5 ساعات ذروة شمسية يومياً. قد تختلف المتطلبات الفعلية بناءً على الموقع الجغرافي وجودة المكونات.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
