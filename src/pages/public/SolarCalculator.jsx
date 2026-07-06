import React, { useState } from 'react';
import { Calculator, Plus, Trash2, Zap, Battery, Sun } from 'lucide-react';
import { FACILITY_TYPES } from '../../lib/solar-calculator/constants';
import { calculateTotalEnergy, calculateSystemRequirements } from '../../lib/solar-calculator/formulas';

export default function SolarCalculator() {
  const [selectedFacilityId, setSelectedFacilityId] = useState(FACILITY_TYPES[0].id);
  const [appliances, setAppliances] = useState(FACILITY_TYPES[0].appliances);

  const handleApplianceChange = (id, field, value) => {
    setAppliances(prev => prev.map(app => {
      if (app.id === id) {
        return { ...app, [field]: value };
      }
      return app;
    }));
  };

  const addAppliance = () => {
    const newId = Date.now().toString();
    setAppliances([...appliances, { id: newId, name: 'جهاز جديد', power: 100, quantity: 1, hours: 1 }]);
  };

  const removeAppliance = (id) => {
    setAppliances(prev => prev.filter(app => app.id !== id));
  };

  const handleFacilityChange = (e) => {
    const newFacilityId = e.target.value;
    setSelectedFacilityId(newFacilityId);
    const facility = FACILITY_TYPES.find(f => f.id === newFacilityId);
    if (facility) {
      setAppliances(JSON.parse(JSON.stringify(facility.appliances)));
    }
  };

  // Derive results directly during render to avoid useEffect
  const { totalEnergyWh, totalPowerW } = calculateTotalEnergy(appliances);
  const requirements = calculateSystemRequirements(totalEnergyWh, totalPowerW);
  const results = { totalEnergyWh, totalPowerW, ...requirements };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <Calculator className="mx-auto h-12 w-12 text-primary-600" />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">حاسبة الطاقة الشمسية</h2>
          <p className="mt-2 text-lg text-gray-600">احسب متطلبات نظام الطاقة الشمسية بناءً على نمط استهلاكك</p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6 space-y-6">

            {/* Facility Type Selection */}
            <div>
              <label htmlFor="facility-type" className="block text-sm font-medium text-gray-700">
                اختر نمط الاستهلاك (نوع المنشأة)
              </label>
              <select
                id="facility-type"
                name="facility-type"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                value={selectedFacilityId}
                onChange={handleFacilityChange}
              >
                {FACILITY_TYPES.map(facility => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Appliances List */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">الأجهزة الكهربائية</h3>
                <button
                  type="button"
                  onClick={addAppliance}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <Plus className="-ml-0.5 mr-2 h-4 w-4" />
                  إضافة جهاز
                </button>
              </div>

              <div className="flex flex-col space-y-4">
                {/* Headers (Desktop) */}
                <div className="hidden sm:grid sm:grid-cols-12 gap-4 text-sm font-medium text-gray-500 px-2">
                  <div className="col-span-4">اسم الجهاز</div>
                  <div className="col-span-2">القدرة (واط)</div>
                  <div className="col-span-2">العدد</div>
                  <div className="col-span-3">ساعات التشغيل (يومياً)</div>
                  <div className="col-span-1"></div>
                </div>

                {appliances.map((app) => (
                  <div key={app.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-gray-50 p-4 sm:p-2 rounded-lg border border-gray-200">
                    <div className="col-span-1 sm:col-span-4">
                      <label className="block text-xs text-gray-500 sm:hidden mb-1">اسم الجهاز</label>
                      <input
                        type="text"
                        value={app.name}
                        onChange={(e) => handleApplianceChange(app.id, 'name', e.target.value)}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <label className="block text-xs text-gray-500 sm:hidden mb-1">القدرة (واط)</label>
                      <input
                        type="number"
                        min="0"
                        value={app.power}
                        onChange={(e) => handleApplianceChange(app.id, 'power', e.target.value)}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <label className="block text-xs text-gray-500 sm:hidden mb-1">العدد</label>
                      <input
                        type="number"
                        min="1"
                        value={app.quantity}
                        onChange={(e) => handleApplianceChange(app.id, 'quantity', e.target.value)}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-3">
                      <label className="block text-xs text-gray-500 sm:hidden mb-1">ساعات التشغيل (يومياً)</label>
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={app.hours}
                        onChange={(e) => handleApplianceChange(app.id, 'hours', e.target.value)}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeAppliance(app.id)}
                        className="text-red-600 hover:text-red-900 focus:outline-none p-2"
                        title="حذف الجهاز"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results Section */}
            {results && (
              <div className="mt-8 border-t border-gray-200 pt-8">
                <h3 className="text-xl leading-6 font-semibold text-gray-900 mb-6 text-center">النتائج المتوقعة للنظام</h3>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  {/* Panels */}
                  <div className="bg-white overflow-hidden shadow rounded-lg border border-blue-100">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Sun className="h-6 w-6 text-blue-400" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">قدرة الألواح المطلوبة</dt>
                            <dd>
                              <div className="text-2xl font-bold text-gray-900">{results.panelPowerKw} kW</div>
                              <div className="text-xs text-gray-500 mt-1">({results.panelPowerW} واط)</div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Inverter */}
                  <div className="bg-white overflow-hidden shadow rounded-lg border border-green-100">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Zap className="h-6 w-6 text-green-400" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">حجم المحول (Inverter)</dt>
                            <dd>
                              <div className="text-2xl font-bold text-gray-900">{results.inverterSizeKw} kW</div>
                              <div className="text-xs text-gray-500 mt-1">يدعم حمل ذروة {results.totalPowerW} واط</div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Battery */}
                  <div className="bg-white overflow-hidden shadow rounded-lg border border-yellow-100">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Battery className="h-6 w-6 text-yellow-400" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">سعة البطاريات المطلوبة</dt>
                            <dd>
                              <div className="text-2xl font-bold text-gray-900">{results.batteryCapacityAh} Ah</div>
                              <div className="text-xs text-gray-500 mt-1">نظام {results.systemVoltage} فولت</div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-500 text-center bg-gray-50 p-4 rounded-md">
                  <p>الاستهلاك اليومي المقدر: <strong>{(results.totalEnergyWh / 1000).toFixed(2)} kWh</strong></p>
                  <p className="text-xs mt-2 text-gray-400">ملاحظة: هذه الحسابات تقديرية وتعتمد على متوسط الإشعاع الشمسي. يفضل استشارة مهندس مختص للحصول على تصميم دقيق.</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
