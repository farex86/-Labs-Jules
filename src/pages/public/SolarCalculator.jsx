import React, { useReducer } from 'react';
import { facilityTypes, calculateTotalConsumption, calculateSolarSystemSize } from '../../models/SolarCalculatorModel';
import { Plus, Trash2, Calculator } from 'lucide-react';

const initialState = {
  selectedFacility: null,
  devices: [],
  totalConsumption: 0,
  systemSize: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facility = facilityTypes.find(f => f.id === action.payload);
      // Deep copy to prevent mutating the original constants
      const devices = facility ? facility.devices.map(d => ({ ...d })) : [];
      return {
        ...state,
        selectedFacility: facility,
        devices: devices,
        totalConsumption: calculateTotalConsumption(devices),
        systemSize: calculateSolarSystemSize(calculateTotalConsumption(devices)),
      };
    }
    case 'ADD_DEVICE': {
      const newDevicesAdd = [...state.devices, { name: '', power: 0, qty: 1, hours: 1 }];
      return {
        ...state,
        devices: newDevicesAdd,
        totalConsumption: calculateTotalConsumption(newDevicesAdd),
        systemSize: calculateSolarSystemSize(calculateTotalConsumption(newDevicesAdd)),
      };
    }
    case 'UPDATE_DEVICE': {
      const { index, field, value } = action.payload;
      const newDevicesUpdate = [...state.devices];
      newDevicesUpdate[index] = { ...newDevicesUpdate[index], [field]: value };
      return {
        ...state,
        devices: newDevicesUpdate,
        totalConsumption: calculateTotalConsumption(newDevicesUpdate),
        systemSize: calculateSolarSystemSize(calculateTotalConsumption(newDevicesUpdate)),
      };
    }
    case 'REMOVE_DEVICE': {
      const newDevicesRemove = state.devices.filter((_, i) => i !== action.payload);
      return {
        ...state,
        devices: newDevicesRemove,
        totalConsumption: calculateTotalConsumption(newDevicesRemove),
        systemSize: calculateSolarSystemSize(calculateTotalConsumption(newDevicesRemove)),
      };
    }
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <div className="flex items-center text-white">
              <Calculator className="h-6 w-6 ml-2" />
              <h2 className="text-xl font-bold">حاسبة الطاقة الشمسية</h2>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اختر نوع المنشأة
              </label>
              <select
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                onChange={(e) => dispatch({ type: 'SELECT_FACILITY', payload: e.target.value })}
                value={state.selectedFacility?.id || ''}
              >
                <option value="">-- اختر --</option>
                {facilityTypes.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {state.selectedFacility && (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">الأجهزة الكهربائية</h3>
                    <button
                      onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                    >
                      <Plus className="h-4 w-4 ml-1" />
                      إضافة جهاز
                    </button>
                  </div>

                  <div className="space-y-4">
                    {state.devices.map((device, index) => (
                      <div key={index} className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">الجهاز</label>
                            <input
                              type="text"
                              value={device.name}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { index, field: 'name', value: e.target.value } })}
                              className="w-full border-gray-300 rounded-md shadow-sm p-2 border sm:text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">القدرة (واط)</label>
                            <input
                              type="number"
                              value={device.power}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { index, field: 'power', value: Number(e.target.value) } })}
                              className="w-full border-gray-300 rounded-md shadow-sm p-2 border sm:text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">العدد</label>
                            <input
                              type="number"
                              value={device.qty}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { index, field: 'qty', value: Number(e.target.value) } })}
                              className="w-full border-gray-300 rounded-md shadow-sm p-2 border sm:text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">ساعات التشغيل</label>
                            <input
                              type="number"
                              value={device.hours}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { index, field: 'hours', value: Number(e.target.value) } })}
                              className="w-full border-gray-300 rounded-md shadow-sm p-2 border sm:text-sm"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: index })}
                          className="text-red-500 hover:text-red-700 mt-5"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-100">
                  <h3 className="text-lg font-medium text-blue-900 mb-4">النتائج التقديرية</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <div className="text-sm text-gray-500 mb-1">الاستهلاك اليومي التقريبي</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {state.totalConsumption.toFixed(2)} <span className="text-sm font-normal text-gray-500">كيلو واط ساعة / يوم</span>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <div className="text-sm text-gray-500 mb-1">حجم النظام الشمسي المقترح</div>
                      <div className="text-2xl font-bold text-blue-600">
                        {state.systemSize.toFixed(2)} <span className="text-sm font-normal text-gray-500">كيلو واط (kW)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
