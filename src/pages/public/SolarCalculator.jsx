import React, { useReducer, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Calculator, Plus, Trash2, Zap } from 'lucide-react';
import { facilityTypes, calculateTotalConsumption, getFacilityById } from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacilityId: '',
  devices: [],
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facility = getFacilityById(action.payload);
      return {
        ...state,
        selectedFacilityId: action.payload,
        // Deep copy the standard devices
        devices: facility ? facility.devices.map(d => ({ ...d })) : [],
      };
    }
    case 'ADD_DEVICE': {
      const newDevice = {
        id: Date.now().toString(), // Will be pure-ish as it's triggered by user action, but safe enough here.
        name: 'جهاز جديد',
        quantity: 1,
        powerW: 100,
        hoursPerDay: 5,
      };
      return {
        ...state,
        devices: [...state.devices, newDevice],
      };
    }
    case 'UPDATE_DEVICE': {
      const { id, field, value } = action.payload;
      return {
        ...state,
        devices: state.devices.map(device =>
          device.id === id ? { ...device, [field]: value } : device
        ),
      };
    }
    case 'REMOVE_DEVICE': {
      return {
        ...state,
        devices: state.devices.filter(device => device.id !== action.payload),
      };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const totalConsumptionWh = useMemo(() => {
    return calculateTotalConsumption(state.devices);
  }, [state.devices]);

  const totalConsumptionKWh = (totalConsumptionWh / 1000).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4" dir="rtl">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block p-4 rounded-full bg-blue-100 text-blue-600 mb-4"
          >
            <Calculator size={40} />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">حاسبة الطاقة الشمسية</h1>
          <p className="text-gray-600">احسب استهلاكك اليومي من الطاقة لتحديد حجم النظام الشمسي المناسب.</p>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6 md:p-8">

            {/* Facility Selection */}
            <div className="mb-8">
              <label htmlFor="facility-select" className="block text-sm font-medium text-gray-700 mb-2">
                اختر نوع المنشأة
              </label>
              <select
                id="facility-select"
                value={state.selectedFacilityId}
                onChange={(e) => dispatch({ type: 'SELECT_FACILITY', payload: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50"
              >
                <option value="">-- اختر المنشأة --</option>
                {facilityTypes.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Devices Table / List */}
            {state.devices.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">الأجهزة الكهربائية</h2>
                  <button
                    onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                    className="flex items-center gap-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    <Plus size={16} />
                    إضافة جهاز
                  </button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-gray-50 text-gray-600 font-medium">
                      <tr>
                        <th className="px-4 py-3">اسم الجهاز</th>
                        <th className="px-4 py-3 w-24">العدد</th>
                        <th className="px-4 py-3 w-32">القدرة (واط)</th>
                        <th className="px-4 py-3 w-32">ساعات العمل</th>
                        <th className="px-4 py-3 w-16 text-center">إزالة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {state.devices.map((device, index) => (
                        <motion.tr
                          key={device.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={device.name}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'name', value: e.target.value } })}
                              className="w-full bg-transparent border-none focus:ring-0 p-0 text-gray-900 placeholder-gray-400"
                              placeholder="اسم الجهاز"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              min="1"
                              value={device.quantity}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'quantity', value: Number(e.target.value) } })}
                              className="w-full bg-white border border-gray-200 rounded px-2 py-1 text-center focus:ring-1 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              min="0"
                              value={device.powerW}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'powerW', value: Number(e.target.value) } })}
                              className="w-full bg-white border border-gray-200 rounded px-2 py-1 text-center focus:ring-1 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              min="0"
                              max="24"
                              value={device.hoursPerDay}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'hoursPerDay', value: Number(e.target.value) } })}
                              className="w-full bg-white border border-gray-200 rounded px-2 py-1 text-center focus:ring-1 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                              className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!state.selectedFacilityId && state.devices.length === 0 && (
              <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                <Zap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">ابدأ الحساب</h3>
                <p className="text-gray-500">الرجاء اختيار نوع المنشأة من القائمة أعلاه للبدء.</p>
              </div>
            )}

            {/* Results Section */}
            {state.devices.length > 0 && (
              <div className="mt-8 p-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl text-white shadow-inner">
                <h3 className="text-lg font-medium opacity-90 mb-2">إجمالي الاستهلاك اليومي المقدر</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-bold">{totalConsumptionKWh}</span>
                  <span className="text-xl opacity-80">كيلوواط ساعة (kWh)</span>
                </div>
                <p className="mt-4 text-sm opacity-75 leading-relaxed">
                  هذا التقدير مبني على البيانات المدخلة. ينصح بإضافة هامش أمان بنسبة 20-30% عند تصميم النظام الشمسي الفعلي لتعويض الفواقد في النظام.
                </p>
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </div>
  );
}
