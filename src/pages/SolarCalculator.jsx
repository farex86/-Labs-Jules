import React, { useState } from 'react';
import { CONSUMPTION_PATTERNS } from '../lib/solarCalculatorConstants';
import { calculateTotalEnergy, calculateSystemRequirements } from '../lib/solarCalculatorLogic';
import { Calculator, Zap, Battery, Sun, Plus, Trash2 } from 'lucide-react';

const SolarCalculator = () => {
  const [selectedPattern, setSelectedPattern] = useState(CONSUMPTION_PATTERNS[0].id);
  const [devices, setDevices] = useState(() => JSON.parse(JSON.stringify(CONSUMPTION_PATTERNS[0].devices)));

  // Derived state to avoid setState in useEffect
  const getDerivedDevicesAndResults = () => {
    let calculatedResults = null;
    if (devices.length > 0) {
      const { totalWh, totalPowerW } = calculateTotalEnergy(devices);
      const requirements = calculateSystemRequirements(totalWh, totalPowerW);
      calculatedResults = {
        totalWh,
        totalPowerW,
        ...requirements
      };
    }

    return { calculatedResults };
  };

  const handlePatternChange = (e) => {
    const newPatternId = e.target.value;
    setSelectedPattern(newPatternId);
    const pattern = CONSUMPTION_PATTERNS.find(p => p.id === newPatternId);
    if (pattern) {
      setDevices(JSON.parse(JSON.stringify(pattern.devices)));
    }
  };

  const { calculatedResults } = getDerivedDevicesAndResults();
  const displayResults = calculatedResults;

  const handleDeviceChange = (index, field, value) => {
    const newDevices = [...devices];
    newDevices[index][field] = Number(value);
    setDevices(newDevices);
  };

  const handleDeviceNameChange = (index, value) => {
    const newDevices = [...devices];
    newDevices[index].name = value;
    setDevices(newDevices);
  };

  const removeDevice = (index) => {
    const newDevices = [...devices];
    newDevices.splice(index, 1);
    setDevices(newDevices);
  };

  const addDevice = () => {
    setDevices([
      ...devices,
      { id: `custom_${Date.now()}`, name: 'جهاز جديد', power: 100, qty: 1, hours: 1 }
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">حاسبة الطاقة الشمسية</h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نمط استهلاكك والأجهزة المستخدمة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Input (Takes up 2 columns on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <label htmlFor="pattern" className="block text-sm font-medium text-gray-700 mb-2">
                اختر نمط الاستهلاك:
              </label>
              <select
                id="pattern"
                value={selectedPattern}
                onChange={handlePatternChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
              >
                {CONSUMPTION_PATTERNS.map((pattern) => (
                  <option key={pattern.id} value={pattern.id}>
                    {pattern.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">قائمة الأجهزة</h2>
                <button
                  onClick={addDevice}
                  className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-1 ml-2" />
                  إضافة جهاز
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-right">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 text-sm font-semibold text-gray-600">الجهاز</th>
                      <th className="px-3 py-3 text-sm font-semibold text-gray-600">القدرة (واط)</th>
                      <th className="px-3 py-3 text-sm font-semibold text-gray-600">العدد</th>
                      <th className="px-3 py-3 text-sm font-semibold text-gray-600">ساعات العمل/يوم</th>
                      <th className="px-3 py-3 text-sm font-semibold text-gray-600 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {devices.map((device, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-3 py-3">
                          <input
                            type="text"
                            value={device.name}
                            onChange={(e) => handleDeviceNameChange(index, e.target.value)}
                            className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2"
                          />
                        </td>
                        <td className="px-3 py-3">
                          <input
                            type="number"
                            min="0"
                            value={device.power}
                            onChange={(e) => handleDeviceChange(index, 'power', e.target.value)}
                            className="w-24 bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2"
                          />
                        </td>
                        <td className="px-3 py-3">
                          <input
                            type="number"
                            min="0"
                            value={device.qty}
                            onChange={(e) => handleDeviceChange(index, 'qty', e.target.value)}
                            className="w-20 bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2"
                          />
                        </td>
                        <td className="px-3 py-3">
                          <input
                            type="number"
                            min="0"
                            max="24"
                            value={device.hours}
                            onChange={(e) => handleDeviceChange(index, 'hours', e.target.value)}
                            className="w-20 bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2"
                          />
                        </td>
                        <td className="px-3 py-3 text-center">
                          <button
                            onClick={() => removeDevice(index)}
                            className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50"
                            title="حذف"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {devices.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                          لا توجد أجهزة. يرجى إضافة أجهزة لحساب الاحتياجات.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 text-white sticky top-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Zap className="h-6 w-6 mr-2 ml-3" />
                نتائج الحساب
              </h2>

              {displayResults ? (
                <div className="space-y-6">

                  {/* Energy Consumption summary */}
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-blue-100 text-sm mb-1">الاستهلاك اليومي</p>
                    <p className="text-3xl font-bold">{(displayResults.totalWh / 1000).toFixed(2)} <span className="text-lg font-normal">kWh</span></p>
                    <div className="mt-2 text-sm text-blue-200">
                      الحمل الأقصى: {(displayResults.totalPowerW / 1000).toFixed(2)} kW
                    </div>
                  </div>

                  {/* System Requirements */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/20 pb-3">
                      <div className="flex items-center">
                        <Sun className="h-5 w-5 ml-2 text-yellow-300" />
                        <span className="font-medium">حجم النظام (الألواح)</span>
                      </div>
                      <span className="font-bold text-lg">{displayResults.systemSizeKW} kW</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/20 pb-3">
                      <div className="flex items-center">
                        <Battery className="h-5 w-5 ml-2 text-green-400" />
                        <span className="font-medium">سعة البطاريات</span>
                      </div>
                      <span className="font-bold text-lg">{displayResults.batteryCapacityAh} Ah</span>
                    </div>
                    <div className="text-xs text-blue-200 text-left -mt-2">@ {displayResults.systemVoltage}V</div>

                    <div className="flex items-center justify-between border-b border-white/20 pb-3">
                      <div className="flex items-center">
                        <Zap className="h-5 w-5 ml-2 text-blue-300" />
                        <span className="font-medium">حجم الانفرتر الموصى به</span>
                      </div>
                      <span className="font-bold text-lg">{displayResults.inverterSizeKW} kW</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-medium">عدد الألواح التقريبي (550W)</span>
                      <span className="font-bold text-xl">{displayResults.numberOfPanels}</span>
                    </div>
                  </div>

                  <div className="pt-4 text-xs text-blue-200 bg-white/5 p-3 rounded-lg mt-6">
                    ملاحظة: هذه الحسابات تقديرية وتعتمد على كفاءة 90% للانفرتر، ومتوسط سطوع شمس 5.5 ساعات، وعمق تفريغ 50% للبطاريات. يرجى استشارة مهندس مختص للتصميم النهائي.
                  </div>

                </div>
              ) : (
                <div className="text-center py-12 text-blue-100">
                  يرجى إضافة أجهزة لعرض النتائج
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
