import React, { useReducer, useMemo } from 'react';
import { Plus, Trash2, Zap, Battery, Sun, RefreshCcw } from 'lucide-react';
import {
  FACILITY_TYPES,
  calculateDailyConsumption,
  calculateSystemRecommendation
} from '../../models/SolarCalculatorModel';

// Action types for reducer
const ACTIONS = {
  SET_FACILITY: 'SET_FACILITY',
  ADD_DEVICE: 'ADD_DEVICE',
  UPDATE_DEVICE: 'UPDATE_DEVICE',
  REMOVE_DEVICE: 'REMOVE_DEVICE',
  RESET: 'RESET'
};

function deviceReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_FACILITY:
      return {
        ...state,
        selectedFacilityId: action.payload.facilityId,
        devices: action.payload.devices.map(d => ({ ...d, id: crypto.randomUUID() }))
      };
    case ACTIONS.ADD_DEVICE:
      return {
        ...state,
        devices: [...state.devices, {
          id: crypto.randomUUID(),
          name: '',
          quantity: 1,
          powerWatts: 0,
          hoursPerDay: 0
        }]
      };
    case ACTIONS.UPDATE_DEVICE:
      return {
        ...state,
        devices: state.devices.map(device =>
          device.id === action.payload.id
            ? { ...device, [action.payload.field]: action.payload.value }
            : device
        )
      };
    case ACTIONS.REMOVE_DEVICE:
      return {
        ...state,
        devices: state.devices.filter(device => device.id !== action.payload.id)
      };
    case ACTIONS.RESET:
      return {
        selectedFacilityId: '',
        devices: []
      };
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(deviceReducer, {
    selectedFacilityId: '',
    devices: []
  });

  const handleFacilityChange = (e) => {
    const facilityId = e.target.value;
    if (!facilityId) {
      dispatch({ type: ACTIONS.RESET });
      return;
    }
    const facility = FACILITY_TYPES.find(f => f.id === facilityId);
    dispatch({
      type: ACTIONS.SET_FACILITY,
      payload: { facilityId, devices: facility.defaultDevices }
    });
  };

  const handleUpdateDevice = (id, field, value) => {
    dispatch({
      type: ACTIONS.UPDATE_DEVICE,
      payload: { id, field, value }
    });
  };

  const totalDailyWh = useMemo(() => calculateDailyConsumption(state.devices), [state.devices]);
  const recommendations = useMemo(() => calculateSystemRecommendation(totalDailyWh), [totalDailyWh]);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            الحاسبة الشمسية
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            احسب استهلاكك اليومي واكتشف حجم النظام الشمسي المناسب لمنشأتك.
          </p>
        </div>

        {/* Facility Selector */}
        <div className="bg-white shadow rounded-lg p-6">
          <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-2">
            اختر نوع المنشأة
          </label>
          <select
            id="facility"
            value={state.selectedFacilityId}
            onChange={handleFacilityChange}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">-- اختر منشأة --</option>
            {FACILITY_TYPES.map(facility => (
              <option key={facility.id} value={facility.id}>
                {facility.name}
              </option>
            ))}
          </select>
        </div>

        {/* Devices List */}
        {state.selectedFacilityId && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                الأجهزة الكهربائية
              </h3>
              <button
                onClick={() => dispatch({ type: ACTIONS.ADD_DEVICE })}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="ml-1 h-4 w-4" /> إضافة جهاز
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-right">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-sm font-medium text-gray-500">اسم الجهاز</th>
                    <th scope="col" className="px-4 py-3 text-sm font-medium text-gray-500">العدد</th>
                    <th scope="col" className="px-4 py-3 text-sm font-medium text-gray-500">القدرة (واط)</th>
                    <th scope="col" className="px-4 py-3 text-sm font-medium text-gray-500">ساعات التشغيل/يوم</th>
                    <th scope="col" className="px-4 py-3 text-sm font-medium text-gray-500">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {state.devices.map((device) => (
                    <tr key={device.id}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="text"
                          value={device.name}
                          onChange={(e) => handleUpdateDevice(device.id, 'name', e.target.value)}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="اسم الجهاز"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="number"
                          min="1"
                          value={device.quantity}
                          onChange={(e) => handleUpdateDevice(device.id, 'quantity', e.target.value)}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          value={device.powerWatts}
                          onChange={(e) => handleUpdateDevice(device.id, 'powerWatts', e.target.value)}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={device.hoursPerDay}
                          onChange={(e) => handleUpdateDevice(device.id, 'hoursPerDay', e.target.value)}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          onClick={() => dispatch({ type: ACTIONS.REMOVE_DEVICE, payload: { id: device.id } })}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="حذف الجهاز"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {state.devices.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                        لا توجد أجهزة مضافة. الرجاء إضافة أجهزة لحساب الاستهلاك.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Results Section */}
        {state.selectedFacilityId && state.devices.length > 0 && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6 bg-blue-50">
              <h3 className="text-lg leading-6 font-medium text-blue-900 flex items-center">
                <Zap className="ml-2 h-5 w-5" /> نتائج الحساب والتوصيات
              </h3>
            </div>

            <div className="p-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex flex-col items-center text-center">
                <RefreshCcw className="h-8 w-8 text-indigo-500 mb-2" />
                <span className="text-sm font-medium text-gray-500">الاستهلاك اليومي</span>
                <span className="mt-1 text-xl font-semibold text-gray-900">
                  {totalDailyWh > 1000 ? `${(totalDailyWh / 1000).toFixed(2)} كيلو واط/ساعة` : `${totalDailyWh} واط/ساعة`}
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex flex-col items-center text-center">
                <Sun className="h-8 w-8 text-yellow-500 mb-2" />
                <span className="text-sm font-medium text-gray-500">الألواح الشمسية المطلوبة</span>
                <span className="mt-1 text-xl font-semibold text-gray-900">
                  {recommendations.requiredSolarKw} كيلو واط
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex flex-col items-center text-center">
                <Battery className="h-8 w-8 text-green-500 mb-2" />
                <span className="text-sm font-medium text-gray-500">سعة البطاريات المطلوبة</span>
                <span className="mt-1 text-xl font-semibold text-gray-900">
                  {recommendations.requiredBatteryAh} أمبير/ساعة
                </span>
                <span className="text-xs text-gray-400 mt-1">({recommendations.systemVoltage} فولت)</span>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex flex-col items-center text-center">
                <Zap className="h-8 w-8 text-red-500 mb-2" />
                <span className="text-sm font-medium text-gray-500">سعة المحول (الإنفرتر)</span>
                <span className="mt-1 text-xl font-semibold text-gray-900">
                  {recommendations.recommendedInverterKw} كيلو واط
                </span>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SolarCalculator;
