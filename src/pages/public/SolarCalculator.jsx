import React, { useReducer, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { facilityTypes, calculateConsumption, calculateSystemSize } from '../../models/SolarCalculatorModel';
import { Calculator, Plus, Trash2, Zap, Sun } from 'lucide-react';

const initialState = {
  selectedFacilityId: '',
  appliances: [],
  totalConsumptionWh: 0,
  recommendedSystemSizeKw: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facility = facilityTypes.find(f => f.id === action.payload);
      const newAppliances = facility ? facility.appliances.map(app => ({ ...app })) : [];
      return {
        ...state,
        selectedFacilityId: action.payload,
        appliances: newAppliances,
      };
    }
    case 'UPDATE_APPLIANCE': {
      const { index, field, value } = action.payload;
      const updatedAppliances = [...state.appliances];

      let parsedValue = value;
      if (field !== 'name') {
        // Allow empty string for UX, otherwise parse to number, falling back to 0 if invalid
        parsedValue = value === '' ? '' : (Number(value) >= 0 ? Number(value) : 0);
      }

      updatedAppliances[index] = {
        ...updatedAppliances[index],
        [field]: parsedValue,
      };
      return { ...state, appliances: updatedAppliances };
    }
    case 'ADD_APPLIANCE': {
      return {
        ...state,
        appliances: [
          ...state.appliances,
          { id: `custom_${Date.now()}`, name: 'جهاز جديد', powerWatts: 100, quantity: 1, hours: 1 }
        ]
      };
    }
    case 'REMOVE_APPLIANCE': {
      return {
        ...state,
        appliances: state.appliances.filter((_, i) => i !== action.payload)
      };
    }
    case 'CALCULATE': {
      const totalWh = calculateConsumption(state.appliances);
      const sizeKw = calculateSystemSize(totalWh);
      return {
        ...state,
        totalConsumptionWh: totalWh,
        recommendedSystemSizeKw: sizeKw,
      };
    }
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Recalculate whenever appliances change
  useEffect(() => {
    dispatch({ type: 'CALCULATE' });
  }, [state.appliances]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <Sun className="mx-auto h-12 w-12 text-yellow-500" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">حاسبة الطاقة الشمسية</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            احسب استهلاكك من الكهرباء وحجم النظام الشمسي المناسب لمنشأتك
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            <div className="mb-8">
              <label htmlFor="facility-type" className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-3">
                اختر نوع المنشأة
              </label>
              <select
                id="facility-type"
                value={state.selectedFacilityId}
                onChange={(e) => dispatch({ type: 'SELECT_FACILITY', payload: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">-- اختر --</option>
                {facilityTypes.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {state.selectedFacilityId && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">الأجهزة والاستهلاك</h3>
                  <button
                    onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-5 w-5 ml-2" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-300">اسم الجهاز</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-300">القدرة (واط)</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-300">العدد</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-300">ساعات التشغيل/يوم</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-300">إجراء</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {state.appliances.map((app, index) => (
                        <tr key={index}>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              value={app.name}
                              onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { index, field: 'name', value: e.target.value } })}
                              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              value={app.powerWatts}
                              onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { index, field: 'powerWatts', value: e.target.value } })}
                              className="block w-24 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              value={app.quantity}
                              onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { index, field: 'quantity', value: e.target.value } })}
                              className="block w-20 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              max="24"
                              value={app.hours}
                              onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { index, field: 'hours', value: e.target.value } })}
                              className="block w-20 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right">
                            <button
                              onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: index })}
                              className="text-red-600 hover:text-red-900 p-2"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {state.appliances.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                            لا توجد أجهزة مضافة.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
                    <div className="flex items-center">
                      <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400 ml-3" />
                      <div>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">إجمالي الاستهلاك اليومي</p>
                        <p className="mt-2 text-3xl font-bold text-blue-900 dark:text-blue-100">
                          {(state.totalConsumptionWh / 1000).toFixed(2)} <span className="text-xl font-normal">كيلو واط ساعة (kWh)</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-100 dark:border-green-800">
                    <div className="flex items-center">
                      <Calculator className="h-8 w-8 text-green-600 dark:text-green-400 ml-3" />
                      <div>
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">حجم النظام الشمسي المقترح</p>
                        <p className="mt-2 text-3xl font-bold text-green-900 dark:text-green-100">
                          {state.recommendedSystemSizeKw} <span className="text-xl font-normal">كيلو واط (kW)</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SolarCalculator;
