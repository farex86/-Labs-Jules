import React, { useReducer, useEffect } from 'react';
import { FACILITY_TYPES, calculateTotalDailyWh, calculateSystemRequirements } from '../../models/SolarCalculatorModel';
import { Calculator, Zap, Battery, Sun, Plus, Trash2 } from 'lucide-react';

// Initial state for the reducer
const initialState = {
  selectedFacilityId: '',
  appliances: [],
  results: null,
};

// Reducer function to handle state updates
function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      if (!facility) return { ...state, selectedFacilityId: '', appliances: [], results: null };
      // Deep copy to prevent mutating the constants
      const newAppliances = facility.appliances.map(app => ({ ...app, id: app.id || Math.random().toString(36).substr(2, 9) }));
      return { ...state, selectedFacilityId: action.payload, appliances: newAppliances };
    }
    case 'UPDATE_APPLIANCE': {
      const updatedAppliances = state.appliances.map(app =>
        app.id === action.payload.id ? { ...app, [action.payload.field]: action.payload.value } : app
      );
      return { ...state, appliances: updatedAppliances };
    }
    case 'ADD_APPLIANCE': {
      const newAppliance = { id: Math.random().toString(36).substr(2, 9), name: 'جهاز جديد', watts: 100, hours: 1, quantity: 1 };
      return { ...state, appliances: [...state.appliances, newAppliance] };
    }
    case 'REMOVE_APPLIANCE': {
      const filteredAppliances = state.appliances.filter(app => app.id !== action.payload);
      return { ...state, appliances: filteredAppliances };
    }
    case 'CALCULATE': {
      const totalWh = calculateTotalDailyWh(state.appliances);
      const requirements = calculateSystemRequirements(totalWh);
      return { ...state, results: requirements };
    }
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  // Recalculate whenever appliances change
  useEffect(() => {
    if (state.appliances.length > 0) {
      dispatch({ type: 'CALCULATE' });
    }
  }, [state.appliances]);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SET_FACILITY', payload: e.target.value });
  };

  const handleApplianceChange = (id, field, value) => {
    const numericValue = field === 'name' ? value : Number(value);
    dispatch({ type: 'UPDATE_APPLIANCE', payload: { id, field, value: numericValue } });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-primary-100 rounded-full mb-4">
            <Calculator className="w-12 h-12 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">حاسبة الطاقة الشمسية</h1>
          <p className="text-lg text-gray-600">اختر نوع المنشأة لحساب الاستهلاك التقديري وتصميم النظام الشمسي المناسب</p>
        </div>

        {/* Facility Selector */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <label htmlFor="facility-select" className="block text-lg font-semibold text-gray-800 mb-3">
            نوع المنشأة
          </label>
          <select
            id="facility-select"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50 text-gray-800 text-lg"
            value={state.selectedFacilityId}
            onChange={handleFacilityChange}
          >
            <option value="">-- اختر نوع المنشأة --</option>
            {FACILITY_TYPES.map(facility => (
              <option key={facility.id} value={facility.id}>{facility.name}</option>
            ))}
          </select>
        </div>

        {/* Appliances Table */}
        {state.appliances.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">الأجهزة والاستهلاك</h2>
              <button
                onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                className="flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>إضافة جهاز</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">الجهاز</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">العدد</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">القدرة (واط)</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">ساعات العمل/يوم</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">الإجمالي (واط/ساعة)</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">إجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {state.appliances.map(app => (
                    <tr key={app.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={app.name}
                          onChange={(e) => handleApplianceChange(app.id, 'name', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded focus:ring-primary-500 focus:border-primary-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          min="1"
                          value={app.quantity}
                          onChange={(e) => handleApplianceChange(app.id, 'quantity', e.target.value)}
                          className="w-20 p-2 border border-gray-200 rounded focus:ring-primary-500 focus:border-primary-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          min="0"
                          value={app.watts}
                          onChange={(e) => handleApplianceChange(app.id, 'watts', e.target.value)}
                          className="w-24 p-2 border border-gray-200 rounded focus:ring-primary-500 focus:border-primary-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          min="0" max="24"
                          value={app.hours}
                          onChange={(e) => handleApplianceChange(app.id, 'hours', e.target.value)}
                          className="w-20 p-2 border border-gray-200 rounded focus:ring-primary-500 focus:border-primary-500"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-700">
                        {(app.quantity * app.watts * app.hours).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                          className="text-red-400 hover:text-red-600 p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Results Section */}
        {state.results && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <Zap className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">الاستهلاك اليومي الكلي</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {(state.results.totalDailyWh / 1000).toFixed(1)} <span className="text-base font-normal text-gray-500">كيلوواط/ساعة</span>
                </h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg">
                <Sun className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">حجم الألواح المقترح</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {state.results.recommendedArrayCapacitykW} <span className="text-base font-normal text-gray-500">كيلوواط</span>
                </h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                <Battery className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">سعة البطاريات (48 فولت)</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {state.results.estimatedBatteryBankAh_48V.toLocaleString()} <span className="text-base font-normal text-gray-500">أمبير/ساعة</span>
                </h3>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SolarCalculator;
