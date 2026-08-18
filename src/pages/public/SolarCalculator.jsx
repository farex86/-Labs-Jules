import React, { useState, useMemo } from 'react';
import { Calculator, Zap, Battery, Sun, Info, Trash2, Plus } from 'lucide-react';
import { FACILITY_TYPES, DEVICE_CATALOG, calculateSolarSystem } from '../../models/SolarCalculatorModel';

const SolarCalculator = () => {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [customDevices, setCustomDevices] = useState([]);

  // Initialize devices when a facility is selected
  const handleFacilityChange = (e) => {
    const facilityId = e.target.value;
    setSelectedFacility(facilityId);

    if (facilityId) {
      const facility = FACILITY_TYPES.find(f => f.id === facilityId);
      if (facility) {
        const initialDevices = facility.defaultDevices.map((deviceId, index) => ({
          uniqueId: `${deviceId}-${Date.now()}-${index}`,
          id: deviceId,
          quantity: 1,
          hours: DEVICE_CATALOG[deviceId].defaultHours
        }));
        setCustomDevices(initialDevices);
      }
    } else {
      setCustomDevices([]);
    }
  };

  const addDevice = (deviceId) => {
    if (!deviceId) return;
    setCustomDevices([
      ...customDevices,
      {
        uniqueId: `${deviceId}-${Date.now()}`,
        id: deviceId,
        quantity: 1,
        hours: DEVICE_CATALOG[deviceId].defaultHours
      }
    ]);
  };

  const updateDevice = (uniqueId, field, value) => {
    setCustomDevices(customDevices.map(device =>
      device.uniqueId === uniqueId
        ? { ...device, [field]: Number(value) }
        : device
    ));
  };

  const removeDevice = (uniqueId) => {
    setCustomDevices(customDevices.filter(device => device.uniqueId !== uniqueId));
  };

  const results = useMemo(() => calculateSolarSystem(customDevices), [customDevices]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <Calculator className="h-12 w-12 text-blue-600 mx-auto" />
          <h1 className="text-3xl font-bold text-gray-900">الحاسبة الشمسية</h1>
          <p className="text-gray-500">احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك واستهلاكك</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8 space-y-6">

            {/* Facility Selection */}
            <div className="space-y-3">
              <label htmlFor="facility" className="block text-sm font-medium text-gray-700">
                اختر نوع المنشأة
              </label>
              <select
                id="facility"
                value={selectedFacility}
                onChange={handleFacilityChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 bg-gray-50"
              >
                <option value="">-- اختر نوع المنشأة --</option>
                {FACILITY_TYPES.map(facility => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Devices List */}
            {customDevices.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">الأجهزة والاستهلاك</h3>
                  <div className="flex items-center space-x-2 space-x-reverse">
                     <select
                        onChange={(e) => { addDevice(e.target.value); e.target.value = ''; }}
                        className="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 bg-gray-50"
                     >
                        <option value="">+ إضافة جهاز</option>
                        {Object.values(DEVICE_CATALOG).map(device => (
                          <option key={device.id} value={device.id}>
                            {device.name} ({device.powerWatts} واط)
                          </option>
                        ))}
                     </select>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-1">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 p-3 text-sm font-medium text-gray-500 border-b border-gray-200">
                    <div className="col-span-5">الجهاز</div>
                    <div className="col-span-3 text-center">الكمية</div>
                    <div className="col-span-3 text-center">ساعات التشغيل/يوم</div>
                    <div className="col-span-1"></div>
                  </div>

                  {/* Table Body */}
                  <div className="space-y-1 p-1">
                    {customDevices.map((device) => {
                      const catalogInfo = DEVICE_CATALOG[device.id];
                      return (
                        <div key={device.uniqueId} className="grid grid-cols-12 gap-4 p-2 bg-white rounded shadow-sm items-center">
                          <div className="col-span-5 flex flex-col">
                            <span className="font-medium text-gray-900">{catalogInfo.name}</span>
                            <span className="text-xs text-gray-500">{catalogInfo.powerWatts} واط</span>
                          </div>
                          <div className="col-span-3">
                            <input
                              type="number"
                              min="1"
                              value={device.quantity}
                              onChange={(e) => updateDevice(device.uniqueId, 'quantity', e.target.value)}
                              className="block w-full text-center rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 bg-gray-50"
                            />
                          </div>
                          <div className="col-span-3">
                            <input
                              type="number"
                              min="1"
                              max="24"
                              value={device.hours}
                              onChange={(e) => updateDevice(device.uniqueId, 'hours', e.target.value)}
                              className="block w-full text-center rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 bg-gray-50"
                            />
                          </div>
                          <div className="col-span-1 flex justify-center">
                            <button
                              onClick={() => removeDevice(device.uniqueId)}
                              className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Results Section */}
            {customDevices.length > 0 && (
              <div className="pt-6 border-t border-gray-100 space-y-6">
                <h3 className="text-lg font-medium text-gray-900">النتائج التقديرية للنظام</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Solar Panels */}
                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 flex items-start space-x-4 space-x-reverse">
                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                      <Sun className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-900">سعة الألواح المطلوبة</p>
                      <div className="mt-1 flex items-baseline space-x-1 space-x-reverse">
                        <span className="text-2xl font-bold text-blue-700">{(results.recommendedSolarCapacityW / 1000).toFixed(1)}</span>
                        <span className="text-sm text-blue-600">كيلو واط (kW)</span>
                      </div>
                      <p className="text-xs text-blue-500 mt-1">توليد طاقة كافية للاستهلاك اليومي مع هامش كفاءة</p>
                    </div>
                  </div>

                  {/* Battery */}
                  <div className="bg-green-50 rounded-xl p-5 border border-green-100 flex items-start space-x-4 space-x-reverse">
                    <div className="bg-green-100 p-3 rounded-lg text-green-600">
                      <Battery className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-900">سعة البطاريات المطلوبة ({results.systemVoltage}V)</p>
                      <div className="mt-1 flex items-baseline space-x-1 space-x-reverse">
                        <span className="text-2xl font-bold text-green-700">{results.recommendedBatteryCapacityAh}</span>
                        <span className="text-sm text-green-600">أمبير-ساعة (Ah)</span>
                      </div>
                      <p className="text-xs text-green-500 mt-1">تكفي لتشغيل الأجهزة ليلاً بدون شمس</p>
                    </div>
                  </div>

                  {/* Inverter */}
                  <div className="bg-amber-50 rounded-xl p-5 border border-amber-100 flex items-start space-x-4 space-x-reverse">
                    <div className="bg-amber-100 p-3 rounded-lg text-amber-600">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-amber-900">حجم محول التيار (Inverter)</p>
                      <div className="mt-1 flex items-baseline space-x-1 space-x-reverse">
                        <span className="text-2xl font-bold text-amber-700">{(results.recommendedInverterW / 1000).toFixed(1)}</span>
                        <span className="text-sm text-amber-600">كيلو واط (kW)</span>
                      </div>
                      <p className="text-xs text-amber-500 mt-1">لتغطية أقصى سحب متزامن للطاقة</p>
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 flex flex-col justify-center">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">إجمالي الطاقة اليومية:</span>
                        <span className="font-semibold text-gray-900">{(results.totalDailyEnergyWh / 1000).toFixed(1)} kWh</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">أقصى حمل متوقع:</span>
                        <span className="font-semibold text-gray-900">{(results.totalPowerW / 1000).toFixed(1)} kW</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 flex items-start space-x-3 space-x-reverse mt-6">
                  <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800 leading-relaxed">
                    <strong>ملاحظة هامة:</strong> هذه الحسابات تقديرية وتعتمد على متوسط الاستهلاك وساعات سطوع الشمس في المنطقة (مقدرة بـ 5 ساعات ذروة). ينصح دائماً باستشارة مهندس طاقة شمسية مختص لدراسة الموقع بدقة وتحديد المكونات النهائية.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
