import React, { useReducer } from 'react';
import { motion } from 'motion/react';
import toast, { Toaster } from 'react-hot-toast';
import { Calculator, Zap, DollarSign, LayoutGrid, Sun } from 'lucide-react';
import { FACILITY_TYPES, calculateSystemSize, getFacilityDetails } from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacility: '',
  consumptionInput: '',
  results: null,
  isCalculating: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY':
      return { ...state, selectedFacility: action.payload, results: null };
    case 'SET_CONSUMPTION':
      return { ...state, consumptionInput: action.payload, results: null };
    case 'CALCULATE_START':
      return { ...state, isCalculating: true };
    case 'CALCULATE_SUCCESS':
      return { ...state, isCalculating: false, results: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFacilityChange = (e) => {
    const facilityId = e.target.value;
    dispatch({ type: 'SET_FACILITY', payload: facilityId });

    if (facilityId) {
      const details = getFacilityDetails(facilityId);
      if (details) {
        dispatch({ type: 'SET_CONSUMPTION', payload: details.baseConsumptionKW.toString() });
      }
    } else {
      dispatch({ type: 'SET_CONSUMPTION', payload: '' });
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!state.consumptionInput || isNaN(parseFloat(state.consumptionInput))) {
      toast.error('الرجاء إدخال قيمة صحيحة للاستهلاك', { duration: 3000 });
      return;
    }

    dispatch({ type: 'CALCULATE_START' });

    // Simulate slight delay for effect
    setTimeout(() => {
      const consumptionKW = parseFloat(state.consumptionInput);
      const results = calculateSystemSize(consumptionKW);
      dispatch({ type: 'CALCULATE_SUCCESS', payload: results });
      toast.success('تم الحساب بنجاح!');
    }, 600);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <Sun className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900">حاسبة الطاقة الشمسية</h1>
          <p className="mt-4 text-lg text-gray-500">
            احسب حجم النظام الشمسي المناسب لمنشأتك بناءً على نوع النشاط أو الاستهلاك
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <form onSubmit={handleCalculate} className="space-y-6">

              {/* Facility Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نوع المنشأة
                </label>
                <select
                  value={state.selectedFacility}
                  onChange={handleFacilityChange}
                  className="w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg border bg-gray-50"
                >
                  <option value="">-- اختر نوع المنشأة --</option>
                  {FACILITY_TYPES.map((facility) => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Consumption Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاستهلاك التقديري (كيلوواط / يوم)
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 right-0 pl-3 flex items-center pointer-events-none pr-3">
                    <Zap className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={state.consumptionInput}
                    onChange={(e) => dispatch({ type: 'SET_CONSUMPTION', payload: e.target.value })}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-10 sm:text-sm border-gray-300 rounded-lg py-3 border bg-gray-50"
                    placeholder="مثال: 15"
                  />
                </div>
                {state.selectedFacility && getFacilityDetails(state.selectedFacility) && (
                  <p className="mt-2 text-sm text-gray-500">
                    أجهزة شائعة: {getFacilityDetails(state.selectedFacility).typicalDevices.join(', ')}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={state.isCalculating}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {state.isCalculating ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جاري الحساب...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Calculator className="ml-2 h-5 w-5" />
                    احسب النظام
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          {state.results && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-blue-50 border-t border-blue-100 p-8"
            >
              <h3 className="text-xl font-bold text-blue-900 mb-6 text-center">
                النتائج التقديرية
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 flex flex-col items-center text-center">
                  <Zap className="h-8 w-8 text-blue-500 mb-3" />
                  <p className="text-sm text-gray-500 mb-1">حجم النظام المطلوب</p>
                  <p className="text-2xl font-bold text-gray-900">{state.results.systemSizeKW} kW</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 flex flex-col items-center text-center">
                  <LayoutGrid className="h-8 w-8 text-blue-500 mb-3" />
                  <p className="text-sm text-gray-500 mb-1">عدد الألواح (550W)</p>
                  <p className="text-2xl font-bold text-gray-900">{state.results.panelCount} لوح</p>
                  <p className="text-xs text-gray-400 mt-1">مساحة: {state.results.requiredAreaM2} م²</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 flex flex-col items-center text-center">
                  <DollarSign className="h-8 w-8 text-green-500 mb-3" />
                  <p className="text-sm text-gray-500 mb-1">التكلفة التقديرية</p>
                  <p className="text-2xl font-bold text-gray-900">${state.results.estimatedCostUSD}</p>
                </div>
              </div>

              <div className="mt-8 text-center text-sm text-gray-500">
                * هذه النتائج تقديرية بناءً على المعطيات المدخلة، وقد تختلف التكلفة الفعلية حسب الموقع والموردين.
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
