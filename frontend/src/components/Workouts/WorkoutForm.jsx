import ExerciseLineTable from "../ExerciseLineTable/ExerciseLineTable";

function WorkoutForm({
  name,
  onNameChange,
  timestamp,
  onTimestampChange,
  scheduledWorkoutId,
  scheduledWorkouts,
  onScheduledWorkoutChange,
  routineId,
  routines,
  onRoutineChange,
  lines,
  exercises,
  onLinesChange,
  saving,
  onSubmit,
}) {
  return (
    <form className="workout-builder content-section" onSubmit={onSubmit}>
      <div className="form-grid two-columns">
        <label>
          Nombre de la sesión
          <input
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            required
            minLength={2}
          />
        </label>

        <label>
          Fecha y hora
          <input
            type="datetime-local"
            value={timestamp}
            onChange={(event) => onTimestampChange(event.target.value)}
          />
        </label>

        <label>
          Sesión del plan
          <select
            value={scheduledWorkoutId}
            onChange={(event) => onScheduledWorkoutChange(event.target.value)}
          >
            <option value="">Sin sesión programada</option>
            {scheduledWorkouts.map((session) => (
              <option key={session.id} value={session.id} disabled={session.completed}>
                {session.label}
                {session.completed ? " · realizada" : ""}
              </option>
            ))}
          </select>
        </label>

        <label>
          Usar una rutina
          <select
            value={routineId}
            onChange={(event) => onRoutineChange(event.target.value)}
            disabled={Boolean(scheduledWorkoutId)}
          >
            <option value="">Sesión libre</option>
            {routines.map((routine) => (
              <option key={routine.id} value={routine.id}>
                {routine.nombre}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ExerciseLineTable
        lines={lines}
        exercises={exercises}
        onChange={onLinesChange}
        showIntensity
      />

      <div className="form-actions">
        <span />
        <button className="primary-button" disabled={saving}>
          {saving ? "Guardando..." : "Finalizar entrenamiento"}
        </button>
      </div>
    </form>
  );
}

export default WorkoutForm;
