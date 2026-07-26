import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";

function RoutineList({ routines, userId, expandedId, details, onExpand, onEdit, onDelete }) {
  return (
    <section className="content-section resource-list">
      {routines.map((routine) => {
        const owned = routine.userId === userId;
        const expanded = routine.id === expandedId;

        return (
          <article className="resource-item" key={routine.id}>
            <button className="resource-summary" onClick={() => onExpand(routine)}>
              <span><strong>{routine.nombre}</strong><small>{owned ? "Personal" : "PowerUp"} · {routine.tiempoEstimado ? `${routine.tiempoEstimado} min` : "Duración libre"}</small></span>
              {expanded ? <ChevronUp size={19} /> : <ChevronDown size={19} />}
            </button>
            {expanded && (
              <div className="resource-detail">
                <div>
                  <p>{routine.descripcion || "Sin descripción."}</p>
                  <ol className="routine-lines">{(details[routine.id] || []).map((line) => <li key={line.id}><span>{line.exercise?.nombre}</span><strong>{line.repeticiones} reps · {line.peso ?? 0} kg</strong></li>)}</ol>
                </div>
                {owned && <div className="inline-actions"><button className="secondary-button" onClick={() => onEdit(routine)}><Pencil size={16} /> Editar</button><button className="icon-button danger" title="Eliminar rutina" onClick={() => onDelete(routine)}><Trash2 size={17} /></button></div>}
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}

export default RoutineList;