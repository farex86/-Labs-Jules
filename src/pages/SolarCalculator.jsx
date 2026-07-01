import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { Plus, Trash2, Calculator, Settings2, Zap, Battery, Sun, Building2 } from 'lucide-react';
import { useSolarCalculatorStore } from '../store/useSolarCalculatorStore';
import { FACILITY_PATTERNS } from '../lib/solarCalculatorConfig';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function SolarCalculator() {
  const {
    selectedFacilityId,
    devices,
    calculationResult,
    setFacility,
    updateDevice,
    addDevice,
    removeDevice,
    calculate
  } = useSolarCalculatorStore();

  const [isLoading, setIsLoading] = useState(true);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [newDevicePower, setNewDevicePower] = useState('');
  const [newDeviceQuantity, setNewDeviceQuantity] = useState('');
  const [newDeviceHours, setNewDeviceHours] = useState('');

  // Simulate loading to show skeleton effect for UX
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleCalculate = () => {
    calculate();
    toast.success('تم الحساب بنجاح!');
  };

  const handleAddCustomDevice = (e) => {
    e.preventDefault();
    if (!newDeviceName || !newDevicePower || !newDeviceQuantity || !newDeviceHours) {
      toast.error('الرجاء إدخال جميع بيانات الجهاز');
      return;
    }

    const device = {
      id: `custom_${Date.now()}`,
      name: newDeviceName,
      powerWatts: parseInt(newDevicePower),
      quantity: parseInt(newDeviceQuantity),
      hoursPerDay: parseInt(newDeviceHours)
    };

    addDevice(device);
    setNewDeviceName('');
    setNewDevicePower('');
    setNewDeviceQuantity('');
    setNewDeviceHours('');
    toast.success('تم إضافة الجهاز بنجاح');
  };

  const handleRemoveDevice = (id) => {
    removeDevice(id);
    toast.success('تم إزالة الجهاز');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8" dir="rtl">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse"></div>
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-8" dir="rtl">
      <Toaster position="top-center" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Sun className="text-yellow-500 w-8 h-8" />
            الحاسبة الشمسية (Solar Calculator)
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع نشاطك وأجهزتك.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Input and Setup */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Selection */}
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-500" />
                اختر نوع النشاط
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {FACILITY_PATTERNS.map(pattern => (
                  <button
                    key={pattern.id}
                    onClick={() => setFacility(pattern.id)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedFacilityId === pattern.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                    }`}
                  >
                    {pattern.name}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Devices List */}
            {selectedFacilityId && (
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Settings2 className="w-5 h-5 text-green-500" />
                    الأجهزة الكهربائية
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="border-b dark:border-gray-700">
                        <th className="pb-3 text-gray-500 dark:text-gray-400">الجهاز</th>
                        <th className="pb-3 text-gray-500 dark:text-gray-400">الاستهلاك (واط)</th>
                        <th className="pb-3 text-gray-500 dark:text-gray-400">العدد</th>
                        <th className="pb-3 text-gray-500 dark:text-gray-400">ساعات العمل/يوم</th>
                        <th className="pb-3 text-gray-500 dark:text-gray-400">إجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {devices.map((device) => (
                        <motion.tr key={device.id} variants={itemVariants} className="border-b dark:border-gray-700 last:border-0">
                          <td className="py-3 font-medium">{device.name}</td>
                          <td className="py-3">
                            <input
                              type="number"
                              value={device.powerWatts}
                              onChange={(e) => updateDevice(device.id, { powerWatts: Number(e.target.value) })}
                              className="w-20 p-1 border dark:border-gray-600 rounded bg-transparent"
                            />
                          </td>
                          <td className="py-3">
                            <input
                              type="number"
                              value={device.quantity}
                              onChange={(e) => updateDevice(device.id, { quantity: Number(e.target.value) })}
                              className="w-16 p-1 border dark:border-gray-600 rounded bg-transparent"
                            />
                          </td>
                          <td className="py-3">
                            <input
                              type="number"
                              value={device.hoursPerDay}
                              onChange={(e) => updateDevice(device.id, { hoursPerDay: Number(e.target.value) })}
                              className="w-16 p-1 border dark:border-gray-600 rounded bg-transparent"
                            />
                          </td>
                          <td className="py-3">
                            <button onClick={() => handleRemoveDevice(device.id)} className="text-red-500 hover:text-red-700">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add Custom Device Form */}
                <form onSubmit={handleAddCustomDevice} className="mt-6 pt-6 border-t dark:border-gray-700 grid grid-cols-1 md:grid-cols-5 gap-3">
                  <input
                    type="text"
                    placeholder="اسم الجهاز الإضافي"
                    value={newDeviceName}
                    onChange={(e) => setNewDeviceName(e.target.value)}
                    className="p-2 border dark:border-gray-600 rounded bg-transparent md:col-span-2"
                  />
                  <input
                    type="number"
                    placeholder="الواط"
                    value={newDevicePower}
                    onChange={(e) => setNewDevicePower(e.target.value)}
                    className="p-2 border dark:border-gray-600 rounded bg-transparent"
                  />
                  <input
                    type="number"
                    placeholder="العدد"
                    value={newDeviceQuantity}
                    onChange={(e) => setNewDeviceQuantity(e.target.value)}
                    className="p-2 border dark:border-gray-600 rounded bg-transparent"
                  />
                  <input
                    type="number"
                    placeholder="ساعات العمل"
                    value={newDeviceHours}
                    onChange={(e) => setNewDeviceHours(e.target.value)}
                    className="p-2 border dark:border-gray-600 rounded bg-transparent"
                  />
                  <button type="submit" className="md:col-span-5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 p-2 rounded flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" /> إضافة جهاز
                  </button>
                </form>

              </motion.div>
            )}
          </div>

          {/* Right Column: Results */}
          <div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-8">
              <button
                onClick={handleCalculate}
                disabled={devices.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors mb-6"
              >
                <Calculator className="w-6 h-6" />
                احسب النظام المطلوب
              </button>

              {calculationResult ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700/50">
                    <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400 mb-1">
                      <Zap className="w-5 h-5" />
                      <span className="font-semibold">إجمالي الاستهلاك اليومي</span>
                    </div>
                    <div className="text-2xl font-bold">{calculationResult.totalDailyEnergyWh.toLocaleString()} واط/ساعة</div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2 dark:border-gray-700">النظام المقترح:</h3>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <Zap className="w-4 h-4" /> قدرة الانفرتر (Inverter)
                      </span>
                      <span className="font-bold">{Math.ceil(calculationResult.recommendedInverterWatts).toLocaleString()} واط</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <Battery className="w-4 h-4" /> سعة البطاريات المطلوبة
                      </span>
                      <span className="font-bold">{Math.ceil(calculationResult.recommendedBatteryCapacityWh).toLocaleString()} واط/ساعة</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <Sun className="w-4 h-4" /> الألواح الشمسية المطلوبة
                      </span>
                      <span className="font-bold">{Math.ceil(calculationResult.recommendedSolarPanelsWatts).toLocaleString()} واط</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
                    * ملاحظة: هذه حسابات تقديرية وتتضمن هوامش أمان. يفضل استشارة مهندس مختص قبل التركيب.
                  </div>
                </motion.div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <Calculator className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>اختر نوع النشاط واضغط على "احسب" لرؤية التوصيات.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
