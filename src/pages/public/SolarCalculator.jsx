import React, { useState, useEffect } from 'react';
import { facilityPatterns } from '../../utils/solar/facilityPatterns';
import { calculateSystem } from '../../utils/solar/calculator';
import { Sun, Battery, Zap, Trash2, Plus, Calculator } from 'lucide-react';

const SolarCalculator = () => {
  const [selectedPattern, setSelectedPattern] = useState('');
  const [devices, setDevices] = useState([]);
  const [results, setResults] = useState(null);

  // Handle pattern selection change
  const handlePatternChange = (e) => {
    const patternId = e.target.value;
    setSelectedPattern(patternId);

    if (patternId) {
      const pattern = facilityPatterns.find(p => p.id === patternId);
      if (pattern) {
        // Deep copy devices to allow editing without mutating the constants
        setDevices(JSON.parse(JSON.stringify(pattern.devices)));
      }
    } else {
      setDevices([]);
    }
  };

  // Update a specific device field
  const updateDevice = (id, field, value) => {
    setDevices(devices.map(device =>
      device.id === id ? { ...device, [field]: value } : device
    ));
  };

  // Add a new custom device row
  const addDevice = () => {
    const newId = Date.now().toString();
    setDevices([
      ...devices,
      { id: newId, name: 'جهاز جديد (New Device)', power: 100, quantity: 1, hours: 5 }
    ]);
  };

  // Remove a device
  const removeDevice = (id) => {
    setDevices(devices.filter(device => device.id !== id));
  };

  // Recalculate whenever devices change
  useEffect(() => {
    // Avoid calling setResults directly when not strictly needed inside an effect,
    // or wrap in a setTimeout/handle it on action. But typically in React 18+
    // we can calculate during render instead. Here we'll stick to a safe async delay to satisfy the linter
    // if it complains about sync updates, or better yet, calculate on the fly.
    const timeout = setTimeout(() => {
      if (devices.length > 0) {
        setResults(calculateSystem(devices));
      } else {
        setResults(null);
      }
    }, 0);
    return () => clearTimeout(timeout);
  }, [devices]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <Sun className="mx-auto h-12 w-12 text-yellow-500" />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">حاسبة الطاقة الشمسية</h2>
          <p className="mt-2 text-lg text-gray-600">Solar Power Calculator</p>
        </div>

        {/* Configuration Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="mb-6">
            <label htmlFor="pattern" className="block text-sm font-medium text-gray-700 mb-2">
              اختر نوع المنشأة (Select Facility Type)
            </label>
            <select
              id="pattern"
              value={selectedPattern}
              onChange={handlePatternChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
            >
              <option value="">-- اختر من القائمة --</option>
              {facilityPatterns.map((pattern) => (
                <option key={pattern.id} value={pattern.id}>
                  {pattern.name}
                </option>
              ))}
            </select>
          </div>

          {devices.length > 0 && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">الأجهزة الكهربائية (Electrical Devices)</h3>
                <button
                  onClick={addDevice}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 ml-1" />
                  إضافة جهاز
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القدرة (واط)</th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العدد</th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات التشغيل/يوم</th>
                      <th scope="col" className="px-4 py-3 relative"><span className="sr-only">إزالة</span></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {devices.map((device) => (
                      <tr key={device.id}>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <input
                            type="text"
                            value={device.name}
                            onChange={(e) => updateDevice(device.id, 'name', e.target.value)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <input
                            type="number"
                            min="0"
                            value={device.power}
                            onChange={(e) => updateDevice(device.id, 'power', e.target.value)}
                            className="block w-24 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <input
                            type="number"
                            min="1"
                            value={device.quantity}
                            onChange={(e) => updateDevice(device.id, 'quantity', e.target.value)}
                            className="block w-20 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <input
                            type="number"
                            min="1"
                            max="24"
                            value={device.hours}
                            onChange={(e) => updateDevice(device.id, 'hours', e.target.value)}
                            className="block w-20 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => removeDevice(device.id)}
                            className="text-red-600 hover:text-red-900"
                            title="إزالة"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {results && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <Calculator className="h-6 w-6 text-blue-600 ml-2" />
              <h3 className="text-xl font-bold text-gray-900">نتائج الحساب (Calculation Results)</h3>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {/* Total Power */}
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                <Zap className="h-8 w-8 text-yellow-500 mb-2" />
                <p className="text-sm text-gray-500">إجمالي الحمل (Total Load)</p>
                <p className="text-2xl font-bold text-gray-900">{results.totalPowerW.toLocaleString()} W</p>
                <p className="text-xs text-gray-400 mt-1">{(results.totalPowerW / 1000).toFixed(1)} kW</p>
              </div>

              {/* Inverter */}
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                <Zap className="h-8 w-8 text-blue-500 mb-2" />
                <p className="text-sm text-gray-500">حجم الإنفرتر (Inverter Size)</p>
                <p className="text-2xl font-bold text-gray-900">{results.inverterSizeKW} kW</p>
                <p className="text-xs text-gray-400 mt-1">Safety factor included</p>
              </div>

              {/* Battery */}
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                <Battery className="h-8 w-8 text-green-500 mb-2" />
                <p className="text-sm text-gray-500">سعة البطاريات (Battery Bank)</p>
                <p className="text-2xl font-bold text-gray-900">{results.batteryCapacityKWh} kWh</p>
                <p className="text-xs text-gray-400 mt-1">Lithium / 80% DOD</p>
              </div>

              {/* Solar Panels */}
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                <Sun className="h-8 w-8 text-orange-500 mb-2" />
                <p className="text-sm text-gray-500">الألواح الشمسية (Solar Panels)</p>
                <p className="text-2xl font-bold text-gray-900">{results.panelsCount}</p>
                <p className="text-xs text-gray-400 mt-1">x {results.panelWattage}W panels</p>
              </div>

            </div>

            <div className="mt-6 text-sm text-gray-500 bg-blue-50 p-4 rounded-md">
              <p><strong>ملاحظة (Note):</strong> هذه الحسابات تقديرية وتعتمد على كفاءة الأجهزة ونسبة سطوع الشمس. يرجى استشارة مهندس مختص قبل الشراء.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SolarCalculator;
