import React, { useReducer } from 'react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Plus, Trash2, Edit2, Calculator, Save, AlertCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { FACILITY_TYPES, calculateSolarSystem } from '../../models/SolarCalculatorModel';

// Reducer for complex state management (to avoid useState prop drilling and messy effects)
const initialState = {
  selectedFacilityId: '',
  appliances: [],
  editingId: null,
  newAppliance: { name: '', power: '', quantity: '', hours: '' },
  results: null,
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      return {
        ...state,
        selectedFacilityId: action.payload,
        // Deep copy the default appliances so we don't mutate the constant model data
        appliances: facility ? facility.defaultAppliances.map(a => ({ ...a })) : [],
        results: null, // Clear previous results
      };
    }
    case 'SET_NEW_APPLIANCE_FIELD':
      return {
        ...state,
        newAppliance: { ...state.newAppliance, [action.payload.field]: action.payload.value },
      };
    case 'ADD_APPLIANCE': {
      const { name, power, quantity, hours } = state.newAppliance;
      if (!name || !power || !quantity || !hours) return state; // handled in component

      const newId = Date.now().toString();
      const newApplianceObj = {
        id: newId,
        name,
        power: Number(power),
        quantity: Number(quantity),
        hours: Number(hours),
      };

      return {
        ...state,
        appliances: [...state.appliances, newApplianceObj],
        newAppliance: { name: '', power: '', quantity: '', hours: '' }, // reset form
        results: null,
      };
    }
    case 'REMOVE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.filter(a => a.id !== action.payload),
        results: null,
      };
    case 'START_EDIT': {
      const applianceToEdit = state.appliances.find(a => a.id === action.payload);
      return {
        ...state,
        editingId: action.payload,
        newAppliance: {
          name: applianceToEdit.name,
          power: applianceToEdit.power.toString(),
          quantity: applianceToEdit.quantity.toString(),
          hours: applianceToEdit.hours.toString(),
        },
      };
    }
    case 'SAVE_EDIT': {
      const { name, power, quantity, hours } = state.newAppliance;
      if (!name || !power || !quantity || !hours) return state;

      return {
        ...state,
        appliances: state.appliances.map(a =>
          a.id === state.editingId
            ? { ...a, name, power: Number(power), quantity: Number(quantity), hours: Number(hours) }
            : a
        ),
        editingId: null,
        newAppliance: { name: '', power: '', quantity: '', hours: '' },
        results: null,
      };
    }
    case 'CANCEL_EDIT':
      return {
        ...state,
        editingId: null,
        newAppliance: { name: '', power: '', quantity: '', hours: '' },
      };
    case 'CALCULATE':
      return {
        ...state,
        results: calculateSolarSystem(state.appliances),
      };
    default:
      return state;
  }
}

