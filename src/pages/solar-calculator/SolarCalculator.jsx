import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Calculator, Sun, Zap, Battery, Power, Settings, Plus, Trash2, Home, Activity } from 'lucide-react';
import { FACILITY_TYPES } from '../../utils/solarCalculatorConstants';
import { calculateSolarSystem } from '../../utils/solarCalculatorUtils';

const SolarCalculator = () => {
  const [selectedFacilityId, setSelectedFacilityId] = useState('');
  const [appliances, setAppliances] = useState([]);
  const [sunHours, setSunHours] = useState(5.5);
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (selectedFacilityId) {
      const facility = FACILITY_TYPES.find(f => f.id === selectedFacilityId);
      if (facility) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAppliances(JSON.parse(JSON.stringify(facility.appliances)));
      }
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAppliances([]);
    }
  }, [selectedFacilityId]);

  useEffect(() => {
    if (appliances.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults(calculateSolarSystem(appliances, sunHours));
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults(null);
    }
  }, [appliances, sunHours]);

  const handleFacilityChange = (e) => {
    setSelectedFacilityId(e.target.value);
  };

  const updateAppliance = (index, field, value) => {
    const updated = [...appliances];
    updated[index][field] = Number(value);
    setAppliances(updated);
  };

  const removeAppliance = (index) => {
    const updated = [...appliances];
    updated.splice(index, 1);
    setAppliances(updated);
  };

  const addAppliance = () => {
    setAppliances([
      ...appliances,
      { id: `custom_${Date.now()}`, name: 'جهاز جديد', defaultPower: 100, defaultHours: 8, defaultQuantity: 1 }
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8 font-sans text-right" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
              <Sun className="text-amber-500 w-8 h-8" />
              الحاسبة الشمسية
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              احسب احتياجاتك من الطاقة الشمسية بناءً على نوع المنشأة والأجهزة المستخدمة.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Content (Facility Selection & Appliances) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                <Home className="w-5 h-5 text-primary" />
                نوع المنشأة
              </label>
              <select
                value={selectedFacilityId}
                onChange={handleFacilityChange}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="">-- اختر نوع المنشأة --</option>
                {FACILITY_TYPES.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                  <Sun className="w-5 h-5 text-amber-500" />
                  ساعات الذروة الشمسية (ساعات)
                </label>
                <input
                  type="number"
                  value={sunHours}
                  onChange={(e) => setSunHours(Number(e.target.value))}
                  step="0.1"
                  min="1"
                  className="w-full md:w-1/2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </motion.div>

            {/* Appliances List */}
            {appliances.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    الأجهزة الكهربائية
                  </h2>
                  <button
                    onClick={addAppliance}
                    className="flex items-center gap-1 bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                        <th className="pb-3 font-semibold">الجهاز</th>
                        <th className="pb-3 font-semibold">القدرة (واط)</th>
                        <th className="pb-3 font-semibold">الكمية</th>
                        <th className="pb-3 font-semibold">ساعات التشغيل</th>
                        <th className="pb-3 font-semibold"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {appliances.map((app, index) => (
                        <tr key={index} className="border-b border-slate-100 dark:border-slate-700/50 last:border-0">
                          <td className="py-3 pr-2">
                            <input
                              type="text"
                              value={app.name}
                              onChange={(e) => {
                                const updated = [...appliances];
                                updated[index].name = e.target.value;
                                setAppliances(updated);
                              }}
                              className="w-full bg-transparent border-none focus:ring-0 text-slate-800 dark:text-slate-200"
                            />
                          </td>
                          <td className="py-3 px-2">
                            <input
                              type="number"
                              value={app.defaultPower}
                              onChange={(e) => updateAppliance(index, 'defaultPower', e.target.value)}
                              className="w-24 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1.5 text-center text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </td>
                          <td className="py-3 px-2">
                            <input
                              type="number"
                              value={app.defaultQuantity}
                              onChange={(e) => updateAppliance(index, 'defaultQuantity', e.target.value)}
                              className="w-16 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1.5 text-center text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </td>
                          <td className="py-3 px-2">
                            <input
                              type="number"
                              value={app.defaultHours}
                              onChange={(e) => updateAppliance(index, 'defaultHours', e.target.value)}
                              className="w-16 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1.5 text-center text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </td>
                          <td className="py-3 pl-2 text-left">
                            <button
                              onClick={() => removeAppliance(index)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar (Results) */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-primary text-white p-6 rounded-2xl shadow-lg sticky top-6"
            >
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <Calculator className="w-5 h-5" />
                النتائج
              </h2>

              {results ? (
                <div className="space-y-6">
                  <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <p className="text-primary-100 text-sm mb-1">الاستهلاك اليومي</p>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-black">{results.dailyEnergyKWh}</span>
                      <span className="text-sm pb-1 opacity-80">كيلوواط/ساعة</span>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <p className="text-primary-100 text-sm mb-1 flex items-center gap-1">
                      <Power className="w-4 h-4" />
                      قدرة المحول المطلوبة (Inverter)
                    </p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">{results.inverterCapacityKW}</span>
                      <span className="text-sm pb-1 opacity-80">كيلوواط</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                      <p className="text-primary-100 text-xs mb-1 flex items-center gap-1">
                        <Sun className="w-3 h-3" />
                        ألواح شمسية (550W)
                      </p>
                      <div className="flex items-end gap-2">
                        <span className="text-xl font-bold">{results.numberOfPanels}</span>
                        <span className="text-xs pb-1 opacity-80">لوح</span>
                      </div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                      <p className="text-primary-100 text-xs mb-1 flex items-center gap-1">
                        <Battery className="w-3 h-3" />
                        بطاريات ليثيوم (48V 100Ah)
                      </p>
                      <div className="flex items-end gap-2">
                        <span className="text-xl font-bold">{results.numberOfBatteries}</span>
                        <span className="text-xs pb-1 opacity-80">بطارية</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20 text-xs text-white/70">
                    <p>ملاحظة: هذه الحسابات تقريبية وتعتمد على كفاءة النظام بنسبة 70% وتفريغ البطاريات بنسبة 80%.</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 opacity-70">
                  <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>الرجاء اختيار نوع المنشأة لعرض النتائج</p>
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
