import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const DeviceList = ({ devices, onUpdateDevices }) => {
  const [newDevice, setNewDevice] = useState({
    name: '',
    power: '',
    quantity: 1,
    hoursPerDay: ''
  });

  const handleAddDevice = () => {
    if (!newDevice.name || !newDevice.power || !newDevice.hoursPerDay) return;

    const deviceToAdd = {
      id: Date.now().toString(),
      name: newDevice.name,
      power: Number(newDevice.power),
      quantity: Number(newDevice.quantity),
      hoursPerDay: Number(newDevice.hoursPerDay)
    };

    onUpdateDevices([...devices, deviceToAdd]);
    setNewDevice({ name: '', power: '', quantity: 1, hoursPerDay: '' });
  };

  const handleRemoveDevice = (id) => {
    onUpdateDevices(devices.filter(d => d.id !== id));
  };

  const handleDeviceChange = (id, field, value) => {
    const updatedDevices = devices.map(d => {
      if (d.id === id) {
        return { ...d, [field]: field === 'name' ? value : Number(value) || 0 };
      }
      return d;
    });
    onUpdateDevices(updatedDevices);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">الأجهزة والأحمال (Devices & Loads)</h3>
      </div>

      <div className="p-6">
        {/* Device Table */}
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200 text-right" dir="rtl">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-sm font-medium text-gray-500">اسم الجهاز</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500">القدرة (واط)</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500">العدد</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500">ساعات العمل/يوم</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 w-16">إجراء</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {devices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    لا توجد أجهزة مضافة. الرجاء إضافة أجهزة أو اختيار نمط استهلاك.
                  </td>
                </tr>
              ) : (
                devices.map((device) => (
                  <tr key={device.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={device.name}
                        onChange={(e) => handleDeviceChange(device.id, 'name', e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="0"
                        value={device.power}
                        onChange={(e) => handleDeviceChange(device.id, 'power', e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="1"
                        value={device.quantity}
                        onChange={(e) => handleDeviceChange(device.id, 'quantity', e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={device.hoursPerDay}
                        onChange={(e) => handleDeviceChange(device.id, 'hoursPerDay', e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleRemoveDevice(device.id)}
                        className="text-red-600 hover:text-red-900 focus:outline-none p-1 rounded-md hover:bg-red-50 transition-colors"
                        title="حذف الجهاز"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Add New Device Form */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100" dir="rtl">
          <h4 className="text-sm font-medium text-blue-800 mb-3">إضافة جهاز جديد</h4>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="block text-xs text-gray-700 mb-1">اسم الجهاز</label>
              <input
                type="text"
                value={newDevice.name}
                onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                placeholder="مثال: مكيف، ثلاجة..."
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-700 mb-1">القدرة (واط)</label>
              <input
                type="number"
                min="0"
                value={newDevice.power}
                onChange={(e) => setNewDevice({ ...newDevice, power: e.target.value })}
                placeholder="مثال: 1500"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-700 mb-1">ساعات العمل</label>
              <input
                type="number"
                min="0"
                max="24"
                value={newDevice.hoursPerDay}
                onChange={(e) => setNewDevice({ ...newDevice, hoursPerDay: e.target.value })}
                placeholder="ساعات/يوم"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <button
                onClick={handleAddDevice}
                disabled={!newDevice.name || !newDevice.power || !newDevice.hoursPerDay}
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4 ml-2" />
                إضافة
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceList;
