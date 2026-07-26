import AccountDetails from "../components/Account/AccountDetails";
import ErrorNotice from "../components/Feedback/ErrorNotice";
import Layout from "../components/Layout/Layout";
import PageHeader from "../components/PageHeader/PageHeader";
import { useProfile } from "../hooks/useProfile";
import "../styles/app.css";

function Cuenta() {
  const { profile, error } = useProfile();

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
