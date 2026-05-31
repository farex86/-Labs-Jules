import React, { useState } from 'react';
import {
  CONSUMPTION_PATTERNS,
  calculateTotalConsumption,
  calculateSystemRequirements
} from '../../lib/solarCalculatorLogic';
import { Plus, Trash2, Zap, Battery, Sun, Cpu } from 'lucide-react';

const SolarCalculator = () => {
  const [selectedPatternId, setSelectedPatternId] = useState('');
  const [devices, setDevices] = useState([]);
  const [results, setResults] = useState(null);

  // Update devices when pattern changes
  const handlePatternChange = (e) => {
    const newPatternId = e.target.value;
    setSelectedPatternId(newPatternId);

    if (newPatternId) {
      const pattern = CONSUMPTION_PATTERNS.find(p => p.id === newPatternId);
      if (pattern) {
        // Deep copy devices to avoid mutating the constant
        const newDevices = JSON.parse(JSON.stringify(pattern.devices));
        setDevices(newDevices);
        updateResults(newDevices);
      }
    } else {
      setDevices([]);
      setResults(null);
    }
  };

  const updateResults = (currentDevices) => {
    if (currentDevices.length > 0) {
      const consumption = calculateTotalConsumption(currentDevices);
      const requirements = calculateSystemRequirements(consumption.totalWatts, consumption.totalDailyWattHours);

      setResults({
        ...consumption,
        ...requirements
      });
    } else {
      setResults(null);
    }
  };

  const handleDeviceChange = (index, field, value) => {
    const updatedDevices = [...devices];
    updatedDevices[index][field] = value;
    setDevices(updatedDevices);
    updateResults(updatedDevices);
  };

  const addDevice = () => {
    const newDevices = [
      ...devices,
      {
        id: `device_${devices.length}_${new Date().getTime()}`,
        nameAr: 'جهاز جديد',
        nameEn: 'New Device',
        watts: 0,
        quantity: 1,
        hours: 0
      }
    ];
    setDevices(newDevices);
    updateResults(newDevices);
  };

  const removeDevice = (index) => {
    const updatedDevices = [...devices];
    updatedDevices.splice(index, 1);
    setDevices(updatedDevices);
    updateResults(updatedDevices);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 bg-blue-600 text-white">
        <h1 className="text-3xl font-bold">Solar System Calculator</h1>
        <p className="mt-2 text-blue-100">Estimate your solar energy needs based on your facility type.</p>
      </div>

      <div className="p-6 space-y-8">
        {/* Pattern Selection */}
        <div>
          <label htmlFor="pattern-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select Facility Type (نمط الاستهلاك)
          </label>
          <select
            id="pattern-select"
            value={selectedPatternId}
            onChange={handlePatternChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm border"
          >
            <option value="">-- Select Facility Type --</option>
            {CONSUMPTION_PATTERNS.map(pattern => (
              <option key={pattern.id} value={pattern.id}>
                {pattern.nameEn} ({pattern.nameAr})
              </option>
            ))}
          </select>
        </div>

        {/* Device List */}
        {devices.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Electrical Devices</h2>
              <button
                onClick={addDevice}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Device
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Power (Watts)</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours/Day</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {devices.map((device, index) => (
                    <tr key={device.id || index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={device.nameEn}
                          onChange={(e) => handleDeviceChange(index, 'nameEn', e.target.value)}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          value={device.watts}
                          onChange={(e) => handleDeviceChange(index, 'watts', Number(e.target.value))}
                          className="block w-24 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="1"
                          value={device.quantity}
                          onChange={(e) => handleDeviceChange(index, 'quantity', Number(e.target.value))}
                          className="block w-20 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={device.hours}
                          onChange={(e) => handleDeviceChange(index, 'hours', Number(e.target.value))}
                          className="block w-20 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => removeDevice(index)}
                          className="text-red-600 hover:text-red-900 focus:outline-none"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Results Section */}
        {results && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">System Requirements Estimate</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Daily Energy */}
              <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                      <Zap className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Daily Consumption</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {(results.totalDailyWattHours / 1000).toFixed(1)} <span className="text-lg text-gray-500 font-normal">kWh</span>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Solar Panels */}
              <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                      <Sun className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Solar Panel Capacity</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {(results.recommendedSolarCapacity / 1000).toFixed(1)} <span className="text-lg text-gray-500 font-normal">kW</span>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inverter */}
              <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                      <Cpu className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Inverter Size</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {(results.recommendedInverterSize / 1000).toFixed(1)} <span className="text-lg text-gray-500 font-normal">kW</span>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Battery */}
              <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <Battery className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Battery Capacity</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {results.recommendedBatteryCapacityAh} <span className="text-lg text-gray-500 font-normal">Ah</span>
                          </div>
                          <div className="ml-2 text-sm text-gray-500">@{results.batteryVoltage}V</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Disclaimer:</strong> This is a preliminary estimate. Actual system requirements may vary based on local solar irradiance, specific device characteristics, and detailed engineering design. Please consult with a certified installation company for a final proposal.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
               <button
                  className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Request Detailed Proposal from Installers
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolarCalculator;
