import React, { useState, useEffect, useReducer } from 'react';
import { Calculator, Battery, Sun, Zap, Info, Plus, Trash2 } from 'lucide-react';
import { FACILITY_TYPES, CONSUMPTION_PATTERNS, SolarCalculatorModel } from '../../models/SolarCalculatorModel';

// Simple reducer to manage appliance list state
const appliancesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_APPLIANCES':
      return action.payload;
    case 'UPDATE_APPLIANCE':
      return state.map(app =>
        app.id === action.payload.id
          ? { ...app, [action.payload.field]: action.payload.value }
          : app
      );
    case 'ADD_APPLIANCE':
      return [...state, {
        id: `custom_${Date.now()}`,
        name: 'جهاز جديد',
        watts: 100,
        quantity: 1,
        hours: 1
      }];
    case 'REMOVE_APPLIANCE':
      return state.filter(app => app.id !== action.payload);
    default:
      return state;
  }
};

const SolarCalculator = () => {
  const [selectedFacility, setSelectedFacility] = useState(FACILITY_TYPES[0].id);
  const [appliances, dispatch] = useReducer(appliancesReducer, []);

  // Load default appliances when facility changes
  useEffect(() => {
    if (CONSUMPTION_PATTERNS[selectedFacility]) {
      // Deep copy to prevent modifying the constant
      const defaultAppliances = JSON.parse(JSON.stringify(CONSUMPTION_PATTERNS[selectedFacility]));
      dispatch({ type: 'SET_APPLIANCES', payload: defaultAppliances });
    } else {
      dispatch({ type: 'SET_APPLIANCES', payload: [] });
    }
  }, [selectedFacility]);

  // Derive results directly from appliances (no useEffect needed)
  const results = appliances.length > 0
    ? SolarCalculatorModel.calculateSystem(appliances)
    : null;

  const handleUpdateAppliance = (id, field, value) => {
    dispatch({
      type: 'UPDATE_APPLIANCE',
      payload: { id, field, value: field === 'name' ? value : Number(value) || 0 }
    });
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <Calculator size={24} />
            </div>
            <h1 className="text-xl font-bold text-gray-900">حاسبة الطاقة الشمسية</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Input Form */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Info size={20} className="text-gray-500" />
                معلومات المنشأة
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع المنشأة</label>
                <select
                  value={selectedFacility}
                  onChange={(e) => setSelectedFacility(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 p-2 border"
                >
                  {FACILITY_TYPES.map(facility => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-sm text-gray-500">
                  قم باختيار نوع المنشأة لتحميل الأجهزة الافتراضية وأنماط الاستهلاك الشائعة.
                </p>
              </div>
            </div>

            {/* Appliances List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Zap size={20} className="text-yellow-500" />
                  الأجهزة والأحمال
                </h2>
                <button
                  onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                  className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark bg-primary/10 px-3 py-1.5 rounded-md transition-colors"
                >
                  <Plus size={16} />
                  إضافة جهاز
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead>
                    <tr className="border-b border-gray-200 text-sm text-gray-500">
                      <th className="pb-3 font-medium">اسم الجهاز</th>
                      <th className="pb-3 font-medium w-24">القدرة (واط)</th>
                      <th className="pb-3 font-medium w-20">العدد</th>
                      <th className="pb-3 font-medium w-24">ساعات العمل</th>
                      <th className="pb-3 font-medium w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {appliances.map(app => (
                      <tr key={app.id}>
                        <td className="py-3 pr-2">
                          <input
                            type="text"
                            value={app.name}
                            onChange={(e) => handleUpdateAppliance(app.id, 'name', e.target.value)}
                            className="w-full text-sm border-gray-300 rounded-md focus:ring-primary focus:border-primary p-1.5 border"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            min="0"
                            value={app.watts}
                            onChange={(e) => handleUpdateAppliance(app.id, 'watts', e.target.value)}
                            className="w-full text-sm border-gray-300 rounded-md focus:ring-primary focus:border-primary p-1.5 border"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            min="1"
                            value={app.quantity}
                            onChange={(e) => handleUpdateAppliance(app.id, 'quantity', e.target.value)}
                            className="w-full text-sm border-gray-300 rounded-md focus:ring-primary focus:border-primary p-1.5 border"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            min="0"
                            max="24"
                            value={app.hours}
                            onChange={(e) => handleUpdateAppliance(app.id, 'hours', e.target.value)}
                            className="w-full text-sm border-gray-300 rounded-md focus:ring-primary focus:border-primary p-1.5 border"
                          />
                        </td>
                        <td className="py-3 pl-2 text-left">
                          <button
                            onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            title="حذف الجهاز"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {appliances.length === 0 && (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-gray-500">
                          لا توجد أجهزة مضافة. قم بإضافة جهاز لحساب الاستهلاك.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
                النتائج المقدرة
              </h2>

              {results ? (
                <div className="space-y-6">
                  {/* Energy Result */}
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600 shrink-0">
                      <Zap size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">الاستهلاك اليومي</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {results.totalDailyWh >= 1000
                          ? `${(results.totalDailyWh / 1000).toFixed(2)} كيلو واط/ساعة`
                          : `${Math.round(results.totalDailyWh)} واط/ساعة`}
                      </p>
                    </div>
                  </div>

                  {/* Inverter Result */}
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg text-purple-600 shrink-0">
                      <Calculator size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">حجم الانفرتر المقترح</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {results.inverterCapacityW >= 1000
                          ? `${(results.inverterCapacityW / 1000).toFixed(1)} kW`
                          : `${Math.ceil(results.inverterCapacityW)} W`}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">شامل هامش أمان 25%</p>
                    </div>
                  </div>

                  {/* Panels Result */}
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 p-3 rounded-lg text-yellow-600 shrink-0">
                      <Sun size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">عدد الألواح الشمسية</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {results.panelsNeeded} <span className="text-lg font-normal text-gray-500">لوح</span>
                      </p>
                      <p className="text-xs text-gray-400 mt-1">بقدرة {results.panelWattage} واط للوح (معدل 5 ساعات شمس)</p>
                    </div>
                  </div>

                  {/* Battery Result */}
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-lg text-green-600 shrink-0">
                      <Battery size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">سعة البطاريات (نظام {results.systemVoltage}V)</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.ceil(results.batteryCapacityAh)} <span className="text-lg font-normal text-gray-500">Ah</span>
                      </p>
                      <p className="text-xs text-gray-400 mt-1">تفريغ 80% (ليثيوم)</p>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <Calculator size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>قم بإضافة أجهزة لرؤية النتائج</p>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-500 leading-relaxed text-justify">
                  <strong>ملاحظة:</strong> هذه الحسابات تقديرية وتعتمد على متوسط الإشعاع الشمسي وكفاءة المعدات. يرجى استشارة مهندس مختص قبل شراء أي معدات للتأكد من مطابقتها لاحتياجاتك الفعلية.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SolarCalculator;