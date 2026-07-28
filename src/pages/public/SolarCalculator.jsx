import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Plus, Trash2, Zap, Battery, Sun, Activity } from 'lucide-react';
import {
  facilityTypes,
  calculateTotalDailyEnergy,
  calculateSystemSize,
  calculateInverterSize,
  calculateBatteryCapacity
} from '../../models/SolarCalculatorModel';
import toast from 'react-hot-toast';

export default function SolarCalculator() {
  const [selectedFacility, setSelectedFacility] = useState(facilityTypes[0]);
  const [appliances, setAppliances] = useState(facilityTypes[0].appliances);
  const [newAppliance, setNewAppliance] = useState({ name: '', power: '', quantity: '', hours: '' });

  const totalDailyEnergy = calculateTotalDailyEnergy(appliances);
  const systemSize = calculateSystemSize(totalDailyEnergy);
  const inverterSize = calculateInverterSize(appliances);
  const batteryCapacity = calculateBatteryCapacity(totalDailyEnergy);

  const results = {
    totalDailyEnergy,
    systemSize,
    inverterSize,
    batteryCapacity
  };

  const handleFacilityChange = (e) => {
    const facility = facilityTypes.find(f => f.id === e.target.value);
    if (facility) {
      setSelectedFacility(facility);
      setAppliances(facility.appliances);
      toast.success(`تم اختيار ${facility.name}`);
    }
  };

  const handleAddAppliance = () => {
    if (!newAppliance.name || !newAppliance.power || !newAppliance.quantity || !newAppliance.hours) {
      toast.error('الرجاء إدخال جميع بيانات الجهاز');
      return;
    }
    const appliance = {
      id: Date.now().toString(),
      name: newAppliance.name,
      power: Number(newAppliance.power),
      quantity: Number(newAppliance.quantity),
      hours: Number(newAppliance.hours)
    };
    setAppliances([...appliances, appliance]);
    setNewAppliance({ name: '', power: '', quantity: '', hours: '' });
    toast.success('تمت إضافة الجهاز بنجاح');
  };

  const handleRemoveAppliance = (id) => {
    setAppliances(appliances.filter(app => app.id !== id));
    toast.success('تم حذف الجهاز');
  };

  const updateAppliance = (id, field, value) => {
    setAppliances(appliances.map(app =>
      app.id === id ? { ...app, [field]: Number(value) } : app
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <div className="text-center">
          <Calculator className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400" />
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">حاسبة الطاقة الشمسية</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك وأجهزتك</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">نوع المنشأة</h2>
              <select
                value={selectedFacility.id}
                onChange={handleFacilityChange}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              >
                {facilityTypes.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">الأجهزة (الحمل الكهربائي)</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">الجهاز</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">القدرة (واط)</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">العدد</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ساعات التشغيل/يوم</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">إجراء</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {appliances.map(app => (
                      <tr key={app.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{app.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="number" value={app.power} onChange={(e) => updateAppliance(app.id, 'power', e.target.value)} className="w-20 p-1 border rounded dark:bg-gray-700 dark:text-white" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="number" value={app.quantity} onChange={(e) => updateAppliance(app.id, 'quantity', e.target.value)} className="w-16 p-1 border rounded dark:bg-gray-700 dark:text-white" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="number" value={app.hours} onChange={(e) => updateAppliance(app.id, 'hours', e.target.value)} className="w-16 p-1 border rounded dark:bg-gray-700 dark:text-white" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button onClick={() => handleRemoveAppliance(app.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="px-6 py-4"><input type="text" placeholder="اسم الجهاز" value={newAppliance.name} onChange={(e) => setNewAppliance({...newAppliance, name: e.target.value})} className="w-full p-1 border rounded dark:bg-gray-700 dark:text-white" /></td>
                      <td className="px-6 py-4"><input type="number" placeholder="واط" value={newAppliance.power} onChange={(e) => setNewAppliance({...newAppliance, power: e.target.value})} className="w-20 p-1 border rounded dark:bg-gray-700 dark:text-white" /></td>
                      <td className="px-6 py-4"><input type="number" placeholder="العدد" value={newAppliance.quantity} onChange={(e) => setNewAppliance({...newAppliance, quantity: e.target.value})} className="w-16 p-1 border rounded dark:bg-gray-700 dark:text-white" /></td>
                      <td className="px-6 py-4"><input type="number" placeholder="ساعات" value={newAppliance.hours} onChange={(e) => setNewAppliance({...newAppliance, hours: e.target.value})} className="w-16 p-1 border rounded dark:bg-gray-700 dark:text-white" /></td>
                      <td className="px-6 py-4">
                        <button onClick={handleAddAppliance} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          <Plus className="w-6 h-6" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-xl p-6 text-white"
            >
              <h2 className="text-xl font-bold mb-6 border-b border-blue-400 pb-2">النتائج التقديرية</h2>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="p-3 bg-blue-500 rounded-full"><Zap className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm text-blue-200">الاستهلاك اليومي</p>
                    <p className="text-2xl font-bold">{(results.totalDailyEnergy / 1000).toFixed(2)} kWh</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="p-3 bg-blue-500 rounded-full"><Sun className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm text-blue-200">حجم الألواح المطلوب</p>
                    <p className="text-2xl font-bold">{results.systemSize.toFixed(2)} kW</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="p-3 bg-blue-500 rounded-full"><Activity className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm text-blue-200">حجم الانفرتر المطلوب</p>
                    <p className="text-2xl font-bold">{results.inverterSize.toFixed(2)} kW</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="p-3 bg-blue-500 rounded-full"><Battery className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm text-blue-200">سعة البطاريات المطلوبة (48V)</p>
                    <p className="text-2xl font-bold">{results.batteryCapacity.toFixed(0)} Ah</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-xs text-blue-200">
                * هذه الحسابات تقديرية وتعتمد على 5 ساعات شمس ذروة ونسبة فاقد 30% للنظام، ونسبة تفريغ 50% للبطاريات ليوم استقلالية واحد.
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
