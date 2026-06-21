import React, { useState, useMemo } from 'react';
import { Sun, Battery, Zap, Settings, Plus, Trash2, Home, Power, Clock } from 'lucide-react';
import { FACILITY_TYPES } from '../utils/solarConstants';
import { calculateSolarSystem } from '../utils/solarLogic';

const SolarCalculator = () => {
  const [selectedFacility, setSelectedFacility] = useState(FACILITY_TYPES[0].id);
  const [appliances, setAppliances] = useState([...FACILITY_TYPES[0].appliances]);
  const [daysOfAutonomy, setDaysOfAutonomy] = useState(1);
  const [newAppliance, setNewAppliance] = useState({ name: '', powerW: 0, quantity: 1, hours: 1 });

  // Handle facility change to load preset appliances
  const handleFacilityChange = (e) => {
    const facilityId = e.target.value;
    setSelectedFacility(facilityId);
    const facility = FACILITY_TYPES.find(f => f.id === facilityId);
    if (facility) {
      // Deep copy to prevent mutation of constants
      setAppliances(JSON.parse(JSON.stringify(facility.appliances)));
    }
  };

  const handleApplianceChange = (index, field, value) => {
    const updated = [...appliances];
    updated[index] = { ...updated[index], [field]: value };
    setAppliances(updated);
  };

  const handleAddAppliance = () => {
    if (newAppliance.name && newAppliance.powerW > 0) {
      setAppliances([...appliances, { ...newAppliance, id: Date.now().toString() }]);
      setNewAppliance({ name: '', powerW: 0, quantity: 1, hours: 1 });
    }
  };

  const handleRemoveAppliance = (index) => {
    const updated = appliances.filter((_, i) => i !== index);
    setAppliances(updated);
  };

  // Compute sizing using business logic
  const systemSize = useMemo(() => calculateSolarSystem(appliances, daysOfAutonomy), [appliances, daysOfAutonomy]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Sun className="h-8 w-8 text-yellow-500" />
              حاسبة النظام الشمسي
            </h1>
            <p className="mt-2 text-gray-500">احسب حجم النظام الشمسي المناسب لاحتياجاتك</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Selection */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Home className="h-5 w-5 text-blue-500" />
                نوع المنشأة
              </h2>
              <select
                value={selectedFacility}
                onChange={handleFacilityChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {FACILITY_TYPES.map(facility => (
                  <option key={facility.id} value={facility.id}>{facility.name}</option>
                ))}
              </select>
            </div>

            {/* Appliances List */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Power className="h-5 w-5 text-green-500" />
                الأجهزة الكهربائية (الأحمال)
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-right mb-6">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-sm">
                      <th className="p-3 rounded-tr-lg">الجهاز</th>
                      <th className="p-3">الاستهلاك (واط)</th>
                      <th className="p-3">العدد</th>
                      <th className="p-3">ساعات التشغيل/يوم</th>
                      <th className="p-3 rounded-tl-lg text-center">إجراء</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appliances.map((app, idx) => (
                      <tr key={app.id || idx} className="border-b border-gray-50">
                        <td className="p-2">
                          <input
                            type="text"
                            value={app.name}
                            onChange={(e) => handleApplianceChange(idx, 'name', e.target.value)}
                            className="w-full p-2 border border-gray-200 rounded"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            min="0"
                            value={app.powerW}
                            onChange={(e) => handleApplianceChange(idx, 'powerW', Number(e.target.value))}
                            className="w-full p-2 border border-gray-200 rounded"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            min="1"
                            value={app.quantity}
                            onChange={(e) => handleApplianceChange(idx, 'quantity', Number(e.target.value))}
                            className="w-full p-2 border border-gray-200 rounded"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            min="0"
                            max="24"
                            value={app.hours}
                            onChange={(e) => handleApplianceChange(idx, 'hours', Number(e.target.value))}
                            className="w-full p-2 border border-gray-200 rounded"
                          />
                        </td>
                        <td className="p-2 text-center">
                          <button
                            onClick={() => handleRemoveAppliance(idx)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add New Appliance */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">إضافة جهاز جديد</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  <input
                    type="text"
                    placeholder="اسم الجهاز"
                    value={newAppliance.name}
                    onChange={(e) => setNewAppliance({ ...newAppliance, name: e.target.value })}
                    className="col-span-1 md:col-span-2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="القدرة (واط)"
                    min="0"
                    value={newAppliance.powerW || ''}
                    onChange={(e) => setNewAppliance({ ...newAppliance, powerW: Number(e.target.value) })}
                    className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="العدد"
                    min="1"
                    value={newAppliance.quantity || ''}
                    onChange={(e) => setNewAppliance({ ...newAppliance, quantity: Number(e.target.value) })}
                    className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="ساعات العمل"
                    min="1"
                    max="24"
                    value={newAppliance.hours || ''}
                    onChange={(e) => setNewAppliance({ ...newAppliance, hours: Number(e.target.value) })}
                    className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddAppliance}
                    className="col-span-1 md:col-span-5 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                    إضافة
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">

            {/* System Settings */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5 text-gray-500" />
                إعدادات النظام
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  أيام الاستقلالية (بدون شمس)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.5"
                    value={daysOfAutonomy}
                    onChange={(e) => setDaysOfAutonomy(Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="font-semibold w-12 text-center bg-gray-100 p-1 rounded">
                    {daysOfAutonomy} يوم
                  </span>
                </div>
              </div>
            </div>

            {/* Calculations Result */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b pb-4">
                <Zap className="h-5 w-5 text-yellow-500" />
                المقاسات المقترحة
              </h2>

              <div className="space-y-6">

                {/* Total Energy & Power */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-sm text-blue-600 mb-1 flex items-center gap-1">
                      <Clock className="h-4 w-4" /> الطاقة اليومية
                    </p>
                    <p className="text-2xl font-bold text-blue-900">
                      {(systemSize.totalEnergyWh / 1000).toFixed(1)} <span className="text-sm font-normal">kWh</span>
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <p className="text-sm text-purple-600 mb-1 flex items-center gap-1">
                      <Zap className="h-4 w-4" /> ذروة السحب
                    </p>
                    <p className="text-2xl font-bold text-purple-900">
                      {(systemSize.totalPowerW / 1000).toFixed(1)} <span className="text-sm font-normal">kW</span>
                    </p>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Core Components */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                      <Sun className="h-4 w-4 text-orange-400" /> سعة الألواح الشمسية المطلوبة
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {(systemSize.solarArrayCapacityW / 1000).toFixed(1)} kW
                    </p>
                    <p className="text-xs text-gray-400 mt-1">حوالي {systemSize.recommendedPanels} لوح (550W)</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-500" /> حجم الانفرتر (العاكس)
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {(systemSize.inverterSizeW / 1000).toFixed(1)} kW
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                      <Battery className="h-4 w-4 text-green-500" /> سعة بنك البطاريات (48V)
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {Math.ceil(systemSize.batteryCapacityAh)} Ah
                    </p>
                    {daysOfAutonomy > 0 && (
                      <p className="text-xs text-gray-400 mt-1">تقريباً {systemSize.recommendedBatteries} بطارية (200Ah/48V)</p>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
