const fs = require('fs');
const filepath = 'src/pages/public/SolarCalculator.jsx';
let content = fs.readFileSync(filepath, 'utf8');
content = content.replace(
`    case 'CALCULATE':
      const populatedAppliances = state.appliances.map(app => ({
        ...app,
        appliance: APPLIANCES.find(a => a.id === app.applianceId)
      })).filter(app => app.appliance);

      const results = calculateSystemSize(populatedAppliances);
      return { ...state, results };`,
`    case 'CALCULATE': {
      const populatedAppliances = state.appliances.map(app => ({
        ...app,
        appliance: APPLIANCES.find(a => a.id === app.applianceId)
      })).filter(app => app.appliance);

      const results = calculateSystemSize(populatedAppliances);
      return { ...state, results };
    }`);
content = content.replace(`{state.appliances.map((app, index) => (`, `{state.appliances.map((app) => (`);
fs.writeFileSync(filepath, content);
