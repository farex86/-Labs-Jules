import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Plus, Trash2, Zap, Sun, Battery, Activity } from 'lucide-react';
import { facilityTypes, defaultDevicesMapping, calculateSystemRequirements } from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacility: '',
  devices: [],
  results: {
    totalDailyEnergy: 0,
    peakPower: 0,
    inverterSize: 0,
    panelsCount: 0,
    batteryCount: 0
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facility = action.payload;
      const defaultDevices = defaultDevicesMapping[facility] || [];
      // Deep copy to prevent mutating the constant array
      const devicesCopy = defaultDevices.map(d => ({ ...d }));
      return {
        ...state,
        selectedFacility: facility,
        devices: devicesCopy,
        results: calculateSystemRequirements(devicesCopy)
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
      return {
        ...state,
        devices: updatedDevices,
        results: calculateSystemRequirements(updatedDevices)
      };
    }
    case 'ADD_DEVICE': {
      const newDevice = {
        id: Date.now().toString(),
        name: 'جهاز جديد',
        power: 100,
        quantity: 1,
        hours: 1
      };
      const updatedDevices = [...state.devices, newDevice];
      return {
        ...state,
        devices: updatedDevices,
        results: calculateSystemRequirements(updatedDevices)
      };
    }
    case 'REMOVE_DEVICE': {
      const idToRemove = action.payload;
      const updatedDevices = state.devices.filter(d => d.id !== idToRemove);
      return {
        ...state,
        devices: updatedDevices,
        results: calculateSystemRequirements(updatedDevices)
      };
    }
    default:
      return state;
  }
};

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SET_FACILITY', payload: e.target.value });
  };

  const handleDeviceUpdate = (id, field, value) => {
    dispatch({ type: 'UPDATE_DEVICE', payload: { id, field, value } });
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-2">
            <Sun className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">حاسبة الطاقة الشمسية</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            قم باختيار نوع المنشأة لحساب الاحتياجات التقديرية للنظام الشمسي المناسب، أو قم بإدخال الأجهزة يدوياً.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Input Section */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Selector */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
            >
              <label htmlFor="facility" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                اختر نوع المنشأة
              </label>
              <select
                id="facility"
                value={state.selectedFacility}
                onChange={handleFacilityChange}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white transition-colors"
              >
                <option value="" disabled>-- الرجاء اختيار نوع المنشأة --</option>
                {facilityTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </motion.div>

            {/* Devices List */}
            {state.selectedFacility && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    الأجهزة والاستهلاك
                  </h2>
                  <button
                    onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="space-y-4">
                  {state.devices.map((device, index) => (
                    <motion.div
                      key={device.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800"
                    >
                      <div className="md:col-span-4">
                        <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">اسم الجهاز</label>
                        <input
                          type="text"
                          value={device.name}
                          onChange={(e) => handleDeviceUpdate(device.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-1 focus:ring-primary text-sm"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">القدرة (واط)</label>
                        <input
                          type="number"
                          min="0"
                          value={device.power}
                          onChange={(e) => handleDeviceUpdate(device.id, 'power', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-1 focus:ring-primary text-sm"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">الكمية</label>
                        <input
                          type="number"
                          min="1"
                          value={device.quantity}
                          onChange={(e) => handleDeviceUpdate(device.id, 'quantity', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-1 focus:ring-primary text-sm"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">ساعات العمل/يوم</label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          step="0.5"
                          value={device.hours}
                          onChange={(e) => handleDeviceUpdate(device.id, 'hours', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-1 focus:ring-primary text-sm"
                        />
                      </div>
                      <div className="md:col-span-1 flex justify-end">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                          title="حذف الجهاز"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  {state.devices.length === 0 && (
                    <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                      لا توجد أجهزة مضافة. قم بإضافة أجهزة لحساب الاستهلاك.
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Results Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-primary text-white rounded-2xl shadow-lg p-6 sticky top-6"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-300" />
                متطلبات النظام
              </h3>

              <div className="space-y-6">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-sm text-blue-100 mb-1">الاستهلاك اليومي الكلي</div>
                  <div className="text-3xl font-bold">
                    {(state.results.totalDailyEnergy / 1000).toFixed(2)} <span className="text-lg font-normal opacity-80">كيلو واط/ساعة</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-xs text-blue-100 mb-1">حجم الانفرتر (العاكس)</div>
                    <div className="text-xl font-bold">
                      {Math.ceil(state.results.inverterSize)} <span className="text-sm font-normal opacity-80">واط</span>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-xs text-blue-100 mb-1">الحمل الأقصى</div>
                    <div className="text-xl font-bold">
                      {state.results.peakPower} <span className="text-sm font-normal opacity-80">واط</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-50">
                      <Sun className="w-5 h-5 text-yellow-300" />
                      <span>عدد الألواح (400W)</span>
                    </div>
                    <div className="text-xl font-bold bg-white/20 px-3 py-1 rounded-lg">
                      {state.results.panelsCount}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-50">
                      <Battery className="w-5 h-5 text-green-300" />
                      <span>عدد البطاريات (200Ah 12V)</span>
                    </div>
                    <div className="text-xl font-bold bg-white/20 px-3 py-1 rounded-lg">
                      {state.results.batteryCount}
                    </div>
                  </div>
                </div>

                <div className="pt-4 text-xs text-blue-200/80 text-center">
                  * هذه الحسابات تقديرية وتعتمد على 5 ساعات شمس ذروة في اليوم وعمق تفريغ 50% للبطاريات.
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
