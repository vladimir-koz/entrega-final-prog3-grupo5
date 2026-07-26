import { Plus, Trash2 } from "lucide-react";
import {
  createEmptyExerciseLine,
  updateExerciseLine,
} from "../../utils/exerciseLineUtils";

function ExerciseLineTable({
  lines,
  exercises,
  onChange,
  weightLabel = "Peso (kg)",
  addLabel = "Agregar serie",
}) {
  function updateLine(index, field, value) {
    onChange(updateExerciseLine(lines, index, field, value));
  }

  function removeLine(index) {
    onChange(lines.filter((_, lineIndex) => lineIndex !== index));
  }

  function addLine() {
    onChange([...lines, createEmptyExerciseLine()]);
  }

  return (
    <>
      <div className="set-table">
        <div className="set-row set-header">
          <span>Ejercicio</span>
          <span>Repeticiones</span>
          <span>{weightLabel}</span>
          <span />
        </div>

        {lines.map((line, index) => (
          <div className="set-row" key={line.id ?? index}>
            <select
              aria-label={`Ejercicio ${index + 1}`}
              value={line.exerciseId}
              onChange={(event) => updateLine(index, "exerciseId", event.target.value)}
              required
            >
              <option value="">Seleccionar ejercicio</option>
              {exercises.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.nombre}
                </option>
              ))}
            </select>

            <input
              aria-label={`Repeticiones ${index + 1}`}
              type="number"
              min="1"
              value={line.repeticiones}
              onChange={(event) => updateLine(index, "repeticiones", event.target.value)}
              required
            />

            <input
              aria-label={`Peso ${index + 1}`}
              type="number"
              min="0"
              step="0.1"
              value={line.peso}
              onChange={(event) => updateLine(index, "peso", event.target.value)}
              required
            />

            <button
              className="icon-button danger"
              type="button"
              title="Quitar ejercicio"
              disabled={lines.length === 1}
              onClick={() => removeLine(index)}
            >
              <Trash2 size={17} />
            </button>
          </div>
        ))}
      </div>

      <button className="secondary-button" type="button" onClick={addLine}>
        <Plus size={17} />
        {addLabel}
      </button>
    </>
  );
}

export default ExerciseLineTable;