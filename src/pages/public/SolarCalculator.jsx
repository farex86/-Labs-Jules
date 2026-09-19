import React, { useReducer } from 'react';
import { motion } from 'motion/react'; // eslint-disable-line no-unused-vars
import { toast, Toaster } from 'react-hot-toast';
import { Factory, Building2, Leaf, ShieldPlus, BriefcaseMedical, Store, Droplets, Zap, Wrench, Church, Coffee, Bed, Landmark, ShoppingCart, Fuel, Gem } from 'lucide-react';
import { FACILITY_TYPES, DEVICE_CATALOG, calculateSolarSystem } from '../../models/SolarCalculatorModel';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const initialState = {
  selectedFacilityId: '',
  devices: [],
  results: {
    dailyEnergyNeededWh: 0,
    totalPowerW: 0,
    recommendedSolarKw: 0,
    batteryCapacityKwh: 0,
    estimatedPanelsCount: 0,
    estimatedBatteriesCount: 0
  }
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      if (!facility) return state;

      const newDevices = facility.defaultDevices.map(d => ({ ...d }));
      return {
        ...state,
        selectedFacilityId: action.payload,
        devices: newDevices,
        results: calculateSolarSystem(newDevices)
      };
    }
    case 'UPDATE_DEVICE': {
      const { index, field, value } = action.payload;
      const newDevices = [...state.devices];
      newDevices[index] = { ...newDevices[index], [field]: Number(value) };
      return {
        ...state,
        devices: newDevices,
        results: calculateSolarSystem(newDevices)
      };
    }
    case 'ADD_DEVICE': {
      const newDevice = { ...DEVICE_CATALOG[0], quantity: 1 };
      const newDevices = [...state.devices, newDevice];
      return {
        ...state,
        devices: newDevices,
        results: calculateSolarSystem(newDevices)
      };
    }
    case 'CHANGE_DEVICE_TYPE': {
      const { index, deviceId } = action.payload;
      const catalogDevice = DEVICE_CATALOG.find(d => d.id === deviceId);
      if (!catalogDevice) return state;

      const newDevices = [...state.devices];
      newDevices[index] = {
        ...catalogDevice,
        quantity: newDevices[index].quantity || 1
      };

      return {
        ...state,
        devices: newDevices,
        results: calculateSolarSystem(newDevices)
      };
    }
    case 'REMOVE_DEVICE': {
      const newDevices = state.devices.filter((_, i) => i !== action.payload);
      return {
        ...state,
        devices: newDevices,
        results: calculateSolarSystem(newDevices)
      };
    }
    case 'CALCULATE': {
       return {
           ...state,
           results: calculateSolarSystem(state.devices)
       }
    }
    default:
      return state;
  }
}

