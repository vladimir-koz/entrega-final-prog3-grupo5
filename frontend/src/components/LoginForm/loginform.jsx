function LoginForm() {
  return (
    <form>

      <input
        type="email"
        placeholder="Correo electrónico"
      />

      <input
        type="password"
        placeholder="Contraseña"
      />

      <button className="login-btn">
        Iniciar sesión
      </button>

    </form>
  );
}

export default LoginForm;