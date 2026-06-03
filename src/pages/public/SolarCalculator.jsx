import React, { useState, useMemo } from 'react';
import { CONSUMPTION_PATTERNS } from '../../lib/solar-calculator/constants.js';
import { calculateSolarSystem } from '../../lib/solar-calculator/calculator.js';
import { Calculator, Plus, Trash2, Battery, Sun, Zap, Info } from 'lucide-react';

export default function SolarCalculator() {
  const [selectedPatternId, setSelectedPatternId] = useState(CONSUMPTION_PATTERNS[0].id);
  const [customDevices, setCustomDevices] = useState([]);

  // When pattern changes, initialize with default devices for that pattern
  React.useEffect(() => {
    const pattern = CONSUMPTION_PATTERNS.find(p => p.id === selectedPatternId);
    if (pattern && pattern.devices) {
      setCustomDevices(JSON.parse(JSON.stringify(pattern.devices)));
    } else {
      setCustomDevices([]);
    }
  }, [selectedPatternId]);

  const handleDeviceChange = (id, field, value) => {
    setCustomDevices(prev =>
      prev.map(d => d.id === id ? { ...d, [field]: value } : d)
    );
  };

  const addDevice = () => {
    const newId = `custom_${Date.now()}`;
    setCustomDevices(prev => [
      ...prev,
      { id: newId, name: 'جهاز جديد (New Device)', powerW: 100, qty: 1, hoursPerDay: 4 }
    ]);
  };

  const removeDevice = (id) => {
    setCustomDevices(prev => prev.filter(d => d.id !== id));
  };

  const results = useMemo(() => calculateSolarSystem(customDevices), [customDevices]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Calculator className="h-8 w-8 text-blue-600" />
          حاسبة الطاقة الشمسية (Solar Calculator)
        </h1>
        <p className="mt-2 text-gray-600">
          اختر نمط الاستهلاك أو أضف أجهزتك لحساب حجم النظام الشمسي المطلوب.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">نمط الاستهلاك (Consumption Pattern)</h2>
            <select
              value={selectedPatternId}
              onChange={(e) => setSelectedPatternId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {CONSUMPTION_PATTERNS.map(pattern => (
                <option key={pattern.id} value={pattern.id}>
                  {pattern.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">الأجهزة (Devices)</h2>
              <button
                onClick={addDevice}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Plus className="h-4 w-4" />
                إضافة جهاز (Add Device)
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-600">
                    <th className="pb-3 font-medium">اسم الجهاز (Device Name)</th>
                    <th className="pb-3 font-medium">الاستهلاك (Power W)</th>
                    <th className="pb-3 font-medium">العدد (Quantity)</th>
                    <th className="pb-3 font-medium">ساعات العمل (Hours/Day)</th>
                    <th className="pb-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {customDevices.map((device) => (
                    <tr key={device.id}>
                      <td className="py-4 pr-2">
                        <input
                          type="text"
                          value={device.name}
                          onChange={(e) => handleDeviceChange(device.id, 'name', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-4 pr-2">
                        <input
                          type="number"
                          value={device.powerW}
                          onChange={(e) => handleDeviceChange(device.id, 'powerW', Number(e.target.value))}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-4 pr-2">
                        <input
                          type="number"
                          value={device.qty}
                          onChange={(e) => handleDeviceChange(device.id, 'qty', Number(e.target.value))}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-4 pr-2">
                        <input
                          type="number"
                          value={device.hoursPerDay}
                          onChange={(e) => handleDeviceChange(device.id, 'hoursPerDay', Number(e.target.value))}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-4 pr-2 text-left">
                        <button
                          onClick={() => removeDevice(device.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {customDevices.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-500">
                        لم يتم إضافة أجهزة. (No devices added)
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-md text-white p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Info className="h-6 w-6" />
              النتائج المقدرة (Estimated Results)
            </h2>

            <div className="space-y-6">
              <div>
                <p className="text-blue-200 text-sm mb-1">الاستهلاك اليومي الكلي (Total Daily Energy)</p>
                <div className="text-2xl font-bold flex items-end gap-1">
                  {(results.totalDailyEnergyWh / 1000).toFixed(2)} <span className="text-lg font-normal">kWh</span>
                </div>
              </div>

              <div>
                <p className="text-blue-200 text-sm mb-1">الحمل الأقصى (Peak Load)</p>
                <div className="text-2xl font-bold flex items-end gap-1">
                  {results.totalPowerW} <span className="text-lg font-normal">W</span>
                </div>
              </div>

              <div className="h-px bg-blue-500/50 my-4"></div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-500/30 p-3 rounded-lg">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-blue-200 text-sm">حجم الانفرتر المقترح (Suggested Inverter)</p>
                  <p className="font-semibold text-lg">{Math.ceil(results.inverterSizeW / 1000)} kW</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-500/30 p-3 rounded-lg">
                  <Sun className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-blue-200 text-sm">حجم الألواح الشمسية (Solar Array Size)</p>
                  <p className="font-semibold text-lg">{(results.panelArrayW / 1000).toFixed(1)} kWp</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-500/30 p-3 rounded-lg">
                  <Battery className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-blue-200 text-sm">سعة البطاريات المطلوبة (Required Battery Bank)</p>
                  <p className="font-semibold text-lg">{Math.ceil(results.requiredBatteryCapacityWh / 1000)} kWh</p>
                  <p className="text-blue-200 text-sm mt-1">@ {results.systemVoltage}V ({Math.ceil(results.requiredBatteryCapacityAh)} Ah)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
