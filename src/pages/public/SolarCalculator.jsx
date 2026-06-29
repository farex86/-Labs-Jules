import React, { useReducer, useMemo } from 'react';
import { Calculator, Sun, Battery, Zap, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { FACILITY_TYPES, calculateSolarSystemRequirements } from '../../models/SolarCalculatorModel';

// State management reducer
const initialState = {
  selectedFacilityId: '',
  customName: '',
  devices: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      return {
        ...state,
        selectedFacilityId: action.payload,
        customName: facility ? facility.name : '',
        // Deep copy devices so we can edit them independently
        devices: facility ? facility.devices.map(d => ({ ...d, id: Date.now().toString() + Math.random() })) : [],
      };
    }
    case 'ADD_DEVICE':
      return {
        ...state,
        devices: [
          ...state.devices,
          { id: Date.now().toString(), name: 'جهاز جديد', powerWatts: 100, quantity: 1, hoursPerDay: 4 }
        ],
      };
    case 'REMOVE_DEVICE':
      return {
        ...state,
        devices: state.devices.filter(d => d.id !== action.payload),
      };
    case 'UPDATE_DEVICE':
      return {
        ...state,
        devices: state.devices.map(d =>
          d.id === action.payload.id ? { ...d, [action.payload.field]: action.payload.value } : d
        ),
      };
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Derived state (Calculation results)
  const results = useMemo(() => calculateSolarSystemRequirements(state.devices), [state.devices]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <Calculator className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400" />
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            احسب احتياجات منشأتك من الطاقة الشمسية بناءً على الأجهزة وساعات التشغيل.
          </p>
        </div>

        {/* Facility Selection */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            اختر نوع المنشأة للبدء بأنماط استهلاك جاهزة:
          </label>
          <select
            className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            value={state.selectedFacilityId}
            onChange={(e) => dispatch({ type: 'SELECT_FACILITY', payload: e.target.value })}
          >
            <option value="">-- اختر المنشأة --</option>
            {FACILITY_TYPES.map((facility) => (
              <option key={facility.id} value={facility.id}>
                {facility.name}
              </option>
            ))}
          </select>
        </div>

        {/* Devices List */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">الأجهزة والأحمال</h2>
            <button
              onClick={() => dispatch({ type: 'ADD_DEVICE' })}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="ml-1 -mr-0.5 h-4 w-4" />
              إضافة جهاز
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">الجهاز</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">القدرة (واط)</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">العدد</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ساعات التشغيل (يومياً)</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {state.devices.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      لا توجد أجهزة. يرجى اختيار منشأة أو إضافة جهاز جديد.
                    </td>
                  </tr>
                ) : (
                  state.devices.map((device) => (
                    <tr key={device.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={device.name}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'name', value: e.target.value } })}
                          className="block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          value={device.powerWatts}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'powerWatts', value: e.target.value } })}
                          className="block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="1"
                          value={device.quantity}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'quantity', value: e.target.value } })}
                          className="block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={device.hoursPerDay}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'hoursPerDay', value: e.target.value } })}
                          className="block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-1"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Section */}
        {state.devices.length > 0 && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">النتائج التقديرية للنظام</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Daily Consumption */}
              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Zap className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="mr-3">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">الاستهلاك اليومي</p>
                    <p className="text-2xl font-semibold text-blue-700 dark:text-blue-200">
                      {(results.totalDailyEnergyWh / 1000).toFixed(2)} <span className="text-sm">kWh</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Inverter Capacity */}
              <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 border border-green-100 dark:border-green-800">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-6 w-6 text-green-600 dark:text-green-300" />
                  </div>
                  <div className="mr-3">
                    <p className="text-sm font-medium text-green-900 dark:text-green-100">حجم الإنفرتر</p>
                    <p className="text-2xl font-semibold text-green-700 dark:text-green-200">
                      {(results.requiredInverterCapacityW / 1000).toFixed(2)} <span className="text-sm">kW</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Solar Array */}
              <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4 border border-yellow-100 dark:border-yellow-800">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Sun className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
                  </div>
                  <div className="mr-3">
                    <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">سعة الألواح المطلوبة</p>
                    <p className="text-2xl font-semibold text-yellow-700 dark:text-yellow-200">
                      {(results.requiredSolarArrayCapacityW / 1000).toFixed(2)} <span className="text-sm">kWp</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Battery Capacity */}
              <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4 border border-purple-100 dark:border-purple-800">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Battery className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div className="mr-3">
                    <p className="text-sm font-medium text-purple-900 dark:text-purple-100">سعة البطاريات ({results.systemVoltage}V)</p>
                    <p className="text-2xl font-semibold text-purple-700 dark:text-purple-200">
                      {(results.requiredBatteryCapacityWh / 1000).toFixed(2)} <span className="text-sm">kWh</span>
                    </p>
                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                      ~{Math.ceil(results.requiredBatteryCapacityAh)} Ah
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              * هذه الحسابات تقديرية مبدئية، وتتضمن عوامل أمان (Safety factors) وكفاءة تحويل، وتفترض تفريغ البطارية بنسبة 50%. ينصح باستشارة مهندس مختص للتصميم النهائي.
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
