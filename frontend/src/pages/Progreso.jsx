import { BarChart3, TrendingUp } from "lucide-react";
import ErrorNotice from "../components/Feedback/ErrorNotice";
import Layout from "../components/Layout/Layout";
import MetricGrid from "../components/Metrics/MetricGrid";
import PageHeader from "../components/PageHeader/PageHeader";
import ProgressCharts from "../components/Progress/ProgressCharts";
import ProgressFilters from "../components/Progress/ProgressFilters";
import { useProgressMetrics } from "../hooks/useProgressMetrics";
import "../styles/app.css";

function Progreso() {
  const {
    from,
    setFrom,
    to,
    setTo,
    groups,
    exercises,
    groupId,
    selectGroup,
    exerciseId,
    setExerciseId,
    summary,
    activity,
    progress,
    error,
  } = useProgressMetrics();
  const cards = [
    {
      label: "Volumen total",
      value: `${summary?.totalVolume.toLocaleString("es-AR") ?? "-"} kg`,
      icon: TrendingUp,
    },
    { label: "Entrenamientos", value: summary?.workouts ?? "-", icon: BarChart3 },
    { label: "Series", value: summary?.totalSets ?? "-" },
    { label: "RPE promedio", value: summary?.averageRpe ?? "-" },
  ];

  return (
    <Layout>
      <PageHeader
        eyebrow="Métricas"
        title="Mi progreso"
        description="Compará fuerza, volumen y constancia en el período que elijas."
      />
      <ErrorNotice message={error} />
      <ProgressFilters
        from={from}
        to={to}
        groupId={groupId}
        exerciseId={exerciseId}
        groups={groups}
        exercises={exercises}
        onFromChange={setFrom}
        onToChange={setTo}
        onGroupChange={selectGroup}
        onExerciseChange={setExerciseId}
      />
      <MetricGrid cards={cards} label="Métricas del período" />
      <ProgressCharts progress={progress} activity={activity} />
    </Layout>
  );
}

export default Progreso;
