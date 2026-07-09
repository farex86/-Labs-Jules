import React, { useReducer, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Trash2, Plus, Calculator, Zap, Battery, Sun, Plug } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

import { FACILITY_TYPES } from '../../config/solarConfig';
import { calculateSystemRequirements } from '../../utils/solarCalculations';

// --- REDUCER SETUP ---
const initialState = {
  facilityId: '',
  devices: [],
  results: {
    totalConsumptionWh: 0,
    inverterCapacityW: 0,
    batteryCapacityAh: 0,
    panelCapacityW: 0
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FACILITY': {
      const selectedFacility = FACILITY_TYPES.find(f => f.id === action.payload);
      // Deep copy default devices to prevent mutating config
      const devices = selectedFacility ? JSON.parse(JSON.stringify(selectedFacility.defaultDevices)) : [];
      return {
        ...state,
        facilityId: action.payload,
        devices,
        results: calculateSystemRequirements(devices)
      };
    }
    case 'ADD_DEVICE': {
      const newDevice = {
        id: Date.now().toString(),
        name: 'جهاز جديد',
        power: 100,
        qty: 1,
        hours: 1
      };
      const devices = [...state.devices, newDevice];
      return { ...state, devices, results: calculateSystemRequirements(devices) };
    }
    case 'UPDATE_DEVICE': {
      const devices = state.devices.map(d =>
        d.id === action.payload.id ? { ...d, [action.payload.field]: action.payload.value } : d
      );
      return { ...state, devices, results: calculateSystemRequirements(devices) };
    }
    case 'REMOVE_DEVICE': {
      const devices = state.devices.filter(d => d.id !== action.payload);
      return { ...state, devices, results: calculateSystemRequirements(devices) };
    }
    case 'RECALCULATE': {
      return { ...state, results: calculateSystemRequirements(state.devices) };
    }
    default:
      return state;
  }
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a28bfe', '#fd79a8', '#ffeaa7', '#55efc4'];

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Optionally alert when results change, but keep it quiet for minor edits
  }, [state.results]);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SET_FACILITY', payload: e.target.value });
    toast.success('تم تحديث نمط الاستهلاك بنجاح', {
      position: 'bottom-right'
    });
  };

  const handleDeviceChange = (id, field, value) => {
    dispatch({ type: 'UPDATE_DEVICE', payload: { id, field, value } });
  };

  const addDevice = () => {
    dispatch({ type: 'ADD_DEVICE' });
    toast.success('تمت إضافة جهاز جديد', { position: 'bottom-right' });
  };

  const removeDevice = (id) => {
    dispatch({ type: 'REMOVE_DEVICE', payload: id });
    toast.success('تم حذف الجهاز', { position: 'bottom-right', icon: '🗑️' });
  };

  // Prepare data for chart (Daily Consumption per device)
  const chartData = state.devices.map(device => ({
    name: device.name,
    value: Number(device.power) * Number(device.qty) * Number(device.hours)
  })).filter(d => d.value > 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8" dir="rtl">
      <Toaster />
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <Sun className="text-yellow-500" size={32} />
            الحاسبة الشمسية
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نمط استهلاكك
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column: Inputs & Devices */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Selector */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اختر نمط الاستهلاك (المنشأة)
              </label>
              <select
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                value={state.facilityId}
                onChange={handleFacilityChange}
              >
                <option value="" disabled>-- اختر المنشأة --</option>
                {FACILITY_TYPES.map(facility => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Devices List */}
            {state.facilityId && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">الأجهزة والأحمال</h2>
                  <button
                    onClick={addDevice}
                    className="flex items-center gap-1 text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md transition-colors"
                  >
                    <Plus size={16} /> إضافة جهاز
                  </button>
                </div>

                <div className="space-y-4">
                  <AnimatePresence>
                    {state.devices.map((device) => (
                      <motion.div
                        key={device.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-wrap md:flex-nowrap items-end gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                      >
                        <div className="w-full md:w-auto flex-1">
                          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">اسم الجهاز</label>
                          <input
                            type="text"
                            value={device.name}
                            onChange={(e) => handleDeviceChange(device.id, 'name', e.target.value)}
                            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm p-2 focus:ring-blue-500 dark:text-white"
                          />
                        </div>
                        <div className="w-full md:w-24">
                          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">القدرة (واط)</label>
                          <input
                            type="number"
                            min="0"
                            value={device.power}
                            onChange={(e) => handleDeviceChange(device.id, 'power', e.target.value)}
                            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm p-2 focus:ring-blue-500 dark:text-white"
                          />
                        </div>
                        <div className="w-full md:w-20">
                          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">العدد</label>
                          <input
                            type="number"
                            min="1"
                            value={device.qty}
                            onChange={(e) => handleDeviceChange(device.id, 'qty', e.target.value)}
                            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm p-2 focus:ring-blue-500 dark:text-white"
                          />
                        </div>
                        <div className="w-full md:w-24">
                          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">ساعات العمل</label>
                          <input
                            type="number"
                            min="0" max="24"
                            value={device.hours}
                            onChange={(e) => handleDeviceChange(device.id, 'hours', e.target.value)}
                            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm p-2 focus:ring-blue-500 dark:text-white"
                          />
                        </div>
                        <div className="w-full md:w-auto flex justify-end">
                          <button
                            onClick={() => removeDevice(device.id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
                            title="حذف"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {state.devices.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      لا توجد أجهزة مضافة. اضغط على "إضافة جهاز" للبدء.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Results & Chart */}
          <div className="lg:col-span-1 space-y-6">

            {/* Results Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-blue-100 dark:border-blue-900 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/20 rounded-bl-full -z-10"></div>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Calculator className="text-blue-500" />
                النتائج
              </h2>

              <div className="space-y-4">
                <ResultRow
                  icon={<Zap size={20} className="text-yellow-500" />}
                  label="الاستهلاك اليومي"
                  value={state.results.totalConsumptionWh}
                  unit="واط-ساعة"
                  format={(v) => (v/1000).toFixed(2)}
                  unitAlt="كيلوواط-ساعة"
                />

                <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>

                <ResultRow
                  icon={<Plug size={20} className="text-green-500" />}
                  label="سعة الإنفرتر المطلوبة"
                  value={state.results.inverterCapacityW}
                  unit="واط"
                  format={(v) => (v/1000).toFixed(1)}
                  unitAlt="كيلوواط"
                />

                <ResultRow
                  icon={<Battery size={20} className="text-blue-500" />}
                  label="سعة البطاريات (48V)"
                  value={state.results.batteryCapacityAh}
                  unit="أمبير-ساعة"
                  format={(v) => v.toFixed(0)}
                />

                <ResultRow
                  icon={<Sun size={20} className="text-orange-500" />}
                  label="قدرة الألواح المطلوبة"
                  value={state.results.panelCapacityW}
                  unit="واط"
                  format={(v) => (v/1000).toFixed(1)}
                  unitAlt="كيلوواط"
                />
              </div>
            </div>

            {/* Chart */}
            {chartData.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">توزيع الاستهلاك</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${(value/1000).toFixed(2)} kWh`, 'الاستهلاك']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for result rows
function ResultRow({ icon, label, value, unit, format, unitAlt }) {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      </div>
      <div className="text-left" dir="ltr">
        {unitAlt ? (
          <div className="flex flex-col items-end">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {format ? format(value) : value} {unitAlt}
            </span>
            {value > 0 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({value.toFixed(0)} {unit})
              </span>
            )}
          </div>
        ) : (
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {format ? format(value) : value} {unit}
          </span>
        )}
      </div>
    </div>
  );
}
