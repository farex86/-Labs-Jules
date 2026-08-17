import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Calculator, Settings, Sun, Battery, Zap } from 'lucide-react';
import { FACILITY_TYPES, calculateSolarSystem } from '../../models/SolarCalculatorModel';

const SolarCalculator = () => {
  const [selectedFacilityId, setSelectedFacilityId] = useState('');
  const [devices, setDevices] = useState([]);

  // Handle facility change
  const handleFacilityChange = (e) => {
    const facilityId = e.target.value;
    setSelectedFacilityId(facilityId);
    if (facilityId) {
      const facility = FACILITY_TYPES.find(f => f.id === facilityId);
      if (facility) {
        // Deep copy the devices so we can edit them safely
        setDevices(facility.devices.map(d => ({ ...d, id: d.id + '_' + Date.now() + Math.random() })));
      }
    } else {
      setDevices([]);
    }
  };

  const handleDeviceChange = (index, field, value) => {
    const newDevices = [...devices];
    newDevices[index][field] = value;
    setDevices(newDevices);
  };

  const removeDevice = (index) => {
    const newDevices = [...devices];
    newDevices.splice(index, 1);
    setDevices(newDevices);
  };

  const addDevice = () => {
    setDevices([...devices, { id: 'custom_' + Date.now(), name: 'جهاز جديد', power: 0, qty: 1, hours: 0 }]);
  };

  const results = useMemo(() => calculateSolarSystem(devices), [devices]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4"
          >
            <Calculator className="h-8 w-8 text-blue-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
          >
            حاسبة الطاقة الشمسية
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4"
          >
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك وأجهزتك
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Input Form */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-2">
                اختر نوع المنشأة
              </label>
              <select
                id="facility"
                value={selectedFacilityId}
                onChange={handleFacilityChange}
                className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm border"
              >
                <option value="">-- اختر --</option>
                {FACILITY_TYPES.map(facility => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </motion.div>

            {devices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">الأجهزة الكهربائية</h3>
                  <button
                    onClick={addDevice}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <Plus className="h-4 w-4 mr-1 ml-2" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="space-y-4">
                  {devices.map((device, index) => (
                    <motion.div
                      key={device.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col sm:flex-row gap-4 items-end p-4 border border-gray-100 rounded-lg bg-gray-50"
                    >
                      <div className="w-full sm:w-1/4">
                        <label className="block text-xs font-medium text-gray-500 mb-1">اسم الجهاز</label>
                        <input
                          type="text"
                          value={device.name}
                          onChange={(e) => handleDeviceChange(index, 'name', e.target.value)}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
                        />
                      </div>
                      <div className="w-full sm:w-1/4">
                        <label className="block text-xs font-medium text-gray-500 mb-1">القدرة (واط)</label>
                        <input
                          type="number"
                          min="0"
                          value={device.power}
                          onChange={(e) => handleDeviceChange(index, 'power', e.target.value)}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
                        />
                      </div>
                      <div className="w-full sm:w-1/4">
                        <label className="block text-xs font-medium text-gray-500 mb-1">العدد</label>
                        <input
                          type="number"
                          min="1"
                          value={device.qty}
                          onChange={(e) => handleDeviceChange(index, 'qty', e.target.value)}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
                        />
                      </div>
                      <div className="w-full sm:w-1/4">
                        <label className="block text-xs font-medium text-gray-500 mb-1">ساعات العمل (يومياً)</label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          step="0.5"
                          value={device.hours}
                          onChange={(e) => handleDeviceChange(index, 'hours', e.target.value)}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
                        />
                      </div>
                      <button
                        onClick={() => removeDevice(index)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                        title="إزالة الجهاز"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar - Results */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white sticky top-6"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Settings className="h-6 w-6 ml-2" />
                النتائج التقديرية
              </h2>

              <div className="space-y-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-100 text-sm">إجمالي الاستهلاك اليومي</span>
                    <Zap className="h-5 w-5 text-yellow-300" />
                  </div>
                  <div className="text-2xl font-bold">
                    {(results.totalEnergyWh / 1000).toFixed(2)} <span className="text-base font-normal text-blue-200">كيلوواط.ساعة</span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-100 text-sm">حجم العاكس (Inverter)</span>
                    <Calculator className="h-5 w-5 text-green-300" />
                  </div>
                  <div className="text-2xl font-bold">
                    {results.inverterSizeKW} <span className="text-base font-normal text-blue-200">كيلوواط</span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-100 text-sm">الألواح الشمسية</span>
                    <Sun className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="text-2xl font-bold">
                    {results.solarPanelsKW} <span className="text-base font-normal text-blue-200">كيلوواط</span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-100 text-sm">سعة البطاريات المطلوبة</span>
                    <Battery className="h-5 w-5 text-blue-300" />
                  </div>
                  <div className="text-2xl font-bold">
                    {results.batteryCapacityKWh} <span className="text-base font-normal text-blue-200">كيلوواط.ساعة</span>
                  </div>
                  <div className="mt-2 text-xs text-blue-200">
                    * تقدير لعمل الأجهزة خارج أوقات الذروة الشمسية
                  </div>
                </div>
              </div>

              <div className="mt-8 text-xs text-blue-200 text-center bg-black/10 p-3 rounded-lg border border-white/10">
                هذه النتائج تقريبية وتعتمد على متوسط الكفاءة والإشعاع الشمسي. يرجى استشارة مهندس مختص للحصول على تصميم دقيق.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
