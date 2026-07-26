import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">

      <NavLink to="/">
        Dashboard
      </NavLink>

      <NavLink to="/rutinas">
        Rutinas
      </NavLink>

      <NavLink to="/progreso">
        Progreso
      </NavLink>

      <NavLink to="/actividad">
        Actividad
      </NavLink>

    </aside>
  );
}

export default Sidebar;