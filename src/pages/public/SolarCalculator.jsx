import React, { useReducer, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import {
  Calculator,
  Plus,
  Trash2,
  Zap,
  Sun,
  Battery,
  Server,
  Snowflake,
  Building,
  Tractor,
  Egg,
  Leaf,
  Factory,
  Stethoscope,
  Hospital,
  Croissant,
  Store,
  Wrench,
  Droplets,
  Truck,
  Moon,
  Printer,
  Coffee,
  Utensils,
  Bed,
  Landmark,
  ShoppingCart,
  Fuel,
  Pickaxe
} from 'lucide-react';
import {
  FACILITY_TYPES,
  COMMON_APPLIANCES,
  calculateTotalDailyConsumption,
  calculateSystemSizeKW,
  calculatePanelsNeeded,
  calculateBatteryCapacityAh,
  calculateInverterSize
} from '../../models/SolarCalculatorModel';

// Map icon strings from model to Lucide components
const iconMap = {
  snow: Snowflake,
  building: Building,
  tractor: Tractor,
  egg: Egg,
  leaf: Leaf,
  factory: Factory,
  stethoscope: Stethoscope,
  hospital: Hospital,
  croissant: Croissant,
  store: Store,
  wrench: Wrench,
  droplets: Droplets,
  wagon: Truck, // using Truck as wagon substitute
  moon: Moon,
  printer: Printer,
  coffee: Coffee,
  utensils: Utensils,
  bed: Bed,
  landmark: Landmark,
  'shopping-cart': ShoppingCart,
  fuel: Fuel,
  pickaxe: Pickaxe
};

// Initial state for useReducer
const initialState = {
  selectedFacility: null,
  appliancesList: [],
  // Defaults for calculations
  peakSunHours: 5,
  daysOfAutonomy: 1,
  panelWattage: 500,
  batteryVoltage: 48,
  batteryDod: 0.8
};

// Reducer for state management
function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY':
      return { ...state, selectedFacility: action.payload };
    case 'ADD_APPLIANCE': {
      const appliance = action.payload;
      const existingIndex = state.appliancesList.findIndex(a => a.id === appliance.id);
      if (existingIndex >= 0) {
        const newList = [...state.appliancesList];
        newList[existingIndex] = {
          ...newList[existingIndex],
          quantity: newList[existingIndex].quantity + 1
        };
        return { ...state, appliancesList: newList };
      }
      return {
        ...state,
        appliancesList: [...state.appliancesList, { ...appliance, quantity: 1 }]
      };
    }
    case 'REMOVE_APPLIANCE':
      return {
        ...state,
        appliancesList: state.appliancesList.filter(a => a.id !== action.payload)
      };
    case 'UPDATE_APPLIANCE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity < 1) return state;
      return {
        ...state,
        appliancesList: state.appliancesList.map(a =>
          a.id === id ? { ...a, quantity } : a
        )
      };
    }
    case 'UPDATE_APPLIANCE_HOURS': {
      const { id, hours } = action.payload;
      if (hours < 1 || hours > 24) return state;
      return {
        ...state,
        appliancesList: state.appliancesList.map(a =>
          a.id === id ? { ...a, hoursPerDay: hours } : a
        )
      };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  // Derived state for results using pure functions
  const results = useMemo(() => {
    const dailyWh = calculateTotalDailyConsumption(state.appliancesList);
    const systemSizeKW = calculateSystemSizeKW(dailyWh, state.peakSunHours);
    const panels = calculatePanelsNeeded(systemSizeKW, state.panelWattage);
    const batteryAh = calculateBatteryCapacityAh(
      dailyWh,
      state.daysOfAutonomy,
      state.batteryDod,
      state.batteryVoltage
    );
    const inverterKW = calculateInverterSize(state.appliancesList);

    return {
      dailyWh,
      dailyKWh: (dailyWh / 1000).toFixed(2),
      systemSizeKW,
      panels,
      batteryAh,
      inverterKW
    };
  }, [state.appliancesList, state.peakSunHours, state.daysOfAutonomy, state.panelWattage, state.batteryVoltage, state.batteryDod]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100" dir="rtl">
      {/* Header */}
      <div className="bg-emerald-600 dark:bg-emerald-700 text-white py-12 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <Calculator className="h-16 w-16 mb-4 text-emerald-100" />
          <h1 className="text-4xl font-bold mb-2">الحاسبة الشمسية</h1>
          <p className="text-xl text-emerald-100 max-w-2xl">
            احسب احتياجاتك من الطاقة الشمسية بدقة بناءً على نوع منشأتك والأجهزة المستخدمة
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Input Area */}
          <div className="lg:col-span-2 space-y-8">

            {/* Step 1: Select Facility Type */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-slate-700"
            >
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg">1</span>
                اختر نوع المنشأة
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {FACILITY_TYPES.map(facility => {
                  const IconComponent = iconMap[facility.icon] || Building;
                  const isSelected = state.selectedFacility?.id === facility.id;
                  return (
                    <button
                      key={facility.id}
                      onClick={() => dispatch({ type: 'SET_FACILITY', payload: facility })}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-3 ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                          : 'border-gray-200 dark:border-slate-700 hover:border-emerald-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <IconComponent className="h-8 w-8" />
                      <span className="text-sm font-medium text-center">{facility.name}</span>
                    </button>
                  );
                })}
              </div>
            </motion.section>

            {/* Step 2: Add Appliances */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-slate-700"
            >
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg">2</span>
                الأجهزة الكهربائية
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">أضف جهازاً للقائمة</label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_APPLIANCES.map(app => (
                    <button
                      key={app.id}
                      onClick={() => dispatch({ type: 'ADD_APPLIANCE', payload: app })}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-emerald-100 hover:text-emerald-700 dark:hover:bg-emerald-900 dark:hover:text-emerald-300 transition-colors flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      {app.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Appliances Table */}
              {state.appliancesList.length > 0 ? (
                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-700">
                  <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-300">
                      <tr>
                        <th className="px-4 py-3 font-semibold">الجهاز</th>
                        <th className="px-4 py-3 font-semibold">العدد</th>
                        <th className="px-4 py-3 font-semibold">ساعات العمل/يوم</th>
                        <th className="px-4 py-3 font-semibold">القدرة (واط)</th>
                        <th className="px-4 py-3 font-semibold">الإجمالي (واط/ساعة)</th>
                        <th className="px-4 py-3 font-semibold"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.appliancesList.map((app) => (
                        <tr key={app.id} className="bg-white border-b dark:bg-slate-800 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                          <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                            {app.name}
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              min="1"
                              value={app.quantity}
                              onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE_QUANTITY', payload: { id: app.id, quantity: parseInt(e.target.value) || 1 }})}
                              className="w-16 p-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-center"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              min="1" max="24"
                              value={app.hoursPerDay}
                              onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE_HOURS', payload: { id: app.id, hours: parseInt(e.target.value) || 1 }})}
                              className="w-16 p-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-center"
                            />
                          </td>
                          <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-medium">
                            {app.powerWatt}W
                          </td>
                          <td className="px-4 py-3 font-bold text-gray-800 dark:text-gray-200">
                            {app.powerWatt * app.hoursPerDay * app.quantity}
                          </td>
                          <td className="px-4 py-3 text-left">
                            <button
                              onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1"
                              title="حذف"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-slate-900/50 rounded-lg border-2 border-dashed border-gray-200 dark:border-slate-700">
                  <Zap className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">لم تقم بإضافة أي أجهزة بعد. اختر من القائمة أعلاه للبدء.</p>
                </div>
              )}
            </motion.section>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-emerald-900 dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden sticky top-6 border border-emerald-800 dark:border-slate-700"
            >
              <div className="p-6 bg-emerald-800 dark:bg-emerald-900 text-white">
                <h3 className="text-xl font-bold mb-1">النتائج التقديرية</h3>
                <p className="text-emerald-200 text-sm">النظام الشمسي المقترح بناءً على استهلاكك</p>
              </div>

              <div className="p-6 space-y-6">

                {/* Total Consumption */}
                <div className="bg-white/10 dark:bg-slate-700/50 rounded-lg p-4 border border-emerald-700/50 dark:border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-100 dark:text-gray-300 text-sm font-medium">الاستهلاك اليومي</span>
                    <Zap className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {results.dailyKWh} <span className="text-lg font-normal text-emerald-200">كيلوواط/ساعة</span>
                  </div>
                  <div className="text-xs text-emerald-300/70">{results.dailyWh} واط/ساعة</div>
                </div>

                {/* System Components */}
                <div className="space-y-4">

                  {/* Solar Panels */}
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-800/50 dark:bg-slate-700 p-3 rounded-lg">
                      <Sun className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-sm text-emerald-200 dark:text-gray-400">حجم النظام (الألواح)</div>
                      <div className="text-xl font-bold text-white">
                        {results.systemSizeKW > 0 ? `${results.systemSizeKW} كيلوواط` : '-'}
                      </div>
                      <div className="text-xs text-emerald-300/80">
                        {results.panels > 0 ? `حوالي ${results.panels} لوح (بقوة ${state.panelWattage} واط)` : 'أضف أجهزة للحساب'}
                      </div>
                    </div>
                  </div>

                  {/* Batteries */}
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-800/50 dark:bg-slate-700 p-3 rounded-lg">
                      <Battery className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm text-emerald-200 dark:text-gray-400">سعة البطاريات المطلوبة</div>
                      <div className="text-xl font-bold text-white">
                        {results.batteryAh > 0 ? `${results.batteryAh} أمبير-ساعة` : '-'}
                      </div>
                      <div className="text-xs text-emerald-300/80">
                        {results.batteryAh > 0 ? `بنظام ${state.batteryVoltage} فولت لتشغيل ليوم واحد` : ''}
                      </div>
                    </div>
                  </div>

                  {/* Inverter */}
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-800/50 dark:bg-slate-700 p-3 rounded-lg">
                      <Server className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-emerald-200 dark:text-gray-400">حجم المحول (Inverter)</div>
                      <div className="text-xl font-bold text-white">
                        {results.inverterKW > 0 ? `${results.inverterKW} كيلوواط` : '-'}
                      </div>
                      <div className="text-xs text-emerald-300/80">
                        {results.inverterKW > 0 ? 'لتشغيل أقصى حمل متوقع' : ''}
                      </div>
                    </div>
                  </div>

                </div>

                <button
                  onClick={() => dispatch({ type: 'RESET' })}
                  className="w-full py-3 mt-4 text-emerald-100 hover:text-white border border-emerald-700/50 hover:bg-emerald-800 rounded-lg transition-colors text-sm font-medium"
                >
                  إعادة الحساب
                </button>
                <div className="text-center">
                  <p className="text-xs text-emerald-300/60 mt-4 leading-relaxed">
                    ملاحظة: هذه الحسابات تقديرية وتعتمد على متوسطات افتراضية للاستهلاك وساعات العمل وتسطع الشمس.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
