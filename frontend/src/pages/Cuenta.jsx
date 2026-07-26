import { useEffect, useState } from "react";
import AccountDetails from "../components/Account/AccountDetails";
import ErrorNotice from "../components/Feedback/ErrorNotice";
import Layout from "../components/Layout/Layout";
import PageHeader from "../components/PageHeader/PageHeader";
import { getProfile } from "../services/profileService";
import "../styles/app.css";

function Cuenta() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch((requestError) => setError(requestError.message));
  }, []);
  return (
    <Layout>
      <PageHeader
        eyebrow="Perfil"
        title="Mi cuenta"
        description="Datos asociados a tu acceso de PowerUp."
      />
      <ErrorNotice message={error} />
      <AccountDetails profile={profile} />
    </Layout>
  );
}

export default Cuenta;
