import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import toast, { Toaster } from 'react-hot-toast';
import { Calculator, Plus, Trash2, Zap, Sun, Battery, Server } from 'lucide-react';
import { FACILITY_TYPES, DEFAULT_APPLIANCES, calculateSolarSystemRequirements } from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacility: '',
  appliances: [],
  results: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const defaultApps = DEFAULT_APPLIANCES[action.payload];
      // Deep copy to prevent mutating constants
      const newAppliances = defaultApps ? defaultApps.map(app => ({ ...app })) : [];
      return {
        ...state,
        selectedFacility: action.payload,
        appliances: newAppliances,
        results: null
      };
    }
    case 'ADD_APPLIANCE':
      return {
        ...state,
        appliances: [...state.appliances, { id: `app-${Date.now()}`, name: '', power: '', qty: 1, hours: '' }],
        results: null
      };
    case 'UPDATE_APPLIANCE': {
      const updatedAppliances = state.appliances.map(app =>
        app.id === action.payload.id ? { ...app, [action.payload.field]: action.payload.value } : app
      );
      return { ...state, appliances: updatedAppliances, results: null };
    }
    case 'REMOVE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.filter(app => app.id !== action.payload),
        results: null
      };
    case 'CALCULATE':
      return {
        ...state,
        results: calculateSolarSystemRequirements(state.appliances)
      };
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Derived state to handle side effects
  const calculateRequirements = () => {
    if (state.appliances.length === 0) {
      toast.error('الرجاء إضافة أجهزة لحساب الاستهلاك');
      return;
    }
    dispatch({ type: 'CALCULATE' });
    toast.success('تم حساب الاحتياجات بنجاح');
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Sun className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">حاسبة الطاقة الشمسية</h1>
          <p className="mt-4 text-lg text-gray-600">
            احسب احتياجات منشأتك من الطاقة الشمسية بناءً على نمط استهلاكك
          </p>
        </motion.div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="p-8">

            {/* Facility Selection */}
            <div className="mb-8">
              <label htmlFor="facility-type" className="block text-sm font-semibold text-gray-700 mb-3">
                اختر نوع المنشأة
              </label>
              <select
                id="facility-type"
                value={state.selectedFacility}
                onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
                className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-base py-3 px-4 bg-gray-50 hover:bg-white transition-colors"
              >
                <option value="">-- اختر منشأة --</option>
                {FACILITY_TYPES.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>

            {/* Appliances List */}
            {state.selectedFacility && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <Zap className="w-5 h-5 ml-2 text-yellow-500" />
                    الأجهزة الكهربائية
                  </h3>
                  <button
                    onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <Plus className="w-4 h-4 ml-1" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="space-y-4">
                  {state.appliances.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">لا توجد أجهزة مضافة. قم بإضافة أجهزة لحساب الاستهلاك.</p>
                  ) : (
                    state.appliances.map((app, index) => (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={app.id}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-gray-50 p-4 rounded-xl border border-gray-200"
                      >
                        <div className="md:col-span-4">
                          <label className="block text-xs font-medium text-gray-500 mb-1">اسم الجهاز</label>
                          <input
                            type="text"
                            value={app.name}
                            onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'name', value: e.target.value } })}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="مثال: مكيف"
                          />
                        </div>
                        <div className="md:col-span-3">
                          <label className="block text-xs font-medium text-gray-500 mb-1">القدرة (واط)</label>
                          <input
                            type="number"
                            value={app.power}
                            onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'power', value: e.target.value } })}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="واط"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-gray-500 mb-1">الكمية</label>
                          <input
                            type="number"
                            min="1"
                            value={app.qty}
                            onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'qty', value: e.target.value } })}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-gray-500 mb-1">ساعات العمل</label>
                          <input
                            type="number"
                            min="1"
                            max="24"
                            value={app.hours}
                            onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'hours', value: e.target.value } })}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        <div className="md:col-span-1 flex justify-center">
                          <button
                            onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="حذف الجهاز"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                <div className="pt-6">
                  <button
                    onClick={calculateRequirements}
                    className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.02]"
                  >
                    <Calculator className="w-6 h-6 ml-2" />
                    احسب الاحتياجات
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Results Section */}
          {state.results && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-blue-50 border-t border-blue-100 p-8"
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
                <Sun className="w-6 h-6 ml-2 text-blue-600" />
                النظام الشمسي المقترح
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
                  <div className="flex items-center text-gray-500 mb-2">
                    <Zap className="w-5 h-5 ml-2 text-yellow-500" />
                    <span className="text-sm font-medium">الاستهلاك اليومي</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {state.results.totalDailyEnergyKWh.toFixed(2)} <span className="text-sm font-normal text-gray-500">كيلوواط/ساعة</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
                  <div className="flex items-center text-gray-500 mb-2">
                    <Server className="w-5 h-5 ml-2 text-blue-500" />
                    <span className="text-sm font-medium">قدرة المحول (Inverter)</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {state.results.recommendedInverterKW.toFixed(2)} <span className="text-sm font-normal text-gray-500">كيلوواط</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
                  <div className="flex items-center text-gray-500 mb-2">
                    <Sun className="w-5 h-5 ml-2 text-orange-500" />
                    <span className="text-sm font-medium">عدد الألواح (500W)</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {state.results.numberOfPanels} <span className="text-sm font-normal text-gray-500">لوح</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    إجمالي القدرة: {state.results.requiredSolarCapacityKW.toFixed(2)} kW
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
                  <div className="flex items-center text-gray-500 mb-2">
                    <Battery className="w-5 h-5 ml-2 text-green-500" />
                    <span className="text-sm font-medium">سعة البطاريات (48V)</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.ceil(state.results.requiredBatteryCapacityAh)} <span className="text-sm font-normal text-gray-500">Ah</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
