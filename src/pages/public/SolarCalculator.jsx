import React, { useReducer } from 'react';
import { Plus, Trash2, Calculator } from 'lucide-react';
import { FACILITY_TYPES, DEVICE_PRESETS, calculateSolarRequirements } from '../../models/SolarCalculatorModel';

const initialState = {
  facilityType: '',
  devices: [],
  results: null,
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY':
      return { ...state, facilityType: action.payload };
    case 'ADD_DEVICE':
      return { ...state, devices: [...state.devices, action.payload] };
    case 'UPDATE_DEVICE': {
      const updatedDevices = [...state.devices];
      updatedDevices[action.payload.index] = action.payload.device;
      return { ...state, devices: updatedDevices };
    }
    case 'REMOVE_DEVICE':
      return {
        ...state,
        devices: state.devices.filter((_, i) => i !== action.payload),
      };
    case 'CALCULATE':
      return {
        ...state,
        results: calculateSolarRequirements(state.devices),
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handleAddDevice = () => {
    dispatch({
      type: 'ADD_DEVICE',
      payload: { name: '', quantity: 1, power: 0, hours: 0 },
    });
  };

  const handleAddPreset = (preset) => {
    dispatch({
      type: 'ADD_DEVICE',
      payload: { ...preset, quantity: 1 },
    });
  };

  const handleUpdateDevice = (index, field, value) => {
    const device = { ...state.devices[index], [field]: value };
    dispatch({
      type: 'UPDATE_DEVICE',
      payload: { index, device },
    });
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    dispatch({ type: 'CALCULATE' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك واستهلاك أجهزتك
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleCalculate} className="space-y-6">

            {/* Facility Type Selection */}
            <div>
              <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-2">
                نوع المنشأة
              </label>
              <select
                id="facility"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                value={state.facilityType}
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

            {/* Quick Presets */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">إضافة سريعة:</h3>
              <div className="flex flex-wrap gap-2">
                {DEVICE_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddPreset(preset)}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="-ml-1 mr-2 h-4 w-4" />
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Devices List */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">الأجهزة والاستهلاك</h3>
                <button
                  type="button"
                  onClick={handleAddDevice}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" />
                  إضافة جهاز
                </button>
              </div>

              {state.devices.length === 0 ? (
                <div className="text-center py-6 bg-gray-50 rounded-md border-2 border-dashed border-gray-300">
                  <p className="text-sm text-gray-500">لا توجد أجهزة مضافة. قم بإضافة جهاز للبدء في الحساب.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.devices.map((device, index) => (
                    <div key={index} className="flex items-end gap-4 bg-gray-50 p-4 rounded-md border border-gray-200">
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">اسم الجهاز</label>
                        <input
                          type="text"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                          value={device.name}
                          onChange={(e) => handleUpdateDevice(index, 'name', e.target.value)}
                          placeholder="مثال: مكيف"
                        />
                      </div>
                      <div className="w-24">
                        <label className="block text-xs font-medium text-gray-700 mb-1">العدد</label>
                        <input
                          type="number"
                          min="1"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                          value={device.quantity}
                          onChange={(e) => handleUpdateDevice(index, 'quantity', e.target.value)}
                        />
                      </div>
                      <div className="w-24">
                        <label className="block text-xs font-medium text-gray-700 mb-1">القدرة (واط)</label>
                        <input
                          type="number"
                          min="0"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                          value={device.power}
                          onChange={(e) => handleUpdateDevice(index, 'power', e.target.value)}
                        />
                      </div>
                      <div className="w-32">
                        <label className="block text-xs font-medium text-gray-700 mb-1">ساعات التشغيل</label>
                        <input
                          type="number"
                          min="0"
                          step="0.5"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                          value={device.hours}
                          onChange={(e) => handleUpdateDevice(index, 'hours', e.target.value)}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: index })}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                        title="حذف الجهاز"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={state.devices.length === 0}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Calculator className="-ml-1 mr-2 h-5 w-5" />
                احسب الاحتياجات
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {state.results && (
          <div className="bg-white shadow rounded-lg p-6 border-t-4 border-green-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">النتائج المقدرة:</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-600 font-semibold mb-1">إجمالي الاستهلاك اليومي</p>
                <p className="text-2xl font-bold text-blue-900">{state.results.totalDailyEnergy} <span className="text-base font-normal">واط/ساعة</span></p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-600 font-semibold mb-1">إجمالي الحمل (القدرة)</p>
                <p className="text-2xl font-bold text-purple-900">{state.results.totalPower} <span className="text-base font-normal">واط</span></p>
              </div>

              <div className="bg-amber-50 rounded-lg p-4">
                <p className="text-sm text-amber-600 font-semibold mb-1">سعة الألواح الشمسية المطلوبة</p>
                <p className="text-2xl font-bold text-amber-900">{state.results.solarArrayCapacity} <span className="text-base font-normal">واط</span></p>
              </div>

              <div className="bg-emerald-50 rounded-lg p-4">
                <p className="text-sm text-emerald-600 font-semibold mb-1">سعة المحول (الإنفرتر) المطلوبة</p>
                <p className="text-2xl font-bold text-emerald-900">{state.results.inverterCapacity} <span className="text-base font-normal">واط</span></p>
              </div>

              <div className="bg-indigo-50 rounded-lg p-4 md:col-span-2">
                <p className="text-sm text-indigo-600 font-semibold mb-1">سعة البطاريات المطلوبة (نظام 48 فولت)</p>
                <p className="text-2xl font-bold text-indigo-900">{state.results.batteryCapacity} <span className="text-base font-normal">أمبير/ساعة</span></p>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500 bg-gray-50 p-4 rounded-md">
              <p><strong>ملاحظة هامة:</strong> هذه الحسابات تقديرية وتعتمد على افتراضات معينة (مثل 5 ساعات من ذروة الشمس وكفاءة النظام). للحصول على تصميم دقيق، يرجى استشارة مهندس طاقة شمسية مختص.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default SolarCalculator;
