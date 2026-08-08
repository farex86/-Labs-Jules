import React, { useReducer } from 'react';
import { motion } from 'motion/react';
import {
  Calculator,
  Sun,
  Battery,
  Zap,
  Building2,
  Clock,
  Settings,
  ChevronRight
} from 'lucide-react';
import { facilityTypes, calculateSolarSystem, getFacilityDetails } from '../../models/SolarCalculatorModel';

// Initial state for the calculator
const initialState = {
  selectedFacility: '',
  powerKW: 0,
  hoursPerDay: 0,
  results: null,
};

// Reducer for managing calculator state
function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facility = getFacilityDetails(action.payload);
      if (facility) {
        return {
          ...state,
          selectedFacility: facility.id,
          powerKW: facility.defaultPowerKW,
          hoursPerDay: facility.defaultHours,
          results: null, // Reset results when facility changes
        };
      }
      return state;
    }
    case 'UPDATE_POWER':
      return { ...state, powerKW: action.payload, results: null };
    case 'UPDATE_HOURS':
      return { ...state, hoursPerDay: action.payload, results: null };
    case 'CALCULATE': {
      const totalDailyEnergyKWh = state.powerKW * state.hoursPerDay;
      if (totalDailyEnergyKWh > 0) {
        const results = calculateSolarSystem(totalDailyEnergyKWh);
        return { ...state, results };
      }
      return state;
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handleCalculate = (e) => {
    e.preventDefault();
    dispatch({ type: 'CALCULATE' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6"
          >
            <Sun className="h-8 w-8 text-blue-600" />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            احسب التكلفة التقديرية وحجم النظام الشمسي المناسب لمنشأتك
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Input Form */}
            <div className="p-8 border-b md:border-b-0 md:border-l border-gray-200">
              <form onSubmit={handleCalculate} className="space-y-6">

                {/* Facility Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      نوع المنشأة
                    </span>
                  </label>
                  <select
                    value={state.selectedFacility}
                    onChange={(e) => dispatch({ type: 'SELECT_FACILITY', payload: e.target.value })}
                    className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                    required
                  >
                    <option value="" disabled>اختر نوع المنشأة...</option>
                    {facilityTypes.map((facility) => (
                      <option key={facility.id} value={facility.id}>
                        {facility.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom Inputs (Shown when facility is selected) */}
                {state.selectedFacility && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <span className="flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          الاستهلاك التقريبي (كيلو وات)
                        </span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={state.powerKW || ''}
                        onChange={(e) => dispatch({ type: 'UPDATE_POWER', payload: parseFloat(e.target.value) || 0 })}
                        className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          ساعات التشغيل يومياً
                        </span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="24"
                        value={state.hoursPerDay || ''}
                        onChange={(e) => dispatch({ type: 'UPDATE_HOURS', payload: parseFloat(e.target.value) || 0 })}
                        className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={!state.selectedFacility || state.powerKW <= 0 || state.hoursPerDay <= 0}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Calculator className="w-5 h-5" />
                  احسب النظام
                </button>
              </form>
            </div>

            {/* Results Section */}
            <div className="p-8 bg-gray-50 flex flex-col justify-center">
              {state.results ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Settings className="w-6 h-6 text-blue-600" />
                    المتطلبات المقدرة للنظام
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <div className="text-gray-500 text-sm mb-1">الاستهلاك اليومي</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {state.results.dailyEnergyKWh} <span className="text-sm font-normal text-gray-500">kWh</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <div className="text-gray-500 text-sm mb-1">حجم الألواح الشمسية</div>
                      <div className="text-2xl font-bold text-blue-600">
                        {state.results.solarArrayKW} <span className="text-sm font-normal text-gray-500">kW</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <div className="text-gray-500 text-sm mb-1">عدد الألواح (500W)</div>
                      <div className="text-2xl font-bold text-orange-600">
                        {state.results.panelsRequired} <span className="text-sm font-normal text-gray-500">لوح</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <div className="text-gray-500 text-sm mb-1">سعة العاكس (Inverter)</div>
                      <div className="text-2xl font-bold text-green-600">
                        {state.results.inverterKW} <span className="text-sm font-normal text-gray-500">kW</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-l-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Battery className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-900">سعة البطاريات المطلوبة</h4>
                    </div>
                    <p className="text-3xl font-bold text-blue-700">
                      {state.results.batteryCapacityKWh} <span className="text-lg font-normal">kWh</span>
                    </p>
                    <p className="text-sm text-blue-600 mt-2">
                      * محسوبة بناءً على تخزين طاقة يكفي ليوم واحد مع كفاءة بطاريات 85% وعمق تفريغ 50%
                    </p>
                  </div>

                  <button
                    onClick={() => dispatch({ type: 'RESET' })}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    حساب منشأة أخرى
                    <ChevronRight className="w-4 h-4" />
                  </button>

                </motion.div>
              ) : (
                <div className="text-center text-gray-400">
                  <Calculator className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>الرجاء اختيار المنشأة وإدخال البيانات لرؤية النتائج</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
