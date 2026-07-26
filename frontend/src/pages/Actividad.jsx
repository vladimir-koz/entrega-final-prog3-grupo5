import { ListPlus, X } from "lucide-react";
import Layout from "../components/Layout/Layout";
import ErrorNotice from "../components/Feedback/ErrorNotice";
import PageHeader from "../components/PageHeader/PageHeader";
import TodayWorkouts from "../components/Workouts/TodayWorkouts";
import WorkoutForm from "../components/Workouts/WorkoutForm";
import { useWorkoutActivity } from "../hooks/useWorkoutActivity";
import "../styles/app.css";

function Actividad() {
  const {
    exercises,
    routines,
    scheduledWorkouts,
    recentWorkouts,
    formOpen,
    toggleForm,
    name,
    setName,
    timestamp,
    setTimestamp,
    routineId,
    selectRoutine,
    scheduledWorkoutId,
    selectScheduledWorkout,
    sets,
    setSets,
    error,
    saving,
    submitWorkout,
    removeWorkout,
  } = useWorkoutActivity();

  return (
    <Layout>
      <PageHeader
        eyebrow="Actividad"
        title="Registrar entrenamiento"
        description="Cargá una sesión libre, usá una rutina o completá lo programado."
        action={
          <button className="primary-button" onClick={toggleForm}>
            {formOpen ? <X size={18} /> : <ListPlus size={18} />}{" "}
            {formOpen ? "Cancelar" : "Cargar actividad"}
          </button>
        }
      />
      <ErrorNotice message={error} />
      {formOpen && (
        <WorkoutForm
          name={name}
          onNameChange={setName}
          timestamp={timestamp}
          onTimestampChange={setTimestamp}
          scheduledWorkoutId={scheduledWorkoutId}
          scheduledWorkouts={scheduledWorkouts}
          onScheduledWorkoutChange={selectScheduledWorkout}
          routineId={routineId}
          routines={routines}
          onRoutineChange={selectRoutine}
          lines={sets}
          exercises={exercises}
          onLinesChange={setSets}
          saving={saving}
          onSubmit={submitWorkout}
        />
      )}
      <TodayWorkouts workouts={recentWorkouts} onDelete={removeWorkout} />
    </Layout>
  );
}

export default Actividad;
