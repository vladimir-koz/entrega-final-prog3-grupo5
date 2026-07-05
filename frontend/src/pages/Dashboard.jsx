import Layout from "../components/Layout/Layout";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import StatsCards from "../components/StatsCards/StatsCards";
import WeeklyActivity from "../components/WeeklyActivity/WeeklyActivity";

function Dashboard() {
  return (
    <Layout>
      <HeroBanner />
      <StatsCards />
      <WeeklyActivity />
    </Layout>
  );
}

export default Dashboard;