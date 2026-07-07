import React, { useReducer } from 'react';
import {
  FACILITY_TYPES,
  COMMON_DEVICES,
  FACILITY_PRESETS,
  calculateSolarSystemRequirements
} from '../../models/SolarCalculatorModel';
import { Calculator, Plus, Trash2, Zap, Sun, Battery, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const initialState = {
  facilityType: '',
  devices: [],
  results: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facilityId = action.payload;
      const presetDeviceIds = FACILITY_PRESETS[facilityId] || [];

      const newDevices = presetDeviceIds.map(id => {
        const deviceDef = COMMON_DEVICES.find(d => d.id === id);
        return {
          id: Math.random().toString(36).substr(2, 9),
          deviceId: id,
          name: deviceDef.name,
          watts: deviceDef.defaultWatts,
          qty: deviceDef.defaultQty,
          hours: deviceDef.defaultHours
        };
      });

      return { ...state, facilityType: facilityId, devices: newDevices, results: null };
    }
    case 'ADD_DEVICE': {
      const newDevice = {
        id: Math.random().toString(36).substr(2, 9),
        deviceId: 'custom',
        name: 'جهاز جديد',
        watts: 100,
        qty: 1,
        hours: 4
      };
      return { ...state, devices: [...state.devices, newDevice], results: null };
    }
    case 'UPDATE_DEVICE': {
      const { id, field, value } = action.payload;
      const newDevices = state.devices.map(device =>
        device.id === id ? { ...device, [field]: value } : device
      );

      // If changing device type, update defaults
      if (field === 'deviceId' && value !== 'custom') {
        const deviceDef = COMMON_DEVICES.find(d => d.id === value);
        if (deviceDef) {
          const idx = newDevices.findIndex(d => d.id === id);
          if (idx !== -1) {
             newDevices[idx] = {
               ...newDevices[idx],
               name: deviceDef.name,
               watts: deviceDef.defaultWatts,
               qty: deviceDef.defaultQty,
               hours: deviceDef.defaultHours
             };
          }
        }
      }

      return { ...state, devices: newDevices, results: null };
    }
    case 'REMOVE_DEVICE': {
      return {
        ...state,
        devices: state.devices.filter(d => d.id !== action.payload),
        results: null
      };
    }
    case 'CALCULATE': {
      const results = calculateSolarSystemRequirements(state.devices);
      return { ...state, results };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleCalculate = (e) => {
    e.preventDefault();
    dispatch({ type: 'CALCULATE' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="w-full max-w-4xl space-y-8">

        {/* Header */}
        <div className="text-center">
          <Calculator className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">حاسبة الطاقة الشمسية</h2>
          <p className="mt-2 text-sm text-gray-600">احسب احتياجاتك من الطاقة الشمسية بناءً على نوع المنشأة والأجهزة</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">

          {/* Facility Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">نوع المنشأة</label>
            <select
              value={state.facilityType}
              onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">اختر نوع المنشأة</option>
              {FACILITY_TYPES.map(facility => (
                <option key={facility.id} value={facility.id}>{facility.name}</option>
              ))}
            </select>
          </div>

          {/* Devices List */}
          {state.facilityType && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">الأجهزة الكهربائية</h3>
                <button
                  onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  إضافة جهاز
                </button>
              </div>

              <div className="space-y-4">
                {state.devices.map((device) => (
                  <div key={device.id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg bg-gray-50 items-start sm:items-center">

                    <div className="w-full sm:w-1/4">
                      <select
                        value={device.deviceId}
                        onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'deviceId', value: e.target.value } })}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="custom">جهاز مخصص</option>
                        {COMMON_DEVICES.map(cd => (
                          <option key={cd.id} value={cd.id}>{cd.name}</option>
                        ))}
                      </select>
                    </div>

                    {device.deviceId === 'custom' && (
                      <div className="w-full sm:w-1/4">
                        <input
                          type="text"
                          placeholder="اسم الجهاز"
                          value={device.name}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'name', value: e.target.value } })}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    )}

                    <div className="flex-1 grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-xs text-gray-500">الواط</label>
                        <input
                          type="number"
                          min="0"
                          value={device.watts}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'watts', value: Number(e.target.value) } })}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500">العدد</label>
                        <input
                          type="number"
                          min="1"
                          value={device.qty}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'qty', value: Number(e.target.value) } })}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500">ساعات التشغيل</label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={device.hours}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'hours', value: Number(e.target.value) } })}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}

                {state.devices.length === 0 && (
                   <p className="text-center text-gray-500 py-4">لم يتم إضافة أي أجهزة. الرجاء إضافة جهاز للحساب.</p>
                )}
              </div>

              <div className="mt-8 flex justify-center">
                 <button
                   onClick={handleCalculate}
                   disabled={state.devices.length === 0}
                   className="w-full sm:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                 >
                   احسب الاحتياجات
                 </button>
              </div>
            </div>
          )}

          {/* Results Section */}
          {state.results && (
            <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="text-xl font-bold text-blue-900 mb-6 text-center">النتائج التقديرية للنظام الشمسي</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4 ml-4">
                    <Sun className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">عدد الألواح المطلوبة (550W)</p>
                    <p className="text-2xl font-bold text-gray-900">{state.results.numberOfPanels} لوح</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4 ml-4">
                    <Battery className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">البطاريات المطلوبة (ليثيوم 48V 100Ah)</p>
                    <p className="text-2xl font-bold text-gray-900">{state.results.numberOfBatteries} بطارية</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-4 ml-4">
                    <Zap className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">حجم الإنفرتر (المحول)</p>
                    <p className="text-2xl font-bold text-gray-900">{state.results.inverterSizeKVA} kVA</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                  <div className="bg-purple-100 p-3 rounded-full mr-4 ml-4">
                    <Activity className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">الاستهلاك اليومي</p>
                    <p className="text-2xl font-bold text-gray-900">{(state.results.totalDailyWattHours / 1000).toFixed(1)} kWh</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-500 text-center">
                * هذه النتائج تقديرية وقد تختلف بناءً على ظروف الموقع وجودة المكونات وتغيير عادات الاستهلاك.
              </div>
            </div>
          )}

        </div>

        <div className="text-center">
           <button onClick={() => navigate('/login')} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
             العودة إلى صفحة الدخول
           </button>
        </div>
      </div>
    </div>
  );
}
