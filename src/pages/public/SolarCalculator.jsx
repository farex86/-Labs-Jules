import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Plus, Trash2, Calculator, Settings, Zap, Battery, Sun, ChevronDown } from 'lucide-react';
import { FACILITY_TYPES, calculateSystemRequirements } from '../../models/SolarCalculatorModel';
import toast from 'react-hot-toast';

const initialState = {
  selectedFacility: '',
  devices: [],
  results: null,
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facilityId = action.payload;
      const facility = FACILITY_TYPES.find(f => f.id === facilityId);
      if (facility) {
         // Deep copy devices to prevent mutating constant data
         const newDevices = facility.defaultDevices.map(d => ({ ...d, id: Math.random().toString(36).substr(2, 9) }));
         return { ...state, selectedFacility: facilityId, devices: newDevices, results: null };
      }
      return { ...state, selectedFacility: facilityId, devices: [], results: null };
    }
    case 'ADD_DEVICE': {
      const newDevice = { id: Math.random().toString(36).substr(2, 9), name: '', power: 0, quantity: 1, hours: 0 };
      return { ...state, devices: [...state.devices, newDevice], results: null };
    }
    case 'UPDATE_DEVICE': {
      const { id, field, value } = action.payload;
      const updatedDevices = state.devices.map(d => d.id === id ? { ...d, [field]: value } : d);
      return { ...state, devices: updatedDevices, results: null };
    }
    case 'REMOVE_DEVICE': {
      const filteredDevices = state.devices.filter(d => d.id !== action.payload);
      return { ...state, devices: filteredDevices, results: null };
    }
    case 'CALCULATE': {
      const results = calculateSystemRequirements(state.devices);
      return { ...state, results };
    }
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SET_FACILITY', payload: e.target.value });
    toast.success('تم تحديث الأجهزة الافتراضية');
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (state.devices.length === 0) {
      toast.error('الرجاء إضافة جهاز واحد على الأقل');
      return;
    }
    dispatch({ type: 'CALCULATE' });
    toast.success('تم حساب المتطلبات بنجاح');
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center p-3 bg-yellow-100 text-yellow-600 rounded-full mb-4">
            <Sun size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك والأجهزة المستخدمة.
          </p>
        </motion.div>

        {/* Facility Selector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            اختر نوع المنشأة
          </label>
          <div className="relative">
            <select
              value={state.selectedFacility}
              onChange={handleFacilityChange}
              className="w-full appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">-- اختر --</option>
              {FACILITY_TYPES.map(facility => (
                <option key={facility.id} value={facility.id}>{facility.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
        </motion.div>

        {/* Devices List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Settings className="text-yellow-500" size={24} />
              الأجهزة الكهربائية
            </h2>
            <button
              onClick={() => dispatch({ type: 'ADD_DEVICE' })}
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 rounded-lg text-sm font-medium transition-colors"
            >
              <Plus size={16} />
              إضافة جهاز
            </button>
          </div>

          <div className="space-y-4">
            {state.devices.map((device, index) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end bg-gray-50 dark:bg-gray-700 p-4 rounded-xl"
              >
                <div className="md:col-span-1">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">اسم الجهاز</label>
                  <input
                    type="text"
                    value={device.name}
                    onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'name', value: e.target.value } })}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm dark:text-white focus:ring-2 focus:ring-yellow-500"
                    placeholder="مثال: مكيف"
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">القدرة (واط)</label>
                  <input
                    type="number"
                    min="0"
                    value={device.power}
                    onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'power', value: e.target.value } })}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm dark:text-white focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">العدد</label>
                  <input
                    type="number"
                    min="1"
                    value={device.quantity}
                    onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'quantity', value: e.target.value } })}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm dark:text-white focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">ساعات التشغيل (يومياً)</label>
                  <input
                    type="number"
                    min="0"
                    max="24"
                    value={device.hours}
                    onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'hours', value: e.target.value } })}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm dark:text-white focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div className="md:col-span-1 flex justify-end">
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                    className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    title="حذف"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
            {state.devices.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                لا توجد أجهزة مضافة. اختر منشأة أو أضف جهازاً يدوياً.
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleCalculate}
              className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-medium text-lg transition-colors shadow-sm"
            >
              <Calculator size={24} />
              احسب النتائج
            </button>
          </div>
        </div>

        {/* Results */}
        {state.results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <ResultCard
              icon={<Zap className="text-blue-500" size={24} />}
              label="الاستهلاك اليومي"
              value={state.results.totalDailyEnergyKWh}
              unit="كيلوواط/ساعة"
            />
            <ResultCard
              icon={<Settings className="text-purple-500" size={24} />}
              label="حجم الانفرتر المقترح"
              value={state.results.recommendedInverterKW}
              unit="كيلوواط"
            />
            <ResultCard
              icon={<Sun className="text-yellow-500" size={24} />}
              label="سعة الألواح"
              value={state.results.solarArrayCapacityKW}
              unit="كيلوواط"
            />
            <ResultCard
              icon={<Battery className="text-green-500" size={24} />}
              label="سعة البطاريات"
              value={state.results.batteryStorageKWh}
              unit="كيلوواط/ساعة"
            />
          </motion.div>
        )}

      </div>
    </div>
  );
};

const ResultCard = ({ icon, label, value, unit }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center">
    <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-full">
      {icon}
    </div>
    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">{label}</h3>
    <div className="text-2xl font-bold text-gray-900 dark:text-white flex items-baseline gap-1">
      {value.toFixed(1)}
      <span className="text-sm font-normal text-gray-500">{unit}</span>
    </div>
  </div>
);

export default SolarCalculator;
