import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Trash2, Zap, Battery, Sun, LayoutDashboard } from 'lucide-react';
import { FACILITY_TYPES, DEVICE_PRESETS } from '../../lib/solar/constants';
import {
  calculateTotalPower,
  calculateDailyEnergy,
  calculateSystemRequirements
} from '../../lib/solar/calculator';

const SolarCalculator = () => {
  const [selectedFacility, setSelectedFacility] = useState('custom');
  const [devices, setDevices] = useState([]);

  // Initialize with initial presets on load
  useEffect(() => {
    // Initial load will use custom or selected facility
    if (devices.length === 0 && DEVICE_PRESETS[selectedFacility]) {
      setDevices(JSON.parse(JSON.stringify(DEVICE_PRESETS[selectedFacility])));
    }
  }, []);

  const handleFacilityChange = (e) => {
    const newFacility = e.target.value;
    setSelectedFacility(newFacility);
    if (DEVICE_PRESETS[newFacility]) {
      setDevices(JSON.parse(JSON.stringify(DEVICE_PRESETS[newFacility])));
    } else {
      setDevices([]);
    }
  };

  // Calculate results based on devices
  const results = useMemo(() => {
    const totalPower = calculateTotalPower(devices);
    const dailyEnergy = calculateDailyEnergy(devices);
    const requirements = calculateSystemRequirements(totalPower, dailyEnergy);

    return {
      totalPower,
      dailyEnergy,
      ...requirements
    };
  }, [devices]);

  const handleDeviceChange = (index, field, value) => {
    const newDevices = [...devices];
    // Ensure numeric fields are parsed correctly, except when empty allowing user typing
    if (field === 'power' || field === 'quantity' || field === 'hours') {
      newDevices[index][field] = value === '' ? '' : Number(value);
    } else {
      newDevices[index][field] = value;
    }
    setDevices(newDevices);
  };

  const addDevice = () => {
    setDevices([
      ...devices,
      { id: Date.now().toString(), name: '', power: '', quantity: 1, hours: '' }
    ]);
  };

  const removeDevice = (index) => {
    const newDevices = [...devices];
    newDevices.splice(index, 1);
    setDevices(newDevices);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 dir-rtl" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="text-lg text-gray-600">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نمط استهلاكك والأجهزة المستخدمة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Inputs */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Type Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-2">
                نمط الاستهلاك (Facility Type)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <LayoutDashboard className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="facility"
                  value={selectedFacility}
                  onChange={handleFacilityChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 pr-10 py-2 border"
                >
                  {FACILITY_TYPES.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                اختر نوع المنشأة للحصول على الأجهزة المقترحة، أو اختر "مخصص" لإدخال أجهزتك يدوياً.
              </p>
            </div>

            {/* Devices List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">الأجهزة الكهربائية</h2>
                <button
                  onClick={addDevice}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="h-4 w-4 ml-1" />
                  إضافة جهاز
                </button>
              </div>

              {devices.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <p className="text-gray-500">لا توجد أجهزة مضافة. انقر على "إضافة جهاز" للبدء.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                        <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القدرة (واط)</th>
                        <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العدد</th>
                        <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات العمل/يوم</th>
                        <th scope="col" className="relative px-3 py-3"><span className="sr-only">حذف</span></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {devices.map((device, index) => (
                        <tr key={device.id || index}>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              value={device.name}
                              onChange={(e) => handleDeviceChange(index, 'name', e.target.value)}
                              placeholder="اسم الجهاز"
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2"
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              value={device.power}
                              onChange={(e) => handleDeviceChange(index, 'power', e.target.value)}
                              className="block w-24 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2"
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="1"
                              value={device.quantity}
                              onChange={(e) => handleDeviceChange(index, 'quantity', e.target.value)}
                              className="block w-20 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2"
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              max="24"
                              value={device.hours}
                              onChange={(e) => handleDeviceChange(index, 'hours', e.target.value)}
                              className="block w-20 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2"
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-left text-sm font-medium">
                            <button
                              onClick={() => removeDevice(index)}
                              className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50"
                              title="حذف الجهاز"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-indigo-700 rounded-xl shadow-lg p-6 text-white sticky top-6">
              <h2 className="text-2xl font-bold mb-6 text-indigo-50 border-b border-indigo-600 pb-4">
                النتائج التقديرية
              </h2>

              <div className="space-y-6">
                {/* Total Energy Consumption */}
                <div>
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-indigo-600 rounded-lg ml-3">
                      <Zap className="h-5 w-5 text-indigo-200" />
                    </div>
                    <h3 className="text-lg font-medium text-indigo-100">الاستهلاك اليومي</h3>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{(results.dailyEnergy / 1000).toFixed(1)}</span>
                    <span className="mr-2 text-indigo-200 text-sm">كيلوواط.ساعة (kWh)</span>
                  </div>
                  <p className="mt-1 text-sm text-indigo-300">
                    أقصى قدرة لحظية: {(results.totalPower / 1000).toFixed(1)} كيلوواط
                  </p>
                </div>

                <div className="border-t border-indigo-600 pt-6 space-y-6">
                  {/* Recommended System */}
                  <h3 className="text-lg font-medium text-indigo-100 mb-4">النظام الشمسي المطلوب:</h3>

                  {/* Inverter */}
                  <div className="bg-indigo-800/50 rounded-lg p-4 border border-indigo-600/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-indigo-200">حجم العاكس (Inverter)</span>
                      <Zap className="h-4 w-4 text-yellow-400" />
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-white">{results.inverterSizeKW}</span>
                      <span className="mr-1.5 text-sm text-indigo-200">كيلوواط (kW)</span>
                    </div>
                  </div>

                  {/* Battery */}
                  <div className="bg-indigo-800/50 rounded-lg p-4 border border-indigo-600/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-indigo-200">سعة البطاريات (Battery)</span>
                      <Battery className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-white">{results.batteryStorageKWh}</span>
                      <span className="mr-1.5 text-sm text-indigo-200">كيلوواط.ساعة (kWh)</span>
                    </div>
                  </div>

                  {/* Solar Panels */}
                  <div className="bg-indigo-800/50 rounded-lg p-4 border border-indigo-600/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-indigo-200">مصفوفة الألواح (Solar Array)</span>
                      <Sun className="h-4 w-4 text-orange-400" />
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-white">{results.solarArraySizeKW}</span>
                      <span className="mr-1.5 text-sm text-indigo-200">كيلوواط (kW)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-indigo-600 text-xs text-indigo-200 text-center">
                <p>هذه الحسابات تقديرية وتعتمد على المتوسطات. يرجى استشارة مهندس مختص للحصول على تصميم دقيق للنظام.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