// Simple icon mapper based on keyword
const getIconForFacility = (id) => {
  if (id.includes('factory')) return <Factory className="w-6 h-6" />;
  if (id.includes('farm') || id.includes('greenhouse')) return <Leaf className="w-6 h-6" />;
  if (id.includes('hospital') || id.includes('clinic')) return <BriefcaseMedical className="w-6 h-6" />;
  if (id.includes('shop') || id.includes('bakery') || id.includes('supermarket')) return <ShoppingCart className="w-6 h-6" />;
  if (id.includes('water') || id.includes('donkey')) return <Droplets className="w-6 h-6" />;
  if (id.includes('company') || id.includes('bank')) return <Landmark className="w-6 h-6" />;
  if (id.includes('hotel')) return <Bed className="w-6 h-6" />;
  if (id.includes('coffee') || id.includes('restaurant')) return <Coffee className="w-6 h-6" />;
  if (id.includes('mosque')) return <Church className="w-6 h-6" />;
  if (id.includes('gas')) return <Fuel className="w-6 h-6" />;
  if (id.includes('mining')) return <Gem className="w-6 h-6" />;
  if (id.includes('workshop')) return <Wrench className="w-6 h-6" />;
  return <Building2 className="w-6 h-6" />;
};

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handleFacilitySelect = (id) => {
    dispatch({ type: 'SELECT_FACILITY', payload: id });
    toast.success('تم تحديث الأجهزة بناءً على نوع المنشأة', { position: 'bottom-center' });
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-8 font-sans">
      <Toaster />

      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-4"
          >
            <Zap className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
          </motion.div>
          <h1 className="text-4xl font-bold tracking-tight">حاسبة الطاقة الشمسية</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            احسب احتياجاتك من الطاقة الشمسية بسهولة. اختر نوع المنشأة الخاصة بك لتعبئة الأجهزة الافتراضية، أو قم بإضافة وتعديل الأجهزة يدوياً للحصول على تقدير دقيق لحجم النظام الشمسي المطلوب.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Inputs */}
          <div className="lg:col-span-2 space-y-8">

            {/* Facility Selection */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
            >
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-500" />
                1. اختر نوع المنشأة
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {FACILITY_TYPES.map((facility) => (
                  <button
                    key={facility.id}
                    onClick={() => handleFacilitySelect(facility.id)}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 text-center gap-2",
                      state.selectedFacilityId === facility.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                        : "border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    )}
                  >
                    <div className={state.selectedFacilityId === facility.id ? "text-blue-500" : "text-gray-400"}>
                      {getIconForFacility(facility.id)}
                    </div>
                    <span className="text-sm font-medium">{facility.name}</span>
                  </button>
                ))}
              </div>
            </motion.section>

            {/* Devices List */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  2. الأجهزة الكهربائية (الأحمال)
                </h2>
                <button
                  onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                  className="px-4 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-800/40 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium transition-colors"
                >
                  + إضافة جهاز
                </button>
              </div>

              {state.devices.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  يرجى اختيار نوع المنشأة أو إضافة أجهزة يدوياً للبدء.
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Desktop Header */}
                  <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 dark:text-gray-400 px-4">
                    <div className="col-span-4">الجهاز</div>
                    <div className="col-span-2">الكمية</div>
                    <div className="col-span-2">القدرة (واط)</div>
                    <div className="col-span-2">ساعات التشغيل</div>
                    <div className="col-span-2">إجمالي (واط.س)</div>
                  </div>

                  {/* Device Rows */}
                  {state.devices.map((device, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800"
                    >
                      <div className="md:col-span-4">
                        <label className="md:hidden text-xs text-gray-500 mb-1 block">الجهاز</label>
                        <select
                          value={device.id || ''}
                          onChange={(e) => dispatch({
                            type: 'CHANGE_DEVICE_TYPE',
                            payload: { index, deviceId: e.target.value }
                          })}
                          className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                        >
                          {DEVICE_CATALOG.map(catalogItem => (
                            <option key={catalogItem.id} value={catalogItem.id}>
                              {catalogItem.name}
                            </option>
                          ))}
                          {!DEVICE_CATALOG.find(d => d.id === device.id) && (
                            <option value={device.id}>{device.name}</option>
                          )}
                        </select>
                      </div>

                      <div className="md:col-span-2">
                         <label className="md:hidden text-xs text-gray-500 mb-1 block">الكمية</label>
                        <input
                          type="number"
                          min="1"
                          value={device.quantity || 1}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { index, field: 'quantity', value: e.target.value } })}
                          className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="md:hidden text-xs text-gray-500 mb-1 block">القدرة (واط)</label>
                        <input
                          type="number"
                          min="1"
                          value={device.defaultPower || 0}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { index, field: 'defaultPower', value: e.target.value } })}
                          className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="md:hidden text-xs text-gray-500 mb-1 block">ساعات التشغيل باليوم</label>
                        <input
                          type="number"
                          min="1"
                          max="24"
                          value={device.defaultHours || 1}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { index, field: 'defaultHours', value: e.target.value } })}
                          className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="md:col-span-2 flex justify-between items-center">
                         <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                           {((device.defaultPower || 0) * (device.defaultHours || 0) * (device.quantity || 1)).toLocaleString()} W.h
                         </div>
                         <button
                           onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: index })}
                           className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                           title="إزالة الجهاز"
                         >
                           ×
                         </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.section>

          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-1">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 sticky top-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">
                النتائج التقديرية
              </h2>

              <div className="space-y-6">

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">الاستهلاك اليومي الكلي</div>
                  <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                    {(state.results.dailyEnergyNeededWh / 1000).toFixed(1)} <span className="text-lg font-normal">كيلو واط.ساعة (kWh)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <ResultRow
                    label="حجم النظام الشمسي المقترح"
                    value={`${state.results.recommendedSolarKw} kW`}
                  />
                  <ResultRow
                    label="سعة البطاريات المطلوبة"
                    value={`${state.results.batteryCapacityKwh} kWh`}
                    subtext="لتغطية الاستهلاك ليوم واحد"
                  />
                  <ResultRow
                    label="أقصى حمل متزامن"
                    value={`${(state.results.totalPowerW / 1000).toFixed(1)} kW`}
                    subtext="إذا تم تشغيل كل الأجهزة معاً"
                  />
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-700 space-y-4">
                   <h3 className="font-semibold text-gray-700 dark:text-gray-300">المكونات التقريبية:</h3>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-center">
                       <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{state.results.estimatedPanelsCount}</div>
                       <div className="text-xs text-gray-500">لوح شمسي (500W)</div>
                     </div>
                     <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-center">
                       <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{state.results.estimatedBatteriesCount}</div>
                       <div className="text-xs text-gray-500">بطارية (200Ah 12V)</div>
                     </div>
                   </div>
                   <p className="text-xs text-gray-400 mt-2 text-center">
                     * هذه النتائج هي تقديرات مبدئية ولا تغني عن الاستشارة الهندسية المتخصصة.
                   </p>
                </div>

              </div>
            </motion.section>
          </div>

        </div>
      </div>
    </div>
  );
}

function ResultRow({ label, value, subtext }) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-baseline">
        <span className="text-gray-600 dark:text-gray-400 font-medium">{label}</span>
        <span className="text-xl font-bold text-gray-900 dark:text-white" dir="ltr">{value}</span>
      </div>
      {subtext && <span className="text-xs text-gray-500 mt-1">{subtext}</span>}
    </div>
  );
}
