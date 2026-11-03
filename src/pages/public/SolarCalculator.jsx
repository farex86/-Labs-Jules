// src/pages/public/SolarCalculator.jsx
import React, { useReducer, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Plus, Trash2, Calculator, Battery, Sun, Zap, Info } from 'lucide-react';
import { FACILITY_TYPES, SolarCalculatorModel } from '../../models/SolarCalculatorModel';

// Reducer for handling appliances state
const applianceReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      if (facility) {
        // Deep copy the array of objects to avoid mutating constants
        return facility.appliances.map(app => ({ ...app }));
      }
      return [];
    }
    case 'ADD_APPLIANCE':
      return [
        ...state,
        { id: Date.now().toString(), name: 'جهاز جديد', quantity: 1, powerW: 100, hoursPerDay: 5 }
      ];
    case 'UPDATE_APPLIANCE':
      return state.map(app =>
        app.id === action.payload.id ? { ...app, ...action.payload.updates } : app
      );
    case 'REMOVE_APPLIANCE':
      return state.filter(app => app.id !== action.payload);
    default:
      return state;
  }
};

export default function SolarCalculator() {
  const [selectedFacility, setSelectedFacility] = React.useState(FACILITY_TYPES[0].id);
  const [appliances, dispatch] = useReducer(applianceReducer, []);

  // Initialize with the first facility
  useEffect(() => {
    dispatch({ type: 'SET_FACILITY', payload: selectedFacility });
  }, [selectedFacility]);

  const handleFacilityChange = (e) => {
    setSelectedFacility(e.target.value);
  };

  const handleApplianceChange = (id, field, value) => {
    dispatch({
      type: 'UPDATE_APPLIANCE',
      payload: { id, updates: { [field]: value } }
    });
  };

  const results = SolarCalculatorModel.calculateSystemSize(appliances);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-4 md:p-8 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4"
          >
            <Sun className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            احسب حجم النظام الشمسي المناسب لمنشأتك (ألواح، بطاريات، ومحول) بناءً على نمط استهلاكك.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column - Inputs */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Selector */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                اختر نوع المنشأة
              </label>
              <select
                value={selectedFacility}
                onChange={handleFacilityChange}
                className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
              >
                {FACILITY_TYPES.map(facility => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Appliances List */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-500" />
                  الأجهزة الكهربائية
                </h2>
                <button
                  onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  إضافة جهاز
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right text-sm">
                  <thead className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="pb-3 font-medium">اسم الجهاز</th>
                      <th className="pb-3 font-medium w-24">العدد</th>
                      <th className="pb-3 font-medium w-32">القدرة (واط)</th>
                      <th className="pb-3 font-medium w-32">ساعات العمل/يوم</th>
                      <th className="pb-3 font-medium w-16"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {appliances.map((app, index) => (
                      <motion.tr
                        key={app.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="py-3 pr-2">
                          <input
                            type="text"
                            value={app.name}
                            onChange={(e) => handleApplianceChange(app.id, 'name', e.target.value)}
                            className="w-full bg-transparent border-none p-1 focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400"
                            placeholder="اسم الجهاز"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            min="1"
                            value={app.quantity}
                            onChange={(e) => handleApplianceChange(app.id, 'quantity', e.target.value)}
                            className="w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 p-1 text-center"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            min="0"
                            value={app.powerW}
                            onChange={(e) => handleApplianceChange(app.id, 'powerW', e.target.value)}
                            className="w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 p-1 text-center"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            min="0"
                            max="24"
                            value={app.hoursPerDay}
                            onChange={(e) => handleApplianceChange(app.id, 'hoursPerDay', e.target.value)}
                            className="w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 p-1 text-center"
                          />
                        </td>
                        <td className="py-3 pl-2 text-left">
                          <button
                            onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="حذف الجهاز"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                    {appliances.length === 0 && (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-slate-500">
                          لا توجد أجهزة مضافة.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-blue-600 dark:bg-blue-900 rounded-xl shadow-lg p-6 text-white sticky top-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-300" />
                متطلبات النظام الشمسي
              </h3>

              <div className="space-y-6">

                {/* Daily Energy */}
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-blue-100 text-sm mb-1">الاستهلاك اليومي التقريبي</div>
                  <div className="text-3xl font-bold font-mono">
                    {results.totalDailyEnergyKWh} <span className="text-base font-normal">كيلوواط/ساعة</span>
                  </div>
                </div>

                {/* Grid of details */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Panels */}
                  <div className="bg-white/10 rounded-lg p-3">
                    <Sun className="w-5 h-5 text-yellow-300 mb-2" />
                    <div className="text-blue-100 text-xs mb-1">عدد الألواح</div>
                    <div className="font-bold font-mono text-lg">
                      {results.numberOfPanels} <span className="text-xs font-normal">لوح</span>
                    </div>
                    <div className="text-[10px] text-blue-200 mt-1 opacity-80">({results.panelWattage} واط للوح)</div>
                  </div>

                  {/* Array Size */}
                  <div className="bg-white/10 rounded-lg p-3">
                    <Zap className="w-5 h-5 text-blue-300 mb-2" />
                    <div className="text-blue-100 text-xs mb-1">قدرة المصفوفة</div>
                    <div className="font-bold font-mono text-lg">
                      {results.requiredSolarArrayPowerKW} <span className="text-xs font-normal">ك.و</span>
                    </div>
                  </div>

                  {/* Inverter */}
                  <div className="bg-white/10 rounded-lg p-3">
                    <Calculator className="w-5 h-5 text-green-300 mb-2" />
                    <div className="text-blue-100 text-xs mb-1">سعة المحول (Inverter)</div>
                    <div className="font-bold font-mono text-lg">
                      {results.inverterSizeKVA} <span className="text-xs font-normal">KVA</span>
                    </div>
                  </div>

                  {/* Battery */}
                  <div className="bg-white/10 rounded-lg p-3">
                    <Battery className="w-5 h-5 text-purple-300 mb-2" />
                    <div className="text-blue-100 text-xs mb-1">سعة البطاريات ({results.systemVoltage}V)</div>
                    <div className="font-bold font-mono text-lg">
                      {results.batteryCapacityAh} <span className="text-xs font-normal">Ah</span>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-6 p-3 bg-blue-800/50 rounded-lg flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-200 leading-relaxed">
                    هذه الحسابات تقديرية وتعتمد على افتراضات معينة (مثل 5 ساعات شمس ذروة، وكفاءة نظام 80%). يُنصح باستشارة مهندس طاقة شمسية لتصميم النظام النهائي.
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
