import React, { useState, useMemo } from 'react';
import { Calculator, Plus, Trash2, Info, Battery, Sun, Zap, ZapOff } from 'lucide-react';
import { CONSUMPTION_PATTERNS } from '../../constants/solarConsumptionPatterns';
import { calculateTotalConsumption, calculateSolarRequirements } from '../../utils/solarCalculatorLogic';

const SolarCalculator = () => {
  const [selectedPattern, setSelectedPattern] = useState(CONSUMPTION_PATTERNS[0].id);
  const [devices, setDevices] = useState(CONSUMPTION_PATTERNS[0].devices);
  const [sunHours, setSunHours] = useState(5.5);

  const handlePatternChange = (e) => {
    const patternId = e.target.value;
    setSelectedPattern(patternId);
    const pattern = CONSUMPTION_PATTERNS.find(p => p.id === patternId);
    if (pattern) {
      // Deep copy to allow editing without affecting constants
      setDevices(JSON.parse(JSON.stringify(pattern.devices)));
    }
  };

  const handleDeviceChange = (index, field, value) => {
    const newDevices = [...devices];
    newDevices[index][field] = value;
    setDevices(newDevices);
  };

  const addDevice = () => {
    const newId = devices.length > 0 ? Math.max(...devices.map(d => d.id)) + 1 : 1;
    setDevices([...devices, { id: newId, name: 'جهاز جديد', power: 100, quantity: 1, hours: 1 }]);
  };

  const removeDevice = (index) => {
    const newDevices = [...devices];
    newDevices.splice(index, 1);
    setDevices(newDevices);
  };

  const { totalPower, totalEnergy } = useMemo(() => calculateTotalConsumption(devices), [devices]);
  const requirements = useMemo(() => calculateSolarRequirements(totalEnergy, totalPower, { sunHours }), [totalEnergy, totalPower, sunHours]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4 text-blue-600">
            <Calculator className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">حاسبة الطاقة الشمسية</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نمط استهلاكك. اختر نوع المنشأة لتعبئة الأجهزة الافتراضية أو أضف أجهزتك الخاصة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نمط الاستهلاك (نوع المنشأة)
                </label>
                <select
                  value={selectedPattern}
                  onChange={handlePatternChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 border bg-white"
                >
                  {CONSUMPTION_PATTERNS.map(pattern => (
                    <option key={pattern.id} value={pattern.id}>{pattern.name}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">الأجهزة الكهربائية</h3>
                  <button
                    onClick={addDevice}
                    className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-1 ml-1" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-right">
                    <thead className="text-xs text-gray-500 bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 rounded-tr-lg">اسم الجهاز</th>
                        <th className="px-4 py-3">القدرة (واط)</th>
                        <th className="px-4 py-3">العدد</th>
                        <th className="px-4 py-3">ساعات التشغيل</th>
                        <th className="px-4 py-3 rounded-tl-lg">إجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {devices.map((device, index) => (
                        <tr key={device.id} className="border-b border-gray-50 last:border-0">
                          <td className="px-2 py-2">
                            <input
                              type="text"
                              value={device.name}
                              onChange={(e) => handleDeviceChange(index, 'name', e.target.value)}
                              className="w-full border-gray-200 rounded p-1.5 text-sm"
                            />
                          </td>
                          <td className="px-2 py-2">
                            <input
                              type="number"
                              min="0"
                              value={device.power}
                              onChange={(e) => handleDeviceChange(index, 'power', e.target.value)}
                              className="w-full border-gray-200 rounded p-1.5 text-sm"
                            />
                          </td>
                          <td className="px-2 py-2">
                            <input
                              type="number"
                              min="1"
                              value={device.quantity}
                              onChange={(e) => handleDeviceChange(index, 'quantity', e.target.value)}
                              className="w-full border-gray-200 rounded p-1.5 text-sm"
                            />
                          </td>
                          <td className="px-2 py-2">
                            <input
                              type="number"
                              min="1"
                              max="24"
                              value={device.hours}
                              onChange={(e) => handleDeviceChange(index, 'hours', e.target.value)}
                              className="w-full border-gray-200 rounded p-1.5 text-sm"
                            />
                          </td>
                          <td className="px-2 py-2 text-center">
                            <button
                              onClick={() => removeDevice(index)}
                              className="text-red-500 hover:text-red-700 p-1"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {devices.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      لا توجد أجهزة مضافة. انقر على "إضافة جهاز" للبدء.
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ساعات السطوع الشمسي (متوسط)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="3"
                    max="8"
                    step="0.5"
                    value={sunHours}
                    onChange={(e) => setSunHours(parseFloat(e.target.value))}
                    className="w-full max-w-xs"
                  />
                  <span className="text-sm font-semibold">{sunHours} ساعات</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Zap className="w-5 h-5 ml-2" />
                ملخص الاستهلاك
              </h2>

              <div className="space-y-4">
                <div>
                  <div className="text-blue-200 text-sm mb-1">إجمالي القدرة (الأحمال)</div>
                  <div className="text-3xl font-bold">
                    {(totalPower / 1000).toFixed(2)} <span className="text-lg font-normal">كيلو واط</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-blue-500/30">
                  <div className="text-blue-200 text-sm mb-1">الاستهلاك اليومي للطاقة</div>
                  <div className="text-3xl font-bold">
                    {(totalEnergy / 1000).toFixed(2)} <span className="text-lg font-normal">كيلو واط/ساعة</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Sun className="w-5 h-5 ml-2 text-orange-500" />
                الاحتياجات المقترحة
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-orange-100 p-2 rounded-lg ml-4 mt-1">
                    <Sun className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">الألواح الشمسية ({requirements.panelRating} واط)</div>
                    <div className="text-xl font-bold text-gray-900">{requirements.numberOfPanels} <span className="text-sm font-normal text-gray-600">لوح</span></div>
                    <div className="text-xs text-gray-400 mt-1">قدرة المصفوفة: {requirements.requiredSolarCapacityKW} كيلو واط</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg ml-4 mt-1">
                    <ZapOff className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">حجم العاكس (الإنفرتر)</div>
                    <div className="text-xl font-bold text-gray-900">{requirements.inverterSizeKW} <span className="text-sm font-normal text-gray-600">كيلو واط</span></div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg ml-4 mt-1">
                    <Battery className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">البطاريات ({requirements.batteryUnitAh}Ah / {requirements.batteryVoltage}V)</div>
                    <div className="text-xl font-bold text-gray-900">{requirements.numberOfBatteries} <span className="text-sm font-normal text-gray-600">بطارية</span></div>
                    <div className="text-xs text-gray-400 mt-1">السعة المطلوبة: {requirements.totalBatteryCapacityAh} أمبير-ساعة</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gray-50 p-3 rounded-lg flex items-start text-xs text-gray-500">
                <Info className="w-4 h-4 ml-2 flex-shrink-0 text-gray-400 mt-0.5" />
                <p>
                  هذه الحسابات تقديرية وتعتمد على المتوسطات. يرجى استشارة مهندس طاقة شمسية لتصميم النظام النهائي بدقة حسب ظروف الموقع الفعلية.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
