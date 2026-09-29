import React, { useReducer, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calculator, Sun, Battery, Zap, DollarSign, Plus, Trash2,
  ChevronRight, Building2, Factory, Home, Droplet, Coffee, Power
} from 'lucide-react';
import {
  FACILITY_TYPES,
  DEFAULT_APPLIANCES_BY_FACILITY,
  ALL_APPLIANCES,
  calculateSolarSystem
} from '../../models/SolarCalculatorModel';

// State Management
const initialState = {
  step: 1,
  selectedFacility: null,
  appliances: [],
  results: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY':
      // Deep copy to prevent mutating the constant array
      const defaultApps = DEFAULT_APPLIANCES_BY_FACILITY[action.payload]
        ? DEFAULT_APPLIANCES_BY_FACILITY[action.payload].map(a => ({ ...a, uniqueId: Math.random().toString(36).substring(7) }))
        : [];
      return {
        ...state,
        selectedFacility: action.payload,
        appliances: defaultApps,
        step: 2
      };
    case 'ADD_APPLIANCE':
      const newApp = action.payload || {
        name: 'جهاز جديد', power: 100, qty: 1, hours: 8, uniqueId: Math.random().toString(36).substring(7)
      };
      return { ...state, appliances: [...state.appliances, { ...newApp }] };
    case 'UPDATE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.map(app =>
          app.uniqueId === action.payload.id ? { ...app, [action.payload.field]: action.payload.value } : app
        )
      };
    case 'REMOVE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.filter(app => app.uniqueId !== action.payload)
      };
    case 'CALCULATE':
      return { ...state, results: calculateSolarSystem(state.appliances), step: 3 };
    case 'BACK':
      return { ...state, step: state.step - 1 };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// Icon Mapping
