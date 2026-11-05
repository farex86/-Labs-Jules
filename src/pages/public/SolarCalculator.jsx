import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { FACILITY_TYPES, calculateSolarSystem } from '../../models/SolarCalculatorModel';
import { Settings, Plus, Trash2, Calculator, Info } from 'lucide-react';

const initialState = {
  selectedFacility: null,
  devices: [],
  calculationResult: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facility = FACILITY_TYPES.find(f => f.id === action.payload);
      if (!facility) return state;
      // Deep copy devices
      const devicesCopy = facility.devices.map(d => ({ ...d }));
      return {
        ...state,
        selectedFacility: facility.id,
        devices: devicesCopy,
        calculationResult: null
      };
    }
    case 'UPDATE_DEVICE': {
      const { id, field, value } = action.payload;
      const updatedDevices = state.devices.map(d =>
        d.id === id ? { ...d, [field]: Number(value) } : d
      );
      return { ...state, devices: updatedDevices, calculationResult: null };
    }
    case 'ADD_DEVICE': {
      const newDevice = {
        id: Date.now().toString(),
        name: 'جهاز جديد',
        watts: 100,
        hours: 8,
        quantity: 1
      };
      return { ...state, devices: [...state.devices, newDevice], calculationResult: null };
    }
    case 'REMOVE_DEVICE': {
      return {
        ...state,
        devices: state.devices.filter(d => d.id !== action.payload),
        calculationResult: null
      };
    }
    case 'CALCULATE': {
      if (state.devices.length === 0) return state;
      const result = calculateSolarSystem(state.devices);
      return { ...state, calculationResult: result };
    }
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCalculate = () => {
    dispatch({ type: 'CALCULATE' });
    toast.success('تم الحساب بنجاح');
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">

        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            قم بحساب متطلبات النظام الشمسي لمنشأتك بسهولة
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sm:p-8">
          <div className="mb-8">
            <label htmlFor="facility" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
              اختر نوع المنشأة
            </label>
            <select
              id="facility"
              className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-lg rounded-md"
              value={state.selectedFacility || ''}
              onChange={(e) => dispatch({ type: 'SELECT_FACILITY', payload: e.target.value })}
            >
              <option value="" disabled>-- الرجاء الاختيار --</option>
              {FACILITY_TYPES.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          {state.selectedFacility && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center border-b dark:border-gray-700 pb-4">
                <h3 className="text-xl leading-6 font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <Settings className="w-6 h-6 text-primary" />
                  الأجهزة الكهربائية
                </h3>
                <button
                  onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <Plus className="w-5 h-5 ml-2 -mr-1" />
                  إضافة جهاز
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">الجهاز</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">الاستهلاك (واط)</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ساعات العمل</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">العدد</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">إجراء</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {state.devices.map((device) => (
                      <tr key={device.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {device.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <input
                            type="number"
                            min="0"
                            className="block w-24 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                            value={device.watts}
                            onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'watts', value: e.target.value }})}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <input
                            type="number"
                            min="0"
                            max="24"
                            className="block w-20 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                            value={device.hours}
                            onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'hours', value: e.target.value }})}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <input
                            type="number"
                            min="1"
                            className="block w-20 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                            value={device.quantity}
                            onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'quantity', value: e.target.value }})}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                            className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-6 flex justify-center">
                <button
                  onClick={handleCalculate}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Calculator className="w-6 h-6 ml-2 -mr-1" />
                  احسب النظام
                </button>
              </div>
            </motion.div>
          )}

          {state.calculationResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl border border-blue-100 dark:border-blue-800"
            >
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-6 flex items-center gap-2">
                <Info className="w-7 h-7" />
                النتائج المقدرة
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">إجمالي الحمل</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(state.calculationResult.totalWatts / 1000).toFixed(2)} <span className="text-sm font-normal">كيلو واط</span>
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">الاستهلاك اليومي</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(state.calculationResult.totalDailyEnergyWh / 1000).toFixed(2)} <span className="text-sm font-normal">كيلو واط.ساعة</span>
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">الإنفرتر المطلوب</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(state.calculationResult.inverterSizeW / 1000).toFixed(2)} <span className="text-sm font-normal">كيلو واط</span>
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">عدد الألواح ({state.calculationResult.panelWattage}W)</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {state.calculationResult.numberOfPanels} <span className="text-sm font-normal">لوح</span>
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm md:col-span-2 lg:col-span-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">عدد البطاريات ({state.calculationResult.batterySpec})</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {state.calculationResult.numberOfBatteries} <span className="text-sm font-normal">بطارية</span>
                    <span className="block text-xs text-gray-400 mt-1 font-normal">لتغطية الاستهلاك ليوم كامل بحد تفريغ 50%</span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
