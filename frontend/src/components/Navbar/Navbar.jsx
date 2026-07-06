import "./Navbar.css";
import { useState } from "react";
import AuthModal from "../AuthModal/AuthModal";

function Navbar() {

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <header className="navbar">

        <h2>PowerUp</h2>

        <button
          onClick={() => setOpenModal(true)}
        >
          Iniciar sesión
        </button>

      </header>

      <AuthModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}

export default Navbar;