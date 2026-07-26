import { CalendarDays, CircleCheck, Pencil, Plus, Trash2 } from "lucide-react";
import { formatDateOnly } from "../../utils/dateUtils";

const DAY_NAMES = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
  7: "Domingo",
};

function sessionSchedule(session) {
  if (session.fechaProgramada) {
    return formatDateOnly(session.fechaProgramada);
  }

  return DAY_NAMES[session.diaSemana] || "Día flexible";
}

function TrainingPlanWorkspace({
  programs,
  selectedProgram,
  userId,
  completedScheduledIds,
  loading,
  onSelectProgram,
  onEditProgram,
  onDeleteProgram,
  onAddWeek,
  onEditWeek,
  onDeleteWeek,
  onAddScheduledWorkout,
  onEditScheduledWorkout,
  onDeleteScheduledWorkout,
}) {
  const owned = selectedProgram?.userId === userId;

  return (
    <div className="planning-layout">
      <section className="content-section plan-program-list">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Biblioteca</span>
            <h2>Planes</h2>
          </div>
        </div>

        <div className="resource-list">
          {programs.map((program) => (
            <button
              className={`program-option ${
                selectedProgram?.id === program.id ? "is-selected" : ""
              }`}
              key={program.id}
              onClick={() => onSelectProgram(program.id)}
            >
              <strong>{program.nombre}</strong>
              <small>{program.userId === userId ? "Personal" : "PowerUp"}</small>
            </button>
          ))}
        </div>

        {!loading && programs.length === 0 && (
          <div className="empty-state">
            <p>Todavía no hay planes de entrenamiento.</p>
          </div>
        )}
      </section>

      <section className="content-section plan-detail">
        {loading && <p className="muted">Cargando planificación...</p>}

        {!loading && selectedProgram && (
          <>
            <div className="section-heading plan-heading">
              <div>
                <span className="eyebrow">{owned ? "Plan personal" : "Plan PowerUp"}</span>
                <h2>{selectedProgram.nombre}</h2>
                <p className="muted">
                  {selectedProgram.objetivo ||
                    selectedProgram.descripcion ||
                    "Sin objetivo definido."}
                </p>
              </div>

              {owned && (
                <div className="inline-actions">
                  <button
                    className="secondary-button"
                    onClick={() => onEditProgram(selectedProgram)}
                  >
                    <Pencil size={16} /> Editar
                  </button>
                  <button
                    className="icon-button danger"
                    title="Eliminar plan"
                    onClick={() => onDeleteProgram(selectedProgram)}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              )}
            </div>

            <div className="program-weeks">
              {(selectedProgram.weeks || []).map((week) => (
                <section className="program-week" key={week.id}>
                  <div className="week-heading">
                    <div>
                      <span className="eyebrow">Semana {week.numeroSemana}</span>
                      <h3>{week.nombre || `Semana ${week.numeroSemana}`}</h3>
                      <p className="muted">{week.objetivo || "Sin objetivo específico."}</p>
                    </div>

                    <div className="week-actions">
                      {week.esDescarga && <span className="status-badge">Descarga</span>}
                      {owned && (
                        <>
                          <button
                            className="icon-button"
                            title="Editar semana"
                            onClick={() => onEditWeek(week)}
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            className="icon-button danger"
                            title="Eliminar semana"
                            onClick={() => onDeleteWeek(week)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="scheduled-workout-list">
                    {(week.scheduledWorkouts || []).map((session) => {
                      const completed = completedScheduledIds.has(session.id);

                      return (
                        <div className="scheduled-workout-row" key={session.id}>
                          <CalendarDays size={18} />
                          <div>
                            <strong>{session.nombre}</strong>
                            <span>
                              {sessionSchedule(session)} ·{" "}
                              {session.workoutTemplate?.nombre || "Rutina no disponible"}
                            </span>
                          </div>
                          {completed && (
                            <span className="completed-label">
                              <CircleCheck size={16} /> Realizado
                            </span>
                          )}
                          {owned && (
                            <div className="inline-actions compact-actions">
                              <button
                                className="icon-button"
                                title="Editar sesión"
                                onClick={() => onEditScheduledWorkout(week, session)}
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                className="icon-button danger"
                                title="Eliminar sesión"
                                onClick={() => onDeleteScheduledWorkout(session)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {(week.scheduledWorkouts || []).length === 0 && (
                      <p className="muted empty-week">No hay sesiones en esta semana.</p>
                    )}
                  </div>

                  {owned && (
                    <button className="ghost-button" onClick={() => onAddScheduledWorkout(week)}>
                      <Plus size={16} /> Agregar sesión
                    </button>
                  )}
                </section>
              ))}
            </div>

            {(selectedProgram.weeks || []).length === 0 && (
              <div className="empty-state">
                <p>Este plan todavía no tiene semanas.</p>
              </div>
            )}

            {owned && (
              <button className="secondary-button add-week-button" onClick={onAddWeek}>
                <Plus size={17} /> Agregar semana
              </button>
            )}
          </>
        )}

        {!loading && !selectedProgram && (
          <div className="empty-state">
            <p>Creá un plan para organizar tus semanas y sesiones.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default TrainingPlanWorkspace;
