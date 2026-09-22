import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import {
  Calculator,
  Sun,
  Battery,
  Zap,
  Plus,
  Trash2,
  RefreshCw,
  Building,
  Info
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import {
  FACILITY_TYPES,
  calculateSystemRequirements
} from '../../models/SolarCalculatorModel';

// --- Reducer Setup ---
const initialState = {
  selectedFacilityId: '',
  devices: [],
  results: null,
  isCalculating: false
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      if (!facility) return state;
      return {
        ...state,
        selectedFacilityId: facility.id,
        devices: facility.devices.map(d => ({ ...d, id: Math.random().toString(36).substr(2, 9) })), // Deep copy and new IDs
        results: null
      };
    }
    case 'UPDATE_DEVICE': {
      const { id, field, value } = action.payload;
      return {
        ...state,
        devices: state.devices.map(device =>
          device.id === id ? { ...device, [field]: Number(value) || 0 } : device
        ),
        results: null // Reset results on change
      };
    }
    case 'ADD_DEVICE': {
      return {
        ...state,
        devices: [
          ...state.devices,
          {
            id: Math.random().toString(36).substr(2, 9),
            name: 'جهاز جديد',
            power: 100,
            quantity: 1,
            hours: 4
          }
        ],
        results: null
      };
    }
    case 'REMOVE_DEVICE': {
      return {
        ...state,
        devices: state.devices.filter(d => d.id !== action.payload),
        results: null
      };
    }
    case 'CALCULATE_START': {
      return { ...state, isCalculating: true };
    }
    case 'CALCULATE_SUCCESS': {
      return {
        ...state,
        isCalculating: false,
        results: action.payload
      };
    }
    case 'RESET': {
      return initialState;
    }
    default:
      return state;
  }
}

// Chart Colors
const COLORS = ['#0ea5e9', '#3b82f6', '#8b5cf6', '#d946ef', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#14b8a6'];

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  // Derive chart data from current devices if we have results
  const chartData = state.devices.map(device => ({
    name: device.name,
    value: device.power * device.quantity * device.hours
  })).filter(item => item.value > 0);

  const handleCalculate = () => {
    if (state.devices.length === 0) {
      toast.error('الرجاء إضافة جهاز واحد على الأقل');
      return;
    }

    dispatch({ type: 'CALCULATE_START' });

    // Simulate slight delay for UX
    setTimeout(() => {
      try {
        const results = calculateSystemRequirements(state.devices);
        dispatch({ type: 'CALCULATE_SUCCESS', payload: results });
        toast.success('تم الحساب بنجاح!');
      } catch (err) {
        console.error(err);
        toast.error('حدث خطأ أثناء الحساب');
        dispatch({ type: 'CALCULATE_SUCCESS', payload: null });
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4"
          >
            <Sun className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            حاسبة الطاقة الشمسية المتقدمة
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            احسب احتياجاتك من الطاقة الشمسية بدقة. اختر نوع المنشأة الخاصة بك أو أضف أجهزتك يدوياً للحصول على تقدير لحجم النظام الشمسي المطلوب.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Input Form */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <Building className="h-5 w-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">نوع المنشأة (قوالب جاهزة)</h2>
              </div>
              <select
                value={state.selectedFacilityId}
                onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 p-3"
              >
                <option value="">-- اختر نوع المنشأة للبدء --</option>
                {FACILITY_TYPES.map(facility => (
                  <option key={facility.id} value={facility.id}>{facility.name}</option>
                ))}
              </select>
            </div>

            {/* Devices List */}
            <motion.div layout className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">الأجهزة والأحمال</h2>
                <button
                  onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4 ml-1.5" />
                  إضافة جهاز
                </button>
              </div>

              {state.devices.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                  لا توجد أجهزة مضافة. اختر منشأة أو أضف جهازاً يدوياً.
                </div>
              ) : (
                <div className="space-y-4">
                  {state.devices.map((device) => (
                    <motion.div
                      key={device.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    >
                      <div className="md:col-span-3">
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">اسم الجهاز</label>
                        <input
                          type="text"
                          value={device.name}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'name', value: e.target.value } })}
                          className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm p-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">القدرة (واط)</label>
                        <input
                          type="number"
                          min="0"
                          value={device.power}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'power', value: e.target.value } })}
                          className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm p-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">الكمية</label>
                        <input
                          type="number"
                          min="1"
                          value={device.quantity}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'quantity', value: e.target.value } })}
                          className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm p-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">ساعات العمل/يوم</label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={device.hours}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'hours', value: e.target.value } })}
                          className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm p-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="md:col-span-1 flex justify-end">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors mt-5"
                          title="حذف الجهاز"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

          </div>

          {/* Right Column: Results & Calculation */}
          <div className="space-y-6">

            {/* Action Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <button
                onClick={handleCalculate}
                disabled={state.isCalculating || state.devices.length === 0}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl transition-colors flex items-center justify-center mb-4"
              >
                {state.isCalculating ? (
                  <RefreshCw className="h-5 w-5 animate-spin ml-2" />
                ) : (
                  <Calculator className="h-5 w-5 ml-2" />
                )}
                {state.isCalculating ? 'جاري الحساب...' : 'احسب النظام الشمسي'}
              </button>

              <button
                onClick={() => dispatch({ type: 'RESET' })}
                className="w-full py-2 px-4 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors text-sm font-medium"
              >
                إعادة ضبط
              </button>
            </div>

            {/* Results Card */}
            {state.results && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-blue-100 dark:border-blue-900/30 p-6 overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-10"></div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Zap className="h-6 w-6 text-yellow-500 ml-2" />
                  نتائج التحليل
                </h2>

                <div className="space-y-5">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/50">
                    <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">الاستهلاك اليومي التقريبي</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {state.results.dailyConsumptionKWh} <span className="text-base font-normal text-gray-500">كيلوواط.ساعة (kWh)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">حجم النظام الشمسي</div>
                      <div className="font-semibold text-gray-900 dark:text-white text-lg">
                        {state.results.systemSizeKW} <span className="text-sm text-gray-500">kW</span>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">حجم الانفرتر المطلوب</div>
                      <div className="font-semibold text-gray-900 dark:text-white text-lg">
                        {state.results.inverterSizeKW} <span className="text-sm text-gray-500">kW</span>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                        <Sun className="h-3 w-3 ml-1" /> الألواح (550W)
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white text-lg">
                        {state.results.numberOfPanels} <span className="text-sm text-gray-500">لوح</span>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                        <Battery className="h-3 w-3 ml-1" /> سعة البطاريات (48V)
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white text-lg">
                        {state.results.batteryCapacityAh} <span className="text-sm text-gray-500">Ah</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-start text-xs text-gray-500 dark:text-gray-400">
                    <Info className="h-4 w-4 ml-2 flex-shrink-0 mt-0.5 text-blue-400" />
                    <p>هذه النتائج تقديرية بناءً على ساعات الذروة الشمسية القياسية (5.5 ساعات) ونسبة فاقد 30% في النظام. يوصى باستشارة مهندس مختص للتصميم النهائي.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Consumption Chart */}
            {state.results && chartData.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
              >
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">توزيع الاستهلاك (Wh)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value} Wh`, 'الاستهلاك']}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
