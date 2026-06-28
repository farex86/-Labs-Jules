import React, { useReducer, useMemo } from 'react';
import {
  SOLAR_CONSTANTS,
  FACILITY_TYPES,
  DEVICE_CATALOG,
  FACILITY_PRESETS
} from '../../lib/solarConstants';
import { calculateSolarSystem } from '../../lib/solarCalculator';
import { Plus, Trash2, Sun, Battery, Zap, PanelTop } from 'lucide-react';

const initialState = {
  facilityType: '',
  appliances: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY_TYPE': {
      const type = action.payload;
      const presets = FACILITY_PRESETS[type] || [];
      return {
        ...state,
        facilityType: type,
        appliances: presets.map(p => ({ ...p, id: Math.random().toString(36).substr(2, 9) }))
      };
    }
    case 'ADD_APPLIANCE':
      return {
        ...state,
        appliances: [...state.appliances, {
          id: Math.random().toString(36).substr(2, 9),
          device: '',
          power_w: 0,
          quantity: 1,
          hours: 1
        }]
      };
    case 'REMOVE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.filter(app => app.id !== action.payload)
      };
    case 'UPDATE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.map(app =>
          app.id === action.payload.id ? { ...app, ...action.payload.updates } : app
        )
      };
    case 'SELECT_DEVICE_FROM_CATALOG': {
      const { id, catalogDeviceId } = action.payload;
      const device = DEVICE_CATALOG.find(d => d.id === catalogDeviceId);
      if (!device) return state;

      return {
        ...state,
        appliances: state.appliances.map(app =>
          app.id === id ? { ...app, device: device.name, power_w: device.power_w } : app
        )
      };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const results = useMemo(() => {
    return calculateSolarSystem(state.appliances, SOLAR_CONSTANTS);
  }, [state.appliances]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 text-gray-900 dark:text-gray-100" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <Sun className="text-yellow-500" size={32} />
            الحاسبة الشمسية
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع المنشأة والأجهزة المستخدمة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Selection */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium mb-2">نوع المنشأة</label>
              <select
                className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={state.facilityType}
                onChange={(e) => dispatch({ type: 'SET_FACILITY_TYPE', payload: e.target.value })}
              >
                <option value="">-- اختر نوع المنشأة --</option>
                {FACILITY_TYPES.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Appliances List */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">الأجهزة (الأحمال)</h2>
                <button
                  onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  <Plus size={16} /> إضافة جهاز
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-right">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="p-3 font-semibold">الجهاز</th>
                      <th className="p-3 font-semibold">القدرة (واط)</th>
                      <th className="p-3 font-semibold">العدد</th>
                      <th className="p-3 font-semibold">ساعات التشغيل</th>
                      <th className="p-3 font-semibold w-16"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.appliances.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-gray-500">
                          لا توجد أجهزة. اختر نوع المنشأة أو أضف جهازاً يدوياً.
                        </td>
                      </tr>
                    ) : (
                      state.appliances.map(app => (
                        <tr key={app.id} className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-2">
                            <div className="flex flex-col gap-1">
                              <input
                                type="text"
                                className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded"
                                value={app.device}
                                placeholder="اسم الجهاز"
                                onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, updates: { device: e.target.value } } })}
                              />
                              <select
                                className="w-full p-1 text-xs bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-gray-600 dark:text-gray-400"
                                onChange={(e) => {
                                  if(e.target.value) {
                                    dispatch({ type: 'SELECT_DEVICE_FROM_CATALOG', payload: { id: app.id, catalogDeviceId: e.target.value } })
                                    e.target.value = "";
                                  }
                                }}
                              >
                                <option value="">+ اختر من القائمة الشائعة</option>
                                {DEVICE_CATALOG.map(d => (
                                  <option key={d.id} value={d.id}>{d.name} ({d.power_w}W)</option>
                                ))}
                              </select>
                            </div>
                          </td>
                          <td className="p-2">
                            <input
                              type="number"
                              min="0"
                              className="w-24 p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded"
                              value={app.power_w}
                              onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, updates: { power_w: Number(e.target.value) } } })}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="number"
                              min="1"
                              className="w-20 p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded"
                              value={app.quantity}
                              onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, updates: { quantity: Number(e.target.value) } } })}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="number"
                              min="0"
                              max="24"
                              className="w-20 p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded"
                              value={app.hours}
                              onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, updates: { hours: Number(e.target.value) } } })}
                            />
                          </td>
                          <td className="p-2">
                            <button
                              onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg sticky top-8">
              <h2 className="text-xl font-semibold mb-6 border-b border-blue-500 pb-4">النتائج المقدرة للنظام</h2>

              <div className="space-y-6">

                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 p-3 rounded-lg"><PanelTop size={24} /></div>
                  <div>
                    <p className="text-blue-100 text-sm">عدد الألواح الشمسية ({SOLAR_CONSTANTS.PANEL_WATTAGE}W)</p>
                    <p className="text-2xl font-bold">{results.numberOfPanels} لوح</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 p-3 rounded-lg"><Zap size={24} /></div>
                  <div>
                    <p className="text-blue-100 text-sm">حجم الانفرتر (المحول)</p>
                    <p className="text-2xl font-bold">{results.inverterSizeW > 1000 ? (results.inverterSizeW/1000).toFixed(1) + ' kW' : results.inverterSizeW + ' W'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 p-3 rounded-lg"><Battery size={24} /></div>
                  <div>
                    <p className="text-blue-100 text-sm">سعة البطاريات (48V)</p>
                    <p className="text-2xl font-bold">{results.batteryCapacityAh.toLocaleString()} Ah</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-blue-500">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-blue-100">إجمالي الاستهلاك اليومي:</span>
                    <span className="font-semibold">{(results.totalDailyEnergyWh / 1000).toFixed(1)} kWh</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-100">إجمالي الحمل (القدرة):</span>
                    <span className="font-semibold">{(results.totalPowerW / 1000).toFixed(1)} kW</span>
                  </div>
                </div>

              </div>

              <div className="mt-8 text-xs text-blue-200 bg-blue-700/50 p-4 rounded-lg">
                <p>ملاحظة: هذه الحسابات تقديرية وتعتمد على ساعات سطوع شمس تبلغ {SOLAR_CONSTANTS.PEAK_SUN_HOURS} ساعات، وعمق تفريغ للبطارية بنسبة {SOLAR_CONSTANTS.BATTERY_DEPTH_OF_DISCHARGE*100}%.</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
