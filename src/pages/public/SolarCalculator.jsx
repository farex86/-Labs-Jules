import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { Settings, Plus, Trash2, Calculator, Zap, Battery, Sun, HardDrive } from 'lucide-react';
import { FACILITY_TYPES, calculateSolarRequirements } from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacility: '',
  appliances: [],
  results: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facilityId = action.payload;
      const facility = FACILITY_TYPES.find(f => f.id === facilityId);
      // Deep copy to prevent mutating constant data
      const defaultAppliances = facility ? facility.defaultAppliances.map(a => ({ ...a })) : [];

      return {
        ...state,
        selectedFacility: facilityId,
        appliances: defaultAppliances,
        results: null,
      };
    }
    case 'ADD_APPLIANCE': {
      const newAppliance = {
        id: Date.now().toString(),
        name: 'جهاز جديد',
        wattage: 100,
        hours: 8,
        quantity: 1,
      };
      return {
        ...state,
        appliances: [...state.appliances, newAppliance],
        results: null,
      };
    }
    case 'UPDATE_APPLIANCE': {
      const { id, field, value } = action.payload;
      return {
        ...state,
        appliances: state.appliances.map(app =>
          app.id === id ? { ...app, [field]: value } : app
        ),
        results: null,
      };
    }
    case 'REMOVE_APPLIANCE': {
      return {
        ...state,
        appliances: state.appliances.filter(app => app.id !== action.payload),
        results: null,
      };
    }
    case 'CALCULATE': {
      const results = calculateSolarRequirements(state.appliances);
      return {
        ...state,
        results,
      };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SET_FACILITY', payload: e.target.value });
    if (e.target.value) {
      toast.success('تم تحميل الأجهزة الافتراضية للمنشأة', { duration: 3000 });
    }
  };

  const handleAddAppliance = () => {
    dispatch({ type: 'ADD_APPLIANCE' });
    toast.success('تم إضافة جهاز جديد', { duration: 2000 });
  };

  const handleUpdateAppliance = (id, field, value) => {
    dispatch({ type: 'UPDATE_APPLIANCE', payload: { id, field, value } });
  };

  const handleRemoveAppliance = (id) => {
    dispatch({ type: 'REMOVE_APPLIANCE', payload: id });
    toast.success('تم إزالة الجهاز', { duration: 2000 });
  };

  const handleCalculate = () => {
    if (state.appliances.length === 0) {
      toast.error('الرجاء إضافة أجهزة لحساب الأحمال', { duration: 3000 });
      return;
    }
    dispatch({ type: 'CALCULATE' });
    toast.success('تم الحساب بنجاح', { duration: 3000 });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
            <Sun className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">حاسبة الطاقة الشمسية</h1>
          <p className="mt-3 text-lg text-gray-500">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك وأجهزتك الكهربائية
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-2">
              اختر نوع المنشأة للبدء (اختياري)
            </label>
            <select
              id="facility"
              value={state.selectedFacility}
              onChange={handleFacilityChange}
              className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg border shadow-sm bg-white"
            >
              <option value="">-- اختر منشأة --</option>
              {FACILITY_TYPES.map(facility => (
                <option key={facility.id} value={facility.id}>
                  {facility.name}
                </option>
              ))}
            </select>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <Settings className="h-5 w-5 ml-2 text-gray-500" />
                الأجهزة الكهربائية
              </h2>
              <button
                onClick={handleAddAppliance}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Plus className="h-4 w-4 ml-2" />
                إضافة جهاز
              </button>
            </div>

            <div className="space-y-4">
              {state.appliances.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <Settings className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-2 text-sm text-gray-500">لا توجد أجهزة مضافة. اختر منشأة أو أضف جهازاً يدوياً.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 rounded-t-lg">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القدرة (واط)</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات العمل/يوم</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الكمية</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراء</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {state.appliances.map((app, index) => (
                        <motion.tr
                          key={app.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              value={app.name}
                              onChange={(e) => handleUpdateAppliance(app.id, 'name', e.target.value)}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
                              placeholder="اسم الجهاز"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              value={app.wattage}
                              onChange={(e) => handleUpdateAppliance(app.id, 'wattage', e.target.value)}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              max="24"
                              value={app.hours}
                              onChange={(e) => handleUpdateAppliance(app.id, 'hours', e.target.value)}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="1"
                              value={app.quantity}
                              onChange={(e) => handleUpdateAppliance(app.id, 'quantity', e.target.value)}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleRemoveAppliance(app.id)}
                              className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-md hover:bg-red-100 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="mt-8">
              <button
                onClick={handleCalculate}
                className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:scale-[1.01]"
              >
                <Calculator className="h-6 w-6 ml-2" />
                احسب الاحتياجات الآن
              </button>
            </div>
          </div>
        </motion.div>

        {state.results && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100"
          >
            <div className="bg-green-50 px-6 py-4 border-b border-green-100">
              <h3 className="text-xl font-bold text-green-800 flex items-center">
                <Zap className="h-6 w-6 ml-2 text-green-600" />
                نتائج التقدير المبدئي للنظام
              </h3>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <Sun className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-800 mb-1">حجم الألواح المطلوبة</p>
                  <p className="text-3xl font-extrabold text-blue-900">{state.results.panelCapacityKW} <span className="text-lg font-medium">كيلو واط</span></p>
                  <p className="text-xs text-blue-600 mt-2">يعتمد على 5 ساعات شمسية ذروة وكفاءة 80%</p>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <Battery className="h-8 w-8 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-800 mb-1">سعة البطاريات المطلوبة ({state.results.systemVoltage} فولت)</p>
                  <p className="text-3xl font-extrabold text-purple-900">{state.results.batteryCapacityAh} <span className="text-lg font-medium">أمبير.ساعة</span></p>
                  <p className="text-xs text-purple-600 mt-2">يعادل {state.results.batteryCapacityKWh} كيلو واط.ساعة (يوم ونصف استقلالية)</p>
                </div>
              </div>

              <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <HardDrive className="h-8 w-8 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-800 mb-1">حجم المحول (الإنفرتر)</p>
                  <p className="text-3xl font-extrabold text-amber-900">{state.results.inverterSizeKW} <span className="text-lg font-medium">كيلو واط</span></p>
                  <p className="text-xs text-amber-600 mt-2">عامل أمان 25% فوق أقصى حمل مستمر</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <Zap className="h-8 w-8 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 mb-1">إجمالي الاستهلاك اليومي</p>
                  <p className="text-3xl font-extrabold text-gray-900">{state.results.totalEnergyKWh} <span className="text-lg font-medium">كيلو واط.ساعة</span></p>
                  <p className="text-xs text-gray-500 mt-2">أقصى حمل متزامن: {state.results.maxPowerKW} كيلو واط</p>
                </div>
              </div>

            </div>

            <div className="bg-yellow-50 px-6 py-4 border-t border-yellow-100">
              <p className="text-sm text-yellow-800 flex items-center">
                <span className="font-bold ml-1">ملاحظة هامة:</span> هذه الحسابات تقديرية وتعتمد على افتراضات عامة. يرجى استشارة مهندس طاقة شمسية لتصميم النظام النهائي.
              </p>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
