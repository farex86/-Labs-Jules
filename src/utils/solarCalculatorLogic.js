/**
 * Calculates the solar system requirements based on a list of appliances.
 *
 * Formulas (General approximations for a standalone solar system):
 * 1. Total Daily Energy (Wh) = sum of (quantity * watts * hours) for all appliances.
 * 2. Peak Power Demand (W) = sum of (quantity * watts) for all appliances.
 * 3. Inverter Size (kW) = Peak Power Demand * 1.25 (25% safety margin) / 1000.
 * 4. Panels Size (kW) = Total Daily Energy / (Peak Sun Hours * System Efficiency).
 *    - Assuming 5 Peak Sun Hours and 80% System Efficiency (5 * 0.8 = 4).
 *    - So Panels (kW) = Total Daily Energy (Wh) / 4000.
 * 5. Battery Capacity (kWh) = Total Daily Energy * Days of Autonomy / Depth of Discharge.
 *    - Assuming 1 Day of Autonomy and 50% Depth of Discharge for Lead-Acid / Gel (or 80% for Lithium, let's use 60% as generic average).
 *    - So Battery Capacity (kWh) = Total Daily Energy (Wh) * 1 / 0.6 / 1000.
 *
 * @param {Array} appliances List of appliance objects { quantity, watts, hours }
 * @returns {Object} Recommended sizes
 */
export function calculateSolarSystem(appliances) {
    if (!appliances || appliances.length === 0) {
        return {
            totalDailyEnergyWh: 0,
            peakPowerDemandW: 0,
            recommendedInverterKW: 0,
            recommendedPanelsKW: 0,
            recommendedBatteryKWh: 0
        };
    }

    let totalDailyEnergyWh = 0;
    let peakPowerDemandW = 0;

    appliances.forEach(app => {
        const qty = parseFloat(app.quantity) || 0;
        const watts = parseFloat(app.watts) || 0;
        const hours = parseFloat(app.hours) || 0;

        peakPowerDemandW += (qty * watts);
        totalDailyEnergyWh += (qty * watts * hours);
    });

    // 25% safety margin on inverter
    let recommendedInverterKW = (peakPowerDemandW * 1.25) / 1000;

    // Assuming 5 peak sun hours and 80% efficiency (4 effective hours)
    let recommendedPanelsKW = totalDailyEnergyWh / 4000;

    // Assuming 1 day autonomy and 60% depth of discharge
    let recommendedBatteryKWh = (totalDailyEnergyWh * 1) / (0.6 * 1000);

    return {
        totalDailyEnergyWh: Math.ceil(totalDailyEnergyWh),
        peakPowerDemandW: Math.ceil(peakPowerDemandW),
        recommendedInverterKW: parseFloat(recommendedInverterKW.toFixed(2)),
        recommendedPanelsKW: parseFloat(recommendedPanelsKW.toFixed(2)),
        recommendedBatteryKWh: parseFloat(recommendedBatteryKWh.toFixed(2))
    };
}
