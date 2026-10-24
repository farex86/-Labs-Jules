import React, { useReducer, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Calculator, Save, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { FACILITY_TYPES, calculateSolarRequirements } from '../../models/SolarCalculatorModel';

const initialState = {
  facilityType: '',
  devices: [],
  results: null,
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY':
      return { ...state, facilityType: action.payload };
    case 'ADD_DEVICE':
      return {
        ...state,
        devices: [
          ...state.devices,
          { id: Date.now().toString(), name: '', power: '', hours: '', quantity: '1' }
        ],
      };
    case 'UPDATE_DEVICE':
      return {
        ...state,
        devices: state.devices.map(d =>
          d.id === action.payload.id ? { ...d, [action.payload.field]: action.payload.value } : d
        ),
      };
    case 'REMOVE_DEVICE':
      return {
        ...state,
        devices: state.devices.filter(d => d.id !== action.payload),
      };
    case 'CALCULATE':
      return {
        ...state,
        results: calculateSolarRequirements(state.devices),
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handleCalculate = () => {
    // Basic validation
    if (!state.facilityType) {
      toast.error('الرجاء اختيار نوع المنشأة');
      return;
    }

    if (state.devices.length === 0) {
      toast.error('الرجاء إضافة جهاز واحد على الأقل');
      return;
    }

    const hasInvalidDevices = state.devices.some(d => !d.name || !d.power || !d.hours);
    if (hasInvalidDevices) {
      toast.error('الرجاء تعبئة جميع بيانات الأجهزة');
      return;
    }

    dispatch({ type: 'CALCULATE' });
    toast.success('تم الحساب بنجاح');
  };

  const addDevice = () => dispatch({ type: 'ADD_DEVICE' });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-8" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 p-6 md:p-8 text-white">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Calculator size={32} />
              حاسبة الطاقة الشمسية
            </h1>
            <p className="mt-2 text-blue-100 text-lg">
              احسب احتياجاتك من الطاقة الشمسية بدقة وسهولة
            </p>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {/* Facility Selection */}
            <section>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                نوع المنشأة
              </label>
              <select
                className="w-full md:w-1/2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                value={state.facilityType}
                onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
              >
                <option value="">-- اختر نوع المنشأة --</option>
                {FACILITY_TYPES.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </section>

            {/* Devices List */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">الأجهزة الكهربائية</h2>
                <button
                  onClick={addDevice}
                  className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                >
                  <Plus size={20} />
                  <span>إضافة جهاز</span>
                </button>
              </div>

              <div className="space-y-4">
                {state.devices.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-750 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                    لا توجد أجهزة مضافة. انقر على "إضافة جهاز" للبدء.
                  </div>
                ) : (
                  state.devices.map((device, index) => (
                    <motion.div
                      key={device.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-gray-750 border border-gray-100 dark:border-gray-700 rounded-xl items-end"
                    >
                      <div className="md:col-span-4">
                        <label className="block text-xs text-gray-500 mb-1">اسم الجهاز</label>
                        <input
                          type="text"
                          placeholder="مثال: مكيف، ثلاجة..."
                          className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600 outline-none focus:border-blue-500"
                          value={device.name}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'name', value: e.target.value } })}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-500 mb-1">القدرة (واط)</label>
                        <input
                          type="number"
                          min="0"
                          className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600 outline-none focus:border-blue-500"
                          value={device.power}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'power', value: e.target.value } })}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-500 mb-1">ساعات العمل/يوم</label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600 outline-none focus:border-blue-500"
                          value={device.hours}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'hours', value: e.target.value } })}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-500 mb-1">الكمية</label>
                        <input
                          type="number"
                          min="1"
                          className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600 outline-none focus:border-blue-500"
                          value={device.quantity}
                          onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'quantity', value: e.target.value } })}
                        />
                      </div>
                      <div className="md:col-span-2 flex justify-end pb-1">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                          className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                          title="حذف الجهاز"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleCalculate}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex justify-center items-center gap-2"
              >
                <Calculator size={20} />
                احسب الاحتياجات
              </button>
            </div>

            {/* Results Section */}
            {state.results && (
              <motion.section
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-750 p-6 rounded-2xl border border-blue-100 dark:border-gray-700 mt-8"
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b pb-2">النتائج التقديرية</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">الاستهلاك اليومي</div>
                    <div className="text-2xl font-bold text-blue-600">{state.results.totalDailyEnergyKwh} <span className="text-base font-normal">كيلوواط/ساعة</span></div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">حجم النظام المطلوب</div>
                    <div className="text-2xl font-bold text-green-600">{state.results.systemSizeKw} <span className="text-base font-normal">كيلوواط</span></div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">عدد الألواح (550W)</div>
                    <div className="text-2xl font-bold text-amber-600">{state.results.panelsNeeded} <span className="text-base font-normal">لوح</span></div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">حجم الانفرتر</div>
                    <div className="text-2xl font-bold text-purple-600">{state.results.inverterSizeKw} <span className="text-base font-normal">كيلوواط</span></div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">سعة البطاريات (48V)</div>
                    <div className="text-2xl font-bold text-rose-600">{state.results.batteryCapacityAh} <span className="text-base font-normal">أمبير/ساعة</span></div>
                  </div>
                </div>

                <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 bg-blue-100/50 dark:bg-gray-800/50 p-4 rounded-lg">
                  * ملاحظة: هذه النتائج تقديرية بناءً على المعطيات المدخلة وتفترض ظروف تشغيل قياسية. يوصى دائماً باستشارة مهندس مختص قبل التركيب.
                </div>
              </motion.section>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SolarCalculator;
