import { AtSign, Calendar, LockKeyhole, UserRound } from "lucide-react";

function AccountDetails({ profile }) {
  return (
    <section className="account-layout">
      <div className="account-avatar">
        <UserRound size={38} />
        <strong>{profile?.nombre?.slice(0, 1).toUpperCase() || "-"}</strong>
      </div>
      <div className="content-section account-details">
        <div className="account-row">
          <UserRound size={19} />
          <span>Nombre</span>
          <strong>{profile?.nombre || "Cargando..."}</strong>
        </div>
        <div className="account-row">
          <AtSign size={19} />
          <span>Correo</span>
          <strong>{profile?.email || "Cargando..."}</strong>
        </div>
        {profile?.createdAt && (
          <div className="account-row">
            <Calendar size={19} />
            <span>Miembro desde</span>
            <strong>{new Date(profile.createdAt).toLocaleDateString("es-AR")}</strong>
          </div>
        )}
        <div className="account-note">
          <LockKeyhole size={19} />
          <div>
            <strong>Datos protegidos</strong>
            <p>
              La API actual permite consultar el perfil, pero todavía no dispone de una operación
              para modificar nombre, correo o contraseña.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccountDetails;
