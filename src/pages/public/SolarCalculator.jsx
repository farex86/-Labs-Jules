import React, { useReducer, useMemo } from 'react';
import { Calculator, Plus, Trash2, Sun, Battery, Zap, Activity } from 'lucide-react';
import { FACILITY_TYPES, COMMON_DEVICES, calculateSolarRequirements } from '../../models/SolarCalculatorModel';

// State management
const initialState = {
  facilityType: '',
  devices: [],
  sunHours: 5.5,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY':
      return { ...state, facilityType: action.payload };
    case 'SET_SUN_HOURS':
      return { ...state, sunHours: action.payload };
    case 'ADD_DEVICE':
      return {
        ...state,
        devices: [
          ...state.devices,
          { id: Date.now().toString(), deviceId: '', power: 0, quantity: 1, hoursPerDay: 1 }
        ]
      };
    case 'REMOVE_DEVICE':
      return {
        ...state,
        devices: state.devices.filter(d => d.id !== action.payload)
      };
    case 'UPDATE_DEVICE': {
      const updatedDevices = state.devices.map(device => {
        if (device.id === action.payload.id) {
          const updatedDevice = { ...device, [action.payload.field]: action.payload.value };
          // Auto-fill power if a predefined device is selected
          if (action.payload.field === 'deviceId') {
            const commonDevice = COMMON_DEVICES.find(cd => cd.id === action.payload.value);
            if (commonDevice) {
              updatedDevice.power = commonDevice.defaultPower;
            }
          }
          return updatedDevice;
        }
        return device;
      });
      return { ...state, devices: updatedDevices };
    }
    case 'CLEAR_ALL':
      return { ...state, devices: [], facilityType: '' };
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Derived state (calculation results)
  const results = useMemo(() => {
    return calculateSolarRequirements(state.devices, state.sunHours);
  }, [state.devices, state.sunHours]);

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Calculator className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">الحاسبة الشمسية</h1>
          <p className="text-slate-600">احسب احتياجاتك من الطاقة الشمسية بناءً على استهلاكك اليومي</p>
        </div>

        {/* Input Section */}
        <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Facility Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  نوع المنشأة
                </label>
                <select
                  value={state.facilityType}
                  onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
                  className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right pr-3 pl-10"
                >
                  <option value="">اختر نوع المنشأة...</option>
                  {FACILITY_TYPES.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Sun Hours */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  ساعات سطوع الشمس (يومياً)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="12"
                  value={state.sunHours}
                  onChange={(e) => dispatch({ type: 'SET_SUN_HOURS', payload: parseFloat(e.target.value) || 0 })}
                  className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right pr-3"
                />
              </div>

            </div>
          </div>

          {/* Devices List */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-slate-900">الأجهزة الكهربائية (نمط الاستهلاك)</h2>
              <button
                onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                إضافة جهاز
              </button>
            </div>

            {state.devices.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                <p className="text-slate-500 mb-4">لم تقم بإضافة أي أجهزة بعد</p>
                <button
                  onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                  className="text-blue-600 font-medium hover:text-blue-700"
                >
                  انقر هنا لإضافة جهازك الأول
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {state.devices.map((device) => (
                  <div key={device.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-slate-50 p-4 rounded-lg border border-slate-200">

                    <div className="md:col-span-4">
                      <label className="block text-xs font-medium text-slate-500 mb-1">الجهاز</label>
                      <select
                        value={device.deviceId}
                        onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'deviceId', value: e.target.value } })}
                        className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                      >
                        <option value="">جهاز مخصص...</option>
                        {COMMON_DEVICES.map(cd => (
                          <option key={cd.id} value={cd.id}>{cd.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-slate-500 mb-1">القدرة (واط)</label>
                      <input
                        type="number"
                        min="0"
                        value={device.power}
                        onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'power', value: parseInt(e.target.value) || 0 } })}
                        className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm text-center"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-slate-500 mb-1">العدد</label>
                      <input
                        type="number"
                        min="1"
                        value={device.quantity}
                        onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'quantity', value: parseInt(e.target.value) || 0 } })}
                        className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm text-center"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-xs font-medium text-slate-500 mb-1">ساعات التشغيل (يومياً)</label>
                      <input
                        type="number"
                        min="0"
                        max="24"
                        step="0.5"
                        value={device.hoursPerDay}
                        onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'hoursPerDay', value: parseFloat(e.target.value) || 0 } })}
                        className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm text-center"
                      />
                    </div>

                    <div className="md:col-span-1 flex justify-end">
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        title="حذف الجهاز"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {state.devices.length > 0 && (
          <div className="bg-blue-600 rounded-xl shadow-lg overflow-hidden text-white">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">النتائج التقديرية للنظام</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* System Size */}
                <div className="bg-blue-700/50 p-6 rounded-xl flex flex-col items-center text-center border border-blue-500/30">
                  <Sun className="w-10 h-10 mb-3 text-blue-200" />
                  <span className="text-sm text-blue-200 mb-1">حجم النظام الشمسي</span>
                  <span className="text-3xl font-bold">{results.systemSizeKw} <span className="text-lg font-normal">kW</span></span>
                </div>

                {/* Daily Energy */}
                <div className="bg-blue-700/50 p-6 rounded-xl flex flex-col items-center text-center border border-blue-500/30">
                  <Activity className="w-10 h-10 mb-3 text-blue-200" />
                  <span className="text-sm text-blue-200 mb-1">الاستهلاك اليومي</span>
                  <span className="text-3xl font-bold">{results.totalDailyEnergy} <span className="text-lg font-normal">Wh</span></span>
                </div>

                {/* Inverter Size */}
                <div className="bg-blue-700/50 p-6 rounded-xl flex flex-col items-center text-center border border-blue-500/30">
                  <Zap className="w-10 h-10 mb-3 text-blue-200" />
                  <span className="text-sm text-blue-200 mb-1">حجم الانفرتر</span>
                  <span className="text-3xl font-bold">{results.inverterSizeW} <span className="text-lg font-normal">W</span></span>
                </div>

                {/* Battery Capacity */}
                <div className="bg-blue-700/50 p-6 rounded-xl flex flex-col items-center text-center border border-blue-500/30">
                  <Battery className="w-10 h-10 mb-3 text-blue-200" />
                  <span className="text-sm text-blue-200 mb-1">سعة البطاريات (24V)</span>
                  <span className="text-3xl font-bold">{results.batteryCapacityAh} <span className="text-lg font-normal">Ah</span></span>
                </div>

              </div>

              <div className="mt-8 text-center text-sm text-blue-200 bg-blue-800/30 p-4 rounded-lg">
                * هذه النتائج تقديرية وتعتمد على دقة البيانات المدخلة وافتراضات قياسية لخسائر النظام وساعات السطوع. يُنصح دائماً باستشارة مهندس مختص.
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
