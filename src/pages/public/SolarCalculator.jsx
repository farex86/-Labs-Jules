import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, Zap, Battery, Sun, Activity, Save } from 'lucide-react';
import {
  FACILITY_TYPES,
  calculateTotalDailyConsumption,
  calculateMaxPower,
  calculateSolarSystemSize,
  calculateInverterSize,
  calculateBatterySize
} from '../../models/SolarCalculatorModel';

const SolarCalculator = () => {
  const [selectedFacility, setSelectedFacility] = useState(FACILITY_TYPES[0].id);
  const [appliances, setAppliances] = useState([]);

  const [isEditing, setIsEditing] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', power: 0, quantity: 0, hours: 0 });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newForm, setNewForm] = useState({ name: '', power: '', quantity: '', hours: '' });

  const handleFacilityChange = (id) => {
    setSelectedFacility(id);
    const facility = FACILITY_TYPES.find(f => f.id === id);
    if (facility) {
      setAppliances(JSON.parse(JSON.stringify(facility.defaultAppliances)));
    } else {
      setAppliances([]);
    }
  };

  // Initialize appliances on first render
  useMemo(() => {
    if (appliances.length === 0 && selectedFacility === FACILITY_TYPES[0].id) {
       setAppliances(JSON.parse(JSON.stringify(FACILITY_TYPES[0].defaultAppliances)));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Derived state calculations
  const { totalConsumption, solarSize, inverterSize, batterySize } = useMemo(() => {
    const consumption = calculateTotalDailyConsumption(appliances);
    const maxPwr = calculateMaxPower(appliances);
    return {
      totalConsumption: consumption,
      solarSize: calculateSolarSystemSize(consumption),
      inverterSize: calculateInverterSize(maxPwr),
      batterySize: calculateBatterySize(consumption)
    };
  }, [appliances]);

  const handleDelete = (id) => {
    setAppliances(appliances.filter(app => app.id !== id));
  };

  const handleEditClick = (appliance) => {
    setIsEditing(appliance.id);
    setEditForm({ ...appliance });
  };

  const handleSaveEdit = () => {
    setAppliances(appliances.map(app =>
      app.id === isEditing ? { ...editForm, power: Number(editForm.power), quantity: Number(editForm.quantity), hours: Number(editForm.hours) } : app
    ));
    setIsEditing(null);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newForm.name || !newForm.power || !newForm.quantity || !newForm.hours) return;

    const newAppliance = {
      id: Date.now().toString(),
      name: newForm.name,
      power: Number(newForm.power),
      quantity: Number(newForm.quantity),
      hours: Number(newForm.hours)
    };

    setAppliances([...appliances, newAppliance]);
    setNewForm({ name: '', power: '', quantity: '', hours: '' });
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">حاسبة الطاقة الشمسية</h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع نشاطك وأجهزتك
          </p>
        </motion.div>

        {/* Facility Selector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
        >
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">
            اختر نوع المنشأة
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {FACILITY_TYPES.map((facility) => (
              <button
                key={facility.id}
                onClick={() => handleFacilityChange(facility.id)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors border ${
                  selectedFacility === facility.id
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {facility.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="الاستهلاك اليومي"
            value={(totalConsumption / 1000).toFixed(2)}
            unit="كيلوواط.س"
            icon={<Zap className="w-8 h-8 text-yellow-500" />}
            delay={0.2}
          />
          <DashboardCard
            title="حجم النظام الشمسي (ألواح)"
            value={solarSize.toFixed(2)}
            unit="كيلوواط"
            icon={<Sun className="w-8 h-8 text-orange-500" />}
            delay={0.3}
          />
          <DashboardCard
            title="حجم العاكس (إنفرتر)"
            value={inverterSize.toFixed(2)}
            unit="كيلوواط"
            icon={<Activity className="w-8 h-8 text-blue-500" />}
            delay={0.4}
          />
          <DashboardCard
            title="سعة البطاريات المطلوبة"
            value={batterySize.toFixed(2)}
            unit="كيلوواط.س"
            icon={<Battery className="w-8 h-8 text-green-500" />}
            delay={0.5}
          />
        </div>

        {/* Appliances List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">الأجهزة (الأحمال)</h3>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" /> إضافة جهاز
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">الجهاز</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">القدرة (واط)</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">العدد</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ساعات العمل/يوم</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {showAddForm && (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="text" placeholder="اسم الجهاز" className="form-input rounded-md w-full border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={newForm.name} onChange={e => setNewForm({...newForm, name: e.target.value})} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="number" placeholder="0" className="form-input rounded-md w-24 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={newForm.power} onChange={e => setNewForm({...newForm, power: e.target.value})} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="number" placeholder="0" className="form-input rounded-md w-24 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={newForm.quantity} onChange={e => setNewForm({...newForm, quantity: e.target.value})} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="number" placeholder="0" className="form-input rounded-md w-24 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={newForm.hours} onChange={e => setNewForm({...newForm, hours: e.target.value})} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={handleAdd} className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mx-2">
                        حفظ
                      </button>
                      <button onClick={() => setShowAddForm(false)} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                        إلغاء
                      </button>
                    </td>
                  </tr>
                )}
                {appliances.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    {isEditing === app.id ? (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="text" className="form-input rounded-md w-full border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="number" className="form-input rounded-md w-24 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={editForm.power} onChange={e => setEditForm({...editForm, power: e.target.value})} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="number" className="form-input rounded-md w-24 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={editForm.quantity} onChange={e => setEditForm({...editForm, quantity: e.target.value})} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="number" className="form-input rounded-md w-24 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={editForm.hours} onChange={e => setEditForm({...editForm, hours: e.target.value})} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={handleSaveEdit} className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mx-2" title="حفظ">
                            <Save className="w-5 h-5" />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{app.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{app.power}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{app.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{app.hours}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-start gap-3">
                          <button onClick={() => handleEditClick(app)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" title="تعديل">
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button onClick={() => handleDelete(app.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300" title="حذف">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
                {appliances.length === 0 && !showAddForm && (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      لا توجد أجهزة مضافة. قم بإضافة أجهزة لحساب الاستهلاك.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, unit, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl flex items-center gap-4"
  >
    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <div className="flex items-baseline gap-1">
        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h4>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{unit}</span>
      </div>
    </div>
  </motion.div>
);

export default SolarCalculator;
