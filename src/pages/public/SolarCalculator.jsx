import React, { useReducer, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Calculator, Zap, Battery, Sun, Plus, Trash2, Home, Activity } from 'lucide-react';
import { FACILITY_TYPES, calculateTotalConsumption, calculateSolarSystem } from '../../models/SolarCalculatorModel';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const initialState = {
  selectedFacilityId: '',
  devices: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      if (!facility) return { ...state, selectedFacilityId: '', devices: [] };
      return {
        ...state,
        selectedFacilityId: action.payload,
        // Deep copy devices to prevent mutation of the constant
        devices: facility.devices.map(d => ({ ...d, uniqueId: crypto.randomUUID() })),
      };
    }
    case 'UPDATE_DEVICE': {
      const { id, field, value } = action.payload;
      return {
        ...state,
        devices: state.devices.map(d =>
          d.uniqueId === id ? { ...d, [field]: Number(value) || 0 } : d
        ),
      };
    }
    case 'ADD_DEVICE': {
      return {
        ...state,
        devices: [
          ...state.devices,
          {
            uniqueId: crypto.randomUUID(),
            id: 'custom',
            name: 'جهاز جديد',
            watts: 100,
            quantity: 1,
            hours: 4
          }
        ]
      };
    }
    case 'REMOVE_DEVICE': {
      return {
        ...state,
        devices: state.devices.filter(d => d.uniqueId !== action.payload)
      };
    }
    case 'UPDATE_DEVICE_NAME': {
        const { id, value } = action.payload;
        return {
          ...state,
          devices: state.devices.map(d =>
            d.uniqueId === id ? { ...d, name: value } : d
          ),
        };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Derive results from state
  const { dailyEnergyWh, peakLoadW } = useMemo(() => calculateTotalConsumption(state.devices), [state.devices]);
  const systemSpecs = useMemo(() => {
    if (dailyEnergyWh === 0 && peakLoadW === 0) return null;
    return calculateSolarSystem(dailyEnergyWh, peakLoadW);
  }, [dailyEnergyWh, peakLoadW]);

  // Data for Recharts
  const chartData = useMemo(() => {
    return state.devices.map(d => ({
      name: d.name,
      consumption: (d.watts * d.quantity * d.hours) / 1000 // in kWh
    })).filter(d => d.consumption > 0);
  }, [state.devices]);


  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-4 bg-yellow-100 rounded-full mb-4"
          >
            <Calculator className="h-8 w-8 text-yellow-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl font-extrabold text-gray-900 tracking-tight"
          >
            حاسبة الطاقة الشمسية
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-gray-500"
          >
            اختر نوع المنشأة لحساب الاستهلاك التقديري والنظام الشمسي المناسب
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Input (Facilities & Devices) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Selector */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white shadow rounded-xl p-6"
            >
              <label htmlFor="facility" className="block text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Home className="h-5 w-5 text-gray-400" />
                نوع المنشأة
              </label>
              <select
                id="facility"
                value={state.selectedFacilityId}
                onChange={(e) => dispatch({ type: 'SELECT_FACILITY', payload: e.target.value })}
                className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md"
              >
                <option value="">-- اختر المنشأة --</option>
                {FACILITY_TYPES.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Devices List */}
            {state.devices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow rounded-xl p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-yellow-500" />
                    الأجهزة والاستهلاك
                  </h2>
                  <button
                    onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    <Plus className="h-4 w-4 ml-1" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاستهلاك (واط)</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العدد</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات العمل/يوم</th>
                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">إجراء</span></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {state.devices.map((device) => (
                        <tr key={device.uniqueId}>
                          <td className="px-6 py-4 whitespace-nowrap">
                             <input
                              type="text"
                              value={device.name}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE_NAME', payload: { id: device.uniqueId, value: e.target.value } })}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              value={device.watts}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.uniqueId, field: 'watts', value: e.target.value } })}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="1"
                              value={device.quantity}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.uniqueId, field: 'quantity', value: e.target.value } })}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              max="24"
                              value={device.hours}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.uniqueId, field: 'hours', value: e.target.value } })}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.uniqueId })}
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
              </motion.div>
            )}

            {/* Chart */}
            {chartData.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white shadow rounded-xl p-6"
                >
                    <h3 className="text-lg font-medium text-gray-900 mb-4">توزيع الاستهلاك اليومي (كيلوواط/ساعة)</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" width={100} />
                                <Tooltip />
                                <Bar dataKey="consumption" fill="#eab308" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            )}
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-1 space-y-6">
            {systemSpecs ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-900 rounded-xl shadow-xl overflow-hidden text-white"
              >
                <div className="p-6 bg-gray-800">
                  <h3 className="text-xl font-bold text-yellow-400 mb-1">النتائج التقديرية</h3>
                  <p className="text-gray-400 text-sm">بناءً على المعطيات المدخلة</p>
                </div>

                <div className="p-6 space-y-8">
                  {/* Total Consumption */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="h-6 w-6 text-yellow-500" />
                      <h4 className="text-lg font-semibold">إجمالي الاستهلاك</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div className="bg-gray-800 rounded-lg p-3">
                        <p className="text-gray-400 text-xs mb-1">الاستهلاك اليومي</p>
                        <p className="text-xl font-bold">{systemSpecs.dailyEnergykWh} <span className="text-sm font-normal">kWh</span></p>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <p className="text-gray-400 text-xs mb-1">الحمل الأقصى</p>
                        <p className="text-xl font-bold">{systemSpecs.peakLoadkW} <span className="text-sm font-normal">kW</span></p>
                      </div>
                    </div>
                  </div>

                  {/* System Recommendation */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">النظام الشمسي المقترح</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4">
                        <div className="p-2 bg-gray-800 rounded-lg">
                          <Sun className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">الألواح الشمسية</p>
                          <p className="text-sm text-gray-400">
                            {systemSpecs.panels.count} لوح ({systemSpecs.panels.wattage}W)
                          </p>
                          <p className="text-xs text-yellow-500 mt-1">إجمالي {systemSpecs.panels.totalCapacitykW} kW</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="p-2 bg-gray-800 rounded-lg">
                          <Battery className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium">بنك البطاريات</p>
                          <p className="text-sm text-gray-400">
                            {systemSpecs.battery.capacityAh} Ah @ {systemSpecs.battery.voltage}V
                          </p>
                          <p className="text-xs text-green-500 mt-1">سعة {systemSpecs.battery.capacitykWh} kWh</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="p-2 bg-gray-800 rounded-lg">
                          <Activity className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="font-medium">محول الطاقة (Inverter)</p>
                          <p className="text-sm text-gray-400">
                            قدرة مقترحة: {systemSpecs.inverter.capacitykW} kW
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500 border-2 border-dashed border-gray-200">
                <Calculator className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p>قم باختيار المنشأة أو إضافة أجهزة لحساب النظام الشمسي المناسب.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
