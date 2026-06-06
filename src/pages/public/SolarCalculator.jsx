import React, { useState } from 'react';
import { FACILITY_PROFILES, calculateEnergyRequirements, calculateSystemSize } from '../../utils/solarCalculator';
import { Sun, Battery, Zap, Trash2, Plus, Info } from 'lucide-react';

export default function SolarCalculator() {
  const [selectedFacility, setSelectedFacility] = useState("");
  const [devices, setDevices] = useState([]);
  const [batteryType, setBatteryType] = useState("lithium");
  const [systemVoltage, setSystemVoltage] = useState(48);

  // Calculate derived state during render
  const energyReq = devices.length > 0 ? calculateEnergyRequirements(devices) : null;
  const results = energyReq ? {
    energyReq,
    sizing: calculateSystemSize(energyReq, batteryType, Number(systemVoltage))
  } : null;

  // Handle facility preset selection
  const handleFacilityChange = (e) => {
    const key = e.target.value;
    setSelectedFacility(key);

    if (key && FACILITY_PROFILES[key]) {
      // Deep clone to allow independent editing
      const profileDevices = JSON.parse(JSON.stringify(FACILITY_PROFILES[key].devices));
      setDevices(profileDevices);
    } else {
      setDevices([]);
    }
  };

  // Add a new empty device row
  const addDevice = () => {
    const newDevice = {
      id: Date.now().toString(),
      name: "",
      power: 0,
      quantity: 1,
      hours: 0
    };
    setDevices([...devices, newDevice]);
  };

  // Update a specific device field
  const updateDevice = (id, field, value) => {
    setDevices(devices.map(device =>
      device.id === id ? { ...device, [field]: value } : device
    ));
  };

  // Remove a device
  const removeDevice = (id) => {
    setDevices(devices.filter(device => device.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">حاسبة الطاقة الشمسية</h1>
          <p className="mt-3 text-xl text-gray-500">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نمط استهلاكك
          </p>
        </div>

        {/* Configuration Panel */}
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">

            {/* Facility Selector */}
            <div>
              <label htmlFor="facility" className="block text-sm font-medium text-gray-700">
                نمط الاستهلاك (المنشأة)
              </label>
              <select
                id="facility"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={selectedFacility}
                onChange={handleFacilityChange}
              >
                <option value="">-- اختر نوع المنشأة --</option>
                {Object.entries(FACILITY_PROFILES).map(([key, profile]) => (
                  <option key={key} value={key}>{profile.name}</option>
                ))}
              </select>
            </div>

            {/* Battery Type */}
            <div>
              <label htmlFor="batteryType" className="block text-sm font-medium text-gray-700">
                نوع البطاريات
              </label>
              <select
                id="batteryType"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={batteryType}
                onChange={(e) => setBatteryType(e.target.value)}
              >
                <option value="lithium">ليثيوم (Lithium)</option>
                <option value="lead_acid">جل/أسيد (Lead-Acid)</option>
              </select>
            </div>

            {/* System Voltage */}
            <div>
              <label htmlFor="systemVoltage" className="block text-sm font-medium text-gray-700">
                فولتية النظام (V)
              </label>
              <select
                id="systemVoltage"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={systemVoltage}
                onChange={(e) => setSystemVoltage(e.target.value)}
              >
                <option value="12">12V</option>
                <option value="24">24V</option>
                <option value="48">48V</option>
              </select>
            </div>
          </div>
        </div>

        {/* Devices List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              الأجهزة والأحمال الكهربائية
            </h3>
            <button
              onClick={addDevice}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 ml-2" />
              إضافة جهاز
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">اسم الجهاز</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القدرة (واط)</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العدد</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات التشغيل/يوم</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراء</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {devices.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      لا توجد أجهزة مضافة. اختر نمط استهلاك من الأعلى أو أضف جهازاً يدوياً.
                    </td>
                  </tr>
                ) : (
                  devices.map((device) => (
                    <tr key={device.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={device.name}
                          onChange={(e) => updateDevice(device.id, 'name', e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="اسم الجهاز"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          value={device.power}
                          onChange={(e) => updateDevice(device.id, 'power', e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="1"
                          value={device.quantity}
                          onChange={(e) => updateDevice(device.id, 'quantity', e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={device.hours}
                          onChange={(e) => updateDevice(device.id, 'hours', e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => removeDevice(device.id)}
                          className="text-red-600 hover:text-red-900"
                          title="حذف"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Panel */}
        {results && (
          <div className="bg-indigo-700 rounded-lg shadow-lg overflow-hidden text-white">
            <div className="px-4 py-5 sm:px-6 flex items-center justify-between border-b border-indigo-600">
              <h3 className="text-xl leading-6 font-bold flex items-center">
                <Zap className="h-6 w-6 ml-2 text-yellow-300" />
                حجم النظام المقترح
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-indigo-600">
              {/* Inverter */}
              <div className="bg-indigo-700 p-6">
                <dt className="text-sm font-medium text-indigo-200 truncate">سعة الانفرتر المطلوبة</dt>
                <dd className="mt-2 text-3xl font-semibold">{results.sizing.inverterSizeKW} <span className="text-lg">kW</span></dd>
                <p className="mt-2 text-xs text-indigo-300">يغطي أقصى حمل في نفس الوقت</p>
              </div>

              {/* Solar Panels */}
              <div className="bg-indigo-700 p-6">
                <dt className="text-sm font-medium text-indigo-200 truncate flex items-center">
                  <Sun className="h-4 w-4 ml-1" />
                  الألواح الشمسية
                </dt>
                <dd className="mt-2 text-3xl font-semibold">{results.sizing.solarArraySizeKWp} <span className="text-lg">kWp</span></dd>
                <p className="mt-2 text-xs text-indigo-300">طاقة التوليد المطلوبة يومياً</p>
              </div>

              {/* Batteries (kWh) */}
              <div className="bg-indigo-700 p-6">
                <dt className="text-sm font-medium text-indigo-200 truncate flex items-center">
                  <Battery className="h-4 w-4 ml-1" />
                  سعة البطاريات (طاقة)
                </dt>
                <dd className="mt-2 text-3xl font-semibold">{results.sizing.batteryCapacityKWh} <span className="text-lg">kWh</span></dd>
                <p className="mt-2 text-xs text-indigo-300">إجمالي الطاقة المخزنة</p>
              </div>

              {/* Batteries (Ah) */}
              <div className="bg-indigo-700 p-6">
                <dt className="text-sm font-medium text-indigo-200 truncate flex items-center">
                  <Battery className="h-4 w-4 ml-1" />
                  سعة البطاريات (أمبير)
                </dt>
                <dd className="mt-2 text-3xl font-semibold">{results.sizing.batteryCapacityAh} <span className="text-lg">Ah</span></dd>
                <p className="mt-2 text-xs text-indigo-300">على نظام {results.sizing.systemVoltage} فولت</p>
              </div>
            </div>

            <div className="bg-indigo-800 px-6 py-4 text-sm text-indigo-200 flex items-start">
              <Info className="h-5 w-5 ml-2 flex-shrink-0 mt-0.5" />
              <p>
                هذه الحسابات تقديرية وتعتمد على متوسط الإشعاع الشمسي (متوسط {results.sizing.peakSunHours} ساعات شمس ذروة). ينصح باستشارة مهندس طاقة شمسية معتمد للحصول على تصميم دقيق يتناسب مع ظروف الموقع الفعلي والمواصفات الفنية للمعدات المتاحة في السوق.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
