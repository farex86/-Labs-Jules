import React, { useState, useReducer, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Plus, Trash2, Zap, Settings, RefreshCcw } from 'lucide-react';
import {
  FACILITY_TYPES,
  calculateDailyConsumption,
  estimateSystemSize,
  getDefaultAppliancesForFacility
} from '../../models/SolarCalculatorModel';

// Reducer for handling appliance list updates
const appliancesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_APPLIANCES':
      return action.payload;
    case 'UPDATE_APPLIANCE':
      return state.map(app =>
        app.id === action.payload.id ? { ...app, [action.payload.field]: action.payload.value } : app
      );
    case 'ADD_APPLIANCE':
      return [
        ...state,
        {
          id: Date.now().toString(),
          name: 'جهاز جديد',
          power: 100,
          quantity: 1,
          hoursPerDay: 5
        }
      ];
    case 'REMOVE_APPLIANCE':
      return state.filter(app => app.id !== action.payload.id);
    case 'RESET_FACILITY':
      return getDefaultAppliancesForFacility(action.payload.facilityId);
    default:
      return state;
  }
};

const SolarCalculator = () => {
  const [selectedFacility, setSelectedFacility] = useState(FACILITY_TYPES[0].id);
  const [appliances, dispatch] = useReducer(
    appliancesReducer,
    FACILITY_TYPES[0].id,
    getDefaultAppliancesForFacility
  );

  // Derived state to avoid setting state in useEffect
  const dailyConsumptionWh = useMemo(() => calculateDailyConsumption(appliances), [appliances]);
  const estimatedSystemSizeKW = useMemo(() => estimateSystemSize(dailyConsumptionWh), [dailyConsumptionWh]);

  const handleFacilityChange = (e) => {
    const facilityId = e.target.value;
    setSelectedFacility(facilityId);
    dispatch({ type: 'RESET_FACILITY', payload: { facilityId } });
  };

  const handleApplianceUpdate = (id, field, value) => {
    // Only allow non-negative numbers for number fields
    if (['power', 'quantity', 'hoursPerDay'].includes(field)) {
      if (value === '' || Number(value) < 0) return;
    }
    dispatch({ type: 'UPDATE_APPLIANCE', payload: { id, field, value } });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-right p-4 md:p-8 font-sans" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
      >
        {/* Header Section */}
        <div className="bg-blue-600 p-6 text-white text-center rounded-t-xl">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <Zap className="w-8 h-8 text-yellow-300" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="text-blue-100">
            احسب استهلاكك للطاقة والقدرة التقديرية لنظام الطاقة الشمسية المناسب لك.
          </p>
        </div>

        <div className="p-6 md:p-8">
          {/* Facility Type Selector */}
          <div className="mb-8">
            <label className="block text-gray-700 text-lg font-semibold mb-3 flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-500" />
              اختر نوع المنشأة
            </label>
            <select
              value={selectedFacility}
              onChange={handleFacilityChange}
              className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition shadow-sm outline-none"
            >
              {FACILITY_TYPES.map(facility => (
                <option key={facility.id} value={facility.id}>
                  {facility.name}
                </option>
              ))}
            </select>
          </div>

          {/* Appliances List */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">الأجهزة الكهربائية</h2>
              <button
                onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition text-sm shadow-sm"
              >
                <Plus className="w-4 h-4" />
                إضافة جهاز
              </button>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
              <table className="w-full text-right text-gray-700 min-w-[600px]">
                <thead className="bg-gray-100 border-b border-gray-200 text-gray-600 font-semibold">
                  <tr>
                    <th className="p-3 w-1/4">الجهاز</th>
                    <th className="p-3 w-1/5 text-center">القدرة (واط)</th>
                    <th className="p-3 w-1/5 text-center">العدد</th>
                    <th className="p-3 w-1/5 text-center">ساعات العمل/يوم</th>
                    <th className="p-3 w-1/12 text-center">إزالة</th>
                  </tr>
                </thead>
                <tbody>
                  {appliances.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-6 text-center text-gray-500">
                        لا توجد أجهزة مضافة.
                      </td>
                    </tr>
                  ) : (
                    appliances.map((app) => (
                      <motion.tr
                        key={app.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="p-3">
                          <input
                            type="text"
                            value={app.name}
                            onChange={(e) => handleApplianceUpdate(app.id, 'name', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                            placeholder="اسم الجهاز"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <input
                            type="number"
                            min="0"
                            value={app.power}
                            onChange={(e) => handleApplianceUpdate(app.id, 'power', e.target.value)}
                            className="w-20 p-2 border border-gray-300 rounded text-center focus:ring-1 focus:ring-blue-500 outline-none"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <input
                            type="number"
                            min="1"
                            value={app.quantity}
                            onChange={(e) => handleApplianceUpdate(app.id, 'quantity', e.target.value)}
                            className="w-16 p-2 border border-gray-300 rounded text-center focus:ring-1 focus:ring-blue-500 outline-none"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max="24"
                            value={app.hoursPerDay}
                            onChange={(e) => handleApplianceUpdate(app.id, 'hoursPerDay', e.target.value)}
                            className="w-16 p-2 border border-gray-300 rounded text-center focus:ring-1 focus:ring-blue-500 outline-none"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: { id: app.id } })}
                            className="text-red-500 hover:text-red-700 transition p-1 rounded hover:bg-red-50"
                            title="إزالة"
                          >
                            <Trash2 className="w-5 h-5 mx-auto" />
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-3">
              <button
                onClick={() => dispatch({ type: 'RESET_FACILITY', payload: { facilityId: selectedFacility } })}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition"
              >
                <RefreshCcw className="w-4 h-4" />
                إعادة ضبط الأجهزة الافتراضية
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">النتائج التقديرية</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Daily Consumption Card */}
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">الاستهلاك اليومي</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-800">
                      {(dailyConsumptionWh / 1000).toFixed(2)}
                    </span>
                    <span className="text-sm font-semibold text-gray-600">كيلوواط.ساعة (kWh)</span>
                  </div>
                </div>
              </div>

              {/* System Size Card */}
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-full">
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">حجم النظام الشمسي المقترح</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-800">
                      {estimatedSystemSizeKW}
                    </span>
                    <span className="text-sm font-semibold text-gray-600">كيلوواط (kW)</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-6 text-center">
              ملاحظة: هذه الحسابات تقديرية وتعتمد على متوسط ساعات سطوع الشمس (5.5 ساعة/يوم) وكفاءة النظام (80%).
              للحصول على تصميم دقيق، يرجى استشارة مهندس مختص.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SolarCalculator;
