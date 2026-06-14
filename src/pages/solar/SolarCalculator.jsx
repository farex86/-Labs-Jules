import React, { useState, useEffect } from 'react';
import { consumptionPatterns } from '../../data/solarConsumptionPatterns';
import { calculateSolarSystem } from '../../utils/solarCalculatorLogic';
import { Calculator, Plus, Trash2, Battery, Sun, Zap, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const SolarCalculator = () => {
  const [selectedPatternId, setSelectedPatternId] = useState(consumptionPatterns[0].id);
  const [devices, setDevices] = useState([]);
  const [results, setResults] = useState(null);

  // When pattern changes, load the default devices for that pattern
  useEffect(() => {
    const pattern = consumptionPatterns.find(p => p.id === selectedPatternId);
    if (pattern) {
      // Deep copy to allow editing without mutating the constants
      setDevices(JSON.parse(JSON.stringify(pattern.devices)));
    }
  }, [selectedPatternId]);

  // Recalculate whenever devices change
  useEffect(() => {
    if (devices.length > 0) {
      const calculation = calculateSolarSystem(devices);
      setResults(calculation);
    } else {
      setResults(null);
    }
  }, [devices]);

  const handleDeviceChange = (index, field, value) => {
    const newDevices = [...devices];
    newDevices[index][field] = value;
    setDevices(newDevices);
  };

  const addDevice = () => {
    setDevices([
      ...devices,
      { id: Date.now().toString(), name: 'جهاز جديد (New Device)', power: 100, quantity: 1, hours: 1 }
    ]);
  };

  const removeDevice = (index) => {
    const newDevices = [...devices];
    newDevices.splice(index, 1);
    setDevices(newDevices);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Calculator className="ml-3 h-8 w-8 text-blue-600" />
              حاسبة الطاقة الشمسية (Solar Calculator)
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              قم باختيار نوع المنشأة لحساب متطلبات النظام الشمسي المناسب لك.
            </p>
          </div>
          <Link to="/" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            العودة للرئيسية &rarr;
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 bg-blue-50 border-b border-blue-100">
            <label htmlFor="pattern-select" className="block text-lg font-medium text-gray-700 mb-2">
              اختر نوع المنشأة (Select Facility Type):
            </label>
            <select
              id="pattern-select"
              className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg rounded-md"
              value={selectedPatternId}
              onChange={(e) => setSelectedPatternId(e.target.value)}
              dir="rtl"
            >
              {consumptionPatterns.map((pattern) => (
                <option key={pattern.id} value={pattern.id}>
                  {pattern.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse">
            {/* Devices Section */}
            <div className="p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">الأجهزة والاستهلاك (Devices)</h2>
                <button
                  onClick={addDevice}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                  إضافة جهاز
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز (Device)</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القدرة - واط (Power W)</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العدد (Qty)</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات التشغيل (Hours/Day)</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {devices.map((device, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={device.name}
                            onChange={(e) => handleDeviceChange(index, 'name', e.target.value)}
                          />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            min="0"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={device.power}
                            onChange={(e) => handleDeviceChange(index, 'power', e.target.value)}
                          />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            min="1"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={device.quantity}
                            onChange={(e) => handleDeviceChange(index, 'quantity', e.target.value)}
                          />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            min="0"
                            max="24"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={device.hours}
                            onChange={(e) => handleDeviceChange(index, 'hours', e.target.value)}
                          />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-left text-sm font-medium">
                          <button
                            onClick={() => removeDevice(index)}
                            className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-full"
                            title="حذف"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {devices.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                          لا توجد أجهزة مضافة. انقر على "إضافة جهاز" للبدء.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Results Section */}
            <div className="p-6 bg-gray-50 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center border-b pb-4">النتائج التقديرية للأنظمة</h2>

              {results ? (
                <div className="space-y-6">
                  {/* Total Energy */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-blue-100 p-3 rounded-md">
                        <Activity className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="mr-4">
                        <p className="text-sm font-medium text-gray-500">الاستهلاك اليومي (Daily Energy)</p>
                        <p className="text-xl font-bold text-gray-900">{results.dailyEnergyKWh} kWh</p>
                      </div>
                    </div>
                  </div>

                  {/* Inverter Capacity */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-purple-100 p-3 rounded-md">
                        <Zap className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="mr-4">
                        <p className="text-sm font-medium text-gray-500">سعة الانفرتر (Inverter Capacity)</p>
                        <p className="text-xl font-bold text-gray-900">{results.inverterCapacityKW} kW</p>
                      </div>
                    </div>
                  </div>

                  {/* Panels */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-md">
                        <Sun className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="mr-4">
                        <p className="text-sm font-medium text-gray-500">الألواح الشمسية (Solar Panels)</p>
                        <p className="text-xl font-bold text-gray-900">{results.numberOfPanels} لوح</p>
                        <p className="text-xs text-gray-400">سعة إجمالية {results.totalPanelCapacityKW} kW</p>
                      </div>
                    </div>
                  </div>

                  {/* Batteries */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-100 p-3 rounded-md">
                        <Battery className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="mr-4">
                        <p className="text-sm font-medium text-gray-500">البطاريات (Batteries)</p>
                        <p className="text-xl font-bold text-gray-900">{results.numberOfBatteries} بطارية</p>
                        <p className="text-xs text-gray-400">بطارية 12V 200Ah لتشغيل يوم واحد</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-10">
                  يرجى إضافة أجهزة لرؤية النتائج
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
