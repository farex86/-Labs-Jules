import React, { useReducer, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Calculator, Save, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { FACILITY_TYPES, DEFAULT_APPLIANCES, calculateSolarSystem } from '../../models/SolarCalculatorModel';

// --- Reducer for complex state management ---
const initialState = {
  facilityType: 'custom',
  appliances: [],
  calculationResult: null,
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY_TYPE': {
      const type = action.payload;
      const defaultApps = DEFAULT_APPLIANCES[type] || [];
      return {
        ...state,
        facilityType: type,
        appliances: defaultApps.map(app => ({ ...app, id: Math.random().toString(36).substr(2, 9) })), // generate unique ids
        calculationResult: null // reset calculation when changing facility
      };
    }
    case 'ADD_APPLIANCE':
      return {
        ...state,
        appliances: [
          ...state.appliances,
          { id: Math.random().toString(36).substr(2, 9), name: 'جهاز جديد', quantity: 1, watts: 100, hours: 4 }
        ],
        calculationResult: null
      };
    case 'UPDATE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.map(app =>
          app.id === action.payload.id ? { ...app, [action.payload.field]: action.payload.value } : app
        ),
        calculationResult: null
      };
    case 'REMOVE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.filter(app => app.id !== action.payload),
        calculationResult: null
      };
    case 'SET_CALCULATION_RESULT':
      return {
        ...state,
        calculationResult: action.payload
      };
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const [loading, setLoading] = useState(true); // For skeleton loader

  // Simulate loading to show skeleton
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleCalculate = () => {
    if (state.appliances.length === 0) {
      toast.error('الرجاء إضافة أجهزة لحساب النظام');
      return;
    }

    // Simple validation
    for (let app of state.appliances) {
        if (!app.name || app.quantity <= 0 || app.watts <= 0 || app.hours <= 0 || app.hours > 24) {
            toast.error('الرجاء التأكد من صحة بيانات جميع الأجهزة المدخلة');
            return;
        }
    }

    const result = calculateSolarSystem(state.appliances);
    dispatch({ type: 'SET_CALCULATION_RESULT', payload: result });
    toast.success('تم الحساب بنجاح');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 pt-20 transition-colors duration-200" dir="rtl">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          <div className="space-y-4">
             <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
             <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
             <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-8 pt-20 transition-colors duration-200" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center md:text-right">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2 text-primary-600 dark:text-primary-400">
            <Calculator className="w-8 h-8" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع المنشأة وأجهزتك
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Appliances Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors">
              <label className="block text-sm font-medium mb-2">نوع المنشأة</label>
              <select
                className="w-full md:w-1/2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                value={state.facilityType}
                onChange={(e) => {
                    dispatch({ type: 'SET_FACILITY_TYPE', payload: e.target.value });
                    if (e.target.value !== 'custom') {
                        toast.success(`تم تحميل أجهزة ${FACILITY_TYPES.find(f => f.id === e.target.value)?.label} الافتراضية`);
                    }
                }}
              >
                {FACILITY_TYPES.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">الأجهزة الكهربائية</h2>
                <button
                  onClick={() => {
                      dispatch({ type: 'ADD_APPLIANCE' });
                      toast.success('تم إضافة جهاز جديد');
                  }}
                  className="flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  إضافة جهاز
                </button>
              </div>

              {/* Desktop View Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 mb-2 px-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                <div className="col-span-4">اسم الجهاز</div>
                <div className="col-span-2 text-center">العدد</div>
                <div className="col-span-2 text-center">الاستهلاك (واط)</div>
                <div className="col-span-2 text-center">ساعات العمل/يوم</div>
                <div className="col-span-2"></div>
              </div>

              <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-3">
                {state.appliances.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
                    لا يوجد أجهزة مضافة. قم باختيار نوع منشأة أو أضف جهازاً يدوياً.
                  </div>
                ) : (
                  state.appliances.map((app) => (
                    <motion.div
                      key={app.id}
                      variants={itemVariants}
                      layout
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gray-50 dark:bg-gray-700/50 p-4 md:p-2 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="col-span-1 md:col-span-4">
                        <label className="md:hidden text-xs text-gray-500 dark:text-gray-400 mb-1 block">اسم الجهاز</label>
                        <input
                          type="text"
                          value={app.name}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'name', value: e.target.value } })}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 focus:ring-1 focus:ring-primary-500"
                          placeholder="اسم الجهاز"
                        />
                      </div>
                      <div className="col-span-1 md:col-span-2">
                         <label className="md:hidden text-xs text-gray-500 dark:text-gray-400 mb-1 block">العدد</label>
                        <input
                          type="number"
                          min="1"
                          value={app.quantity}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'quantity', value: Number(e.target.value) } })}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-center focus:ring-1 focus:ring-primary-500"
                        />
                      </div>
                      <div className="col-span-1 md:col-span-2">
                        <label className="md:hidden text-xs text-gray-500 dark:text-gray-400 mb-1 block">الاستهلاك (واط)</label>
                        <input
                          type="number"
                          min="1"
                          value={app.watts}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'watts', value: Number(e.target.value) } })}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-center focus:ring-1 focus:ring-primary-500"
                        />
                      </div>
                      <div className="col-span-1 md:col-span-2">
                        <label className="md:hidden text-xs text-gray-500 dark:text-gray-400 mb-1 block">ساعات العمل</label>
                        <input
                          type="number"
                          min="1"
                          max="24"
                          value={app.hours}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'hours', value: Number(e.target.value) } })}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-center focus:ring-1 focus:ring-primary-500"
                        />
                      </div>
                      <div className="col-span-1 md:col-span-2 flex justify-end md:justify-center mt-2 md:mt-0">
                        <button
                          onClick={() => {
                              dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id });
                              toast.success('تم حذف الجهاز');
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleCalculate}
                  className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
                >
                  احسب النظام
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Results */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sticky top-24 transition-colors">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-4">
                <Save className="w-5 h-5 text-primary-500" />
                نتائج الحساب
              </h2>

              {state.calculationResult ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-5"
                >
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">الاستهلاك اليومي</p>
                    <p className="text-2xl font-bold text-blue-800 dark:text-blue-300">
                      {state.calculationResult.totalDailyEnergyKWh} <span className="text-base font-normal">كيلو واط/ساعة</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">الإنفرتر المطلوب</p>
                      <p className="text-lg font-bold">
                        {state.calculationResult.inverterSizeKW} <span className="text-sm font-normal">كيلو واط</span>
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">جهد النظام</p>
                      <p className="text-lg font-bold">
                        {state.calculationResult.systemVoltage} <span className="text-sm font-normal">فولت</span>
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-green-500">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">ألواح الطاقة الشمسية</p>
                    <div className="flex justify-between items-end">
                       <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                         {state.calculationResult.numberOfPanels} <span className="text-sm font-normal text-gray-600 dark:text-gray-300">لوح</span>
                       </p>
                       <p className="text-xs text-gray-500 dark:text-gray-400">
                          (سعة {state.calculationResult.panelWattage} واط)
                       </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">السعة الإجمالية: {state.calculationResult.requiredPanelCapacityKW} كيلو واط</p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-orange-500">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">سعة البطاريات المطلوبة</p>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {state.calculationResult.batteryCapacityAh} <span className="text-sm font-normal">أمبير-ساعة (Ah)</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">تكفي ليوم واحد (تفريغ 80%)</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-400 dark:text-gray-500 text-center">
                    هذه النتائج تقريبية وتعتمد على متوسط الإشعاع الشمسي. يفضل استشارة مهندس مختص للحصول على تصميم دقيق.
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                  <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>قم بإدخال الأجهزة واضغط على "احسب النظام" لرؤية النتائج هنا</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
