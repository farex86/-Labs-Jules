import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Calculator, Plus, Trash2, Zap, Battery, Sun, Server } from 'lucide-react';
import { FACILITY_TYPES, DEFAULT_DEVICES, calculateSolarSystem } from '../../models/SolarCalculatorModel';

const initialState = {
  facilityType: '',
  devices: [],
  results: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY_TYPE': {
      const type = action.payload;
      // Deep copy default devices if they exist for the type
      const defaultDevs = DEFAULT_DEVICES[type]
        ? DEFAULT_DEVICES[type].map(d => ({ ...d }))
        : [];
      return {
        ...state,
        facilityType: type,
        devices: defaultDevs,
        results: null
      };
    }
    case 'ADD_DEVICE':
      return {
        ...state,
        devices: [...state.devices, { id: Date.now().toString(), name: '', power: 0, quantity: 1, hours: 0 }]
      };
    case 'UPDATE_DEVICE':
      return {
        ...state,
        devices: state.devices.map(dev =>
          dev.id === action.payload.id ? { ...dev, [action.payload.field]: action.payload.value } : dev
        )
      };
    case 'REMOVE_DEVICE':
      return {
        ...state,
        devices: state.devices.filter(dev => dev.id !== action.payload)
      };
    case 'CALCULATE':
      return {
        ...state,
        results: calculateSolarSystem(state.devices)
      };
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCalculate = (e) => {
    e.preventDefault();
    dispatch({ type: 'CALCULATE' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Calculator className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            احسب حجم نظام الطاقة الشمسية المناسب لمنشأتك بناءً على استهلاكك اليومي
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="p-6 md:p-8 space-y-8">

            {/* Facility Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                نوع المنشأة
              </label>
              <select
                value={state.facilityType}
                onChange={(e) => dispatch({ type: 'SET_FACILITY_TYPE', payload: e.target.value })}
                className="w-full sm:w-1/2 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:text-white"
              >
                <option value="">اختر نوع المنشأة...</option>
                {FACILITY_TYPES.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Devices Form */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">الأجهزة الكهربائية</h2>
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  إضافة جهاز
                </button>
              </div>

              {state.devices.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-600">
                  لا توجد أجهزة مضافة. قم بإضافة الأجهزة لحساب الاستهلاك.
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Desktop Header */}
                  <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="col-span-4">اسم الجهاز</div>
                    <div className="col-span-2 text-center">القدرة (واط)</div>
                    <div className="col-span-2 text-center">العدد</div>
                    <div className="col-span-3 text-center">ساعات التشغيل/يوم</div>
                    <div className="col-span-1"></div>
                  </div>

                  {/* Device Rows */}
                  {state.devices.map((device, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={device.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl md:rounded-none md:border-none md:border-b items-center shadow-sm md:shadow-none"
                    >
                      <div className="col-span-1 md:col-span-4 space-y-1 md:space-y-0">
                        <label className="md:hidden text-xs text-gray-500">اسم الجهاز</label>
                        <input
                          type="text"
                          value={device.name}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'name', value: e.target.value } })}
                          placeholder="مثال: مكيف، ثلاجة..."
                          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                      </div>
                      <div className="col-span-1 md:col-span-2 space-y-1 md:space-y-0">
                        <label className="md:hidden text-xs text-gray-500">القدرة (واط)</label>
                        <input
                          type="number"
                          min="0"
                          value={device.power || ''}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'power', value: e.target.value } })}
                          className="w-full px-3 py-2 text-center bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                      </div>
                      <div className="col-span-1 md:col-span-2 space-y-1 md:space-y-0">
                        <label className="md:hidden text-xs text-gray-500">العدد</label>
                        <input
                          type="number"
                          min="1"
                          value={device.quantity || ''}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'quantity', value: e.target.value } })}
                          className="w-full px-3 py-2 text-center bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                      </div>
                      <div className="col-span-1 md:col-span-3 space-y-1 md:space-y-0">
                        <label className="md:hidden text-xs text-gray-500">ساعات التشغيل (يومياً)</label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={device.hours || ''}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'hours', value: e.target.value } })}
                          className="w-full px-3 py-2 text-center bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                      </div>
                      <div className="col-span-1 flex justify-end md:justify-center mt-2 md:mt-0">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          title="حذف الجهاز"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-center">
              <button
                onClick={handleCalculate}
                disabled={state.devices.length === 0}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2 text-lg"
              >
                <Calculator className="w-5 h-5" />
                احسب النظام المناسب
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {state.results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {/* Total Energy */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4 text-orange-500">
                <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">الاستهلاك اليومي</h3>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {(state.results.totalDailyEnergyWh / 1000).toFixed(1)} <span className="text-sm font-normal text-gray-500">كيلوواط/ساعة</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">إجمالي الطاقة المطلوبة يومياً</p>
            </div>

            {/* Panels */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4 text-blue-500">
                <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                  <Sun className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">الألواح الشمسية</h3>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {state.results.numberOfPanels} <span className="text-sm font-normal text-gray-500">لوح</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">بقدرة {state.results.panelPowerW} واط للوح الواحد</p>
            </div>

            {/* Inverter */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4 text-indigo-500">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg">
                  <Server className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">المحول (Inverter)</h3>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {(state.results.inverterSizeW / 1000).toFixed(1)} <span className="text-sm font-normal text-gray-500">كيلوواط</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">القدرة المطلوبة لتشغيل الأجهزة</p>
            </div>

            {/* Battery */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4 text-green-500">
                <div className="p-2 bg-green-50 dark:bg-green-500/10 rounded-lg">
                  <Battery className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">البطاريات ({state.results.batteryVoltage}V)</h3>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {state.results.batteryCapacityAh} <span className="text-sm font-normal text-gray-500">Ah</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">سعة التخزين المطلوبة</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
