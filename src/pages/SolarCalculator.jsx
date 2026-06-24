import React, { useState } from 'react';
import { CONSUMPTION_PATTERNS } from '../data/consumptionPatterns';
import { runSolarCalculations } from '../utils/solarCalculatorLogic';
import { Plus, Trash2, Calculator, Settings, Sun, Battery, Zap } from 'lucide-react';

const SolarCalculator = () => {
  const [selectedPattern, setSelectedPattern] = useState(CONSUMPTION_PATTERNS[0].id);
  const [devices, setDevices] = useState([...CONSUMPTION_PATTERNS[0].defaultDevices]);
  const [daysOfAutonomy, setDaysOfAutonomy] = useState(1);

  // Update devices when a new pattern is selected
  const handlePatternChange = (patternId) => {
    setSelectedPattern(patternId);
    const pattern = CONSUMPTION_PATTERNS.find(p => p.id === patternId);
    if (pattern) {
      setDevices(JSON.parse(JSON.stringify(pattern.defaultDevices))); // Deep copy
    }
  };

  // Recalculate directly instead of using useEffect
  const currentResults = devices.length > 0 ? runSolarCalculations(devices, daysOfAutonomy) : null;

  const handleDeviceChange = (index, field, value) => {
    const newDevices = [...devices];
    // Convert numerical inputs, keep name as string
    newDevices[index][field] = field === 'name' ? value : Number(value);
    setDevices(newDevices);
  };

  const addDevice = () => {
    setDevices([...devices, { name: 'جهاز جديد', quantity: 1, powerW: 100, hoursPerDay: 4 }]);
  };

  const removeDevice = (index) => {
    const newDevices = devices.filter((_, i) => i !== index);
    setDevices(newDevices);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <Calculator size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">حاسبة الطاقة الشمسية</h1>
              <p className="text-gray-500">احسب متطلبات النظام الشمسي بناءً على نمط استهلاكك</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">

            {/* Pattern Selection */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Settings size={20} className="text-gray-400" />
                اختر نمط الاستهلاك
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {CONSUMPTION_PATTERNS.map((pattern) => (
                  <button
                    key={pattern.id}
                    onClick={() => handlePatternChange(pattern.id)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                      selectedPattern === pattern.id
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50/50'
                    }`}
                  >
                    {pattern.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Devices List */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">الأجهزة الكهربائية</h2>
                <button
                  onClick={addDevice}
                  className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg"
                >
                  <Plus size={16} />
                  إضافة جهاز
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500 text-sm">
                      <th className="pb-3 font-medium">اسم الجهاز</th>
                      <th className="pb-3 font-medium">العدد</th>
                      <th className="pb-3 font-medium">القدرة (واط)</th>
                      <th className="pb-3 font-medium">ساعات التشغيل/يوم</th>
                      <th className="pb-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {devices.map((device, index) => (
                      <tr key={index} className="group">
                        <td className="py-3 pr-2">
                          <input
                            type="text"
                            value={device.name}
                            onChange={(e) => handleDeviceChange(index, 'name', e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="py-3 pr-2 w-20">
                          <input
                            type="number"
                            min="1"
                            value={device.quantity}
                            onChange={(e) => handleDeviceChange(index, 'quantity', e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="py-3 pr-2 w-28">
                          <input
                            type="number"
                            min="1"
                            value={device.powerW}
                            onChange={(e) => handleDeviceChange(index, 'powerW', e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="py-3 pr-2 w-28">
                          <input
                            type="number"
                            min="1"
                            max="24"
                            value={device.hoursPerDay}
                            onChange={(e) => handleDeviceChange(index, 'hoursPerDay', e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="py-3 pl-2 text-left">
                          <button
                            onClick={() => removeDevice(index)}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {devices.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    لا توجد أجهزة مضافة.
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between border-t pt-4">
                <label className="font-medium text-gray-700">أيام الاستقلالية (غياب الشمس):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="7"
                    value={daysOfAutonomy}
                    onChange={(e) => setDaysOfAutonomy(Number(e.target.value))}
                    className="w-20 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <span className="text-gray-500 text-sm">يوم</span>
                </div>
              </div>

            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-8">
              <h2 className="text-xl font-bold mb-6">النتائج المقدرة</h2>

              {currentResults ? (
                <div className="space-y-6">

                  {/* Energy Consumption */}
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2 text-blue-800 mb-2">
                      <Zap size={20} />
                      <h3 className="font-semibold">الاستهلاك اليومي</h3>
                    </div>
                    <p className="text-3xl font-bold text-blue-900">
                      {currentResults.totalDailyEnergyKWh.toFixed(1)} <span className="text-sm font-normal text-blue-700">kWh/يوم</span>
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      قدرة الذروة: {(currentResults.peakPowerW / 1000).toFixed(1)} kW
                    </p>
                  </div>

                  {/* Solar Array */}
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <div className="flex items-center gap-2 text-orange-800 mb-2">
                      <Sun size={20} />
                      <h3 className="font-semibold">الألواح الشمسية المطلوبة</h3>
                    </div>
                    <p className="text-3xl font-bold text-orange-900">
                      {currentResults.solarArraySizeKW.toFixed(1)} <span className="text-sm font-normal text-orange-700">kW</span>
                    </p>
                    <p className="text-sm text-orange-600 mt-1">
                      تقريباً {Math.ceil(currentResults.solarArraySizeW / 550)} لوح (بقدرة 550W)
                    </p>
                  </div>

                  {/* Inverter */}
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <div className="flex items-center gap-2 text-green-800 mb-2">
                      <Settings size={20} />
                      <h3 className="font-semibold">حجم الانفرتر الموصى به</h3>
                    </div>
                    <p className="text-3xl font-bold text-green-900">
                      {currentResults.inverterSizeKW.toFixed(1)} <span className="text-sm font-normal text-green-700">kW</span>
                    </p>
                  </div>

                  {/* Battery */}
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <div className="flex items-center gap-2 text-purple-800 mb-2">
                      <Battery size={20} />
                      <h3 className="font-semibold">سعة البطاريات المطلوبة</h3>
                    </div>
                    <p className="text-3xl font-bold text-purple-900">
                      {Math.ceil(currentResults.batteryCapacityAh)} <span className="text-sm font-normal text-purple-700">Ah</span>
                    </p>
                    <p className="text-sm text-purple-600 mt-1">
                      على نظام {currentResults.systemVoltage}V
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 text-xs text-gray-400 text-center">
                    هذه حسابات تقديرية. يرجى استشارة مهندس مختص للحصول على تصميم دقيق.
                  </div>

                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <Calculator size={48} className="mx-auto mb-4 opacity-20" />
                  <p>قم بإضافة أجهزة لرؤية النتائج</p>
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
