import { Dumbbell, Trash2 } from "lucide-react";
import { formatTime } from "../../utils/dateUtils";

function TodayWorkouts({ workouts, onDelete }) {
  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Registro</p>
          <h2>Actividad de hoy</h2>
        </div>
        <span className="muted">{workouts.length} sesiones</span>
      </div>

      {workouts.length === 0 ? (
        <div className="empty-state">
          <Dumbbell size={32} />
          <h3>Todavía no registraste actividad</h3>
          <p>Tu primera sesión del día aparecerá acá.</p>
        </div>
      ) : (
        workouts.map((workout) => (
          <article className="workout-entry" key={workout.id}>
            <div>
              <strong>{workout.nombre}</strong>
              <span>{formatTime(workout.timestamp)}</span>
            </div>

            <div className="workout-sets">
              {workout.series?.map((set) => (
                <span key={set.id}>
                  {set.exercise?.nombre}: {set.repeticiones} × {set.peso} kg
                </span>
              ))}
            </div>

            <button
              className="icon-button danger"
              title="Eliminar entrenamiento"
              onClick={() => onDelete(workout.id)}
            >
              <Trash2 size={18} />
            </button>
          </article>
        ))
      )}
    </section>
  );
}

export default TodayWorkouts;