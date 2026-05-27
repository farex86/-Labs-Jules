import React, { useState, useMemo } from 'react';
import { CONSUMPTION_PATTERNS } from '../../lib/solar/constants';
import { calculateLoad, calculateSystemSize } from '../../lib/solar/calculator';
import { Calculator, Plus, Trash2, Zap, Battery, Sun, Activity } from 'lucide-react';

let deviceIdCounter = 0;
const generateId = () => {
  deviceIdCounter += 1;
  return deviceIdCounter;
};

export default function SolarCalculator() {
  const [pattern, setPattern] = useState(CONSUMPTION_PATTERNS[0].id);
  const [devices, setDevices] = useState([
    { id: generateId(), name: '', power: '', hours: '', quantity: 1 }
  ]);

  const addDevice = () => {
    setDevices([...devices, { id: generateId(), name: '', power: '', hours: '', quantity: 1 }]);
  };

  const removeDevice = (id) => {
    setDevices(devices.filter(d => d.id !== id));
  };

  const updateDevice = (id, field, value) => {
    setDevices(devices.map(d =>
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  const { totalPowerW, totalDailyWh } = useMemo(() => calculateLoad(devices), [devices]);
  const systemRecommendation = useMemo(() => calculateSystemSize(totalDailyWh, totalPowerW), [totalDailyWh, totalPowerW]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 dir-rtl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <Calculator className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900">حاسبة الطاقة الشمسية</h1>
          <p className="mt-4 text-lg text-gray-600">احسب حجم النظام الشمسي المناسب لاحتياجاتك</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <div className="mb-8">
              <label htmlFor="pattern" className="block text-sm font-medium text-gray-700 mb-2">
                نمط الاستهلاك (نوع المنشأة)
              </label>
              <select
                id="pattern"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                dir="rtl"
              >
                {CONSUMPTION_PATTERNS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">الأجهزة الكهربائية</h2>
                <button
                  onClick={addDevice}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-1 ml-1" /> إضافة جهاز
                </button>
              </div>

              <div className="space-y-4">
                {devices.map((device) => (
                  <div key={device.id} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-gray-50 p-4 rounded-md">
                    <div className="w-full sm:w-1/3">
                      <label className="block text-xs text-gray-500 mb-1">اسم الجهاز</label>
                      <input
                        type="text"
                        value={device.name}
                        onChange={(e) => updateDevice(device.id, 'name', e.target.value)}
                        placeholder="مثال: مكيف، لمبة"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2 text-right"
                      />
                    </div>
                    <div className="w-full sm:w-1/5">
                      <label className="block text-xs text-gray-500 mb-1">القدرة (واط)</label>
                      <input
                        type="number"
                        min="0"
                        value={device.power}
                        onChange={(e) => updateDevice(device.id, 'power', e.target.value)}
                        placeholder="واط"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
                      />
                    </div>
                    <div className="w-full sm:w-1/5">
                      <label className="block text-xs text-gray-500 mb-1">العدد</label>
                      <input
                        type="number"
                        min="1"
                        value={device.quantity}
                        onChange={(e) => updateDevice(device.id, 'quantity', e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
                      />
                    </div>
                    <div className="w-full sm:w-1/5">
                      <label className="block text-xs text-gray-500 mb-1">ساعات العمل/يوم</label>
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={device.hours}
                        onChange={(e) => updateDevice(device.id, 'hours', e.target.value)}
                        placeholder="ساعات"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
                      />
                    </div>
                    <div className="w-full sm:w-auto pt-5">
                      <button
                        onClick={() => removeDevice(device.id)}
                        disabled={devices.length === 1}
                        className="text-red-500 hover:text-red-700 disabled:opacity-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {totalDailyWh > 0 && (
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg leading-6 font-medium text-gray-900">النتائج الموصى بها للنظام الشمسي</h3>
            </div>
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-100 flex items-center">
                  <Activity className="h-10 w-10 text-blue-500 ml-4" />
                  <div>
                    <p className="text-sm text-blue-700 font-medium">الاستهلاك اليومي الكلي</p>
                    <p className="text-2xl font-bold text-blue-900">{(totalDailyWh / 1000).toFixed(2)} كيلوواط ساعة</p>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-5 border border-purple-100 flex items-center">
                  <Zap className="h-10 w-10 text-purple-500 ml-4" />
                  <div>
                    <p className="text-sm text-purple-700 font-medium">أقصى حمل (قدرة الذروة)</p>
                    <p className="text-2xl font-bold text-purple-900">{(totalPowerW / 1000).toFixed(2)} كيلوواط</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <Sun className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                  <h4 className="text-sm font-medium text-gray-500 mb-1">حجم الألواح الشمسية</h4>
                  <p className="text-xl font-bold text-gray-900">{systemRecommendation.arraySizeKw.toFixed(1)} kW</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <Activity className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h4 className="text-sm font-medium text-gray-500 mb-1">عدد الألواح (تقريبي)</h4>
                  <p className="text-xl font-bold text-gray-900">{systemRecommendation.numberOfPanels} لوح</p>
                  <p className="text-xs text-gray-400 mt-1">(لوح 550W)</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <h4 className="text-sm font-medium text-gray-500 mb-1">حجم المحول (الإنفرتر)</h4>
                  <p className="text-xl font-bold text-gray-900">{systemRecommendation.inverterSizeKw.toFixed(1)} kW</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <Battery className="h-8 w-8 text-teal-500 mx-auto mb-2" />
                  <h4 className="text-sm font-medium text-gray-500 mb-1">سعة البطاريات المطلوبة</h4>
                  <p className="text-xl font-bold text-gray-900">{Math.round(systemRecommendation.batteryCapacityAh)} Ah</p>
                  <p className="text-xs text-gray-400 mt-1">(على نظام {systemRecommendation.batteryVoltage}V)</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
