import "./Navbar.css";
import { useState } from "react";
import AuthModal from "../AuthModal/AuthModal";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <header className="navbar">
        <h2 className="logo">PowerUp</h2>

        {user ? (
          <div className="user-section">
            <span className="user-name">
              Hola, {user.nombre}
            </span>

            <button
              className="logout-btn"
              onClick={logout}
              title="Cerrar sesión"
            >
              <LogOut size={18} /> <span>Cerrar sesión</span>
            </button>
          </div>
        ) : (
          <button
            className="login-btn-navbar"
            onClick={() => setOpenModal(true)}
          >
            Iniciar sesión
          </button>
        )}
      </header>

      <AuthModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}

export default Navbar;