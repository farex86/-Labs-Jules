import React, { useState } from 'react';
import { Calculator, Plus, Trash2, Sun, Battery, Zap, AlertCircle } from 'lucide-react';
import {
  facilityTypes,
  calculateTotalDailyEnergy,
  calculateTotalPeakPower,
  calculateSystemSizeKW,
  calculateBatteryCapacityAh,
  calculateInverterSizeW,
  calculatePanelCount
} from '../../lib/solarCalculatorConstants';

const SolarCalculator = () => {
  const [selectedFacilityId, setSelectedFacilityId] = useState('');
  const [devices, setDevices] = useState([]);

  // Handle facility selection change
  const handleFacilityChange = (e) => {
    const facilityId = e.target.value;
    setSelectedFacilityId(facilityId);

    if (facilityId) {
      const facility = facilityTypes.find(f => f.id === facilityId);
      if (facility) {
        // Deep copy to allow editing without mutating constants
        setDevices(JSON.parse(JSON.stringify(facility.devices)));
      }
    } else {
      setDevices([]);
    }
  };

  // Handle device property change
  const handleDeviceChange = (index, field, value) => {
    const newDevices = [...devices];
    const numValue = field === 'name' ? value : (Number(value) >= 0 ? Number(value) : 0);
    newDevices[index] = { ...newDevices[index], [field]: numValue };
    setDevices(newDevices);
  };

  // Add a new empty device row
  const addDevice = () => {
    const newId = devices.length > 0 ? Math.max(...devices.map(d => d.id)) + 1 : 1;
    setDevices([
      ...devices,
      { id: newId, name: 'جهاز جديد', power: 100, quantity: 1, hours: 8 }
    ]);
  };

  // Remove a device row
  const removeDevice = (index) => {
    const newDevices = [...devices];
    newDevices.splice(index, 1);
    setDevices(newDevices);
  };

  // Derive results directly during render to avoid cascading renders
  // per React hook linting rules and memory constraints.
  const deriveResults = () => {
    if (devices.length > 0) {
      const dailyEnergyWh = calculateTotalDailyEnergy(devices);
      const peakPowerW = calculateTotalPeakPower(devices);
      return {
        totalDailyEnergyWh: dailyEnergyWh,
        totalPeakPowerW: peakPowerW,
        systemSizeKW: calculateSystemSizeKW(dailyEnergyWh),
        batteryCapacityAh: calculateBatteryCapacityAh(dailyEnergyWh),
        inverterSizeW: calculateInverterSizeW(peakPowerW),
        panelCount: calculatePanelCount(calculateSystemSizeKW(dailyEnergyWh))
      };
    }
    return {
      totalDailyEnergyWh: 0,
      totalPeakPowerW: 0,
      systemSizeKW: 0,
      batteryCapacityAh: 0,
      inverterSizeW: 0,
      panelCount: 0
    };
  };

  const results = deriveResults();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Calculator className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">الحاسبة الشمسية</h1>
          </div>
          <p className="mt-1 text-sm text-gray-500 mr-11">
            أداة لتقدير احتياجاتك من الطاقة الشمسية بناءً على نوع نشاطك وأجهزتك
          </p>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">1. اختر نوع المنشأة</h2>
              <select
                value={selectedFacilityId}
                onChange={handleFacilityChange}
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="">-- اختر المنشأة --</option>
                {facilityTypes.map(facility => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedFacilityId && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">2. الأجهزة وأنماط الاستهلاك</h2>
                  <button
                    onClick={addDevice}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        <th className="px-4 py-3 rounded-tr-lg">اسم الجهاز</th>
                        <th className="px-4 py-3">القدرة (واط)</th>
                        <th className="px-4 py-3">العدد</th>
                        <th className="px-4 py-3">ساعات العمل/يوم</th>
                        <th className="px-4 py-3 rounded-tl-lg w-16">إجراء</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {devices.map((device, index) => (
                        <tr key={device.id} className="hover:bg-gray-50/50">
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={device.name}
                              onChange={(e) => handleDeviceChange(index, 'name', e.target.value)}
                              className="w-full bg-transparent border-b border-dashed border-gray-300 focus:border-indigo-500 outline-none py-1"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              min="0"
                              value={device.power}
                              onChange={(e) => handleDeviceChange(index, 'power', e.target.value)}
                              className="w-20 bg-transparent border-b border-dashed border-gray-300 focus:border-indigo-500 outline-none py-1"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              min="0"
                              value={device.quantity}
                              onChange={(e) => handleDeviceChange(index, 'quantity', e.target.value)}
                              className="w-16 bg-transparent border-b border-dashed border-gray-300 focus:border-indigo-500 outline-none py-1"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              min="0"
                              max="24"
                              value={device.hours}
                              onChange={(e) => handleDeviceChange(index, 'hours', e.target.value)}
                              className="w-16 bg-transparent border-b border-dashed border-gray-300 focus:border-indigo-500 outline-none py-1"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => removeDevice(index)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {devices.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                            لا توجد أجهزة مضافة. انقر على "إضافة جهاز" للبدء.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-4">النتائج التقديرية</h2>

              <div className="space-y-6">

                {/* System Size */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                    <Sun className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">حجم النظام الشمسي المطلوب</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {results.systemSizeKW > 0 ? results.systemSizeKW.toFixed(2) : '0.00'} <span className="text-base font-medium text-gray-500">كيلو واط (kW)</span>
                    </p>
                  </div>
                </div>

                {/* Panel Count */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">عدد الألواح التقريبي (500W)</p>
                    <p className="text-xl font-bold text-gray-900">
                      {results.panelCount} <span className="text-base font-medium text-gray-500">لوح</span>
                    </p>
                  </div>
                </div>

                {/* Battery Capacity */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                    <Battery className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">سعة البطاريات المطلوبة (48V)</p>
                    <p className="text-xl font-bold text-gray-900">
                      {results.batteryCapacityAh > 0 ? Math.ceil(results.batteryCapacityAh) : '0'} <span className="text-base font-medium text-gray-500">أمبير-ساعة (Ah)</span>
                    </p>
                  </div>
                </div>

                {/* Inverter Size */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">حجم المحول (الإنفرتر) الأدنى</p>
                    <p className="text-xl font-bold text-gray-900">
                      {results.inverterSizeW > 0 ? (results.inverterSizeW / 1000).toFixed(2) : '0.00'} <span className="text-base font-medium text-gray-500">كيلو واط (kW)</span>
                    </p>
                  </div>
                </div>

              </div>

              <div className="mt-8 p-4 bg-orange-50 rounded-lg border border-orange-100 flex gap-3">
                <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-orange-800 leading-relaxed">
                  هذه النتائج تقريبية وتعتمد على متوسط الإشعاع الشمسي (5 ساعات) وعوامل أخرى.
                  للحصول على تصميم دقيق، يرجى استشارة مهندس طاقة شمسية مختص لمعاينة الموقع.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SolarCalculator;
