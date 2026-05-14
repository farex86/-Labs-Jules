import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Calculator, Settings, Sun, Battery, Zap } from 'lucide-react';
import { CONSUMPTION_PATTERNS } from '../lib/solarCalculatorConfig';
import {
  calculateDailyEnergy,
  calculatePeakPower,
  calculateInverterSize,
  calculateSolarSystem
} from '../lib/solarCalculatorLogic';

const SolarCalculator = () => {
  const [selectedPatternId, setSelectedPatternId] = useState(CONSUMPTION_PATTERNS[0].id);
  const [devices, setDevices] = useState([]);

  // Load default devices when a pattern is selected
  useEffect(() => {
    const pattern = CONSUMPTION_PATTERNS.find(p => p.id === selectedPatternId);
    if (pattern) {
      // Create a deep copy to avoid mutating the original config
      // Use setTimeOut to push state update to end of event queue to prevent cascading render error in lint
      setTimeout(() => setDevices(JSON.parse(JSON.stringify(pattern.defaultDevices))), 0);
    }
  }, [selectedPatternId]);

  const handleDeviceChange = (index, field, value) => {
    const updatedDevices = [...devices];
    // Ensure numeric values for power, quantity, and hours
    if (field === 'power' || field === 'quantity' || field === 'hours') {
      value = parseFloat(value) || 0;
    }
    updatedDevices[index][field] = value;
    setDevices(updatedDevices);
  };

  const addDevice = () => {
    setDevices([
      ...devices,
      { id: `custom_${Date.now()}`, name: 'جهاز جديد', power: 100, quantity: 1, hours: 1 }
    ]);
  };

  const removeDevice = (index) => {
    const updatedDevices = [...devices];
    updatedDevices.splice(index, 1);
    setDevices(updatedDevices);
  };

  // Memoize calculations to prevent unnecessary re-computations
  const results = useMemo(() => {
    const dailyEnergyWh = calculateDailyEnergy(devices);
    const peakPowerW = calculatePeakPower(devices);
    const inverterKW = calculateInverterSize(peakPowerW);
    const system = calculateSolarSystem(dailyEnergyWh);

    return {
      dailyEnergyWh,
      peakPowerW,
      inverterKW,
      ...system
    };
  }, [devices]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 rtl" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div className="flex items-center space-x-4 space-x-reverse mb-8">
          <div className="p-3 bg-blue-600 rounded-lg">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">حاسبة الطاقة الشمسية</h1>
            <p className="text-gray-500 mt-1">احسب احتياجاتك من الطاقة الشمسية بناءً على نمط استهلاكك</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column: Input Settings */}
          <div className="lg:col-span-2 space-y-6">

            {/* Pattern Selection */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                <Settings className="w-5 h-5 text-gray-500" />
                <h2 className="text-xl font-semibold">اختر نمط الاستهلاك</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {CONSUMPTION_PATTERNS.map((pattern) => (
                  <button
                    key={pattern.id}
                    onClick={() => setSelectedPatternId(pattern.id)}
                    className={`p-3 rounded-lg text-sm text-center transition-all ${
                      selectedPatternId === pattern.id
                        ? 'bg-blue-50 border-2 border-blue-600 text-blue-700 font-medium'
                        : 'bg-gray-50 border border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50/50'
                    }`}
                  >
                    {pattern.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Devices List */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">الأجهزة الكهربائية</h2>
                <button
                  onClick={addDevice}
                  className="flex items-center space-x-1 space-x-reverse text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة جهاز</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500">
                      <th className="pb-3 font-medium">اسم الجهاز</th>
                      <th className="pb-3 font-medium">الاستهلاك (واط)</th>
                      <th className="pb-3 font-medium">العدد</th>
                      <th className="pb-3 font-medium">ساعات التشغيل/يوم</th>
                      <th className="pb-3 font-medium text-center">إجراء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {devices.map((device, index) => (
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={device.id || index}
                      >
                        <td className="py-3 pr-2">
                          <input
                            type="text"
                            value={device.name}
                            onChange={(e) => handleDeviceChange(index, 'name', e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            value={device.power}
                            min="0"
                            onChange={(e) => handleDeviceChange(index, 'power', e.target.value)}
                            className="w-24 bg-gray-50 border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            value={device.quantity}
                            min="1"
                            onChange={(e) => handleDeviceChange(index, 'quantity', e.target.value)}
                            className="w-16 bg-gray-50 border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            value={device.hours}
                            min="0"
                            max="24"
                            onChange={(e) => handleDeviceChange(index, 'hours', e.target.value)}
                            className="w-16 bg-gray-50 border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
                          />
                        </td>
                        <td className="py-3 text-center">
                          <button
                            onClick={() => removeDevice(index)}
                            className="text-red-400 hover:text-red-600 transition-colors p-1"
                            title="حذف"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                    {devices.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-8 text-gray-500">
                          لا توجد أجهزة مضافة. الرجاء إضافة جهاز لحساب الاستهلاك.
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
            <div className="bg-blue-600 rounded-xl p-6 text-white shadow-lg sticky top-6">
              <h2 className="text-xl font-bold mb-6 flex items-center space-x-2 space-x-reverse">
                <Zap className="w-5 h-5" />
                <span>النتائج التقديرية للنظام</span>
              </h2>

              <div className="space-y-6">
                <div className="bg-blue-700/50 p-4 rounded-lg backdrop-blur-sm">
                  <div className="text-blue-100 text-sm mb-1">الاستهلاك اليومي</div>
                  <div className="text-3xl font-bold">
                    {results.dailyEnergyKWh} <span className="text-lg font-normal text-blue-200">كيلو واط/ساعة</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-blue-500/30 pb-3">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Sun className="w-5 h-5 text-yellow-300" />
                      <span className="text-blue-50">حجم الألواح المطلوبة</span>
                    </div>
                    <div className="font-semibold text-lg">{results.arraySizeKW} kW</div>
                  </div>

                  <div className="flex items-center justify-between border-b border-blue-500/30 pb-3">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-5 h-5 border-2 border-yellow-300 rounded flex items-center justify-center">
                        <div className="w-1 h-3 bg-yellow-300"></div>
                      </div>
                      <span className="text-blue-50">عدد الألواح ({results.panelWattage}W)</span>
                    </div>
                    <div className="font-semibold text-lg">{results.numberOfPanels} لوح</div>
                  </div>

                  <div className="flex items-center justify-between border-b border-blue-500/30 pb-3">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Battery className="w-5 h-5 text-green-300" />
                      <span className="text-blue-50">سعة البطاريات المطلوبة</span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-lg">{results.batteryCapacityKWh} kWh</div>
                      <div className="text-xs text-blue-200">{results.batteryAh} Ah @ {results.systemVoltage}V</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Zap className="w-5 h-5 text-orange-300" />
                      <span className="text-blue-50">حجم الإنفرتر المقترح</span>
                    </div>
                    <div className="font-semibold text-lg">{results.inverterKW.toFixed(1)} kW</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-xs text-blue-200 bg-blue-800/40 p-3 rounded-lg leading-relaxed">
                * هذه الحسابات تقديرية مبنية على متوسط ساعات سطوع الشمس (5.5 ساعات) وكفاءة النظام القياسية. قد تختلف المتطلبات الفعلية بناءً على الموقع الجغرافي وظروف التثبيت.
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default SolarCalculator;
