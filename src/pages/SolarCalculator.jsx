import React, { useReducer, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  Plus,
  Trash2,
  Sun,
  Battery,
  Zap,
  Activity,
  ChevronDown
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

import { facilityTypes, getTemplateForFacility } from '../models/solarCalculatorConfig';
import { calculateSolarSystem } from '../lib/solarCalculatorLogic';

// Initial state for the reducer
const initialState = {
  facilityType: 'residential',
  appliances: getTemplateForFacility('residential'),
  panelRatingW: 550,
  results: null
};

// Reducer for state management
function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY_TYPE': {
      const newAppliances = getTemplateForFacility(action.payload);
      return {
        ...state,
        facilityType: action.payload,
        appliances: newAppliances.length > 0 ? newAppliances : state.appliances
      };
    }

    case 'ADD_APPLIANCE':
      return {
        ...state,
        appliances: [
          ...state.appliances,
          { id: crypto.randomUUID(), name: '', quantity: 1, wattage: 0, hoursPerDay: 0 }
        ]
      };

    case 'UPDATE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.map(app =>
          app.id === action.payload.id ? { ...app, ...action.payload.updates } : app
        )
      };

    case 'REMOVE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.filter(app => app.id !== action.payload)
      };

    case 'SET_PANEL_RATING':
      return {
        ...state,
        panelRatingW: action.payload
      };

    case 'SET_RESULTS':
      return {
        ...state,
        results: action.payload
      };

    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  // Auto-calculate results whenever relevant state changes
  useEffect(() => {
    const validAppliances = state.appliances.filter(
      app => app.name && app.quantity > 0 && app.wattage > 0 && app.hoursPerDay > 0
    );

    if (validAppliances.length > 0) {
      const results = calculateSolarSystem(validAppliances, state.panelRatingW);
      dispatch({ type: 'SET_RESULTS', payload: results });
    } else {
      dispatch({ type: 'SET_RESULTS', payload: null });
    }
  }, [state.appliances, state.panelRatingW]);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SET_FACILITY_TYPE', payload: e.target.value });
    toast.success('تم تحديث نمط الاستهلاك بنجاح');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4"
          >
            <Sun className="h-8 w-8 text-blue-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl font-extrabold text-gray-900"
          >
            الحاسبة الشمسية
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 max-w-2xl mx-auto text-xl text-gray-500"
          >
            احسب حجم النظام الشمسي المناسب لاحتياجاتك بناءً على الأجهزة ونمط الاستهلاك.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Input Form Section (Left side / Right in RTL) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Configuration Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-gray-500" />
                  إعدادات الاستهلاك
                </h2>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Facility Type Selector */}
                  <div>
                    <label htmlFor="facilityType" className="block text-sm font-medium text-gray-700 mb-1">
                      نمط الاستهلاك (نوع المنشأة)
                    </label>
                    <div className="relative">
                      <select
                        id="facilityType"
                        value={state.facilityType}
                        onChange={handleFacilityChange}
                        className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg border bg-white appearance-none"
                      >
                        {facilityTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-500">
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  {/* Panel Rating Input */}
                  <div>
                    <label htmlFor="panelRating" className="block text-sm font-medium text-gray-700 mb-1">
                      قدرة اللوح الشمسي الواحد (واط)
                    </label>
                    <input
                      type="number"
                      id="panelRating"
                      value={state.panelRatingW}
                      onChange={(e) => dispatch({ type: 'SET_PANEL_RATING', payload: Number(e.target.value) })}
                      className="block w-full px-3 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg border"
                      placeholder="e.g. 550"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Appliances List Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-gray-500" />
                  الأجهزة الكهربائية
                </h2>
                <button
                  onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
                >
                  <Plus className="h-4 w-4 ml-1" />
                  إضافة جهاز
                </button>
              </div>

              <div className="p-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العدد</th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القدرة (واط)</th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات العمل/يوم</th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <AnimatePresence>
                      {state.appliances.map((appliance) => (
                        <motion.tr
                          key={appliance.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          layout
                        >
                          <td className="px-3 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              value={appliance.name}
                              onChange={(e) => dispatch({
                                type: 'UPDATE_APPLIANCE',
                                payload: { id: appliance.id, updates: { name: e.target.value } }
                              })}
                              className="block w-full sm:text-sm border-gray-300 rounded-md border p-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="اسم الجهاز"
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="1"
                              value={appliance.quantity || ''}
                              onChange={(e) => dispatch({
                                type: 'UPDATE_APPLIANCE',
                                payload: { id: appliance.id, updates: { quantity: Number(e.target.value) } }
                              })}
                              className="block w-full sm:text-sm border-gray-300 rounded-md border p-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              value={appliance.wattage || ''}
                              onChange={(e) => dispatch({
                                type: 'UPDATE_APPLIANCE',
                                payload: { id: appliance.id, updates: { wattage: Number(e.target.value) } }
                              })}
                              className="block w-full sm:text-sm border-gray-300 rounded-md border p-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              max="24"
                              value={appliance.hoursPerDay || ''}
                              onChange={(e) => dispatch({
                                type: 'UPDATE_APPLIANCE',
                                payload: { id: appliance.id, updates: { hoursPerDay: Number(e.target.value) } }
                              })}
                              className="block w-full sm:text-sm border-gray-300 rounded-md border p-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-center">
                            <button
                              onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: appliance.id })}
                              className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                              title="حذف الجهاز"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
                {state.appliances.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    لا توجد أجهزة مضافة. قم بإضافة أجهزة للحساب.
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Results Section (Right side / Left in RTL) */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg border border-blue-500 text-white sticky top-8">
              <div className="p-6 border-b border-blue-500/30">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Activity className="h-6 w-6 text-blue-200" />
                  نتيجة الحساب
                </h2>
              </div>

              <div className="p-6">
                {!state.results ? (
                  <div className="text-center py-10 text-blue-100">
                    <p>قم بإدخال الأجهزة وقدراتها لعرض النتيجة.</p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {/* Energy */}
                    <div>
                      <p className="text-blue-200 text-sm font-medium">الاستهلاك اليومي الكلي</p>
                      <p className="text-3xl font-bold mt-1">
                        {state.results.dailyEnergyKWh.toFixed(2)} <span className="text-lg font-normal">كيلو واط/ساعة</span>
                      </p>
                    </div>

                    <div className="w-full h-px bg-blue-500/30" />

                    {/* Solar Panels */}
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Sun className="h-6 w-6 text-yellow-300" />
                      </div>
                      <div>
                        <p className="text-blue-200 text-sm font-medium">الألواح الشمسية المطلوبة</p>
                        <p className="text-xl font-bold mt-1">
                          {state.results.numberOfPanels} <span className="text-sm font-normal">لوح ({state.results.panelRatingW}W)</span>
                        </p>
                        <p className="text-xs text-blue-300 mt-1">
                          إجمالي القدرة: {state.results.requiredSolarArrayKW.toFixed(2)} kW
                        </p>
                      </div>
                    </div>

                    {/* Inverter */}
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Zap className="h-6 w-6 text-green-300" />
                      </div>
                      <div>
                        <p className="text-blue-200 text-sm font-medium">حجم المحول (الإنفرتر) المقترح</p>
                        <p className="text-xl font-bold mt-1">
                          {state.results.recommendedInverterKW.toFixed(2)} <span className="text-sm font-normal">kW</span>
                        </p>
                        <p className="text-xs text-blue-300 mt-1">
                          أقصى حمل متزامن: {state.results.maxPowerDemandKW.toFixed(2)} kW
                        </p>
                      </div>
                    </div>

                    {/* Battery */}
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Battery className="h-6 w-6 text-red-300" />
                      </div>
                      <div>
                        <p className="text-blue-200 text-sm font-medium">سعة البطاريات المطلوبة</p>
                        <p className="text-xl font-bold mt-1">
                          {Math.ceil(state.results.batteryCapacityAh)} <span className="text-sm font-normal">Ah</span>
                        </p>
                        <p className="text-xs text-blue-300 mt-1">
                          جهد النظام: {state.results.systemVoltage}V
                        </p>
                      </div>
                    </div>

                  </motion.div>
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
