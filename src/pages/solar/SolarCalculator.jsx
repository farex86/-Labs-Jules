import React, { useState, useEffect } from 'react';
import { CONSUMPTION_PATTERNS } from '../../lib/solar/constants';
import { calculateSolarSystem } from '../../lib/solar/calculator';

const SolarCalculator = () => {
  const [selectedPattern, setSelectedPattern] = useState(CONSUMPTION_PATTERNS[0].id);
  const [devices, setDevices] = useState([]);
  const [results, setResults] = useState(null);

  // Load default devices when pattern changes
  useEffect(() => {
    const pattern = CONSUMPTION_PATTERNS.find(p => p.id === selectedPattern);
    if (pattern) {
      setDevices(JSON.parse(JSON.stringify(pattern.defaultDevices))); // Deep copy
    }
  }, [selectedPattern]);

  // Recalculate when devices change
  useEffect(() => {
    const calc = calculateSolarSystem(devices);
    setResults(calc);
  }, [devices]);

  const handleDeviceChange = (index, field, value) => {
    const newDevices = [...devices];
    newDevices[index][field] = value;
    setDevices(newDevices);
  };

  const addDevice = () => {
    setDevices([...devices, { id: Date.now().toString(), name: 'جهاز جديد', power: 0, quantity: 1, hours: 0 }]);
  };

  const removeDevice = (index) => {
    const newDevices = devices.filter((_, i) => i !== index);
    setDevices(newDevices);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100" dir="rtl">
      {/* Header Navigation */}
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-bold">حاسبة الطاقة الشمسية</h1>
            <nav className="flex flex-wrap justify-center gap-4 text-sm font-medium">
              <a href="#" className="hover:text-primary-100 transition-colors">Installation companies</a>
              <a href="#" className="hover:text-primary-100 transition-colors">E shop</a>
              <a href="#" className="hover:text-primary-100 transition-colors">Finance</a>
              <a href="#" className="hover:text-primary-100 transition-colors">Blog</a>
              <a href="#" className="hover:text-primary-100 transition-colors">Training</a>
              <a href="#" className="hover:text-primary-100 transition-colors">Solar bidding</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Inputs */}
          <div className="lg:col-span-2 space-y-6">

            {/* Pattern Selection */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-bold mb-4">اختر نمط الاستهلاك</h2>
              <select
                className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                value={selectedPattern}
                onChange={(e) => setSelectedPattern(e.target.value)}
              >
                {CONSUMPTION_PATTERNS.map(pattern => (
                  <option key={pattern.id} value={pattern.id}>
                    {pattern.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Devices Table */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">الأجهزة الكهربائية</h2>
                <button
                  onClick={addDevice}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  إضافة جهاز
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm">
                      <th className="p-3 rounded-tr-lg">اسم الجهاز</th>
                      <th className="p-3">القدرة (واط)</th>
                      <th className="p-3">العدد</th>
                      <th className="p-3">ساعات التشغيل/يوم</th>
                      <th className="p-3 rounded-tl-lg text-center">حذف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {devices.map((device, index) => (
                      <tr key={index} className="border-b border-slate-200 dark:border-slate-700 last:border-0">
                        <td className="p-3">
                          <input
                            type="text"
                            className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
                            value={device.name}
                            onChange={(e) => handleDeviceChange(index, 'name', e.target.value)}
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="number"
                            min="0"
                            className="w-24 p-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
                            value={device.power}
                            onChange={(e) => handleDeviceChange(index, 'power', e.target.value)}
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="number"
                            min="1"
                            className="w-20 p-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
                            value={device.quantity}
                            onChange={(e) => handleDeviceChange(index, 'quantity', e.target.value)}
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="number"
                            min="0"
                            max="24"
                            className="w-24 p-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
                            value={device.hours}
                            onChange={(e) => handleDeviceChange(index, 'hours', e.target.value)}
                          />
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => removeDevice(index)}
                            className="text-red-500 hover:text-red-700 transition-colors p-2"
                            title="حذف"
                          >
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {devices.length === 0 && (
                      <tr>
                        <td colSpan="5" className="p-6 text-center text-slate-500 dark:text-slate-400">
                          لا توجد أجهزة مضافة.
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
            <div className="bg-primary text-white p-6 rounded-xl shadow-lg sticky top-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">solar_power</span>
                نتائج الحساب
              </h2>

              {results && (
                <div className="space-y-6">
                  <div className="bg-white/10 p-4 rounded-lg">
                    <p className="text-sm text-primary-100 mb-1">إجمالي الاستهلاك اليومي</p>
                    <p className="text-3xl font-bold font-mono">
                      {formatNumber(results.totalEnergyWh / 1000)} <span className="text-lg font-normal">كيلو واط ساعة (kWh)</span>
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-white/20 pb-3">
                      <span className="text-sm text-primary-100">سعة الانفرتر المطلوبة</span>
                      <span className="font-bold font-mono">{formatNumber(Math.ceil(results.inverterCapacityW / 1000))} kW</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-white/20 pb-3">
                      <span className="text-sm text-primary-100">عدد الألواح ({results.assumptions.panelWattage}W)</span>
                      <span className="font-bold font-mono">{results.numberOfPanels} لوح</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-white/20 pb-3">
                      <span className="text-sm text-primary-100">إجمالي قدرة الألواح</span>
                      <span className="font-bold font-mono">{formatNumber(results.totalPanelCapacityW)} W</span>
                    </div>

                    <div className="flex justify-between items-center pb-1">
                      <span className="text-sm text-primary-100">سعة البطاريات المطلوبة ({results.assumptions.voltage}V)</span>
                      <span className="font-bold font-mono">{formatNumber(results.batteryCapacityAh)} Ah</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/20">
                    <button className="w-full py-3 bg-white text-primary rounded-lg font-bold hover:bg-slate-100 transition-colors shadow-sm">
                      طلب تسعيرة للنظام
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SolarCalculator;
