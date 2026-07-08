import React, { useReducer, useEffect } from 'react';
import { FACILITY_TYPES, APPLIANCES } from '../../utils/solarCalculatorConstants';
import { calculateSystemSize } from '../../utils/solarCalculatorLogic';
import { Calculator, Plus, Trash2, Sun, Battery, Zap, AlertCircle } from 'lucide-react';

const initialState = {
  facilityType: '',
  appliances: [
    { id: Date.now(), applianceId: '', quantity: 1, hoursPerDay: 8 }
  ],
  results: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY_TYPE':
      return { ...state, facilityType: action.payload };
    case 'ADD_APPLIANCE':
      return {
        ...state,
        appliances: [...state.appliances, { id: Date.now(), applianceId: '', quantity: 1, hoursPerDay: 8 }]
      };
    case 'REMOVE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.filter(app => app.id !== action.payload)
      };
    case 'UPDATE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.map(app =>
          app.id === action.payload.id ? { ...app, ...action.payload.updates } : app
        )
      };
    case 'CALCULATE': {
      const populatedAppliances = state.appliances.map(app => ({
        ...app,
        appliance: APPLIANCES.find(a => a.id === app.applianceId)
      })).filter(app => app.appliance);

      const results = calculateSystemSize(populatedAppliances);
      return { ...state, results };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Auto-calculate when appliances change
  useEffect(() => {
    dispatch({ type: 'CALCULATE' });
  }, [state.appliances]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <Calculator className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">حاسبة الطاقة الشمسية</h2>
          <p className="mt-2 text-lg text-gray-600">
            احسب حجم النظام الشمسي المناسب لمنشأتك
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6 space-y-6">

            {/* Facility Type Selection */}
            <div>
              <label htmlFor="facilityType" className="block text-sm font-medium text-gray-700">
                نوع المنشأة
              </label>
              <select
                id="facilityType"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                value={state.facilityType}
                onChange={(e) => dispatch({ type: 'SET_FACILITY_TYPE', payload: e.target.value })}
              >
                <option value="">اختر نوع المنشأة...</option>
                {FACILITY_TYPES.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">الأجهزة الكهربائية</h3>

              <div className="space-y-4">
                {state.appliances.map((app) => (
                  <div key={app.id} className="flex flex-col sm:flex-row gap-4 items-end bg-gray-50 p-4 rounded-lg">
                    <div className="flex-1 w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">الجهاز</label>
                      <select
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                        value={app.applianceId}
                        onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, updates: { applianceId: e.target.value } } })}
                      >
                        <option value="">اختر الجهاز...</option>
                        {APPLIANCES.map(a => (
                          <option key={a.id} value={a.id}>{a.name} ({a.powerWatt} واط)</option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full sm:w-24">
                      <label className="block text-sm font-medium text-gray-700 mb-1">العدد</label>
                      <input
                        type="number"
                        min="1"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        value={app.quantity}
                        onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, updates: { quantity: parseInt(e.target.value) || 0 } } })}
                      />
                    </div>

                    <div className="w-full sm:w-32">
                      <label className="block text-sm font-medium text-gray-700 mb-1">ساعات العمل/يوم</label>
                      <input
                        type="number"
                        min="1"
                        max="24"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        value={app.hoursPerDay}
                        onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, updates: { hoursPerDay: parseInt(e.target.value) || 0 } } })}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                      className="p-2 text-red-600 hover:text-red-800 focus:outline-none"
                      disabled={state.appliances.length === 1}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  إضافة جهاز
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {state.results && state.results.dailyConsumptionKWh > 0 && (
          <div className="bg-white shadow sm:rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-primary text-white">
              <h3 className="text-lg leading-6 font-medium">النتيجة المقدرة للنظام</h3>
              <p className="mt-1 text-sm text-primary-100">
                هذه تقديرات أولية وتعتمد على دقة البيانات المدخلة وكفاءة المعدات.
              </p>
            </div>

            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6">

                <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="rounded-full bg-blue-100 p-3 mb-2">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <dt className="text-sm font-medium text-gray-500">الاستهلاك اليومي</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">{state.results.dailyConsumptionKWh} <span className="text-sm font-normal text-gray-500">كيلوواط/ساعة</span></dd>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="rounded-full bg-yellow-100 p-3 mb-2">
                    <Sun className="h-6 w-6 text-yellow-600" />
                  </div>
                  <dt className="text-sm font-medium text-gray-500">سعة الألواح</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">{state.results.panelsCapacityKw} <span className="text-sm font-normal text-gray-500">كيلوواط</span></dd>
                  <p className="mt-2 text-xs text-gray-500">حوالي {state.results.numberOfPanels} لوح ({state.results.assumedPanelWattage} واط)</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="rounded-full bg-green-100 p-3 mb-2">
                    <Zap className="h-6 w-6 text-green-600" />
                  </div>
                  <dt className="text-sm font-medium text-gray-500">حجم الانفرتر</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">{state.results.inverterSizeKw} <span className="text-sm font-normal text-gray-500">كيلوواط</span></dd>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="rounded-full bg-purple-100 p-3 mb-2">
                    <Battery className="h-6 w-6 text-purple-600" />
                  </div>
                  <dt className="text-sm font-medium text-gray-500">سعة البطاريات (ليثيوم)</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">{state.results.batteryCapacityKwh} <span className="text-sm font-normal text-gray-500">كيلوواط/ساعة</span></dd>
                  <p className="mt-2 text-xs text-gray-500">حوالي {state.results.numberOfBatteries} بطارية ({state.results.assumedBatterySizeKwh} kWh)</p>
                </div>

              </dl>

              <div className="px-4 py-4 sm:px-6 bg-gray-50 text-sm text-gray-500 flex items-start">
                <AlertCircle className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                <p>ملاحظة: هذه الحسابات تفترض 5 ساعات شمس ذروة، وكفاءة نظام 70٪، وبطاريات ليثيوم بتفريغ 80٪. يرجى استشارة مهندس طاقة شمسية لتصميم دقيق يناسب ظروفك الخاصة.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
