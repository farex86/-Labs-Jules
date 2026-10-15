import React, { useReducer, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import toast from 'react-hot-toast';
import {
  FACILITY_TYPES,
  getDefaultAppliances,
  calculateEnergyMetrics,
  calculateSystemRecommendations
} from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacilityId: '',
  appliances: [],
  metrics: { totalDailyKWh: 0, peakPowerKW: 0 },
  recommendations: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facilityId = action.payload;
      const newAppliances = getDefaultAppliances(facilityId);
      return {
        ...state,
        selectedFacilityId: facilityId,
        appliances: newAppliances,
      };
    }
    case 'ADD_APPLIANCE': {
      return {
        ...state,
        appliances: [...state.appliances, action.payload]
      };
    }
    case 'UPDATE_APPLIANCE': {
      const { id, field, value } = action.payload;
      const updated = state.appliances.map(app =>
        app.id === id ? { ...app, [field]: value } : app
      );
      return { ...state, appliances: updated };
    }
    case 'REMOVE_APPLIANCE': {
      const filtered = state.appliances.filter(app => app.id !== action.payload);
      return { ...state, appliances: filtered };
    }
    case 'CALCULATE': {
      const metrics = calculateEnergyMetrics(state.appliances);
      const recommendations = calculateSystemRecommendations(metrics);
      return { ...state, metrics, recommendations };
    }
    default:
      return state;
  }
};

const Icon = ({ name }) => {
  const LucideIcon = LucideIcons[name] ? LucideIcons[name] : LucideIcons.HelpCircle;
  return <LucideIcon className="w-6 h-6 mb-2 text-blue-600" />;
};

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Auto calculate when appliances change
  useEffect(() => {
    dispatch({ type: 'CALCULATE' });
  }, [state.appliances]);

  const handleFacilitySelect = (id) => {
    dispatch({ type: 'SELECT_FACILITY', payload: id });
    toast.success('تم اختيار نمط الاستهلاك بنجاح');
  };

  const handleAddAppliance = () => {
    dispatch({
      type: 'ADD_APPLIANCE',
      payload: { id: crypto.randomUUID(), name: '', powerW: 0, hours: 0, qty: 1 }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">حاسبة الطاقة الشمسية</h1>
          <p className="mt-4 text-xl text-gray-600">اختر نمط الاستهلاك لحساب النظام الشمسي المناسب لك</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">أنماط الاستهلاك</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {FACILITY_TYPES.map((facility) => (
              <motion.button
                key={facility.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFacilitySelect(facility.id)}
                className={`p-4 flex flex-col items-center justify-center text-center rounded-lg border-2 transition-colors duration-200 ${
                  state.selectedFacilityId === facility.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50 text-gray-600'
                }`}
              >
                <div className="capitalize flex items-center flex-col">
                  {/* Note: Icon rendering is simple for demo. Adjust logic based on exact Lucide icon names if needed */}
                  <div className="mb-2"><LucideIcons.Activity className={`w-8 h-8 ${state.selectedFacilityId === facility.id ? 'text-blue-600' : 'text-gray-500'}`}/></div>
                  <span className="text-sm font-semibold">{facility.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {state.selectedFacilityId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Appliances List */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6 border-b pb-2">
                <h2 className="text-2xl font-bold text-gray-800">الأجهزة الكهربائية</h2>
                <button
                  onClick={handleAddAppliance}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <LucideIcons.Plus className="w-5 h-5 ml-1" />
                  إضافة جهاز
                </button>
              </div>

              <div className="space-y-4">
                {state.appliances.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">لا توجد أجهزة مضافة</p>
                ) : (
                  state.appliances.map((app) => (
                    <motion.div
                      key={app.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50 items-end"
                    >
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">اسم الجهاز</label>
                        <input
                          type="text"
                          value={app.name}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'name', value: e.target.value } })}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">القدرة (واط)</label>
                        <input
                          type="number"
                          value={app.powerW}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'powerW', value: e.target.value } })}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">الكمية</label>
                        <input
                          type="number"
                          value={app.qty}
                          onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'qty', value: e.target.value } })}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ساعات العمل</label>
                        <div className="flex space-x-2 space-x-reverse">
                          <input
                            type="number"
                            value={app.hours}
                            onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'hours', value: e.target.value } })}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                            min="0"
                            max="24"
                          />
                          <button
                            onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                            className="p-2 text-red-600 hover:bg-red-50 rounded border border-red-200"
                            title="حذف الجهاز"
                          >
                            <LucideIcons.Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Results Sidebar */}
            <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10">
                <LucideIcons.Sun className="w-48 h-48 -mt-10 -mr-10" />
              </div>

              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6 border-b border-blue-500 pb-2">النتائج المقدرة</h2>

                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-blue-200 text-sm">الاستهلاك اليومي</p>
                    <p className="text-3xl font-bold">{state.metrics.totalDailyKWh.toFixed(2)} <span className="text-lg font-normal">كيلو واط/ساعة</span></p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">الحمل الأقصى (الذروة)</p>
                    <p className="text-3xl font-bold">{state.metrics.peakPowerKW.toFixed(2)} <span className="text-lg font-normal">كيلو واط</span></p>
                  </div>
                </div>

                {state.recommendations && (
                  <div className="bg-white/10 rounded-lg p-4 space-y-4 backdrop-blur-sm">
                    <h3 className="font-semibold text-lg border-b border-white/20 pb-2">مكونات النظام المقترحة</h3>

                    <div className="flex items-center">
                      <LucideIcons.PanelTop className="w-6 h-6 ml-3 text-blue-300" />
                      <div>
                        <p className="text-sm text-blue-200">الألواح الشمسية (550 واط)</p>
                        <p className="font-bold">{state.recommendations.panelCount} لوح</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <LucideIcons.Zap className="w-6 h-6 ml-3 text-blue-300" />
                      <div>
                        <p className="text-sm text-blue-200">الإنفرتر</p>
                        <p className="font-bold">{(state.recommendations.inverterW / 1000).toFixed(1)} كيلو واط</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <LucideIcons.Battery className="w-6 h-6 ml-3 text-blue-300" />
                      <div>
                        <p className="text-sm text-blue-200">البطاريات (48V 100Ah)</p>
                        <p className="font-bold">{state.recommendations.batteriesCount} بطارية</p>
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-xs text-blue-200 mt-6 mt-4">
                  * هذه الحسابات تقديرية. يجب استشارة مهندس مختص قبل تركيب النظام.
                </p>
              </div>
            </div>

          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SolarCalculator;