import React, { useReducer, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import toast from 'react-hot-toast';
import { Plus, Trash2, Calculator, Sun, Info } from 'lucide-react';
import { FACILITY_TYPES, calculateTotalConsumption, calculateSolarSystemSize } from '../../models/SolarCalculatorModel';

// Reducer for managing calculator state
const initialState = {
  selectedFacilityId: '',
  appliances: [],
  totalConsumptionWh: 0,
  recommendedSystemSizeKw: 0
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      if (!facility) return state;
      // Deep copy appliances
      const appliances = facility.appliances.map(app => ({ ...app, id: Math.random().toString(36).substr(2, 9) }));
      const totalWh = calculateTotalConsumption(appliances);
      return {
        ...state,
        selectedFacilityId: action.payload,
        appliances,
        totalConsumptionWh: totalWh,
        recommendedSystemSizeKw: calculateSolarSystemSize(totalWh)
      };
    }
    case 'ADD_APPLIANCE': {
      const newAppliance = {
        id: Math.random().toString(36).substr(2, 9),
        name: 'جهاز جديد',
        powerWatts: 100,
        quantity: 1,
        hoursPerDay: 4
      };
      const updatedAppliances = [...state.appliances, newAppliance];
      const totalWh = calculateTotalConsumption(updatedAppliances);
      return {
        ...state,
        appliances: updatedAppliances,
        totalConsumptionWh: totalWh,
        recommendedSystemSizeKw: calculateSolarSystemSize(totalWh)
      };
    }
    case 'UPDATE_APPLIANCE': {
      const { id, field, value } = action.payload;
      const updatedAppliances = state.appliances.map(app => {
        if (app.id === id) {
          return { ...app, [field]: value };
        }
        return app;
      });
      const totalWh = calculateTotalConsumption(updatedAppliances);
      return {
        ...state,
        appliances: updatedAppliances,
        totalConsumptionWh: totalWh,
        recommendedSystemSizeKw: calculateSolarSystemSize(totalWh)
      };
    }
    case 'REMOVE_APPLIANCE': {
      const updatedAppliances = state.appliances.filter(app => app.id !== action.payload);
      const totalWh = calculateTotalConsumption(updatedAppliances);
      return {
        ...state,
        appliances: updatedAppliances,
        totalConsumptionWh: totalWh,
        recommendedSystemSizeKw: calculateSolarSystemSize(totalWh)
      };
    }
    default:
      return state;
  }
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

