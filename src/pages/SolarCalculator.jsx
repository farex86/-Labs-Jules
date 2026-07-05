import React, { useState } from 'react';
import { Sun, Battery, Zap, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { FACILITY_TYPES } from '../models/SolarCalculatorConfig';
import { calculateSolarRequirements } from '../models/SolarCalculatorLogic';

const SolarCalculator = () => {
  const initialFacility = FACILITY_TYPES[0];
  const [selectedFacility, setSelectedFacility] = useState(initialFacility.id);

  // Initialize state directly to avoid useEffect cascading renders warning
  const [appliances, setAppliances] = useState(() => {
    return JSON.parse(JSON.stringify(initialFacility.defaultAppliances));
  });

  const handleFacilityChange = (e) => {
    const newFacilityId = e.target.value;
    setSelectedFacility(newFacilityId);

    const facility = FACILITY_TYPES.find(f => f.id === newFacilityId);
    if (facility) {
      setAppliances(JSON.parse(JSON.stringify(facility.defaultAppliances)));
    }
  };

  // Recalculate directly when appliances change, no need for useEffect
  const currentResults = calculateSolarRequirements(appliances);

  const handleApplianceChange = (index, field, value) => {
    const updatedAppliances = [...appliances];
    updatedAppliances[index][field] = Number(value);
    setAppliances(updatedAppliances);
  };

  const handleNameChange = (index, value) => {
    const updatedAppliances = [...appliances];
    updatedAppliances[index].name = value;
    setAppliances(updatedAppliances);
  };

  const addAppliance = () => {
    setAppliances([
      ...appliances,
      { id: Date.now().toString(), name: 'جهاز جديد', watts: 100, quantity: 1, hours: 1 }
    ]);
  };

  const removeAppliance = (index) => {
    const updatedAppliances = appliances.filter((_, i) => i !== index);
    setAppliances(updatedAppliances);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center justify-center gap-2">
            <Sun className="h-8 w-8 text-yellow-500" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع المنشأة
          </p>
        </div>

        {/* Facility Selector */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            اختر نوع المنشأة
          </label>
          <select
            value={selectedFacility}
            onChange={handleFacilityChange}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          >
            {FACILITY_TYPES.map((facility) => (
              <option key={facility.id} value={facility.id}>
                {facility.name}
              </option>
            ))}
          </select>
        </div>

        {/* Appliances List */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">الأجهزة الكهربائية</h2>
            <button
              onClick={addAppliance}
              className="flex items-center gap-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              إضافة جهاز
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm">
                  <th className="pb-3 font-medium">الجهاز</th>
                  <th className="pb-3 font-medium">الاستهلاك (واط)</th>
                  <th className="pb-3 font-medium">العدد</th>
                  <th className="pb-3 font-medium">ساعات التشغيل</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {appliances.map((app, index) => (
                  <tr key={app.id} className="group">
                    <td className="py-3 pr-2">
                      <input
                        type="text"
                        value={app.name}
                        onChange={(e) => handleNameChange(index, e.target.value)}
                        className="w-full bg-transparent border-none p-1 focus:ring-2 focus:ring-primary rounded dark:text-slate-200"
                      />
                    </td>
                    <td className="py-3">
                      <input
                        type="number"
                        min="0"
                        value={app.watts}
                        onChange={(e) => handleApplianceChange(index, 'watts', e.target.value)}
                        className="w-24 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 dark:text-slate-200"
                      />
                    </td>
                    <td className="py-3">
                      <input
                        type="number"
                        min="1"
                        value={app.quantity}
                        onChange={(e) => handleApplianceChange(index, 'quantity', e.target.value)}
                        className="w-16 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 dark:text-slate-200"
                      />
                    </td>
                    <td className="py-3">
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={app.hours}
                        onChange={(e) => handleApplianceChange(index, 'hours', e.target.value)}
                        className="w-16 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 dark:text-slate-200"
                      />
                    </td>
                    <td className="py-3 pl-2 text-left">
                      <button
                        onClick={() => removeAppliance(index)}
                        className="text-red-500 hover:text-red-700 opacity-50 group-hover:opacity-100 transition-opacity p-1"
                        title="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {appliances.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-500">
                      لا توجد أجهزة مضافة. يرجى إضافة جهاز لحساب الاستهلاك.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results */}
        {currentResults && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-blue-100 dark:border-blue-900 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                  <Sun className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-slate-700 dark:text-slate-300">الألواح الشمسية</h3>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">{currentResults.panelsNeeded}</span>
                <span className="text-slate-500 mr-2 text-sm">لوح</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                بقوة {currentResults.assumptions.panelWattage} واط للوح الواحد
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-green-100 dark:border-green-900 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-slate-700 dark:text-slate-300">الإنفيرتر (المحول)</h3>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                  {(currentResults.inverterCapacityW / 1000).toFixed(1)}
                </span>
                <span className="text-slate-500 mr-2 text-sm">كيلو واط</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                يتحمل أقصى حمل قدره {currentResults.peakPowerW} واط
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-purple-100 dark:border-purple-900 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                  <Battery className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-slate-700 dark:text-slate-300">البطاريات</h3>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">{currentResults.batteriesNeeded}</span>
                <span className="text-slate-500 mr-2 text-sm">بطارية</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                سعة {currentResults.assumptions.batteryAh} أمبير، {currentResults.assumptions.batteryVoltage} فولت
              </p>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex gap-3 text-sm text-blue-800 dark:text-blue-200">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <p>
            هذه الحسابات تقديرية وتعتمد على كفاءة النظام بنسبة 80% ومتوسط سطوع شمس 5.5 ساعات.
            ينصح باستشارة مهندس مختص قبل اتخاذ قرار الشراء.
          </p>
        </div>

      </div>
    </div>
  );
};

export default SolarCalculator;
