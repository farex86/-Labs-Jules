import React, { useReducer } from 'react';
import {
  FACILITY_TYPES,
  getDefaultDevices,
  calculateTotalEnergy,
  calculateRequiredPanels,
  calculateInverterCapacity,
  calculateBatteryCapacity
} from '../../models/SolarCalculatorModel';
import { Plus, Trash2, Calculator } from 'lucide-react';

const initialState = {
  facilityType: '',
  devices: [],
  results: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY_TYPE': {
      const defaultDevices = getDefaultDevices(action.payload);
      return {
        ...state,
        facilityType: action.payload,
        devices: defaultDevices.length > 0 ? [...defaultDevices] : [{ id: Date.now(), name: '', power: '', quantity: 1, hours: 1 }],
        results: null
      };
    }
    case 'ADD_DEVICE':
      return {
        ...state,
        devices: [...state.devices, { id: Date.now(), name: '', power: '', quantity: 1, hours: 1 }],
        results: null
      };
    case 'UPDATE_DEVICE': {
      const updatedDevices = state.devices.map(device =>
        device.id === action.payload.id ? { ...device, [action.payload.field]: action.payload.value } : device
      );
      return { ...state, devices: updatedDevices, results: null };
    }
    case 'REMOVE_DEVICE':
      return {
        ...state,
        devices: state.devices.filter(device => device.id !== action.payload),
        results: null
      };
    case 'CALCULATE': {
      // Filter out invalid devices
      const validDevices = state.devices.filter(d => d.name && Number(d.power) > 0 && Number(d.quantity) > 0 && Number(d.hours) > 0);

      if (validDevices.length === 0) {
        return state;
      }

      const totalEnergy = calculateTotalEnergy(validDevices);
      const panels = calculateRequiredPanels(totalEnergy);
      const inverter = calculateInverterCapacity(validDevices);
      const batteries = calculateBatteryCapacity(totalEnergy);

      return {
        ...state,
        results: {
          totalEnergy,
          panels,
          inverter,
          batteries
        }
      };
    }
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
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
            <Calculator className="h-8 w-8 text-blue-600" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع المنشأة والأجهزة المستخدمة.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-6">
            <label htmlFor="facilityType" className="block text-sm font-medium text-gray-700 mb-2">
              نوع المنشأة
            </label>
            <select
              id="facilityType"
              value={state.facilityType}
              onChange={(e) => dispatch({ type: 'SET_FACILITY_TYPE', payload: e.target.value })}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="" disabled>اختر نوع المنشأة...</option>
              {FACILITY_TYPES.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {state.facilityType && (
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">الأجهزة الكهربائية</h3>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="-ml-1 mr-2 h-4 w-4" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="space-y-4">
                  {state.devices.map((device) => (
                    <div key={device.id} className="flex flex-wrap items-end gap-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs font-medium text-gray-500 mb-1">اسم الجهاز</label>
                        <input
                          type="text"
                          value={device.name}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'name', value: e.target.value } })}
                          placeholder="مثال: مكيف، ثلاجة..."
                          className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                      </div>
                      <div className="w-24">
                        <label className="block text-xs font-medium text-gray-500 mb-1">القدرة (واط)</label>
                        <input
                          type="number"
                          min="0"
                          value={device.power}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'power', value: e.target.value } })}
                          className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                      </div>
                      <div className="w-20">
                        <label className="block text-xs font-medium text-gray-500 mb-1">العدد</label>
                        <input
                          type="number"
                          min="1"
                          value={device.quantity}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'quantity', value: e.target.value } })}
                          className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                      </div>
                      <div className="w-24">
                        <label className="block text-xs font-medium text-gray-500 mb-1">ساعات العمل</label>
                        <input
                          type="number"
                          min="1"
                          max="24"
                          value={device.hours}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'hours', value: e.target.value } })}
                          className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                        className="inline-flex items-center p-2 border border-transparent rounded-md text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        title="حذف الجهاز"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleCalculate}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  احسب الاحتياجات
                </button>
              </div>
            </div>
          )}
        </div>

        {state.results && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 border-b pb-2">النتائج التقديرية</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-800">إجمالي الاستهلاك اليومي</p>
                <p className="mt-1 text-2xl font-semibold text-blue-900">
                  {state.results.totalEnergy > 1000
                    ? `${(state.results.totalEnergy / 1000).toFixed(2)} كيلو واط ساعة`
                    : `${state.results.totalEnergy} واط ساعة`}
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm font-medium text-green-800">الألواح الشمسية المطلوبة (400W)</p>
                <p className="mt-1 text-2xl font-semibold text-green-900">
                  {state.results.panels} لوح
                </p>
                <p className="text-xs text-green-600 mt-1">بافتراض 5 ساعات شمس ذروة</p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4">
                <p className="text-sm font-medium text-yellow-800">سعة العاكس (Inverter) المطلوبة</p>
                <p className="mt-1 text-2xl font-semibold text-yellow-900">
                  {state.results.inverter > 1000
                    ? `${(state.results.inverter / 1000).toFixed(2)} كيلو واط`
                    : `${state.results.inverter.toFixed(0)} واط`}
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm font-medium text-purple-800">سعة البطاريات المطلوبة (12V)</p>
                <p className="mt-1 text-2xl font-semibold text-purple-900">
                  {state.results.batteries.toFixed(0)} أمبير-ساعة
                </p>
                <p className="text-xs text-purple-600 mt-1">بافتراض استقلالية ليوم واحد وتفريغ 50%</p>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500 bg-gray-50 p-3 rounded">
              <strong>ملاحظة:</strong> هذه الحسابات تقديرية وتفترض كفاءة قياسية للنظام. يرجى استشارة مهندس طاقة شمسية للحصول على تصميم دقيق يلبي احتياجاتك الفعلية.
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SolarCalculator;
