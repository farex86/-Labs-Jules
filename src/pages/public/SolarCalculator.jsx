import React, { useState, useReducer, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Calculator, Plus, Trash2, Sun, Battery, Zap, AlertCircle } from 'lucide-react';
import { FACILITY_TYPES, calculateSolarRequirements } from '../../models/SolarCalculatorModel';

export default function SolarCalculator() {
  // Reducer for handling complex state transitions of appliances
  const appliancesReducer = (state, action) => {
    switch (action.type) {
      case 'SET_APPLIANCES':
        // Deep copy to prevent mutating the constant array
        return action.payload.map(app => ({ ...app }));
      case 'ADD_APPLIANCE':
        return [...state, { id: Date.now().toString(), name: 'جهاز جديد', power: 100, quantity: 1, hours: 8 }];
      case 'REMOVE_APPLIANCE':
        return state.filter(app => app.id !== action.payload);
      case 'UPDATE_APPLIANCE':
        return state.map(app =>
          app.id === action.payload.id ? { ...app, [action.payload.field]: action.payload.value } : app
        );
      default:
        return state;
    }
  };

  const [selectedFacilityId, setSelectedFacilityId] = useState(FACILITY_TYPES[0].id);
  const [appliances, dispatch] = useReducer(appliancesReducer, FACILITY_TYPES[0].defaultAppliances.map(a => ({ ...a })));
  // Derive results directly from state instead of using useEffect
  const results = React.useMemo(() => calculateSolarRequirements(appliances), [appliances]);

  useEffect(() => {
    // When facility changes, load its default appliances
    const facility = FACILITY_TYPES.find(f => f.id === selectedFacilityId);
    if (facility) {
      dispatch({ type: 'SET_APPLIANCES', payload: facility.defaultAppliances });
    }
  }, [selectedFacilityId]);


  const handleApplianceChange = (id, field, value) => {
    dispatch({ type: 'UPDATE_APPLIANCE', payload: { id, field, value } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-full mb-4"
          >
            <Sun className="h-8 w-8 text-yellow-600" />
          </motion.div>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك والأجهزة المستخدمة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Input Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Facility Selection */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            >
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Calculator className="ml-2 h-5 w-5 text-blue-500" />
                اختر نوع المنشأة
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {FACILITY_TYPES.map(facility => (
                  <button
                    key={facility.id}
                    onClick={() => setSelectedFacilityId(facility.id)}
                    className={`p-3 text-sm font-medium rounded-md border transition-colors ${
                      selectedFacilityId === facility.id
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {facility.name}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Appliances List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">الأجهزة الكهربائية</h2>
                <button
                  onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none"
                >
                  <Plus className="ml-1.5 h-4 w-4" />
                  إضافة جهاز
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القدرة (واط)</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العدد</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات العمل</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراء</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appliances.map((app) => (
                      <tr key={app.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            value={app.name}
                            onChange={(e) => handleApplianceChange(app.id, 'name', e.target.value)}
                            className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            min="0"
                            value={app.power}
                            onChange={(e) => handleApplianceChange(app.id, 'power', e.target.value)}
                            className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            min="0"
                            value={app.quantity}
                            onChange={(e) => handleApplianceChange(app.id, 'quantity', e.target.value)}
                            className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            min="0"
                            max="24"
                            value={app.hours}
                            onChange={(e) => handleApplianceChange(app.id, 'hours', e.target.value)}
                            className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                            className="text-red-600 hover:text-red-900"
                            title="حذف"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-6"
            >
              <div className="p-6 border-b border-gray-200 bg-blue-50 rounded-t-lg">
                <h3 className="text-xl font-bold text-gray-900 text-center">النتائج التقديرية</h3>
                <p className="text-sm text-gray-500 text-center mt-1">حجم النظام الشمسي المقترح</p>
              </div>

              {results && (
                <div className="p-6 space-y-6">
                  {/* Energy Consumption */}
                  <div>
                    <div className="flex items-center text-gray-700 mb-2">
                      <Zap className="h-5 w-5 ml-2 text-yellow-500" />
                      <span className="font-medium">الاستهلاك اليومي</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {(results.dailyEnergyWh / 1000).toFixed(1)} <span className="text-sm font-normal text-gray-500">كيلوواط/ساعة</span>
                    </div>
                  </div>

                  {/* Inverter */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center text-gray-700 mb-2">
                      <Calculator className="h-5 w-5 ml-2 text-blue-500" />
                      <span className="font-medium">حجم الانفرتر المطلوب</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {(results.inverterSizeW / 1000).toFixed(1)} <span className="text-sm font-normal text-gray-500">كيلوواط (kW)</span>
                    </div>
                  </div>

                  {/* Solar Panels */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center text-gray-700 mb-2">
                      <Sun className="h-5 w-5 ml-2 text-orange-500" />
                      <span className="font-medium">الألواح الشمسية</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {results.numberOfPanels} <span className="text-sm font-normal text-gray-500">لوح ({results.panelWattage} واط)</span>
                    </div>
                  </div>

                  {/* Batteries */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center text-gray-700 mb-2">
                      <Battery className="h-5 w-5 ml-2 text-green-500" />
                      <span className="font-medium">سعة البطاريات ({results.batteryVoltage}V)</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.ceil(results.batteryCapacityAh)} <span className="text-sm font-normal text-gray-500">أمبير/ساعة (Ah)</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 bg-yellow-50 p-4 rounded-md mt-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      </div>
                      <div className="mr-3">
                        <h3 className="text-sm font-medium text-yellow-800">ملاحظة</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>
                            هذه الحسابات تقديرية. يُنصح باستشارة مهندس طاقة شمسية مختص للحصول على تصميم دقيق يناسب ظروف موقعك.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
