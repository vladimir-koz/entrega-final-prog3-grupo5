import { ChevronDown, ChevronUp, Pencil, Search, Trash2 } from "lucide-react";

function ExerciseList({ exercises, userId, selectedId, onSelect, onEdit, onDelete }) {
  if (exercises.length === 0) {
    return (
      <div className="empty-state">
        <Search size={30} />
        <p>No hay ejercicios para estos filtros.</p>
      </div>
    );
  }

  return (
    <div className="resource-list">
      {exercises.map((exercise) => {
        const owned = exercise.userId === userId;
        const expanded = selectedId === exercise.id;

        return (
          <article className="resource-item" key={exercise.id}>
            <button
              className="resource-summary"
              onClick={() => onSelect(expanded ? null : exercise.id)}
            >
              <span>
                <strong>{exercise.nombre}</strong>
                <small>
                  {owned ? "Personal" : "PowerUp"} · {exercise.dificultad || "Sin dificultad"}
                </small>
              </span>
              {expanded ? <ChevronUp size={19} /> : <ChevronDown size={19} />}
            </button>
            {expanded && (
              <div className="resource-detail">
                <div>
                  <p>{exercise.descripcion || "Sin descripción."}</p>
                  <div className="tag-row">
                    {exercise.muscleGroups?.map((group) => (
                      <span key={group.id}>{group.nombre}</span>
                    ))}
                  </div>
                </div>
                {owned && (
                  <div className="inline-actions">
                    <button className="secondary-button" onClick={() => onEdit(exercise)}>
                      <Pencil size={16} /> Editar
                    </button>
                    <button
                      className="icon-button danger"
                      title="Eliminar ejercicio"
                      onClick={() => onDelete(exercise)}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

export default ExerciseList;
