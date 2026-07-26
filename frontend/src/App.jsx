import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Rutinas from "./pages/Rutinas";
import Progreso from "./pages/Progreso";
import Actividad from "./pages/Actividad";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rutinas" element={<Rutinas />} />
        <Route path="/progreso" element={<Progreso />} />
        <Route path="/actividad" element={<Actividad />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;