import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { Plus, Trash2, Calculator, ArrowRight } from 'lucide-react';
import { facilityTypes, commonDevices } from '../../models/solarCalculatorData';
import { calculateSystemRecommendation } from '../../utils/solarCalculatorLogic';

const initialState = {
  facilityType: '',
  devices: [],
  recommendation: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY_TYPE':
      return { ...state, facilityType: action.payload };
    case 'ADD_DEVICE':
      return {
        ...state,
        devices: [...state.devices, { ...action.payload, id: Date.now().toString() }],
      };
    case 'REMOVE_DEVICE':
      return {
        ...state,
        devices: state.devices.filter(d => d.id !== action.payload),
      };
    case 'UPDATE_DEVICE':
      return {
        ...state,
        devices: state.devices.map(d =>
          d.id === action.payload.id ? { ...d, [action.payload.field]: action.payload.value } : d
        ),
      };
    case 'CALCULATE':
      return {
        ...state,
        recommendation: calculateSystemRecommendation(state.devices),
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function SolarCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCalculate = () => {
    if (state.devices.length === 0) {
      toast.error('الرجاء إضافة جهاز واحد على الأقل');
      return;
    }
    dispatch({ type: 'CALCULATE' });
    toast.success('تم الحساب بنجاح!');
  };

  const addCommonDevice = (deviceId) => {
    const device = commonDevices.find(d => d.id === deviceId);
    if (device) {
      dispatch({
        type: 'ADD_DEVICE',
        payload: {
          name: device.name,
          power: device.defaultPower,
          hours: 1,
          quantity: 1,
        },
      });
      toast.success(`تمت إضافة ${device.name}`);
    }
  };

  const addCustomDevice = () => {
    dispatch({
      type: 'ADD_DEVICE',
      payload: {
        name: 'جهاز مخصص',
        power: 100,
        hours: 1,
        quantity: 1,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-right" dir="rtl">
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            احسب احتياجاتك من الطاقة الشمسية بسهولة وبناءً على نمط استهلاكك
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="mb-6">
            <label htmlFor="facilityType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              نوع المنشأة / نمط الاستهلاك
            </label>
            <select
              id="facilityType"
              value={state.facilityType}
              onChange={(e) => dispatch({ type: 'SET_FACILITY_TYPE', payload: e.target.value })}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">اختر نوع المنشأة</option>
              {facilityTypes.map((facility) => (
                <option key={facility.id} value={facility.id}>
                  {facility.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              الأجهزة المستخدمة
            </h3>

            <div className="flex flex-wrap gap-2 mb-6">
              {commonDevices.map((device) => (
                <button
                  key={device.id}
                  onClick={() => addCommonDevice(device.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="w-4 h-4 ml-1" />
                  {device.name}
                </button>
              ))}
              <button
                onClick={addCustomDevice}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
              >
                <Plus className="w-4 h-4 ml-1" />
                جهاز مخصص
              </button>
            </div>

            <div className="space-y-4">
              {state.devices.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  لم تقم بإضافة أي أجهزة بعد.
                </p>
              ) : (
                state.devices.map((device) => (
                  <motion.div
                    key={device.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-wrap md:flex-nowrap items-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">اسم الجهاز</label>
                      <input
                        type="text"
                        value={device.name}
                        onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'name', value: e.target.value } })}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div className="w-24">
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">العدد</label>
                      <input
                        type="number"
                        min="1"
                        value={device.quantity}
                        onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'quantity', value: Number(e.target.value) } })}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div className="w-28">
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">القدرة (وات)</label>
                      <input
                        type="number"
                        min="1"
                        value={device.power}
                        onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'power', value: Number(e.target.value) } })}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div className="w-28">
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">ساعات التشغيل</label>
                      <input
                        type="number"
                        min="1"
                        max="24"
                        value={device.hours}
                        onChange={(e) => dispatch({ type: 'UPDATE_DEVICE', payload: { id: device.id, field: 'hours', value: Number(e.target.value) } })}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div className="flex items-end h-full pt-6">
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-2"
                        title="حذف"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleCalculate}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Calculator className="w-5 h-5 ml-2" />
              احسب الاحتياج
            </button>
          </div>
        </div>

        {state.recommendation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              النتائج والتوصيات
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">الاستهلاك اليومي</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {(state.recommendation.totalEnergyWh / 1000).toFixed(2)} <span className="text-sm font-normal">كيلوواط.ساعة</span>
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">ألواح الطاقة الشمسية</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.ceil(state.recommendation.solarArrayW)} <span className="text-sm font-normal">وات</span>
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
                <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium mb-1">سعة البطاريات (24 فولت)</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.ceil(state.recommendation.batteryCapacityAh)} <span className="text-sm font-normal">أمبير.ساعة</span>
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">حجم المحول (Inverter)</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.ceil(state.recommendation.inverterSizeW)} <span className="text-sm font-normal">وات</span>
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-center">
               <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900">
                  اطلب عرض سعر بناءً على هذه النتائج
                  <ArrowRight className="w-4 h-4 mr-2" />
               </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
