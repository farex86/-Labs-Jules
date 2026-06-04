import React, { useState, useEffect } from 'react';
import { CONSUMPTION_PATTERNS } from '../../lib/solar/constants';
import { calculateSystemRequirements } from '../../lib/solar/calculator';
import { Calculator, Plus, Trash2, Zap, Battery, Sun, Wrench, Settings } from 'lucide-react';

export default function SolarCalculator() {
  const [selectedPattern, setSelectedPattern] = useState(CONSUMPTION_PATTERNS[0].id);
  const [devices, setDevices] = useState([...CONSUMPTION_PATTERNS[0].devices]);
  const [results, setResults] = useState(calculateSystemRequirements(CONSUMPTION_PATTERNS[0].devices));

  // Update devices when pattern changes
  useEffect(() => {
    const pattern = CONSUMPTION_PATTERNS.find(p => p.id === selectedPattern);
    if (pattern) {
      // Deep copy to avoid mutating constants
      setDevices(JSON.parse(JSON.stringify(pattern.devices)));
    }
  }, [selectedPattern]);

  // Recalculate when devices change
  useEffect(() => {
    setResults(calculateSystemRequirements(devices));
  }, [devices]);

  const handleDeviceChange = (index, field, value) => {
    const newDevices = [...devices];
    // Ensure numeric values
    const numValue = field === 'name' ? value : Math.max(0, Number(value) || 0);
    newDevices[index][field] = numValue;
    setDevices(newDevices);
  };

  const removeDevice = (index) => {
    const newDevices = [...devices];
    newDevices.splice(index, 1);
    setDevices(newDevices);
  };

  const addDevice = () => {
    setDevices([...devices, { id: Date.now().toString(), name: 'جهاز جديد', power: 100, quantity: 1, hours: 1 }]);
  };

  const formatNumber = (num) => {
    return Math.round(num).toLocaleString('en-US');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Header */}
          <div className="bg-blue-600 px-6 py-8 text-white text-center">
            <Calculator className="mx-auto h-12 w-12 mb-4 text-blue-100" />
            <h1 className="text-3xl font-bold">حاسبة الطاقة الشمسية</h1>
            <p className="mt-2 text-blue-100">احسب احتياجاتك من الطاقة الشمسية بناءً على نمط استهلاكك</p>
          </div>

          <div className="p-6 md:p-8">
            {/* Pattern Selection */}
            <div className="mb-8">
              <label htmlFor="pattern" className="block text-sm font-medium text-gray-700 mb-2">
                اختر نمط الاستهلاك (نوع المنشأة)
              </label>
              <select
                id="pattern"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg p-3 border"
                value={selectedPattern}
                onChange={(e) => setSelectedPattern(e.target.value)}
              >
                {CONSUMPTION_PATTERNS.map((pattern) => (
                  <option key={pattern.id} value={pattern.id}>
                    {pattern.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Devices List */}
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <Settings className="w-5 h-5 ml-2 text-blue-500" />
                    الأجهزة الكهربائية
                  </h2>
                  <button
                    onClick={addDevice}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="w-4 h-4 ml-1" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-100 text-sm font-medium text-gray-500">
                    <div className="col-span-4">اسم الجهاز</div>
                    <div className="col-span-2 text-center">القدرة (واط)</div>
                    <div className="col-span-2 text-center">العدد</div>
                    <div className="col-span-3 text-center">ساعات التشغيل</div>
                    <div className="col-span-1"></div>
                  </div>

                  <ul className="divide-y divide-gray-200">
                    {devices.map((device, index) => (
                      <li key={device.id || index} className="p-4 flex flex-col md:grid md:grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors">
                        <div className="col-span-4 w-full">
                          <label className="md:hidden block text-xs text-gray-500 mb-1">اسم الجهاز</label>
                          <input
                            type="text"
                            value={device.name}
                            onChange={(e) => handleDeviceChange(index, 'name', e.target.value)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                          />
                        </div>
                        <div className="col-span-2 w-full">
                          <label className="md:hidden block text-xs text-gray-500 mb-1">القدرة (واط)</label>
                          <input
                            type="number"
                            min="0"
                            value={device.power}
                            onChange={(e) => handleDeviceChange(index, 'power', e.target.value)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border text-center"
                          />
                        </div>
                        <div className="col-span-2 w-full">
                          <label className="md:hidden block text-xs text-gray-500 mb-1">العدد</label>
                          <input
                            type="number"
                            min="1"
                            value={device.quantity}
                            onChange={(e) => handleDeviceChange(index, 'quantity', e.target.value)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border text-center"
                          />
                        </div>
                        <div className="col-span-3 w-full">
                          <label className="md:hidden block text-xs text-gray-500 mb-1">ساعات التشغيل (يومياً)</label>
                          <input
                            type="number"
                            min="0"
                            max="24"
                            value={device.hours}
                            onChange={(e) => handleDeviceChange(index, 'hours', e.target.value)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border text-center"
                          />
                        </div>
                        <div className="col-span-1 w-full md:w-auto text-left">
                          <button
                            onClick={() => removeDevice(index)}
                            className="text-red-500 hover:text-red-700 p-2 md:p-0 w-full md:w-auto flex justify-center mt-2 md:mt-0 bg-red-50 md:bg-transparent rounded-md md:rounded-none"
                            title="حذف الجهاز"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </li>
                    ))}
                    {devices.length === 0 && (
                      <li className="p-8 text-center text-gray-500">
                        لا توجد أجهزة. قم بإضافة جهاز جديد.
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Results */}
              <div className="lg:col-span-1">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Zap className="w-5 h-5 ml-2 text-yellow-500" />
                  حجم النظام المطلوب
                </h2>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 shadow-inner space-y-6">

                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center text-blue-600 mb-2">
                      <Sun className="w-5 h-5 ml-2" />
                      <h3 className="font-semibold text-sm">الألواح الشمسية (قدرة التوليد)</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatNumber(results.solarCapacityW)} <span className="text-sm font-normal text-gray-500">واط</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">حوالي {formatNumber(results.solarCapacityW / 1000)} كيلو واط</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center text-green-600 mb-2">
                      <Wrench className="w-5 h-5 ml-2" />
                      <h3 className="font-semibold text-sm">حجم الانفرتر (المحول)</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatNumber(results.inverterSizeW)} <span className="text-sm font-normal text-gray-500">واط</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">حوالي {formatNumber(results.inverterSizeW / 1000)} كيلو واط</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center text-purple-600 mb-2">
                      <Battery className="w-5 h-5 ml-2" />
                      <h3 className="font-semibold text-sm">سعة البطاريات المطلوبة</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatNumber(results.batteryCapacityWh)} <span className="text-sm font-normal text-gray-500">واط.ساعة</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">حوالي {formatNumber(results.batteryCapacityWh / 1000)} كيلو واط.ساعة</p>
                  </div>

                  <div className="pt-4 border-t border-blue-200 mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">الاستهلاك اليومي:</span>
                      <span className="font-semibold text-gray-900">{formatNumber(results.dailyConsumptionWh / 1000)} كيلو واط.ساعة</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">أقصى حمل لحظي:</span>
                      <span className="font-semibold text-gray-900">{formatNumber(results.peakPowerW / 1000)} كيلو واط</span>
                    </div>
                  </div>

                </div>

                <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <strong>ملاحظة:</strong> هذه الحسابات تقديرية. تفترض 5 ساعات شمس ذروة، وكفاءة نظام 80%، وتفريغ بطاريات 50%. ينصح باستشارة مهندس مختص للحصول على تصميم دقيق.
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