const getIcon = (name) => {
  const icons = {
    'snowflake': <Sun className="w-6 h-6" />, // No snowflake in lucide, using Sun
    'building': <Building2 className="w-6 h-6" />,
    'tractor': <Sun className="w-6 h-6" />,
    'bird': <Sun className="w-6 h-6" />,
    'leaf': <Sun className="w-6 h-6" />,
    'factory': <Factory className="w-6 h-6" />,
    'stethoscope': <Sun className="w-6 h-6" />,
    'hospital': <Building2 className="w-6 h-6" />,
    'croissant': <Coffee className="w-6 h-6" />,
    'store': <Home className="w-6 h-6" />,
    'wrench': <Factory className="w-6 h-6" />,
    'droplet': <Droplet className="w-6 h-6" />,
    'waves': <Droplet className="w-6 h-6" />,
    'moon': <Building2 className="w-6 h-6" />,
    'printer': <Factory className="w-6 h-6" />,
    'coffee': <Coffee className="w-6 h-6" />,
    'utensils': <Coffee className="w-6 h-6" />,
    'hotel': <Building2 className="w-6 h-6" />,
    'landmark': <Building2 className="w-6 h-6" />,
    'shopping-cart': <Home className="w-6 h-6" />,
    'fuel': <Zap className="w-6 h-6" />,
    'pickaxe': <Factory className="w-6 h-6" />
  };
  return icons[name] || <Building2 className="w-6 h-6" />;
};

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state.step]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans" dir="rtl">

      {/* Header */}
      <header className="bg-primary text-white py-8 shadow-md">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-4 mb-2">
            <Calculator className="w-8 h-8" />
            <h1 className="text-3xl font-bold">حاسبة الطاقة الشمسية</h1>
          </div>
          <p className="text-primary-100 text-lg opacity-90">
            احسب حجم النظام الشمسي المناسب لمنشأتك بدقة وسهولة
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">

        {/* Progress Bar */}
        <div className="mb-8 flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-slate-200 dark:bg-slate-700 -z-10 rounded-full"></div>
          <div
            className="absolute right-0 top-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-500"
            style={{ width: `${((state.step - 1) / 2) * 100}%` }}
          ></div>

          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors duration-300
                ${state.step >= num
                  ? 'bg-primary border-primary text-white'
                  : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-400'
                }`}
            >
              {num}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* STEP 1: Select Facility */}
          {state.step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-6">1. اختر نوع المنشأة</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {FACILITY_TYPES.map(facility => (
                  <button
                    key={facility.id}
                    onClick={() => dispatch({ type: 'SET_FACILITY', payload: facility.id })}
                    className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-xl border-2 border-transparent hover:border-primary/50 hover:shadow-lg transition-all group"
                  >
                    <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                      {getIcon(facility.icon)}
                    </div>
                    <span className="font-semibold text-center">{facility.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Configure Appliances */}
          {state.step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">2. الأحمال الكهربائية</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    لقد قمنا بإضافة الأجهزة الافتراضية لمنشأتك. يمكنك تعديلها أو إضافة أجهزة أخرى.
                  </p>
                </div>
                <button
                  onClick={() => dispatch({ type: 'BACK' })}
                  className="text-slate-500 hover:text-primary font-medium text-sm flex items-center gap-1"
                >
                  <ChevronRight className="w-4 h-4" /> عودة
                </button>
              </div>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-right">
                  <thead className="bg-slate-50 dark:bg-slate-700/50">
                    <tr>
                      <th className="px-4 py-3 rounded-r-lg font-semibold text-sm">الجهاز</th>
                      <th className="px-4 py-3 font-semibold text-sm">القدرة (واط)</th>
                      <th className="px-4 py-3 font-semibold text-sm">العدد</th>
                      <th className="px-4 py-3 font-semibold text-sm">ساعات التشغيل/يوم</th>
                      <th className="px-4 py-3 font-semibold text-sm">الإجمالي (واط/ساعة)</th>
                      <th className="px-4 py-3 rounded-l-lg"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {state.appliances.map(app => (
                      <tr key={app.uniqueId} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={app.name}
                            onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.uniqueId, field: 'name', value: e.target.value } })}
                            className="w-full bg-transparent border-b border-dashed border-slate-300 dark:border-slate-600 focus:border-primary outline-none py-1"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min="1"
                            value={app.power}
                            onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.uniqueId, field: 'power', value: e.target.value } })}
                            className="w-20 bg-slate-100 dark:bg-slate-700 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min="1"
                            value={app.qty}
                            onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.uniqueId, field: 'qty', value: e.target.value } })}
                            className="w-16 bg-slate-100 dark:bg-slate-700 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min="1" max="24"
                            value={app.hours}
                            onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.uniqueId, field: 'hours', value: e.target.value } })}
                            className="w-16 bg-slate-100 dark:bg-slate-700 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </td>
                        <td className="px-4 py-3 font-semibold text-primary" dir="ltr">
                          {(Number(app.power) * Number(app.qty) * Number(app.hours)).toLocaleString()} Wh
                        </td>
                        <td className="px-4 py-3 text-left">
                          <button
                            onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.uniqueId })}
                            className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-700 pt-6">
                <div className="flex items-center gap-2">
                  <select
                    id="add-appliance-select"
                    className="bg-slate-100 dark:bg-slate-700 border-none rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20"
                    onChange={(e) => {
                      if(e.target.value) {
                        const template = ALL_APPLIANCES.find(a => a.id === e.target.value);
                        if(template) {
                          dispatch({
                            type: 'ADD_APPLIANCE',
                            payload: { name: template.name, power: template.power, qty: 1, hours: 8, uniqueId: Math.random().toString(36).substring(7) }
                          });
                        }
                        e.target.value = '';
                      }
                    }}
                  >
                    <option value="">+ إضافة جهاز شائع...</option>
                    {ALL_APPLIANCES.map(app => (
                      <option key={app.id} value={app.id}>{app.name} ({app.power} واط)</option>
                    ))}
                  </select>
                  <button
                    onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                    className="flex items-center gap-2 text-primary font-medium px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> جهاز مخصص
                  </button>
                </div>

                <button
                  onClick={() => dispatch({ type: 'CALCULATE' })}
                  disabled={state.appliances.length === 0}
                  className="bg-primary text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-primary/90 hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Calculator className="w-5 h-5" /> احسب النظام
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Results */}
          {state.step === 3 && state.results && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">3. نتائج الحساب</h2>
                <div className="flex gap-3">
                  <button
                    onClick={() => dispatch({ type: 'BACK' })}
                    className="text-slate-500 hover:text-primary font-medium text-sm px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    تعديل الأحمال
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'RESET' })}
                    className="text-slate-500 hover:text-primary font-medium text-sm px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    حساب جديد
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Daily Consumption */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center mb-4">
                    <Power className="w-6 h-6" />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">الاستهلاك اليومي</p>
                  <h3 className="text-3xl font-bold" dir="ltr">{state.results.dailyConsumptionKWh} <span className="text-lg text-slate-400">kWh</span></h3>
                  <p className="text-xs text-slate-400 mt-2">إجمالي الطاقة المطلوبة يومياً</p>
                </div>

                {/* Inverter Size */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-500 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6" />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">حجم الانفرتر (العاكس)</p>
                  <h3 className="text-3xl font-bold" dir="ltr">{state.results.inverterSizeKW} <span className="text-lg text-slate-400">kW</span></h3>
                  <p className="text-xs text-slate-400 mt-2">ذروة الحمل + 25% هامش أمان</p>
                </div>

                {/* Solar Panels */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-amber-100 dark:border-amber-900/30 ring-1 ring-amber-400/20">
                  <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center mb-4">
                    <Sun className="w-6 h-6" />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">الألواح الشمسية المطلوبة</p>
                  <h3 className="text-3xl font-bold" dir="ltr">{state.results.numberOfPanels} <span className="text-lg text-slate-400">لوح</span></h3>
                  <p className="text-xs text-slate-400 mt-2">مقدرة بـ {state.results.solarArrayCapacityKW} kW (ألواح 550W)</p>
                </div>

                {/* Batteries */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-900/30 ring-1 ring-emerald-400/20">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center mb-4">
                    <Battery className="w-6 h-6" />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">البطاريات المطلوبة</p>
                  <h3 className="text-3xl font-bold" dir="ltr">{state.results.numberOfBatteries} <span className="text-lg text-slate-400">بطارية</span></h3>
                  <p className="text-xs text-slate-400 mt-2">سعة {state.results.batteryStorageKWh} kWh (بطاريات 200Ah 12V)</p>
                </div>

              </div>

              {/* Cost Estimate Alert */}
              <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">التكلفة التقديرية للنظام</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      هذه التكلفة هي تقدير أولي تقريبي (يشمل الأجهزة والتركيب). قد تختلف الأسعار الفعلية حسب السوق وجودة المكونات.
                    </p>
                  </div>
                </div>
                <div className="text-center md:text-left shrink-0">
                  <span className="block text-sm text-slate-500 mb-1">حوالي</span>
                  <span className="text-3xl font-bold text-primary" dir="ltr">
                    ${state.results.estimatedCostUSD.toLocaleString()}
                  </span>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
};

export default SolarCalculator;
