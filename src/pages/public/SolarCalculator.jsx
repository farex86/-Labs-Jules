import React, { useReducer, useEffect } from 'react';
import SolarCalculatorModel, { facilityTypes, consumptionPatterns } from '../../models/SolarCalculatorModel';
import { Calculator, Zap, Battery, Sun, Plus, Trash2, Home, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const initialState = {
  selectedFacility: '',
  appliances: [],
  dailyConsumptionWh: 0,
  recommendedSystemSizeKW: 0,
  recommendedBatteryCapacityAh: 0,
};

function reducer(state, action) {
  let newAppliances;
  switch (action.type) {
    case 'SET_FACILITY': {
      const facilityId = action.payload;
      const pattern = consumptionPatterns[facilityId] || consumptionPatterns.default;
      // Deep copy to prevent mutation
      newAppliances = pattern.map(app => ({ ...app, id: Date.now() + Math.random() }));
      return {
        ...state,
        selectedFacility: facilityId,
        appliances: newAppliances
      };
    }
    case 'ADD_APPLIANCE':
      newAppliances = [
        ...state.appliances,
        { id: Date.now(), name: 'جهاز جديد', wattage: 100, quantity: 1, hours: 4 }
      ];
      return { ...state, appliances: newAppliances };
    case 'UPDATE_APPLIANCE':
      newAppliances = state.appliances.map(app =>
        app.id === action.payload.id ? { ...app, [action.payload.field]: action.payload.value } : app
      );
      return { ...state, appliances: newAppliances };
    case 'REMOVE_APPLIANCE':
      newAppliances = state.appliances.filter(app => app.id !== action.payload);
      return { ...state, appliances: newAppliances };
    case 'CALCULATE':
      return {
        ...state,
        dailyConsumptionWh: SolarCalculatorModel.calculateDailyConsumption(state.appliances),
        recommendedSystemSizeKW: SolarCalculatorModel.calculateSystemSize(SolarCalculatorModel.calculateDailyConsumption(state.appliances)),
        recommendedBatteryCapacityAh: SolarCalculatorModel.calculateBatteryCapacity(SolarCalculatorModel.calculateDailyConsumption(state.appliances))
      };
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Recalculate whenever appliances change
  useEffect(() => {
    dispatch({ type: 'CALCULATE' });
  }, [state.appliances]);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SET_FACILITY', payload: e.target.value });
  };

  const updateAppliance = (id, field, value) => {
    dispatch({ type: 'UPDATE_APPLIANCE', payload: { id, field, value } });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900" dir="rtl">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-primary">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calculator className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">حاسبة الطاقة الشمسية</h1>
          </div>
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors">
            <Home className="w-4 h-4" />
            <span>الرئيسية</span>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Form & Appliances */}
        <div className="lg:col-span-2 space-y-6">
          {/* Facility Selection */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              اختر نوع المنشأة
            </label>
            <select
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow appearance-none"
              value={state.selectedFacility}
              onChange={handleFacilityChange}
            >
              <option value="" disabled>-- الرجاء اختيار نوع المنشأة --</option>
              {facilityTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
            {!state.selectedFacility && (
              <p className="text-sm text-slate-500 mt-2 flex items-center gap-1">
                <ArrowRight className="w-4 h-4" />
                اختر منشأة لتحميل الأجهزة الافتراضية
              </p>
            )}
          </div>

          {/* Appliances List */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">قائمة الأجهزة (الأحمال)</h2>
              <button
                onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                className="flex items-center gap-2 text-sm bg-primary/10 text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-lg transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                إضافة جهاز
              </button>
            </div>

            {state.appliances.length === 0 ? (
              <div className="text-center py-8 text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200 dark:border-slate-700">
                لا توجد أجهزة. الرجاء اختيار منشأة أو إضافة جهاز يدوياً.
              </div>
            ) : (
              <div className="space-y-4">
                {/* Desktop Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-semibold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-700">
                  <div className="col-span-5">اسم الجهاز</div>
                  <div className="col-span-2 text-center">الاستهلاك (واط)</div>
                  <div className="col-span-2 text-center">العدد</div>
                  <div className="col-span-2 text-center">ساعات العمل/يوم</div>
                  <div className="col-span-1"></div>
                </div>

                {/* List */}
                {state.appliances.map(app => (
                  <div key={app.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 md:p-0 bg-slate-50 md:bg-transparent rounded-lg border md:border-none border-slate-100 dark:border-slate-700">

                    <div className="md:col-span-5 flex flex-col md:block">
                      <label className="text-xs text-slate-500 mb-1 md:hidden">اسم الجهاز</label>
                      <input
                        type="text"
                        value={app.name}
                        onChange={(e) => updateAppliance(app.id, 'name', e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="مثال: مكيف"
                      />
                    </div>

                    <div className="md:col-span-2 flex flex-col md:block">
                      <label className="text-xs text-slate-500 mb-1 md:hidden">الاستهلاك (واط)</label>
                      <input
                        type="number"
                        min="0"
                        value={app.wattage}
                        onChange={(e) => updateAppliance(app.id, 'wattage', Number(e.target.value))}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm text-center text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div className="md:col-span-2 flex flex-col md:block">
                      <label className="text-xs text-slate-500 mb-1 md:hidden">العدد</label>
                      <input
                        type="number"
                        min="1"
                        value={app.quantity}
                        onChange={(e) => updateAppliance(app.id, 'quantity', Number(e.target.value))}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm text-center text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div className="md:col-span-2 flex flex-col md:block">
                      <label className="text-xs text-slate-500 mb-1 md:hidden">ساعات العمل/يوم</label>
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={app.hours}
                        onChange={(e) => updateAppliance(app.id, 'hours', Number(e.target.value))}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm text-center text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div className="md:col-span-1 flex justify-end md:justify-center mt-2 md:mt-0">
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors"
                        title="حذف الجهاز"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-1">
          <div className="bg-primary rounded-xl p-6 text-white shadow-lg sticky top-24">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              النتائج والتوصيات
            </h2>

            <div className="space-y-6">
              {/* Total Consumption */}
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-sm text-primary-100 mb-1 font-medium">إجمالي الاستهلاك اليومي</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{(state.dailyConsumptionWh / 1000).toFixed(1)}</span>
                  <span className="text-sm font-medium opacity-80">كيلوواط.ساعة (kWh)</span>
                </div>
                <p className="text-xs text-primary-200 mt-1">({state.dailyConsumptionWh.toLocaleString()} واط.ساعة)</p>
              </div>

              {/* System Size */}
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Sun className="w-4 h-4 text-yellow-300" />
                  <p className="text-sm text-primary-100 font-medium">حجم النظام الشمسي المقترح</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{state.recommendedSystemSizeKW}</span>
                  <span className="text-sm font-medium opacity-80">كيلوواط (kW)</span>
                </div>
                <p className="text-xs text-primary-200 mt-2 leading-relaxed">
                  * محسوب على أساس 5 ساعات ذروة شمسية وكفاءة نظام 80%.
                </p>
              </div>

              {/* Battery */}
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Battery className="w-4 h-4 text-green-300" />
                  <p className="text-sm text-primary-100 font-medium">سعة البطاريات المقترحة (48 فولت)</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{state.recommendedBatteryCapacityAh.toLocaleString()}</span>
                  <span className="text-sm font-medium opacity-80">أمبير.ساعة (Ah)</span>
                </div>
                <p className="text-xs text-primary-200 mt-2 leading-relaxed">
                  * يكفي ليوم واحد (بدون شمس) مع نسبة تفريغ آمنة للبطاريات (80%).
                </p>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-xs text-primary-200 text-center leading-relaxed">
                هذه الحسابات تقديرية وتستخدم لأغراض استرشادية. ننصح دائماً باستشارة مهندس طاقة شمسية لتصميم النظام بدقة.
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default SolarCalculator;
