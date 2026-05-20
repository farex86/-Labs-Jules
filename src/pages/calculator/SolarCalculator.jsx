import React, { useReducer } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Plus, Trash2, Calculator, Settings, Sun, Battery, Zap, DollarSign } from 'lucide-react';
import { CONSUMPTION_PATTERNS } from '../../lib/solarConstants';
import SolarCalculatorModel from '../../models/SolarCalculatorModel';

// --- State Management ---
const initialState = {
  selectedPatternId: '',
  devices: [],
  recommendation: null,
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SELECT_PATTERN': {
      const pattern = CONSUMPTION_PATTERNS.find(p => p.id === action.payload);
      if (!pattern) return state;

      const devices = pattern.typicalDevices.map(d => ({
        ...d,
        id: crypto.randomUUID(), // unique ID for list rendering
        quantity: 1, // Default quantity
        powerW: d.defaultPowerW,
        hours: d.defaultHours,
      }));

      return {
        ...state,
        selectedPatternId: pattern.id,
        devices,
        recommendation: null, // Reset recommendation when pattern changes
      };
    }

    case 'ADD_DEVICE': {
      return {
        ...state,
        devices: [...state.devices, action.payload],
        recommendation: null,
      };
    }

    case 'UPDATE_DEVICE': {
      return {
        ...state,
        devices: state.devices.map(device =>
          device.id === action.payload.id ? { ...device, ...action.payload.updates } : device
        ),
        recommendation: null,
      };
    }

    case 'REMOVE_DEVICE': {
      return {
        ...state,
        devices: state.devices.filter(device => device.id !== action.payload),
        recommendation: null,
      };
    }

    case 'CALCULATE': {
      const recommendation = SolarCalculatorModel.generateRecommendation(state.devices);
      return {
        ...state,
        recommendation,
      };
    }

    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handlePatternChange = (e) => {
    const patternId = e.target.value;
    dispatch({ type: 'SELECT_PATTERN', payload: patternId });
    if (patternId) {
      toast.success('تم تحميل الأجهزة الافتراضية للنمط المحدد'); // Loaded default devices for selected pattern
    }
  };

  const handleAddCustomDevice = () => {
    const newDevice = {
      id: crypto.randomUUID(),
      name: 'جهاز جديد', // New device
      nameEn: 'New Device',
      powerW: 100,
      hours: 1,
      quantity: 1,
    };
    dispatch({ type: 'ADD_DEVICE', payload: newDevice });
    toast.success('تمت إضافة جهاز جديد'); // Added new device
  };

  const handleUpdateDevice = (id, field, value) => {
    const numValue = Math.max(0, Number(value));
    dispatch({
      type: 'UPDATE_DEVICE',
      payload: { id, updates: { [field]: numValue } }
    });
  };

  const handleRemoveDevice = (id) => {
    dispatch({ type: 'REMOVE_DEVICE', payload: id });
    toast.error('تمت إزالة الجهاز'); // Device removed
  };

  const handleCalculate = () => {
    if (state.devices.length === 0) {
      toast.error('الرجاء إضافة أجهزة أولاً'); // Please add devices first
      return;
    }
    dispatch({ type: 'CALCULATE' });
    toast.success('تم حساب النظام بنجاح!'); // System calculated successfully
  };

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 text-right" dir="rtl">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Sun className="h-8 w-8 text-yellow-500" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نمط استهلاكك
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column (or Right in RTL) - Inputs */}
        <div className="lg:col-span-2 space-y-6">

          {/* Pattern Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              اختر نمط الاستهلاك (نوع المنشأة)
            </label>
            <select
              value={state.selectedPatternId}
              onChange={handlePatternChange}
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
            >
              <option value="">-- اختر نمطاً --</option>
              {CONSUMPTION_PATTERNS.map((pattern) => (
                <option key={pattern.id} value={pattern.id}>
                  {pattern.name} ({pattern.nameEn})
                </option>
              ))}
            </select>
          </div>

          {/* Devices List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Settings className="h-5 w-5" />
                الأجهزة والأحمال
              </h2>
              <button
                onClick={handleAddCustomDevice}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              >
                <Plus className="h-4 w-4" />
                إضافة جهاز
              </button>
            </div>

            {state.devices.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                يرجى اختيار نمط استهلاك أو إضافة أجهزة يدوياً للبدء
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-4"
              >
                {state.devices.map((device) => (
                  <motion.div
                    key={device.id}
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="md:col-span-3">
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">اسم الجهاز</label>
                      <input
                        type="text"
                        value={device.name}
                        onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, updates: { name: e.target.value } } })}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm text-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">الكمية</label>
                      <input
                        type="number"
                        min="1"
                        value={device.quantity}
                        onChange={(e) => handleUpdateDevice(device.id, 'quantity', e.target.value)}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm text-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">القدرة (واط)</label>
                      <input
                        type="number"
                        min="0"
                        value={device.powerW ?? device.defaultPowerW ?? 0}
                        onChange={(e) => handleUpdateDevice(device.id, 'powerW', e.target.value)}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm text-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">ساعات التشغيل (يومياً)</label>
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={device.hours ?? device.defaultHours ?? 0}
                        onChange={(e) => handleUpdateDevice(device.id, 'hours', e.target.value)}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm text-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="md:col-span-1 flex justify-end mt-4 md:mt-0">
                      <button
                        onClick={() => handleRemoveDevice(device.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        title="إزالة"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={handleCalculate}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg shadow-sm"
              >
                <Calculator className="h-5 w-5" />
                احسب النظام
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (or Left in RTL) - Results */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              النتائج والتوصيات
            </h2>

            {!state.recommendation ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
                <Calculator className="h-8 w-8 mx-auto mb-3 opacity-50" />
                <p>قم بإضافة الأجهزة واضغط على "احسب النظام" لرؤية التوصيات</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <ResultCard
                  icon={<Zap className="h-6 w-6 text-yellow-500" />}
                  label="الاستهلاك اليومي"
                  value={`${state.recommendation.dailyEnergyKwh} كيلوواط/ساعة`}
                />

                <ResultCard
                  icon={<Sun className="h-6 w-6 text-orange-500" />}
                  label="الألواح المطلوبة"
                  value={`${state.recommendation.panelsRequired} لوح`}
                  subtext="بافتراض ألواح 550 واط"
                />

                <ResultCard
                  icon={<Settings className="h-6 w-6 text-blue-500" />}
                  label="حجم المحول (Inverter)"
                  value={`${state.recommendation.inverterSizeKw} كيلوواط`}
                />

                <ResultCard
                  icon={<Battery className="h-6 w-6 text-green-500" />}
                  label="سعة البطاريات"
                  value={`${state.recommendation.batteryBankKwh} كيلوواط/ساعة`}
                />

                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <ResultCard
                    icon={<DollarSign className="h-6 w-6 text-emerald-500" />}
                    label="التكلفة التقديرية (تقريبية)"
                    value={`$${state.recommendation.estimatedCostUsd?.toLocaleString()}`}
                    highlight
                  />
                  <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                    * هذه التكلفة تقديرية وقد تختلف حسب أسعار السوق المحلية وجودة المكونات.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

function ResultCard({ icon, label, value, subtext, highlight }) {
  return (
    <div className={`p-4 rounded-lg flex items-center gap-4 ${highlight ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800' : 'bg-gray-50 dark:bg-gray-700/50'}`}>
      <div className={`p-3 rounded-full ${highlight ? 'bg-white dark:bg-emerald-800' : 'bg-white dark:bg-gray-800 shadow-sm'}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className={`text-lg font-bold ${highlight ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
          {value}
        </p>
        {subtext && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{subtext}</p>}
      </div>
    </div>
  );
}
