import { create } from 'zustand';
import { Device, FACILITY_PATTERNS, calculateSolarSystem, SolarCalculationResult } from '../lib/solarCalculatorConfig';

interface SolarCalculatorState {
  selectedFacilityId: string | null;
  devices: Device[];
  calculationResult: SolarCalculationResult | null;

  setFacility: (facilityId: string) => void;
  updateDevice: (id: string, updates: Partial<Device>) => void;
  addDevice: (device: Device) => void;
  removeDevice: (id: string) => void;
  calculate: () => void;
  reset: () => void;
}

export const useSolarCalculatorStore = create<SolarCalculatorState>((set, get) => ({
  selectedFacilityId: null,
  devices: [],
  calculationResult: null,

  setFacility: (facilityId: string) => {
    const facility = FACILITY_PATTERNS.find(f => f.id === facilityId);
    if (facility) {
      // Create a deep copy of default devices to allow independent edits
      const newDevices = facility.defaultDevices.map(d => ({ ...d }));
      set({ selectedFacilityId: facilityId, devices: newDevices, calculationResult: null });
    } else {
      set({ selectedFacilityId: null, devices: [], calculationResult: null });
    }
  },

  updateDevice: (id: string, updates: Partial<Device>) => {
    set(state => ({
      devices: state.devices.map(device =>
        device.id === id ? { ...device, ...updates } : device
      ),
      calculationResult: null // Reset calculation when data changes
    }));
  },

  addDevice: (device: Device) => {
    set(state => ({
      devices: [...state.devices, device],
      calculationResult: null
    }));
  },

  removeDevice: (id: string) => {
    set(state => ({
      devices: state.devices.filter(d => d.id !== id),
      calculationResult: null
    }));
  },

  calculate: () => {
    const { devices } = get();
    if (devices.length > 0) {
      const result = calculateSolarSystem(devices);
      set({ calculationResult: result });
    }
  },

  reset: () => set({ selectedFacilityId: null, devices: [], calculationResult: null })
}));
