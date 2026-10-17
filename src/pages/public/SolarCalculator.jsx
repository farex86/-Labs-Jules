import React, { useReducer } from 'react';
import { FACILITY_TYPES, calculateTotalDailyEnergyWh, calculateRecommendedSolarSizeKW } from '../../models/SolarCalculatorModel';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Calculator, Plus, Trash2 } from 'lucide-react';

const initialState = {
  selectedFacilityId: '',
  appliances: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      if (!facility) return { ...state, selectedFacilityId: action.payload, appliances: [] };
      // Deep copy to prevent mutation of the model's constant
      const deepCopiedAppliances = facility.defaultAppliances.map(app => ({ ...app }));
      return { ...state, selectedFacilityId: action.payload, appliances: deepCopiedAppliances };
    }
    case 'UPDATE_APPLIANCE': {
      const { id, field, value } = action.payload;
      return {
        ...state,
        appliances: state.appliances.map(app =>
          app.id === id ? { ...app, [field]: value } : app
        )
      };
    }
    case 'ADD_APPLIANCE': {
      const newId = state.appliances.length > 0 ? Math.max(...state.appliances.map(a => a.id)) + 1 : 1;
      return {
        ...state,
        appliances: [
          ...state.appliances,
          { id: newId, name: 'جهاز جديد', powerWatts: 0, quantity: 1, hoursPerDay: 0 }
        ]
      };
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

  const totalWh = calculateTotalDailyEnergyWh(state.appliances);
  const recommendedKw = calculateRecommendedSolarSizeKW(totalWh);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4"
          >
            <Calculator className="h-8 w-8 text-blue-600" />
          </motion.div>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">حاسبة الطاقة الشمسية</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            اختر نوع المنشأة لتحديد احتياجك التقريبي من الطاقة الشمسية.
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-2">
              نوع المنشأة
            </label>
            <select
              id="facility"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={state.selectedFacilityId}
              onChange={(e) => dispatch({ type: 'SELECT_FACILITY', payload: e.target.value })}
            >
              <option value="">-- اختر منشأة --</option>
              {FACILITY_TYPES.map(facility => (
                <option key={facility.id} value={facility.id}>{facility.name}</option>
              ))}
            </select>
          </div>
        </div>

        {state.selectedFacilityId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow overflow-hidden sm:rounded-lg"
          >
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                الأجهزة وأنماط الاستهلاك
              </h3>
              <button
                type="button"
                onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="mr-1 ml-1 h-4 w-4" />
                إضافة جهاز
              </button>
            </div>

            <div className="px-4 py-5 sm:p-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاستهلاك (واط)</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العدد</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات العمل/يوم</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {state.appliances.map((app, index) => (
                    <motion.tr
                      key={app.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <input
                          type="text"
                          value={app.name}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'name', value: e.target.value } })}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <input
                          type="number"
                          min="0"
                          value={app.powerWatts}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'powerWatts', value: Number(e.target.value) } })}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-24 sm:text-sm border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <input
                          type="number"
                          min="1"
                          value={app.quantity}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'quantity', value: Number(e.target.value) } })}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-20 sm:text-sm border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={app.hoursPerDay}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'hoursPerDay', value: Number(e.target.value) } })}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-20 sm:text-sm border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 px-4 py-5 sm:px-6 rounded-b-lg border-t border-gray-200">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">إجمالي الاستهلاك اليومي</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">{totalWh.toLocaleString()} واط/ساعة</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">حجم النظام الشمسي المقترح (تقريبي)</dt>
                  <dd className="mt-1 text-2xl font-semibold text-blue-600">{recommendedKw.toFixed(2)} كيلو واط (kW)</dd>
                </div>
              </dl>
              <div className="mt-4 text-xs text-gray-500">
                * الحسابات تقريبية وتفترض 5 ساعات ذروة شمسية وكفاءة نظام 80%.
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
