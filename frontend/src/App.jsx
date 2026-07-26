import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Rutinas from "./pages/Rutinas";
import Progreso from "./pages/Progreso";
import Actividad from "./pages/Actividad";
import Planes from "./pages/Planes";
import Acceso from "./pages/Acceso";
import ProtectedRoute from "./components/ProtectedRoute";
import Ejercicios from "./pages/Ejercicios";
import Cuenta from "./pages/Cuenta";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/acceso" element={<Acceso />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rutinas" element={<Rutinas />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/progreso" element={<Progreso />} />
          <Route path="/actividad" element={<Actividad />} />
          <Route path="/ejercicios" element={<Ejercicios />} />
          <Route path="/cuenta" element={<Cuenta />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
