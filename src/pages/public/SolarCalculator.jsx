import React, { useReducer, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Calculator, Zap, Battery, Sun, Wrench, RefreshCw, Plus, Trash2 } from 'lucide-react';
import { facilityTypes } from '../../data/solarCalculatorConfig';
import { generateSolarEstimation } from '../../utils/solarCalculations';

// Initial state
const initialState = {
  selectedFacilityId: '',
  devices: [],
  estimation: null,
};

// Reducer for complex state transitions
const calculatorReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facility = facilityTypes.find(f => f.id === action.payload);
      return {
        ...state,
        selectedFacilityId: action.payload,
        devices: facility ? JSON.parse(JSON.stringify(facility.devices)) : [], // Deep copy to allow independent edits
        estimation: null, // Reset estimation on facility change
      };
    }
    case 'UPDATE_DEVICE': {
      const updatedDevices = state.devices.map(device => {
        if (device.id === action.payload.id) {
          return { ...device, [action.payload.field]: action.payload.value };
        }
        return device;
      });
      return { ...state, devices: updatedDevices };
    }
    case 'ADD_DEVICE': {
      const newDevice = {
        id: `custom_${Date.now()}`,
        name: 'جهاز جديد',
        power: 100,
        quantity: 1,
        hours: 1
      };
      return { ...state, devices: [...state.devices, newDevice] };
    }
    case 'REMOVE_DEVICE': {
      return {
        ...state,
        devices: state.devices.filter(device => device.id !== action.payload)
      };
    }
    case 'CALCULATE': {
      const estimation = generateSolarEstimation(state.devices);
      return { ...state, estimation };
    }
    case 'RESET': {
      return initialState;
    }
    default:
      return state;
  }
};

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handleCalculate = () => {
    if (state.devices.length === 0) {
      toast.error('الرجاء اختيار نوع المنشأة أو إضافة أجهزة');
      return;
    }
    dispatch({ type: 'CALCULATE' });
    toast.success('تم حساب التقديرات بنجاح');
  };

  const selectedFacilityName = facilityTypes.find(f => f.id === state.selectedFacilityId)?.name || 'مخصص';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <Calculator className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">حاسبة الطاقة الشمسية</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            احسب التقديرات المبدئية لحجم النظام الشمسي المطلوب لمنشأتك
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Controls Panel */}
          <div className="md:col-span-2 space-y-6">

            {/* Facility Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <label htmlFor="facility" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اختر نوع المنشأة (نمط الاستهلاك)
              </label>
              <select
                id="facility"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                value={state.selectedFacilityId}
                onChange={(e) => dispatch({ type: 'SELECT_FACILITY', payload: e.target.value })}
              >
                <option value="">-- اختر المنشأة --</option>
                {facilityTypes.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Devices List */}
            {state.selectedFacilityId && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    الأجهزة ({selectedFacilityName})
                  </h2>
                  <button
                    onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Plus className="w-4 h-4 ml-1" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="space-y-4">
                  {state.devices.map((device) => (
                    <div key={device.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="sm:col-span-3">
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">اسم الجهاز</label>
                        <input
                          type="text"
                          value={device.name}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'name', value: e.target.value } })}
                          className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded p-2 text-sm dark:text-white"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">القدرة (واط)</label>
                        <input
                          type="number"
                          min="0"
                          value={device.power}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'power', value: Number(e.target.value) } })}
                          className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded p-2 text-sm dark:text-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">العدد</label>
                        <input
                          type="number"
                          min="1"
                          value={device.quantity}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'quantity', value: Number(e.target.value) } })}
                          className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded p-2 text-sm dark:text-white"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">ساعات العمل/يوم</label>
                        <input
                          type="number"
                          min="1"
                          max="24"
                          value={device.hours}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'hours', value: Number(e.target.value) } })}
                          className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded p-2 text-sm dark:text-white"
                        />
                      </div>
                      <div className="sm:col-span-1 flex justify-center sm:justify-end mt-4 sm:mt-0">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                          className="text-red-500 hover:text-red-700 p-2"
                          title="حذف"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {state.devices.length === 0 && (
                    <div className="text-center text-gray-500 py-4">لا توجد أجهزة مضافة</div>
                  )}
                </div>

                <div className="mt-6 flex gap-4">
                  <button
                    onClick={handleCalculate}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Calculator className="w-5 h-5 ml-2" />
                    احسب النظام المطلوب
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'RESET' })}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Results Panel */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">النتائج التقديرية</h2>

              {state.estimation ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                      <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="mr-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">الاستهلاك اليومي</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {state.estimation.totalDailyEnergyKWh.toFixed(2)} <span className="text-sm font-normal">كيلوواط/ساعة</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg">
                      <Sun className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div className="mr-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">حجم النظام الشمسي</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {state.estimation.systemSizeKW.toFixed(2)} <span className="text-sm font-normal">كيلوواط</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">حوالي {state.estimation.numberOfPanels} لوح (550W)</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                      <Battery className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="mr-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">سعة البطاريات المطلوبة</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {state.estimation.batteryCapacityKWh.toFixed(2)} <span className="text-sm font-normal">كيلوواط/ساعة</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                      <Wrench className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="mr-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">حجم العاكس (Inverter)</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {state.estimation.inverterSizeKVA.toFixed(2)} <span className="text-sm font-normal">كيلوفولت أمبير</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700/50">
                    <p className="text-xs text-yellow-800 dark:text-yellow-200 leading-relaxed">
                      <strong>تنبيه:</strong> هذه الأرقام تقديرية مبدئية بناءً على المدخلات. الحجم الفعلي قد يختلف بناءً على ظروف الموقع الإشعاعية، نوعية المكونات، وكفاءتها. يُنصح باستشارة شركة تركيب متخصصة.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    اختر المنشأة وقم بإضافة الأجهزة ثم اضغط على "احسب" لظهور النتائج
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
