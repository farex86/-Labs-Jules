import React, { useState, useMemo } from 'react';
import { Calculator, Plus, Trash2, Sun, Battery, Zap } from 'lucide-react';
import { FACILITY_TYPES, DEFAULT_DEVICES_BY_FACILITY } from '../utils/solarCalculatorConfig';
import { calculateLoad, calculateSystemRequirements } from '../utils/solarCalculatorLogic';

const SolarCalculator = () => {
  const [facilityType, setFacilityType] = useState('');
  const [devices, setDevices] = useState([]);

  const handleFacilityChange = (e) => {
    const type = e.target.value;
    setFacilityType(type);

    if (DEFAULT_DEVICES_BY_FACILITY[type]) {
      // Create deep copy to avoid mutating config
      setDevices(JSON.parse(JSON.stringify(DEFAULT_DEVICES_BY_FACILITY[type])));
    } else {
      setDevices([]);
    }
  };

  const addDevice = () => {
    const newDevice = {
      id: Date.now().toString(),
      name: '',
      quantity: 1,
      power: 0,
      hours: 0,
    };
    setDevices([...devices, newDevice]);
  };

  const removeDevice = (id) => {
    setDevices(devices.filter(d => d.id !== id));
  };

  const updateDevice = (id, field, value) => {
    setDevices(devices.map(d => {
      if (d.id === id) {
        return { ...d, [field]: value };
      }
      return d;
    }));
  };

  // Calculate load and requirements using memoization to avoid recalculating on every render unless devices change
  const { totalPower, totalEnergy } = useMemo(() => calculateLoad(devices), [devices]);
  const requirements = useMemo(() => calculateSystemRequirements(totalPower, totalEnergy), [totalPower, totalEnergy]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <Calculator className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">حاسبة الطاقة الشمسية</h1>
          <p className="mt-2 text-lg text-gray-600">احسب متطلبات النظام الشمسي لمنشأتك</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اختر نوع المنشأة
            </label>
            <select
              value={facilityType}
              onChange={handleFacilityChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>-- اختر من القائمة --</option>
              {FACILITY_TYPES.map((type) => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">الأجهزة والأحمال</h2>
              <button
                onClick={addDevice}
                className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-4 h-4 ml-1" />
                إضافة جهاز
              </button>
            </div>

            {devices.length === 0 ? (
              <p className="text-center text-gray-500 py-8">لا توجد أجهزة مضافة. الرجاء اختيار نوع المنشأة أو إضافة أجهزة يدوياً.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-sm font-medium text-gray-600">اسم الجهاز</th>
                      <th className="p-3 text-sm font-medium text-gray-600">العدد</th>
                      <th className="p-3 text-sm font-medium text-gray-600">القدرة (واط)</th>
                      <th className="p-3 text-sm font-medium text-gray-600">ساعات التشغيل/يوم</th>
                      <th className="p-3 text-sm font-medium text-gray-600"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {devices.map((device) => (
                      <tr key={device.id}>
                        <td className="p-2">
                          <input
                            type="text"
                            value={device.name}
                            onChange={(e) => updateDevice(device.id, 'name', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="اسم الجهاز"
                          />
                        </td>
                        <td className="p-2 w-24">
                          <input
                            type="number"
                            min="1"
                            value={device.quantity}
                            onChange={(e) => updateDevice(device.id, 'quantity', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </td>
                        <td className="p-2 w-32">
                          <input
                            type="number"
                            min="0"
                            value={device.power}
                            onChange={(e) => updateDevice(device.id, 'power', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </td>
                        <td className="p-2 w-32">
                          <input
                            type="number"
                            min="0"
                            max="24"
                            value={device.hours}
                            onChange={(e) => updateDevice(device.id, 'hours', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </td>
                        <td className="p-2 w-12 text-center">
                          <button
                            onClick={() => removeDevice(device.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
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

        {totalEnergy > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">النتائج المتوقعة</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">إجمالي القدرة (الأحمال)</p>
                <p className="text-2xl font-bold text-gray-800">{totalPower} واط</p>
                <p className="text-xs text-gray-400 mt-1">{(totalPower/1000).toFixed(2)} كيلوواط</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">إجمالي الاستهلاك اليومي</p>
                <p className="text-2xl font-bold text-gray-800">{totalEnergy} واط.ساعة</p>
                <p className="text-xs text-gray-400 mt-1">{(totalEnergy/1000).toFixed(2)} كيلوواط.ساعة</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-4">النظام المقترح:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 flex flex-col items-center text-center">
                <Zap className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">العاكس (Inverter)</h4>
                <p className="text-2xl font-bold text-blue-700 mb-1">{requirements.inverter.powerKVA} kVA</p>
                <p className="text-sm text-gray-600">{requirements.inverter.description}</p>
              </div>

              <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-100 flex flex-col items-center text-center">
                <Sun className="w-8 h-8 text-yellow-600 mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">الألواح الشمسية</h4>
                <p className="text-2xl font-bold text-yellow-700 mb-1">{requirements.panels.count} لوح</p>
                <p className="text-sm text-gray-600">{requirements.panels.description}</p>
              </div>

              <div className="bg-green-50 p-5 rounded-xl border border-green-100 flex flex-col items-center text-center">
                <Battery className="w-8 h-8 text-green-600 mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">البطاريات</h4>
                <p className="text-2xl font-bold text-green-700 mb-1">{requirements.battery.count} وحدة</p>
                <p className="text-sm text-gray-600">{requirements.battery.description}</p>
              </div>

            </div>

            <p className="text-xs text-gray-400 mt-6 text-center">
              * هذه الحسابات تقديرية وتعتمد على متوسطات السطوع الشمسي. يفضل استشارة مهندس مختص للحصول على تصميم دقيق.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolarCalculator;
