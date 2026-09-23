import React, { useReducer, useState, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Calculator, Plus, Trash2, Zap, Battery, Sun, Server, Home } from 'lucide-react';
import { FACILITY_TYPES, calculateSolarRequirements } from '../../models/SolarCalculatorModel';


const initialState = {
  selectedFacilityId: '',
  appliances: []
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      return {
        ...state,
        selectedFacilityId: action.payload,
        // Deep copy default appliances to prevent mutation of constant data
        appliances: facility ? facility.defaultAppliances.map(app => ({ ...app, id: `${app.id}_${Date.now()}_${Math.random()}` })) : []
      };
    }
    case 'ADD_APPLIANCE': {
      return {
        ...state,
        appliances: [...state.appliances, {
          id: `custom_${Date.now()}_${Math.random()}`,
          name: 'جهاز جديد',
          quantity: 1,
          watts: 100,
          hours: 8
        }]
      };
    }
    case 'REMOVE_APPLIANCE': {
      return {
        ...state,
        appliances: state.appliances.filter(app => app.id !== action.payload)
      };
    }
    case 'UPDATE_APPLIANCE': {
      const { id, field, value } = action.payload;
      return {
        ...state,
        appliances: state.appliances.map(app =>
          app.id === id ? { ...app, [field]: value } : app
        )
      };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => calculateSolarRequirements(state.appliances), [state.appliances]);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SELECT_FACILITY', payload: e.target.value });
    setShowResults(false);
  };

  const handleUpdateAppliance = (id, field, value) => {
    dispatch({ type: 'UPDATE_APPLIANCE', payload: { id, field, value } });
  };

  const calculate = () => {
    if (state.appliances.length > 0) {
      setShowResults(true);
      // Smooth scroll down to results
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
            <Calculator className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-500">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع نشاطك والأجهزة المستخدمة.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="p-6 sm:p-8">

            {/* Facility Selection */}
            <div className="mb-8">
              <label htmlFor="facility" className="block text-lg font-medium text-gray-700 mb-3 flex items-center">
                <Home className="ml-2 h-5 w-5 text-gray-400" />
                اختر نوع النشاط أو المنشأة
              </label>
              <select
                id="facility"
                value={state.selectedFacilityId}
                onChange={handleFacilityChange}
                className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg rounded-xl bg-gray-50"
              >
                <option value="">-- يرجى اختيار نوع المنشأة --</option>
                {FACILITY_TYPES.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Appliances List */}
            {state.selectedFacilityId && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800">الأجهزة الكهربائية (أضف أو عدّل)</h3>
                  <button
                    onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="ml-2 -mr-1 h-4 w-4" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Headers for desktop */}
                  <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-600">
                    <div className="col-span-4">اسم الجهاز</div>
                    <div className="col-span-2 text-center">العدد</div>
                    <div className="col-span-2 text-center">الاستهلاك (واط)</div>
                    <div className="col-span-2 text-center">ساعات العمل</div>
                    <div className="col-span-2 text-center">إجراء</div>
                  </div>

                  {state.appliances.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">لا توجد أجهزة مضافة. انقر على "إضافة جهاز".</div>
                  ) : (
                    state.appliances.map((app, index) => (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gray-50 p-4 rounded-xl border border-gray-200"
                      >
                        <div className="col-span-1 md:col-span-4">
                          <label className="md:hidden block text-xs text-gray-500 mb-1">اسم الجهاز</label>
                          <input
                            type="text"
                            value={app.name}
                            onChange={(e) => handleUpdateAppliance(app.id, 'name', e.target.value)}
                            className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="اسم الجهاز"
                          />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                          <label className="md:hidden block text-xs text-gray-500 mb-1">العدد</label>
                          <input
                            type="number"
                            min="1"
                            value={app.quantity}
                            onChange={(e) => handleUpdateAppliance(app.id, 'quantity', e.target.value)}
                            className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center"
                          />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                          <label className="md:hidden block text-xs text-gray-500 mb-1">الاستهلاك (واط)</label>
                          <input
                            type="number"
                            min="1"
                            value={app.watts}
                            onChange={(e) => handleUpdateAppliance(app.id, 'watts', e.target.value)}
                            className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center"
                          />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                          <label className="md:hidden block text-xs text-gray-500 mb-1">ساعات العمل / يوم</label>
                          <input
                            type="number"
                            min="1"
                            max="24"
                            value={app.hours}
                            onChange={(e) => handleUpdateAppliance(app.id, 'hours', e.target.value)}
                            className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center"
                          />
                        </div>
                        <div className="col-span-1 md:col-span-2 text-center mt-2 md:mt-0">
                          <button
                            onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                            className="inline-flex items-center justify-center w-full md:w-auto p-2 border border-red-200 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                            title="حذف"
                          >
                            <Trash2 className="h-5 w-5" />
                            <span className="md:hidden mr-2">حذف الجهاز</span>
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                <div className="pt-6">
                  <button
                    onClick={calculate}
                    disabled={state.appliances.length === 0}
                    className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-xl font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <Calculator className="ml-2 h-6 w-6" />
                    احسب النظام الشمسي المطلوب
                  </button>
                </div>
              </motion.div>
            )}

            {/* Results Section */}
            {showResults && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-10 pt-10 border-t-2 border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">النظام الشمسي المقترح</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                  {/* Energy Consumption */}
                  <div className="bg-blue-50 rounded-2xl p-6 text-center border border-blue-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <Zap className="h-10 w-10 text-blue-500 mx-auto mb-4 relative z-10" />
                    <h4 className="text-sm font-medium text-blue-800 mb-1 relative z-10">الاستهلاك اليومي</h4>
                    <p className="text-3xl font-extrabold text-blue-600 relative z-10">
                      {(results.totalDailyWh / 1000).toFixed(1)} <span className="text-lg font-medium">ك.و.س</span>
                    </p>
                  </div>

                  {/* System Size */}
                  <div className="bg-yellow-50 rounded-2xl p-6 text-center border border-yellow-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-100 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <Sun className="h-10 w-10 text-yellow-500 mx-auto mb-4 relative z-10" />
                    <h4 className="text-sm font-medium text-yellow-800 mb-1 relative z-10">حجم المنظومة</h4>
                    <p className="text-3xl font-extrabold text-yellow-600 relative z-10">
                      {results.systemSizeKw.toFixed(1)} <span className="text-lg font-medium">ك.واط</span>
                    </p>
                  </div>

                  {/* Inverter */}
                  <div className="bg-purple-50 rounded-2xl p-6 text-center border border-purple-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-purple-100 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <Server className="h-10 w-10 text-purple-500 mx-auto mb-4 relative z-10" />
                    <h4 className="text-sm font-medium text-purple-800 mb-1 relative z-10">الإنفرتر المطلوب</h4>
                    <p className="text-3xl font-extrabold text-purple-600 relative z-10">
                      {results.inverterSizeKw.toFixed(1)} <span className="text-lg font-medium">ك.واط</span>
                    </p>
                  </div>

                  {/* Batteries */}
                  <div className="bg-green-50 rounded-2xl p-6 text-center border border-green-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-green-100 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <Battery className="h-10 w-10 text-green-500 mx-auto mb-4 relative z-10" />
                    <h4 className="text-sm font-medium text-green-800 mb-1 relative z-10">البطاريات المقترحة</h4>
                    <p className="text-3xl font-extrabold text-green-600 relative z-10">
                      {results.recommendedBatteries} <span className="text-lg font-medium">بطارية</span>
                    </p>
                    <p className="text-xs text-green-700 mt-1 relative z-10">(48V 200Ah Lithium)</p>
                  </div>

                </div>

                <div className="mt-8 bg-gray-50 rounded-xl p-4 border border-gray-200 text-sm text-gray-600 text-center">
                  <p><strong>ملاحظة:</strong> هذه الحسابات تقديرية مبنية على كفاءة 80% ومتوسط 5.5 ساعات سطوع شمسي. يُنصح باستشارة مهندس مختص للحصول على تصميم دقيق.</p>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
