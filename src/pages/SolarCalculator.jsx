import React, { useState, useEffect } from 'react';
import { Calculator, Zap, Sun, Battery, Plus, Trash2, ArrowRight } from 'lucide-react';
import { FACILITY_TYPES, DEFAULT_DEVICES } from '../utils/solarCalculatorConstants';
import { calculateTotalDailyEnergy, calculateTotalPower, estimateSolarSystem } from '../utils/solarCalculatorLogic';
import { Link } from 'react-router-dom';

const SolarCalculator = () => {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [devices, setDevices] = useState([]);
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (selectedFacility && DEFAULT_DEVICES[selectedFacility]) {
      // Deep copy to allow editing without mutating constants
      setDevices(JSON.parse(JSON.stringify(DEFAULT_DEVICES[selectedFacility])));
      setResults(null);
    } else {
      setDevices([]);
      setResults(null);
    }
  }, [selectedFacility]);

  const handleDeviceChange = (index, field, value) => {
    const newDevices = [...devices];
    newDevices[index][field] = value;
    setDevices(newDevices);
    setResults(null); // Reset results on change
  };

  const addDevice = () => {
    setDevices([
      ...devices,
      { id: `custom_${Date.now()}`, name: 'جهاز جديد', power: 100, qty: 1, hours: 1 }
    ]);
    setResults(null);
  };

  const removeDevice = (index) => {
    const newDevices = devices.filter((_, i) => i !== index);
    setDevices(newDevices);
    setResults(null);
  };

  const handleCalculate = () => {
    if (devices.length === 0) return;

    const dailyEnergy = calculateTotalDailyEnergy(devices);
    const totalPower = calculateTotalPower(devices);
    const estimate = estimateSolarSystem(dailyEnergy, totalPower);

    setResults(estimate);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 md:p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Calculator size={28} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">حاسبة الطاقة الشمسية</h1>
              <p className="text-slate-500 dark:text-slate-400">احسب احتياجات منشأتك من الطاقة الشمسية بسهولة</p>
            </div>
          </div>
          <Link to="/login" className="text-sm text-primary hover:underline flex items-center gap-1">
            العودة للدخول <ArrowRight size={16} className="rotate-180" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold mb-4">1. اختر نوع المنشأة</h2>
              <select
                value={selectedFacility}
                onChange={(e) => setSelectedFacility(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">-- اختر نمط الاستهلاك --</option>
                {FACILITY_TYPES.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedFacility && (
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">2. الأجهزة والأحمال الكهربائية</h2>
                  <button
                    onClick={addDevice}
                    className="flex items-center gap-1 text-sm text-primary hover:text-primary/80"
                  >
                    <Plus size={16} /> إضافة جهاز
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Headers */}
                  <div className="hidden md:grid grid-cols-12 gap-4 px-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <div className="col-span-4">اسم الجهاز</div>
                    <div className="col-span-3">القدرة (واط)</div>
                    <div className="col-span-2">العدد</div>
                    <div className="col-span-2">ساعات العمل/يوم</div>
                    <div className="col-span-1"></div>
                  </div>

                  {devices.map((device, index) => (
                    <div key={device.id || index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-50 dark:bg-slate-900/50 p-4 md:p-2 rounded-lg border border-slate-200 dark:border-slate-700 md:border-none">
                      <div className="col-span-1 md:col-span-4">
                        <label className="text-xs text-slate-500 block md:hidden mb-1">اسم الجهاز</label>
                        <input
                          type="text"
                          value={device.name}
                          onChange={(e) => handleDeviceChange(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                        />
                      </div>
                      <div className="col-span-1 md:col-span-3">
                         <label className="text-xs text-slate-500 block md:hidden mb-1">القدرة (واط)</label>
                        <input
                          type="number"
                          min="0"
                          value={device.power}
                          onChange={(e) => handleDeviceChange(index, 'power', e.target.value)}
                          className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                        />
                      </div>
                      <div className="col-span-1 md:col-span-2">
                         <label className="text-xs text-slate-500 block md:hidden mb-1">العدد</label>
                        <input
                          type="number"
                          min="1"
                          value={device.qty}
                          onChange={(e) => handleDeviceChange(index, 'qty', e.target.value)}
                          className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                        />
                      </div>
                      <div className="col-span-1 md:col-span-2">
                         <label className="text-xs text-slate-500 block md:hidden mb-1">ساعات العمل/يوم</label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={device.hours}
                          onChange={(e) => handleDeviceChange(index, 'hours', e.target.value)}
                          className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                        />
                      </div>
                      <div className="col-span-1 flex justify-end md:justify-center mt-2 md:mt-0">
                        <button
                          onClick={() => removeDevice(index)}
                          className="text-red-500 hover:text-red-600 p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
                          title="حذف"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={handleCalculate}
                    className="w-full md:w-auto px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                  >
                    حساب النظام الشمسي
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className={`bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 sticky top-6 transition-all duration-300 ${results ? 'opacity-100' : 'opacity-50'}`}>
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Zap className="text-amber-500" />
                النتائج التقديرية
              </h2>

              {!results ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                  <Calculator size={48} className="mx-auto mb-4 opacity-20" />
                  <p>أدخل بيانات الأجهزة واضغط على "حساب" لرؤية التقديرات</p>
                </div>
              ) : (
                <div className="space-y-6">

                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30">
                    <p className="text-sm text-amber-800 dark:text-amber-200 mb-1">الاستهلاك اليومي</p>
                    <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                      {results.dailyEnergyKWh} <span className="text-sm font-normal">كيلوواط.ساعة</span>
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-2">
                        <Sun size={16} /> الألواح الشمسية
                      </h3>
                      <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-700 pb-2">
                        <span>القدرة المطلوبة</span>
                        <span className="font-semibold">{results.requiredSolarArrayKW} kW</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-700 pb-2 mt-2">
                        <span>عدد الألواح التقريبي</span>
                        <span className="font-semibold">{results.numberOfPanels} لوح <span className="text-xs text-slate-400">({results.panelWattage}W)</span></span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-2 mt-4">
                        <Zap size={16} /> المحول (Inverter)
                      </h3>
                      <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-700 pb-2">
                        <span>حجم المحول المناسب</span>
                        <span className="font-semibold">{results.inverterSizeKW} kW</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-2 mt-4">
                        <Battery size={16} /> البطاريات (احتياطي)
                      </h3>
                      <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-700 pb-2">
                        <span>السعة المطلوبة</span>
                        <span className="font-semibold">{results.requiredBatteryCapacityKWh} kWh</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-700 pb-2 mt-2">
                        <span>عدد البطاريات التقريبي</span>
                        <span className="font-semibold">{results.numberOfBatteries} بطارية <span className="text-xs text-slate-400">({results.batteryVoltage}V {results.batteryAh}Ah)</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-xs text-blue-800 dark:text-blue-200">
                    <strong>ملاحظة:</strong> هذه الحسابات تقديرية مبنية على متوسط الاشعاع الشمسي (5 ساعات) وقد تختلف حسب الموقع الفعلي، جودة المعدات، ونوع البطاريات. يرجى استشارة مهندس مختص للتصميم النهائي.
                  </div>
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
