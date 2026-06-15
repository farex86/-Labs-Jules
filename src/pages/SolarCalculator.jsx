import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calculator, Sun, Battery, Zap, Settings } from 'lucide-react';
import { CONSUMPTION_PATTERNS, calculateSolarSystem } from '../utils/solarCalculator';

const SolarCalculator = () => {
  const [selectedPatternId, setSelectedPatternId] = useState('custom');
  const [devices, setDevices] = useState([]);
  const [results, setResults] = useState(null);
  const [isCalculated, setIsCalculated] = useState(false);

  // Initialize with a blank custom device or load from pattern
  useEffect(() => {
    let newDevices;
    if (selectedPatternId === 'custom') {
      newDevices = [{ id: Date.now().toString(), name: '', power: 0, quantity: 1, hours: 0 }];
    } else {
      const pattern = CONSUMPTION_PATTERNS.find(p => p.id === selectedPatternId);
      if (pattern) {
        // Deep copy the devices so we don't modify the constants
        newDevices = pattern.devices.map(d => ({ ...d, id: d.id + Date.now() }));
      } else {
        newDevices = devices;
      }
    }
    setDevices(newDevices);
    setIsCalculated(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPatternId]);

  const handleDeviceChange = (id, field, value) => {
    setDevices(devices.map(device =>
      device.id === id ? { ...device, [field]: value } : device
    ));
    setIsCalculated(false);
  };

  const addDevice = () => {
    setDevices([
      ...devices,
      { id: Date.now().toString(), name: '', power: 0, quantity: 1, hours: 0 }
    ]);
    setIsCalculated(false);
  };

  const removeDevice = (id) => {
    if (devices.length > 1) {
      setDevices(devices.filter(device => device.id !== id));
      setIsCalculated(false);
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    const calculationResults = calculateSolarSystem(devices);
    setResults(calculationResults);
    setIsCalculated(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center gap-3">
            <Sun className="h-8 w-8 text-yellow-500" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            احسب حجم النظام الشمسي المناسب لاحتياجاتك بسهولة
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="p-6 sm:p-8">
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اختر نمط الاستهلاك (نوع المنشأة)
              </label>
              <select
                value={selectedPatternId}
                onChange={(e) => setSelectedPatternId(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
              >
                <option value="custom">مخصص (إدخال يدوي)</option>
                {CONSUMPTION_PATTERNS.map((pattern) => (
                  <option key={pattern.id} value={pattern.id}>
                    {pattern.name}
                  </option>
                ))}
              </select>
            </div>

            <form onSubmit={handleCalculate}>
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">الأجهزة الكهربائية</h3>
                  <button
                    type="button"
                    onClick={addDevice}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <Plus className="w-4 h-4 ml-1" />
                    إضافة جهاز
                  </button>
                </div>

                {/* Device Headers (Desktop) */}
                <div className="hidden sm:grid sm:grid-cols-12 gap-4 mb-2 text-sm font-medium text-gray-500 dark:text-gray-400 text-center">
                  <div className="col-span-4 text-right pr-2">اسم الجهاز</div>
                  <div className="col-span-2">القدرة (واط)</div>
                  <div className="col-span-2">العدد</div>
                  <div className="col-span-3">ساعات التشغيل/يوم</div>
                  <div className="col-span-1"></div>
                </div>

                {devices.map((device) => (
                  <div key={device.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-gray-50 dark:bg-gray-800/50 p-4 sm:p-2 rounded-xl sm:rounded-lg border border-gray-100 dark:border-gray-700 sm:border-none">

                    <div className="sm:col-span-4">
                      <label className="sm:hidden block text-xs text-gray-500 mb-1">اسم الجهاز</label>
                      <input
                        type="text"
                        required
                        value={device.name}
                        onChange={(e) => handleDeviceChange(device.id, 'name', e.target.value)}
                        placeholder="مثال: مكيف, إضاءة..."
                        className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="sm:hidden block text-xs text-gray-500 mb-1">القدرة (واط)</label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          required
                          value={device.power || ''}
                          onChange={(e) => handleDeviceChange(device.id, 'power', Number(e.target.value))}
                          className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pl-8 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-bold pointer-events-none">W</span>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                       <label className="sm:hidden block text-xs text-gray-500 mb-1">العدد</label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={device.quantity || ''}
                        onChange={(e) => handleDeviceChange(device.id, 'quantity', Number(e.target.value))}
                        className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="sm:hidden block text-xs text-gray-500 mb-1">ساعات التشغيل/يوم</label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="24"
                          step="0.5"
                          required
                          value={device.hours || ''}
                          onChange={(e) => handleDeviceChange(device.id, 'hours', Number(e.target.value))}
                          className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pl-8 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-bold pointer-events-none">H</span>
                      </div>
                    </div>

                    <div className="sm:col-span-1 flex justify-end sm:justify-center">
                      <button
                        type="button"
                        onClick={() => removeDevice(device.id)}
                        disabled={devices.length === 1}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:hover:bg-transparent dark:hover:bg-red-900/30 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:w-auto"
                >
                  <Calculator className="w-5 h-5 ml-2" />
                  احسب النظام المطلوب
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Results Section */}
        {isCalculated && results && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-green-100 dark:border-green-900/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Settings className="w-6 h-6 ml-2 animate-spin-slow" />
                مواصفات النظام المقترح
              </h2>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Total Energy */}
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-100 dark:border-gray-600">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                    <Zap className="w-5 h-5 ml-2 text-blue-500" />
                    <span className="text-sm font-semibold">إجمالي الاستهلاك اليومي</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                      {(results.totalDailyEnergyWh / 1000).toFixed(1)}
                    </span>
                    <span className="mr-1 text-sm text-gray-500 dark:text-gray-400">كيلو واط ساعة (kWh)</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    أقصى حمل: {(results.totalPowerW / 1000).toFixed(1)} kW
                  </div>
                </div>

                {/* Solar Panels */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                  <div className="flex items-center text-blue-700 dark:text-blue-400 mb-4">
                    <Sun className="w-5 h-5 ml-2" />
                    <span className="text-sm font-semibold">الألواح الشمسية المطلوبة</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-extrabold text-blue-900 dark:text-blue-100">
                      {(results.requiredSolarCapacityW / 1000).toFixed(1)}
                    </span>
                    <span className="mr-1 text-sm text-blue-700 dark:text-blue-300">كيلو واط (kW)</span>
                  </div>
                  <div className="mt-2 text-sm font-medium text-blue-800 dark:text-blue-200 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg inline-block shadow-sm">
                    حوالي {results.recommendations.solarPanels.size550W} لوح (بقدرة 550W)
                  </div>
                </div>

                {/* Inverter */}
                <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl border border-purple-100 dark:border-purple-800">
                  <div className="flex items-center text-purple-700 dark:text-purple-400 mb-4">
                    <Settings className="w-5 h-5 ml-2" />
                    <span className="text-sm font-semibold">حجم الانفرتر (المحول)</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-extrabold text-purple-900 dark:text-purple-100">
                      {results.recommendations.inverter.sizeKW}
                    </span>
                    <span className="mr-1 text-sm text-purple-700 dark:text-purple-300">كيلو واط (kW)</span>
                  </div>
                  <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">
                    (يتضمن نسبة أمان 25%)
                  </div>
                </div>

                {/* Batteries */}
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-100 dark:border-green-800">
                  <div className="flex items-center text-green-700 dark:text-green-400 mb-4">
                    <Battery className="w-5 h-5 ml-2" />
                    <span className="text-sm font-semibold">سعة البطاريات المطلوبة</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-extrabold text-green-900 dark:text-green-100">
                      {results.recommendations.batteries.capacityKWh}
                    </span>
                    <span className="mr-1 text-sm text-green-700 dark:text-green-300">kWh</span>
                  </div>
                  <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                    أو حوالي {results.recommendations.batteries.voltage48vAh} أمبير/ساعة على نظام 48 فولت
                  </div>
                </div>

              </div>

              <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                <p><strong>ملاحظة هامة:</strong> هذه الحسابات تقديرية وتعتمد على المتوسطات. ينصح دائماً باستشارة مهندس طاقة شمسية متخصص لعمل دراسة دقيقة لموقعك وتحديد المكونات الأنسب.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolarCalculator;
