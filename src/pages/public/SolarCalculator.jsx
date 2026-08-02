import React, { useState, useReducer } from 'react';
import { motion } from 'framer-motion';

import { Calculator, Sun, Battery, Zap, Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import { FACILITIES, calculateSystemRequirements } from '../../models/SolarCalculatorModel';

// State Management using useReducer for complex appliance list state
const initialState = {
  facilityType: '',
  appliances: [],
  results: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facility = FACILITIES.find((f) => f.id === action.payload);
      return {
        ...state,
        facilityType: action.payload,
        appliances: facility ? [...facility.defaultDevices] : [],
        results: null,
      };
    }
    case 'ADD_APPLIANCE':
      return {
        ...state,
        appliances: [...state.appliances, action.payload],
        results: null,
      };
    case 'UPDATE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.map((app) =>
          app.id === action.payload.id ? action.payload : app
        ),
        results: null,
      };
    case 'DELETE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.filter((app) => app.id !== action.payload),
        results: null,
      };
    case 'CALCULATE':
      return {
        ...state,
        results: calculateSystemRequirements(state.appliances),
      };
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', watts: 0, quantity: 1, hours: 1 });
  const [isAdding, setIsAdding] = useState(false);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SET_FACILITY', payload: e.target.value });
    setEditingId(null);
    setIsAdding(false);
  };

  const startEditing = (appliance) => {
    setEditingId(appliance.id);
    setEditForm({ ...appliance });
    setIsAdding(false);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const saveEdit = () => {
    dispatch({
      type: 'UPDATE_APPLIANCE',
      payload: { ...editForm, watts: Number(editForm.watts), quantity: Number(editForm.quantity), hours: Number(editForm.hours) },
    });
    setEditingId(null);
  };

  const startAdding = () => {
    setIsAdding(true);
    setEditingId(null);
    setEditForm({ name: '', watts: 0, quantity: 1, hours: 1 });
  };

  const saveNew = () => {
    dispatch({
      type: 'ADD_APPLIANCE',
      payload: {
        id: Date.now().toString(),
        ...editForm,
        watts: Number(editForm.watts),
        quantity: Number(editForm.quantity),
        hours: Number(editForm.hours),
      },
    });
    setIsAdding(false);
  };

  const calculate = () => {
    dispatch({ type: 'CALCULATE' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4"
          >
            <Sun className="h-8 w-8 text-blue-600" />
          </motion.div>
          <h1 className="text-3xl font-extrabold text-gray-900">حاسبة الطاقة الشمسية</h1>
          <p className="mt-4 text-lg text-gray-500">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك والأجهزة المستخدمة.
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">1. اختر نوع المنشأة</h3>
            <select
              value={state.facilityType}
              onChange={handleFacilityChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="" disabled>اختر...</option>
              {FACILITIES.map((facility) => (
                <option key={facility.id} value={facility.id}>
                  {facility.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {state.facilityType && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow overflow-hidden sm:rounded-lg mb-8"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">2. الأجهزة والاستهلاك</h3>
                <button
                  onClick={startAdding}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="mr-1 -ml-1 h-4 w-4" /> إضافة جهاز
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاستهلاك (واط)</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العدد</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات التشغيل/يوم</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {state.appliances.map((app) => (
                      <tr key={app.id}>
                        {editingId === app.id ? (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input type="number" value={editForm.watts} onChange={(e) => setEditForm({ ...editForm, watts: e.target.value })} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input type="number" value={editForm.quantity} onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input type="number" value={editForm.hours} onChange={(e) => setEditForm({ ...editForm, hours: e.target.value })} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button onClick={saveEdit} className="text-green-600 hover:text-green-900 ml-4"><Save className="h-5 w-5" /></button>
                              <button onClick={cancelEditing} className="text-red-600 hover:text-red-900"><X className="h-5 w-5" /></button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.watts}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.hours}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button onClick={() => startEditing(app)} className="text-blue-600 hover:text-blue-900 ml-4"><Edit2 className="h-5 w-5" /></button>
                              <button onClick={() => dispatch({ type: 'DELETE_APPLIANCE', payload: app.id })} className="text-red-600 hover:text-red-900"><Trash2 className="h-5 w-5" /></button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                    {isAdding && (
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="text" placeholder="اسم الجهاز" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="number" placeholder="واط" value={editForm.watts} onChange={(e) => setEditForm({ ...editForm, watts: e.target.value })} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="number" placeholder="العدد" value={editForm.quantity} onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="number" placeholder="ساعات" value={editForm.hours} onChange={(e) => setEditForm({ ...editForm, hours: e.target.value })} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={saveNew} className="text-green-600 hover:text-green-900 ml-4"><Save className="h-5 w-5" /></button>
                          <button onClick={cancelEditing} className="text-red-600 hover:text-red-900"><X className="h-5 w-5" /></button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={calculate}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Calculator className="mr-2 -ml-1 h-5 w-5" /> احسب النظام
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {state.results && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white shadow overflow-hidden sm:rounded-lg"
          >
            <div className="px-4 py-5 sm:px-6 bg-green-50 border-b border-green-200">
              <h3 className="text-lg leading-6 font-medium text-green-900">3. النتائج الموصى بها</h3>
            </div>
            <div className="px-4 py-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-500">حجم الإنفرتر المطلوب</div>
                <div className="mt-1 text-2xl font-semibold text-gray-900">{state.results.requiredInverterKw} kW</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                <Sun className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-500">الألواح الشمسية (550W)</div>
                <div className="mt-1 text-2xl font-semibold text-gray-900">{state.results.requiredPanelsCount} لوح</div>
                <div className="text-xs text-gray-500">بإجمالي {state.results.requiredPanelsKw} kW</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                <Battery className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-500">البطاريات المطلوبة (200Ah/12V)</div>
                <div className="mt-1 text-2xl font-semibold text-gray-900">{state.results.requiredBatteriesCount} بطارية</div>
                <div className="text-xs text-gray-500">نظام {state.results.batteryBankVoltage}V</div>
              </div>

               <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                <Calculator className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-500">الاستهلاك اليومي</div>
                <div className="mt-1 text-2xl font-semibold text-gray-900">{state.results.dailyConsumptionKwh} kWh</div>
              </div>

            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SolarCalculator;