const SkeletonLoader = () => (
  <div className="animate-pulse flex flex-col space-y-4">
    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
    <div className="h-10 bg-gray-200 rounded w-full"></div>
    <div className="h-64 bg-gray-200 rounded w-full"></div>
  </div>
);

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const [loading, setLoading] = useState(true);

  const handleFacilityChange = (facilityId) => {
    dispatch({ type: 'SELECT_FACILITY', payload: facilityId });
    toast.success('تم تحديث الأجهزة الافتراضية للنشاط المختار');
  };

  useEffect(() => {
    // Simulate initial loading for skeleton demo
    const timer = setTimeout(() => {
      setLoading(false);
      // Select first facility by default to show some data
      handleFacilityChange(FACILITY_TYPES[0].id);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAddAppliance = () => {
    dispatch({ type: 'ADD_APPLIANCE' });
    toast.success('تم إضافة جهاز جديد');
  };

  const handleRemoveAppliance = (id) => {
    dispatch({ type: 'REMOVE_APPLIANCE', payload: id });
    toast.error('تم حذف الجهاز');
  };

  const handleUpdateAppliance = (id, field, value) => {
    let parsedValue = value;
    if (field === 'powerWatts' || field === 'quantity' || field === 'hoursPerDay') {
      parsedValue = value === '' ? 0 : Number(value);
      if (field === 'hoursPerDay' && parsedValue > 24) parsedValue = 24;
    }
    dispatch({ type: 'UPDATE_APPLIANCE', payload: { id, field, value: parsedValue } });
  };

  // Prepare data for Recharts
  const chartData = state.appliances.map((app) => ({
    name: app.name,
    value: app.powerWatts * app.quantity * app.hoursPerDay
  })).filter(item => item.value > 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6" dir="rtl">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl">
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  const MotionDiv = motion.div;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
            <Sun className="w-10 h-10 text-yellow-500" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            احسب استهلاكك التقريبي وحدد حجم النظام الشمسي المناسب لنشاطك
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Calculator Form */}
          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6"
          >

            {/* Facility Selector */}
            <div className="mb-8">
              <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-2">
                اختر نوع النشاط
              </label>
              <select
                id="facility"
                value={state.selectedFacilityId}
                onChange={(e) => handleFacilityChange(e.target.value)}
                className="w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md shadow-sm border"
              >
                <option value="" disabled>-- اختر نشاطاً --</option>
                {FACILITY_TYPES.map(facility => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Appliances List */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">قائمة الأجهزة</h3>
                <button
                  onClick={handleAddAppliance}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
                >
                  <Plus className="w-4 h-4 ml-2 -mr-1" />
                  إضافة جهاز
                </button>
              </div>

              <div className="space-y-4">
                {state.appliances.length === 0 ? (
                  <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-lg">لا توجد أجهزة مضافة حالياً.</p>
                ) : (
                  state.appliances.map((app, index) => (
                    <MotionDiv
                      key={app.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1 w-full sm:w-auto">
                        <label className="block text-xs text-gray-500 mb-1">اسم الجهاز</label>
                        <input
                          type="text"
                          value={app.name}
                          onChange={(e) => handleUpdateAppliance(app.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                          placeholder="مثال: مكيف"
                        />
                      </div>
                      <div className="w-full sm:w-24">
                        <label className="block text-xs text-gray-500 mb-1">القدرة (واط)</label>
                        <input
                          type="number"
                          min="0"
                          value={app.powerWatts}
                          onChange={(e) => handleUpdateAppliance(app.id, 'powerWatts', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                        />
                      </div>
                      <div className="w-full sm:w-20">
                        <label className="block text-xs text-gray-500 mb-1">العدد</label>
                        <input
                          type="number"
                          min="1"
                          value={app.quantity}
                          onChange={(e) => handleUpdateAppliance(app.id, 'quantity', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                        />
                      </div>
                      <div className="w-full sm:w-28">
                        <label className="block text-xs text-gray-500 mb-1">ساعات/يوم</label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={app.hoursPerDay}
                          onChange={(e) => handleUpdateAppliance(app.id, 'hoursPerDay', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                        />
                      </div>
                      <button
                        onClick={() => handleRemoveAppliance(app.id)}
                        className="mt-5 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                        title="حذف الجهاز"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </MotionDiv>
                  ))
                )}
              </div>
            </div>
          </MotionDiv>

          {/* Results & Analytics Section */}
          <div className="space-y-6">

            {/* Summary Card */}
            <MotionDiv
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-yellow-500"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Calculator className="w-6 h-6 ml-2 text-yellow-600" />
                ملخص الاستهلاك
              </h3>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium mb-1">الاستهلاك اليومي الكلي</p>
                  <p className="text-3xl font-bold text-blue-900">
                    {(state.totalConsumptionWh / 1000).toFixed(2)} <span className="text-lg font-normal">كيلوواط/ساعة</span>
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800 font-medium mb-1">حجم النظام الشمسي المقترح</p>
                  <div className="flex items-end gap-2">
                    <p className="text-3xl font-bold text-green-900">
                      {state.recommendedSystemSizeKw.toFixed(2)}
                    </p>
                    <span className="text-lg text-green-800 mb-1">كيلوواط (kW)</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded">
                  <Info className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <p>
                    الحجم المقترح يحسب بناءً على متوسط سطوع شمس 5.5 ساعات وكفاءة نظام 80%. قد يختلف الاحتياج الفعلي حسب الموقع ونوع الألواح.
                  </p>
                </div>
              </div>
            </MotionDiv>

            {/* Chart Card */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">توزيع الاستهلاك</h3>
              {chartData.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        formatter={(value) => [`${(value / 1000).toFixed(2)} kWh`, 'الاستهلاك اليومي']}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-400">لا توجد بيانات كافية للرسم البياني</p>
                </div>
              )}
            </MotionDiv>

          </div>
        </div>
      </div>
    </div>
  );
}
