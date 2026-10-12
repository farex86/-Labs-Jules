import React, { useReducer } from 'react';
import { FACILITY_TYPES, calculateTotalDailyEnergy, calculateSystemRequirements } from '../../models/SolarCalculatorModel';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const initialState = {
  selectedFacility: null,
  appliances: [],
  customApplianceName: '',
  customAppliancePower: '',
  customApplianceHours: '',
  customApplianceQuantity: 1
};

function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      return {
        ...state,
        selectedFacility: action.payload,
        appliances: facility ? facility.appliances.map(a => ({ ...a, quantity: 1, id: Math.random().toString() })) : []
      };
    }
    case 'UPDATE_APPLIANCE_QUANTITY': {
      return {
        ...state,
        appliances: state.appliances.map(app =>
          app.id === action.payload.id ? { ...app, quantity: parseInt(action.payload.quantity) || 0 } : app
        )
      };
    }
    case 'UPDATE_APPLIANCE_HOURS': {
        return {
            ...state,
            appliances: state.appliances.map(app =>
              app.id === action.payload.id ? { ...app, hours: parseInt(action.payload.hours) || 0 } : app
            )
          };
    }
    case 'REMOVE_APPLIANCE': {
      return {
        ...state,
        appliances: state.appliances.filter(app => app.id !== action.payload)
      };
    }
    case 'SET_CUSTOM_FIELD': {
      return {
        ...state,
        [action.payload.field]: action.payload.value
      };
    }
    case 'ADD_CUSTOM_APPLIANCE': {
      if (!state.customApplianceName || !state.customAppliancePower || !state.customApplianceHours) {
        return state;
      }
      return {
        ...state,
        appliances: [
          ...state.appliances,
          {
            id: Math.random().toString(),
            name: state.customApplianceName,
            power: parseInt(state.customAppliancePower),
            hours: parseInt(state.customApplianceHours),
            quantity: parseInt(state.customApplianceQuantity)
          }
        ],
        customApplianceName: '',
        customAppliancePower: '',
        customApplianceHours: '',
        customApplianceQuantity: 1
      };
    }
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dailyEnergyWh = calculateTotalDailyEnergy(state.appliances);
  const requirements = calculateSystemRequirements(dailyEnergyWh);

  return (
    <div className="min-h-screen bg-gray-50 p-8" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">حاسبة الطاقة الشمسية</h1>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">اختر نوع المنشأة</label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={state.selectedFacility || ''}
              onChange={(e) => dispatch({ type: 'SELECT_FACILITY', payload: e.target.value })}
            >
              <option value="" disabled>اختر المنشأة...</option>
              {FACILITY_TYPES.map(facility => (
                <option key={facility.id} value={facility.id}>{facility.name}</option>
              ))}
            </select>
          </div>

          {state.appliances.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">الأجهزة والاستهلاك</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                {state.appliances.map(app => (
                  <div key={app.id} className="flex flex-wrap items-center gap-4 mb-4 p-4 bg-white rounded shadow-sm">
                    <div className="flex-1 min-w-[150px]">
                      <span className="font-medium">{app.name}</span>
                      <span className="text-sm text-gray-500 block">{app.power} واط</span>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">العدد</label>
                      <input
                        type="number"
                        min="1"
                        value={app.quantity}
                        onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE_QUANTITY', payload: { id: app.id, quantity: e.target.value }})}
                        className="w-20 p-1 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">ساعات العمل</label>
                      <input
                        type="number"
                        min="1"
                        max="24"
                        value={app.hours}
                        onChange={(e) => dispatch({ type: 'UPDATE_APPLIANCE_HOURS', payload: { id: app.id, hours: e.target.value }})}
                        className="w-20 p-1 border rounded"
                      />
                    </div>
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                      className="text-red-500 hover:text-red-700 mt-5"
                    >
                      حذف
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8 border-t pt-6">
            <h3 className="text-lg font-medium mb-4">إضافة جهاز آخر</h3>
            <div className="flex flex-wrap gap-4 items-end">
              <div>
                <label className="block text-sm text-gray-700 mb-1">اسم الجهاز</label>
                <input
                  type="text"
                  value={state.customApplianceName}
                  onChange={(e) => dispatch({ type: 'SET_CUSTOM_FIELD', payload: { field: 'customApplianceName', value: e.target.value }})}
                  className="p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">القدرة (واط)</label>
                <input
                  type="number"
                  value={state.customAppliancePower}
                  onChange={(e) => dispatch({ type: 'SET_CUSTOM_FIELD', payload: { field: 'customAppliancePower', value: e.target.value }})}
                  className="p-2 border rounded w-24"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">ساعات العمل</label>
                <input
                  type="number"
                  value={state.customApplianceHours}
                  onChange={(e) => dispatch({ type: 'SET_CUSTOM_FIELD', payload: { field: 'customApplianceHours', value: e.target.value }})}
                  className="p-2 border rounded w-24"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">العدد</label>
                <input
                  type="number"
                  value={state.customApplianceQuantity}
                  onChange={(e) => dispatch({ type: 'SET_CUSTOM_FIELD', payload: { field: 'customApplianceQuantity', value: e.target.value }})}
                  className="p-2 border rounded w-20"
                />
              </div>
              <button
                onClick={() => dispatch({ type: 'ADD_CUSTOM_APPLIANCE' })}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                إضافة
              </button>
            </div>
          </div>

          {state.appliances.length > 0 && (
            <div className="bg-blue-50 p-6 rounded-lg mt-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">النتائج التقديرية</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded shadow">
                  <p className="text-sm text-gray-500 mb-1">الاستهلاك اليومي الكلي</p>
                  <p className="text-xl font-semibold text-gray-900">{(dailyEnergyWh / 1000).toFixed(2)} كيلو واط ساعة</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <p className="text-sm text-gray-500 mb-1">حجم النظام الشمسي المقترح</p>
                  <p className="text-xl font-semibold text-blue-600">{requirements.requiredSolarCapacitykW.toFixed(2)} كيلو واط</p>
                </div>
                <div className="bg-white p-4 rounded shadow md:col-span-2">
                  <p className="text-sm text-gray-500 mb-1">سعة البطاريات المقترحة (احتياطي 1.5 يوم)</p>
                  <p className="text-xl font-semibold text-green-600">{requirements.requiredBatteryCapacitykWh.toFixed(2)} كيلو واط ساعة</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
};

export default SolarCalculator;
