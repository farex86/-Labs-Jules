import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { Calculator, Plus, Trash2, Zap, Battery, Sun } from 'lucide-react';
import { FACILITY_CONSUMPTION_PATTERNS, calculateSystemRequirements } from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacilityId: '',
  appliances: [],
  customApplianceName: '',
  customAppliancePower: '',
  customApplianceHours: '',
  customApplianceCount: '1',
  calculationResult: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facility = FACILITY_CONSUMPTION_PATTERNS.find(f => f.id === action.payload);
      return {
        ...state,
        selectedFacilityId: action.payload,
        // Deep copy the appliances to avoid mutating constants
        appliances: facility ? facility.appliances.map(a => ({ ...a })) : [],
        calculationResult: null,
      };
    }
    case 'ADD_CUSTOM_APPLIANCE': {
      if (!state.customApplianceName || !state.customAppliancePower || !state.customApplianceHours) {
        return state; // Validation handled in UI before dispatching or just ignore
      }
      const newAppliance = {
        id: Date.now().toString(),
        name: state.customApplianceName,
        powerW: Number(state.customAppliancePower),
        hours: Number(state.customApplianceHours),
        count: Number(state.customApplianceCount),
      };
      return {
        ...state,
        appliances: [...state.appliances, newAppliance],
        customApplianceName: '',
        customAppliancePower: '',
        customApplianceHours: '',
        customApplianceCount: '1',
        calculationResult: null,
      };
    }
    case 'REMOVE_APPLIANCE': {
      return {
        ...state,
        appliances: state.appliances.filter(a => a.id !== action.payload),
        calculationResult: null,
      };
    }
    case 'UPDATE_APPLIANCE': {
      return {
        ...state,
        appliances: state.appliances.map(a =>
          a.id === action.payload.id ? { ...a, [action.payload.field]: Number(action.payload.value) } : a
        ),
        calculationResult: null,
      };
    }
    case 'SET_FIELD': {
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    }
    case 'CALCULATE': {
      const totalDailyWh = state.appliances.reduce((sum, app) => sum + (app.powerW * app.hours * app.count), 0);
      if (totalDailyWh === 0) return state;
      const result = calculateSystemRequirements(totalDailyWh);
      return {
        ...state,
        calculationResult: result,
      };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCalculate = () => {
    if (state.appliances.length === 0) {
      toast.error('الرجاء إضافة أجهزة أو اختيار نوع المنشأة');
      return;
    }
    dispatch({ type: 'CALCULATE' });
    toast.success('تم الحساب بنجاح');
  };

  const handleAddAppliance = (e) => {
    e.preventDefault();
    if (!state.customApplianceName || !state.customAppliancePower || !state.customApplianceHours) {
      toast.error('الرجاء تعبئة جميع الحقول المطلوبة للجهاز');
      return;
    }
    dispatch({ type: 'ADD_CUSTOM_APPLIANCE' });
    toast.success('تمت إضافة الجهاز');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-4 space-x-reverse mb-4"
          >
            <Calculator className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              الحاسبة الشمسية
            </h1>
          </motion.div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك واستهلاكك
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Form & Inputs */}
          <div className="md:col-span-2 space-y-6">

            {/* Facility Selection */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اختر نوع المنشأة للبدء بأنماط الاستهلاك الجاهزة
              </label>
              <select
                value={state.selectedFacilityId}
                onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
                className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-3 px-4"
              >
                <option value="">-- اختر المنشأة --</option>
                {FACILITY_CONSUMPTION_PATTERNS.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Appliances List */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">الأجهزة الكهربائية</h3>

              {state.appliances.length > 0 ? (
                <div className="space-y-3 mb-6">
                  {state.appliances.map((appliance) => (
                    <motion.div
                      key={appliance.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-100 dark:border-gray-600"
                    >
                      <div className="flex-1 font-medium text-gray-900 dark:text-white">
                        {appliance.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col">
                          <label className="text-xs text-gray-500 dark:text-gray-400">العدد</label>
                          <input
                            type="number"
                            min="1"
                            value={appliance.count}
                            onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: appliance.id, field: 'count', value: e.target.value } })}
                            className="w-16 text-center rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white py-1"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs text-gray-500 dark:text-gray-400">واط</label>
                          <input
                            type="number"
                            min="1"
                            value={appliance.powerW}
                            onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: appliance.id, field: 'powerW', value: e.target.value } })}
                            className="w-20 text-center rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white py-1"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs text-gray-500 dark:text-gray-400">ساعات/يوم</label>
                          <input
                            type="number"
                            min="1"
                            max="24"
                            value={appliance.hours}
                            onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: appliance.id, field: 'hours', value: e.target.value } })}
                            className="w-16 text-center rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white py-1"
                          />
                        </div>
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: appliance.id })}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors mt-4 sm:mt-0"
                          title="حذف الجهاز"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4 mb-6">لم يتم إضافة أي أجهزة بعد.</p>
              )}

              {/* Add Custom Appliance */}
              <form onSubmit={handleAddAppliance} className="border-t border-gray-100 dark:border-gray-700 pt-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">إضافة جهاز مخصص</h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="col-span-2 sm:col-span-2">
                    <input
                      type="text"
                      placeholder="اسم الجهاز"
                      value={state.customApplianceName}
                      onChange={(e) => dispatch({ type: 'SET_FIELD', payload: { field: 'customApplianceName', value: e.target.value } })}
                      className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="القدرة (واط)"
                      value={state.customAppliancePower}
                      onChange={(e) => dispatch({ type: 'SET_FIELD', payload: { field: 'customAppliancePower', value: e.target.value } })}
                      className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="الساعات"
                      max="24"
                      value={state.customApplianceHours}
                      onChange={(e) => dispatch({ type: 'SET_FIELD', payload: { field: 'customApplianceHours', value: e.target.value } })}
                      className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" /> إضافة
                    </button>
                  </div>
                </div>
              </form>
            </div>

          </div>

          {/* Results Panel */}
          <div className="md:col-span-1">
            <div className="bg-emerald-600 rounded-2xl shadow-lg p-6 text-white sticky top-6">
              <h3 className="text-xl font-bold mb-6">النتائج المتوقعة</h3>

              <button
                onClick={handleCalculate}
                className="w-full bg-white text-emerald-700 font-bold py-3 px-4 rounded-xl shadow hover:bg-gray-50 transition-colors mb-8"
              >
                احسب الاحتياج
              </button>

              {state.calculationResult ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="bg-emerald-700/50 p-4 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="w-5 h-5 text-yellow-300" />
                      <span className="font-semibold text-emerald-50">الاستهلاك اليومي</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {(state.calculationResult.totalDailyWh / 1000).toFixed(2)} <span className="text-sm font-normal opacity-80">كيلوواط/ساعة</span>
                    </div>
                  </div>

                  <div className="bg-emerald-700/50 p-4 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Sun className="w-5 h-5 text-yellow-300" />
                      <span className="font-semibold text-emerald-50">الألواح الشمسية</span>
                    </div>
                    <div className="text-xl font-bold">
                      {state.calculationResult.recommendedPanelsCount} <span className="text-sm font-normal opacity-80">لوح ({state.calculationResult.panelWattage}W)</span>
                    </div>
                    <div className="text-sm mt-1 opacity-80">إجمالي القدرة: {(state.calculationResult.requiredSolarArrayW / 1000).toFixed(2)} kW</div>
                  </div>

                  <div className="bg-emerald-700/50 p-4 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Battery className="w-5 h-5 text-yellow-300" />
                      <span className="font-semibold text-emerald-50">البطاريات ({state.calculationResult.batteryVoltage}V)</span>
                    </div>
                    <div className="text-xl font-bold">
                      {state.calculationResult.recommendedBatteriesCount} <span className="text-sm font-normal opacity-80">بطارية ({state.calculationResult.batteryAh}Ah)</span>
                    </div>
                    <div className="text-sm mt-1 opacity-80">السعة المطلوبة: {state.calculationResult.requiredBatteryCapacityAh} Ah</div>
                  </div>

                  <div className="bg-emerald-700/50 p-4 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="w-5 h-5 text-yellow-300" />
                      <span className="font-semibold text-emerald-50">المحول (Inverter)</span>
                    </div>
                    <div className="text-xl font-bold">
                      {state.calculationResult.estimatedInverterW / 1000} <span className="text-sm font-normal opacity-80">كيلوواط</span>
                    </div>
                  </div>

                </motion.div>
              ) : (
                <div className="text-center text-emerald-100/60 py-8">
                  <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>أدخل الأجهزة واضغط على "احسب الاحتياج" لرؤية النتائج</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
