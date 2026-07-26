import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import "./loginform.css";

function LoginForm({ onLoginSuccess }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      await login(email, password);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button className="login-btn" type="submit" disabled={submitting}>
        {submitting ? "Ingresando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}

export default LoginForm;
