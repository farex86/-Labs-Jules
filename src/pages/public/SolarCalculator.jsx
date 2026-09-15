import React, { useReducer, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Calculator, Plus, Trash2, Battery, Sun, Zap, Info } from 'lucide-react';
import {
  getFacilityTypes,
  calculateTotalConsumption,
  calculateSystemSize,
  calculateBatteryCapacity,
  calculateInverterSize
} from '../../models/SolarCalculatorModel';

const initialState = {
  selectedFacilityId: '',
  appliances: [],
  results: {
    dailyConsumptionWh: 0,
    systemSizeKW: 0,
    batteryCapacityAh: 0,
    inverterSizeKW: 0
  },
  systemVoltage: 48
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FACILITY': {
      const facilityId = action.payload;
      if (!facilityId) {
        return { ...state, selectedFacilityId: '', appliances: [], results: initialState.results };
      }
      const facilityTypes = getFacilityTypes();
      const selected = facilityTypes.find(f => f.id === facilityId);
      return {
        ...state,
        selectedFacilityId: facilityId,
        appliances: selected ? selected.appliances : []
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
    case 'ADD_APPLIANCE': {
      const newAppliance = {
        id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        name: 'جهاز جديد',
        power: 100,
        hours: 1,
        count: 1
      };
      return {
        ...state,
        appliances: [...state.appliances, newAppliance]
      };
    }
    case 'REMOVE_APPLIANCE': {
      return {
        ...state,
        appliances: state.appliances.filter(app => app.id !== action.payload)
      };
    }
    case 'CALCULATE_RESULTS': {
      const dailyWh = calculateTotalConsumption(state.appliances);
      const sysSize = calculateSystemSize(dailyWh);
      const batCap = calculateBatteryCapacity(dailyWh, state.systemVoltage);
      const invSize = calculateInverterSize(state.appliances);

      return {
        ...state,
        results: {
          dailyConsumptionWh: dailyWh,
          systemSizeKW: sysSize,
          batteryCapacityAh: batCap,
          inverterSizeKW: invSize
        }
      };
    }
    case 'SET_SYSTEM_VOLTAGE': {
      return { ...state, systemVoltage: action.payload };
    }
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const facilityTypes = getFacilityTypes();

  useEffect(() => {
    dispatch({ type: 'CALCULATE_RESULTS' });
  }, [state.appliances, state.systemVoltage]);

  const handleFacilityChange = (e) => {
    dispatch({ type: 'SET_FACILITY', payload: e.target.value });
  };

  const handleApplianceChange = (id, field, value) => {
    dispatch({ type: 'UPDATE_APPLIANCE', payload: { id, field, value } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full mb-4"
          >
            <Sun className="h-8 w-8 text-blue-600" />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك والأجهزة المستخدمة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اختر نوع المنشأة
              </label>
              <select
                value={state.selectedFacilityId}
                onChange={handleFacilityChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
              >
                <option value="">-- اختر من القائمة --</option>
                {facilityTypes.map(ft => (
                  <option key={ft.id} value={ft.id}>{ft.name}</option>
                ))}
              </select>
            </motion.div>

            {state.selectedFacilityId && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                  <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-gray-500" />
                    الأجهزة الكهربائية
                  </h2>
                  <button
                    onClick={() => dispatch({ type: 'ADD_APPLIANCE' })}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="p-6 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                        <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاستهلاك (واط)</th>
                        <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العدد</th>
                        <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات التشغيل/يوم</th>
                        <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجمالي (واط/ساعة)</th>
                        <th className="px-3 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {state.appliances.map((app) => (
                        <tr key={app.id}>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              value={app.name}
                              onChange={(e) => handleApplianceChange(app.id, 'name', e.target.value)}
                              className="w-full sm:text-sm border-gray-300 rounded-md border p-2"
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              value={app.power}
                              onChange={(e) => handleApplianceChange(app.id, 'power', e.target.value)}
                              className="w-24 sm:text-sm border-gray-300 rounded-md border p-2"
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="1"
                              value={app.count}
                              onChange={(e) => handleApplianceChange(app.id, 'count', e.target.value)}
                              className="w-20 sm:text-sm border-gray-300 rounded-md border p-2"
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              max="24"
                              value={app.hours}
                              onChange={(e) => handleApplianceChange(app.id, 'hours', e.target.value)}
                              className="w-20 sm:text-sm border-gray-300 rounded-md border p-2"
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-gray-500">
                            {(Number(app.power) * Number(app.count) * Number(app.hours)).toLocaleString()}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-left">
                            <button
                              onClick={() => dispatch({ type: 'REMOVE_APPLIANCE', payload: app.id })}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {state.appliances.length === 0 && (
                        <tr>
                          <td colSpan="6" className="px-3 py-8 text-center text-gray-500">
                            لا توجد أجهزة مضافة. انقر على "إضافة جهاز" للبدء.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden sticky top-6"
            >
              <div className="bg-blue-600 p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-2">النتائج التقديرية</h3>
                <p className="text-blue-100 text-sm">بناءً على المعطيات المدخلة</p>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6 text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-500">الاستهلاك اليومي</p>
                      <p className="font-bold text-gray-900">
                        {state.results.dailyConsumptionWh >= 1000
                          ? `${(state.results.dailyConsumptionWh / 1000).toFixed(2)} كيلو واط/ساعة`
                          : `${state.results.dailyConsumptionWh} واط/ساعة`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Sun className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">حجم الألواح المطلوب</p>
                      <p className="font-bold text-blue-900">
                        {state.results.systemSizeKW} كيلو واط (kW)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Battery className="w-6 h-6 text-green-500" />
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm text-gray-500">سعة البطاريات المطلوبة</p>
                        <select
                          value={state.systemVoltage}
                          onChange={(e) => dispatch({ type: 'SET_SYSTEM_VOLTAGE', payload: Number(e.target.value) })}
                          className="text-xs bg-transparent border-b border-green-300 text-green-800 focus:outline-none"
                        >
                          <option value="12">12V</option>
                          <option value="24">24V</option>
                          <option value="48">48V</option>
                        </select>
                      </div>
                      <p className="font-bold text-green-900">
                        {state.results.batteryCapacityAh} أمبير-ساعة (Ah)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calculator className="w-6 h-6 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-500">حجم العاكس (Inverter) التقريبي</p>
                      <p className="font-bold text-purple-900">
                        {state.results.inverterSizeKW} كيلو واط (kW)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-yellow-50 p-4 rounded-md flex items-start gap-3">
                  <Info className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-800">
                    ملاحظة: هذه الحسابات تقديرية وتفترض 5 ساعات من ذروة الإشعاع الشمسي. يفضل استشارة مهندس مختص للحصول على تصميم دقيق.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
