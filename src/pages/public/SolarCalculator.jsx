import React, { useReducer } from 'react';
import { motion } from 'motion/react';
import { Calculator, Sun, Zap, Battery, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { getFacilities, getFacilityDefaultAppliances, calculateSolarSystem } from '../../models/SolarCalculatorModel';

// State Management using useReducer
const initialState = {
  selectedFacilityId: '',
  appliances: [],
  results: null,
  isCalculating: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FACILITY':
      return {
        ...state,
        selectedFacilityId: action.payload,
        appliances: getFacilityDefaultAppliances(action.payload),
        results: null
      };
    case 'UPDATE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.map((app, index) =>
          index === action.payload.index ? { ...app, [action.payload.field]: Number(action.payload.value) } : app
        ),
        results: null
      };
    case 'ADD_APPLIANCE':
      return {
        ...state,
        appliances: [...state.appliances, { name: 'جهاز جديد', powerW: 100, quantity: 1, hoursPerDay: 5 }],
        results: null
      };
    case 'REMOVE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.filter((_, index) => index !== action.payload),
        results: null
      };
    case 'CALCULATE_START':
      return { ...state, isCalculating: true };
    case 'CALCULATE_SUCCESS':
      return { ...state, isCalculating: false, results: action.payload };
    default:
      return state;
  }
};

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const facilities = getFacilities();

  const handleCalculate = (e) => {
    e.preventDefault();
    dispatch({ type: 'CALCULATE_START' });

    // Simulate slight delay for better UX with animation
    setTimeout(() => {
      const results = calculateSolarSystem(state.appliances);
      dispatch({ type: 'CALCULATE_SUCCESS', payload: results });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mx-auto h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4"
          >
            <Sun className="h-8 w-8 text-yellow-500" />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="text-lg text-gray-600">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك واستهلاكك
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleCalculate}>
              {/* Facility Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اختر نوع المنشأة
                </label>
                <select
                  value={state.selectedFacilityId}
                  onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
                  className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md border"
                >
                  <option value="" disabled>-- اختر من القائمة --</option>
                  {facilities.map(facility => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Appliances List */}
              {state.appliances.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">الأجهزة الكهربائية (متوسط الاستهلاك)</h3>
                    <button
                      type="button"
                      onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
                    >
                      <Plus className="h-4 w-4 ml-1" />
                      إضافة جهاز
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القدرة (واط)</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الكمية</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات العمل/يوم</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراء</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {state.appliances.map((app, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                              {app.name}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <input
                                type="number"
                                min="1"
                                value={app.powerW}
                                onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { index: idx, field: 'powerW', value: e.target.value } })}
                                className="focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                              />
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <input
                                type="number"
                                min="1"
                                value={app.quantity}
                                onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { index: idx, field: 'quantity', value: e.target.value } })}
                                className="focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                              />
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <input
                                type="number"
                                min="1"
                                max="24"
                                value={app.hoursPerDay}
                                onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { index: idx, field: 'hoursPerDay', value: e.target.value } })}
                                className="focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                              />
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                type="button"
                                onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: idx })}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              {state.appliances.length > 0 && (
                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    disabled={state.isCalculating}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    {state.isCalculating ? (
                      <span className="animate-pulse">جاري الحساب...</span>
                    ) : (
                      <>
                        <Calculator className="h-5 w-5 ml-2" />
                        احسب النظام المطلوب
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Results Section */}
          {state.results && !state.isCalculating && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-gray-50 px-8 py-8 border-t border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">النتائج التقديرية للنظام</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Energy Needed */}
                <div className="bg-white rounded-lg shadow p-6 border border-gray-100 flex flex-col items-center text-center">
                  <div className="rounded-full bg-blue-100 p-3 mb-4">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">الاستهلاك اليومي</h4>
                  <div className="text-2xl font-bold text-gray-900">
                    {(state.results.dailyEnergyWh / 1000).toFixed(1)} <span className="text-sm font-normal text-gray-500">كيلو واط/ساعة</span>
                  </div>
                </div>

                {/* Inverter */}
                <div className="bg-white rounded-lg shadow p-6 border border-gray-100 flex flex-col items-center text-center">
                  <div className="rounded-full bg-purple-100 p-3 mb-4">
                    <Calculator className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">حجم الانفرتر المقترح</h4>
                  <div className="text-2xl font-bold text-gray-900">
                    {(state.results.recommendedInverterW / 1000).toFixed(1)} <span className="text-sm font-normal text-gray-500">كيلو واط</span>
                  </div>
                </div>

                {/* Panels */}
                <div className="bg-white rounded-lg shadow p-6 border border-gray-100 flex flex-col items-center text-center">
                  <div className="rounded-full bg-yellow-100 p-3 mb-4">
                    <Sun className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">حجم الألواح المطلوبة</h4>
                  <div className="text-2xl font-bold text-gray-900">
                    {state.results.recommendedPanelsKw} <span className="text-sm font-normal text-gray-500">كيلو واط</span>
                  </div>
                </div>

                {/* Batteries */}
                <div className="bg-white rounded-lg shadow p-6 border border-gray-100 flex flex-col items-center text-center">
                  <div className="rounded-full bg-green-100 p-3 mb-4">
                    <Battery className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">سعة البطاريات التقريبية</h4>
                  <div className="text-2xl font-bold text-gray-900">
                    {(state.results.batteryCapacityWh / 1000).toFixed(1)} <span className="text-sm font-normal text-gray-500">كيلو واط/ساعة</span>
                  </div>
                </div>

              </div>

              <div className="mt-6 flex items-start text-sm text-gray-500 bg-blue-50 p-4 rounded-md">
                <AlertCircle className="h-5 w-5 text-blue-400 ml-2 flex-shrink-0" />
                <p>
                  هذه الحسابات تقديرية وتعتمد على متوسط الاستهلاك وأشعة الشمس. نوصي باستشارة مهندس مختص لتصميم النظام النهائي بدقة أعلى.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
