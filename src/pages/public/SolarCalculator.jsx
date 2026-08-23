import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Toaster, toast } from 'react-hot-toast';
import { Calculator, Plus, Trash2, Zap, Sun, Battery, Activity } from 'lucide-react';
import {
  FACILITY_TYPES,
  DEFAULT_CONSUMPTION_PATTERNS,
  calculateSystemRequirements
} from '../../models/SolarCalculatorModel';

// State management using useReducer
const initialState = {
  selectedFacility: '',
  devices: [],
  customDevice: { name: '', powerWatts: '', qty: '1', hoursPerDay: '' },
  results: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facilityId = action.payload;
      const defaultDevices = DEFAULT_CONSUMPTION_PATTERNS[facilityId]
        ? JSON.parse(JSON.stringify(DEFAULT_CONSUMPTION_PATTERNS[facilityId])) // Deep copy
        : [];

      return {
        ...state,
        selectedFacility: facilityId,
        devices: defaultDevices,
        results: null // Reset results when facility changes
      };
    }
    case 'UPDATE_DEVICE': {
      const { index, field, value } = action.payload;
      const newDevices = [...state.devices];
      newDevices[index] = { ...newDevices[index], [field]: value };
      return { ...state, devices: newDevices };
    }
    case 'REMOVE_DEVICE': {
      const newDevices = state.devices.filter((_, i) => i !== action.payload);
      return { ...state, devices: newDevices };
    }
    case 'UPDATE_CUSTOM_DEVICE': {
      const { field, value } = action.payload;
      return {
        ...state,
        customDevice: { ...state.customDevice, [field]: value }
      };
    }
    case 'ADD_CUSTOM_DEVICE': {
      // Validate
      if (!state.customDevice.name || !state.customDevice.powerWatts || !state.customDevice.hoursPerDay) {
        return state;
      }

      const newDevice = {
        id: `custom_${Date.now()}`,
        name: state.customDevice.name,
        powerWatts: Number(state.customDevice.powerWatts),
        qty: Number(state.customDevice.qty) || 1,
        hoursPerDay: Number(state.customDevice.hoursPerDay)
      };

      return {
        ...state,
        devices: [...state.devices, newDevice],
        customDevice: initialState.customDevice // Reset form
      };
    }
    case 'CALCULATE': {
      const results = calculateSystemRequirements(state.devices);
      return { ...state, results };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Derive if calculation button should be enabled
  const canCalculate = state.devices.length > 0;

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SET_FACILITY', payload: e.target.value });
    toast.success('تم تحديث الأجهزة بناءً على نوع المنشأة', { position: 'bottom-center' });
  };

  const handleAddCustomDevice = () => {
    if (!state.customDevice.name || !state.customDevice.powerWatts || !state.customDevice.hoursPerDay) {
      toast.error('الرجاء إدخال اسم الجهاز، الاستهلاك بالواط، وساعات العمل', { position: 'top-center' });
      return;
    }
    dispatch({ type: 'ADD_CUSTOM_DEVICE' });
    toast.success('تم إضافة الجهاز بنجاح', { position: 'bottom-center' });
  };

  const handleCalculate = () => {
    dispatch({ type: 'CALCULATE' });
    toast.success('تم حساب الاحتياجات بنجاح', { position: 'top-center', icon: '⚡' });

    // Scroll to results
    setTimeout(() => {
      document.getElementById('calculator-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const formatKW = (watts) => {
    return (watts / 1000).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-right" dir="rtl">
      <Toaster />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full mb-4">
            <Calculator className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            احسب احتياجات منشأتك من الطاقة الشمسية بسهولة وبدقة
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden mb-8 border border-gray-100 dark:border-gray-700">
          <div className="p-6 sm:p-8">
            {/* Facility Selection */}
            <div className="mb-8">
              <label htmlFor="facility" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اختر نوع المنشأة (لتحميل الأجهزة الافتراضية)
              </label>
              <select
                id="facility"
                value={state.selectedFacility}
                onChange={handleFacilityChange}
                className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg shadow-sm"
              >
                <option value="">-- اختر المنشأة --</option>
                {FACILITY_TYPES.map(facility => (
                  <option key={facility.id} value={facility.id}>
                    {facility.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Devices List */}
            {state.devices.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b pb-2 dark:border-gray-700">
                  الأجهزة والأحمال الكهربائية
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider rounded-tr-lg">الجهاز</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">العدد</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">الاستهلاك (واط)</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ساعات العمل/يوم</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider rounded-tl-lg">إجراء</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {state.devices.map((device, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            <input
                              type="text"
                              value={device.name}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { index, field: 'name', value: e.target.value } })}
                              className="w-full bg-transparent border-0 focus:ring-1 focus:ring-emerald-500 rounded p-1 dark:text-white"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <input
                              type="number"
                              min="1"
                              value={device.qty}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { index, field: 'qty', value: e.target.value } })}
                              className="w-20 bg-transparent border-gray-300 dark:border-gray-600 rounded focus:ring-emerald-500 focus:border-emerald-500 p-1 dark:bg-gray-700 dark:text-white"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <input
                              type="number"
                              min="0"
                              value={device.powerWatts}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { index, field: 'powerWatts', value: e.target.value } })}
                              className="w-24 bg-transparent border-gray-300 dark:border-gray-600 rounded focus:ring-emerald-500 focus:border-emerald-500 p-1 dark:bg-gray-700 dark:text-white"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <input
                              type="number"
                              min="0"
                              max="24"
                              value={device.hoursPerDay}
                              onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { index, field: 'hoursPerDay', value: e.target.value } })}
                              className="w-20 bg-transparent border-gray-300 dark:border-gray-600 rounded focus:ring-emerald-500 focus:border-emerald-500 p-1 dark:bg-gray-700 dark:text-white"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: index })}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                              title="حذف الجهاز"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Add Custom Device Form */}
            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 mb-8">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">إضافة جهاز جديد</h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 items-end">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">اسم الجهاز</label>
                  <input
                    type="text"
                    placeholder="مثال: مكيف، ثلاجة..."
                    value={state.customDevice.name}
                    onChange={(e) => dispatch({ type: 'UPDATE_CUSTOM_DEVICE', payload: { field: 'name', value: e.target.value } })}
                    className="block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2.5 border"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">العدد</label>
                  <input
                    type="number"
                    min="1"
                    value={state.customDevice.qty}
                    onChange={(e) => dispatch({ type: 'UPDATE_CUSTOM_DEVICE', payload: { field: 'qty', value: e.target.value } })}
                    className="block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2.5 border"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">الاستهلاك (واط)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="واط"
                    value={state.customDevice.powerWatts}
                    onChange={(e) => dispatch({ type: 'UPDATE_CUSTOM_DEVICE', payload: { field: 'powerWatts', value: e.target.value } })}
                    className="block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2.5 border"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">ساعات/يوم</label>
                  <input
                    type="number"
                    min="0"
                    max="24"
                    placeholder="ساعة"
                    value={state.customDevice.hoursPerDay}
                    onChange={(e) => dispatch({ type: 'UPDATE_CUSTOM_DEVICE', payload: { field: 'hoursPerDay', value: e.target.value } })}
                    className="block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2.5 border"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleAddCustomDevice}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                >
                  <Plus className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
                  إضافة الجهاز
                </button>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleCalculate}
                disabled={!canCalculate}
                className={`inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-full shadow-lg text-white ${
                  canCalculate
                    ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all hover:scale-105'
                    : 'bg-gray-400 cursor-not-allowed opacity-70'
                }`}
              >
                <Calculator className="mr-2 -ml-1 h-6 w-6" aria-hidden="true" />
                حساب الاحتياجات
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {state.results && (
          <motion.div
            id="calculator-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-emerald-100 dark:border-emerald-900/50"
          >
            <div className="bg-emerald-600 dark:bg-emerald-800 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Activity className="h-6 w-6 ml-2" />
                النتائج التقديرية للنظام
              </h3>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Daily Energy */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800/50">
                  <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2">
                    <Activity className="h-6 w-6 ml-2" />
                    <h4 className="font-semibold text-lg">الاستهلاك اليومي</h4>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {formatKW(state.results.dailyEnergyWh)}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mr-1">كيلوواط.ساعة</span>
                  </p>
                </div>

                {/* Peak Power */}
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-5 border border-purple-100 dark:border-purple-800/50">
                  <div className="flex items-center text-purple-600 dark:text-purple-400 mb-2">
                    <Zap className="h-6 w-6 ml-2" />
                    <h4 className="font-semibold text-lg">الحمل الأقصى (الذروة)</h4>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {formatKW(state.results.peakPowerW)}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mr-1">كيلوواط</span>
                  </p>
                </div>

                {/* Solar Panels Needed */}
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-100 dark:border-amber-800/50">
                  <div className="flex items-center text-amber-600 dark:text-amber-400 mb-2">
                    <Sun className="h-6 w-6 ml-2" />
                    <h4 className="font-semibold text-lg">عدد الألواح المطلوبة</h4>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {state.results.panelsNeeded}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mr-1">لوح ({state.results.panelWattage}W)</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">إجمالي القدرة: {formatKW(state.results.solarCapacityW)} كيلوواط</p>
                </div>

                {/* Inverter Size */}
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-5 border border-emerald-100 dark:border-emerald-800/50">
                  <div className="flex items-center text-emerald-600 dark:text-emerald-400 mb-2">
                    <Zap className="h-6 w-6 ml-2" />
                    <h4 className="font-semibold text-lg">حجم المحول (Inverter)</h4>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {formatKW(state.results.inverterSizeW)}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mr-1">كيلوواط</span>
                  </p>
                </div>

              </div>

              {/* Battery Recommendation */}
              <div className="mt-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center text-slate-700 dark:text-slate-300 mb-4">
                  <Battery className="h-7 w-7 ml-2 text-slate-600 dark:text-slate-400" />
                  <h4 className="font-semibold text-xl">سعة التخزين المقترحة (البطاريات)</h4>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <p className="text-4xl font-bold text-slate-900 dark:text-white mb-2 md:mb-0">
                    {formatKW(state.results.batteryCapacityWh)}
                    <span className="text-base font-normal text-slate-500 dark:text-slate-400 mr-2">كيلوواط.ساعة (kWh)</span>
                  </p>
                  <div className="text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>تغطي 50% من الاستهلاك اليومي</li>
                      <li>تتضمن هامش أمان لتفريغ البطاريات</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                * هذه النتائج تقديرية بناءً على افتراضات معيارية لكفاءة النظام (80%) ومتوسط ساعات سطوع الشمس (5 ساعات). ينصح دائماً باستشارة مهندس مختص للحصول على تصميم دقيق.
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
