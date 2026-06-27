import React, { useState, useMemo } from 'react';
import { Calculator, Zap, Battery, Sun, Plus, Trash2, Home, Activity } from 'lucide-react';
import { calculateSystemRequirements } from '../../utils/solarCalculations';
import { FACILITY_TEMPLATES } from '../../utils/facilityTemplates';

export default function SolarCalculator() {
  const [selectedFacility, setSelectedFacility] = useState('custom');
  const [appliances, setAppliances] = useState([
    { id: 'custom_1', name: '', powerWatts: '', quantity: 1, hoursPerDay: '' }
  ]);

  const handleFacilityChange = (e) => {
    const facilityId = e.target.value;
    setSelectedFacility(facilityId);

    if (facilityId === 'custom') {
      setAppliances([{ id: 'custom_1', name: '', powerWatts: '', quantity: 1, hoursPerDay: '' }]);
    } else {
      // Deep copy to allow editing without affecting the template
      const template = FACILITY_TEMPLATES[facilityId];
      if (template) {
        setAppliances(JSON.parse(JSON.stringify(template.appliances)));
      }
    }
  };

  const updateAppliance = (index, field, value) => {
    const newAppliances = [...appliances];
    newAppliances[index] = { ...newAppliances[index], [field]: value };
    setAppliances(newAppliances);
  };

  const addAppliance = () => {
    setAppliances([...appliances, {
      id: `custom_${Date.now()}`,
      name: '',
      powerWatts: '',
      quantity: 1,
      hoursPerDay: ''
    }]);
  };

  const removeAppliance = (index) => {
    if (appliances.length > 1) {
      setAppliances(appliances.filter((_, i) => i !== index));
    }
  };

  // Only calculate with valid appliance data
  const validAppliances = useMemo(() => {
    return appliances.filter(app =>
      app.powerWatts !== '' && !isNaN(app.powerWatts) &&
      app.quantity !== '' && !isNaN(app.quantity) &&
      app.hoursPerDay !== '' && !isNaN(app.hoursPerDay)
    ).map(app => ({
      ...app,
      powerWatts: Number(app.powerWatts),
      quantity: Number(app.quantity),
      hoursPerDay: Number(app.hoursPerDay)
    }));
  }, [appliances]);

  const results = useMemo(() => {
    if (validAppliances.length === 0) return null;
    return calculateSystemRequirements(validAppliances);
  }, [validAppliances]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center gap-4">
            <Sun className="h-10 w-10 text-yellow-500" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            احسب احتياجاتك من الطاقة الشمسية بناءً على استهلاكك
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Type Selector */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                <Home className="h-5 w-5" />
                اختر نوع المنشأة (أنماط الاستهلاك الجاهزة)
              </label>
              <select
                value={selectedFacility}
                onChange={handleFacilityChange}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg p-3"
              >
                <option value="custom">-- إدخال يدوي مخصص --</option>
                {Object.values(FACILITY_TEMPLATES).map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Appliances List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  الأجهزة والأحمال
                </h2>
                <button
                  onClick={addAppliance}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة جهاز
                </button>
              </div>

              <div className="space-y-4">
                {/* Headers (visible on md+) */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400">
                  <div className="col-span-4">اسم الجهاز</div>
                  <div className="col-span-2">القدرة (واط)</div>
                  <div className="col-span-2">العدد</div>
                  <div className="col-span-3">ساعات التشغيل/يوم</div>
                  <div className="col-span-1"></div>
                </div>

                {appliances.map((app, index) => (
                  <div key={app.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gray-50 dark:bg-gray-700/50 p-4 md:p-2 rounded-lg">
                    <div className="col-span-1 md:col-span-4">
                      <label className="block md:hidden text-xs text-gray-500 mb-1">اسم الجهاز</label>
                      <input
                        type="text"
                        value={app.name}
                        onChange={(e) => updateAppliance(index, 'name', e.target.value)}
                        placeholder="مثال: مكيف، ثلاجة..."
                        className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <label className="block md:hidden text-xs text-gray-500 mb-1">القدرة (واط)</label>
                      <input
                        type="number"
                        min="0"
                        value={app.powerWatts}
                        onChange={(e) => updateAppliance(index, 'powerWatts', e.target.value)}
                        placeholder="واط"
                        className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <label className="block md:hidden text-xs text-gray-500 mb-1">العدد</label>
                      <input
                        type="number"
                        min="1"
                        value={app.quantity}
                        onChange={(e) => updateAppliance(index, 'quantity', e.target.value)}
                        className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-3">
                      <label className="block md:hidden text-xs text-gray-500 mb-1">ساعات التشغيل (يومياً)</label>
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={app.hoursPerDay}
                        onChange={(e) => updateAppliance(index, 'hoursPerDay', e.target.value)}
                        placeholder="ساعات"
                        className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                      />
                    </div>
                    <div className="col-span-1 flex justify-end md:justify-center mt-2 md:mt-0">
                      <button
                        onClick={() => removeAppliance(index)}
                        disabled={appliances.length === 1}
                        className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed p-2"
                        title="حذف الجهاز"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-4">
                <Calculator className="h-6 w-6 text-blue-500" />
                النتائج المقدرة
              </h2>

              {results ? (
                <div className="space-y-6">
                  {/* Energy & Load */}
                  <div className="space-y-4 border-b border-gray-200 dark:border-gray-700 pb-6">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">إجمالي الاستهلاك اليومي</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {results.dailyEnergyKWh} <span className="text-lg text-gray-500">كيلو واط.ساعة</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">أقصى حمل متوقع (ذروة)</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {results.peakLoadW} <span className="text-base text-gray-500">واط</span>
                      </p>
                    </div>
                  </div>

                  {/* System Requirements */}
                  <div className="space-y-5">
                    <div className="flex items-start gap-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">حجم العاكس (Inverter)</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {results.inverterSizeKVA} <span className="text-sm font-normal">kVA</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">بافتراض عامل تزامني 80%</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <Sun className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">الألواح الشمسية المطلوبة</p>
                        <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                          {results.solarArraySizeW} <span className="text-sm font-normal">واط</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          ~ {results.suggestedPanels} لوح (بقدرة 550W)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <Battery className="h-6 w-6 text-green-600 dark:text-green-400 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">سعة البطاريات (نظام 48V)</p>
                        <p className="text-xl font-bold text-green-600 dark:text-green-400">
                          {results.batteryCapacityAh} <span className="text-sm font-normal">Ah</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          ~ {results.suggestedBatteries} بطارية (بقدرة 200Ah/48V)
                        </p>
                        <p className="text-xs text-gray-500 mt-1">لاستقلالية يوم واحد (تفريغ 50%)</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-400 text-center">
                          * هذه الحسابات تقديرية. يرجى استشارة مهندس طاقة شمسية للحصول على تصميم دقيق.
                      </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    أدخل بيانات الأجهزة لحساب احتياجاتك من الطاقة الشمسية
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
