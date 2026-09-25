import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import {
  Calculator,
  Zap,
  BatteryCharging,
  Sun,
  Plus,
  Minus,
  Trash2,
  Building2
} from 'lucide-react';
import {
  FACILITY_TYPES,
  calculateTotalEnergy,
  calculateTotalPower,
  calculateSystemSizing
} from '../../models/SolarCalculatorModel';

// Reducer for managing calculator state
const calculatorReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      return {
        ...state,
        selectedFacilityId: action.payload,
        // Deep copy appliances to avoid mutating constant model data
        appliances: facility ? facility.appliances.map(a => ({ ...a })) : []
      };
    }
    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        appliances: state.appliances.map(app =>
          app.id === action.payload.id
            ? { ...app, quantity: Math.max(0, action.payload.quantity) }
            : app
        )
      };
    }
    case 'UPDATE_HOURS': {
      return {
        ...state,
        appliances: state.appliances.map(app =>
          app.id === action.payload.id
            ? { ...app, hours: Math.max(0, Math.min(24, action.payload.hours)) }
            : app
        )
      };
    }
    case 'REMOVE_APPLIANCE': {
      return {
        ...state,
        appliances: state.appliances.filter(app => app.id !== action.payload)
      };
    }
    case 'ADD_CUSTOM_APPLIANCE': {
      const newAppliance = {
        id: `custom_${Date.now()}`,
        name: 'جهاز جديد',
        power: 100,
        quantity: 1,
        hours: 12
      };
      return {
        ...state,
        appliances: [...state.appliances, newAppliance]
      };
    }
    case 'UPDATE_CUSTOM_NAME': {
       return {
         ...state,
         appliances: state.appliances.map(app =>
           app.id === action.payload.id
             ? { ...app, name: action.payload.name }
             : app
         )
       };
    }
    case 'UPDATE_CUSTOM_POWER': {
        return {
          ...state,
          appliances: state.appliances.map(app =>
            app.id === action.payload.id
              ? { ...app, power: Math.max(0, action.payload.power) }
              : app
          )
        };
     }
    default:
      return state;
  }
};

const initialState = {
  selectedFacilityId: '',
  appliances: []
};

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const totalEnergyWh = calculateTotalEnergy(state.appliances);
  const totalPowerW = calculateTotalPower(state.appliances);
  const systemSizing = calculateSystemSizing(totalEnergyWh, totalPowerW);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full text-blue-600 mb-4"
          >
            <Calculator size={48} />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900">الحاسبة الشمسية</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نمط استهلاكك والأجهزة المستخدمة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column - Input Section */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Selection */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
                <Building2 className="text-blue-500" />
                اختر نمط الاستهلاك
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {FACILITY_TYPES.map((facility) => (
                  <button
                    key={facility.id}
                    onClick={() => dispatch({ type: 'SELECT_FACILITY', payload: facility.id })}
                    className={`p-3 rounded-xl border text-sm transition-all duration-200 ${
                      state.selectedFacilityId === facility.id
                        ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm ring-1 ring-blue-500'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    {facility.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Appliances List */}
            {state.selectedFacilityId && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">الأجهزة الكهربائية</h2>
                  <button
                    onClick={() => dispatch({ type: 'ADD_CUSTOM_APPLIANCE' })}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Plus size={16} />
                    إضافة جهاز
                  </button>
                </div>

                <div className="space-y-4">
                  {state.appliances.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">لا توجد أجهزة مضافة</p>
                  ) : (
                    state.appliances.map((app, index) => (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex flex-col md:flex-row gap-4 items-start md:items-center p-4 border border-gray-100 rounded-xl bg-gray-50/50"
                      >
                        <div className="flex-1 w-full space-y-2">
                           {app.id.startsWith('custom_') ? (
                             <input
                               type="text"
                               value={app.name}
                               onChange={(e) => dispatch({ type: 'UPDATE_CUSTOM_NAME', payload: { id: app.id, name: e.target.value }})}
                               className="font-medium text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 w-full"
                             />
                           ) : (
                             <span className="font-medium text-gray-900 block">{app.name}</span>
                           )}

                           {app.id.startsWith('custom_') ? (
                              <div className="flex items-center text-sm text-gray-500">
                                <input
                                  type="number"
                                  value={app.power}
                                  onChange={(e) => dispatch({ type: 'UPDATE_CUSTOM_POWER', payload: { id: app.id, power: parseInt(e.target.value) || 0 }})}
                                  className="w-20 bg-white border border-gray-300 rounded px-2 py-1 ml-1"
                                /> واط
                              </div>
                           ) : (
                              <span className="text-sm text-gray-500 block">{app.power} واط</span>
                           )}
                        </div>

                        <div className="flex items-center gap-6 w-full md:w-auto">
                          {/* Quantity Control */}
                          <div className="flex flex-col items-center">
                            <span className="text-xs text-gray-500 mb-1">العدد</span>
                            <div className="flex items-center gap-2 bg-white border rounded-lg p-1">
                              <button
                                onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: app.id, quantity: app.quantity - 1 }})}
                                className="p-1 hover:bg-gray-100 rounded text-gray-600"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-6 text-center text-sm font-medium">{app.quantity}</span>
                              <button
                                onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: app.id, quantity: app.quantity + 1 }})}
                                className="p-1 hover:bg-gray-100 rounded text-gray-600"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>

                          {/* Hours Control */}
                          <div className="flex flex-col items-center">
                            <span className="text-xs text-gray-500 mb-1">ساعات/يوم</span>
                            <div className="flex items-center gap-2 bg-white border rounded-lg p-1">
                              <button
                                onClick={() => dispatch({ type: 'UPDATE_HOURS', payload: { id: app.id, hours: app.hours - 1 }})}
                                className="p-1 hover:bg-gray-100 rounded text-gray-600"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-6 text-center text-sm font-medium">{app.hours}</span>
                              <button
                                onClick={() => dispatch({ type: 'UPDATE_HOURS', payload: { id: app.id, hours: app.hours + 1 }})}
                                className="p-1 hover:bg-gray-100 rounded text-gray-600"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-5"
                            title="حذف"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Results Section */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">النتائج المقدرة</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">إجمالي الاستهلاك اليومي</span>
                  <span className="font-bold text-lg text-gray-900">{(totalEnergyWh / 1000).toFixed(1)} kWh</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">إجمالي القدرة (الأحمال)</span>
                  <span className="font-bold text-lg text-gray-900">{(totalPowerW / 1000).toFixed(1)} kW</span>
                </div>
              </div>

              <h3 className="text-lg font-medium mb-4 text-gray-700 border-b pb-2">النظام المقترح</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border border-orange-100 bg-orange-50/30 rounded-xl">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                    <Zap size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">حجم الإنفرتر</p>
                    <p className="font-bold text-xl text-gray-900">{systemSizing.inverterSizeKW} kW</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 border border-yellow-100 bg-yellow-50/30 rounded-xl">
                  <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
                    <Sun size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">الألواح الشمسية</p>
                    <p className="font-bold text-xl text-gray-900">{systemSizing.solarPanelsKW} kW</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 border border-green-100 bg-green-50/30 rounded-xl">
                  <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                    <BatteryCharging size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">سعة البطاريات (لليوم الواحد)</p>
                    <p className="font-bold text-xl text-gray-900">{systemSizing.batteryCapacityKWh} kWh</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 text-blue-800 text-sm rounded-xl border border-blue-100">
                <p>ملاحظة: هذه الحسابات تقديرية وتعتمد على كفاءة الأجهزة وساعات العمل الفعلية. يُنصح باستشارة مهندس مختص للحصول على تصميم دقيق.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
