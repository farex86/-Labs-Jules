import React, { useReducer, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Calculator, Save, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { FACILITY_TYPES, calculateTotalConsumption, calculateSystemSize } from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacilityId: '',
  devices: [],
  isCalculating: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      if (!facility) return state;
      // Deep copy devices
      const defaultDevices = facility.defaultDevices.map(d => ({ ...d, id: crypto.randomUUID() }));
      return {
        ...state,
        selectedFacilityId: action.payload,
        devices: defaultDevices
      };
    }
    case 'ADD_DEVICE': {
      return {
        ...state,
        devices: [...state.devices, { id: crypto.randomUUID(), name: 'جهاز جديد', power: 0, hours: 0, quantity: 1 }]
      };
    }
    case 'UPDATE_DEVICE': {
      const { id, field, value } = action.payload;
      return {
        ...state,
        devices: state.devices.map(device =>
          device.id === id ? { ...device, [field]: value } : device
        )
      };
    }
    case 'REMOVE_DEVICE': {
      return {
        ...state,
        devices: state.devices.filter(device => device.id !== action.payload)
      };
    }
    case 'RESET': {
      return initialState;
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const totalConsumptionWh = useMemo(() => calculateTotalConsumption(state.devices), [state.devices]);
  const requiredSystemSizeKW = useMemo(() => calculateSystemSize(totalConsumptionWh), [totalConsumptionWh]);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SET_FACILITY', payload: e.target.value });
    toast.success('تم تحميل الأجهزة الافتراضية بنجاح');
  };

  const handleUpdateDevice = (id, field, value) => {
    dispatch({ type: 'UPDATE_DEVICE', payload: { id, field, value } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <Calculator className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900">حاسبة الطاقة الشمسية</h1>
          <p className="mt-4 text-lg text-gray-500">
            احسب استهلاكك واعرف حجم النظام الشمسي المناسب لمنشأتك
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <div className="mb-8">
              <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-2">
                اختر نوع المنشأة
              </label>
              <select
                id="facility"
                value={state.selectedFacilityId}
                onChange={handleFacilityChange}
                className="block w-full rounded-md border-gray-300 py-3 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm bg-gray-50 border border-gray-200"
              >
                <option value="" disabled>اختر من القائمة...</option>
                {FACILITY_TYPES.map(facility => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {state.devices.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">الأجهزة الكهربائية</h3>
                  <button
                    onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="h-4 w-4 ml-1" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القدرة (واط)</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات التشغيل/يوم</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العدد</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراء</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {state.devices.map((device, index) => (
                        // eslint-disable-next-line no-unused-vars
                        <motion.tr
                          key={device.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              value={device.name}
                              onChange={(e) => handleUpdateDevice(device.id, 'name', e.target.value)}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              value={device.power}
                              onChange={(e) => handleUpdateDevice(device.id, 'power', e.target.value)}
                              className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              max="24"
                              value={device.hours}
                              onChange={(e) => handleUpdateDevice(device.id, 'hours', e.target.value)}
                              className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="1"
                              value={device.quantity}
                              onChange={(e) => handleUpdateDevice(device.id, 'quantity', e.target.value)}
                              className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
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
              </div>
            )}

            {state.devices.length === 0 && state.selectedFacilityId && (
              <div className="text-center py-12 text-gray-500">
                لا توجد أجهزة مضافة. قم بإضافة أجهزة لحساب الاستهلاك.
              </div>
            )}
            {state.devices.length === 0 && !state.selectedFacilityId && (
               <div className="text-center py-12 text-gray-500">
                الرجاء اختيار نوع المنشأة من القائمة أعلاه أو إضافة أجهزة يدوياً.
             </div>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-blue-50 p-6 sm:p-8 border-t border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-blue-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">إجمالي الاستهلاك اليومي</p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {totalConsumptionWh >= 1000 ? (totalConsumptionWh / 1000).toFixed(2) + ' kWh' : totalConsumptionWh + ' Wh'}
                  </p>
                </div>
              </div>
              <div className="bg-blue-600 rounded-lg p-6 shadow-md flex items-center justify-between text-white">
                <div>
                  <p className="text-sm font-medium text-blue-100">حجم النظام الشمسي المقترح (تقديري)</p>
                  <p className="mt-1 text-4xl font-bold">
                    {requiredSystemSizeKW.toFixed(2)} kW
                  </p>
                  <p className="mt-2 text-xs text-blue-200">* شامل نسبة الأمان وفواقد النظام</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
