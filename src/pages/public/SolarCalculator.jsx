import React, { useReducer, useEffect } from 'react';
import { Calculator, Plus, Trash2, Zap, Settings, RefreshCw, ArrowRight } from 'lucide-react';
import { FACILITY_TYPES, calculateTotalConsumption, calculateRecommendedSystemSize } from '../../models/SolarCalculatorModel';

const initialState = {
  facilityType: '',
  appliances: [],
  totalConsumptionWh: 0,
  recommendedSystemSizeKw: 0,
};

const calculatorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      // Deep copy appliances to avoid mutating constants
      const newAppliances = facility ? facility.appliances.map(app => ({ ...app, uid: crypto.randomUUID() })) : [];
      return {
        ...state,
        facilityType: action.payload,
        appliances: newAppliances,
      };
    }
    case 'ADD_APPLIANCE':
      return {
        ...state,
        appliances: [...state.appliances, { uid: crypto.randomUUID(), id: 'custom', name: 'جهاز جديد', powerW: 100, quantity: 1, hours: 1 }],
      };
    case 'UPDATE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.map(app =>
          app.uid === action.payload.uid ? { ...app, ...action.payload.updates } : app
        ),
      };
    case 'REMOVE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.filter(app => app.uid !== action.payload),
      };
    case 'CALCULATE': {
      const totalWh = calculateTotalConsumption(state.appliances);
      const systemSize = calculateRecommendedSystemSize(totalWh);
      return {
        ...state,
        totalConsumptionWh: totalWh,
        recommendedSystemSizeKw: systemSize,
      };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  // Recalculate whenever appliances change
  useEffect(() => {
    dispatch({ type: 'CALCULATE' });
  }, [state.appliances]);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SET_FACILITY', payload: e.target.value });
  };

  const handleUpdateAppliance = (uid, field, value) => {
    dispatch({
      type: 'UPDATE_APPLIANCE',
      payload: { uid, updates: { [field]: value } }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <Calculator className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            احسب استهلاكك من الكهرباء واعرف حجم النظام الشمسي المناسب لمنشأتك
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header & Facility Selection */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <label htmlFor="facility-type" className="block text-sm font-medium text-gray-700 mb-2">
              اختر نوع المنشأة
            </label>
            <select
              id="facility-type"
              className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
              value={state.facilityType}
              onChange={handleFacilityChange}
            >
              <option value="">-- اختر من القائمة --</option>
              {FACILITY_TYPES.map(facility => (
                <option key={facility.id} value={facility.id}>
                  {facility.label}
                </option>
              ))}
            </select>
          </div>

          {/* Appliances List */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">الأجهزة الكهربائية</h2>
              <button
                type="button"
                onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 ml-2" />
                إضافة جهاز
              </button>
            </div>

            {state.appliances.length === 0 ? (
              <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                الرجاء اختيار نوع المنشأة أو إضافة أجهزة يدوياً لبدء الحساب.
              </div>
            ) : (
              <div className="space-y-4">
                {/* Desktop Header */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-2 bg-gray-100 rounded-md text-sm font-medium text-gray-700">
                  <div className="col-span-4">اسم الجهاز</div>
                  <div className="col-span-2 text-center">القدرة (واط)</div>
                  <div className="col-span-2 text-center">العدد</div>
                  <div className="col-span-2 text-center">ساعات التشغيل</div>
                  <div className="col-span-2 text-center">إجراء</div>
                </div>

                {state.appliances.map((app) => (
                  <div key={app.uid} className="flex flex-col md:grid md:grid-cols-12 gap-4 items-center bg-white p-4 md:p-0 md:bg-transparent rounded-lg border md:border-none border-gray-200 shadow-sm md:shadow-none">

                    <div className="w-full md:col-span-4">
                      <label className="block text-xs text-gray-500 md:hidden mb-1">اسم الجهاز</label>
                      <input
                        type="text"
                        value={app.name}
                        onChange={(e) => handleUpdateAppliance(app.uid, 'name', e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="اسم الجهاز"
                      />
                    </div>

                    <div className="w-full md:col-span-2">
                      <label className="block text-xs text-gray-500 md:hidden mb-1">القدرة (واط)</label>
                      <input
                        type="number"
                        min="0"
                        value={app.powerW}
                        onChange={(e) => handleUpdateAppliance(app.uid, 'powerW', Number(e.target.value))}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center"
                      />
                    </div>

                    <div className="w-full md:col-span-2">
                      <label className="block text-xs text-gray-500 md:hidden mb-1">العدد</label>
                      <input
                        type="number"
                        min="1"
                        value={app.quantity}
                        onChange={(e) => handleUpdateAppliance(app.uid, 'quantity', Number(e.target.value))}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center"
                      />
                    </div>

                    <div className="w-full md:col-span-2">
                      <label className="block text-xs text-gray-500 md:hidden mb-1">ساعات التشغيل باليوم</label>
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={app.hours}
                        onChange={(e) => handleUpdateAppliance(app.uid, 'hours', Number(e.target.value))}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center"
                      />
                    </div>

                    <div className="w-full md:col-span-2 flex justify-center mt-2 md:mt-0">
                      <button
                        type="button"
                        onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.uid })}
                        className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 focus:outline-none transition-colors"
                        title="حذف الجهاز"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-blue-900 text-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Zap className="h-6 w-6 ml-2 text-yellow-400" />
              النتائج والتوصيات
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-800 rounded-xl p-6 border border-blue-700">
                <div className="text-blue-200 text-sm mb-1">إجمالي الاستهلاك اليومي المتوقع</div>
                <div className="text-3xl font-bold flex items-baseline">
                  {(state.totalConsumptionWh / 1000).toFixed(2)}
                  <span className="text-lg ml-2 font-normal text-blue-200">كيلوواط.ساعة (kWh)</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-xl p-6 border border-indigo-600 shadow-inner">
                <div className="text-indigo-100 text-sm mb-1">حجم النظام الشمسي المقترح (تقريبي)</div>
                <div className="text-4xl font-extrabold text-white flex items-baseline">
                  {state.recommendedSystemSizeKw.toFixed(1)}
                  <span className="text-xl ml-2 font-normal text-indigo-200">كيلوواط (kW)</span>
                </div>
                <div className="mt-3 text-xs text-indigo-200 opacity-80">
                  *هذا الحساب تقريبي ويفترض 4.5 ساعات ذروة شمسية وكفاءة نظام 80%.
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center border-t border-blue-800 pt-6">
              <button
                type="button"
                onClick={() => dispatch({ type: 'RESET' })}
                className="inline-flex items-center text-sm font-medium text-blue-200 hover:text-white focus:outline-none"
              >
                <RefreshCw className="h-4 w-4 ml-2" />
                إعادة ضبط الحسابات
              </button>

              <button
                type="button"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-yellow-400 hover:bg-yellow-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-colors"
                onClick={() => window.location.href = '/'}
              >
                العودة للرئيسية
                <ArrowRight className="h-5 w-5 mr-2" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
