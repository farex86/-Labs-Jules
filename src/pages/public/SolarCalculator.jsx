import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Plus, Trash2, Zap, Battery, Sun, Activity, Download } from 'lucide-react';
import { FACILITY_TYPES, calculateSolarSystem } from '../../models/SolarCalculatorModel';
import toast from 'react-hot-toast';

export default function SolarCalculator() {
  const [selectedFacility, setSelectedFacility] = useState(FACILITY_TYPES[0].id);
  const [devices, setDevices] = useState(() => JSON.parse(JSON.stringify(FACILITY_TYPES[0].defaultDevices)));

  // Derive results from devices
  const results = devices.length > 0 ? calculateSolarSystem(devices) : null;

  const handleFacilityChange = (e) => {
    const newFacilityId = e.target.value;
    setSelectedFacility(newFacilityId);
    const facility = FACILITY_TYPES.find(f => f.id === newFacilityId);
    if (facility) {
      setDevices(JSON.parse(JSON.stringify(facility.defaultDevices)));
    }
  };

  const handleDeviceChange = (id, field, value) => {
    setDevices(devices.map(device =>
      device.id === id ? { ...device, [field]: value } : device
    ));
  };

  const removeDevice = (id) => {
    setDevices(devices.filter(device => device.id !== id));
    toast.success('تم حذف الجهاز');
  };

  const addDevice = () => {
    const newDevice = {
      id: Date.now().toString(),
      name: 'جهاز جديد',
      power: 100,
      hours: 1,
      quantity: 1
    };
    setDevices([...devices, newDevice]);
    toast.success('تمت إضافة جهاز جديد');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <Sun className="h-10 w-10 text-yellow-500" />
            <h1 className="text-4xl font-extrabold text-gray-900">حاسبة الطاقة الشمسية</h1>
          </div>
          <p className="text-lg text-gray-600">اختر نوع المنشأة لتحديد احتياجك من الطاقة الشمسية بدقة</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Form & Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Facility Selection */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع المنشأة</label>
              <select
                value={selectedFacility}
                onChange={handleFacilityChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50"
              >
                {FACILITY_TYPES.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Devices List */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-gray-500" />
                  الأجهزة الكهربائية
                </h3>
                <button
                  onClick={addDevice}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
                >
                  <Plus className="h-4 w-4" />
                  إضافة جهاز
                </button>
              </div>

              <div className="space-y-4">
                {devices.map((device) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={device.id}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center p-4 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div className="sm:col-span-3">
                      <label className="block text-xs text-gray-500 mb-1">اسم الجهاز</label>
                      <input
                        type="text"
                        value={device.name}
                        onChange={(e) => handleDeviceChange(device.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-gray-500 mb-1">القدرة (واط)</label>
                      <input
                        type="number"
                        min="0"
                        value={device.power}
                        onChange={(e) => handleDeviceChange(device.id, 'power', e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-xs text-gray-500 mb-1">ساعات التشغيل/يوم</label>
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={device.hours}
                        onChange={(e) => handleDeviceChange(device.id, 'hours', e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-gray-500 mb-1">العدد</label>
                      <input
                        type="number"
                        min="1"
                        value={device.quantity}
                        onChange={(e) => handleDeviceChange(device.id, 'quantity', e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                    <div className="sm:col-span-2 flex justify-end mt-4 sm:mt-0">
                      <button
                        onClick={() => removeDevice(device.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="حذف الجهاز"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}

                {devices.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    لا توجد أجهزة مضافة. قم بإضافة أجهزة لحساب الاحتياج.
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl shadow-xl p-6 text-white sticky top-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Activity className="h-6 w-6 text-blue-300" />
                النتيجة التقديرية
              </h3>

              {results ? (
                <div className="space-y-6">

                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-200 text-sm">سعة المحول (Inverter)</span>
                      <Zap className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="text-3xl font-bold">
                      {results.requiredInverterKw.toFixed(1)} <span className="text-lg font-normal text-blue-200">kW</span>
                    </div>
                    <div className="text-xs text-blue-300 mt-1">يتحمل أقصى حمل تشغيلي ({results.totalPowerW.toLocaleString()} واط)</div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-200 text-sm">الألواح الشمسية</span>
                      <Sun className="h-5 w-5 text-orange-400" />
                    </div>
                    <div className="text-3xl font-bold">
                      {results.requiredPanelsKw.toFixed(1)} <span className="text-lg font-normal text-blue-200">kW</span>
                    </div>
                    <div className="text-xs text-blue-300 mt-1">لإنتاج {(results.totalDailyEnergyWh/1000).toFixed(1)} كيلوواط/ساعة يومياً</div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-200 text-sm">سعة البطاريات</span>
                      <Battery className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="text-3xl font-bold">
                      {results.requiredBatteryAh.toFixed(0)} <span className="text-lg font-normal text-blue-200">Ah</span>
                    </div>
                    <div className="text-xs text-blue-300 mt-1">نظام {results.batteryVoltage} فولت لتشغيل ليلي أو بدون شمس</div>
                  </div>

                  <button className="w-full mt-4 py-3 px-4 bg-white text-blue-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
                    <Download className="h-5 w-5" />
                    حفظ التقرير (PDF)
                  </button>
                  <p className="text-xs text-center text-blue-200 mt-2 opacity-70">
                    * هذه الحسابات تقديرية وتعتمد على دقة البيانات المدخلة والعوامل الجوية.
                  </p>
                </div>
              ) : (
                <div className="text-center py-10 opacity-70">
                  <Activity className="h-12 w-12 mx-auto mb-3 animate-pulse" />
                  <p>جاري الحساب...</p>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
