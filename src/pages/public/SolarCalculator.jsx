import React, { useState, useMemo } from 'react';
import { consumptionPatterns, systemDefaults } from '../../lib/solarConfig';

export default function SolarCalculator() {
  const [selectedPatternId, setSelectedPatternId] = useState('');
  const [devices, setDevices] = useState([]);

  // Handle pattern selection
  const handlePatternChange = (e) => {
    const patternId = e.target.value;
    setSelectedPatternId(patternId);

    if (patternId) {
      const pattern = consumptionPatterns.find(p => p.id === patternId);
      // Deep copy to allow editing without affecting the config
      setDevices(JSON.parse(JSON.stringify(pattern.defaultDevices)));
    } else {
      setDevices([]);
    }
  };

  // Device management
  const updateDevice = (index, field, value) => {
    const newDevices = [...devices];
    newDevices[index][field] = Number(value) || 0;
    setDevices(newDevices);
  };

  const removeDevice = (index) => {
    setDevices(devices.filter((_, i) => i !== index));
  };

  const addCustomDevice = () => {
    setDevices([
      ...devices,
      { id: `custom_${Date.now()}`, name: 'جهاز جديد', power: 100, quantity: 1, hours: 1 }
    ]);
  };

  // Calculations
  const results = useMemo(() => {
    if (devices.length === 0) return null;

    // 1. Total Daily Energy Consumption (Wh)
    const totalDailyWh = devices.reduce((sum, device) => {
      return sum + (device.power * device.quantity * device.hours);
    }, 0);

    // 2. Total Power Capacity needed (W) - assuming all might run at once
    const totalPowerW = devices.reduce((sum, device) => {
      return sum + (device.power * device.quantity);
    }, 0);

    // 3. Solar Array Sizing
    // Energy needed / (sun hours * efficiency)
    const requiredSolarArrayW = totalDailyWh / (systemDefaults.sunHours * systemDefaults.systemEfficiency);
    const numberOfPanels = Math.ceil(requiredSolarArrayW / systemDefaults.panelWattage);

    // 4. Inverter Sizing
    // Total power * surge factor
    const requiredInverterW = totalPowerW * systemDefaults.inverterSurgeFactor;
    // Round to nearest kW
    const inverterKW = Math.ceil(requiredInverterW / 1000);

    // 5. Battery Sizing
    // Total Energy * days autonomy / DoD
    const requiredBatteryWh = (totalDailyWh * systemDefaults.daysOfAutonomy) / systemDefaults.batteryDepthOfDischarge;
    // Assuming 48V system, convert to Ah
    const batteryAh_48V = Math.ceil(requiredBatteryWh / systemDefaults.batteryVoltage);

    return {
      dailyConsumptionKWh: (totalDailyWh / 1000).toFixed(2),
      peakPowerKW: (totalPowerW / 1000).toFixed(2),
      recommendedSolarKW: (requiredSolarArrayW / 1000).toFixed(2),
      numberOfPanels,
      inverterKW,
      batteryAh_48V,
      batteryKWh: (requiredBatteryWh / 1000).toFixed(2)
    };
  }, [devices]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen" dir="rtl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">حاسبة الطاقة الشمسية (Solar Calculator)</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          اختر نمط الاستهلاك (Select Consumption Pattern)
        </label>
        <select
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
          value={selectedPatternId}
          onChange={handlePatternChange}
        >
          <option value="">-- اختر نمطاً --</option>
          {consumptionPatterns.map(pattern => (
            <option key={pattern.id} value={pattern.id}>
              {pattern.name}
            </option>
          ))}
        </select>
      </div>

      {devices.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">الأجهزة (Devices)</h2>
            <button
              onClick={addCustomDevice}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              + إضافة جهاز
            </button>
          </div>

          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-200">
                <th className="p-3 text-gray-700">الجهاز</th>
                <th className="p-3 text-gray-700 w-24">الاستهلاك (واط)</th>
                <th className="p-3 text-gray-700 w-24">العدد</th>
                <th className="p-3 text-gray-700 w-24">ساعات التشغيل/يوم</th>
                <th className="p-3 text-gray-700 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-900">{device.name}</td>
                  <td className="p-3">
                    <input
                      type="number"
                      min="1"
                      className="w-full p-2 border rounded"
                      value={device.power}
                      onChange={(e) => updateDevice(index, 'power', e.target.value)}
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      min="1"
                      className="w-full p-2 border rounded"
                      value={device.quantity}
                      onChange={(e) => updateDevice(index, 'quantity', e.target.value)}
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      min="1"
                      max="24"
                      className="w-full p-2 border rounded"
                      value={device.hours}
                      onChange={(e) => updateDevice(index, 'hours', e.target.value)}
                    />
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => removeDevice(index)}
                      className="text-red-500 hover:text-red-700 font-bold px-2 py-1 bg-red-50 rounded"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {results && (
        <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 border-b border-blue-200 pb-2">النتائج المقدرة للنظام الشمسي</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">الاستهلاك اليومي</p>
              <p className="text-2xl font-bold text-gray-800">{results.dailyConsumptionKWh} <span className="text-lg font-normal text-gray-600">كيلوواط.ساعة (kWh)</span></p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">قدرة الألواح المطلوبة</p>
              <p className="text-2xl font-bold text-amber-600">{results.recommendedSolarKW} <span className="text-lg font-normal text-gray-600">كيلوواط (kW)</span></p>
              <p className="text-sm text-gray-500 mt-1">حوالي {results.numberOfPanels} لوح (550W)</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">الإنفرتر المناسب (المحول)</p>
              <p className="text-2xl font-bold text-emerald-600">{results.inverterKW} <span className="text-lg font-normal text-gray-600">كيلوواط (kW)</span></p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">سعة البطاريات (لتشغيل يوم واحد)</p>
              <p className="text-2xl font-bold text-purple-600">{results.batteryKWh} <span className="text-lg font-normal text-gray-600">كيلوواط.ساعة (kWh)</span></p>
              <p className="text-sm text-gray-500 mt-1">~ {results.batteryAh_48V} أمبير.ساعة (نظام 48V)</p>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-500 bg-white p-4 rounded">
            <strong>ملاحظة:</strong> هذه الحسابات تقديرية. تفترض كفاءة نظام {systemDefaults.systemEfficiency * 100}% ومتوسط سطوع شمسي {systemDefaults.sunHours} ساعات/يوم. يُرجى استشارة مهندس مختص للتصميم النهائي.
          </div>
        </div>
      )}
    </div>
  );
}
