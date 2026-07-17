import "./Navbar.css";
import { useState } from "react";
import AuthModal from "../AuthModal/AuthModal";

function Navbar() {
  const [openModal, setOpenModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  }

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
              onClick={handleLogout}
            >
              Cerrar sesión
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