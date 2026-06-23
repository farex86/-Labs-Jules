import React, { useReducer, useEffect } from 'react';
import { Plus, Trash2, Calculator, Sun, Battery, Zap, Building2, ArrowRight } from 'lucide-react';
import { FACILITY_TYPES } from '../../utils/solarCalculatorConstants';
import { calculateSystemSize } from '../../utils/solarCalculatorLogic';

// Initial state for the reducer
const initialState = {
  selectedFacility: '',
  appliances: [],
  results: null,
  autonomyDays: 1
};

// Reducer function to handle state updates
function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      return {
        ...state,
        selectedFacility: action.payload,
        appliances: facility ? JSON.parse(JSON.stringify(facility.defaultAppliances)) : [], // Deep copy
        results: null
      };
    }
    case 'UPDATE_APPLIANCE': {
      const { id, field, value } = action.payload;
      const updatedAppliances = state.appliances.map(app =>
        app.id === id ? { ...app, [field]: value } : app
      );
      return { ...state, appliances: updatedAppliances };
    }
    case 'ADD_APPLIANCE': {
      const newAppliance = {
        id: Date.now().toString(),
        name: 'جهاز جديد',
        power: 100,
        quantity: 1,
        hours: 1
      };
      return { ...state, appliances: [...state.appliances, newAppliance] };
    }
    case 'REMOVE_APPLIANCE': {
      return {
        ...state,
        appliances: state.appliances.filter(app => app.id !== action.payload)
      };
    }
    case 'SET_AUTONOMY_DAYS':
      return { ...state, autonomyDays: action.payload };
    case 'CALCULATE': {
      const results = calculateSystemSize(state.appliances, state.autonomyDays);
      return { ...state, results };
    }
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  // Recalculate whenever appliances or autonomy days change, if we already have results shown
  useEffect(() => {
    if (state.results) {
      dispatch({ type: 'CALCULATE' });
    }
  }, [state.appliances, state.autonomyDays]); // Only re-run if these change

  const handleCalculate = (e) => {
    e.preventDefault();
    dispatch({ type: 'CALCULATE' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <Calculator className="h-8 w-8 text-blue-600" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="text-gray-500">
            احسب حجم نظام الطاقة الشمسية المناسب لمنشأتك
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8 space-y-8">

            {/* Facility Selection */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-gray-400" />
                اختر نوع المنشأة
              </label>
              <select
                value={state.selectedFacility}
                onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-colors"
              >
                <option value="">-- اختر من القائمة --</option>
                {FACILITY_TYPES.map(facility => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Appliances List */}
            {state.selectedFacility && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">الأجهزة والأحمال الكهربائية</h3>
                  <button
                    onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-right">
                    <thead className="bg-gray-50 text-gray-600 rounded-t-xl">
                      <tr>
                        <th className="px-4 py-3 font-medium rounded-tr-xl">الجهاز</th>
                        <th className="px-4 py-3 font-medium">القدرة (واط)</th>
                        <th className="px-4 py-3 font-medium">العدد</th>
                        <th className="px-4 py-3 font-medium">ساعات التشغيل/يوم</th>
                        <th className="px-4 py-3 font-medium rounded-tl-xl"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {state.appliances.map((appliance) => (
                        <tr key={appliance.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={appliance.name}
                              onChange={(e) => dispatch({
                                type: 'UPDATE_APPLIANCE',
                                payload: { id: appliance.id, field: 'name', value: e.target.value }
                              })}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                              placeholder="اسم الجهاز"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              min="1"
                              value={appliance.power}
                              onChange={(e) => dispatch({
                                type: 'UPDATE_APPLIANCE',
                                payload: { id: appliance.id, field: 'power', value: Math.max(0, e.target.value) }
                              })}
                              className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              min="1"
                              value={appliance.quantity}
                              onChange={(e) => dispatch({
                                type: 'UPDATE_APPLIANCE',
                                payload: { id: appliance.id, field: 'quantity', value: Math.max(1, e.target.value) }
                              })}
                              className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              min="1"
                              max="24"
                              value={appliance.hours}
                              onChange={(e) => dispatch({
                                type: 'UPDATE_APPLIANCE',
                                payload: { id: appliance.id, field: 'hours', value: Math.min(24, Math.max(0, e.target.value)) }
                              })}
                              className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-4 py-3 text-left">
                            <button
                              onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: appliance.id })}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="حذف الجهاز"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {state.appliances.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                            لا توجد أجهزة مضافة. انقر على "إضافة جهاز" للبدء.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Calculate Action */}
                <div className="pt-6 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-gray-600">أيام التخزين (البطارية):</label>
                    <input
                      type="number"
                      min="0.5"
                      step="0.5"
                      value={state.autonomyDays}
                      onChange={(e) => dispatch({ type: 'SET_AUTONOMY_DAYS', payload: Number(e.target.value) })}
                      className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-500">يوم</span>
                  </div>

                  <button
                    onClick={handleCalculate}
                    disabled={state.appliances.length === 0}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    حساب النظام
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {state.results && (
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 md:p-8 text-white animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-6 text-center">النتائج المقترحة للنظام</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Inverter */}
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Zap className="h-6 w-6 text-blue-200" />
                  </div>
                  <h3 className="font-semibold text-lg">الإنفرتر (المحول)</h3>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold">{state.results.inverterSizeKW.toFixed(1)} <span className="text-base font-normal text-blue-200">كيلو واط</span></p>
                  <p className="text-sm text-blue-200">أقصى حمل مستمر: {state.results.peakPowerKW.toFixed(1)} كيلو واط</p>
                </div>
              </div>

              {/* Solar Panels */}
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Sun className="h-6 w-6 text-yellow-300" />
                  </div>
                  <h3 className="font-semibold text-lg">الألواح الشمسية</h3>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold">{state.results.solarArraySizeKW.toFixed(1)} <span className="text-base font-normal text-blue-200">كيلو واط</span></p>
                  <p className="text-sm text-blue-200">الاستهلاك اليومي: {state.results.dailyEnergyKWh.toFixed(1)} كيلو واط.ساعة</p>
                </div>
              </div>

              {/* Batteries */}
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Battery className="h-6 w-6 text-green-300" />
                  </div>
                  <h3 className="font-semibold text-lg">سعة البطاريات</h3>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold">{state.results.batteryCapacityKWh.toFixed(1)} <span className="text-base font-normal text-blue-200">كيلو واط.ساعة</span></p>
                  <p className="text-sm text-blue-200">يكفي لمدة {state.autonomyDays} يوم بدون شمس</p>
                </div>
              </div>

            </div>

            <div className="mt-8 p-4 bg-white/5 rounded-xl text-sm text-blue-100 text-center">
              * هذه الحسابات تقديرية وتعتمد على كفاءة النظام والإشعاع الشمسي في منطقتك. ينصح باستشارة مهندس مختص قبل التركيب.
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SolarCalculator;
