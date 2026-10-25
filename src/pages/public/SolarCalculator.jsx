import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { FACILITY_TYPES, calculateSolarRequirements } from '../../models/SolarCalculatorModel';
import { PlusCircle, Trash2, Calculator } from 'lucide-react';

const initialState = {
  facilityType: '',
  appliances: [{ id: 1, name: '', quantity: 1, powerWatts: 0, hoursPerDay: 0 }],
  results: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY':
      return { ...state, facilityType: action.payload };
    case 'ADD_APPLIANCE':
      return {
        ...state,
        appliances: [
          ...state.appliances,
          { id: Date.now(), name: '', quantity: 1, powerWatts: 0, hoursPerDay: 0 }
        ]
      };
    case 'UPDATE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.map(app =>
          app.id === action.payload.id ? { ...app, [action.payload.field]: action.payload.value } : app
        )
      };
    case 'REMOVE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.filter(app => app.id !== action.payload)
      };
    case 'CALCULATE':
      return {
        ...state,
        results: calculateSolarRequirements(state.appliances)
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCalculate = (e) => {
    e.preventDefault();
    dispatch({ type: 'CALCULATE' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="text-lg text-gray-600">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك واستهلاكك
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <form onSubmit={handleCalculate}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نوع المنشأة
              </label>
              <select
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                value={state.facilityType}
                onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
                required
              >
                <option value="">اختر نوع المنشأة...</option>
                {FACILITY_TYPES.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">الأجهزة الكهربائية</h3>
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <PlusCircle className="w-5 h-5 ml-1" />
                  إضافة جهاز
                </button>
              </div>

              {state.appliances.map((appliance) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={appliance.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-4 bg-gray-50 p-4 rounded-md"
                >
                  <div className="md:col-span-3">
                    <label className="block text-xs text-gray-500 mb-1">اسم الجهاز</label>
                    <input
                      type="text"
                      required
                      className="w-full border-gray-300 rounded-md p-2 border text-sm"
                      placeholder="مثال: مكيف، ثلاجة..."
                      value={appliance.name}
                      onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: appliance.id, field: 'name', value: e.target.value } })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-500 mb-1">العدد</label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="w-full border-gray-300 rounded-md p-2 border text-sm"
                      value={appliance.quantity}
                      onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: appliance.id, field: 'quantity', value: Number(e.target.value) } })}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs text-gray-500 mb-1">القدرة (واط)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      className="w-full border-gray-300 rounded-md p-2 border text-sm"
                      value={appliance.powerWatts}
                      onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: appliance.id, field: 'powerWatts', value: Number(e.target.value) } })}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs text-gray-500 mb-1">ساعات العمل/يوم</label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="24"
                      className="w-full border-gray-300 rounded-md p-2 border text-sm"
                      value={appliance.hoursPerDay}
                      onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: appliance.id, field: 'hoursPerDay', value: Number(e.target.value) } })}
                    />
                  </div>
                  <div className="md:col-span-1 flex justify-center md:justify-end mt-4 md:mt-0">
                    <button
                      type="button"
                      onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: appliance.id })}
                      className="text-red-500 hover:text-red-700 disabled:opacity-50"
                      disabled={state.appliances.length === 1}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 flex justify-center items-center font-medium text-lg"
            >
              <Calculator className="w-5 h-5 ml-2" />
              احسب الاحتياجات
            </button>
          </form>
        </div>

        {state.results && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white shadow rounded-lg p-6 border-t-4 border-green-500"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">النتائج التقديرية</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800 mb-1">الاستهلاك اليومي الكلي</p>
                <p className="text-2xl font-bold text-green-900">
                  {(state.results.totalDailyEnergyWh / 1000).toFixed(2)} <span className="text-lg font-normal">كيلوواط/ساعة</span>
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800 mb-1">أقصى حمل متوقع</p>
                <p className="text-2xl font-bold text-blue-900">
                  {(state.results.maxPowerW / 1000).toFixed(2)} <span className="text-lg font-normal">كيلوواط</span>
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-800 mb-1">سعة الألواح الشمسية المطلوبة</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {(state.results.requiredSolarPanelCapacityW / 1000).toFixed(2)} <span className="text-lg font-normal">كيلوواط</span>
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-800 mb-1">سعة الانفرتر (العاكس) المطلوبة</p>
                <p className="text-2xl font-bold text-purple-900">
                  {(state.results.requiredInverterCapacityW / 1000).toFixed(2)} <span className="text-lg font-normal">كيلوواط</span>
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-6 text-center">
              * هذه الحسابات تقديرية وتعتمد على متوسط الإشعاع الشمسي (5 ساعات يومياً) وكفاءة النظام (80%). يرجى استشارة مهندس مختص للحصول على تصميم دقيق.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
