import React, { useReducer, useMemo } from 'react';
import { Calculator, Plus, Trash2, Sun, Zap, Info } from 'lucide-react';
import {
  FACILITY_TYPES,
  calculateTotalConsumption,
  calculateSystemSize
} from '../../models/SolarCalculatorModel';

// Reducer for managing calculator state
const initialState = {
  selectedFacilityId: '',
  devices: [],
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      return {
        ...state,
        selectedFacilityId: action.payload,
        // Deep copy devices to prevent mutating constant data
        devices: facility ? facility.devices.map(d => ({ ...d })) : [],
      };
    }

    case 'ADD_DEVICE': {
      return {
        ...state,
        devices: [
          ...state.devices,
          {
            id: Date.now().toString(),
            name: 'جهاز جديد',
            power: 100,
            hours: 8,
            quantity: 1
          }
        ],
      };
    }

    case 'UPDATE_DEVICE': {
      return {
        ...state,
        devices: state.devices.map(device =>
          device.id === action.payload.id
            ? { ...device, [action.payload.field]: action.payload.value }
            : device
        ),
      };
    }

    case 'REMOVE_DEVICE': {
      return {
        ...state,
        devices: state.devices.filter(device => device.id !== action.payload),
      };
    }

    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  // Derived state calculated purely during render
  const dailyConsumptionWh = useMemo(() => calculateTotalConsumption(state.devices), [state.devices]);
  const systemSizeKw = useMemo(() => calculateSystemSize(dailyConsumptionWh), [dailyConsumptionWh]);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SELECT_FACILITY', payload: e.target.value });
  };

  const updateDevice = (id, field, value) => {
    dispatch({
      type: 'UPDATE_DEVICE',
      payload: {
        id,
        field,
        // Convert to number for numeric fields
        value: field === 'name' ? value : (Number(value) || 0)
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Sun className="h-12 w-12 text-yellow-500 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">الحاسبة الشمسية</h1>
          </div>
          <p className="text-lg text-gray-600">احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-10 border-b border-gray-200">
            <div className="mb-8">
              <label htmlFor="facility" className="block text-lg font-medium text-gray-700 mb-3">
                اختر نوع المنشأة
              </label>
              <select
                id="facility"
                value={state.selectedFacilityId}
                onChange={handleFacilityChange}
                className="block w-full text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg rounded-md p-3 border"
              >
                <option value="">-- اختر المنشأة --</option>
                {FACILITY_TYPES.map(facility => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {state.selectedFacilityId && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">الأجهزة والاستهلاك</h3>
                  <button
                    onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">اسم الجهاز</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القدرة (واط)</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات التشغيل</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العدد</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراء</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {state.devices.map((device) => (
                        <tr key={device.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              value={device.name}
                              onChange={(e) => updateDevice(device.id, 'name', e.target.value)}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              value={device.power}
                              onChange={(e) => updateDevice(device.id, 'power', e.target.value)}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              max="24"
                              value={device.hours}
                              onChange={(e) => updateDevice(device.id, 'hours', e.target.value)}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="1"
                              value={device.quantity}
                              onChange={(e) => updateDevice(device.id, 'quantity', e.target.value)}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
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
                        </tr>
                      ))}
                      {state.devices.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                            لا توجد أجهزة مضافة. انقر على "إضافة جهاز" للبدء.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-50 p-6 sm:p-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calculator className="ml-3 h-6 w-6 text-blue-600" />
              النتائج التقديرية
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-blue-100 flex items-start">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <div className="mr-5">
                  <p className="text-sm font-medium text-gray-500 mb-1">الاستهلاك اليومي الكلي</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {(dailyConsumptionWh / 1000).toFixed(2)} <span className="text-lg font-medium text-gray-500">كيلو واط/ساعة</span>
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-blue-100 flex items-start">
                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                  <Sun className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="mr-5">
                  <p className="text-sm font-medium text-gray-500 mb-1">حجم النظام الشمسي المقترح</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {systemSizeKw.toFixed(1)} <span className="text-lg font-medium text-gray-500">كيلو واط</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-start bg-blue-100 p-4 rounded-md">
              <Info className="flex-shrink-0 h-5 w-5 text-blue-600 mt-0.5 ml-3" />
              <p className="text-sm text-blue-800">
                ملاحظة: هذه الحسابات تقديرية وتفترض متوسط 5 ساعات من ذروة الشمس يومياً وكفاءة نظام بنسبة 80٪. يُنصح باستشارة خبير طاقة شمسية للحصول على دراسة دقيقة لمنشأتك.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
