import React, { useReducer, useMemo } from 'react';
import { Plus, Trash2, Calculator } from 'lucide-react';
import { facilityTypes, typicalAppliances } from '../../data/solarCalculatorData';
import { calculateSolarSystem } from '../../utils/solarCalculatorLogic';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const initialState = {
  facilityType: facilityTypes[0].id,
  appliances: [
    { id: Date.now().toString(), name: '', quantity: 1, watts: 0, hours: 0 }
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY_TYPE':
      return { ...state, facilityType: action.payload };
    case 'ADD_APPLIANCE':
      if (action.payload) { // From template
        return {
          ...state,
          appliances: [
            ...state.appliances,
            {
              id: Date.now().toString(),
              name: action.payload.name,
              quantity: 1,
              watts: action.payload.defaultWatts,
              hours: action.payload.defaultHours
            }
          ]
        };
      }
      return {
        ...state,
        appliances: [
          ...state.appliances,
          { id: Date.now().toString(), name: '', quantity: 1, watts: 0, hours: 0 }
        ]
      };
    case 'UPDATE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.map(app =>
          app.id === action.payload.id ? { ...app, [action.payload.field]: action.payload.value } : app
        )
      };
    case 'REMOVE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.filter(app => app.id !== action.payload)
      };
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const results = useMemo(() => calculateSolarSystem(state.appliances), [state.appliances]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
            <Calculator className="h-8 w-8 text-green-600" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            احسب احتياجاتك من الطاقة الشمسية بناءً على استهلاك أجهزتك
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">نوع المنشأة / نمط الاستهلاك</label>
            <select
              value={state.facilityType}
              onChange={(e) => dispatch({ type: 'SET_FACILITY_TYPE', payload: e.target.value })}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md border"
            >
              {facilityTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">الأجهزة الكهربائية</h3>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm text-gray-500 flex items-center ml-2">إضافة سريعة:</span>
              {typicalAppliances.map(app => (
                <button
                  key={app.id}
                  onClick={() => dispatch({ type: 'ADD_APPLIANCE', payload: app })}
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {app.name}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العدد</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القدرة (واط)</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات العمل/اليوم</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراء</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {state.appliances.map((app) => (
                    <motion.tr
                      key={app.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <td className="px-2 py-2 whitespace-nowrap">
                        <input
                          type="text"
                          value={app.name}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'name', value: e.target.value } })}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                          placeholder="اسم الجهاز"
                        />
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <input
                          type="number"
                          min="1"
                          value={app.quantity}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'quantity', value: Number(e.target.value) } })}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        />
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          value={app.watts}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'watts', value: Number(e.target.value) } })}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        />
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={app.hours}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'hours', value: Number(e.target.value) } })}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        />
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-right text-sm font-medium">
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

            <div className="mt-4">
              <button
                type="button"
                onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                إضافة جهاز
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white shadow rounded-lg p-6 border-t-4 border-green-500">
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">النتائج الموصى بها</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="text-sm font-medium text-blue-600 mb-1">الاستهلاك اليومي</div>
              <div className="text-2xl font-bold text-blue-900">
                {(results.totalDailyEnergyWh / 1000).toFixed(2)} <span className="text-sm font-normal">كيلو واط ساعة</span>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <div className="text-sm font-medium text-purple-600 mb-1">الإنفرتر (المحول)</div>
              <div className="text-2xl font-bold text-purple-900">
                {results.recommendedInverterKW} <span className="text-sm font-normal">كيلو واط</span>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
              <div className="text-sm font-medium text-orange-600 mb-1">الألواح الشمسية</div>
              <div className="text-2xl font-bold text-orange-900">
                {results.recommendedPanelsKW} <span className="text-sm font-normal">كيلو واط</span>
              </div>
            </div>

            <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
              <div className="text-sm font-medium text-teal-600 mb-1">البطاريات</div>
              <div className="text-2xl font-bold text-teal-900">
                {results.recommendedBatteryKWh} <span className="text-sm font-normal">كيلو واط ساعة</span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            * هذه الحسابات تقديرية وتعتمد على متوسط الإشعاع الشمسي (حوالي 5 ساعات) وكفاءة النظام بنسبة 80% وتفريغ البطاريات بنسبة 60%.
          </p>
        </div>

      </div>
    </div>
  );
}
