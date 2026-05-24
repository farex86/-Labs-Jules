import React, { useState, useMemo } from 'react';
import { CONSUMPTION_PATTERNS } from '../../lib/solar/solarConstants';
import { calculateSolarSystem } from '../../lib/solar/solarCalculator';
import {
  Calculator,
  Sun,
  Battery,
  Zap,
  Plus,
  Trash2,
  AlertCircle
} from 'lucide-react';

const SolarCalculator = () => {
  const [selectedPatternId, setSelectedPatternId] = useState('');
  const [devices, setDevices] = useState([]);

  // Handle pattern selection
  const handlePatternChange = (e) => {
    const patternId = e.target.value;
    setSelectedPatternId(patternId);

    if (patternId) {
      const pattern = CONSUMPTION_PATTERNS.find(p => p.id === patternId);
      if (pattern) {
        // Create a deep copy to avoid mutating the constants
        setDevices(JSON.parse(JSON.stringify(pattern.defaultDevices)));
      }
    } else {
      setDevices([]);
    }
  };

  // Handle device updates
  const updateDevice = (id, field, value) => {
    setDevices(devices.map(device => {
      if (device.id === id) {
        return { ...device, [field]: Number(value) };
      }
      return device;
    }));
  };

  // Add a new custom device
  const addDevice = () => {
    const newId = devices.length > 0 ? Math.max(...devices.map(d => d.id)) + 1 : 1;
    setDevices([...devices, { id: newId, name: 'جهاز جديد', power: 0, quantity: 1, hours: 0 }]);
  };

  // Remove a device
  const removeDevice = (id) => {
    setDevices(devices.filter(device => device.id !== id));
  };

  const updateDeviceName = (id, value) => {
    setDevices(devices.map(device => {
      if (device.id === id) {
        return { ...device, name: value };
      }
      return device;
    }));
  };

  // Recalculate whenever devices change
  const results = useMemo(() => {
    if (devices.length > 0) {
      return calculateSolarSystem(devices);
    }
    return null;
  }, [devices]);

  // Format numbers for display
  const formatNumber = (num, decimals = 1) => {
    return new Intl.NumberFormat('ar-EG', { maximumFractionDigits: decimals }).format(num);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="bg-primary/10 p-3 rounded-xl text-primary">
            <Calculator className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">حاسبة الطاقة الشمسية</h1>
            <p className="text-slate-500 dark:text-slate-400">احسب حجم النظام الشمسي المناسب لاحتياجاتك</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">

            {/* Pattern Selection */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                اختر نمط الاستهلاك
              </label>
              <select
                value={selectedPatternId}
                onChange={handlePatternChange}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="">-- اختر النمط --</option>
                {CONSUMPTION_PATTERNS.map(pattern => (
                  <option key={pattern.id} value={pattern.id}>
                    {pattern.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Devices Table */}
            {devices.length > 0 && (
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white">الأجهزة والأحمال</h2>
                  <button
                    onClick={addDevice}
                    className="flex items-center gap-2 text-sm bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead className="bg-slate-50 dark:bg-slate-900/50">
                      <tr>
                        <th className="p-3 rounded-r-lg font-semibold text-slate-600 dark:text-slate-300 text-sm">الجهاز</th>
                        <th className="p-3 font-semibold text-slate-600 dark:text-slate-300 text-sm w-24">العدد</th>
                        <th className="p-3 font-semibold text-slate-600 dark:text-slate-300 text-sm w-32">القدرة (واط)</th>
                        <th className="p-3 font-semibold text-slate-600 dark:text-slate-300 text-sm w-32">ساعات العمل</th>
                        <th className="p-3 rounded-l-lg w-12"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                      {devices.map(device => (
                        <tr key={device.id}>
                          <td className="p-3">
                            <input
                              type="text"
                              value={device.name}
                              onChange={(e) => updateDeviceName(device.id, e.target.value)}
                              className="w-full bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-600 focus:border-primary focus:outline-none px-2 py-1 text-slate-700 dark:text-slate-200 transition-colors"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              min="1"
                              value={device.quantity}
                              onChange={(e) => updateDevice(device.id, 'quantity', e.target.value)}
                              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-center focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-700 dark:text-slate-200"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              min="0"
                              value={device.power}
                              onChange={(e) => updateDevice(device.id, 'power', e.target.value)}
                              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-center focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-700 dark:text-slate-200"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              min="0"
                              max="24"
                              value={device.hours}
                              onChange={(e) => updateDevice(device.id, 'hours', e.target.value)}
                              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-center focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-700 dark:text-slate-200"
                            />
                          </td>
                          <td className="p-3 text-left">
                            <button
                              onClick={() => removeDevice(device.id)}
                              className="text-slate-400 hover:text-red-500 transition-colors p-1"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {!devices.length && (
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-4 rounded-xl flex items-start gap-3 border border-blue-100 dark:border-blue-800/30">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>يرجى اختيار نمط استهلاك من القائمة أعلاه أو إضافة أجهزة يدوياً لبدء الحساب.</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 sticky top-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">النتائج المقدرة</h2>

              {results ? (
                <div className="space-y-6">
                  {/* Energy Result */}
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 p-3 rounded-xl">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">الاستهلاك اليومي</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-800 dark:text-white">
                          {formatNumber(results.dailyEnergyWh / 1000)}
                        </span>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">كيلو واط/ساعة</span>
                      </div>
                    </div>
                  </div>

                  {/* Inverter Result */}
                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-3 rounded-xl">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">حجم الإنفرتر المطلوب</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-800 dark:text-white">
                          {formatNumber(results.inverterSizeW / 1000)}
                        </span>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">كيلو واط</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">يتضمن نسبة أمان 25%</p>
                    </div>
                  </div>

                  {/* Panels Result */}
                  <div className="flex items-start gap-4">
                    <div className="bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 p-3 rounded-xl">
                      <Sun className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">الألواح الشمسية</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-800 dark:text-white">
                          {formatNumber(results.numberOfPanels, 0)}
                        </span>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">لوح</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">بناءً على ألواح 550 واط و 5 ساعات ذروة شمسية</p>
                    </div>
                  </div>

                  {/* Battery Result */}
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 p-3 rounded-xl">
                      <Battery className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">سعة البطاريات المطلوبة ({results.systemVoltage} فولت)</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-800 dark:text-white">
                          {formatNumber(results.batteryCapacityAh, 0)}
                        </span>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">أمبير-ساعة</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">احتياطي ليوم كامل بتفريغ 80%</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                    <p className="text-xs text-slate-400 dark:text-slate-500 text-center leading-relaxed">
                      ملاحظة: هذه الحسابات تقديرية وتفترض العمل بكامل الحمل. قد تختلف المتطلبات الفعلية بناءً على ظروف الموقع وجودة المكونات.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 dark:text-slate-500">
                  <Calculator className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>النتائج ستظهر هنا بعد إدخال البيانات</p>
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
