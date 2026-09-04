import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Plus, Trash2, Calculator, Info } from 'lucide-react';
import { facilityTypes, calculateSystemRequirements } from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacility: facilityTypes[0].id,
  appliances: [
    { id: 1, name: '', qty: 1, watts: 100, hours: 8 }
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY':
      return { ...state, selectedFacility: action.payload };
    case 'ADD_APPLIANCE':
      return {
        ...state,
        appliances: [
          ...state.appliances,
          { id: Date.now(), name: '', qty: 1, watts: 0, hours: 0 }
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
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const results = calculateSystemRequirements(state.appliances);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
            <Calculator className="w-8 h-8 text-blue-600" />
            الحاسبة الشمسية
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع المنشأة والأجهزة المستخدمة.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-gray-100 bg-blue-50/30">
            <h2 className="text-xl font-bold text-gray-800 mb-4">نوع المنشأة</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {facilityTypes.map((facility) => (
                <button
                  key={facility.id}
                  onClick={() => dispatch({ type: 'SET_FACILITY', payload: facility.id })}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                    state.selectedFacility === facility.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {facility.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">الأجهزة الكهربائية (أنماط الاستهلاك)</h2>
              <button
                onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                إضافة جهاز
              </button>
            </div>

            <div className="space-y-4">
              {/* Header for Desktop */}
              <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-semibold text-gray-500 pb-2 border-b">
                <div className="col-span-5">اسم الجهاز</div>
                <div className="col-span-2 text-center">العدد</div>
                <div className="col-span-2 text-center">القدرة (واط)</div>
                <div className="col-span-2 text-center">ساعات العمل</div>
                <div className="col-span-1"></div>
              </div>

              {state.appliances.map((app) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gray-50 p-4 md:p-0 md:bg-transparent rounded-xl md:rounded-none"
                >
                  <div className="col-span-1 md:col-span-5">
                    <label className="block text-xs text-gray-500 mb-1 md:hidden">اسم الجهاز</label>
                    <input
                      type="text"
                      placeholder="مثال: مكيف، ثلاجة، لمبات..."
                      value={app.name}
                      onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'name', value: e.target.value } })}
                      className="w-full rounded-lg border-gray-300 border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs text-gray-500 mb-1 md:hidden">العدد</label>
                    <input
                      type="number"
                      min="1"
                      value={app.qty}
                      onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'qty', value: Number(e.target.value) } })}
                      className="w-full text-center rounded-lg border-gray-300 border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs text-gray-500 mb-1 md:hidden">القدرة (واط)</label>
                    <input
                      type="number"
                      min="0"
                      value={app.watts}
                      onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'watts', value: Number(e.target.value) } })}
                      className="w-full text-center rounded-lg border-gray-300 border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs text-gray-500 mb-1 md:hidden">ساعات العمل يومياً</label>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      value={app.hours}
                      onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'hours', value: Number(e.target.value) } })}
                      className="w-full text-center rounded-lg border-gray-300 border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-1 flex justify-end md:justify-center">
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      disabled={state.appliances.length === 1}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl shadow-lg p-6 sm:p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Info className="w-6 h-6 text-blue-300" />
            النتيجة التقديرية للنظام
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 rounded-xl p-5 border border-white/20">
              <div className="text-blue-200 text-sm font-medium mb-2">إجمالي الاستهلاك اليومي</div>
              <div className="text-3xl font-bold">{results.dailyConsumptionWh.toLocaleString()} <span className="text-lg font-normal text-blue-200">واط/ساعة</span></div>
            </div>

            <div className="bg-white/10 rounded-xl p-5 border border-white/20">
              <div className="text-blue-200 text-sm font-medium mb-2">حجم الألواح المقدر</div>
              <div className="text-3xl font-bold">{results.panelsKw} <span className="text-lg font-normal text-blue-200">كيلو واط</span></div>
            </div>

            <div className="bg-white/10 rounded-xl p-5 border border-white/20">
              <div className="text-blue-200 text-sm font-medium mb-2">سعة البطاريات المقدرة</div>
              <div className="text-3xl font-bold">{results.batteryKwh} <span className="text-lg font-normal text-blue-200">كيلو واط/ساعة</span></div>
            </div>

            <div className="bg-white/10 rounded-xl p-5 border border-white/20">
              <div className="text-blue-200 text-sm font-medium mb-2">حجم المحول (الإنفرتر)</div>
              <div className="text-3xl font-bold">{results.inverterKw} <span className="text-lg font-normal text-blue-200">كيلو واط</span></div>
            </div>
          </div>

          <div className="mt-6 text-sm text-blue-200 bg-white/5 p-4 rounded-lg">
            <p><strong>ملاحظة:</strong> هذه الحسابات تقديرية وتعتمد على متوسط الإشعاع الشمسي (5 ساعات) وكفاءة نظام بنسبة 80%. للحصول على تصميم دقيق، يرجى استشارة مهندس طاقة شمسية.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SolarCalculator;
