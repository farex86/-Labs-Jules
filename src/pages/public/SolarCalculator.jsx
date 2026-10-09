import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { Settings, Plus, Trash2, Calculator, Zap, BatteryCharging, PanelTop } from 'lucide-react';
import { FACILITY_TYPES, APPLIANCE_DEFAULTS, calculateSystemRequirements } from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacility: '',
  appliances: [],
  results: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facility = action.payload;
      const defaultAppliances = APPLIANCE_DEFAULTS[facility]
        ? APPLIANCE_DEFAULTS[facility].map(app => ({ ...app, id: Math.random().toString(36).substr(2, 9) }))
        : [];
      return {
        ...state,
        selectedFacility: facility,
        appliances: defaultAppliances,
        results: null,
      };
    }
    case 'ADD_APPLIANCE': {
      const newAppliance = {
        id: Math.random().toString(36).substr(2, 9),
        name: 'جهاز جديد',
        watts: 100,
        quantity: 1,
        hours: 5,
      };
      return {
        ...state,
        appliances: [...state.appliances, newAppliance],
        results: null,
      };
    }
    case 'UPDATE_APPLIANCE': {
      const { id, field, value } = action.payload;
      return {
        ...state,
        appliances: state.appliances.map(app =>
          app.id === id ? { ...app, [field]: value } : app
        ),
        results: null,
      };
    }
    case 'REMOVE_APPLIANCE': {
      return {
        ...state,
        appliances: state.appliances.filter(app => app.id !== action.payload),
        results: null,
      };
    }
    case 'CALCULATE_RESULTS': {
      return {
        ...state,
        results: calculateSystemRequirements(state.appliances),
      };
    }
    case 'RESET': {
      return initialState;
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCalculate = () => {
    if (state.appliances.length === 0) {
      toast.error('الرجاء إضافة جهاز واحد على الأقل');
      return;
    }
    dispatch({ type: 'CALCULATE_RESULTS' });
    toast.success('تم الحساب بنجاح');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-6 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
            <Calculator size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">حاسبة الطاقة الشمسية</h1>
          <p className="text-gray-500">احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك</p>
        </motion.div>

        {/* Facility Selection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Settings className="text-blue-500" />
            اختر نوع المنشأة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {FACILITY_TYPES.map((facility) => (
              <button
                key={facility}
                onClick={() => dispatch({ type: 'SET_FACILITY', payload: facility })}
                className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                  state.selectedFacility === facility
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                {facility}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Appliances List */}
        {state.selectedFacility && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-6 space-y-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Zap className="text-yellow-500" />
                الأجهزة الكهربائية
              </h2>
              <button
                onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                <Plus size={16} />
                إضافة جهاز
              </button>
            </div>

            <div className="space-y-3">
              {state.appliances.map((appliance) => (
                <motion.div
                  key={appliance.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col md:flex-row gap-3 items-end p-4 border border-gray-100 rounded-xl bg-gray-50"
                >
                  <div className="flex-1 w-full">
                    <label className="block text-xs text-gray-500 mb-1">اسم الجهاز</label>
                    <input
                      type="text"
                      value={appliance.name}
                      onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: appliance.id, field: 'name', value: e.target.value } })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                  </div>
                  <div className="w-full md:w-24">
                    <label className="block text-xs text-gray-500 mb-1">الواط (W)</label>
                    <input
                      type="number"
                      min="0"
                      value={appliance.watts}
                      onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: appliance.id, field: 'watts', value: Number(e.target.value) } })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                  </div>
                  <div className="w-full md:w-24">
                    <label className="block text-xs text-gray-500 mb-1">العدد</label>
                    <input
                      type="number"
                      min="1"
                      value={appliance.quantity}
                      onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: appliance.id, field: 'quantity', value: Number(e.target.value) } })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                  </div>
                  <div className="w-full md:w-24">
                    <label className="block text-xs text-gray-500 mb-1">ساعات العمل</label>
                    <input
                      type="number"
                      min="1"
                      max="24"
                      value={appliance.hours}
                      onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: appliance.id, field: 'hours', value: Number(e.target.value) } })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                  </div>
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: appliance.id })}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors h-10 w-full md:w-auto flex items-center justify-center"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}

              {state.appliances.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  لا توجد أجهزة مضافة. انقر على "إضافة جهاز" للبدء.
                </div>
              )}
            </div>

            <button
              onClick={handleCalculate}
              className="w-full py-4 mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
            >
              احسب الاحتياجات
            </button>
          </motion.div>
        )}

        {/* Results */}
        {state.results && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center text-center border-t-4 border-blue-500">
              <PanelTop size={32} className="text-blue-500 mb-3" />
              <h3 className="text-gray-500 text-sm font-medium mb-1">الألواح الشمسية (500W)</h3>
              <p className="text-3xl font-bold text-gray-900">{state.results.recommendedPanels} <span className="text-base font-normal text-gray-500">لوح</span></p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center text-center border-t-4 border-green-500">
              <Zap size={32} className="text-green-500 mb-3" />
              <h3 className="text-gray-500 text-sm font-medium mb-1">المحول (Inverter)</h3>
              <p className="text-3xl font-bold text-gray-900">{state.results.recommendedInverterKw} <span className="text-base font-normal text-gray-500">kW</span></p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center text-center border-t-4 border-yellow-500">
              <BatteryCharging size={32} className="text-yellow-500 mb-3" />
              <h3 className="text-gray-500 text-sm font-medium mb-1">سعة البطاريات (48V)</h3>
              <p className="text-3xl font-bold text-gray-900">{state.results.recommendedBatteriesAh} <span className="text-base font-normal text-gray-500">Ah</span></p>
            </div>

            <div className="col-span-1 md:col-span-3 bg-white rounded-2xl shadow-sm p-6 text-center text-sm text-gray-500">
              <p>إجمالي الحمل: <strong>{state.results.totalWatts} واط</strong> | الاستهلاك اليومي: <strong>{(state.results.dailyEnergyWh / 1000).toFixed(2)} كيلوواط ساعة</strong></p>
              <p className="mt-2 text-xs text-gray-400">* هذه الحسابات تقديرية وتعتمد على كفاءة الأجهزة ونسبة الفقد وظروف التشغيل الفعلية.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
