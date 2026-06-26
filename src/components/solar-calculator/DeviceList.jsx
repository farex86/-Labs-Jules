import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const DeviceList = ({ devices, setDevices }) => {
  const [newDevice, setNewDevice] = useState({ name: '', powerW: '', hours: '', quantity: 1 });

  const handleAddDevice = () => {
    if (newDevice.name && newDevice.powerW && newDevice.hours) {
      setDevices([...devices, {
        name: newDevice.name,
        powerW: Number(newDevice.powerW),
        hours: Number(newDevice.hours),
        quantity: Number(newDevice.quantity)
      }]);
      setNewDevice({ name: '', powerW: '', hours: '', quantity: 1 });
    }
  };

  const handleRemoveDevice = (index) => {
    const updated = [...devices];
    updated.splice(index, 1);
    setDevices(updated);
  };

  const updateDevice = (index, field, value) => {
    const updated = [...devices];
    updated[index][field] = Number(value) || value;
    setDevices(updated);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm mb-6">
      <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Devices List</h2>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-2 rounded-tl-lg">Device Name</th>
              <th className="px-4 py-2">Power (Watts)</th>
              <th className="px-4 py-2">Hours / Day</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2 rounded-tr-lg w-16">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {devices.map((device, idx) => (
              <tr key={idx} className="group">
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={device.name}
                    onChange={(e) => updateDevice(idx, 'name', e.target.value)}
                    className="w-full p-1 border border-transparent hover:border-slate-300 focus:border-primary rounded bg-transparent dark:text-white"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={device.powerW}
                    onChange={(e) => updateDevice(idx, 'powerW', e.target.value)}
                    className="w-full p-1 border border-transparent hover:border-slate-300 focus:border-primary rounded bg-transparent dark:text-white"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={device.hours}
                    onChange={(e) => updateDevice(idx, 'hours', e.target.value)}
                    className="w-full p-1 border border-transparent hover:border-slate-300 focus:border-primary rounded bg-transparent dark:text-white"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={device.quantity}
                    onChange={(e) => updateDevice(idx, 'quantity', e.target.value)}
                    className="w-full p-1 border border-transparent hover:border-slate-300 focus:border-primary rounded bg-transparent dark:text-white"
                  />
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleRemoveDevice(idx)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-1"
                    title="Remove device"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {/* Add New Row */}
            <tr className="bg-slate-50 dark:bg-slate-800/50">
              <td className="px-4 py-2">
                <input
                  type="text"
                  placeholder="New device..."
                  value={newDevice.name}
                  onChange={(e) => setNewDevice({...newDevice, name: e.target.value})}
                  className="w-full p-2 text-sm border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  placeholder="Watts"
                  value={newDevice.powerW}
                  onChange={(e) => setNewDevice({...newDevice, powerW: e.target.value})}
                  className="w-full p-2 text-sm border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  placeholder="Hours"
                  value={newDevice.hours}
                  onChange={(e) => setNewDevice({...newDevice, hours: e.target.value})}
                  className="w-full p-2 text-sm border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  min="1"
                  value={newDevice.quantity}
                  onChange={(e) => setNewDevice({...newDevice, quantity: e.target.value})}
                  className="w-full p-2 text-sm border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900"
                />
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={handleAddDevice}
                  disabled={!newDevice.name || !newDevice.powerW || !newDevice.hours}
                  className="p-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus size={16} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeviceList;
