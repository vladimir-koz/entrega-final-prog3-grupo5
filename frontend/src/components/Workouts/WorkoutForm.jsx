import ExerciseLineTable from "../ExerciseLineTable/ExerciseLineTable";

function WorkoutForm({
  name,
  onNameChange,
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
          Usar una rutina
          <select value={routineId} onChange={(event) => onRoutineChange(event.target.value)}>
            <option value="">Sesión libre</option>
            {routines.map((routine) => (
              <option key={routine.id} value={routine.id}>
                {routine.nombre}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ExerciseLineTable lines={lines} exercises={exercises} onChange={onLinesChange} />

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
