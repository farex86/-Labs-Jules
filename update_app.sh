sed -i -e '/import Login from/a \
import SolarCalculator from "./pages/public/SolarCalculator";' src/App.jsx

sed -i -e '/<Route path="\/login" element={<Login \/>} \/>/a \
          <Route path="/calculator" element={<SolarCalculator />} />' src/App.jsx
