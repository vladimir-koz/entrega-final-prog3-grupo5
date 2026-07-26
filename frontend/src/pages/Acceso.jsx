import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal/AuthModal";
import { useAuth } from "../context/useAuth";

function Acceso() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const destination = location.state?.from?.pathname || "/";

  if (isAuthenticated) return <Navigate to={destination} replace />;

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <span>POWERUP</span>
        <h1>Tu entrenamiento, medido de verdad.</h1>
        <p>Registrá cada serie y seguí tu evolución sesión a sesión.</p>
      </div>
      <AuthModal open embedded onAuthenticated={() => navigate(destination, { replace: true })} />
    </div>
  );
}

export default Acceso;
