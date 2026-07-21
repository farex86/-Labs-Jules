import React, { useState, useEffect } from 'react';
import { facilityTypes, calculateSolarSystem } from '../../models/SolarCalculatorModel';
import { Calculator, Plus, Trash2, Zap, Battery, Sun, Server } from 'lucide-react';

export default function SolarCalculator() {
  const [selectedFacilityId, setSelectedFacilityId] = useState('custom');
  const [appliances, setAppliances] = useState([]);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const facility = facilityTypes.find(f => f.id === selectedFacilityId);
    if (facility) {
      setAppliances(JSON.parse(JSON.stringify(facility.appliances)));
    }
  }, [selectedFacilityId]);

  useEffect(() => {
    setResults(calculateSolarSystem(appliances));
  }, [appliances]);

  const handleApplianceChange = (id, field, value) => {
    setAppliances(prev => prev.map(app =>
      app.id === id ? { ...app, [field]: value } : app
    ));
  };

  const handleAddAppliance = () => {
    const newId = appliances.length > 0 ? Math.max(...appliances.map(a => a.id)) + 1 : 1;
    setAppliances([...appliances, { id: newId, name: 'جهاز جديد', power: 0, quantity: 1, hours: 0 }]);
  };

  const handleRemoveAppliance = (id) => {
    setAppliances(prev => prev.filter(app => app.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <Calculator className="mx-auto h-12 w-12 text-blue-600" />
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900">حاسبة الطاقة الشمسية</h1>
          <p className="mt-2 text-lg text-gray-600">اختر نوع المنشأة لتخصيص حسابات الطاقة الخاصة بك</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-6">
            <label htmlFor="facility-type" className="block text-sm font-medium text-gray-700 mb-2">نوع المنشأة</label>
            <select
              id="facility-type"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={selectedFacilityId}
              onChange={(e) => setSelectedFacilityId(e.target.value)}
            >
              {facilityTypes.map(ft => (
                <option key={ft.id} value={ft.id}>{ft.name}</option>
              ))}
            </select>
          </div>

          {/* Appliances Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القدرة (واط)</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العدد</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات العمل</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراء</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appliances.map(app => (
                  <tr key={app.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        value={app.name}
                        onChange={(e) => handleApplianceChange(app.id, 'name', e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={app.power}
                        onChange={(e) => handleApplianceChange(app.id, 'power', e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={app.quantity}
                        onChange={(e) => handleApplianceChange(app.id, 'quantity', e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={app.hours}
                        onChange={(e) => handleApplianceChange(app.id, 'hours', e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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

          <div className="mt-4 flex justify-start">
             <button
                type="button"
                onClick={handleAddAppliance}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                إضافة جهاز
              </button>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">النتائج المقدرة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 flex items-center space-x-4 space-x-reverse">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-blue-600 font-medium">الطاقة الكلية المطلوبة</p>
                  <p className="text-2xl font-bold text-blue-900">{results.totalPowerWatts.toFixed(0)} W</p>
                  <p className="text-xs text-blue-500">{(results.totalDailyEnergyWh / 1000).toFixed(2)} kWh/day</p>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border border-green-100 flex items-center space-x-4 space-x-reverse">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <Server className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-green-600 font-medium">حجم الانفرتر (المحول)</p>
                  <p className="text-2xl font-bold text-green-900">{results.inverterSizeKVA.toFixed(2)} kVA</p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100 flex items-center space-x-4 space-x-reverse">
                <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                  <Sun className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-yellow-600 font-medium">الألواح الشمسية</p>
                  <p className="text-2xl font-bold text-yellow-900">{results.numberOfPanels} لوح</p>
                  <p className="text-xs text-yellow-500">بقدرة {results.panelWattage}W للوح</p>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 border border-purple-100 flex items-center space-x-4 space-x-reverse">
                <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                  <Battery className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-purple-600 font-medium">سعة البطاريات المطلوبة</p>
                  <p className="text-2xl font-bold text-purple-900">{results.batteryCapacityAh.toFixed(0)} Ah</p>
                  <p className="text-xs text-purple-500">على نظام {results.systemVoltage}V</p>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
