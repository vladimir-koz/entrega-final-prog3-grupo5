import "./authModal.css";
import { useState } from "react";

import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

function AuthModal({ open, onClose, embedded = false, onAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);

  if (!open) return null;

  return (
    <div className={embedded ? "auth-panel" : "modal-overlay"}>
      <div className="modal">
        {!embedded && <button
          className="close-btn"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>}

        <h2>PowerUp</h2>

        <div className="tabs">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Iniciar sesión
          </button>

          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Registrarse
          </button>
        </div>

        {isLogin ? (
          <LoginForm onLoginSuccess={onAuthenticated || onClose} />
        ) : (
          <RegisterForm
            onRegisterSuccess={onAuthenticated || onClose}
          />
        )}
      </div>
    </div>
  );
}

export default AuthModal;