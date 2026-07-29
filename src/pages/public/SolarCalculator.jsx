import React, { useReducer, useEffect } from 'react';
import { Settings, Plus, Trash2, Zap, Battery, Sun, Activity, Save } from 'lucide-react';
import {
  FACILITY_TYPES,
  DEFAULT_DEVICES,
  calculateTotalDailyConsumption,
  calculateSystemRequirements,
  calculateMaxSimultaneousLoad
} from '../../models/SolarCalculatorModel';

// State Reducer
const initialState = {
  selectedFacility: FACILITY_TYPES[0].id,
  devices: DEFAULT_DEVICES[FACILITY_TYPES[0].id] || [],
  results: {
    solarArrayKW: '0.00',
    batteryCapacityKWh: '0.00',
    dailyConsumptionKWh: '0.00',
    maxLoadKW: '0.00',
    inverterSizeKW: '0.00'
  }
};

function calculatorReducer(state, action) {
  let newState;
  switch (action.type) {
    case 'SET_FACILITY':
      newState = {
        ...state,
        selectedFacility: action.payload,
        devices: DEFAULT_DEVICES[action.payload] ? [...DEFAULT_DEVICES[action.payload]] : []
      };
      break;
    case 'ADD_DEVICE':
      newState = {
        ...state,
        devices: [
          ...state.devices,
          {
            id: `new_${Date.now()}`,
            name: 'جهاز جديد',
            power: 100,
            quantity: 1,
            hours: 4
          }
        ]
      };
      break;
    case 'UPDATE_DEVICE':
      newState = {
        ...state,
        devices: state.devices.map(device =>
          device.id === action.payload.id ? { ...device, [action.payload.field]: action.payload.value } : device
        )
      };
      break;
    case 'REMOVE_DEVICE':
      newState = {
        ...state,
        devices: state.devices.filter(device => device.id !== action.payload)
      };
      break;
    case 'CALCULATE': {
      const totalDailyWh = calculateTotalDailyConsumption(state.devices);
      const systemReqs = calculateSystemRequirements(totalDailyWh);
      const maxLoadReqs = calculateMaxSimultaneousLoad(state.devices);

      newState = {
        ...state,
        results: {
          ...systemReqs,
          ...maxLoadReqs
        }
      };
      break;
    }
    default:
      return state;
  }
  return newState;
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'CALCULATE' });
  }, [state.devices, state.selectedFacility]);

  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      {/* Header */}
      <header className="bg-emerald-600 text-white shadow-md py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">حاسبة الطاقة الشمسية</h1>
            <p className="mt-2 text-emerald-100">احسب احتياجاتك من الطاقة الشمسية بناءً على نمط استهلاكك</p>
          </div>
          <Sun className="h-12 w-12 text-yellow-300" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">

          {/* Facility Selection */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-emerald-600" />
              اختر نوع المنشأة
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {FACILITY_TYPES.map(facility => (
                <button
                  key={facility.id}
                  onClick={() => dispatch({ type: 'SET_FACILITY', payload: facility.id })}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors border
                    ${state.selectedFacility === facility.id
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-emerald-300'
                    }`}
                >
                  {facility.name}
                </button>
              ))}
            </div>
          </div>

          {/* Devices List */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                الأجهزة والأحمال
              </h2>
              <button
                onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-md hover:bg-emerald-200 transition-colors text-sm font-medium"
              >
                <Plus className="h-4 w-4" />
                إضافة جهاز
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right">
                <thead className="bg-gray-50 text-gray-600 border-b">
                  <tr>
                    <th className="px-4 py-3 rounded-tr-lg">اسم الجهاز</th>
                    <th className="px-4 py-3">القدرة (واط)</th>
                    <th className="px-4 py-3">العدد</th>
                    <th className="px-4 py-3">ساعات التشغيل</th>
                    <th className="px-4 py-3 rounded-tl-lg">إجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {state.devices.map((device) => (
                    <tr key={device.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={device.name}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'name', value: e.target.value }})}
                          className="w-full bg-transparent border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          value={device.power}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'power', value: e.target.value }})}
                          className="w-20 bg-transparent border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="1"
                          value={device.quantity}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'quantity', value: e.target.value }})}
                          className="w-16 bg-transparent border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="1" max="24"
                          value={device.hours}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'hours', value: e.target.value }})}
                          className="w-16 bg-transparent border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {state.devices.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                        لا توجد أجهزة مضافة. انقر على "إضافة جهاز" للبدء.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
            <div className="bg-emerald-600 text-white p-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Activity className="h-5 w-5" />
                النتائج الموصى بها
              </h2>
            </div>

            <div className="p-6 space-y-6">

              {/* Daily Consumption */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg shrink-0">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">الاستهلاك اليومي</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {state.results.dailyConsumptionKWh} <span className="text-sm font-normal text-gray-500">كيلوواط.ساعة</span>
                  </p>
                </div>
              </div>

              {/* Solar Panels */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-start gap-4">
                <div className="bg-yellow-100 text-yellow-600 p-2 rounded-lg shrink-0">
                  <Sun className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">حجم الألواح المطلوبة</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {state.results.solarArrayKW} <span className="text-sm font-normal text-gray-500">كيلوواط</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">بافتراض 5 ساعات شمس ذروة وكفاءة 80%</p>
                </div>
              </div>

              {/* Battery */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-start gap-4">
                <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg shrink-0">
                  <Battery className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">سعة البطاريات المطلوبة</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {state.results.batteryCapacityKWh} <span className="text-sm font-normal text-gray-500">كيلوواط.ساعة</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">تكفي ليوم واحد مع نسبة تفريغ 50%</p>
                </div>
              </div>

              {/* Inverter */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-start gap-4">
                <div className="bg-purple-100 text-purple-600 p-2 rounded-lg shrink-0">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">حجم العاكس (Inverter)</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {state.results.inverterSizeKW} <span className="text-sm font-normal text-gray-500">كيلوواط</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">استناداً إلى أقصى حمل متزامن + 20% أمان</p>
                </div>
              </div>

              <button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Save className="h-5 w-5" />
                حفظ التقرير (قريباً)
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
