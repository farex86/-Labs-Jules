import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { Plus, Trash2, Calculator, Settings, Edit3 } from 'lucide-react';
import { FACILITY_TYPES, calculateTotalConsumption, estimateSystemRequirements } from '../../models/SolarCalculatorModel';

// Reducer Action Types
const SET_FACILITY = 'SET_FACILITY';
const UPDATE_APPLIANCE = 'UPDATE_APPLIANCE';
const ADD_APPLIANCE = 'ADD_APPLIANCE';
const REMOVE_APPLIANCE = 'REMOVE_APPLIANCE';

const initialState = {
  selectedFacilityId: '',
  appliances: [],
  results: null,
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case SET_FACILITY: {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      if (!facility) return state;
      // Deep copy to prevent mutating constants
      const newAppliances = facility.appliances.map(app => ({ ...app }));
      return {
        ...state,
        selectedFacilityId: action.payload,
        appliances: newAppliances,
      };
    }
    case UPDATE_APPLIANCE: {
      const { id, field, value } = action.payload;
      return {
        ...state,
        appliances: state.appliances.map(app =>
          app.id === id ? { ...app, [field]: value } : app
        ),
      };
    }
    case ADD_APPLIANCE: {
      const newAppliance = {
        id: Date.now().toString(),
        name: 'جهاز جديد',
        powerW: 100,
        qty: 1,
        hours: 1,
      };
      return {
        ...state,
        appliances: [...state.appliances, newAppliance],
      };
    }
    case REMOVE_APPLIANCE: {
      return {
        ...state,
        appliances: state.appliances.filter(app => app.id !== action.payload),
      };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  // Derive results whenever appliances change
  const totalWh = calculateTotalConsumption(state.appliances);
  const requirements = totalWh > 0 ? estimateSystemRequirements(totalWh) : null;

  const handleFacilityChange = (e) => {
    dispatch({ type: SET_FACILITY, payload: e.target.value });
    toast.success('تم تحميل الأجهزة الافتراضية');
  };

  const handleUpdateAppliance = (id, field, value) => {
    let numValue = Number(value);
    if (isNaN(numValue) || numValue < 0) numValue = 0;

    // Limits
    if (field === 'hours' && numValue > 24) numValue = 24;

    dispatch({
      type: UPDATE_APPLIANCE,
      payload: { id, field: field === 'name' ? value : numValue }
    });
  };

  const handleNameUpdate = (id, value) => {
      dispatch({
      type: UPDATE_APPLIANCE,
      payload: { id, field: 'name', value }
    });
  }

  const handleAddAppliance = () => {
    dispatch({ type: ADD_APPLIANCE });
    toast.success('تم إضافة جهاز جديد');
  };

  const handleRemoveAppliance = (id) => {
    dispatch({ type: REMOVE_APPLIANCE, payload: id });
    toast.success('تم إزالة الجهاز');
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <Calculator className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">حاسبة الأحمال الشمسية</h1>
          <p className="mt-2 text-lg text-gray-600">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك والأجهزة المستخدمة.
          </p>
        </div>

        {/* Facility Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-2">
            اختر نوع المنشأة
          </label>
          <select
            id="facility"
            value={state.selectedFacilityId}
            onChange={handleFacilityChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg p-3 border"
          >
            <option value="" disabled>-- اختر من القائمة --</option>
            {FACILITY_TYPES.map((facility) => (
              <option key={facility.id} value={facility.id}>
                {facility.name}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Appliances List */}
        {state.appliances.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Settings className="h-5 w-5 text-gray-500" />
                قائمة الأجهزة
              </h2>
              <button
                onClick={handleAddAppliance}
                className="flex items-center gap-2 text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Plus className="h-4 w-4" />
                إضافة جهاز
              </button>
            </div>

            <div className="space-y-4">
              {state.appliances.map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gray-50 p-4 rounded-lg border border-gray-100"
                >
                  <div className="md:col-span-4">
                    <label className="block text-xs text-gray-500 mb-1">اسم الجهاز</label>
                    <div className="relative">
                       <input
                        type="text"
                        value={app.name}
                        onChange={(e) => handleNameUpdate(app.id, e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 pr-8 border"
                      />
                      <Edit3 className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-500 mb-1">القدرة (واط)</label>
                    <input
                      type="number"
                      min="0"
                      value={app.powerW}
                      onChange={(e) => handleUpdateAppliance(app.id, 'powerW', e.target.value)}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border text-left"
                      dir="ltr"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-500 mb-1">الكمية</label>
                    <input
                      type="number"
                      min="1"
                      value={app.qty}
                      onChange={(e) => handleUpdateAppliance(app.id, 'qty', e.target.value)}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border text-left"
                      dir="ltr"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-xs text-gray-500 mb-1">ساعات العمل (يومياً)</label>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      value={app.hours}
                      onChange={(e) => handleUpdateAppliance(app.id, 'hours', e.target.value)}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border text-left"
                      dir="ltr"
                    />
                  </div>

                  <div className="md:col-span-1 flex justify-end md:justify-center mt-2 md:mt-0">
                    <button
                      onClick={() => handleRemoveAppliance(app.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                      title="إزالة الجهاز"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Results */}
        {requirements && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-600 text-white p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">الاحتياجات التقديرية للنظام</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-700/50 p-4 rounded-lg text-center">
                <div className="text-blue-200 text-sm mb-1">الاستهلاك اليومي</div>
                <div className="text-3xl font-bold">{requirements.dailyKwh} <span className="text-lg font-normal">كيلو واط.ساعة</span></div>
              </div>

              <div className="bg-blue-700/50 p-4 rounded-lg text-center">
                <div className="text-blue-200 text-sm mb-1">حجم الألواح المقترح</div>
                <div className="text-3xl font-bold">{requirements.recommendedSolarKw} <span className="text-lg font-normal">كيلو واط</span></div>
                <div className="text-sm mt-1 text-blue-100">حوالي {requirements.estimatedPanels500w} لوح (500 واط)</div>
              </div>

              <div className="bg-blue-700/50 p-4 rounded-lg text-center">
                <div className="text-blue-200 text-sm mb-1">قدرة المحول (الإنفرتر)</div>
                <div className="text-3xl font-bold">{requirements.recommendedInverterKw} <span className="text-lg font-normal">كيلو واط</span></div>
              </div>

              <div className="bg-blue-700/50 p-4 rounded-lg text-center md:col-span-2 lg:col-span-3">
                <div className="text-blue-200 text-sm mb-1">سعة البطاريات التقريبية ({requirements.batteryVoltage} فولت)</div>
                <div className="text-3xl font-bold">{requirements.batteryCapacityAh} <span className="text-lg font-normal">أمبير.ساعة</span></div>
                <div className="text-xs mt-2 text-blue-200">
                  *هذه حسابات تقديرية وتعتمد على عوامل أخرى مثل كفاءة الألواح والظروف الجوية. يرجى استشارة مهندس مختص.
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
