function RegisterForm() {
  return (
    <form>

      <input
        type="text"
        placeholder="Nombre"
      />

      <input
        type="text"
        placeholder="Apellido"
      />

      <input
        type="email"
        placeholder="Correo electrónico"
      />

      <input
        type="password"
        placeholder="Contraseña"
      />

      <input
        type="password"
        placeholder="Confirmar contraseña"
      />

      <button className="login-btn">
        Registrarse
      </button>

    </form>
  );
}

export default RegisterForm;