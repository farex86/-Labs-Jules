import React, { useReducer, useEffect } from 'react';
import { Calculator, Plus, Trash2, Zap, Battery, Sun, Server } from 'lucide-react';
import { FACILITY_TYPES, calculateSolarSystem } from '../../models/SolarCalculatorModel';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const initialState = {
  selectedFacilityId: '',
  appliances: [],
  results: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      if (!facility) return { ...state, selectedFacilityId: action.payload, appliances: [], results: null };

      // Deep copy to prevent mutating the original constant
      const copiedAppliances = facility.appliances.map(app => ({ ...app, instanceId: Date.now() + Math.random() }));
      return {
        ...state,
        selectedFacilityId: action.payload,
        appliances: copiedAppliances,
      };
    }
    case 'ADD_APPLIANCE':
      return {
        ...state,
        appliances: [
          ...state.appliances,
          { instanceId: Date.now() + Math.random(), id: 'custom', name: 'جهاز جديد', power: 100, quantity: 1, hours: 1 }
        ]
      };
    case 'UPDATE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.map(app =>
          app.instanceId === action.payload.instanceId
            ? { ...app, [action.payload.field]: action.payload.value }
            : app
        )
      };
    case 'REMOVE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.filter(app => app.instanceId !== action.payload)
      };
    case 'CALCULATE':
      return {
        ...state,
        results: calculateSolarSystem(state.appliances)
      };
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Auto-calculate whenever appliances change
  useEffect(() => {
    if (state.appliances.length > 0) {
      dispatch({ type: 'CALCULATE' });
    } else {
      // Clear results if no appliances
      dispatch({ type: 'CALCULATE' });
    }
  }, [state.appliances]);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SELECT_FACILITY', payload: e.target.value });
  };

  const handleAddAppliance = () => {
    dispatch({ type: 'ADD_APPLIANCE' });
  };

  const handleUpdateAppliance = (instanceId, field, value) => {
    dispatch({ type: 'UPDATE_APPLIANCE', payload: { instanceId, field, value } });
  };

  const handleRemoveAppliance = (instanceId) => {
    dispatch({ type: 'REMOVE_APPLIANCE', payload: instanceId });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
            <Calculator className="w-8 h-8 text-blue-600" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك والأجهزة المستخدمة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Inputs Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <label htmlFor="facilityType" className="block text-sm font-medium text-gray-700 mb-2">
                اختر نوع المنشأة
              </label>
              <select
                id="facilityType"
                value={state.selectedFacilityId}
                onChange={handleFacilityChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-3 px-4"
              >
                <option value="">-- اختر المنشأة --</option>
                {FACILITY_TYPES.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>

            {state.appliances.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">الأجهزة</h2>
                  <button
                    onClick={handleAddAppliance}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="space-y-4">
                  {state.appliances.map((app) => (
                    <motion.div
                      key={app.instanceId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="md:col-span-4">
                        <label className="block text-xs text-gray-500 mb-1">اسم الجهاز</label>
                        <input
                          type="text"
                          value={app.name}
                          onChange={(e) => handleUpdateAppliance(app.instanceId, 'name', e.target.value)}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-500 mb-1">القدرة (واط)</label>
                        <input
                          type="number"
                          min="0"
                          value={app.power}
                          onChange={(e) => handleUpdateAppliance(app.instanceId, 'power', e.target.value)}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-500 mb-1">العدد</label>
                        <input
                          type="number"
                          min="1"
                          value={app.quantity}
                          onChange={(e) => handleUpdateAppliance(app.instanceId, 'quantity', e.target.value)}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-xs text-gray-500 mb-1">ساعات التشغيل (يومياً)</label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={app.hours}
                          onChange={(e) => handleUpdateAppliance(app.instanceId, 'hours', e.target.value)}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
                        />
                      </div>
                      <div className="md:col-span-1 flex justify-end">
                        <button
                          onClick={() => handleRemoveAppliance(app.instanceId)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">النتائج المقدرة</h2>

              {state.results && state.appliances.length > 0 ? (
                <div className="space-y-6">

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">الاستهلاك اليومي</p>
                      <p className="text-xl font-bold text-gray-900">{state.results.totalDailyEnergyKWh} <span className="text-sm font-normal text-gray-600">كيلو واط ساعة (kWh)</span></p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <Server className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">الإنفرتر المقترح</p>
                      <p className="text-xl font-bold text-gray-900">{state.results.recommendedInverterKVA} <span className="text-sm font-normal text-gray-600">كيلو فولت أمبير (kVA)</span></p>
                      <p className="text-xs text-gray-400 mt-1">يتحمل أقصى حمل: {state.results.maxPowerKW} kW</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <Sun className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">الألواح الشمسية</p>
                      <p className="text-xl font-bold text-gray-900">{state.results.numberOfPanels} <span className="text-sm font-normal text-gray-600">لوح</span></p>
                      <p className="text-xs text-gray-400 mt-1">بقدرة {state.results.panelWattage} واط للوح الواحد بإجمالي {state.results.totalPanelWattageKW} kW</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <Battery className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">سعة البطاريات المطلوبة</p>
                      <p className="text-xl font-bold text-gray-900">{state.results.batteryCapacityAh} <span className="text-sm font-normal text-gray-600">أمبير ساعة (Ah)</span></p>
                      <p className="text-xs text-gray-400 mt-1">لنظام {state.results.batteryVoltage} فولت بتفريغ 80%</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 text-center">
                      ملاحظة: هذه الحسابات تقديرية ويُنصح باستشارة مهندس طاقة شمسية لتصميم النظام النهائي بدقة.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">يرجى اختيار المنشأة وإضافة الأجهزة لرؤية النتائج.</p>
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
