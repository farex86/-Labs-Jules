import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Calculator, Settings, AlertCircle } from 'lucide-react';
import { FACILITY_TYPES, DEFAULT_APPLIANCES } from '../../utils/solarConfig';
import {
  calculateTotalDailyEnergy,
  calculateTotalPeakPower,
  calculateSystemSize
} from '../../lib/solarCalculatorLogic';

const SolarCalculator = () => {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [appliances, setAppliances] = useState([]);

  const handleFacilityChange = (e) => {
    const facilityId = e.target.value;
    setSelectedFacility(facilityId);
    if (facilityId && DEFAULT_APPLIANCES[facilityId]) {
      // Deep copy to allow editing without modifying defaults
      setAppliances(JSON.parse(JSON.stringify(DEFAULT_APPLIANCES[facilityId])));
    } else {
      setAppliances([]);
    }
  };

  const handleApplianceChange = (id, field, value) => {
    setAppliances(prev => prev.map(app =>
      app.id === id ? { ...app, [field]: Number(value) || value } : app
    ));
  };

  const removeAppliance = (id) => {
    setAppliances(prev => prev.filter(app => app.id !== id));
  };

  const addAppliance = () => {
    const newId = appliances.length > 0 ? Math.max(...appliances.map(a => a.id)) + 1 : 1;
    setAppliances([
      ...appliances,
      { id: newId, name: 'New Appliance', powerW: 100, quantity: 1, hoursPerDay: 4 }
    ]);
  };

  const results = useMemo(() => {
    if (appliances.length === 0) return null;

    const totalDailyEnergyWh = calculateTotalDailyEnergy(appliances);
    const totalPeakPowerW = calculateTotalPeakPower(appliances);
    const systemSize = calculateSystemSize(totalDailyEnergyWh, totalPeakPowerW);

    return {
      totalDailyEnergyWh,
      totalPeakPowerW,
      ...systemSize
    };
  }, [appliances]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Calculator size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Solar System Calculator</h1>
              <p className="text-gray-500 mt-1">Estimate your solar energy needs based on your facility type.</p>
            </div>
          </div>

          <div className="max-w-md">
            <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-2">
              Select Facility Type (اختر نوع المنشأة)
            </label>
            <select
              id="facility"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border text-lg"
              value={selectedFacility}
              onChange={handleFacilityChange}
            >
              <option value="">-- Select a facility --</option>
              {FACILITY_TYPES.map(facility => (
                <option key={facility.id} value={facility.id}>
                  {facility.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedFacility && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column: Appliances List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-gray-500" />
                    Load Profile
                  </h2>
                  <button
                    onClick={addAppliance}
                    className="flex items-center text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
                  >
                    <Plus size={16} className="mr-1" /> Add Appliance
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appliance Name</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Power (Watts)</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours/Day</th>
                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {appliances.map((app) => (
                        <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              value={app.name}
                              onChange={(e) => handleApplianceChange(app.id, 'name', e.target.value)}
                              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              value={app.powerW}
                              onChange={(e) => handleApplianceChange(app.id, 'powerW', e.target.value)}
                              className="w-24 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="1"
                              value={app.quantity}
                              onChange={(e) => handleApplianceChange(app.id, 'quantity', e.target.value)}
                              className="w-20 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              max="24"
                              value={app.hoursPerDay}
                              onChange={(e) => handleApplianceChange(app.id, 'hoursPerDay', e.target.value)}
                              className="w-20 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => removeAppliance(app.id)}
                              className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                              title="Remove"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {appliances.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                            No appliances added. Click "Add Appliance" to start.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column: Results */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-8">
                <div className="p-6 border-b border-gray-100 bg-blue-600 rounded-t-2xl">
                  <h2 className="text-xl font-bold text-white">System Sizing Results</h2>
                </div>

                {results ? (
                  <div className="p-6 space-y-6">
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Total Daily Energy</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {(results.totalDailyEnergyWh / 1000).toFixed(2)} <span className="text-xl text-gray-500 font-normal">kWh</span>
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500 font-medium mb-1">Peak Power Demand</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {(results.totalPeakPowerW / 1000).toFixed(2)} <span className="text-lg text-gray-500 font-normal">kW</span>
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500 font-medium mb-1">Recommended Solar Array</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {(results.requiredSolarArrayW / 1000).toFixed(2)} <span className="text-lg font-normal">kW</span>
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500 font-medium mb-1">Minimum Inverter Size</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {(results.requiredInverterW / 1000).toFixed(2)} <span className="text-lg font-normal">kW</span>
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500 font-medium mb-1">Battery Bank Capacity ({results.systemVoltage}V)</p>
                      <p className="text-2xl font-bold text-emerald-600">
                        {results.requiredBatteryCapacityAh.toLocaleString()} <span className="text-lg font-normal">Ah</span>
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Based on 1.5 days autonomy & 50% DoD</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500 flex flex-col items-center">
                    <AlertCircle className="w-12 h-12 text-gray-300 mb-3" />
                    <p>Add appliances to see system sizing results.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default SolarCalculator;
