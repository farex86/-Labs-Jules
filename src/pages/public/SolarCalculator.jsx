import React, { useReducer } from 'react';
import { FACILITY_TYPES, FACILITY_PATTERNS, calculateTotalConsumption, calculateSystemRequirements } from '../../models/SolarCalculatorModel';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Calculator, Plus, Trash2, Zap, Sun } from 'lucide-react';

const initialState = {
  selectedFacility: '',
  devices: [],
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facilityId = action.payload;
      const defaultDevices = FACILITY_PATTERNS[facilityId] || [];
      // Deep copy to prevent mutating the constant array
      const devices = defaultDevices.map(d => ({ ...d, id: `${d.id}_${Date.now()}_${Math.random()}` }));
      return {
        ...state,
        selectedFacility: facilityId,
        devices,
      };
    }
    case 'UPDATE_DEVICE': {
      const { id, field, value } = action.payload;
      return {
        ...state,
        devices: state.devices.map(device =>
          device.id === id ? { ...device, [field]: value } : device
        )
      };
    }
    case 'ADD_DEVICE': {
      return {
        ...state,
        devices: [
          ...state.devices,
          { id: `custom_${Date.now()}_${Math.random()}`, name: 'جهاز جديد', qty: 1, power: 100, hours: 1 }
        ]
      };
    }
    case 'REMOVE_DEVICE': {
      return {
        ...state,
        devices: state.devices.filter(device => device.id !== action.payload)
      };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SET_FACILITY', payload: e.target.value });
  };

  const handleDeviceChange = (id, field, value) => {
    dispatch({ type: 'UPDATE_DEVICE', payload: { id, field, value } });
  };

  const handleAddDevice = () => {
    dispatch({ type: 'ADD_DEVICE' });
  };

  const handleRemoveDevice = (id) => {
    dispatch({ type: 'REMOVE_DEVICE', payload: id });
  };

  const totalConsumptionWh = calculateTotalConsumption(state.devices);
  const requirements = calculateSystemRequirements(totalConsumptionWh);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <Calculator className="w-8 h-8 text-blue-600" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-2 text-gray-600">احسب استهلاكك للطاقة وحجم النظام الشمسي المناسب لمنشأتك</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-2">
                اختر نوع المنشأة
              </label>
              <select
                id="facility"
                value={state.selectedFacility}
                onChange={handleFacilityChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 bg-gray-50"
              >
                <option value="">-- اختر من القائمة --</option>
                {FACILITY_TYPES.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>

            {/* Devices List */}
            {state.selectedFacility && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">الأجهزة الكهربائية</h2>
                  <button
                    onClick={handleAddDevice}
                    className="flex items-center gap-2 text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Header Row */}
                  <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-600">
                    <div className="col-span-4">اسم الجهاز</div>
                    <div className="col-span-2 text-center">العدد</div>
                    <div className="col-span-3 text-center">القدرة (واط)</div>
                    <div className="col-span-2 text-center">ساعات التشغيل</div>
                    <div className="col-span-1 text-center">حذف</div>
                  </div>

                  {state.devices.map((device, index) => (
                    <motion.div
                      key={device.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 border border-gray-100 rounded-lg hover:border-blue-100 transition-colors"
                    >
                      <div className="md:col-span-4">
                        <label className="block text-xs text-gray-500 mb-1 md:hidden">اسم الجهاز</label>
                        <input
                          type="text"
                          value={device.name}
                          onChange={(e) => handleDeviceChange(device.id, 'name', e.target.value)}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-sm"
                          placeholder="اسم الجهاز"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-500 mb-1 md:hidden">العدد</label>
                        <input
                          type="number"
                          min="1"
                          value={device.qty}
                          onChange={(e) => handleDeviceChange(device.id, 'qty', e.target.value)}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-sm text-center"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label className="block text-xs text-gray-500 mb-1 md:hidden">القدرة (واط)</label>
                        <input
                          type="number"
                          min="0"
                          value={device.power}
                          onChange={(e) => handleDeviceChange(device.id, 'power', e.target.value)}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-sm text-center"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-500 mb-1 md:hidden">ساعات التشغيل (يومياً)</label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={device.hours}
                          onChange={(e) => handleDeviceChange(device.id, 'hours', e.target.value)}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-sm text-center"
                        />
                      </div>

                      <div className="md:col-span-1 flex justify-center mt-2 md:mt-0">
                        <button
                          onClick={() => handleRemoveDevice(device.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="حذف الجهاز"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  {state.devices.length === 0 && (
                    <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                      لم يتم إضافة أي أجهزة. اضغط على "إضافة جهاز" للبدء.
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Results Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">

              {/* Consumption Result */}
              <motion.div
                className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="flex items-center gap-3 mb-4 opacity-90">
                  <Zap className="w-6 h-6" />
                  <h3 className="font-semibold text-lg">الاستهلاك اليومي</h3>
                </div>
                <div className="text-4xl font-bold mb-2">
                  {requirements.dailyEnergyKwh.toFixed(1)} <span className="text-lg font-normal opacity-80">كيلوواط/ساعة</span>
                </div>
                <p className="text-sm opacity-80 mt-4">
                  إجمالي الطاقة التي تستهلكها أجهزتك في اليوم الواحد بناءً على ساعات التشغيل المحددة.
                </p>
              </motion.div>

              {/* System Recommendation */}
              <motion.div
                className="bg-white rounded-xl shadow-sm border border-green-100 p-6 relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-10 opacity-50"></div>

                <div className="flex items-center gap-3 mb-4 text-green-700">
                  <Sun className="w-6 h-6" />
                  <h3 className="font-semibold text-lg">حجم النظام المقترح</h3>
                </div>

                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {requirements.recommendedSystemKw.toFixed(1)} <span className="text-lg font-normal text-gray-500">كيلوواط (kW)</span>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">الإنتاج اليومي المطلوب:</span>
                    <span className="font-medium text-gray-900">{requirements.requiredGenerationKwh.toFixed(1)} kWh</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">معامل الفقد المتوقع:</span>
                    <span className="font-medium text-gray-900">30%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">ساعات الذروة الشمسية:</span>
                    <span className="font-medium text-gray-900">5.5 ساعات</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-xs text-gray-500 leading-relaxed text-center">
                    هذه حسابات تقديرية وتعتمد على متوسط ساعات سطوع الشمس. يُنصح باستشارة مهندس مختص للحصول على تصميم دقيق.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
