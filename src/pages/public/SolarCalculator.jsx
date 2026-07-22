import React, { useReducer } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Battery, Sun, Zap, Plus, Trash2, Edit2, Check, Info } from 'lucide-react';
import {
  FACILITY_TYPES,
  APPLIANCES_BY_FACILITY,
  DEFAULT_APPLIANCES,
  calculateDailyEnergy,
  calculateSystemSize,
  calculateBatteryStorage,
  calculatePeakPower,
  calculateInverterSize
} from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacility: '',
  appliances: DEFAULT_APPLIANCES,
  editingId: null,
  editForm: { name: '', power: 0, hours: 0, quantity: 1 }
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY':
      return {
        ...state,
        selectedFacility: action.payload,
        appliances: APPLIANCES_BY_FACILITY[action.payload]
          ? JSON.parse(JSON.stringify(APPLIANCES_BY_FACILITY[action.payload])) // Deep copy to prevent mutation issues
          : DEFAULT_APPLIANCES,
        editingId: null
      };
    case 'ADD_APPLIANCE':
      return {
        ...state,
        appliances: [
          ...state.appliances,
          {
            id: Date.now().toString(),
            name: 'جهاز جديد',
            power: 100,
            hours: 4,
            quantity: 1
          }
        ]
      };
    case 'REMOVE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.filter(app => app.id !== action.payload)
      };
    case 'START_EDIT': {
      const appToEdit = state.appliances.find(a => a.id === action.payload);
      return {
        ...state,
        editingId: action.payload,
        editForm: { ...appToEdit }
      };
    }
    case 'CANCEL_EDIT':
      return { ...state, editingId: null };
    case 'UPDATE_EDIT_FORM':
      return {
        ...state,
        editForm: { ...state.editForm, ...action.payload }
      };
    case 'SAVE_EDIT':
      return {
        ...state,
        appliances: state.appliances.map(app =>
          app.id === state.editingId ? { ...state.editForm } : app
        ),
        editingId: null
      };
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dailyEnergyWh = calculateDailyEnergy(state.appliances);
  const peakPowerW = calculatePeakPower(state.appliances);
  const systemSizeKW = calculateSystemSize(dailyEnergyWh);
  const batteryStorageKWh = calculateBatteryStorage(dailyEnergyWh);
  const inverterSizeKW = calculateInverterSize(peakPowerW);

  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Calculator className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">حاسبة الطاقة الشمسية</h1>
              <p className="mt-1 text-sm text-gray-500">احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك والأجهزة المستخدمة</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content (Left in LTR, Right in RTL) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sun className="h-5 w-5 text-yellow-500" />
                اختر نوع المنشأة
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {FACILITY_TYPES.map((facility) => (
                  <button
                    key={facility.id}
                    onClick={() => dispatch({ type: 'SET_FACILITY', payload: facility.id })}
                    className={`p-3 text-sm rounded-xl font-medium transition-colors border ${
                      state.selectedFacility === facility.id
                        ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    {facility.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Appliances List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-500" />
                  الأجهزة الكهربائية ({state.appliances.length})
                </h2>
                <button
                  onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  إضافة جهاز
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-right">
                  <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4">اسم الجهاز</th>
                      <th className="px-6 py-4">الاستهلاك (واط)</th>
                      <th className="px-6 py-4">ساعات العمل</th>
                      <th className="px-6 py-4">العدد</th>
                      <th className="px-6 py-4 text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {state.appliances.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50/50 transition-colors group">
                        {state.editingId === app.id ? (
                          <>
                            <td className="px-6 py-3">
                              <input
                                type="text"
                                value={state.editForm.name}
                                onChange={(e) => dispatch({ type: 'UPDATE_EDIT_FORM', payload: { name: e.target.value } })}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </td>
                            <td className="px-6 py-3">
                              <input
                                type="number"
                                value={state.editForm.power}
                                onChange={(e) => dispatch({ type: 'UPDATE_EDIT_FORM', payload: { power: Number(e.target.value) } })}
                                className="w-24 px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </td>
                            <td className="px-6 py-3">
                              <input
                                type="number"
                                value={state.editForm.hours}
                                onChange={(e) => dispatch({ type: 'UPDATE_EDIT_FORM', payload: { hours: Number(e.target.value) } })}
                                className="w-20 px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </td>
                            <td className="px-6 py-3">
                              <input
                                type="number"
                                value={state.editForm.quantity}
                                onChange={(e) => dispatch({ type: 'UPDATE_EDIT_FORM', payload: { quantity: Number(e.target.value) } })}
                                className="w-20 px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </td>
                            <td className="px-6 py-3 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => dispatch({ type: 'SAVE_EDIT' })}
                                  className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="حفظ"
                                >
                                  <Check className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => dispatch({ type: 'CANCEL_EDIT' })}
                                  className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                                  title="إلغاء"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-6 py-4 font-medium text-gray-900">{app.name}</td>
                            <td className="px-6 py-4 text-gray-600">{app.power} واط</td>
                            <td className="px-6 py-4 text-gray-600">{app.hours} ساعات</td>
                            <td className="px-6 py-4 text-gray-600">{app.quantity}</td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => dispatch({ type: 'START_EDIT', payload: app.id })}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="تعديل"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="حذف"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                    {state.appliances.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                          لا توجد أجهزة مضافة. انقر على "إضافة جهاز" للبدء.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Results Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-200" />
                النتائج المقدرة
              </h3>

              <div className="space-y-6">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-100 text-sm flex items-center gap-1.5">
                      <Sun className="h-4 w-4" />
                      حجم الألواح الشمسية
                    </span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold">{systemSizeKW.toFixed(1)}</span>
                    <span className="text-blue-200 mb-1">كيلوواط (kW)</span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-100 text-sm flex items-center gap-1.5">
                      <Battery className="h-4 w-4" />
                      سعة البطاريات المطلوبة
                    </span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold">{batteryStorageKWh.toFixed(1)}</span>
                    <span className="text-blue-200 mb-1">كيلوواط ساعة (kWh)</span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-100 text-sm flex items-center gap-1.5">
                      <Zap className="h-4 w-4" />
                      حجم الإنفرتر (المحول)
                    </span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold">{inverterSizeKW.toFixed(1)}</span>
                    <span className="text-blue-200 mb-1">كيلوواط (kW)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex items-start gap-2 text-xs text-blue-200">
                  <Info className="h-4 w-4 shrink-0 mt-0.5" />
                  <p>هذه الحسابات تقديرية وتعتمد على كفاءة افتراضية 80% للألواح وساعات سطوع 5 ساعات. ينصح باستشارة مهندس مختص للحصول على تصميم دقيق.</p>
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-md font-bold text-gray-900 mb-4">ملخص الاستهلاك</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500">إجمالي الطاقة اليومية</span>
                  <span className="font-semibold text-gray-900">{(dailyEnergyWh / 1000).toFixed(2)} kWh</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500">ذروة السحب (Peak)</span>
                  <span className="font-semibold text-gray-900">{(peakPowerW / 1000).toFixed(2)} kW</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500">إجمالي الأجهزة</span>
                  <span className="font-semibold text-gray-900">{state.appliances.reduce((acc, app) => acc + app.quantity, 0)} جهاز</span>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </main>
    </div>
  );
}
