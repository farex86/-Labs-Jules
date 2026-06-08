import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FACILITY_TYPES, calculateSolarRequirements } from '../../utils/solarCalculatorLogic';

const SolarCalculator = () => {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [customKwh, setCustomKwh] = useState('');
  const [results, setResults] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const customKwhNum = customKwh ? parseFloat(customKwh) : null;

    if (!selectedFacility && !customKwhNum) {
      alert('الرجاء اختيار نوع المنشأة أو إدخال الاستهلاك اليومي.');
      return;
    }

    const calcResults = calculateSolarRequirements(selectedFacility, customKwhNum);
    setResults(calcResults);
  };

  const handleReset = () => {
    setSelectedFacility('');
    setCustomKwh('');
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col font-sans" dir="rtl">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-primary/10 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-white p-2 rounded-lg">
              <span className="material-symbols-outlined block">solar_power</span>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none text-primary">حاسبة الطاقة الشمسية</h1>
              <p className="text-[10px] uppercase tracking-wider font-semibold opacity-70">أداة تقدير النظام</p>
            </div>
          </div>
          <Link to="/" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">
            العودة للرئيسية
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 space-y-8">

        <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl border border-primary/10 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">أدخل بيانات الاستهلاك</h2>

          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="facility" className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                نوع المنشأة / نمط الاستهلاك
              </label>
              <select
                id="facility"
                value={selectedFacility}
                onChange={(e) => setSelectedFacility(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary/50 outline-none transition-all dark:text-white"
              >
                <option value="">اختر نوع المنشأة...</option>
                {FACILITY_TYPES.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500">اختر المنشأة لاستخدام التقدير الافتراضي للاستهلاك.</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>
              <span className="text-xs font-bold text-slate-400">أو</span>
              <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>
            </div>

            <div className="space-y-2">
              <label htmlFor="customKwh" className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                الاستهلاك اليومي المخصص (كيلوواط ساعة)
              </label>
              <input
                type="number"
                id="customKwh"
                value={customKwh}
                onChange={(e) => setCustomKwh(e.target.value)}
                placeholder="مثال: 150"
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary/50 outline-none transition-all dark:text-white"
                min="0"
                step="0.1"
              />
              <p className="text-xs text-slate-500">أدخل الاستهلاك إذا كان لديك رقم دقيق لتجاوز التقدير الافتراضي.</p>
            </div>

            <div className="pt-4 flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-primary text-white py-3 px-4 rounded-xl font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">calculate</span>
                احسب النظام
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-all active:scale-95"
              >
                إعادة تعيين
              </button>
            </div>
          </form>
        </div>

        {results && (
          <div className="bg-primary text-white p-6 md:p-8 rounded-2xl shadow-xl shadow-primary/20 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="absolute -left-10 -bottom-10 text-white/10 rotate-12">
              <span className="material-symbols-outlined text-[200px]">solar_power</span>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6 opacity-90">
                <span className="material-symbols-outlined">analytics</span>
                <h2 className="text-xl font-bold">النتائج التقديرية</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <div className="bg-white/10 p-5 rounded-xl border border-white/20 backdrop-blur-sm">
                  <p className="text-xs text-white/70 uppercase tracking-wider mb-1 font-semibold">المنشأة</p>
                  <p className="text-2xl font-bold">{results.facilityName}</p>
                  <p className="text-sm mt-1 opacity-80">{results.dailyConsumptionKwh} كيلوواط ساعة/يوم</p>
                </div>

                <div className="bg-white/10 p-5 rounded-xl border border-white/20 backdrop-blur-sm">
                  <p className="text-xs text-white/70 uppercase tracking-wider mb-1 font-semibold">حجم النظام المطلوب</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black">{results.requiredSystemSizeKw}</span>
                    <span className="text-sm font-bold opacity-80">كيلوواط</span>
                  </div>
                </div>

                <div className="bg-white/10 p-5 rounded-xl border border-white/20 backdrop-blur-sm">
                  <p className="text-xs text-white/70 uppercase tracking-wider mb-1 font-semibold">عدد الألواح</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black">{results.numberOfPanels}</span>
                    <span className="text-sm font-bold opacity-80">لوح</span>
                  </div>
                  <p className="text-xs mt-1 opacity-80">بقدرة {results.panelWattage} واط للوح</p>
                </div>

                <div className="bg-white/10 p-5 rounded-xl border border-white/20 backdrop-blur-sm">
                  <p className="text-xs text-white/70 uppercase tracking-wider mb-1 font-semibold">حجم المحول (الإنفرتر)</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">{results.inverterSizeKw}</span>
                    <span className="text-sm font-bold opacity-80">كيلوواط</span>
                  </div>
                </div>

                <div className="bg-white/10 p-5 rounded-xl border border-white/20 backdrop-blur-sm">
                  <p className="text-xs text-white/70 uppercase tracking-wider mb-1 font-semibold">سعة البطاريات المقدرة</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">{results.batteryCapacityKwh}</span>
                    <span className="text-sm font-bold opacity-80">كيلوواط ساعة</span>
                  </div>
                  <p className="text-xs mt-1 opacity-80">لعمل النظام المستقل (Off-grid)</p>
                </div>

              </div>

              <div className="mt-8 p-4 bg-amber-500/20 border border-amber-400/30 rounded-xl flex items-start gap-3">
                <span className="material-symbols-outlined text-amber-300 shrink-0">info</span>
                <p className="text-sm text-amber-50 font-medium">
                  هذه الأرقام هي تقديرات أولية تعتمد على متوسط الاستهلاك وساعات سطوع الشمس الافتراضية (5.5 ساعات). للحصول على عرض سعر دقيق، ينصح بإجراء مسح ميداني.
                </p>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SolarCalculator;
