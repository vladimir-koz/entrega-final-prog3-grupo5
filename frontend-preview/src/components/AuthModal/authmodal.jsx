import "./authModal.css";
import { useState } from "react";

import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

function AuthModal({ open, onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

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
          <LoginForm onLoginSuccess={onClose} />
        ) : (
          <RegisterForm
            onRegisterSuccess={() => {
              setIsLogin(true);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default AuthModal;