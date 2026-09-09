import React, { useReducer, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Calculator, Plus, Trash2, Zap, Battery, Sun } from 'lucide-react';
import { FACILITY_TYPES, calculateSolarRequirements } from '../../models/SolarCalculatorModel';
import toast from 'react-hot-toast';

const initialState = {
  selectedFacilityId: '',
  devices: [],
  results: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      if (!facility) return { ...state, selectedFacilityId: '', devices: [] };
      // Deep copy devices
      const defaultDevices = facility.defaultDevices.map(d => ({ ...d, uniqueId: crypto.randomUUID() }));
      return { ...state, selectedFacilityId: action.payload, devices: defaultDevices };
    }
    case 'ADD_CUSTOM_DEVICE':
      return {
        ...state,
        devices: [
          ...state.devices,
          {
            uniqueId: crypto.randomUUID(),
            id: 'custom',
            name: 'جهاز مخصص جديد',
            power: 100,
            quantity: 1,
            hours: 5
          }
        ]
      };
    case 'UPDATE_DEVICE':
      return {
        ...state,
        devices: state.devices.map(device =>
          device.uniqueId === action.payload.uniqueId ? { ...device, ...action.payload.updates } : device
        )
      };
    case 'REMOVE_DEVICE':
      return {
        ...state,
        devices: state.devices.filter(device => device.uniqueId !== action.payload)
      };
    case 'CALCULATE':
      return {
        ...state,
        results: calculateSolarRequirements(state.devices)
      };
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.devices.length > 0) {
      dispatch({ type: 'CALCULATE' });
    } else if (state.results !== null) {
       dispatch({ type: 'CALCULATE' }); // Will calculate 0
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.devices]);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SET_FACILITY', payload: e.target.value });
    toast.success('تم تحديث نمط الاستهلاك', { position: 'bottom-center' });
  };

  const updateDevice = (uniqueId, field, value) => {
    let parsedValue = value;
    if (field !== 'name') {
      parsedValue = parseFloat(value) || 0;
    }
    dispatch({ type: 'UPDATE_DEVICE', payload: { uniqueId, updates: { [field]: parsedValue } } });
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-full text-yellow-600 mb-4">
            <Calculator size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">حاسبة الطاقة الشمسية</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            اختر نمط الاستهلاك الخاص بك أو قم بإضافة أجهزتك يدوياً لحساب حجم نظام الطاقة الشمسية المناسب لاحتياجاتك.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Form Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Facility Selection */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                اختر نمط الاستهلاك (نوع المنشأة)
              </label>
              <select
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                value={state.selectedFacilityId}
                onChange={handleFacilityChange}
              >
                <option value="">-- اختر من القائمة --</option>
                {FACILITY_TYPES.map(facility => (
                  <option key={facility.id} value={facility.id}>{facility.name}</option>
                ))}
              </select>
            </div>

            {/* Devices List */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">الأجهزة الكهربائية</h3>
                <button
                  onClick={() => dispatch({ type: 'ADD_CUSTOM_DEVICE' })}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
                >
                  <Plus size={16} />
                  إضافة جهاز مخصص
                </button>
              </div>

              {state.devices.length === 0 ? (
                <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
                  الرجاء اختيار نمط استهلاك أو إضافة أجهزة يدوياً
                </div>
              ) : (
                <div className="space-y-4">
                  {state.devices.map((device, index) => (
                    <motion.div
                      key={device.uniqueId}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 bg-gray-50 rounded-xl border border-gray-100"
                    >
                      <div className="md:col-span-4">
                        <label className="block text-xs text-gray-500 mb-1">اسم الجهاز</label>
                        <input
                          type="text"
                          value={device.name}
                          onChange={(e) => updateDevice(device.uniqueId, 'name', e.target.value)}
                          className="w-full p-2 bg-white border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-500 mb-1">القدرة (واط)</label>
                        <input
                          type="number"
                          min="0"
                          value={device.power}
                          onChange={(e) => updateDevice(device.uniqueId, 'power', e.target.value)}
                          className="w-full p-2 bg-white border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-500 mb-1">العدد</label>
                        <input
                          type="number"
                          min="1"
                          value={device.quantity}
                          onChange={(e) => updateDevice(device.uniqueId, 'quantity', e.target.value)}
                          className="w-full p-2 bg-white border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-xs text-gray-500 mb-1">ساعات العمل/يوم</label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={device.hours}
                          onChange={(e) => updateDevice(device.uniqueId, 'hours', e.target.value)}
                          className="w-full p-2 bg-white border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div className="md:col-span-1 flex justify-end md:justify-center mt-4 md:mt-0">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.uniqueId })}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Results Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-900 rounded-2xl p-6 text-white sticky top-6 shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Zap className="text-yellow-400" />
                النتائج التقديرية
              </h3>

              {state.results ? (
                <div className="space-y-6">
                  <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                    <p className="text-sm text-gray-400 mb-1">الاستهلاك اليومي الإجمالي</p>
                    <p className="text-2xl font-bold text-white">
                      {state.results.totalDailyKWh.toFixed(2)} <span className="text-sm font-normal text-gray-400">ك.واط/ساعة</span>
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                    <div className="flex items-center gap-2 mb-1 text-yellow-400">
                      <Sun size={16} />
                      <p className="text-sm text-gray-400">حجم الألواح الشمسية المقترح</p>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {state.results.requiredSolarArraySizeKW.toFixed(2)} <span className="text-sm font-normal text-gray-400">كيلو واط</span>
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                    <p className="text-sm text-gray-400 mb-1">حجم المحول (الإنفرتر) المقترح</p>
                    <p className="text-2xl font-bold text-white">
                      {state.results.recommendedInverterSizeKW.toFixed(2)} <span className="text-sm font-normal text-gray-400">كيلو واط</span>
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                    <div className="flex items-center gap-2 mb-1 text-green-400">
                      <Battery size={16} />
                      <p className="text-sm text-gray-400">سعة البطاريات المطلوبة ({state.results.batteryVoltage}V)</p>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {state.results.batteryCapacityAh.toFixed(0)} <span className="text-sm font-normal text-gray-400">أمبير/ساعة</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      (~ {state.results.batteryCapacityKWh.toFixed(1)} كيلو واط/ساعة)
                    </p>
                  </div>

                  <div className="mt-6 text-xs text-gray-500 text-center leading-relaxed">
                    * هذه الحسابات تقديرية وتعتمد على افتراضات معيارية للسطوع الشمسي وكفاءة النظام. يرجى استشارة مهندس مختص للحصول على تصميم دقيق.
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  قم بإضافة أجهزة لرؤية النتائج هنا
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
