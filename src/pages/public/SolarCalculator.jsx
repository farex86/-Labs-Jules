import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { toast } from 'react-hot-toast';
import { Plus, Trash2, Calculator, Settings, AlertCircle, RefreshCw } from 'lucide-react';
import { facilityTypes, commonAppliances, calculateSolarRequirements } from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacility: '',
  appliances: [],
  results: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY':
      return { ...state, selectedFacility: action.payload };
    case 'ADD_APPLIANCE': {
      const newAppliance = action.payload;
      return { ...state, appliances: [...state.appliances, { ...newAppliance, id: Date.now() + Math.random().toString() }] };
    }
    case 'REMOVE_APPLIANCE':
      return { ...state, appliances: state.appliances.filter(a => a.id !== action.payload) };
    case 'UPDATE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.map(a =>
          a.id === action.payload.id ? { ...a, [action.payload.field]: action.payload.value } : a
        )
      };
    case 'CALCULATE':
      return { ...state, results: calculateSolarRequirements(state.appliances) };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCalculate = () => {
    if (state.appliances.length === 0) {
      toast.error('الرجاء إضافة جهاز واحد على الأقل لحساب الاحتياجات');
      return;
    }
    dispatch({ type: 'CALCULATE' });
    toast.success('تم حساب الاحتياجات بنجاح');
  };

  const handleAddAppliance = (e) => {
    const applianceId = e.target.value;
    if (!applianceId) return;

    const applianceTemplate = commonAppliances.find(a => a.id === applianceId);
    if (applianceTemplate) {
      dispatch({
        type: 'ADD_APPLIANCE',
        payload: {
          name: applianceTemplate.name,
          wattage: applianceTemplate.defaultWattage,
          quantity: 1,
          hoursPerDay: applianceTemplate.defaultHours
        }
      });
      e.target.value = ''; // Reset select
    }
  };

  const handleAddCustomAppliance = () => {
    dispatch({
      type: 'ADD_APPLIANCE',
      payload: {
        name: 'جهاز مخصص',
        wattage: 100,
        quantity: 1,
        hoursPerDay: 4
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg text-blue-600 dark:text-blue-300">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">حاسبة الطاقة الشمسية</h1>
              <p className="text-gray-500 dark:text-gray-400">احسب احتياجاتك من الطاقة الشمسية بناءً على استهلاكك</p>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              نوع المنشأة / النمط الاستهلاكي
            </label>
            <select
              value={state.selectedFacility}
              onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
              className="w-full md:w-1/2 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            >
              <option value="">-- اختر نوع المنشأة --</option>
              {facilityTypes.map(ft => (
                <option key={ft.id} value={ft.id}>{ft.name}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Appliances List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-400" />
              الأجهزة الكهربائية
            </h2>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <select
                onChange={handleAddAppliance}
                defaultValue=""
                className="rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border flex-1"
              >
                <option value="" disabled>+ إضافة جهاز شائع</option>
                {commonAppliances.map(app => (
                  <option key={app.id} value={app.id}>{app.name}</option>
                ))}
              </select>
              <button
                onClick={handleAddCustomAppliance}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                جهاز مخصص
              </button>
            </div>
          </div>

          {state.appliances.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p>لم يتم إضافة أي أجهزة بعد. ابدأ بإضافة الأجهزة لحساب استهلاكك.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Desktop Header - hidden on mobile */}
              <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 dark:text-gray-400 px-2">
                <div className="col-span-4">اسم الجهاز</div>
                <div className="col-span-2">الكمية</div>
                <div className="col-span-2">الاستهلاك (واط)</div>
                <div className="col-span-3">ساعات التشغيل/يوم</div>
                <div className="col-span-1 text-center">حذف</div>
              </div>

              {state.appliances.map((appliance, index) => (
                <motion.div
                  key={appliance.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-600"
                >
                  <div className="col-span-1 md:col-span-4">
                    <label className="md:hidden text-xs text-gray-500 block mb-1">اسم الجهاز</label>
                    <input
                      type="text"
                      value={appliance.name}
                      onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: appliance.id, field: 'name', value: e.target.value } })}
                      className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 border focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="md:hidden text-xs text-gray-500 block mb-1">الكمية</label>
                    <input
                      type="number"
                      min="1"
                      value={appliance.quantity}
                      onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: appliance.id, field: 'quantity', value: Number(e.target.value) } })}
                      className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 border focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="md:hidden text-xs text-gray-500 block mb-1">الاستهلاك (واط)</label>
                    <input
                      type="number"
                      min="1"
                      value={appliance.wattage}
                      onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: appliance.id, field: 'wattage', value: Number(e.target.value) } })}
                      className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 border focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-3">
                    <label className="md:hidden text-xs text-gray-500 block mb-1">ساعات التشغيل/يوم</label>
                    <input
                      type="number"
                      min="0.1"
                      max="24"
                      step="0.5"
                      value={appliance.hoursPerDay}
                      onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: appliance.id, field: 'hoursPerDay', value: Number(e.target.value) } })}
                      className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 border focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-1 flex justify-end md:justify-center">
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: appliance.id })}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="حذف الجهاز"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 flex gap-4">
            <button
              onClick={handleCalculate}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <RefreshCw className="w-5 h-5" />
              حساب الاحتياجات
            </button>
            {state.results && (
              <button
                onClick={() => dispatch({ type: 'RESET' })}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl transition-colors font-medium"
              >
                إعادة ضبط
              </button>
            )}
          </div>
        </motion.div>

        {/* Results */}
        {state.results && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calculator className="w-6 h-6" />
              النتائج المقدرة
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <div className="text-blue-100 text-sm mb-1">الاستهلاك اليومي</div>
                <div className="text-2xl font-bold font-mono">
                  {(state.results.dailyConsumptionWh / 1000).toFixed(2)} <span className="text-lg">kWh</span>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <div className="text-blue-100 text-sm mb-1">حجم المحول (Inverter)</div>
                <div className="text-2xl font-bold font-mono">
                  {state.results.inverterSizeVA} <span className="text-lg">VA</span>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <div className="text-blue-100 text-sm mb-1">عدد الألواح (500W)</div>
                <div className="text-2xl font-bold font-mono">
                  {state.results.panelCount} <span className="text-lg">لوح</span>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <div className="text-blue-100 text-sm mb-1">عدد البطاريات (12V 200Ah)</div>
                <div className="text-2xl font-bold font-mono">
                  {state.results.batteryCount} <span className="text-lg">بطارية</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm text-blue-100/80 text-center">
              * هذه الحسابات تقديرية وتعتمد على ساعات التشغيل وكفاءة النظام. ينصح باستشارة مهندس مختص للحصول على تصميم دقيق.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
