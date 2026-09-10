import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { FACILITY_TYPES, calculateSolarRequirements } from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacility: '',
  appliances: [{ id: 1, name: '', power: '', hours: '', quantity: 1 }],
  results: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY':
      return { ...state, selectedFacility: action.payload };
    case 'ADD_APPLIANCE':
      return {
        ...state,
        appliances: [
          ...state.appliances.map(a => ({ ...a })),
          { id: Date.now(), name: '', power: '', hours: '', quantity: 1 }
        ]
      };
    case 'UPDATE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.map(app =>
          app.id === action.payload.id ? { ...app, ...action.payload.updates } : { ...app }
        )
      };
    case 'REMOVE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.filter(app => app.id !== action.payload).map(a => ({ ...a }))
      };
    case 'CALCULATE':
      return {
        ...state,
        results: calculateSolarRequirements(state.appliances)
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCalculate = (e) => {
    e.preventDefault();
    dispatch({ type: 'CALCULATE' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نمط استهلاكك
          </p>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleCalculate} className="space-y-8">

              {/* Facility Selection */}
              <div>
                <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-2">
                  نوع المنشأة (نمط الاستهلاك)
                </label>
                <select
                  id="facility"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                  value={state.selectedFacility}
                  onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
                >
                  <option value="">-- اختر نوع المنشأة --</option>
                  {FACILITY_TYPES.map((facility) => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Appliances List */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    الأجهزة الكهربائية
                  </h3>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    + إضافة جهاز
                  </button>
                </div>

                <div className="space-y-4">
                  {state.appliances.map((appliance) => (
                    <motion.div
                      key={appliance.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col sm:flex-row gap-4 items-end bg-gray-50 p-4 rounded-md border border-gray-200"
                    >
                      <div className="w-full sm:w-1/4">
                        <label className="block text-xs font-medium text-gray-500 mb-1">اسم الجهاز</label>
                        <input
                          type="text"
                          required
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
                          placeholder="مثال: مكيف، لمبة"
                          value={appliance.name}
                          onChange={(e) => dispatch({
                            type: 'UPDATE_APPLIANCE',
                            payload: { id: appliance.id, updates: { name: e.target.value } }
                          })}
                        />
                      </div>
                      <div className="w-full sm:w-1/4">
                        <label className="block text-xs font-medium text-gray-500 mb-1">القدرة (واط)</label>
                        <input
                          type="number"
                          required
                          min="1"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
                          placeholder="الواط"
                          value={appliance.power}
                          onChange={(e) => dispatch({
                            type: 'UPDATE_APPLIANCE',
                            payload: { id: appliance.id, updates: { power: e.target.value } }
                          })}
                        />
                      </div>
                      <div className="w-full sm:w-1/4">
                        <label className="block text-xs font-medium text-gray-500 mb-1">ساعات التشغيل (يومياً)</label>
                        <input
                          type="number"
                          required
                          min="1"
                          max="24"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
                          placeholder="ساعات"
                          value={appliance.hours}
                          onChange={(e) => dispatch({
                            type: 'UPDATE_APPLIANCE',
                            payload: { id: appliance.id, updates: { hours: e.target.value } }
                          })}
                        />
                      </div>
                      <div className="w-full sm:w-1/4">
                        <label className="block text-xs font-medium text-gray-500 mb-1">العدد</label>
                        <input
                          type="number"
                          required
                          min="1"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
                          value={appliance.quantity}
                          onChange={(e) => dispatch({
                            type: 'UPDATE_APPLIANCE',
                            payload: { id: appliance.id, updates: { quantity: e.target.value } }
                          })}
                        />
                      </div>
                      <div className="w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: appliance.id })}
                          disabled={state.appliances.length === 1}
                          className="w-full sm:w-auto inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                        >
                          حذف
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    احسب الاحتياجات
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Results Section */}
          {state.results && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="border-t border-gray-200 bg-gray-50 p-6 sm:p-8"
            >
              <h3 className="text-xl leading-6 font-bold text-gray-900 mb-6 text-center">
                النتائج التقديرية للنظام الشمسي
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 p-5">
                  <dt className="text-sm font-medium text-gray-500 truncate">إجمالي الطاقة اليومية المستهلكة</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">{state.results.totalDailyEnergyWH.toLocaleString()} <span className="text-base font-normal text-gray-500">واط/ساعة</span></dd>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 p-5">
                  <dt className="text-sm font-medium text-gray-500 truncate">أقصى حمل كهربائي (لتحديد الانفرتر)</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">{state.results.maxPowerW.toLocaleString()} <span className="text-base font-normal text-gray-500">واط</span></dd>
                </div>

                <div className="bg-blue-50 overflow-hidden shadow rounded-lg border border-blue-200 p-5">
                  <dt className="text-sm font-medium text-blue-700 truncate">سعة الألواح المطلوبة</dt>
                  <dd className="mt-1 text-3xl font-semibold text-blue-900">{state.results.panelCapacityW.toLocaleString()} <span className="text-base font-normal text-blue-700">واط</span></dd>
                </div>

                <div className="bg-green-50 overflow-hidden shadow rounded-lg border border-green-200 p-5">
                  <dt className="text-sm font-medium text-green-700 truncate">حجم الانفرتر المقترح</dt>
                  <dd className="mt-1 text-3xl font-semibold text-green-900">{state.results.inverterSizeW.toLocaleString()} <span className="text-base font-normal text-green-700">واط</span></dd>
                </div>

                <div className="bg-purple-50 overflow-hidden shadow rounded-lg border border-purple-200 p-5 md:col-span-2">
                  <dt className="text-sm font-medium text-purple-700 truncate">سعة البطاريات المقترحة (نظام 12 فولت)</dt>
                  <dd className="mt-1 text-3xl font-semibold text-purple-900">{state.results.batteryCapacityAH.toLocaleString()} <span className="text-base font-normal text-purple-700">أمبير/ساعة</span></dd>
                  <p className="mt-2 text-sm text-purple-600">* بناءً على يوم واحد من الاستقلالية وعمق تفريغ 50%</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
