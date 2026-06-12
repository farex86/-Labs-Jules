import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Zap, Battery, Sun } from 'lucide-react';
import { CONSUMPTION_PATTERNS } from '../lib/solarCalculatorConfig';
import { calculateSystemRequirements } from '../lib/solarCalculatorLogic';

export default function SolarCalculator() {
  const [selectedPatternId, setSelectedPatternId] = useState(CONSUMPTION_PATTERNS[0].id);
  const [devices, setDevices] = useState(JSON.parse(JSON.stringify(CONSUMPTION_PATTERNS[0].devices)));

  // Calculate results on the fly during render, instead of storing in state and updating in useEffect
  const results = calculateSystemRequirements(devices);

  const handlePatternChange = (e) => {
    const newPatternId = e.target.value;
    setSelectedPatternId(newPatternId);
    const pattern = CONSUMPTION_PATTERNS.find(p => p.id === newPatternId);
    if (pattern) {
      setDevices(JSON.parse(JSON.stringify(pattern.devices)));
    }
  };

  const handleDeviceChange = (id, field, value) => {
    setDevices(devices.map(device => {
      if (device.id === id) {
        return { ...device, [field]: value };
      }
      return device;
    }));
  };

  const removeDevice = (id) => {
    setDevices(devices.filter(d => d.id !== id));
  };

  const addDevice = () => {
    const newId = Date.now().toString();
    setDevices([...devices, { id: newId, name: 'جهاز جديد', power: 100, quantity: 1, hours: 1 }]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-emerald-600 p-6 text-white flex justify-between items-center">
          <Link to="/login" className="flex items-center hover:bg-emerald-700 p-2 rounded transition">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Login
          </Link>
          <div className="text-right">
            <h1 className="text-2xl font-bold">حاسبة الطاقة الشمسية</h1>
            <p className="text-emerald-100 mt-1">احسب احتياجاتك من الطاقة الشمسية بناءً على نمط استهلاكك</p>
          </div>
        </div>

        <div className="p-8 flex flex-col lg:flex-row gap-8">

          {/* Left Column: Input Form */}
          <div className="flex-1">
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2 text-right" dir="rtl">اختر نمط الاستهلاك:</label>
              <select
                value={selectedPatternId}
                onChange={handlePatternChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-right"
                dir="rtl"
              >
                {CONSUMPTION_PATTERNS.map(pattern => (
                  <option key={pattern.id} value={pattern.id}>{pattern.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4 flex justify-between items-center">
              <button
                onClick={addDevice}
                className="flex items-center text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg hover:bg-emerald-100 transition"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Device
              </button>
              <h3 className="text-lg font-bold text-gray-800 text-right" dir="rtl">الأجهزة:</h3>
            </div>

            <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden mb-6">
              <table className="min-w-full divide-y divide-gray-200 text-right" dir="rtl">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-sm font-medium text-gray-600">الجهاز</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-600">القدرة (واط)</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-600">العدد</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-600">ساعات العمل</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {devices.map((device) => (
                    <tr key={device.id}>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={device.name}
                          onChange={(e) => handleDeviceChange(device.id, 'name', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={device.power}
                          onChange={(e) => handleDeviceChange(device.id, 'power', Number(e.target.value))}
                          className="w-20 p-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={device.quantity}
                          onChange={(e) => handleDeviceChange(device.id, 'quantity', Number(e.target.value))}
                          className="w-16 p-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={device.hours}
                          onChange={(e) => handleDeviceChange(device.id, 'hours', Number(e.target.value))}
                          className="w-16 p-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500"
                        />
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => removeDevice(device.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {devices.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                        لا توجد أجهزة. أضف جهازاً للبدء.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="w-full lg:w-80 bg-gray-800 rounded-2xl p-6 text-white shadow-inner flex flex-col">
            <h2 className="text-xl font-bold mb-6 text-center border-b border-gray-700 pb-4" dir="rtl">النتائج التقديرية</h2>

            {results && (
              <div className="space-y-6 flex-1">
                <div className="bg-gray-700 p-4 rounded-xl flex items-center justify-between">
                  <div className="bg-yellow-500/20 p-3 rounded-full">
                    <Zap className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">حجم الانفرتر المطلوب</p>
                    <p className="text-2xl font-bold">{results.recommendedInverterKW} kW</p>
                  </div>
                </div>

                <div className="bg-gray-700 p-4 rounded-xl flex items-center justify-between">
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <Sun className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">عدد الألواح الشمسية</p>
                    <p className="text-2xl font-bold">{results.recommendedPanels} <span className="text-sm font-normal text-gray-300">لوح</span></p>
                    <p className="text-xs text-gray-400 mt-1">بقدرة 550W للوح</p>
                  </div>
                </div>

                <div className="bg-gray-700 p-4 rounded-xl flex items-center justify-between">
                  <div className="bg-emerald-500/20 p-3 rounded-full">
                    <Battery className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">عدد البطاريات</p>
                    <p className="text-2xl font-bold">{results.recommendedBatteries} <span className="text-sm font-normal text-gray-300">بطارية</span></p>
                    <p className="text-xs text-gray-400 mt-1">سعة 200Ah / 12V</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-700">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>{Math.round(results.totalDailyEnergyWh / 1000)} kWh</span>
                    <span dir="rtl">الاستهلاك اليومي:</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{Math.round(results.peakLoadW / 1000)} kW</span>
                    <span dir="rtl">أقصى حمل:</span>
                  </div>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-500 text-center mt-6" dir="rtl">
              *هذه حسابات تقديرية وتعتمد على كفاءة النظام والعوامل الجوية. يُنصح باستشارة مهندس مختص.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
