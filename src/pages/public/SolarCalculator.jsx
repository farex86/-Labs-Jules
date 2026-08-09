import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Settings, Plus, Trash2, Zap, Battery, Sun, Server, Home } from 'lucide-react';
import { FACILITY_TYPES, FACILITY_TYPICAL_DEVICES, calculateSystemRequirements } from '../../models/SolarCalculatorModel';
import toast, { Toaster } from 'react-hot-toast';

const initialState = {
  selectedFacility: '',
  devices: [],
  results: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const typicalDevices = FACILITY_TYPICAL_DEVICES[action.payload] || [];
      // Deep copy to allow editing without mutating the model
      const initialDevices = JSON.parse(JSON.stringify(typicalDevices)).map(d => ({ ...d, uniqueId: crypto.randomUUID() }));
      return {
        ...state,
        selectedFacility: action.payload,
        devices: initialDevices,
        results: null
      };
    }
    case 'UPDATE_DEVICE': {
      return {
        ...state,
        devices: state.devices.map(dev =>
          dev.uniqueId === action.payload.uniqueId ? { ...dev, [action.payload.field]: action.payload.value } : dev
        )
      };
    }
    case 'ADD_DEVICE': {
      return {
        ...state,
        devices: [...state.devices, {
          uniqueId: crypto.randomUUID(),
          id: 'custom',
          name: 'جهاز جديد',
          quantity: 1,
          power_watts: 100,
          hours_per_day: 4
        }]
      };
    }
    case 'REMOVE_DEVICE': {
      return {
        ...state,
        devices: state.devices.filter(dev => dev.uniqueId !== action.payload)
      };
    }
    case 'CALCULATE': {
      return {
        ...state,
        results: calculateSystemRequirements(state.devices)
      };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCalculate = () => {
    if (state.devices.length === 0) {
      toast.error('الرجاء إضافة أجهزة أولاً');
      return;
    }
    dispatch({ type: 'CALCULATE' });
    toast.success('تم الحساب بنجاح!');

    // Scroll to results
    setTimeout(() => {
      document.getElementById('calculator-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <Toaster position="top-center" />
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4"
          >
            <Sun className="h-10 w-10 text-blue-600" />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك وأجهزتك
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Controls Section */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Selection */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <Home className="h-6 w-6 text-blue-500" />
                <h2 className="text-xl font-bold text-gray-800">نوع المنشأة</h2>
              </div>
              <select
                value={state.selectedFacility}
                onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="" disabled>اختر نوع المنشأة...</option>
                {FACILITY_TYPES.map(facility => (
                  <option key={facility.id} value={facility.id}>{facility.name}</option>
                ))}
              </select>
            </motion.div>

            {/* Devices List */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Settings className="h-6 w-6 text-blue-500" />
                  <h2 className="text-xl font-bold text-gray-800">الأجهزة الكهربائية</h2>
                </div>
                <button
                  onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                  className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Plus className="h-5 w-5 ml-2" />
                  إضافة جهاز
                </button>
              </div>

              {state.devices.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500">الرجاء اختيار نوع المنشأة أو إضافة أجهزة يدوياً</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Table Header */}
                  <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-sm font-semibold text-gray-500 bg-gray-50 rounded-lg">
                    <div className="col-span-4">اسم الجهاز</div>
                    <div className="col-span-2">الكمية</div>
                    <div className="col-span-2">الاستهلاك (واط)</div>
                    <div className="col-span-3">ساعات العمل/يوم</div>
                    <div className="col-span-1 text-center">حذف</div>
                  </div>

                  {/* Device Rows */}
                  {state.devices.map((device, index) => (
                    <motion.div
                      key={device.uniqueId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div className="col-span-4">
                        <label className="md:hidden text-xs text-gray-500 mb-1 block">اسم الجهاز</label>
                        <input
                          type="text"
                          value={device.name}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { uniqueId: device.uniqueId, field: 'name', value: e.target.value } })}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="md:hidden text-xs text-gray-500 mb-1 block">الكمية</label>
                        <input
                          type="number"
                          min="1"
                          value={device.quantity}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { uniqueId: device.uniqueId, field: 'quantity', value: e.target.value } })}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="md:hidden text-xs text-gray-500 mb-1 block">الاستهلاك (واط)</label>
                        <input
                          type="number"
                          min="0"
                          value={device.power_watts}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { uniqueId: device.uniqueId, field: 'power_watts', value: e.target.value } })}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div className="col-span-3">
                        <label className="md:hidden text-xs text-gray-500 mb-1 block">ساعات العمل/يوم</label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={device.hours_per_day}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { uniqueId: device.uniqueId, field: 'hours_per_day', value: e.target.value } })}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div className="col-span-1 flex justify-center mt-2 md:mt-0">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.uniqueId })}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="حذف الجهاز"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden sticky top-8"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
                <h3 className="text-2xl font-bold">النتائج المقدرة</h3>
                <p className="text-blue-100 mt-2 text-sm">بناءً على الأجهزة المدخلة</p>
              </div>

              <div className="p-6 space-y-6">
                <button
                  onClick={handleCalculate}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 flex justify-center items-center space-x-2 space-x-reverse"
                >
                  <Zap className="h-5 w-5" />
                  <span>احسب الاحتياج</span>
                </button>

                {state.results && (
                  <motion.div
                    id="calculator-results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 pt-4 border-t border-gray-100"
                  >
                    <ResultCard
                      icon={<Server className="h-6 w-6 text-purple-500" />}
                      title="الإنفرتر المطلوب"
                      value={`${state.results.recommendedInverterKva} KVA`}
                      desc="لتحمل أقصى سحب تشغيلي"
                    />
                    <ResultCard
                      icon={<Sun className="h-6 w-6 text-yellow-500" />}
                      title="الألواح الشمسية"
                      value={`${state.results.recommendedPanelsCount} لوح`}
                      desc={`افتراض قوة اللوح ${state.results.assumptions.panelWattage} واط`}
                    />
                    <ResultCard
                      icon={<Battery className="h-6 w-6 text-green-500" />}
                      title="البطاريات"
                      value={`${state.results.recommendedBatteriesCount} بطارية`}
                      desc={`افتراض ${state.results.assumptions.batteryVoltage}V ${state.results.assumptions.batteryAh}Ah`}
                    />

                    <div className="mt-6 p-4 bg-gray-50 rounded-xl text-sm text-gray-600 space-y-2">
                      <div className="flex justify-between">
                        <span>إجمالي الاستهلاك اليومي:</span>
                        <span className="font-bold text-gray-900">{state.results.totalDailyEnergyKwh} kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span>أقصى سحب متزامن:</span>
                        <span className="font-bold text-gray-900">{state.results.maxConcurrentPowerKw} kW</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}

function ResultCard({ icon, title, value, desc }) {
  return (
    <div className="flex items-start p-4 bg-gray-50 rounded-xl border border-gray-100">
      <div className="p-3 bg-white rounded-lg shadow-sm mr-4 ml-4 flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{desc}</p>
      </div>
    </div>
  );
}
