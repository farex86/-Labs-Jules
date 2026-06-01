import React, { useState, useMemo } from 'react';
import { facilities, defaultAppliances } from '../utils/solarCalculatorData';
import {
  calculateTotalEnergy,
  calculatePeakPower,
  calculatePanelCapacity,
  calculateInverterSize,
  calculateBatteryCapacity
} from '../utils/solarCalculatorLogic';
import { Plus, Trash2, Calculator, Settings, Zap, Battery, Sun } from 'lucide-react';

const SolarCalculator = () => {
  const [selectedFacility, setSelectedFacility] = useState(facilities[0]);
  const [appliances, setAppliances] = useState([...defaultAppliances]);

  const handleFacilityChange = (e) => {
    setSelectedFacility(e.target.value);
    // In a real scenario, you might load different default appliances based on the facility
    // Here we just reset to defaults for demonstration
    setAppliances([...defaultAppliances]);
  };

  const handleAddAppliance = () => {
    const newId = (appliances.length > 0 ? Math.max(...appliances.map(a => parseInt(a.id))) + 1 : 1).toString();
    setAppliances([...appliances, { id: newId, name: 'New Appliance', power: 0, quantity: 1, hours: 0 }]);
  };

  const handleUpdateAppliance = (id, field, value) => {
    setAppliances(appliances.map(app => {
      if (app.id === id) {
        return { ...app, [field]: field === 'name' ? value : Number(value) };
      }
      return app;
    }));
  };

  const handleRemoveAppliance = (id) => {
    setAppliances(appliances.filter(app => app.id !== id));
  };

  const totalEnergy = useMemo(() => calculateTotalEnergy(appliances), [appliances]);
  const peakPower = useMemo(() => calculatePeakPower(appliances), [appliances]);
  const panelCapacity = useMemo(() => calculatePanelCapacity(totalEnergy), [totalEnergy]);
  const inverterSize = useMemo(() => calculateInverterSize(peakPower), [peakPower]);
  const batteryCapacity = useMemo(() => calculateBatteryCapacity(totalEnergy), [totalEnergy]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <Calculator className="w-8 h-8 text-blue-600" />
            حاسبة الطاقة الشمسية (Solar Calculator)
          </h1>
          <p className="mt-2 text-gray-600">احسب احتياجاتك من الطاقة الشمسية بناءً على استهلاكك</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Input Section */}
          <div className="md:col-span-2 space-y-6">

            {/* Facility Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                نوع المنشأة (Facility Type)
              </h2>
              <select
                value={selectedFacility}
                onChange={handleFacilityChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              >
                {facilities.map((facility, index) => (
                  <option key={index} value={facility}>
                    {facility}
                  </option>
                ))}
              </select>
            </div>

            {/* Appliances List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  الأجهزة الكهربائية (Appliances)
                </h2>
                <button
                  onClick={handleAddAppliance}
                  className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  إضافة جهاز
                </button>
              </div>

              <div className="space-y-4">
                {appliances.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">لا توجد أجهزة. أضف جهازاً للبدء.</p>
                ) : (
                  appliances.map((appliance) => (
                    <div key={appliance.id} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 items-start sm:items-center">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">اسم الجهاز</label>
                        <input
                          type="text"
                          value={appliance.name}
                          onChange={(e) => handleUpdateAppliance(appliance.id, 'name', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div className="w-full sm:w-24">
                        <label className="block text-xs text-gray-500 mb-1">القدرة (واط)</label>
                        <input
                          type="number"
                          min="0"
                          value={appliance.power}
                          onChange={(e) => handleUpdateAppliance(appliance.id, 'power', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div className="w-full sm:w-20">
                        <label className="block text-xs text-gray-500 mb-1">العدد</label>
                        <input
                          type="number"
                          min="1"
                          value={appliance.quantity}
                          onChange={(e) => handleUpdateAppliance(appliance.id, 'quantity', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div className="w-full sm:w-24">
                        <label className="block text-xs text-gray-500 mb-1">ساعات العمل</label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={appliance.hours}
                          onChange={(e) => handleUpdateAppliance(appliance.id, 'hours', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        onClick={() => handleRemoveAppliance(appliance.id)}
                        className="mt-5 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="حذف الجهاز"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white sticky top-6">
              <h2 className="text-xl font-bold mb-6 border-b border-blue-400/30 pb-4">نتائج الحساب (Results)</h2>

              <div className="space-y-6">

                <div>
                  <div className="flex items-center gap-2 text-blue-100 text-sm mb-1">
                    <Zap className="w-4 h-4" />
                    الاستهلاك اليومي للطاقة
                  </div>
                  <div className="text-3xl font-bold">
                    {(totalEnergy / 1000).toFixed(2)} <span className="text-lg font-normal text-blue-200">kWh</span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-blue-100 text-sm mb-1">
                      <Sun className="w-4 h-4" />
                      سعة الألواح المطلوبة
                    </div>
                    <div className="text-2xl font-bold">
                      {panelCapacity.toFixed(0)} <span className="text-sm font-normal text-blue-200">Watts</span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2 text-blue-100 text-sm mb-1">
                      <Zap className="w-4 h-4" />
                      حجم الانفرتر (المحول)
                    </div>
                    <div className="text-2xl font-bold">
                      {inverterSize.toFixed(0)} <span className="text-sm font-normal text-blue-200">Watts</span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2 text-blue-100 text-sm mb-1">
                      <Battery className="w-4 h-4" />
                      سعة البطاريات (24V)
                    </div>
                    <div className="text-2xl font-bold">
                      {batteryCapacity.toFixed(0)} <span className="text-sm font-normal text-blue-200">Ah</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="mt-6 text-xs text-blue-200 text-center">
                هذه الحسابات تقديرية. يرجى استشارة مهندس مختص.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
