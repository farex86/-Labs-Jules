import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { calculateSolarNeeds, FACILITY_TYPES } from '../../models/SolarCalculatorModel';
import { Calculator, Zap, Battery, Cpu, DollarSign, Plus, Trash2, Edit2, Check } from 'lucide-react';
import toast from 'react-hot-toast';

// Reducer for managing devices list
const initialState = {
  facilityId: '',
  devices: [],
  results: null
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      if (!facility) return { ...state, facilityId: '', devices: [], results: null };

      // Deep copy devices to avoid mutating the original constants
      const clonedDevices = facility.devices.map(d => ({ ...d }));

      return {
        ...state,
        facilityId: action.payload,
        devices: clonedDevices,
        results: null
      };
    }
    case 'UPDATE_DEVICE': {
      const { id, field, value } = action.payload;
      const updatedDevices = state.devices.map(device =>
        device.id === id ? { ...device, [field]: value } : device
      );
      return { ...state, devices: updatedDevices };
    }
    case 'ADD_CUSTOM_DEVICE': {
      const newDevice = {
        id: `custom_${Date.now()}`,
        name: 'جهاز جديد',
        powerW: 100,
        qty: 1,
        hoursPerDay: 8
      };
      return { ...state, devices: [...state.devices, newDevice] };
    }
    case 'REMOVE_DEVICE': {
      const updatedDevices = state.devices.filter(device => device.id !== action.payload);
      return { ...state, devices: updatedDevices };
    }
    case 'CALCULATE': {
      const results = calculateSolarNeeds(state.devices);
      return { ...state, results };
    }
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (state.devices.length === 0) {
      toast.error('يرجى اختيار المنشأة وإضافة جهاز واحد على الأقل');
      return;
    }
    dispatch({ type: 'CALCULATE' });
    toast.success('تم الحساب بنجاح');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 dir-rtl text-right font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-blue-600 px-8 py-10 text-white">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Calculator className="w-10 h-10" />
              <h1 className="text-3xl font-bold">حاسبة الطاقة الشمسية المتطورة</h1>
            </div>
            <p className="text-center text-blue-100">احسب احتياجات منشأتك بناءً على أنماط الاستهلاك الفعلي للأجهزة</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleCalculate} className="space-y-8">
              {/* Facility Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  نوع المنشأة (نمط الاستهلاك)
                </label>
                <select
                  value={state.facilityId}
                  onChange={(e) => dispatch({ type: 'SELECT_FACILITY', payload: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm p-3 border"
                >
                  <option value="">اختر نوع المنشأة...</option>
                  {FACILITY_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Devices List */}
              {state.devices.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">قائمة الأجهزة</h3>
                    <button
                      type="button"
                      onClick={() => dispatch({ type: 'ADD_CUSTOM_DEVICE' })}
                      className="flex items-center gap-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      إضافة جهاز آخر
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-4 py-3 rounded-tr-lg">اسم الجهاز</th>
                          <th scope="col" className="px-4 py-3 text-center">القدرة (واط)</th>
                          <th scope="col" className="px-4 py-3 text-center">العدد</th>
                          <th scope="col" className="px-4 py-3 text-center">ساعات العمل/يوم</th>
                          <th scope="col" className="px-4 py-3 rounded-tl-lg text-center">إجراء</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.devices.map((device) => (
                          <tr key={device.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-4 py-2">
                              <input
                                type="text"
                                value={device.name}
                                onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'name', value: e.target.value } })}
                                className="w-full bg-transparent border-none focus:ring-0 p-1 text-gray-900 dark:text-white"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type="number"
                                min="0"
                                value={device.powerW}
                                onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'powerW', value: e.target.value } })}
                                className="w-24 bg-transparent border-gray-300 dark:border-gray-600 rounded p-1 text-center mx-auto block text-gray-900 dark:text-white"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type="number"
                                min="1"
                                value={device.qty}
                                onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'qty', value: e.target.value } })}
                                className="w-16 bg-transparent border-gray-300 dark:border-gray-600 rounded p-1 text-center mx-auto block text-gray-900 dark:text-white"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type="number"
                                min="1"
                                max="24"
                                value={device.hoursPerDay}
                                onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'hoursPerDay', value: e.target.value } })}
                                className="w-16 bg-transparent border-gray-300 dark:border-gray-600 rounded p-1 text-center mx-auto block text-gray-900 dark:text-white"
                              />
                            </td>
                            <td className="px-4 py-2 text-center">
                              <button
                                type="button"
                                onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                                className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-1.5 rounded-lg transition-colors inline-block"
                                title="حذف"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-xl text-lg transition duration-200 ease-in-out transform hover:scale-[1.02] shadow-lg"
              >
                احسب الاحتياجات الكلية
              </button>
            </form>

            {/* Results Section */}
            {state.results && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">النتائج التقديرية التفصيلية</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl flex items-center gap-4 border border-blue-100 dark:border-blue-800">
                    <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-full text-blue-600 dark:text-blue-300">
                      <Zap className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي الحمل والطاقة</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{state.results.estimatedLoadKw} kW <span className="text-sm font-normal text-gray-500">حمل ذروة</span></p>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{state.results.totalEnergyKwh} kWh <span className="text-sm font-normal text-gray-500">يومياً</span></p>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl flex items-center gap-4 border border-green-100 dark:border-green-800">
                    <div className="bg-green-100 dark:bg-green-800 p-4 rounded-full text-green-600 dark:text-green-300">
                      <Calculator className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">الألواح المطلوبة</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{state.results.panelsNeeded} لوح</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">بحجم 500 واط للوح الواحد</p>
                    </div>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl flex items-center gap-4 border border-purple-100 dark:border-purple-800">
                    <div className="bg-purple-100 dark:bg-purple-800 p-4 rounded-full text-purple-600 dark:text-purple-300">
                      <Cpu className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">سعة الانفرتر (المحول)</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{state.results.inverterCapacityKw} kW</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">يتضمن هامش أمان 20%</p>
                    </div>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl flex items-center gap-4 border border-orange-100 dark:border-orange-800">
                    <div className="bg-orange-100 dark:bg-orange-800 p-4 rounded-full text-orange-600 dark:text-orange-300">
                      <Battery className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">تخزين البطاريات (ليلاً)</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{state.results.batteryCapacityKwh} kWh</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">تغطي 50% من الاستهلاك اليومي</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-full text-gray-700 dark:text-gray-300">
                      <DollarSign className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">التكلفة التقديرية الإجمالية</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">تشمل الألواح والانفرتر والبطاريات (تقدير أولي)</p>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    ${state.results.estimatedCost.toLocaleString()}
                  </p>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  * <strong>ملاحظة هامة:</strong> هذه الحسابات مبنية على افتراضات عامة (متوسط سطوع الشمس 5 ساعات) وهي للأغراض الاسترشادية فقط. للحصول على تصميم دقيق وعرض سعر نهائي، يرجى الاستعانة بمهندس طاقة شمسية مختص لمعاينة الموقع.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SolarCalculator;
