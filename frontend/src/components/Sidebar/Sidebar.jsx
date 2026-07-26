import { NavLink } from "react-router-dom";
import {
  Activity,
  ChartNoAxesColumnIncreasing,
  Dumbbell,
  LayoutDashboard,
  Library,
  UserRound,
} from "lucide-react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/">
        <LayoutDashboard size={18} /> Dashboard
      </NavLink>

      <NavLink to="/actividad">
        <Activity size={18} /> Actividad
      </NavLink>

      <NavLink to="/ejercicios">
        <Dumbbell size={18} /> Ejercicios
      </NavLink>

      <NavLink to="/rutinas">
        <Library size={18} /> Rutinas
      </NavLink>

      <NavLink to="/progreso">
        <ChartNoAxesColumnIncreasing size={18} /> Mi progreso
      </NavLink>

      <NavLink to="/cuenta">
        <UserRound size={18} /> Mi cuenta
      </NavLink>
    </aside>
  );
}

export default Sidebar;
