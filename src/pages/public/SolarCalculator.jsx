import React, { useState, useEffect, useMemo } from 'react';
import { Settings, Plus, Trash2, Zap, Battery, Sun, Server, Calculator } from 'lucide-react';
import { FACILITY_TYPES, COMMON_APPLIANCES, DEFAULT_FACILITY_APPLIANCES } from '../../config/solarConfig';
import { calculateSystemSize } from '../../lib/solarCalculator';

export default function SolarCalculator() {
  const [facilityType, setFacilityType] = useState('custom');
  const [appliances, setAppliances] = useState([]);
  const [batteryType, setBatteryType] = useState('lead_acid');

  const handleFacilityChange = (e) => {
    const newFacilityType = e.target.value;
    setFacilityType(newFacilityType);
    const defaults = DEFAULT_FACILITY_APPLIANCES[newFacilityType] || [];
    setAppliances(defaults.map(item => ({ ...item, id: Math.random().toString(36).substr(2, 9) })));
  };

  // Set default appliances on initial load
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  if (isInitialLoad) {
    const defaults = DEFAULT_FACILITY_APPLIANCES['custom'] || [];
    setAppliances(defaults.map(item => ({ ...item, id: Math.random().toString(36).substr(2, 9) })));
    setIsInitialLoad(false);
  }

  const handleAddAppliance = () => {
    setAppliances([...appliances, { id: Math.random().toString(36).substr(2, 9), name: '', quantity: 1, power: 0, hours: 0 }]);
  };

  const handleUpdateAppliance = (id, field, value) => {
    setAppliances(appliances.map(app =>
      app.id === id ? { ...app, [field]: value } : app
    ));
  };

  const handleRemoveAppliance = (id) => {
    setAppliances(appliances.filter(app => app.id !== id));
  };

  const handleCommonApplianceAdd = (e) => {
    const applianceId = e.target.value;
    if (!applianceId) return;

    const template = COMMON_APPLIANCES.find(a => a.id === applianceId);
    if (template) {
      setAppliances([
        ...appliances,
        {
          id: Math.random().toString(36).substr(2, 9),
          name: template.name,
          quantity: 1,
          power: template.defaultPower,
          hours: 4
        }
      ]);
    }
    e.target.value = ''; // reset select
  };

  const results = useMemo(() => calculateSystemSize(appliances, batteryType), [appliances, batteryType]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <Calculator className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك والأجهزة المستخدمة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility & Battery Selection */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Settings className="text-blue-500" />
                إعدادات النظام
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نوع المنشأة</label>
                  <select
                    className="w-full border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                    value={facilityType}
                    onChange={handleFacilityChange}
                  >
                    {FACILITY_TYPES.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نوع البطاريات</label>
                  <select
                    className="w-full border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                    value={batteryType}
                    onChange={(e) => setBatteryType(e.target.value)}
                  >
                    <option value="lead_acid">حمض الرصاص (Lead Acid/Gel/Tubular)</option>
                    <option value="lithium">ليثيوم (Lithium-ion/LiFePO4)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Appliances List */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Zap className="text-yellow-500" />
                  الأجهزة الكهربائية
                </h2>

                <select
                  className="w-full sm:w-auto border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm"
                  onChange={handleCommonApplianceAdd}
                  defaultValue=""
                >
                  <option value="" disabled>+ إضافة جهاز شائع...</option>
                  {COMMON_APPLIANCES.map(app => (
                    <option key={app.id} value={app.id}>{app.name} ({app.defaultPower} واط)</option>
                  ))}
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 rounded-t-xl">
                    <tr>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العدد</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القدرة (واط)</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات التشغيل</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appliances.map((app) => (
                      <tr key={app.id}>
                        <td className="px-2 py-3">
                          <input
                            type="text"
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border sm:text-sm"
                            value={app.name}
                            onChange={(e) => handleUpdateAppliance(app.id, 'name', e.target.value)}
                            placeholder="اسم الجهاز"
                          />
                        </td>
                        <td className="px-2 py-3 w-24">
                          <input
                            type="number"
                            min="1"
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border sm:text-sm"
                            value={app.quantity}
                            onChange={(e) => handleUpdateAppliance(app.id, 'quantity', e.target.value)}
                          />
                        </td>
                        <td className="px-2 py-3 w-32">
                          <input
                            type="number"
                            min="0"
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border sm:text-sm"
                            value={app.power}
                            onChange={(e) => handleUpdateAppliance(app.id, 'power', e.target.value)}
                          />
                        </td>
                        <td className="px-2 py-3 w-32">
                          <input
                            type="number"
                            min="0"
                            max="24"
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border sm:text-sm"
                            value={app.hours}
                            onChange={(e) => handleUpdateAppliance(app.id, 'hours', e.target.value)}
                          />
                        </td>
                        <td className="px-2 py-3 text-center w-12">
                          <button
                            onClick={() => handleRemoveAppliance(app.id)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {appliances.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                          لا توجد أجهزة مضافة. قم باختيار نوع منشأة أو أضف الأجهزة يدوياً.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <button
                onClick={handleAddAppliance}
                className="mt-4 flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-colors"
              >
                <Plus size={20} className="mr-2" />
                إضافة جهاز جديد
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl shadow-xl text-white sticky top-8">
              <div className="p-6 border-b border-blue-700/50">
                <h2 className="text-2xl font-bold">حجم النظام المطلوب</h2>
                <p className="text-blue-200 mt-2 text-sm">الحسابات تقديرية وتعتمد على كفاءة الأجهزة ونسبة الإشعاع الشمسي.</p>
              </div>

              <div className="p-6 space-y-6">

                {/* Energy & Power */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200 flex items-center gap-2">
                      <Zap size={18} /> الاستهلاك اليومي
                    </span>
                    <span className="font-bold text-lg">{results.dailyEnergy.toLocaleString()} واط/ساعة</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200 flex items-center gap-2">
                      <Zap size={18} /> حمل الذروة
                    </span>
                    <span className="font-bold text-lg">{results.peakPower.toLocaleString()} واط</span>
                  </div>
                </div>

                <div className="h-px bg-blue-700/50"></div>

                {/* System Components */}
                <div className="space-y-5">
                  <div className="bg-white/10 rounded-xl p-4 flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-lg">
                      <Sun className="text-yellow-400" size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-blue-200 mb-1">الألواح الشمسية المطلوبة</div>
                      <div className="text-2xl font-bold">{results.panelCapacity.toLocaleString()} واط</div>
                      <div className="text-xs text-blue-300 mt-1">إجمالي قدرة الألواح</div>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4 flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-lg">
                      <Server className="text-green-400" size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-blue-200 mb-1">حجم المحول (Inverter)</div>
                      <div className="text-2xl font-bold">{results.inverterSize.toLocaleString()} واط</div>
                      <div className="text-xs text-blue-300 mt-1">نظام {results.systemVoltage} فولت</div>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4 flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-lg">
                      <Battery className="text-purple-400" size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-blue-200 mb-1">سعة البطاريات المطلوبة</div>
                      <div className="text-2xl font-bold">{results.batteryCapacityAh.toLocaleString()} Ah</div>
                      <div className="text-xs text-blue-300 mt-1">حوالي {results.batteryCapacityKWh} كيلوواط/ساعة ({results.systemVoltage}V)</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
