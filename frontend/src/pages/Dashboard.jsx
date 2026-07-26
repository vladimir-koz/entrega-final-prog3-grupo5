import { useNavigate } from "react-router-dom";
import { Activity, ChartNoAxesColumnIncreasing, Dumbbell, Layers3, Play } from "lucide-react";
import WeeklyBreakdown from "../components/Dashboard/WeeklyBreakdown";
import ErrorNotice from "../components/Feedback/ErrorNotice";
import Layout from "../components/Layout/Layout";
import MetricGrid from "../components/Metrics/MetricGrid";
import PageHeader from "../components/PageHeader/PageHeader";
import { useDashboardMetrics } from "../hooks/useDashboardMetrics";
import { getWeekDays } from "../utils/dateUtils";
import "../styles/app.css";

function Dashboard() {
  const navigate = useNavigate();
  const { summary, activity, error } = useDashboardMetrics();

  const cards = [
    { label: "Entrenamientos", value: summary?.workouts ?? "-", icon: Dumbbell },
    { label: "Series completadas", value: summary?.totalSets ?? "-", icon: Layers3 },
    { label: "Repeticiones", value: summary?.totalRepetitions ?? "-", icon: Activity },
    {
      label: "Volumen semanal",
      value: summary ? `${summary.totalVolume.toLocaleString("es-AR")} kg` : "-",
      icon: ChartNoAxesColumnIncreasing,
    },
  ];

  const days = getWeekDays(activity);

  return (
    <Layout>
      <PageHeader
        eyebrow="Resumen semanal"
        title="Tu semana en movimiento"
        description="Volumen, constancia y sesiones registradas desde el lunes."
        action={
          <button className="primary-button" onClick={() => navigate("/actividad")}>
            <Play size={18} fill="currentColor" /> Iniciar entrenamiento
          </button>
        }
      />
      <ErrorNotice message={error} />
      <MetricGrid cards={cards} label="Métricas de la semana" />
      <WeeklyBreakdown days={days} averageSets={summary?.averageSetsPerWorkout ?? 0} />
    </Layout>
  );
}

export default Dashboard;
