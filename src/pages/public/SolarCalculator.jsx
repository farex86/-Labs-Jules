import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import {
  FACILITY_TYPES,
  COMMON_APPLIANCES,
  calculateSolarSystem,
  getDefaultAppliancesForFacility,
  createEmptyAppliance
} from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacility: null,
  appliances: [],
  results: null
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facilityId = action.payload;
      const defaultApps = getDefaultAppliancesForFacility(facilityId);
      return {
        ...state,
        selectedFacility: facilityId,
        appliances: defaultApps,
        results: null
      };
    }
    case 'ADD_APPLIANCE': {
      const newApp = action.payload || createEmptyAppliance();
      return {
        ...state,
        appliances: [...state.appliances, newApp],
        results: null
      };
    }
    case 'UPDATE_APPLIANCE': {
      const { id, field, value } = action.payload;
      const updatedApps = state.appliances.map(app =>
        app.id === id ? { ...app, [field]: value } : app
      );
      return {
        ...state,
        appliances: updatedApps,
        results: null
      };
    }
    case 'REMOVE_APPLIANCE': {
      const filteredApps = state.appliances.filter(app => app.id !== action.payload);
      return {
        ...state,
        appliances: filteredApps,
        results: null
      };
    }
    case 'CALCULATE': {
      const results = calculateSolarSystem(state.appliances);
      return {
        ...state,
        results
      };
    }
    case 'RESET': {
      return initialState;
    }
    default:
      return state;
  }
}

const IconComponent = ({ name, className }) => {
  const Icon = Icons[name] || Icons.HelpCircle;
  return <Icon className={className} />;
};

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handleFacilitySelect = (id) => {
    dispatch({ type: 'SET_FACILITY', payload: id });
  };

  const handleAddAppliance = () => {
    dispatch({ type: 'ADD_APPLIANCE' });
  };

  const handleAddCommonAppliance = (app) => {
    const newApp = createEmptyAppliance();
    newApp.name = app.name;
    newApp.power = app.power;
    dispatch({ type: 'ADD_APPLIANCE', payload: newApp });
  };

  const handleUpdateAppliance = (id, field, value) => {
    dispatch({ type: 'UPDATE_APPLIANCE', payload: { id, field, value } });
  };

  const handleRemoveAppliance = (id) => {
    dispatch({ type: 'REMOVE_APPLIANCE', payload: id });
  };

  const handleCalculate = () => {
    dispatch({ type: 'CALCULATE' });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-8 rtl" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-8">

        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">حاسبة الطاقة الشمسية</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع المنشأة والأجهزة المستخدمة.
          </p>
        </header>

        {/* Step 1: Select Facility */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Icons.Building2 className="text-blue-500" />
            <span>1. اختر نوع المنشأة</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {FACILITY_TYPES.map(facility => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={facility.id}
                onClick={() => handleFacilitySelect(facility.id)}
                className={`p-4 rounded-xl flex flex-col items-center justify-center gap-3 transition-colors border-2 ${
                  state.selectedFacility === facility.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-transparent bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <IconComponent name={facility.icon} className="w-8 h-8 text-blue-500" />
                <span className="text-sm font-medium text-center">{facility.name}</span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Step 2: Appliances */}
        {state.selectedFacility && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Icons.Zap className="text-yellow-500" />
                <span>2. الأجهزة والاستهلاك</span>
              </h2>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={handleAddAppliance}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Icons.Plus size={20} />
                  إضافة جهاز
                </button>
              </div>
            </div>

            {/* Common Appliances Quick Add */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-500 py-1">إضافة سريعة:</span>
              {COMMON_APPLIANCES.map((app, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAddCommonAppliance(app)}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                >
                  {app.name}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="border-b dark:border-gray-700 text-gray-500 dark:text-gray-400">
                    <th className="pb-3 font-medium">اسم الجهاز</th>
                    <th className="pb-3 font-medium">الاستهلاك (واط)</th>
                    <th className="pb-3 font-medium">العدد</th>
                    <th className="pb-3 font-medium">ساعات العمل (يومياً)</th>
                    <th className="pb-3 font-medium w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {state.appliances.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-8 text-gray-500">
                        لا توجد أجهزة مضافة. قم بإضافة جهاز للبدء.
                      </td>
                    </tr>
                  ) : (
                    state.appliances.map(app => (
                      <tr key={app.id} className="border-b dark:border-gray-700/50">
                        <td className="py-3 pr-2">
                          <input
                            type="text"
                            value={app.name}
                            onChange={(e) => handleUpdateAppliance(app.id, 'name', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="اسم الجهاز"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            min="0"
                            value={app.power}
                            onChange={(e) => handleUpdateAppliance(app.id, 'power', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="واط"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            min="1"
                            value={app.quantity}
                            onChange={(e) => handleUpdateAppliance(app.id, 'quantity', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            min="0"
                            max="24"
                            value={app.hours}
                            onChange={(e) => handleUpdateAppliance(app.id, 'hours', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </td>
                        <td className="py-3 pl-2 text-left">
                          <button
                            onClick={() => handleRemoveAppliance(app.id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <Icons.Trash2 size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-4 gap-4">
              <button
                onClick={handleReset}
                className="px-6 py-3 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors font-medium"
              >
                إعادة ضبط
              </button>
              <button
                onClick={handleCalculate}
                disabled={state.appliances.length === 0}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl transition-colors font-medium shadow-lg shadow-green-500/30 flex items-center gap-2"
              >
                <Icons.Calculator size={20} />
                احسب النظام
              </button>
            </div>
          </motion.section>
        )}

        {/* Step 3: Results */}
        {state.results && (
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6 border-t-4 border-green-500"
          >
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Icons.Sun className="text-orange-500" />
              <span>3. النظام المقترح</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl text-center">
                <Icons.PanelTop className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-1">حجم الألواح المطلوبة</h3>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                  {state.results.solarArrayCapacityW} <span className="text-base font-normal">واط</span>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl text-center">
                <Icons.BatteryCharging className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-1">سعة البطاريات ({state.results.batteryVoltage}V)</h3>
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                  {state.results.batteryCapacityAh} <span className="text-base font-normal">أمبير-ساعة</span>
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl text-center">
                <Icons.Zap className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-1">حجم المحول (الإنفيرتر)</h3>
                <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                  {state.results.inverterCapacityW} <span className="text-base font-normal">واط</span>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl text-center">
                <Icons.Activity className="w-10 h-10 text-green-500 mx-auto mb-3" />
                <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-1">الاستهلاك اليومي</h3>
                <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                  {state.results.totalDailyEnergyWH} <span className="text-base font-normal">واط-ساعة</span>
                </div>
              </div>

            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl text-sm text-yellow-800 dark:text-yellow-200 mt-4 flex items-start gap-3">
              <Icons.Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>
                هذه الحسابات تقديرية وتعتمد على ساعات الإشعاع الشمسي (حوالي 5.5 ساعات) وكفاءة النظام الافتراضية.
                يُنصح دائماً باستشارة مهندس متخصص قبل شراء المعدات.
              </p>
            </div>

          </motion.section>
        )}

      </div>
    </div>
  );
}
