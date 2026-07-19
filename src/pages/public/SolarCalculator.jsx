import React, { useReducer, useMemo } from 'react';
import { FACILITY_TYPES, calculateTotalDailyWh, calculateSolarSystemSize } from '../../models/SolarCalculatorModel';
import { Calculator, Plus, Trash2, Sun, Zap, BatteryCharging, PanelTop } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Initial state for the reducer
const initialState = {
  selectedFacility: '',
  appliances: [],
  customApplianceName: '',
  customAppliancePower: '',
  customApplianceQuantity: '',
  customApplianceHours: ''
};

// Reducer function
function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facilityId = action.payload;
      if (!facilityId) {
        return { ...state, selectedFacility: '', appliances: [] };
      }
      const facilityKey = Object.keys(FACILITY_TYPES).find(key => FACILITY_TYPES[key].id === facilityId);
      const defaultAppliances = facilityKey ? [...FACILITY_TYPES[facilityKey].defaultAppliances] : [];
      return { ...state, selectedFacility: facilityId, appliances: defaultAppliances };
    }
    case 'ADD_APPLIANCE': {
      const newAppliance = {
        id: Date.now().toString(),
        name: state.customApplianceName || 'جهاز جديد',
        power: Number(state.customAppliancePower) || 0,
        quantity: Number(state.customApplianceQuantity) || 1,
        hours: Number(state.customApplianceHours) || 1
      };
      return {
        ...state,
        appliances: [...state.appliances, newAppliance],
        customApplianceName: '',
        customAppliancePower: '',
        customApplianceQuantity: '',
        customApplianceHours: ''
      };
    }
    case 'REMOVE_APPLIANCE': {
      return {
        ...state,
        appliances: state.appliances.filter(app => app.id !== action.payload)
      };
    }
    case 'UPDATE_APPLIANCE': {
      const { id, field, value } = action.payload;
      return {
        ...state,
        appliances: state.appliances.map(app =>
          app.id === id ? { ...app, [field]: value } : app
        )
      };
    }
    case 'SET_CUSTOM_FIELD': {
      const { field, value } = action.payload;
      return { ...state, [field]: value };
    }
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const totalDailyWh = useMemo(() => calculateTotalDailyWh(state.appliances), [state.appliances]);
  const systemSpecs = useMemo(() => {
    return totalDailyWh > 0 ? calculateSolarSystemSize(totalDailyWh) : null;
  }, [totalDailyWh]);

  const handleAddAppliance = () => {
    if (!state.customApplianceName || !state.customAppliancePower) {
      toast.error('الرجاء إدخال اسم الجهاز وقدرته (واط)');
      return;
    }
    dispatch({ type: 'ADD_APPLIANCE' });
    toast.success('تمت إضافة الجهاز بنجاح');
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <Sun className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">حاسبة الطاقة الشمسية</h1>
          <p className="text-lg text-gray-600">احسب حجم النظام الشمسي المناسب لاحتياجاتك</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden mb-8">
          <div className="p-6 sm:p-8">

            {/* Facility Selection */}
            <div className="mb-8">
              <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-2">
                اختر نوع المنشأة للبدء (اختياري)
              </label>
              <select
                id="facility"
                className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md shadow-sm border"
                value={state.selectedFacility}
                onChange={(e) => dispatch({ type: 'SET_FACILITY', payload: e.target.value })}
              >
                <option value="">-- اختر المنشأة --</option>
                {Object.values(FACILITY_TYPES).map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Appliances List */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Zap className="ml-2 h-5 w-5 text-yellow-500" />
                الأجهزة الكهربائية
              </h2>

              {state.appliances.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القدرة (واط)</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العدد</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات التشغيل/يوم</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراء</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {state.appliances.map((app) => (
                        <tr key={app.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <input
                              type="number"
                              className="w-20 border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border p-1"
                              value={app.power}
                              onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'power', value: e.target.value } })}
                              min="0"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <input
                              type="number"
                              className="w-16 border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border p-1"
                              value={app.quantity}
                              onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'quantity', value: e.target.value } })}
                              min="1"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <input
                              type="number"
                              className="w-16 border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border p-1"
                              value={app.hours}
                              onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE', payload: { id: app.id, field: 'hours', value: e.target.value } })}
                              min="1"
                              max="24"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                              className="text-red-600 hover:text-red-900"
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
                <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-lg">لا توجد أجهزة مضافة. ابدأ باختيار منشأة أو إضافة أجهزة يدوياً.</p>
              )}
            </div>

            {/* Add Custom Appliance */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">إضافة جهاز مخصص</h3>
              <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-5 items-end">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">اسم الجهاز</label>
                  <input
                    type="text"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border p-2"
                    placeholder="مثال: تلفزيون"
                    value={state.customApplianceName}
                    onChange={(e) => dispatch({ type: 'SET_CUSTOM_FIELD', payload: { field: 'customApplianceName', value: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">القدرة (واط)</label>
                  <input
                    type="number"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border p-2"
                    placeholder="واط"
                    value={state.customAppliancePower}
                    onChange={(e) => dispatch({ type: 'SET_CUSTOM_FIELD', payload: { field: 'customAppliancePower', value: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">العدد</label>
                  <input
                    type="number"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border p-2"
                    placeholder="1"
                    value={state.customApplianceQuantity}
                    onChange={(e) => dispatch({ type: 'SET_CUSTOM_FIELD', payload: { field: 'customApplianceQuantity', value: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">ساعات التشغيل</label>
                  <input
                    type="number"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border p-2"
                    placeholder="1-24"
                    value={state.customApplianceHours}
                    onChange={(e) => dispatch({ type: 'SET_CUSTOM_FIELD', payload: { field: 'customApplianceHours', value: e.target.value } })}
                  />
                </div>
                <div className="sm:col-span-5 mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddAppliance}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    <Plus className="ml-2 -mr-1 h-4 w-4" />
                    إضافة الجهاز
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Results Section */}
        {systemSpecs && (
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border-t-4 border-yellow-500">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">النتائج التقديرية للنظام الشمسي</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl flex items-center">
                  <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-full ml-4">
                    <Zap className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">الاستهلاك اليومي</p>
                    <p className="text-2xl font-bold text-gray-900">{systemSpecs.dailyConsumptionKwh} <span className="text-sm font-normal text-gray-500">كيلوواط/ساعة</span></p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full ml-4">
                    <Sun className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">حجم النظام الشمسي (الألواح)</p>
                    <p className="text-2xl font-bold text-gray-900">{systemSpecs.systemSizeKw} <span className="text-sm font-normal text-gray-500">كيلوواط</span></p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl flex items-center">
                  <div className="flex-shrink-0 bg-green-100 p-3 rounded-full ml-4">
                    <Calculator className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">حجم محول الطاقة (الإنفرتر)</p>
                    <p className="text-2xl font-bold text-gray-900">{systemSpecs.inverterSizeKw} <span className="text-sm font-normal text-gray-500">كيلوواط</span></p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full ml-4">
                    <BatteryCharging className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">سعة البطاريات المطلوبة (48 فولت)</p>
                    <p className="text-2xl font-bold text-gray-900">{systemSpecs.batteryCapacityAh} <span className="text-sm font-normal text-gray-500">أمبير-ساعة (Ah)</span></p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl flex items-center md:col-span-2">
                  <div className="flex-shrink-0 bg-orange-100 p-3 rounded-full ml-4">
                    <PanelTop className="h-8 w-8 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">عدد الألواح المقترح ({systemSpecs.panelWattage} واط للوح)</p>
                    <p className="text-2xl font-bold text-gray-900">{systemSpecs.numberOfPanels} <span className="text-sm font-normal text-gray-500">لوح شمسي</span></p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-500 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <strong>ملاحظة هامة:</strong> هذه الحسابات تقديرية وتفترض متوسط سطوع شمس 5.5 ساعات يومياً مع نظام 48 فولت. للحصول على تصميم دقيق وتسعير، يرجى استشارة مهندس طاقة شمسية مختص.
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SolarCalculator;
