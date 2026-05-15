import React, { useState } from 'react';
import { consumptionPatterns, getPatternDevices } from '../../lib/solar/solarConfig';
import { performSolarCalculations } from '../../lib/solar/solarFormulas';
import {
  Calculator,
  Sun,
  Battery,
  Zap,
  Plus,
  Trash2,
  Activity,
  ArrowRight
} from 'lucide-react';

export default function SolarCalculator() {
  const [selectedPattern, setSelectedPattern] = useState('');
  const [devices, setDevices] = useState([]);

  // Calculate results dynamically without state/effect
  const results = devices.length > 0 ? performSolarCalculations(devices) : null;

  const handlePatternChange = (e) => {
    const pattern = e.target.value;
    setSelectedPattern(pattern);
    if (pattern) {
      setDevices(getPatternDevices(pattern));
    } else {
      setDevices([]);
    }
  };

  const handleDeviceChange = (id, field, value) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === id ? { ...device, [field]: value } : device
      )
    );
  };

  const addDevice = () => {
    const newId = devices.length > 0 ? Math.max(...devices.map(d => d.id)) + 1 : 1;
    setDevices([...devices, { id: newId, name: 'جهاز جديد', quantity: 1, power: 100, hours: 5 }]);
  };

  const removeDevice = (id) => {
    setDevices(devices.filter(device => device.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex items-center space-x-4 space-x-reverse">
          <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg text-amber-600 dark:text-amber-400">
            <Calculator size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">حاسبة الطاقة الشمسية</h1>
            <p className="text-gray-500 dark:text-gray-400">احسب احتياجاتك من الطاقة الشمسية بناءً على نمط استهلاكك</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Input Area */}
          <div className="lg:col-span-2 space-y-6">

            {/* Pattern Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">نمط الاستهلاك</h2>
              <select
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={selectedPattern}
                onChange={handlePatternChange}
              >
                <option value="">-- اختر نمط الاستهلاك --</option>
                {consumptionPatterns.map(pattern => (
                  <option key={pattern.id} value={pattern.id}>
                    {pattern.name} ({pattern.nameEn})
                  </option>
                ))}
              </select>
            </div>

            {/* Devices Table */}
            {selectedPattern && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">الأجهزة والأحمال</h2>
                  <button
                    onClick={addDevice}
                    className="flex items-center space-x-2 space-x-reverse text-sm bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400 px-3 py-2 rounded-lg transition-colors"
                  >
                    <Plus size={16} />
                    <span>إضافة جهاز</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                        <th className="pb-3 font-medium">اسم الجهاز</th>
                        <th className="pb-3 font-medium">الكمية</th>
                        <th className="pb-3 font-medium">القدرة (واط)</th>
                        <th className="pb-3 font-medium">ساعات التشغيل (يومياً)</th>
                        <th className="pb-3 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {devices.map(device => (
                        <tr key={device.id}>
                          <td className="py-3 pr-2">
                            <input
                              type="text"
                              value={device.name}
                              onChange={(e) => handleDeviceChange(device.id, 'name', e.target.value)}
                              className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded bg-transparent text-gray-900 dark:text-white"
                            />
                          </td>
                          <td className="py-3 px-2">
                            <input
                              type="number"
                              min="1"
                              value={device.quantity}
                              onChange={(e) => handleDeviceChange(device.id, 'quantity', e.target.value)}
                              className="w-20 p-2 border border-gray-200 dark:border-gray-600 rounded bg-transparent text-gray-900 dark:text-white"
                            />
                          </td>
                          <td className="py-3 px-2">
                            <input
                              type="number"
                              min="0"
                              value={device.power}
                              onChange={(e) => handleDeviceChange(device.id, 'power', e.target.value)}
                              className="w-24 p-2 border border-gray-200 dark:border-gray-600 rounded bg-transparent text-gray-900 dark:text-white"
                            />
                          </td>
                          <td className="py-3 px-2">
                            <input
                              type="number"
                              min="0" max="24"
                              value={device.hours}
                              onChange={(e) => handleDeviceChange(device.id, 'hours', e.target.value)}
                              className="w-20 p-2 border border-gray-200 dark:border-gray-600 rounded bg-transparent text-gray-900 dark:text-white"
                            />
                          </td>
                          <td className="py-3 pl-2 text-left">
                            <button
                              onClick={() => removeDevice(device.id)}
                              className="text-red-400 hover:text-red-600 p-2"
                              title="حذف الجهاز"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {devices.length === 0 && (
                        <tr>
                          <td colSpan="5" className="py-8 text-center text-gray-500">
                            لا توجد أجهزة. قم بإضافة جهاز للبدء بالحساب.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Results Area */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg p-6 text-white sticky top-6">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Activity className="ml-2" />
                متطلبات النظام الشمسي
              </h2>

              {!results ? (
                <div className="text-amber-100 text-center py-10 opacity-80">
                  <Calculator size={48} className="mx-auto mb-4 opacity-50" />
                  <p>الرجاء اختيار نمط استهلاك وإضافة أجهزة لحساب المتطلبات.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Daily Energy */}
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-amber-100 text-sm">الاستهلاك اليومي</span>
                      <Zap size={16} className="text-amber-200" />
                    </div>
                    <div className="text-3xl font-bold">
                      {results.dailyEnergyKwh} <span className="text-lg font-normal text-amber-200">kWh</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {/* Inverter */}
                    <div className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <div className="text-amber-100 text-sm mb-1">حجم الانفرتر</div>
                        <div className="text-xl font-bold">
                          {results.inverterSizeKw} <span className="text-sm font-normal text-amber-200">kW</span>
                        </div>
                      </div>
                      <div className="bg-white/20 p-2 rounded-full">
                        <Activity size={20} />
                      </div>
                    </div>

                    {/* Panels */}
                    <div className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <div className="text-amber-100 text-sm mb-1">سعة الألواح</div>
                        <div className="text-xl font-bold">
                          {results.panelSizeKw} <span className="text-sm font-normal text-amber-200">kW</span>
                        </div>
                      </div>
                      <div className="bg-white/20 p-2 rounded-full">
                        <Sun size={20} />
                      </div>
                    </div>

                    {/* Battery */}
                    <div className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <div className="text-amber-100 text-sm mb-1">سعة البطاريات</div>
                        <div className="text-xl font-bold">
                          {results.batterySizeKwh} <span className="text-sm font-normal text-amber-200">kWh</span>
                        </div>
                      </div>
                      <div className="bg-white/20 p-2 rounded-full">
                        <Battery size={20} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20 text-xs text-amber-100">
                    * هذه الحسابات تقريبية وتم إضافة هامش أمان بنسبة 25٪ للانفرتر، وتعتمد على 5.5 ساعات ذروة شمسية للألواح.
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
