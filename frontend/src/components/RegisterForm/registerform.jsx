import { useState } from "react";
import { register } from "../../services/authService";
import "./registerform.css";

function RegisterForm({ onRegisterSuccess }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await register(nombre, email, password);

      setNombre("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      alert("Usuario registrado correctamente");

      if (onRegisterSuccess) {
        onRegisterSuccess();
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button className="login-btn" type="submit">
        Registrarse
      </button>
    </form>
  );
}

export default RegisterForm;