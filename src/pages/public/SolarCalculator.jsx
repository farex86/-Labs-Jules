import React, { useReducer, useEffect } from 'react';
import {
  FACILITY_TYPES,
  DEFAULT_DEVICES,
  calculateTotalEnergy,
  calculatePeakPower
} from '../../models/SolarCalculatorModel';
import { Plus, Trash2, Calculator } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const initialState = {
  selectedFacility: '',
  devices: [],
  totalEnergyWh: 0,
  peakPowerW: 0
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facilityId = action.payload;
      const initialDevices = DEFAULT_DEVICES[facilityId]
        ? DEFAULT_DEVICES[facilityId].map(d => ({ ...d }))
        : [];
      return {
        ...state,
        selectedFacility: facilityId,
        devices: initialDevices
      };
    }
    case 'UPDATE_DEVICE': {
      const { id, field, value } = action.payload;
      const updatedDevices = state.devices.map(device =>
        device.id === id ? { ...device, [field]: Number(value) >= 0 ? Number(value) : 0 } : device
      );
      return { ...state, devices: updatedDevices };
    }
    case 'UPDATE_DEVICE_NAME': {
        const { id, value } = action.payload;
        const updatedDevices = state.devices.map(device =>
          device.id === id ? { ...device, name: value } : device
        );
        return { ...state, devices: updatedDevices };
    }
    case 'ADD_DEVICE': {
      const newDevice = {
        id: Date.now(), // Unique ID based on timestamp
        name: 'جهاز جديد',
        watts: 0,
        quantity: 1,
        hours: 0
      };
      return { ...state, devices: [...state.devices, newDevice] };
    }
    case 'REMOVE_DEVICE': {
      return {
        ...state,
        devices: state.devices.filter(device => device.id !== action.payload)
      };
    }
    case 'CALCULATE_TOTALS': {
      return {
        ...state,
        totalEnergyWh: calculateTotalEnergy(state.devices),
        peakPowerW: calculatePeakPower(state.devices)
      };
    }
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  // Recalculate whenever devices change
  useEffect(() => {
    dispatch({ type: 'CALCULATE_TOTALS' });
  }, [state.devices]);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SET_FACILITY', payload: e.target.value });
  };

  const handleDeviceChange = (id, field, value) => {
    dispatch({ type: 'UPDATE_DEVICE', payload: { id, field, value } });
  };

  const handleDeviceNameChange = (id, value) => {
      dispatch({ type: 'UPDATE_DEVICE_NAME', payload: { id, value } });
  };

  const handleAddDevice = () => {
    dispatch({ type: 'ADD_DEVICE' });
  };

  const handleRemoveDevice = (id) => {
    dispatch({ type: 'REMOVE_DEVICE', payload: id });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
        <div className="flex items-center justify-center mb-6">
          <Calculator className="w-8 h-8 text-blue-600 ml-3" />
          <h1 className="text-3xl font-bold text-gray-900">حاسبة الطاقة الشمسية</h1>
        </div>
        <p className="text-gray-600 mb-8 text-center">اختر نوع المنشأة لحساب تقديرات استهلاك الطاقة اللازمة</p>

        {/* Facility Selector */}
        <div className="mb-8">
          <label htmlFor="facilityType" className="block text-sm font-medium text-gray-700 mb-2">نوع المنشأة</label>
          <select
            id="facilityType"
            value={state.selectedFacility}
            onChange={handleFacilityChange}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            <option value="">-- اختر نوع المنشأة --</option>
            {FACILITY_TYPES.map(facility => (
              <option key={facility.id} value={facility.id}>{facility.name}</option>
            ))}
          </select>
        </div>

        {/* Devices List */}
        {state.selectedFacility && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">الأجهزة الكهربائية</h2>
              <button
                onClick={handleAddDevice}
                className="flex items-center text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                <Plus className="w-4 h-4 ml-1" /> إضافة جهاز
              </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-8">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القدرة (واط)</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العدد</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات التشغيل/يوم</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">إجراء</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {state.devices.map((device) => (
                    <tr key={device.id}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="text"
                          value={device.name}
                          onChange={(e) => handleDeviceNameChange(device.id, e.target.value)}
                          className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="اسم الجهاز"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          value={device.watts}
                          onChange={(e) => handleDeviceChange(device.id, 'watts', e.target.value)}
                          className="w-24 bg-gray-50 border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          value={device.quantity}
                          onChange={(e) => handleDeviceChange(device.id, 'quantity', e.target.value)}
                          className="w-20 bg-gray-50 border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={device.hours}
                          onChange={(e) => handleDeviceChange(device.id, 'hours', e.target.value)}
                          className="w-20 bg-gray-50 border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleRemoveDevice(device.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="حذف الجهاز"
                        >
                          <Trash2 className="w-5 h-5 mx-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {state.devices.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                        لا توجد أجهزة مضافة. انقر على "إضافة جهاز" للبدء.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Results Section */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <h3 className="text-xl font-bold text-blue-900 mb-4 border-b border-blue-200 pb-2">النتائج التقديرية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded shadow-sm">
                  <p className="text-gray-500 text-sm mb-1">إجمالي الاستهلاك اليومي</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">
                      {state.totalEnergyWh >= 1000
                        ? (state.totalEnergyWh / 1000).toFixed(2)
                        : state.totalEnergyWh}
                    </span>
                    <span className="mr-2 text-gray-600 font-medium">
                      {state.totalEnergyWh >= 1000 ? 'كيلوواط.ساعة (kWh)' : 'واط.ساعة (Wh)'}
                    </span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded shadow-sm">
                  <p className="text-gray-500 text-sm mb-1">قدرة الذروة المطلوبة (أحمال)</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">
                      {state.peakPowerW >= 1000
                        ? (state.peakPowerW / 1000).toFixed(2)
                        : state.peakPowerW}
                    </span>
                    <span className="mr-2 text-gray-600 font-medium">
                      {state.peakPowerW >= 1000 ? 'كيلوواط (kW)' : 'واط (W)'}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                * ملاحظة: هذه الحسابات تقديرية ويُنصح بإضافة هامش أمان بنسبة 20-30٪ عند تصميم النظام الفعلي لتعويض الفواقد.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SolarCalculator;
