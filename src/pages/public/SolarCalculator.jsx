import React, { useState, useEffect } from 'react';
import { FACILITY_PATTERNS } from '../../lib/solar/config';
import { calculateSolarSystem } from '../../lib/solar/calculator';
import { Calculator, Plus, Trash2, Zap, Battery, Sun, Server, Home } from 'lucide-react';

export default function SolarCalculator() {
  const [selectedFacility, setSelectedFacility] = useState(FACILITY_PATTERNS[0].id);
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({ name: '', power: '', quantity: 1, hours: '' });
  const [results, setResults] = useState(null);

  useEffect(() => {
    const facility = FACILITY_PATTERNS.find(f => f.id === selectedFacility);
    if (facility && facility.devices) {
      // We wrap the state update in a timeout to avoid synchronous updates during render phase
      // or we can just derive it, but here we just safely set it
      setTimeout(() => {
        setDevices(JSON.parse(JSON.stringify(facility.devices)));
      }, 0);
    } else {
      setTimeout(() => {
        setDevices([]);
      }, 0);
    }
  }, [selectedFacility]);

  useEffect(() => {
    const calcResults = calculateSolarSystem(devices);
    setTimeout(() => {
      setResults(calcResults);
    }, 0);
  }, [devices]);

  const handleAddDevice = () => {
    if (newDevice.name && newDevice.power && newDevice.hours) {
      setDevices([...devices, { ...newDevice, id: Date.now().toString(), power: Number(newDevice.power), quantity: Number(newDevice.quantity), hours: Number(newDevice.hours) }]);
      setNewDevice({ name: '', power: '', quantity: 1, hours: '' });
    }
  };

  const handleRemoveDevice = (id) => {
    setDevices(devices.filter(d => d.id !== id));
  };

  const handleDeviceChange = (id, field, value) => {
    setDevices(devices.map(d => {
      if (d.id === id) {
        return { ...d, [field]: Number(value) };
      }
      return d;
    }));
  };

  // Helper to format large numbers nicely
  const formatKW = (watts) => {
    if (watts >= 1000) {
      return (watts / 1000).toFixed(2) + ' kW';
    }
    return Math.round(watts) + ' W';
  };

  const formatKWh = (wh) => {
    if (wh >= 1000) {
      return (wh / 1000).toFixed(2) + ' kWh';
    }
    return Math.round(wh) + ' Wh';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Calculator className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">حاسبة الطاقة الشمسية</h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نمط استهلاكك
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="p-6 sm:p-8 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Home className="ml-2 h-5 w-5 text-blue-500" />
              اختر نمط الاستهلاك
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FACILITY_PATTERNS.map((facility) => (
                <button
                  key={facility.id}
                  onClick={() => setSelectedFacility(facility.id)}
                  className={`p-4 rounded-xl border-2 text-right transition-all duration-200 ${
                    selectedFacility === facility.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{facility.name}</div>
                  <div className="text-sm text-gray-500 mt-1">{facility.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">الأجهزة الكهربائية</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 text-gray-600 text-sm">
                    <th className="pb-3 px-4 font-semibold">الجهاز</th>
                    <th className="pb-3 px-4 font-semibold w-24">القدرة (واط)</th>
                    <th className="pb-3 px-4 font-semibold w-24">العدد</th>
                    <th className="pb-3 px-4 font-semibold w-32">ساعات العمل/يوم</th>
                    <th className="pb-3 px-4 font-semibold w-16">إجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device) => (
                    <tr key={device.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-800">{device.name}</td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          className="w-full p-2 border rounded text-center focus:ring-blue-500 focus:border-blue-500"
                          value={device.power}
                          onChange={(e) => handleDeviceChange(device.id, 'power', e.target.value)}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          min="1"
                          className="w-full p-2 border rounded text-center focus:ring-blue-500 focus:border-blue-500"
                          value={device.quantity}
                          onChange={(e) => handleDeviceChange(device.id, 'quantity', e.target.value)}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          min="1"
                          max="24"
                          className="w-full p-2 border rounded text-center focus:ring-blue-500 focus:border-blue-500"
                          value={device.hours}
                          onChange={(e) => handleDeviceChange(device.id, 'hours', e.target.value)}
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleRemoveDevice(device.id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {devices.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-500">
                        لا توجد أجهزة. يرجى إضافة أجهزة للحساب.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">إضافة جهاز جديد</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <input
                  type="text"
                  placeholder="اسم الجهاز"
                  className="md:col-span-2 p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  value={newDevice.name}
                  onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="القدرة (واط)"
                  className="p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  value={newDevice.power}
                  onChange={(e) => setNewDevice({ ...newDevice, power: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="العدد"
                  className="p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  value={newDevice.quantity}
                  onChange={(e) => setNewDevice({ ...newDevice, quantity: e.target.value })}
                />
                <div className="flex space-x-2 space-x-reverse">
                  <input
                    type="number"
                    placeholder="ساعات العمل"
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                    value={newDevice.hours}
                    onChange={(e) => setNewDevice({ ...newDevice, hours: e.target.value })}
                  />
                  <button
                    onClick={handleAddDevice}
                    disabled={!newDevice.name || !newDevice.power || !newDevice.hours}
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[3rem]"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {results && (
          <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl shadow-xl overflow-hidden text-white">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Zap className="ml-2 h-6 w-6 text-yellow-400" />
                النتائج المقدرة للنظام
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/20">
                  <div className="text-blue-200 text-sm font-medium mb-1">الاستهلاك اليومي</div>
                  <div className="text-3xl font-bold text-white">{formatKWh(results.totalDailyEnergy)}</div>
                  <div className="text-blue-300 text-xs mt-2">إجمالي الطاقة المطلوبة يومياً</div>
                </div>

                <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/20">
                  <div className="text-blue-200 text-sm font-medium mb-1 flex items-center">
                    <Sun className="ml-1 h-4 w-4" /> الألواح الشمسية
                  </div>
                  <div className="text-3xl font-bold text-yellow-400">{formatKW(results.solarCapacity)}</div>
                  <div className="text-blue-300 text-xs mt-2">القدرة الإجمالية للألواح المطلوبة</div>
                </div>

                <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/20">
                  <div className="text-blue-200 text-sm font-medium mb-1 flex items-center">
                    <Server className="ml-1 h-4 w-4" /> الإنفرتر (المحول)
                  </div>
                  <div className="text-3xl font-bold text-green-400">{formatKW(results.inverterSize)}</div>
                  <div className="text-blue-300 text-xs mt-2">الحجم المناسب (يتضمن هامش أمان)</div>
                </div>

                <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/20">
                  <div className="text-blue-200 text-sm font-medium mb-1 flex items-center">
                    <Battery className="ml-1 h-4 w-4" /> البطاريات
                  </div>
                  <div className="text-3xl font-bold text-purple-400">{formatKWh(results.batteryRequirements.capacityWh)}</div>
                  <div className="text-blue-300 text-xs mt-2">
                    {Math.round(results.batteryRequirements.capacityAh)} Ah @ {results.batteryRequirements.systemVoltage}V
                  </div>
                </div>
              </div>

              <div className="mt-8 text-sm text-blue-200 bg-black/20 p-4 rounded-lg">
                <p className="font-semibold mb-1">ملاحظة هامة:</p>
                <p>هذه الحسابات تقديرية بناءً على المعطيات المدخلة وثوابت عامة لمتوسط سطوع الشمس وكفاءة الأجهزة. للحصول على تصميم دقيق للنظام يرجى استشارة مهندس متخصص.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
