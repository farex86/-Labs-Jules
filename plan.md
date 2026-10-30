1. **Fix `src/models/SolarCalculatorModel.js`**: Implement the `facilityTypes` missing facilities provided in the prompt (and keep the existing ones) and provide realistic default loads for `consumptionPatterns`. Ensure Arabic names map to the user request.
2. **Update UI to show options in Solar Calculator**: `src/pages/public/SolarCalculator.jsx` already maps the facilities, ensure it's functioning as expected, and add a pre commit step.
3. **Pre-commit Checks**: Run `npm run build`, `npm run lint`, and verify frontend correctly updates via playwright.
4. **Submit changes**.