// Chart Colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'];

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handleSelectFacility = (e) => {
    dispatch({ type: 'SELECT_FACILITY', payload: e.target.value });
    toast.success('تم تحديث قائمة الأجهزة بناءً على نمط الاستهلاك المحدد.');
  };

  const handleAddOrSaveAppliance = () => {
    const { name, power, quantity, hours } = state.newAppliance;
    if (!name || !power || !quantity || !hours) {
      toast.error('الرجاء تعبئة جميع حقول الجهاز.');
      return;
    }

    if (Number(hours) > 24) {
      toast.error('ساعات العمل لا يمكن أن تتجاوز 24 ساعة.');
      return;
    }

    if (state.editingId) {
      dispatch({ type: 'SAVE_EDIT' });
      toast.success('تم تعديل الجهاز بنجاح.');
    } else {
      dispatch({ type: 'ADD_APPLIANCE' });
      toast.success('تمت إضافة الجهاز بنجاح.');
    }
  };

  const handleCalculate = () => {
    if (state.appliances.length === 0) {
      toast.error('الرجاء إضافة جهاز واحد على الأقل لحساب النظام.');
      return;
    }
    dispatch({ type: 'CALCULATE' });
    toast.success('تم الحساب بنجاح!');

    // Scroll to results slightly
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  // Prepare data for the pie chart
  const chartData = state.appliances.map((app) => ({
    name: app.name,
    value: Number(app.power) * Number(app.quantity) * Number(app.hours),
  })).sort((a, b) => b.value - a.value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      dir="rtl" // Explicit RTL
    >
      <Toaster position="top-center" />

      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            اختر نمط الاستهلاك الخاص بك أو قم بإضافة الأجهزة يدوياً لحساب حجم النظام الشمسي المطلوب.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Input Form (RTL so visually on right/center) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Selection Card */}
            <div className="bg-white shadow rounded-lg p-6 border-t-4 border-blue-500">
              <h2 className="text-lg font-medium text-gray-900 mb-4">1. اختر نمط المنشأة (اختياري)</h2>
              <select
                value={state.selectedFacilityId}
                onChange={handleSelectFacility}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">-- اختر نمط الاستهلاك للبدء بقائمة افتراضية --</option>
                {FACILITY_TYPES.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Appliances List Card */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center justify-between">
                <span>2. قائمة الأجهزة ({state.appliances.length})</span>
                {state.appliances.length > 0 && (
                  <span className="text-sm text-gray-500 font-normal">
                    إجمالي الاستهلاك اليومي: {(chartData.reduce((sum, item) => sum + item.value, 0) / 1000).toFixed(2)} كيلوواط ساعة
                  </span>
                )}
              </h2>

              {/* Add/Edit Form */}
              <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-5 items-end mb-6 bg-gray-50 p-4 rounded-md border border-gray-200">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">اسم الجهاز</label>
                  <input
                    type="text"
                    value={state.newAppliance.name}
                    onChange={(e) => dispatch({ type: 'SET_NEW_APPLIANCE_FIELD', payload: { field: 'name', value: e.target.value }})}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border focus:ring-blue-500 focus:border-blue-500"
                    placeholder="مثال: مكيف"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">القدرة (واط)</label>
                  <input
                    type="number"
                    min="1"
                    value={state.newAppliance.power}
                    onChange={(e) => dispatch({ type: 'SET_NEW_APPLIANCE_FIELD', payload: { field: 'power', value: e.target.value }})}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">العدد</label>
                  <input
                    type="number"
                    min="1"
                    value={state.newAppliance.quantity}
                    onChange={(e) => dispatch({ type: 'SET_NEW_APPLIANCE_FIELD', payload: { field: 'quantity', value: e.target.value }})}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">ساعات العمل</label>
                  <input
                    type="number"
                    min="1"
                    max="24"
                    value={state.newAppliance.hours}
                    onChange={(e) => dispatch({ type: 'SET_NEW_APPLIANCE_FIELD', payload: { field: 'hours', value: e.target.value }})}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="sm:col-span-5 flex justify-end space-x-3 space-x-reverse mt-2">
                  {state.editingId && (
                    <button
                      onClick={() => dispatch({ type: 'CANCEL_EDIT' })}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      إلغاء
                    </button>
                  )}
                  <button
                    onClick={handleAddOrSaveAppliance}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {state.editingId ? <><Save className="ml-2 h-4 w-4" /> حفظ التعديلات</> : <><Plus className="ml-2 h-4 w-4" /> إضافة جهاز</>}
                  </button>
                </div>
              </div>

              {/* Table of appliances */}
              {state.appliances.length > 0 ? (
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-6">الجهاز</th>
                        <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">القدرة (W)</th>
                        <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">العدد</th>
                        <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">ساعات العمل</th>
                        <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">إجمالي الطاقة (Wh)</th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">إجراءات</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {state.appliances.map((appliance) => (
                        <tr key={appliance.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{appliance.name}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{appliance.power}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{appliance.quantity}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{appliance.hours}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {(appliance.power * appliance.quantity * appliance.hours).toLocaleString()}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                            <button
                              onClick={() => dispatch({ type: 'START_EDIT', payload: appliance.id })}
                              className="text-blue-600 hover:text-blue-900 ml-4 inline-block"
                              title="تعديل"
                            >
                              <Edit2 className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: appliance.id })}
                              className="text-red-600 hover:text-red-900 inline-block"
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
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد أجهزة</h3>
                  <p className="mt-1 text-sm text-gray-500">الرجاء إضافة أجهزة يدوياً أو اختيار نمط استهلاك من القائمة.</p>
                </div>
              )}

              <div className="mt-6 flex justify-end border-t pt-4 border-gray-200">
                <button
                  onClick={handleCalculate}
                  disabled={state.appliances.length === 0}
                  className={`inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white ${state.appliances.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'}`}
                >
                  <Calculator className="ml-2 -mr-1 h-5 w-5" />
                  احسب النظام الشمسي
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Results & Charts (RTL so visually on left) */}
          <div className="lg:col-span-1 space-y-6">

            {/* Results Card */}
            <motion.div
              className="bg-white shadow rounded-lg p-6 border-t-4 border-green-500"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={state.results ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-medium text-gray-900 mb-4">3. نتائج الحساب</h2>

              {state.results ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-500">إجمالي الاستهلاك اليومي</p>
                    <p className="text-2xl font-bold text-gray-900">{state.results.totalDailyEnergyKwh} kWh</p>
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">حجم الألواح المطلوبة</span>
                      <span className="text-sm font-bold text-gray-900">{state.results.requiredSolarArrayKw} kW</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">عدد الألواح ({state.results.panelWattage}W)</span>
                      <span className="text-sm font-bold text-gray-900">{state.results.numberOfPanels} لوح</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">حجم المحول (الإنفرتر)</span>
                      <span className="text-sm font-bold text-gray-900">{state.results.requiredInverterKw} kW</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">سعة البطاريات المطلوبة</span>
                      <span className="text-sm font-bold text-gray-900">{state.results.requiredBatteryAh} Ah ({state.results.systemVoltage}V)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">عدد البطاريات ({state.results.batteryUnitAh}Ah ليثيوم)</span>
                      <span className="text-sm font-bold text-gray-900">{state.results.numberOfBatteries} بطارية</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded text-xs text-blue-800">
                    ملاحظة: هذه الحسابات تقديرية وتفترض وجود 5.5 ساعات ذروة شمسية، وكفاءة نظام 77٪، واستخدام بطاريات ليثيوم (عمق تفريغ 80٪) لاستقلالية يوم واحد.
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <Calculator className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-2 text-sm text-gray-500">قم بإضافة الأجهزة واضغط على زر "احسب النظام الشمسي" لرؤية النتائج هنا.</p>
                </div>
              )}
            </motion.div>

            {/* Chart Card */}
            {chartData.length > 0 && (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">توزيع الاستهلاك</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${(value / 1000).toFixed(2)} kWh`, 'الاستهلاك']} />
                      <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </motion.div>
  );
}
