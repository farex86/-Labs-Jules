import React, { useReducer } from 'react';
import { Plus, Trash2, Calculator } from 'lucide-react';
import {
  FACILITY_TYPES,
  calculateTotalConsumption,
  calculateSystemSize,
  calculateBatteryCapacity
} from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacility: '',
  devices: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facilityId = action.payload;
      const facility = FACILITY_TYPES.find(f => f.id === facilityId);
      const newDevices = facility
        ? facility.defaultDevices.map(device => ({ ...device, id: Date.now().toString() + Math.random().toString() }))
        : [];
      return {
        ...state,
        selectedFacility: facilityId,
        devices: newDevices,
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
    case 'ADD_DEVICE': {
      const newDevice = {
        id: Date.now().toString() + Math.random().toString(),
        name: '',
        quantity: 1,
        power: 0,
        hours: 0
      };
      return {
        ...state,
        devices: [...state.devices, newDevice]
      };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedFacility, devices } = state;

  const totalConsumption = calculateTotalConsumption(devices);
  const systemSize = calculateSystemSize(totalConsumption);
  const batteryCapacity = calculateBatteryCapacity(totalConsumption);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
            <Calculator className="h-8 w-8 text-blue-600" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع المنشأة وأجهزتك
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <label htmlFor="facility-type" className="block text-sm font-medium text-gray-700 mb-2">
            اختر نوع المنشأة
          </label>
          <select
            id="facility-type"
            value={selectedFacility}
            onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">-- اختر من القائمة --</option>
            {FACILITY_TYPES.map(facility => (
              <option key={facility.id} value={facility.id}>
                {facility.name}
              </option>
            ))}
          </select>
        </div>

        {devices.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">الأجهزة والاستهلاك</h2>
              <button
                onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 ml-2" />
                إضافة جهاز
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-right font-medium text-gray-500">الجهاز</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-500">العدد</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-500">القدرة (واط)</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-500">ساعات التشغيل</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-500">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {devices.map((device) => (
                    <tr key={device.id}>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={device.name}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'name', value: e.target.value } })}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="اسم الجهاز"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="1"
                          value={device.quantity}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'quantity', value: parseFloat(e.target.value) || 0 } })}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          value={device.power}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'power', value: parseFloat(e.target.value) || 0 } })}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={device.hours}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'hours', value: parseFloat(e.target.value) || 0 } })}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                          className="text-red-600 hover:text-red-900 focus:outline-none"
                          title="حذف الجهاز"
                        >
                          <Trash2 className="h-5 w-5 mx-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-medium text-blue-900 mb-4">النتائج التقديرية</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-md shadow-sm border border-blue-100">
                  <p className="text-sm text-gray-500 mb-1">الاستهلاك اليومي الكلي</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(totalConsumption / 1000).toFixed(2)} <span className="text-sm font-medium text-gray-500">كيلو واط ساعة (kWh)</span>
                  </p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm border border-blue-100">
                  <p className="text-sm text-gray-500 mb-1">حجم النظام الشمسي المقترح</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(systemSize / 1000).toFixed(2)} <span className="text-sm font-medium text-gray-500">كيلو واط (kW)</span>
                  </p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm border border-blue-100">
                  <p className="text-sm text-gray-500 mb-1">سعة البطاريات المطلوبة (48V)</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.ceil(batteryCapacity)} <span className="text-sm font-medium text-gray-500">أمبير ساعة (Ah)</span>
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">
                * هذه الحسابات تقديرية وتعتمد على كفاءة النظام وساعات سطوع الشمس. يرجى استشارة مهندس مختص للحصول على تصميم دقيق.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
