import { useEffect, useState } from "react";
import { BarChart3, TrendingUp } from "lucide-react";
import ErrorNotice from "../components/Feedback/ErrorNotice";
import Layout from "../components/Layout/Layout";
import MetricGrid from "../components/Metrics/MetricGrid";
import PageHeader from "../components/PageHeader/PageHeader";
import ProgressCharts from "../components/Progress/ProgressCharts";
import ProgressFilters from "../components/Progress/ProgressFilters";
import { getExercises, getMuscleGroups } from "../services/exerciseService";
import { getActivity, getExerciseProgress, getSummary } from "../services/metricsService";
import { toApiDateRange, toInputDate } from "../utils/dateUtils";
import { filterExercisesByMuscleGroup } from "../utils/progressUtils";
import "../styles/app.css";

function Progreso() {
    const defaultFrom = new Date(); defaultFrom.setDate(defaultFrom.getDate() - 30);
    const [from, setFrom] = useState(toInputDate(defaultFrom)); const [to, setTo] = useState(toInputDate(new Date()));
    const [exercises, setExercises] = useState([]); const [groups, setGroups] = useState([]);
    const [groupId, setGroupId] = useState(""); const [exerciseId, setExerciseId] = useState("");
    const [summary, setSummary] = useState(null); const [activity, setActivity] = useState([]); const [progress, setProgress] = useState([]); const [error, setError] = useState("");

    useEffect(() => { Promise.all([getExercises(), getMuscleGroups()]).then(([exerciseData, groupData]) => { setExercises(exerciseData); setGroups(groupData); if (exerciseData[0]) setExerciseId(String(exerciseData[0].id)); }).catch((requestError) => setError(requestError.message)); }, []);
    useEffect(() => {
        if (!from || !to) return;
        const range = toApiDateRange(from, to);
        Promise.all([getSummary(range), getActivity(range), exerciseId ? getExerciseProgress(exerciseId, range) : Promise.resolve({ progress: [] })])
            .then(([summaryData, activityData, progressData]) => { setSummary(summaryData); setActivity(activityData); setProgress(progressData.progress); setError(""); })
            .catch((requestError) => setError(requestError.message));
    }, [from, to, exerciseId]);

    const visibleExercises = filterExercisesByMuscleGroup(exercises, groupId);
    const cards = [
        { label: "Volumen total", value: `${summary?.totalVolume.toLocaleString("es-AR") ?? "-"} kg`, icon: TrendingUp },
        { label: "Entrenamientos", value: summary?.workouts ?? "-", icon: BarChart3 },
        { label: "Series", value: summary?.totalSets ?? "-" },
        { label: "RPE promedio", value: summary?.averageRpe ?? "-" },
    ];

    return <Layout>
        <PageHeader eyebrow="Métricas" title="Mi progreso" description="Compará fuerza, volumen y constancia en el período que elijas." />
        <ErrorNotice message={error} />
        <ProgressFilters from={from} to={to} groupId={groupId} exerciseId={exerciseId} groups={groups} exercises={visibleExercises} onFromChange={setFrom} onToChange={setTo} onGroupChange={(value) => { setGroupId(value); setExerciseId(""); }} onExerciseChange={setExerciseId} />
        <MetricGrid cards={cards} label="Métricas del período" />
        <ProgressCharts progress={progress} activity={activity} />
    </Layout>;
}

export default Progreso;