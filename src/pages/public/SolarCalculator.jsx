import React, { useState, useMemo } from 'react';
import { Settings, Plus, Trash2, Zap, Battery, Sun, Server } from 'lucide-react';
import { CONSUMPTION_PATTERNS } from '../../lib/solar/constants';
import { calculateSystemRequirements } from '../../lib/solar/calculator';

export default function SolarCalculator() {
  const [selectedPatternId, setSelectedPatternId] = useState(CONSUMPTION_PATTERNS[0].id);
  const [appliances, setAppliances] = useState(CONSUMPTION_PATTERNS[0].appliances);

  // Derive system requirements completely from the business logic layer
  const requirements = useMemo(() => calculateSystemRequirements(appliances), [appliances]);

  const handlePatternChange = (e) => {
    const patternId = e.target.value;
    setSelectedPatternId(patternId);

    const pattern = CONSUMPTION_PATTERNS.find(p => p.id === patternId);
    if (pattern) {
      // Deep copy to allow editing without mutating constants
      setAppliances(JSON.parse(JSON.stringify(pattern.appliances)));
    }
  };

  const handleApplianceChange = (id, field, value) => {
    setAppliances(prev => prev.map(app => {
      if (app.id === id) {
        return { ...app, [field]: Number(value) || value };
      }
      return app;
    }));
  };

  const addAppliance = () => {
    const newAppliance = {
      id: Date.now().toString(),
      name: 'جهاز جديد',
      watts: 100,
      quantity: 1,
      hours: 4
    };
    setAppliances([...appliances, newAppliance]);
  };

  const removeAppliance = (id) => {
    setAppliances(prev => prev.filter(app => app.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 flex items-center justify-center gap-3">
            <Sun className="w-8 h-8 text-yellow-500" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="text-slate-600">احسب متطلبات النظام الشمسي الخاص بك بناءً على نمط استهلاكك</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Configuration & Appliances (Takes 2 columns on wide screens) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Pattern Selection */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                اختر نمط الاستهلاك (نوع المنشأة)
              </label>
              <select
                value={selectedPatternId}
                onChange={handlePatternChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                {CONSUMPTION_PATTERNS.map(pattern => (
                  <option key={pattern.id} value={pattern.id}>
                    {pattern.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Appliance List */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800">الأجهزة الكهربائية</h2>
                <button
                  onClick={addAppliance}
                  className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  إضافة جهاز
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 text-sm">
                      <th className="pb-3 pr-2 font-medium">اسم الجهاز</th>
                      <th className="pb-3 pr-2 font-medium w-24">الاستهلاك (واط)</th>
                      <th className="pb-3 pr-2 font-medium w-24">العدد</th>
                      <th className="pb-3 pr-2 font-medium w-24">ساعات العمل</th>
                      <th className="pb-3 pr-2 font-medium w-16"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {appliances.map(app => (
                      <tr key={app.id} className="border-b border-slate-50 last:border-0">
                        <td className="py-3 pr-2">
                          <input
                            type="text"
                            value={app.name}
                            onChange={(e) => handleApplianceChange(app.id, 'name', e.target.value)}
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </td>
                        <td className="py-3 pr-2">
                          <input
                            type="number"
                            min="0"
                            value={app.watts}
                            onChange={(e) => handleApplianceChange(app.id, 'watts', e.target.value)}
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </td>
                        <td className="py-3 pr-2">
                          <input
                            type="number"
                            min="1"
                            value={app.quantity}
                            onChange={(e) => handleApplianceChange(app.id, 'quantity', e.target.value)}
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </td>
                        <td className="py-3 pr-2">
                          <input
                            type="number"
                            min="0"
                            max="24"
                            value={app.hours}
                            onChange={(e) => handleApplianceChange(app.id, 'hours', e.target.value)}
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </td>
                        <td className="py-3 pr-2 text-left">
                          <button
                            onClick={() => removeAppliance(app.id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {appliances.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    لا توجد أجهزة مضافة. قم بإضافة جهاز للبدء بالحساب.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Dashboard Results */}
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-2xl shadow-lg p-6 text-white sticky top-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-400" />
                متطلبات النظام المقترحة
              </h2>

              <div className="space-y-4">

                {/* Total Load */}
                <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600/50">
                  <div className="flex items-center gap-3 mb-2 text-slate-300">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm font-medium">إجمالي الأحمال المستمرة</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {requirements.totalWatts.toLocaleString()} <span className="text-sm font-normal text-slate-400">واط (W)</span>
                  </div>
                  <div className="text-sm text-slate-400 mt-1">
                    الاستهلاك اليومي: {(requirements.totalDailyWh / 1000).toFixed(1)} كيلو واط/ساعة (kWh)
                  </div>
                </div>

                {/* Inverter */}
                <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600/50">
                  <div className="flex items-center gap-3 mb-2 text-slate-300">
                    <Server className="w-5 h-5 text-blue-400" />
                    <span className="text-sm font-medium">حجم المحول (Inverter) المقترح</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {Math.ceil(requirements.inverterSizeW).toLocaleString()} <span className="text-sm font-normal text-slate-400">واط (W)</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    * يتضمن هامش أمان 25% لتشغيل الأجهزة ذات تيار البدء العالي
                  </div>
                </div>

                {/* Solar Array */}
                <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600/50">
                  <div className="flex items-center gap-3 mb-2 text-slate-300">
                    <Sun className="w-5 h-5 text-orange-400" />
                    <span className="text-sm font-medium">حجم الألواح الشمسية المقترح</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {Math.ceil(requirements.solarArraySizeW).toLocaleString()} <span className="text-sm font-normal text-slate-400">واط (W)</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    * بناءً على 5 ساعات ذروة مشمسة يومياً
                  </div>
                </div>

                {/* Battery Bank */}
                <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600/50">
                  <div className="flex items-center gap-3 mb-2 text-slate-300">
                    <Battery className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-medium">سعة البطاريات المقترحة</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {requirements.batteryCapacityKWh.toFixed(1)} <span className="text-sm font-normal text-slate-400">كيلو واط/ساعة (kWh)</span>
                  </div>
                  <div className="text-sm text-slate-400 mt-1">
                    أو {Math.ceil(requirements.batteryCapacityAh).toLocaleString()} أمبير-ساعة (Ah) عند 48 فولت
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    * يكفي لتشغيل النظام ليوم واحد (بدون شمس) مع تفريغ 50%
                  </div>
                </div>

              </div>

              <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-blue-200">
                <p>ملاحظة: هذه الحسابات تقديرية وتعتمد على المتوسطات العامة. للحصول على تصميم دقيق للنظام يرجى استشارة مهندس طاقة شمسية معتمد.</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
