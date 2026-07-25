import React, { useReducer } from 'react';
import { Calculator, Sun, Battery, Zap, AlertCircle } from 'lucide-react';
import {
  FACILITY_TYPES,
  calculateTotalConsumption,
  calculateSystemSizeKW,
  calculatePanelsCount,
  calculateBatteryCapacityAh
} from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacilityId: '',
  appliances: [],
  customAppliance: { name: '', watts: '', qty: '', hours: '' },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      return {
        ...state,
        selectedFacilityId: action.payload,
        appliances: facility ? JSON.parse(JSON.stringify(facility.appliances)) : []
      };
    }
    case 'UPDATE_APPLIANCE': {
      const { index, field, value } = action.payload;
      const newAppliances = [...state.appliances];
      newAppliances[index][field] = value;
      return { ...state, appliances: newAppliances };
    }
    case 'REMOVE_APPLIANCE': {
      return {
        ...state,
        appliances: state.appliances.filter((_, i) => i !== action.payload)
      };
    }
    case 'SET_CUSTOM_APPLIANCE': {
      return {
        ...state,
        customAppliance: { ...state.customAppliance, ...action.payload }
      };
    }
    case 'ADD_CUSTOM_APPLIANCE': {
      if (!state.customAppliance.name || !state.customAppliance.watts || !state.customAppliance.qty || !state.customAppliance.hours) {
        return state;
      }
      return {
        ...state,
        appliances: [...state.appliances, { ...state.customAppliance }],
        customAppliance: { name: '', watts: '', qty: '', hours: '' }
      };
    }
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dailyConsumptionWh = calculateTotalConsumption(state.appliances);
  const systemSizeKW = calculateSystemSizeKW(state.appliances);
  const panelsCount = calculatePanelsCount(dailyConsumptionWh);
  const batteryCapacityAh = calculateBatteryCapacityAh(dailyConsumptionWh);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Calculator className="mx-auto h-12 w-12 text-primary-600 mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع المنشأة والأجهزة المستخدمة.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">اختر نوع المنشأة</h2>
          <select
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={state.selectedFacilityId}
            onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
          >
            <option value="">-- اختر المنشأة --</option>
            {FACILITY_TYPES.map(facility => (
              <option key={facility.id} value={facility.id}>{facility.name}</option>
            ))}
          </select>
        </div>

        {state.selectedFacilityId && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8 overflow-hidden">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">الأجهزة الكهربائية</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-right mb-6">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                    <th className="pb-3 font-semibold">اسم الجهاز</th>
                    <th className="pb-3 font-semibold">القدرة (واط)</th>
                    <th className="pb-3 font-semibold">العدد</th>
                    <th className="pb-3 font-semibold">ساعات العمل</th>
                    <th className="pb-3 font-semibold">إجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {state.appliances.map((app, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-700/50">
                      <td className="py-3">
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          value={app.name}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { index, field: 'name', value: e.target.value } })}
                        />
                      </td>
                      <td className="py-3">
                        <input
                          type="number"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          value={app.watts}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { index, field: 'watts', value: e.target.value } })}
                        />
                      </td>
                      <td className="py-3">
                        <input
                          type="number"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          value={app.qty}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { index, field: 'qty', value: e.target.value } })}
                        />
                      </td>
                      <td className="py-3">
                        <input
                          type="number"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          value={app.hours}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { index, field: 'hours', value: e.target.value } })}
                        />
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: index })}
                          className="text-red-500 hover:text-red-700 px-2 py-1"
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">إضافة جهاز جديد</h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end">
                <div className="sm:col-span-1">
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">الاسم</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={state.customAppliance.name}
                    onChange={(e) => dispatch({ type: 'SET_CUSTOM_APPLIANCE', payload: { name: e.target.value } })}
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">القدرة (واط)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={state.customAppliance.watts}
                    onChange={(e) => dispatch({ type: 'SET_CUSTOM_APPLIANCE', payload: { watts: e.target.value } })}
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">العدد</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={state.customAppliance.qty}
                    onChange={(e) => dispatch({ type: 'SET_CUSTOM_APPLIANCE', payload: { qty: e.target.value } })}
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">ساعات العمل</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={state.customAppliance.hours}
                    onChange={(e) => dispatch({ type: 'SET_CUSTOM_APPLIANCE', payload: { hours: e.target.value } })}
                  />
                </div>
                <div className="sm:col-span-1">
                  <button
                    onClick={() => dispatch({ type: 'ADD_CUSTOM_APPLIANCE' })}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    إضافة
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {state.appliances.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-t-4 border-blue-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">الاستهلاك اليومي</h3>
                <Zap className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {(dailyConsumptionWh / 1000).toFixed(2)} <span className="text-lg text-gray-500">كيلوواط/ساعة (kWh)</span>
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-t-4 border-green-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">حجم النظام (الإنفرتر)</h3>
                <AlertCircle className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {systemSizeKW.toFixed(2)} <span className="text-lg text-gray-500">كيلوواط (kW)</span>
              </p>
              <p className="text-xs text-gray-500 mt-2">* يتضمن 20% هامش أمان</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-t-4 border-yellow-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">عدد الألواح الشمسية</h3>
                <Sun className="h-6 w-6 text-yellow-500" />
              </div>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {panelsCount} <span className="text-lg text-gray-500">لوح</span>
              </p>
              <p className="text-xs text-gray-500 mt-2">* بافتراض لوح 550 واط و 5 ساعات ذروة شمسية</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-t-4 border-purple-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">سعة البطاريات المطلوبة</h3>
                <Battery className="h-6 w-6 text-purple-500" />
              </div>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {batteryCapacityAh.toLocaleString()} <span className="text-lg text-gray-500">أمبير-ساعة (Ah)</span>
              </p>
              <p className="text-xs text-gray-500 mt-2">* نظام 48 فولت وتفريغ 80% (ليثيوم)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolarCalculator;
