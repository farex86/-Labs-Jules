import React, { useReducer } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Zap, Sun, Battery } from 'lucide-react';
import { facilityTypes, calculateDailyEnergy, calculateSystemSize } from '../../models/SolarCalculatorModel';

const initialState = {
  facilityType: facilityTypes[0],
  appliances: facilityTypes[0].defaultAppliances.map(a => ({ ...a }))
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facility = facilityTypes.find(f => f.id === action.payload);
      return {
        ...state,
        facilityType: facility,
        appliances: facility ? facility.defaultAppliances.map(a => ({ ...a })) : []
      };
    }
    case 'UPDATE_APPLIANCE': {
      const updatedAppliances = state.appliances.map(app =>
        app.id === action.payload.id ? { ...app, [action.payload.field]: action.payload.value } : app
      );
      return { ...state, appliances: updatedAppliances };
    }
    case 'ADD_APPLIANCE': {
      const newAppliance = {
        id: Date.now().toString(),
        name: 'جهاز جديد',
        qty: 1,
        watts: 100,
        hours: 5
      };
      return { ...state, appliances: [...state.appliances, newAppliance] };
    }
    case 'REMOVE_APPLIANCE': {
      return {
        ...state,
        appliances: state.appliances.filter(app => app.id !== action.payload)
      };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dailyEnergyWh = calculateDailyEnergy(state.appliances);
  const systemSizeKW = calculateSystemSize(dailyEnergyWh);
  const panelsRequired = Math.ceil((systemSizeKW * 1000) / 550); // Assuming 550W panels

  // Disable linting for unused `motion` import if false positive happens
  // eslint-disable-next-line no-unused-vars
  const MotionDiv = motion.div;

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
            <Sun className="h-8 w-8 text-yellow-500" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="text-gray-500 dark:text-gray-400">احسب حجم النظام الشمسي المناسب لمنشأتك بناءً على استهلاكك</p>
        </div>

        {/* Facility Selector */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <label htmlFor="facility" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            نوع المنشأة / نمط الاستهلاك
          </label>
          <select
            id="facility"
            value={state.facilityType.id}
            onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
            className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-lg p-3"
          >
            {facilityTypes.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>

        {/* Appliances List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">الأجهزة الكهربائية</h2>
            <button
              onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
              className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 bg-green-50 dark:bg-green-900/30 px-3 py-1.5 rounded-md transition-colors"
            >
              <Plus className="h-4 w-4" />
              إضافة جهاز
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-900 dark:text-gray-300">اسم الجهاز</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-900 dark:text-gray-300">العدد</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-900 dark:text-gray-300">الاستهلاك (واط)</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-900 dark:text-gray-300">ساعات التشغيل</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-900 dark:text-gray-300 w-16">إزالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {state.appliances.map((app) => (
                  <tr key={app.id}>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={app.name}
                        onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'name', value: e.target.value } })}
                        className="w-full bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-0 p-1 dark:text-white"
                        placeholder="اسم الجهاز"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="1"
                        value={app.qty}
                        onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'qty', value: Number(e.target.value) } })}
                        className="w-20 bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-0 p-1 dark:text-white text-center"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="0"
                        value={app.watts}
                        onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'watts', value: Number(e.target.value) } })}
                        className="w-24 bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-0 p-1 dark:text-white text-center"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={app.hours}
                        onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'hours', value: Number(e.target.value) } })}
                        className="w-20 bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-0 p-1 dark:text-white text-center"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                        title="إزالة"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {state.appliances.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      لا توجد أجهزة مضافة. انقر على "إضافة جهاز" للبدء.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results / Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={dailyEnergyWh} // Re-animate when energy changes
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white flex flex-col items-center text-center">
            <Zap className="h-8 w-8 mb-2 opacity-80" />
            <div className="text-sm font-medium opacity-90 mb-1">الاستهلاك اليومي</div>
            <div className="text-3xl font-bold">{(dailyEnergyWh / 1000).toFixed(1)} <span className="text-lg font-normal">ك.و.س</span></div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white flex flex-col items-center text-center">
            <Sun className="h-8 w-8 mb-2 opacity-80" />
            <div className="text-sm font-medium opacity-90 mb-1">حجم النظام المقترح</div>
            <div className="text-3xl font-bold">{systemSizeKW} <span className="text-lg font-normal">كيلوواط</span></div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-md p-6 text-white flex flex-col items-center text-center">
            <Battery className="h-8 w-8 mb-2 opacity-80" />
            <div className="text-sm font-medium opacity-90 mb-1">الألواح المطلوبة تقريباً</div>
            <div className="text-3xl font-bold">{panelsRequired} <span className="text-lg font-normal">لوح</span></div>
            <div className="text-xs opacity-75 mt-1">(بافتراض لوح 550 واط)</div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
