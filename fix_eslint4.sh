sed -i 's/currentAngle = endAngle;/const newAngle = endAngle;/g' src/components/AnalyticsChart.jsx
sed -i 's/const startAngle = currentAngle;/const startAngle = index === 0 ? 0 : data.slice(0, index).reduce((sum, d) => sum + (d.value \/ total) * 360, 0);/g' src/components/AnalyticsChart.jsx
