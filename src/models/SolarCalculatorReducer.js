
import { getDefaultDevicesForFacility } from './SolarCalculatorModel';

export const calculatorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FACILITY': {
      const newDevices = getDefaultDevicesForFacility(action.payload);
      return { ...state, facilityId: action.payload, devices: newDevices };
    }
    case 'ADD_DEVICE': {
      const newId = state.devices.length > 0 ? Math.max(...state.devices.map(d => d.id)) + 1 : 1;
      return {
        ...state,
        devices: [...state.devices.map(d => ({ ...d })), { id: newId, name: 'جهاز جديد', quantity: 1, powerWatts: 100, hours: 4 }]
      };
    }
    case 'UPDATE_DEVICE': {
      return {
        ...state,
        devices: state.devices.map(d => d.id === action.payload.id ? { ...d, ...action.payload.updates } : { ...d })
      };
    }
    case 'REMOVE_DEVICE': {
      return {
        ...state,
        devices: state.devices.filter(d => d.id !== action.payload).map(d => ({ ...d }))
      };
    }
    default:
      return state;
  }
};
