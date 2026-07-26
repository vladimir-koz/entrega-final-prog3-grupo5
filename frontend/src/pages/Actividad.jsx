import { useEffect, useState } from "react";
import { ListPlus, X } from "lucide-react";
import Layout from "../components/Layout/Layout";
import ErrorNotice from "../components/Feedback/ErrorNotice";
import PageHeader from "../components/PageHeader/PageHeader";
import TodayWorkouts from "../components/Workouts/TodayWorkouts";
import WorkoutForm from "../components/Workouts/WorkoutForm";
import { getExercises } from "../services/exerciseService";
import { getRoutineExercises, getRoutines } from "../services/routineService";
import { createWorkout, deleteWorkout, getWorkouts } from "../services/workoutService";
import { isToday } from "../utils/dateUtils";
import { createEmptyExerciseLine, hasIncompleteExerciseLines, hydrateExerciseLines, serializeExerciseLines } from "../utils/exerciseLineUtils";
import "../styles/app.css";

function Actividad() {
    const [exercises, setExercises] = useState([]);
    const [routines, setRoutines] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const [name, setName] = useState("Entrenamiento libre");
    const [routineId, setRoutineId] = useState("");
    const [sets, setSets] = useState([createEmptyExerciseLine()]);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        Promise.all([getExercises(), getRoutines(), getWorkouts()])
            .then(([exerciseData, routineData, workoutData]) => { setExercises(exerciseData); setRoutines(routineData); setWorkouts(workoutData); })
            .catch((requestError) => setError(requestError.message));
    }, []);

    async function selectRoutine(value) {
        setRoutineId(value);
        if (!value) return;
        try {
            const selected = routines.find((routine) => routine.id === Number(value));
            const routineSets = await getRoutineExercises(value);
            setName(selected?.nombre || "Entrenamiento de rutina");
            setSets(hydrateExerciseLines(routineSets));
        } catch (requestError) { setError(requestError.message); }
    }

    async function submitWorkout(event) {
        event.preventDefault();
        setError("");
        if (hasIncompleteExerciseLines(sets)) { setError("Completá ejercicio, repeticiones y peso en todas las series."); return; }
        setSaving(true);
        try {
            const workout = await createWorkout({
                nombre: name,
                workoutTemplateId: routineId ? Number(routineId) : undefined,
                series: serializeExerciseLines(sets),
            });
            setWorkouts((current) => [workout, ...current]);
            setFormOpen(false); setRoutineId(""); setName("Entrenamiento libre"); setSets([createEmptyExerciseLine()]);
        } catch (requestError) { setError(requestError.message); } finally { setSaving(false); }
    }

    async function removeWorkout(id) {
        if (!window.confirm("¿Eliminar este entrenamiento?")) return;
        try { await deleteWorkout(id); setWorkouts((current) => current.filter((workout) => workout.id !== id)); }
        catch (requestError) { setError(requestError.message); }
    }

    const todayWorkouts = workouts.filter((workout) => isToday(workout.timestamp));

    return (
        <Layout>
            <PageHeader eyebrow="Actividad" title="Entrenamiento de hoy" description="Cargá una sesión libre o empezá desde una rutina." action={<button className="primary-button" onClick={() => setFormOpen((open) => !open)}>{formOpen ? <X size={18} /> : <ListPlus size={18} />} {formOpen ? "Cancelar" : "Cargar actividad"}</button>} />
            <ErrorNotice message={error} />
            {formOpen && <WorkoutForm name={name} onNameChange={setName} routineId={routineId} routines={routines} onRoutineChange={selectRoutine} lines={sets} exercises={exercises} onLinesChange={setSets} saving={saving} onSubmit={submitWorkout} />}
            <TodayWorkouts workouts={todayWorkouts} onDelete={removeWorkout} />
        </Layout>
    );
}

export default Actividad;
