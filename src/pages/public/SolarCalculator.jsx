import React, { useReducer } from 'react';
import { FACILITY_TYPES, calculateTotalConsumption, recommendSolarSystem } from '../../models/SolarCalculatorModel';
import { Calculator, Plus, Trash2, Battery, Sun, Zap, Info } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react';

// Form Reducer
const initialState = {
  facilityType: '',
  appliances: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      if (!facility) return { ...state, facilityType: action.payload, appliances: [] };
      return {
        ...state,
        facilityType: action.payload,
        // Deep copy the default appliances
        appliances: facility.defaultAppliances.map(app => ({ ...app, id: crypto.randomUUID() }))
      };
    }
    case 'ADD_APPLIANCE':
      return {
        ...state,
        appliances: [
          ...state.appliances,
          { id: crypto.randomUUID(), name: '', power: 0, qty: 1, hours: 0 }
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

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const results = React.useMemo(() => {
    if (state.appliances.length > 0) {
      const consumption = calculateTotalConsumption(state.appliances);
      const recommendation = recommendSolarSystem(consumption.dailyEnergyWh, consumption.peakPowerW);
      return { consumption, recommendation };
    }
    return null;
  }, [state.appliances]);



  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full text-blue-600 mb-4">
            <Calculator size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">حاسبة الطاقة الشمسية</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            احسب استهلاكك من الكهرباء واعرف حجم نظام الطاقة الشمسية المناسب لمنشأتك
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Selection */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                اختر نوع المنشأة للبدء بأنماط استهلاك جاهزة
              </label>
              <select
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-colors"
                value={state.facilityType}
                onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
              >
                <option value="">-- اختر نوع المنشأة --</option>
                {FACILITY_TYPES.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>

            {/* Appliances List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">الأجهزة الكهربائية</h2>
                <button
                  onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors text-sm font-medium"
                >
                  <Plus size={18} />
                  إضافة جهاز
                </button>
              </div>

              {state.appliances.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <Calculator className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-gray-500">قم باختيار نوع المنشأة أو إضافة أجهزة يدوياً</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Desktop Headers */}
                  <div className="hidden md:grid grid-cols-12 gap-4 px-4 text-sm font-semibold text-gray-500">
                    <div className="col-span-4">اسم الجهاز</div>
                    <div className="col-span-2">العدد</div>
                    <div className="col-span-2">القدرة (واط)</div>
                    <div className="col-span-3">ساعات التشغيل/يوم</div>
                    <div className="col-span-1"></div>
                  </div>

                  <AnimatePresence>
                    {state.appliances.map((app) => (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gray-50 p-4 rounded-xl border border-gray-100"
                      >
                        <div className="md:col-span-4">
                          <label className="block text-xs text-gray-500 mb-1 md:hidden">اسم الجهاز</label>
                          <input
                            type="text"
                            placeholder="مثال: مكيف، ثلاجة..."
                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={app.name}
                            onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'name', value: e.target.value } })}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-500 mb-1 md:hidden">العدد</label>
                          <input
                            type="number"
                            min="1"
                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={app.qty}
                            onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'qty', value: e.target.value } })}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-500 mb-1 md:hidden">القدرة (واط)</label>
                          <input
                            type="number"
                            min="0"
                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={app.power}
                            onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'power', value: e.target.value } })}
                          />
                        </div>
                        <div className="md:col-span-3">
                          <label className="block text-xs text-gray-500 mb-1 md:hidden">ساعات التشغيل باليوم</label>
                          <input
                            type="number"
                            min="0"
                            max="24"
                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={app.hours}
                            onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'hours', value: e.target.value } })}
                          />
                        </div>
                        <div className="md:col-span-1 flex justify-end">
                          <button
                            onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="حذف الجهاز"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">النتائج والتوصيات</h2>

              {!results ? (
                <div className="text-center py-8 text-gray-500 flex flex-col items-center">
                  <Info className="h-12 w-12 text-gray-300 mb-3" />
                  <p>أضف بعض الأجهزة لرؤية التوصيات</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Consumption Summary */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">ملخص الاستهلاك</h3>

                    <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4">
                      <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
                        <Zap size={24} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">الاستهلاك اليومي</div>
                        <div className="text-xl font-bold text-gray-900">
                          {results.consumption.dailyEnergyKWh.toFixed(1)} <span className="text-sm font-normal text-gray-500">كيلوواط.ساعة</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4">
                      <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                        <Calculator size={24} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">أقصى حمل (Peak)</div>
                        <div className="text-xl font-bold text-gray-900">
                          {results.consumption.peakPowerKW.toFixed(1)} <span className="text-sm font-normal text-gray-500">كيلوواط</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* System Recommendation */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">النظام المقترح</h3>

                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center gap-4">
                      <div className="p-3 bg-blue-500 text-white rounded-lg">
                        <Sun size={24} />
                      </div>
                      <div>
                        <div className="text-sm text-blue-600 font-medium">الألواح الشمسية</div>
                        <div className="text-xl font-bold text-gray-900">
                          {results.recommendation.pvArrayKW} <span className="text-sm font-normal text-gray-500">كيلوواط</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl flex items-center gap-4">
                      <div className="p-3 bg-purple-500 text-white rounded-lg">
                        <Zap size={24} />
                      </div>
                      <div>
                        <div className="text-sm text-purple-600 font-medium">الإنفرتر (المحول)</div>
                        <div className="text-xl font-bold text-gray-900">
                          {results.recommendation.inverterKW} <span className="text-sm font-normal text-gray-500">كيلوواط</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex items-center gap-4">
                      <div className="p-3 bg-green-500 text-white rounded-lg">
                        <Battery size={24} />
                      </div>
                      <div>
                        <div className="text-sm text-green-600 font-medium">البطاريات (لتشغيل يوم كامل)</div>
                        <div className="text-xl font-bold text-gray-900">
                          {results.recommendation.batteryKWh} <span className="text-sm font-normal text-gray-500">كيلوواط.ساعة</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          حوالي {results.recommendation.batteryAh48V} أمبير-ساعة (نظام 48 فولت)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl mt-4">
                     <p className="text-xs text-blue-800 leading-relaxed text-center">
                       هذه التوصيات تقريبية وتعتمد على متوسط الإشعاع الشمسي. يُنصح باستشارة مهندس طاقة شمسية للحصول على تصميم دقيق.
                     </p>
                  </div>

                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
