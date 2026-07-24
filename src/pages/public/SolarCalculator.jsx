import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Trash2, Calculator, Settings, Battery, Zap, Info } from 'lucide-react';
import {
  FACILITY_TYPES,
  getAppliancesForFacility,
  calculateTotalConsumption,
  calculateSystemSize,
  calculatePanelsNeeded,
  calculateBatteryCapacity,
  calculateInverterSize
} from '../../models/SolarCalculatorModel';

const SolarCalculator = () => {
  const [facilityType, setFacilityType] = useState('شركة');
  const [appliances, setAppliances] = useState([]);

  // Initialization
  useEffect(() => {
    setAppliances(getAppliancesForFacility(facilityType));
  }, [facilityType]);

  // Handlers
  const handleFacilityChange = (e) => {
    setFacilityType(e.target.value);
  };

  const handleApplianceChange = (id, field, value) => {
    setAppliances(prev => prev.map(app =>
      app.id === id ? { ...app, [field]: value === '' ? '' : Number(value) } : app
    ));
  };

  const handleAddAppliance = () => {
    const newId = Date.now().toString();
    setAppliances([
      ...appliances,
      { id: newId, name: 'جهاز جديد', power: 100, quantity: 1, hours: 5 }
    ]);
  };

  const handleRemoveAppliance = (id) => {
    setAppliances(prev => prev.filter(app => app.id !== id));
  };

  // Calculations
  const dailyConsumptionWh = useMemo(() => calculateTotalConsumption(appliances), [appliances]);
  const systemSizeW = useMemo(() => calculateSystemSize(dailyConsumptionWh), [dailyConsumptionWh]);
  const panelsNeeded = useMemo(() => calculatePanelsNeeded(systemSizeW), [systemSizeW]);
  const batteryCapacityAh = useMemo(() => calculateBatteryCapacity(dailyConsumptionWh), [dailyConsumptionWh]);
  const inverterSizeW = useMemo(() => calculateInverterSize(appliances), [appliances]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Calculator className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">حاسبة الطاقة الشمسية</h1>
          <p className="mt-2 text-lg text-gray-600">احسب احتياجاتك من الطاقة الشمسية بناءً على نوع المنشأة والأجهزة المستخدمة</p>
        </div>

        {/* Facility Selector */}
        <div className="bg-white rounded-lg shadow p-6">
          <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-2">
            نوع المنشأة
          </label>
          <select
            id="facility"
            value={facilityType}
            onChange={handleFacilityChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {FACILITY_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Appliances List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">الأجهزة الكهربائية</h2>
            <button
              onClick={handleAddAppliance}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 ml-1" /> إضافة جهاز
            </button>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاستهلاك (واط)</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الكمية</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات التشغيل/يوم</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appliances.map((app) => (
                    <tr key={app.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={app.name || ''}
                          onChange={(e) => setAppliances(prev => prev.map(a => a.id === app.id ? { ...a, name: e.target.value } : a))}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          value={app.power}
                          onChange={(e) => handleApplianceChange(app.id, 'power', e.target.value)}
                          className="w-24 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          value={app.quantity}
                          onChange={(e) => handleApplianceChange(app.id, 'quantity', e.target.value)}
                          className="w-20 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={app.hours}
                          onChange={(e) => handleApplianceChange(app.id, 'hours', e.target.value)}
                          className="w-20 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleRemoveAppliance(app.id)} className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">النتائج التقديرية للنظام</h2>
          </div>
          <div className="p-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
              <Zap className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-500">الاستهلاك اليومي</span>
              <span className="text-2xl font-bold text-gray-900">{(dailyConsumptionWh / 1000).toFixed(1)} <span className="text-sm">kWh</span></span>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
              <Settings className="h-8 w-8 text-yellow-600 mb-2" />
              <span className="text-sm font-medium text-gray-500">حجم المنظومة (ألواح)</span>
              <span className="text-2xl font-bold text-gray-900">{(systemSizeW / 1000).toFixed(1)} <span className="text-sm">kW</span></span>
              <div className="text-xs text-gray-500 mt-1 flex items-center justify-center">
                <Info className="h-3 w-3 ml-1" />
                <span>حوالي {panelsNeeded} لوح (500W)</span>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
              <Battery className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-500">سعة البطاريات (48V)</span>
              <span className="text-2xl font-bold text-gray-900">{Math.round(batteryCapacityAh)} <span className="text-sm">Ah</span></span>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
              <Calculator className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-500">حجم الانفرتر (التقديري)</span>
              <span className="text-2xl font-bold text-gray-900">{(inverterSizeW / 1000).toFixed(1)} <span className="text-sm">kW</span></span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SolarCalculator;
