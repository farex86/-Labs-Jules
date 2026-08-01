import React, { useState, useEffect } from 'react';
import { SolarCalculatorModel } from '../../models/SolarCalculatorModel';
import { Calculator, Zap } from 'lucide-react';

export default function SolarCalculator() {
  const [calculationMode, setCalculationMode] = useState('manual'); // 'manual' or 'devices'
  const [facility, setFacility] = useState('');
  const [consumption, setConsumption] = useState('');
  const [devicesState, setDevicesState] = useState({});
  const [results, setResults] = useState(null);

  // Reset results and devices state when mode or facility changes
  useEffect(() => {
    if (calculationMode === 'devices' && facility) {
      const defaultDevices = SolarCalculatorModel.getDevicesForFacility(facility);
      const initialState = {};
      defaultDevices.forEach(d => {
        initialState[d.id] = { quantity: 0, hours: 0 };
      });
      setTimeout(() => setDevicesState(initialState), 0);
    }
    return () => setResults(null);
  }, [calculationMode, facility]);

  const handleDeviceChange = (deviceId, field, value) => {
    setDevicesState(prev => ({
      ...prev,
      [deviceId]: {
        ...prev[deviceId],
        [field]: Number(value) >= 0 ? Number(value) : 0
      }
    }));
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    let totalMonthlyKWh = 0;

    if (calculationMode === 'manual') {
      totalMonthlyKWh = Number(consumption);
    } else {
      const facilityDevices = SolarCalculatorModel.getDevicesForFacility(facility);
      let dailyTotalWh = 0;

      facilityDevices.forEach(d => {
        const state = devicesState[d.id];
        if (state) {
          // Power(W) * Quantity * Hours = Daily Wh
          dailyTotalWh += d.powerW * state.quantity * state.hours;
        }
      });

      // Monthly kWh = (Daily Wh * 30) / 1000
      totalMonthlyKWh = (dailyTotalWh * 30) / 1000;
    }

    if (totalMonthlyKWh > 0) {
      const res = SolarCalculatorModel.calculateSystemSize(totalMonthlyKWh);
      setResults({ ...res, calculatedConsumption: totalMonthlyKWh.toFixed(2) });
    } else {
       setResults(null);
       alert("الرجاء إدخال استهلاك صحيح"); // Or use a toast, but keeping it simple for now
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 dir-rtl text-right" dir="rtl">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 inline-flex items-center gap-3">
            <Calculator className="w-8 h-8 text-blue-600" />
            حاسبة الطاقة الشمسية
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            احسب حجم نظام الطاقة الشمسية المناسب لمنشأتك
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            className={`flex-1 py-3 text-center text-sm font-medium border-b-2 transition-colors ${
              calculationMode === 'manual'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setCalculationMode('manual')}
          >
            إدخال الاستهلاك المباشر
          </button>
          <button
            type="button"
            className={`flex-1 py-3 text-center text-sm font-medium border-b-2 transition-colors ${
              calculationMode === 'devices'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setCalculationMode('devices')}
          >
            حساب بناءً على الأجهزة
          </button>
        </div>

        <form className="mt-6 space-y-6" onSubmit={handleCalculate}>
          {/* Facility Selector (Always visible so they can classify themselves, or specifically needed for 'devices' mode) */}
          <div>
            <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-1">
              نوع المنشأة
            </label>
            <select
              id="facility"
              name="facility"
              required={calculationMode === 'devices'}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
            >
              <option value="" disabled>اختر نوع المنشأة</option>
              {SolarCalculatorModel.getFacilities().map((fac) => (
                <option key={fac.id} value={fac.id}>
                  {fac.label}
                </option>
              ))}
            </select>
          </div>

          {calculationMode === 'manual' ? (
            <div>
              <label htmlFor="consumption" className="block text-sm font-medium text-gray-700 mb-1">
                الاستهلاك الشهري (كيلوواط/ساعة)
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Zap className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="consumption"
                  name="consumption"
                  type="number"
                  required
                  min="1"
                  className="appearance-none block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="مثال: 500"
                  value={consumption}
                  onChange={(e) => setConsumption(e.target.value)}
                />
              </div>
            </div>
          ) : (
             facility && (
                <div className="border border-gray-200 rounded-md overflow-hidden">
                   <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                     <h3 className="text-sm font-medium text-gray-700">الأجهزة الشائعة لـ {SolarCalculatorModel.getFacilities().find(f => f.id === facility)?.label}</h3>
                   </div>
                   <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                     {SolarCalculatorModel.getDevicesForFacility(facility).map(device => (
                       <div key={device.id} className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                         <div>
                            <p className="text-sm font-medium text-gray-900">{device.name}</p>
                            <p className="text-xs text-gray-500">{device.powerW} واط</p>
                         </div>
                         <div>
                           <label className="block text-xs text-gray-500 mb-1">العدد</label>
                           <input
                             type="number"
                             min="0"
                             className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                             value={devicesState[device.id]?.quantity || ''}
                             onChange={(e) => handleDeviceChange(device.id, 'quantity', e.target.value)}
                             placeholder="0"
                           />
                         </div>
                         <div>
                           <label className="block text-xs text-gray-500 mb-1">ساعات التشغيل/يوم</label>
                           <input
                             type="number"
                             min="0"
                             max="24"
                             className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                             value={devicesState[device.id]?.hours || ''}
                             onChange={(e) => handleDeviceChange(device.id, 'hours', e.target.value)}
                             placeholder="0"
                           />
                         </div>
                       </div>
                     ))}
                     {SolarCalculatorModel.getDevicesForFacility(facility).length === 0 && (
                        <div className="p-4 text-center text-sm text-gray-500">لا توجد أجهزة مسجلة لهذا النوع.</div>
                     )}
                   </div>
                </div>
             )
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              احسب النظام
            </button>
          </div>
        </form>

        {results && (
          <div className="mt-8 bg-blue-50 border border-blue-100 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-blue-900 mb-4 border-b border-blue-200 pb-2">النتائج التقديرية</h3>

            {calculationMode === 'devices' && (
               <p className="text-sm text-blue-800 mb-4">
                 إجمالي الاستهلاك الشهري المقدر: <strong>{results.calculatedConsumption} كيلوواط/ساعة</strong>
               </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-md border border-blue-100 text-center">
                 <p className="text-xs text-gray-500 mb-1">حجم النظام</p>
                 <p className="text-xl font-bold text-blue-700">{results.systemSizeKW} <span className="text-sm font-normal text-blue-600">kW</span></p>
              </div>
              <div className="bg-white p-4 rounded-md border border-blue-100 text-center">
                 <p className="text-xs text-gray-500 mb-1">عدد الألواح (400W)</p>
                 <p className="text-xl font-bold text-blue-700">{results.estimatedPanels}</p>
              </div>
              <div className="bg-white p-4 rounded-md border border-blue-100 text-center">
                 <p className="text-xs text-gray-500 mb-1">حجم الإنفرتر</p>
                 <p className="text-xl font-bold text-blue-700">{results.estimatedInverter} <span className="text-sm font-normal text-blue-600">kW</span></p>
              </div>
            </div>

            <p className="mt-4 text-xs text-blue-600 text-center">
              * هذه الحسابات تقديرية وتعتمد على كفاءة 80% ومتوسط 6 ساعات شمس يومياً.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
