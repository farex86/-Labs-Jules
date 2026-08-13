import React, { useReducer, useEffect } from 'react';
import { Plus, Trash2, Calculator, Info } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { FACILITY_TYPES, SolarCalculatorModel } from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacilityId: '',
  appliances: [],
  results: {
    dailyEnergyWh: 0,
    requiredSolarCapacityW: 0,
    numberOfPanels: 0,
    inverterSizeW: 0,
    batteryCapacityAh: 0,
    totalInstantaneousPower: 0,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facility = FACILITY_TYPES.find((f) => f.id === action.payload);
      if (!facility) return { ...state, selectedFacilityId: '', appliances: [] };
      return {
        ...state,
        selectedFacilityId: action.payload,
        appliances: facility.defaultAppliances.map((app) => ({ ...app, uid: Date.now() + Math.random() })),
      };
    }
    case 'ADD_APPLIANCE': {
      const newAppliance = {
        uid: Date.now(),
        name: 'جهاز جديد',
        power: 100,
        count: 1,
        hours: 1,
      };
      return { ...state, appliances: [...state.appliances, newAppliance] };
    }
    case 'UPDATE_APPLIANCE': {
      const { uid, field, value } = action.payload;
      return {
        ...state,
        appliances: state.appliances.map((app) => (app.uid === uid ? { ...app, [field]: value } : app)),
      };
    }
    case 'REMOVE_APPLIANCE': {
      return {
        ...state,
        appliances: state.appliances.filter((app) => app.uid !== action.payload),
      };
    }
    case 'CALCULATE': {
      const results = SolarCalculatorModel.calculateSystem(state.appliances);
      return { ...state, results };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'CALCULATE' });
  }, [state.appliances]);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SET_FACILITY', payload: e.target.value });
    if (e.target.value) {
      toast.success('تم تحميل أجهزة المنشأة بنجاح');
    }
  };

  const handleAddAppliance = () => {
    dispatch({ type: 'ADD_APPLIANCE' });
    toast.success('تم إضافة جهاز جديد');
  };

  const handleUpdateAppliance = (uid, field, value) => {
    dispatch({ type: 'UPDATE_APPLIANCE', payload: { uid, field, value } });
  };

  const handleRemoveAppliance = (uid) => {
    dispatch({ type: 'REMOVE_APPLIANCE', payload: uid });
    toast.error('تم حذف الجهاز');
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Toaster position="top-center" />
      <div
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <Calculator className="w-10 h-10 text-blue-600" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك وأجهزتك
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-2">
            اختر نوع المنشأة
          </label>
          <select
            id="facility"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg p-3 border"
            value={state.selectedFacilityId}
            onChange={handleFacilityChange}
          >
            <option value="">-- اختر منشأة --</option>
            {FACILITY_TYPES.map((facility) => (
              <option key={facility.id} value={facility.id}>
                {facility.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">الأجهزة الكهربائية</h2>
            <button
              onClick={handleAddAppliance}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Plus className="w-5 h-5" />
              إضافة جهاز
            </button>
          </div>

          {state.appliances.length === 0 ? (
            <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              لا توجد أجهزة مضافة. اختر منشأة أو أضف جهازاً يدوياً.
            </div>
          ) : (
            <div className="space-y-4">
              {state.appliances.map((app) => (
                <div
                  key={app.uid}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gray-50 p-4 rounded-lg border border-gray-200"
                >
                  <div className="md:col-span-4">
                    <label className="block text-xs text-gray-500 mb-1">اسم الجهاز</label>
                    <input
                      type="text"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      value={app.name}
                      onChange={(e) => handleUpdateAppliance(app.uid, 'name', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-500 mb-1">القدرة (واط)</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      value={app.power}
                      onChange={(e) => handleUpdateAppliance(app.uid, 'power', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-500 mb-1">العدد</label>
                    <input
                      type="number"
                      min="1"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      value={app.count}
                      onChange={(e) => handleUpdateAppliance(app.uid, 'count', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs text-gray-500 mb-1">ساعات التشغيل (يومياً)</label>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      value={app.hours}
                      onChange={(e) => handleUpdateAppliance(app.uid, 'hours', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-1 flex justify-center mt-4 md:mt-0">
                    <button
                      onClick={() => handleRemoveAppliance(app.uid)}
                      className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
                      title="حذف الجهاز"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className="bg-blue-900 text-white p-8 rounded-xl shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Calculator className="w-32 h-32" />
          </div>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Info className="w-8 h-8 text-blue-300" />
            النتيجة التقديرية
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            <div className="bg-blue-800 p-4 rounded-lg">
              <p className="text-blue-200 text-sm mb-1">الاستهلاك اليومي</p>
              <p className="text-2xl font-bold">{(state.results.dailyEnergyWh / 1000).toFixed(2)} <span className="text-lg font-normal">كيلو واط.ساعة</span></p>
            </div>
            <div className="bg-blue-800 p-4 rounded-lg">
              <p className="text-blue-200 text-sm mb-1">حجم الانفرتر المطلوب</p>
              <p className="text-2xl font-bold">{(state.results.inverterSizeW / 1000).toFixed(2)} <span className="text-lg font-normal">كيلو واط</span></p>
            </div>
            <div className="bg-blue-800 p-4 rounded-lg">
              <p className="text-blue-200 text-sm mb-1">عدد الألواح (550 واط)</p>
              <p className="text-2xl font-bold">{state.results.numberOfPanels} <span className="text-lg font-normal">لوح</span></p>
            </div>
            <div className="bg-blue-800 p-4 rounded-lg">
              <p className="text-blue-200 text-sm mb-1">سعة البطاريات (48 فولت)</p>
              <p className="text-2xl font-bold">{Math.ceil(state.results.batteryCapacityAh)} <span className="text-lg font-normal">أمبير.ساعة</span></p>
            </div>
          </div>
          <p className="text-xs text-blue-300 mt-6">
            * هذه الحسابات تقديرية وتعتمد على متوسط الإشعاع الشمسي (5 ساعات) وعوامل فقدان النظام. يرجى استشارة مهندس مختص للحصول على تصميم دقيق.
          </p>
        </div>
      </div>
    </div>
  );
}
