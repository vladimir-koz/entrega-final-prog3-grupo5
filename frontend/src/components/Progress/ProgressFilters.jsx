import { CalendarRange } from "lucide-react";
import { toInputDate } from "../../utils/dateUtils";

function ProgressFilters({ from, to, groupId, exerciseId, groups, exercises, onFromChange, onToChange, onGroupChange, onExerciseChange }) {
  return (
    <section className="filter-panel">
      <label><CalendarRange size={16} /> Desde<input type="date" value={from} max={to} onChange={(event) => onFromChange(event.target.value)} /></label>
      <label><CalendarRange size={16} /> Hasta<input type="date" value={to} min={from} max={toInputDate(new Date())} onChange={(event) => onToChange(event.target.value)} /></label>
      <label>Grupo muscular<select value={groupId} onChange={(event) => onGroupChange(event.target.value)}><option value="">Todos</option>{groups.map((group) => <option key={group.id} value={group.id}>{group.nombre}</option>)}</select></label>
      <label>Ejercicio<select value={exerciseId} onChange={(event) => onExerciseChange(event.target.value)}><option value="">Seleccionar</option>{exercises.map((exercise) => <option key={exercise.id} value={exercise.id}>{exercise.nombre}</option>)}</select></label>
    </section>
  );
}

export default ProgressFilters;