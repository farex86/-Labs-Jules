import React, { useState, useEffect } from 'react';
import { CONSUMPTION_PATTERNS, calculateSolarSystem } from '../../utils/solarCalculatorLogic';

const SolarCalculator = () => {
  const [selectedPattern, setSelectedPattern] = useState('');
  const [appliances, setAppliances] = useState([]);
  const [results, setResults] = useState(null);

  const handlePatternChange = (e) => {
    const pattern = e.target.value;
    setSelectedPattern(pattern);
    if (pattern && CONSUMPTION_PATTERNS[pattern]) {
      // Deep copy to allow editing without mutating constants
      setAppliances(JSON.parse(JSON.stringify(CONSUMPTION_PATTERNS[pattern])));
    } else {
      setAppliances([]);
    }
  };

  const handleApplianceChange = (id, field, value) => {
    setAppliances(
      appliances.map((app) =>
        app.id === id ? { ...app, [field]: Number(value) >= 0 ? Number(value) : 0 } : app
      )
    );
  };

  const addAppliance = () => {
    const newId = Date.now().toString();
    setAppliances([
      ...appliances,
      { id: newId, name: 'جهاز جديد (New Appliance)', power: 0, quantity: 1, hours: 0 },
    ]);
  };

  const removeAppliance = (id) => {
    setAppliances(appliances.filter((app) => app.id !== id));
  };

  useEffect(() => {
    if (appliances.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults(calculateSolarSystem(appliances));
    } else {
      setResults(null);
    }
  }, [appliances]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">حاسبة الطاقة الشمسية (Solar Calculator)</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نمط استهلاكك.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="mb-6">
            <label htmlFor="pattern-select" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              اختر نمط الاستهلاك (Select Consumption Pattern)
            </label>
            <select
              id="pattern-select"
              value={selectedPattern}
              onChange={handlePatternChange}
              className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary text-right"
              dir="rtl"
            >
              <option value="">-- اختر النمط (Select Profile) --</option>
              {Object.keys(CONSUMPTION_PATTERNS).map((pattern) => (
                <option key={pattern} value={pattern}>
                  {pattern}
                </option>
              ))}
            </select>
          </div>

          {appliances.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">الأجهزة (Appliances)</h3>
                <button
                  onClick={addAppliance}
                  className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  إضافة جهاز
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                      <th className="py-3 px-2">اسم الجهاز</th>
                      <th className="py-3 px-2">القدرة (واط)</th>
                      <th className="py-3 px-2">العدد</th>
                      <th className="py-3 px-2">ساعات التشغيل (يومياً)</th>
                      <th className="py-3 px-2">إجراء</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appliances.map((app) => (
                      <tr key={app.id} className="border-b border-slate-100 dark:border-slate-700/50">
                        <td className="py-2 px-2">
                          <input
                            type="text"
                            value={app.name}
                            onChange={(e) => {
                              setAppliances(
                                appliances.map((a) =>
                                  a.id === app.id ? { ...a, name: e.target.value } : a
                                )
                              );
                            }}
                            className="w-full min-w-[150px] rounded border-slate-300 dark:border-slate-600 dark:bg-slate-700 text-sm focus:ring-primary focus:border-primary"
                          />
                        </td>
                        <td className="py-2 px-2 w-24">
                          <input
                            type="number"
                            min="0"
                            value={app.power}
                            onChange={(e) => handleApplianceChange(app.id, 'power', e.target.value)}
                            className="w-full rounded border-slate-300 dark:border-slate-600 dark:bg-slate-700 text-sm focus:ring-primary focus:border-primary text-left"
                            dir="ltr"
                          />
                        </td>
                        <td className="py-2 px-2 w-20">
                          <input
                            type="number"
                            min="1"
                            value={app.quantity}
                            onChange={(e) => handleApplianceChange(app.id, 'quantity', e.target.value)}
                            className="w-full rounded border-slate-300 dark:border-slate-600 dark:bg-slate-700 text-sm focus:ring-primary focus:border-primary text-left"
                            dir="ltr"
                          />
                        </td>
                        <td className="py-2 px-2 w-24">
                          <input
                            type="number"
                            min="0"
                            max="24"
                            value={app.hours}
                            onChange={(e) => handleApplianceChange(app.id, 'hours', e.target.value)}
                            className="w-full rounded border-slate-300 dark:border-slate-600 dark:bg-slate-700 text-sm focus:ring-primary focus:border-primary text-left"
                            dir="ltr"
                          />
                        </td>
                        <td className="py-2 px-2 w-12 text-center">
                          <button
                            onClick={() => removeAppliance(app.id)}
                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            title="حذف"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {results && (
          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">نتائج الحساب (Results)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-3xl text-amber-500 mb-2">bolt</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">الاستهلاك اليومي (Daily Energy)</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white" dir="ltr">
                  {results.totalDailyEnergyKWh.toFixed(2)} kWh
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-3xl text-blue-500 mb-2">solar_power</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">الألواح الشمسية (Solar Panels)</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white" dir="ltr">
                  {results.solarPanelCapacityKW.toFixed(2)} kW
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-3xl text-green-500 mb-2">battery_charging_full</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">البطاريات (Battery Capacity)</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white" dir="ltr">
                  {Math.ceil(results.batteryCapacityAh)} Ah
                  <span className="block text-[10px] text-slate-400">@ 48V</span>
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-3xl text-purple-500 mb-2">power</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">المحول (Inverter Size)</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white" dir="ltr">
                  {results.inverterSizeKW.toFixed(2)} kW
                </p>
              </div>

            </div>

            <div className="mt-6 text-xs text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 p-3 rounded-lg border border-primary/10">
              <p>* هذه الحسابات تقديرية وتعتمد على متوسط ساعات سطوع الشمس (5.5 ساعة) ونظام بطاريات 48 فولت بـ 80% عمق تفريغ. ينصح باستشارة مهندس مختص للحصول على تصميم دقيق.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolarCalculator;
