import React, { useReducer } from 'react';
import { FACILITY_TYPES, calculateSolarRequirements } from '../../models/SolarCalculatorModel';
import { calculatorReducer } from '../../models/SolarCalculatorReducer';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';


const SolarCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, {
    facilityId: '',
    devices: []
  });

  const results = state.devices.length > 0 ? calculateSolarRequirements(state.devices) : null;

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="bg-blue-600 p-6 text-white text-center">
          <h1 className="text-3xl font-bold">حاسبة الطاقة الشمسية</h1>
          <p className="mt-2 opacity-90">احسب احتياجاتك من الطاقة بناءً على نوع منشأتك</p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">نوع المنشأة</label>
            <select
              value={state.facilityId}
              onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">-- اختر نوع المنشأة --</option>
              {FACILITY_TYPES.map(facility => (
                <option key={facility.id} value={facility.id}>{facility.name}</option>
              ))}
            </select>
          </div>

          {state.facilityId && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">الأجهزة (أنماط الاستهلاك)</h2>
                <button
                  onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  إضافة جهاز +
                </button>
              </div>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border">اسم الجهاز</th>
                      <th className="p-2 border">العدد</th>
                      <th className="p-2 border">القدرة (واط)</th>
                      <th className="p-2 border">ساعات التشغيل باليوم</th>
                      <th className="p-2 border">إجراء</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.devices.map(device => (
                      <tr key={device.id} className="hover:bg-gray-50">
                        <td className="p-2 border">
                          <input
                            type="text"
                            value={device.name}
                            onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, updates: { name: e.target.value } } })}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="p-2 border">
                          <input
                            type="number"
                            min="1"
                            value={device.quantity}
                            onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, updates: { quantity: parseInt(e.target.value) || 0 } } })}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="p-2 border">
                          <input
                            type="number"
                            min="0"
                            value={device.powerWatts}
                            onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, updates: { powerWatts: parseInt(e.target.value) || 0 } } })}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="p-2 border">
                          <input
                            type="number"
                            min="0"
                            max="24"
                            value={device.hours}
                            onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, updates: { hours: parseFloat(e.target.value) || 0 } } })}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="p-2 border text-center">
                          <button
                            onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                            className="text-red-500 hover:text-red-700 font-bold"
                          >
                            حذف
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {state.devices.length === 0 && (
                  <p className="text-center text-gray-500 my-4">لا توجد أجهزة مضافة. اضف أجهزة لحساب الاستهلاك.</p>
                )}
              </div>

              {results && (
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h2 className="text-2xl font-bold mb-4 text-blue-800">النتائج التقديرية</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded shadow-sm">
                      <p className="text-gray-600 text-sm">إجمالي الاستهلاك اليومي</p>
                      <p className="text-xl font-bold">{Math.round(results.totalDailyEnergyWh)} واط/ساعة</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                      <p className="text-gray-600 text-sm">أقصى قدرة تشغيلية (الحمل)</p>
                      <p className="text-xl font-bold">{results.maxPowerWatts} واط</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                      <p className="text-gray-600 text-sm">حجم المصفوفة الشمسية المقترح</p>
                      <p className="text-xl font-bold">{Math.round(results.requiredSolarArrayWatts)} واط</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                      <p className="text-gray-600 text-sm">سعة البطاريات المقترحة ({results.systemVoltage} فولت)</p>
                      <p className="text-xl font-bold">{Math.round(results.requiredBatteryCapacityAh)} أمبير-ساعة</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SolarCalculator;
