import React, { useState, useMemo } from 'react';
import { CONSUMPTION_PATTERNS } from '../../constants/consumptionPatterns';
import { calculateSolarSystem } from '../../utils/solarCalculatorLogic';
import { Calculator, Plus, Trash2, Zap, Battery, Sun, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SolarCalculator() {
  const [selectedPatternId, setSelectedPatternId] = useState(CONSUMPTION_PATTERNS[0].id);
  const [customDevices, setCustomDevices] = useState(() => {
    // Initialize with the default devices for the initially selected pattern
    const pattern = CONSUMPTION_PATTERNS[0];
    return JSON.parse(JSON.stringify(pattern.devices));
  });

  // Handle pattern selection and reset custom devices to the pattern's default devices
  const handlePatternChange = (e) => {
    const patternId = e.target.value;
    setSelectedPatternId(patternId);

    const pattern = CONSUMPTION_PATTERNS.find(p => p.id === patternId);
    if (pattern) {
      // Deep copy to avoid mutating constants
      setCustomDevices(JSON.parse(JSON.stringify(pattern.devices)));
    }
  };

  const handleDeviceChange = (index, field, value) => {
    const updatedDevices = [...customDevices];
    updatedDevices[index][field] = value;
    setCustomDevices(updatedDevices);
  };

  const removeDevice = (index) => {
    const updatedDevices = customDevices.filter((_, i) => i !== index);
    setCustomDevices(updatedDevices);
  };

  const addDevice = () => {
    setCustomDevices([
      ...customDevices,
      { id: Date.now().toString(), name: 'جهاز جديد (New Device)', power_watts: 100, quantity: 1, hours_per_day: 4 }
    ]);
  };

  // Memoize calculation so it only runs when customDevices changes
  const results = useMemo(() => calculateSolarSystem(customDevices), [customDevices]);

  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Calculator className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">حاسبة الطاقة الشمسية</h1>
          </div>
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            تسجيل الدخول للنظام
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-8 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            احسب احتياجك من الطاقة الشمسية
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            اختر نمط الاستهلاك الخاص بك أو قم بإدخال أجهزتك يدوياً لمعرفة حجم النظام الشمسي المناسب لك.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Inputs */}
          <div className="lg:col-span-2 space-y-6">

            {/* Pattern Selection */}
            <div className="bg-white shadow rounded-lg p-6 border-t-4 border-blue-500">
              <label htmlFor="pattern" className="block text-lg font-medium text-gray-700 mb-4">
                اختر نوع المنشأة / نمط الاستهلاك
              </label>
              <select
                id="pattern"
                value={selectedPatternId}
                onChange={handlePatternChange}
                className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm bg-gray-50"
              >
                {CONSUMPTION_PATTERNS.map((pattern) => (
                  <option key={pattern.id} value={pattern.id}>
                    {pattern.name} - {pattern.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Devices List */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">الأجهزة الكهربائية</h3>
                <button
                  onClick={addDevice}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <Plus className="h-5 w-5 ml-2 -mr-1" />
                  إضافة جهاز
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">اسم الجهاز</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاستهلاك (واط)</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العدد</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات العمل/يوم</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراء</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {customDevices.map((device, index) => (
                      <tr key={device.id || index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            value={device.name}
                            onChange={(e) => handleDeviceChange(index, 'name', e.target.value)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 bg-white"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            min="0"
                            value={device.power_watts}
                            onChange={(e) => handleDeviceChange(index, 'power_watts', Number(e.target.value))}
                            className="block w-24 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 bg-white text-left"
                            dir="ltr"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            min="1"
                            value={device.quantity}
                            onChange={(e) => handleDeviceChange(index, 'quantity', Number(e.target.value))}
                            className="block w-20 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 bg-white text-left"
                            dir="ltr"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            min="1"
                            max="24"
                            value={device.hours_per_day}
                            onChange={(e) => handleDeviceChange(index, 'hours_per_day', Number(e.target.value))}
                            className="block w-20 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 bg-white text-left"
                            dir="ltr"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => removeDevice(index)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors"
                            title="حذف الجهاز"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {customDevices.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-10 text-center text-gray-500 bg-gray-50">
                          لا توجد أجهزة مضافة. يرجى إضافة أجهزة لحساب النظام.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 shadow-xl rounded-xl p-6 text-white sticky top-24">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Activity className="h-6 w-6 ml-2 text-blue-200" />
                النتائج والتوصيات
              </h3>

              <div className="space-y-6">

                {/* Daily Energy */}
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-100 text-sm">الاستهلاك اليومي الكلي</span>
                    <Zap className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="text-3xl font-bold">
                    {(results.dailyEnergyWh / 1000).toFixed(1)} <span className="text-lg font-normal text-blue-200">kWh</span>
                  </div>
                </div>

                {/* Inverter */}
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-100 text-sm">حجم المحول (Inverter) المقترح</span>
                    <Activity className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold">
                    {results.recommendedInverterW.toLocaleString()} <span className="text-lg font-normal text-blue-200">واط</span>
                  </div>
                  <p className="text-xs text-blue-200 mt-1">يتحمل أقصى سحب ({results.totalPeakPowerW.toLocaleString()}W) مع هامش أمان</p>
                </div>

                {/* Solar Panels */}
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-100 text-sm">الألواح الشمسية المطلوبة</span>
                    <Sun className="h-5 w-5 text-orange-400" />
                  </div>
                  <div className="text-2xl font-bold">
                    {results.recommendedSolarPanelCapacityW.toLocaleString()} <span className="text-lg font-normal text-blue-200">واط</span>
                  </div>
                  <div className="mt-2 flex items-center text-sm font-medium bg-blue-900/50 rounded p-2">
                    <span className="ml-2">العدد التقديري:</span>
                    <span className="text-xl text-yellow-400">{results.estimatedPanelsNeeded}</span>
                    <span className="mr-1 text-blue-200 text-xs">(لوح {results.assumptions?.panelSizeW}W)</span>
                  </div>
                </div>

                {/* Batteries */}
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-100 text-sm">سعة البطاريات المطلوبة ({results.assumptions?.batteryVoltage}V)</span>
                    <Battery className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold">
                    {results.recommendedBatteryCapacityAh.toLocaleString()} <span className="text-lg font-normal text-blue-200">Ah</span>
                  </div>
                  <div className="mt-2 flex items-center text-sm font-medium bg-blue-900/50 rounded p-2">
                    <span className="ml-2">العدد التقديري:</span>
                    <span className="text-xl text-yellow-400">{results.estimatedBatteriesNeeded}</span>
                    <span className="mr-1 text-blue-200 text-xs">(بطارية 12V {results.assumptions?.batterySizeAh}Ah)</span>
                  </div>
                </div>

              </div>

              <div className="mt-8 text-xs text-blue-200 text-center bg-black/20 p-3 rounded">
                * هذه الحسابات تقديرية وتعتمد على عوامل الطقس وكفاءة الأجهزة. يفضل استشارة مهندس مختص قبل الشراء.
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
