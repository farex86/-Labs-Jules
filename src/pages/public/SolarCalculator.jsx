import React, { useReducer, useEffect } from 'react';

import { motion } from 'motion/react';

import { Settings, Calculator, Sun, Battery, Zap, Plus, Trash2, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FACILITY_TYPES, calculateSolarRequirements } from '../../models/SolarCalculatorModel';

// --- State Management ---
const initialState = {
  selectedFacilityId: '',
  appliances: [],
  results: {
    totalDailyEnergyKWh: '0.00',
    peakPowerKW: '0.00',
    recommendedInverterKW: '0.00',
    solarArrayKW: '0.00',
    batteryBankKWh: '0.00'
  }
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      if (!facility) return state;
      // Deep copy appliances to avoid mutating constant model
      const newAppliances = facility.appliances.map(app => ({ ...app, uid: crypto.randomUUID() }));
      return {
        ...state,
        selectedFacilityId: action.payload,
        appliances: newAppliances
      };
    }
    case 'UPDATE_APPLIANCE': {
      const { uid, field, value } = action.payload;
      const updatedAppliances = state.appliances.map(app =>
        app.uid === uid ? { ...app, [field]: value } : app
      );
      return { ...state, appliances: updatedAppliances };
    }
    case 'ADD_APPLIANCE': {
      return {
        ...state,
        appliances: [
          ...state.appliances,
          { uid: crypto.randomUUID(), name: 'جهاز جديد', powerWatts: 100, quantity: 1, hoursPerDay: 4 }
        ]
      };
    }
    case 'REMOVE_APPLIANCE': {
      return {
        ...state,
        appliances: state.appliances.filter(app => app.uid !== action.payload)
      };
    }
    case 'UPDATE_RESULTS': {
      return {
        ...state,
        results: action.payload
      };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  // Derive results when appliances change
  useEffect(() => {
    const results = calculateSolarRequirements(state.appliances);
    dispatch({ type: 'UPDATE_RESULTS', payload: results });
  }, [state.appliances]);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SET_FACILITY', payload: e.target.value });
  };

  const handleApplianceChange = (uid, field, value) => {
    dispatch({ type: 'UPDATE_APPLIANCE', payload: { uid, field, value } });
  };

  const handleAddAppliance = () => {
    dispatch({ type: 'ADD_APPLIANCE' });
  };

  const handleRemoveAppliance = (uid) => {
    dispatch({ type: 'REMOVE_APPLIANCE', payload: uid });
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sun className="w-8 h-8 text-yellow-500" />
            <h1 className="text-2xl font-bold text-gray-900">حاسبة الطاقة الشمسية</h1>
          </div>
          <Link to="/" className="text-gray-500 hover:text-emerald-600 transition-colors flex items-center gap-2">
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline">الرئيسية</span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Configuration (2/3 width on LG) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <Settings className="w-6 h-6 text-emerald-600" />
                </div>
                <h2 className="text-xl font-semibold">اختر نوع المنشأة</h2>
              </div>
              <p className="text-gray-500 mb-4 text-sm">
                اختر نوع المنشأة الخاصة بك لتعبئة الأجهزة الشائعة تلقائياً، يمكنك تعديلها لاحقاً.
              </p>
              <select
                value={state.selectedFacilityId}
                onChange={handleFacilityChange}
                className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              >
                <option value="" disabled>-- اختر المنشأة --</option>
                {FACILITY_TYPES.map(facility => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Appliances List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold">الأحمال والأجهزة</h2>
                </div>
                <button
                  onClick={handleAddAppliance}
                  className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  إضافة جهاز
                </button>
              </div>

              {state.appliances.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <Settings className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">يرجى اختيار منشأة أو إضافة أجهزة يدوياً للبدء في الحساب.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.appliances.map((app, index) => (
                    <motion.div
                      key={app.uid}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 bg-gray-50 rounded-lg border border-gray-100"
                    >
                      <div className="md:col-span-4">
                        <label className="block text-xs text-gray-500 mb-1">اسم الجهاز</label>
                        <input
                          type="text"
                          value={app.name}
                          onChange={(e) => handleApplianceChange(app.uid, 'name', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-500 mb-1">القدرة (واط)</label>
                        <input
                          type="number"
                          min="0"
                          value={app.powerWatts}
                          onChange={(e) => handleApplianceChange(app.uid, 'powerWatts', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-500 mb-1">العدد</label>
                        <input
                          type="number"
                          min="1"
                          value={app.quantity}
                          onChange={(e) => handleApplianceChange(app.uid, 'quantity', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-xs text-gray-500 mb-1">ساعات العمل/يوم</label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={app.hoursPerDay}
                          onChange={(e) => handleApplianceChange(app.uid, 'hoursPerDay', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm"
                        />
                      </div>
                      <div className="md:col-span-1 flex justify-end md:justify-center mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-200">
                        <button
                          onClick={() => handleRemoveAppliance(app.uid)}
                          className="text-red-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
                          title="حذف الجهاز"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Results (1/3 width on LG) */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900 text-white rounded-xl shadow-xl p-6 sticky top-24"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-emerald-500 p-2 rounded-lg bg-opacity-20">
                  <Calculator className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-xl font-bold">النتائج التقديرية</h2>
              </div>

              <div className="space-y-6">

                {/* Solar Array */}
                <div className="border-b border-gray-800 pb-4">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Sun className="w-4 h-4" />
                    <span className="text-sm">حجم الألواح الشمسية المقترح</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-yellow-400">{state.results.solarArrayKW}</span>
                    <span className="text-gray-500">كيلو واط (kW)</span>
                  </div>
                </div>

                {/* Inverter */}
                <div className="border-b border-gray-800 pb-4">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm">حجم المحول (Inverter) المقترح</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">{state.results.recommendedInverterKW}</span>
                    <span className="text-gray-500">كيلو واط (kW)</span>
                  </div>
                </div>

                {/* Battery */}
                <div className="border-b border-gray-800 pb-4">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Battery className="w-4 h-4" />
                    <span className="text-sm">سعة البطاريات المطلوبة (تقريبي)</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">{state.results.batteryBankKWh}</span>
                    <span className="text-gray-500">كيلو واط ساعة (kWh)</span>
                  </div>
                </div>

                {/* Daily Consumption */}
                <div>
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">الاستهلاك اليومي الكلي</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-300">{state.results.totalDailyEnergyKWh}</span>
                    <span className="text-gray-500">kWh/يوم</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-800">
                <p className="text-xs text-gray-500 leading-relaxed text-center">
                  * هذه الحسابات تقديرية وتفترض 5 ساعات شمس ذروة يومياً وكفاءة نظام 80%. يرجى استشارة مهندس مختص للحصول على تصميم دقيق.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </main>
    </div>
  );
}
