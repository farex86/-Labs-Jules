import React, { useReducer, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { getFacilityTypes, calculateSolarRequirements } from '../../models/SolarCalculatorModel';
import { Calculator, Zap, Battery, Sun, DollarSign, Building, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const initialState = {
  facilityTypes: [],
  selectedFacility: '',
  customConsumption: '',
  results: null,
  loading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, facilityTypes: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'SET_FACILITY':
      return { ...state, selectedFacility: action.payload, results: null };
    case 'SET_CONSUMPTION':
      return { ...state, customConsumption: action.payload, results: null };
    case 'CALCULATE_RESULTS':
      return { ...state, results: action.payload };
    case 'RESET':
      return { ...state, selectedFacility: '', customConsumption: '', results: null };
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Simulate fetching data for skeleton loader demonstration
    dispatch({ type: 'FETCH_INIT' });
    setTimeout(() => {
      try {
        const types = getFacilityTypes().map(d => ({ ...d }));
        dispatch({ type: 'FETCH_SUCCESS', payload: types });
      } catch {
        dispatch({ type: 'FETCH_FAILURE', payload: 'Failed to load facility types' });
        toast.error('Failed to load facility types');
      }
    }, 800);
  }, []);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!state.selectedFacility) {
      toast.error('يرجى اختيار نوع المنشأة'); // Please select a facility type
      return;
    }

    try {
      const results = calculateSolarRequirements(state.selectedFacility, state.customConsumption);
      dispatch({ type: 'CALCULATE_RESULTS', payload: results });
      toast.success('تم الحساب بنجاح'); // Calculation successful
    } catch {
      toast.error('حدث خطأ أثناء الحساب'); // Error during calculation
    }
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  if (state.error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4" dir="rtl">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">خطأ</h2>
          <p className="text-gray-600 mb-4">{state.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="text-lg text-gray-600">
            احسب احتياجات منشأتك من الطاقة الشمسية بسهولة ودقة
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">

            {state.loading ? (
              // Skeleton Loader
              <div className="animate-pulse space-y-6">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
                <div className="h-12 bg-gray-200 rounded w-full mt-8"></div>
              </div>
            ) : (
              // Calculator Form
              <form onSubmit={handleCalculate} className="space-y-6">
                <div>
                  <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="inline-block w-4 h-4 ml-2" />
                    نوع المنشأة
                  </label>
                  <select
                    id="facility"
                    value={state.selectedFacility}
                    onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  >
                    <option value="">-- اختر نوع المنشأة --</option>
                    {state.facilityTypes.map((facility) => (
                      <option key={facility.id} value={facility.id}>
                        {facility.nameAr}
                      </option>
                    ))}
                  </select>
                  {state.selectedFacility && (
                    <p className="mt-2 text-sm text-gray-500">
                      {state.facilityTypes.find(f => f.id === state.selectedFacility)?.descriptionAr}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="consumption" className="block text-sm font-medium text-gray-700 mb-2">
                    <Zap className="inline-block w-4 h-4 ml-2" />
                    الاستهلاك الشهري (كيلوواط/ساعة) - اختياري
                  </label>
                  <input
                    type="number"
                    id="consumption"
                    value={state.customConsumption}
                    onChange={(e) => dispatch({ type: 'SET_CONSUMPTION', payload: e.target.value })}
                    placeholder={
                      state.selectedFacility
                        ? String(state.facilityTypes.find(f => f.id === state.selectedFacility)?.baseConsumption)
                        : "أدخل استهلاكك الفعلي إن وجد"
                    }
                    className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    اتركه فارغاً لاعتماد الاستهلاك التقديري لنوع المنشأة المختار.
                  </p>
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium text-lg"
                  >
                    احسب الآن
                  </button>
                  {state.results && (
                     <button
                     type="button"
                     onClick={handleReset}
                     className="flex-none bg-gray-100 text-gray-700 py-3 px-6 rounded-md shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
                   >
                     إعادة
                   </button>
                  )}
                </div>
              </form>
            )}

            {/* Results Section */}
            {state.results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-10 pt-8 border-t border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-green-100 p-2 rounded-full ml-3 text-green-600">
                    <Zap className="w-5 h-5" />
                  </span>
                  نتائج التقدير المبدئي
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                  {/* Capacity Card */}
                  <div className="bg-blue-50 rounded-lg p-5 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center text-blue-800 mb-3">
                      <Sun className="w-6 h-6 ml-2" />
                      <h4 className="font-semibold text-lg">سعة النظام المطلوبة</h4>
                    </div>
                    <div className="text-3xl font-bold text-blue-900">
                      {state.results.requiredCapacityKW} <span className="text-lg font-normal text-blue-700">كيلوواط</span>
                    </div>
                  </div>

                  {/* Panels Card */}
                  <div className="bg-yellow-50 rounded-lg p-5 border border-yellow-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center text-yellow-800 mb-3">
                      <Calculator className="w-6 h-6 ml-2" />
                      <h4 className="font-semibold text-lg">عدد الألواح المقدر</h4>
                    </div>
                    <div className="text-3xl font-bold text-yellow-900">
                      {state.results.numberOfPanels} <span className="text-lg font-normal text-yellow-700">لوح (550W)</span>
                    </div>
                  </div>

                  {/* Battery Card */}
                  <div className="bg-green-50 rounded-lg p-5 border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center text-green-800 mb-3">
                      <Battery className="w-6 h-6 ml-2" />
                      <h4 className="font-semibold text-lg">سعة البطاريات (يوم واحد)</h4>
                    </div>
                    <div className="text-3xl font-bold text-green-900">
                      {state.results.requiredBatteryCapacityKWh} <span className="text-lg font-normal text-green-700">kWh</span>
                    </div>
                  </div>

                  {/* Inverter Card */}
                   <div className="bg-purple-50 rounded-lg p-5 border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center text-purple-800 mb-3">
                      <Zap className="w-6 h-6 ml-2" />
                      <h4 className="font-semibold text-lg">حجم الانفرتر المقترح</h4>
                    </div>
                    <div className="text-3xl font-bold text-purple-900">
                      {state.results.inverterSizeKW} <span className="text-lg font-normal text-purple-700">كيلوواط</span>
                    </div>
                  </div>

                  {/* Cost Card */}
                  <div className="md:col-span-2 lg:col-span-2 bg-gray-50 rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center text-gray-800 mb-3">
                      <DollarSign className="w-6 h-6 ml-2" />
                      <h4 className="font-semibold text-lg">التكلفة التقديرية (دولار)</h4>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      ${state.results.estimatedCostRange[0].toLocaleString()} - ${state.results.estimatedCostRange[1].toLocaleString()}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      *هذه تكلفة تقديرية تقريبية وقد تختلف بناءً على الأسعار الفعلية والموردين وتكاليف التركيب.
                    </p>
                  </div>

                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
