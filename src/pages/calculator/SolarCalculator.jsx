import React, { useState, useEffect, useReducer } from 'react';
import { Calculator, Sun, Battery, Zap, Plus, Trash2, Edit2, Check, PanelTop } from 'lucide-react';
import { CONSUMPTION_PATTERNS } from '../../lib/calculator/constants';
import { calculateSystemRequirements } from '../../lib/calculator/logic';

const initialState = {
  selectedPattern: null,
  devices: [],
  systemRequirements: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PATTERN': {
      const pattern = CONSUMPTION_PATTERNS.find(p => p.id === action.payload);
      const devices = pattern ? JSON.parse(JSON.stringify(pattern.defaultDevices)) : [];
      return { ...state, selectedPattern: action.payload, devices };
    }
    case 'ADD_DEVICE':
      return {
        ...state,
        devices: [...state.devices, { id: Date.now().toString(), name: 'جهاز جديد', quantity: 1, watts: 100, hours: 1 }]
      };
    case 'UPDATE_DEVICE':
      return {
        ...state,
        devices: state.devices.map(device =>
          device.id === action.payload.id ? { ...device, ...action.payload.updates } : device
        )
      };
    case 'REMOVE_DEVICE':
      return {
        ...state,
        devices: state.devices.filter(device => device.id !== action.payload)
      };
    case 'CALCULATE':
      return {
        ...state,
        systemRequirements: calculateSystemRequirements(state.devices)
      };
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [editingDeviceId, setEditingDeviceId] = useState(null);

  // Recalculate whenever devices change
  useEffect(() => {
    dispatch({ type: 'CALCULATE' });
  }, [state.devices]);

  const handleDeviceChange = (id, field, value) => {
    let parsedValue = value;
    if (field === 'quantity' || field === 'watts' || field === 'hours') {
      parsedValue = parseFloat(value) || 0;
    }
    dispatch({ type: 'UPDATE_DEVICE', payload: { id, updates: { [field]: parsedValue } } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <Calculator className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900">حاسبة الطاقة الشمسية</h1>
          <p className="mt-4 text-lg text-gray-600">
            اختر نمط الاستهلاك الخاص بك أو قم بإدخال الأجهزة يدوياً لحساب حجم النظام الشمسي المناسب لاحتياجاتك.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 border-b pb-3 text-gray-800 flex items-center">
            <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 ml-2 font-bold">1</span>
            اختر نمط الاستهلاك
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {CONSUMPTION_PATTERNS.map((pattern) => (
              <button
                key={pattern.id}
                onClick={() => dispatch({ type: 'SET_PATTERN', payload: pattern.id })}
                className={`p-3 text-sm font-medium rounded-lg border text-center transition-all duration-200 ${
                  state.selectedPattern === pattern.id
                    ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm ring-1 ring-blue-500'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {pattern.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-100">
          <div className="flex justify-between items-center mb-4 border-b pb-3">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 ml-2 font-bold">2</span>
              الأجهزة واستهلاك الطاقة
            </h2>
            <button
              onClick={() => dispatch({ type: 'ADD_DEVICE' })}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Plus className="ml-2 -mr-1 h-5 w-5" />
              إضافة جهاز
            </button>
          </div>

          {state.devices.length === 0 ? (
            <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              لم يتم تحديد أي أجهزة. اختر نمط استهلاك من الأعلى أو قم بإضافة جهاز يدوياً.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العدد</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القدرة (واط)</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات التشغيل/يوم</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجمالي (واط.ساعة)</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {state.devices.map((device) => (
                    <tr key={device.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingDeviceId === device.id ? (
                          <input
                            type="text"
                            value={device.name}
                            onChange={(e) => handleDeviceChange(device.id, 'name', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1 border"
                          />
                        ) : (
                          <div className="text-sm font-medium text-gray-900">{device.name}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingDeviceId === device.id ? (
                          <input
                            type="number"
                            min="1"
                            value={device.quantity}
                            onChange={(e) => handleDeviceChange(device.id, 'quantity', e.target.value)}
                            className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1 border"
                          />
                        ) : (
                          <div className="text-sm text-gray-900">{device.quantity}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingDeviceId === device.id ? (
                          <input
                            type="number"
                            min="0"
                            value={device.watts}
                            onChange={(e) => handleDeviceChange(device.id, 'watts', e.target.value)}
                            className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1 border"
                          />
                        ) : (
                          <div className="text-sm text-gray-900">{device.watts} W</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingDeviceId === device.id ? (
                          <input
                            type="number"
                            min="0"
                            max="24"
                            value={device.hours}
                            onChange={(e) => handleDeviceChange(device.id, 'hours', e.target.value)}
                            className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1 border"
                          />
                        ) : (
                          <div className="text-sm text-gray-900">{device.hours} h</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">
                        {(device.quantity * device.watts * device.hours).toLocaleString()} Wh
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {editingDeviceId === device.id ? (
                          <button
                            onClick={() => setEditingDeviceId(null)}
                            className="text-green-600 hover:text-green-900 ml-3"
                          >
                            <Check className="h-5 w-5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditingDeviceId(device.id)}
                            className="text-blue-600 hover:text-blue-900 ml-3"
                          >
                            <Edit2 className="h-5 w-5" />
                          </button>
                        )}
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {state.systemRequirements && state.devices.length > 0 && (
           <div className="bg-white shadow-xl rounded-xl overflow-hidden border-t-4 border-green-500">
             <div className="p-6">
               <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                 <span className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 ml-2 font-bold text-lg">3</span>
                 متطلبات النظام المقترحة
               </h2>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                 {/* Energy Card */}
                 <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                   <div className="flex items-center justify-between mb-3">
                     <h3 className="text-sm font-medium text-blue-800">الاستهلاك اليومي</h3>
                     <Zap className="h-5 w-5 text-blue-500" />
                   </div>
                   <p className="text-3xl font-bold text-blue-900">
                     {state.systemRequirements.totalDailyEnergyKWh.toFixed(2)}
                   </p>
                   <p className="text-xs text-blue-600 mt-1">كيلو واط ساعة (kWh)</p>
                 </div>

                 {/* Panels Card */}
                 <div className="bg-yellow-50 rounded-lg p-5 border border-yellow-100">
                   <div className="flex items-center justify-between mb-3">
                     <h3 className="text-sm font-medium text-yellow-800">الألواح الشمسية</h3>
                     <Sun className="h-5 w-5 text-yellow-500" />
                   </div>
                   <p className="text-3xl font-bold text-yellow-900">
                     {state.systemRequirements.numberOfPanels}
                   </p>
                   <p className="text-xs text-yellow-600 mt-1">لوح ({state.systemRequirements.panelWattage} واط)</p>
                 </div>

                 {/* Inverter Card */}
                 <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
                   <div className="flex items-center justify-between mb-3">
                     <h3 className="text-sm font-medium text-purple-800">سعة الانفرتر (المحول)</h3>
                     <PanelTop className="h-5 w-5 text-purple-500" />
                   </div>
                   <p className="text-3xl font-bold text-purple-900">
                     {state.systemRequirements.inverterCapacityKW.toFixed(2)}
                   </p>
                   <p className="text-xs text-purple-600 mt-1">كيلو واط (kW) كحد أدنى</p>
                 </div>

                 {/* Battery Card */}
                 <div className="bg-green-50 rounded-lg p-5 border border-green-100">
                   <div className="flex items-center justify-between mb-3">
                     <h3 className="text-sm font-medium text-green-800">سعة البطاريات</h3>
                     <Battery className="h-5 w-5 text-green-500" />
                   </div>
                   <p className="text-3xl font-bold text-green-900">
                     {Math.ceil(state.systemRequirements.batteryCapacityAh)}
                   </p>
                   <p className="text-xs text-green-600 mt-1">أمبير ساعة (Ah) @ {state.systemRequirements.systemVoltage}V</p>
                 </div>

               </div>

               <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                 <p className="text-sm text-gray-600 flex items-start">
                   <span className="text-amber-500 ml-2 font-bold">ملاحظة هامة:</span>
                   هذه الحسابات تقديرية وتعتمد على المتوسطات. يوصى دائماً باستشارة مهندس طاقة شمسية متخصص قبل شراء أو تركيب أي نظام لضمان توافقه التام مع ظروفك وموقعك الفعلي.
                 </p>
               </div>
             </div>
           </div>
        )}
      </div>
    </div>
  );
}
